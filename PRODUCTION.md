# Comment une vidéo « Le Pouvoir en Blocs » est produite

Tout repose sur le skill `minecraft-explainer-video` (dossier `skill/`). Règles d'écriture : `skill/references/style_ecriture.md` (section 0 = méthode validée). API du moteur : `skill/references/api.md`. Fiche YouTube : `skill/references/publication.md`.

## Rôles
| Étape | Qui |
|---|---|
| Envoie les mèmes audio du jour (.mp4 courts) | Utilisateur |
| Réécrit le script autour des mèmes (135-150 mots) + tableau « où tombent les mèmes » | Claude |
| Génère la voix dans ElevenLabs (voix **Basti Boom**, Multilingual v2) et envoie le MP3 | Utilisateur |
| Aligne, insère les mèmes, scénarise, rend la vidéo, miniature, fiche, script du lendemain | Claude |
| Publie sur YouTube à 18h (Short, Éducation) | Utilisateur |

## Règles éditoriales (non négociables)
1. **Un mème ouvre la vidéo à 0 s**, avant toute narration (flash-forward si besoin).
2. Les mèmes sont des **répliques de personnages**, annoncées par une phrase d'appel dans le script ; jamais dans le texte ElevenLabs.
3. Script court 135-150 mots, ton **sarcastique**, punchline à chaque étape, callback du hook, fin face caméra.
4. Un gag visuel toutes les 5-6 s ; **le Général à la toque léopard** revient ; personnages à **la peau noire**.
5. Parodie, personnages fictifs ; faits historiques vérifiés ; description YouTube commençant par « Parodie. ».
6. Description = 1 phrase + 5 hashtags (#shorts en premier).

## Commandes (dans un conteneur avec Node, Chromium/Playwright, ffmpeg, Python+numpy+Pillow)
```bash
SK=skill; P=videos/J10_censure
bash $SK/scripts/new_project.sh $P                      # moteur + three + polices (n'écrase jamais scenario.js)
python3 -I $SK/scripts/align.py $P/voix_eleven.mp3 $P/script_voix.txt $P/words_raw.json
ffmpeg -ss <début> -t <durée> -i $P/clip_x.mp4 -vn -ac 2 -ar 44100 $P/c_x.wav   # couper chaque mème à sa réplique
python3 -I $SK/scripts/insert_clip.py $P/voix_eleven.mp3 $P/words_raw.json $P/voix.mp3 $P/words.json \
   "0|$P/c_hook.wav|0.3|Texte du mème d'ouverture" "<t_fin_de_segment>|$P/c_2.wav|0.4|Texte 2" "end|$P/c_fin.wav|0.3|Texte fin"
# écrire $P/scenario.js (tableau T des coupes = débuts de segments décalés ; modèles : skill/assets/examples/*.js)
bash $SK/scripts/preview.sh $P 1.2 4.5 …                 # planche de contrôle → corriger les cadrages masqués
bash $SK/scripts/make_video.sh $P $P/J10_censure.mp4      # ≈ 6-8 min de rendu
# miniature : copie du projet sans words.json + plan dédié, SIZE=1080x1920 node $SK/scripts/render.js preview 1, puis
python3 -I $SK/scripts/thumbnail.py fond.jpg $P/miniature_J10.png "Censure" "Accroche|ligne 2" $P/node_modules/@fontsource/montserrat/files/montserrat-latin-900-normal.woff
```
Pièges connus : les fonctions de panneau reçoivent le **temps local du plan** (`u`) ; caméra trop proche = personnage qui masque la scène (toujours prévisualiser) ; sans transcription automatique (HuggingFace bloqué), demander à l'utilisateur des mèmes coupés à la réplique.
