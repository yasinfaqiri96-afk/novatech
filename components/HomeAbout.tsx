import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { teamMembers } from "@/lib/team";
import styles from "./HomeAbout.module.css";

const principles = [
  { number: "۰۱", title: "اول می‌فهمیم", text: "فرآیند مالی و عملیاتی شما را بررسی می‌کنیم؛ راهکار از شناخت مسئله شروع می‌شود.", href: "/business-systems", link: "راهکارهای کسب‌وکار" },
  { number: "۰۲", title: "منسجم می‌سازیم", text: "دیتابیس، نرم‌افزار و سایت را در یک مسیر می‌بینیم؛ برای اطلاعات منظم و کار روزانه ساده‌تر.", href: "/software-solutions", link: "راهکارهای نرم‌افزاری" },
  { number: "۰۳", title: "کنار شما می‌مانیم", text: "با انتقال اطلاعات، آموزش و پشتیبانی، راهکار را به بخشی از جریان واقعی کار تبدیل می‌کنیم.", href: "/contact", link: "شروع گفت‌وگو" },
] as const;

export default function HomeAbout() {
  const member = teamMembers[0];
  return (
    <section className={styles.section} aria-labelledby="home-about-title">
      <div className={styles.container}>
        <div className={styles.story}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}><span /> ما که هستیم؟</p>
            <h2 id="home-about-title">پشت هر راهکار،<br /><span>یک تیم همراه.</span></h2>
            <p className={styles.lead}>ما نواتیک هستیم؛ تیم تحلیل، توسعه و پشتیبانی نرم‌افزار در <Link href="/herat">هرات</Link>، همراه کسب‌وکارهای سراسر افغانستان.</p>
            <p className={styles.description}>فرآیند مالی و عملیاتی کسب‌وکار را بررسی می‌کنیم، دیتابیس آن را طراحی می‌کنیم و سیستمی می‌سازیم که ثبت اطلاعات، گزارش‌گیری و کنترل روزانه را در یک جا جمع کند. <Link href="/web-design">طراحی وب‌سایت</Link> هم بخشی از همین زیرساخت است.</p>
            <blockquote>«ما نرم‌افزار را برای ساده‌تر شدن تصمیم‌های مالی و اجرایی می‌سازیم؛ کنار مشتری می‌مانیم تا راهکار واقعاً در کسب‌وکارش جواب بدهد.»</blockquote>
            <Link href="/about" className={styles.action}>بیشتر با نواتیک آشنا شوید <ArrowUpLeft size={19} strokeWidth={1.5} aria-hidden="true" /></Link>
          </div>
          <figure className={styles.figure}>
            <div className={styles.portrait}><Image src={member.image} alt={member.alt} width={member.width} height={member.height} sizes="(min-width: 1024px) 380px, (min-width: 768px) 38vw, 85vw" /></div>
            <figcaption><span>{member.name}</span><span>{member.role} در نواتیک</span></figcaption>
          </figure>
        </div>
        <div className={styles.principles}>
          {principles.map((principle) => <article key={principle.number}><span className={styles.number} aria-hidden="true">{principle.number}</span><h3>{principle.title}</h3><p>{principle.text}</p><Link href={principle.href}>{principle.link}<ArrowUpLeft size={16} strokeWidth={1.5} aria-hidden="true" /></Link></article>)}
        </div>
      </div>
    </section>
  );
}
