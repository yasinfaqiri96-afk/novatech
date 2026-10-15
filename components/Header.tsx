"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, PhoneCall } from "lucide-react";
import { companyInfo } from "@/lib/site-content";

import styles from "./Header.module.css";
const links = [{href:"/",label:"صفحه اصلی"},{href:"/software-solutions",label:"نرم افزار و دیتابیس"},{href:"/web-design",label:"خدمات"},{href:"/portfolio",label:"نمونه کارها"},{href:"/about",label:"درباره ما"},{href:"/blog",label:"مقالات و راهنماها"},{href:"/contact",label:"تماس با ما"}];
export default function Header() {
  const path=usePathname();const [open,setOpen]=useState(false);const root=useRef<HTMLElement>(null);const trigger=useRef<HTMLButtonElement>(null);
  const close=()=>{setOpen(false);root.current?.querySelectorAll<HTMLDetailsElement>("details[data-mashal-menu]").forEach(d=>d.open=false)};
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==="Escape"){const summary=root.current?.querySelector<HTMLDetailsElement>("details[open]")?.querySelector<HTMLElement>("summary");setOpen(false);root.current?.querySelectorAll<HTMLDetailsElement>("details[data-mashal-menu]").forEach(d=>d.open=false);(trigger.current?.offsetParent ? trigger.current : summary)?.focus()}};const outside=(e:PointerEvent)=>{if(root.current&&!root.current.contains(e.target as Node)){setOpen(false);root.current.querySelectorAll<HTMLDetailsElement>("details[data-mashal-menu]").forEach(d=>d.open=false)}};const compact=window.matchMedia("(max-width:540px)");const syncGroups=()=>root.current?.querySelectorAll<HTMLDetailsElement>("details[data-mashal-menu] details").forEach(d=>{d.open=!compact.matches});syncGroups();compact.addEventListener("change",syncGroups);document.addEventListener("keydown",key);document.addEventListener("pointerdown",outside);return()=>{compact.removeEventListener("change",syncGroups);document.removeEventListener("keydown",key);document.removeEventListener("pointerdown",outside)}},[]);
  useEffect(()=>{if(open)root.current?.querySelector<HTMLElement>("nav a")?.focus()},[open]);
  return <header ref={root} id="header" className={styles.header}>
    <div className={styles.shell}>
      <Link href="/" aria-label="صفحه اصلی نواتیک"><Image src="/images/novatech-logo-v2.webp" alt={`لوگوی ${companyInfo.brandName} — ${companyInfo.legalName}`} width={1796} height={496} sizes="148px" priority className={styles.logo}/></Link>
      <nav className={`${styles.nav} ${open?styles.open:""}`} aria-label="منوی اصلی" id="main-navigation">
        <ul className={styles.list}>
          {links.slice(0,1).map(item=><li key={item.href}><Link href={item.href} onClick={close} aria-current={path===item.href?"page":undefined}>{item.label}</Link></li>)}
          <li><details data-mashal-menu className={styles.productMenu} onToggle={event=>{const current=event.currentTarget;if(current.open)root.current?.querySelectorAll<HTMLDetailsElement>("details[data-mashal-menu]").forEach(menu=>{if(menu!==current)menu.open=false})}}>
            <summary className={path.startsWith("/oil-and-gas-software") || path === "/accounting-software" ? styles.active : ""}>محصولات<ChevronDown size={15} aria-hidden="true"/></summary>
            <div className={styles.mega}><ul className={styles.products}>
              <li><Link href="/oil-and-gas-software" onClick={close}>مشعل؛ مدیریت تجارت نفت و گاز</Link></li>
              <li><Link href="/accounting-software" onClick={close}>ناظر؛ حسابداری و مدیریت مالی</Link></li>
            </ul></div>
          </details></li>
          <li><details data-mashal-menu className={styles.productMenu} onToggle={event=>{const current=event.currentTarget;if(current.open)root.current?.querySelectorAll<HTMLDetailsElement>("details[data-mashal-menu]").forEach(menu=>{if(menu!==current)menu.open=false})}}>
            <summary>خدمات<ChevronDown size={15} aria-hidden="true"/></summary>
            <div className={styles.mega}><ul className={styles.products}>
              <li><Link href="/software-solutions" onClick={close}>طراحی نرم افزار اختصاصی</Link></li>
              <li><Link href="/database-solutions" onClick={close}>طراحی دیتابس</Link></li>
              <li><Link href="/web-design" onClick={close}>طراحی ویب سایت</Link></li>
              <li><Link href="/graphic-design" onClick={close}>طراحی گرافیک</Link></li>
            </ul></div>
          </details></li>
          {links.slice(3).map(item=><li key={item.href}><Link href={item.href} onClick={close} aria-current={path===item.href?"page":undefined}>{item.label}</Link></li>)}
        </ul>
      </nav>
      <div className={styles.actions}><a href={`tel:${companyInfo.primaryPhoneHref}`} className={styles.phone} aria-label="تماس مستقیم با کارشناسان"><PhoneCall size={19}/><span>تماس</span></a><button ref={trigger} type="button" className={styles.toggle} onClick={()=>open?close():setOpen(true)} aria-label={open?"بستن منو":"باز کردن منو"} aria-expanded={open} aria-controls="main-navigation">{open?<X size={23}/>:<Menu size={23}/>}</button></div>
    </div>
  </header>;
}
