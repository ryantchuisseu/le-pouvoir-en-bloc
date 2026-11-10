// Scénario d'exemple : « Comment naît une dictature ? » (31 s, 12 plans)
// Chaque plan : {d, cap:[...], cam:[from,to], look:[from,to], board, stamp, chat, sfx, run(u)}
export default function(E){
const {V,pose,hide,poof,title,line,tally,ease,easeOutBack,lerp,clamp,faceTo,crowdLookPodium,
  maxCivil,maxMil,statue,journalist,guards,crowd,v42,tagMax,tagJourn,tag42,qMarks,checkMark,stampSprite,plaque,
  confetti,fireGroup,smokes,cage,ballotPaper}=E;
return [
 {d:2.6,cap:['Comment naît','une dictature ?'],
  cam:[V(1.6,3,7.5),V(1.2,3,5.4)],look:[V(0,2.4,-4),V(0,2.6,-4)],
  board:['welcome',g=>{title(g,'VILLAGE CUBE',110,120);line(g,'BIENVENUE À TOUS !',260,80);line(g,'POP. : 42 HABITANTS',360,64,'#555');}],
  run(u){pose(maxCivil,{x:0,y:.9,z:-4.3,t:u,wave:1});tagMax.visible=true;tagMax.position.set(0,3.35,-4.3);crowdLookPodium(u,i=>({armsUp:i%3==0?.5:0}));}},
 {d:2.6,cap:['Max est élu','chef du village.'],
  cam:[V(6.5,3.4,3.4),V(5.4,3.4,2.4)],look:[V(.6,2.6,-3.6),V(.3,2.8,-3.8)],
  sfx:[['chime',1.2]],
  board:[u=>'elec'+Math.min(12,(u*7|0)),u=>g=>{title(g,'ÉLECTIONS',80);const n=Math.min(12,(u*7|0));
    g.textAlign='left';[['MAX',n],['LÉA',Math.min(4,n)],['TOM',Math.min(2,n)]].forEach(([nm,k],i)=>{const y=180+i*110;if(i==0){g.fillStyle='rgba(240,210,80,.45)';g.fillRect(40,y-48,944,96);}g.fillStyle='#333';g.font='80px VT';g.fillText(nm,70,y+4);tally(g,260,y-24,k);});g.textAlign='center';}],
  run(u){pose(maxCivil,{x:0,y:.9,z:-4.3,t:u,armsUp:u>1.2?1:0});tagMax.visible=true;tagMax.position.set(0,3.35,-4.3);
    crowdLookPodium(u,i=>({armsUp:u>1.3&&i%2==0?1:0}));
    if(u>1.2)confetti.forEach(m=>{const d=m.userData,k=u-1.2;m.visible=true;m.position.set(d.x+Math.sin(k*3+d.ph)*.3,d.y0-k*d.sp*2.2,d.z);m.rotation.set(k*5+d.ph,k*3,d.ph);});}},
 {d:2.6,cap:['Puis arrive','une crise.'],
  cam:[V(-3.5,2.4,2.5),V(-5,3,0.5)],look:[V(-11,3.2,-6),V(-11.5,3.8,-6)],
  board:null,
  run(u){fireGroup.visible=true;smokes.forEach(m=>m.visible=true);
    [[-7,-1],[-8.5,1],[-6,1.5],[-9,-2.5]].forEach(([x,z],i)=>{const c=crowd[i];const k=((u*.9+i*.3)%1);pose(c,{x:x+Math.sin(u*2+i)*1.2,z:z+Math.cos(u*2+i),ry:u*2+i*1.5,walk:u*1.4+i*.2});
      qMarks[i].visible=true;qMarks[i].position.set(c.root.position.x,2.75+Math.sin(u*6+i)*.08,c.root.position.z);});}},
 {d:2.6,cap:['Max réclame des','pouvoirs spéciaux…','« temporaires »'],
  cam:[V(1.8,1.3,.6),V(1.1,1.5,-.6)],look:[V(0,3,-4.6),V(0,3.3,-4.6)],
  board:['powers',g=>{title(g,'POUVOIRS SPÉCIAUX',120,104);line(g,'POUR GÉRER LA CRISE',260,70);line(g,'(TEMPORAIRES)',380,58,'#777');}],
  run(u){pose(maxCivil,{x:0,y:.9,z:-4.3,ry:.25,t:u,point:1});tagMax.visible=true;tagMax.position.set(0,3.35,-4.3);crowdLookPodium(u);}},
 {d:2.6,cap:['Les élections ?','Annulées.'],
  cam:[V(0,3.7,1.6),V(0,4,.3)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)],
  board:['elec2',g=>{title(g,'ÉLECTIONS',100,110);line(g,'PROCHAIN VOTE :',250,74);line(g,'DIMANCHE',350,90,'#2b4f9e');}],
  stamp:['ANNULÉES',1.15],
  run(u){pose(maxMil,{x:0,y:.9,z:-4.3,t:u,cross:1});crowdLookPodium(u);}},
 {d:2.6,cap:['Les journalistes ?','En prison.'],
  cam:[V(-2.4,1.9,8.4),V(-3.4,1.8,7.2)],look:[V(-6,1.3,4),V(-6,1.3,4)],
  board:null,
  run(u){const drop=ease((u-1)/0.35);cage.position.y=3.2*(1-drop);cage.visible=true;
    const wx=lerp(-3.5,-6,ease(u/1));pose(journalist,{x:wx,z:4,ry:u<1?-Math.PI/2:0.4,walk:u<1?u:-1,t:u,headTilt:u>1.4?-.2:0});
    tagJourn.visible=true;tagJourn.position.set(journalist.root.position.x,2.55,4);
    if(u>1.35){stampSprite.visible=true;const s=easeOutBack((u-1.35)/.2);stampSprite.position.set(-6,3.5,4.6);stampSprite.material.rotation=.15;stampSprite.scale.set(5.2*s*.18*4,.814*s*.18*4*1,1);}
    pose(guards[0],{x:-7.9,z:5.2,ry:.9,t:u,cross:1});},
  chat:[['Journaliste a été réduit au silence.',1.4]], sfx:[['clang',1.35]]},
 {d:2.6,cap:["L'armée protège Max…",'pas le peuple.'],
  cam:[V(-6.5,3.2,4.5),V(-5,3,3.2)],look:[V(0,1.8,-3.2),V(0,1.9,-3.4)],
  board:['rules',g=>{title(g,'RÈGLES DU VILLAGE',90,96);line(g,'1. OBÉIR À MAX',220);line(g,'2. NE PAS CRITIQUER',320);line(g,'3. VOIR RÈGLE N°1',420,72,'#a8322c');}],
  run(u){pose(maxMil,{x:0,y:.9,z:-4.3,t:u,cross:1});tagMax.visible=true;tagMax.position.set(0,3.55,-4.3);
    const tg=[[-1.6,-1.8],[1.6,-1.8],[-3.6,-2.4],[3.6,-2.4]];
    guards.forEach((g,i)=>{const st=i*.25;const k=ease((u-st)/1.3);const sx=tg[i][0]<0?-9:9;const x=lerp(sx,tg[i][0],k),z=lerp(-1,tg[i][1],k);
      pose(g,{x,z,ry:k<1?(sx<0?Math.PI/2:-Math.PI/2):0,walk:k<1?u:-1,t:u,salute:k>=1?1:0});});
    crowdLookPodium(u,{},[0,1,3]);
    [[0,-5.5,3],[1,-4.5,4.5],[3,4.8,4.5]].forEach(([i,x,z])=>pose(crowd[i],{x,z,ry:faceTo(x,z,0,-4),t:u+i}));}},
 {d:2.6,cap:['Son visage','est partout.'],
  cam:[V(3.4,1.3,9.5),V(3.9,1.5,8.6)],look:[V(9,3.5,-1),V(9,7.5,-1)],
  board:null,
  run(u){pose(statue,{x:9,y:2.3,z:-1,ry:-.35,t:0,salute:1});plaque.visible=true;
    [[7,3,2],[10.5,3.4,6],[8.4,4.4,7]].forEach(([x,z,i])=>{pose(crowd[i],{x,z,ry:faceTo(x,z,9,-1),t:u+i,headTilt:-.5});});}},
 {d:2.6,cap:['Le critiquer ?','Il disparaît.'],
  cam:[V(1.6,3.4,7.6),V(1.3,3.2,6.6)],look:[V(0,1.4,2.4),V(0,1.4,2.4)],
  board:['rules',null], chat:[['Villageois_42 a disparu.',1.45]], sfx:[['poof',1.35]],
  run(u){crowdLookPodium(u,{},[4]);const gone=u>1.35;
    if(!gone){pose(v42,{x:.2,z:2.6,ry:Math.PI*0+faceTo(.2,2.6,0,-4.2),t:u,wave:u>.3?.8:0});tag42.visible=true;tag42.position.set(.2,2.55,2.6);
      qMarks[0].visible=true;qMarks[0].position.set(.2,3.15+Math.sin(u*7)*.06,2.6);}
    else hide(v42);
    poof(V(.2,0,2.6),u-1.35,123);
    const gk=ease((u-.6)/.6);pose(guards[0],{x:lerp(3.8,1.2,gk),z:lerp(4.6,3.2,gk),ry:faceTo(3.8,4.6,.2,2.6),walk:gk<1?u:-1,t:u});
    pose(maxMil,{x:0,y:.9,z:-4.3,t:u,cross:1});}},
 {d:2.6,cap:['Son mandat ?','À vie.'],
  cam:[V(0,4,2.2),V(0,4.2,.7)],look:[V(0,4.3,-6.4),V(0,4.4,-6.4)],
  board:[u=>'mandat'+Math.min(40,(u*24|0)),u=>g=>{title(g,'MANDAT DE MAX',80,100);g.fillStyle='#333';g.font='64px VT';g.fillText('ANNÉES AU POUVOIR :',512,170);
    const n=Math.min(40,u*24|0);for(let r=0;r<3;r++){const k=Math.max(0,Math.min(15,n-r*15));g.save();g.translate(-180,0);tally(g,300,230+r*92,k,58);g.restore();}}],
  stamp:['À VIE',1.25],
  run(u){pose(maxMil,{x:0,y:.9,z:-4.3,t:u,cross:1});}},
 {d:3.0,cap:["Ça, c'est","une dictature."],
  cam:[V(0,2.6,10),V(0,3,7.4)],look:[V(0,3.2,-4),V(0,3.6,-4.5)],
  board:['def',g=>{title(g,'DICTATURE',85,116);line(g,'UN SEUL CHEF',210);line(g,'AUCUN CONTRE-POUVOIR',300);line(g,'AUCUNE LIBERTÉ',390);line(g,'AUCUNE FIN',480,72,'#a8322c');}],
  run(u){pose(maxMil,{x:0,y:.9,z:-4.3,t:u,cross:1});tagMax.visible=true;tagMax.position.set(0,3.55,-4.3);
    [[-1.6,-1.8],[1.6,-1.8],[-3.6,-2.4],[3.6,-2.4]].forEach(([x,z],i)=>pose(guards[i],{x,z,t:u}));
    crowdLookPodium(u,i=>({headTilt:.25}),[]);}},
 {d:2.6,cap:['La démocratie,','ça se protège.'],
  cam:[V(6,2.3,-.2),V(5.2,2.1,0)],look:[V(2.8,1.4,.9),V(2.8,1.5,.9)],
  sfx:[['chime',1.15]],
  board:['vote',g=>{title(g,'VOTEZ.',200,200,'#2b4f9e');}],
  run(u){pose(crowd[2],{x:2.8,z:1.6,ry:Math.PI,t:u,point:u<1.1?1:0});
    const pk=ease((u-.3)/.8);ballotPaper.visible=true;ballotPaper.position.set(2.8+.0,lerp(1.85,1.55,pk),lerp(1.1,.6,pk));
    if(u>1.1)ballotPaper.visible=false;
    if(u>1.15){checkMark.visible=true;const s=easeOutBack((u-1.15)/.25);checkMark.position.set(2.8,2.6,.6);checkMark.scale.set(s*.9,s*.9,1);}
    [[1.2,2.6,0],[4.4,2.8,1],[3.6,4,3]].forEach(([x,z,i])=>pose(crowd[i],{x,z,ry:faceTo(x,z,2.8,.6),t:u+i,armsUp:u>1.3?1:0}));
    pose(maxCivil,{x:0,y:.9,z:-4.3,t:u,wave:1});}},
];
}
