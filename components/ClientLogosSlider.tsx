"use client";

import { useState } from "react";
import Image from "next/image";
import ViewportMotion from "./ViewportMotion";
import styles from "./ClientLogosSlider.module.css";

/**
 * Logos of businesses Novatech has worked with, from `public/images/client`.
 * Each caption is the name or activity printed on the logo artwork itself
 * (read from the file, not assumed). The Noor Al Madinah mark is matched to its project artwork. Marks without
 * a verified business name stay uncaptioned rather than receiving an invented one. The spaced and
 * parenthesised originals were renamed to plain `client-NN.webp`, because the
 * image optimiser double-escaped them into 404s; keep new logos to that pattern.
 */
const clientLogos: { src: string; name?: string }[] = [
  { src: "/images/client/2.webp", name: "Arg Company" },
  { src: "/images/client/4.webp", name: "Mirwais Yaqoobi Diagnostic Center" },
  { src: "/images/client/5.webp", name: "قادری" },
  { src: "/images/client/6.webp", name: "Manoto Potato Chips" },
  { src: "/images/client/9a.webp", name: "Super Cola" },
  { src: "/images/client/12.webp", name: "مرکز جلدی و زیبایی" },
  { src: "/images/client/13.webp", name: "نورالمدینه" },
  { src: "/images/client/14.webp", name: "شرکت نرم افزاری" },
  { src: "/images/client/15.webp", name: "انستیتوت علوم صحی طلوع سعادت" },
  { src: "/images/client/16.webp" },
  { src: "/images/client/17.webp", name: "Qaderi" },
  { src: "/images/client/77.webp", name: "گیلاتو؛ بستنی و فست فود" },
  { src: "/images/client/200.webp", name: "خیاطی نوراحمد سلیمانی" },
  { src: "/images/client/client-18.webp", name: "Telionix" },
  { src: "/images/client/client-19.webp", name: "Pishro" },
  { src: "/images/client/client-20.webp", name: "گروپ کمپنی‌های صدیقی" },
  { src: "/images/client/client-21.webp", name: "زیتون زمرد" },
  { src: "/images/client/client-22.webp", name: "Le Petit Isenburg" },
  { src: "/images/client/client-23.webp", name: "شرکت باربری رحمانی (نور)" },
  { src: "/images/client/client-24.webp", name: "Wesal Travel" },
  { src: "/images/client/client-25.webp", name: "TURD KFC" },
];

export default function ClientLogosSlider() {
  const [paused, setPaused] = useState(false);

  return (
    <ViewportMotion className={styles.motionRoot}>
      <section className={styles.section} aria-labelledby="client-logos-title" data-paused={paused}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <span className={styles.eyebrow}>همراه در مسیر رشد</span>
              <h2 id="client-logos-title"><span className="heavy">مشتریان</span> <span className="light">ما</span><span className={styles.titleDot} aria-hidden="true" /></h2>
            </div>
            <button type="button" className={styles.pause} aria-controls="client-logos-ribbon" aria-pressed={paused} onClick={() => setPaused(value => !value)} aria-label={paused ? "ادامه حرکت لوگوهای مشتریان" : "توقف حرکت لوگوهای مشتریان"}>
              <svg viewBox="0 0 20 20" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6z" /> : <path d="M7 4v12M13 4v12" />}</svg>
              <span>{paused ? "ادامه حرکت" : "توقف حرکت"}</span>
            </button>
          </header>
          <div id="client-logos-ribbon" className={styles.ribbon} dir="ltr" tabIndex={0} role="region" aria-label="لوگوهای مشتریان نواتیک؛ برای مرور، حرکت را متوقف کنید">
            <div className={styles.track}>
              {[0, 1].map(copy => (
                <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
                  {clientLogos.map((logo, index) => (
                    <li key={`${logo.src}-${copy}`} className={styles.item}>
                      <span className={styles.mark}>
                        <Image src={logo.src} alt={copy === 0 ? (logo.name ? `لوگوی ${logo.name}` : `لوگوی مشتری نواتیک ${index + 1}`) : ""} width={176} height={176} sizes="(max-width: 767px) 96px, 120px" loading="lazy" />
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ViewportMotion>
  );
}
