/**
 * One label per fixed route, shared by the visible breadcrumb bar under the
 * header and the BreadcrumbList JSON-LD (`breadcrumbSchema` in lib/seo.ts), so
 * what a visitor reads and what a crawler is told can never drift apart.
 *
 * Detail pages (articles, case studies, Mashal topic pages) are labelled with
 * their own titles; those are collected on the server by
 * `detailBreadcrumbLabels()` so the article catalogue never enters the client
 * bundle.
 *
 * This file is imported by a client component: keep it to plain strings.
 */

export type BreadcrumbLanguage = "fa-AF" | "en-AF" | "ps-AF";

export const HOME_LABELS: Record<BreadcrumbLanguage, string> = {
  "fa-AF": "صفحه اصلی",
  "en-AF": "Home",
  "ps-AF": "کور",
};

export const ROUTE_LABELS: Readonly<Record<string, string>> = {
  "/about": "درباره ما",
  "/contact": "تماس با ما",
  "/privacy": "پالیسی محرمیت",
  "/blog": "مقالات و راهنماها",
  "/portfolio": "نمونه‌کارها",
  "/herat": "نواتیک در هرات",
  "/software-solutions": "توسعه نرم‌افزار اختصاصی",
  "/database-solutions": "طراحی و توسعه دیتابس",
  "/business-systems": "سیستم‌های مدیریت کسب‌وکار",
  "/erp": "نرم‌افزار ERP",
  "/accounting-software": "ناظر؛ نرم‌افزار حسابداری",
  "/web-design": "طراحی سایت",
  "/graphic-design": "طراحی گرافیک",
  "/oil-and-gas-software": "مشعل؛ نرم‌افزار نفت و گاز",
  "/oil-and-gas-software/features": "امکانات مشعل",
  "/en/oil-and-gas-erp-afghanistan": "Mashal Oil & Gas ERP",
  "/ps/oil-and-gas-erp-afghanistan": "مشعل؛ د تېلو او ګازو ERP",
};
