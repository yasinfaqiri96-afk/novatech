import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { companyInfo } from "@/lib/site-content";
import styles from "./Detail.module.css";

function PinkRibbon() {
  return (
    <svg className={styles.pinkRibbon} viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="portfolio-ribbon-colour" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c7f5eb" /><stop offset=".3" stopColor="#149c86" /><stop offset=".55" stopColor="#54dcc6" /><stop offset="1" stopColor="#35b9a1" />
        </linearGradient>
      </defs>
      <g fill="url(#portfolio-ribbon-colour)">
        <path className={styles.ribbonFront} d="M-50 233C126 322 203 213 304 253S414 322 516 263S619 208 717 255S851 230 932 192S1079 206 1150 201S1303 142 1490 21L1490 88C1297 184 1219 254 1139 235S1011 191 929 214S817 300 722 270S633 220 536 273S409 309 301 271S112 322-50 240Z" />
        <path className={styles.ribbonMiddle} opacity=".63" d="M-50 232C119 300 230 212 311 249S432 311 526 251S615 206 714 242S839 241 935 180S1081 210 1173 186S1333 112 1490 12L1490 67C1323 159 1253 229 1160 218S1019 172 933 200S817 286 721 257S623 220 536 267S416 307 303 262S101 316-50 237Z" />
        <path className={styles.ribbonBack} opacity=".4" d="M-50 230C115 306 224 209 316 243S439 306 529 242S621 200 718 235S842 222 938 176S1071 187 1168 182S1338 101 1490 0L1490 48C1334 150 1248 218 1163 207S1035 170 939 188S824 272 720 250S619 215 535 258S420 299 306 252S106 312-50 235Z" />
      </g>
    </svg>
  );
}

export default function PortfolioClosing() {
  return (
    <section className={styles.closing} aria-label="شروع پروژه بعدی">
      <div className={styles.container}>
        <div className={styles.closingIntro}>
          <div className={styles.closingPortrait}>
            <Image src="/images/novatech-support-agent.webp" alt="مشاوره طراحی و توسعه در نواتیک" width={320} height={320} sizes="(min-width: 800px) 30vw, 75vw" />
          </div>
          <div className={styles.closingCopy}>
            <span>از شناخت نیاز تا طراحی و توسعه</span>
            <h2>حضور دیجیتال، در شأن کسب‌وکار شما</h2>
            <p>برای وب‌سایت شرکت یا فروشگاه شما، ساختار محتوا، طراحی رابط کاربری و امکانات فنی را بر اساس نیاز واقعی کسب‌وکارتان بررسی می‌کنیم. درباره پروژه بعدی‌تان با تیم نواتیک گفت‌وگو کنید.</p>
            <Link href="/contact" className={styles.btnOutline}>درخواست مشاوره <ArrowLeft size={15} aria-hidden="true" /></Link>
            <a className={styles.closingPhone} href={`tel:${companyInfo.primaryPhoneHref}`} dir="ltr">{companyInfo.primaryPhoneLabel}</a>
          </div>
        </div>
      </div>
      <PinkRibbon />
      <div className={styles.container}>
        <div className={styles.bannerGrid}>
          <Link href="/web-design" className={styles.designBanner}>
            <div className={styles.bannerCopy}><h3>طراحی سایت شرکتی</h3><span lang="en" dir="ltr">CORPORATE WEBSITE DESIGN</span><p>معرفی حرفه‌ای برند و خدمات شما</p><i><ArrowLeft aria-hidden="true" size={20} /></i></div>
            <div className={styles.bannerDesktop}><Image src="/images/portfolio/ariana-desktop.jpg" alt="نمای طراحی وب‌سایت شرکتی آریانا موتور" width={640} height={900} sizes="(min-width: 800px) 19vw, 38vw" /></div>
          </Link>
          <Link href="/web-design" className={`${styles.designBanner} ${styles.shopBanner}`}>
            <div className={styles.bannerCopy}><h3>طراحی فروشگاه اینترنتی</h3><span lang="en" dir="ltr">E-COMMERCE WEBSITE DESIGN</span><p>تجربه خریدی روشن و دسترسی آسان به محصولات</p><i><ArrowLeft aria-hidden="true" size={20} /></i></div>
            <div className={styles.bannerPhone}><Image src="/images/portfolio/telionix-mobile-detail.webp" alt="نمای موبایل فروشگاه اینترنتی تلیونیکس" width={390} height={6467} sizes="(min-width: 800px) 12vw, 24vw" /></div>
          </Link>
        </div>
        <div className={styles.closingCta}><p>پروژه بعدی، می‌تواند از شما باشد.</p><Link href="/contact" className={styles.btnOutline}>درباره پروژه‌تان صحبت کنیم <ArrowLeft size={15} aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}
