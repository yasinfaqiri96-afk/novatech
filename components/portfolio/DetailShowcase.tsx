"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TabShape from "./TabShape";
import styles from "./Detail.module.css";

/**
 * The large framed screenshot at the top of a case study: card-colour frame,
 * favourite tab, zoom tab and a "view project" button that opens the full
 * image in an overlay.
 */
export default function DetailShowcase({
  src,
  alt,
  width,
  height,
  portrait,
  title,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  portrait: boolean;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      openerRef.current?.focus();
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [open]);

  const show = (e: React.MouseEvent<HTMLElement>) => { openerRef.current = e.currentTarget; setOpen(true); };

  return (
    <div className={styles.uiWrap}>
      <button type="button" className={`${styles.uiFav} ${saved ? styles.saved : ""}`} onClick={() => setSaved(s => !s)} aria-pressed={saved}>
        <TabShape w={240} h={44} flank={52} direction="down" gradient={["#ffffff", "#dddce5"]} className={styles.tabBg} />
        <svg viewBox="0 0 20 18" aria-hidden="true"><path d="M10 16.5S1.5 11.6 1.5 5.9A4.2 4.2 0 0 1 10 4a4.2 4.2 0 0 1 8.5 1.9c0 5.7-8.5 10.6-8.5 10.6Z" /></svg>
        <b>{saved ? "در علاقه‌مندی‌ها ذخیره شد" : "افزودن به علاقه‌مندی‌ها"}</b>
      </button>

      <div className={styles.ui}>
        <div className={`${styles.uiImg} ${portrait ? styles.uiPortrait : ""}`}>
          {portrait && <Image src={src} alt="" fill sizes="100vw" className={styles.uiBackdrop} aria-hidden="true" />}
          <Image src={src} alt={alt} width={width} height={height} priority sizes="(min-width: 800px) 1400px, 100vw" className={styles.uiPicture} />
          <span className={styles.uiBrand} aria-hidden="true">
            <svg viewBox="0 0 18 128" preserveAspectRatio="none"><path d="M18 0C18 14 0 16 0 30v68c0 14 18 16 18 30z" /></svg>
            <span lang="en">NOVATECH</span>
          </span>
          <button type="button" className={styles.uiZoom} onClick={show} aria-label={`بزرگ‌نمایی تصویر ${title}`}>
            <TabShape w={156} h={50} flank={44} direction="up" gradient={["#dddce5", "#ffffff"]} className={styles.tabBg} />
            <svg viewBox="0 0 26 26" aria-hidden="true"><path d="M16 4h6v6M10 22H4v-6M22 16v6h-6M4 10V4h6" /></svg>
          </button>
        </div>
        <div className={styles.uiButton}>
          <button type="button" className={styles.btnOutline} onClick={show}>مشاهده نمونه‌کار</button>
        </div>
      </div>

      {open && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-label={title}>
          <button ref={closeRef} type="button" className={styles.modalClose} onClick={() => setOpen(false)} aria-label="بستن">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <div className={styles.modalSheet}>
            <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1100px) 1050px, 93vw" className={styles.modalImg} />
          </div>
        </div>
      )}
    </div>
  );
}
