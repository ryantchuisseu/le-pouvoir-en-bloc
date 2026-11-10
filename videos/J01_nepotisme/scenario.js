// J01 — Le népotisme (voix off ElevenLabs, 56,8 s ; sous-titres depuis words.json)
export default function(E){
const {THREE,V,pose,hide,title,line,tally,ease,easeOutBack,lerp,clamp,faceTo,crowdLookPodium,makeChar,textSprite,box,M,
  maxCivil,crowd,qMarks,checkMark,confetti}=E;
E.HL=['népotisme','théo','famille','neveu','nipote','compétence','2017'];
E.ballot.visible=false;

// --- cast ---
const lea=makeChar({skin:'#c68642',hair:'#2b1b0e',shirt:'#e67e22',pants:'#37474f',eye:'#2a5a2a'});
{const h=new THREE.Mesh(new THREE.BoxGeometry(.52,.62,.1),E.noiseMat('#2b1b0e',.1));h.position.set(0,.2,-.27);lea.head.add(h);}
const theo=makeChar({skin:'#e0ac69',hair:'#f2c14e',shirt:'#8e44ad',pants:'#1a1a1a',glasses:true,cap:'#c62020'});
const pope=makeChar({skin:'#e0b48e',hair:'#dddddd',beard:true,shirt:'#f4f4f4',sleeve:'#f4f4f4',longSleeve:true,pants:'#f4f4f4',shoes:'#c62020',buttons:'#e8b830'});
{const m=new THREE.Mesh(new THREE.BoxGeometry(.36,.5,.36),E.noiseMat('#f7f7f2',.05));m.position.y=.72;pope.head.add(m);
 const g=new THREE.Mesh(new THREE.BoxGeometry(.1,.5,.38),M.gold);g.position.y=.72;pope.head.add(g);}
const nephew=makeChar({skin:'#f1c27d',hair:'#5a3a1a',shirt:'#b01818',sleeve:'#b01818',longSleeve:true,pants:'#b01818',cap:'#b01818'});
const tagLea=textSprite('Léa'), tagTheo=textSprite('Théo'), tagNeveu=textSprite('Neveu de Max',{color:'#ffd23f'});
const tagPope=textSprite('Pape'), tagNephew=textSprite('Son neveu',{color:'#ffd23f'});
const checks=[0,1,2,3,4].map(()=>textSprite('✔',{font:'bold 90px sans-serif',color:'#4cd137',bg:null,scale:.008}));
const sComp=textSprite('COMPÉTENCE',{font:'72px VT',color:'#4cd137',bg:'rgba(0,0,0,.55)',scale:.0036});
const sFam=textSprite('FAMILLE',{font:'72px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.55)',scale:.0036});
const bC=sComp.scale.clone(), bF=sFam.scale.clone(), bK=checks[0].scale.clone();

// --- treasury chest on the podium + emeralds ---
const chest=new THREE.Group(); chest.position.set(2.1,.9,-4.7); E.scene.add(chest);
box(.9,.55,.6,M.planks,0,.275,0,chest); box(.12,.16,.06,M.gold,0,.42,.31,chest);
const lid=new THREE.Group(); lid.position.set(0,.55,-.3); chest.add(lid); box(.92,.2,.62,M.planks,0,.1,.3,lid);
const emMat=new THREE.MeshLambertMaterial({color:'#2ee86b',emissive:'#0b5a26'});
const ems=[]; {const r=E.rng(5); for(let i=0;i<18;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.16,.22,.16),emMat);m.rotation.set(.6,.6,0);m.castShadow=true;
  m.userData={a:r()*6.28,h:r(),sp:.6+r()*.8,dx:(r()-.5)*2.2,dz:(r()-.5)*1.6+1,ph:r()};E.scene.add(m);ems.push(m);}}
function hideEms(){ems.forEach(m=>m.visible=false);}

// --- church (for the popes) ---
{const g=new THREE.Group(); g.position.set(22,0,-6); g.rotation.y=-Math.PI/2; E.scene.add(g);
 box(7,5,6,E.texRepeat(M.stone,4,3),0,2.5,0,g);
 for(let i=0;i<4;i++) box(7.4-i*1.6,.6,6.4,E.texRepeat(M.cobble,4,1),0,5.3+i*.6,0,g);
 box(2.2,9,2.2,E.texRepeat(M.stone,2,5),0,4.5,-2.4,g); box(2.6,.5,2.6,M.cobble,0,9.2,-2.4,g);
 box(.25,1.4,.25,M.gold,0,10.1,-2.4,g); box(.9,.25,.25,M.gold,0,10.3,-2.4,g);
 box(1.6,2.6,.12,new THREE.MeshLambertMaterial({color:'#3a2414'}),0,1.3,3.02,g);
 const sg=E.pixTex(16,(c)=>{const cols=['#c62020','#2b4f9e','#e8b830','#2ea44f','#8e44ad'];for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.hypot(x-7.5,y-7.5);c.fillStyle=d>7.5?'rgba(0,0,0,0)':cols[(Math.floor(d)+((x+y)&1))%5];c.fillRect(x,y,1,1);}});
 const w=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.8),new THREE.MeshBasicMaterial({map:sg,transparent:true})); w.position.set(0,3.8,3.03); g.add(w);
 box(3,.2,1.4,M.carpet,0,.1,3.7,g);}

const LEA_FRONT=[-1.1,-1.2], THEO_FRONT=[1.1,-1.2];
const podMax=(u,o={})=>{pose(maxCivil,{x:-.6,y:.9,z:-4.3,t:u,...o});};
const B=(k,f)=>[k,f];
const boards={
 title:B('title',g=>{title(g,'NÉPOTISME',200,190);line(g,'EXPLIQUÉ EN 60 SECONDES',380,64,'#555');}),
 village:B('village',g=>{title(g,'VILLAGE CUBE',110,120);line(g,'CHEF : MAX',260,90);line(g,'POP. : 42 HABITANTS',380,64,'#555');}),
 recrute:B('recrute',g=>{title(g,'ON RECRUTE !',110,130);line(g,'POSTE : TRÉSORIER',270,84);line(g,'AIDEZ LE VILLAGE',390,64,'#555');}),
 tres:B('tres',g=>{title(g,'NOUVEAU TRÉSORIER',110,104);line(g,'. . .',300,120,'#555');}),
 def:B('def',g=>{title(g,'NÉPOTISME',90,130);line(g,'DONNER LE POSTE',230,80);line(g,'À SA FAMILLE,',320,80);line(g,'PAS À CELUI QUI LE MÉRITE',440,64,'#a8322c');}),
 nipote:B('nipote',g=>{title(g,'« NIPOTE »',150,150);line(g,'(ITALIEN)',270,60,'#777');line(g,'= LE NEVEU',400,110,'#2b4f9e');}),
 today:B('today',g=>{title(g,"AUJOURD'HUI",110,120);line(g,'EN POLITIQUE',270,90);line(g,'EN ENTREPRISE',390,90);}),
 france:B('france',g=>{title(g,'FRANCE · 2017',100,116);line(g,'UN MINISTRE PEUT-IL',240,70);line(g,'EMBAUCHER SA FAMILLE',330,70);line(g,'COMME COLLABORATEUR ?',420,70);}),
};
const leaStats=[u=>'stats'+Math.min(3,(u*3)|0), u=>g=>{title(g,'CANDIDATE : LÉA',90,104);g.textAlign='left';g.fillStyle='#333';g.font='76px VT';
  g.fillText('FORMATION :',80,250);tally(g,520,222,Math.min(3,(u*3)|0),60);g.fillText('ANS',700,250);
  g.fillText('ERREURS :',80,380);g.fillStyle='#2ea44f';g.font='110px VT';g.fillText('0',520,380);g.textAlign='center';}];
const WIDE={cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,3.2,-4),V(0,3.6,-4.5)]};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};

const SH=[
 {d:2.97,cap:[],board:boards.title,cam:[V(1.6,3,7.5),V(1.2,3,5.4)],look:[V(0,2.4,-4),V(0,2.6,-4)],
  run(u){podMax(u,{wave:1});pose(theo,{x:.7,y:.9,z:-4.3,t:u,armsUp:.4});crowdLookPodium(u);}},
 {d:2.27,cap:[],board:boards.village,cam:[V(-9,7.5,13),V(-7,6.5,10.5)],look:[V(0,1.5,-3),V(0,1.8,-3)],
  run(u){podMax(u,{wave:.6});crowdLookPodium(u);}},
 {d:1.89,cap:[],board:boards.recrute,...BOARD,run(u){podMax(u,{point:1});}},
 {d:1.25,cap:[],board:boards.recrute,cam:[V(4.2,1.9,3.6),V(3.6,1.8,2.9)],look:[V(2.4,1.3,-1.2),V(2,1.3,-1.2)],
  run(u){const k=ease(u/1.1);const x=lerp(6,1.2,k);pose(lea,{x,z:-1.2,ry:k<1?-Math.PI/2:0,walk:k<1?u:-1,t:u});tagLea.visible=true;tagLea.position.set(x,2.55,-1.2);}},
 {d:2.93,cap:[],board:leaStats,...BOARD,run(u){podMax(u);}},
 {d:1.60,cap:[],board:leaStats,cam:[V(1.2,4.4,9.4),V(1,4.1,8.4)],look:[V(0,1.2,2.4),V(0,1.2,2.4)],sfx:[['chime',.15]],
  run(u){crowdLookPodium(u,i=>({armsUp:i%2==0?.6:0}));
   [0,1,2,3,4].forEach(i=>{const c=crowd[[0,2,4,6,8][i]];const s=easeOutBack((u-.1-i*.08)/.25);if(s<=0)return;checks[i].visible=true;
     checks[i].position.set(c.root.position.x,2.7,c.root.position.z);checks[i].scale.set(bK.x*s,bK.y*s,1);});}},
 {d:1.44,cap:[],board:leaStats,cam:[V(-4.2,1.9,3.6),V(-3.6,1.8,2.9)],look:[V(-2.4,1.3,-1.2),V(-2,1.3,-1.2)],chat:[['Théo a rejoint le village.',.15]],
  run(u){const k=ease(u/1.2);const x=lerp(-6,-1.2,k);pose(theo,{x,z:-1.2,ry:k<1?Math.PI/2:0,walk:k<1?u:-1,t:u});tagTheo.visible=true;tagTheo.position.set(x,2.7,-1.2);}},
 {d:1.29,cap:[],board:leaStats,cam:[V(1.8,1.3,.6),V(1.1,1.5,-.6)],look:[V(0,3,-4.6),V(0,3.2,-4.6)],
  run(u){podMax(u,{point:1,ry:.6});pose(theo,{x:.6,y:.9,z:-4.3,t:u,armsUp:.5});tagNeveu.visible=true;tagNeveu.position.set(.6,3.55,-4.3);}},
 {d:2.78,cap:[],board:leaStats,cam:[V(1.1,2.5,-1),V(.8,2.45,-1.8)],look:[V(.6,2.1,-4.3),V(.6,2.1,-4.3)],
  run(u){pose(theo,{x:.6,y:.9,z:-4.3,t:u,point:.7});podMax(u);
   ems.slice(0,8).forEach((m,i)=>{const a=u*2.2+i*Math.PI/4;m.visible=true;m.position.set(.6+Math.cos(a)*.9,2.1+Math.sin(u*3+i)*.25,-4.3+Math.sin(a)*.9);m.rotation.y=u*3+i;});}},
 {d:1.70,cap:[],board:boards.tres,...WIDE,
  run(u){podMax(u);pose(theo,{x:.7,y:.9,z:-4.3,t:u});pose(lea,{x:-.4,z:-1.4,ry:Math.PI,t:u});crowdLookPodium(u);
   [0,1,2,3,4].forEach(i=>{const c=crowd[i*2];qMarks[i].visible=true;qMarks[i].position.set(c.root.position.x,2.75+Math.sin(u*6+i)*.08,c.root.position.z);});}},
 {d:0.68,cap:[],board:boards.tres,stamp:['THÉO',.02],...BOARD,run(u){podMax(u);pose(theo,{x:.7,y:.9,z:-4.3,t:u,armsUp:1});}},
 {d:1.66,cap:[],board:boards.def,mood:'dark',cam:[V(0,5,1.2),V(0,5.1,.3)],look:[V(0,5.2,-6.4),V(0,5.25,-6.4)],run(u){}},
 {d:3.44,cap:[],board:boards.def,...WIDE,
  run(u){podMax(u,{wave:.5});pose(theo,{x:.7,y:.9,z:-4.3,t:u,armsUp:.6});pose(lea,{x:-.4,z:-1.4,ry:Math.PI,t:u,headTilt:.35});crowdLookPodium(u);}},
 {d:2.98,cap:[],board:boards.def,cam:[V(.9,2.7,-1.4),V(1.2,2.45,-2.3)],look:[V(2.1,1.2,-4.7),V(2.1,1.3,-4.7)],
  run(u){lid.rotation.x=-1.6*ease(u/.3);pose(theo,{x:.1,y:.9,z:-4.5,ry:.6,t:u,armsUp:1});
   ems.forEach((m,i)=>{const d=m.userData;const k=((u*d.sp+d.ph)%1);m.visible=true;
     m.position.set(2.1+d.dx*k,1.5+k*2.4-k*k*2.6,-4.7+d.dz*k);m.rotation.set(u*4+i,u*3,0);});}},
 {d:1.66,cap:[],board:boards.def,cam:[V(-2.2,2.2,3.6),V(-1.8,2.2,4)],look:[V(1,1.3,0),V(4,1.3,4.5)],chat:[['Léa a quitté le village.',.4]],
  run(u){const k=u/1.66;const x=lerp(1,5,k),z=lerp(-.5,5.5,k);pose(lea,{x,z,ry:faceTo(1,-.5,5,5.5),walk:u,t:u,headTilt:.3});tagLea.visible=true;tagLea.position.set(x,2.55,z);}},
 {d:3.53,cap:[],board:boards.def,cam:[V(3,3.6,8),V(2.6,3.3,7)],look:[V(0,1,2.5),V(0,1,2.5)],
  run(u){crowdLookPodium(u,i=>({headTilt:.6}));[0,1,2].forEach(i=>{const c=crowd[i*3+1];qMarks[i].visible=true;qMarks[i].position.set(c.root.position.x,2.75,c.root.position.z);});}},
 {d:3.12,cap:[],board:boards.nipote,...BOARD,run(u){podMax(u);}},
 {d:5.17,cap:[],board:boards.nipote,cam:[V(12.6,2.6,1.4),V(14.2,2.3,-.2)],look:[V(18.6,2.4,-5.8),V(18.4,2.3,-5.8)],
  run(u){pose(pope,{x:17.3,z:-4.9,ry:faceTo(17.3,-4.9,13,1)+.3,t:u,point:u>1.2?1:0});pose(nephew,{x:18.5,z:-6.9,ry:faceTo(18.5,-6.9,17.3,-4.9),t:u,armsUp:u>1.6?1:0});
   tagPope.visible=true;tagPope.position.set(17.3,3.25,-4.9);tagNephew.visible=true;tagNephew.position.set(18.5,2.7,-6.9);}},
 {d:3.59,cap:[],board:boards.today,...BOARD,run(u){podMax(u);pose(theo,{x:.7,y:.9,z:-4.3,t:u});}},
 {d:5.40,cap:[],board:boards.france,stamp:['INTERDIT',2.75],cam:[V(0,3.6,2.2),V(0,4,.4)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)],run(u){}},
 {d:3.81,cap:[],board:boards.def,mood:'final',cam:[V(0,2,6.4),V(0,1.9,5.4)],look:[V(0,1.4,-1.2),V(0,1.4,-1.2)],
  run(u){pose(lea,{x:LEA_FRONT[0],z:LEA_FRONT[1],t:u});pose(theo,{x:THEO_FRONT[0],z:THEO_FRONT[1],t:u});podMax(u,{cross:1});
   tagLea.visible=true;tagLea.position.set(-1.1,2.55,-1.2);tagTheo.visible=true;tagTheo.position.set(1.1,2.7,-1.2);
   qMarks[0].visible=true;qMarks[0].position.set(0,2.9+Math.sin(u*5)*.08,-1.2);}},
 {d:2.44,cap:[],board:boards.def,cam:[V(0,1.95,5.3),V(0,1.9,4.8)],look:[V(0,1.5,-1.2),V(0,1.5,-1.2)],sfx:[['chime',0]],
  run(u){pose(lea,{x:-1.1,z:-1.2,t:u,armsUp:u<.9?.7:0});pose(theo,{x:1.1,z:-1.2,t:u,armsUp:u>.9?.7:0});podMax(u,{cross:1});
   const a=easeOutBack(u/.25);sComp.visible=true;sComp.position.set(-1.1,2.85,-1.2);sComp.scale.set(bC.x*a,bC.y*a,1);
   if(u>.88){const b=easeOutBack((u-.88)/.25);sFam.visible=true;sFam.position.set(1.1,2.85,-1.2);sFam.scale.set(bF.x*b,bF.y*b,1);}}},
];
return SH.map(x=>({...x,run:u=>{hideEms();lid.rotation.x=0;x.run(u);}}));
}
