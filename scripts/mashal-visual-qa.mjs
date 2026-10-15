import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const output = path.resolve("design-reports/mashal-redesign");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = { url: "http://localhost:4197/oil-and-gas-software", viewports: {}, interactions: {} };

const widths = process.env.QA_WIDTHS ? process.env.QA_WIDTHS.split(",").map(Number) : [390, 768, 1440];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(report.url, { waitUntil: "networkidle" });
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(output, `mashal-after-${width}.png`), fullPage: true });
  const arc = page.getByRole("region", { name: "جریان قابلیت‌های مشعل" });
  const explorer = page.locator("#mashal-explorer");
  const product = page.getByRole("heading", { name: "تصمیم‌ها، روی یک تصویر روشن" }).locator("xpath=ancestor::section");
  await arc.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
  await arc.screenshot({ path: path.join(output, `mashal-arc-${width}.png`) });
  await explorer.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
  await explorer.screenshot({ path: path.join(output, `mashal-explorer-${width}.png`) });
  await product.scrollIntoViewIfNeeded(); await page.waitForTimeout(250);
  await product.screenshot({ path: path.join(output, `mashal-product-${width}.png`) });
  const metrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    h1: (() => { const el = document.querySelector("h1"); const s = getComputedStyle(el); return { fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, color: s.color }; })(),
    primary: (() => { const el = document.querySelector('a[href="#mashal-demo"]'); const s = getComputedStyle(el); return { background: s.backgroundColor, radius: s.borderRadius }; })(),
  }));
  report.viewports[width] = { ...metrics, horizontalOverflow: metrics.documentWidth > metrics.viewportWidth + 1, errors };

  if (width === 1440) {
    const activeCard = arc.locator('button[aria-current="true"]');
    const hoverBefore = await activeCard.evaluate(el => ({ border: getComputedStyle(el).borderColor, shadow: getComputedStyle(el).boxShadow }));
    await activeCard.hover();
    await page.waitForTimeout(350);
    const hoverAfter = await activeCard.evaluate(el => ({ border: getComputedStyle(el).borderColor, shadow: getComputedStyle(el).boxShadow }));
    const before = await arc.locator('button[aria-current="true"] strong').textContent();
    await arc.getByRole("button", { name: "قابلیت بعدی" }).click();
    await page.waitForTimeout(850);
    const after = await arc.locator('button[aria-current="true"] strong').textContent();
    await explorer.getByRole("tab", { name: /تانک‌ها/ }).click();
    await page.waitForTimeout(600);
    const selected = await explorer.getByRole("tab", { selected: true }).textContent();
    await explorer.locator('[data-mashal-image] button').first().click();
    const openDialog = page.locator("dialog[open]");
    const dialogOpen = await openDialog.count() === 1;
    if (dialogOpen) await openDialog.getByRole("button", { name: "بستن تصویر" }).click();
    report.interactions = { arcMoved: before !== after, before, after, hoverChanged: JSON.stringify(hoverBefore) !== JSON.stringify(hoverAfter), selectedExplorer: selected?.replace(/\s+/g, " ").trim(), dialogOpen };
  }
  await page.close();
}

await writeFile(path.join(output, "qa-report.json"), JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify(report, null, 2));
