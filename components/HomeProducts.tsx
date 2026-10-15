import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import styles from "./HomeProducts.module.css";

/**
 * The two Novatech products, given the first full section after the hero.
 * Mashal shows a real screen of the product; Nazer has no published
 * screenshots yet, so its panel is typographic rather than a borrowed image.
 */
const products = [
  {
    key: "mashal",
    label: "ERP تخصصی نفت و گاز",
    name: "مشعل",
    latin: "MASHAL",
    text: "قرارداد، بارگیری، حمل، تانک، فروش، حساب شرکا و راپور مفاد شرکت نفتی در یک جریان کاری و یک دیتابیس.",
    points: ["قرارداد، بارگیری و حمل", "موجودی تانک و فروش", "حساب شرکا و راپور مفاد"],
    href: "/oil-and-gas-software",
    cta: "معرفی کامل مشعل",
    demoHref: "/oil-and-gas-software#mashal-demo",
  },
  {
    key: "nazer",
    label: "حسابداری و مدیریت مالی",
    name: "ناظر",
    latin: "NAZER",
    text: "نرم افزار حسابداری نواتیک برای ثبت روزانه حسابات، پیگیری دریافت و پرداخت و دیدن وضعیت مالی کسب و کار در راپورهای روشن.",
    points: ["حسابات و مانده‌ها", "دریافت، پرداخت و مصارف", "راپورهای مالی برای مدیر"],
    href: "/accounting-software",
    cta: "آشنایی با ناظر",
    demoHref: "/accounting-software#order",
  },
] as const;

export default function HomeProducts() {
  return (
    <section className={styles.section} aria-labelledby="ready-products-title">
      <header className={styles.head}>
        <p className={styles.kicker}>محصولات تخصصی نواتیک</p>
        <h2 id="ready-products-title" className={styles.title}>
          دو نرم‌افزار، یک هدف: <span>کنترل دقیق تجارت و حسابات</span>
        </h2>
        <p className={styles.lead}>
          مشعل برای شرکت‌های واردات و توزیع مواد نفتی و ناظر برای حسابداری کسب و کار؛ هر دو طراحی و پشتیبانی شده توسط تیم نواتیک در هرات.
        </p>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.key} className={`${styles.card} ${styles[product.key]}`}>
            <div className={styles.visual}>
              {product.key === "mashal" ? (
                <Image
                  src="/images/mashal/mashal-dashboard-overview.webp"
                  alt="داشبورد واقعی نرم افزار مشعل با قراردادها، بارها، موجودی و راپورهای مالی"
                  width={1920}
                  height={948}
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className={styles.screen}
                />
              ) : (
                <div className={styles.mark} aria-hidden="true">
                  <span className={styles.markName}>ناظر</span>
                  <span className={styles.markLatin}>NAZER · ACCOUNTING</span>
                </div>
              )}
            </div>
            <div className={styles.body}>
              <span className={styles.label}>{product.label}</span>
              <h3 className={styles.name}>
                {product.name} <span dir="ltr">| {product.latin}</span>
              </h3>
              <p className={styles.text}>{product.text}</p>
              <ul className={styles.points}>
                {product.points.map((point) => (
                  <li key={point}>
                    <Check size={16} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className={styles.actions}>
                <Link href={product.href} className={styles.primary}>
                  {product.cta}
                  <ArrowLeft size={16} aria-hidden="true" />
                </Link>
                <Link href={product.demoHref} className={styles.secondary}>
                  درخواست دمو
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
