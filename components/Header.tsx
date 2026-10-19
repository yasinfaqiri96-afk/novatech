"use client";
import Image from "next/image";
import Link from "next/link";
import IntentLink from "@/components/IntentLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { companyInfo } from "@/lib/site-content";
import logoEmblem from "../Mint Ribbon N Logo Emblem.jpg";

import styles from "./Header.module.css";

/* Header layout: three-column grid (right nav / centred logo / left nav + CTA),
   a navy tab at the top edge, and a white notch hanging under the logo that
   cuts into whatever sits below the header. All sizes are in `--u` units
   (see Header.module.css) so the whole header scales with the viewport. */

const products = [
  { href: "/oil-and-gas-software", label: "مشعل؛ مدیریت تجارت نفت و گاز", en: "Mashal Oil & Gas ERP" },
  { href: "/accounting-software", label: "ناظر؛ حسابداری و مدیریت مالی", en: "Nazer Accounting" },
];

// Same four distinct services as the footer and the home page; business systems and ERP
// overlap with database/software work, so they are reached from those pages instead.
const services = [
  { href: "/web-design", label: "طراحی سایت", en: "Web Design" },
  { href: "/software-solutions", label: "نرم‌افزار اختصاصی", en: "Custom Software" },
  { href: "/database-solutions", label: "طراحی و توسعه دیتابیس", en: "Database Solutions" },
  { href: "/graphic-design", label: "طراحی گرافیک", en: "Graphic Design" },
];

const flatLinks = [
  { href: "/portfolio", label: "نمونه کارها" },
  { href: "/blog", label: "مقالات و راهنماها" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/herat", label: "دفتر هرات" },
];

const ServicesIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 12 10.5v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 3 16.5z"/><path d="M15.2 2.9a1.2 1.2 0 0 1 2.1 0l4.1 7.2a1.2 1.2 0 0 1-1 1.9h-8.3a1.2 1.2 0 0 1-1-1.9z"/><circle cx="16.5" cy="17.5" r="4.5"/></svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.1 2.6a1 1 0 0 1 1.8 0l2.4 5 5.5.7a1 1 0 0 1 .6 1.7l-4 3.8 1 5.4a1 1 0 0 1-1.5 1.1L12 17.7l-4.9 2.6a1 1 0 0 1-1.5-1.1l1-5.4-4-3.8a1 1 0 0 1 .6-1.7l5.5-.7z"/></svg>
);
const ProductsIcon = () => (
  <svg viewBox="0 0 28 24" aria-hidden="true"><path d="M5.5 3h19A2.5 2.5 0 0 1 27 5.5v13a2.5 2.5 0 0 1-2.5 2.5H3.4a1 1 0 0 1-.9-1.3L3 18V5.5A2.5 2.5 0 0 1 5.5 3"/><text x="15" y="16.6" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#fff">ERP</text></svg>
);
const LeapIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.4 2.6a1 1 0 0 1 .3 1L17 20.5a1 1 0 0 1-1.8.3l-3.5-5.2-5.3 3.6a.6.6 0 0 1-.9-.6l.9-5.9-4.7-2a1 1 0 0 1 .1-1.9l17-6.4a1 1 0 0 1 .6.2"/></svg>
);

/** Grey shield with a navy diamond and a coral chevron; points down by default. */
export function NavBadge({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 20" aria-hidden="true" focusable="false">
      <path fill="#f1f1f1" d="M11 .5c.9 0 1.6.5 2.3 1.2l7 5.9c.9.8.9 2 .1 2.8l-7.8 8.2a2.2 2.2 0 0 1-3.2 0L1.6 10.4c-.8-.8-.8-2 .1-2.8l7-5.9C9.4 1 10.1.5 11 .5"/>
      <path fill="#47445f" stroke="#47445f" strokeWidth=".8" strokeLinejoin="round" d="M11 3.1 14 6.3 11 9.5 8 6.3z"/>
      <path fill="none" stroke="#54dcc6" strokeWidth="2.6" d="m4.8 9.3 6.2 6.2 6.2-6.2"/>
    </svg>
  );
}

export default function Header() {
  const path = usePathname();
  const [menuRequested, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(path);
  const menuOpen = menuRequested && menuPath === path;
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const productsMenu = useRef<HTMLDetailsElement>(null);

  const openMenu = (trigger: HTMLElement) => { lastTrigger.current = trigger; setMenuPath(path); setMenuOpen(true); };
  const closeMenu = () => setMenuOpen(false);
  const closeAll = () => { setMenuOpen(false); if (productsMenu.current) productsMenu.current.open = false; };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (productsMenu.current?.open) { productsMenu.current.open = false; productsMenu.current.querySelector("summary")?.focus(); }
      setMenuOpen(false);
    };
    const outside = (e: PointerEvent) => {
      if (productsMenu.current?.open && !productsMenu.current.contains(e.target as Node)) productsMenu.current.open = false;
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", outside); };
  }, []);

  // The header stays pinned on every page: publish its height so pinned sections and
  // anchor jumps land below it, and lift it with a shadow once the page moves under it.
  // Neither value is read synchronously on mount: reading layout (scrollY,
  // getBoundingClientRect) while the page hydrates forced the browser's first,
  // most expensive layout into the middle of a script task. Both observers
  // report after the browser has laid out on its own.
  useEffect(() => {
    const header = root.current;
    if (!header) return;
    const html = document.documentElement;
    const sizing = new ResizeObserver(([entry]) => {
      const height = `${Math.round(entry.borderBoxSize?.[0]?.blockSize ?? header.getBoundingClientRect().height)}px`;
      // A custom property on <html> invalidates the style of the whole page, so
      // it is only written when the header has actually changed height.
      if (html.style.getPropertyValue("--site-header-height") !== height) html.style.setProperty("--site-header-height", height);
    });
    sizing.observe(header);
    // `scrolled` is true once the page has moved more than 8px: a 1px marker at
    // y=8 leaving the viewport says the same thing without a scroll listener.
    const marker = document.createElement("span");
    marker.setAttribute("aria-hidden", "true");
    marker.style.cssText = "position:absolute;top:8px;left:0;width:1px;height:1px;pointer-events:none;visibility:hidden";
    document.body.prepend(marker);
    const scrolled = new IntersectionObserver(([entry]) => {
      const next = String(!entry.isIntersecting);
      if (header.dataset.scrolled !== next) header.dataset.scrolled = next;
    });
    scrolled.observe(marker);
    return () => { sizing.disconnect(); scrolled.disconnect(); marker.remove(); };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      panel.current?.querySelector<HTMLElement>("button, a")?.focus();
      return () => { document.body.style.overflow = previous; };
    }
    lastTrigger.current?.focus();
  }, [menuOpen]);

  const current = (href: string) => (path === href ? "page" : undefined);

  return (
    <>
      <header ref={root} id="header" className={`${styles.header} ${path !== "/" ? styles.inner : ""}`} lang="fa-AF" dir="rtl">
        <div className={styles.wrapper}>
          <svg className={styles.tab} viewBox="0 0 170 18" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M0 0h170c-10 0-18 2-23 9-4 6-9 9-19 9H42c-10 0-15-3-19-9-5-7-13-9-23-9"/>
          </svg>
          <div className={styles.container}>
            <div className={styles.grid}>
              <div className={`${styles.side} ${styles.right}`}>
                <button type="button" className={styles.mobileMenu} onClick={e => openMenu(e.currentTarget)} aria-label="باز کردن منو" aria-expanded={menuOpen} aria-controls="site-offcanvas">
                  <span className={`${styles.icon} ${styles.iconServices}`}><ServicesIcon /></span>
                  خدمات نواتیک
                </button>
                <nav className={styles.navContainer} aria-label="منوی اصلی">
                  <ul className={styles.nav}>
                    <li className={styles.item}>
                      <button type="button" className={styles.link} onClick={e => openMenu(e.currentTarget)} aria-expanded={menuOpen} aria-controls="site-offcanvas">
                        <span className={`${styles.icon} ${styles.iconServices}`}><ServicesIcon /></span>خدمات نواتیک
                      </button>
                    </li>
                    <li className={styles.item}>
                      <Link href="/portfolio" className={styles.link} aria-current={current("/portfolio")}>
                        <span className={`${styles.icon} ${styles.iconStar}`}><StarIcon /></span>نمونه‌کارها
                      </Link>
                    </li>
                    <li className={styles.item}>
                      <details ref={productsMenu} className={styles.dropdown}>
                        <summary className={styles.link}>
                          <span className={`${styles.icon} ${styles.iconProducts}`}><ProductsIcon /></span>محصولات
                        </summary>
                        <ul className={styles.dropdownList}>
                          {products.map(item => (
                            <li key={item.href}><IntentLink href={item.href} onClick={closeAll} aria-current={current(item.href)}>{item.label}</IntentLink></li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className={styles.logoCol}>
                <Link href="/" className={styles.logo} aria-label={`${companyInfo.brandName} — صفحه اصلی`}>
                  <span className={styles.circle}>
                    <span className={styles.circleInside} />
                    <span className={styles.circleMark}>
                      <Image src={logoEmblem} alt="" priority sizes="56px" />
                    </span>
                  </span>
                  <span className={styles.logotype}>
                    <Image src="/images/brand/novatech-wordmark-navy.webp" alt={`${companyInfo.brandName} — ${companyInfo.legalName}`} width={640} height={241} priority sizes="120px" />
                  </span>
                </Link>
              </div>

              <div className={`${styles.side} ${styles.left}`}>
                <nav className={styles.navContainer} aria-label="منوی تکمیلی">
                  <ul className={styles.nav}>
                    <li className={styles.item}>
                      <Link href="/blog" className={`${styles.link} ${styles.leap}`} aria-current={current("/blog")}>
                        <span className={`${styles.icon} ${styles.iconLeap}`}><LeapIcon /></span>مقالات
                      </Link>
                    </li>
                    <li className={styles.item}><Link href="/about" className={styles.link} aria-current={current("/about")}>درباره ما</Link></li>
                    <li className={styles.item}><Link href="/contact" className={styles.link} aria-current={current("/contact")}>تماس با ما</Link></li>
                  </ul>
                </nav>
                <div className={styles.btns}>
                  <Link href="/contact" className={styles.request}>
                    <span>درخواست مشاوره</span>
                    <NavBadge className={styles.requestBadge} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.notch} aria-hidden="true">
          <svg className={styles.notchShape} viewBox="0 0 270 65" focusable="false">
            <path d="M0 0h270c-17 0-21 9-25 20s-8 21-26 21h-65c-4 0-5 3-5 6 0 4-4 6-7 9l-5 6c-1 1.3-3 1.3-4 0l-5-6c-3-3-7-5-7-9 0-3-1-6-5-6H51C33 41 29 31 25 20S17 0 0 0"/>
          </svg>
          <NavBadge className={styles.notchBadge} />
        </div>
      </header>

      <div className={`${styles.overlay} ${menuOpen ? styles.overlayActive : ""}`} onClick={closeMenu} aria-hidden="true" />
      <div
        ref={panel}
        id="site-offcanvas"
        className={`${styles.offcanvas} ${menuOpen ? styles.offcanvasActive : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="منوی سایت"
        lang="fa-AF"
        dir="rtl"
        inert={!menuOpen}
      >
        <div className={styles.offcanvasHeader}>
          <IntentLink href="/" onClick={closeMenu} className={styles.offcanvasLogo} aria-label="صفحه اصلی نواتیک">
            <Image src="/images/brand/novatech-wordmark-navy.webp" alt="" width={640} height={241} sizes="150px" />
          </IntentLink>
          <button type="button" className={styles.offcanvasClose} onClick={closeMenu} aria-label="بستن منو">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className={styles.offcanvasBody}>
          <nav aria-label="راهنمای سایت" className={styles.offcanvasNav}>
            <ul className={styles.flatMenu}>
              <li><IntentLink href="/" onClick={closeMenu} aria-current={current("/")}>صفحه اصلی</IntentLink></li>
              {flatLinks.map(item => (
                <li key={item.href}><IntentLink href={item.href} onClick={closeMenu} aria-current={current(item.href)}>{item.label}</IntentLink></li>
              ))}
            </ul>
            {[{ title: "محصولات نواتیک", items: products }, { title: "خدمات نواتیک", items: services }].map(group => (
              <details key={group.title} className={styles.menuGroup} open={group.items.some(item => path === item.href) || undefined}>
                <summary>{group.title}<span aria-hidden="true" /></summary>
                <ul className={styles.levelMenu}>
                  {group.items.map(item => (
                    <li key={item.href}><IntentLink href={item.href} onClick={closeMenu} aria-current={current(item.href)}>{item.label}</IntentLink></li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>
          <div className={styles.offcanvasBtns}>
            <IntentLink href="/contact" onClick={closeMenu} className={styles.offcanvasRequest}>درخواست مشاوره</IntentLink>
            <a href={`tel:${companyInfo.primaryPhoneHref}`} className={styles.offcanvasPhone} dir="ltr">{companyInfo.primaryPhoneLabel}</a>
          </div>
        </div>
      </div>
    </>
  );
}
