const fs=require('node:fs');
const base=process.env.QA_BASE||'http://127.0.0.1:4198';
const label=process.env.QA_LABEL||'after';
(async()=>{
const xml=await(await fetch(base+'/sitemap.xml')).text();
const routes=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const urls=new Set(),css=new Set();
for(const route of routes){const html=(await(await fetch(base+route)).text()).replaceAll('&amp;','&');
 for(const m of html.matchAll(/\/_next\/image\?[^"\s<>]+/g))urls.add(m[0].replace(/\\+$/, ''));
 for(const m of html.matchAll(/\/images\/[^"\s<>]+?\.(?:png|jpe?g|webp|avif|gif|svg|ico)/g))urls.add(m[0]);
 for(const m of html.matchAll(/href="([^" ]+\.css)"/g))css.add(m[1]);
}
for(const url of css){const body=await(await fetch(base+url)).text();for(const m of body.matchAll(/url\(["']?(\/[^)"']+\.(?:png|jpe?g|webp|avif|gif|svg|ico))["']?\)/g))urls.add(m[1]);}
for(const u of [...urls])if(u.startsWith('/_next/image')){const image=new URL(u,base).searchParams.get('url');if(image?.startsWith('/'))urls.add(image);}
const recovered=JSON.parse(fs.readFileSync('/root/novatech-audit-20261010/recoverable-images.json')).concat(JSON.parse(fs.readFileSync('qa-artifacts/additional-recovered-assets.json')));
for(const item of recovered){urls.add(item.url);if(!/\.(svg|gif|ico)$/.test(item.url))urls.add('/_next/image?url='+encodeURIComponent(item.url)+'&w=640&q=75');}
const normalized=new Set([...urls].map(u=>{if(!u.startsWith('/_next/image'))return u;const image=new URL(u,base).searchParams.get('url');return '/_next/image?url='+encodeURIComponent(image)+'&w=640&q=75'}));
const results=[],queue=[...normalized];await Promise.all(Array.from({length:3},async()=>{while(queue.length){const url=queue.shift();try{const response=await fetch(base+url,{headers:{Accept:'image/avif,image/webp,image/*'}});const bytes=(await response.arrayBuffer()).byteLength;results.push({url,status:response.status,mime:response.headers.get('content-type'),bytes,pass:response.ok&&response.headers.get('content-type')?.startsWith('image/')});}catch(e){results.push({url,pass:false,error:e.message})}}}));
fs.mkdirSync('qa-artifacts/'+label,{recursive:true});fs.writeFileSync('qa-artifacts/'+label+'/media.json',JSON.stringify({base,routes:routes.length,css:css.size,total:results.length,failed:results.filter(r=>!r.pass),results},null,2));console.log(JSON.stringify({total:results.length,failed:results.filter(r=>!r.pass)},null,2));if(results.some(r=>!r.pass))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
