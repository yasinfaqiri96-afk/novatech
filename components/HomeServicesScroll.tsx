"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import styles from "./HomeServicesScroll.module.css";

// Each artwork already prints the service name and tagline, so the card shows only the
// artwork; title and description stay in the markup for search engines and screen readers.
const services = [
  { href: "/web-design", title: "طراحی سایت", description: "سایت شرکتی و فروشگاهی، متناسب با برند و نیاز شما.", image: "website", alt: "طراحی وب‌سایت نواتیک؛ تجربه‌ای دقیق در فضای دیجیتال" },
  { href: "/software-solutions", title: "نرم‌افزار اختصاصی", description: "سامانه‌هایی متناسب با فرایندهای کسب‌وکار شما.", image: "software", alt: "نرم‌افزار اختصاصی نواتیک؛ هماهنگ با جریان کار شما" },
  { href: "/database-solutions", title: "طراحی دیتابیس", description: "ساختاری امن و منظم برای ثبت و گزارش‌گیری داده‌ها.", image: "database", alt: "طراحی دیتابیس نواتیک؛ ساختاری امن برای داده‌های شما" },
  { href: "/graphic-design", title: "طراحی گرافیک", description: "لوگو و هویت بصری یکپارچه برای برند شما.", image: "graphic-design", alt: "طراحی گرافیک نواتیک؛ هویت بصری با دقت و انسجام" },
  { href: "/contact", title: "دامنه و هاست", description: "ثبت دامنه و میزبانی مطمئن برای وب‌سایت شما.", image: "domain-hosting", alt: "دامنه و هاستینگ نواتیک؛ حضور پایدار در فضای دیجیتال" },
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
      // The site header is pinned, so the stack starts just below its live height.
      const header = document.getElementById("header");
      stickyTop = Math.round((header?.getBoundingClientRect().height ?? 96) + parseFloat(computed.getPropertyValue("--stack-gap")));
      track.style.setProperty("--stack-top", `${stickyTop}px`);
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
      const viewport = window.innerHeight;
      stages.forEach((stage, index) => {
        const top = stickyTop + index * stickyStep;
        if (bounds[index].top <= top + 80) nextActive = index;
        const next = bounds[index + 1];
        const depth = track.dataset.sticky === "true" && next ? Math.min(1, Math.max(0, 1 - (next.top - top) / bounds[index].height)) : 0;
        // 0 while the card is still below the fold, 1 once it reaches its resting place: drives the artwork settling into focus.
        const enter = Math.min(1, Math.max(0, (viewport - bounds[index].top) / Math.max(1, viewport - top)));
        stage.style.setProperty("--depth", String(depth));
        stage.style.setProperty("--enter", enter.toFixed(3));
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
    // No synchronous first measure: the ResizeObserver above reports every card
    // once the browser has laid the page out, and measuring here instead forced
    // that first (most expensive) layout into the hydration task.
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
          <Link href={service.href} className={styles.surface}>
            <Image src={`/images/services/${service.image}.webp`} alt={service.alt} width={2176} height={1632} sizes="(min-width: 980px) 920px, 100vw" className={styles.artwork} />
            <div className="sr-only"><h3>{service.title}</h3><p>{service.description}</p></div>
            <span className={styles.cta} aria-hidden="true"><ArrowUpLeft size={20} strokeWidth={1.6} /></span>
          </Link>
        </article>)}
      </div>
    </div>
  </section>;
}
