// J09 — L'oligarchie (« Il répète ça au moins 20 fois », « Quelle humiliation », « Je suis désolé mon roi bien-aimé »)
export default function(E){
const {THREE,V,pose,poof,title,line,tally,ease,easeOutBack,lerp,clamp,faceTo,makeChar,textSprite,box,M}=E;
E.HL=['cinq','pareil','village','oligarchie','convivial','mine','banque','journal','radio','général','dit','indépendant','cent','crédit','tard','rachetée','oligos','arkhê','décoration','meme'];
const leopard=E.pixTex(16,(g)=>{g.fillStyle='#e0a83a';g.fillRect(0,0,16,16);const r=E.rng(8);
  for(let i=0;i<14;i++){const x=r()*15|0,y=r()*15|0;g.fillStyle='#3a2410';g.fillRect(x,y,2,2);g.fillStyle='#c48a26';g.fillRect(x+1,y+1,1,1);}});
const gen=makeChar({skin:'#4a2f1d',hair:'#1a1008',shirt:'#3d4a2c',sleeve:'#3d4a2c',longSleeve:true,pants:'#2f3a22',glasses:true,epaulettes:true,buttons:'#e8b830',belt:'#181818',badge:'#e8b830',cape:'#8d1d1d'});
{const t=new THREE.Mesh(new THREE.BoxGeometry(.6,.42,.6),new THREE.MeshLambertMaterial({map:leopard}));t.position.y=.66;gen.head.add(t);}
const OL=[['#5a3a24','#1c1c22','Monsieur Mine'],['#6b4429','#2b2b3a','Monsieur Banque'],['#3d2616','#1f2a24','Monsieur Journal'],['#7a4e30','#2e2222','Monsieur Radio']];
const olig=OL.map(([sk,c])=>{const m=makeChar({skin:sk,hair:'#140c06',shirt:c,sleeve:c,longSleeve:true,pants:c,collar:'#ffffff',buttons:'#e8b830',glasses:true});
  const hat=new THREE.Mesh(new THREE.BoxGeometry(.44,.55,.44),new THREE.MeshLambertMaterial({color:'#111'}));hat.position.y=.78;m.head.add(hat);
  const band=new THREE.Mesh(new THREE.BoxGeometry(.46,.08,.46),M.gold);band.position.y=.56;m.head.add(band);return m;});
const tags=OL.map(([,,n])=>textSprite(n,{color:'#ffd23f'}));
const cand=makeChar({skin:'#553320',hair:'#140c06',shirt:'#16a085',pants:'#2d3436'});
const crowd=['#7a4e30','#45291a','#6e472b','#3a2414','#5a3a24'].map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:['#d64a3a','#4caf50','#f2b134','#8e44ad','#e67e22'][i],pants:'#2d3436'}));
const ALL=[gen,...olig,cand,...crowd];
const props=[];const P=o=>{props.push(o);return o;};
const ctab=P(new THREE.Group());ctab.position.set(0,0,2);E.scene.add(ctab);box(3,.12,1.2,M.planks,0,.85,0,ctab);for(const [x,z] of [[-1.3,-.45],[1.3,-.45],[-1.3,.45],[1.3,.45]])box(.12,.85,.12,M.log,x,.42,z,ctab);
const goblets=[];for(let i=0;i<5;i++)goblets.push(box(.14,.26,.14,M.gold,-1.2+i*.6,1.04,-.2,ctab));
const papersT=box(.5,.03,.36,new THREE.MeshLambertMaterial({color:'#f4f1e8'}),.2,.93,.25,ctab);
const mine=P(new THREE.Group());mine.position.set(-8,0,-1);E.scene.add(mine);box(3,2.6,1.2,M.stone,0,1.3,0,mine);box(1.3,1.7,.1,new THREE.MeshLambertMaterial({color:'#111'}),0,.85,.62,mine);box(.8,.5,.6,M.iron,1.8,.25,.8,mine);
const vault=P(new THREE.Group());vault.position.set(8,0,-1);E.scene.add(vault);box(2,2,1.4,new THREE.MeshLambertMaterial({color:'#6d6d6d'}),0,1,0,vault);box(1,1,.1,M.gold,0,1,.72,vault);
const kiosk=P(new THREE.Group());kiosk.position.set(-3,0,6);E.scene.add(kiosk);box(1.6,1,.8,M.planks,0,.5,0,kiosk);box(1.8,.1,1,new THREE.MeshLambertMaterial({color:'#c62020'}),0,2.2,0,kiosk);box(.1,1.2,.1,M.log,-.8,1.6,.4,kiosk);box(.1,1.2,.1,M.log,.8,1.6,.4,kiosk);
const radio=P(new THREE.Group());radio.position.set(3,.9,6);E.scene.add(radio);box(1,.6,.4,new THREE.MeshLambertMaterial({color:'#7a4a24'}),0,.3,0,radio);box(.55,.4,.02,new THREE.MeshLambertMaterial({color:'#222'}),-.15,.32,.21,radio);box(.03,.8,.03,M.iron,.35,1,0,radio);
const radioStand=P(box(.8,.9,.6,M.planks,3,.45,6,E.scene));
const crate=P(box(.8,.5,.8,M.planks,0,.25,4,E.scene));
const tumble=P(new THREE.Mesh(new THREE.BoxGeometry(.6,.6,.6),new THREE.MeshLambertMaterial({color:'#9a7b3c'})));E.scene.add(tumble);
const flowers=[];for(let i=0;i<8;i++)flowers.push(P(box(.18,.18,.18,new THREE.MeshLambertMaterial({color:['#ff6b9d','#ffd23f','#ffffff','#a29bfe'][i%4]}),0,0,0,E.scene)));
const tagGen=textSprite('LE GÉNÉRAL',{font:'64px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.0058});
const tagCand=textSprite('Candidat indépendant');
const sVote=textSprite('VOTEZ MOI !',{font:'70px VT',color:'#fff',bg:'rgba(22,160,133,.9)',scale:.0055});
const sDeco=textSprite('DÉCORATION',{font:'80px VT',color:'#ff6b9d',bg:'rgba(255,255,255,.85)',scale:.005});
function hideAll(){props.forEach(o=>o.visible=false);ALL.forEach(c=>{c.root.rotation.x=0;});}
function sit(c){c.root.position.y-=.25;c.legL.rotation.x=-1.5;c.legR.rotation.x=-1.5;}
function kneel(c){c.root.position.y-=.55;c.legL.rotation.x=1.45;c.legR.rotation.x=1.45;c.head.rotation.x=.4;}
// the five seated behind the table, facing +z
const FIVE=[...olig.slice(0,2),gen,...olig.slice(2)];
function five(u,o=()=>({}),seated=true){ctab.visible=true;FIVE.forEach((c,i)=>{pose(c,{x:-1.2+i*.6,z:1.3,ry:0,t:u+i*.3,...o(i)});if(seated)sit(c);});}
const msg=n=>g=>{title(g,'MESSAGE OFFICIEL',90,100);line(g,'« TOUT VA BIEN »',250,120,'#2b4f9e');g.fillStyle='#a8322c';g.font='110px VT';g.textAlign='center';g.fillText('×'+n,512,440);};
const B=(k,f)=>[k,f];
const bd={
 vote:B('vote',g=>{title(g,'VOTE DU CONSEIL',100,110);line(g,'POUR : 5',260,110,'#2ea44f');line(g,'CONTRE : 0',390,110,'#a8322c');}),
 owners:B('own',g=>{title(g,'PROPRIÉTAIRES',100,120);line(g,'DU VILLAGE',220,90);line(g,'NOMBRE : 5',360,100,'#a8322c');}),
 def:B('def',g=>{title(g,'OLIGARCHIE',100,140);line(g,'LE POUVOIR',250,90);line(g,'À UN PETIT GROUPE',360,90,'#a8322c');}),
 msg1:B('msg1',msg(1)),
 msgN:[u=>'m'+Math.min(20,1+Math.max(0,(u-.2)*3.6|0)),u=>msg(Math.min(20,1+Math.max(0,(u-.2)*3.6|0)))],
 res:[u=>'r'+(u>.87),u=>g=>{title(g,'RÉSULTATS',90,120);g.textAlign='left';g.font='76px VT';g.fillStyle='#2ea44f';g.fillText('CANDIDATS DES 5 : 99,8 %',70,250);if(u>.87){g.fillStyle='#a8322c';g.fillText('INDÉPENDANT : 0,2 %',70,380);}g.textAlign='center';}],
 credit:B('cred',g=>{title(g,'BANQUE DU VILLAGE',100,104);line(g,'DOSSIER : INDÉPENDANT',250,74);line(g,'CRÉDIT :',380,90);}),
 rachat:B('rach',g=>{title(g,'ENTREPRISE',100,120);line(g,'NOUVEAU PROPRIÉTAIRE :',260,74);line(g,'LES CINQ',380,110,'#a8322c');}),
 grec:B('grec',g=>{title(g,'MOT GREC',90,110);line(g,'OLIGOS = PEU NOMBREUX',230,80);line(g,'ARKHÊ = COMMANDEMENT',340,80);line(g,'= LE POUVOIR DE QUELQUES-UNS',460,58,'#a8322c');}),
 deco:B('deco',g=>{title(g,'TON VOTE',140,140);line(g,'= DÉCORATION',330,120,'#ff6b9d');}),
};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const TABLE={cam:[V(0,2.3,6.4),V(0,2.2,5.6)],look:[V(0,1.4,1.6),V(0,1.4,1.6)]};
const T=[0,1.53,4.35,6.44,9.67,12.99,14.54,16.07,17.74,19.42,22.12,23.36,27.63,33.82,36.68,39.23,44.58,47.06,53.28,56.48,63.0,68.25];
const specs=[
 /*COLD OPEN 0 s : « Bolosse que tu es » — les 5 se moquent du candidat (flash-forward)*/ {cam:[V(4.6,2.3,3.4),V(3.9,2.2,3.3)],look:[V(0,1.4,3.2),V(0,1.4,3.2)],run(u){crate.visible=true;pose(cand,{x:0,y:.5,z:4.4,ry:Math.PI,t:u,headTilt:.4});
   FIVE.forEach((c,i)=>pose(c,{x:-1.6+i*.8,z:2.2,ry:0,t:u*2+i,point:i==2?1:0,armsUp:i!=2&&Math.sin(u*9+i)>0?.6:0}));sVote.visible=true;sVote.position.set(0,3.3,4.4);}},
 /*0 HOOK: five hands up at the same time*/ {board:bd.vote,sfx:[['boing',.9]],...TABLE,run(u){five(u,i=>({armsUp:u>.8?1:0,t:0}));}},
 /*1 they own the whole village*/ {board:bd.owners,cam:[V(0,4.2,9.5),V(0,3.6,8)],look:[V(0,1.4,1.6),V(0,1.8,0)],run(u){five(u,i=>({cross:1}),false);crowd.forEach((c,i)=>{pose(c,{x:-3+i*1.5,z:5.5,ry:Math.PI,t:u+i,headTilt:.3});});}},
 /*2 definition*/ {board:bd.def,...BOARD,run(u){}},
 /*3 not one boss: five. more convivial (toast)*/ {...TABLE,sfx:[['chime',1.2]],run(u){five(u,i=>({armsUp:u>1.1?.7:0}));goblets.forEach((g,i)=>{g.position.y=u>1.1?1.4:1.04;});}},
 /*4 the mine*/ {cam:[V(-4.8,2.2,4.6),V(-5.2,2.1,4.2)],look:[V(-7.6,1.3,0),V(-7.6,1.3,0)],run(u){mine.visible=true;pose(olig[0],{x:-6.6,z:.6,ry:faceTo(-6.6,.6,-5.6,3.6),t:u,point:1});tags[0].visible=true;tags[0].position.set(-6.6,2.95,.6);}},
 /*5 the bank*/ {cam:[V(4.8,2.2,4.6),V(5.2,2.1,4.2)],look:[V(7.6,1.3,0),V(7.6,1.3,0)],run(u){vault.visible=true;pose(olig[1],{x:6.6,z:.6,ry:faceTo(6.6,.6,5.6,3.6),t:u,cross:1});tags[1].visible=true;tags[1].position.set(6.6,2.95,.6);}},
 /*6 the newspaper*/ {cam:[V(-1.2,2,9.2),V(-1.6,2,8.8)],look:[V(-3,1.3,6.4),V(-3,1.3,6.4)],run(u){kiosk.visible=true;pose(olig[2],{x:-2,z:7,ry:faceTo(-2,7,-1.2,9.2),t:u,wave:1});tags[2].visible=true;tags[2].position.set(-2,2.95,7);}},
 /*7 the radio*/ {sfx:[['static',.1]],cam:[V(4.8,2,9.2),V(4.4,2,8.8)],look:[V(3,1.3,6.4),V(3,1.3,6.4)],run(u){radio.visible=true;radioStand.visible=true;pose(olig[3],{x:2,z:7,ry:faceTo(2,7,4.8,9.2),t:u,point:1});tags[3].visible=true;tags[3].position.set(2,2.95,7);}},
 /*8a the fifth? CLIP « c'est qui ? »*/ {cam:[V(0,2.6,8),V(0,2.8,6.6)],look:[V(0,2,-3),V(0,2.4,-4)],run(u){crowd.forEach((c,i)=>{pose(c,{x:-3+i*1.5,z:3,ry:Math.PI,t:u+i});});
   [0,1,2,3,4].forEach(i=>{E.qMarks[i].visible=true;E.qMarks[i].position.set(-3+i*1.5,2.75+Math.sin(u*6+i)*.08,3);});}},
 /*8b the General reveal*/ {sfx:[['scratch',.05]],cam:[V(.6,2.6,-1.4),V(.4,2.6,-2.2)],look:[V(0,2.5,-4.3),V(0,2.5,-4.3)],run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,armsUp:u>.3?1:0});tagGen.visible=true;tagGen.position.set(0,3.6,-4.3);}},
 /*9 their message, everywhere*/ {board:bd.msg1,...BOARD,run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,point:1});}},
 /*10 CLIP « il répète ça au moins 20 fois » — counter ×1 → ×20*/ {board:bd.msgN,cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 /*11 independent candidate*/ {cam:[V(1.6,1.9,7.4),V(1.3,1.85,6.8)],look:[V(0,1.6,4),V(0,1.6,4)],run(u){crate.visible=true;pose(cand,{x:0,y:.5,z:4,t:u,wave:1});sVote.visible=true;sVote.position.set(0,3.2,4);tagCand.visible=true;tagCand.position.set(0,2.85,4);}},
 /*12 result: 0.2 %*/ {board:bd.res,...BOARD,run(u){}},
 /*13 CLIP « quelle humiliation » — alone, tumbleweed*/ {sfx:[['boing',2.2]],cam:[V(3,2,8.4),V(2.4,2,7.8)],look:[V(0,1.4,4),V(0,1.4,4)],run(u){crate.visible=true;pose(cand,{x:0,y:.5,z:4,t:u,headTilt:.5});tagCand.visible=true;tagCand.position.set(0,2.85,4);
   tumble.visible=true;tumble.position.set(lerp(6,-6,u/5.3),.3+Math.abs(Math.sin(u*6))*.4,5);tumble.rotation.z=-u*8;}},
 /*14 the bank withdraws his credit*/ {board:bd.credit,stamp:['REFUSÉ',1.3],...BOARD,run(u){pose(olig[1],{x:0,y:.9,z:-4.3,t:u,cross:1});tags[1].visible=true;tags[1].position.set(0,3.6,-4.3);}},
 /*15 he apologises — CLIP « je suis désolé mon roi bien-aimé »*/ {cam:[V(2.6,2.2,5.6),V(2.2,2.1,5)],look:[V(0,1.3,2.2),V(0,1.3,2.2)],run(u){five(u,i=>({cross:1}));pose(cand,{x:.3,z:3.2,ry:Math.PI,t:u});kneel(cand);tagCand.visible=true;tagCand.position.set(.3,2.3,3.2);}},
 /*16 too late: bought by the five*/ {board:bd.rachat,stamp:['VENDU',.9],...BOARD,run(u){}},
 /*17 greek*/ {board:bd.grec,...BOARD,run(u){}},
 /*18 4th wall: your vote = decoration (decorated ballot box)*/ {mood:'final',board:bd.deco,cam:[V(4.4,2,4.6),V(4,1.95,4)],look:[V(2.8,1.3,.6),V(2.6,1.6,.2)],
   run(u){E.ballot.visible=true;flowers.forEach((f,i)=>{f.visible=true;const a=i/8*Math.PI*2;f.position.set(2.8+Math.cos(a)*.45,1.75+(i%2)*.08,.6+Math.sin(a)*.45);});sDeco.visible=true;sDeco.position.set(2.8,2.45,.6);
     FIVE.forEach((c,i)=>pose(c,{x:.2+i*.0+(i-2)*.7,z:-1.2,ry:faceTo((i-2)*.7,-1.2,4.4,4.6),t:u+i,wave:u>2?1:0}));tagGen.visible=true;tagGen.position.set(.2,2.75,-1.2);}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideAll();E.ballot.visible=false;goblets.forEach(g=>g.position.y=1.04);s.run(u,T[i]+u);}}));
}
