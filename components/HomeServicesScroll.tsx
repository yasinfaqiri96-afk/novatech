"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import styles from "./HomeServicesScroll.module.css";

const services = [
  { href: "/web-design", number: "01", title: "طراحی سایت", description: "سایت شرکتی و فروشگاهی، متناسب با برند و نیاز شما.", image: "website", alt: "طراحی وب‌سایت نواتیک", action: "جزئیات" },
  { href: "/software-solutions", number: "02", title: "نرم‌افزار اختصاصی", description: "سامانه‌هایی متناسب با فرایندهای کسب‌وکار شما.", image: "software", alt: "نرم‌افزار اختصاصی نواتیک", action: "جزئیات" },
  { href: "/database-solutions", number: "03", title: "طراحی دیتابیس", description: "ساختاری امن و منظم برای ثبت و گزارش‌گیری داده‌ها.", image: "database", alt: "طراحی دیتابیس نواتیک", action: "جزئیات" },
  { href: "/graphic-design", number: "04", title: "طراحی گرافیک", description: "لوگو و هویت بصری یکپارچه برای برند شما.", image: "graphic-design", alt: "طراحی گرافیک نواتیک", action: "جزئیات" },
  { href: "/contact", number: "05", title: "دامنه و هاست", description: "ثبت دامنه و میزبانی مطمئن برای وب‌سایت شما.", image: "domain-hosting", alt: "خدمات دامنه و هاست نواتیک", action: "مشاوره" },
] as const;

export default function HomeServicesScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const stages = Array.from(track.querySelectorAll<HTMLElement>("[data-service-stage]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = -1;
    let visible = true;
    let stickyTop = 0;
    let stickyStep = 0;
    const measure = () => {
      const computed = getComputedStyle(track);
      stickyTop = parseFloat(computed.getPropertyValue("--stack-top"));
      stickyStep = parseFloat(computed.getPropertyValue("--stack-step"));
      const tallest = Math.max(...stages.map(stage => (stage.firstElementChild as HTMLElement).offsetHeight));
      // Only stack when every card, including its final action, fits below the header.
      track.dataset.sticky = String(!reduced.matches && window.innerHeight >= tallest + stickyTop + stickyStep * (stages.length - 1) + 20);
    };
    const update = () => {
      frame = 0;
      if (!visible) return;
      let nextActive = 0;
      const bounds = stages.map(stage => stage.getBoundingClientRect());
      stages.forEach((stage, index) => {
        const top = stickyTop + index * stickyStep;
        if (bounds[index].top <= top + 80) nextActive = index;
        const next = bounds[index + 1];
        const depth = track.dataset.sticky === "true" && next ? Math.min(1, Math.max(0, 1 - (next.top - top) / bounds[index].height)) : 0;
        stage.style.setProperty("--depth", String(depth));
      });
      if (nextActive !== current) { current = nextActive; setActive(nextActive); }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); schedule(); };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.revealed = "true"; observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    stages.forEach((stage) => observer.observe(stage));
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); }, { rootMargin: "200px 0px" });
    visibility.observe(track);
    const sizing = new ResizeObserver(resize);
    stages.forEach(stage => sizing.observe(stage.firstElementChild!));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    reduced.addEventListener("change", resize);
    resize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); sizing.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", resize); reduced.removeEventListener("change", resize); };
  }, []);
  return <section className={styles.section} aria-labelledby="home-services-title">
    <div className={styles.container}>
      <header className={styles.heading}>
        <h2 id="home-services-title">خدمات نواتیک</h2>
      </header>
      <div className={styles.chapter} aria-hidden="true"><div className={styles.progress}>{services.map((service, index) => <i key={service.image} data-active={active === index} />)}</div></div>
      <div className={styles.stack} ref={trackRef}>
        {services.map((service, index) => <article key={service.image} className={styles.service} data-service-stage data-active={active === index} style={{ "--order": index } as CSSProperties} onFocusCapture={(event) => { if (event.target instanceof HTMLElement && event.target.matches(":focus-visible") && !event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.scrollIntoView({ block: "center", behavior: "instant" }); }}>
          <div className={styles.surface}>
            <div className={styles.content}>
              <div className={styles.cardTop}><span className={styles.number} dir="ltr">{service.number}<span> / 05</span></span></div>
              <h3><Link href={service.href}>{service.title}</Link></h3>
              <p className={styles.description}>{service.description}</p>
              <Link href={service.href} className={styles.action}>{service.action}<span><ArrowUpLeft size={21} strokeWidth={1.6} aria-hidden="true" /></span></Link>
            </div>
            <div className={styles.visual}><Image src={`/images/services/${service.image}.webp`} alt={service.alt} width={2176} height={1632} sizes="(min-width: 1440px) 670px, (min-width: 900px) 49vw, 270px" className={styles.artwork} /></div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
