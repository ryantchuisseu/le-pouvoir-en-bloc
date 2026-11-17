# Style « Le Pouvoir en Blocs » : écriture sarcastique + gags visuels

## 0. MÉTHODE VALIDÉE (jours 5-6, « MDR ») — à appliquer en priorité
L'utilisateur envoie chaque jour 1 à 3 **mèmes audio** (extraits .mp4 courts). Le script se construit AUTOUR d'eux :

1. **Script court** : 135-150 mots (≈ 50 s de voix) ; avec les mèmes, la vidéo fait 55-65 s.
2. **OBLIGATOIRE : un mème audio OUVRE la vidéo à 0 s** (exigence de l'utilisateur : « plus tu tardes, plus les gens partent »). Jamais de narration avant le premier mème. Si aucun mème ne colle au début de l'histoire, fais un **flash-forward** : montre la scène la plus forte (la fin, l'humiliation, la catastrophe) avec son mème, puis la narration commence (« Pourquoi ces cinq hommes… »). Insertion : `"0|clip.wav|0.3|…"` dans insert_clip.py, plan COLD OPEN en tête du scénario (exemple : `assets/examples/oligarchie.js`). Ne réutilise pas ensuite le même mème plus loin.
3. **Les mèmes = répliques des personnages**, jamais des bruitages. Écris la phrase qui les APPELLE juste avant (le « setup »), puis le mème répond :
   - « Tu vas le voir pour réclamer ? » → le chef : « Bolosse que tu es. » (porte qui claque)
   - « Un ministre ose dire : Je ne suis pas d'accord. » → le chef : « Tu n'es pas avec nous. » (cage)
   - « Le candidat fait du porte-à-porte. » → la villageoise : « C'est qui ce mignon ? » (cœurs)
   Le texte ElevenLabs ne contient JAMAIS le mème : dis-le à l'utilisateur.
4. **Callback** : reprends le gag du hook au milieu en 3 mots (« D'où le mur. »).
5. **Fin 4e mur + mème final** : la dernière phrase vise le spectateur (« Même chez toi, qui regardes cette vidéo. »), puis le mème de fin (« Ton ennemi n'est pas loin ») sur un zoom lent du chef → boucle avec le hook.
6. **Personnage récurrent** : le Général à la toque léopard (peau noire, lunettes noires), candidat, roi ou autocrate selon le sujet ; il peut changer de chapeau (couronne, lauriers, écharpe) mais « le fauteuil reste le même ».
7. Livre aussi au user un tableau « où tombent les mèmes / ce qu'on voit » avant qu'il génère la voix.

**Montage** : `align.py` → choisis les instants d'insertion en FIN de segment (pause) → 
`python3 -I scripts/insert_clip.py voix_eleven.mp3 words_raw.json voix.mp3 words.json "0|clip_mur.mp4|0.35|NOOON, tape pas contre le mur, gros !" "27.75|clip_pasavecnous.mp4|0.5|Tu n'es pas avec nous." "end|clip_ennemi.mp4|0.3|Ton ennemi n'est pas loin…"`
→ cale les plans : avant un clip, temps inchangés ; après, ajoute le décalage affiché. Exemples complets : `assets/examples/clientelisme.js` (3 mèmes, porte-à-porte), `assets/examples/autocratie.js` (hook mur, conseil des ministres, chapeaux).

Validé par l'utilisateur sur le jour 2 (dictature). À appliquer à **tous** les scripts et toutes les vidéos.

## 1. Écriture du script (voix off)

**Ton** : narrateur complice et ironique, comme un ami qui raconte une absurdité avec un sourire en coin. On se moque des mécanismes du pouvoir, jamais des victimes ni de personnes réelles. Personnages fictifs par défaut (Max, Léa, Théo, Villageois_42…). Un nom de personnage historique public peut être affiché si l'utilisateur le demande (ex. « GÉNÉRAL MOBUTU », jour 3) : la narration reste générique, les gags restent de la caricature du pouvoir, et la description YouTube commence par « Parodie. ».

**Personnages à la peau noire** (choix de l'utilisateur depuis le jour 3) : crée la foule, les gardes et le chef dans le scénario avec des teintes brunes variées (`#5a3a24 #4a2f1d #6b4429 #3d2616 #7a4e30 #553320 #45291a #6e472b #3a2414`), sans traits exagérés. Les personnages intégrés au moteur (peau claire) ne sont alors pas utilisés.

**Structure (60-75 s, 165-190 mots)**
1. **Accroche + promesse ironique** : « Comment naît une dictature ? Spoiler : c'est très démocratique. Au début. »
2. **Situation normale qui dérape** : phrases très courtes, une idée par phrase.
3. **Escalade en 4-6 étapes concrètes**, chacune suivie d'une **punchline** ou d'une précision absurde :
   - « Score : 100 %. Enfin, 100 % des gens présents. Il n'y avait que lui. »
   - « Le village applaudit. Le village applaudit tout, en fait. »
   - « Sur les murs, sur les pièces, sur les tartes. Oui, les tartes. »
   - « Il a fait voter une loi pour ça. Il a voté pour, bien sûr. »
4. **Définition claire** (le seul moment sérieux), avec une pointe finale : « un seul chef, zéro contre-pouvoir, et une excellente cuisine pour lui seul ».
5. **Origine du mot / fait historique vérifiable** + chute ironique : « Le problème, c'est quand la crise ne finit jamais. »
6. **Chute qui interpelle le spectateur** (4e mur) : « Alors retiens ça… » / « vérifie que ton chef est toujours en pyjama ».

**Procédés à utiliser**
| Procédé | Exemple |
|---|---|
| « Spoiler : » | « Spoiler : très bientôt, ça peut durer trente ans. » |
| Correction après coup | « 100 %. Enfin, 100 % des gens présents. » |
| Promesse démentie | « Juste quelques semaines. Promis. » → « Les semaines deviennent des années. » |
| Répétition comique | « Oui, les tartes. » |
| Détail trivial dans un moment grave | « Il était en pyjama. » |
| Litote | « Pas notre plus belle exportation. » |

**Règles techniques** : ponctuation nette (les pauses servent à l'alignement), pas de parenthèses, chiffres écrits comme ils se prononcent si ambigu, faits historiques vérifiés. Au-delà de 190 mots, la vidéo dépasse 75 s : couper.

## 2. Gags visuels (un toutes les 5-6 s)

Chaque punchline du script = un gag à l'écran **au mot près** (couper sur le segment de `words.json`). Catalogue déjà codé dans `assets/examples/dictature_sarcastique.js` :

| Gag | Comment (dans le scénario) |
|---|---|
| **Ouverture choc** (statue qui éternue) | `pose(statue,{headTilt})` + cubes « spray » lancés depuis le nez, sfx `boing` |
| **Rayure de disque + zoom figé** sur un « Au début. » | plan très court, caméra collée au visage, sfx `scratch` |
| **Place vide + boule de foin** | ne pas poser la foule, cube marron qui roule, sprite « 0 VOTANT » |
| **Sprite ironique** (« PROMIS ! ») | `textSprite(..., {scale:.0024})` près de la tête (petite échelle en gros plan) |
| **Tampons en cascade** | un plan par tampon : `stamp:['REPORTÉES',u]` puis `['ANNULÉES',.05]` |
| **Absurde** (oie ministre) | petit modèle en boîtes + `textSprite("Ministre de l'Agriculture")`, foule `armsUp` |
| **Slapstick** (tarte dans la figure) | objet qui vole (lerp + arc), puis bloc crème collé au visage, `poof`, sfx `splat` |
| **Disparition + chat cynique** | `poof` + `chat:[['X a disparu.',.3],["Max : il n'était pas si important.",1.25,'#ff9f43']]` (les lignes s'empilent) |
| **Vote truqué** | panneau `POUR : 1 (MAX) / CONTRE : 0` + Max seul à l'urne |
| **Panneau absurde** | « CRISE EN COURS · JOUR 9 999 · (FIN : JAMAIS) » |
| **4e mur** | le chef marche vers la caméra et pointe le spectateur sur « retiens ça » |
| **Boucle** | le dernier plan rejoue le gag d'ouverture → le Short se relance naturellement |

Le visage pixel du chef (`drawFace`) se réutilise sur affiches, pièces, tartes et panneau « GLOIRE À MAX ».

**Gags du jour 3** (`assets/examples/coup_etat_mobutu.js`) : `kneel(c,a)` (foule à genoux sur le passage du chef), `cry(c,t,seed)` (fontaines de larmes « de joie »), cage qui tombe sur celui qui ne pleure pas, toque en léopard (texture `leopard`), bannière à bord léopard, arche de mariage, caisse « EXPORT · FRAGILE », radio qui grésille, ballon de foot.

**Extrait audio mème** fourni par l'utilisateur : ne jamais le mettre dans le texte ElevenLabs. Après `align.py` (sortie `words_raw.json`), insère-le dans les pauses avec :
`python3 -I scripts/insert_clip.py voix_eleven.mp3 clip.mp4 words_raw.json voix.mp3 words.json "Le football il a changé" 24.72 end`
puis cale les plans sur les instants affichés (les segments après une insertion sont décalés de la durée affichée). Image du clip non utilisée (personne réelle) : son seul.

**Chanson / musique sous la voix** (jour 4) : un extrait chanté fourni par l'utilisateur peut jouer PENDANT la narration (sans la couper) : mixe-le dans `voix.mp3` avant le rendu, ~0,55 de volume, fondu entrée 0,3 s / sortie 0,7 s, calé sur le passage concerné (ex. « Tous les matins, le village chante son nom ») :
`ffmpeg -i vins.wav -i song.wav -filter_complex "[1:a]atrim=0:7.1,asetpts=PTS-STARTPTS,afade=t=in:d=0.3,afade=t=out:st=6.4:d=0.7,volume=0.55,adelay=33000|33000[s];[0:a][s]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95[o]" -map "[o]" voix.mp3`
Un extrait PARLÉ (réplique) se place au contraire dans une pause (insert_clip.py, ou à la main avec un silence après pour laisser l'action se jouer : ex. « Je suis désolé mon roi bien-aimé » → 1,3 s pour « NON. » + cage).

**Humiliation / culte (jour 4, `assets/examples/culte_personnalite.js`)** : `prostrate(c,a)` (face contre terre), `kneel` + `cry`, le chef porté sur un trône par 4 porteurs, sujets qui l'éventent avec des feuilles, statue géante plus haute que la montagne (montagne « CONVOQUÉE »), affiches/pièces/tasses/salle de bain à son effigie, sujet qui implore puis « NON. » + cage.

**Sons** (`sfx`) : `static` (radio), `drums` (soldats qui marchent), `scratch` (rayure de disque), `splat` (tarte), `boing` (absurde), `poof`, `clang` (cage), `chime`, `thud` (auto sur les tampons).

**Limites** : humour noir sur le pouvoir, oui ; violence graphique, cibles réelles, moqueries de groupes, non.

## 3. Miniature
Fond rendu à part (copie du projet sans `words.json`, `SIZE=1080x1920`), puis `scripts/thumbnail.py` : titre = le concept en 1 mot, accroche = la punchline la plus absurde (« Élu avec 100 % | des voix (la sienne) »).
