/** Real-browser check of every Mashal page at the three supported widths. */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.QA_BASE ?? "http://localhost:4197";
const output = path.resolve(process.env.QA_OUT ?? "design-reports/mashal-pages");
await mkdir(output, { recursive: true });

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(match => new URL(match[1]).pathname)
  .filter(route => route.startsWith("/oil-and-gas-software") || route.endsWith("/oil-and-gas-erp-afghanistan")
    || route === "/portfolio/oil-and-gas-management-system" || route === "/blog/oil-and-gas-software-guide")
  .sort();

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const widths = [390, 768, 1440];
const results = [];

for (const route of routes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 } });
    const errors = [];
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", error => errors.push(error.message));
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => { window.scrollTo(0, document.body.scrollHeight); await new Promise(done => setTimeout(done, 400)); window.scrollTo(0, 0); });
    await page.waitForTimeout(600);
    const checks = await page.evaluate(() => {
      const images = [...document.images];
      return {
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        images: images.length,
        brokenImages: images.filter(image => image.complete && image.naturalWidth === 0).map(image => image.currentSrc || image.src),
        emptyHeadings: [...document.querySelectorAll("h1,h2,h3")].filter(node => !node.textContent.trim()).length,
        h1: document.querySelectorAll("h1").length,
      };
    });
    const slug = route.replace(/\//g, "_") || "_root";
    await page.screenshot({ path: path.join(output, `${slug}-${width}.png`), fullPage: width !== 1440 ? false : true });
    results.push({
      route, width, status: response?.status() ?? 0,
      horizontalOverflow: checks.documentWidth > checks.viewportWidth + 1,
      ...checks, errors,
    });
    await page.close();
  }
}

await browser.close();
await writeFile(path.join(output, "pages-qa.json"), JSON.stringify(results, null, 2));
const bad = results.filter(r => r.status !== 200 || r.horizontalOverflow || r.brokenImages.length || r.errors.length || r.h1 !== 1 || r.emptyHeadings);
console.log(`routes=${routes.length} checks=${results.length} failures=${bad.length}`);
for (const item of bad) console.log(JSON.stringify(item));
