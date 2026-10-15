"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isMashalRoute } from "@/lib/mashal-navigation";
import { mashalCanonicalPath, mashalEnglishPath, mashalPashtoPath } from "@/lib/mashal";
export default function MashalContext({children}:{children:ReactNode}){
 const path=usePathname();if(!isMashalRoute(path))return <>{children}</>;
 const lang=path.startsWith('/en/')?'en':path.startsWith('/ps/')?'ps':'fa';
 const labels=lang==='en'?['Overview','Features','System modules','Customer implementation','Request a demo']:lang==='ps'?['پېژندنه','امکانات','د سیستم برخې','د کارونې بېلګه','د ډیمو غوښتنه']:['معرفی','امکانات','بخش‌های سیستم','نمونهٔ استفاده','درخواست دمو'];
 const hub=lang==='en'?mashalEnglishPath:lang==='ps'?mashalPashtoPath:mashalCanonicalPath;
 const hrefs=[hub,`${mashalCanonicalPath}/features`,`${mashalCanonicalPath}#control-layer`,'/portfolio/oil-and-gas-management-system',`${mashalCanonicalPath}#mashal-demo`];
 const selected=path.endsWith('/features')?1:path.startsWith('/portfolio/')?3:path.startsWith(mashalCanonicalPath+'/')?2:0;
 return <div className="mashal-context"><nav className="mashal-subnav" aria-label={lang==='en'?'Mashal navigation':lang==='ps'?'د مشعل لارې':'مسیر بررسی مشعل'}><div><span className="mashal-subnav-brand">MASHAL</span>{labels.map((label,i)=><Link key={label} href={hrefs[i]} aria-current={i===selected?'page':undefined} className={i===4?'mashal-subnav-demo':''}>{label}</Link>)}</div></nav>{children}</div>;
}
