import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const outputDir = path.resolve("design-reports/baran-interaction");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
await page.goto("https://baransys.com/", { waitUntil: "domcontentloaded", timeout: 60_000 });
await page.waitForTimeout(2500);
await page.evaluate(async () => document.fonts?.ready);

const summary = await page.evaluate(() => {
  const rect = (element) => {
    const box = element.getBoundingClientRect();
    return {
      x: Math.round(box.x),
      y: Math.round(box.y),
      top: Math.round(box.top + scrollY),
      left: Math.round(box.left + scrollX),
      width: Math.round(box.width),
      height: Math.round(box.height),
    };
  };
  const info = (element) => {
    const style = getComputedStyle(element);
    return {
      tag: element.tagName.toLowerCase(),
      id: element.id,
      className: typeof element.className === "string" ? element.className : "",
      text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 240) ?? "",
      rect: rect(element),
      position: style.position,
      overflow: `${style.overflowX} ${style.overflowY}`,
      transform: style.transform,
      transformOrigin: style.transformOrigin,
      transition: `${style.transitionProperty} ${style.transitionDuration} ${style.transitionTimingFunction}`,
      borderRadius: style.borderRadius,
      opacity: style.opacity,
    };
  };

  const arc = document.querySelector(".arc-scroll-wrapper");
  const headings = [...document.querySelectorAll("h1, h2, h3")].map(info);
  const arcNodes = arc
    ? [arc, ...arc.querySelectorAll(":scope > *, [class*='arc'], .elementor-widget-image-box, .elementor-widget-image, .elementor-widget-heading")]
        .map(info)
        .filter((item, index, items) => items.findIndex((candidate) => candidate.className === item.className && candidate.text === item.text) === index)
    : [];
  return {
    page: {
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      scrollX,
      scrollY,
      bodyDirection: getComputedStyle(document.body).direction,
    },
    headings,
    arc: arc ? info(arc) : null,
    arcNodes,
  };
});

const arc = page.locator(".arc-scroll-wrapper").first();
if (await arc.count()) {
  await arc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const initialArcBox = await arc.boundingBox();
  if (initialArcBox) {
    await page.evaluate((top) => window.scrollTo(0, Math.max(0, top - 120)), initialArcBox.y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(outputDir, "arc-viewport-before-interaction.png") });
  }
  await arc.screenshot({ path: path.join(outputDir, "arc-wrapper.png") });

  const cards = arc.locator(".elementor-widget-image-box, .elementor-widget-image");
  const cardCount = await cards.count();
  summary.arcCardCount = cardCount;
  summary.arcStates = [];

  for (let index = 0; index < Math.min(cardCount, 12); index += 1) {
    const card = cards.nth(index);
    const before = await card.evaluate((element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return { transform: style.transform, opacity: style.opacity, zIndex: style.zIndex, x: box.x, y: box.y, width: box.width, height: box.height };
    });
    await card.hover({ force: true });
    await page.waitForTimeout(450);
    const after = await card.evaluate((element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return { transform: style.transform, opacity: style.opacity, zIndex: style.zIndex, x: box.x, y: box.y, width: box.width, height: box.height };
    });
    summary.arcStates.push({ index, before, after });
  }

  await page.evaluate(() => window.scrollTo(0, 0));

  const arcBox = await arc.boundingBox();
  if (arcBox) {
    const start = Math.max(0, Math.round(arcBox.y - 300));
    const stops = [start, start + 250, start + 500, start + 800, start + 1100];
    summary.scrollStates = [];
    for (const [index, top] of stops.entries()) {
      await page.evaluate((value) => window.scrollTo(0, value), top);
      await page.waitForTimeout(700);
      const state = await page.evaluate(() => ({
        scrollX,
        scrollY,
        cards: [...document.querySelectorAll(".arc-scroll-wrapper .elementor-widget-image-box, .arc-scroll-wrapper .elementor-widget-image")]
          .slice(0, 12)
          .map((element) => {
            const style = getComputedStyle(element);
            const box = element.getBoundingClientRect();
            return { transform: style.transform, opacity: style.opacity, zIndex: style.zIndex, x: box.x, y: box.y, width: box.width, height: box.height };
          }),
      }));
      summary.scrollStates.push({ top, ...state });
      await page.screenshot({ path: path.join(outputDir, `arc-scroll-${index}-${top}.png`) });
    }
  }
}

const featureHeadings = summary.headings.filter((item) => /امکانات|قابلیت|کمک|نرم افزار|سود/.test(item.text));
summary.featureHeadings = featureHeadings;
for (const [index, heading] of featureHeadings.entries()) {
  const locator = page.locator(heading.tag, { hasText: heading.text.slice(0, 30) }).first();
  if (await locator.count()) {
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outputDir, `feature-heading-${String(index).padStart(2, "0")}.png`) });
  }
}

await writeFile(path.join(outputDir, "baran-interaction.json"), JSON.stringify(summary, null, 2));
await browser.close();
console.log(JSON.stringify({ outputDir, arcFound: Boolean(summary.arc), arcCardCount: summary.arcCardCount, headings: summary.headings.length }, null, 2));
