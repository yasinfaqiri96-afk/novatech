import Link from "next/link";
import { ArrowLeft, ChartNoAxesCombined, CircleDollarSign, Cylinder, Database, Headset, Phone, Route, ServerCog, ShieldCheck } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import LeadForm from "@/components/LeadForm";
import MashalArcCarousel from "@/components/mashal/MashalArcCarousel";
import MashalDetails from "@/components/mashal/MashalDetails";
import MashalFeatureExplorer from "@/components/mashal/MashalFeatureExplorer";
import MashalImage from "@/components/mashal/MashalImage";
import styles from "@/components/mashal/MashalLanding.module.css";
import { mashalCaseStudy } from "@/lib/mashal-case-study";
import { mashalFeatureCount, mashalFeatureGroups } from "@/lib/mashal-features";
import { mashalCanonicalPath, mashalEnglishPath, mashalFaq, mashalIntentPages, mashalPashtoPath, mashalScreen } from "@/lib/mashal";
import { companyInfo } from "@/lib/site-content";

const ROOT_ID = "mashal-landing";

const questions = [
  { icon: Route, title: "بار کجاست؟", text: "وضعیت هر بار از مبدأ تا تانک و فروش روشن می‌ماند." },
  { icon: Cylinder, title: "موجودی واقعی چیست؟", text: "ورود، خروج، انتقال و کسری هر تانک از یک منبع دیده می‌شود." },
  { icon: CircleDollarSign, title: "هر لیتر چند تمام شد؟", text: "خرید، حمل، گمرک و مصارف به همان قرارداد وصل است." },
  { icon: ChartNoAxesCombined, title: "مفاد واقعی چقدر است؟", text: "نتیجهٔ هر قرارداد و محموله از دادهٔ عملیاتی ساخته می‌شود." },
];

const workflow = ["قرارداد", "بارگیری", "حمل", "تانک", "فروش", "مالی", "راپور"];
const services = [
  { icon: ServerCog, title: "استقرار مطمئن", text: "روی سرور شرکت یا زیرساخت ابری" },
  { icon: Headset, title: "پشتیبانی نزدیک", text: "تیم نواتیک در افغانستان" },
  { icon: ShieldCheck, title: "دسترسی کنترول‌شده", text: "صلاحیت جدا برای هر کاربر و بخش" },
];

function SectionHead({ kicker, title, id, intro, start = false }: { kicker: string; title: string; id: string; intro?: string; start?: boolean }) {
  return <div className={start ? styles.headStart : styles.head}><p className={styles.kicker}>{kicker}</p><h2 id={id} className={styles.h2}>{title}</h2>{intro && <p className={styles.intro}>{intro}</p>}</div>;
}

export default function MashalProductPage() {
  const dashboard = mashalScreen("dashboard");
  const accounts = mashalScreen("accounts");

  return (
    <article id={ROOT_ID} className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.heroCrumbs}><Breadcrumbs items={[{ name: "صفحه اصلی", path: "/" }, { name: "مشعل؛ نرم افزار نفت و گاز", path: mashalCanonicalPath }]} /></div>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.badge}><span aria-hidden="true" />ساخته‌شده برای تجارت نفت افغانستان</p>
              <h1 className={styles.h1}>مدیریت نفت و گاز،<br /><em>در یک مشعل</em></h1>
              <p className={styles.lede}>قرارداد، بار، تانک، فروش و حساب را به هم وصل کنید و مفاد واقعی را همان لحظه ببینید.</p>
              <div className={styles.actions}><a className={styles.btnPrimary} href="#mashal-demo">درخواست دموی مشعل<ArrowLeft size={18} aria-hidden="true" /></a><a className={styles.btnGhost} href="#mashal-explorer">دیدن محیط واقعی</a></div>
              <div className={styles.heroProof} aria-label="ویژگی‌های کلیدی"><span><b>۹۶</b> قابلیت تأییدشده</span><span><b>۱</b> دیتابیس متصل</span><span><b>۳</b> زبان</span></div>
              <nav className={styles.langs} aria-label="نسخه‌های زبانی مشعل"><Link href={mashalPashtoPath} lang="ps-AF">پښتو</Link><Link href={mashalEnglishPath} lang="en-AF" dir="ltr">English</Link></nav>
            </div>
            <figure className={styles.heroStage}>
              <div className={styles.heroOrbit} aria-hidden="true"><span /><span /><span /></div>
              <div className={styles.heroBrowser}>
                <div className={styles.browserBar} aria-hidden="true"><i /><i /><i /><span>سامانه مدیریت مشعل</span></div>
                <MashalImage src={dashboard.src} alt="داشبورد نرم افزار نفت و گاز مشعل با قراردادها، بارها، موجودی و راپور مدیریتی" width={dashboard.width} height={dashboard.height} sizes="(min-width: 1100px) 720px, 94vw" priority aspectRatio={`${dashboard.width} / ${dashboard.height}`} />
              </div>
              <figcaption className={styles.srOnly}>{dashboard.caption}</figcaption>
              <div className={`${styles.floatNote} ${styles.floatNoteTop}`}><Cylinder size={18} aria-hidden="true" /><span><b>موجودی زنده</b><small>از بار تا تانک</small></span></div>
              <div className={`${styles.floatNote} ${styles.floatNoteBottom}`}><ChartNoAxesCombined size={18} aria-hidden="true" /><span><b>مفاد واقعی</b><small>برای هر قرارداد</small></span></div>
            </figure>
          </div>
        </div>
      </header>

      <section className={`${styles.arcSection} defer-render`} aria-labelledby="mashal-arc-title"><div className={styles.shell}><SectionHead kicker="یک جریان، نه چند فایل" id="mashal-arc-title" title="مشعل از شروع معامله تا نتیجه همراه شماست" intro="هر مرحله به مرحلهٔ بعد وصل است؛ کارت‌ها را حرکت دهید و مسیر واقعی تجارت را ببینید." /></div><MashalArcCarousel /></section>

      <section id="mashal-explorer" className={`${styles.explorerSection} defer-render`} aria-labelledby="mashal-explorer-title"><div className={styles.shell}><SectionHead kicker="محیط واقعی مشعل" id="mashal-explorer-title" title="هر بخش را انتخاب کنید؛ همان صفحه را ببینید" intro="تصاویر از نرم افزار واقعی گرفته شده‌اند. برای بررسی جزئیات، تصویر را بزرگ کنید." /><MashalFeatureExplorer /></div></section>

      <section className={`${styles.productSection} defer-render`} aria-labelledby="mashal-product-title"><div className={styles.shell}><SectionHead kicker="دید مدیریتی" id="mashal-product-title" title="تصمیم‌ها، روی یک تصویر روشن" intro="داشبورد مشعل دادهٔ عملیات و مالی را کنار هم می‌گذارد تا وضعیت شرکت بدون راپورهای پراکنده دیده شود." /><div className={styles.productStage}><div className={styles.productRail} aria-hidden="true"><span>قرارداد</span><i /><span>موجودی</span><i /><span>فروش</span><i /><span>مفاد</span></div><div className={styles.productFrame}><MashalImage src={dashboard.src} alt={dashboard.alt} width={dashboard.width} height={dashboard.height} sizes="(min-width: 1240px) 1120px, 94vw" aspectRatio={`${dashboard.width} / ${dashboard.height}`} /></div><div className={styles.productBadge}><Database size={19} aria-hidden="true" /><span><b>یک منبع داده</b><small>برای عملیات و حساب</small></span></div></div></div></section>

      <section className={`${styles.questionsSection} defer-render`} aria-labelledby="mashal-questions-title"><div className={styles.shell}><SectionHead kicker="جواب در چند ثانیه" id="mashal-questions-title" title="اعدادی که باید همیشه روشن باشند" /><div className={styles.questionGrid}>{questions.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={22} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className={`${styles.workflowSection} defer-render`} aria-labelledby="mashal-workflow-title"><div className={styles.shell}><SectionHead kicker="از عملیات تا حساب" id="mashal-workflow-title" title="یک مسیر متصل برای تمام تیم" intro="هر سند فقط یک‌بار ثبت می‌شود و در مرحله‌های مرتبط قابل پیگیری می‌ماند." /><ol className={styles.flow}>{workflow.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>)}</ol></div></section>

      <section id="control-layer" className={`${styles.depthSection} defer-render`} aria-labelledby="mashal-depth-title"><div className={styles.shell}><div className={styles.depthBox}><div className={styles.depthCopy}><p className={styles.kicker}>جزئیات محفوظ، نمای اصلی خلوت</p><h2 id="mashal-depth-title" className={styles.h2}>{mashalFeatureCount} قابلیت در {mashalFeatureGroups.length} حوزهٔ تخصصی</h2><p>کنترول کیفیت، گمرک، دارایی، کارمندان و امنیت نیز بخشی از سیستم است. راهنماهای تخصصی و جزئیات کامل بدون شلوغ‌کردن صفحه در دسترس‌اند.</p><div className={styles.actions}><Link className={styles.btnPrimary} href="/oil-and-gas-software/features">فهرست کامل امکانات<ArrowLeft size={17} aria-hidden="true" /></Link><Link className={styles.btnGhost} href="/oil-and-gas-software/database">ساختار دیتابس</Link></div></div><div className={styles.depthVisual}><MashalImage src={accounts.src} alt={accounts.alt} width={accounts.width} height={accounts.height} sizes="(min-width: 1000px) 500px, 94vw" aspectRatio={`${accounts.width} / ${accounts.height}`} /></div></div><span id="quality-control" aria-hidden="true" /><span id="workforce" aria-hidden="true" /><div className={styles.guideDisclosure}><MashalDetails label="مشاهدهٔ تمام راهنماهای تخصصی مشعل"><ul className={styles.guideList}>{mashalIntentPages.map((page) => <li key={page.slug}><small>{page.eyebrow}</small><Link href={`${mashalCanonicalPath}/${page.slug}`}>{page.navLabel}<ArrowLeft size={15} aria-hidden="true" /></Link><p>{page.description}</p></li>)}</ul></MashalDetails></div></div></section>

      <section className={`${styles.proofSection} defer-render`} aria-labelledby="mashal-proof-title"><div className={styles.shell}><div className={styles.proofCard}><p className={styles.kicker}>استفادهٔ واقعی در افغانستان</p><h2 id="mashal-proof-title" className={styles.h2}>{mashalCaseStudy.fa.title}</h2><p>{mashalCaseStudy.fa.text}</p><Link className={styles.textLink} href="/portfolio/oil-and-gas-management-system">{mashalCaseStudy.fa.link}<ArrowLeft size={17} aria-hidden="true" /></Link></div></div></section>

      <section className={`${styles.faqSection} defer-render`} aria-labelledby="mashal-faq-title"><div className={`${styles.shell} ${styles.faqLayout}`}><SectionHead kicker="پرسش‌های متداول" id="mashal-faq-title" title="پاسخ کوتاه پیش از دمو" start intro="مشعل یک حسابداری عمومی نیست؛ برای جریان واقعی تجارت نفت ساخته شده است." /><div className={styles.faq}>{mashalFaq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section id="mashal-demo" className={`${styles.cta} defer-render`} aria-labelledby="mashal-demo-title"><div className={`${styles.shell} ${styles.ctaGrid}`}><div className={styles.ctaCopy}><p className={styles.kicker}>قدم بعدی</p><h2 id="mashal-demo-title" className={styles.h2}>مشعل را با جریان واقعی شرکت خودتان ببینید</h2><p>دمو را متناسب با بخش کاری شما آماده می‌کنیم تا تصمیم‌گیری بر اساس نیاز واقعی باشد.</p><a className={styles.phoneLink} href={`tel:${companyInfo.primaryPhoneHref}`}><Phone size={18} aria-hidden="true" />تماس با نواتیک</a><div className={styles.serviceList}>{services.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={20} aria-hidden="true" /><span><b>{title}</b><small>{text}</small></span></div>)}</div></div><LeadForm source="mashal-product-page" className={styles.form}><p className={styles.formTitle}>درخواست دموی مشعل</p><div className={styles.fieldGrid}><div className={styles.field}><label htmlFor="mashal-name">نام</label><input id="mashal-name" name="name" type="text" autoComplete="name" required /></div><div className={styles.field}><label htmlFor="mashal-company">شرکت</label><input id="mashal-company" name="company" type="text" autoComplete="organization" required /></div><div className={styles.field}><label htmlFor="mashal-phone">شماره تماس</label><input id="mashal-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required /></div><div className={styles.field}><label htmlFor="mashal-activity">نوع فعالیت</label><select id="mashal-activity" name="activity" defaultValue="" required><option value="" disabled>انتخاب کنید</option><option>واردات مواد نفتی</option><option>توزیع و فروش عمده</option><option>دیپو و مخازن</option><option>حمل و تانکر</option><option>فعالیت مرتبط دیگر</option></select></div></div><button type="submit" className={styles.submit}>ارسال درخواست دمو</button></LeadForm></div></section>
    </article>
  );
}
