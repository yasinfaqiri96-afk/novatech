"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HOME_LABELS, ROUTE_LABELS, type BreadcrumbLanguage } from "@/lib/breadcrumbs";
import styles from "./SiteBreadcrumbBar.module.css";

/**
 * The visible breadcrumb trail under the header. Labels come from the same
 * table as the BreadcrumbList JSON-LD (`lib/breadcrumbs.ts`), and detail pages
 * use the titles passed in `detailLabels`, so the bar never shows a raw slug.
 * A path segment with no label of its own (`/en`, `/ps`) is not a page and is
 * skipped rather than printed.
 */
export default function SiteBreadcrumbBar({
  language,
  detailLabels,
}: {
  language: BreadcrumbLanguage;
  detailLabels: Record<string, string>;
}) {
  const pathname = usePathname() || "/";
  if (pathname === "/") return null;

  const crumbs = [{ href: "/", label: HOME_LABELS[language] }];
  let path = "";
  for (const segment of pathname.split("/").filter(Boolean)) {
    path += `/${segment}`;
    const label = ROUTE_LABELS[path] ?? detailLabels[path];
    if (label) crumbs.push({ href: path, label });
  }

  return (
    <div className={styles.frame}>
      <nav className={styles.bar} aria-label={language === "en-AF" ? "Breadcrumb" : language === "ps-AF" ? "د پاڼې لار" : "مسیر صفحه"}>
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
