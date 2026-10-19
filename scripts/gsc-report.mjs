#!/usr/bin/env node
/**
 * Search Console CSV report. No dependencies, no API access: it reads the CSV
 * files Search Console exports (Performance → Export → CSV/ZIP) and writes a
 * Markdown report that can be compared month to month.
 *
 * Usage:
 *   node scripts/gsc-report.mjs --queries Queries.csv [--pages Pages.csv] \
 *     [--query-page query-page.csv] [--label "2026-10"] [--out .work/gsc-report.md]
 *
 *   --queries     the "Queries" file of the export (Top queries, Clicks, Impressions, CTR, Position)
 *   --pages       the "Pages" file of the export (Top pages, Clicks, Impressions, CTR, Position)
 *   --query-page  optional query × page rows (query, page, clicks, impressions, ctr, position),
 *                 from the Search Console API or a Looker Studio table. This is the
 *                 only input that can show two pages competing for one query; the
 *                 standard UI export cannot.
 *
 * Queries are classified with docs/phase3-measurement/keyword-groups.json, the
 * machine-readable half of docs/phase3-content-keyword-map.md.
 *
 * The report states what the data shows and nothing else. It does not estimate
 * search volume, and with fewer than ~100 impressions per group the numbers are
 * too small to read a trend from — the report says so instead of hiding it.
 */

import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, all) => {
    if (value.startsWith("--")) pairs.push([value.slice(2), all[index + 1]]);
    return pairs;
  }, []),
);

if (!args.queries && !args.pages && !args["query-page"]) {
  console.error("Pass at least one of --queries, --pages or --query-page. See the header of this file.");
  process.exit(1);
}

const config = JSON.parse(readFileSync(new URL("../docs/phase3-measurement/keyword-groups.json", import.meta.url), "utf8"));
// Most specific group first, so "نرم افزار حسابداری هرات" counts as accounting, not local.
const PRIORITY = ["oil-gas", "accounting", "database", "custom-software", "herat-local", "brand"];
const groups = PRIORITY.map((key) => config.groups.find((group) => group.key === key)).filter(Boolean);

const normalise = (text) =>
  String(text)
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/‌/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const toRegex = (patterns) => new RegExp(patterns.map(normalise).join("|"), "i");
const brandRe = toRegex(config.brandPatterns);
const productRe = toRegex(config.productPatterns);
const groupRes = groups.map((group) => ({ ...group, re: toRegex(group.patterns) }));

function parseCsv(path) {
  const text = readFileSync(path, "utf8").replace(/^﻿/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(cell); cell = "";
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
    } else cell += char;
  }
  row.push(cell);
  if (row.some((value) => value !== "")) rows.push(row);

  // Lines starting with "#" are comments (used to label test fixtures).
  const [header, ...body] = rows.filter((cells) => !cells[0].startsWith("#"));
  const find = (re) => header.findIndex((name) => re.test(name));
  const col = {
    clicks: find(/click|کلیک/i),
    impressions: find(/impression|نمایش/i),
    ctr: find(/ctr/i),
    position: find(/position|جایگاه|موقعیت/i),
    query: find(/quer|جستجو|عبارت/i),
    page: find(/page|url|صفحه/i),
  };
  const num = (value) => Number(String(value ?? "").replace(/[%,\s]/g, "")) || 0;
  return body.map((cells) => ({
    key: cells[0],
    query: col.query >= 0 ? cells[col.query] : undefined,
    page: col.page >= 0 ? cells[col.page] : undefined,
    clicks: num(cells[col.clicks]),
    impressions: num(cells[col.impressions]),
    position: num(cells[col.position]),
  }));
}

const pathOf = (url) => {
  try { return new URL(url).pathname.replace(/\/$/, "") || "/"; } catch { return url; }
};
const ctr = (clicks, impressions) => (impressions ? `${((clicks / impressions) * 100).toFixed(1)}%` : "—");
// Impression-weighted average position, which is how Search Console aggregates it.
const weightedPosition = (rows) => {
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  return impressions ? (rows.reduce((sum, row) => sum + row.position * row.impressions, 0) / impressions).toFixed(1) : "—";
};
const sum = (rows, field) => rows.reduce((total, row) => total + row[field], 0);
const table = (head, rows) => [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");
const thin = (impressions) => (impressions < 100 ? " (کم‌داده؛ برای نتیجه‌گیری کافی نیست)" : "");

const out = [`# گزارش Search Console${args.label ? ` — ${args.label}` : ""}`, "", `ساخته شده: ${new Date().toISOString().slice(0, 10)} با scripts/gsc-report.mjs`, ""];

if (args.queries) {
  const queries = parseCsv(args.queries).map((row) => {
    const q = normalise(row.query ?? row.key);
    return {
      ...row,
      q,
      brand: brandRe.test(q) ? "brand" : productRe.test(q) ? "product" : "non-brand",
      group: groupRes.find((group) => group.re.test(q))?.key ?? "unmapped",
    };
  });

  out.push("## مجموع", "", table(["Clicks", "Impressions", "CTR", "Avg. position", "Queries"], [[sum(queries, "clicks"), sum(queries, "impressions"), ctr(sum(queries, "clicks"), sum(queries, "impressions")), weightedPosition(queries), queries.length]]), "");
  out.push("> Search Console در فایل Queries عبارت‌های ناشناس (anonymized) را حذف می‌کند؛ مجموع این جدول کمتر از مجموع واقعی سایت است.", "");

  out.push("## Branded / Non-branded", "");
  out.push(table(["نوع", "Clicks", "Impressions", "CTR", "Avg. position"], ["brand", "product", "non-brand"].map((kind) => {
    const rows = queries.filter((row) => row.brand === kind);
    return [kind, sum(rows, "clicks"), sum(rows, "impressions"), ctr(sum(rows, "clicks"), sum(rows, "impressions")), weightedPosition(rows)];
  })), "");

  out.push("## گروه‌های کلمات کلیدی", "");
  out.push(table(["گروه", "صفحه هدف", "Clicks", "Impressions", "CTR", "Avg. position"], [...groupRes, { key: "unmapped", label: "بدون گروه", target: "—" }].map((group) => {
    const rows = queries.filter((row) => row.group === group.key);
    const impressions = sum(rows, "impressions");
    return [`${group.label}${thin(impressions)}`, group.target, sum(rows, "clicks"), impressions, ctr(sum(rows, "clicks"), impressions), weightedPosition(rows)];
  })), "");

  for (const group of [...groupRes, { key: "unmapped", label: "بدون گروه" }]) {
    const rows = queries.filter((row) => row.group === group.key).sort((a, b) => b.impressions - a.impressions).slice(0, 15);
    if (!rows.length) continue;
    out.push(`### ${group.label}`, "", table(["Query", "Clicks", "Impressions", "CTR", "Position"], rows.map((row) => [row.query ?? row.key, row.clicks, row.impressions, ctr(row.clicks, row.impressions), row.position.toFixed(1)])), "");
  }

  const opportunities = queries.filter((row) => row.impressions >= 50 && row.position >= 4 && row.position <= 20).sort((a, b) => b.impressions - a.impressions).slice(0, 20);
  if (opportunities.length) {
    out.push("## عبارت‌های نزدیک به صفحه اول (جایگاه ۴ تا ۲۰، حداقل ۵۰ نمایش)", "", table(["Query", "گروه", "Impressions", "Position"], opportunities.map((row) => [row.query ?? row.key, row.group, row.impressions, row.position.toFixed(1)])), "");
  }
}

if (args.pages) {
  const pages = parseCsv(args.pages).map((row) => ({ ...row, path: pathOf(row.page ?? row.key) }));
  out.push("## صفحات ورودی", "", table(["Page", "Clicks", "Impressions", "CTR", "Position"], pages.sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 40).map((row) => [row.path, row.clicks, row.impressions, ctr(row.clicks, row.impressions), row.position.toFixed(1)])), "");
}

if (args["query-page"]) {
  const rows = parseCsv(args["query-page"]).map((row) => ({ ...row, q: normalise(row.query ?? row.key), path: pathOf(row.page) }));
  const byQuery = new Map();
  for (const row of rows) byQuery.set(row.q, [...(byQuery.get(row.q) ?? []), row]);

  const competing = [...byQuery.entries()]
    .map(([q, list]) => {
      const total = sum(list, "impressions");
      const sharing = list.filter((row) => total && row.impressions / total >= 0.1);
      return { q, total, sharing };
    })
    .filter((item) => item.sharing.length >= 2 && item.total >= 30)
    .sort((a, b) => b.total - a.total);

  out.push("## پرسش‌هایی که چند صفحه برایشان نمایش گرفته‌اند", "");
  out.push("هر سطر یعنی دو یا چند صفحه هرکدام دست‌کم ۱۰٪ نمایش یک پرسش را گرفته‌اند. این به‌تنهایی Cannibalization نیست؛ قبل از ادغام یا تغییر، نیت جستجو و روند چندماهه را بررسی کنید.", "");
  out.push(competing.length
    ? table(["Query", "Impressions", "Pages (impressions / position)"], competing.slice(0, 30).map((item) => [item.q, item.total, item.sharing.map((row) => `${row.path} (${row.impressions} / ${row.position.toFixed(1)})`).join("<br>")]))
    : "موردی با این آستانه پیدا نشد.", "");

  const mismatched = [];
  for (const [q, list] of byQuery) {
    const group = groupRes.find((item) => item.re.test(q));
    if (!group) continue;
    const top = [...list].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)[0];
    const allowed = new Set([group.target, ...group.support]);
    if (top && !allowed.has(top.path) && sum(list, "impressions") >= 30) mismatched.push([q, group.label, group.target, top.path, top.impressions]);
  }
  if (mismatched.length) {
    out.push("## پرسش‌هایی که صفحه‌ای غیر از صفحه هدف برایشان رتبه گرفته", "", table(["Query", "گروه", "صفحه هدف", "صفحه رتبه‌گرفته", "Impressions"], mismatched.sort((a, b) => b[4] - a[4]).slice(0, 30)), "");
  }
}

const target = args.out ?? ".work/gsc-report.md";
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, `${out.join("\n")}\n`);
console.log(`Report written to ${target}`);
