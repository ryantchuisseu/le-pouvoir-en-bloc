export default function(E){
const {V,pose,title,line,maxMil,guards,crowdLookPodium,statue,plaque}=E;
E.ballot.visible=false;
return [{d:3,cap:[],board:['name',g=>{title(g,'LE POUVOIR',130,196);line(g,'EN BLOCS',310,196,'#2a2a2a');line(g,'1 JOUR = 1 CONCEPT EXPLIQUÉ',465,62,'#a8322c');}],
 cam:[V(0,6.2,12.6),V(0,6.2,12.6)],look:[V(0,4.4,-6.4),V(0,4.4,-6.4)],
 run(u){pose(maxMil,{x:0,y:.9,z:-4.3,t:0,wave:1});
  [[-1.6,-1.8],[1.6,-1.8],[-3.6,-2.4],[3.6,-2.4]].forEach(([x,z],i)=>pose(guards[i],{x,z,t:0,salute:1}));
  pose(statue,{x:9,y:2.3,z:-1,ry:-.35,t:0,salute:1});plaque.visible=true;crowdLookPodium(0,i=>({armsUp:i%3==0?.8:0}));}}];
}
