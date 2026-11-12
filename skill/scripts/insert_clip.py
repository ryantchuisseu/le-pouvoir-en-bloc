"""Insère des extraits audio (mèmes) dans la voix off et décale les sous-titres.

Usage :
  python3 -I insert_clip.py <voix_eleven.mp3> <words_raw.json> <voix.mp3> <words.json> \
      "<t>|<clip>|<post_s>|<texte du clip>" ["…" …]
  t      = instant d'insertion dans la voix ORIGINALE : 0 (hook avant la narration), une fin de segment
           du rapport align.py (pause), ou "end" (après la dernière phrase).
  post_s = silence après le clip, pour laisser l'action se jouer (porte qui claque, cage…) ; 0.3 par défaut.
Chaque clip : 0,2 s de silence avant (0,1 s si t=0), volume ×1,3, texte réparti mot à mot en sous-titres.
Affiche l'instant de chaque clip et le décalage cumulé à appliquer aux plans suivants.
"""
import json, subprocess, sys
voix, wr, vout, wout = sys.argv[1:5]
dur = lambda f: float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f],capture_output=True,text=True).stdout)
D = dur(voix); I = []
for spec in sys.argv[5:]:
    t, clip, post, txt = (spec.split('|') + ['', '', '0.3', ''])[:4]
    t = D if t == 'end' else float(t)
    I.append((t, clip, 0.1 if t == 0 else 0.2, float(post or .3), txt))
I.sort(key=lambda x: x[0])
inputs = ['-i', voix] + sum([['-i', c] for _, c, *_ in I], [])
fc, parts, prev = [], [], 0.0
for k, (t, c, pre, post, _) in enumerate(I):
    if t - prev > .01: fc.append(f'[0:a]aresample=44100,aformat=channel_layouts=stereo,atrim={prev}:{t},asetpts=PTS-STARTPTS[v{k}]'); parts.append(f'[v{k}]')
    fc.append(f'[{k+1}:a]aresample=44100,aformat=channel_layouts=stereo,volume=1.3,adelay={int(pre*1000)}|{int(pre*1000)},apad=pad_dur={post}[c{k}]'); parts.append(f'[c{k}]'); prev = t
if D - prev > .01: fc.append(f'[0:a]aresample=44100,aformat=channel_layouts=stereo,atrim={prev}:{D},asetpts=PTS-STARTPTS[vend]'); parts.append('[vend]')
fc.append(''.join(parts) + f'concat=n={len(parts)}:v=0:a=1[o]')
subprocess.run(['ffmpeg','-v','error','-y',*inputs,'-filter_complex',';'.join(fc),'-map','[o]','-c:a','libmp3lame','-b:a','192k',vout],check=True)
Ls = [pre + dur(c) + post for _, c, pre, post, _ in I]
out = []
for x in json.load(open(wr)):
    s = sum(L for (t, *_), L in zip(I, Ls) if x['t'] >= t and not (t == D))
    out.append({**x, 't': round(x['t'] + s, 3), 'e': round(x['e'] + s, 3)})
for k, ((t, c, pre, post, txt), L) in enumerate(zip(I, Ls)):
    s0 = t + sum(Ls[:k]) + pre; C = dur(c); ws = txt.split(); ln = [len(a) + 1 for a in ws]; T = sum(ln) or 1; tt = s0
    for a, l in zip(ws, ln):
        d = C * l / T; out.append({'w': a, 'k': a.lower().strip(',!?.…'), 't': round(tt, 3), 'e': round(tt + d, 3)}); tt += d
    print(f'clip {k+1} « {txt} » à {s0:.2f}s · fin {s0 + C:.2f}s · plans suivants décalés de +{sum(Ls[:k+1]):.2f}s')
out.sort(key=lambda x: x['t']); json.dump(out, open(wout, 'w'), ensure_ascii=False)
print(f'durée totale {dur(vout):.2f}s → vidéo ≈ {dur(vout)+.5:.1f}s')
