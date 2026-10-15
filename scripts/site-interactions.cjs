const fs=require('node:fs');
const assert=require('node:assert/strict');
const {chromium}=require('/tmp/novatech-browser/node_modules/playwright-core');
const base=process.env.QA_BASE||'http://127.0.0.1:4197';
const label=process.env.QA_LABEL||'after';
const dir=`qa-artifacts/${label}`;
fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:'/root/.cache/puppeteer/chrome/linux-154.0.8037.57/chrome-linux64/chrome',env:{...process.env,LD_LIBRARY_PATH:'/tmp/novatech-browser-libs/root/usr/lib/x86_64-linux-gnu'}});
 const results=[];
 for(const width of [320,375,390,430,768,1024,1440,1920]){
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto(base,{waitUntil:'load'});
  const toggle=page.locator('#header button[aria-controls="main-navigation"]');
  if(await toggle.isVisible())await toggle.click();
  const products=page.locator('#header details[data-mashal-menu]').nth(0);
  const services=page.locator('#header details[data-mashal-menu]').nth(1);
  await products.locator(':scope > summary').click();assert.equal(await products.getAttribute('open'),'');
  await services.locator(':scope > summary').click();await page.waitForTimeout(100);
  assert.equal(await products.getAttribute('open'),null);
  await page.keyboard.press('Escape');assert.equal(await services.getAttribute('open'),null);
  if(await toggle.isVisible()){await toggle.click();await products.locator(':scope > summary').click();}
  else await products.locator(':scope > summary').click();
  await page.mouse.click(width-8,850);await page.waitForTimeout(100);assert.equal(await products.getAttribute('open'),null);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  results.push({test:'navigation',width,status:'PASS'});await page.close();
 }
 const form=await browser.newPage({viewport:{width:390,height:900}});
 await form.goto(base+'/accounting-software',{waitUntil:'load'});
 let requests=0;await form.route('**/api/contact',async r=>{requests++;await r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,delivery:'whatsapp',message:'برای تکمیل درخواست، پیام واتس‌اپ را ارسال کنید.'})})});
 await form.locator('#order button[type="submit"]').click();assert.equal(requests,0);
 await form.locator('#accounting-demo-name').fill('آزمایش نواتیک');await form.locator('#accounting-demo-phone').fill('123');
 await form.locator('#order button[type="submit"]').click();assert.equal(requests,0);
 await form.locator('#accounting-demo-phone').fill('۰۷۰۲۰۰۸۴۵۴');
 // Prevent any WhatsApp navigation or popup: this test uses a local intercepted API.
 await form.evaluate(()=>{window.open=()=>null});
 await form.locator('#order button[type="submit"]').click();await form.locator('#order [role="status"]').filter({hasText:'هنوز به شرکت ارسال نشده'}).waitFor();assert.equal(requests,1);
 results.push({test:'lead-validation-and-explicit-whatsapp-handoff',status:'PASS',realMessagesSent:0});await form.close();
 const reduced=await browser.newPage({viewport:{width:375,height:900},reducedMotion:'reduce'});await reduced.goto(base,{waitUntil:'load'});
 await reduced.locator('[aria-labelledby="motion-showcase-title"]').scrollIntoViewIfNeeded();
 assert.equal(await reduced.locator('[data-poster-copy="primary"]').count(),8);
 for(const card of await reduced.locator('[data-poster-copy="primary"]').all())assert.equal(await card.isVisible(),true);
 for(const card of await reduced.locator('[data-poster-copy="duplicate"]').all())assert.equal(await card.isVisible(),false);
 results.push({test:'reduced-motion-eight-accessible-cards',status:'PASS'});await reduced.close();
 const motion=[];
 for(const width of [375,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});await page.goto(base,{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);await page.bringToFront();await page.waitForTimeout(1200);
  await page.locator('[aria-labelledby="motion-showcase-title"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  if(width===375){const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4})}
  console.log('Motion start',width,await page.evaluate(()=>({hidden:document.hidden,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,focus:document.activeElement?.tagName,top:document.querySelector('[aria-labelledby="motion-showcase-title"]').getBoundingClientRect().top})));
  const sample=await page.evaluate(async()=>{
   const cards=[...document.querySelectorAll('[data-poster-copy]')];
   const previous=new Map();let jumpEvents=[],jumps=0,frames=0,slow=0,last=performance.now(),lastCenter='',handoffs=0;
   const start=last;await new Promise(resolve=>{function tick(t){frames++;const dt=t-last;if(dt>50)slow++;last=t;let closest=Infinity,center='';
    cards.forEach((card,index)=>{const x=new DOMMatrixReadOnly(card.style.transform).m41;const visible=getComputedStyle(card).visibility!=='hidden';const old=previous.get(index);if(old&&visible&&old.visible&&Math.abs(x)<innerWidth/2&&Math.abs(old.x)<innerWidth/2&&Math.abs(x-old.x)>180){jumps++;jumpEvents.push({index,t:t-start,x,old:old.x,dt})};
     previous.set(index,{x,visible});const cx=x+card.offsetWidth/2;if(visible&&Math.abs(cx)<closest){closest=Math.abs(cx);center=card.textContent.trim()}});
    if(center!==lastCenter){handoffs++;lastCenter=center}if((t-start>=98000&&handoffs>=25)||t-start>=180000)resolve();else requestAnimationFrame(tick)}requestAnimationFrame(tick)});
   return {jumpEvents,frames,slowFramesOver50ms:slow,jumps,handoffs,durationMs:performance.now()-start};
  });
  await page.locator('[aria-labelledby="motion-showcase-title"]').screenshot({path:`${dir}/slider-${width}.png`});
  console.log(width,JSON.stringify(sample));assert.equal(sample.jumps,0);assert.ok(sample.handoffs>=24);
  await page.close();motion.push({test:'slider-three-cycles',width,cpuSlowdown:width===375?4:1,status:'PASS',...sample});
 fs.writeFileSync(`${dir}/interactions.json`,JSON.stringify([...results,...motion],null,2));
 }
 results.push(...motion);await browser.close();fs.writeFileSync(`${dir}/interactions.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
