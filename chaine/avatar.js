export default function(E){
const {THREE,V,pose,maxMil}=E;
return [{d:3,cap:[],board:['b',g=>{}],cam:[V(.38,121.78,9.75),V(.38,121.78,9.75)],look:[V(0,121.62,8),V(0,121.62,8)],
 run(u){E.scene.background=new THREE.Color('#f2b134');E.scene.fog=null;pose(maxMil,{x:0,y:120,z:8,ry:.15,t:0,salute:1});}}];
}
