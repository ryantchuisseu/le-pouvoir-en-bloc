// J06 — L'autocratie (hook « NOOON tape pas contre le mur », « Tu n'es pas avec nous », « Ton ennemi n'est pas loin »)
export default function(E){
const {THREE,V,pose,poof,title,line,ease,easeOutBack,lerp,clamp,faceTo,makeChar,textSprite,box,M,cage}=E;
E.HL=['mur','autocratie','seul','parlement','juge','discute','général','inutile','soir','accord','avec','grec','pouvoir','fauteuil','ennemis','ennemi','toi'];
E.ballot.visible=false;
const SK=['#5a3a24','#4a2f1d','#6b4429','#3d2616','#7a4e30','#553320','#45291a','#6e472b','#3a2414'];
const leopard=E.pixTex(16,(g)=>{g.fillStyle='#e0a83a';g.fillRect(0,0,16,16);const r=E.rng(8);
  for(let i=0;i<14;i++){const x=r()*15|0,y=r()*15|0;g.fillStyle='#3a2410';g.fillRect(x,y,2,2);g.fillStyle='#c48a26';g.fillRect(x+1,y+1,1,1);}});
const gen=makeChar({skin:'#4a2f1d',hair:'#1a1008',shirt:'#3d4a2c',sleeve:'#3d4a2c',longSleeve:true,pants:'#2f3a22',glasses:true,epaulettes:true,buttons:'#e8b830',belt:'#181818',badge:'#e8b830',cape:'#8d1d1d'});
const toque=new THREE.Mesh(new THREE.BoxGeometry(.6,.42,.6),new THREE.MeshLambertMaterial({map:leopard}));toque.position.y=.66;gen.head.add(toque);
const crown=new THREE.Group();gen.head.add(crown);box(.58,.18,.58,M.gold,0,.56,0,crown);for(const [x,z] of [[-.22,-.22],[.22,-.22],[-.22,.22],[.22,.22],[0,.25]])box(.1,.18,.1,M.gold,x,.72,z,crown);
const laurel=new THREE.Group();gen.head.add(laurel);{const G=new THREE.MeshLambertMaterial({color:'#3f8f2f'});box(.62,.1,.08,G,0,.52,.28,laurel);box(.62,.1,.08,G,0,.52,-.28,laurel);box(.08,.1,.6,G,.29,.52,0,laurel);box(.08,.1,.6,G,-.29,.52,0,laurel);}
const sash=new THREE.Mesh(new THREE.BoxGeometry(.52,.14,.27),new THREE.MeshLambertMaterial({color:'#2ea44f'}));sash.position.set(0,1.2,0);sash.rotation.z=.6;gen.body.add(sash);
function hat(k){toque.visible=k==='toque';crown.visible=k==='crown';laurel.visible=k==='laurel';sash.visible=k==='sash';}
const MIN=['#22252b','#2c3e50','#3b2f2f','#1f3a3d','#2d2d44','#3a3a3a'];
const ministers=MIN.map((c,i)=>makeChar({skin:SK[i+1],hair:'#140c06',shirt:c,sleeve:c,longSleeve:true,pants:c,collar:'#ffffff'}));
const crowd=SK.map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:['#d64a3a','#4caf50','#f2b134','#8e44ad','#e67e22','#16a085','#e84393','#2980b9','#c0392b'][i],pants:'#2d3436'}));
const ALL=[gen,...ministers,...crowd];

const props=[];const P=o=>{props.push(o);return o;};
const wall=P(new THREE.Group());wall.position.set(5,0,8);E.scene.add(wall);box(4,3.2,.6,E.texRepeat(M.bricks,4,3),0,1.6,0,wall);
const table=P(new THREE.Group());table.position.set(0,0,1.6);E.scene.add(table);box(1.4,.12,3.8,M.planks,0,.85,0,table);
for(const [x,z] of [[-.6,-1.8],[.6,-1.8],[-.6,1.8],[.6,1.8]])box(.12,.85,.12,M.log,x,.42,z,table);
const chairs=[];for(let i=0;i<6;i++){const g=new THREE.Group();const x=i<3?-1.15:1.15,z=.6+(i%3)*1;g.position.set(x,0,z);E.scene.add(g);box(.55,.08,.55,M.planks,0,.5,0,g);box(.08,.5,.08,M.log,0,.25,0,g);chairs.push(P(g));}
const throneSeat=P(new THREE.Group());throneSeat.position.set(0,0,-.7);E.scene.add(throneSeat);box(.9,.12,.8,M.gold,0,.5,0,throneSeat);box(.9,1.5,.12,M.gold,0,1.2,-.36,throneSeat);box(.1,.5,.8,M.gold,-.45,.75,0,throneSeat);box(.1,.5,.8,M.gold,.45,.75,0,throneSeat);
const tagGen=textSprite('LE GÉNÉRAL',{font:'64px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.0058});
const tagMin=textSprite('Ministre de la Logique');
const sSame=textSprite('MÊME FAUTEUIL',{font:'80px VT',color:'#ffd23f',bg:'rgba(0,0,0,.6)',scale:.0055});
const sEnn=crowd.map(()=>textSprite('ENNEMI ?',{font:'60px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.55)',scale:.0045}));
const sBang=textSprite('BONK',{font:'110px VT',color:'#ffd23f',bg:null,scale:.006});
const sStars=[0,1,2].map(()=>textSprite('✦',{font:'bold 90px sans-serif',color:'#ffd23f',bg:null,scale:.004}));
function hideAll(){props.forEach(o=>o.visible=false);ALL.forEach(c=>{c.root.rotation.x=0;});hat('toque');}
function sit(c){c.root.position.y-=.25;c.legL.rotation.x=-1.5;c.legR.rotation.x=-1.5;}
function kneel(c){c.root.position.y-=.55;c.legL.rotation.x=1.45;c.legR.rotation.x=1.45;c.head.rotation.x=.35;}
// council layout
const seat=i=>({x:i<3?-1.15:1.15,z:.6+(i%3)*1,ry:i<3?Math.PI/2:-Math.PI/2});
function council(u,o={}){table.visible=true;throneSeat.visible=true;chairs.forEach(c=>c.visible=true);
  pose(gen,{x:0,y:.12,z:-.7,t:u,...(o.gen||{})});if(!o.standGen)sit(gen);
  ministers.forEach((m,i)=>{if(o.skip&&o.skip.includes(i))return;const s=seat(i);pose(m,{x:s.x,z:s.z,ry:s.ry,t:u+i,...((o.min&&o.min(i))||{})});if(!(o.stand&&o.stand.includes(i)))sit(m);});}
// head-banging minister
function bang(u,cx=5,cz=8.75){wall.visible=true;const m=ministers[2];pose(m,{x:cx,z:cz,ry:Math.PI,t:u,armsUp:.25});const ph=(u*1.8)%1;m.root.rotation.x=-(ph<.25?ph/.25:Math.max(0,1-(ph-.25)/.75))*.45;
  const c=ministers[4];pose(c,{x:cx+.8,z:cz+.45,ry:faceTo(cx+.8,cz+.45,cx,cz),t:u,armsUp:.8});
  if(ph<.18){sBang.visible=true;sBang.position.set(cx+.35,2.4,cz-.1);}sStars.forEach((s,i)=>{s.visible=true;const a=u*6+i*2.1;s.position.set(cx+Math.cos(a)*.35,2.25,cz-.15+Math.sin(a)*.2);});}
const B=(k,f)=>[k,f];
const bd={
 auto:B('auto',g=>{title(g,'AUTOCRATIE',200,180);line(g,'MODE D\'EMPLOI',380,70,'#555');}),
 def:B('def',g=>{title(g,'AUTOCRATIE',100,130);line(g,'UN SEUL HOMME',250,90);line(g,'TOUT LE POUVOIR',370,90,'#a8322c');}),
 pas:[t=>'p'+(t>10.87)+(t>11.83)+(t>12.65),t=>g=>{title(g,'ICI, IL N\'Y A PAS DE…',90,90);
   [['PARLEMENT',10.87],['JUGE',11.83],['« ON EN DISCUTE »',12.65]].forEach(([s,at],i)=>{if(t>at){line(g,s,220+i*110,84);g.strokeStyle='#c62020';g.lineWidth=12;g.beginPath();g.moveTo(230,206+i*110);g.lineTo(794,206+i*110);g.stroke();}});}],
 ordre:[t=>'o'+(t>15.64)+(t>18.17)+(t>19.79),t=>g=>{title(g,'CONSEIL DES MINISTRES',80,90);g.textAlign='left';g.font='68px VT';
   [['ORDRE DU JOUR : SES IDÉES',15.64,'#333'],['DURÉE : 30 SECONDES',18.17,'#333'],['VOTE : INUTILE',19.79,'#a8322c']].forEach(([s,at,c],i)=>{if(t>at){g.fillStyle=c;g.fillText(s,80,210+i*110);}});g.textAlign='center';}],
 loi:[t=>'l'+(t>22.29)+(t>23.33)+(t>24.6),t=>g=>{title(g,'LOI N° 412',80,110);g.textAlign='left';g.font='72px VT';
   [['MATIN : ÉCRITE',22.29,'#333'],['APRÈS-MIDI : APPLIQUÉE',23.33,'#2ea44f'],['SOIR : CHANGÉE',24.6,'#a8322c']].forEach(([s,at,c],i)=>{if(t>at){g.fillStyle=c;g.fillText(s,90,220+i*110);}});g.textAlign='center';}],
 grec:B('grec',g=>{title(g,'MOT GREC',90,110);line(g,'AUTOS = SOI-MÊME',230,90);line(g,'KRATOS = POUVOIR',340,90);line(g,'= LE POUVOIR D\'UN SEUL',460,64,'#a8322c');}),
};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const COUNCIL={cam:[V(3.6,3.4,6),V(3,3.1,5)],look:[V(0,1,1),V(0,1,1)]};
const T=[0,2.67,5.56,7.6,10.87,14.32,15.64,21.38,25.81,27.0,29.19,30.42,36.54,39.67,44.31,47.07,50.24,52.25,54.53,56.6,64.6];
const specs=[
 /*0 HOOK: head against the wall*/ {sfx:[['thud',.15],['thud',.7],['thud',1.25],['thud',1.8]],cam:[V(8.6,2,9.6),V(8.1,1.95,9.4)],look:[V(5,1.7,8.6),V(5,1.7,8.6)],run(u){bang(u);tagMin.visible=true;tagMin.position.set(5,2.75,8.75);}},
 /*1 why? pull back, the General on his throne behind*/ {cam:[V(8.1,1.95,9.4),V(9,3.4,13)],look:[V(5,1.7,8.6),V(3,1.8,6)],run(u){bang(u+1.1);pose(gen,{x:1.4,z:6.2,ry:faceTo(1.4,6.2,5,8.5),t:u,cross:1});tagGen.visible=true;tagGen.position.set(1.4,2.75,6.2);}},
 /*2 because autocracy*/ {board:bd.auto,...BOARD,run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,cross:1});}},
 /*3 definition*/ {board:bd.def,...BOARD,run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,armsUp:1});}},
 /*4 no parliament, no judge, no discussion*/ {board:bd.pas,cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 /*5 council meeting*/ {...COUNCIL,run(u){council(u);tagGen.visible=true;tagGen.position.set(0,2.8,-.7);}},
 /*6 agenda*/ {board:bd.ordre,...BOARD,run(u){}},
 /*7 law morning/afternoon/evening*/ {board:bd.loi,...BOARD,run(u){}},
 /*8 hence the wall*/ {sfx:[['thud',.15],['thud',.7]],cam:[V(8.3,2,9.5),V(8.1,1.95,9.4)],look:[V(5,1.7,8.6),V(5,1.7,8.6)],run(u){bang(u);}},
 /*9 one day a minister dares*/ {...COUNCIL,run(u){council(u,{stand:[4],min:i=>i==4?{armsUp:u>1?.6:0}:{}});}},
 /*10 « I disagree »*/ {cam:[V(-.4,2.6,4.6),V(-.2,2.5,4.1)],look:[V(1.15,1.7,1.6),V(1.15,1.7,1.6)],run(u){council(u,{stand:[4],min:i=>i==4?{point:1}:{headTilt:.3}});}},
 /*11 CLIP « Tu n'es pas avec nous » → cage*/ {sfx:[['scratch',.05],['clang',5.5]],cam:[V(.8,2.3,4.6),V(.3,2.4,2.2)],look:[V(0,1.9,-.7),V(0,2.3,-.7)],
   run(u){const st=ease((u-.3)/1.2);council(u,{standGen:u>.3,gen:u>.3?{point:u>2?1:0}:{},stand:[4],min:i=>i==4?{headTilt:.2}:{}});if(u>.3){gen.root.position.y=.12;}
     E.jail.position.set(1.15,0,2.6);cage.position.y=3.2*(1-ease((u-5.3)/.3));}},
 /*12 he's not a minister anymore — not here at all*/ {sfx:[['poof',1.4]],chat:[['Ministre_5 a quitté le conseil.',1.5],['Général : quel ministre ?',2.4,'#ff9f43']],...COUNCIL,
   run(u){council(u,{skip:u>1.4?[4]:[],stand:[4]});E.jail.position.set(1.15,0,2.6);cage.position.y=u<1.4?0:3.2;poof(V(1.15,0,2.6),u-1.4,9);}},
 /*13 greek*/ {board:bd.grec,...BOARD,run(u){}},
 /*14 power of oneself over everyone*/ {cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,2.2,-2),V(0,2.6,-3)],run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,armsUp:1});E.crowdSpots.forEach(([x,z],i)=>{pose(crowd[i],{x,z,ry:faceTo(x,z,0,-4.2),t:u});kneel(crowd[i]);});}},
 /*15 king, emperor or president: costume changes*/ {sfx:[['boing',0],['boing',.85],['boing',1.65]],cam:[V(.5,2.5,-1.6),V(.4,2.5,-2)],look:[V(0,2.4,-4.3),V(0,2.4,-4.3)],
   run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,wave:1});hat(u<.85?'crown':u<1.65?'laurel':u<2.4?'sash':'toque');if(u>=1.65&&u<2.4)toque.visible=false;}},
 /*16 the armchair stays the same*/ {cam:[V(1.2,1.7,2.4),V(1,1.6,2)],look:[V(0,1.1,-.7),V(0,1.1,-.7)],run(u){throneSeat.visible=true;pose(gen,{x:0,y:.12,z:-.7,t:u,cross:1});sit(gen);sSame.visible=true;sSame.position.set(0,2.6,-.5);}},
 /*17 enemies everywhere*/ {cam:[V(1.6,3.4,7.6),V(1.3,3.2,6.6)],look:[V(0,1.4,2.4),V(0,1.4,2.4)],run(u){E.crowdSpots.forEach(([x,z],i)=>{pose(crowd[i],{x,z,ry:faceTo(x,z,0,-4.2),t:u});if(u>i*.18){sEnn[i].visible=true;sEnn[i].position.set(x,2.7,z);}});}},
 /*18 even you, watching*/ {mood:'final',cam:[V(0,1.85,5.6),V(0,1.82,4.6)],look:[V(0,1.6,1.4),V(0,1.75,2.2)],run(u){const k=ease(u/1.6);pose(gen,{x:0,z:lerp(0,2.2,k),t:u,walk:k<1?u:-1,point:u>1.6?1:0});}},
 /*19 CLIP « ton ennemi n'est pas loin » — slow zoom on the glasses, then back to the wall*/ {cam:[V(0,1.82,4.6),V(0,1.98,3.1)],look:[V(0,1.75,2.2),V(0,1.95,2.2)],
   run(u){pose(gen,{x:0,z:2.2,t:u,point:u<1.2?1:0,headTilt:-.05});if(u>7.4){/*loop hint*/}}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideAll();E.jail.position.set(-6,0,4);cage.visible=true;s.run(u,T[i]+u);}}));
}
