import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  Building2,
  Calculator,
  Code2,
  Database,
  Flame,
  Monitor,
  Palette,
  type LucideIcon,
} from "lucide-react";

import styles from "@/components/RelatedLinks.module.css";
import { blogArticles } from "@/lib/blog-content";
import { caseStudies } from "@/lib/case-studies";
import { relatedServicesFor, type ServiceKey } from "@/lib/services";

const serviceIcons: Record<ServiceKey, LucideIcon> = {
  "software-solutions": Code2,
  "database-solutions": Database,
  "business-systems": Building2,
  erp: Boxes,
  "accounting-software": Calculator,
  "web-design": Monitor,
  "graphic-design": Palette,
  "oil-and-gas-software": Flame,
};

export default function RelatedLinks({
  serviceKey,
  caseStudySlugs,
  heading = "مطالب و راهکارهای مرتبط",
}: {
  serviceKey: ServiceKey;
  caseStudySlugs?: string[];
  heading?: string;
}) {
  const siblings = relatedServicesFor(serviceKey);
  const reading = blogArticles
    .filter((article) => article.relatedService === serviceKey)
    .slice(0, 3);
  const proof = (caseStudySlugs ?? [])
    .map((slug) => caseStudies.find((study) => study.slug === slug))
    .filter((study): study is (typeof caseStudies)[number] => Boolean(study))
    .slice(0, 2);

  return (
    <section className={styles.section} aria-labelledby="related-links-title">
      <div className={styles.shell}>
        <div className={styles.header}>
          <div>
            <p>برای ادامه بررسی</p>
            <h2 id="related-links-title">{heading}</h2>
          </div>
        </div>

        {siblings.length > 0 && (
          <>
            <h3 className={styles.groupLabel}>راهکارهای نزدیک به این موضوع</h3>
            <div className={styles.serviceGrid}>
              {siblings.map((service) => {
                const Icon = serviceIcons[service.key];
                return (
                  <Link key={service.key} href={service.path} className={styles.serviceCard}>
                    <span className={styles.icon}><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
                    <span className={styles.cardBody}>
                      <strong>{service.navLabel}</strong>
                      <p>{service.teaser}</p>
                      <span className={styles.cardLink}>مشاهده صفحه <ArrowLeft size={14} aria-hidden="true" /></span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {proof.length > 0 && (
          <>
            <h3 className={styles.groupLabel}>نمونه‌های اجراشده</h3>
            <div className={styles.proofGrid}>
              {proof.map((study) => (
                <Link key={study.slug} href={`/portfolio/${study.slug}`} className={styles.proofCard}>
                  {study.desktopImage && (
                    <div className={study.imageOrientation === "portrait" ? `${styles.media} ${styles.mediaContain}` : styles.media}>
                      <Image
                        src={study.desktopImage}
                        alt={study.desktopImageAlt ?? study.title}
                        fill
                        sizes="(min-width: 900px) 50vw, 100vw"
                      />
                    </div>
                  )}
                  <div className={styles.proofContent}>
                    <span className={styles.meta}>{study.industry}</span>
                    <strong>{study.title}</strong>
                    <p>{study.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {reading.length > 0 && (
          <>
            <h3 className={styles.groupLabel}>خواندنی مرتبط</h3>
            <div className={styles.articleGrid}>
              {reading.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.articleCard}>
                  <div className={styles.media}>
                    <Image
                      src={article.img}
                      alt={article.imageAlt}
                      fill
                      sizes="(min-width: 900px) 33vw, 100vw"
                    />
                  </div>
                  <div className={styles.articleContent}>
                    <span className={styles.meta}>{article.category}</span>
                    <strong>{article.title}</strong>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
