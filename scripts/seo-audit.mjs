#!/usr/bin/env node
/**
 * Lightweight SEO regression check. No dependencies: it fetches the real
 * server-rendered HTML of every URL the sitemap publishes and asserts the
 * things that silently break during ordinary feature work.
 *
 * Usage:
 *   npm run build && npm start        # or: npm run dev
 *   npm run seo:audit                 # defaults to http://localhost:3000
 *   SEO_AUDIT_BASE=http://localhost:3001 npm run seo:audit
 *
 * The sitemap is the input on purpose: a page that never reaches the sitemap is
 * never checked here, which is itself reported as an error by the orphan check
 * that compares the sitemap against the internal link graph.
 *
 * Exits non-zero on any error so it can be wired into CI later.
 */

const BASE = (process.env.SEO_AUDIT_BASE ?? "http://localhost:3000").replace(/\/$/, "");
const PROD_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://novatechsoft.com").replace(/\/$/, "");

// Google truncates well before these; they are outer bounds, not targets.
const TITLE_MAX = 70;
const DESC_MIN = 70;
const DESC_MAX = 160;

const errors = [];
const warnings = [];
const fail = (route, message) => errors.push(`${route} — ${message}`);
const warn = (route, message) => warnings.push(`${route} — ${message}`);

const first = (html, re) => {
  const match = html.match(re);
  return match ? match[1].trim() : null;
};

async function getSitemapPaths() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length === 0) throw new Error("sitemap.xml contains no <loc> entries");

  return locs.map((loc) => {
    if (!loc.startsWith(PROD_ORIGIN)) {
      errors.push(`sitemap.xml — URL is not on ${PROD_ORIGIN}: ${loc}`);
    }
    return new URL(loc).pathname;
  });
}

async function checkRobots() {
  const res = await fetch(`${BASE}/robots.txt`);
  if (!res.ok) return fail("/robots.txt", `returned ${res.status}`);
  const body = await res.text();
  if (!/^Sitemap:\s*\S+sitemap\.xml/im.test(body)) {
    fail("/robots.txt", "does not reference sitemap.xml");
  }
  if (/^Disallow:\s*\/\s*$/im.test(body)) {
    fail("/robots.txt", "disallows the whole site");
  }
  for (const asset of ["/_next/", "/images/", "/fonts/"]) {
    if (new RegExp(`^Disallow:\\s*${asset}`, "im").test(body)) {
      fail("/robots.txt", `blocks ${asset}, which Google needs to render pages`);
    }
  }
}

async function auditPage(route) {
  const res = await fetch(`${BASE}${route}`);
  if (res.status !== 200) {
    fail(route, `returned HTTP ${res.status}`);
    return null;
  }
  const html = await res.text();

  const title = first(html, /<title>([\s\S]*?)<\/title>/);
  const description = first(html, /<meta name="description" content="([\s\S]*?)"/);
  const canonical = first(html, /<link rel="canonical" href="([\s\S]*?)"/);
  const robots = first(html, /<meta name="robots" content="([\s\S]*?)"/);

  if (!title) fail(route, "missing <title>");
  else if (title.length > TITLE_MAX) warn(route, `title is ${title.length} chars (>${TITLE_MAX})`);

  if (!description) fail(route, "missing meta description");
  else if (description.length > DESC_MAX) warn(route, `description is ${description.length} chars (>${DESC_MAX})`);
  else if (description.length < DESC_MIN) warn(route, `description is only ${description.length} chars (<${DESC_MIN})`);

  const expected = `${PROD_ORIGIN}${route === "/" ? "" : route}`;
  if (!canonical) fail(route, "missing canonical");
  else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, "")) {
    fail(route, `canonical is "${canonical}", expected "${expected}"`);
  }

  if (robots && /noindex/i.test(robots)) {
    fail(route, "is noindex but appears in the sitemap");
  }

  if (!/<meta property="og:title"/.test(html)) fail(route, "missing og:title");
  if (!/<meta property="og:url"/.test(html)) fail(route, "missing og:url");
  if (!/<meta name="twitter:card"/.test(html)) warn(route, "missing twitter:card");

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
  if (h1s.length === 0) fail(route, "has no <h1>");
  else if (h1s.length > 1) fail(route, `has ${h1s.length} <h1> elements: ${h1s.join(" | ")}`);

  const types = [];
  for (const block of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let parsed;
    try {
      parsed = JSON.parse(block[1]);
    } catch (error) {
      fail(route, `invalid JSON-LD: ${error.message}`);
      continue;
    }
    for (const node of parsed["@graph"] ?? [parsed]) {
      if (node["@type"]) types.push(node["@type"]);
    }
  }
  if (types.length === 0) fail(route, "publishes no JSON-LD");
  if (!types.includes("Organization")) fail(route, "JSON-LD is missing the Organization node");
  if (route !== "/" && !types.includes("BreadcrumbList")) {
    warn(route, "has no BreadcrumbList");
  }

  const images = [...html.matchAll(/<img\b[^>]*>/g)];
  const noAlt = images.filter((m) => !/\balt=/.test(m[0])).length;
  if (noAlt > 0) fail(route, `${noAlt} <img> without an alt attribute`);

  if ([
    "/oil-and-gas-software",
    "/en/oil-and-gas-erp-afghanistan",
    "/ps/oil-and-gas-erp-afghanistan",
  ].includes(route)) {
    if (!types.includes("SoftwareApplication")) {
      fail(route, "Mashal page is missing SoftwareApplication JSON-LD");
    }
    for (const language of ["fa-AF", "ps-AF", "en-AF", "x-default"]) {
      const escaped = language.replace("-", "\\-");
      if (!new RegExp(`<link[^>]+rel="alternate"[^>]+hrefLang="${escaped}"`, "i").test(html)) {
        fail(route, `missing reciprocal ${language} hreflang`);
      }
    }
  }
  if (route === "/oil-and-gas-software") {
    const productScreens = [...html.matchAll(/\/images\/mashal\/[^"?]+\.webp/g)];
    if (new Set(productScreens.map((match) => match[0])).size < 9) {
      fail(route, "renders fewer than 9 real Mashal screenshot URLs");
    }
  }

  const links = [...new Set(
    [...html.matchAll(/<a[^>]+href="(\/[^"?#]*)"/g)].map((m) => m[1]),
  )];

  return { route, title, description, canonical, links, types, h1: h1s[0] };
}

function checkDuplicates(pages, field) {
  const seen = new Map();
  for (const page of pages) {
    const value = page[field];
    if (!value) continue;
    seen.set(value, [...(seen.get(value) ?? []), page.route]);
  }
  for (const [value, routes] of seen) {
    if (routes.length > 1) {
      fail(routes.join(" + "), `share the same ${field}: "${value.slice(0, 60)}…"`);
    }
  }
}

function checkLinkGraph(pages, sitemapPaths) {
  const known = new Set(sitemapPaths.map((p) => p.replace(/\/$/, "") || "/"));
  const linkedTo = new Set();

  for (const page of pages) {
    for (const link of page.links) {
      const target = link.replace(/\/$/, "") || "/";
      // Original-image downloads are assets, not orphaned document routes.
      if (/^\/images\/.*\.(?:webp|png|jpe?g|gif|svg)$/i.test(target)) continue;
      linkedTo.add(target);
      if (!known.has(target)) {
        warn(page.route, `links to ${link}, which is not in the sitemap`);
      }
    }
  }

  for (const path of known) {
    if (path !== "/" && !linkedTo.has(path)) {
      fail(path, "is an orphan: no audited page links to it");
    }
  }
}

const paths = await getSitemapPaths();
await checkRobots();

const pages = [];
for (const path of paths) {
  const page = await auditPage(path);
  if (page) pages.push(page);
}

checkDuplicates(pages, "title");
checkDuplicates(pages, "description");
checkDuplicates(pages, "h1");
checkLinkGraph(pages, paths);

console.log(`Audited ${pages.length}/${paths.length} sitemap URLs against ${BASE}\n`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const line of warnings) console.log(`  ! ${line}`);
  console.log("");
}
if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  for (const line of errors) console.log(`  x ${line}`);
  process.exit(1);
}
console.log("No SEO errors.");
