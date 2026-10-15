const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('/tmp/novatech-browser/node_modules/playwright-core');
const base = process.env.QA_BASE || 'http://127.0.0.1:4197';
const label = process.env.QA_LABEL || 'after';
const out = path.resolve('qa-artifacts', label);
fs.mkdirSync(out, {recursive:true});
const widths = [320,375,390,430,768,1024,1440,1920];
const keyRoutes = ['/', '/accounting-software', '/oil-and-gas-software', '/portfolio'];
async function pool(items, fn, n=2) {
  const queue = [...items]; const results=[];
  await Promise.all(Array.from({length:n}, async()=>{while(queue.length){const item=queue.shift();results.push(await fn(item));}}));
  return results;
}
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'/root/.cache/puppeteer/chrome/linux-154.0.8037.57/chrome-linux64/chrome',env:{...process.env,LD_LIBRARY_PATH:'/tmp/novatech-browser-libs/root/usr/lib/x86_64-linux-gnu'}});
  const xml=await (await fetch(base+'/sitemap.xml')).text();
  const routes=[...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname))];
  const images=new Map(), links=new Set();
  const pages=await pool(routes,async route=>{
    const page=await browser.newPage({viewport:{width:Number(process.env.QA_CRAWL_WIDTH||1440),height:900}});
    const errors=[], consoleErrors=[], failed=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
    page.on('response',r=>{if(r.request().resourceType()==='image'){images.set(r.url(),{url:r.url(),status:r.status(),mime:r.headers()['content-type'],routes:[...(images.get(r.url())?.routes||[]),route]});}if(r.status()>=400)failed.push({url:r.url(),status:r.status()});});
    await page.addInitScript(()=>{
      window.__qa={cls:0,lcp:0};
      new PerformanceObserver(l=>l.getEntries().forEach(e=>{if(!e.hadRecentInput)window.__qa.cls+=e.value})).observe({type:'layout-shift',buffered:true});
      new PerformanceObserver(l=>l.getEntries().forEach(e=>window.__qa.lcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});
    });
    let data;
    try {
      const response=await page.goto(base+route,{waitUntil:'load',timeout:45000});
      await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,65));}window.scrollTo(0,0)});
      await page.waitForTimeout(700);
      data=await page.evaluate(()=>({title:document.title,h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel="canonical"]')?.href,overflow:document.documentElement.scrollWidth>innerWidth+1,broken:[...document.images].filter(i=>i.currentSrc&&i.getBoundingClientRect().width>0&&i.complete&&!i.naturalWidth).map(i=>i.currentSrc||i.src),links:[...document.querySelectorAll('a[href]')].map(a=>a.href),metrics:{...window.__qa,ttfb:performance.getEntriesByType('navigation')[0]?.responseStart,transfer:performance.getEntriesByType('resource').reduce((a,e)=>a+e.transferSize,0),requests:performance.getEntriesByType('resource').length}}));
      data.status=response.status();
      data.links.forEach(u=>{if(new URL(u).origin===new URL(base).origin)links.add(new URL(u).pathname)});delete data.links;
    }catch(e){errors.push(e.message)}
    await page.close();console.log(label,route,failed.length,'failed');
    return {route,...data,errors,consoleErrors,failed};
  });
  const linkStatuses=await pool([...links],async route=>{try{const r=await fetch(base+route);return {route,status:r.status,final:r.url}}catch(e){return {route,error:e.message}}},3);
  const visual=await pool(keyRoutes,async route=>{
    const page=await browser.newPage();const results=[];
    for(const width of widths){await page.setViewportSize({width,height:900});await page.goto(base+route,{waitUntil:'load'});await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(350);const slug=route==='/'?'home':route.slice(1);await page.screenshot({path:path.join(out,slug+'-'+width+'.png'),fullPage:true});results.push({width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)});}
    await page.close();return {route,results};
  });
  await browser.close();
  const result={base,label,at:new Date().toISOString(),pages,images:[...images.values()],linkStatuses,visual};
  fs.writeFileSync(path.join(out,'crawl.json'),JSON.stringify(result,null,2));
  console.log(JSON.stringify({routes:pages.length,images:images.size,brokenImages:result.images.filter(i=>i.status>=400).length,brokenLinks:linkStatuses.filter(l=>l.status>=400||l.error).length,pageErrors:pages.filter(p=>p.errors.length).length,overflow:visual.filter(v=>v.results.some(r=>r.overflow))},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
