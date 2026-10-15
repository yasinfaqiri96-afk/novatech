"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import placeholders from "@/lib/mashal-image-placeholders.json";
import styles from "./MashalImage.module.css";

const labels = {
  fa: { open: "بزرگ‌کردن تصویر", close: "بستن تصویر", original: "بازکردن فایل اصلی", zoom: "اندازهٔ اصلی", fit: "اندازهٔ مناسب صفحه" },
  en: { open: "Enlarge screenshot", close: "Close screenshot", original: "Open original image", zoom: "Actual size", fit: "Fit to screen" },
  ps: { open: "انځور لوی کړئ", close: "انځور وتړئ", original: "اصلي انځور پرانیزئ", zoom: "اصلي اندازه", fit: "د پردې په اندازه" },
};

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  aspectRatio?: string;
  caption?: string;
  language?: keyof typeof labels;
};

/** The published, already anonymized image is shown whole, including when enlarged. */
export default function MashalImage({ src, alt, width, height, sizes, priority = false, aspectRatio = "16 / 10", caption, language = "fa" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);
  const copy = labels[language];
  const blurDataURL = (placeholders as Record<string, string>)[src];

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function enlarge() {
    setActualSize(false);
    setOpen(true);
    dialog.current?.showModal();
  }

  return (
    <div className={styles.image} data-mashal-image>
      <button type="button" className={styles.trigger} aria-label={`${copy.open}: ${alt}`} aria-haspopup="dialog" onClick={enlarge}>
        <span className={styles.preview} style={{ aspectRatio } as CSSProperties}>
          <Image src={src} alt={alt} width={width} height={height} sizes={sizes}
            priority={priority} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}
            placeholder={blurDataURL ? "blur" : "empty"} blurDataURL={blurDataURL} />
        </span>
        <span className={styles.openLabel}><Maximize2 size={16} aria-hidden="true" />{copy.open}</span>
      </button>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.modal}>
          <div className={styles.toolbar}>
            <p id={titleId}>{alt}</p>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={copy.close} autoFocus><X size={22} aria-hidden="true" /></button>
          </div>
          <div className={`${styles.viewport} ${actualSize ? styles.actualSize : ""}`}>
            {open && <Image src={src} alt={alt} width={width} height={height} unoptimized loading="eager" />}
          </div>
          <div className={styles.controls}>
            <button type="button" aria-pressed={actualSize} onClick={() => setActualSize(value => !value)}>{actualSize ? <ZoomOut size={17} aria-hidden="true" /> : <ZoomIn size={17} aria-hidden="true" />}{actualSize ? copy.fit : copy.zoom}</button>
            <a href={src} target="_blank" rel="noopener noreferrer">{copy.original}</a>
          </div>
          {caption && <p className={styles.caption}>{caption}</p>}
        </div>
      </dialog>
    </div>
  );
}
