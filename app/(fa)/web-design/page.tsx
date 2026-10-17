import CorporateDesign from "@/components/web-design/CorporateDesign";

import JsonLd from "@/components/JsonLd";
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

const webDesignFaq = [
  { question: "چه نوع سایت‌هایی طراحی می‌کنید؟", answer: "سایت شرکتی، فروشگاهی و خدماتی؛ همچنین وب‌اپلیکیشن‌هایی که به فرآیندهای داخلی کسب‌وکار متصل می‌شوند. دامنه امکانات بر اساس نیاز پروژه در پیشنهاد همکاری مشخص می‌شود." },
  { question: "آیا سایت روی موبایل هم درست نمایش داده می‌شود؟", answer: "بله. چیدمان صفحات برای موبایل و دسکتاپ طراحی می‌شود و اندازه متن، تصاویر، دکمه‌ها و فرم‌ها در نمایشگرهای مختلف بررسی می‌شوند." },
  { question: "آیا امکان اتصال سایت به حسابداری و انبار وجود دارد؟", answer: "امکان اتصال به سیستم‌های داخلی از طریق API در مرحله نیازسنجی بررسی می‌شود. نوع اطلاعات، دسترسی‌ها و روش هماهنگ‌سازی پیش از اجرا مشخص خواهند شد." },
  { question: "مالکیت سایت و اطلاعات آن با چه کسی است؟", answer: "حدود مالکیت کد، محتوا، دامنه و داده‌ها در قرارداد رسمی مشخص می‌شود. جزئیات تحویل و دسترسی‌های مدیریت پیش از شروع پروژه با شما نهایی خواهد شد." },
  { question: "هزینه و زمان طراحی سایت چگونه مشخص می‌شود؟", answer: "پس از بررسی نوع سایت، تعداد صفحات، محتوای آماده و امکانات اختصاصی، برآورد هزینه و برنامه تحویل ارائه می‌شود. تغییرات خارج از دامنه اولیه نیز پیش از اجرا بررسی خواهند شد." },
  { question: "بعد از تحویل سایت، آموزش و پشتیبانی دارید؟", answer: "آموزش مدیریت محتوا و شیوه پشتیبانی در پیشنهاد و قرارداد همکاری مشخص می‌شود تا مسئولیت نگهداری، رفع مشکلات و توسعه‌های بعدی برای هر دو طرف روشن باشد." },
  { question: "در بازطراحی، چه اتفاقی برای اطلاعات سایت قبلی می‌افتد؟", answer: "پیش از انتقال، ساختار فعلی و محتوای موجود بررسی و نسخه پشتیبان تهیه می‌شود. نقشه انتقال اطلاعات و نشانی صفحات بر اساس وضعیت سایت آماده خواهد شد؛ نتیجه جست‌وجو به عوامل متعددی وابسته است." },
];

export const metadata = buildMetadata({
  fullTitle: `طراحی سایت در هرات و افغانستان | ${companyInfo.brandName}`,
  title: "طراحی سایت",
  description,
  path: service.path,
});

export default function Page() {
  return (
    <>
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
      <CorporateDesign faq={webDesignFaq} />
    </>
  );
}
