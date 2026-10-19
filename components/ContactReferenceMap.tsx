"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { MapPin } from "lucide-react";

export default function ContactReferenceMap() {
  const [loaded,setLoaded]=useState(false);
  if(loaded) return <iframe title="موقعیت دفتر نواتیک در هرات" src="https://www.openstreetmap.org/export/embed.html?bbox=62.1751%2C34.3383%2C62.2151%2C34.3663&layer=mapnik&marker=34.3523%2C62.1952" loading="lazy" />;
  return <button type="button" onClick={()=>setLoaded(true)} aria-label="نمایش نقشه تعاملی دفتر نواتیک در هرات"><img src="/images/contact-reference/herat-map.webp" alt="نقشه موقعیت دفتر نواتیک در هرات" width="1000" height="670" loading="lazy"/><span><MapPin aria-hidden="true"/><b>نواتیک</b><small>نمایش نقشه</small></span></button>;
}
