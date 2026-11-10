# Le Pouvoir en Blocs

Chaîne YouTube Shorts : une notion de pouvoir (népotisme, dictature, coup d'État…) expliquée chaque jour à 18h, en animation style Minecraft, ton sarcastique.

## Contenu
| Dossier | Rôle |
|---|---|
| `skill/` | Skill Claude `minecraft-explainer-video` : moteur 3D (Three.js), scripts de rendu, alignement voix, miniatures, guide de style, exemples |
| `videos/JXX_sujet/` | Par jour : `script_voix.txt`, `scenario.js`, `voix.mp3`, vidéo finale `.mp4`, miniature, `publication_youtube.txt` |
| `chaine/` | Photo de profil et bannière (+ scénarios de rendu) |
| `calendrier_60_videos_pouvoir.xlsx` | Calendrier des 60 sujets |
| `ETAT.md` | Statut jour par jour |

## Refaire une vidéo
```bash
bash skill/scripts/new_project.sh videos/J05_clientelisme
python3 -I skill/scripts/align.py videos/J05_clientelisme/voix.mp3 videos/J05_clientelisme/script_voix.txt videos/J05_clientelisme/words.json
bash skill/scripts/make_video.sh videos/J05_clientelisme videos/J05_clientelisme/J05_clientelisme.mp4
```
Dépendances : Node 18+, Playwright/Chromium, ffmpeg, Python 3 + numpy + Pillow.

Les extraits audio tiers (mèmes) utilisés aux jours 3 et 4 ne sont pas versionnés (droits d'auteur) ; les vidéos finales les contiennent.
