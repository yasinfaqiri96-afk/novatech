import MashalDetails from "@/components/mashal/MashalDetails";
import MashalFlow from "@/components/mashal/MashalFlow";
import type { Metadata } from "next";
import Image from "next/image";
import MashalImage from "@/components/mashal/MashalImage";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, PenLine } from "lucide-react";
import { notFound } from "next/navigation";

import styles from "@/components/Blog.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { BLOG_AUTHOR, blogArticles, getBlogArticleBySlug } from "@/lib/blog-content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { serviceByKey } from "@/lib/services";
import { companyInfo, siteUrl } from "@/lib/site-content";

/** ISO date to the Jalali display form the articles already use, e.g. ۱۴۰۵/۷/۲۷. */
const jalaliDate = (iso: string) =>
  new Intl.DateTimeFormat("fa-IR-u-ca-persian", { dateStyle: "short", timeZone: "Asia/Kabul" }).format(
    new Date(`${iso}T12:00:00Z`),
  );

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: "مطلب یافت نشد",
      description: "این مطلب وجود ندارد.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.metaTitle ?? article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.img,
    imageAlt: article.imageAlt,
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: "صفحه اصلی", path: "/" },
    { name: "وبلاگ", path: "/blog" },
    { name: article.title, path: `/blog/${article.slug}` },
  ];

  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `${siteUrl}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    inLanguage: "fa-AF",
    datePublished: article.isoDate,
    dateModified: article.isoModified ?? article.isoDate,
    image: `${siteUrl}${article.img}`,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: `${siteUrl}/blog/${article.slug}`,
  };

  const relatedService = serviceByKey[article.relatedService];
  const others = blogArticles.filter((item) => item.slug !== article.slug);
  const otherArticles = [
    ...others.filter((item) => item.relatedService === article.relatedService),
    ...others.filter((item) => item.relatedService !== article.relatedService),
  ].slice(0, 3);

  return (
    <article className={styles.page}>
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/blog/${article.slug}`,
            name: article.title,
            description: article.excerpt,
          }),
          breadcrumbSchema(breadcrumbs),
          articleSchema,
        )}
      />

      <header className={styles.articleHero}>
        <div className={styles.articleShell}>
          <Breadcrumbs items={breadcrumbs} />
          <div className={styles.articleTop}>
            <Link href="/blog" className={styles.backLink}>
              <ArrowRight size={15} aria-hidden="true" />
              بازگشت به وبلاگ
            </Link>

            <div className={styles.articleMeta}>
              <span className={styles.category}>{article.category}</span>
              <span className={styles.metaItem}><PenLine size={14} aria-hidden="true" />{BLOG_AUTHOR}</span>
              <time dateTime={article.isoDate}>{article.date}</time>
              {/* Shown only for a real content revision, so the visible date
                  always matches `dateModified` in the BlogPosting schema. */}
              {article.isoModified && (
                <span>
                  به‌روزرسانی:{" "}
                  <time dateTime={article.isoModified}>{jalaliDate(article.isoModified)}</time>
                </span>
              )}
              <span className={styles.metaItem}><Clock size={14} aria-hidden="true" />{article.time}</span>
            </div>

            <h1 className={styles.articleTitle}>{article.title}</h1>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>
          </div>
        </div>
      </header>

      {article.slug === "oil-and-gas-software-guide" && <div className="mashal-flow-shell"><MashalFlow /></div>}
      <div className={styles.articleBodyShell}>
        <figure className={styles.cover}>
          {article.slug === "oil-and-gas-software-guide" ? (
            <MashalImage src={article.img} alt={article.imageAlt} width={1600} height={1000} sizes="(min-width: 1240px) 1200px, 94vw" priority />
          ) : (
          <Image
            src={article.img}
            alt={article.imageAlt}
            fill
            sizes="(min-width: 1100px) 1120px, 100vw"
            priority
          />
          )}
        </figure>

        <div className={styles.prose}>
          {article.body.map((section, index) => (
            <section key={index} className={styles.proseSection}>
              {section.heading ? <h2>{section.heading}</h2> : null}

              {article.slug === "oil-and-gas-software-guide" ? <>
                {section.paragraphs?.slice(0, 1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                {section.paragraphs && section.paragraphs.length > 1 && <MashalDetails label="ادامهٔ توضیحات">{section.paragraphs.slice(1).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</MashalDetails>}
              </> : section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>{paragraph}</p>
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={17} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.link && (
                <Link href={section.link.href} className={styles.inlineLink}>
                  {section.link.label}
                  <ArrowLeft size={14} aria-hidden="true" />
                </Link>
              )}
            </section>
          ))}
        </div>

        <div className={styles.articleCta}>
          <p>
            اگر همین موضوع در کار شما هم مشکل ایجاد کرده، <strong>{companyInfo.brandName}</strong> می‌تواند جریان فعلی را بررسی کند و یک مسیر عملی پیشنهاد بدهد.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.ctaPrimary}>درخواست مشاوره</Link>
            <Link href={relatedService.path} className={styles.ctaSecondary}>{relatedService.navLabel}</Link>
          </div>
        </div>

        <section className={styles.related} aria-labelledby="related-articles-title">
          <div className={styles.relatedHead}>
            <span>برای مطالعه بعدی</span>
            <h2 id="related-articles-title">مطالب مرتبط</h2>
          </div>

          <div className={styles.relatedGrid}>
            {otherArticles.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedMedia}>
                  <Image
                    src={item.img}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 900px) 33vw, 100vw"
                  />
                </div>
                <div className={styles.relatedBody}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
