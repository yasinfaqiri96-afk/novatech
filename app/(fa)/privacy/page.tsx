import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { buildMetadata } from "@/lib/metadata";
import { companyInfo } from "@/lib/site-content";

export const metadata = buildMetadata({ title: "پالیسی محرمیت", description: "نحوه استفاده نواتیک از معلومات فرم تماس و درخواست دمو، ارسال پیام در واتس‌اپ و راه ارتباط برای پیگیری معلومات شما.", path: "/privacy" });

export default function PrivacyPage() {
  return <article className="container max-w-4xl mx-auto px-5 pt-36 pb-24 text-gray-700 leading-8">
    <JsonLd data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "پالیسی محرمیت", path: "/privacy" }])} />
    <h1 className="text-3xl heavy text-gray-900 mb-8">پالیسی محرمیت نواتیک</h1>
    <h2 className="text-xl bold mt-8 mb-3">معلومات فرم‌ها</h2>
    <p>فرم تماس و دمو نام و شماره تماس شما را می‌گیرد. بسته به فرم، نام شرکت، نوع فعالیت و توضیح نیاز شما نیز گرفته می‌شود. این معلومات برای پاسخ‌دادن، هماهنگی دمو و بررسی درخواست شما استفاده می‌شود. معلومات محرمانه شرکت، رمز یا اسناد مالی را در فرم نفرستید.</p>
    <h2 className="text-xl bold mt-8 mb-3">ارسال و پیگیری درخواست</h2>
    <p>در صورت فعال‌بودن اتصال ارسال، معلومات فرم به مقصد دریافت درخواست‌های شرکت فرستاده می‌شود. اگر ارسال مستقیم فعال نباشد، سایت پیام واتس‌اپ را آماده می‌کند؛ درخواست زمانی به واتس‌اپ شرکت می‌رسد که شما پیام را ارسال کنید. بازکردن واتس‌اپ، معلومات درج‌شده در پیام را در اختیار آن خدمت نیز قرار می‌دهد.</p>
    <h2 className="text-xl bold mt-8 mb-3">راپورهای تخنیکی</h2>
    <p>وب‌سرور و خدمات تحویل سایت ممکن است معلومات تخنیکی درخواست، مانند آدرس IP، مسیر صفحه و زمان مراجعه را برای کارکرد و عیب‌یابی ثبت کنند. کد فرم نام، شماره تماس و متن درخواست را در log برنامه ثبت نمی‌کند. مدت نگهداری معلومات دریافت‌شده در شرکت در این صفحه تعیین نشده است؛ برای جزئیات با ما تماس بگیرید.</p>
    <h2 className="text-xl bold mt-8 mb-3">تماس درباره معلومات شما</h2>
    <p>برای پرسش یا درخواست بررسی، اصلاح یا حذف معلوماتی که فرستاده‌اید، به <a href={`mailto:${companyInfo.email}`} className="text-primary" dir="ltr">{companyInfo.email}</a> پیام بدهید یا با <a href={`tel:${companyInfo.primaryPhoneHref}`} className="text-primary" dir="ltr">{companyInfo.primaryPhoneLabel}</a> تماس بگیرید.</p>
    <Link href="/contact" className="inline-block text-primary mt-8">تماس با نواتیک</Link>
  </article>;
}
