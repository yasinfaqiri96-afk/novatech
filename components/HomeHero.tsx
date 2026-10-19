import Image from "next/image";
import Link from "next/link";
import HeroWave from "@/components/HeroWave";
import styles from "./HomeHero.module.css";

/**
 * Home hero: a video panel with rounded top corners whose bottom is
 * cut away by the layered wave. The header's notch hangs into its top edge.
 * This block carries the page's single, visible <h1> and the primary call to
 * action.
 *
 * The panel is a 5-second looping product clip (tablet and phone dashboards).
 * Its first frame is also a preloaded poster image under the video, so the
 * hero paints before the ~270KB clip arrives and stays still for visitors who
 * ask for reduced motion.
 */
export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.container}>
        <div className={styles.media}>
          <div className={styles.frame}>
            <div className={styles.copy}>
              <h1 id="home-hero-title" className={styles.title}>نرم‌افزارهای مدیریتی نواتیک</h1>
              <div className={styles.actions}>
                <Link href="/contact" className={styles.primary}>درخواست دمو</Link>
              </div>
            </div>
            <figure className={styles.visual}>
              <Image
                src="/media/novatech-hero-motion-poster.webp"
                alt="داشبورد نرم‌افزارهای نواتیک روی تبلت و موبایل"
                width={1280}
                height={720}
                preload
                sizes="(min-width: 1680px) 1680px, 100vw"
                className={styles.image}
              />
              <video
                className={styles.video}
                src="/media/novatech-hero-motion.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              />
            </figure>
          </div>
          <HeroWave className={styles.wave} />
        </div>

        <div className={styles.intro} aria-hidden="true">
          <i className={styles.dot} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
