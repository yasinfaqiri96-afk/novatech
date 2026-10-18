import JsonLd from "@/components/JsonLd";
import PortfolioBoard from "@/components/portfolio/PortfolioBoard";
import PortfolioIntro from "@/components/portfolio/PortfolioIntro";
import styles from "@/components/portfolio/Portfolio.module.css";
import portfolioData from "@/lib/portfolio-data.json";
import { buildMetadata } from "@/lib/metadata";
import { caseStudies } from "@/lib/case-studies";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { companyInfo, siteUrl } from "@/lib/site-content";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "نمونه کارها", path: "/portfolio" },
];

export const metadata = buildMetadata({
  fullTitle: `نمونه کارها | سامانه ها و وب سایت های تحویل شده ${companyInfo.brandName}`,
  title: "نمونه کارها",
  description:
    "نمونه‌کارهای نواتیک: سامانه‌های لجستیک، نفت و گاز، فروش و مدیریت کسب‌وکار، و وب‌سایت‌های شرکتی و فروشگاهی مانند Telionix.",
  path: "/portfolio",
});

/** ItemList of the case studies, so the collection is understood as a set. */
const itemListSchema = {
  "@type": "ItemList",
  name: `نمونه کارهای ${companyInfo.brandName}`,
  itemListElement: caseStudies.map((study, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: study.title,
    url: `${siteUrl}/portfolio/${study.slug}`,
  })),
};

/** Counted from the published portfolio itself, so the figures cannot drift. */
const stats = [
  { value: `${portfolioData.filter((item) => item.kind === "software").length}+`, label: "سامانه تحویل شده" },
  { value: `${portfolioData.filter((item) => item.kind === "website").length}`, label: "وب سایت" },
  { value: `${new Set(portfolioData.map((item) => item.category)).size}`, label: "حوزه کاری" },
];

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/portfolio",
            name: `نمونه کارهای ${companyInfo.brandName}`,
            description: metadata.description as string,
          }),
          breadcrumbSchema(breadcrumbs),
          itemListSchema,
        )}
      />

      {/* Gradients shared by the side tabs and favourite tabs on this page. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="portfolio-side-tab" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dddce5" />
          </linearGradient>
          <linearGradient id="portfolio-fav-tab" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#dddce5" />
          </linearGradient>
        </defs>
      </svg>

      <div className={styles.page}>
        <PortfolioIntro stats={stats} />
        <PortfolioBoard />
      </div>
    </>
  );
}
