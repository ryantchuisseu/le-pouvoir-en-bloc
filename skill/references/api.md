# API du scénario

`scenario.js` exporte une fonction qui reçoit `E` (le moteur) et renvoie **la liste des plans**.

```js
export default function(E){
  const {V,pose,hide,poof,title,line,tally,ease,easeOutBack,lerp,clamp,faceTo,crowdLookPodium,
         maxCivil,maxMil,guards,crowd,tagMax,qMarks,checkMark,confetti,makeChar,textSprite}=E;
  // les personnages et sprites créés ici sont cachés par défaut à chaque image
  const banker = makeChar({shirt:'#222',pants:'#222',glasses:true,cap:'#111'});
  const tagBanker = textSprite('Banquier');
  return [ /* plans */ ];
}
```

Chaque image : le moteur cache tout (personnages, sprites, confettis, fumée, tampon), puis appelle `run(u)` du plan courant. Il faut donc **tout re-positionner dans `run` à chaque image**, ce qui garantit un rendu déterministe.

## Champs d'un plan

| Champ | Type | Rôle |
|---|---|---|
| `d` | s | Durée (2,2 à 3 s) |
| `cap` | `string[]` | Segments de sous-titre, qui se partagent `d` à parts égales |
| `cam` | `[V,V]` | Position de la caméra au début et à la fin (interpolée) |
| `look` | `[V,V]` | Point visé au début et à la fin |
| `board` | `[key, draw]` ou `null` | Contenu du panneau central. `null` reprend le dernier panneau défini. `key` et `draw` peuvent être des fonctions de `u`, pour animer (ex. un compteur). `draw` à `null` réutilise le dessin du même `key` défini plus tôt. |
| `stamp` | `[texte, u]` | Tampon rouge plaqué sur le panneau à l'instant `u`, avec tremblement et « thud » |
| `chat` | `[[texte,u,couleur?]]` | Message en bas à gauche, façon chat du jeu (jaune par défaut) |
| `sfx` | `[[clé,u]]` | `chime`, `clang`, `poof`, `thud`, `whoosh` |
| `run(u)` | fn | Place les personnages et effets (`u` = temps local en s) |

Ajoutés automatiquement : fondu d'entrée et de sortie, « whoosh » à chaque coupe, « pop » à chaque segment de sous-titre, vignettage, léger mouvement de caméra à l'épaule.

## Dessiner le panneau (canvas 1024×540, fond papier)

```js
board:['def', g=>{ title(g,'DICTATURE',85,116);              // texte, y, taille, couleur (rouge par défaut)
                   line(g,'UN SEUL CHEF',210);               // texte, y, taille=72, couleur='#333'
                   line(g,'AUCUNE FIN',480,72,'#a8322c'); }]
// compteur animé :
board:[u=>'k'+Math.min(12,u*7|0), u=>g=>{ title(g,'VOTES'); tally(g,260,180,Math.min(12,u*7|0)); }]
```
`tally(g,x,y,n,h=46)` dessine des bâtons groupés par 5. Pour une ligne surlignée : `g.fillStyle='rgba(240,210,80,.45)'; g.fillRect(40,y-48,944,96)`.

## Carte du monde (y = 0 au sol, le panneau fait face à +z)

| Élément | Position |
|---|---|
| Place en pierre | 28×28 centrée en (0,0) |
| **Estrade** | Les personnages se tiennent en `y:.9, z:-4.3` (x de −2 à 2) |
| **Panneau central** | Centre (0, 4.5, −6.4), 7,2 × 3,8 |
| Lampes | x = ±2,9, z = −3 |
| Foule `crowd[0..8]` | `E.crowdSpots` : de (−3.2, 1.2) à (3, 3.7) ; `crowdLookPodium(u, opts|fn(i), exclusions)` |
| Urne | (2.8, 0, 0.6), haut ≈ 1,7 ; `ballotPaper` = bulletin |
| Prison | (−6, 0, 4) ; `cage.position.y` vaut 3,2 en haut et 0 une fois tombée |
| Statue (Max ×4,2) | `pose(statue,{x:9,y:2.3,z:-1,...})` + `plaque.visible=true` |
| Maison qui peut brûler | (−12, 0, −6) ; `fireGroup`, `smokes` |
| Autres maisons | (12,−8), (−12,8), (13,9), (−4,−14), (6,−15) |

## Cadrages éprouvés

| Plan | `cam` | `look` |
|---|---|---|
| Large estrade + foule de dos | V(0,2.6,10) → V(0,3,7.4) | V(0,3.2,-4) |
| Panneau plein cadre | V(0,3.7,1.6) → V(0,4,.3) | V(0,4.3,-6.4) |
| 3/4 sur l'orateur, au-dessus de la foule | V(1.6,3,7.5) → V(1.2,3,5.4) | V(0,2.4,-4) |
| Contre-plongée sur l'orateur | V(1.8,1.3,.6) → V(1.1,1.5,-.6) | V(0,3,-4.6) |
| Prison | V(-2.4,1.9,8.4) → V(-3.4,1.8,7.2) | V(-6,1.3,4) |
| Statue (panoramique vers le haut) | V(3.4,1.3,9.5) → V(3.9,1.5,8.6) | V(9,3.5,-1) → V(9,7.5,-1) |
| Urne | V(6,2.3,-.2) → V(5.2,2.1,0) | V(2.8,1.4,.9) |

## Personnages

`makeChar(options)` : personnage de 2 unités de haut. Options :
`skin, hair, eye, shirt, sleeve, longSleeve, pants, shoes, collar, buttons, belt, badge, glasses, beard, mask, cap, brim, peak (casquette d'officier), helmet, epaulettes, cape, paper (journal dans la main), stone (statue)`. Propriété `.scale` pour un géant.

Personnages fournis : `maxCivil`, `maxMil` (uniforme, lunettes noires, cape), `statue`, `journalist`, `guards[0..3]`, `crowd[0..8]` (`v42 = crowd[4]`).

`pose(c, {x,y,z, ry, t:u, walk:u|-1, wave, armsUp, point, cross, salute, headTilt})`
- `ry` : orientation ; utilise `faceTo(x,z,cibleX,cibleZ)`
- `walk` : passe `u` pour la marche (balancement des bras et des jambes) ; sinon le personnage respire au repos
- Les gestes (`wave`, `armsUp`, `point`, `cross`, `salute`) prennent une valeur de 0 à 1
- `hide(c)` cache un personnage

## Sprites et effets

- `textSprite(texte,{font,color,bg,scale})` : étiquette flottante. Positionne-la et rends-la visible dans `run`. Fournis : `tagMax`, `tagJourn`, `tag42`, `qMarks[0..4]` (« ? » jaunes), `checkMark` (✔ vert), `stampSprite` (« CENSURÉ »), `plaque`.
- `poof(V(x,0,z), u - t_début, seed)` : nuage de fumée (0,7 s) ; cache le personnage juste après.
- Confettis :
  ```js
  confetti.forEach(m=>{const d=m.userData,k=u-t0;m.visible=true;m.position.set(d.x+Math.sin(k*3+d.ph)*.3,d.y0-k*d.sp*2.2,d.z);m.rotation.set(k*5+d.ph,k*3,d.ph);});
  ```
- Feu : `fireGroup.visible=true; smokes.forEach(m=>m.visible=true);`
- Décors en plus (dans le corps de la fonction, hors de `run`) : `E.box(w,h,d,E.M.planks|stone|cobble|bricks|log|leaves|gold|glow|carpet|glass, x,y,z)`, `E.house(x,z,rot)`, `E.tree(x,z,h)`.

## Easing
`ease(x)` (in-out), `easeOutBack(x)` (rebond), `lerp`, `clamp`. Ces fonctions prennent un argument de 0 à 1, à calculer comme `(u-début)/durée`.
