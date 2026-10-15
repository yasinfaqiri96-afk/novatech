/* eslint-disable @next/next/no-img-element */

import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import RelatedLinks from "@/components/RelatedLinks";
import ServiceFaq from "@/components/ServiceFaq";
import WebDesignPricingTabs from "@/components/WebDesignPricingTabs";
import LeadForm from "@/components/LeadForm";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, graph, serviceSchema, webPageSchema } from "@/lib/seo";
import { serviceByKey } from "@/lib/services";
import { companyInfo } from "@/lib/site-content";

const service = serviceByKey["web-design"];

const breadcrumbs = [
  { name: "صفحه اصلی", path: "/" },
  { name: "طراحی سایت", path: service.path },
];

const description =
  "طراحی سایت در هرات و سراسر افغانستان: سایت شرکتی، فروشگاهی و خدماتی که به سیستم های داخلی کسب و کار وصل می شود و روی موبایل درست کار می کند.";

/**
 * Answers are drawn from the plan comparison rendered on this same page, so the
 * FAQ never promises a capability the pricing table does not list. No delivery
 * time, client count or price figure is stated, because the project records
 * none of them.
 */
const webDesignFaq = [
  {
    question: "چه نوع سایت هایی طراحی می کنید؟",
    answer:
      "سایت شرکتی در سه سطح پایه، حرفه ای و اختصاصی، و سایت فروشگاهی در سه سطح حرفه ای، فوق حرفه ای و VIP PRO. سایت های خدماتی هم بر اساس همین ساختارها ساخته می شوند. انتخاب سطح به این بستگی دارد که سایت فقط معرفی کسب و کار است یا قرار است فروش و سفارش را هم مدیریت کند.",
  },
  {
    question: "آیا سایت روی موبایل درست نمایش داده می شود؟",
    answer:
      "بله. نمایش صحیح در موبایل و دسکتاپ (ریسپانسیو) در همه پلن ها هست، نه به عنوان امکان اضافه. بیشتر بازدید کسب و کارهای افغانستان از موبایل است، بنابراین سایت از ابتدا برای همان صفحه چیده می شود.",
  },
  {
    question: "آیا سایت به نرم افزار حسابداری و انبار وصل می شود؟",
    answer:
      "در پلن فروشگاهی VIP PRO امکان اتصال به سیستم حسابداری و انبار نواتیک و انتقال اطلاعات محصول از اکسل یا سیستم قبلی وجود دارد. اگر کسب و کار شما سیستم داخلی دیگری دارد، اتصال از طریق API در جریان نیازسنجی بررسی می شود.",
  },
  {
    question: "مالکیت سایت و اطلاعات آن با کیست؟",
    answer:
      "مالکیت کامل سایت در همه پلن ها با شماست؛ سایت، دیتابیس و محتوا در پایان پروژه در اختیار خود شما قرار می گیرد. کار با قرارداد رسمی انجام می شود.",
  },
  {
    question: "هزینه طراحی سایت چطور محاسبه می شود؟",
    answer:
      "هزینه به نوع سایت، سطح پلن و امکانات اختصاصی مورد نیاز بستگی دارد. ابتدا دامنه کار در جلسه مشاوره مشخص می شود و بعد برآورد دقیق ارائه می گردد؛ قیمت گذاری پیش از نیازسنجی معمولاً بعداً با هزینه های اضافه جبران می شود.",
  },
  {
    question: "بعد از تحویل سایت، آموزش و پشتیبانی دارید؟",
    answer:
      "بله. آموزش کاربران و پشتیبانی به همراه قرارداد رسمی ارائه می شود تا خودتان بتوانید محتوا، محصول و صفحات سایت را مدیریت کنید. بکاپ منظم هم بخشی از سرویس است.",
  },
  {
    question: "برای سرعت و دیده شدن سایت در گوگل چه کاری انجام می دهید؟",
    answer:
      "بهینه سازی سرعت سایت، فشرده سازی کدها و فعال سازی سیستم کش انجام می شود و در پلن های بالاتر چک لیست سئو اولیه هم اجرا می گردد. اجرای پروتکل امنیتی SSL در همه پلن ها هست، چون گوگل و مرورگرها سایت بدون آن را امن نمی دانند.",
  },
];

export const metadata = buildMetadata({
  fullTitle: `طراحی سایت در هرات و افغانستان | ${companyInfo.brandName}`,
  title: "طراحی سایت",
  description,
  path: service.path,
});

export default function Page() {
  return (
    <div className="legacy-service-page min-h-screen relative max-w-[1480px] mx-auto pb-10 w-full bg-white overflow-x-hidden">
      <JsonLd
        data={graph(
          webPageSchema({
            path: service.path,
            name: `طراحی سایت در هرات و افغانستان | ${companyInfo.brandName}`,
            description,
          }),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            path: service.path,
            name: "طراحی سایت",
            description,
            serviceType: service.serviceType,
            offerCatalog: [
              "طراحی سایت شرکتی",
              "طراحی سایت فروشگاهی",
              "طراحی سایت خدماتی",
              "طراحی وب اپلیکیشن",
              "اتصال سایت به سیستم های داخلی",
            ],
          }),
          // Built from the same array the FAQ section renders below, so every
          // marked-up question and answer is visible on the page.
          faqSchema(webDesignFaq),
        )}
      />
      <div className="max-w-7xl m-auto px-5 md:px-0 pt-28 md:pt-24">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div
        id="order"
        className="max-w-7xl m-auto grid px-3 md:px-0 pt-8 md:pt-6 grid-cols-1 lg:grid-cols-2 mt-0 md:mt-6"
      >
        <div className="relative hidden justify-center items-center z-20 pt-16 lg:flex">
          <img
            alt=""
                  aria-hidden="true"
            loading="lazy"
            width="650"
            height="650"
            decoding="async"
            data-nimg="1"
            className="z-10 max-w-[90%]"
            src="/images/portfolio/mobddddile.svg"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center lg:items-start px-5 z-20">
          <h1 className="text-xl md:text-3xl text-primary text-justify md:w-[80%] font-bold heavy line-clamp-3 fat leading-normal">
            طراحی سایت در هرات؛ سایت شرکتی، فروشگاهی و خدماتی
          </h1>
          <div className="flex w-full md:w-[80%] flex-col gap-5 mt-5">
            <span className="font-bold text-gray-700">
              شماره خود را ثبت کنید تا کارشناسان ما با شما تماس بگیرند
            </span>
            <LeadForm
              source="web-design-hero"
              id="web-design-order-form1"
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                aria-label="نام و نام خانوادگی"
                className="rounded-2xl px-3 py-3 focus:outline-none focus:shadow-lg transition-all duration-300"
                id="web-design-hero-name"
                placeholder="نام و نام خانوادگی"
              />
              <input
                type="tel"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                required
                aria-label="شماره تلفن تماس"
                className="rounded-2xl px-3 py-3 placeholder:text-right focus:outline-none focus:shadow-lg transition-all duration-300"
                id="web-design-hero-phone"
                placeholder="شماره تلفن تماس"
              />
              <button
                type="submit"
                className="py-4 bg-primary hover:opacity-90 transition-all duration-300 text-white font-bold rounded-xl w-full disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {" "}
                ثبت درخواست جهت مشاوره
              </button>
            </LeadForm>
          </div>
        </div>
      </div>
      <WebDesignPricingTabs />
      <div
        id="why-trust"
        className="max-w-5xl m-auto mt-16 md:mt-20 px-5 xl:px-0"
      >
        <div className="flex flex-col justify-center items-start md:items-center gap-2 md:gap-5 w-full">
          <span className="text-gray-500 font-bold text-sm">
            دلایل انتخاب {companyInfo.brandName}
          </span>
          <h2 className="text-primary font-bold fat text-3xl mb-3 leading-normal">
            چرا
            <b className="text-[#0F0F0F] leading-normal">
              {" "}
              برای طراحی سایت به {companyInfo.brandName}{" "}
            </b>
            اعتماد کنیم؟
          </h2>
          <p className="text-gray-700 font-bold leading-7 text-justify">
            {companyInfo.brandName} با تجربه توسعه سایت، نرم افزار و پایگاه داده،
            طراحی وب را به عنوان بخشی از زیرساخت رشد کسب و کار می بیند. خروجی ما
            فقط زیبا نیست؛ برای جذب مشتری، مدیریت بهتر و توسعه پذیر بودن هم
            طراحی می شود.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5 md:mt-10 gap-4 xl:gap-10">
          <div className="col-span-2 md:pl-10 relative h-auto flex justify-center items-center">
            {/* A real screenshot of delivered work, not an ornament, so it
                carries a describing alt instead of being hidden. */}
            <img
              alt={`نمونه سایت شرکتی طراحی شده توسط ${companyInfo.brandName}`}
              loading="lazy"
              width="800"
              height="800"
              decoding="async"
              data-nimg="1"
              className="rounded-xl w-full h-auto cursor-pointer z-10"
              src="/images/portfolio/site.webp"
            />
          </div>
          <div className="col-span-1 flex flex-col gap-2 py-5">
            <span className="text-gray-500 font-bold text-sm">
              تیم تخصصی {companyInfo.brandName}
            </span>
            <h2 className="text-gray-950 font-bold fat text-2xl mb-6">
              اعتماد شما، اعتبار ماست
            </h2>
            <div className="grid place-items-start grid-cols-1 gap-5">
              <div className="flex justify-center items-center gap-2">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="60"
                  height="60"
                  decoding="async"
                  data-nimg="1"
                  src="/images/design-landings/box-04.png"
                />
                <p className="flex flex-col justify-center items-start">
                  <span className="font-bold text-lg">سایت متصل به سیستم</span>
                  <span className="text-gray-600 text-sm">
                    امکان اتصال سایت به حسابداری، انبار و سایر سیستم های داخلی
                  </span>
                </p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="60"
                  height="60"
                  decoding="async"
                  data-nimg="1"
                  src="/images/design-landings/box-03.png"
                />
                <p className="flex flex-col justify-center items-start">
                  <span className="font-bold text-lg">مالکیت کامل کد و داده</span>
                  <span className="text-gray-600 text-sm">
                    سایت، دیتابیس و محتوا در پایان پروژه کاملاً در اختیار شماست
                  </span>
                </p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="60"
                  height="60"
                  decoding="async"
                  data-nimg="1"
                  src="/images/design-landings/box-02.png"
                />
                <p className="flex flex-col justify-center items-start">
                  <span className="font-bold text-lg">تیم نرم افزاری، نه فقط طراح</span>
                  <span className="text-gray-600 text-sm">
                    همان تیمی که سیستم های عملیاتی می سازد، سایت شما را هم توسعه می دهد
                  </span>
                </p>
              </div>
              <div className="flex justify-center items-center gap-2">
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width="60"
                  height="60"
                  decoding="async"
                  data-nimg="1"
                  src="/images/design-landings/box-01.png"
                />
                <p className="flex flex-col justify-center items-start">
                  <span className="font-bold text-lg">پشتیبانی بعد از تحویل</span>
                  <span className="text-gray-600 text-sm">
                    آموزش کاربران و پشتیبانی پس از راه اندازی سایت
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center gap-10 max-w-6xl mx-auto mt-28 px-5">
        <div className="w-full flex-col justify-center items-start gap-4 flex">
          <h2 className="fat text-3xl font-black">
            سایت شما بخشی از{" "}
            <strong className="text-primary">زیرساخت کسب و کار</strong> است
          </h2>
          <span className="text-gray-600 text-sm bold leading-8">
            وب سایت هایی که {companyInfo.brandName} تحویل داده، از فروشگاه لباس
            کودک در آلمان تا شفاخانه و نمایندگی موتورسیکلت در افغانستان، همگی
            روی یک اصل ساخته شده اند: ساختار محتوا و داده باید قابل مدیریت باشد
            و در صورت نیاز بتواند به سیستم های داخلی مثل حسابداری و انبار وصل
            شود. نمونه کارها را در بخش{" "}
            <strong className="text-primary">نمونه کارها</strong> ببینید.
          </span>
        </div>
      </div>
      <section id="web-design-faq" className="max-w-5xl mx-auto mt-16 md:mt-20 px-5 xl:px-0 relative z-20">
        <ServiceFaq items={webDesignFaq} heading="سوالات متداول درباره طراحی سایت" />
      </section>

      <RelatedLinks serviceKey={service.key} />
    </div>
  );
}
