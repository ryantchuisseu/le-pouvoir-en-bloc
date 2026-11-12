// J05 — Le clientélisme (Général en campagne, clips « C'est qui ce mignon », « Bolosse que tu es », « tu as créé quelque chose de mauvais »)
export default function(E){
const {THREE,V,pose,poof,title,line,ease,easeOutBack,lerp,clamp,faceTo,makeChar,textSprite,box,M,confetti}=E;
E.HL=['riz','clientélisme','cadeau','pays','mignon','cousin','applaudir','eau','casquette','coïncidence','bolosse','cliens','voix','mauvais','facture'];
E.ballot.visible=false;
const SK=['#5a3a24','#4a2f1d','#6b4429','#3d2616','#7a4e30','#553320','#45291a','#6e472b','#3a2414'];
const SHIRTS=['#d64a3a','#4caf50','#f2b134','#8e44ad','#e67e22','#16a085','#e84393','#2980b9','#c0392b'];
const PANTS=['#2f4f8f','#5d4037','#37474f','#263238','#1e3a5f','#4e342e','#2d3436','#3e2723','#455a64'];
const leopard=E.pixTex(16,(g)=>{g.fillStyle='#e0a83a';g.fillRect(0,0,16,16);const r=E.rng(8);
  for(let i=0;i<14;i++){const x=r()*15|0,y=r()*15|0;g.fillStyle='#3a2410';g.fillRect(x,y,2,2);g.fillStyle='#c48a26';g.fillRect(x+1,y+1,1,1);}});
const gen=makeChar({skin:'#4a2f1d',hair:'#1a1008',shirt:'#f4f1e8',sleeve:'#f4f1e8',longSleeve:true,pants:'#2f3a22',glasses:true,collar:'#c62020',badge:'#c62020'});
{const t=new THREE.Mesh(new THREE.BoxGeometry(.6,.42,.6),new THREE.MeshLambertMaterial({map:leopard}));t.position.y=.66;gen.head.add(t);}
const crowd=SK.map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:SHIRTS[i],pants:PANTS[i]}));
const crowdCap=SK.map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:'#f4f1e8',pants:PANTS[i],cap:'#c62020',brim:'#c62020'}));
const lady=makeChar({skin:'#7a4e30',hair:'#140c06',shirt:'#e84393',pants:'#e84393',shoes:'#e8b830'});
{const h=new THREE.Mesh(new THREE.BoxGeometry(.52,.62,.1),E.noiseMat('#140c06',.1));h.position.set(0,.2,-.27);lady.head.add(h);}
const cousin=makeChar({skin:'#6e472b',hair:'#140c06',shirt:'#22252b',sleeve:'#22252b',longSleeve:true,pants:'#22252b',collar:'#ffffff'});
const angry=makeChar({skin:'#3d2616',hair:'#140c06',shirt:'#c0392b',pants:'#263238'});
const goose=new THREE.Group(); E.scene.add(goose);
{const W=new THREE.MeshLambertMaterial({color:'#f4f4f0'}),O=new THREE.MeshLambertMaterial({color:'#f39c12'});
 box(.5,.42,.75,W,0,.62,0,goose);box(.16,.55,.16,W,0,1.05,.3,goose);box(.24,.22,.3,W,0,1.38,.36,goose);box(.14,.08,.2,O,0,1.33,.58,goose);
 box(.08,.4,.08,O,-.12,.2,0,goose);box(.08,.4,.08,O,.12,.2,0,goose);box(.3,.1,.32,new THREE.MeshLambertMaterial({color:'#c62020'}),0,1.54,.38,goose);}

const props=[]; const P=o=>{props.push(o);return o;}; P(goose);
const rizTex=E.pixTex(16,(g)=>{g.fillStyle='#e9dcc0';g.fillRect(0,0,16,16);g.fillStyle='#c62020';g.font='bold 6px sans-serif';g.fillText('RIZ',2,10);g.fillStyle='#b9a77f';g.fillRect(0,0,16,2);});
const rizMat=new THREE.MeshLambertMaterial({map:rizTex});
const sacks=[];{const r=E.rng(55);for(let i=0;i<22;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.5,.62,.3),rizMat);m.castShadow=true;m.userData={x:(r()-.5)*4,z:(r()-.5)*2.5,y0:5+r()*3,sp:2+r()*1.4,ph:r()*6};E.scene.add(m);sacks.push(P(m));}}
const handSack=P(new THREE.Mesh(new THREE.BoxGeometry(.5,.62,.3),rizMat)); E.scene.add(handSack);
const tap=P(new THREE.Group()); tap.position.set(-3,0,3); E.scene.add(tap); box(.25,1.3,.25,M.iron,0,.65,0,tap); box(.5,.12,.12,M.iron,.2,1.2,0,tap); box(.1,.18,.1,M.iron,.42,1.08,0,tap); box(.9,.2,.6,M.stone,.3,.1,0,tap);
const desk=P(new THREE.Group()); desk.position.set(3.5,0,3); E.scene.add(desk); box(1.6,.1,.8,M.planks,0,.85,0,desk); box(1.5,.8,.08,M.planks,0,.42,.36,desk);
box(.4,.06,.3,new THREE.MeshLambertMaterial({color:'#2b4f9e'}),0,.93,-.05,desk);
const tumble=P(new THREE.Mesh(new THREE.BoxGeometry(.6,.6,.6),new THREE.MeshLambertMaterial({color:'#9a7b3c'}))); E.scene.add(tumble);
const hearts=[0,1,2,3,4,5].map(()=>textSprite('♥',{font:'bold 110px sans-serif',color:'#ff6b9d',bg:null,scale:.005}));
const sparks=[0,1,2,3].map(()=>textSprite('✦',{font:'bold 100px sans-serif',color:'#ffd23f',bg:null,scale:.004}));
const tagGen=textSprite('LE CANDIDAT',{font:'64px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.0058});
const tagCousin=textSprite('Le cousin (Mairie)'), tagLady=textSprite('Mme Villageoise');
const sBook=textSprite("LIVRE À L'ENVERS",{font:'56px VT',color:'#fff',bg:'rgba(0,0,0,.55)',scale:.005});
const sEau=textSprite('EAU : EN ATTENTE DU VOTE',{font:'58px VT',color:'#fff',bg:'rgba(30,80,160,.9)',scale:.0052});
const sCoinc=textSprite('COÏNCIDENCE',{font:'90px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.006});
const s2000=textSprite('2000 ANS PLUS TARD',{font:'70px VT',color:'#fff',bg:'rgba(0,0,0,.6)',scale:.006});
const sFact=textSprite('FACTURE',{font:'130px VT',color:'#ff2d2d',bg:'rgba(255,255,255,.85)',scale:.0026});
const sShrug=textSprite('¯\\_(ツ)_/¯',{font:'bold 60px sans-serif',color:'#fff',bg:'rgba(0,0,0,.5)',scale:.005});
const ALL=[gen,...crowd,...crowdCap,lady,cousin,angry];
function hideAll(){props.forEach(o=>o.visible=false);ALL.forEach(c=>{c.root.rotation.x=0;});}
const spots=E.crowdSpots;
function crowdPose(set,u,f=()=>({})){set.forEach((c,i)=>{const [x,z]=spots[i];pose(c,{x,z,ry:faceTo(x,z,0,-4.2),t:u+i*.7,...f(i)});});}
const MAXP={x:0,y:.9,z:-4.3};
const genPod=(u,o={})=>{pose(gen,{...MAXP,t:u,...o});tagGen.visible=true;tagGen.position.set(0,3.6,-4.3);};
const B=(k,f)=>[k,f];
const bd={
 riz:B('riz',g=>{title(g,'ÉLECTIONS',100,120);line(g,'PROGRAMME :',260,84);line(g,'DU RIZ',390,130,'#a8322c');}),
 def:B('def',g=>{title(g,'CLIENTÉLISME',100,124);line(g,'TON VOTE',250,90);line(g,'= UN CADEAU',360,90,'#2ea44f');}),
 gagne:[t=>'g'+(t>9.54),t=>g=>{title(g,'QUI GAGNE ?',90,120);line(g,'TOI : OUI',230,84,'#2ea44f');line(g,'MOI : OUI',320,84,'#2ea44f');if(t>9.54)line(g,'LE PAYS : NON',430,96,'#a8322c');}],
 lend:[t=>'l'+(t>30.05)+(t>30.85)+(t>31.64),t=>g=>{title(g,'LE LENDEMAIN',90,120);if(t>30.05)line(g,'RIZ : 0',220,84,'#a8322c');if(t>30.85)line(g,'EAU : 0',320,84,'#a8322c');if(t>31.64)line(g,'CANDIDAT : INTROUVABLE',430,70,'#a8322c');}],
 rome:B('rome',g=>{title(g,'« CLIENS »',120,150);line(g,'(LATIN)',240,60,'#777');line(g,'LE PATRON PROTÈGE',350,74);line(g,'LE CLIENT DOIT SA VOIX',440,74,'#a8322c');}),
};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const WIDE={cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,3.2,-4),V(0,3.6,-4.5)]};
const rainSacks=(u,cx=0,cz=0)=>sacks.forEach(m=>{const d=m.userData;m.visible=true;const y=Math.max(.31,d.y0-u*d.sp*1.6);m.position.set(cx+d.x,y,cz+d.z);m.rotation.set(y>.32?u*4+d.ph:0,d.ph,0);});
// door scenes
const DOOR={x:-10.23,z:6.23,ry:2.356}; const GDOOR={x:10.98,z:7.53};
const T=[0,2.51,4.45,8.45,10.8,12.54,14.46,16.79,19.27,21.8,25.39,28.1,29.21,32.74,34.0,36.28,38.37,42.78,45.26,51.17,55.4];
const specs=[
 /*0 hook*/ {board:bd.riz,cam:[V(1.4,2.8,6),V(1,2.6,4.6)],look:[V(0,1.6,0),V(0,1.6,0)],sfx:[['boing',.6]],run(u){pose(gen,{x:0,z:0,t:u,armsUp:1});tagGen.visible=true;tagGen.position.set(0,2.75,0);rainSacks(u,0,0);}},
 /*1 avec du riz*/ {board:bd.riz,...BOARD,run(u){genPod(u,{point:1});}},
 /*2 definition*/ {board:bd.def,...BOARD,run(u){genPod(u,{wave:1});}},
 /*3 everybody wins except the country*/ {board:bd.gagne,...WIDE,run(u){genPod(u,{armsUp:1});crowdPose(crowd,u,i=>({armsUp:u<1.1?1:0,headTilt:u>1.1?.35:0}));}},
 /*4 door to door*/ {cam:[V(-3,2.3,2.2),V(-4,2.2,2.8)],look:[V(-8,1.3,4.6),V(-8.6,1.3,4.6)],run(u){const k=ease(u/1.6);pose(gen,{x:lerp(-4,-9.4,k),z:lerp(3,4.2,k),ry:faceTo(-4,3,-9.4,4.2),walk:k<1?u:-1,t:u});tagGen.visible=true;tagGen.position.set(gen.root.position.x,2.75,gen.root.position.z);}},
 /*5 CLIP « c'est qui ce mignon ? »*/ {sfx:[['chime',.1]],cam:[V(-6.6,2,7.2),V(-7,2,6.6)],look:[V(-9.6,1.6,5),V(-9.6,1.65,5)],
   run(u){pose(lady,{x:DOOR.x+.3,z:DOOR.z-.3,ry:-.4,t:u,armsUp:u>.4?.6:0});tagLady.visible=true;tagLady.position.set(DOOR.x+.3,2.6,DOOR.z-.3);
     pose(gen,{x:-9.4,z:4.2,ry:faceTo(-9.4,4.2,-6.6,7.2),t:u,salute:1});
     hearts.forEach((h,i)=>{h.visible=true;const a=u*2+i;h.position.set(-9.4+Math.cos(a)*.8,1.6+((u*.6+i*.17)%1)*1.3,4.2+Math.sin(a)*.4);});
     sparks.forEach((s,i)=>{s.visible=Math.sin(u*9+i*2)>0;s.position.set(-9.4+(i-1.5)*.4,2.5+(i%2)*.3,4.5);});}},
 /*6 rice sacks + t-shirt*/ {cam:[V(-6.6,2,7.2),V(-7,2,6.8)],look:[V(-9.6,1.4,5),V(-9.6,1.4,5)],run(u){pose(gen,{x:-9.4,z:4.2,ry:faceTo(-9.4,4.2,DOOR.x+.3,DOOR.z-.3),t:u,point:1});
   pose(lady,{x:DOOR.x+.3,z:DOOR.z-.3,ry:-.4,t:u,armsUp:u>1.2?1:0});const k=clamp(u/.6);handSack.visible=true;handSack.position.set(lerp(-9.3,DOOR.x+.2,k),1.2+Math.sin(k*Math.PI)*.4,lerp(4.5,DOOR.z-.4,k));}},
 /*7 cousin at the town hall*/ {cam:[V(5.6,2.1,6.6),V(5.2,2,6)],look:[V(3.5,1.4,2.6),V(3.5,1.4,2.6)],run(u){desk.visible=true;pose(cousin,{x:3.5,z:2.4,ry:0,t:u});tagCousin.visible=true;tagCousin.position.set(3.5,2.55,2.4);sBook.visible=u>.8;sBook.position.set(3.5,1.35,3.1);}},
 /*8 can't read but can applaud*/ {sfx:[['boing',1.1]],cam:[V(4.6,1.9,5.4),V(4.3,1.9,5)],look:[V(3.5,1.5,2.4),V(3.5,1.5,2.4)],run(u){desk.visible=true;pose(cousin,{x:3.5,z:2.4,ry:0,t:u*1.6,armsUp:u>.9?1:0});tagCousin.visible=true;tagCousin.position.set(3.5,2.55,2.4);}},
 /*9 water if the district votes well*/ {cam:[V(-1,1.9,6),V(-1.4,1.85,5.4)],look:[V(-2.8,1.1,3),V(-2.8,1.1,3)],run(u){tap.visible=true;sEau.visible=true;sEau.position.set(-2.8,2,3);pose(crowd[1],{x:-3.9,z:3.9,ry:faceTo(-3.9,3.9,-2.7,3),t:u,headTilt:.4});}},
 /*10 everybody wears his cap*/ {cam:[V(1.6,3.4,7.6),V(1.3,3.2,6.6)],look:[V(0,1.4,2.4),V(0,1.4,2.4)],run(u){crowdPose(crowdCap,u,i=>({armsUp:1,t:u*1.4+i}));goose.visible=true;goose.position.set(-1,0,1);goose.rotation.y=.4;}},
 /*11 coincidence*/ {sfx:[['scratch',0]],cam:[V(.6,2.5,4.2),V(.5,2.5,3.9)],look:[V(0,2,2.4),V(0,2,2.4)],run(u){crowdPose(crowdCap,0,i=>({}));goose.visible=true;goose.position.set(-1,0,1);sCoinc.visible=true;sCoinc.position.set(0,2.95,2.4);}},
 /*12 next day: nothing*/ {board:bd.lend,cam:[V(0,3,8),V(0,3.4,5)],look:[V(0,2.8,-3),V(0,4,-6.4)],run(u){tumble.visible=true;tumble.position.set(lerp(6,-6,u/3.4),.3+Math.abs(Math.sin(u*6))*.4,3);tumble.rotation.z=-u*8;tap.visible=true;}},
 /*13 go and complain*/ {cam:[V(12.8,2.3,4.2),V(12.5,2.2,4.7)],look:[V(10.2,1.5,7),V(10.3,1.5,7)],run(u){const k=ease(u/1);pose(crowd[3],{x:lerp(8,9.6,k),z:lerp(5,6.6,k),ry:faceTo(8,5,GDOOR.x,GDOOR.z),walk:k<1?u:-1,t:u,point:k>=1?1:0});}},
 /*14 CLIP « Bolosse que tu es » + door slam*/ {sfx:[['thud',1.7]],cam:[V(12.4,2.1,4.9),V(12.2,2.05,5.3)],look:[V(10.3,1.6,7.1),V(10.3,1.6,7.1)],
   run(u){pose(crowd[3],{x:9.6,z:6.6,ry:faceTo(9.6,6.6,GDOOR.x,GDOOR.z),t:u,headTilt:u>1.7?.4:0});if(u<1.65){pose(gen,{x:GDOOR.x-.3,z:GDOOR.z-.25,ry:faceTo(GDOOR.x,GDOOR.z,9.6,6.6),t:u,cross:1});}
     poof(V(GDOOR.x-.3,0,GDOOR.z-.25),u-1.65,4);}},
 /*15 latin*/ {board:bd.rome,...BOARD,run(u){genPod(u);}},
 /*16 owed his voice*/ {board:bd.rome,cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 /*17 only the rice changed*/ {cam:[V(1.4,2.8,6),V(1.1,2.5,5)],look:[V(0,1,0),V(0,1,0)],run(u){rainSacks(u+1.5,0,0);s2000.visible=true;s2000.position.set(0,2.6,0);}},
 /*18 CLIP « tu as créé quelque chose de mauvais »*/ {cam:[V(-2.6,2.1,6.6),V(-2.6,2,5.8)],look:[V(-2.6,1.5,2.6),V(-2.6,1.5,2.6)],
   run(u){tap.visible=true;pose(angry,{x:-1.6,z:3.4,ry:faceTo(-1.6,3.4,-3.6,2),t:u*1.5,point:1});pose(gen,{x:-3.6,z:2,ry:faceTo(-3.6,2,-1.6,3.4),t:u,armsUp:u>3.8?.35:0});
     tagGen.visible=true;tagGen.position.set(-3.6,2.75,2);if(u>3.8){sShrug.visible=true;sShrug.position.set(-3.6,3.15,2);handSack.visible=true;handSack.position.set(-3.1,1.2,2.4);}}},
 /*19 4th wall: a gift before, an invoice after*/ {mood:'final',cam:[V(0,1.8,4.4),V(0,1.78,3.9)],look:[V(0,1.5,1.2),V(0,1.6,1.4)],
   run(u){pose(gen,{x:0,z:1.4,t:u,point:1});tagGen.visible=true;tagGen.position.set(0,2.75,1.4);handSack.visible=true;handSack.position.set(.35,1.25,1.85);
     if(u>1.7){sFact.visible=true;sFact.position.set(0,2.45,1.9);sFact.material.rotation=-.15;}}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideAll();s.run(u,T[i]+u);}}));
}
