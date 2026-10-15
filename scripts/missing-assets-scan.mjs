/** Crawls every sitemap route locally and reports any request that 404s. */
import { chromium } from "playwright";

const base = process.env.QA_BASE ?? "http://localhost:4197";
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const missing = new Map();

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("response", response => {
    if (response.status() === 404) {
      const url = new URL(response.url()).pathname;
      if (!missing.has(url)) missing.set(url, new Set());
      missing.get(url).add(route);
    }
  });
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(async () => { window.scrollTo(0, document.body.scrollHeight); await new Promise(done => setTimeout(done, 500)); });
  await page.waitForTimeout(400);
  await page.close();
}
await browser.close();
console.log(`routes=${routes.length} missing=${missing.size}`);
for (const [url, pages] of missing) console.log(url, "->", [...pages].slice(0, 3).join(", "));
