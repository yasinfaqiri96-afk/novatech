import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(existsSync(path) ? path : path.replace(/^app\//, "app/(fa)/"), "utf8");

test("Mashal keeps the established canonical product URL", () => {
  const page = read("app/oil-and-gas-software/page.tsx");
  const config = read("next.config.ts");
  assert.match(page, /مشعل \| نرم افزار نفت و گاز افغانستان \| سیستم مدیریت شرکت نفتی/);
  assert.match(config, /source: "\/mashal"[\s\S]*destination: "\/oil-and-gas-software"[\s\S]*statusCode: 301/);
});

test("each distinct Mashal commercial intent has a static route", () => {
  const source = read("lib/mashal.ts");
  for (const slug of [
    "contracts",
    "loading",
    "tank-inventory",
    "tanker-logistics",
    "customs",
    "sales",
    "accounting",
    "partner-settlement",
    "profit-loss",
    "reports",
    "security",
    "petroleum-trading",
    "specialized-erp-vs-accounting",
  ]) {
    assert.match(source, new RegExp(`slug: "${slug}"`));
  }
  assert.match(read("app/sitemap.ts"), /mashalIntentPages/);
});

test("published Mashal screenshots exist and use descriptive WebP names", () => {
  const source = read("lib/mashal.ts");
  const paths = [...source.matchAll(/src: "(\/images\/mashal\/[^"\n]+\.webp)"/g)].map((match) => match[1]);
  assert.equal(paths.length, 9);
  for (const path of paths) {
    assert.equal(existsSync(`public${path}`), true, `${path} is missing`);
    assert.doesNotMatch(path, /image\d|screenshot\d/i);
  }
});

test("Dari, Pashto and English pages publish reciprocal language alternatives", () => {
  const source = read("lib/mashal.ts");
  assert.match(source, /"fa-AF": mashalCanonicalPath/);
  assert.match(source, /"ps-AF": mashalPashtoPath/);
  assert.match(source, /"en-AF": mashalEnglishPath/);
  assert.match(source, /"x-default": mashalCanonicalPath/);
  assert.match(read("app/en/oil-and-gas-erp-afghanistan/page.tsx"), /languages: mashalLanguageAlternates/);
  assert.match(read("app/ps/oil-and-gas-erp-afghanistan/page.tsx"), /languages: mashalLanguageAlternates/);
  assert.match(read("app/sitemap.ts"), /mashalPashtoPath/);
});

test("company is a real lead field and the bot honeypot has a separate name", () => {
  const form = read("components/LeadForm.tsx");
  const route = read("app/api/contact/route.ts");
  assert.match(form, /name="website"/);
  assert.match(form, /data\.get\("company"\)/);
  assert.match(route, /\.website/);
  assert.doesNotMatch(route, /\.company \?\? ""/);
});

test("Mashal retains grouped guides in the footer and established Persian typefaces", () => {
  const footer = read("components/Footer.tsx");
  const styles = read("components/MashalProductPage.module.css");
  const landingStyles = read("components/mashal/MashalLanding.module.css");

  assert.match(footer, /mashalNavigationGroups/);
  assert.match(styles, /\.page:lang\(fa\)[\s\S]*font-family:\s*IranYekanRegular/);
  assert.match(styles, /\.page:lang\(fa\) :is\(h1, h2\)[\s\S]*font-family:\s*IranYekanBold/);
  assert.match(styles, /font-family:\s*IranYekanBold/);
  assert.match(landingStyles, /font-family:\s*IranYekanRegular/);
  assert.match(landingStyles, /font-family:\s*IranYekanBold/);
  assert.match(landingStyles, /font-family:\s*IranYekanBold/);
});

test("unverified HR search intents are not published as Mashal landing pages", () => {
  const source = read("lib/mashal.ts");
  for (const slug of ["hr", "attendance", "payroll"]) {
    assert.doesNotMatch(source, new RegExp(`slug: "${slug}"`));
  }
});

test("Mashal product and implementation case study link to each other with distinct intent", () => {
  const product = read("components/MashalProductPage.tsx");
  const studies = read("lib/case-studies.ts");
  const caseStudyPage = read("app/portfolio/[slug]/page.tsx");

  assert.match(product, /href="\/portfolio\/oil-and-gas-management-system"/);
  assert.match(studies, /seoTitle: mashalCaseStudy.fa.title/);
  assert.match(studies, /pageHeading: mashalCaseStudy.fa.title/);
  assert.match(studies, /href: "\/oil-and-gas-software"/);
  assert.match(caseStudyPage, /isMashalCaseStudy[\s\S]*href="\/oil-and-gas-software"[\s\S]*مشاهده صفحه محصول و امکانات ERP نفت و گاز مشعل/);
});

test("Pashto Mashal page is server rendered with one H1 and matching FAQ schema data", () => {
  const page = read("app/ps/oil-and-gas-erp-afghanistan/page.tsx");
  assert.equal((page.match(/<h1\b/g) ?? []).length, 1);
  assert.match(page, /inLanguage: "ps-AF"/);
  assert.match(page, /breadcrumbSchema\(breadcrumbs\)/);
  assert.match(page, /faqSchema\(questions\.map/);
  assert.match(page, /questions\.map\(\(\[question, answer\]\) => <details/);
});

test("the product hub links to every Mashal intent page so the cluster has one real hub", () => {
  const source = read("lib/mashal.ts");
  const hub = read("components/MashalProductPage.tsx");
  const linkable = hub + source;
  const slugs = [...source.matchAll(/slug: "([a-z-]+)"/g)].map((m) => m[1]);

  assert.ok(slugs.length >= 13, `expected the full intent set, found ${slugs.length}`);
  // The hub either links a topic literally, or renders every intent page from
  // mashalIntentPages into the collapsed full-guide list.
  const rendersAllIntentPages = /mashalIntentPages\.map\(\(page\)[\s\S]*href=\{\`\$\{mashalCanonicalPath\}\/\$\{page\.slug\}\`\}/.test(hub);
  for (const slug of slugs) {
    const linked =
      new RegExp(`/oil-and-gas-software/${slug}"`).test(linkable) ||
      rendersAllIntentPages;
    assert.ok(linked, `hub does not link to /${slug}`);
  }
});

test("verified capability groups stay grouped instead of becoming a feature dump", () => {
  const source = read("lib/mashal.ts");
  const block = (source.match(/mashalCapabilityGroups = \[([\s\S]*?)\n\] as const;/) ?? [])[1];
  assert.ok(block, "mashalCapabilityGroups is missing");
  const groups = [...block.matchAll(/label: "([^"]+)"/g)].map((m) => m[1]);
  assert.equal(groups.length, 3, "capability layers should stay at three");
  const items = [...block.matchAll(/title: "([^"]+)"/g)].map((m) => m[1]);
  assert.ok(items.length >= 15, `expected the grouped capability set, found ${items.length}`);

  const hub = read("components/MashalProductPage.tsx");
  assert.match(hub, /mashalFeatureGroups/);
  // Quality inspection is published as a hub section, not a thin landing page.
  assert.match(hub, /id="quality-control"/);
  assert.doesNotMatch(source, /slug: "quality[a-z-]*"/);
});


test("Mashal publishes a verified deep feature catalog and a database-search intent page", () => {
  const catalog = read("lib/mashal-features.ts");
  const groups = [...catalog.matchAll(/^    key: "([^"]+)"/gm)].map((m) => m[1]);
  const features = [...catalog.matchAll(/^      "[^"]+",?$/gm)];

  assert.equal(groups.length, 12, "feature catalog should stay grouped into 12 business domains");
  assert.equal(features.length, 96, "feature catalog should expose the 96 verified capabilities");

  const hub = read("components/MashalProductPage.tsx");
  assert.match(hub, /mashalFeatureCount/);
  assert.match(hub, /href="\/oil-and-gas-software\/features"/);

  const source = read("lib/mashal.ts");
  assert.match(source, /slug: "database"/);
  assert.match(source, /سیستم دیتابس نفت و گاز/);
  assert.match(source, /دیتابیس نفت و گاز/);

  const featurePage = read("app/oil-and-gas-software/features/page.tsx");
  assert.match(featurePage, /mashalFeatureGroups\.map/);

  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /\/oil-and-gas-software\/features/);
});
