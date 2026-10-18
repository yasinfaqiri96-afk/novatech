"use client";

import Image from "next/image";
import { useState } from "react";
import FullSizeImage from "./FullSizeImage";
import styles from "./Detail.module.css";

type InlineImageCardProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
};

export default function InlineImageCard({ src, alt, width, height, title }: InlineImageCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <figure className={styles.inlineCard}>
        <div className={styles.inlineCardFrame}>
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 800px) 40vw, 92vw" loading="lazy" className={styles.inlineCardImage} />
          <button type="button" className={styles.inlineCardButton} onClick={() => setOpen(true)} aria-label={`مشاهدهٔ کامل تصویر ${title}`}>
            <svg viewBox="0 0 26 26" aria-hidden="true"><path d="M19 1h6v6m-9 3 9-9M7 25H1v-6m0 6 9-9M19 25h6v-6m-9-3 9 9M7 1H1v6m0-6 9 9" /></svg>
            مشاهدهٔ کامل تصویر
          </button>
        </div>
      </figure>
      {open && <FullSizeImage src={src} alt={alt} width={width} height={height} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}
