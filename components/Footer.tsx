import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, ChevronDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { mashalNavigationGroups } from "@/lib/mashal-navigation";

import styles from "./Footer.module.css";
import { companyInfo } from "@/lib/site-content";

const serviceLinks = [
  { href: "/software-solutions", label: "نرم افزار اختصاصی" },
  { href: "/database-solutions", label: "طراحی و توسعه دیتابس" },
  { href: "/business-systems", label: "سیستم‌های مدیریتی" },
  { href: "/erp", label: "سیستم ERP" },
  { href: "/web-design", label: "طراحی سایت" },
];

const productLinks = [
  { href: "/oil-and-gas-software", label: "مشعل؛ ERP نفت و گاز" },
  { href: "/accounting-software", label: "ناظر؛ حسابداری و مدیریت مالی" },
  { href: "/oil-and-gas-software/features", label: "امکانات مشعل" },
  { href: "/portfolio", label: "نمونه کارها" },
];

const companyLinks = [
  { href: "/about", label: "درباره نواتیک" },
  { href: "/herat", label: "نواتیک در هرات" },
  { href: "/blog", label: "مطالب و راهنماها" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Footer() {
  return (
    <footer className={styles.root}>
      {/* One promotional banner for every page, set apart from the light
          footer by its deep brand teal. */}
      <section className={styles.promoWrap} aria-labelledby="footer-promo-title">
        <div className={styles.promo}>
          <div className={styles.promoCopy}>
            <span className={styles.promoKicker}>مشاوره رایگان و بدون تعهد</span>
            <h2 id="footer-promo-title" className={styles.promoTitle}>
              سیستم بعدی کسب و کارتان را <span>با یک گفت‌وگو</span> شروع کنید
            </h2>
            <p className={styles.promoText}>
              نیازتان را می‌شنویم و روشن‌ترین مسیر را پیشنهاد می‌کنیم؛ از نرم افزار و دیتابس تا وب‌سایت.
            </p>
            <div className={styles.promoActions}>
              <Link href="/contact" className={styles.promoPrimary}>
                درخواست مشاوره
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
              <a href={`tel:${companyInfo.primaryPhoneHref}`} className={styles.promoSecondary}>
                <Phone size={16} aria-hidden="true" />
                <span dir="ltr">{companyInfo.primaryPhoneLabel}</span>
              </a>
            </div>
          </div>
          <div className={styles.promoPortrait} aria-hidden="true">
            <Image
              src="/images/novatech-support-agent.webp"
              alt=""
              width={320}
              height={320}
              sizes="(min-width: 900px) 220px, 0px"
              className={styles.promoImage}
            />
          </div>
        </div>
      </section>

      <div className={styles.shell}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="/" aria-label="صفحه اصلی نواتیک">
              <Image
                src="/images/novatech-logo-v2.webp"
                alt={`لوگوی ${companyInfo.brandName}`}
                width={1796}
                height={496}
                sizes="160px"
                className={styles.logo}
              />
            </Link>
            <p>
              شرکت نرم افزاری و تکنالوژی در هرات؛ نرم افزار اختصاصی، دیتابس، سیستم‌های مدیریتی و وب‌سایت برای کسب و کارهای افغانستان.
            </p>
            <div className={styles.socials}>
              <a className={styles.social} href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="واتس‌اپ نواتیک">
                <MessageCircle size={17} aria-hidden="true" />
              </a>
              <a className={styles.social} href={companyInfo.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام نواتیک">
                <Camera size={17} aria-hidden="true" />
              </a>
              <a className={styles.social} href={`mailto:${companyInfo.email}`} aria-label="ایمیل نواتیک">
                <Mail size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav className={styles.col} aria-label="خدمات نواتیک">
            <h3>خدمات</h3>
            <ul>
              {serviceLinks.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="محصولات نواتیک">
            <h3>محصولات</h3>
            <ul>
              {productLinks.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-label="نواتیک">
            <h3>نواتیک</h3>
            <ul>
              {companyLinks.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <address className={styles.contact}>
            <h3>تماس</h3>
            <a href={`tel:${companyInfo.primaryPhoneHref}`}><Phone size={15} aria-hidden="true" /><span dir="ltr">{companyInfo.primaryPhoneLabel}</span></a>
            <a href={`tel:${companyInfo.secondaryPhoneHref}`}><Phone size={15} aria-hidden="true" /><span dir="ltr">{companyInfo.secondaryPhoneLabel}</span></a>
            <a href={`mailto:${companyInfo.email}`}><Mail size={15} aria-hidden="true" />{companyInfo.email}</a>
            <span><MapPin size={15} aria-hidden="true" />{companyInfo.address}</span>
          </address>
        </div>

        {/* The guide index sits in its own full-width row: opening it grows the
            footer downwards in an even grid instead of stretching one column. */}
        <details className={styles.guides}>
          <summary>
            راهنماهای مشعل
            <ChevronDown size={16} aria-hidden="true" className={styles.guidesIcon} />
          </summary>
          <div className={styles.guideGrid}>
            {mashalNavigationGroups.map((group) => (
              <div key={group.title} className={styles.guideGroup}>
                <h4>{group.title}</h4>
                <ul>
                  {group.links.map((item) => (
                    <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>

        <div className={styles.bottom}>
          <span>© {companyInfo.legalName} · {companyInfo.addressCity}، افغانستان</span>
          <div className={styles.bottomLinks}>
            <Link href="/privacy">پالیسی محرمیت</Link>
            <span>{companyInfo.websiteLabel}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
