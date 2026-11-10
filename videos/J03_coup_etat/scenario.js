// J03 — Le coup d'État (« Général Mobutu », toque léopard, clip « Le football il a changé » x2)
export default function(E){
const {THREE,V,pose,hide,poof,title,line,tally,ease,easeOutBack,lerp,clamp,faceTo,makeChar,textSprite,box,M,
  cage,fireGroup,smokes,confetti,qMarks,checkMark}=E;
E.HL=["coup","d'état","général","radio","palais","pyjama","s'agenouille","pleure","cachot","trente","football","changé","français"];
E.ballot.visible=false;
const R=E.rng(303);
const SK=['#5a3a24','#4a2f1d','#6b4429','#3d2616','#7a4e30','#553320','#45291a','#6e472b','#3a2414'];

// ---------- cast (peau noire) ----------
const leopard=E.pixTex(16,(g)=>{g.fillStyle='#e0a83a';g.fillRect(0,0,16,16);const r=E.rng(8);
  for(let i=0;i<14;i++){const x=r()*15|0,y=r()*15|0;g.fillStyle='#3a2410';g.fillRect(x,y,2,2);g.fillStyle='#c48a26';g.fillRect(x+1,y+1,1,1);}});
const mob=makeChar({skin:'#4a2f1d',hair:'#1a1008',shirt:'#3d4a2c',sleeve:'#3d4a2c',longSleeve:true,pants:'#2f3a22',glasses:true,epaulettes:true,buttons:'#e8b830',belt:'#181818',badge:'#e8b830'});
{const t=new THREE.Mesh(new THREE.BoxGeometry(.6,.42,.6),new THREE.MeshLambertMaterial({map:leopard}));t.position.y=.66;t.castShadow=true;mob.head.add(t);
 const c=new THREE.Mesh(new THREE.BoxGeometry(.07,1.1,.07),new THREE.MeshLambertMaterial({color:'#3a2414'}));c.position.set(0,-.95,.12);mob.armL.add(c);
 const k=new THREE.Mesh(new THREE.BoxGeometry(.13,.13,.13),M.gold);k.position.set(0,-.42,.12);mob.armL.add(k);}
const chief=makeChar({skin:'#6b4429',hair:'#2b1b0e',shirt:'#9ec9f0',sleeve:'#9ec9f0',longSleeve:true,pants:'#9ec9f0',buttons:'#ffffff',cap:'#9ec9f0'});
{const p=new THREE.Mesh(new THREE.BoxGeometry(.16,.16,.16),new THREE.MeshLambertMaterial({color:'#fff'}));p.position.set(0,.68,-.1);chief.head.add(p);}
const crowd=SK.map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:['#d64a3a','#4caf50','#f2b134','#8e44ad','#e67e22','#16a085','#e84393','#2980b9','#c0392b'][i],pants:['#2f4f8f','#5d4037','#37474f','#263238','#1e3a5f','#4e342e','#2d3436','#3e2723','#455a64'][i]}));
const guards=[0,1,2,3].map(i=>makeChar({skin:SK[(i+3)%9],hair:'#111',shirt:'#2b3320',sleeve:'#2b3320',longSleeve:true,pants:'#1f2618',helmet:'#3a4430',belt:'#222',badge:'#e8b830'}));
const minister=makeChar({skin:'#5a3a24',hair:'#111',shirt:'#22252b',sleeve:'#22252b',longSleeve:true,pants:'#22252b',collar:'#ffffff',glasses:false});
const wife=makeChar({skin:'#7a4e30',hair:'#140c06',shirt:'#e84393',pants:'#e84393',shoes:'#e8b830'});
{const h=new THREE.Mesh(new THREE.BoxGeometry(.52,.62,.1),E.noiseMat('#140c06',.1));h.position.set(0,.2,-.27);wife.head.add(h);}
// goose
const goose=new THREE.Group(); E.scene.add(goose);
{const W=new THREE.MeshLambertMaterial({color:'#f4f4f0'}),O=new THREE.MeshLambertMaterial({color:'#f39c12'});
 box(.5,.42,.75,W,0,.62,0,goose);box(.16,.55,.16,W,0,1.05,.3,goose);box(.24,.22,.3,W,0,1.38,.36,goose);box(.14,.08,.2,O,0,1.33,.58,goose);
 box(.08,.4,.08,O,-.12,.2,0,goose);box(.08,.4,.08,O,.12,.2,0,goose);
 box(.06,.06,.02,new THREE.MeshBasicMaterial({color:'#111'}),-.1,1.42,.52,goose);box(.06,.06,.02,new THREE.MeshBasicMaterial({color:'#111'}),.1,1.42,.52,goose);}
// croissants in hands
const croiss=[crowd[0],crowd[2]].map(c=>{const m=new THREE.Mesh(new THREE.BoxGeometry(.34,.14,.18),new THREE.MeshLambertMaterial({color:'#d9952f'}));m.position.set(0,-.72,.16);c.armR.add(m);return m;});

// ---------- props ----------
const props=[]; const P=o=>{props.push(o);return o;};
P(goose);
const radio=P(new THREE.Group()); radio.position.set(-2,.9,-4.6); E.scene.add(radio);
box(.8,.5,.34,new THREE.MeshLambertMaterial({color:'#7a4a24'}),0,.25,0,radio); box(.45,.32,.02,new THREE.MeshLambertMaterial({color:'#222'}),-.12,.26,.18,radio);
box(.1,.1,.03,M.gold,.25,.33,.18,radio); box(.1,.1,.03,M.gold,.25,.17,.18,radio); box(.03,.7,.03,M.iron,.3,.85,0,radio);
const arch=P(new THREE.Group()); arch.position.set(2.6,0,.2); E.scene.add(arch);
{const F1=new THREE.MeshLambertMaterial({color:'#ff9ecb'}),F2=new THREE.MeshLambertMaterial({color:'#ffffff'});
 box(.25,2.8,.25,F2,-1.1,1.4,0,arch);box(.25,2.8,.25,F2,1.1,1.4,0,arch);box(2.6,.3,.3,F2,0,2.85,0,arch);
 for(let i=0;i<9;i++)box(.24,.24,.24,i%2?F1:F2,-1.1+i*.275,3.05+(i%2)*.1,.05,arch);}
const crate=P(new THREE.Group()); crate.position.set(-2.4,0,2); E.scene.add(crate); box(1.4,1.1,1.1,M.planks,0,.55,0,crate);
const ballTex=E.pixTex(8,(g)=>{g.fillStyle='#fff';g.fillRect(0,0,8,8);g.fillStyle='#111';g.fillRect(3,3,2,2);g.fillRect(0,0,2,2);g.fillRect(6,6,2,2);g.fillRect(6,0,2,1);g.fillRect(0,6,1,2);});
const ball=P(new THREE.Mesh(new THREE.BoxGeometry(.38,.38,.38),new THREE.MeshLambertMaterial({map:ballTex}))); ball.castShadow=true; E.scene.add(ball);
const tearMat=new THREE.MeshBasicMaterial({color:'#7fd3ff'});
const tears=[]; for(let i=0;i<150;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.07,.07,.07),tearMat);E.scene.add(m);tears.push(P(m));}
let ti=0;
function cry(c,t,seed,amt=1){ // two fountains from the eyes
  const p=new THREE.Vector3(); c.head.getWorldPosition(p); const ry=c.root.rotation.y; const fx=Math.sin(ry),fz=Math.cos(ry), rx=Math.cos(ry), rz=-Math.sin(ry);
  for(let k=0;k<8;k++){const m=tears[ti++%tears.length]; const side=k%2?1:-1; const ph=((t*2.2+k*.125+seed*.37)%1);
    m.visible=true; const out=.12+ph*.55*amt;
    m.position.set(p.x+fx*.27+rx*side*(.14+out),p.y+.28+ph*.25-ph*ph*1.1,p.z+fz*.27+rz*side*(.14+out));}
}
// sprites
const tagMob=textSprite('GÉNÉRAL MOBUTU',{font:'64px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.0068});
const tagChief=textSprite('Le chef (en pyjama)'), tagMin=textSprite('Ministre'), tagWife=textSprite('Sa femme');
const sIdee=textSprite('IDÉE !',{font:'110px VT',color:'#ffd23f',bg:null,scale:.0042});
const sMariage=textSprite('MARIAGE N°7',{font:'80px VT',color:'#ff9ecb',bg:'rgba(0,0,0,.55)',scale:.0065});
const sExport=textSprite('EXPORT : COUP D\'ÉTAT',{font:'64px VT',color:'#fff',bg:'rgba(120,60,20,.9)',scale:.0062});
const sFragile=textSprite('FRAGILE',{font:'70px VT',color:'#e02020',bg:null,scale:.0065});
const sNo=textSprite('NE PLEURE PAS',{font:'60px VT',color:'#ff4d4d',bg:'rgba(0,0,0,.55)',scale:.0055});
function hideAll(){props.forEach(o=>o.visible=false);croiss.forEach(m=>m.visible=false);}

// ---------- helpers ----------
const MAXP={x:0,y:.9,z:-4.3};
const spots=E.crowdSpots;
function kneel(c,a){if(a<=0)return;c.root.position.y-=.55*a;c.legL.rotation.x=1.45*a;c.legR.rotation.x=1.45*a;c.head.rotation.x=.35*a;c.armL.rotation.x=-.4*a;c.armR.rotation.x=-.4*a;}
function crowdPose(u,f=()=>({}),except=[]){crowd.forEach((c,i)=>{if(except.includes(i))return;const [x,z]=spots[i];pose(c,{x,z,ry:faceTo(x,z,0,-4.2),t:u+i*.7,...f(i)});});}
function leoBorder(g){const r=E.rng(4);for(let i=0;i<70;i++){const e=i%4;const a=r();let x,y;if(e==0){x=a*1024;y=r()*24}else if(e==1){x=a*1024;y=516+r()*24}else if(e==2){x=r()*24;y=a*540}else{x=1000+r()*24;y=a*540}g.fillStyle='#3a2410';g.fillRect(x,y,14,12);}
  g.strokeStyle='#e0a83a';g.lineWidth=16;g.strokeRect(8,8,1008,524);}
const B=(k,f)=>[k,f];
const bd={
 coup:B('coup',g=>{title(g,"COUP D'ÉTAT",170,170);line(g,'MODE D\'EMPLOI',360,80,'#555');}),
 village:B('village',g=>{title(g,'VILLAGE CUBE',110,120);line(g,'CHEF : LUI (EN PYJAMA)',260,74);line(g,'MÉTÉO : SOLEIL',380,70,'#555');}),
 mob:B('mob',g=>{leoBorder(g);title(g,'GÉNÉRAL',140,120,'#333');title(g,'MOBUTU',330,200);line(g,'NOUVEAU PATRON',470,60,'#555');}),
 def:B('def',g=>{title(g,"COUP D'ÉTAT",90,120);line(g,'PRENDRE LE POUVOIR',230);line(g,'PAR LA FORCE',320);line(g,'HORS DES RÈGLES',430,76,'#a8322c');}),
 plan:[t=>'plan'+(t>33.25)+(t>33.94)+(t>34.72),t=>g=>{title(g,'LE PLAN',90,120);g.textAlign='left';g.font='80px VT';
   [['1. L\'ARMÉE',33.25],['2. LA RADIO',33.94],['3. LE PALAIS',34.72]].forEach(([s,at],i)=>{g.fillStyle=t>at?'#2ea44f':'#999';g.fillText((t>at?'[X] ':'[ ] ')+s,180,230+i*105);});g.textAlign='center';}],
 recette:B('recette',g=>{title(g,'RECETTE',90,120);line(g,'1 ARMÉE · 1 RADIO · 1 PALAIS',230,64);line(g,'CUIRE À FEU VIF',330,70);line(g,'SERVIR PENDANT 30 ANS',440,70,'#a8322c');}),
 regle:B('regle',g=>{title(g,'NOUVELLE RÈGLE',100,110);line(g,'1. S\'AGENOUILLER',240);line(g,'2. PLEURER DE JOIE',340);line(g,'3. VOIR RÈGLE 1',440,70,'#a8322c');}),
 promesse:B('promesse',g=>{title(g,'PROMESSE',110,130);line(g,'LE POUVOIR AU PEUPLE',270,74);line(g,'TRÈS BIENTÔT',390,96,'#2b4f9e');}),
 ans:[t=>'ans'+Math.min(30,Math.max(0,(t-50.68)*12|0)),t=>g=>{title(g,'TRÈS BIENTÔT =',90,104);const n=Math.min(30,Math.max(0,(t-50.68)*12|0));
   for(let r=0;r<2;r++){const k=Math.max(0,Math.min(15,n-r*15));g.save();g.translate(-180,0);tally(g,300,190+r*110,k,70);g.restore();}line(g,n+' ANS',470,80,'#a8322c');}],
 fr:B('fr',g=>{g.fillStyle='#2b4f9e';g.fillRect(40,40,300,460);g.fillStyle='#f4f1e8';g.fillRect(362,40,300,460);g.fillStyle='#c62020';g.fillRect(684,40,300,460);
   g.fillStyle='#222';g.font='110px VT';g.textAlign='center';g.fillText("COUP D'ÉTAT",512,230);g.font='70px VT';g.fillText('MOT 100 % FRANÇAIS',512,340);}),
};
const WIDE={cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,3.2,-4),V(0,3.6,-4.5)]};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const OVER={cam:[V(1.6,3,7.5),V(1.2,3,5.4)],look:[V(0,2.4,-4),V(0,2.6,-4)]};
const CLOSE={cam:[V(.5,2.75,-2.3),V(.35,2.72,-2.8)],look:[V(0,2.7,-4.3),V(0,2.7,-4.3)]};
const mobPod=(u,o={})=>{pose(mob,{...MAXP,t:u,...o});tagMob.visible=true;tagMob.position.set(0,3.6,-4.3);};
const guardsPod=(u)=>[[-1.6,-1.8],[1.6,-1.8],[-3.6,-2.4],[3.6,-2.4]].forEach(([x,z],i)=>pose(guards[i],{x,z,t:u+i,salute:1}));

const T=[0,2.57,5.45,10.35,13.66,15.31,16.92,17.88,20.28,22.63,26.62,31.27,36.33,37.81,39.92,40.91,42.36,43.58,44.89,46.94,48.9,50.68,53.81,57.72,59.46,62.40,65.0,67.45];
const specs=[
 /*0 hook*/ {board:bd.coup,...OVER,run(u){mobPod(u,{wave:1});guardsPod(u);crowdPose(u);}},
 /*1 change chief*/ {board:bd.coup,sfx:[['poof',1.0]],cam:[V(1.2,2.4,2),V(.9,2.4,1.2)],look:[V(0,2.2,-4.3),V(0,2.3,-4.3)],
   run(u){if(u<1.05){pose(chief,{...MAXP,t:u,wave:1});tagChief.visible=true;tagChief.position.set(0,3.4,-4.3);}else{mobPod(u,{armsUp:1});}poof(V(0,.9,-4.3),u-1.0,7);}},
 /*2 village wakes*/ {board:bd.village,...WIDE,run(u,t){pose(chief,{...MAXP,t:u,wave:.7});tagChief.visible=true;tagChief.position.set(0,3.4,-4.3);
   crowdPose(u,i=>(i==0||i==2)?{point:.6}:{});croiss.forEach(m=>m.visible=true);}},
 /*3 plot twist*/ {board:bd.village,sfx:[['scratch',0]],cam:[V(-6,1.9,1.2),V(-6.6,1.9,.4)],look:[V(-9,1.6,-2),V(-9,1.7,-2)],
   run(u){pose(mob,{x:-9,z:-2,ry:faceTo(-9,-2,-6,1.2),t:u,cross:1});sIdee.visible=u>.6;sIdee.position.set(-9,3.25+Math.sin(u*6)*.06,-2);}},
 /*4 très mauvaise idée*/ {board:bd.village,sfx:[['boing',.3]],cam:[V(-7.5,2.5,.2),V(-7.8,2.45,-.3)],look:[V(-9,2.4,-2),V(-9,2.4,-2)],run(u){pose(mob,{x:-9,z:-2,ry:faceTo(-9,-2,-7.5,.2),t:u,point:1});}},
 /*5 soldiers take radio*/ {board:bd.village,sfx:[['drums',0],['static',.6]],cam:[V(-.6,2.7,1.6),V(-1,2.5,.7)],look:[V(-2.2,1.3,-4.2),V(-2.2,1.3,-4.2)],
   run(u){radio.visible=true;guards.forEach((g,i)=>{const k=ease((u-i*.12)/1.1);pose(g,{x:lerp(-7,-2.8+i*.45,k),z:lerp(-1,-3.3,k),ry:k<1?Math.PI/2:Math.PI,walk:k<1?u:-1,t:u});});}},
 /*6 palace*/ {board:bd.village,sfx:[['drums',0]],...WIDE,run(u){radio.visible=true;pose(chief,{...MAXP,t:u});guardsPod(u);crowdPose(u,()=>({headTilt:.2}));}},
 /*7 pyjama*/ {sfx:[['boing',.5]],cam:[V(-5.6,2,.6),V(-6.2,1.9,-.2)],look:[V(-9.6,1.4,-3.6),V(-9.6,1.4,-3.6)],
   run(u){pose(chief,{x:-9.6,z:-3.6,ry:Math.PI/4,t:u,armsUp:u>.6?1:0});tagChief.visible=true;tagChief.position.set(-9.6,2.95,-3.6);
     if(u>.4){qMarks[0].visible=true;qMarks[0].position.set(-9.6,3.5,-3.6);}
     [[-8.3,-4.5],[-10.5,-2.4]].forEach(([x,z],i)=>{const k=ease(u/1.4);pose(guards[i],{x:lerp(x+2,x,k),z:lerp(z+2,z,k),ry:faceTo(x,z,-9.6,-3.6),walk:k<1?u:-1,t:u,point:k>=1?1:0});});}},
 /*8 nouveau patron*/ {board:bd.mob,sfx:[['chime',.1]],...WIDE,run(u){mobPod(u,{armsUp:1});guardsPod(u);crowdPose(u,i=>({armsUp:i%2?1:0}));
   confetti.forEach(m=>{const d=m.userData,k=u;m.visible=true;m.position.set(d.x+Math.sin(k*3+d.ph)*.3,d.y0-k*d.sp*2.2,d.z);m.rotation.set(k*5+d.ph,k*3,d.ph);});}},
 /*9 premier discours + CLIP*/ {board:bd.mob,cam:[V(.9,2.6,-1),V(.35,2.72,-2.6)],look:[V(-.6,2.4,-4.3),V(0,2.7,-4.3)],run(u){radio.visible=true;mobPod(u,{point:u>2.3&&u<3.6?1:0});}},
 /*10 definition*/ {board:bd.def,...BOARD,run(u){mobPod(u,{cross:1});}},
 /*11 the plan*/ {board:bd.plan,cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 /*12 recipe*/ {board:bd.recette,...BOARD,run(u){mobPod(u,{wave:1});}},
 /*13 rule: when the general passes*/ {board:bd.regle,cam:[V(-5.5,3.9,7),V(-4,3.7,6.4)],look:[V(-1.5,1.1,.6),V(.5,1.1,.6)],
   run(u){const x=lerp(-5,-1.5,u/2.1);pose(mob,{x,z:.3,ry:Math.PI/2,walk:u,t:u});tagMob.visible=true;tagMob.position.set(x,3,.3);crowdPose(u,i=>({ry:faceTo(spots[i][0],spots[i][1],x,.3)}));}},
 /*14 kneel*/ {board:bd.regle,sfx:[['thud',.15]],cam:[V(-3.5,2.6,7),V(-2.5,2.4,6.4)],look:[V(0,1,1.6),V(.5,1,1.6)],
   run(u){const x=lerp(-1.5,0,u/1);pose(mob,{x,z:.3,ry:Math.PI/2,walk:u,t:u});tagMob.visible=true;tagMob.position.set(x,3,.3);
     crowdPose(u,i=>({ry:faceTo(spots[i][0],spots[i][1],x,.3)}));crowd.forEach(c=>kneel(c,ease((u-.1)/.25)));}},
 /*15 cry of joy*/ {board:bd.regle,cam:[V(1.5,1.9,6.6),V(1.2,1.8,6)],look:[V(0,.9,2.4),V(0,.9,2.4)],
   run(u,t){pose(mob,{x:.6,z:.3,ry:Math.PI/2,walk:u,t:u});E.scene.updateMatrixWorld();crowdPose(u,i=>({ry:faceTo(spots[i][0],spots[i][1],.6,.3)}));crowd.forEach(c=>kneel(c,1));E.scene.updateMatrixWorld();crowd.forEach((c,i)=>cry(c,t,i));}},
 /*16 not crying*/ {board:bd.regle,sfx:[['scratch',.1]],cam:[V(2.6,1.9,7),V(2.3,1.9,6.4)],look:[V(1.8,1.3,2.4),V(1.8,1.3,2.4)],
   run(u,t){crowdPose(u,i=>i==3?{cross:1,ry:0}:{ry:faceTo(spots[i][0],spots[i][1],2,.3)});crowd.forEach((c,i)=>{if(i!=3)kneel(c,1);});E.scene.updateMatrixWorld();crowd.forEach((c,i)=>{if(i!=3)cry(c,t,i);});
     sNo.visible=true;sNo.position.set(spots[3][0],2.75,spots[3][1]);}},
 /*17 cachot*/ {board:bd.regle,sfx:[['clang',.35]],cam:[V(3.4,2.4,7.6),V(3,2.4,7)],look:[V(1.8,1.2,2.4),V(1.8,1.2,2.4)],
   run(u,t){const c3=crowd[3];crowdPose(u,i=>i==3?{cross:1,ry:0}:{});crowd.forEach((c,i)=>{if(i!=3)kneel(c,1);});E.scene.updateMatrixWorld();crowd.forEach((c,i)=>{if(i!=3)cry(c,t,i);});
     E.jail.position.set(spots[3][0],0,spots[3][1]);cage.visible=true;cage.position.y=3.2*(1-ease((u-.1)/.25));}},
 /*18 everyone cries (even guards + goose)*/ {board:bd.regle,...WIDE,
   run(u,t){mobPod(u,{cross:1});guardsPod(u);goose.visible=true;goose.position.set(2.4,.9,-4.3);goose.rotation.y=-.4;crowdPose(u);crowd.forEach(c=>kneel(c,1));
     E.jail.position.set(spots[3][0],0,spots[3][1]);cage.position.y=0;E.scene.updateMatrixWorld();[...crowd,...guards].forEach((c,i)=>cry(c,t,i,1.3));
     for(let k=0;k<6;k++){const m=tears[ti++%tears.length];const ph=((t*2.2+k/6)%1);m.visible=true;m.position.set(2.4+(k%2?.25:-.25)*(1+ph),2.3+ph*.2-ph*ph,-3.95);}}},
 /*19 promise + points at minister's wife*/ {board:bd.promesse,sfx:[['boing',1.1]],cam:[V(5.4,2.4,5.8),V(4.8,2.3,5)],look:[V(1.8,1.4,.4),V(1.8,1.4,.4)],
   run(u){pose(mob,{x:.4,z:-.6,ry:faceTo(.4,-.6,3,1),t:u,point:1});tagMob.visible=true;tagMob.position.set(.4,3,-.6);
     pose(minister,{x:3.7,z:1.9,ry:faceTo(3.7,1.9,.4,-.6),t:u,headTilt:u>1?.4:0});pose(wife,{x:1.9,z:1.1,ry:faceTo(1.9,1.1,.4,-.6),t:u});
     tagMin.visible=true;tagMin.position.set(3.7,2.55,1.9);tagWife.visible=true;tagWife.position.set(1.9,2.55,1.1);if(u>.8){qMarks[1].visible=true;qMarks[1].position.set(3.7,3.1,1.9);}}},
 /*20 wedding (visual only)*/ {board:bd.promesse,sfx:[['chime',.1]],cam:[V(2.6,2,5.6),V(2.6,2.1,4.8)],look:[V(2.6,1.6,.2),V(2.6,1.8,.2)],
   run(u,t){arch.visible=true;pose(mob,{x:2.2,z:.2,ry:0,t:u,wave:1});pose(wife,{x:3,z:.2,ry:0,t:u});sMariage.visible=true;sMariage.position.set(2.6,3.6,.25);
     pose(minister,{x:4.5,z:1.6,ry:faceTo(4.5,1.6,2.6,.2),t:u*1.4,armsUp:1});tagMin.visible=true;tagMin.position.set(4.5,2.55,1.6);E.scene.updateMatrixWorld();cry(minister,t,3);
     confetti.forEach(m=>{const d=m.userData,k=u;m.visible=true;m.position.set(2.6+d.x*.4,d.y0-1.5-k*d.sp*1.6,.2+(d.z+4)*.3);m.rotation.set(k*5+d.ph,k*3,d.ph);});}},
 /*21 30 years*/ {board:bd.ans,stamp:['30 ANS',2.7],...BOARD,run(u){mobPod(u,{cross:1});}},
 /*22 french word*/ {board:bd.fr,...BOARD,run(u){mobPod(u);}},
 /*23 export*/ {board:bd.fr,sfx:[['boing',.4]],cam:[V(-.6,2,5.6),V(-1,1.9,5)],look:[V(-2.4,.9,2),V(-2.4,.9,2)],
   run(u){crate.visible=true;crate.position.set(lerp(-1.2,-2.6,u/1.7),0,2);sExport.visible=true;sExport.position.set(crate.position.x,1.6,2.3);
     sFragile.visible=true;sFragile.position.set(crate.position.x,.75,2.7);sFragile.material.rotation=.2;}},
 /*24 4th wall*/ {mood:'final',cam:[V(0,1.85,5.8),V(0,1.82,5)],look:[V(0,1.6,1.5),V(0,1.78,2.5)],run(u){const k=ease(u/2.4);pose(mob,{x:0,z:lerp(0,2.6,k),t:u,walk:k<1?u:-1,point:u>2.5?1:0});}},
 /*25 radio + ball*/ {sfx:[['static',.2]],cam:[V(-1,1.8,-2.2),V(-1.2,1.7,-2.7)],look:[V(-2,1.2,-4.6),V(-2,1.2,-4.6)],
   run(u){radio.visible=true;radio.rotation.z=Math.sin(u*40)*.02;ball.visible=u>1.2;const k=(u-1.2)/1.3;ball.position.set(lerp(.6,-3.6,k),1.25+Math.abs(Math.sin(k*9))*.6,-4.2);ball.rotation.z=u*8;}},
 /*26 CLIP 2*/ {cam:[V(.5,2.75,-2.4),V(.4,2.73,-2.75)],look:[V(0,2.7,-4.3),V(0,2.7,-4.3)],run(u){mobPod(u,{point:u>.2?1:0});ball.visible=true;ball.position.set(lerp(-1.4,1.4,u/2.4),3.6+Math.abs(Math.sin(u*6))*.4,-4.2);}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideAll();E.jail.position.set(-6,0,4);cage.visible=true;s.run(u,T[i]+u);}}));
}
