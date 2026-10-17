"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import data from "@/lib/portfolio-data.json";
import TabShape from "./TabShape";
import styles from "./Portfolio.module.css";

type Item = {
  kind: "software" | "website";
  title: string;
  img: string;
  desktopImg?: string;
  mobileImg?: string;
  category: string;
  location: string;
  link: string;
  imageAlt?: string;
  summary?: string;
  caseStudySlug?: string;
  cardColor: string;
};

const items = data as Item[];

const kinds = [
  { key: "all", label: "همه نمونه‌ها" },
  { key: "software", label: "نرم افزار اختصاصی" },
  { key: "website", label: "طراحی وب سایت" },
] as const;
type Kind = (typeof kinds)[number]["key"];

/* The three service glyphs under each card; the one a project used is lit. */
const services = [
  { key: "database", label: "Database", glyph: "triangle" },
  { key: "software", label: "Software", glyph: "square" },
  { key: "website", label: "Web Design", glyph: "circle" },
] as const;

const FAVOURITES_KEY = "novatech-portfolio-favourites";

/* Favourites live in localStorage; this tiny store lets React read them
   without a hydration mismatch (the server always sees none). */
const favouriteListeners = new Set<() => void>();
const favouriteStore = {
  read(): string {
    try { return localStorage.getItem(FAVOURITES_KEY) ?? "[]"; } catch { return "[]"; }
  },
  write(titles: string[]) {
    try { localStorage.setItem(FAVOURITES_KEY, JSON.stringify(titles)); } catch { /* storage unavailable */ }
    favouriteListeners.forEach(listener => listener());
  },
  subscribe(listener: () => void) {
    favouriteListeners.add(listener);
    return () => { favouriteListeners.delete(listener); };
  },
};

function hrefFor(item: Item) {
  if (item.caseStudySlug) return { href: `/portfolio/${item.caseStudySlug}`, external: false };
  return { href: item.link, external: item.link.startsWith("http") };
}

function Glyph({ shape }: { shape: "triangle" | "square" | "circle" }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      {shape === "triangle" && <path d="M6 1.2 11 10.5H1z" />}
      {shape === "square" && <rect x="1.5" y="1.5" width="9" height="9" rx="1" />}
      {shape === "circle" && <circle cx="6" cy="6" r="4.8" />}
    </svg>
  );
}

function Card({ item, favourite, onFavourite }: { item: Item; favourite: boolean; onFavourite: () => void }) {
  const { href, external } = hrefFor(item);
  const isSite = item.kind === "website";
  const lit = isSite ? "website" : "software";
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <article className={styles.card} style={{ "--c": item.cardColor } as React.CSSProperties}>
      <div className={styles.special} aria-hidden="true">
        <svg className={styles.specialStar} viewBox="0 0 24 24"><path d="M11.1 2.6a1 1 0 0 1 1.8 0l2.4 5 5.5.7a1 1 0 0 1 .6 1.7l-4 3.8 1 5.4a1 1 0 0 1-1.5 1.1L12 17.7l-4.9 2.6a1 1 0 0 1-1.5-1.1l1-5.4-4-3.8a1 1 0 0 1 .6-1.7l5.5-.7z" /></svg>
        <span className={styles.specialTab}>
          <TabShape w={110} h={22} flank={26} direction="up" className={styles.tabBg} />
          <span lang="en">SPECIAL</span>
        </span>
      </div>

      <button type="button" className={`${styles.fav} ${favourite ? styles.favOn : ""}`} onClick={onFavourite} aria-pressed={favourite} aria-label={favourite ? `حذف ${item.title} از علاقه‌مندی‌ها` : `افزودن ${item.title} به علاقه‌مندی‌ها`}>
        <span className={styles.favBg} aria-hidden="true">
          <svg viewBox="0 0 38 50" preserveAspectRatio="none"><path d="M38 0H0c17 0 19 50 38 50z" /></svg>
          <i />
          <svg viewBox="0 0 38 50" preserveAspectRatio="none"><path d="M0 0h38C21 0 19 50 0 50z" /></svg>
        </span>
        <svg className={styles.heart} viewBox="0 0 20 18" aria-hidden="true"><path d="M10 16.5S1.5 11.6 1.5 5.9A4.2 4.2 0 0 1 10 4a4.2 4.2 0 0 1 8.5 1.9c0 5.7-8.5 10.6-8.5 10.6Z" /></svg>
        <b className={styles.favText}>{favourite ? "ذخیره شد" : "افزودن به علاقه‌مندی‌ها"}</b>
      </button>

      <Link href={href} {...linkProps} className={`${styles.cardLink} ${isSite ? styles.isSite : ""}`} aria-label={`${item.title} — ${item.category}${external ? " (در پنجره جدید)" : ""}`}>
        <div className={styles.cardMedia}>
          <Image src={isSite ? item.desktopImg ?? item.img : item.img} alt={item.imageAlt ?? ""} fill sizes="(min-width: 800px) 34vw, 60vw" className={styles.cardMediaImg} />
        </div>
        <div className={styles.cardSide}>
          {isSite && item.mobileImg ? (
            <div className={styles.cardPhone}>
              <Image src={item.mobileImg} alt="" fill sizes="(min-width: 800px) 16vw, 40vw" className={styles.cardPhoneImg} />
            </div>
          ) : (
            <div className={styles.cardInfo}>
              <span className={styles.cardInfoCat}>{item.category}</span>
              <p>{item.summary}</p>
            </div>
          )}
          <span className={styles.cardLogo}>
            {isSite ? (
              <span lang="en" dir="ltr">{new URL(item.link).hostname.replace(/^www\./, "")}</span>
            ) : (
              <Image src="/images/brand/novatech-wordmark-white.webp" alt="" width={640} height={241} sizes="120px" />
            )}
          </span>
        </div>
        <span className={styles.cardArrow} aria-hidden="true">
          <svg className={styles.sideTab} viewBox="0 0 34 76" preserveAspectRatio="none"><path d="M0 0c0 8.5 34 8.5 34 21v34c0 12.5-34 12.5-34 21z" /></svg>
          <svg className={styles.arrowIcon} viewBox="0 0 24 24"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
        </span>
        <span className={styles.cardTitle}>
          <TabShape w={300} h={38} flank={40} direction="up" gradient={["#e0e0e0", "#ffffff"]} className={styles.tabBg} />
          <span className={styles.cardTitleText}>{item.title}</span>
        </span>
      </Link>

      <div className={styles.services}>
        <div className={styles.servicesTab}>
          <TabShape w={170} h={25} flank={34} direction="down" className={styles.tabBg} />
          {services.map(s => (
            <span key={s.key} className={s.key === lit ? styles.lit : undefined}><Glyph shape={s.glyph} /></span>
          ))}
        </div>
        <div className={styles.servicesHelp} aria-hidden="true">
          {services.map(s => (
            <span key={s.key} className={s.key === lit ? styles.lit : undefined}><b lang="en">{s.label}</b></span>
          ))}
        </div>
        <span className={styles.srOnly}>خدمت: {lit === "website" ? "طراحی وب سایت" : "نرم افزار اختصاصی"} — {item.location}</span>
      </div>
    </article>
  );
}

export default function PortfolioBoard() {
  const [kind, setKind] = useState<Kind>("all");
  const [field, setField] = useState<string | null>(null);
  const [fieldsOpen, setFieldsOpen] = useState(false);
  const favouritesJson = useSyncExternalStore(favouriteStore.subscribe, favouriteStore.read, () => "[]");
  const favourites = useMemo<string[]>(() => {
    try {
      const saved: unknown = JSON.parse(favouritesJson);
      return Array.isArray(saved) ? saved.filter((v): v is string => typeof v === "string") : [];
    } catch { return []; }
  }, [favouritesJson]);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [selector, setSelector] = useState<{ x: number; w: number } | null>(null);

  const fields = useMemo(() => [...new Set(items.map(i => i.category))], []);
  const visible = items.filter(i => (kind === "all" || i.kind === kind) && (!field || i.category === field));

  const toggleFavourite = (title: string) => {
    favouriteStore.write(favourites.includes(title) ? favourites.filter(t => t !== title) : [...favourites, title]);
  };

  // Slide the white curve under the active category.
  useEffect(() => {
    const place = () => {
      const wrap = tabsRef.current;
      const active = wrap?.querySelector<HTMLElement>("[aria-pressed='true']");
      if (!wrap || !active) return;
      const a = active.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      setSelector({ x: a.left - w.left + wrap.scrollLeft + a.width / 2, w: a.width });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [kind]);

  useEffect(() => {
    if (!fieldsOpen) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof PointerEvent && fieldsRef.current?.contains(e.target as Node)) return;
      setFieldsOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", close); };
  }, [fieldsOpen]);

  return (
    <section className={styles.board} aria-label="فهرست نمونه کارها">
      <div className={styles.container}>
        <div className={styles.menuWrap}>
          <div className={styles.menu}>
            <div className={styles.filters}>
              <div className={styles.fields} ref={fieldsRef}>
                <button type="button" className={styles.fieldsToggle} onClick={() => setFieldsOpen(o => !o)} aria-expanded={fieldsOpen} aria-controls="portfolio-fields">
                  <b className={field ? undefined : styles.placeholder}>{field ?? "زمینه فعالیت"}</b>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={fieldsOpen ? styles.flip : undefined}><path d="m6 9 6 6 6-6" /></svg>
                </button>
                <ul id="portfolio-fields" className={`${styles.fieldsList} ${fieldsOpen ? styles.fieldsOpen : ""}`}>
                  <li><button type="button" onClick={() => { setField(null); setFieldsOpen(false); }} aria-pressed={!field}>همه زمینه‌ها</button></li>
                  {fields.map(f => (
                    <li key={f}><button type="button" onClick={() => { setField(f); setFieldsOpen(false); }} aria-pressed={field === f}>{f}</button></li>
                  ))}
                </ul>
              </div>
              <div className={styles.cats} ref={tabsRef}>
                {kinds.map(k => (
                  <button key={k.key} type="button" onClick={() => setKind(k.key)} aria-pressed={kind === k.key} className={kind === k.key ? styles.catActive : undefined}>
                    {k.label}
                  </button>
                ))}
                {selector && (
                  <span className={styles.selector} style={{ transform: `translateX(calc(${selector.x}px - 50%))` }} aria-hidden="true">
                    <TabShape w={90} h={8} flank={22} direction="up" fill="#fff" className={styles.tabBg} />
                  </span>
                )}
              </div>
            </div>
            <div className={styles.connector} aria-hidden="true">
              <svg viewBox="0 0 150 56" preserveAspectRatio="none" focusable="false">
                <path fill="#562b51" d="M0 15h74c12 0 16-16 32-16h44v58h-44c-16 0-20-16-32-16H0z" />
                <path fill="#cd6c58" d="M0 15h82c12 0 16-15.5 32-15.5h36v57h-36c-16 0-20-15.5-32-15.5H0z" />
                <path fill="#07004c" d="M0 15h92c12 0 16-15 32-15h26v56h-26c-16 0-20-15-32-15H0z" />
              </svg>
              <span className={styles.connectorLogo}>
                <Image src="/images/brand/novatech-mark-white.webp" alt="" width={128} height={128} sizes="28px" />
              </span>
            </div>
            <div className={styles.request}>
              <Link href="/contact" className={styles.requestBtn}>ثبت درخواست مشاوره</Link>
            </div>
          </div>
        </div>

        <p className={styles.count} aria-live="polite">{visible.length} نمونه کار</p>
        <div className={styles.cards}>
          {visible.map(item => (
            <Card key={item.title} item={item} favourite={favourites.includes(item.title)} onFavourite={() => toggleFavourite(item.title)} />
          ))}
          {visible.length === 0 && <p className={styles.notFound}>نمونه کاری با این فیلتر پیدا نشد.</p>}
        </div>
      </div>
    </section>
  );
}
