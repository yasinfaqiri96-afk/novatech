import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-content";
import { blogArticles } from "@/lib/blog-content";
import { caseStudies } from "@/lib/case-studies";
import { services } from "@/lib/services";
import {
  mashalContentDate,
  mashalProductContentDate,
  mashalEnglishPath,
  mashalIntentPages,
  mashalLanguageAlternates,
  mashalPashtoPath,
} from "@/lib/mashal";

/**
 * Only canonical, indexable URLs belong here. Redirect sources, the 404 page and
 * the API route are deliberately absent.
 *
 * `lastModified` is emitted only where the project records a real content date.
 * Blog articles have one (`isoDate`), so they carry it. The static pages, the
 * service pages and the case studies do not: stamping them with the build time
 * told Google that twenty pages changed on every deploy, which is a false
 * freshness signal it learns to distrust. Omitting the field is honest and
 * costs nothing — Google crawls a URL with no `lastmod` perfectly well.
 *
 * To publish a real date for a page later, add it to the entry below and pass
 * it through; do not reintroduce a build timestamp.
 */

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: Route[] = [
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/herat", priority: 0.9, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/oil-and-gas-software/features", priority: 0.8, changeFrequency: "monthly" },
];

const languageAlternates = { languages: Object.fromEntries(Object.entries(mashalLanguageAlternates).map(([language, path]) => [language, `${siteUrl}${path}`])) };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency,
      priority,
    })),
    ...services.map((service) => ({
      url: `${siteUrl}${service.path}`,
      ...(service.key === "oil-and-gas-software"
        ? { lastModified: new Date(mashalProductContentDate), alternates: languageAlternates }
        : {}),
      changeFrequency: "monthly" as const,
      priority: service.sitemapPriority,
    })),
    ...mashalIntentPages.map((page) => ({
      url: `${siteUrl}/oil-and-gas-software/${page.slug}`,
      lastModified: new Date(mashalContentDate),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${siteUrl}${mashalEnglishPath}`,
      alternates: languageAlternates,
      lastModified: new Date(mashalProductContentDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}${mashalPashtoPath}`,
      alternates: languageAlternates,
      lastModified: new Date(mashalProductContentDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/portfolio/${study.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...blogArticles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: new Date(article.isoDate),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
