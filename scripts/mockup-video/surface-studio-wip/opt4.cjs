const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const sols = JSON.parse(fs.readFileSync(__dirname + '/pnp.json'));
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1400, height: 1100 } });
  await p.goto('http://127.0.0.1:8765/scene.html');
  await p.waitForFunction(() => window.ready === true, null, { timeout: 120000 });
  const part = process.argv[2], keys = process.argv[3].split(',');
  await p.evaluate(r => { window.REF = new Uint8Array(r); }, JSON.parse(fs.readFileSync(__dirname + `/ref_${part}.json`)));
  let P = JSON.parse(fs.readFileSync(__dirname + '/best2.json'));
  const steps = { kbS: 0.1, baseS: 0.08, dialS: 0.1, penS: 0.1, baseZ: 0.02, kbX: 0.03, kbZ: 0.03, kbYaw: 3, dialX: 0.03, dialZ: 0.03, penX: 0.03, penZ: 0.03, penYaw: 4, dispY: 0.02, dispZ: 0.02, tilt: 2 };
  const loss = Q => p.evaluate(([Q, sol, part]) => { window.PNP = sol; window.apply(Q); return 1 - window.iou(window.REF, 350, 275, part); }, [Q, sols.find(s => s.f === Q.f), part]);
  let cur = await loss(P); console.log(part, 'start', cur.toFixed(4));
  for (let round = 0; round < 5; round++) {
    for (const k of keys) for (const dir of [1, -1]) {
      let s = steps[k];
      for (;;) { const c = { ...P, [k]: P[k] + dir * s }; const L = await loss(c); if (L < cur - 1e-5) { P = c; cur = L; s *= 1.6; } else break; }
    }
    for (const k in steps) steps[k] /= 2;
    console.log(part, 'round', round, cur.toFixed(4));
  }
  fs.writeFileSync(__dirname + '/best2.json', JSON.stringify(P));
  console.log(JSON.stringify(P));
  await b.close();
})();
