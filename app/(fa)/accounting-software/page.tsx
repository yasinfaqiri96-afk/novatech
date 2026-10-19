/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftRight,
  BarChart3,
  CheckCircle,
  Landmark,
  Link2,
  Package,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { companyInfo } from "@/lib/site-content";
import NazerOverview from "@/components/NazerOverview";
import LeadForm from "@/components/LeadForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import ServiceFaq from "@/components/ServiceFaq";
import { buildMetadata } from "@/lib/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/seo";
import { serviceByKey } from "@/lib/services";

const service = serviceByKey["accounting-software"];

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "ناظر؛ نرم افزار حسابداری", path: service.path },
];

const description =
  "ناظر، نرم افزار آماده حسابداری و مدیریت مالی نواتیک در افغانستان. برای دیدن نرم افزار و بررسی نیازهای حسابات کسب و کارتان، درخواست دمو و مشاوره بدهید.";

/**
 * Questions that actually come up before an accounting project starts. Answers
 * describe how the work is done and stay away from anything the project cannot
 * back up: no price, no delivery guarantee, no client name.
 */
const faq = [
  {
    question: "ناظر برای چه نوع کسب و کاری مناسب است؟",
    answer:
      "ناظر برای ثبت روزانه حسابات، دریافت و پرداخت، مصارف و راپورهای مالی ساخته شده است. نیازهای ثبت و راپور یک فروشگاه، شرکت خدماتی یا تجارت عمده یکسان نیست؛ به همین دلیل پیش از سفارش، نسخه پیشنهادی در دمو با جریان کار واقعی شما مقایسه می شود و هر نیاز اختصاصی جداگانه مشخص می شود.",
  },
  {
    question: "اگر نسخه آماده کافی نباشد، نرم افزار حسابداری اختصاصی هم ساخته می شود؟",
    answer:
      "بله. نواتیک در کنار ناظر، راهکار حسابداری اختصاصی هم می سازد؛ مثلاً اتصال به انبار، پخش و توزیع، حقوق و دستمزد یا وب سایت. دامنه این کارها با امکانات نسخه آماده یکسان فرض نمی شود و پس از نیازسنجی، جداگانه مشخص و برآورد می شود.",
  },
  {
    question: "تفاوت نرم افزار حسابداری با یک سیستم مدیریت کامل چیست؟",
    answer:
      "نرم افزار حسابداری وضعیت مالی را ثبت و گزارش می کند: سند، خزانه، دریافت و پرداخت و صورت های مالی. سیستم مدیریت کسب و کار علاوه بر این، عملیات روزانه مثل فروش، انبار، توزیع و پرسنل را هم پوشش می دهد و سند مالی را از دل همان عملیات می سازد. انتخاب بین این دو به این بستگی دارد که مشکل امروز شما فقط گزارش مالی است یا هماهنگی بین بخش ها.",
  },
  {
    question: "کار هم زمان با افغانی و دالر پشتیبانی می شود؟",
    answer:
      "بله. ثبت معامله به ارز اصلی، نگه داشتن نرخ تبدیل روز و گرفتن گزارش به هر دو ارز، در ساختار حساب ها و اسناد در نظر گرفته می شود؛ نه به عنوان یک محاسبه دستی کنار سیستم.",
  },
  {
    question: "اطلاعات حسابداری فعلی ما در اکسل است؛ قابل انتقال است؟",
    answer:
      "انتقال داده بخشی از پروژه است. فهرست حساب ها، مانده اول دوره، مشتریان، تامین کنندگان و موجودی کالا از فایل های اکسل یا سیستم قبلی پاکسازی و منتقل می شوند و مانده ها قبل از شروع بهره برداری با داده قدیمی تطبیق داده می شود.",
  },
  {
    question: "نرم افزار روی سرور خود ما نصب می شود یا آنلاین است؟",
    answer:
      "هر دو حالت ممکن است. در جایی که اینترنت پایدار نیست، نصب روی سرور محلی دفتر انتخاب مطمئن تری است و امکان دسترسی از بیرون هم می تواند کنار آن اضافه شود. تصمیم بر اساس تعداد کاربران، تعداد شعبه و وضعیت شبکه شما گرفته می شود.",
  },
  {
    question: "گزارش ها قابل تغییر هستند؟",
    answer:
      "گزارش های مالی استاندارد از ابتدا وجود دارند و گزارش های مدیریتی مطابق چیزی که مدیر واقعاً هر روز نگاه می کند ساخته می شوند. اگر بعداً شکل گزارش تغییر کند، چون داده در یک دیتابس ساختارمند ثبت شده، گزارش جدید بدون ثبت دوباره اطلاعات ساخته می شود.",
  },
  {
    question: "پشتیبانی بعد از تحویل چطور انجام می شود؟",
    answer:
      "آموزش کاربران بخشی از تحویل است و بعد از راه اندازی، رفع اشکال و تغییرات مورد نیاز طبق توافق پشتیبانی ادامه پیدا می کند. شرکت های هرات می توانند برای این کار حضوری هم مراجعه کنند.",
  },
];

export const metadata = buildMetadata({
  fullTitle: `ناظر؛ نرم افزار حسابداری و مدیریت مالی در افغانستان | ${companyInfo.brandName}`,
  title: "ناظر؛ نرم افزار حسابداری",
  description,
  path: service.path,
});

/** What the hero panel lists: the areas this page and its FAQ already state. */
const nazerScope = [
  "حسابات، اسناد و مانده‌ها",
  "دریافت، پرداخت و مصارف",
  "ثبت به افغانی و دالر با نرخ روز",
  "راپورهای مالی برای مدیر و حسابدار",
];

const accountingModules = [
  { name: "حسابداری فروشگاهی", type: "ثبت فروش و صدور فاکتور", icon: ShoppingCart },
  { name: "خزانه و بانک", type: "کنترل گردش نقدی و حساب ها", icon: Landmark },
  { name: "دریافت و پرداخت", type: "اسناد مالی و تسویه حساب", icon: ArrowLeftRight },
  { name: "گزارشات مدیریتی", type: "داشبورد و گزارش سود و زیان", icon: BarChart3 },
  { name: "انبار و کالا", type: "کنترل موجودی و نقطه سفارش", icon: Package },
  { name: "پخش و توزیع", type: "مدیریت سفارش و مسیر فروش", icon: Truck },
  { name: "حقوق و دستمزد", type: "کارکرد پرسنل و پرداخت ماهانه", icon: Users },
  { name: "اتصال وب سایت", type: "یکپارچه سازی با سایت و سامانه ها", icon: Link2 },
];

export default function AccountingSoftwarePage() {
  return (
    <div className="legacy-service-page overflow-hidden">
      <JsonLd
        data={graph(
          webPageSchema({
            path: service.path,
            name: `ناظر؛ نرم افزار حسابداری و مدیریت مالی در افغانستان | ${companyInfo.brandName}`,
            description,
          }),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            path: service.path,
            // Same name as this service's entry in the Organization offer
            // catalog, which shares the `#service` @id.
            name: service.navLabel,
            description,
            serviceType: service.serviceType,
            offerCatalog: [
              "حسابداری فروشگاهی",
              "خزانه و بانک",
              "دریافت و پرداخت",
              "انبار و کالا",
              "حقوق و دستمزد",
              "گزارش های مدیریتی",
            ],
          }),
          // Nazer is a product, so it is also described as one. Its feature
          // list is exactly the scope panel the hero shows; no platform or
          // screenshot is claimed because the page publishes neither.
          softwareApplicationSchema({
            path: service.path,
            name: "Nazer",
            alternateName: "ناظر؛ نرم افزار حسابداری",
            description,
            images: [],
            applicationSubCategory: "Accounting software",
            operatingSystem: null,
            featureList: nazerScope,
          }),
          faqSchema(faq),
        )}
      />

      <div className="container max-w-7xl sm:px-8 2xl:px-0 mx-auto px-5 pt-32 md:pt-36">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* 1. HERO SECTION */}
      <section className="container max-w-7xl px-5 sm:px-8 2xl:px-0 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 md:pt-12 pb-16 lg:pb-24">
        <div className="min-w-0 flex flex-col gap-4 items-start lg:col-span-7">
          <p className="inline-flex items-center gap-[10px] text-sm bold text-[#0c7668] before:h-[2px] before:w-[22px] before:rounded-full before:bg-[#54dcc6] before:content-['']">ناظر | NAZER · محصول نواتیک</p>
          <h1 className="text-[1.7rem] lg:text-[2.4rem] fat font-black text-gray-900 leading-[1.6]">
            ناظر؛ نرم افزار حسابداری و مدیریت مالی برای کسب و کارهای افغانستان
          </h1>
          <p className="text-gray-700 leading-8 text-base max-w-2xl">
            ناظر محصول حسابداری نواتیک است: ثبت روزانه حسابات، دریافت و پرداخت، مصارف و راپورهای مالی در یک نرم افزار. برای دیدن نرم افزار و بررسی تناسب آن با حسابات کسب و کارتان درخواست دمو بدهید؛ نیازهای اختصاصی شرکت شما نیز در جلسه مشاوره بررسی می‌شود.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link href="#order" className="site-btn inline-flex min-h-[48px] items-center gap-2 bg-[#54dcc6] px-6 text-sm bold text-[#16332e] shadow-[0_14px_28px_-14px_rgba(22,120,104,0.55)] transition-colors hover:bg-[#39cbb5]">
              درخواست دموی ناظر
            </Link>
            <Link href="#nazer-review" className="site-btn inline-flex min-h-[48px] items-center gap-2 bg-white px-6 text-sm bold text-[#16332e] shadow-[0_10px_24px_-16px_rgba(22,51,46,0.4),0_0_0_1px_rgba(22,51,46,0.06)] transition-colors hover:text-[#0c7668]">
              بررسی امکانات در دمو
            </Link>
          </div>
        </div>

        {/* No published Nazer screenshots exist yet, so the visual is the
            product identity and its scope, not a borrowed or mock screen. */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[28px_28px_8px_28px] bg-gradient-to-br from-[#16332e] to-[#0c7668] p-7 text-white shadow-[0_40px_80px_-48px_rgba(22,51,46,0.6)]">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#54dcc6]/25 blur-2xl" aria-hidden="true" />
            <p className="relative text-[2.6rem] fat leading-tight">ناظر</p>
            <p className="relative text-xs tracking-[0.3em] text-white/70" dir="ltr">NAZER · ACCOUNTING</p>
            <ul className="relative mt-6 grid gap-3 text-sm">
              {nazerScope.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                  <CheckCircle size={18} className="shrink-0 text-[#54dcc6]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <NazerOverview />
      <details id="accounting-solutions" className="container max-w-7xl mx-auto px-5 py-8 mb-12 border-y border-[#e2ecea] scroll-mt-28">
        <summary className="bold text-xl cursor-pointer py-3">معلومات تخصصی و راهکارهای اختصاصی حسابداری</summary>
        <p className="text-gray-600 leading-8 py-5">معلومات زیر درباره خدمات حسابداری و راهکارهای قابل شخصی‌سازی نواتیک است؛ دامنه این خدمات با امکانات نسخه آماده ناظر یکسان فرض نمی‌شود.</p>
      {/* 2. PORTFOLIO GRID */}
      <section className="container max-w-7xl mx-auto mb-40 px-5">
        <div className="w-full flex flex-col justify-center items-center gap-5 mb-12">
          <h2 className="text-2xl md:text-3xl fat font-black text-gray-900 text-center">
            راهکارهای اختصاصی در کنار ناظر
          </h2>
          <p className="text-gray-600 text-center text-sm md:text-base">
            نیازهایی که در مشاوره بررسی می‌شوند؛ دامنه هر نسخه در دمو مشخص می‌شود
          </p>
          <p className="text-gray-500 text-center text-xs md:text-sm max-w-2xl leading-7">
            {companyInfo.brandName} نرم افزار حسابداری را برای مدل های مختلف کسب و
            کار شخصی سازی می کند و موارد زیر نمونه ای از نیازهای اجرایی رایج در
            پروژه ها هستند.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-4 gap-5 content-center">
          {accountingModules.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="site-card col-span-1 flex flex-col justify-center items-center gap-3 p-6 bg-white text-center"
              >
                <span className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="bold font-bold text-sm text-gray-900">{item.name}</span>
                <span className="text-xs text-gray-500 leading-6">{item.type}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CTA MIDDLE */}
      <section className="w-full mx-auto mb-28 relative min-h-[550px] md:min-h-[406px] bg-no-repeat bg-[auto_100%] md:bg-cover bg-[url('/images/normal-logo-design/lets-starts-background-lg.jpg')] flex justify-center items-center">
        <div className="w-full h-full z-10 flex flex-col justify-center items-center gap-5 max-w-4xl px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl fat font-black text-gray-900 text-center">
            دریافت دموی سریع
          </h2>
          <p className="text-primary bold font-bold text-center text-lg">
            نرم افزار مناسب کسب و کار خود را سریع تر انتخاب کنید
          </p>
          <p className="text-gray-700 text-center text-sm md:text-base leading-8 max-w-2xl">
            کافی است نوع کسب و کار، حجم عملیات و نیازهای اصلی خود را مشخص کنید
            تا تیم {companyInfo.brandName} مناسب ترین نسخه نرم افزار حسابداری یا
            راهکار سفارشی را پیشنهاد دهد.
          </p>
          <Link
            href="#order"
            className="site-btn bg-[#54dcc6] text-[#16332e] px-10 py-4 bold font-bold text-sm shadow-[0_14px_28px_-14px_rgba(22,120,104,0.55)] hover:bg-[#39cbb5] hover:-translate-y-1 transition-all duration-300 mt-4"
          >
            شروع مشاوره
          </Link>
        </div>
      </section>

      {/* 4. PROCESS */}

      <section className="max-w-full mx-auto mb-20 md:mb-40 sm:px-8 xl:px-0">
        <div className="w-full max-w-4xl mx-auto px-5 flex flex-col justify-center items-center gap-5 mb-12">
          <strong className="heavy font-bold text-primary text-lg">
            خدمات ما
          </strong>
          <span className="text-3xl fat font-black text-gray-900 text-center leading-[50px]">
            با <strong className="text-primary">{companyInfo.brandName}</strong>{" "}
            راهکار مالی متناسب با کسب و کار خود را انتخاب کنید
          </span>
          <p className="leading-8 text-center text-gray-500">
            خدمات نرم افزاری ما از تحلیل نیاز، طراحی ساختار اطلاعات و شخصی سازی
            فرایندها تا آموزش و پشتیبانی بعد از استقرار ادامه پیدا می کند.
          </p>
        </div>
        <div className="bg-[100%_auto] flex select-none justify-center items-center min-h-[300px] bg-bottom bg-no-repeat bg-[url('/images/normal-logo-design/services-background-lg.jpg')] my-10">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 content-center place-content-center place-items-center px-10 md:px-0">
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px] flex-row-reverse md:flex-row">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-1.png 1x, /images/normal-logo-design/services-icon-1.png 2x"
                src="/images/normal-logo-design/services-icon-1.png"
              />
              <span className="md:absolute -top-3 right-0 text-gray-800 text-sm bold text-center">
                تحلیل نیاز و مشاوره
              </span>
              <span className="absolute top-2 left-3 md:bottom-2 md:right-0 flex justify-center items-center bg-[#16332e] w-7 h-7 rounded-full text-white">
                1
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px]">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-2.png 1x, /images/normal-logo-design/services-icon-2.png 2x"
                src="/images/normal-logo-design/services-icon-2.png"
              />
              <span className="md:absolute -bottom-5 text-center md:text-right text-gray-800 text-sm bold">
                طراحی فرم ها و <br /> ماژول های اجرایی
              </span>
              <span className="absolute top-2 right-0 flex justify-center items-center bg-primary w-7 h-7 rounded-full text-white">
                2
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px] flex-row-reverse md:flex-row">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-3.png 1x, /images/normal-logo-design/services-icon-3.png 2x"
                src="/images/normal-logo-design/services-icon-3.png"
              />
              <span className="md:absolute -top-3 right-0 text-gray-800 text-sm bold text-center">
                تحلیل داده ها <br className="block md:hidden" /> و ساختار
                <br className="block md:hidden" /> دیتابیس
              </span>
              <span className="absolute top-2 left-3 md:bottom-2 md:right-0 flex justify-center items-center bg-[#16332e] w-7 h-7 rounded-full text-white">
                3
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px]">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-4.png 1x, /images/normal-logo-design/services-icon-4.png 2x"
                src="/images/normal-logo-design/services-icon-4.png"
              />
              <span className="md:absolute -bottom-5 text-gray-800 text-sm bold">
                تست، بازخورد <br className="block md:hidden" /> و بهینه سازی
              </span>
              <span className="absolute top-2 right-0 flex justify-center items-center bg-primary w-7 h-7 rounded-full text-white">
                4
              </span>
            </div>
            <div className="transition-all duration-300 cursor-pointer hover:scale-105 relative flex justify-evenly md:justify-center items-center col-span-1 w-full md:w-[180px] h-[180px] flex-row-reverse md:flex-row">
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="215"
                height="215"
                decoding="async"
                data-nimg="1"
                className="w-[150px] md:w-[180px]"
                srcSet="/images/normal-logo-design/services-icon-5.png 1x, /images/normal-logo-design/services-icon-5.png 2x"
                src="/images/normal-logo-design/services-icon-5.png"
              />
              <span className="md:absolute -top-3 right-0 text-gray-800 text-sm bold text-center">
                استقرار، آموزش و پشتیبانی
              </span>
              <span className="absolute top-2 left-3 md:bottom-2 md:right-0 flex justify-center items-center bg-[#16332e] w-7 h-7 rounded-full text-white">
                5
              </span>
            </div>
          </div>
        </div>
        <div className="hidden w-full md:flex flex-col justify-center items-center">
          <a
            id="btn2"
            className="site-btn bg-[#16332e] hover:bg-[#0c7668] transition-all duration-300 mt-3 flex justify-center items-center gap-2 px-10 py-4"
            href="#order"
          >
            <span className="bold text-white">درخواست نسخه اختصاصی</span>
            <span className="size-4 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M12.396 16.6l-5.207-5.433a1.706 1.706 0 010-2.334L12.396 3.4"
                ></path>
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* 5. PRICING
          User counts, deployment time and support level read "پس از نیازسنجی"
          until the owner confirms them. The previous values (3 users / 2
          users, deployment "7" / "10" / "15" with no unit, support "1") had no
          source and contradicted each other (the professional plan allowed
          fewer users than the basic one). See docs/phase3-release-readiness.md. */}
      <section className="mb-40">
        <div className="container max-w-7xl mx-auto px-5 w-full flex flex-col justify-center items-center gap-5 mb-14">
          <h2 className="text-2xl md:text-4xl font-iranyekan-fat text-gray-900 text-center">
            پلن های استقرار
          </h2>
          <p className="text-gray-700 text-center font-iranyekan text-sm md:text-base leading-8">
            پلن های زیر برای شروع، توسعه و شخصی سازی راهکارهای مالی در{" "}
            <span className="font-iranyekan-bold text-primary">
              {companyInfo.brandName}
            </span>{" "}
            طراحی شده اند
          </p>
        </div>

        <div className="container max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan 1 */}
            <div className="site-card bg-white overflow-hidden flex flex-col group">
              <div className="p-8 text-center bg-[#f4f9f8] flex flex-col items-center">
                <Image
                  src="/images/star.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  unoptimized
                  className="mb-2"
                />
                <h3 className="font-iranyekan-fat text-2xl text-gray-900 mb-2">
                  پایه
                </h3>
                <div className="text-primary font-iranyekan-bold text-3xl mb-1 flex items-baseline justify-center gap-1">
                  <span>استعلام</span>
                  <span className="text-sm text-gray-500 font-iranyekan">
                    قیمت پس از نیازسنجی
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col gap-4 font-iranyekan text-sm text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>تعداد کاربران</span>
                  <span className="font-iranyekan-bold text-gray-900">
                    پس از نیازسنجی
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>مدت استقرار</span>
                  <span className="font-iranyekan-bold text-gray-900">پس از نیازسنجی</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>نوع پشتیبانی</span>
                  <span className="font-iranyekan-bold text-gray-900">پس از نیازسنجی</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>تعریف سرفصل ها و حساب ها</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>آموزش اولیه تیم مالی</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>گزارشات پایه و خروجی اکسل</span>
                </div>
              </div>
              <div className="p-6">
                <Link
                  href="#order"
                  className="site-btn block w-full py-4 text-center bg-[#16332e] text-white font-iranyekan-bold hover:bg-[#0c7668] transition-colors duration-300"
                >
                  درخواست مشاوره
                </Link>
              </div>
            </div>

            {/* Plan 2 (Highlighted) */}
            <div className="site-card site-card-featured bg-white overflow-hidden flex flex-col md:-translate-y-4 relative">
              <div className="absolute top-0 left-0 right-0 bg-[#54dcc6] text-[#16332e] text-center py-1 text-xs font-iranyekan-bold tracking-wider">
                پیشنهاد ویژه
              </div>
              <div className="p-8 text-center bg-[#eef9f6] flex flex-col items-center mt-6">
                <div className="flex gap-1 mb-2">
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                </div>
                <h3 className="font-iranyekan-fat text-2xl text-gray-900 mb-2">
                  حرفه ای
                </h3>
                <div className="text-primary font-iranyekan-bold text-3xl mb-1 flex items-baseline justify-center gap-1">
                  <span>استعلام</span>
                  <span className="text-sm text-gray-500 font-iranyekan">
                    قیمت پس از نیازسنجی
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col gap-4 font-iranyekan text-sm text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>سطح پوشش</span>
                  <span className="font-iranyekan-bold text-primary">
                    چندبخشی
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>مدت استقرار</span>
                  <span className="font-iranyekan-bold text-gray-900">پس از نیازسنجی</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>تعداد کاربران</span>
                  <span className="font-iranyekan-bold text-gray-900">پس از نیازسنجی</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>تعریف فرایند فروش و خزانه</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>گزارشات مدیریتی سفارشی</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>اتصال به انبار و کالا</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>پشتیبانی راه اندازی</span>
                </div>
              </div>
              <div className="p-6">
                <Link
                  href="#order"
                  className="site-btn block w-full py-4 text-center bg-[#54dcc6] text-[#16332e] font-iranyekan-bold hover:bg-[#39cbb5] transition-colors duration-300"
                >
                  درخواست مشاوره
                </Link>
              </div>
            </div>

            {/* Plan 3 */}
            <div className="site-card bg-white overflow-hidden flex flex-col">
              <div className="p-8 text-center bg-[#f4f9f8] flex flex-col items-center">
                <div className="flex gap-1 mb-2">
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                  <Image
                    src="/images/star.png"
                    alt=""
                  aria-hidden="true"
                    width={24}
                    height={24}
                    unoptimized
                  />
                </div>
                <h3 className="font-iranyekan-fat text-2xl text-gray-900 mb-2">
                  سازمانی
                </h3>
                <div className="text-primary font-iranyekan-bold text-3xl mb-1 flex items-baseline justify-center gap-1">
                  <span>استعلام</span>
                  <span className="text-sm text-gray-500 font-iranyekan">
                    قیمت پس از نیازسنجی
                  </span>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col gap-4 font-iranyekan text-sm text-gray-600">
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>نوع استقرار</span>
                  <span className="font-iranyekan-bold text-primary">
                    اختصاصی
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>مدت استقرار</span>
                  <span className="font-iranyekan-bold text-gray-900">پس از نیازسنجی</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#e9f1ef]">
                  <span>تیم اجرایی</span>
                  <span className="font-iranyekan-bold text-gray-900">
                    تیم کامل
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>تمامی امکانات پلن قبلی</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>طراحی دیتابیس اختصاصی</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>داشبورد مدیریتی و KPI</span>
                </div>
                <div className="flex items-center gap-2 text-[#0c7668]">
                  <CheckCircle size={18} />
                  <span>یکپارچه سازی با سایت و ابزارها</span>
                </div>
              </div>
              <div className="p-6">
                <Link
                  href="#order"
                  className="site-btn block w-full py-4 text-center bg-[#16332e] text-white font-iranyekan-bold hover:bg-[#0c7668] transition-colors duration-300"
                >
                  درخواست مشاوره
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      </details>
      {/* 6. ORDER FORM */}
      <section
        id="order"
        className="container max-w-7xl mx-auto mb-32 px-8 md:px-14 rounded-[36px_36px_10px_36px] shadow-[0_40px_80px_-50px_rgba(22,51,46,0.5),0_2px_12px_-6px_rgba(22,51,46,0.1)] h-auto md:h-[400px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-5 py-10 mt-24 bg-white relative overflow-hidden scroll-mt-[calc(var(--site-header-height,90px)+24px)]"
      >
        {/* Decoration: two soft brand-mint glows. */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#54dcc6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#54dcc6]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="flex flex-col justify-center items-center md:items-start col-span-1 md:col-span-6 gap-4 z-10">
          <h3 className="font-iranyekan-fat text-3xl text-gray-900">
            فرم را پر کنید تا برای دریافت دمو با شما تماس بگیریم
          </h3>
          <p className="text-gray-600 font-iranyekan text-sm leading-8 text-center md:text-right">
            اگر برای انتخاب نسخه مناسب نرم افزار حسابداری، طراحی دیتابیس یا
            یکپارچه سازی فرایندهای مالی نیاز به مشاوره دارید، اطلاعات خود را ثبت
            کنید تا تیم {companyInfo.brandName} با شما تماس بگیرد.
          </p>
        </div>

        <div className="flex w-full md:px-10 flex-col justify-center items-start gap-6 col-span-1 md:col-span-6 z-10">
          <LeadForm source="accounting-demo" className="w-full flex flex-col gap-4">
            <input
              id="accounting-demo-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-label="نام و نام خانوادگی"
              placeholder="نام و نام خانوادگی"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-iranyekan focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <input
              id="accounting-demo-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              aria-label="شماره تماس"
              placeholder="شماره تماس"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm font-iranyekan focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-left"
              dir="ltr"
            />
            <button
              type="submit"
              className="site-btn w-full bg-[#54dcc6] text-[#16332e] py-4 text-sm font-iranyekan-bold hover:bg-[#39cbb5] duration-300 shadow-[0_14px_28px_-14px_rgba(22,120,104,0.55)] mt-2 flex justify-center items-center gap-2"
            >
              <span>ثبت درخواست</span>
              <ShieldCheck size={18} aria-hidden="true" />
            </button>
          </LeadForm>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-5 mb-28">
        <ServiceFaq items={faq} heading="سوالات متداول درباره خدمات حسابداری" />
      </div>

      <RelatedLinks
        serviceKey={service.key}
        caseStudySlugs={service.caseStudies}
      />
    </div>
  );
}
