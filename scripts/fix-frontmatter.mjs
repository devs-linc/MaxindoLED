import fs from 'node:fs';
import path from 'node:path';
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=path.join(d,e.name);return e.isDirectory()?walk(p):(e.name.endsWith('.md')?[p]:[]);});}
const QUOTE_KEYS=new Set(['title','description','name','category','excerpt','label','value']);
function quote(v){
  v=v.trim();
  if(v.startsWith('"')||v.startsWith("'")||v.startsWith('[')||v.startsWith('{'))return v;
  if(/^-?\d+(\.\d+)?$/.test(v))return v;
  return '"'+v.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
}
let files=0,changed=0;
for(const f of walk('src/content')){
  const s=fs.readFileSync(f,'utf8');
  const m=s.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/);
  if(!m)continue;
  files++;
  const fixed=m[2].split(/\r?\n/).map(line=>{
    const mm=line.match(/^(\s*)(?:-\s+)?([A-Za-z0-9_]+):[ \t]+(.+?)[ \t]*$/);
    if(mm&&QUOTE_KEYS.has(mm[2])){
      const dash=/^\s*-\s/.test(line)?line.match(/^(\s*-\s+)/)[1]:mm[1];
      return dash+mm[2]+': '+quote(mm[3]);
    }
    return line;
  }).join('\n');
  const out=m[1]+fixed+m[3]+s.slice(m[0].length);
  if(out!==s){fs.writeFileSync(f,out);changed++;}
}
console.log('scanned',files,'files, normalized',changed);
