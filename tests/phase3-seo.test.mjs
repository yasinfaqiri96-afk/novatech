import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("organization identity is consistent and claims nothing unverified", () => {
  const seo = read("lib/seo.ts");
  const site = read("lib/site-content.ts");

  assert.match(site, /legalName: "Novatech Technology Solutions"/);
  assert.match(site, /brandName: "نواتیک"/);
  assert.match(site, /sameAs: \["https:\/\/instagram\.com\/novatechsoft"\]/);
  assert.match(seo, /sameAs: companyInfo\.sameAs/);
  assert.match(seo, /knowsAbout: services\.map/);
  for (const unverified of ["foundingDate", "aggregateRating", "\"review\"", "award", "numberOfEmployees"]) {
    assert.doesNotMatch(seo.replace(/\/\*[\s\S]*?\*\//g, ""), new RegExp(`${unverified}\\s*:`), `${unverified} must not be published`);
  }
});

test("brand name is spelled one way in published copy", () => {
  const files = [
    "lib/site-content.ts",
    "lib/mashal.ts",
    "lib/mashal-case-study.ts",
    "lib/case-studies.ts",
    "lib/portfolio-data.json",
    "app/en/oil-and-gas-erp-afghanistan/page.tsx",
    "app/ps/oil-and-gas-erp-afghanistan/page.tsx",
  ];
  for (const file of files) {
    const source = read(file);
    assert.doesNotMatch(source, /NOVATECH/, `${file} uses the all-caps brand`);
    assert.doesNotMatch(source, /تکنولوژی|تکنولوژۍ/, `${file} uses the Iranian spelling instead of تکنالوژی`);
  }
});

test("Nazer is described as a SoftwareApplication from the scope the page shows", () => {
  const page = read("app/(fa)/accounting-software/page.tsx");
  assert.match(page, /softwareApplicationSchema\(\{[\s\S]*name: "Nazer"[\s\S]*featureList: nazerScope/);
  assert.match(page, /operatingSystem: null/);
  assert.doesNotMatch(page, /پيشنهاد|ويژه/, "Arabic yeh in Persian copy");
});

test("every Person node resolves to a visible team card on /about", () => {
  const seo = read("lib/seo.ts");
  const about = read("app/(fa)/about/page.tsx");
  assert.match(seo, /"@id": `\$\{siteUrl\}\/about#\$\{member\.slug\}`/);
  assert.match(about, /teamMembers\.map\(\(member\) =>[\s\S]*id=\{member\.slug\}/);
  assert.match(about, /faqSchema\(faq\)/);
  assert.match(about, /faq\.map\(\(item\) =>[\s\S]*<details key=\{item\.question\}/);
  assert.doesNotMatch(about, /import ServiceFaq/, "shared FAQ module here regroups CSS chunks into service pages");
  assert.match(about, /mainEntity: \{ "@id": ORGANIZATION_ID \}/);
});

test("home page FAQ markup and visible FAQ come from one array", () => {
  const page = read("app/(fa)/page.tsx");
  const section = read("components/HomeExpertise.tsx");
  const home = read("app/(fa)/HomeClient.tsx");
  assert.match(page, /faqSchema\(homeFaq\)/);
  assert.match(section, /homeFaq\.map\(\(item\) =>[\s\S]*<details/);
  assert.doesNotMatch(section, /SitePage\.module\.css|import ServiceFaq/, "shared CSS modules on the home page regroup CSS chunks site-wide");
  assert.match(home, /<HomeExpertise \/>/);
  assert.doesNotMatch(section, /"use client"/, "the FAQ must stay server-rendered");
});

test("Nazer plans publish no unconfirmed limits", () => {
  const page = read("app/(fa)/accounting-software/page.tsx");
  const pricing = page.slice(page.indexOf("{/* 5. PRICING"), page.indexOf("{/* 6. ORDER FORM */}"));
  assert.ok(pricing.length > 1000, "pricing section not found");
  // A bare number (no unit) or a user count that was never confirmed must not
  // reappear in the plan table.
  assert.doesNotMatch(pricing, /<span className="[^"]*">\s*\d+\s*<\/span>/);
  assert.doesNotMatch(pricing, /\d+ کاربر/);
});

test("about-page counter is derived from the published portfolio", () => {
  const about = read("app/(fa)/about/page.tsx");
  assert.match(about, /value: portfolioData\.length\.toLocaleString\("fa-AF"\)/);
  assert.doesNotMatch(about, /value: "۹"/);
});

test("staff profile links belong to the named person", () => {
  const team = read("lib/team.ts");
  // reza.kazemi.7583 was removed in Phase 3 as another person's profile; the site
  // owner confirmed on 2026-10-19 that it is Sayed Mahdi Kazemi's own account.
  assert.match(team, /confirmed as his by the site owner[\s\S]*reza\.kazemi\.7583/);
  assert.match(team, /instagram\?: string;/);
  assert.match(read("app/(fa)/about/page.tsx"), /member\.socialLinks\.facebook && \(/);
  // Personal profiles stay out of the Person JSON-LD until each person consents.
  assert.doesNotMatch(read("lib/seo.ts"), /socialLinks/);
});

test("custom software page no longer targets the database intent in its headings", () => {
  const client = read("app/(fa)/software-solutions/SoftwareSolutionsClient.tsx");
  const faq = read("app/(fa)/software-solutions/faq-items.ts");
  assert.doesNotMatch(client, /راهکارهای دیتابیس/);
  assert.doesNotMatch(faq, /question: "[۱-۹]\./, "FAQ questions should not carry list numbers");
  assert.doesNotMatch(faq, /تمام نرم‌افزارهای ما/);
});

test("Mashal H1 names the product category and topic titles are in the page language", () => {
  const hub = read("components/MashalProductPage.tsx");
  assert.match(hub, /<h1 className=\{styles\.h1\}>مدیریت نفت و گاز،<br \/><em>در یک مشعل<\/em><\/h1>/);
  const source = read("lib/mashal.ts");
  const titles = [...source.matchAll(/metaTitle: "([^"]+)"/g)].map((m) => m[1]);
  assert.ok(titles.length >= 14);
  for (const title of titles) {
    assert.match(title, /[؀-ۿ]/, `Dari topic page has a non-Dari title: ${title}`);
  }
});

test("article dates shown on the page match the BlogPosting dates", () => {
  const page = read("app/(fa)/blog/[slug]/page.tsx");
  assert.match(page, /<time dateTime=\{article\.isoDate\}>/);
  assert.match(page, /article\.isoModified && \([\s\S]*<time dateTime=\{article\.isoModified\}>/);
  assert.match(page, /dateModified: article\.isoModified \?\? article\.isoDate/);
  assert.match(read("app/sitemap.ts"), /lastModified: new Date\(article\.isoModified \?\? article\.isoDate\)/);
});

test("the company-selection guide gives criteria, not a superiority claim", () => {
  const source = read("lib/blog-content.ts");
  const start = source.indexOf('slug: "choosing-software-company-herat"');
  assert.ok(start > 0, "article is missing");
  const article = source.slice(start, source.indexOf("\n  },\n", start) > 0 ? source.indexOf("\n  },\n", start) : source.length);
  assert.match(article, /relatedService: "software-solutions"/);
  assert.match(article, /href: "\/herat"/);
  assert.match(article, /href: "\/portfolio"/);
  // "بهترین" may appear only as the quoted search phrase being discussed.
  for (const match of article.matchAll(/بهترین[^»"]{0,30}/g)) {
    const before = article.slice(Math.max(0, match.index - 1), match.index);
    assert.equal(before, "«", `unquoted superiority wording: ${match[0]}`);
  }
});

test("llms.txt is static and generated from the site's own data", () => {
  const route = read("app/llms.txt/route.ts");
  assert.match(route, /export const dynamic = "force-static"/);
  for (const source of ["services", "blogArticles", "caseStudies", "mashalIntentPages", "companyInfo"]) {
    assert.match(route, new RegExp(source));
  }
});

test("robots keeps search and answer-engine crawlers allowed", () => {
  const robots = read("app/robots.ts");
  assert.match(robots, /userAgent: "\*"/);
  assert.match(robots, /allow: "\/"/);
  assert.doesNotMatch(robots, /disallow: \["\/"\]/);
  assert.doesNotMatch(robots, /OAI-SearchBot|GPTBot|Bingbot|Googlebot/, "a bot-specific group would replace the * rules for that bot");
});

test("Search Console report classifies queries and flags shared queries from CSV", () => {
  const dir = mkdtempSync(join(tmpdir(), "gsc-"));
  const out = join(dir, "report.md");
  execFileSync(process.execPath, [
    "scripts/gsc-report.mjs",
    "--queries", "tests/fixtures/gsc-queries.csv",
    "--query-page", "tests/fixtures/gsc-query-page.csv",
    "--out", out,
  ]);
  assert.ok(existsSync(out));
  const report = read(out);
  assert.match(report, /\| brand \| 15 \| 60 \|/);
  assert.match(report, /\| non-brand \| 2 \| 330 \|/);
  assert.match(report, /طراحی دیتابیس \| 90 \| \/database-solutions/);
  assert.match(report, /سیستم گدام \| نرم‌افزار اختصاصی \| \/software-solutions \| \/portfolio\/warehouse-management-system/);
});
