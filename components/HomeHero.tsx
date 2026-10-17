import Image from "next/image";
import Link from "next/link";
import HeroWave from "@/components/HeroWave";
import { companyInfo } from "@/lib/site-content";
import styles from "./HomeHero.module.css";

/**
 * Home hero: a full-width media panel with rounded top corners whose bottom is
 * cut away by the layered wave. The header's notch hangs into its top edge.
 * This block carries the page's single <h1>.
 */
export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.container}>
        <div className={styles.media}>
          <div className={styles.frame}>
            <Image
              src="/images/portfolio/site.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1680px) 1680px, 100vw"
              className={styles.image}
            />
            <div className={styles.shade} aria-hidden="true" />
          </div>
          <div className={styles.copy}>
            <h1 id="home-hero-title" className={styles.title}>
              <span>مشعل و ناظر؛</span> <span>نرم‌افزارهای تخصصی نواتیک</span>
            </h1>
            <p className={styles.subtitle}>شرکت نرم افزاری و تکنالوژی در هرات، افغانستان</p>
          </div>
          <HeroWave className={styles.wave} />
        </div>

        <div className={styles.intro}>
          <i className={styles.dot} aria-hidden="true" />
          <p>
            {companyInfo.brandName} در <Link href="/herat">هرات</Link>{" "}
            <Link href="/software-solutions">نرم افزار اختصاصی</Link> و{" "}
            <Link href="/business-systems">سیستم مدیریت کسب و کار</Link> می سازد؛ تمام کار شما در یک
            سیستم، تصمیم شما بر پایه داده درست.
          </p>
        </div>
      </div>
    </section>
  );
}
