/** Compares internal links and metadata of the live release with the local build, per route. */
import fs from "node:fs";

const local = process.env.QA_BASE ?? "http://localhost:4197";
const live = "https://novatechsoft.com";
const sitemap = await (await fetch(`${local}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)
  .filter(route => route.startsWith("/oil-and-gas-software") || route.endsWith("/oil-and-gas-erp-afghanistan")
    || route === "/portfolio/oil-and-gas-management-system" || route === "/blog/oil-and-gas-software-guide");

const links = html => new Set([...html.matchAll(/href="(\/[^"#?]*)/g)].map(m => m[1].replace(/\/$/, "") || "/"));
const meta = (html, name) => (html.match(new RegExp(`<link rel="${name}" href="([^"]+)"`)) ?? [])[1];
const title = html => (html.match(/<title>([^<]*)<\/title>/) ?? [])[1];
const description = html => (html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1];

const report = [];
for (const route of routes) {
  const [liveHtml, localHtml] = await Promise.all([
    fetch(live + route, { headers: { "cache-control": "no-cache" } }).then(r => r.text()),
    fetch(local + route).then(r => r.text()),
  ]);
  const liveLinks = links(liveHtml), localLinks = links(localHtml);
  report.push({
    route,
    droppedLinks: [...liveLinks].filter(href => !localLinks.has(href)),
    canonicalMatch: meta(liveHtml, "canonical") === meta(localHtml, "canonical"),
    titleMatch: title(liveHtml) === title(localHtml),
    descriptionMatch: description(liveHtml) === description(localHtml),
    liveLinks: liveLinks.size, localLinks: localLinks.size,
  });
}
fs.writeFileSync("design-reports/link-preservation.json", JSON.stringify(report, null, 2));
const bad = report.filter(r => r.droppedLinks.length || !r.canonicalMatch || !r.titleMatch || !r.descriptionMatch);
console.log(`routes=${report.length} withDifferences=${bad.length}`);
for (const item of bad) console.log(JSON.stringify(item));
