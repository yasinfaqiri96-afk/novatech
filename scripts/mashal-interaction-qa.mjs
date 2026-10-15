/** Keyboard, motion, zoom, tab and link checks for the redesigned Mashal landing. */
import fs from "node:fs";
import { chromium } from "playwright";

const base = process.env.QA_BASE ?? "http://localhost:4197";
const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = {};

for (const width of [390, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`${base}/oil-and-gas-software`, { waitUntil: "networkidle" });
  const arc = page.getByRole("region", { name: "جریان قابلیت‌های مشعل" });

  await arc.scrollIntoViewIfNeeded();
  await arc.focus();
  const beforeKey = await arc.locator('button[aria-current="true"] strong').textContent();
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(900);
  const afterKey = await arc.locator('button[aria-current="true"] strong').textContent();

  const explorer = page.locator("#mashal-explorer");
  await explorer.scrollIntoViewIfNeeded();
  const firstSrc = await explorer.locator("img").first().getAttribute("src");
  await explorer.getByRole("tab", { name: /راپورها/ }).click();
  await page.waitForTimeout(700);
  const secondSrc = await explorer.locator("img").first().getAttribute("src");

  await explorer.locator("[data-mashal-image] button").first().click();
  await page.waitForTimeout(400);
  const opened = await page.locator("dialog[open]").count();
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const closed = await page.locator("dialog[open]").count();

  const form = page.locator("#mashal-demo form");
  const fields = await form.locator("input,select").count();
  const submits = await form.locator('button[type="submit"]').count();

  report[width] = {
    keyboardMoved: beforeKey !== afterKey, beforeKey, afterKey,
    explorerImageChanged: firstSrc !== secondSrc,
    zoomOpened: opened === 1, escapeClosed: closed === 0,
    formFields: fields, formSubmit: submits, errors,
  };
  await page.close();
}

const reduced = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
const page = await reduced.newPage();
await page.goto(`${base}/oil-and-gas-software`, { waitUntil: "networkidle" });
const arc = page.getByRole("region", { name: "جریان قابلیت‌های مشعل" });
await arc.scrollIntoViewIfNeeded();
const start = await arc.locator('button[aria-current="true"] strong').textContent();
await page.waitForTimeout(7000);
const end = await arc.locator('button[aria-current="true"] strong').textContent();
const transition = await arc.locator("button").first().evaluate(node => getComputedStyle(node).transitionDuration);
report.reducedMotion = { autoplayStopped: start === end, transitionDuration: transition };
await reduced.close();

const links = await (async () => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const probe = await context.newPage();
  await probe.goto(`${base}/oil-and-gas-software`, { waitUntil: "networkidle" });
  const hrefs = await probe.evaluate(() => [...new Set([...document.querySelectorAll("a[href^='/']")].map(a => a.getAttribute("href")))]);
  await context.close();
  const broken = [];
  for (const href of hrefs) {
    const response = await fetch(base + href.split("#")[0], { redirect: "manual" });
    if (response.status >= 400) broken.push({ href, status: response.status });
  }
  return { checked: hrefs.length, broken };
})();
report.links = links;

await browser.close();
fs.writeFileSync("design-reports/mashal-redesign/interaction-qa.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
