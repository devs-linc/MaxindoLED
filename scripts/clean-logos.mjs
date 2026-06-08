import sharp from 'sharp';
import fs from 'node:fs';
const SRC='C:/dev/_logos', OUT='C:/dev/maxindoled-site/public/clients/logos';
fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
const files=fs.readdirSync(SRC).filter(f=>/^logo_\d+\.png$/.test(f)).sort();
const cleaned=[];
for(const f of files){
  const {data,info}=await sharp(SRC+'/'+f).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const W=info.width,H=info.height;
  const isBg=i=>{const r=data[i],g=data[i+1],b=data[i+2],a=data[i+3];return a<18||(r>233&&g>233&&b>233);};
  const seen=new Uint8Array(W*H), st=[];
  const push=(x,y)=>{if(x<0||y<0||x>=W||y>=H)return;const p=y*W+x;if(seen[p])return;if(!isBg(p*4))return;seen[p]=1;st.push(p);};
  for(let x=0;x<W;x++){push(x,0);push(x,H-1);} for(let y=0;y<H;y++){push(0,y);push(W-1,y);}
  while(st.length){const p=st.pop(),x=p%W,y=(p/W)|0;push(x+1,y);push(x-1,y);push(x,y+1);push(x,y-1);}
  for(let p=0;p<W*H;p++) if(seen[p]) data[p*4+3]=0;
  let buf=await sharp(Buffer.from(data),{raw:{width:W,height:H,channels:4}}).png().toBuffer();
  buf=await sharp(buf).trim({threshold:8}).toBuffer().catch(()=>buf);
  const id=f.match(/(\d+)/)[1];
  const dest=`${OUT}/c${id}.webp`;
  await sharp(buf).resize({width:240,height:110,fit:'inside',withoutEnlargement:true}).webp({quality:90,alphaQuality:100}).toFile(dest);
  cleaned.push('c'+id+'.webp');
}
fs.writeFileSync(OUT+'/index.json', JSON.stringify(cleaned));
console.log('cleaned',cleaned.length,'logos ->',OUT);

// verification montage: white chips on dark
const cols=11, cw=132, ch=64, gap=8, rows=Math.ceil(cleaned.length/cols);
const comp=[];
for(let i=0;i<cleaned.length;i++){
  const chipW=cw-gap, chipH=ch-gap;
  const logo=await sharp(OUT+'/'+cleaned[i]).resize({width:chipW-16,height:chipH-12,fit:'inside'}).toBuffer();
  const lm=await sharp(logo).metadata();
  const chip=await sharp({create:{width:chipW,height:chipH,channels:4,background:'#ffffff'}})
    .composite([{input:logo,left:Math.round((chipW-lm.width)/2),top:Math.round((chipH-lm.height)/2)}])
    .png().toBuffer();
  comp.push({input:chip,left:(i%cols)*cw+gap/2,top:Math.floor(i/cols)*ch+gap/2});
}
await sharp({create:{width:cols*cw,height:rows*ch,channels:4,background:'#0a0e1a'}}).composite(comp).png().toFile('C:/dev/_logos/_chips.png');
console.log('chips montage done');
