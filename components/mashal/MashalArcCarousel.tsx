"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./MashalLanding.module.css";

/** Each card shows the real Mashal screen of that step, like the reference arc carousel. */
const features: { title: string; eyebrow: string; src: string }[] = [
  { title: "قرارداد خرید", eyebrow: "شروع معامله", src: "/images/mashal/mashal-contract-management-afghanistan.webp" },
  { title: "بارگیری", eyebrow: "مقدار و رسید", src: "/images/mashal/mashal-loading-purchase-management.webp" },
  { title: "حمل‌ونقل", eyebrow: "مسیر و کسری", src: "/images/mashal/mashal-tanker-logistics-goods-in-transit.webp" },
  { title: "مدیریت تانک‌ها", eyebrow: "موجودی واقعی", src: "/images/mashal/mashal-fuel-tank-inventory.webp" },
  { title: "فروش", eyebrow: "تحویل و مشتری", src: "/images/mashal/mashal-petroleum-sales-management.webp" },
  { title: "حسابداری", eyebrow: "چندارزی و متصل", src: "/images/mashal/mashal-multi-currency-ledger.webp" },
  { title: "مفاد و قیمت تمام‌شده", eyebrow: "نتیجهٔ واقعی", src: "/images/mashal/mashal-contract-profit-loss-report.webp" },
];

function circularDistance(index: number, active: number) {
  const direct = index - active;
  const wrapped = direct > 0 ? direct - features.length : direct + features.length;
  return Math.abs(direct) <= Math.abs(wrapped) ? direct : wrapped;
}

export default function MashalArcCarousel() {
  const [active, setActive] = useState(3);
  const [paused, setPaused] = useState(false);
  const region = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % features.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (step: number) => setActive(value => (value + step + features.length) % features.length);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    move(event.key === "ArrowLeft" ? 1 : -1);
  };

  return (
    <div
      ref={region}
      className={styles.arcCarousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="جریان قابلیت‌های مشعل"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className={styles.arcLine} aria-hidden="true" />
      <div className={styles.arcCards}>
        {features.map(({ title, eyebrow, src }, index) => {
          const slot = circularDistance(index, active);
          const distance = Math.abs(slot);
          return (
            <button
              key={title}
              type="button"
              className={styles.arcCard}
              style={{ "--slot": slot, "--distance": distance } as CSSProperties}
              data-distance={distance}
              aria-current={index === active ? "true" : undefined}
              aria-label={`${eyebrow}: ${title}`}
              onClick={() => setActive(index)}
            >
              <span className={styles.arcThumb}>
                <Image src={src} alt="" aria-hidden="true" width={1600} height={1000} sizes="240px" loading="lazy" />
              </span>
              <span className={styles.arcText}>
                <small>{eyebrow}</small>
                <strong>{title}</strong>
              </span>
              <span className={styles.arcNumber}>{String(index + 1).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.arcControls}>
        <button type="button" onClick={() => move(-1)} aria-label="قابلیت قبلی"><ChevronRight size={20} aria-hidden="true" /></button>
        <span><b>{String(active + 1).padStart(2, "0")}</b> / {String(features.length).padStart(2, "0")}</span>
        <button type="button" onClick={() => move(1)} aria-label="قابلیت بعدی"><ChevronLeft size={20} aria-hidden="true" /></button>
      </div>
      <p className={styles.arcLive} aria-live="polite">{features[active].title}: {features[active].eyebrow}</p>
    </div>
  );
}
