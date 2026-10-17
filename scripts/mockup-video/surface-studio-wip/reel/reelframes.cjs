const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
(async () => {
  fs.mkdirSync(__dirname + '/reel/frames', { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1500, height: 1000 } });
  await p.goto('http://127.0.0.1:8765/reel/showreel.html'); await p.evaluate(() => window.ready);
  const FPS = 30, N = Math.round(16.8 * FPS);
  for (let i = 0; i < N; i++) {
    await p.evaluate(t => render(t), i / FPS);
    await p.screenshot({ path: `${__dirname}/reel/frames/f${String(i).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 92 });
  }
  console.log('frames', N); await b.close();
})();
