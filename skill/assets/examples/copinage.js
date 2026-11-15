// J08 — Le copinage (pont effondré, « C'est qui ce mignon », « On me drague », « Maudit l'homme », « En Versace »)
export default function(E){
const {THREE,V,pose,poof,title,line,ease,easeOutBack,lerp,clamp,faceTo,makeChar,textSprite,box,M}=E;
E.HL=['pont','effondré','copinage','amis','cartes','candidat','mignon','bébert','barbecues','signé','jojo','cabane','drague','impôts','maudit','versace','népotisme','famille','même','potes'];
E.ballot.visible=false;
const leopard=E.pixTex(16,(g)=>{g.fillStyle='#e0a83a';g.fillRect(0,0,16,16);const r=E.rng(8);
  for(let i=0;i<14;i++){const x=r()*15|0,y=r()*15|0;g.fillStyle='#3a2410';g.fillRect(x,y,2,2);g.fillStyle='#c48a26';g.fillRect(x+1,y+1,1,1);}});
const gen=makeChar({skin:'#4a2f1d',hair:'#1a1008',shirt:'#3d4a2c',sleeve:'#3d4a2c',longSleeve:true,pants:'#2f3a22',glasses:true,epaulettes:true,buttons:'#e8b830',belt:'#181818',badge:'#e8b830',cape:'#8d1d1d'});
{const t=new THREE.Mesh(new THREE.BoxGeometry(.6,.42,.6),new THREE.MeshLambertMaterial({map:leopard}));t.position.y=.66;gen.head.add(t);}
const bebert=makeChar({skin:'#6b4429',hair:'#140c06',shirt:'#f4f4f4',pants:'#c62020',beard:true,cap:'#f4f4f4'});
const jojo=makeChar({skin:'#3d2616',hair:'#140c06',shirt:'#8e5a2b',pants:'#3e5a8a',cap:'#f2b134'});
const bebertG=makeChar({skin:'#6b4429',hair:'#140c06',shirt:'#e8b830',sleeve:'#e8b830',longSleeve:true,pants:'#e8b830',beard:true,glasses:true,buttons:'#111'});
const jojoG=makeChar({skin:'#3d2616',hair:'#140c06',shirt:'#e8b830',sleeve:'#e8b830',longSleeve:true,pants:'#e8b830',glasses:true,buttons:'#111'});
const payer=makeChar({skin:'#5a3a24',hair:'#140c06',shirt:'#2980b9',pants:'#2d3436'});
const crowd=['#7a4e30','#553320','#45291a','#6e472b'].map((sk,i)=>makeChar({skin:sk,hair:'#140c06',shirt:['#d64a3a','#4caf50','#f2b134','#8e44ad'][i],pants:'#2d3436'}));
const ALL=[gen,bebert,jojo,bebertG,jojoG,payer,...crowd];
const props=[];const P=o=>{props.push(o);return o;};
// river + bridge (behind the plaza, z≈19)
const river=P(new THREE.Group());E.scene.add(river);box(40,.1,5,new THREE.MeshLambertMaterial({color:'#3f8fd8'}),0,.03,19,river);
const deck=[];for(let i=0;i<6;i++){const m=box(1.8,.25,1,M.planks,0,1.1,16.5+i,E.scene);deck.push(P(m));}
const piers=[P(box(.4,1.1,.4,M.stone,-.7,.55,16.4,E.scene)),P(box(.4,1.1,.4,M.stone,.7,.55,16.4,E.scene)),P(box(.4,1.1,.4,M.stone,-.7,.55,21.6,E.scene)),P(box(.4,1.1,.4,M.stone,.7,.55,21.6,E.scene))];
const ribbon=P(box(2.4,.08,.05,new THREE.MeshLambertMaterial({color:'#c62020'}),0,1.7,16.2,E.scene));
const carpet=P(box(1.4,.04,6,M.carpet,0,.03,12.5,E.scene));
function bridge(k){ // k: 0 standing → 1 fully collapsed
  river.visible=true;piers.forEach(p=>p.visible=true);
  deck.forEach((m,i)=>{m.visible=true;const d=clamp(k*1.6-Math.abs(i-2.5)*.12);m.position.y=1.1-d*1.4;m.rotation.set(d*(i%2?.9:-.7),0,d*(i%3-1)*.5);});
  ribbon.visible=k<.15;}
// card table
const ctable=P(new THREE.Group());ctable.position.set(-4,0,6);E.scene.add(ctable);box(1.4,.1,1.4,new THREE.MeshLambertMaterial({color:'#2e7d32'}),0,.8,0,ctable);box(.12,.8,.12,M.log,0,.4,0,ctable);
for(let i=0;i<5;i++)box(.18,.02,.26,new THREE.MeshLambertMaterial({color:'#f4f1e8'}),-.4+i*.2,.86,.1*(i%2),ctable);
// barbecue
const bbq=P(new THREE.Group());bbq.position.set(4,0,6);E.scene.add(bbq);box(1,.5,.6,new THREE.MeshLambertMaterial({color:'#222'}),0,.9,0,bbq);box(.08,.65,.08,M.iron,-.4,.33,0,bbq);box(.08,.65,.08,M.iron,.4,.33,0,bbq);
for(let i=0;i<3;i++)box(.22,.08,.12,new THREE.MeshLambertMaterial({color:'#8a3a1c'}),-.25+i*.25,1.18,0,bbq);
const smoke=[];for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.3,.3,.3),new THREE.MeshLambertMaterial({color:'#bbbbbb',transparent:true,opacity:.6}));E.scene.add(m);smoke.push(P(m));}
// shack
const shack=P(new THREE.Group());shack.position.set(-6,0,9);E.scene.add(shack);box(1.6,1.6,1.4,M.planks,0,.8,0,shack);box(1.9,.15,1.7,M.planks,0,1.68,0,shack);box(.5,.9,.05,M.log,0,.45,.72,shack);
const hearts=[0,1,2,3,4,5].map(()=>textSprite('♥',{font:'bold 110px sans-serif',color:'#ff6b9d',bg:null,scale:.005}));
const sparks=[0,1,2,3,4,5].map(()=>textSprite('✦',{font:'bold 100px sans-serif',color:'#ffd23f',bg:null,scale:.004}));
const coins=[];for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.3,.05,.3),M.gold);E.scene.add(m);coins.push(P(m));}
const tagGen=textSprite('LE GÉNÉRAL',{font:'64px VT',color:'#ffd23f',bg:'rgba(0,0,0,.55)',scale:.0058});
const tagB=textSprite('Bébert (barbecue)'),tagJ=textSprite('Jojo (cabane)'),tagP=textSprite('Toi (contribuable)');
const tagBG=textSprite('Bébert',{color:'#ffd23f'}),tagJG=textSprite('Jojo',{color:'#ffd23f'});
const sCrash=textSprite('CRAAAC',{font:'120px VT',color:'#ff4d4d',bg:null,scale:.008});
const sWallet=textSprite('PORTEFEUILLE : 0',{font:'60px VT',color:'#fff',bg:'rgba(160,30,30,.9)',scale:.005});
function hideAll(){props.forEach(o=>o.visible=false);ALL.forEach(c=>{c.root.rotation.x=0;});shack.rotation.z=0;}
function sit(c){c.root.position.y-=.25;c.legL.rotation.x=-1.5;c.legR.rotation.x=-1.5;}
const B=(k,f)=>[k,f];
const bd={
 def:B('def',g=>{title(g,'COPINAGE',110,150);line(g,'LES CONTRATS PUBLICS',260,80);line(g,'POUR LES AMIS',370,96,'#a8322c');}),
 pas:[t=>'p'+(t>9.59)+(t>10.68),t=>g=>{title(g,'LE CONTRAT VA À…',90,100);if(t>9.59){line(g,'LE MOINS CHER',220,84);g.strokeStyle='#c62020';g.lineWidth=12;g.beginPath();g.moveTo(240,206);g.lineTo(784,206);g.stroke();}
   if(t>10.68){line(g,'LE MEILLEUR',330,84);g.beginPath();g.moveTo(280,316);g.lineTo(744,316);g.stroke();}line(g,'SON POTE',450,96,'#2ea44f');}],
 offres:B('offres',g=>{title(g,"APPEL D'OFFRES",100,120);line(g,'NOUVELLE ROUTE',240,80);line(g,'CANDIDATS : 1',360,96,'#a8322c');line(g,'(DURÉE : 4 MIN)',460,56,'#777');}),
 contrat1:B('c1',g=>{title(g,'CONTRAT : ROUTE',110,110);line(g,'ATTRIBUÉ À : BÉBERT',260,80);line(g,'COMPÉTENCE : BARBECUE',370,70,'#777');}),
 contrat2:B('c2',g=>{title(g,'CONTRAT : HÔPITAL',110,110);line(g,'ATTRIBUÉ À : JOJO',260,80);line(g,'RÉFÉRENCE : 1 CABANE',370,70,'#777');}),
 vs:B('vs',g=>{g.textAlign='center';g.fillStyle='#a8322c';g.font='96px VT';g.fillText('NÉPOTISME',270,110);g.fillText('COPINAGE',760,110);g.fillStyle='#333';g.font='76px VT';g.fillText('= LA FAMILLE',270,240);g.fillText('= LES AMIS',760,240);
   g.fillStyle='#2b4f9e';g.font='96px VT';g.fillText('MÊME RÉSULTAT',512,420);}),
};
const BOARD={cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)]};
const BRIDGECAM={cam:[V(5.5,3.2,12.6),V(4.6,2.8,13.6)],look:[V(0,1,18.5),V(0,1,18.5)]};
const T=[0,3.25,6.44,9.59,11.7,14.18,17.87,19.48,21.56,24.96,26.08,31.17,33.93,35.33,39.96,42.82,49.65,55.58,61.1];
const specs=[
 /*0 HOOK: bridge collapses during the inauguration*/ {sfx:[['thud',.9],['poof',1.1],['scratch',.1]],...BRIDGECAM,run(u){bridge(ease((u-.8)/1.4));carpet.visible=true;
   pose(gen,{x:.4,z:14.8,ry:Math.PI,t:u,armsUp:u<.8?.6:0});tagGen.visible=true;tagGen.position.set(.4,2.75,14.8);crowd.forEach((c,i)=>pose(c,{x:-2.6+i*1.6+(i>1?1.2:0),z:13.6,ry:Math.PI,t:u,armsUp:u>1.2?1:0}));
   if(u>.9&&u<2.4){sCrash.visible=true;sCrash.position.set(0,3,18);}poof(V(0,.5,18.5),u-1.0,3);}},
 /*1 built by his best friend*/ {...BRIDGECAM,cam:[V(3,2.2,10.5),V(2.4,2.1,10)],look:[V(0,1.4,14),V(0,1.4,14)],run(u){bridge(1);pose(gen,{x:-.4,z:14,ry:Math.PI*0,t:u,wave:1});pose(bebert,{x:.5,z:14,ry:0,t:u,armsUp:1});tagB.visible=true;tagB.position.set(.5,2.6,14);}},
 /*2 definition*/ {board:bd.def,...BOARD,run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,cross:1});}},
 /*3 not cheapest, not best*/ {board:bd.pas,cam:[V(0,4.2,.9),V(0,4.3,.1)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],run(u){}},
 /*4 the one who plays cards with you on Saturdays*/ {cam:[V(-4,2.7,9.4),V(-4,2.55,8.8)],look:[V(-4,1,6),V(-4,1,6)],run(u){ctable.visible=true;
   [[gen,-4,5.2,0],[bebert,-4.8,6.1,Math.PI/2],[jojo,-3.2,6.1,-Math.PI/2]].forEach(([c,x,z,ry])=>{pose(c,{x,z,ry,t:u,armsUp:c===bebert&&u>1.4?.7:0});sit(c);});}},
 /*5 call for tenders: 1 candidate*/ {board:bd.offres,...BOARD,run(u){}},
 /*6 the General watches him arrive*/ {cam:[V(1.8,2,4.4),V(1.4,1.95,4)],look:[V(0,1.6,1),V(0,1.6,1)],run(u){pose(gen,{x:-.8,z:.2,ry:faceTo(-.8,.2,2,2),t:u,cross:1});const k=ease(u/1.5);pose(bebert,{x:lerp(4,1.2,k),z:lerp(3,1.6,k),ry:faceTo(4,3,1.2,1.6),walk:k<1?u:-1,t:u});tagGen.visible=true;tagGen.position.set(-.8,2.75,.2);}},
 /*7 CLIP « c'est qui ce mignon ? »*/ {sfx:[['chime',.1]],cam:[V(.2,2.3,5.8),V(.2,2.2,5.2)],look:[V(.2,1.6,1),V(.2,1.6,1)],run(u){pose(gen,{x:-.8,z:.2,ry:faceTo(-.8,.2,1.2,1.6),t:u,armsUp:.5});pose(bebert,{x:1.2,z:1.6,ry:faceTo(1.2,1.6,-.8,.2),t:u,salute:1});
   tagB.visible=true;tagB.position.set(1.2,2.6,1.6);hearts.forEach((h,i)=>{h.visible=true;const a=u*2+i;h.position.set(1.2+Math.cos(a)*.7,1.6+((u*.6+i*.17)%1)*1.3,1.6+Math.sin(a)*.35);});}},
 /*8 Bébert, barbecue specialist*/ {cam:[V(5.8,2.1,9),V(5.4,2,8.4)],look:[V(4,1.2,6),V(4,1.2,6)],run(u){bbq.visible=true;pose(bebert,{x:4,z:5.2,ry:0,t:u,point:Math.sin(u*4)>0?.8:0});tagB.visible=true;tagB.position.set(4,2.6,5.2);
   smoke.forEach((m,i)=>{const k=((u*.5+i/10)%1);m.visible=true;m.position.set(4+Math.sin(i)*.2,1.3+k*2,6+Math.cos(i)*.2);m.scale.setScalar(.6+k*1.5);m.material.opacity=.6*(1-k);});}},
 /*9 contract signed*/ {board:bd.contrat1,stamp:['SIGNÉ',.25],...BOARD,run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,wave:1});}},
 /*10 new hospital → Jojo, who only built a shed*/ {board:bd.contrat2,cam:[V(-2.4,2.3,13.4),V(-2.8,2.2,12.9)],look:[V(-5.4,1.2,9.4),V(-5.4,1.2,9.4)],run(u){shack.visible=true;shack.rotation.z=Math.sin(u*3)*.06;pose(jojo,{x:-4.4,z:10.4,ry:faceTo(-4.4,10.4,-2.4,13.4),t:u,wave:1});tagJ.visible=true;tagJ.position.set(-4.4,2.6,10.4);}},
 /*11 « il répond » + CLIP « on me drague » — the shed collapses behind him*/ {sfx:[['thud',1.95]],cam:[V(-2.8,2.2,13),V(-3,2.1,12.6)],look:[V(-5.2,1.3,9.4),V(-5.2,1.3,9.4)],
   run(u){if(u<1.9){shack.visible=true;shack.rotation.z=Math.sin(u*3)*.06;}poof(V(-6,0,9),u-1.9,6);pose(jojo,{x:-4.4,z:10.4,ry:faceTo(-4.4,10.4,-2.8,13),t:u,armsUp:u>.9&&u<2?.5:0,headTilt:u>.9&&u<2?.25:0});
     if(u>.9&&u<2.2)hearts.forEach((h,i)=>{h.visible=true;h.position.set(-4.4+Math.cos(u*2+i)*.6,1.8+((u*.6+i*.17)%1),10.4);});tagJ.visible=true;tagJ.position.set(-4.4,2.6,10.4);}},
 /*12 contract signed too*/ {board:bd.contrat2,stamp:['SIGNÉ',.2],...BOARD,run(u){pose(gen,{x:0,y:.9,z:-4.3,t:u,armsUp:1});}},
 /*13 who pays? you, with your taxes*/ {cam:[V(3.6,2.5,12.4),V(3.2,2.4,12)],look:[V(0,1.2,16),V(0,1.2,16)],run(u){bridge(1);pose(payer,{x:.3,z:15.4,ry:faceTo(.3,15.4,2.6,13.4),t:u,point:.6});tagP.visible=true;tagP.position.set(.3,2.6,15.4);
   coins.forEach((m,i)=>{const k=clamp((u-i*.15)/1.2);m.visible=k>0&&k<1;m.position.set(.3+k*(-3),1.2+Math.sin(k*Math.PI)*1.5,15.4-k*2);m.rotation.y=u*6;});if(u>2.5){sWallet.visible=true;sWallet.position.set(.3,3,15.4);}}},
 /*14 CLIP « maudit l'homme »*/ {cam:[V(2.2,1.9,13),V(1.9,1.85,12.7)],look:[V(.3,1.5,15.4),V(.3,1.5,15.4)],run(u){bridge(1);pose(payer,{x:.3,z:15.4,ry:faceTo(.3,15.4,2.2,13),t:u,armsUp:Math.sin(u*6)>0?1:.4});tagP.visible=true;tagP.position.set(.3,2.6,15.4);}},
 /*15 the friends arrive at the inauguration… CLIP « en Versace »*/ {cam:[V(3.4,2,8.4),V(2.6,1.9,9.6)],look:[V(0,1.4,12.5),V(0,1.4,14)],
   run(u){bridge(1);carpet.visible=true;const k=ease(u/4.5);[[bebertG,-.35],[jojoG,.35]].forEach(([c,dx],i)=>pose(c,{x:dx,z:lerp(9.8,14,k),ry:0,walk:k<1?u:-1,t:u,wave:u>4?1:0}));
     tagBG.visible=true;tagBG.position.set(-.35,2.6,bebertG.root.position.z);tagJG.visible=true;tagJG.position.set(.35,2.6,jojoG.root.position.z);
     sparks.forEach((s,i)=>{s.visible=Math.sin(u*9+i*2)>0;s.position.set((i-2.5)*.4,1.4+(i%3)*.4,bebertG.root.position.z+.3);});}},
 /*16 nepotism = family, cronyism = friends, same result*/ {board:bd.vs,...BOARD,run(u){}},
 /*17 4th wall: the three friends, bridge falls again behind (loop)*/ {mood:'final',sfx:[['thud',4.2]],cam:[V(0,2.3,7.8),V(0,2.2,7.1)],look:[V(0,1.6,13.5),V(0,1.7,13.5)],
   run(u){bridge(ease((u-3.6)/1.4));pose(gen,{x:0,z:12.6,t:u,point:u>1.5?1:0});pose(bebertG,{x:-.9,z:12.6,t:u,wave:1});pose(jojoG,{x:.9,z:12.6,t:u,wave:1});tagGen.visible=true;tagGen.position.set(0,2.75,12.6);}},
];
if(specs.length!==T.length-1) throw new Error('specs '+specs.length+' vs '+(T.length-1));
return specs.map((s,i)=>({cap:[],d:+(T[i+1]-T[i]).toFixed(3),cam:s.cam,look:s.look,board:s.board||null,stamp:s.stamp,chat:s.chat,sfx:s.sfx,mood:s.mood,
  run:u=>{hideAll();s.run(u,T[i]+u);}}));
}
