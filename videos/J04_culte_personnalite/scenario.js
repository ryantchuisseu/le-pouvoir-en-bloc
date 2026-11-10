// J04 — Le culte de la personnalité (Général à la toque léopard, chanson en fond, « Je suis désolé mon roi bien-aimé »)
export default function(E){
const {THREE,V,pose,poof,title,line,tally,ease,easeOutBack,lerp,clamp,faceTo,makeChar,textSprite,box,M,cage,confetti,qMarks}=E;
E.HL=['culte','obligatoire','disparais','partout','regarde','suprême','nation','soleil','footballeur','ballon','chansons','prison','désolé','non','statues','montagne','convoquée','secte','pays','staline','otage'];
E.ballot.visible=false;
const SK=['#5a3a24','#4a2f1d','#6b4429','#3d2616','#7a4e30','#553320','#45291a','#6e472b','#3a2414'];
const SHIRTS=['#d64a3a','#4caf50','#f2b134','#8e44ad','#e67e22','#16a085','#e84393','#2980b9','#c0392b'];
const PANTS=['#2f4f8f','#5d4037','#37474f','#263238','#1e3a5f','#4e342e','#2d3436','#3e2723','#455a64'];

// ---------- cast ----------
const leopard=E.pixTex(16,(g)=>{g.fillStyle='#e0a83a';g.fillRect(0,0,16,16);const r=E.rng(8);
  for(let i=0;i<14;i++){const x=r()*15|0,y=r()*15|0;g.fillStyle='#3a2410';g.fillRect(x,y,2,2);g.fillStyle='#c48a26';g.fillRect(x+1,y+1,1,1);}});
const gen=makeChar({skin:'#4a2f1d',hair:'#1a1008',shirt:'#3d4a2c',sleeve:'#3d4a2c',longSleeve:true,pants:'#2f3a22',glasses:true,epaulettes:true,buttons:'#e8b830',belt:'#181818',badge:'#e8b830',cape:'#8d1d1d'});
{const t=new THREE.Mesh(new THREE.BoxGeometry(.6,.42,.6),new THREE.MeshLambertMaterial({map:leopard}));t.position.y=.66;gen.head.add(t);
 const c=new THREE.Mesh(new THREE.BoxGeometry(.07,1.1,.07),new THREE.MeshLambertMaterial({color:'#3a2414'}));c.position.set(0,-.95,.12);gen.armL.add(c);
 const k=new THREE.Mesh(new THREE.BoxGeometry(.13,.13,.13),M.gold);k.position.set(0,-.42,.12);gen.armL.add(k);}
const crowd=SK.map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:SHIRTS[i],pants:PANTS[i]}));
const extra=[0,1,2,3].map(i=>makeChar({skin:SK[(i+4)%9],hair:'#140c06',shirt:['#f5f5f5','#bdc3c7','#95a5a6','#ecf0f1'][i],pants:'#3e2723'})); // porteurs
const singer=makeChar({skin:'#6e472b',hair:'#140c06',shirt:'#f39c12',pants:'#2d3436'});
const statueS=(sc)=>{const s=makeChar({stone:true,cap:'#999',peak:true,epaulettes:true,cape:'#999'});s.scale=sc;return s;};
const bigStatue=statueS(13); const smallStatues=[0,1,2,3,4].map(()=>statueS(1.7)); const plazaStatue=statueS(4.2);
const ALL=[gen,...crowd,...extra,singer,bigStatue,...smallStatues,plazaStatue];

// ---------- face of the Général (posters, coins) ----------
function drawFace(g,x,y,s){const P=(c,px,py,w=1,h=1)=>{g.fillStyle=c;g.fillRect(x+px*s,y+py*s,w*s,h*s);};
  P('#4a2f1d',0,0,8,8);P('#e0a83a',0,0,8,2);P('#3a2410',1,0);P('#3a2410',5,1);P('#3a2410',3,0);P('#111',1,3,6,2);P('#333',2,3);P('#333',5,3);P('rgba(20,10,5,.8)',3,6,2,1);}
const faceTex=E.pixTex(16,(g)=>{g.fillStyle='#e8e4da';g.fillRect(0,0,16,16);drawFace(g,4,3,1);g.fillStyle='#a8322c';g.fillRect(2,12,12,2);});
const coinTex=E.pixTex(16,(g)=>{g.fillStyle='#e8b830';g.fillRect(0,0,16,16);drawFace(g,4,4,1);});

// ---------- props ----------
const props=[]; const P=o=>{props.push(o);return o;};
const posters=[[-3.4,-.6],[0,-.2],[3.4,-.6]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,0,z);E.scene.add(g);
  box(.15,2.2,.15,M.log,0,1.1,-.05,g);const m=new THREE.Mesh(new THREE.PlaneGeometry(1.3,1.3),new THREE.MeshLambertMaterial({map:faceTex}));m.position.set(0,2.1,.05);g.add(m);return P(g);});
const coinMat=[M.gold,M.gold,new THREE.MeshLambertMaterial({map:coinTex}),new THREE.MeshLambertMaterial({map:coinTex}),M.gold,M.gold];
const coins=[];{const r=E.rng(77);for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.42,.06,.42),coinMat);m.userData={x:(r()-.5)*3.4,z:(r()-.5)*2,y0:4+r()*2.5,sp:2+r()*1.5,ph:r()*6};E.scene.add(m);coins.push(P(m));}}
const mugs=[];for(let i=0;i<4;i++){const g=new THREE.Group();E.scene.add(g);box(.3,.36,.3,new THREE.MeshLambertMaterial({color:'#f4f1e8'}),0,.18,0,g);
  const f=new THREE.Mesh(new THREE.PlaneGeometry(.26,.26),new THREE.MeshLambertMaterial({map:faceTex}));f.position.set(0,.2,.152);g.add(f);mugs.push(P(g));}
// bathroom
const bath=P(new THREE.Group()); bath.position.set(-8,0,6); E.scene.add(bath);
{const W=new THREE.MeshLambertMaterial({color:'#f4f6f8'});box(1.8,.6,.9,W,0,.3,0,bath);box(1.6,.1,.7,new THREE.MeshLambertMaterial({color:'#7fd3ff'}),0,.56,0,bath);
 box(3,2.6,.15,new THREE.MeshLambertMaterial({color:'#bfe3e8'}),0,1.3,-.6,bath);const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshLambertMaterial({map:faceTex}));m.position.set(0,1.75,-.52);bath.add(m);}
const ball=P(new THREE.Mesh(new THREE.BoxGeometry(.38,.38,.38),new THREE.MeshLambertMaterial({map:E.pixTex(8,(g)=>{g.fillStyle='#fff';g.fillRect(0,0,8,8);g.fillStyle='#111';g.fillRect(3,3,2,2);g.fillRect(0,0,2,2);g.fillRect(6,6,2,2);})}))); E.scene.add(ball);
// throne carried
const throne=P(new THREE.Group()); E.scene.add(throne);
box(1.9,.12,1.1,M.planks,0,0,0,throne); box(.9,.12,.8,M.gold,0,.14,0,throne); box(.9,1.1,.12,M.gold,0,.7,-.36,throne); box(2.6,.08,.08,M.log,0,-.02,.62,throne); box(2.6,.08,.08,M.log,0,-.02,-.62,throne);
const leaves=[0,1].map(()=>P(new THREE.Mesh(new THREE.BoxGeometry(.5,.7,.06),M.leaves))); leaves.forEach(m=>E.scene.add(m));
// mountain + hospital
const mountain=P(new THREE.Group()); mountain.position.set(32,0,-24); E.scene.add(mountain);
for(let i=0;i<8;i++){const w=22-i*2.6;box(w,2,w*.8,i>5?new THREE.MeshLambertMaterial({color:'#f2f2f2'}):(i>2?M.stone:M.grass),0,1+i*2,0,mountain);}
const hosp=P(new THREE.Group()); hosp.position.set(1.5,0,6.6); E.scene.add(hosp); box(1.4,1.2,1.2,new THREE.MeshLambertMaterial({color:'#f4f6f8'}),0,.6,0,hosp);
box(.5,.8,.05,new THREE.MeshLambertMaterial({color:'#5a3a24'}),0,.4,.62,hosp);
// sprites
const tagGen=textSprite('GUIDE SUPRÊME',{font:'64px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.0062});
const sNoLike=textSprite('PAS DE LIKE',{font:'70px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.55)',scale:.006});
const notes=[0,1,2,3,4,5].map(()=>textSprite('♪',{font:'bold 110px sans-serif',color:'#ffd23f',bg:null,scale:.006}));
const sFaux=textSprite('♪ FAUX ♪',{font:'70px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.55)',scale:.006});
const sNon=textSprite('NON.',{font:'130px VT',color:'#ff2d2d',bg:'rgba(0,0,0,.6)',scale:.006});
const sConv=textSprite('CONVOQUÉE',{font:'90px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.6)',scale:.03});
const sMont=textSprite('La montagne',{font:'64px VT',color:'#fff',bg:'rgba(0,0,0,.5)',scale:.025});
const sHosp=textSprite('HÔPITAL (FERMÉ)',{font:'60px VT',color:'#fff',bg:'rgba(160,30,30,.9)',scale:.0055});
const sOtage=textSprite('OTAGE',{font:'90px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.6)',scale:.006});
function hideAll(){props.forEach(o=>o.visible=false);ALL.forEach(c=>{c.root.rotation.x=0;c.root.rotation.z=0;});}

// ---------- helpers ----------
const MAXP={x:0,y:.9,z:-4.3}; const spots=E.crowdSpots;
const genPod=(u,o={})=>{pose(gen,{...MAXP,t:u,...o});tagGen.visible=true;tagGen.position.set(0,3.6,-4.3);};
function kneel(c,a){if(a<=0)return;c.root.position.y-=.55*a;c.legL.rotation.x=1.45*a;c.legR.rotation.x=1.45*a;c.head.rotation.x=.35*a;c.armL.rotation.x=-.4*a;c.armR.rotation.x=-.4*a;}
function prostrate(c,a){if(a<=0)return;c.root.rotation.x=1.45*a;c.root.position.y=.12*a+c.root.position.y*(1-a);c.armL.rotation.x=-2.9*a;c.armR.rotation.x=-2.9*a;}
function sit(c){c.legL.rotation.x=-1.5;c.legR.rotation.x=-1.5;}
function crowdPose(u,f=()=>({}),except=[]){crowd.forEach((c,i)=>{if(except.includes(i))return;const [x,z]=spots[i];pose(c,{x,z,ry:faceTo(x,z,0,-4.2),t:u+i*.7,...f(i)});});}
const tears=[];const tearMat=new THREE.MeshBasicMaterial({color:'#7fd3ff'});for(let i=0;i<120;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.07,.07,.07),tearMat);E.scene.add(m);tears.push(P(m));}
let ti=0;
function cry(c,t,seed){const p=new THREE.Vector3();c.head.getWorldPosition(p);const ry=c.root.rotation.y,fx=Math.sin(ry),fz=Math.cos(ry),rx=Math.cos(ry),rz=-Math.sin(ry);
  for(let k=0;k<8;k++){const m=tears[ti++%tears.length];const side=k%2?1:-1;const ph=((t*2.2+k*.125+seed*.37)%1);m.visible=true;const out=.12+ph*.55;
    m.position.set(p.x+fx*.27+rx*side*(.14+out),p.y+.28+ph*.25-ph*ph*1.1,p.z+fz*.27+rz*side*(.14+out));}}
const B=(k,f)=>[k,f];
const bd={
 culte:B('culte',g=>{title(g,'CULTE DE LA',150,140);title(g,'PERSONNALITÉ',300,140);line(g,'MODE D\'EMPLOI',440,64,'#555');}),
 amour:B('amour',g=>{title(g,'AMOUR DU CHEF',140,120);line(g,'STATUT :',300,80);}),
 def:B('def',g=>{title(g,'CULTE DE LA',90,110);title(g,'PERSONNALITÉ',200,110);line(g,'ADORER LE CHEF',330,80);line(g,'COMME UNE STAR',420,80);line(g,'(PAS LE CHOIX)',500,56,'#a8322c');}),
 face:B('face',g=>{drawFace(g,352,40,40);line(g,'IL TE REGARDE',420,90,'#a8322c');}),
 titres:[t=>'ti'+(t>24.99)+(t>26.19)+(t>27.35)+(t>28.72),t=>g=>{title(g,'SES TITRES',80,110);
   [['GUIDE SUPRÊME',24.99],['PÈRE DE LA NATION',26.19],['SOLEIL DU VILLAGE',27.35],['MEILLEUR FOOTBALLEUR',28.72]].forEach(([s,at],i)=>{if(t>at)line(g,s,190+i*88,74,i==3?'#a8322c':'#333');});}],
 chant:B('chant',g=>{title(g,'HYMNE DU MATIN',110,110);line(g,'♪ GLOIRE À LUI ♪',270,90,'#2b4f9e');line(g,'(OBLIGATOIRE)',400,64,'#a8322c');}),
 hist:[t=>'h'+(t>55.34)+(t>57.34)+(t>59.16),t=>g=>{title(g,"LIVRE D'HISTOIRE",80,104);g.textAlign='left';g.font='72px VT';
   [['AVANT LUI : PRÉHISTOIRE',55.34,'#333'],['APRÈS LUI : PARADIS',57.34,'#2ea44f'],['PENDANT LUI : ???',59.16,'#a8322c']].forEach(([s,at,c],i)=>{if(t>at){g.fillStyle=c;g.fillText(s,90,220+i*110);}});g.textAlign='center';}],
 kh:B('kh',g=>{title(g,'1956',120,150);line(g,'KHROUCHTCHEV DÉNONCE',270,74);line(g,'LE CULTE DE STALINE',360,74);line(g,'(DISCOURS SECRET)',460,60,'#777');}),
 mort:B('mort',g=>{title(g,'STALINE : MORT EN 1953',110,96);line(g,'DÉNONCÉ EN 1956',260,84);line(g,'= 3 ANS PLUS TARD',380,84,'#a8322c');}),
 hop:B('hop',g=>{title(g,'BILAN',100,130);line(g,'STATUES : 412',250,90,'#2ea44f');line(g,'HÔPITAUX : 1 (FERMÉ)',370,84,'#a8322c');}),
};
const WIDE={cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,3.2,-4),V(0,3.6,-4.5)]};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const OVER={cam:[V(1.6,3,7.5),V(1.2,3,5.4)],look:[V(0,2.4,-4),V(0,2.6,-4)]};
const S=5.8; // shift after the apology insert
const T=[0,2.61,5.47,9.79,12.82,15.36,17.84,20.88,23.14,30.49,32.25,36.57,37.64,40.08,40.19+S,42.31+S,43.68+S,46.03+S,47.66+S,55.96+S,58.88+S,63.96+S,67.14+S,70.48+S,79.6];
const specs=[
 /*0 hook: prostrate crowd*/ {board:bd.culte,cam:[V(.5,5.2,9.5),V(.3,4.6,7.6)],look:[V(0,1.4,-.5),V(0,1.6,-1)],run(u){genPod(u,{wave:1});crowdPose(u);crowd.forEach((c,i)=>prostrate(c,ease((u-.3-i*.05)/.4)));}},
 /*1 amour obligatoire*/ {board:bd.amour,stamp:['OBLIGATOIRE',1.0],...BOARD,run(u){genPod(u,{cross:1});}},
 /*2 definition*/ {board:bd.def,...BOARD,run(u){genPod(u);}},
 /*3 no like -> disappear*/ {board:bd.def,sfx:[['poof',1.9]],cam:[V(1.6,3.4,7.6),V(1.3,3.2,6.6)],look:[V(0,1.4,2.4),V(0,1.4,2.4)],
   run(u,t){crowdPose(u,i=>({armsUp:i==4?0:1}),[]);const gone=u>1.88;if(gone)crowd[4].root.visible=false;else{pose(crowd[4],{x:.2,z:2.6,ry:faceTo(.2,2.6,0,-4.2),t:u,cross:1});sNoLike.visible=true;sNoLike.position.set(.2,2.7,2.6);}
     poof(V(.2,0,2.6),u-1.88,5);}},
 /*4 face everywhere*/ {board:bd.face,cam:[V(0,2.4,6.6),V(0,2.7,5)],look:[V(0,2.4,-1),V(0,3.2,-4)],run(u){posters.forEach(p=>p.visible=true);genPod(u,{wave:1});}},
 /*5 walls, bills, mugs*/ {board:bd.face,cam:[V(0,2.1,4.2),V(0,1.9,3.4)],look:[V(0,1,-.2),V(0,.9,-.2)],run(u){coins.forEach(m=>{const d=m.userData;m.visible=true;const y=Math.max(.04,d.y0-u*d.sp*1.6);m.position.set(d.x,y,d.z);m.rotation.set(y>.05?u*6+d.ph:0,d.ph,y>.05?u*4:0);});
     mugs.forEach((g,i)=>{g.visible=u>1.2;g.position.set(-1.2+i*.8,0,.9);});}},
 /*6 bathroom*/ {sfx:[['boing',.3]],cam:[V(-8,2,9.2),V(-8,1.9,8.4)],look:[V(-8,1.2,6),V(-8,1.3,6)],run(u){bath.visible=true;pose(crowd[2],{x:-8,y:-.6,z:6.05,ry:0,t:u,armsUp:u>.6?1:0});}},
 /*7 il te regarde*/ {board:bd.face,sfx:[['scratch',0]],cam:[V(0,4.4,-3.2),V(0,4.4,-4.4)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 /*8 titles*/ {board:bd.titres,...BOARD,run(u){genPod(u,{armsUp:1});}},
 /*9 never touched a ball*/ {board:bd.titres,sfx:[['boing',.85]],cam:[V(1.2,2.6,-1),V(.8,2.6,-1.6)],look:[V(0,2.4,-4.3),V(0,2.5,-4.3)],
   run(u){genPod(u,{headTilt:u>.85?-.4:0});ball.visible=true;const k=clamp(u/.85);ball.position.set(lerp(2.5,0,k),u<.85?lerp(1.2,3.1,k)+Math.sin(k*Math.PI)*.8:3.1+(u-.85)*3-(u-.85)*(u-.85)*9,u<.85?-4.3:-4.3+(u-.85)*2);}},
 /*10 songs (song bed starts at 33.0)*/ {board:bd.chant,...WIDE,run(u,t){genPod(u,{cross:1,headTilt:-.15});crowdPose(u,i=>({armsUp:1,t:u*1.3+i}));
   notes.forEach((n,i)=>{const c=crowd[i];n.visible=true;n.position.set(c.root.position.x+.2,2.8+((u*.8+i*.17)%1)*1.2,c.root.position.z);});}},
 /*11 those who sing wrong*/ {board:bd.chant,cam:[V(1.2,2.3,6.8),V(1,2.2,6.2)],look:[V(.2,1.6,2.6),V(.2,1.6,2.6)],run(u){crowdPose(u,i=>({armsUp:1}),[4]);pose(singer,{x:.2,z:2.6,ry:faceTo(.2,2.6,0,-4.2),t:u,armsUp:1});sFaux.visible=true;sFaux.position.set(.2,2.75,2.6);}},
 /*12 they now sing in prison*/ {cam:[V(-2.4,1.9,8.4),V(-3.2,1.8,7.4)],look:[V(-6,1.3,4),V(-6,1.3,4)],run(u){cage.position.y=0;pose(singer,{x:-6,z:4,ry:.4,t:u,armsUp:1});notes[0].visible=true;notes[0].position.set(-5.8,2.8+((u*.8)%1),4);}},
 /*13 apology clip + NON + cage*/ {sfx:[['scratch',4.65],['clang',5.25]],cam:[V(2.6,2.2,-.6),V(2.2,2.1,-1.1)],look:[V(0,1.6,-3),V(0,1.6,-3)],
   run(u,t){pose(gen,{x:0,z:-3.6,t:u,cross:u<4.6?1:0,point:u>=4.6?1:0});tagGen.visible=true;tagGen.position.set(0,3,-3.6);
     pose(singer,{x:.2,z:-2.2,ry:Math.PI,t:u});kneel(singer,1);E.scene.updateMatrixWorld();if(u<4.6)cry(singer,t,1);
     if(u>4.65){const s=easeOutBack((u-4.65)/.2);sNon.visible=true;sNon.position.set(0,3.6,-3.6);sNon.scale.set(sNon.scale.x,sNon.scale.y,1);}
     E.jail.position.set(.2,0,-2.2);cage.position.y=3.2*(1-ease((u-5.15)/.3));}},
 /*14 statues*/ {...WIDE,cam:[V(3.4,1.3,9.5),V(3.9,1.5,8.6)],look:[V(9,3.5,-1),V(9,7.5,-1)],run(u){pose(plazaStatue,{x:9,y:2.3,z:-1,ry:-.35,t:0,salute:1});E.plaque.visible=true;}},
 /*15 one per village, one per street*/ {cam:[V(-6,2.2,9),V(-4,2.4,8.5)],look:[V(2,1.6,6),V(4,1.8,6)],run(u){smallStatues.forEach((s,i)=>pose(s,{x:-4+i*2.2,z:6,ry:0,t:0,salute:1}));crowdPose(u,i=>({armsUp:1}));}},
 /*16 taller than the mountain*/ {cam:[V(3,3,10),V(4,4,9)],look:[V(26,11,-20),V(26,15,-20)],run(u){mountain.visible=true;pose(bigStatue,{x:20,y:0,z:-14,ry:-.6,t:0,salute:1});}},
 /*17 mountain summoned*/ {sfx:[['thud',.4]],cam:[V(12,4,4),V(12.5,4.4,3)],look:[V(32,8,-24),V(32,8,-24)],run(u){mountain.visible=true;pose(bigStatue,{x:20,y:0,z:-14,ry:-.6,t:0,salute:1});
   sMont.visible=true;sMont.position.set(32,18,-24);if(u>.4){sConv.visible=true;sConv.position.set(32,10,-20);sConv.material.rotation=-.15;}}},
 /*18 history rewritten*/ {board:bd.hist,cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 /*19 not a cult, a country: carried on throne + fanned*/ {sfx:[['drums',.1]],cam:[V(6,2.6,7),V(5,2.4,6)],look:[V(0,1.6,1.4),V(1,1.6,1.4)],
   run(u){const x=lerp(-4,2,u/2.9);throne.visible=true;throne.position.set(x,1.55,1.4);throne.rotation.y=Math.PI/2;
     pose(gen,{x,y:1.7,z:1.4,ry:Math.PI/2,t:u,wave:1});sit(gen);tagGen.visible=true;tagGen.position.set(x,4.1,1.4);
     extra.forEach((c,i)=>pose(c,{x:x+(i<2?-.8:.8),z:1.4+(i%2?-.62:.62),ry:Math.PI/2,walk:u,t:u,armsUp:.85}));
     crowdPose(u,i=>({ry:faceTo(spots[i][0],spots[i][1],x,1.4)}));crowd.forEach((c,i)=>prostrate(c,1));
     [crowd[0],crowd[1]].forEach((c,i)=>{pose(c,{x:x-.3+i*.6,z:2.5,ry:Math.PI,t:u,wave:1});const p=new THREE.Vector3();E.scene.updateMatrixWorld();c.armR.getWorldPosition(p);leaves[i].visible=true;leaves[i].position.set(p.x,p.y+.5,p.z);leaves[i].rotation.z=Math.sin(u*14+i)*.5;});}},
 /*20 1956*/ {board:bd.kh,...BOARD,run(u){}},
 /*21 three years after his death*/ {board:bd.mort,stamp:['COURAGEUX ?',2.2],...BOARD,run(u){}},
 /*22 more statues than hospitals*/ {board:bd.hop,cam:[V(-1,2.6,11.8),V(0,2.4,10.8)],look:[V(1,1.6,5),V(1.5,1.6,5)],
   run(u){hosp.visible=true;sHosp.visible=true;sHosp.position.set(1.5,1.7,6.6);smallStatues.forEach((s,i)=>pose(s,{x:-4+i*2.2,z:2.6,ry:0,t:0,salute:1}));}},
 /*23 a hostage who applauds*/ {mood:'final',...WIDE,run(u,t){genPod(u,{point:u>1.5?1:0});crowdPose(u,i=>({armsUp:1,t:u*1.6+i}));crowd.forEach(c=>kneel(c,1));E.scene.updateMatrixWorld();crowd.forEach((c,i)=>cry(c,t,i));
   if(u>1.2){sOtage.visible=true;sOtage.position.set(0,2.6,2.4);}}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideAll();E.jail.position.set(-6,0,4);cage.visible=true;s.run(u,T[i]+u);}}));
}
