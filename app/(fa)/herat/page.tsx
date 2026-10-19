import Link from "next/link";
import { ArrowLeft, Check, Clock, Mail, MapPin, Phone } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import ServiceFaq from "@/components/ServiceFaq";
import ui from "@/components/SitePage.module.css";
import { buildMetadata } from "@/lib/metadata";
import { caseStudies } from "@/lib/case-studies";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  localBusinessSchema,
  webPageSchema,
} from "@/lib/seo";
import { services } from "@/lib/services";
import { companyInfo } from "@/lib/site-content";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: `${companyInfo.brandName} در هرات`, path: "/herat" },
];

/**
 * The Herat page is a local business page, not a second copy of the service
 * pages. It answers what someone in Herat needs before contacting a software
 * company: where the office is, how the work actually runs in this city, which
 * kinds of local businesses have been served, and where to go next. Service
 * descriptions stay on the service pages and are linked, never repeated.
 */

const workingWithUs = [
  {
    title: "جلسه حضوری در دفتر هرات",
    text: "برای شروع لازم نیست چیزی آماده کنید. در جلسه اول، فرایند فعلی کارتان را با هم مرور می کنیم و مشخص می شود کدام بخش واقعاً به سیستم نیاز دارد.",
  },
  {
    title: "بازدید از محل کار شما",
    text: "برای انبار، رستوران، دیپو یا شرکت باربری، دیدن محل کار بیشتر از هر جلسه ای کمک می کند. تیم برای بررسی به محل شما در شهر هرات می آید.",
  },
  {
    title: "آموزش حضوری کاربران",
    text: "آموزش پای همان دستگاهی انجام می شود که کاربر هر روز با آن کار می کند، نه با فایل راهنما. برای کسب و کارهای هرات این کار حضوری انجام می شود.",
  },
  {
    title: "پشتیبانی محلی",
    text: "برای مشتریان هرات پشتیبانی تلفنی و واتس اپ در ساعت کاری در دسترس است و در صورت نیاز مراجعه حضوری انجام می شود.",
  },
];

const localIndustries = [
  {
    title: "سوپرمارکت و فروشگاه",
    text: "فروش با بارکد، کنترل موجودی و حساب مشتریان و تامین کنندگان.",
    slug: "supermarket-management-system",
  },
  {
    title: "شرکت های باربری و ترانزیت",
    text: "بارنامه، ناوگان و پیگیری مرسوله برای شرکت هایی که مسیرهای زمینی را مدیریت می کنند.",
    slug: "logistics-management-system",
  },
  {
    title: "رستوران و کافه",
    text: "ثبت سفارش، ارتباط سالن با آشپزخانه و کنترل مصرف مواد اولیه.",
    slug: "restaurant-pos",
  },
  {
    title: "آژانس مسافرتی",
    text: "مدیریت تور و بلیط و حسابداری اختصاصی خدمات سفر.",
    slug: "travel-agency-system",
  },
  {
    title: "گدام و انبار",
    text: "ثبت ورود و خروج کالا و موجودی لحظه ای به تفکیک گدام.",
    slug: "warehouse-management-system",
  },
  {
    title: "دفاتر اداری و سازمان ها",
    text: "حضور و غیاب، شیفت و اتصال کارکرد به محاسبه حقوق.",
    slug: "attendance-system",
  },
];

const faq = [
  {
    question: "دفتر شما در هرات کجاست؟",
    answer: `${companyInfo.address}. ساعت کاری ${companyInfo.workHours} ${companyInfo.workDays} است و برای جلسه حضوری بهتر است قبلش با شماره ${companyInfo.primaryPhoneLabel} هماهنگ کنید.`,
  },
  {
    question: "فقط با مشتریان هرات کار می کنید؟",
    answer:
      "نه. دفتر و تیم در هرات هستند و کار با مشتریان همین شهر به صورت حضوری پیش می رود، اما پروژه ها برای مجموعه هایی در ولایات دیگر افغانستان هم اجرا شده است. در آن موارد جلسات و آموزش به صورت آنلاین انجام می شود.",
  },
  {
    question: "برای مشاوره اولیه هزینه ای دریافت می شود؟",
    answer:
      "نه. جلسه اول برای شناخت نیاز و مشخص کردن دامنه کار است و رایگان انجام می شود. برآورد هزینه بعد از همین مرحله و به صورت مشخص اعلام می شود.",
  },
  {
    question: "اگر برق یا اینترنت دفتر ما پایدار نباشد چه؟",
    answer:
      "این موضوع در طراحی در نظر گرفته می شود. بسته به شرایط، سیستم روی سرور محلی در دفتر شما راه اندازی می شود تا کار روزانه به اینترنت وابسته نباشد، یا با قابلیت کار آفلاین و همگام سازی بعدی ساخته می شود.",
  },
];

export const metadata = buildMetadata({
  fullTitle: `شرکت نرم افزاری در هرات، افغانستان | ${companyInfo.brandName}`,
  title: "نواتیک در هرات",
  description: `${companyInfo.brandName} یک شرکت نرم افزاری و تکنالوژی در هرات است؛ آدرس دفتر، شماره تماس، ساعت کاری، خدمات و نمونه سیستم های تحویل شده برای کسب و کارهای هرات.`,
  path: "/herat",
});

export default function HeratPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/herat",
            name: `شرکت نرم افزاری در هرات | ${companyInfo.brandName}`,
            description: metadata.description as string,
          }),
          breadcrumbSchema(breadcrumbs),
          localBusinessSchema,
          faqSchema(faq),
        )}
      />

      <div className={ui.page}>
        <section className={ui.hero}>
          <div className={ui.container}>
            <Breadcrumbs items={breadcrumbs} />

            <div className={ui.heroGrid}>
              <div>
                <p className={ui.eyebrow}>هرات، افغانستان</p>
                <h1 className={ui.title}>
                  {companyInfo.brandName}؛ شرکت نرم افزاری و تکنالوژی در هرات
                </h1>
                <p className={ui.lead}>
                  دفتر {companyInfo.brandName} در {companyInfo.address} است و تیم
                  تحلیل، توسعه و پشتیبانی از همین جا کار می کند. یعنی برای شروع یک
                  پروژه، جلسه حضوری ممکن است؛ برای آموزش کاربران، کسی به محل کارتان
                  می آید؛ و اگر بعد از راه اندازی مشکلی پیش بیاید، پشتیبانی در همین
                  شهر است.
                </p>
                <p className={ui.lead}>
                  این صفحه برای کسانی نوشته شده که در هرات دنبال شرکت نرم افزاری،
                  طراحی سایت یا سیستم مدیریتی هستند و می خواهند قبل از تماس بدانند
                  با چه کسی طرف اند. اگر هنوز چند شرکت را مقایسه می کنید،{" "}
                  <Link href="/blog/choosing-software-company-herat">
                    معیارهای قابل بررسی برای انتخاب شرکت نرم افزاری
                  </Link>{" "}
                  و{" "}
                  <Link href="/about">
                    تیم و روش کار نواتیک
                  </Link>{" "}
                  را ببینید.
                </p>

                <div className={ui.actions}>
                  <a href={`tel:${companyInfo.primaryPhoneHref}`} className={ui.btnPrimary}>
                    تماس با دفتر هرات
                    <Phone size={16} aria-hidden="true" />
                  </a>
                  <Link href="/contact" className={ui.btnSecondary}>
                    فرم درخواست مشاوره
                    <ArrowLeft size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className={ui.infoCard}>
                <h2 className={ui.infoTitle}>اطلاعات دفتر هرات</h2>

                <div className={ui.infoRow}>
                  <span className={ui.infoIcon}><MapPin size={17} strokeWidth={1.7} aria-hidden="true" /></span>
                  <p className="m-0">{companyInfo.address}</p>
                </div>

                <div className={ui.infoRow}>
                  <span className={ui.infoIcon}><Phone size={17} strokeWidth={1.7} aria-hidden="true" /></span>
                  <div className="flex flex-col">
                    <a dir="ltr" href={`tel:${companyInfo.primaryPhoneHref}`}>
                      {companyInfo.primaryPhoneLabel}
                    </a>
                    <a dir="ltr" href={`tel:${companyInfo.secondaryPhoneHref}`}>
                      {companyInfo.secondaryPhoneLabel}
                    </a>
                  </div>
                </div>

                <div className={ui.infoRow}>
                  <span className={ui.infoIcon}><Mail size={17} strokeWidth={1.7} aria-hidden="true" /></span>
                  <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                </div>

                <div className={ui.infoRow}>
                  <span className={ui.infoIcon}><Clock size={17} strokeWidth={1.7} aria-hidden="true" /></span>
                  <p className="m-0">
                    {companyInfo.workHours}
                    <span className="block text-sm">{companyInfo.workDays}</span>
                  </p>
                </div>

                <div className={ui.mapFrame}>
                  <MapEmbed
                    title={`موقعیت دفتر ${companyInfo.brandName} در هرات`}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=62.1851%2C34.3423%2C62.2051%2C34.3623&layer=mapnik&marker=34.3523%2C62.1952"
                    href="https://www.openstreetmap.org/?mlat=34.3523&mlon=62.1952#map=16/34.3523/62.1952"
                    minHeight={220}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${ui.section} ${ui.container}`}>
          <h2 className={ui.sectionTitle}>
            کار با {companyInfo.brandName} در هرات چطور پیش می رود
          </h2>
          <div className={`${ui.sectionBody} ${ui.grid2}`}>
            {workingWithUs.map((step) => (
              <div key={step.title} className={ui.card}>
                <h3 className={ui.cardTitle}>{step.title}</h3>
                <p className={ui.cardText}>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${ui.section} ${ui.container}`}>
          <h2 className={ui.sectionTitle}>
            کسب و کارهایی که برایشان سیستم ساخته ایم
          </h2>
          <p className={ui.sectionIntro}>
            هر مورد زیر به شرح کامل همان سیستم وصل است: مشکلی که وجود داشت، آنچه
            ساخته شد و امکاناتی که در عمل پیاده شده است.
          </p>
          <div className={`${ui.sectionBody} ${ui.grid3}`}>
            {localIndustries.map((industry) => {
              const study = caseStudies.find(
                (item) => item.slug === industry.slug,
              );

              return (
                <Link key={industry.slug} href={`/portfolio/${industry.slug}`} className={ui.card}>
                  <h3 className={ui.cardTitle}>{industry.title}</h3>
                  <p className={ui.cardText}>{industry.text}</p>
                  <span className={ui.cardMore}>
                    {study ? study.title : "مشاهده نمونه"}
                    <ArrowLeft size={14} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={`${ui.section} ${ui.container}`}>
          <h2 className={ui.sectionTitle}>خدماتی که در هرات ارائه می شود</h2>
          <div className={`${ui.sectionBody} ${ui.grid4}`}>
            {services.map((service) => (
              <Link key={service.key} href={service.path} className={ui.card}>
                <span className={ui.cardTitle}>{service.navLabel}</span>
                <span className={ui.cardText}>{service.teaser}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${ui.section} ${ui.container}`}>
          <h2 className={ui.sectionTitle}>چیزهایی که در هرات فرق می کند</h2>
          <p className={ui.sectionIntro}>
            سیستمی که برای شرایط جای دیگری ساخته شده، اینجا در جزئیات کم می آورد.
            این ها مواردی است که در پروژه های هرات به صورت پیش فرض در نظر گرفته
            می شود:
          </p>
          <ul className={`${ui.sectionBody} ${ui.checkList}`}>
            {[
              "کار هم زمان با افغانی و دالر و ثبت نرخ تبدیل روز",
              "پایداری در برابر قطعی برق و اینترنت با گزینه سرور محلی",
              "رابط کاربری راست به چپ و تقویم و اعداد فارسی",
              "چاپ فاکتور و اسناد متناسب با فرم های رایج بازار محلی",
              "امکان کار چند کاربره روی شبکه داخلی دفتر",
              "آموزش حضوری به کاربرانی که تجربه کار با سیستم ندارند",
            ].map((item) => (
              <li key={item}>
                <span className={ui.checkMark}><Check size={15} strokeWidth={2.2} aria-hidden="true" /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className={`${ui.section} ${ui.container}`}>
          <ServiceFaq items={faq} heading="سوالات متداول درباره دفتر هرات" />
        </div>
      </div>
    </>
  );
}
