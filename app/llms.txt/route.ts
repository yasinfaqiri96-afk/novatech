import { blogArticles } from "@/lib/blog-content";
import { caseStudies } from "@/lib/case-studies";
import { mashalCanonicalPath, mashalEnglishPath, mashalIntentPages, mashalPashtoPath } from "@/lib/mashal";
import { services } from "@/lib/services";
import { companyInfo, siteUrl } from "@/lib/site-content";

/**
 * A plain-text map of the site in the llms.txt format (https://llmstxt.org).
 *
 * It is a convenience for tools that look for it, not a ranking factor: no
 * search or answer engine documents that it reads this file, so nothing here is
 * relied on. Every line is generated from the same data the pages, the sitemap
 * and the JSON-LD read, and every URL is a canonical, indexable page, so the
 * file can never describe a page that does not exist or say something a page
 * does not.
 */
export const dynamic = "force-static";

const url = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;
const line = (path: string, label: string, note?: string) =>
  `- [${label}](${url(path)})${note ? `: ${note}` : ""}`;

export function GET() {
  const products = services.filter((service) =>
    ["accounting-software", "oil-and-gas-software"].includes(service.key),
  );
  const otherServices = services.filter((service) => !products.includes(service));

  const body = [
    `# ${companyInfo.legalName} (${companyInfo.brandName})`,
    "",
    `> ${companyInfo.shortDescription}`,
    "",
    `Office: ${companyInfo.address}. Phone: ${companyInfo.primaryPhoneHref}. Email: ${companyInfo.email}.`,
    "Primary language of the site: Dari (fa-AF). The Mashal product page is also published in Pashto and English.",
    "",
    "## Products",
    ...products.map((service) => line(service.path, service.navLabel, service.teaser)),
    line(mashalEnglishPath, "Mashal Oil & Gas ERP (English)"),
    line(mashalPashtoPath, "مشعل؛ د تېلو او ګازو ERP (پښتو)"),
    line(`${mashalCanonicalPath}/features`, "امکانات مشعل"),
    "",
    "## Services",
    ...otherServices.map((service) => line(service.path, service.navLabel, service.teaser)),
    "",
    "## Company",
    line("/", "صفحه اصلی"),
    line("/about", "درباره نواتیک", "تیم، محصولات، روش کار و اطلاعات تماس"),
    line("/herat", "نواتیک در هرات", "آدرس دفتر، ساعت کاری و روش کار حضوری"),
    line("/contact", "تماس با نواتیک"),
    line("/portfolio", "نمونه کارها"),
    "",
    "## Case studies",
    ...caseStudies.map((study) => line(`/portfolio/${study.slug}`, study.title, study.summary)),
    "",
    "## Mashal guides",
    ...mashalIntentPages.map((page) =>
      line(`${mashalCanonicalPath}/${page.slug}`, page.navLabel, page.description),
    ),
    "",
    "## Articles",
    ...blogArticles.map((article) => line(`/blog/${article.slug}`, article.title)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
