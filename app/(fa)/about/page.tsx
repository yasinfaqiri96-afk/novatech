/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";

import BannerScroll from "@/components/BannerScroll";
import JsonLd from "@/components/JsonLd";
import ui from "@/components/SitePage.module.css";
import about from "./About.module.css";
import { buildMetadata } from "@/lib/metadata";
import { ORGANIZATION_ID, breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/seo";
import { services } from "@/lib/services";
import { companyInfo } from "@/lib/site-content";
import { teamMembers } from "@/lib/team";
import portfolioData from "@/lib/portfolio-data.json";

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "درباره ما", path: "/about" },
];

const description = `درباره ${companyInfo.brandName} (${companyInfo.legalName})، شرکت نرم افزاری در هرات: تیم، محصولات ناظر و مشعل، روش تحلیل، توسعه، نصب و پشتیبانی و اطلاعات دفتر.`;

export const metadata = buildMetadata({
  fullTitle: `درباره ${companyInfo.brandName} (${companyInfo.legalName}) | هرات`,
  title: "درباره ما",
  description,
  path: "/about",
});

/**
 * How a project runs, in the same five steps the accounting page already
 * publishes as its delivery process. Restated here, not invented here.
 */
const method = [
  {
    title: "تحلیل نیاز و مشاوره",
    text: "کار با مرور فرایند مالی و عملیاتی فعلی شروع می شود: چه چیزی ثبت می شود، چه کسی با آن کار می کند و کدام گزارش واقعاً لازم است.",
  },
  {
    title: "طراحی فرم ها و ماژول های اجرایی",
    text: "بر اساس همان فرایند، بخش ها و فرم هایی که کاربر هر روز با آنها کار می کند مشخص می شوند.",
  },
  {
    title: "تحلیل داده و طراحی دیتابیس",
    text: "موجودیت ها و رابطه های داده پیش از کدنویسی طراحی می شوند تا افزودن شعبه، ماژول یا گزارش بعدی به بازنویسی نیاز نداشته باشد.",
  },
  {
    title: "تست، بازخورد و بهینه سازی",
    text: "سیستم با داده و سناریوی واقعی کاربران آزمایش و پیش از استقرار اصلاح می شود.",
  },
  {
    title: "نصب، انتقال اطلاعات، آموزش و پشتیبانی",
    text: "اطلاعات قبلی از اکسل یا سیستم قدیمی منتقل و تطبیق می شود، کاربران آموزش می بینند و پشتیبانی طبق توافق ادامه پیدا می کند.",
  },
];

/**
 * Questions people ask before working with the company. Every answer restates a
 * fact already published on this page or on the Herat, contact and product
 * pages; nothing here is a new claim.
 */
const faq = [
  {
    question: "نواتیک از چه زمانی فعالیت می کند؟",
    answer:
      "فعالیت نواتیک در سال ۱۳۹۵ با تحلیل فرایندهای مالی و ساخت ابزارهای ثبت اطلاعات شروع شد. از سال ۱۴۰۱ پروژه های دیتابیس اختصاصی و نرم افزار حسابداری برای مشتریان آغاز شد و در ادامه، سیستم های عملیاتی و محصولات ناظر و مشعل به آن اضافه شدند.",
  },
  {
    question: "ناظر و مشعل محصول خود نواتیک هستند؟",
    answer:
      "بله. ناظر نرم افزار حسابداری و مدیریت مالی نواتیک است و مشعل ERP تخصصی نواتیک برای شرکت های نفت و گاز افغانستان. هر دو را می توان پیش از تصمیم گیری در دمو دید.",
  },
  {
    question: "همکاری با نواتیک از کجا شروع می شود؟",
    answer:
      "از یک جلسه برای شناخت نیاز. در این جلسه فرایند فعلی کارتان مرور می شود، مشخص می شود نسخه آماده کافی است یا سیستم اختصاصی لازم است، و برآورد هزینه بعد از همین مرحله اعلام می شود.",
  },
  {
    question: "بعد از تحویل نرم افزار، پشتیبانی چطور انجام می شود؟",
    answer:
      "آموزش کاربران بخشی از تحویل است. بعد از راه اندازی، رفع اشکال و تغییرات لازم طبق توافق پشتیبانی ادامه پیدا می کند و مشتریان هرات می توانند حضوری هم مراجعه کنند.",
  },
  {
    question: "با کسب و کارهای خارج از هرات هم کار می کنید؟",
    answer:
      "بله. دفتر و تیم در هرات هستند و کار با مشتریان این شهر حضوری پیش می رود؛ برای مجموعه هایی در ولایات دیگر افغانستان، جلسات و آموزش به صورت آنلاین انجام می شود.",
  },
];

const stats = [
  {
    mobileImage: "/images/project-logo-m.png",
    desktopImage: "/images/project-logo.png",
    // Counted from the portfolio board itself, so the number is always one a
    // visitor can verify on /portfolio. The earlier hand-typed "۹ سامانه و وب
    // سایت" matched only the software entries while its label included the four
    // websites. The company-wide total of delivered projects is an owner fact
    // and is not published until confirmed.
    value: portfolioData.length.toLocaleString("fa-AF"),
    label: "سامانه و وب سایت در صفحه نمونه کارها",
  },
  {
    mobileImage: "/images/web-des.png",
    desktopImage: "/images/web-des-lg.png",
    value: "۶",
    label: "حوزه کاری تحت پوشش نرم افزارها",
  },
  {
    mobileImage: "/images/experience-logo-m.png",
    desktopImage: "/images/experience-logo.png",
    // Founded in 1395. "بیش از ۹" stays true for any month of 1395 and any
    // date after Mehr 1405; a bare "۹" or "۱۰" would be wrong for part of it.
    value: "بیش از ۹",
    label: "سال تجربه کاری؛ آغاز فعالیت ۱۳۹۵",
  },
];

const timelineItems = [
  {
    title: "آغاز فعالیت نواتیک - سال ۱۳۹۵",
    description:
      "همه چیز از تحلیل فرایندهای مالی و ساخت ابزارهای ساده برای ثبت دقیق اطلاعات کسب و کارها شروع شد.",
    image:
      "/images/step1-logo-about.png",
  },
  {
    title: "ورود به پروژه های حرفه ای - سال ۱۴۰۱",
    description:
      "در این مرحله طراحی دیتابیس های اختصاصی و توسعه اولین نسخه های نرم افزار حسابداری برای مشتریان واقعی آغاز شد.",
    image:
      "/images/step2-logo-about.png",
  },
  {
    title: "تشکیل تیم محصول - سال ۱۴۰۲",
    description:
      "تیم فنی، تحلیل کسب و کار و پشتیبانی کنار هم قرار گرفتند تا راهکارهایی یکپارچه برای حسابداری، گزارش گیری و اتوماسیون ساخته شود.",
    image:
      "/images/step3-logo-about.png",
  },
  {
    title: "توسعه راهکارهای سازمانی - سال ۱۴۰۴",
    description:
      "سبد کاری به سیستم های عملیاتی گسترده تر شد: لجستیک، فروش رستوران، آژانس مسافرتی و حضور و غیاب، در کنار حسابداری و طراحی سایت.",
    image:
      "/images/step4-logo-about.png",
  },
];

export default function Page() {
  return (
    <div className={`${ui.page} min-h-screen`}>
      <JsonLd
        data={graph(
          {
            ...webPageSchema({
              path: "/about",
              name: `درباره ${companyInfo.brandName}`,
              description,
            }),
            "@type": "AboutPage",
            mainEntity: { "@id": ORGANIZATION_ID },
          },
          breadcrumbSchema(breadcrumbs),
          faqSchema(faq),
        )}
      />
      <section className={ui.hero}>
        <div className={`${ui.container} ${ui.heroGrid} ${about.heroGrid}`}>
          <div>
            <p className={ui.eyebrow}>آشنایی بیشتر با تیم</p>
            <h1 className={ui.title}>
              <span className="heavy">درباره</span>{" "}
              <span className="light">{companyInfo.brandName}</span>
            </h1>
            <p className={ui.lead}>
              {companyInfo.displayName} یک تیم تحلیل، توسعه و پشتیبانی نرم افزار
              در هرات است. کار ما با بررسی فرایند مالی و عملیاتی هر کسب و کار
              شروع می شود، با طراحی دیتابیس و ساخت سیستم ادامه پیدا می کند و با
              انتقال اطلاعات، آموزش کاربران و پشتیبانی بعد از استقرار کامل
              می شود. مشعل (MASHAL)، محصول نواتیک برای مدیریت تجارت نفت و گاز افغانستان است؛
              <Link href="/oil-and-gas-software" className={about.inlineLink}> امکانات و درخواست دموی مشعل</Link>
              {" "}را در صفحهٔ محصول ببینید. ناظر (NAZER) نیز نرم افزار حسابداری و مدیریت مالی نواتیک است؛
              <Link href="/accounting-software" className={about.inlineLink}> معرفی و دموی ناظر</Link>.
            </p>
          </div>

          {/* Portrait artwork: sized by its own ratio so it is never squashed
              into a landscape slot. */}
          <figure className={about.portrait}>
            <Image
              alt={`خدمات ${companyInfo.brandName} برای کسب و کارها`}
              priority
              width={1086}
              height={1448}
              sizes="(min-width: 900px) 440px, 88vw"
              src="/images/aboutus.webp"
            />
          </figure>
        </div>
      </section>

      <section className={`${ui.section} ${ui.container}`}>
        <h2 className={`${ui.sectionTitle} ${ui.centerTitle}`}>
          <span className="heavy">نواتیک</span>{" "}
          <span className="light">در یک نگاه</span>
        </h2>

        <div className={`${ui.sectionBody} ${ui.grid3}`}>
          {stats.map((item) => (
            <div key={item.label} className={`${ui.card} ${about.stat}`}>
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="72"
                height="72"
                decoding="async"
                className={about.statIcon}
                src={item.desktopImage}
              />
              <div>
                <div className={about.statValue}>{item.value}</div>
                <p className={ui.cardText}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`${ui.section} ${ui.container}`}>
        <h2 className={`${ui.sectionTitle} ${ui.centerTitle}`}>
          <span className="heavy">داستان</span>{" "}
          <span className="light">نواتیک</span>
        </h2>

        {/* One continuous mint line carries the story from step to step. */}
        <ol className={`${ui.sectionBody} ${about.timeline}`}>
          {timelineItems.map((item) => (
            <li key={item.title} className={about.step}>
              <span className={about.stepIcon}>
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="64"
                  height="64"
                  decoding="async"
                  src={item.image}
                />
              </span>
              <div className={`${ui.card} ${about.stepCard}`}>
                <h3 className={ui.cardTitle}>{item.title}</h3>
                <p className={ui.cardText}>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${ui.section} ${ui.container}`} aria-labelledby="about-expertise-title">
        <h2 id="about-expertise-title" className={ui.sectionTitle}>
          حوزه های تخصصی و محصولات نواتیک
        </h2>
        <p className={ui.sectionIntro}>
          دو محصول آماده — ناظر برای حسابداری و مشعل برای شرکت های نفت و گاز — در کنار خدماتی
          که برای هر کسب و کار جداگانه طراحی و ساخته می شوند.
        </p>
        <div className={`${ui.sectionBody} ${ui.grid4}`}>
          {services.map((service) => (
            <Link key={service.key} href={service.path} className={ui.card}>
              <span className={ui.cardTitle}>{service.navLabel}</span>
              <span className={ui.cardText}>{service.teaser}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${ui.section} ${ui.container}`} aria-labelledby="about-method-title">
        <h2 id="about-method-title" className={ui.sectionTitle}>
          روش کار ما؛ از تحلیل تا پشتیبانی
        </h2>
        <ol className={`${ui.sectionBody} ${ui.grid3} ${about.method}`}>
          {method.map((step) => (
            <li key={step.title} className={`${ui.card} ${about.methodStep}`}>
              <h3 className={`${ui.cardTitle} ${about.methodTitle}`}>{step.title}</h3>
              <p className={ui.cardText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${ui.section} ${ui.container}`} aria-labelledby="about-team-title">
        <h2 id="about-team-title" className={ui.sectionTitle}>
          تیم نواتیک
        </h2>
        <p className={ui.sectionIntro}>
          افرادی که تحلیل، طراحی دیتابیس، توسعه و طراحی سیستم های نواتیک را انجام می دهند.
        </p>
        <ul className={`${ui.sectionBody} ${ui.grid3} m-0 list-none p-0`}>
          {teamMembers.map((member) => (
            <li key={member.slug} id={member.slug} className={`${ui.card} ${about.member}`}>
              <Image
                src={member.image}
                alt={member.alt}
                width={member.width}
                height={member.height}
                sizes="84px"
                className={about.memberPhoto}
                style={{ objectPosition: member.focus }}
                loading="lazy"
              />
              <div>
                <h3 className={ui.cardTitle}>{member.name}</h3>
                <p className={about.memberRole}>{member.role}</p>
                <p className={about.memberLinks}>
                  {member.socialLinks.instagram && (
                    <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label={`اینستاگرام ${member.name}`}>اینستاگرام</a>
                  )}
                  {member.socialLinks.facebook && (
                    <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label={`فیسبوک ${member.name}`}>فیسبوک</a>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${ui.section} ${ui.container}`} aria-labelledby="about-work-title">
        <h2 id="about-work-title" className={ui.sectionTitle}>
          نمونه کارها و دفتر هرات
        </h2>
        <div className={`${ui.sectionBody} ${ui.grid2}`}>
          <div className={ui.card}>
            <h3 className={ui.cardTitle}>سیستم ها و وب سایت های تحویل شده</h3>
            <p className={ui.cardText}>
              شرح مشکل، راهکار و امکانات پیاده شده در هر پروژه، از سیستم لجستیک و انبار تا
              مشعل در گروپ کمپنی های فواد صدیقی.
            </p>
            <Link href="/portfolio" className={ui.cardMore}>مشاهده نمونه کارها</Link>
          </div>
          <div className={ui.card}>
            <h3 className={ui.cardTitle}>اطلاعات تماس</h3>
            <ul className={about.contactList}>
              <li>{companyInfo.address}</li>
              <li>
                <a dir="ltr" href={`tel:${companyInfo.primaryPhoneHref}`}>{companyInfo.primaryPhoneLabel}</a>
                {" ، "}
                <a dir="ltr" href={`tel:${companyInfo.secondaryPhoneHref}`}>{companyInfo.secondaryPhoneLabel}</a>
              </li>
              <li><a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a></li>
              <li>{companyInfo.workHours} {companyInfo.workDays}</li>
            </ul>
            <span className="flex flex-wrap gap-4">
              <Link href="/herat" className={ui.cardMore}>دفتر نواتیک در هرات</Link>
              <Link href="/contact" className={ui.cardMore}>درخواست مشاوره</Link>
            </span>
          </div>
        </div>
      </section>

      <section className={`${ui.section} ${ui.container}`} aria-labelledby="about-faq-title">
        <h2 id="about-faq-title" className={about.faqHeading}>پرسش های رایج درباره همکاری با نواتیک</h2>
        <div className={about.faqList}>
          {faq.map((item) => (
            <details key={item.question} className={about.faqItem}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* What Novatech does for a brand: moved here from the home page. */}
      <BannerScroll />
    </div>
  );
}
