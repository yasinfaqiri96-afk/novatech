/*
 * Renders the monitor/laptop mockup used in the home hero and on /portfolio:
 * Mashal screens scrolling inside the devices, as a seamless 12s loop.
 *
 *   node scripts/mockup-video/render.cjs            # both layouts
 *   PLAYWRIGHT=/path/to/playwright node ...         # if playwright isn't resolvable
 *
 * Needs ffmpeg on PATH. Writes public/media/mockup-{hero,intro}.{mp4,webm} and
 * the matching -poster.webp. Swap screenshots in scene.html to refresh it.
 */
const { chromium } = require(process.env.PLAYWRIGHT || "playwright");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const FPS = 25;
const LOOP = 12;
const media = path.join(__dirname, "../../public/media");
const layouts = [
  ["hero", 1680, 1000],
  ["intro", 1024, 808],
];

(async () => {
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
  for (const [layout, width, height] of layouts) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), `mockup-${layout}-`));
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(`file://${path.join(__dirname, "scene.html")}?layout=${layout}&loop=${LOOP}`);
    await page.evaluate(() => window.ready);
    for (let i = 0; i < FPS * LOOP; i++) {
      await page.evaluate((t) => window.render(t), i / FPS);
      await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, "0")}.jpg`), type: "jpeg", quality: 94 });
    }
    await page.close();
    const frames = path.join(dir, "f%04d.jpg");
    const out = path.join(media, `mockup-${layout}`);
    const ff = (...args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
    ff("-framerate", `${FPS}`, "-i", frames, "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", `${out}.mp4`);
    ff("-framerate", `${FPS}`, "-i", frames, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "34", "-row-mt", "1", "-an", `${out}.webm`);
    ff("-i", path.join(dir, "f0000.jpg"), "-c:v", "libwebp", "-quality", "85", `${out}-poster.webp`);
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`mockup-${layout}: done`);
  }
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
