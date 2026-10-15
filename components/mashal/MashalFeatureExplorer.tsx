"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import MashalImage from "./MashalImage";
import styles from "./MashalLanding.module.css";

const views = [
  { key: "transport", label: "حمل‌ونقل", hint: "مسیر، مقدار تحویل و کسری", href: "/oil-and-gas-software/tanker-logistics", src: "/images/mashal/mashal-transport-details.webp", width: 1410, height: 948, alt: "جزئیات حمل مواد نفتی در مشعل با مسیر، مقدار تحویل‌شده و کسری" },
  { key: "accounting", label: "حسابداری", hint: "حساب‌های متصل و چندارزی", href: "/oil-and-gas-software/accounting", src: "/images/mashal/mashal-chart-of-accounts.webp", width: 1410, height: 887, alt: "سرفصل حساب‌های مالی و عملیاتی نرم افزار مشعل" },
  { key: "tanks", label: "تانک‌ها", hint: "ظرفیت و موجودی هر مخزن", href: "/oil-and-gas-software/tank-inventory", src: "/images/mashal/mashal-storage-tanks.webp", width: 1405, height: 875, alt: "مدیریت مخازن ذخیره و موجودی مواد نفتی در مشعل" },
  { key: "contracts", label: "قرارداد خرید", hint: "چرخهٔ کامل اجرای معامله", href: "/oil-and-gas-software/contracts", src: "/images/mashal/mashal-contract-cycle-flow.webp", width: 1380, height: 885, alt: "چرخه قرارداد خرید مواد نفتی از خرید تا فروش و مفاد در مشعل" },
  { key: "sales", label: "فروش", hint: "مشتری، ارز و منبع مواد", href: "/oil-and-gas-software/sales", src: "/images/mashal/mashal-petroleum-sales-management.webp", width: 1600, height: 1000, alt: "مدیریت فروش مواد نفتی و حساب مشتری در مشعل" },
  { key: "reports", label: "راپورها", hint: "تصمیم از دادهٔ واقعی", href: "/oil-and-gas-software/reports", src: "/images/mashal/mashal-reports-center.webp", width: 1383, height: 723, alt: "مرکز راپورهای مدیریتی و مالی نرم افزار مشعل" },
] as const;

export default function MashalFeatureExplorer() {
  const [active, setActive] = useState(0);
  const view = views[active];

  return (
    <div className={styles.explorer}>
      <div className={styles.explorerNav} role="tablist" aria-label="انتخاب محیط مشعل">
        {views.map((item, index) => (
          <button
            key={item.key}
            id={`mashal-view-${item.key}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="mashal-view-panel"
            onClick={() => setActive(index)}
          >
            <span>{item.label}</span>
            <small>{item.hint}</small>
          </button>
        ))}
      </div>
      <div id="mashal-view-panel" role="tabpanel" aria-labelledby={`mashal-view-${view.key}`} className={styles.explorerPanel}>
        <div key={view.key} className={styles.explorerImage}>
          <MashalImage src={view.src} alt={view.alt} width={view.width} height={view.height} sizes="(min-width: 1000px) 820px, 94vw" aspectRatio={`${view.width} / ${view.height}`} />
        </div>
        <div className={styles.explorerMeta}>
          <span><i aria-hidden="true" />نمای واقعی سیستم</span>
          <Link href={view.href}>جزئیات {view.label}<ArrowLeft size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
  );
}
