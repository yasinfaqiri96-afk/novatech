import { blogArticles } from "@/lib/blog-content";
import { caseStudies } from "@/lib/case-studies";
import { mashalCanonicalPath, mashalIntentPages } from "@/lib/mashal";

/**
 * Breadcrumb labels for detail pages, keyed by path. Each label is exactly the
 * name the page publishes as the last item of its BreadcrumbList, so the
 * visible bar and the markup agree. Built on the server and handed to the
 * client bar as a prop, which keeps the article catalogue out of the bundle.
 */
export function detailBreadcrumbLabels(): Record<string, string> {
  return Object.fromEntries([
    ...blogArticles.map((article) => [`/blog/${article.slug}`, article.title]),
    ...caseStudies.map((study) => [`/portfolio/${study.slug}`, study.title]),
    ...mashalIntentPages.map((page) => [`${mashalCanonicalPath}/${page.slug}`, page.navLabel]),
  ]);
}
