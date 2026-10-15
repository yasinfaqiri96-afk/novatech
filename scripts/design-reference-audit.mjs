import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const chromePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const outputDir = path.resolve("design-reports/reference-audit");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: chromePath,
  headless: true,
});

const report = {
  capturedAt: new Date().toISOString(),
  browser: "Google Chrome via Playwright",
  novatech: [],
  baran: {},
};

async function settle(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(1800);
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    window.scrollTo(0, 0);
  });
}

async function inspectPage(page) {
  return page.evaluate(() => {
    const styleOf = (element) => {
      if (!element) return null;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 180) ?? "",
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        color: style.color,
        backgroundColor: style.backgroundColor,
        borderRadius: style.borderRadius,
        padding: style.padding,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };

    const visible = (element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
    };

    const action = [...document.querySelectorAll("a, button")].find((element) => {
      if (!visible(element)) return false;
      const style = getComputedStyle(element);
      return style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent";
    });

    const sections = [...document.querySelectorAll("main section, article section, body > section")]
      .filter(visible)
      .map((section, index) => {
        const rect = section.getBoundingClientRect();
        const heading = section.querySelector("h1, h2, h3");
        return {
          index,
          id: section.id,
          heading: heading?.textContent?.replace(/\s+/g, " ").trim().slice(0, 160) ?? "",
          top: Math.round(rect.top + scrollY),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          backgroundColor: getComputedStyle(section).backgroundColor,
        };
      });

    const animated = [...document.querySelectorAll("body *")]
      .filter(visible)
      .map((element) => {
        const style = getComputedStyle(element);
        return {
          element,
          animation: style.animationName,
          transition: style.transitionDuration,
          transform: style.transform,
        };
      })
      .filter((item) => item.animation !== "none" || item.transition !== "0s" || item.transform !== "none")
      .slice(0, 160)
      .map(({ element, animation, transition, transform }) => ({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className.slice(0, 180) : "",
        text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 100) ?? "",
        animation,
        transition,
        transform,
      }));

    const root = getComputedStyle(document.documentElement);
    const cssVariables = {};
    for (const name of [...root]) {
      if (name.startsWith("--") && /(color|primary|accent|font|space|container|radius)/i.test(name)) {
        cssVariables[name] = root.getPropertyValue(name).trim();
      }
    }

    return {
      title: document.title,
      lang: document.documentElement.lang,
      direction: getComputedStyle(document.documentElement).direction,
      viewport: { width: innerWidth, height: innerHeight },
      document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      body: styleOf(document.body),
      h1: styleOf(document.querySelector("h1")),
      h2: styleOf(document.querySelector("h2")),
      action: styleOf(action),
      sections,
      animated,
      cssVariables,
    };
  });
}

const novatechPages = [
  ["home", "https://novatechsoft.com/"],
  ["software", "https://novatechsoft.com/software-solutions"],
  ["web-design", "https://novatechsoft.com/web-design"],
  ["portfolio", "https://novatechsoft.com/portfolio"],
  ["about", "https://novatechsoft.com/about"],
  ["contact", "https://novatechsoft.com/contact"],
  ["mashal-before", "https://novatechsoft.com/oil-and-gas-software"],
];

for (const [name, url] of novatechPages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settle(page);
  report.novatech.push({ name, url, ...(await inspectPage(page)) });
  await page.screenshot({ path: path.join(outputDir, `novatech-${name}-1440.png`), fullPage: true });
  await page.close();
}

for (const width of [390, 768]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1024 }, deviceScaleFactor: 1 });
  await page.goto("https://novatechsoft.com/oil-and-gas-software", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settle(page);
  await page.screenshot({ path: path.join(outputDir, `novatech-mashal-before-${width}.png`), fullPage: true });
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto("https://baransys.com/", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settle(page);
  report.baran.desktop = await inspectPage(page);
  await page.screenshot({ path: path.join(outputDir, "baran-full-1440.png"), fullPage: true });

  const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const stops = [...new Set([0, 650, 1300, 2000, 2800, 3700, 4700, 5800, maxScroll].map((value) => Math.max(0, Math.min(maxScroll, value))))];
  for (const [index, scrollTop] of stops.entries()) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), scrollTop);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outputDir, `baran-fold-${String(index).padStart(2, "0")}-${scrollTop}.png`) });
  }
  await page.close();
}

{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await page.goto("https://baransys.com/", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settle(page);
  report.baran.mobile = await inspectPage(page);
  await page.screenshot({ path: path.join(outputDir, "baran-full-390.png"), fullPage: true });
  await page.close();
}

await writeFile(path.join(outputDir, "reference-audit.json"), JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify({ outputDir, novatechPages: report.novatech.length, baranSections: report.baran.desktop.sections.length }, null, 2));
