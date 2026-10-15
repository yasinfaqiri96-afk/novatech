import MashalDetails from "@/components/mashal/MashalDetails";
import MashalFlow from "@/components/mashal/MashalFlow";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import styles from "@/components/mashal/MashalFeatureCatalog.module.css";
import { buildMetadata } from "@/lib/metadata";
import { mashalFeatureCount, mashalFeatureGroups } from "@/lib/mashal-features";
import { mashalCanonicalPath } from "@/lib/mashal";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/seo";

const path = `${mashalCanonicalPath}/features`;
const title = `امکانات نرم افزار نفت و گاز مشعل | ${mashalFeatureCount} قابلیت تخصصی`;
const description =
  `فهرست ${mashalFeatureCount} قابلیت تأییدشده ERP مشعل برای قرارداد، بارگیری، حمل، گمرک، لابراتوار، تانک، فروش، حسابداری چندارزی، شرکا، منابع بشری، راپور و پشتیبان‌گیری.`;

export const metadata = buildMetadata({
  fullTitle: title,
  title: "امکانات نرم افزار نفت و گاز مشعل",
  description,
  path,
});

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "مشعل؛ نرم افزار نفت و گاز", path: mashalCanonicalPath },
  { name: "امکانات مشعل", path },
];

const principles = [
  {
    title: "عملیات و مالی در یک زنجیره",
    text: "بار، مصرف و پرداخت از قرارداد جدا نمی‌شوند؛ هر عدد تا منبع عملیاتی خودش قابل پیگیری است.",
  },
  {
    title: "عملیات گروهی برای حجم بالا",
    text: "رسید، حمل، انتقال، مصرف و فروش در جریان‌های پشتیبانی‌شده به شکل گروهی مدیریت می‌شوند.",
  },
  {
    title: "کنترول تخصصی صنعت نفت",
    text: "گمرک، تانک، کسری، لابراتوار، بار در راه، شریک و صراف بخشی از مدل داده خود سیستم‌اند.",
  },
  {
    title: "کنترول مدیریتی و بازیابی",
    text: "سطح دسترسی، Audit Log، قفل دوره، پشتیبان‌گیری و راپورهای مدیریتی کنار عملیات قرار دارند.",
  },
] as const;

export default function MashalFeaturesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: title, description, breadcrumb: breadcrumbs }),
          breadcrumbSchema(breadcrumbs),
        )}
      />

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.shell}>
            <div className={styles.crumbs}>
              <Breadcrumbs items={breadcrumbs} />
            </div>
            <p className={styles.kicker}>فهرست قابلیت‌های تأییدشده در نسخه فعلی</p>
            <h1 className={styles.title}>{mashalFeatureCount} قابلیت در ERP تخصصی نفت و گاز مشعل</h1>
            <p className={styles.lede}>
              این فهرست از امکانات واقعی سیستم جمع شده است؛ از قرارداد و بارگیری تا گمرک، لابراتوار،
              مخازن، فروش، مالی، شرکا، مدیریت بشری و پشتیبان‌گیری. مشعل فقط نرم افزار حسابداری نیست؛
              یک سیستم و دیتابس یکپارچه برای جریان کاری شرکت نفتی است.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primary} href={`${mashalCanonicalPath}#mashal-demo`}>
                درخواست دمو <ArrowLeft size={17} aria-hidden="true" />
              </Link>
              <Link className={styles.secondary} href={mashalCanonicalPath}>
                معرفی کامل مشعل
              </Link>
            </div>
          </div>
        </header>

        <div className={styles.shell}>
          <ul className={styles.metrics} aria-label="خلاصه امکانات مشعل">
            <li><strong>{mashalFeatureGroups.length}</strong><span>حوزه کاری تخصصی</span></li>
            <li><strong>{mashalFeatureCount}</strong><span>قابلیت تأییدشده</span></li>
            <li><strong>۱</strong><span>دیتابس یکپارچه</span></li>
          </ul>
        </div>

        <section className={styles.section} aria-labelledby="feature-catalog-title">
          <div className={styles.shell}>
            <div className={styles.head}>
              <p className={styles.kicker}>از جزئیات تا تصویر کلان</p>
              <h2 id="feature-catalog-title">امکانات به تفکیک بخش کاری</h2>
              <p>
                از فهرست دسته‌ها مستقیم به بخش موردنظر بروید. تمام قابلیت‌ها با جزئیات در همین
                صفحه قابل خواندن‌اند و برای دیدن آن‌ها نیاز به بازکردن منو ندارید.
              </p>
            </div>

            <MashalFlow />
            <div className={styles.catalogLayout}>
            <nav className={styles.categoryIndex} aria-label="دسته‌های امکانات مشعل"><strong>دسته‌های امکانات</strong>{mashalFeatureGroups.map(group => <a key={group.key} href={`#feature-${group.key}`}>{group.title}<span>{group.features.length}</span></a>)}</nav>
            <div className={styles.catalog}>
              {mashalFeatureGroups.map((group) => (
                <section key={group.key} id={`feature-${group.key}`} className={styles.group}>
                  <header>
                    <h3 className={styles.groupTitle}>{group.title}</h3>
                    <span className={styles.groupSummary}>{group.summary}</span>
                    <span className={styles.count}>{group.features.length} قابلیت</span>
                  </header>
                  <MashalDetails label={`مشاهدهٔ تمام ${group.features.length} قابلیت`}><ul className={styles.features}>
                    {group.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul></MashalDetails>
                </section>
              ))}
            </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionSoft} aria-labelledby="specialized-erp-title">
          <div className={styles.shell}>
            <div className={styles.head}>
              <p className={styles.kicker}>چرا ERP تخصصی؟</p>
              <h2 id="specialized-erp-title">تفاوت در تعداد منوها نیست؛ در اتصال داده‌هاست</h2>
              <p>
                ارزش سیستم تخصصی وقتی معلوم می‌شود که قرارداد، بار، موجودی، حساب و راپور از یک منبع
                مشترک ساخته شوند و کاربر برای یک جواب مجبور نباشد چند فایل را با هم تطبیق کند.
              </p>
            </div>
            <div className={styles.principles}>
              {principles.map((item, index) => (
                <article key={item.title} className={styles.principle}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={`${styles.shell} ${styles.ctaGrid}`}>
            <div>
              <h2>در دمو، فقط بخش‌هایی را ببینید که به کار شرکت شما مربوط است</h2>
              <p>
                قرارداد، حمل، مخازن، فروش یا مالی؛ دمو را متناسب با جریان کاری شرکت شما آماده می‌کنیم
                تا بررسی سیستم شلوغ و بی‌هدف نباشد.
              </p>
            </div>
            <Link className={styles.primary} href={`${mashalCanonicalPath}#mashal-demo`}>
              درخواست دموی مشعل <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
