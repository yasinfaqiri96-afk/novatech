"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import TabShape from "./TabShape";
import styles from "./Detail.module.css";

export type MoreProject = {
  href: string;
  title: string;
  category: string;
  image: string;
  color: string;
  website: boolean;
};

/** Horizontal carousel of tall project cards, with previous/next arrows. */
export default function MoreProjects({ items }: { items: MoreProject[] }) {
  const track = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    // RTL: scrolling "forward" moves towards negative scrollLeft
    el.scrollBy({ left: -dir * ((card?.offsetWidth ?? 300) + 24), behavior: "smooth" });
  };

  return (
    <div className={styles.slider}>
      <button type="button" className={`${styles.sliderBtn} ${styles.sliderPrev}`} onClick={() => step(-1)} aria-label="نمونه کار قبلی">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
      </button>
      <div className={styles.track} ref={track}>
        {items.map(item => (
          <div key={item.href} className={styles.slide} data-card style={{ "--c": item.color } as React.CSSProperties}>
            <div className={styles.tallSpecial} aria-hidden="true">
              <svg className={styles.tallStar} viewBox="0 0 24 24"><path d="M11.1 2.6a1 1 0 0 1 1.8 0l2.4 5 5.5.7a1 1 0 0 1 .6 1.7l-4 3.8 1 5.4a1 1 0 0 1-1.5 1.1L12 17.7l-4.9 2.6a1 1 0 0 1-1.5-1.1l1-5.4-4-3.8a1 1 0 0 1 .6-1.7l5.5-.7z" /></svg>
              <span className={styles.tallSpecialTab}>
                <TabShape w={110} h={22} flank={26} direction="up" className={styles.tabBg} />
                <span lang="en">SPECIAL</span>
              </span>
            </div>
            <Link href={item.href} className={styles.tallCard} aria-label={`${item.title} — ${item.category}`}>
              <span className={styles.tallImg}>
                <Image src={item.image} alt="" fill sizes="(min-width: 800px) 22vw, 70vw" className={item.website ? styles.tallImgTop : undefined} />
              </span>
              <span className={styles.tallTitle}>{item.title}</span>
              <span className={styles.tallCat}>{item.category}</span>
            </Link>
            <span className={styles.tallServices} aria-hidden="true">
              <TabShape w={170} h={25} flank={34} direction="down" className={styles.tabBg} />
              <i className={styles.glyphTri} />
              <i className={item.website ? styles.glyphSq : `${styles.glyphSq} ${styles.lit}`} />
              <i className={item.website ? `${styles.glyphCi} ${styles.lit}` : styles.glyphCi} />
            </span>
          </div>
        ))}
      </div>
      <button type="button" className={`${styles.sliderBtn} ${styles.sliderNext}`} onClick={() => step(1)} aria-label="نمونه کار بعدی">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
      </button>
    </div>
  );
}
