/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import HomePortfolioShowcase from "@/components/HomePortfolioShowcase";
import WebDesignHero from "@/components/web-design/WebDesignHero";
import type { FaqItem } from "@/components/ServiceFaq";
import styles from "./CorporateDesign.module.css";

const asset = (name: string) => `/images/web-design-reference/${name}`;

function SectionWave({ from, to, accent = "#a7eada" }: { from: string; to: string; accent?: string }) {
  return <svg className={styles.wave} aria-hidden="true" viewBox="0 0 1440 180" preserveAspectRatio="none" style={{ background: from }}>
    <path fill={accent} opacity=".26" d="M0 48C200 156 395 154 641 87S1100-3 1440 68V180H0Z" />
    <path fill={accent} opacity=".48" d="M0 73C230 178 414 160 667 104S1130 14 1440 86V180H0Z" />
    <path fill={to} d="M0 97C240 185 447 174 700 121S1160 39 1440 108V180H0Z" />
  </svg>;
}
const features = [
  { icon: "◈", title: "کدنویسی هدفمند، ساختاری امن و قابل توسعه", text: "هر کسب‌وکار مسیر خودش را دارد. ساختار سایت، پنل مدیریت و امکانات مورد نیاز شما را پیش از اجرا بررسی می‌کنیم؛ با کد قابل نگهداری، دسترسی‌های مشخص و زیرساختی که همراه کسب‌وکار شما رشد می‌کند." },
  { icon: "⌘", title: "تجربه‌ای روان در موبایل و دسکتاپ", text: "از اولین نگاه تا ثبت درخواست، مسیر کاربر باید روشن باشد. صفحات را با توجه به خوانایی متن، سرعت نمایش، دسترسی به خدمات و اندازه‌های مختلف صفحه طراحی می‌کنیم." },
  { icon: "▱", title: "اتصال سایت به جریان واقعی کسب‌وکار", text: "در صورت نیاز، اتصال به سیستم حسابداری، انبار و ابزارهای داخلی از طریق API بررسی می‌شود. هدف، کاهش ورود تکراری اطلاعات و یکپارچگی فرآیندهای روزانه شماست." },
];
const solutions = [
  { image: "brand", icon: "brand-icon", title: "هویت برند، حضوری ماندگار در فضای دیجیتال", en: "Online Branding", text: "رنگ، تایپوگرافی، تصاویر و لحن محتوای سایت را در یک زبان بصری منسجم کنار هم می‌چینیم تا مخاطب شما را به‌سادگی بشناسد." },
  { image: "notification", icon: "notification-icon", title: "اطلاع‌رسانی و ارتباط مؤثر با مشتری", en: "Active Notification", text: "فرم‌های درخواست، پیام‌های وضعیت و راه‌های ارتباطی را متناسب با نیاز پروژه طراحی می‌کنیم تا هیچ درخواست مهمی در مسیر ارتباط گم نشود." },
  { image: "language", icon: "language-icon", title: "سایت چندزبانه، ارتباطی فراتر از مرزها", en: "Multilingual Website", text: "برای مخاطبان دری، پشتو یا انگلیسی، ساختار زبان‌ها و جهت نمایش صفحات را از ابتدا برنامه‌ریزی می‌کنیم. دامنه هر زبان در نیازسنجی مشخص می‌شود." },
  { image: "performance", icon: "performance-icon", title: "سرعت بهتر، تجربه کاربری آرام‌تر", en: "Speed & Search Optimization", text: "تصاویر بهینه، ساختار درست محتوا و بررسی عملکرد صفحات کمک می‌کنند سایت روی دستگاه‌های مختلف سریع‌تر و روشن‌تر در دسترس باشد." },
];

export default function CorporateDesign({ faq }: { faq: FaqItem[] }) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  function showSolution(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }

  return (
    <div className={styles.page}>
      <WebDesignHero />
      <HomePortfolioShowcase eyebrow="نتیجه‌ی یک همکاری خوب" title="با نواتیک،" accent="یک قدم جلوتر" description="نگاهی به تجربه‌هایی که برای کسب‌وکارهای واقعی ساخته‌ایم." kind="website" />
      <section className={styles.values} aria-label="رویکرد طراحی نواتیک"><p>کسب‌وکار شما، نقطه شروع طراحی ماست</p><div><span>هویت برند</span><span>تجربه کاربری</span><span>توسعه اختصاصی</span><span>پشتیبانی و آموزش</span><span>زیرساخت یکپارچه</span></div></section>
      <SectionWave from="#fff" to="#16171c" accent="#c6c5d1" />
      <section className={styles.features}>
        <div className={styles.sectionTitle}><h2>تفاوت در جزئیاتی است که برای شما می‌سازیم</h2><p>از طراحی ظاهر تا کیفیت اجرا، هر تصمیم باید به کار مشتری و کسب‌وکار شما بیاید.</p></div>
        <div className={styles.featureTrack}>{features.map((feature, index) => <button key={feature.title} aria-expanded={active === index} className={`${styles.feature} ${active === index ? styles.featureActive : ""}`} onClick={() => setActive(index)}><span className={styles.featureIcon} aria-hidden="true">{feature.icon}</span><h3>{feature.title}</h3><p>{feature.text}</p></button>)}</div>
        <div className={styles.dots}>{features.map((f, i) => <button key={f.title} aria-label={`نمایش ویژگی ${i + 1}`} aria-pressed={active === i} onClick={() => setActive(i)} />)}</div>
      </section>
      <SectionWave from="#16171c" to="#f3fbf8" accent="#8c8b99" />
      <section className={styles.solutions}>
        <div className={styles.sectionTitle}><p className={styles.script}>راهکارهای جامع <span>نواتیک</span></p><h2>راهکارهایی کاربردی برای موفقیت کسب‌وکار شما</h2><p>جزئیات درست، یک وب‌سایت زیبا را به ابزاری مؤثر تبدیل می‌کنند.<br />راهکار مناسب شما را بر اساس مخاطب، هدف و فرآیند کاری انتخاب می‌کنیم.</p></div>
        <div className={styles.solutionGrid}>{solutions.map((solution, index) => <button className={styles.solution} key={solution.image} onClick={() => showSolution(index)} aria-haspopup="dialog"><img src={asset(`${solution.icon}.svg`)} alt="" width="58" height="58" loading="lazy" /><h3>{solution.title}</h3><span lang="en" dir="ltr">{solution.en}</span><b aria-hidden="true">+</b></button>)}</div>
      </section>

      <section className={styles.redesign}>
        <div><p className={styles.calligraphy}>بازطراحی <span>هوشمند،</span> ارتباطی ماندگار</p><h2>یک شروع تازه، با حفظ ارزش‌های سایت شما</h2><p>اگر سایت فعلی شما دیگر نماینده خوبی برای کسب‌وکارتان نیست، بازطراحی می‌تواند تجربه‌ای تازه بسازد. پیش از هر تغییر، محتوای موجود، مسیر صفحات و نیازهای کاربران را بررسی می‌کنیم.</p><ul><li><b>انتقال برنامه‌ریزی‌شده اطلاعات:</b> محتوا و داده‌های ارزشمند پس از تهیه نسخه پشتیبان به ساختار جدید منتقل می‌شوند.</li><li><b>بررسی نشانی صفحات:</b> برای تغییر آدرس‌ها و هدایت کاربران به صفحات مرتبط، نقشه انتقال تهیه می‌شود.</li><li><b>بهبود تجربه استفاده:</b> ساختار منوها، خوانایی محتوا، فرم‌ها و نمایش موبایل بازبینی می‌شوند.</li><li><b>اتصال به سیستم‌های داخلی:</b> امکان ارتباط سایت با حسابداری، انبار و سایر ابزارها در نیازسنجی بررسی می‌شود.</li></ul><p>برای بررسی سایت فعلی و تعیین دامنه تغییرات، <a href="#order">درخواست مشاوره ثبت کنید.</a></p></div>
        <img src={asset("redesign.webp")} alt="نمایش طراحی تازه فروشگاه اینترنتی روی مانیتور و صفحات وب" width="1674" height="1179" loading="lazy" />
      </section>

      <section className={styles.faq}>
        <div className={styles.faqContent}><h2>پرسش‌های پرتکرار</h2><p>پاسخ‌هایی روشن برای تصمیم‌گیری و شروع همکاری. اگر پرسش دیگری دارید، با ما در ارتباط باشید.</p>{faq.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">↓</span></summary><p>{item.answer}</p></details>)}</div>
        <aside id="order" className={styles.consultation}><img src="/images/portfolio/novatech-contact-operator.jpg" alt="مشاوره و ارتباط با تیم نواتیک" width="400" height="400" loading="lazy" /><h2>از ایده شما شروع کنیم</h2><p>شماره خود را بگذارید تا درباره پروژه گفت‌وگو کنیم.</p><LeadForm source="web-design-hero" id="web-design-order-form1" className={styles.form}><label htmlFor="web-design-name">نام و نام خانوادگی</label><input id="web-design-name" name="name" autoComplete="name" required placeholder="نام و نام خانوادگی" /><label htmlFor="web-design-phone">شماره تماس</label><input id="web-design-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="شماره تماس" /><button type="submit" className={styles.button}>ثبت درخواست مشاوره ↗</button></LeadForm></aside>
      </section>

      <section className={styles.banners} aria-label="خدمات مرتبط"><Link href="#order"><img src={asset("ecommerce.webp")} alt="طراحی فروشگاه اینترنتی؛ ویترین آنلاین کسب‌وکار شما" width="1650" height="750" loading="lazy" /><span>طراحی فروشگاه اینترنتی <b>↗</b></span></Link><Link href="#order"><img src={asset("seo.webp")} alt="استراتژی سئو و رشد حضور کسب‌وکار در جست‌وجو" width="1650" height="750" loading="lazy" /><span>سئو و بهینه‌سازی سایت <b>↗</b></span></Link></section>

      <dialog aria-labelledby="solution-title" ref={dialog} className={styles.dialog} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}><button className={styles.close} onClick={() => dialog.current?.close()} aria-label="بستن جزئیات">×</button>{selected !== null && <><img src={asset(`${solutions[selected].image}.png`)} alt={solutions[selected].title} width="800" height="400" /><h2 id="solution-title">{solutions[selected].title}</h2><p>{solutions[selected].text}</p><a href="#order" className={styles.button} onClick={() => dialog.current?.close()}>گفت‌وگو درباره این راهکار ↗</a></>}</dialog>
    </div>
  );
}
