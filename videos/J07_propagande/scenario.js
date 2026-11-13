// J07 — La propagande (hook « Quelle humiliation », « Tu es le joueur le plus nul », chanson « Qui dit je sais n'a pas tort »)
export default function(E){
const {THREE,V,pose,poof,title,line,ease,easeOutBack,lerp,clamp,faceTo,makeChar,textSprite,box,M,cage}=E;
E.HL=['zéro','victoire','propagande','journal','général','pareil','imprimé','footballeur','vérité','prison','record','autres','tout','propagare','mensonge','mauvaise','meme'];
E.ballot.visible=false;
const SK=['#5a3a24','#4a2f1d','#6b4429','#3d2616','#7a4e30','#553320','#45291a','#6e472b','#3a2414'];
const leopard=E.pixTex(16,(g)=>{g.fillStyle='#e0a83a';g.fillRect(0,0,16,16);const r=E.rng(8);
  for(let i=0;i<14;i++){const x=r()*15|0,y=r()*15|0;g.fillStyle='#3a2410';g.fillRect(x,y,2,2);g.fillStyle='#c48a26';g.fillRect(x+1,y+1,1,1);}});
const gen=makeChar({skin:'#4a2f1d',hair:'#1a1008',shirt:'#3d4a2c',sleeve:'#3d4a2c',longSleeve:true,pants:'#2f3a22',glasses:true,epaulettes:true,buttons:'#e8b830',belt:'#181818',badge:'#e8b830',cape:'#8d1d1d'});
{const t=new THREE.Mesh(new THREE.BoxGeometry(.6,.42,.6),new THREE.MeshLambertMaterial({map:leopard}));t.position.y=.66;gen.head.add(t);}
const players=SK.map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:'#2ea44f',pants:'#f4f1e8',badge:'#e8b830'}));
const crowd=SK.map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:['#d64a3a','#4caf50','#f2b134','#8e44ad','#e67e22','#16a085','#e84393','#2980b9','#c0392b'][i],pants:'#2d3436'}));
const truth=makeChar({skin:'#3d2616',hair:'#140c06',shirt:'#f2b134',pants:'#263238'});
const ALL=[gen,...players,...crowd,truth];
const props=[];const P=o=>{props.push(o);return o;};
const goose=P(new THREE.Group());E.scene.add(goose);
{const W=new THREE.MeshLambertMaterial({color:'#f4f4f0'}),O=new THREE.MeshLambertMaterial({color:'#f39c12'});
 box(.5,.42,.75,W,0,.62,0,goose);box(.16,.55,.16,W,0,1.05,.3,goose);box(.24,.22,.3,W,0,1.38,.36,goose);box(.14,.08,.2,O,0,1.33,.58,goose);box(.08,.4,.08,O,-.12,.2,0,goose);box(.08,.4,.08,O,.12,.2,0,goose);}
const goal=P(new THREE.Group());goal.position.set(0,0,5.5);E.scene.add(goal);{const Wm=new THREE.MeshLambertMaterial({color:'#f4f4f4'});box(.15,2,.15,Wm,-2,1,0,goal);box(.15,2,.15,Wm,2,1,0,goal);box(4.15,.15,.15,Wm,0,2,0,goal);}
const ball=P(new THREE.Mesh(new THREE.BoxGeometry(.38,.38,.38),new THREE.MeshLambertMaterial({map:E.pixTex(8,(g)=>{g.fillStyle='#fff';g.fillRect(0,0,8,8);g.fillStyle='#111';g.fillRect(3,3,2,2);g.fillRect(0,0,2,2);g.fillRect(6,6,2,2);})})));E.scene.add(ball);
const papers=[];for(let i=0;i<12;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.6,.03,.42),new THREE.MeshLambertMaterial({color:'#f2efe6'}));E.scene.add(m);papers.push(P(m));}
const kiosk=P(new THREE.Group());kiosk.position.set(-3,0,2.5);E.scene.add(kiosk);box(1.6,1,.8,M.planks,0,.5,0,kiosk);box(1.8,.1,1,new THREE.MeshLambertMaterial({color:'#c62020'}),0,2.2,0,kiosk);box(.1,1.2,.1,M.log,-.8,1.6,.4,kiosk);box(.1,1.2,.1,M.log,.8,1.6,.4,kiosk);
box(.6,.04,.42,new THREE.MeshLambertMaterial({color:'#f2efe6'}),0,1.03,0,kiosk);
const plant=P(new THREE.Group());plant.position.set(2.5,0,2.5);E.scene.add(plant);const pStem=box(.15,1,.15,new THREE.MeshLambertMaterial({color:'#3f8f2f'}),0,.5,0,plant);const pLeaf=box(1,.6,1,M.leaves,0,1,0,plant);
const field=P(new THREE.Group());field.position.set(-2.5,0,3);E.scene.add(field);box(3,.05,2,new THREE.MeshLambertMaterial({color:'#6b4a2a'}),0,.03,0,field);box(.12,.3,.12,new THREE.MeshLambertMaterial({color:'#7bbf3a'}),.6,.18,.3,field);
const radio=P(new THREE.Group());radio.position.set(-2,.9,-4.6);E.scene.add(radio);box(.8,.5,.34,new THREE.MeshLambertMaterial({color:'#7a4a24'}),0,.25,0,radio);box(.45,.32,.02,new THREE.MeshLambertMaterial({color:'#222'}),-.12,.26,.18,radio);box(.03,.7,.03,M.iron,.3,.85,0,radio);
const tagGen=textSprite('LE GÉNÉRAL',{font:'64px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.0058});
const tagTruth=textSprite('Villageois (honnête)');
const sReleg=textSprite('RELÉGUÉ',{font:'90px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.6)',scale:.005});
const sMens=textSprite('MENSONGE',{font:'80px VT',color:'#ff4d4d',bg:'rgba(255,255,255,.85)',scale:.005});
const sPlante=textSprite('VÉRITÉ',{font:'70px VT',color:'#2ea44f',bg:'rgba(255,255,255,.85)',scale:.0045});
const notes=[0,1,2,3,4,5].map(()=>textSprite('♪',{font:'bold 110px sans-serif',color:'#ffd23f',bg:null,scale:.006}));
const tears=[];const tearMat=new THREE.MeshBasicMaterial({color:'#7fd3ff'});for(let i=0;i<40;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.07,.07,.07),tearMat);E.scene.add(m);tears.push(P(m));}
function hideAll(){props.forEach(o=>o.visible=false);ALL.forEach(c=>{c.root.rotation.x=0;});}
function kneel(c){c.root.position.y-=.55;c.legL.rotation.x=1.45;c.legR.rotation.x=1.45;c.head.rotation.x=.45;}
const spots=E.crowdSpots;
const crowdPose=(set,u,f=()=>({}))=>set.forEach((c,i)=>{const [x,z]=spots[i];pose(c,{x,z,ry:faceTo(x,z,0,-4.2),t:u+i*.7,...f(i)});});
// newspaper on the board
function paper(g,headline,sub,stamp){g.fillStyle='#f4f1e8';g.fillRect(0,0,1024,540);g.fillStyle='#111';g.fillRect(40,40,944,6);g.fillRect(40,130,944,3);
  g.font='86px VT';g.textAlign='center';g.fillText('LA VOIX DU GÉNÉRAL',512,110);g.font='40px VT';g.fillStyle='#555';g.fillText('JOURNAL UNIQUE · PRIX : OBLIGATOIRE',512,170);
  g.fillStyle='#a8322c';g.font='92px VT';headline.forEach((l,i)=>g.fillText(l,512,270+i*90));if(sub){g.fillStyle='#333';g.font='54px VT';g.fillText(sub,512,480);}}
const B=(k,f)=>[k,f];
const bd={
 score:B('score',g=>{g.fillStyle='#111';g.fillRect(0,0,1024,540);g.fillStyle='#ffd23f';g.font='96px VT';g.textAlign='center';g.fillText('VILLAGE   VOISINS',512,150);g.font='260px VT';g.fillStyle='#ff4d4d';g.fillText('0 - 9',512,400);}),
 victoire:B('vic',g=>paper(g,['VICTOIRE MORALE !'],'(SCORE : SANS IMPORTANCE)')),
 def:B('def',g=>{title(g,'PROPAGANDE',100,140);line(g,'CONTRÔLER L\'INFO',260,84);line(g,'= CONTRÔLER LES TÊTES',370,84,'#a8322c');}),
 sauve:B('sauve',g=>paper(g,['LE GÉNÉRAL A ENCORE','SAUVÉ LE PAYS'],'ÉDITION DU JOUR')),
 hier:B('hier',g=>paper(g,['LE GÉNÉRAL A ENCORE','SAUVÉ LE PAYS'],'ÉDITION D\'HIER')),
 demain:B('demain',g=>paper(g,['LE GÉNÉRAL A ENCORE','SAUVÉ LE PAYS'],'ÉDITION DE DEMAIN (DÉJÀ IMPRIMÉE)')),
 foot:B('foot',g=>paper(g,['MEILLEUR FOOTBALLEUR','DU PAYS : LUI'],'(SOURCE : LUI)')),
 recolte:B('rec',g=>paper(g,['RÉCOLTE :','RECORD HISTORIQUE !'],'(1 TOMATE)')),
 faute:B('faute',g=>paper(g,['PROBLÈME ?','C\'EST LA FAUTE','DES AUTRES'])),
 devise:B('devise',g=>{title(g,'DEVISE DU GÉNÉRAL',110,104);line(g,'« JE SAIS TOUT »',290,120,'#2b4f9e');line(g,'(MÊME CE QUE TU PENSES)',430,60,'#777');}),
 latin:B('latin',g=>{title(g,'« PROPAGARE »',130,140);line(g,'(LATIN)',250,60,'#777');line(g,'= FAIRE POUSSER',380,96,'#2ea44f');}),
 fin:B('fin',g=>paper(g,['TOUT VA BIEN.'],'(CECI EST UN ORDRE)')),
};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const PAPER={cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)]};
const genPod=(u,o={})=>{pose(gen,{x:0,y:.9,z:-4.3,t:u,...o});tagGen.visible=true;tagGen.position.set(0,3.6,-4.3);};
const T=[0,5.0,7.85,11.28,15.71,17.83,21.46,23.19,25.47,29.2,31.2,36.8,39.74,42.5,44.67,47.75,48.97,55.39,59.89,62.52,67.2];
const specs=[
 /*0 HOOK « Quelle humiliation » — 0-9, players down, goose crying*/ {board:bd.score,sfx:[['thud',.2]],cam:[V(0,2.4,9),V(0,3.2,6.4)],look:[V(0,1.4,1.5),V(0,3.4,-4)],
   run(u,t){players.forEach((c,i)=>{const [x,z]=spots[i];pose(c,{x,z,ry:faceTo(x,z,0,-4.2),t:u+i});kneel(c);});goose.visible=true;goose.position.set(1.4,0,4.6);goose.rotation.y=Math.PI;
     tears.forEach((m,k)=>{const ph=((t*2+k/40)%1);m.visible=k<12;m.position.set(1.4+(k%2?.25:-.25)*(1+ph),1.3+ph*.2-ph*ph,4.3);});}},
 /*1 lost 9-0*/ {board:bd.score,...BOARD,run(u){}},
 /*2 newspaper: moral victory*/ {board:bd.victoire,sfx:[['scratch',.05]],...PAPER,run(u){}},
 /*3 definition*/ {board:bd.def,...BOARD,run(u){genPod(u,{cross:1});}},
 /*4 one single newspaper (kiosk)*/ {cam:[V(-1.4,1.9,5.2),V(-1.8,1.9,4.6)],look:[V(-3,1,2.5),V(-3,1,2.5)],run(u){kiosk.visible=true;pose(crowd[0],{x:-4.1,z:3.4,ry:faceTo(-4.1,3.4,-3,2.5),t:u,point:1});}},
 /*5 today's headline*/ {board:bd.sauve,...PAPER,run(u){}},
 /*6 yesterday: same*/ {board:bd.hier,sfx:[['boing',.2]],...PAPER,run(u){}},
 /*7 tomorrow: already printed (stack of papers)*/ {board:bd.demain,cam:[V(0,3.6,2),V(0,3.4,1.2)],look:[V(0,2.6,-3),V(0,3.4,-6.4)],run(u){papers.forEach((m,i)=>{m.visible=true;m.position.set((i%3-1)*.7,.05+(i/3|0)*.05+Math.max(0,3-u*3-(i*.1))*0,-1.5+(i%2)*.2);m.rotation.y=i*.3;});}},
 /*8 best footballer (he misses the ball)*/ {board:bd.foot,sfx:[['boing',1.6]],cam:[V(2.8,1.9,7.2),V(2.3,1.8,6.6)],look:[V(0,.9,3.3),V(0,.9,3.3)],
   run(u){goal.visible=true;const k=clamp((u-.6)/1);pose(gen,{x:lerp(-1,0,k),z:3,ry:Math.PI*0,walk:u<1.6?u:-1,t:u});ball.visible=true;
     if(u<1.6){ball.position.set(.2,.2,3.5);}else{const s=u-1.6;ball.position.set(.2+s*3.5,.2+s*2-s*s*2,3.5-s*1.2);}
     if(u>1.6){gen.root.rotation.x=-Math.min(1.4,(u-1.6)*5);gen.root.position.y=.15;}tagGen.visible=true;tagGen.position.set(gen.root.position.x,2.75,3);}},
 /*9 a villager dares to tell the truth*/ {cam:[V(3,2.2,9),V(2.6,2.1,8.4)],look:[V(1,1.4,4.4),V(1,1.4,4.4)],run(u){goal.visible=true;pose(gen,{x:0,y:.15,z:3,t:u});gen.root.rotation.x=-1.4;
   pose(truth,{x:2,z:5,ry:faceTo(2,5,0,3),t:u,point:u>.6?1:0});tagTruth.visible=true;tagTruth.position.set(2,2.6,5);}},
 /*10 CLIP « tu es le joueur le plus nul »*/ {cam:[V(3.6,2,7.2),V(3.2,1.9,6.6)],look:[V(1,1.3,4),V(1,1.3,4)],run(u){goal.visible=true;pose(gen,{x:0,y:.15,z:3,t:u});gen.root.rotation.x=-1.4;
   pose(truth,{x:2,z:5,ry:faceTo(2,5,0,3),t:u*2,point:1,armsUp:Math.sin(u*6)>.4?.5:0});tagTruth.visible=true;tagTruth.position.set(2,2.6,5);ball.visible=true;ball.position.set(-2.5,.2,4);}},
 /*11 relegated. to prison*/ {sfx:[['clang',.15]],cam:[V(-2.4,1.9,8.4),V(-3.4,1.8,7.2)],look:[V(-6,1.3,4),V(-6,1.3,4)],run(u){cage.position.y=3.2*(1-ease(u/.3));pose(truth,{x:-6,z:4,ry:.4,t:u,headTilt:.3});sReleg.visible=u>.5;sReleg.position.set(-6,3.1,4.6);}},
 /*12 harvest: historic record*/ {board:bd.recolte,cam:[V(-.6,2.4,7),V(-.9,2.6,6.2)],look:[V(-2.5,.4,3),V(-1,2.6,-3)],run(u){field.visible=true;}},
 /*13 always the others' fault*/ {board:bd.faute,...PAPER,run(u){}},
 /*14 motto: he knows everything*/ {board:bd.devise,...BOARD,run(u){genPod(u,{armsUp:1});}},
 /*15 as the morning song says*/ {sfx:[['static',.1]],cam:[V(-.6,2.3,-1.6),V(-1,2.1,-2.4)],look:[V(-2,1.3,-4.6),V(-2,1.3,-4.6)],run(u){radio.visible=true;radio.rotation.z=Math.sin(u*40)*.02;}},
 /*16 CLIP song: the whole village sings, the General dances*/ {cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,2.4,-3),V(0,2.8,-4)],
   run(u){radio.visible=true;genPod(u,{armsUp:Math.sin(u*5)>0?1:0,wave:Math.sin(u*5)>0?0:1});gen.root.rotation.y=Math.sin(u*3)*.5;crowdPose(crowd,u,i=>({armsUp:1,t:u*1.4+i}));
     notes.forEach((n,i)=>{const c=crowd[i];n.visible=true;n.position.set(c.root.position.x+.2,2.8+((u*.8+i*.17)%1)*1.2,c.root.position.z);});}},
 /*17 latin: propagare = make grow*/ {board:bd.latin,cam:[V(6.2,2.4,8.6),V(5.8,2.7,7.9)],look:[V(2.5,1.6,2.5),V(2.5,2.8,2.5)],run(u){plant.visible=true;const s=clamp(u/3.5);plant.scale.set(.6+s*.8,.4+s*2.2,.6+s*.8);sPlante.visible=u>1.2;sPlante.position.set(2.5,1.4+s*3,2.9);}},
 /*18 but here it's the lie that grows*/ {cam:[V(7.2,3,9.8),V(6.8,4.6,9.2)],look:[V(2.5,3,2.5),V(2.5,5.6,2.5)],run(u){plant.visible=true;const s=1+clamp(u/2.6)*1.6;plant.scale.set(1.4*s,2.6*s,1.4*s);sMens.visible=true;sMens.position.set(2.5,1.6+2.6*s*.9,3.2);}},
 /*19 4th wall: all good news = bad news*/ {mood:'final',board:bd.fin,cam:[V(0,1.9,5.6),V(0,1.85,4.6)],look:[V(0,1.6,1.4),V(0,1.75,1.4)],
   run(u){pose(gen,{x:0,z:1.4,t:u,point:u>2.2?1:0,armsUp:u<2.2?.45:0});tagGen.visible=true;tagGen.position.set(0,2.75,1.4);papers[0].visible=true;papers[0].position.set(0,1.9,1.85);papers[0].rotation.set(Math.PI/2,0,0);}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideAll();plant.scale.set(1,1,1);s.run(u,T[i]+u);}}));
}
