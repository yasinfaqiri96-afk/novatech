import MashalFlow from "@/components/mashal/MashalFlow";
import MashalImage from "@/components/mashal/MashalImage";
import Link from "next/link";
import { ArrowLeft, Building2, Check } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import type { MashalIntentPage as MashalIntentPageData } from "@/lib/mashal";
import { mashalCanonicalPath, mashalIntentPages } from "@/lib/mashal";
import styles from "./MashalProductPage.module.css";

const relatedIntentMap: Record<string, string[]> = {
  contracts: ["loading", "customs", "profit-loss", "partner-settlement"],
  loading: ["contracts", "tanker-logistics", "customs", "tank-inventory"],
  customs: ["loading", "tanker-logistics", "accounting", "profit-loss"],
  "tanker-logistics": ["loading", "customs", "tank-inventory", "reports"],
  "tank-inventory": ["tanker-logistics", "sales", "reports", "profit-loss"],
  sales: ["tank-inventory", "accounting", "profit-loss", "reports"],
  accounting: ["sales", "partner-settlement", "reports", "security"],
  "partner-settlement": ["contracts", "accounting", "profit-loss", "reports"],
  "profit-loss": ["contracts", "sales", "accounting", "reports"],
  reports: ["profit-loss", "accounting", "tank-inventory", "security"],
  security: ["accounting", "reports", "specialized-erp-vs-accounting", "petroleum-trading"],
  "petroleum-trading": ["contracts", "loading", "tanker-logistics", "sales"],
  database: ["contracts", "tank-inventory", "accounting", "reports"],
  "specialized-erp-vs-accounting": ["petroleum-trading", "accounting", "reports", "contracts"],
};

export default function MashalIntentPage({ page }: { page: MashalIntentPageData }) {
  return (
    <article className={styles.page}>
      <header className={styles.intentHero}>
        <div className={`${styles.shell} ${styles.intentHeroGrid}`}>
          <div>
            <Breadcrumbs
              items={[
                { name: "صفحه اصلی", path: "/" },
                { name: "مشعل؛ ERP نفت و گاز", path: mashalCanonicalPath },
                { name: page.navLabel, path: `${mashalCanonicalPath}/${page.slug}` },
              ]}
            />
            <p className={styles.kicker}>{page.eyebrow}</p>
            <h1 className={styles.heading}>{page.title}</h1>
            <p className={styles.sectionIntro}>{page.intro}</p>
            <div className={styles.sectionActions}>
              <Link className={styles.primaryAction} href={`${mashalCanonicalPath}#mashal-demo`}>
                درخواست دموی مشعل
                <ArrowLeft size={16} aria-hidden="true" />
              </Link>
              <Link className={styles.lightAction} href={mashalCanonicalPath}>معرفی کامل مشعل</Link>
            </div>
          </div>
          {page.image && page.imageWidth && page.imageHeight && page.imageAlt ? (
            <figure className={styles.shot}>
              <MashalImage src={page.image} alt={page.imageAlt} width={page.imageWidth} height={page.imageHeight} sizes="(min-width: 1240px) 609px, (min-width: 901px) 50vw, 94vw" priority caption={page.slug === "profit-loss" ? "کارت «سود و زیان» در پایین سمت راست تصویر قرار دارد." : undefined} />
              <figcaption>تصویر واقعی از محیط مشعل؛ معلومات هویتی و حساس پیش از نشر حذف شده است.</figcaption>
            </figure>
          ) : (
            <aside className={styles.evidencePanel} aria-label="قابلیت‌های تأییدشده در این بخش">
              <p>در خود سیستم تأیید شده</p>
              <ul>
                {(page.evidence ?? page.features).map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}
              </ul>
            </aside>
          )}
        </div>
      </header>

      <nav className={styles.pageIndex} aria-label="فهرست بخش‌های این صفحه">
        <strong>در این صفحه</strong>
        <a href="#intent-capabilities-title">قابلیت‌ها</a><a href="#intent-audience-title">موارد استفاده</a>
        {page.comparison && <a href="#comparison-title">مقایسه</a>}
        <a href="#intent-faq-title">سوال‌ها</a><a href="#related-mashal-title">بخش‌های مرتبط</a>
      </nav>

      <div className={styles.shell}><MashalFlow /></div>
      {/* Capabilities are shown as cards rather than folded into a
          disclosure: the same text, but scannable at a glance. */}
      <section className={styles.section} aria-labelledby="intent-capabilities-title">
        <div className={styles.shell}>
          <div className={styles.topicHead}>
            <p className={styles.kicker}>دامنهٔ کاری</p>
            <h2 id="intent-capabilities-title" className={styles.heading}>این بخش چه چیزی را پوشش می‌دهد؟</h2>
            <p className={styles.sectionIntro}>{page.description}</p>
          </div>
          <ol className={styles.topicFeatures}>
            {page.features.map((feature, index) => (
              <li key={feature}>
                <span className={styles.topicIndex} aria-hidden="true">{(index + 1).toLocaleString("fa-AF")}</span>
                <span>{feature}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.topicBand} aria-labelledby="intent-audience-title">
        <div className={styles.shell}>
          <div className={styles.topicHead}>
            <p className={styles.kicker}>موارد استفاده</p>
            <h2 id="intent-audience-title" className={styles.heading}>برای چه شرکت‌هایی مناسب است؟</h2>
          </div>
          <ul className={styles.topicAudience}>
            {page.audience.map((audience) => (
              <li key={audience}><Building2 size={20} aria-hidden="true" /><span>{audience}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {page.comparison ? (
        <section className={styles.section} aria-labelledby="comparison-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeader}>
              <p className={styles.kicker}>مقایسه بر پایهٔ جریان کار</p>
              <h2 id="comparison-title" className={styles.heading}>تفاوت در عمل کجاست؟</h2>
              <p className={styles.sectionIntro}>این جدول ادعای برتری مطلق ندارد؛ نشان می‌دهد هر دسته ابزار معمولاً چه سطحی از زمینهٔ عملیاتی را نگهداری می‌کند.</p>
            </div>
            <div className={styles.tableWrap} tabIndex={0} aria-label="جدول مقایسه ERP تخصصی و حسابداری عمومی">
              <table className={styles.comparisonTable}>
                <thead><tr><th scope="col">حوزه</th><th scope="col">ERP تخصصی نفت و گاز</th><th scope="col">حسابداری عمومی</th></tr></thead>
                <tbody>
                  {page.comparison.map((row) => (
                    <tr key={row.area}><th scope="row">{row.area}</th><td>{row.specialized}</td><td>{row.general}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.section} aria-labelledby="intent-faq-title">
        <div className={styles.shell}>
          <div className={styles.topicHead}>
            <p className={styles.kicker}>پرسش‌های مرتبط</p>
            <h2 id="intent-faq-title" className={styles.heading}>پاسخ‌های کوتاه و روشن</h2>
          </div>
          <div className={`${styles.faqList} ${styles.topicFaq}`}>
            {page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className={styles.topicBand} aria-labelledby="related-mashal-title">
        <div className={styles.shell}>
          <div className={styles.topicHead}>
            <p className={styles.kicker}>موضوعات مرتبط</p>
            <h2 id="related-mashal-title" className={styles.heading}>ادامهٔ بررسی مشعل</h2>
          </div>
          <div className={styles.topicRelated}>
            {mashalIntentPages.filter((item) => (relatedIntentMap[page.slug] ?? []).includes(item.slug)).map((item) => (
              <Link key={item.slug} href={`${mashalCanonicalPath}/${item.slug}`} className={styles.topicLinkCard}>
                <h3>{item.navLabel}</h3>
                <p>{item.intro}</p>
                <span className={styles.cardLink}>مشاهده این بخش <ArrowLeft size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
