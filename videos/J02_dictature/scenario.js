// J02 — Comment naît une dictature (version sarcastique, voix 83,7 s)
export default function(E){
const {THREE,V,pose,hide,poof,title,line,tally,ease,easeOutBack,lerp,clamp,faceTo,crowdLookPodium,makeChar,textSprite,box,M,
  maxCivil,maxMil,statue,plaque,journalist,guards,crowd,v42,tagMax,tagJourn,tag42,qMarks,checkMark,confetti,fireGroup,smokes,cage,ballotPaper}=E;
E.HL=['dictature','100','promis','annulées','reportées','prison','tartes','disparaissent','vie','statue','urgence','max'];

// ---------- pixel face of Max (posters, coins, pies, board) ----------
function drawFace(g,x,y,s){const P=(c,px,py,w=1,h=1)=>{g.fillStyle=c;g.fillRect(x+px*s,y+py*s,w*s,h*s);};
  P('#d2a07a',0,0,8,8);P('#2a2f27',0,0,8,2);P('#111',0,2,8,1);P('#2a1a10',0,3,1,1);P('#2a1a10',7,3,1,1);
  P('#111',1,3,6,2);P('#444',2,3);P('#444',5,3);P('rgba(80,30,20,.7)',3,6,2,1);P('#e8b830',3,1,2,1);}
const faceTex=E.pixTex(16,(g)=>{g.fillStyle='#e8e4da';g.fillRect(0,0,16,16);drawFace(g,4,3,1);g.fillStyle='#a8322c';g.fillRect(2,12,12,2);});
const coinTex=E.pixTex(16,(g)=>{g.fillStyle='#e8b830';g.fillRect(0,0,16,16);g.fillStyle='#b8901c';g.fillRect(0,0,16,1);g.fillRect(0,15,16,1);drawFace(g,4,4,1);});
const pieTex=E.pixTex(16,(g)=>{g.fillStyle='#c98a3a';g.fillRect(0,0,16,16);g.fillStyle='#f3e3c3';g.fillRect(2,2,12,12);drawFace(g,4,4,1);});

const props=[]; const P=(o)=>{props.push(o);return o;};
// posters
const posters=[[-3.4,-.6],[0,-.2],[3.4,-.6]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,0,z);E.scene.add(g);
  box(.15,2.2,.15,M.log,0,1.1,-.05,g);const m=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.3),new THREE.MeshLambertMaterial({map:faceTex}));m.position.set(0,2.1,.05);g.add(m);return P(g);});
// coins
const coinMat=[M.gold,M.gold,new THREE.MeshLambertMaterial({map:coinTex}),new THREE.MeshLambertMaterial({map:coinTex}),M.gold,M.gold];
const coins=[];{const r=E.rng(77);for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.42,.06,.42),coinMat);m.userData={x:(r()-.5)*3.4,z:(r()-.5)*2,y0:4+r()*2.5,sp:2+r()*1.5,ph:r()*6};E.scene.add(m);coins.push(P(m));}}
// feast table
const table=P(new THREE.Group()); table.position.set(5,0,7.6); E.scene.add(table);
box(2.6,.14,1.1,M.planks,0,.9,0,table); for(const [x,z] of [[-1.15,-.4],[1.15,-.4],[-1.15,.4],[1.15,.4]]) box(.12,.9,.12,M.log,x,.45,z,table);
const pieMat=[new THREE.MeshLambertMaterial({color:'#b5762c'}),new THREE.MeshLambertMaterial({color:'#b5762c'}),new THREE.MeshLambertMaterial({map:pieTex}),new THREE.MeshLambertMaterial({color:'#b5762c'}),new THREE.MeshLambertMaterial({color:'#b5762c'}),new THREE.MeshLambertMaterial({color:'#b5762c'})];
for(const x of [-.8,0,.8]) {const m=new THREE.Mesh(new THREE.BoxGeometry(.55,.14,.55),pieMat);m.position.set(x,1.04,.05);m.castShadow=true;table.add(m);}
box(.18,.35,.18,M.gold,-1.05,1.15,-.3,table); box(.35,.16,.2,new THREE.MeshLambertMaterial({color:'#8a4a1c'}),.45,1.05,-.32,table);box(.35,.16,.2,new THREE.MeshLambertMaterial({color:'#8a4a1c'}),-.45,1.05,-.34,table);
const flyPie=P(new THREE.Mesh(new THREE.BoxGeometry(.5,.12,.5),pieMat)); E.scene.add(flyPie);
const creamMat=new THREE.MeshLambertMaterial({color:'#fff8ec'});
const cream=P(new THREE.Mesh(new THREE.BoxGeometry(.54,.42,.08),creamMat)); E.scene.add(cream);
// goose minister
const goose=P(new THREE.Group()); E.scene.add(goose);
{const W=new THREE.MeshLambertMaterial({color:'#f4f4f0'}),O=new THREE.MeshLambertMaterial({color:'#f39c12'});
 box(.5,.42,.75,W,0,.62,0,goose); box(.16,.55,.16,W,0,1.05,.3,goose); box(.24,.22,.3,W,0,1.38,.36,goose);
 box(.14,.08,.2,O,0,1.33,.58,goose); box(.08,.4,.08,O,-.12,.2,0,goose); box(.08,.4,.08,O,.12,.2,0,goose);
 box(.06,.06,.02,new THREE.MeshBasicMaterial({color:'#111'}),-.1,1.42,.52,goose);box(.06,.06,.02,new THREE.MeshBasicMaterial({color:'#111'}),.1,1.42,.52,goose);
 box(.16,.16,.04,M.gold,0,.78,.39,goose);}
const tagGoose=textSprite("Ministre de l'Agriculture",{color:'#ffd23f'});
// sneeze spray + tumbleweed
const spray=[];{const r=E.rng(91);for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.3),new THREE.MeshLambertMaterial({color:'#e9f4ff'}));m.userData={a:(r()-.5)*.9,b:(r()-.5)*.6,sp:5+r()*5};E.scene.add(m);spray.push(P(m));}}
const tumble=P(new THREE.Mesh(new THREE.BoxGeometry(.6,.6,.6),new THREE.MeshLambertMaterial({color:'#9a7b3c'}))); E.scene.add(tumble);
const sPromis=textSprite('PROMIS 🤞'.replace('🤞','!'),{font:'90px VT',color:'#ffd23f',bg:'rgba(0,0,0,.5)',scale:.0024});
const sZero=textSprite('0 VOTANT',{font:'80px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.5)',scale:.007});
function hideProps(){props.forEach(o=>o.visible=false);}

const MAXP={x:0,y:.9,z:-4.3};
const boss=(t)=>t<21.72?maxCivil:maxMil;
const B=(k,f)=>[k,f];
const bd={
 q:B('q',g=>{title(g,'DICTATURE',150,190);line(g,'COMMENT ÇA COMMENCE ?',360,72,'#555');}),
 elec:B('elec',g=>{title(g,'ÉLECTIONS',90,120);g.textAlign='left';g.fillStyle='rgba(240,210,80,.45)';g.fillRect(40,150,944,100);g.fillStyle='#333';g.font='84px VT';
   g.fillText('MAX',80,205);g.fillText('PERSONNE D\'AUTRE',80,330);g.font='60px VT';g.fillStyle='#777';g.fillText('(BIZARRE)',80,440);g.textAlign='center';}),
 score:B('score',g=>{title(g,'RÉSULTATS',90,110);line(g,'MAX : 100 %',260,140,'#2ea44f');line(g,'VOTANTS : 1',430,90,'#a8322c');}),
 pow:B('pow',g=>{title(g,'POUVOIRS SPÉCIAUX',110,104);line(g,'DURÉE : QUELQUES SEMAINES',270,64);line(g,'(PROMIS)',400,80,'#777');}),
 weeks:[u=>'w'+Math.min(40,u*26|0),u=>g=>{title(g,'SEMAINES ÉCOULÉES',90,100);const n=Math.min(40,u*26|0);for(let r=0;r<3;r++){const k=Math.max(0,Math.min(15,n-r*15));g.save();g.translate(-180,0);tally(g,300,170+r*100,k,64);g.restore();}}],
 elec2:B('elec2',g=>{title(g,'ÉLECTIONS',110,130);line(g,'PROCHAIN VOTE :',270,74);line(g,'DIMANCHE',390,96,'#2b4f9e');}),
 rules:B('rules',g=>{title(g,'RÈGLES DU VILLAGE',90,96);line(g,'1. APPLAUDIR',220);line(g,'2. APPLAUDIR ENCORE',320);line(g,'3. NE PAS CRITIQUER',420,72,'#a8322c');}),
 face:B('face',g=>{drawFace(g,352,40,40);line(g,'GLOIRE À MAX',420,90,'#a8322c');}),
 mandat:B('mandat',g=>{title(g,'MANDAT DE MAX',110,110);line(g,'DURÉE PRÉVUE :',260,74);line(g,'4 ANS',380,120,'#2b4f9e');}),
 loi:B('loi',g=>{title(g,'LOI : MANDAT À VIE',90,100);line(g,'POUR : 1 (MAX)',240,90,'#2ea44f');line(g,'CONTRE : 0',350,90,'#a8322c');line(g,'ADOPTÉE !',460,70,'#555');}),
 def:B('def',g=>{title(g,'DICTATURE',85,120);line(g,'UN SEUL CHEF',210);line(g,'ZÉRO CONTRE-POUVOIR',305);line(g,'BUFFET À VOLONTÉ',400);line(g,'(POUR LUI SEUL)',480,56,'#a8322c');}),
 rome:B('rome',g=>{title(g,'ROME ANTIQUE',130,130);line(g,'LE « DICTATOR »',300,96,'#2b4f9e');line(g,'(SÉRIEUX, AU DÉBUT)',420,60,'#777');}),
 six:B('six',g=>{title(g,'DURÉE MAXIMUM',100,104);g.textAlign='left';g.fillStyle='#333';g.font='90px VT';g.fillText('6 MOIS',380,260);g.textAlign='center';line(g,'EN CAS DE CRISE GRAVE',420,72);}),
 crise:B('crise',g=>{title(g,'CRISE EN COURS',110,116);line(g,'JOUR 9 999',300,150,'#a8322c');line(g,'(FIN : JAMAIS)',440,64,'#777');}),
};
const WIDE={cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,3.2,-4),V(0,3.6,-4.5)]};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const OVER={cam:[V(1.6,3,7.5),V(1.2,3,5.4)],look:[V(0,2.4,-4),V(0,2.6,-4)]};
const LOW={cam:[V(1.8,1.3,.6),V(1.1,1.5,-.6)],look:[V(0,3,-4.6),V(0,3.2,-4.6)]};
const STATUE=(a=0)=>pose(statue,{x:9,y:2.3,z:-1,ry:-.35,t:0,salute:1,headTilt:a});
const FEAST={cam:[V(5,2.3,11.6),V(5,2.1,10.4)],look:[V(5,1.4,7),V(5,1.4,7)]};
function feast(u,t){table.visible=true;const mx=boss(t);pose(mx,{x:5,z:6.75,t:u,point:Math.sin(u*5)>0?1:.6});
  [[3.5,6.6],[6.5,6.6],[4,5.6],[6,5.6]].forEach(([x,z],i)=>pose(guards[i],{x,z,ry:faceTo(x,z,5+(x-5)*3,z+(z-6.75)*3+3),t:u+i,cross:1}));}

const T=[0,1.93,4.40,5.29,7.28,9.01,12.35,15.09,18.93,19.72,21.72,23.67,24.95,29.03,32.20,34.27,35.82,37.84,41.39,42.97,44.63,46.43,48.99,52.20,55.64,58.87,62.35,64.13,66.46,68.80,70.63,73.89,76.58,80.23,84.55];
const specs=[
 // 0 hook: statue sneezes
 {board:bd.q,cam:[V(3.2,3.4,9.4),V(3.6,3.6,8.6)],look:[V(9,8.2,-1),V(9,8.4,-1)],sfx:[['boing',1.2]],run(u,t){STATUE(u>1.05&&u<1.3?-.35:(u>1.3?.25*Math.exp(-(u-1.3)*4):0));plaque.visible=true;
   if(u>1.3){const k=u-1.3;spray.forEach(m=>{const d=m.userData;m.visible=k<1.2;m.position.set(8.6+(-.34+d.a)*d.sp*k,9.2+d.b*d.sp*k-k*k*3,.3+(.94)*d.sp*k);m.scale.setScalar(1-k*.6);});}}},
 // 1 spoiler: democratic
 {board:bd.elec,...OVER,run(u,t){pose(maxCivil,{...MAXP,t:u,wave:1});crowdLookPodium(u);}},
 // 2 "au début." scratch + zoom on smirk
 {board:bd.elec,cam:[V(.5,2.75,-2.4),V(.35,2.7,-2.9)],look:[V(0,2.65,-4.3),V(0,2.65,-4.3)],sfx:[['scratch',0]],run(u){pose(maxCivil,{...MAXP,t:0,headTilt:-.1});}},
 // 3 elected
 {board:bd.elec,...WIDE,sfx:[['chime',.2]],run(u){pose(maxCivil,{...MAXP,t:u,armsUp:1});crowdLookPodium(u,i=>({armsUp:i%2?1:0}));
   confetti.forEach(m=>{const d=m.userData,k=u;m.visible=true;m.position.set(d.x+Math.sin(k*3+d.ph)*.3,d.y0-k*d.sp*2.2,d.z);m.rotation.set(k*5+d.ph,k*3,d.ph);});}},
 // 4 score 100%
 {board:bd.score,...BOARD,run(u){pose(maxCivil,{...MAXP,t:u,armsUp:.6});}},
 // 5 empty plaza: only him voting + tumbleweed
 {board:bd.score,cam:[V(7,2.6,6.5),V(6.2,2.4,5.6)],look:[V(2.4,1.2,.4),V(2.4,1.2,.4)],sfx:[['boing',1.9]],
  run(u){pose(maxCivil,{x:2.8,z:1.55,ry:Math.PI,t:u,point:u<1.4?1:0});const k=ease((u-.2)/1);ballotPaper.visible=u<1.3;ballotPaper.position.set(2.8,lerp(1.95,1.6,k),lerp(1.2,.6,k));
   tumble.visible=true;tumble.position.set(lerp(9,-3,u/3.3),.3+Math.abs(Math.sin(u*6))*.4,3);tumble.rotation.set(0,0,-u*8);
   if(u>1.9){sZero.visible=true;sZero.position.set(2.8,2.9,.6);}}},
 // 6 crisis: fire
 {cam:[V(-3.5,2.4,2.5),V(-5,3,.5)],look:[V(-11,3.2,-6),V(-11.5,3.8,-6)],run(u){fireGroup.visible=true;smokes.forEach(m=>m.visible=true);
   [[-7,-1],[-8.5,1],[-6,1.5],[-9,-2.5]].forEach(([x,z],i)=>{pose(crowd[i],{x:x+Math.sin(u*2+i)*1.2,z:z+Math.cos(u*2+i),ry:u*2+i*1.5,walk:u*1.4+i*.2});
     qMarks[i].visible=true;qMarks[i].position.set(crowd[i].root.position.x,2.75,crowd[i].root.position.z);});}},
 // 7 special powers
 {board:bd.pow,...LOW,run(u){pose(maxCivil,{...MAXP,ry:.25,t:u,point:1});tagMax.visible=true;tagMax.position.set(0,3.35,-4.3);}},
 // 8 "promis." close-up, sprite
 {board:bd.pow,cam:[V(.4,2.7,-2.6),V(.3,2.7,-2.9)],look:[V(0,2.6,-4.3),V(0,2.6,-4.3)],run(u){pose(maxCivil,{...MAXP,t:u,salute:1});
   const a=easeOutBack(u/.2);sPromis.visible=true;sPromis.position.set(.45,3.05,-4.1);sPromis.material.rotation=-.15;}},
 // 9 weeks -> years
 {board:bd.weeks,mood:'dark',stamp:['ANNÉES',1.2],...BOARD,run(u){pose(maxCivil,{...MAXP,t:u,cross:1});}},
 // 10 elections reported
 {board:bd.elec2,stamp:['REPORTÉES',.95],...BOARD,run(u){pose(maxMil,{...MAXP,t:u,cross:1});}},
 // 11 cancelled
 {board:bd.elec2,stamp:['ANNULÉES',.05],cam:[V(0,4.2,.6),V(0,4.3,-.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){pose(maxMil,{...MAXP,t:u,cross:1});}},
 // 12 "for stability" smiling in front of his own statue
 {cam:[V(2.4,1.7,8.6),V(3,1.9,7.8)],look:[V(8,3.4,-.5),V(8.6,5.6,-1)],run(u){STATUE();plaque.visible=true;pose(maxMil,{x:7.6,z:1.6,ry:faceTo(7.6,1.6,4,6),t:u,wave:1});
   tagMax.visible=true;tagMax.position.set(7.6,2.75,1.6);}},
 // 13 journalist question -> cage
 {sfx:[['scratch',1.7]],cam:[V(-2.4,1.9,8.4),V(-3.4,1.8,7.2)],look:[V(-6,1.3,4),V(-6,1.3,4)],run(u){cage.visible=true;cage.position.y=3.2*(1-ease((u-1.75)/.3));
   pose(journalist,{x:-6,z:4,ry:.4,t:u,wave:u<1.6?.8:0});tagJourn.visible=true;tagJourn.position.set(-6,2.55,4);
   if(u<1.7){qMarks[0].visible=true;qMarks[0].position.set(-6,3.1,4);}}},
 // 14 cage in the square
 {sfx:[['clang',.0]],cam:[V(-1,4.5,10),V(-1.5,4,8.8)],look:[V(-5,1,3.5),V(-5,1,3.5)],run(u){cage.position.y=0;pose(journalist,{x:-6,z:4,ry:.4,t:u,headTilt:.35});
   crowdLookPodium(u);}},
 // 15 village applauds (the cage)
 {...OVER,run(u){cage.position.y=0;pose(journalist,{x:-6,z:4,t:u});pose(maxMil,{...MAXP,t:u,cross:1});crowdLookPodium(u,i=>({armsUp:1,t:u*1.4+i}));}},
 // 16 village applauds everything: the goose minister
 {sfx:[['boing',.2]],cam:[V(1.4,2.2,1.6),V(1.1,2.2,.8)],look:[V(-.2,1.7,-4.3),V(-.2,1.8,-4.3)],run(u){goose.visible=true;goose.position.set(-.7,.9,-4.2);goose.rotation.y=.3+Math.sin(u*5)*.15;
   tagGoose.visible=true;tagGoose.position.set(-.7,2.75,-4.2);pose(maxMil,{x:.8,y:.9,z:-4.3,t:u,point:1,ry:-.5});
   crowdLookPodium(u,i=>({armsUp:1}));}},
 // 17 guards protect Max not the village
 {board:bd.rules,...WIDE,run(u){pose(maxMil,{...MAXP,t:u,cross:1});
   const tg=[[-1.2,-1.6],[1.2,-1.6],[-2.6,-2.2],[2.6,-2.2]];guards.forEach((g,i)=>{const k=ease((u-i*.2)/1.2);const sx=tg[i][0]<0?-8:8;
     pose(g,{x:lerp(sx,tg[i][0],k),z:lerp(-1,tg[i][1],k),ry:k<1?(sx<0?Math.PI/2:-Math.PI/2):0,walk:k<1?u:-1,t:u,salute:k>=1?1:0});});
   crowdLookPodium(u,{headTilt:.25});}},
 // 18 even when he eats alone
 {...FEAST,run(u,t){feast(u,t);}},
 // 19 face everywhere: posters + board
 {board:bd.face,cam:[V(0,2.4,6.6),V(0,2.7,5)],look:[V(0,2.4,-1),V(0,3.2,-4)],run(u){posters.forEach(p=>p.visible=true);pose(maxMil,{...MAXP,t:u,wave:1});}},
 // 20 coins
 {board:bd.face,cam:[V(0,2.1,4.2),V(0,1.9,3.4)],look:[V(0,1,-.2),V(0,.9,-.2)],run(u){coins.forEach(m=>{const d=m.userData;m.visible=true;
   const y=Math.max(.04,d.y0-u*d.sp*1.6);m.position.set(d.x,y,d.z);m.rotation.set(y>.05?u*6+d.ph:0,d.ph,y>.05?u*4:0);});}},
 // 21 pies -> pie in the face
 {...FEAST,sfx:[['splat',1.3]],run(u,t){feast(u,t);const k=clamp((u-1.0)/.3);
   if(k<1){flyPie.visible=u>1.0;flyPie.position.set(lerp(2.6,5,k),lerp(1.6,1.78,k)+Math.sin(k*Math.PI)*.6,lerp(10,7.05,k));flyPie.rotation.set(Math.PI/2,0,u*10);}
   else{cream.visible=true;cream.position.set(5,1.78,7.06);}
   poof(V(5,1.1,7.1),u-1.3,9);}},
 // 22 those who criticise
 {cam:[V(1.6,3.4,7.6),V(1.3,3.2,6.6)],look:[V(0,1.4,2.4),V(0,1.4,2.4)],run(u){crowdLookPodium(u,{armsUp:1},[4]);
   pose(v42,{x:.2,z:2.6,ry:faceTo(.2,2.6,0,-4.2),t:u,wave:u>.4?.8:0});tag42.visible=true;tag42.position.set(.2,2.55,2.6);
   qMarks[0].visible=true;qMarks[0].position.set(.2,3.15+Math.sin(u*7)*.06,2.6);
   const gk=ease((u-.8)/1.2);pose(guards[0],{x:lerp(3.8,1.1,gk),z:lerp(4.6,3.3,gk),ry:faceTo(3.8,4.6,.2,2.6),walk:gk<1?u:-1,t:u});}},
 // 23 poof, chat
 {cam:[V(1.3,3.2,6.6),V(1.1,3,6)],look:[V(0,1.4,2.4),V(0,1.4,2.4)],chat:[['Villageois_42 a disparu.',.3],["Max : il n'était pas si important.",1.25,'#ff9f43']],
  sfx:[['poof',.05]],run(u){crowdLookPodium(u,{armsUp:1},[4]);if(u<.08)pose(v42,{x:.2,z:2.6,t:u,wave:.8});poof(V(.2,0,2.6),u-.05,123);pose(guards[0],{x:1.1,z:3.3,ry:-1,t:u});}},
 // 24 mandate 4 years -> life
 {board:bd.mandat,stamp:['À VIE',1.9],...BOARD,run(u){pose(maxMil,{...MAXP,t:u,cross:1});}},
 // 25 he votes for his own law, alone
 {board:bd.loi,cam:[V(6.4,2.6,4.6),V(5.6,2.4,3.8)],look:[V(1.6,2,-1.5),V(1.2,2.4,-3)],run(u){pose(maxMil,{x:2.8,z:1.55,ry:Math.PI,t:u,point:u<1.6?1:0});
   const k=ease((u-.2)/1);ballotPaper.visible=u<1.3;ballotPaper.position.set(2.8,lerp(1.95,1.6,k),lerp(1.2,.6,k));
   if(u>1.8){checkMark.visible=true;const s=easeOutBack((u-1.8)/.25);checkMark.position.set(2.8,2.6,.6);checkMark.scale.set(s*.9,s*.9,1);}}},
 // 26 definition close
 {board:bd.def,cam:[V(0,5,1.2),V(0,5.1,.3)],look:[V(0,5.2,-6.4),V(0,5.25,-6.4)],run(u){}},
 // 27 definition wide
 {board:bd.def,...WIDE,run(u){pose(maxMil,{...MAXP,t:u,cross:1});[[-1.6,-1.8],[1.6,-1.8],[-3.6,-2.4],[3.6,-2.4]].forEach(([x,z],i)=>pose(guards[i],{x,z,t:u}));crowdLookPodium(u);}},
 // 28 excellent cuisine for him alone
 {...FEAST,run(u,t){feast(u,t);}},
 // 29 Rome
 {board:bd.rome,...BOARD,run(u){pose(maxMil,{...MAXP,t:u});}},
 // 30 6 months
 {board:bd.six,cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 // 31 the crisis never ends
 {board:bd.crise,sfx:[['scratch',1.4]],...WIDE,run(u){fireGroup.visible=true;smokes.forEach(m=>m.visible=true);pose(maxMil,{...MAXP,t:u,cross:1});crowdLookPodium(u,{headTilt:.4});}},
 // 32 remember: 4th wall, Max walks to the camera
 {mood:'final',cam:[V(0,1.8,5.6),V(0,1.78,4.9)],look:[V(0,1.6,1.5),V(0,1.75,2.4)],run(u){const k=ease(u/2.6);pose(maxMil,{x:0,z:lerp(0,2.5,k),t:u,walk:k<1?u:-1,point:u>2.7?1:0});}},
 // 33 a smile and a statue -> statue sneezes again (loop)
 {sfx:[['boing',2.4]],cam:[V(3.4,2.6,9.2),V(3.6,3.4,8.8)],look:[V(8,4,-.5),V(9,8,-1)],run(u){const s=u-2.4;STATUE(s>0&&s<.25?-.35:(s>.25?.25:0));plaque.visible=true;
   pose(maxMil,{x:7.6,z:1.6,ry:faceTo(7.6,1.6,3.4,9.2),t:u,wave:1});
   if(s>.25){const k=s-.25;spray.forEach(m=>{const d=m.userData;m.visible=k<1.2;m.position.set(8.6+(-.34+d.a)*d.sp*k,9.2+d.b*d.sp*k-k*k*3,.3+.94*d.sp*k);m.scale.setScalar(1-k*.6);});}}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideProps();tagGoose.visible=false;sPromis.visible=false;sZero.visible=false;cage.visible=true;s.run(u,T[i]+u);}}));
}
