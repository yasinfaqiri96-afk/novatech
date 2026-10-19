/* eslint-disable @next/next/no-img-element */
import { ArrowDown, Code2, Database, Globe2, Camera, Mail, MapPin, MessageCircle, PhoneCall, Send, ShieldCheck } from "lucide-react";
import { companyInfo } from "@/lib/site-content";
import JsonLd from "@/components/JsonLd";
import ContactReferenceForm from "@/components/ContactReferenceForm";
import ContactReferenceMap from "@/components/ContactReferenceMap";
import LazyVideo from "@/components/LazyVideo";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, graph, localBusinessSchema, webPageSchema } from "@/lib/seo";
import styles from "./contact.module.css";

const description = `آدرس دفتر، شماره تماس، ایمیل، ساعت کاری و فرم ارتباط با ${companyInfo.brandName} در ${companyInfo.address}`;
export const metadata = buildMetadata({
  fullTitle: `تماس با ${companyInfo.brandName} | دفتر هرات، افغانستان`,
  title: "تماس با ما", description, path: "/contact",
});
const mapHref = "https://www.openstreetmap.org/?mlat=34.3523&mlon=62.1952#map=16/34.3523/62.1952";
const questions = [
  { question: "در چه روزها و ساعاتی می‌توانم با شما تماس بگیرم؟", answer: `تیم نواتیک ${companyInfo.workDays} از ${companyInfo.workHours} پاسخگوی شما است. در زمان‌های دیگر نیز می‌توانید درخواست خود را از طریق فرم، ایمیل یا واتس‌اپ بفرستید تا در ساعت کاری بعدی پیگیری شود.` },
  { question: "چه مدت طول می‌کشد تا به پیام من پاسخ داده شود؟", answer: "درخواست‌ها در ساعت کاری بررسی می‌شوند و همکاران ما پس از بررسی اطلاعات، برای پاسخ و هماهنگی با شما تماس می‌گیرند." },
  { question: "چگونه می‌توانم با تیم پشتیبانی شما تماس بگیرم؟", answer: `برای پیگیری پروژه یا دریافت پشتیبانی، با شماره‌های درج‌شده در این صفحه تماس بگیرید یا جزئیات درخواست خود را به ${companyInfo.email} ارسال کنید.` },
];
export default function ContactPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={graph({ ...webPageSchema({ path: "/contact", name: `تماس با ${companyInfo.brandName}`, description }), "@type": "ContactPage" }, breadcrumbSchema([{name:"صفحه اصلی",path:"/"},{name:"تماس با ما",path:"/contact"}]), localBusinessSchema)} />
      <section className={`${styles.section} ${styles.intro}`} aria-labelledby="contact-heading">
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.heroText}>
              <div className={styles.heading}>
                <p className={styles.english} lang="en" dir="ltr">Contact Us</p>
                <img className={styles.handwriting} src="/images/contact-reference/45555555.svg" alt="با ما در ارتباط باشید" width="439" height="131" />
                <h1 id="contact-heading">تماس با {companyInfo.brandName}</h1>
              </div>
              <p className={styles.introText}>از ایده و پرسش شما تا شروع یک همکاری تازه، راه ارتباط با نواتیک باز است. برای مشاوره درباره طراحی سایت، ساخت نرم‌افزار و سیستم‌های مدیریتی، از فرم این صفحه استفاده کنید یا با ما تماس بگیرید. همکاران ما درخواست شما را بررسی می‌کنند و برای راهنمایی و هماهنگی قدم بعدی در کنارتان هستند.</p>
              <div className={styles.phones}>
                {[{href:companyInfo.primaryPhoneHref,label:companyInfo.primaryPhoneLabel},{href:companyInfo.secondaryPhoneHref,label:companyInfo.secondaryPhoneLabel}].map(phone=>(
                  <a className={styles.phone} key={phone.href} href={`tel:${phone.href}`}>
                    <span className={styles.phoneIcon}><PhoneCall aria-hidden="true" /></span>
                    <span className={styles.phoneText}><b dir="ltr">{phone.label}</b><span>تماس مستقیم</span></span>
                  </a>
                ))}
              </div>
            </div>
            <div className={styles.heroMedia}>
              <LazyVideo src="/images/contact-reference/Comp-3.mp4" start="idle" poster="/images/contact-reference/contact-hero-poster.webp" aria-label="تصویر ارتباط و مشاوره" />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section} aria-label="راه‌های ارتباط با نواتیک">
        <div className={styles.container}>
          <div className={styles.channelsGrid}>
            <div className={styles.services}>
              <p><Code2 aria-hidden="true" /><span>طراحی و توسعه نرم‌افزار اختصاصی</span></p>
              <p><Globe2 aria-hidden="true" /><span>طراحی وب‌سایت و فروشگاه اینترنتی</span></p>
              <p><Database aria-hidden="true" /><span>سیستم‌های مدیریتی و طراحی دیتابیس</span></p>
              <p><ShieldCheck aria-hidden="true" /><span>مشاوره، آموزش و پشتیبانی پروژه‌ها</span></p>
            </div>
            <div className={styles.socials}>
              <a href={companyInfo.instagramUrl} target="_blank" rel="noopener noreferrer"><Camera aria-hidden="true" /><span lang="en" dir="ltr">Follow<br/>Instagram</span></a>
              <a href={companyInfo.websiteUrl}><Globe2 aria-hidden="true" /><span lang="en" dir="ltr">Visit<br/>Novatech</span></a>
              <a href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /><span lang="en" dir="ltr">Text in<br/>Whatsapp</span></a>
              <a href={`mailto:${companyInfo.email}`}><Send aria-hidden="true" /><span lang="en" dir="ltr">Send an<br/>Email</span></a>
            </div>
            <div className={styles.hours}>
              <div className={styles.clock} aria-hidden="true"><span>NOVATECH</span><i className={styles.hourHand}/><i className={styles.minuteHand}/><i className={styles.clockDot}/></div>
              <div><p>ساعت کاری تیم مشاوره و فروش</p><span>{companyInfo.workDays}</span><span>{companyInfo.workHours}</span><a href={`tel:${companyInfo.primaryPhoneHref}`} dir="ltr">{companyInfo.primaryPhoneLabel}</a></div>
            </div>
            <a href={`mailto:${companyInfo.email}`} className={styles.email} aria-label={`ایمیل ${companyInfo.email}`}><Mail aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <section className={styles.section} aria-label="فرم تماس و آدرس دفتر">
        <div className={styles.container}>
          <div className={styles.mapGrid}>
            <div className={styles.formWrap}>
              <div className={styles.formBox}>
                <img className={styles.formTitle} src="/images/contact-reference/3239763752-1.svg" alt="بشنویم حرف‌های شما را" width="1235" height="516" />
                <p className={styles.formIntro}>پیام شما به تیم نواتیک می‌رسد؛ موضوع درخواست را بنویسید تا برای راهنمایی و ادامه گفتگو با شما در تماس باشیم.</p>
                <ContactReferenceForm className={styles.form} buttonClassName={styles.submit} />
              </div>
            </div>
            <div className={styles.location}>
              <div className={styles.mapCanvas}><ContactReferenceMap /></div>
              <a href={mapHref} target="_blank" rel="noopener noreferrer" className={styles.mapLink}><MapPin aria-hidden="true"/><span lang="en">OPENSTREETMAP</span></a>
              <p className={styles.address}><MapPin aria-hidden="true" />{companyInfo.address}</p>
            </div>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="contact-faq-heading">
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <aside className={styles.expert}>
              <img src="/images/contact-reference/consultation.webp" alt="تصویر بخش مشاوره" width="1779" height="2573" loading="lazy" />
              <div className={styles.expertActions}><a href="#contact-request">ثبت درخواست مشاوره</a><a href={`tel:${companyInfo.primaryPhoneHref}`} dir="ltr">{companyInfo.primaryPhoneLabel}</a></div>
              <p>با شناخت نیازهای کسب‌وکار شما، راهکار مناسب برای حضور و رشد در دنیای دیجیتال را طراحی می‌کنیم.</p>
            </aside>
            <div className={styles.faqContent}>
              <h2 id="contact-faq-heading">پرسش‌های پرتکرار</h2>
              <p>پاسخ پرسش‌های رایج درباره تماس و همکاری را اینجا بخوانید. برای گفتگو درباره جزئیات پروژه خود، با ما در ارتباط باشید.</p>
              <div className={styles.faqItems}>{questions.map(item=>(<details key={item.question}><summary>{item.question}<span><ArrowDown aria-hidden="true" /></span></summary><p>{item.answer}</p></details>))}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

