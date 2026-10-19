import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Phone } from "lucide-react";

import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import ServiceFaq, { type FaqItem } from "@/components/ServiceFaq";
import styles from "@/components/ServicePageShell.module.css";
import { companyInfo } from "@/lib/site-content";
import type { ServiceKey } from "@/lib/services";

export type ContentBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  groups?: { heading: string; text: string }[];
  link?: { href: string; label: string };
};

export default function ServicePageShell({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  heroImage,
  heroImageAlt,
  highlights,
  blocks,
  serviceKey,
  caseStudySlugs,
  faq,
}: {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string[];
  heroImage?: string;
  heroImageAlt?: string;
  highlights?: string[];
  blocks: ContentBlock[];
  serviceKey: ServiceKey;
  caseStudySlugs?: string[];
  faq?: FaqItem[];
}) {
  return (
    <div className={styles.root}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <Breadcrumbs items={breadcrumbs} />

          <div className={heroImage ? styles.heroGrid : `${styles.heroGrid} ${styles.heroSolo}`}>
            <div>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h1 className={styles.title}>{title}</h1>
              <div className={styles.intro}>
                {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              <div className={styles.actions}>
                <Link href="/contact" className={styles.primaryAction}>
                  درخواست مشاوره
                  <ArrowLeft size={16} aria-hidden="true" />
                </Link>
                <a href={`tel:${companyInfo.primaryPhoneHref}`} className={styles.secondaryAction}>
                  <Phone size={16} aria-hidden="true" />
                  تماس با نواتیک
                </a>
              </div>
            </div>

            {heroImage && (
              <figure className={styles.heroVisual}>
                <Image
                  src={heroImage}
                  alt={heroImageAlt ?? ""}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  priority
                />
              </figure>
            )}
          </div>

          {highlights && highlights.length > 0 && (
            <ul className={styles.highlights}>
              {highlights.map((item) => (
                <li key={item}>
                  <span className={styles.checkMark}><Check size={15} strokeWidth={2.2} aria-hidden="true" /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className={styles.content}>
        {blocks.map((block) => (
          <section key={block.heading} className={`${styles.block} defer-render`}>
            <h2>{block.heading}</h2>

            {block.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

            {block.bullets && block.bullets.length > 0 && (
              <ul className={styles.bulletList}>
                {block.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className={styles.checkMark}><Check size={15} strokeWidth={2.2} aria-hidden="true" /></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {block.groups && block.groups.length > 0 && (
              <div className={styles.groups}>
                {block.groups.map((group) => (
                  <article key={group.heading} className={styles.groupCard}>
                    <h3>{group.heading}</h3>
                    <p>{group.text}</p>
                  </article>
                ))}
              </div>
            )}

            {block.link && (
              <Link href={block.link.href} className={styles.textLink}>
                {block.link.label}
                <ArrowLeft size={15} aria-hidden="true" />
              </Link>
            )}
          </section>
        ))}

        {faq && faq.length > 0 && <ServiceFaq items={faq} />}
      </div>

      <RelatedLinks serviceKey={serviceKey} caseStudySlugs={caseStudySlugs} />

      <section className={`${styles.closing} defer-render`}>
        <div className={styles.closingCard}>
          <div className={styles.closingCopy}>
            <span>قدم بعدی</span>
            <h2>اول جریان کارتان را ببینیم، بعد راهکار پیشنهاد کنیم</h2>
            <p>
              یک گفت‌وگوی کوتاه کافی است تا مشخص شود کدام بخش واقعاً نیاز به سیستم دارد و چه چیزی را می‌شود ساده نگه داشت.
            </p>
          </div>
          <div className={styles.closingActions}>
            <Link href="/contact" className={styles.primaryAction}>
              درخواست مشاوره
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
            <a href={`tel:${companyInfo.primaryPhoneHref}`} className={styles.secondaryAction}>
              تماس مستقیم
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
