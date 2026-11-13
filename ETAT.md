# État de la chaîne « Le Pouvoir en Blocs »

Mis à jour : 2026-11-06

## Règles
- Personnages à la PEAU NOIRE (teintes brunes variées) — demande de l'utilisateur (J3+).
- Descriptions YouTube courtes : 1 phrase + 5 hashtags.
- Ton : sarcastique + gags inattendus (statue qui éternue, oie ministre, tarte, chat du jeu, 4e mur).
- 1 vidéo publiée chaque jour à 18h (Europe/Paris). Aucun jour sauté.
- Calendrier : `calendrier_60_videos_pouvoir.xlsx` (60 sujets, du 03/11/2026 au 01/01/2027).
- Voix : ElevenLabs, voix « Basti Boom », modèle Multilingual v2.
- Rappel automatique chaque jour à 8h42 (Paris), dans la session.

## Pipeline quotidien
1. Rappel 8h42 : sujet du jour + script (écrit s'il n'existe pas).
2. Toi : générer le MP3 dans ElevenLabs et le déposer dans la conversation.
3. Moi : vidéo MP4, miniature 1080x1920, fiche de publication, script du lendemain.
4. Toi : publier à 18h sur YouTube.
5. Moi : nettoyer les fichiers intermédiaires (`cleanup_jour.sh`).

## Statut par jour
| N° | Date | Sujet | Script | MP3 | Vidéo | Miniature | Fiche | Publiée |
|---|---|---|---|---|---|---|---|---|
| 1 | 06/11 | Népotisme | ✅ | ✅ | ✅ | ✅ | ✅ | ⏳ à 18h |
| 2 | 07/11 | Dictature | ✅ (v2 sarcastique) | ✅ | ✅ 84 s | ✅ | ✅ | ⏳ à 18h |
| 3 | 08/11 | Coup d'État (Gén. Mobutu, clip foot) | ✅ v3 | ✅ | ✅ 67 s | ✅ | ✅ | ⏳ à 18h |
| 4 | 10/11 (09/11 manqué) | Culte de la personnalité (chanson + excuses) | ✅ v2 | ✅ | ✅ 80 s | ✅ | ✅ | ✅ |
| 5 | 11/11 | Clientélisme (3 mèmes) | ✅ v2 court | ✅ | ✅ 55 s | ✅ | ✅ | ✅ |
| 6 | 12/11 | Autocratie (hook mur + 2 mèmes) | ✅ v2 | ✅ | ✅ 65 s | ✅ | ✅ | ✅ |
| 7 | 13/11 | Propagande (3 mèmes) | ✅ v2 | ✅ | ✅ 67 s | ✅ | ✅ | ⏳ à 18h |
| 8 | 14/11 | Copinage | ✅ | ⏳ | ⏳ | ⏳ | ⏳ | ⬜ |

Calendrier : J1-J3 = 06-08/11 ; 09/11 manqué → J4 = 10/11, J60 = 05/01/2027.

## Fichiers
- Jour 1 : `/home/user/videos/J01_nepotisme/` (vidéo, miniature, fiche, script, MP3)
- Jour 2 : `/home/user/videos/J02_dictature/` (script)
- Scénario et moteur : skill `minecraft-explainer-video`

## À faire
- [ ] Publier J1 à 18h
- [ ] Déposer le MP3 du J2 (dictature)
- [ ] Ajouter `TELEGRAM_BOT_TOKEN` à l'environnement (optionnel)
- [ ] Décider : accès API ElevenLabs pour automatiser le MP3 (optionnel)
