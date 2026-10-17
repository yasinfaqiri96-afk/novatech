/*
 * Layered wave that closes off the bottom of the home hero. Six translucent
 * gradient waves sit under an opaque one in the page colour, so only their
 * edges show as a soft purple/coral band.
 *
 * Geometry lives in a 0–100 box and the SVG is stretched with
 * preserveAspectRatio="none". The smoothing below is linear in x and y, so
 * stretching the result is identical to smoothing at the final pixel size;
 * the paths are therefore computed once, on the server, with no client JS.
 */
const basePoints: ReadonlyArray<readonly [number, number]> = [
  [-0.5, 100], [-0.5, 40], [0.01, 40], [3, 92], [17, 92], [26, 90], [36, 95],
  [47, 78], [58, 85], [73, 65], [87, 76], [98, 55], [100, 0], [100.5, 0], [100.5, 100],
];

// lift[wave] = { pointIndex: extra y offset in % } — fans the bands out on the right.
const lift: ReadonlyArray<Readonly<Record<number, number>>> = [
  { 11: -32, 10: -28, 9: -7, 8: -7, 7: -1, 6: -1 },
  { 11: -30, 10: -26, 9: -6, 8: -6, 7: -1, 6: -1 },
  { 11: -28, 10: -24, 9: -5, 8: -5, 7: -1, 6: -1 },
  { 11: -26, 10: -22, 9: -4, 8: -4, 7: -1, 6: -1 },
  { 11: -24, 10: -20, 9: -3, 8: -3, 7: -1, 6: -1 },
  { 11: -22, 10: -18, 9: -2, 8: -2, 7: -1, 6: -1 },
  { 11: -20, 10: -15 },
];
// Base y offset per wave; the last (opaque) wave sits 1% lower than the rest.
const waveOffset = [-1, -1, -1, -1, -1, -1, 0];

type Point = { x: number; y: number };

/**
 * Smooth open path through `knots` with C2-continuous cubic Béziers (the
 * classic tridiagonal solve). Returns the first control point of each
 * segment; the second one is mirrored from the next knot.
 */
function controlPoints(knots: Point[]): Point[] {
  const n = knots.length - 1;
  const rx: number[] = [knots[0].x + 2 * knots[1].x];
  const ry: number[] = [knots[0].y + 2 * knots[1].y];
  const rf: number[] = [2];
  for (let i = 1; i < n; i++) {
    const internal = i < n - 1;
    const a = internal ? 1 : 2;
    const b = internal ? 4 : 7;
    const u = internal ? 4 : 8;
    const v = internal ? 2 : 1;
    const m = a / rf[i - 1];
    rf[i] = b - m;
    rx[i] = u * knots[i].x + v * knots[i + 1].x - m * rx[i - 1];
    ry[i] = u * knots[i].y + v * knots[i + 1].y - m * ry[i - 1];
  }
  const px: number[] = [];
  const py: number[] = [];
  px[n - 1] = rx[n - 1] / rf[n - 1];
  py[n - 1] = ry[n - 1] / rf[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    px[i] = (rx[i] - px[i + 1]) / rf[i];
    py[i] = (ry[i] - py[i + 1]) / rf[i];
  }
  px[n] = (3 * knots[n].x - px[n - 1]) / 2;
  py[n] = (3 * knots[n].y - py[n - 1]) / 2;
  return px.map((x, i) => ({ x, y: py[i] }));
}

const r = (value: number) => Math.round(value * 1000) / 1000;

const wavePaths = waveOffset.map((offset, wave) => {
  const knots = basePoints.map(([x, y], index) => ({ x, y: y + offset + (lift[wave][index] ?? 0) }));
  const handles = controlPoints(knots);
  let d = `M${r(knots[0].x)} ${r(knots[0].y)}`;
  for (let i = 0; i < knots.length - 1; i++) {
    const next = knots[i + 1];
    d += `C${r(handles[i].x)} ${r(handles[i].y)} ${r(2 * next.x - handles[i + 1].x)} ${r(2 * next.y - handles[i + 1].y)} ${r(next.x)} ${r(next.y)}`;
  }
  return `${d}Z`;
});

/*
 * The gradient is a circle in *pixel* space centred on the top-left corner,
 * reaching the opposite corner. In the stretched 0–100 box that circle becomes
 * an ellipse whose radii depend on the box's width/height ratio, which is
 * ~2.7 from 800px up (height 0.57vw × 63, width ≈ 100vw) and ~2.35 below.
 */
const ellipse = (k: number) => `scale(${r(100 * Math.sqrt(1 + 1 / (k * k)))} ${r(100 * Math.sqrt(k * k + 1))})`;

export default function HeroWave({ className, background = "#ffffff" }: { className?: string; background?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        {[["hero-wave-desktop", 2.7], ["hero-wave-mobile", 2.35]].map(([id, k]) => (
          <radialGradient key={id} id={id as string} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1" gradientTransform={ellipse(k as number)}>
            <stop offset="0" stopColor="#1900ff" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#cd6c58" stopOpacity="0.3" />
            <stop offset="0.8" stopColor="#1900ff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
      {wavePaths.map((d, wave) => (
        <path key={wave} d={d} fill={wave === wavePaths.length - 1 ? background : undefined} data-band={wave === wavePaths.length - 1 ? undefined : ""} />
      ))}
    </svg>
  );
}
