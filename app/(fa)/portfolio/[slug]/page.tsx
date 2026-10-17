import MashalDetails from "@/components/mashal/MashalDetails";
import MashalFlow from "@/components/mashal/MashalFlow";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Image as ImageIcon } from "lucide-react";

import HeroWave from "@/components/HeroWave";
import DetailShowcase from "@/components/portfolio/DetailShowcase";
import MoreProjects, { type MoreProject } from "@/components/portfolio/MoreProjects";
import { BreadcrumbBar } from "@/components/portfolio/PortfolioIntro";
import styles from "@/components/portfolio/Detail.module.css";
import portfolioData from "@/lib/portfolio-data.json";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";
import { serviceByKey } from "@/lib/services";
import { companyInfo, siteUrl } from "@/lib/site-content";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return buildMetadata({
      title: "نمونه کار یافت نشد",
      description: "این نمونه کار وجود ندارد.",
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    fullTitle:
      study.seoTitle ?? `${study.title} | نمونه کار ${companyInfo.brandName}`,
    title: study.title,
    description: study.seoDescription ?? study.summary,
    path: `/portfolio/${study.slug}`,
    image: study.desktopImage,
    imageAlt: study.desktopImageAlt,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const breadcrumbs = [
    { name: "صفحه اصلی", path: "/" },
    { name: "نمونه کارها", path: "/portfolio" },
    { name: study.title, path: `/portfolio/${study.slug}` },
  ];

  const relatedServices = study.services.map((key) => serviceByKey[key]);
  const cardColor =
    portfolioData.find((item) => item.caseStudySlug === study.slug)?.cardColor ?? "#1d4f91";
  const portrait = study.imageOrientation === "portrait";
  const shots = study.screenshots ?? [];
  const moreProjects: MoreProject[] = portfolioData
    .filter((item) => item.caseStudySlug !== study.slug)
    .map((item) => ({
      href: item.caseStudySlug ? `/portfolio/${item.caseStudySlug}` : item.link.startsWith("http") ? "/portfolio" : item.link,
      title: item.title,
      category: item.category,
      image: item.kind === "website" ? item.mobileImg ?? item.img : item.img,
      color: item.cardColor,
      website: item.kind === "website",
    }));
  const isMashalCaseStudy = study.slug === "oil-and-gas-management-system";

  /**
   * `CreativeWork` describes the delivered system itself. No `award`, `review`
   * or client name is published, because none of that is recorded.
   */
  const creativeWorkSchema = {
    "@type": "CreativeWork",
    "@id": `${siteUrl}/portfolio/${study.slug}#project`,
    name: study.title,
    description: study.summary,
    creator: { "@id": `${siteUrl}/#organization` },
    inLanguage: "fa-AF",
    // `image` is omitted rather than guessed when the project has no publishable
    // screenshot; a schema pointing at another system's image would be false.
    ...(study.desktopImage ? { image: `${siteUrl}${study.desktopImage}` } : {}),
    about: isMashalCaseStudy
      ? { "@id": `${siteUrl}/oil-and-gas-software#software`, "@type": "SoftwareApplication", name: "Mashal" }
      : study.industry,
    locationCreated: { "@type": "Place", name: study.location },
    keywords: study.capabilities,
    // Ties the delivered system to the service pages it is evidence for, using
    // the same `@id` those pages publish. This is the machine-readable half of
    // the "related services" links rendered further down the page.
    isRelatedTo: relatedServices.map((service) => ({
      "@type": "Service",
      "@id": `${siteUrl}${service.path}#service`,
      name: service.navLabel,
      url: `${siteUrl}${service.path}`,
    })),
  };

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/portfolio/${study.slug}`,
            name:
              study.seoTitle ??
              `${study.title} | نمونه کار ${companyInfo.brandName}`,
            description: study.seoDescription ?? study.summary,
          }),
          breadcrumbSchema(breadcrumbs),
          creativeWorkSchema,
        )}
      />

      <article className={styles.page} style={{ "--c": cardColor } as React.CSSProperties}>
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="detail-side-tab" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#dddce5" />
            </linearGradient>
          </defs>
        </svg>
        <BreadcrumbBar items={breadcrumbs} />

        <div className={`${styles.container} ${styles.introBlock}`}>
          <header className={styles.intro}>
            <div className={styles.introLogo}>
              <Image src="/images/brand/novatech-wordmark-navy.webp" alt={companyInfo.brandName} width={640} height={241} sizes="190px" />
            </div>
            <h1 className={styles.introTitle}>{study.pageHeading ?? study.title}</h1>
            <div className={styles.introEditor}>
              <p className={styles.introLead}>{study.summary}</p>
              <dl className={styles.introMeta}>
                <div>
                  <dt>حوزه کاری:</dt>
                  <dd>{study.industry}</dd>
                </div>
                <div>
                  <dt>لوکیشن مشتری:</dt>
                  <dd>{study.location}</dd>
                </div>
              </dl>
              {isMashalCaseStudy && (
                <Link href="/oil-and-gas-software" className={styles.introLink}>
                  مشاهده صفحه محصول و امکانات ERP نفت و گاز مشعل
                  <ArrowLeft size={14} aria-hidden="true" />
                </Link>
              )}
              {study.websiteUrl && (
                <a href={study.websiteUrl} className={styles.introLink} target="_blank" rel="noopener noreferrer">
                  بازدید از وب‌سایت
                  <ArrowLeft size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </header>

          {study.desktopImage && (
            <DetailShowcase
              src={study.desktopImage}
              alt={study.desktopImageAlt ?? study.title}
              width={study.desktopImageWidth ?? (portrait ? 1122 : 1600)}
              height={study.desktopImageHeight ?? (portrait ? 1402 : 900)}
              portrait={portrait}
              title={study.title}
            />
          )}
        </div>

        {isMashalCaseStudy && <nav className="mashal-case-index" aria-label="بخش‌های نمونهٔ پیاده‌سازی"><strong>در این صفحه</strong><a href="#case-problem">مسئله</a><a href="#case-solution">راهکار</a><a href="#case-capabilities">قابلیت‌ها</a><Link href="/oil-and-gas-software#mashal-demo">درخواست دمو</Link></nav>}
        {isMashalCaseStudy && <div className="mashal-flow-shell"><MashalFlow /></div>}

        <div className={styles.contentz}>
          <div className={styles.container}>
            <section id="case-problem" className={styles.row}>
              {(shots[0] || study.mobileImage) && (
                <div className={styles.rowMedia}>
                  <Image
                    src={shots[0]?.src ?? study.mobileImage!}
                    alt={shots[0]?.alt ?? study.mobileImageAlt ?? study.title}
                    width={shots[0]?.width ?? 430}
                    height={shots[0]?.height ?? 932}
                    sizes="(min-width: 800px) 46vw, 92vw"
                    className={shots[0] ? undefined : styles.rowPhone}
                  />
                </div>
              )}
              <div className={styles.rowText}>
                <h2 className={styles.rowTitle}>{study.websiteUrl ? "هدف وب‌سایت" : "مشکلی که وجود داشت"}</h2>
                <MashalDetails enabled={isMashalCaseStudy} label="توضیح کامل">
                  {study.problem.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </MashalDetails>
              </div>
            </section>

            <section id="case-solution" className={`${styles.row} ${styles.rowLeft}`}>
              {shots[1] && (
                <div className={styles.rowMedia}>
                  <Image src={shots[1].src} alt={shots[1].alt} width={shots[1].width} height={shots[1].height} sizes="(min-width: 800px) 46vw, 92vw" />
                </div>
              )}
              <div className={styles.rowText}>
                <h2 className={styles.rowTitle}>راهکاری که ساخته شد</h2>
                <MashalDetails enabled={isMashalCaseStudy} label="توضیح کامل">
                  {study.solution.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </MashalDetails>
              </div>
            </section>

            <section id="case-capabilities" className={styles.row}>
              {shots[2] && (
                <div className={styles.rowMedia}>
                  <Image src={shots[2].src} alt={shots[2].alt} width={shots[2].width} height={shots[2].height} sizes="(min-width: 800px) 46vw, 92vw" />
                </div>
              )}
              <div className={styles.rowText}>
                <h2 className={styles.rowTitle}>امکاناتی که پیاده شد</h2>
                <ul className={styles.checks}>
                  {study.capabilities.map((capability) => (
                    <li key={capability}>
                      <Check aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {study.workflow && study.workflow.length > 0 && (
              <section className={`${styles.row} ${styles.rowLeft}`}>
                <div className={styles.rowText}>
                  <h2 className={styles.rowTitle}>مسیر کار در سیستم</h2>
                  <p>
                    هر مرحله به همان محموله وصل است، بنابراین زنجیره از ابتدا تا
                    گزارش نهایی قابل دنبال کردن می ماند.
                  </p>
                  <ol className={styles.steps}>
                    {study.workflow.map((stage, index) => (
                      <li key={stage.step}>
                        <span aria-hidden="true">{index + 1}</span>
                        <div>
                          <b>{stage.step}</b>
                          <p>{stage.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            )}

            {shots.length > 3 && (
              <section className={styles.gallery}>
                <h2 className={styles.rowTitle}>تصاویر واقعی محیط سیستم</h2>
                <p>
                  این تصاویر از محیط واقعی مشعل گرفته شده‌اند؛ نام اشخاص و شرکت‌ها،
                  نمبر وسایط و شماره‌های اسناد حمل پیش از انتشار پوشانده شده‌اند.
                </p>
                <div className={styles.galleryGrid}>
                  {shots.slice(3).map((screen) => (
                    <figure key={screen.src}>
                      <Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(min-width: 800px) 45vw, 92vw" loading="lazy" />
                      <figcaption>{screen.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {study.approach && (
              <section className={styles.row}>
                <div className={styles.rowText}>
                  <h2 className={styles.rowTitle}>{study.approach.heading}</h2>
                  {study.approach.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {study.approach.bullets && study.approach.bullets.length > 0 && (
                    <ul className={styles.checks}>
                      {study.approach.bullets.map((bullet) => (
                        <li key={bullet}>
                          <Check aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {study.approach.link && (
                    <Link href={study.approach.link.href} className={styles.textLink}>
                      {study.approach.link.label}
                      <ArrowLeft size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </section>
            )}

            {study.implementation && (
              <section className={`${styles.row} ${styles.rowLeft}`}>
                <div className={styles.rowText}>
                  <h2 className={styles.rowTitle}>{study.implementation.heading}</h2>
                  {study.implementation.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ul className={styles.checks}>
                    {study.implementation.bullets.map((bullet) => (
                      <li key={bullet}>
                        <Check aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Screenshot slots for a delivered system whose images are not yet
                cleared for publication. Replace this block by adding
                `desktopImage` / `mobileImage` to the entry in lib/case-studies.ts;
                the placeholders disappear on their own once `pendingScreenshots`
                is removed. Never fill these with another system's screenshot. */}
            {!study.desktopImage && study.pendingScreenshots && study.pendingScreenshots.length > 0 && (
              <section className={styles.gallery}>
                <h2 className={styles.rowTitle}>تصاویر سیستم</h2>
                <p>
                  تصاویر این سیستم به دلیل محرمانه بودن اطلاعات عملیاتی مشتری
                  هنوز منتشر نشده است. صفحه های زیر بخش های اصلی سیستم را نشان
                  می دهند و به محض دریافت اجازه انتشار، تصویر واقعی همان صفحه
                  اینجا قرار می گیرد.
                </p>
                <ul className={styles.pending}>
                  {study.pendingScreenshots.map((caption) => (
                    <li key={caption}>
                      <ImageIcon aria-hidden="true" />
                      <span>{caption}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className={styles.row}>
              <div className={styles.rowText}>
                <h2 className={styles.rowTitle}>{study.websiteUrl ? "مشاهده پروژه" : "نتیجه در کار روزمره"}</h2>
                {study.outcome.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {!study.websiteUrl && <p className={styles.note}>
                  اطلاعات مشتری، ارقام قرارداد و آمار داخلی این پروژه منتشر نمی شود.
                </p>}
              </div>
            </section>

            <section className={styles.services}>
              <h2 className={styles.rowTitle}>خدمات مرتبط</h2>
              <div className={styles.serviceGrid}>
                {relatedServices.map((service) => (
                  <Link key={service.key} href={service.path} className={styles.serviceCard}>
                    <b>{service.navLabel}</b>
                    <span>{service.teaser}</span>
                    <i>
                      مشاهده صفحه
                      <ArrowLeft size={14} aria-hidden="true" />
                    </i>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <HeroWave className={styles.waveDown} background="#050033" />
        </div>

        <section className={styles.more} aria-labelledby="more-projects">
          <div className={styles.container}>
            <div className={styles.moreHead}>
              <h2 id="more-projects">نمونه‌کارهای بیشتر</h2>
              <p>
                سامانه‌ها و وب‌سایت‌های دیگری که نواتیک طراحی و تحویل داده است؛
                برای دیدن جزئیات هر پروژه روی کارت آن بزنید.
              </p>
              <Link href="/portfolio" className={styles.btnOutlineWhite}>همه نمونه‌کارها</Link>
            </div>
            <MoreProjects items={moreProjects} />
          </div>
          <span className={styles.moreLogo} aria-hidden="true">
            <Image src="/images/brand/novatech-mark-navy.webp" alt="" width={256} height={256} sizes="40px" />
          </span>
          <HeroWave className={styles.waveUp} background="#ffffff" />
        </section>
      </article>
    </>
  );
}
