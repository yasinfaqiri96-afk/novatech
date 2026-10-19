import type { CSSProperties } from "react";
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
 * Every file is trimmed to its artwork on a transparent background and exported at
 * exactly 2x its on-screen box, so it is served as-is: the optimiser's AVIF/q75
 * re-encode smeared the fine lettering. `w`/`h` are the file's real pixel size;
 * new logos must be prepared the same way.
 */
const clientLogos: { src: string; w: number; h: number; name?: string }[] = [
  { src: "/images/client/2.webp", w: 290, h: 176, name: "Arg Company" },
  { src: "/images/client/4.webp", w: 306, h: 168, name: "Mirwais Yaqoobi Diagnostic Center" },
  { src: "/images/client/5.webp", w: 246, h: 208, name: "قادری" },
  { src: "/images/client/6.webp", w: 222, h: 230, name: "Manoto Potato Chips" },
  { src: "/images/client/9a.webp", w: 302, h: 170, name: "Super Cola" },
  { src: "/images/client/12.webp", w: 220, h: 234, name: "مرکز جلدی و زیبایی" },
  { src: "/images/client/13.webp", w: 220, h: 234, name: "نورالمدینه" },
  { src: "/images/client/14.webp", w: 226, h: 228, name: "شرکت نرم افزاری" },
  { src: "/images/client/15.webp", w: 226, h: 226, name: "انستیتوت علوم صحی طلوع سعادت" },
  { src: "/images/client/16.webp", w: 210, h: 240 },
  { src: "/images/client/17.webp", w: 224, h: 228, name: "Qaderi" },
  { src: "/images/client/77.webp", w: 254, h: 202, name: "گیلاتو؛ بستنی و فست فود" },
  { src: "/images/client/200.webp", w: 286, h: 180, name: "خیاطی نوراحمد سلیمانی" },
  { src: "/images/client/client-18.webp", w: 432, h: 74, name: "Telionix" },
  { src: "/images/client/client-19.webp", w: 270, h: 190, name: "Pishro" },
  { src: "/images/client/client-20.webp", w: 432, h: 110, name: "گروپ کمپنی‌های صدیقی" },
  { src: "/images/client/client-21.webp", w: 218, h: 236, name: "زیتون زمرد" },
  { src: "/images/client/client-22.webp", w: 260, h: 196, name: "Le Petit Isenburg" },
  { src: "/images/client/client-23.webp", w: 240, h: 214, name: "شرکت باربری رحمانی (نور)" },
  { src: "/images/client/client-24.webp", w: 228, h: 224, name: "Wesal Travel" },
  { src: "/images/client/client-25.webp", w: 214, h: 238, name: "TURD KFC" },
];

/** On-screen box at desktop size: half the file's pixels (the files are 2x). */
const logoBox = (w: number, h: number) => ({ width: Math.round(w / 2), height: Math.round(h / 2) });

export default function ClientLogosSlider() {
  return (
    <ViewportMotion className={styles.motionRoot}>
      <section className={styles.section} aria-labelledby="client-logos-title">
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <span className={styles.eyebrow}>همراه در مسیر رشد</span>
              <h2 id="client-logos-title"><span className="heavy">برندهایی</span> <span className="light">که به ما اعتماد کرده‌اند</span><span className={styles.titleDot} aria-hidden="true" /></h2>
            </div>
          </header>
          <div className={styles.ribbon} dir="ltr" role="region" aria-label="لوگوی برندهایی که به نواتیک اعتماد کرده‌اند">
            <div className={styles.track}>
              {[0, 1].map(copy => (
                <ul key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
                  {clientLogos.map((logo, index) => {
                    const box = logoBox(logo.w, logo.h);
                    return (
                      <li key={`${logo.src}-${copy}`} className={styles.item} style={{ "--i": index, "--lw": box.width, "--lh": box.height } as CSSProperties}>
                        <span className={styles.float}>
                          <Image className={styles.logo} src={logo.src} alt={copy === 0 ? (logo.name ? `لوگوی ${logo.name}` : `لوگوی مشتری نواتیک ${index + 1}`) : ""} width={logo.w} height={logo.h} unoptimized loading="lazy" />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ViewportMotion>
  );
}
