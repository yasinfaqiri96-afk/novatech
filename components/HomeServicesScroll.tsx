import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import styles from "./HomeServicesScroll.module.css";

const services = [
  {
    href: "/web-design", number: "۰۱", label: "حضور دیجیتال",
    title: "طراحی سایت و وب‌اپلیکیشن",
    description: "ویترین حرفه‌ای برند شما و راهی ساده برای ارتباط با مشتری؛ از سایت شرکتی و فروشگاهی تا وب‌اپلیکیشنی که به فرآیندها و داده‌های کسب‌وکار متصل می‌شود.",
    details: ["سایت شرکتی و فروشگاهی", "تجربه کاربری", "توسعه اختصاصی"],
    image: "/images/web.webp", alt: "تصویر معرفی خدمات طراحی سایت نواتیک در مانیتور و موبایل",
  },
  {
    href: "/database-solutions", number: "۰۲", label: "ساختار مطمئن اطلاعات",
    title: "طراحی و توسعه دیتابیس",
    description: "تصمیم‌های بهتر، از اطلاعات منظم شروع می‌شوند. مدل‌سازی داده، انتقال اطلاعات از اکسل و طراحی ساختاری که ثبت روزانه و گزارش‌گیری را به هم پیوند می‌دهد.",
    details: ["مدل‌سازی داده", "انتقال اطلاعات", "گزارش‌گیری"],
    image: "/images/database.webp", alt: "تصویر معرفی طراحی دیتابیس و داشبورد گزارش‌گیری نواتیک",
  },
  {
    href: "/graphic-design", number: "۰۳", label: "زبان بصری برند",
    title: "طراحی گرافیک و هویت بصری",
    description: "تصویری یکپارچه و به‌یادماندنی از کسب‌وکار شما؛ لوگو، هویت بصری و طرح‌های تبلیغاتی که در هر نقطه تماس، داستان یک برند را روایت می‌کنند.",
    details: ["طراحی لوگو", "هویت بصری", "اقلام تبلیغاتی"],
    image: "/images/graphic.webp", alt: "تصویر معرفی طراحی گرافیک و هویت بصری نواتیک",
  },
] as const;

/** The name is retained for existing callers; services now use normal flow. */
export default function HomeServicesScroll() {
  return (
    <section className={styles.section} aria-labelledby="home-services-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}><span /> خدمات نواتیک</p>
            <h2 id="home-services-title">برای هر نیاز،<br /><span>یک راهکار روشن.</span></h2>
          </div>
          <p className={styles.intro}>از اولین تصویر برند تا ساختار پشت صحنه؛<br className={styles.desktopBreak} /> طراحی، تکنولوژی و داده را کنار هم می‌آوریم<br className={styles.desktopBreak} /> تا کسب‌وکار شما منسجم‌تر کار کند.</p>
        </header>
        <div className={styles.list}>
          {services.map((service) => (
            <article key={service.href} className={styles.service}>
              <span className={styles.number} aria-hidden="true">{service.number}</span>
              <div className={styles.content}>
                <p className={styles.label}>{service.label}</p>
                <h3><Link href={service.href}>{service.title}</Link></h3>
                <p className={styles.description}>{service.description}</p>
                <ul className={styles.details} aria-label="حوزه‌های این خدمت">{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <Link href={service.href} className={styles.action}>بیشتر درباره این خدمت <span><ArrowUpLeft size={18} strokeWidth={1.5} aria-hidden="true" /></span></Link>
              </div>
              <Link href={service.href} className={styles.visual} aria-label={`آشنایی با ${service.title}`} tabIndex={-1}>
                <Image src={service.image} alt={service.alt} width={1448} height={1086} sizes="(min-width: 1100px) 480px, (min-width: 768px) 40vw, 92vw" className={styles.artwork} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
