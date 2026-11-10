---
name: minecraft-explainer-video
description: "Crée des vidéos explicatives verticales (9:16, 20-70 s, MP4 avec musique) au style « animation Minecraft » façon TikTok @explainedusing_minecraft : un village en blocs, des personnages à la Steve, des panneaux-infographies dans le décor, des sous-titres blancs au centre, des messages façon chat (« X a disparu »), des tampons et effets (fumée, ?, confettis). Utilise ce skill dès que l'utilisateur veut « expliquer X en Minecraft », une vidéo « style Minecraft », un explainer en blocs/cubes, une vidéo TikTok/Reels/Shorts pédagogique sur un concept (politique, économie, histoire, société, business…), ou veut refaire/adapter une vidéo d'animation Minecraft qu'il a partagée — même s'il ne dit pas « skill » ni « Minecraft » mais parle de « ce style de vidéo » ou d'une suite de la série."
---

# Vidéo explicative style animation Minecraft

Pipeline 100 % local : **Three.js** (scène 3D en blocs) → **Playwright/Chromium** (rendu image par image) → **numpy** (musique + bruitages synthétisés) → **ffmpeg** (MP4 H.264 720×1280, 30 i/s).
Un scénario = un seul fichier `scenario.js`. Le monde, les personnages, les panneaux et les effets sont déjà fournis par le moteur.

## Pourquoi ce format fonctionne (à respecter)

| Principe | Mise en œuvre |
|---|---|
| Accroche en < 2 s | Plan 1 = la question ou le concept affiché tout de suite |
| Coupe toutes les ~2,5 s | 10-14 plans de 2,2 à 3 s |
| Le chiffre / le mot-clé est **dans le décor** | Panneau central : compteurs en bâtons, règles, définition |
| Une histoire avec des personnages nommés | Étiquettes au-dessus des têtes (« Max », « Journaliste ») |
| Rebondissements visibles | Tampons rouges (« ANNULÉES », « À VIE »), cage qui tombe, fumée qui fait disparaître un personnage, message dans le chat |
| Morale qui boucle | Le dernier plan renvoie au premier (le spectateur relance) |

**Recette narrative** (adapter au sujet) :
```
Accroche → Contexte (situation normale) → Élément déclencheur → Escalade en 3-5 étapes concrètes
→ Définition affichée sur le panneau → (Origine / lien réel) → Morale courte qui boucle
```

## Style de la chaîne (obligatoire)
Lis **`references/style_ecriture.md`** avant d'écrire un script ou un scénario : ton **sarcastique**, punchlines après chaque étape, **un gag visuel toutes les 5-6 s** calé au mot près, 4e mur à la fin, boucle avec l'ouverture. Exemple complet validé : `assets/examples/dictature_sarcastique.js` (34 plans, 84 s).

## Workflow

1. **Cadrer** : sujet, durée (30 s par défaut), langue (celle de l'utilisateur par défaut). Pas de voix off par défaut : le texte passe par les sous-titres. Si l'utilisateur fournit une clé ElevenLabs ou un enregistrement, ajoute la voix au mixage final avec ffmpeg et cale `cap` sur sa durée.
2. **Écrire le storyboard** sous forme de tableau (plan, durée, visuel, sous-titre) et le montrer en une fois. Ne bloque pas dessus : enchaîne sauf si l'utilisateur veut valider avant.
2b. **Avec voix off (recommandé)** : écris le script de narration (~165 mots ≈ 60 s ; phrases courtes, une idée par phrase, ponctuation nette car les pauses servent à l'alignement). L'utilisateur le génère dans ElevenLabs (Multilingual v2) et envoie le MP3. Copie-le en `<projet>/voix.mp3`, le script en `<projet>/script_voix.txt`, puis :
   ```bash
   python3 -I <skill>/scripts/align.py <projet>/voix.mp3 <projet>/script_voix.txt <projet>/words.json
   ```
   Vérifie le rapport segment ↔ phrase. Ensuite, **découpe les plans sur les débuts de segments** (une coupe par phrase ou groupe de phrases), mets `cap:[]` dans chaque plan (les sous-titres mot par mot viennent de `words.json`), définis `E.HL=[...]` (mots-clés affichés en jaune) et fais durer la vidéo ≈ voix + 0,8 s. `make_video.sh` mixe alors la voix avec la musique atténuée. Exemples : `assets/examples/nepotisme_voix.js` (sobre), `assets/examples/dictature_sarcastique.js` (style actuel). Astuce : déclare les coupes dans un tableau `T=[...]` (débuts de segments) et génère les plans avec `d=T[i+1]-T[i]`.
3. **Créer le projet** :
   ```bash
   bash <skill>/scripts/new_project.sh <projet>
   ```
   Cette commande copie le moteur, puis installe three et les polices.
4. **Écrire `<projet>/scenario.js`** en partant de `assets/examples/dictature.js`, l'exemple complet et validé. Lis `references/api.md` pour l'API, les coordonnées du monde et les options des personnages.
5. **Prévisualiser** une image au milieu de chaque plan, puis regarder la planche avec Read :
   ```bash
   bash <skill>/scripts/preview.sh <projet> 1.3 3.9 6.5 ...
   ```
   Corrige les problèmes, puis prévisualise de nouveau.
6. **Rendre**. Compte environ 4 min pour 30 s de vidéo ; lance-le avec un timeout de 600000.
   ```bash
   bash <skill>/scripts/make_video.sh <projet> <sortie.mp4>
   ```
7. **Livrer les 3 éléments du jour** (envoie-les avec SendUserFile) :
   - **la vidéo** MP4 ;
   - **la miniature** 1080×1920 : rends un fond propre (un plan dédié dans une copie du projet sans `words.json`, avec `SIZE=1080x1920 PROJ=<copie> node scripts/render.js preview <t>`), puis lance `python3 -I scripts/thumbnail.py <fond.jpg> <miniature.png> "TITRE" "ACCROCHE|LIGNE 2" <projet>/node_modules/@fontsource/montserrat/files/montserrat-latin-900-normal.woff`. Le titre fait 1 à 2 mots et l'accroche crée la curiosité ;
   - **`publication_youtube.txt`** : titre, description, hashtags, tags et réglages selon `references/publication.md`. **Colle aussi son contenu dans le chat**, prêt à copier : l'utilisateur ne rédige rien.
   Donne aussi le **script du lendemain**, pour garder un jour d'avance.
8. **Telegram (si `TELEGRAM_BOT_TOKEN` est défini)** : envoie les livrables directement à l'utilisateur :
   ```bash
   python3 -I <skill>/scripts/telegram.py send <projet> --next <dossier_du_lendemain>/script_voix.txt
   ```
   La première fois, l'utilisateur écrit `/start` au bot, puis lance `python3 -I <skill>/scripts/telegram.py chatid`. Le jeton Telegram se place dans l'URL et ne peut donc pas passer par les secrets réseau du proxy : c'est une variable d'environnement que l'utilisateur crée lui-même. Ne la demande jamais dans le chat.

## Pièges connus (vus en production)

- **Un personnage au premier plan masque la scène.** C'est l'erreur n° 1. Garde la caméra à y ≥ 2,4 quand la foule est entre elle et la cible, ou éloigne/cache les figurants proches de la caméra. Vérifie toujours avec la prévisualisation.
- **Sous-titres** : 1 à 3 mots par segment, environ 22 caractères maximum, découpés selon le sens. Les segments de `cap` se partagent la durée du plan à parts égales.
- **Texte des panneaux** : en majuscules, 3 à 5 lignes au maximum. La police VT323 est étroite et un texte trop long déborde du cadre.
- Les **tampons** (`stamp`) déclenchent d'eux-mêmes un tremblement de caméra et un son « thud ». N'en mets pas plus de 2 ou 3 par vidéo, pour garder l'effet.
- Le **feu** est éteint par défaut : allume-le dans `run` (`fireGroup.visible=true; smokes.forEach(m=>m.visible=true)`).
- Pas d'accès à HuggingFace dans l'environnement cloud : ni Whisper ni TTS local. N'essaie pas de les installer.
- **Univers original uniquement** : aucune texture, aucun logo, aucun skin ni aucune police officielle de Minecraft/Mojang, et pas « Minecraft » dans un titre affiché à l'écran. On parle de « style animation Minecraft » auprès de l'utilisateur. Si l'utilisateur fournit lui-même les textures de son jeu, tu peux les charger à la place des textures générées (objet `T` du moteur), en lui rappelant les conditions d'utilisation de Mojang : vidéo non présentée comme officielle.
- **Sujets sensibles** (politique, religion, histoire) : reste factuel et pédagogique. Utilise des personnages fictifs et ne caricature aucune personne ni aucun régime réel identifiable.

## Fichiers

| Fichier | Rôle |
|---|---|
| `assets/engine/main.js` | Moteur : monde, personnages, panneaux, effets, sous-titres, rendu. Ne le modifie que pour ajouter un décor ou une capacité réutilisable. |
| `assets/engine/index.html` | Page de chargement (polices, import map) |
| `assets/examples/dictature.js` | Scénario de référence : « Comment naît une dictature ? » (31 s, 12 plans) |
| `references/api.md` | API du scénario, carte du monde, options des personnages et des poses |
| `scripts/new_project.sh` / `preview.sh` / `make_video.sh` | Création du projet, planche de prévisualisation, rendu final |
| `scripts/render.js` | Pilote Playwright (`PROJ=<projet> node render.js preview t1 t2…` ou `full`) |
| `scripts/audio.py` | Musique tendue en ré mineur, qui s'assombrit au plan 5 et passe en fa majeur au dernier plan, plus les bruitages |
