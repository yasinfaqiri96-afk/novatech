#!/usr/bin/env node
/**
 * Structured-data consistency check against the server-rendered HTML of every
 * sitemap URL. No dependencies. It complements `seo:audit` (which checks that
 * JSON-LD exists and parses) with the rules that keep markup honest:
 *
 *   - every FAQPage question and answer is visible text on the same page
 *   - every `{ "@id": … }` reference resolves to a node published on the page
 *   - a node `@id` is never published twice on one page with different content
 *   - Organization facts (name, telephone, address) are identical on every page
 *   - SoftwareApplication nodes are only published where the product is the subject
 *   - BreadcrumbList positions are 1..n and every item is an absolute site URL
 *
 * Usage: SEO_AUDIT_BASE=http://localhost:3000 node scripts/jsonld-check.mjs
 * Exits non-zero on any error.
 */

const BASE = (process.env.SEO_AUDIT_BASE ?? "http://localhost:3000").replace(/\/$/, "");
const ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://novatechsoft.com").replace(/\/$/, "");
const SOFTWARE_PAGES = new Set([
  "/accounting-software",
  "/oil-and-gas-software",
  "/en/oil-and-gas-erp-afghanistan",
  "/ps/oil-and-gas-erp-afghanistan",
]);

const errors = [];
const fail = (route, message) => errors.push(`${route} — ${message}`);

const decode = (text) =>
  text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const squash = (text) => decode(text).replace(/‌/g, "").replace(/\s+/g, " ").trim();

function walk(value, visit) {
  if (Array.isArray(value)) value.forEach((item) => walk(item, visit));
  else if (value && typeof value === "object") {
    visit(value);
    Object.values(value).forEach((item) => walk(item, visit));
  }
}

const res = await fetch(`${BASE}/sitemap.xml`);
const paths = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

let organizationFingerprint;
let checkedQuestions = 0;

for (const route of paths) {
  const html = await (await fetch(`${BASE}${route}`)).text();
  const visible = squash(
    html
      .replace(/<script\b[\s\S]*?<\/script>/g, " ")
      .replace(/<style\b[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " "),
  );

  const nodes = [];
  for (const block of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const parsed = JSON.parse(block[1]);
    if (parsed["@context"] !== "https://schema.org") fail(route, "JSON-LD block without the schema.org @context");
    nodes.push(...(parsed["@graph"] ?? [parsed]));
  }

  const defined = new Map();
  const references = [];
  walk(nodes, (node) => {
    const keys = Object.keys(node);
    if (node["@id"] && keys.length === 1) references.push(node["@id"]);
    else if (node["@id"] && keys.length === 2 && "name" in node) references.push(node["@id"]);
    else if (node["@id"]) {
      // The same entity may be described briefly in one place (an offer
      // catalog) and fully in another; JSON-LD merges them. Only a property
      // that is stated twice with different values is a contradiction.
      const previous = defined.get(node["@id"]);
      if (previous) {
        for (const [key, value] of Object.entries(node)) {
          if (typeof value === "object" || !(key in previous) || typeof previous[key] === "object") continue;
          if (previous[key] !== value) fail(route, `@id ${node["@id"]} states ${key} twice: "${previous[key]}" vs "${value}"`);
        }
      }
      defined.set(node["@id"], { ...previous, ...node });
    }
  });
  for (const id of references) {
    if (!defined.has(id)) fail(route, `reference to ${id} does not resolve on this page`);
  }

  for (const node of nodes) {
    const type = node["@type"];
    if (type === "Organization") {
      const fingerprint = JSON.stringify([node.name, node.telephone, node.address, node.sameAs]);
      organizationFingerprint ??= fingerprint;
      if (fingerprint !== organizationFingerprint) fail(route, "Organization facts differ from other pages");
    }
    if (type === "FAQPage") {
      for (const question of node.mainEntity) {
        checkedQuestions += 1;
        if (!visible.includes(squash(question.name))) fail(route, `FAQ question not visible: ${question.name.slice(0, 50)}`);
        if (!visible.includes(squash(question.acceptedAnswer.text))) fail(route, `FAQ answer not visible: ${question.acceptedAnswer.text.slice(0, 50)}`);
      }
    }
    if (type === "SoftwareApplication" && !SOFTWARE_PAGES.has(route)) fail(route, "SoftwareApplication published on a page that is not a product page");
    if (type === "BreadcrumbList") {
      node.itemListElement.forEach((item, index) => {
        if (item.position !== index + 1) fail(route, "BreadcrumbList positions are not 1..n");
        if (!String(item.item).startsWith(ORIGIN)) fail(route, `breadcrumb item is not on ${ORIGIN}: ${item.item}`);
      });
    }
    if (type === "BlogPosting") {
      for (const field of ["headline", "datePublished", "dateModified", "author", "publisher"]) {
        if (!node[field]) fail(route, `BlogPosting is missing ${field}`);
      }
      if (node.dateModified !== node.datePublished && !html.includes(`dateTime="${node.dateModified}"`)) {
        fail(route, "dateModified is not shown on the page");
      }
    }
  }
}

console.log(`Checked JSON-LD on ${paths.length} URLs (${checkedQuestions} FAQ questions) against ${BASE}`);
if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const line of errors) console.log(`  x ${line}`);
  process.exit(1);
}
console.log("No structured-data consistency errors.");
