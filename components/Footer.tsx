import Image from "next/image";
import IntentLink from "@/components/IntentLink";
import { ArrowUp, Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import styles from "./Footer.module.css";
import { companyInfo } from "@/lib/site-content";

// Four distinct services, the same four the home page presents. Business systems and
// ERP are database/software work under another name, so listing them beside those two
// read as overlapping services; their pages stay reachable from related-service strips,
// articles and the sitemap.
const serviceLinks = [
  { href: "/web-design", label: "طراحی سایت" },
  { href: "/software-solutions", label: "نرم‌افزار اختصاصی" },
  { href: "/database-solutions", label: "طراحی و توسعه دیتابیس" },
  { href: "/graphic-design", label: "طراحی گرافیک" },
];

const productLinks = [
  { href: "/oil-and-gas-software", label: "مشعل؛ ERP نفت و گاز" },
  { href: "/accounting-software", label: "ناظر؛ حسابداری و مدیریت مالی" },
  { href: "/oil-and-gas-software/features", label: "امکانات مشعل" },
];

const companyLinks = [
  { href: "/about", label: "درباره نواتیک" },
  { href: "/portfolio", label: "نمونه‌کارها" },
  { href: "/blog", label: "مقالات و راهنماها" },
  { href: "/herat", label: "نواتیک در هرات" },
  { href: "/contact", label: "تماس با ما" },
];

// Both lead to the web-design order form, where these two services are requested.
const featureBanners = [
  // `-banner` files: the originals with their white background cut to alpha, so the shadow follows the artwork.
  { href: "/web-design#order", image: "/images/web-design-reference/ecommerce-banner.webp", alt: "طراحی فروشگاه اینترنتی؛ ویترین آنلاین کسب‌وکار شما" },
  { href: "/web-design#order", image: "/images/web-design-reference/seo-banner.webp", alt: "سئو و بهینه‌سازی سایت؛ نقشه راه موفقیت در جست‌وجو" },
];

const navGroups = [
  { title: "خدمات", label: "خدمات نواتیک", links: serviceLinks },
  { title: "محصولات", label: "محصولات نواتیک", links: productLinks },
  { title: "نواتیک", label: "نواتیک", links: companyLinks },
];

export default function Footer() {
  return (
    <footer className={`${styles.root} defer-render`}>
      {/* Two service banners on every page, above the footer body. The artwork
          carries its own title and arrow, so the image alt names each link. */}
      <section className={styles.banners} aria-label="خدمات ویژه نواتیک">
        {featureBanners.map((banner) => (
          <IntentLink key={banner.image} href={banner.href} className={styles.banner}>
            <Image
              src={banner.image}
              alt={banner.alt}
              width={1650}
              height={750}
              sizes="(max-width: 640px) calc(100vw - 32px), 590px"
              className={styles.bannerImage}
            />
          </IntentLink>
        ))}
      </section>

      <div className={styles.sheet}>
        <div className={styles.shell}>
          <div className={styles.main}>
            <div className={styles.brand}>
              <IntentLink href="/" aria-label="صفحه اصلی نواتیک" className={styles.logoLink}>
                <Image
                  src="/images/novatech-logo-v2.webp"
                  alt={`لوگوی ${companyInfo.brandName}`}
                  width={1796}
                  height={496}
                  sizes="150px"
                  className={styles.logo}
                />
              </IntentLink>
              <p>
                شرکت نرم‌افزاری و تکنالوژی در هرات؛ نرم‌افزار اختصاصی، دیتابیس، وب‌سایت و هویت بصری برای کسب‌وکارهای افغانستان.
              </p>
              <div className={styles.socials}>
                <a className={styles.social} href={companyInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="واتس‌اپ نواتیک">
                  <MessageCircle size={17} strokeWidth={1.7} aria-hidden="true" />
                </a>
                <a className={styles.social} href={companyInfo.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام نواتیک">
                  <Camera size={17} strokeWidth={1.7} aria-hidden="true" />
                </a>
                <a className={styles.social} href={`mailto:${companyInfo.email}`} aria-label="ایمیل نواتیک">
                  <Mail size={17} strokeWidth={1.7} aria-hidden="true" />
                </a>
              </div>
            </div>

            {navGroups.map((group) => (
              <nav key={group.title} className={styles.col} aria-label={group.label}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((item) => (
                    <li key={item.href}><IntentLink href={item.href}>{item.label}</IntentLink></li>
                  ))}
                </ul>
              </nav>
            ))}

            <address className={styles.contact}>
              <h3>در تماس باشید</h3>
              <a href={`tel:${companyInfo.primaryPhoneHref}`} className={styles.phone}>
                <span className={styles.contactIcon}><Phone size={16} strokeWidth={1.7} aria-hidden="true" /></span>
                <span dir="ltr">{companyInfo.primaryPhoneLabel}</span>
              </a>
              <a href={`tel:${companyInfo.secondaryPhoneHref}`} className={styles.phone}>
                <span className={styles.contactIcon}><Phone size={16} strokeWidth={1.7} aria-hidden="true" /></span>
                <span dir="ltr">{companyInfo.secondaryPhoneLabel}</span>
              </a>
              <a href={`mailto:${companyInfo.email}`}>
                <span className={styles.contactIcon}><Mail size={16} strokeWidth={1.7} aria-hidden="true" /></span>
                <span>{companyInfo.email}</span>
              </a>
              <span>
                <span className={styles.contactIcon}><MapPin size={16} strokeWidth={1.7} aria-hidden="true" /></span>
                <span>{companyInfo.address}</span>
              </span>
            </address>
          </div>

          <div className={styles.bottom}>
            <span>© {companyInfo.legalName} · {companyInfo.addressCity}، افغانستان</span>
            <div className={styles.bottomLinks}>
              <IntentLink href="/privacy">پالیسی محرمیت</IntentLink>
              <span className={styles.dot} aria-hidden="true" />
              <span dir="ltr">{companyInfo.websiteLabel}</span>
              <a href="#header" className={styles.toTop} aria-label="بازگشت به بالای صفحه">
                <ArrowUp size={16} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
