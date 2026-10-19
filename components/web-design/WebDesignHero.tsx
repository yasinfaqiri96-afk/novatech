/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import LazyVideo from "@/components/LazyVideo";
import { companyInfo } from "@/lib/site-content";
import styles from "./CorporateDesign.module.css";

export default function WebDesignHero({ homepage = false }: { homepage?: boolean }) {
  const Heading = homepage ? "h2" : "h1";
  const orderHref = "#order";

  return (
    <section className={styles.hero} aria-labelledby={homepage ? "home-about-brand-title" : "web-design-title"}>
      <div className={styles.heroCopy}>
        <p className={styles.english} lang="en" dir="ltr">{homepage ? "About Novatech" : "Corporate Website Design"}</p>
        <img className={styles.heroTitleArt} src="/images/web-design-reference/hero-title.svg" alt="اعتبار برند شما در فضای دیجیتال" width="496" height="105" />
        <Heading id={homepage ? "home-about-brand-title" : "web-design-title"}>{homepage ? `با ${companyInfo.brandName} آشنا شوید` : "طراحی سایت شرکتی"}</Heading>
        {homepage ? (
          <>
            <p>{companyInfo.brandName}، شرکت نرم‌افزاری و تکنالوژی در {companyInfo.addressCity}، افغانستان است. برای شرکت‌ها و سازمان‌ها، نرم‌افزار اختصاصی، سیستم مدیریت کسب‌وکار، دیتابیس، وب‌سایت و طراحی گرافیک ارائه می‌کنیم.</p>
            <p>از شناخت نیاز و تحلیل فرایندهای کاری تا طراحی، توسعه و پشتیبانی، کنار شما هستیم؛ تا اطلاعات منظم‌تر، کارها ساده‌تر و مسیر رشد کسب‌وکار روشن‌تر شود.</p>
            <p>برای آشنایی بیشتر، <Link href="/about">داستان نواتیک را بخوانید.</Link></p>
            <div className={styles.promises}><span><b>شناخت دقیق</b>تحلیل نیاز کسب‌وکار</span><span><b>همراهی پیوسته</b>توسعه و پشتیبانی</span></div>
            <div className={styles.heroActions}><Link href="/about" className={styles.button}>درباره نواتیک <span>↗</span></Link><Link href="/contact" className={styles.phone}>گفت‌وگو با ما</Link></div>
          </>
        ) : (
          <>
        <p>طراحی سایت در نواتیک، آغاز یک ارتباط حرفه‌ای با مشتریان شماست. هویت کسب‌وکار، خدمات و توانایی‌های شما را در ساختاری روشن و زیبا معرفی می‌کنیم؛ سایتی که در موبایل و دسکتاپ روان کار کند و پیدا کردن اطلاعات و برقراری ارتباط را برای مخاطب ساده کند.</p>
        <p>از معرفی یک شرکت تا فروشگاه آنلاین و اتصال به سیستم‌های داخلی، مسیر طراحی با شناخت نیاز شما شروع می‌شود. ظاهر اختصاصی، مدیریت آسان محتوا و زیرساخت قابل توسعه، کنار هم قرار می‌گیرند تا سایت بخشی کاربردی از کسب‌وکار شما باشد.</p>
        <p>برای انتخاب مسیر مناسب، <Link href={orderHref}>با تیم نواتیک گفت‌وگو کنید.</Link></p>
        <div className={styles.promises}><span><b>اختصاصی</b>متناسب با برند شما</span><span><b>واکنش‌گرا</b>برای هر اندازه نمایشگر</span></div>
        <div className={styles.heroActions}><Link href={orderHref} className={styles.button}>درخواست مشاوره <span>↗</span></Link><a href={`tel:${companyInfo.primaryPhoneHref}`} className={styles.phone} dir="ltr">{companyInfo.primaryPhoneLabel}</a></div>
          </>
        )}
      </div>
      <div className={styles.heroArt}>
        {/* Above the fold on /web-design, far below it on the home page. */}
        <LazyVideo
          src="/media/novatech-portfolio-showreel.mp4"
          start={homepage ? "visible" : "idle"}
          poster="/media/novatech-portfolio-showreel-poster.webp"
          aria-label="نمایش نمونه‌کارهای نواتیک در مانیتور"
        />
      </div>
    </section>
  );
}