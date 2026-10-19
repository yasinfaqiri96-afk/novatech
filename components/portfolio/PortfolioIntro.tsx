import LazyVideo from "@/components/LazyVideo";
import styles from "./Portfolio.module.css";

export type IntroStat = { value: string; label: string };

export default function PortfolioIntro({ stats }: { stats: IntroStat[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.entitle} lang="en" dir="ltr">Success Stories</span>
          <p className={styles.typography} aria-hidden="true">
            <span>پروژه‌هایی که</span> <span>با افتخار ساختیم</span>
          </p>
          <div className={styles.editor}>
            <h1>ویترین نمونه‌کارهای نواتیک</h1>
            <p className={styles.desktopSummary}>
              در نواتیک هر پروژه از یک نیاز واقعی شروع می‌شود: انباری که موجودی‌اش گم می‌شود، شرکتی که حساب
              شرکایش در چند دفتر پخش است، یا کسب‌وکاری که مشتری آنلاین پیدا نمی‌کند. پیش از اجرا، جریان کار و
              نیاز روزانه هر مجموعه را بررسی می‌کنیم تا راه‌حل با واقعیت کارش هماهنگ باشد. این‌جا سامانه‌ها و
              وب‌سایت‌هایی را می‌بینید که برای همین نیازها طراحی، پیاده‌سازی و تحویل داده‌ایم؛ از ERP نفت و
              گاز مشعل تا نرم‌افزارهای فروش، گدام، لجستیک و حضور و غیاب. برای هر سامانه صفحه شرح کامل داریم تا
              ببینید مسئله چه بود و راه‌حل چگونه ساخته شد.
            </p>
          </div>
          <ul className={styles.features}>
            {stats.map(stat => (
              <li key={stat.label} className={styles.feature}>
                <b dir="ltr">{stat.value}</b>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.introMedia}>
          <div className={styles.introVideo}>
            <LazyVideo src="/media/novatech-portfolio-showreel.mp4" start="idle" poster="/media/novatech-portfolio-showreel-poster.webp" aria-label="نمایش سامانه‌ها و وب‌سایت‌های نواتیک روی مانیتور" />
          </div>
        </div>
      </div>
    </div>
  );
}
