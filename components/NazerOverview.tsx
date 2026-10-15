import Link from "next/link";
import styles from "./NazerOverview.module.css";

const review = [
  ["حسابات", "ساختار حساب‌ها و مانده‌ها را با کار روزانه شرکت‌تان مقایسه کنید."],
  ["فروش", "جریان ثبت فروش و ارتباط آن با حساب مشتری را در دمو بررسی کنید."],
  ["دریافت و پرداخت", "روش پیگیری پول نقد، بانک و تسویه حساب را ببینید."],
  ["مصارف", "ثبت و دسته‌بندی مصارف مورد نیاز کارتان را بررسی کنید."],
  ["راپورهای مالی", "راپور مورد نیاز مدیر و حسابدار را در نسخه پیشنهادی ببینید."],
  ["نیازهای اختصاصی", "کاربرها، استقرار و اتصال به سیستم‌های دیگر را پیش از انتخاب مشخص کنید."],
];

/** Each point restates an answer already given in the page FAQ. */
const fit = [
  ["افغانی و دالر", "معامله به ارز اصلی ثبت می‌شود، نرخ روز نگه داشته می‌شود و راپور به هر دو ارز گرفته می‌شود."],
  ["انتقال از اکسل", "فهرست حساب‌ها، مانده اول دوره، مشتریان و تامین کنندگان پاکسازی و منتقل و با داده قبلی تطبیق می‌شوند."],
  ["سرور محلی یا آنلاین", "جایی که اینترنت پایدار نیست، نصب روی سرور دفتر ممکن است و دسترسی بیرونی هم می‌تواند اضافه شود."],
  ["آموزش و پشتیبانی", "آموزش کاربران بخشی از تحویل است و شرکت‌های هرات برای پشتیبانی می‌توانند حضوری مراجعه کنند."],
];

export default function NazerOverview() {
  return <div className={styles.root}>
    <nav className={styles.nav} aria-label="راهنمای صفحه ناظر">
      <a href="#nazer-review">بررسی امکانات در دمو</a><a href="#nazer-demo-preview">دیدن نرم افزار</a><a href="#order">درخواست دمو</a><a href="#accounting-solutions">راهکارهای اختصاصی</a>
    </nav>
    <section className={styles.section} aria-labelledby="nazer-problems">
      <header className={styles.head}><p>از نیاز واقعی شروع کنید</p><h2 id="nazer-problems">وقتی حسابات در چند جای مختلف است</h2><p>ثبت دوباره معلومات، پیگیری دشوار طلب و بدهی، و راپورهای پراکنده وقت تیم مالی را می‌گیرد. در انتخاب نرم افزار، جریان واقعی کارتان را معیار قرار دهید.</p></header>
      <div className={styles.cards}>{[["حسابدار", "ثبت روزانه و تطبیق حسابات"],["مدیر", "دید روشن از دریافت، پرداخت و مصارف"],["صاحب تجارت", "بررسی وضعیت مالی پیش از تصمیم"]].map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section className={`${styles.section} ${styles.band}`} aria-labelledby="nazer-fit-title">
      <header className={styles.head}><p>ساخته شده برای کار در افغانستان</p><h2 id="nazer-fit-title">حسابداری که با شرایط واقعی کسب و کار شما جور است</h2></header>
      <div className={`${styles.cards} ${styles.four}`}>{fit.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section id="nazer-review" className={styles.section} aria-labelledby="nazer-review-title">
      <header className={styles.head}><p>انتخاب آگاهانه</p><h2 id="nazer-review-title">چه چیز را در دموی ناظر بررسی کنیم؟</h2><p>امکانات نسخه پیشنهادی را در نرم افزار ببینید؛ دامنه نسخه و هر کار اختصاصی پیش از سفارش مشخص شود.</p></header>
      <div className={styles.cards}>{review.map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
    <section id="nazer-demo-preview" className={styles.section} aria-labelledby="nazer-preview-title">
      <header className={styles.head}><p>نرم افزار آماده نواتیک</p><h2 id="nazer-preview-title">محیط واقعی ناظر را در دمو ببینید</h2><p>نوع تجارت و نیازهای مالی‌تان را بگویید تا نسخه مناسب را با تیم نواتیک بررسی کنید. برای فروشگاه، شرکت خدماتی یا تجارت عمده، نیازهای ثبت و راپور یکسان نیست.</p></header>
      <div className={styles.actions}><a href="#order">درخواست دموی ناظر</a><Link href="/contact">گفت‌وگو با نواتیک</Link></div>
    </section>
    <section className={styles.section} aria-labelledby="nazer-start-title">
      <header className={styles.head}><h2 id="nazer-start-title">سه قدم تا انتخاب نسخه مناسب</h2></header>
      <ol className={styles.steps}><li><h3>نیازتان را مشخص کنید</h3><p>نوع تجارت، کارهای مالی و راپورهای مورد نیاز را توضیح دهید.</p></li><li><h3>نسخه را در دمو ببینید</h3><p>جریان کارتان را با محیط نرم افزار مقایسه کنید.</p></li><li><h3>دامنه کار را روشن کنید</h3><p>کاربرها، استقرار، آموزش و پشتیبانی را پیش از سفارش با شرکت توافق کنید.</p></li></ol>
    </section>
  </div>;
}
