"""Insère un extrait audio (mème) dans la voix off et décale les sous-titres.

Usage : python3 -I insert_clip.py <voix.mp3> <clip.(mp4|mp3|wav)> <words_raw.json> <voix_out.mp3> <words_out.json> "<texte du clip>" <t1> [t2 ...]
  t = instant d'insertion dans la voix ORIGINALE (choisir une pause : fin d'un segment du rapport align.py),
      ou "end" pour l'ajouter après la dernière phrase.
Chaque insertion = 0,2 s de silence + clip (+25 % de volume) + 0,3 s. Le texte du clip devient des sous-titres
mot par mot (répartis sur la durée du clip). Affiche la nouvelle durée et l'instant de chaque clip (pour caler les plans).
"""
import json, subprocess, sys, tempfile, os
voix, clip, wr, vout, wout, ctext = sys.argv[1:7]
pts = sys.argv[7:]
dur = lambda f: float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
D, C = dur(voix), dur(clip)
ins = sorted(D if p == 'end' else float(p) for p in pts)
PRE, POST = 0.2, 0.3
tmp = tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-y','-i',voix,'-ac','2','-ar','44100',f'{tmp}/v.wav'],check=True)
subprocess.run(['ffmpeg','-v','error','-y','-i',clip,'-vn','-ac','2','-ar','44100',f'{tmp}/c.wav'],check=True)
parts, fc, edges = [], [], [0.0] + ins + [D]
for i in range(len(edges) - 1):
    a, b = edges[i], edges[i + 1]
    fc.append(f'[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[v{i}]'); parts.append(f'[v{i}]')
    if i < len(ins):
        fc.append(f'[c{i}]volume=1.25,adelay={int(PRE*1000)}|{int(PRE*1000)},apad=pad_dur={POST}[k{i}]'); parts.append(f'[k{i}]')
fc.insert(0, f'[1:a]asplit={len(ins)}' + ''.join(f'[c{i}]' for i in range(len(ins))) if len(ins) > 1 else '[1:a]anull[c0]')
fc.append(''.join(parts) + f'concat=n={len(parts)}:v=0:a=1[o]')
subprocess.run(['ffmpeg','-v','error','-y','-i',f'{tmp}/v.wav','-i',f'{tmp}/c.wav','-filter_complex',';'.join(fc),'-map','[o]','-c:a','libmp3lame','-b:a','192k',vout],check=True)
L = PRE + C + POST
words = json.load(open(wr)); out = []
cw = ctext.split(); lens = [len(w) + 1 for w in cw]; tot = sum(lens)
starts = []
for k, t0 in enumerate(ins):
    starts.append(round(t0 + k * L + PRE, 3))
for w in words:
    shift = sum(L for t0 in ins if w['t'] >= t0)
    out.append({**w, 't': round(w['t'] + shift, 3), 'e': round(w['e'] + shift, 3)})
for s0 in starts:
    t = s0
    for w, l in zip(cw, lens):
        d = C * l / tot; out.append({'w': w, 'k': w.lower().strip('.,!?'), 't': round(t, 3), 'e': round(t + d, 3)}); t += d
out.sort(key=lambda x: x['t'])
json.dump(out, open(wout, 'w'), ensure_ascii=False)
print(f'durée {dur(vout):.2f}s · clips à ' + ', '.join(f'{s:.2f}s' for s in starts) + f' · décalage par clip {L:.2f}s')
