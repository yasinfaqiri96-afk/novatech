"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Crumb } from "@/components/Breadcrumbs";
import styles from "./Portfolio.module.css";

export type IntroStat = { value: string; label: string };

/** Navy breadcrumb bar that sits right under the header's notch. */
export function BreadcrumbBar({ items }: { items: Crumb[] }) {
  return (
    <div className={styles.container}>
      <nav className={styles.crumbs} aria-label="مسیر صفحه">
        <ol>
          {items.map((item, index) =>
            index === items.length - 1 ? (
              <li key={item.path} aria-current="page" className={styles.crumbLast}>{item.name}</li>
            ) : (
              <li key={item.path}>
                {index === 0 && (
                  <svg className={styles.crumbHome} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" /></svg>
                )}
                <Link href={item.path}>{item.name}</Link>
                <svg className={styles.crumbArrow} viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" /></svg>
              </li>
            ),
          )}
        </ol>
        <span className={styles.crumbSlogan} aria-hidden="true">Novatech</span>
        <svg className={styles.crumbTab} viewBox="0 0 107 30" aria-hidden="true" focusable="false">
          <path d="M0 0h107C95 0 90 4 86 10c-3 5-7 7-14 7h-6c-4 0-5 2-5 4 0 3-3 5-5 7l-2.5 2-2.5-2c-2-2-5-4-5-7 0-2-1-4-5-4h-6c-7 0-11-2-14-7C17 4 12 0 0 0" />
        </svg>
      </nav>
    </div>
  );
}

export default function PortfolioIntro({ stats }: { stats: IntroStat[] }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { void v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.entitle} lang="en" dir="ltr">Success Stories</span>
          <p className={styles.typography} aria-hidden="true">
            <span>پروژه‌هایی که</span> <span>با افتخار ساختیم</span>
          </p>
          <div className={styles.editor}>
            <h1>نمونه کارهای نواتیک</h1>
            <p>
              در نواتیک هر پروژه از یک نیاز واقعی شروع می‌شود: انباری که موجودی‌اش گم می‌شود، شرکتی که حساب
              شرکایش در چند دفتر پخش است، یا کسب‌وکاری که مشتری آنلاین پیدا نمی‌کند. این‌جا سامانه‌ها و
              وب‌سایت‌هایی را می‌بینید که برای همین نیازها طراحی، پیاده‌سازی و تحویل داده‌ایم؛ از ERP نفت و
              گاز مشعل تا نرم‌افزارهای فروش، گدام، لجستیک و حضور و غیاب. برای هر سامانه صفحه شرح کامل داریم تا
              ببینید مسئله چه بود و راه‌حل چگونه ساخته شد.
            </p>
          </div>
          <ul className={styles.features}>
            {stats.map(stat => (
              <li key={stat.label} className={styles.feature}>
                <b dir="ltr">{stat.value}</b>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.introMedia}>
          <div className={styles.introVideo}>
            <Image src="/media/mockup-intro-poster.webp" alt="" fill sizes="(min-width: 800px) 50vw, 100vw" className={styles.introPoster} />
            <video ref={video} autoPlay muted loop playsInline preload="auto" poster="/media/mockup-intro-poster.webp" aria-label="نمایش نرم‌افزار مشعل روی مانیتور و لپ‌تاپ">
              <source src="/media/mockup-intro.webm" type="video/webm" />
              <source src="/media/mockup-intro.mp4" type="video/mp4" />
            </video>
          </div>
          <button type="button" className={styles.playBadge} onClick={toggle} aria-label={playing ? "توقف ویدیو" : "پخش ویدیو"} aria-pressed={!playing}>
            <svg className={styles.sideTab} viewBox="0 0 40 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0c0 9 40 9 40 22v36c0 13-40 13-40 22z" /></svg>
            <svg className={styles.playIcon} viewBox="0 0 22 20" aria-hidden="true">
              {playing ? <path d="M8 4v12M14 4v12" /> : <path d="M7 3.5v13L17 10z" />}
            </svg>
          </button>
          <span className={styles.logoBadge} aria-hidden="true">
            <Image src="/images/brand/novatech-wordmark-navy.webp" alt="" width={640} height={241} sizes="60px" />
          </span>
        </div>
      </div>
    </div>
  );
}
