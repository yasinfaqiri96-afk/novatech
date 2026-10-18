"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteBreadcrumbBar.module.css";

type SiteLanguage = "fa-AF" | "en-AF" | "ps-AF";

const homeLabels: Record<SiteLanguage, string> = {
  "fa-AF": "صفحه اصلی",
  "en-AF": "Home",
  "ps-AF": "کورپاڼه",
};

const routeLabels: Record<SiteLanguage, Record<string, string>> = {
  "fa-AF": {
    "/portfolio": "نمونه‌کارها",
    "/about": "درباره ما",
    "/contact": "تماس با ما",
    "/blog": "مقالات و راهنماها",
    "/software-solutions": "توسعه نرم‌افزار اختصاصی",
    "/database-solutions": "طراحی و توسعه دیتابس",
    "/business-systems": "سیستم‌های مدیریت کسب‌وکار",
    "/erp": "نرم‌افزار ERP",
    "/accounting-software": "نرم‌افزار حسابداری ناظر",
    "/web-design": "طراحی وب‌سایت",
    "/graphic-design": "طراحی گرافیک",
    "/oil-and-gas-software": "نرم‌افزار نفت و گاز مشعل",
    "/oil-and-gas-software/features": "امکانات مشعل",
    "/herat": "دفتر هرات",
    "/privacy": "حریم خصوصی",
  },
  "en-AF": {
    "/en/oil-and-gas-erp-afghanistan": "Oil and Gas ERP",
  },
  "ps-AF": {
    "/ps/oil-and-gas-erp-afghanistan": "د تېلو او ګاز ERP",
  },
};

function fallbackLabel(path: string, segment: string, language: SiteLanguage) {
  if (path.startsWith("/portfolio/")) {
    return language === "en-AF" ? "Portfolio details" : "جزئیات نمونه‌کار";
  }
  if (path.startsWith("/blog/")) {
    return language === "en-AF" ? "Article" : "مقاله";
  }
  return segment.replaceAll("-", " ");
}

export default function SiteBreadcrumbBar({ language }: { language: SiteLanguage }) {
  const pathname = usePathname() || "/";
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] === "en" || segments[0] === "ps" ? segments.shift() : undefined;
  let path = locale ? `/${locale}` : "";
  const crumbs = [{ href: "/", label: homeLabels[language] }];

  for (const segment of segments) {
    path += `/${segment}`;
    const label = routeLabels[language][path] ?? fallbackLabel(path, segment, language);
    crumbs.push({ href: path, label });
  }

  return (
    <div className={styles.frame}>
      <nav className={styles.bar} aria-label={language === "en-AF" ? "Breadcrumb" : "مسیر صفحه"}>
        <ol>
          {crumbs.map((crumb, index) =>
            index === crumbs.length - 1 ? (
              <li key={crumb.href} aria-current="page" className={styles.current}>{crumb.label}</li>
            ) : (
              <li key={crumb.href}>
                {index === 0 && (
                  <svg className={styles.home} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" /></svg>
                )}
                <Link href={crumb.href}>{crumb.label}</Link>
                <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" /></svg>
              </li>
            ),
          )}
        </ol>
        <span className={styles.slogan} aria-hidden="true">Novatech</span>
        <svg className={styles.tab} viewBox="0 0 107 30" aria-hidden="true" focusable="false">
          <path d="M0 0h107C95 0 90 4 86 10c-3 5-7 7-14 7h-6c-4 0-5 2-5 4 0 3-3 5-5 7l-2.5 2-2.5-2c-2-2-5-4-5-7 0-2-1-4-5-4h-6c-7 0-11-2-14-7C17 4 12 0 0 0" />
        </svg>
      </nav>
    </div>
  );
}