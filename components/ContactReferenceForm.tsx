"use client";

import { useState } from "react";
import { ArrowUpLeft } from "lucide-react";
import LeadForm from "@/components/LeadForm";

export default function ContactReferenceForm({ className, buttonClassName }: { className: string; buttonClassName: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  return (
    <div onReset={()=>{setEmail("");setMessage("");}} onSubmitCapture={event=>{
      const emailInput = event.currentTarget.querySelector<HTMLInputElement>('input[type="email"]');
      if (emailInput && !emailInput.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        emailInput.reportValidity();
      }
    }}><LeadForm id="contact-request" source="contact-page" className={className}>
      <input id="contact-name" name="name" type="text" autoComplete="name" required aria-label="نام و نام خانوادگی" placeholder="نام و نام خانوادگی" />
      <input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-label="موبایل" placeholder="موبایل" />
      <select id="contact-subject" name="activity" aria-label="انتخاب موضوع" defaultValue=""><option value="">انتخاب موضوع</option><option>مشاوره نرم‌افزار</option><option>طراحی سایت</option><option>سیستم‌های مدیریتی</option><option>سایر موارد</option></select>
      <input id="contact-email" name="contactEmail" type="email" autoComplete="email" aria-label="آدرس ایمیل (اختیاری)" placeholder="آدرس ایمیل (اختیاری)" value={email} onChange={event=>setEmail(event.target.value)} />
      <textarea id="contact-message" name="contactMessage" aria-label="متن نظر یا سوال" placeholder="متن نظر یا سوال..." value={message} onChange={event=>setMessage(event.target.value)} />
      <input type="hidden" name="message" value={email ? `ایمیل: ${email}\n${message}` : message} />
      <button className={buttonClassName} type="submit"><span>ارسال</span><ArrowUpLeft aria-hidden="true" /></button>
    </LeadForm></div>
  );
}
