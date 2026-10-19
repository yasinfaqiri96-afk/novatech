#!/usr/bin/env node
/**
 * Page-weight comparison between two running builds. No dependencies.
 *
 * For each page it records the server-rendered HTML size, the JavaScript and
 * CSS the page references (unique files, gzip-compressed size, which is close to
 * what travels over the wire) and the server response time. It is a regression
 * check for "did this change make pages heavier", not a Lighthouse substitute:
 * it does not measure rendering, LCP or CLS.
 *
 * Usage (both servers must run a production build: `next build && next start`):
 *   PAGE_WEIGHT_BEFORE=http://localhost:3200 PAGE_WEIGHT_AFTER=http://localhost:3100 \
 *     node scripts/page-weight.mjs [/path ...]
 */

import { gzipSync } from "node:zlib";

const BEFORE = (process.env.PAGE_WEIGHT_BEFORE ?? "").replace(/\/$/, "");
const AFTER = (process.env.PAGE_WEIGHT_AFTER ?? "http://localhost:3000").replace(/\/$/, "");
const RUNS = Number(process.env.PAGE_WEIGHT_RUNS ?? 5);

const paths = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "/",
      "/herat",
      "/about",
      "/accounting-software",
      "/database-solutions",
      "/software-solutions",
      "/oil-and-gas-software",
      "/en/oil-and-gas-erp-afghanistan",
      "/ps/oil-and-gas-erp-afghanistan",
      "/blog/choosing-accounting-software",
    ];

const assetCache = new Map();

async function assetSize(base, src) {
  const key = `${base}${src}`;
  if (!assetCache.has(key)) {
    const res = await fetch(new URL(src, base));
    const body = Buffer.from(await res.arrayBuffer());
    assetCache.set(key, gzipSync(body).length);
  }
  return assetCache.get(key);
}

async function measure(base, path) {
  let html = "";
  const times = [];
  for (let run = 0; run < RUNS; run += 1) {
    const start = performance.now();
    const res = await fetch(`${base}${path}`);
    html = await res.text();
    times.push(performance.now() - start);
  }
  times.sort((a, b) => a - b);

  const scripts = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]))];
  const styles = [...new Set([...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((m) => m[1]))];
  let js = 0;
  for (const src of scripts) js += await assetSize(base, src);
  let css = 0;
  for (const href of styles) css += await assetSize(base, href);

  return {
    htmlKb: Buffer.byteLength(html) / 1024,
    htmlGzKb: gzipSync(html).length / 1024,
    jsGzKb: js / 1024,
    cssGzKb: css / 1024,
    scripts: scripts.length,
    medianMs: times[Math.floor(times.length / 2)],
  };
}

const fmt = (n) => n.toFixed(1).padStart(7);
const delta = (a, b) => `${b - a >= 0 ? "+" : ""}${(b - a).toFixed(1)}`.padStart(7);

console.log(
  `${"page".padEnd(36)} ${BEFORE ? "html.gz(before→after)  js.gz(before→after)  css.gz  ms(median)" : "html.gz  js.gz  css.gz  scripts  ms"}`,
);
for (const path of paths) {
  const after = await measure(AFTER, path);
  if (!BEFORE) {
    console.log(`${path.padEnd(36)} ${fmt(after.htmlGzKb)} ${fmt(after.jsGzKb)} ${fmt(after.cssGzKb)} ${String(after.scripts).padStart(5)} ${fmt(after.medianMs)}`);
    continue;
  }
  const before = await measure(BEFORE, path);
  console.log(
    [
      path.padEnd(36),
      `${fmt(before.htmlGzKb)}→${fmt(after.htmlGzKb)} (${delta(before.htmlGzKb, after.htmlGzKb)})`,
      `${fmt(before.jsGzKb)}→${fmt(after.jsGzKb)} (${delta(before.jsGzKb, after.jsGzKb)})`,
      `${fmt(before.cssGzKb)}→${fmt(after.cssGzKb)}`,
      `${fmt(before.medianMs)}→${fmt(after.medianMs)}`,
    ].join("  "),
  );
}
console.log("\nSizes in KB (gzip). Response time is the median of", RUNS, "requests to a local server.");
