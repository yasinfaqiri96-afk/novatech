"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import FullSizeImage from "./FullSizeImage";
import styles from "./Detail.module.css";

const favourites = new Map<string, boolean>();
const favouriteEvent = "novatech-portfolio-favourite";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(favouriteEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(favouriteEvent, callback);
  };
}
function readFavourite(key: string) {
  try { return localStorage.getItem(key) === "true"; }
  catch { return favourites.get(key) ?? false; }
}

export default function DetailShowcase({ src, alt, width, height, portrait, title, website = false }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  portrait: boolean;
  title: string;
  website?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const key = `novatech:portfolio:favourite:${src}`;
  const saved = useSyncExternalStore(subscribe, () => readFavourite(key), () => false);
  const toggleSaved = () => {
    favourites.set(key, !saved);
    try { localStorage.setItem(key, String(!saved)); } catch { /* Remain usable when browser storage is unavailable. */ }
    window.dispatchEvent(new Event(favouriteEvent));
  };

  return (
    <div className={styles.uiWrap}>
      <button type="button" className={`${styles.uiFav} ${saved ? styles.saved : ""}`} onClick={toggleSaved} aria-pressed={saved}>
        <svg viewBox="0 0 20 18" aria-hidden="true"><path d="M10 16.5S1.5 11.6 1.5 5.9A4.2 4.2 0 0 1 10 4a4.2 4.2 0 0 1 8.5 1.9c0 5.7-8.5 10.6-8.5 10.6Z" /></svg>
        <b>{saved ? "به علاقه‌مندی‌ها افزوده شد" : "افزودن به علاقه‌مندی‌ها"}</b>
      </button>
      <div className={styles.ui}>
        <div className={`${styles.uiImg} ${portrait ? styles.uiPortrait : ""} ${website ? styles.uiWebsite : ""}`}>
          {portrait && <Image src={src} alt="" fill sizes="100vw" className={styles.uiBackdrop} aria-hidden="true" />}
          <Image src={src} alt={alt} width={width} height={height} preload sizes="(min-width: 1754px) 1360px, (min-width: 800px) 78vw, 100vw" className={styles.uiPicture} />
          <button type="button" className={styles.uiZoom} onClick={() => setOpen(true)} aria-label={`بزرگ‌نمایی تصویر ${title}`}>
            <svg viewBox="0 0 26 26" aria-hidden="true">
              <path d="M19 1h6v6m-9 3 9-9" /><path d="M7 25H1v-6m0 6 9-9" /><path d="M19 25h6v-6m-9-3 9 9" /><path d="M7 1H1v6m0-6 9 9" />
            </svg>
          </button>
        </div>
        <div className={styles.uiButton}>
          <button type="button" className={styles.btnOutline} onClick={() => setOpen(true)}>مشاهده نمونه‌کار</button>
        </div>
      </div>
      {open && <FullSizeImage src={src} alt={alt} width={width} height={height} title={title} onClose={() => setOpen(false)} />}
    </div>
  );
}
