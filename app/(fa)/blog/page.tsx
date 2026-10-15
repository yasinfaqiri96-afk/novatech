import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import styles from "@/components/Blog.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { blogArticles } from "@/lib/blog-content";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { companyInfo, siteUrl } from "@/lib/site-content";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "وبلاگ", path: "/blog" },
];

const description =
  "یادداشت های تیم نواتیک از پروژه های واقعی: انتخاب سیستم مالی، طراحی دیتابس، انتقال اطلاعات از اکسل و ساخت راپور مدیریتی قابل استفاده.";

export const metadata = buildMetadata({
  fullTitle: `وبلاگ ${companyInfo.brandName} | نرم افزار، دیتابس و راپور مدیریتی`,
  title: "وبلاگ",
  description,
  path: "/blog",
});

const blogListSchema = {
  "@type": "Blog",
  "@id": `${siteUrl}/blog#blog`,
  name: `وبلاگ ${companyInfo.brandName}`,
  description,
  inLanguage: "fa-AF",
  publisher: { "@id": `${siteUrl}/#organization` },
  blogPost: blogArticles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    url: `${siteUrl}/blog/${article.slug}`,
    datePublished: article.isoDate,
  })),
};

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/blog",
            name: `وبلاگ ${companyInfo.brandName}`,
            description,
          }),
          breadcrumbSchema(breadcrumbs),
          blogListSchema,
        )}
      />

      <header className={styles.hero}>
        <div className={styles.heroShell}>
          <Breadcrumbs items={breadcrumbs} />
          <div className={styles.heroCenter}>
            <span className={styles.kicker}>یادداشت‌ها و راهنماها</span>
            <h1 className={styles.heroTitle}>مطالب کاربردی از تجربه پروژه‌های واقعی</h1>
            <p className={styles.heroIntro}>
              درباره انتخاب نرم افزار، طراحی دیتابس، انتقال معلومات و ساخت راپورهایی که در کار روزمره واقعاً استفاده می‌شوند.
            </p>
          </div>
        </div>
      </header>

      <section className={styles.listSection} aria-label="فهرست مطالب">
        <div className={styles.listShell}>
          <div className={styles.listGrid}>
            {blogArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className={styles.postCard}>
                <div className={styles.postMedia}>
                  <Image
                    src={article.img}
                    alt={article.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className={styles.postBody}>
                  <span className={styles.category}>{article.category}</span>
                  <h2 className={styles.postTitle}>{article.title}</h2>
                  <p className={styles.postExcerpt}>{article.excerpt}</p>
                  <div className={styles.postMeta}>
                    <span>{article.date}</span>
                    <span className={styles.metaItem}>
                      <Clock size={14} aria-hidden="true" />
                      {article.time}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
