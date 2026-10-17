const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
(async () => {
  const P = JSON.parse(fs.readFileSync(__dirname + '/best2.json'));
  const sol = JSON.parse(fs.readFileSync(__dirname + '/pnp.json')).find(s => s.f === P.f);
  const mode = process.argv[2] || 'beauty', out = process.argv[3] || 'r.png';
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1400, height: 1100 } });
  p.on('pageerror', e => console.log('err', e.message));
  await p.goto('http://127.0.0.1:8765/scene.html');
  await p.waitForFunction(() => window.ready === true, null, { timeout: 120000 });
  const c = await p.evaluate(([P, s, m]) => { window.PNP = s; window.apply(P); return window.render(m); }, [P, sol, mode]);
  await p.screenshot({ path: out });
  console.log(JSON.stringify(c.map(v => v.map(Math.round))));
  await b.close();
})();
