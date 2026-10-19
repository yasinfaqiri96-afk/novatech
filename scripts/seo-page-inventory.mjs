#!/usr/bin/env node
/**
 * Page inventory for content and SEO review. No dependencies: it reads the
 * server-rendered HTML of every sitemap URL (what a crawler that does not run
 * JavaScript sees) and records, per page, the facts a content audit needs.
 *
 * Usage:
 *   npm run build && npm start
 *   npm run seo:inventory                       # defaults to http://localhost:3000
 *   SEO_AUDIT_BASE=http://localhost:3100 npm run seo:inventory
 *   SEO_INVENTORY_OUT=docs/seo-inventory.json npm run seo:inventory
 *
 * Output: a JSON file (default .work/seo-inventory.json) and a compact table on
 * stdout. It reports; it never fails the process on content findings — that is
 * the job of `npm run seo:audit`.
 *
 * Word counts are approximate: text inside <main> with scripts, styles, SVG and
 * the JSON-LD removed. Header and footer copy is excluded on purpose, so the
 * number reflects the page's own content.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const BASE = (process.env.SEO_AUDIT_BASE ?? "http://localhost:3000").replace(/\/$/, "");
const OUT = process.env.SEO_INVENTORY_OUT ?? ".work/seo-inventory.json";

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

const stripTags = (html) =>
  decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const first = (html, re) => {
  const match = html.match(re);
  return match ? decode(match[1].trim()) : null;
};

function headings(html, level) {
  return [...html.matchAll(new RegExp(`<h${level}[^>]*>([\\s\\S]*?)</h${level}>`, "g"))].map(
    (m) => stripTags(m[1]),
  );
}

function mainText(html) {
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? html;
  return stripTags(
    main
      .replace(/<script\b[\s\S]*?<\/script>/g, " ")
      .replace(/<style\b[\s\S]*?<\/style>/g, " ")
      .replace(/<svg\b[\s\S]*?<\/svg>/g, " "),
  );
}

function jsonLdTypes(html) {
  const types = [];
  for (const block of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(block[1]);
      for (const node of parsed["@graph"] ?? [parsed]) {
        const type = node["@type"];
        if (type) types.push(Array.isArray(type) ? type.join("+") : type);
      }
    } catch {
      types.push("INVALID");
    }
  }
  return types;
}

async function sitemapPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1].trim()).pathname);
}

async function inspect(path) {
  const res = await fetch(`${BASE}${path}`);
  const html = await res.text();
  const text = mainText(html);
  const internal = [
    ...new Set(
      [...html.matchAll(/<a[^>]+href="(\/[^"?#]*)"/g)]
        .map((m) => m[1].replace(/\/$/, "") || "/")
        .filter((href) => !/^\/(images|media|_next)\//.test(href)),
    ),
  ];
  const mainHtml = html.match(/<main\b[\s\S]*?<\/main>/)?.[0] ?? "";
  const inMain = [
    ...new Set(
      [...mainHtml.matchAll(/<a[^>]+href="(\/[^"?#]*)"/g)]
        .map((m) => m[1].replace(/\/$/, "") || "/")
        .filter((href) => !/^\/(images|media|_next)\//.test(href)),
    ),
  ];

  return {
    path,
    status: res.status,
    lang: first(html, /<html[^>]*\blang="([^"]+)"/),
    dir: first(html, /<html[^>]*\bdir="([^"]+)"/),
    title: first(html, /<title>([\s\S]*?)<\/title>/),
    description: first(html, /<meta name="description" content="([\s\S]*?)"/),
    canonical: first(html, /<link rel="canonical" href="([\s\S]*?)"/),
    hreflang: [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hrefLang="([^"]+)"[^>]*href="([^"]+)"/gi)].map(
      (m) => `${m[1]}=${new URL(m[2]).pathname}`,
    ),
    h1: headings(html, 1),
    h2: headings(html, 2),
    words: text ? text.split(/\s+/).length : 0,
    internalLinks: internal.length,
    contentLinks: inMain,
    jsonLd: jsonLdTypes(html),
    hasFaqMarkup: /FAQPage/.test(html),
    hasVisibleFaq: /<details\b/.test(mainHtml) || /سوالات|پرسش|FAQ|پوښتن/.test(stripTags(mainHtml).slice(0, 100000)),
    linksToContact: inMain.includes("/contact") || /wa\.me\//.test(mainHtml),
  };
}

const paths = await sitemapPaths();
const pages = [];
for (const path of paths) pages.push(await inspect(path));

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ base: BASE, generatedAt: new Date().toISOString(), pages }, null, 2));

for (const page of pages) {
  console.log(
    [
      page.status,
      page.path,
      `lang=${page.lang}`,
      `words≈${page.words}`,
      `links=${page.internalLinks}/${page.contentLinks.length}`,
      `ld=${page.jsonLd.join(",")}`,
      `faq=${page.hasFaqMarkup ? "schema" : page.hasVisibleFaq ? "visible" : "-"}`,
    ].join(" | "),
  );
}
console.log(`\n${pages.length} pages written to ${OUT}`);
