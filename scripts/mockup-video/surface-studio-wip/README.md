# Surface Studio showreel (work in progress)

Portfolio intro video modelled on the websima.com portfolio mockup: a 3D-rendered
Surface Studio (three.js) with a motion-graphics showreel of Novatech's own work
on its screen.

- `scene.html` — three.js device; camera pose comes from `pnp.json` (solvePnP of the
  reference screen corners), part placement from `best2.json`. Needs `three@0.169`
  in `node_modules` next to it and an HTTP server (`python3 -m http.server 8765`).
- `opt4.cjs` — fits one part (kb/base/dial/pen) to its reference silhouette mask.
- `reel/showreel.html` — 1500×1000, 16.8s deterministic timeline (`render(t)`):
  logo intro → client logos → swirl → Mashal dashboard → Le Petit → Noor →
  posters → Ariana Motor → loop. Its `a/` folder holds copies of public/ images,
  white client logos and the IRANYekan fonts (see the asset prep in the session).
- Remaining: final device render, compositing the reel into the screen
  (cv2.warpPerspective onto the solved quad + glare), encoding, and wiring it into
  `components/portfolio/PortfolioIntro.tsx`.
