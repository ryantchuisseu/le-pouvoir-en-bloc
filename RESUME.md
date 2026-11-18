# Résumé du projet « Le Pouvoir en Blocs » (pour reprendre dans une nouvelle conversation)

## Le projet
Chaîne YouTube Shorts (FR) : chaque jour à 18h (Paris), une notion de pouvoir (népotisme, dictature, coup d'État…) expliquée en **animation style Minecraft**, ton **sarcastique**, avec des **mèmes audio** envoyés par l'utilisateur. Mascotte : **le Général à la toque léopard** (peau noire, lunettes noires, cape). Village « Village Cube ».
- Identité : nom **Le Pouvoir en Blocs**, logo/bannière dans `chaine/`.
- Dépôt : https://github.com/ryantchuisseu/le-pouvoir-en-bloc (public, voulu par l'utilisateur).
- Calendrier des 60 sujets : `calendrier_60_videos_pouvoir.xlsx` ; statut jour par jour : `ETAT.md`.

## Où on en est (18/11/2026)
- J1 → J9 livrés (voir `ETAT.md`). J9 Oligarchie v3 (mème à 0 s) livrée le 17/11.
- **J10 Censure (aujourd'hui 18/11)** : script v1 prêt dans `videos/J10_censure/script_voix.txt` ; il faut **attendre les mèmes de l'utilisateur**, réécrire le script autour d'eux (le 1er mème ouvre la vidéo à 0 s), puis recevoir le MP3.
- 3 jours manqués (09, 14, 16/11) → calendrier décalé de 3 jours.

## Ce que l'utilisateur veut chaque jour
Vidéo MP4 + miniature 1080×1920 + fiche YouTube (titre ≤ 60 caractères, description d'1 phrase + 5 hashtags, tags, réglages) **collée dans le chat**, + script du lendemain. Réponses en français, très structurées (tableaux, gras, « Prochaine étape »). Il préfère qu'on avance sans trop de questions (« je te laisse faire »).

## Méthode de production
Voir `PRODUCTION.md` (rôles, règles, commandes) et le skill dans `skill/` (à installer : `skill/minecraft-explainer-video.skill` → « Save skill »).
Points clés : mème à 0 s obligatoire · mèmes = répliques annoncées · script 135-150 mots · gag toutes les 5-6 s · panneaux = temps local du plan · toujours prévisualiser avant le rendu.

## Points ouverts
- ⚠️ L'adresse Gmail de l'utilisateur apparaît dans le **1er commit** du dépôt public ; la réécriture d'historique a été bloquée (mode Auto). Pour la retirer : passer en mode « Accept edits » puis amender + push --force-with-lease (commits suivants : `ryantchuisseu@users.noreply.github.com`).
- J6 (Autocratie) et J8 (Copinage) : certains panneaux animés sont restés vides (bug corrigé). Proposé de les refaire, pas encore demandé.
- Rappel quotidien 8h42 (tâche planifiée `trig_015B1h7Ztnxqymn54f4CqubC`) lié à l'ANCIENNE conversation : en créer un nouveau dans la nouvelle conversation puis supprimer l'ancien.
- Telegram : bot créé, mais `TELEGRAM_BOT_TOKEN` jamais ajouté → inactif (script `skill/scripts/telegram.py` prêt).
- ElevenLabs : manuel (l'utilisateur génère le MP3) ; offre gratuite → mettre « Voix : ElevenLabs » si besoin.
- Pas de transcription auto (HuggingFace bloqué) : demander des mèmes coupés à la réplique, sinon prendre ~5 s autour de la parole.
- Durées : viser 55-70 s.
