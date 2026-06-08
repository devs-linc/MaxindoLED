import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const ROOT = process.argv[2] || '.vercel/output/static';
const PORT = +(process.argv[3]||4321);
const TYPES={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
function resolve(u){ u=decodeURIComponent(u.split('?')[0]); let p=path.join(ROOT,u);
  const tries=[p, p+'.html', path.join(p,'index.html')];
  for(const t of tries){ try{ if(fs.statSync(t).isFile()) return t; }catch{} }
  return null; }
http.createServer((req,res)=>{ const f=resolve(req.url);
  if(!f){ res.writeHead(404); res.end('404'); return; }
  res.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream'});
  fs.createReadStream(f).pipe(res);
}).listen(PORT, ()=>console.log('static server on http://localhost:'+PORT+' serving '+ROOT));
