"""Envoie les livrables du jour sur Telegram via un bot.

Prérequis : variable d'environnement TELEGRAM_BOT_TOKEN (définie par l'utilisateur dans les
paramètres de l'environnement cloud — jamais collée dans le chat) ; api.telegram.org autorisé.

  python3 -I telegram.py chatid                 # après avoir écrit /start au bot : affiche le chat_id
  python3 -I telegram.py send <dossier_du_jour> [chat_id]
      envoie : la vidéo (*.mp4 final), la miniature (miniature*.png), la fiche publication_youtube.txt
      (en message + fichier), et le script du lendemain si --next <fichier> est donné.
  python3 -I telegram.py msg "texte" [chat_id]

chat_id : argument, sinon TELEGRAM_CHAT_ID, sinon ~/.telegram_chat_id (écrit par la commande chatid).
"""
import glob, json, os, subprocess, sys

TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
if not TOKEN:
    sys.exit("TELEGRAM_BOT_TOKEN absent : l'utilisateur doit l'ajouter dans les variables de l'environnement.")
API = f'https://api.telegram.org/bot{TOKEN}/'
CID_FILE = os.path.expanduser('~/.telegram_chat_id')

def call(method, fields=None, files=None):
    cmd = ['curl', '-sS', '--max-time', '300', API + method]
    for k, v in (fields or {}).items(): cmd += ['--form-string', f'{k}={v}']
    for k, v in (files or {}).items(): cmd += ['-F', f'{k}=@{v}']
    out = subprocess.run(cmd, capture_output=True, text=True).stdout
    try: r = json.loads(out)
    except Exception: sys.exit(f'Réponse illisible de Telegram pour {method}')
    if not r.get('ok'): sys.exit(f"Telegram {method} : {r.get('description')}")
    return r['result']

def chat_id(arg=None):
    cid = arg or os.environ.get('TELEGRAM_CHAT_ID') or (open(CID_FILE).read().strip() if os.path.exists(CID_FILE) else '')
    if not cid: sys.exit("chat_id inconnu : demande à l'utilisateur d'écrire /start au bot, puis lance « chatid ».")
    return cid

cmd = sys.argv[1] if len(sys.argv) > 1 else ''
if cmd == 'chatid':
    ups = call('getUpdates')
    chats = {}
    for u in ups:
        m = u.get('message') or u.get('channel_post') or {}
        c = m.get('chat') or {}
        if c: chats[c['id']] = c.get('first_name') or c.get('title') or ''
    if not chats: sys.exit("Aucun message reçu : l'utilisateur doit d'abord écrire /start au bot.")
    cid = list(chats)[-1]; open(CID_FILE, 'w').write(str(cid))
    print(f'chat_id {cid} ({chats[cid]}) enregistré')
elif cmd == 'msg':
    call('sendMessage', {'chat_id': chat_id(sys.argv[3] if len(sys.argv) > 3 else None), 'text': sys.argv[2]})
    print('message envoyé')
elif cmd == 'send':
    d = sys.argv[2]; rest = sys.argv[3:]
    nxt = None
    if '--next' in rest: i = rest.index('--next'); nxt = rest[i + 1]; del rest[i:i + 2]
    cid = chat_id(rest[0] if rest else None)
    vids = [v for v in glob.glob(os.path.join(d, '*.mp4')) if 'noaudio' not in v]
    thumbs = sorted(glob.glob(os.path.join(d, 'miniature*.png')))
    pub = os.path.join(d, 'publication_youtube.txt')
    name = os.path.basename(os.path.abspath(d))
    call('sendMessage', {'chat_id': cid, 'text': f'🎬 Le Pouvoir en Blocs · {name}\nVidéo + miniature + fiche de publication ci-dessous. Publication à 18h.'})
    for v in vids: call('sendVideo', {'chat_id': cid, 'supports_streaming': 'true', 'width': '720', 'height': '1280'}, {'video': v})
    for t in thumbs: call('sendDocument', {'chat_id': cid, 'caption': 'Miniature (fichier original 1080x1920)'}, {'document': t})
    if os.path.exists(pub):
        txt = open(pub, encoding='utf-8').read()
        call('sendMessage', {'chat_id': cid, 'text': txt[:4000]})
    if nxt and os.path.exists(nxt):
        call('sendMessage', {'chat_id': cid, 'text': '📜 Script de demain (à coller dans ElevenLabs) :\n\n' + open(nxt, encoding='utf-8').read()[:3900]})
    print(f'envoyé : {len(vids)} vidéo(s), {len(thumbs)} miniature(s), fiche={os.path.exists(pub)}, script demain={bool(nxt)}')
else:
    print(__doc__)
