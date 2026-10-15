// Browser checks for the October 11 fixes: mobile orbit, slider press, Tank Til
// cards, client captions, footer guides, founding year. QA_BASE selects the server.
const {chromium}=require('/tmp/novatech-browser/node_modules/playwright-core');const assert=require('node:assert/strict');const fs=require('node:fs');
const base=process.env.QA_BASE||'http://127.0.0.1:4197';const results=[];
const run=async(name,fn)=>{try{await fn();results.push({test:name,status:'PASS'})}catch(e){results.push({test:name,status:'FAIL',error:String(e.message||e).slice(0,300)})}};
(async()=>{const browser=await chromium.launch({executablePath:'/root/.cache/puppeteer/chrome/linux-154.0.8037.57/chrome-linux64/chrome',env:{...process.env,LD_LIBRARY_PATH:'/tmp/novatech-browser-libs/root/usr/lib/x86_64-linux-gnu'}});
const page=async(w,opts={})=>browser.newPage({viewport:{width:w,height:w<768?800:900},isMobile:w<768,hasTouch:w<768,...opts});
const angle=el=>el.evaluate(e=>{const m=new DOMMatrix(getComputedStyle(e).transform);return Math.atan2(m.b,m.a)*180/Math.PI});
for(const w of [320,390,768]){await run(`orbit-rotates-${w}`,async()=>{const p=await page(w);await p.goto(base+'/',{waitUntil:'load'});const ring=p.locator('.home-hero-graphic .orbit-loop').first();await p.waitForTimeout(400);
 assert.equal(await ring.evaluate(e=>getComputedStyle(e).animationPlayState),'running');const a=await angle(ring);await p.waitForTimeout(900);const b=await angle(ring);assert.ok(Math.abs(b-a)>5,`angle ${a}->${b}`);await p.close();});}
await run('orbit-reduced-motion-paused',async()=>{const p=await page(390,{reducedMotion:'reduce'});await p.goto(base+'/',{waitUntil:'load'});const ring=p.locator('.home-hero-graphic .orbit-loop').first();await p.waitForTimeout(400);assert.equal(await ring.evaluate(e=>getComputedStyle(e).animationPlayState),'paused');await p.close();});
await run('slider-press-keeps-moving',async()=>{const p=await page(1440);await p.goto(base+'/',{waitUntil:'load'});const sec=p.locator('#motion-showcase-title');await sec.scrollIntoViewIfNeeded();await p.waitForTimeout(2500);
 const card=p.locator('a[data-poster-copy]').filter({has:p.locator(':scope')}).nth(2);const pos=()=>p.locator('a[data-poster-copy]').first().evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).e);
 const box=await p.locator('#motion-showcase-title').locator('xpath=ancestor::section').boundingBox();await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();await p.waitForTimeout(80);
 // dragging a little is a drag, not a click: page must not navigate and track must resume
 await p.mouse.move(box.x+box.width/2-60,box.y+box.height/2,{steps:6});await p.mouse.up();await p.waitForTimeout(600);
 assert.ok(p.url().endsWith('/'),'navigated on drag');const a=await pos();await p.waitForTimeout(800);const b=await pos();assert.ok(Math.abs(b-a)>5,`track stalled ${a}->${b}`);await p.close();});
await run('tank-til-cards',async()=>{const p=await page(1440);await p.goto(base+'/',{waitUntil:'load'});
 assert.equal(await p.locator('#portfolios-slider .swiper-slide',{hasText:'نرم افزار تانک تیل'}).count(),1);
 assert.equal(await p.locator('#portfolios-slider .swiper-slide',{hasText:'مشعل'}).count(),0);
 assert.ok(await p.locator('a[data-poster-copy="primary"]',{hasText:'نرم افزار تانک تیل'}).count()===1);
 assert.equal(await p.locator('a[data-poster-copy]',{hasText:'نفت و گاز'}).count(),0);
 assert.ok(await p.locator('#ready-products-title').count()===1&&!(await p.content()).includes('محصولات آماده نواتیک'));await p.close();
 const q=await page(1440);await q.goto(base+'/portfolio',{waitUntil:'load'});assert.ok(await q.locator('a[href="/portfolio/oil-and-gas-management-system"]').count()>0,'mashal case link kept');assert.ok(await q.getByText('نرم افزار تانک تیل').count()>0);await q.close();});
await run('client-logos-and-captions',async()=>{const p=await page(390);await p.goto(base+'/',{waitUntil:'load'});const items=p.locator('.client-logo-item:not([aria-hidden])');assert.equal(await items.count(),21);
 for(let i=0;i<21;i++){const im=items.nth(i).locator('img');await im.evaluate(e=>{e.loading='eager'});await im.evaluate(e=>e.decode().catch(()=>{}));assert.ok(await im.evaluate(e=>e.complete&&e.naturalWidth>0),`logo ${i} broken`);}
 assert.equal(await p.locator('.client-logo-name',{hasText:'Telionix'}).count()>=1,true);await p.close();});
for(const w of [320,390,768,1024,1440]){await run(`footer-guides-${w}`,async()=>{const p=await page(w);await p.goto(base+'/oil-and-gas-software',{waitUntil:'load'});const f=p.locator('footer');await f.scrollIntoViewIfNeeded();
 const cols=async()=>f.locator('nav').evaluateAll(n=>n.map(e=>Math.round(e.getBoundingClientRect().width)));const before=await cols();
 await f.locator('details summary').click();await p.waitForTimeout(200);assert.equal(await f.locator('details').evaluate(e=>e.open),true);assert.deepEqual(await cols(),before,'columns changed');
 const links=f.locator('details a');const n=await links.count();assert.ok(n>=20,`guides ${n}`);for(let i=0;i<n;i++)assert.ok(await links.nth(i).isVisible(),`guide link ${i} hidden`);
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow');assert.ok(await f.getByRole('link',{name:'درخواست مشاوره'}).isVisible());await p.close();});}
await run('about-founding-year',async()=>{const p=await page(1440);await p.goto(base+'/about',{waitUntil:'load'});const t=await p.content();assert.ok(t.includes('۱۳۹۵')&&!t.includes('۱۴۰۰')&&t.includes('بیش از ۹'));await p.close();});
await run('nazer-page',async()=>{const p=await page(390);const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(base+'/accounting-software',{waitUntil:'load'});assert.ok(await p.locator('h1',{hasText:'ناظر'}).isVisible());assert.equal(await p.locator('.orbit-loop').count(),0);assert.ok(await p.locator('#nazer-fit-title').count()===1);assert.deepEqual(errs,[]);await p.close();});
await browser.close();fs.writeFileSync('qa-artifacts/after/round2.json',JSON.stringify(results,null,2));for(const r of results)console.log(r.status,r.test,r.error||'');if(results.some(r=>r.status!=='PASS'))process.exit(1);})().catch(e=>{console.error(e);process.exit(1)});
