"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Check, Play } from 'lucide-react';

/* eslint-disable @next/next/no-img-element */

import HomeHero from "@/components/HomeHero";
import HomeSlidersInit from "@/components/HomeSlidersInit";
import HomeServicesScroll from "@/components/HomeServicesScroll";
import MotionShowcase from "@/components/motion-showcase/MotionShowcase";
import HomeTeamScroll from "@/components/HomeTeamScroll";
import ClientLogosSlider from "@/components/ClientLogosSlider";
import HomeProducts from "@/components/HomeProducts";
import HomePortfolioShowcase from "@/components/HomePortfolioShowcase";
import BannerScroll from "@/components/BannerScroll";
import { companyInfo } from "@/lib/site-content";

const whyUsItems = [
  {
    title: "تحلیل قبل از کدنویسی",
    description: "پیش از توسعه، فرایند مالی و عملیاتی کسب و کار شما بررسی و ساختار داده آن طراحی می شود.",
  },
  {
    title: "مشاوره رایگان",
    description: "برای انتخاب نسخه و دامنه کار، پیش از هر تعهدی مشاوره رایگان دریافت می کنید.",
  },
  {
    title: "از نیازسنجی تا پشتیبانی",
    description: "تحلیل، طراحی دیتابیس، توسعه، انتقال اطلاعات، آموزش و پشتیبانی را یک تیم انجام می دهد.",
  },
  {
    title: "شفافیت در دامنه و هزینه",
    description: "دامنه کار و هزینه پیش از شروع مشخص می شود؛ بدون هزینه پنهان و مرحله اضافی.",
  },
  {
    title: "قابل توسعه در آینده",
    description: "سیستم و دیتابیس طوری ساخته می شود که افزودن ماژول و شعبه جدید نیاز به بازنویسی نداشته باشد.",
  },
];

export default function HomeClient() {
  return (
    <>
      <div className="w-full overflow-x-clip">
      <HomeSlidersInit />
      <HomeHero />
      <HomeProducts />
      <ClientLogosSlider />
      <MotionShowcase />
      <HomeServicesScroll />
      <div className="sm:px-20 px-4 pt-[50px] lg:pt-[30px] mx-auto px-auto max-w-screen-2xl lg:px-0">
        <div className="lg:grid lg:grid-cols-2">
          <div className="relative">
            <div className="absolute hidden shadow-lg lg:flex bg-white bottom-[30%] left-[10%] gap-7 border-[1px] rounded-lg p-3 border-[#E5E5E5]">
              <div className="w-[50px] h-[50px] shadow-lg items-center text-center justify-center flex rounded-full" style={{ backgroundColor: '#e6f9f5' }}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 496 512"
                  className="text-2xl"
                  style={{ color: '#54dcc6' }}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 144c23.8 0 52.7 29.3 56 71.4.7 8.6-10.8 11.9-14.9 4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5 17c-4.1 7.3-15.6 4-14.9-4.5 3.1-42.1 32-71.4 55.8-71.4zm-160 0c23.8 0 52.7 29.3 56 71.4.7 8.6-10.8 11.9-14.9 4.5l-9.5-17c-7.7-13.7-19.2-21.6-31.5-21.6s-23.8 7.9-31.5 21.6l-9.5 17c-4.2 7.4-15.6 4-14.9-4.5 3.1-42.1 32-71.4 55.8-71.4zm80 280c-60.6 0-134.5-38.3-143.8-93.3-2-11.9 9.4-21.6 20.7-17.9C155.1 330.5 200 336 248 336s92.9-5.5 123.1-15.2c11.4-3.7 22.6 6.1 20.7 17.9-9.3 55-83.2 93.3-143.8 93.3z"></path>
                </svg>
              </div>
              <div>
                <span className="flex heavy font text-xl justify-end" style={{ color: '#54dcc6' }}>
                  ۶
                </span>
                <span className="bold text-gray-900">حوزه تخصصی نرم افزار</span>
              </div>
            </div>
            <div className="absolute hidden shadow-lg lg:flex bg-white bottom-[14%] left-[15%] gap-7 border-[1px] rounded-lg p-3 border-[#E5E5E5]">
              <div>
                <span className="flex heavy font text-xl justify-end" style={{ color: '#54dcc6' }}>
                  ۹
                </span>
                <span className="bold text-gray-900">پروژه تحویل شده</span>
              </div>
              <div className="w-[50px] h-[50px] shadow-lg items-center text-center justify-center flex rounded-full" style={{ backgroundColor: '#e6f9f5' }}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="text-2xl"
                  style={{ color: '#54dcc6' }}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
                  ></path>
                </svg>
              </div>
            </div>
            <Image
              alt="تیم نواتیک در دفتر شرکت"
              loading="lazy"
              /* The source is square (4096x4096). Declaring a non-square box
                 made the browser reserve 779px and then shrink to 662px once
                 the file arrived, which was the largest layout shift on the
                 home page. */
              width={662}
              height={662}
              sizes="(min-width: 1024px) 662px, 0px"
              className="lg:block hidden select-none"
              src="/images/portfolio/novatech-team.webp"
            />
          </div>
          <div className="flex flex-col items-center mb-8 lg:mt-20 lg:justify-start lg:ml-[130px] lg:items-start">
            <div className="lg:col-span-2 gap-3 lg:grid lg:justify-start">
              <h2 className="flex md:text-3xl text-[26px]">
                <span className="heavy">شرکت نواتیک</span>{" "}
                <span className="light">| ما که هستیم؟</span>
              </h2>
              <img
                alt=""
                aria-hidden="true"
                loading="lazy"
                width="129"
                height="19"
                decoding="async"
                data-nimg="1"
                className="flex select-none"
                src="/images/signature.jpg"
              />
            </div>
            <div className="mt-8 text-[#242A32] mx-auto lg:text-right text-justify lg:mx-0 light leading-[30px]">
              <strong className="medium">نواتیک</strong>{" "}
              تیم تحلیل، توسعه و پشتیبانی نرم افزار در{" "}
              <Link href="/herat" className="underline decoration-primary/50 underline-offset-4 transition-colors duration-200 hover:text-primary">
                هرات
              </Link>{" "}
              است و به شرکت ها و سازمان های سراسر افغانستان خدمات تکنالوژی
              معلوماتی می دهد. ما فرایند مالی و عملیاتی کسب و کار را بررسی
              می کنیم، دیتابیس آن را طراحی می کنیم و سیستمی می سازیم که ثبت
              اطلاعات، گزارش گیری و کنترل روزانه را در یک جا جمع کند.{" "}
              <Link href="/web-design" className="underline decoration-primary/50 underline-offset-4 transition-colors duration-200 hover:text-primary">
                طراحی ویب سایت
              </Link>{" "}
              هم بخشی از همین زیرساخت است.
            </div>
            <Image
              alt="تیم نواتیک در دفتر شرکت"
              loading="lazy"
              width={504}
              height={504}
              sizes="(max-width: 1023px) 92vw, 0px"
              className="mr-0 mt-6 items-start max-w-full lg:hidden"
              src="/images/portfolio/novatech-team.webp"
            />
            <div className="my-10">
              <div className="flex justify-center items-center lg:justify-start mt-5">
                <img
                  alt=""
                aria-hidden="true"
                  loading="lazy"
                  width="28.5"
                  height="30"
                  decoding="async"
                  data-nimg="1"
                  className="w-fit"
                  src="/images/quote-up.png"
                />
                <span className="flex pt-2 flex-col2 heavy mr-1 my-auto text-[20px]">
                  سخن مدیر عامل
                </span>
              </div>
              <div className="flex medium leading-[30px] text-justify mt-4 mx-auto text-md lg:mx-0">
                «ما نرم افزار را برای ساده تر شدن تصمیم های مالی و اجرایی
                می سازیم؛ کنار مشتری می مانیم تا راهکار واقعا در کسب و کارش جواب
                بدهد.»
              </div>
            </div>
            <a></a>
          </div>
        </div>
      </div>
      <HomePortfolioShowcase />
      <BannerScroll />
      <section className="w-full px-6 md:px-12 lg:px-32 mt-20 lg:mt-28 mb-12 lg:mb-16 flex flex-col gap-6 lg:gap-10">
        <div className="w-full bg-transparent shadow-none rounded-2xl lg:rounded-3xl p-6 lg:p-12 flex flex-col gap-4 md:gap-6 items-center relative z-10">
          <h2 className="fat text-center flex flex-col gap-2 lg:gap-4 !block lg:!text-3xl !text-primary">
            چرا توسعه نرم افزار و دیتابیس را به {companyInfo.brandName} بسپارید؟
          </h2>
          <p className="text-center text-gray-600 mt-2">
            ساخت یک سیستم عملیاتی فقط کدنویسی نیست؛ ما تحلیل فرایند، طراحی دیتابیس، استقرار و انتقال اطلاعات را با هم پیش می بریم.
          </p>

          <div className="relative w-full overflow-clip rounded-2xl h-fit grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5 mt-5 lg:mt-10">
            <div className="flex flex-col gap-4">
              {whyUsItems.map((item) => (
                <div key={item.title} className="flex flex-col justify-center items-start rounded-xl rounded-tl-full rounded-br-full bg-gradient-to-l from-gray-300 to-transparent w-full py-4 gap-2 px-10 lg:px-16">
                  <div className="flex justify-start gap-2 items-center">
                    <Check className="text-green-600 size-5" />
                    <span className="fat text-sm text-gray-600">{item.title}</span>
                  </div>
                  <div className="flex flex-col w-full gap-4 mr-7">
                    <span className="bold text-xs/5 text-gray-500">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:h-full rounded-[59%_41%_57%_43%_/_20%_54%_46%_59%] overflow-hidden relative flex justify-center items-center min-h-[380px] md:min-h-[500px]">
              <Image src="/images/portfolio/site.webp" alt="نمایی از داشبورد یکی از سامانه های نواتیک" width={1600} height={914} sizes="(min-width: 1024px) 50vw, 100vw" className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover" />
              <div className="absolute size-full bg-black/50 flex justify-center items-center">
                <Link
                  href="/portfolio"
                  aria-label="مشاهده نمونه سامانه های نواتیک"
                  className="size-20 hover:scale-110 transition-all duration-300 rounded-full bg-primary animated-wave-red flex justify-center items-center"
                >
                  <Play className="text-white fill-white ml-1" size={40} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
        <HomeTeamScroll />
      </div>

    </>
  );
}
