"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Detail.module.css";

type FullSizeImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  onClose: () => void;
};

/** The native modal keeps keyboard focus inside the full-size preview. */
export default function FullSizeImage({ src, alt, width, height, title, onClose }: FullSizeImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className={styles.modal} aria-label={`تصویر کامل ${title}`} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button type="button" className={styles.modalClose} onClick={onClose} aria-label="بستن تصویر کامل" autoFocus>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <div className={styles.modalSheet} tabIndex={0} aria-label="تصویر کامل؛ برای دیدن ادامه پیمایش کنید">
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1100px) 1050px, 93vw" className={styles.modalImg} />
      </div>
    </dialog>
  );
}
