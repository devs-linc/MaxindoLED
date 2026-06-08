import sharp from 'sharp';
import fs from 'node:fs';
const SRC='C:/dev/_oldsite/img_partner.png';
const OUTDIR='C:/dev/maxindoled-site/public/clients';
fs.rmSync(OUTDIR,{recursive:true,force:true});
fs.mkdirSync(OUTDIR,{recursive:true});
const m=await sharp(SRC).metadata();
const W=m.width,H=m.height; // 1920 x 571
// Row 1 = top emblem band (detected y3..94). Remaining block y=100..566 split into 6 equal rows.
const segs=[[3,95]];
const blockTop=100, blockBot=566, n=6, h=(blockBot-blockTop)/n;
for(let i=0;i<n;i++) segs.push([Math.round(blockTop+i*h), Math.round(blockTop+(i+1)*h)]);
let idx=0;
for(const [a,b] of segs){
  idx++;
  const top=a, height=b-a;
  await sharp(SRC).extract({left:0,top,width:W,height})
    .resize({height:140, withoutEnlargement:false}) // normalize display res
    .webp({quality:88}).toFile(`${OUTDIR}/row-${idx}.webp`);
  console.log(`row-${idx}.webp  y=${a}..${b}  h=${height}`);
}
console.log('rows:',idx);
