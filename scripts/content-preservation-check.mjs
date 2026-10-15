/** Confirms every section recorded in the recovery CONTENT-MAP is still reachable in the rendered site. */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.QA_BASE ?? "http://localhost:4197";
const map = JSON.parse(fs.readFileSync(path.resolve("../recovery/CONTENT-MAP.json"), "utf8"));
const normalize = text => text.replace(/[\s\u200c\u200f\u200e]+/g, " ").replace(/[«»"'`]/g, "").trim();

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const corpus = new Map();
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(base + route, { waitUntil: "domcontentloaded" });
  corpus.set(route, normalize(await page.evaluate(() => document.body.textContent ?? "")));
  await page.close();
}
await browser.close();
const all = [...corpus.values()].join("\n");

const missing = [];
let headings = 0, listItems = 0, listItemsFound = 0;
for (const row of map) {
  const heading = normalize(row.oldSection?.heading ?? "");
  if (heading) {
    headings += 1;
    const onOwnPage = (corpus.get(row.path) ?? "").includes(heading);
    if (!onOwnPage && !all.includes(heading)) missing.push({ path: row.path, heading });
  }
  for (const item of row.oldSection?.listItems ?? row.listItems ?? []) {
    const value = normalize(typeof item === "string" ? item : item.text ?? "");
    if (!value) continue;
    listItems += 1;
    if (all.includes(value)) listItemsFound += 1; else missing.push({ path: row.path, listItem: value });
  }
}
console.log(`sections=${map.length} headings=${headings} listItems=${listItems} listItemsFound=${listItemsFound} missing=${missing.length}`);
for (const item of missing.slice(0, 40)) console.log(JSON.stringify(item));
fs.writeFileSync("design-reports/content-preservation.json", JSON.stringify({ sections: map.length, headings, listItems, listItemsFound, missing }, null, 2));
