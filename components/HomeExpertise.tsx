import type { FaqItem } from "@/components/ServiceFaq";
import styles from "@/components/HomeExpertise.module.css";
import { companyInfo } from "@/lib/site-content";

/**
 * The home page's FAQ about Novatech. It is server-rendered on purpose: the
 * animated sections above it carry their copy in images and scroll effects, and
 * this is the part a crawler or an answer engine can quote without running
 * JavaScript. The same array feeds the page's FAQPage JSON-LD, and every answer
 * restates a fact another page already publishes, so the home page adds no
 * claim of its own.
 */

export const homeFaq: FaqItem[] = [
  {
    question: "نواتیک چه کاری انجام می دهد؟",
    answer: `${companyInfo.brandName} (${companyInfo.legalName}) شرکت نرم افزاری در هرات است. دو محصول آماده دارد: ناظر برای حسابداری و مدیریت مالی و مشعل برای مدیریت شرکت های نفت و گاز. در کنار آنها نرم افزار اختصاصی، طراحی دیتابیس، سیستم های مدیریتی و ERP، طراحی سایت و طراحی گرافیک برای کسب و کارهای افغانستان انجام می دهد.`,
  },
  {
    question: "ناظر و مشعل چه فرقی با هم دارند؟",
    answer:
      "ناظر نرم افزار حسابداری است: ثبت روزانه حسابات، دریافت و پرداخت، مصارف و راپورهای مالی، با ثبت به افغانی و دالر. مشعل ERP تخصصی شرکت های نفت و گاز است و قرارداد، بارگیری، حمل، مخزن، فروش، حساب شرکا و سود هر محموله را در یک زنجیره نگه می دارد.",
  },
  {
    question: "دفتر نواتیک کجاست و ساعت کاری آن چیست؟",
    answer: `دفتر ${companyInfo.brandName} در ${companyInfo.address} است. ساعت کاری ${companyInfo.workHours} ${companyInfo.workDays} است و شماره تماس ${companyInfo.primaryPhoneLabel} است.`,
  },
  {
    question: "برای دیدن دمو یا گرفتن مشاوره چه باید کرد؟",
    answer: `فرم صفحه تماس را پر کنید یا با شماره ${companyInfo.primaryPhoneLabel} تماس بگیرید. در جلسه اول، فرایند فعلی کارتان مرور می شود تا روشن شود نسخه آماده کافی است یا سیستم اختصاصی لازم است.`,
  },
];

export default function HomeExpertise() {
  return (
    <div className={`${styles.root} defer-render`}>
      <section className={styles.container} aria-labelledby="home-faq-title">
        <h2 id="home-faq-title" className={styles.title}>سوالات رایج درباره نواتیک</h2>
        <div className={styles.faq}>
          {homeFaq.map((item) => (
            <details key={item.question} className={styles.faqItem}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
