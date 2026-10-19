"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";

import Link from "next/link";
import { validateLead } from "@/lib/lead";
import { companyInfo } from "@/lib/site-content";
import { buildWhatsappLeadLink } from "@/lib/whatsapp-link";

/** Novatech's WhatsApp number. Empty disables the hand-off entirely. */
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? companyInfo.primaryPhoneHref.replace(/\D/g, "");

type LeadFormProps = {
  /** Identifies which form on the site produced the lead. */
  source: string;
  className?: string;
  id?: string;
  children: ReactNode;
};

/**
 * "ok" is shown only when the server confirms a delivery target accepted the
 * lead. "manual" means nothing was recorded and the visitor must send the
 * prepared WhatsApp message themselves; "error" offers the same way out.
 */
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok"; message: string; whatsappUrl?: string }
  | { kind: "manual"; message: string; whatsappUrl?: string }
  | { kind: "error"; message: string; whatsappUrl?: string };

type ContactResponse = {
  ok: boolean;
  message: string;
  delivery?: "delivered" | "manual" | "failed";
  field?: string;
};

/**
 * Wraps the hand-styled marketing forms so they actually submit.
 * Markup stays where it is; this only owns submission, state and the live region.
 */
export default function LeadForm({ source, className, id, children }: LeadFormProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const lead = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      company: String(data.get("company") ?? ""),
      activity: String(data.get("activity") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const validation = validateLead({ ...lead, source });
    if (!validation.ok) {
      setStatus({ kind: "error", message: validation.message });
      form.querySelector<HTMLInputElement>(`[name="${validation.field}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    const whatsappUrl = buildWhatsappLeadLink(WHATSAPP_NUMBER, {
      ...lead,
      message: lead.message || undefined,
      source,
    });

    // Popup blockers only allow a window opened directly from the click, so the
    // tab is claimed here and pointed at WhatsApp once the server replies.
    const whatsappTab = whatsappUrl ? window.open("", "_blank") : null;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          website: data.get("website") ?? "",
          source,
        }),
      });
      const payload = (await response.json().catch(() => ({ ok: false, message: "" }))) as ContactResponse;
      // Offered as a link too, because a blocker can still eat the tab.
      const link = whatsappUrl ?? undefined;

      if (response.ok && payload.ok && payload.delivery === "delivered") {
        if (whatsappUrl && whatsappTab && !whatsappTab.closed) {
          whatsappTab.location.href = whatsappUrl;
        }
        setStatus({
          kind: "ok",
          message: whatsappUrl
            ? "درخواست شما ثبت شد. برای پیگیری سریع‌تر، پیام واتس‌اپ را هم ارسال کنید."
            : payload.message,
          whatsappUrl: link,
        });
        form.reset();
      } else if (payload.delivery === "manual" && whatsappUrl) {
        // Nothing was stored on the server: WhatsApp is the only route, so the
        // claimed tab goes there and the form keeps its values.
        if (whatsappTab && !whatsappTab.closed) whatsappTab.location.href = whatsappUrl;
        setStatus({
          kind: "manual",
          message: `درخواست هنوز ثبت نشده است. پیام آماده را در واتس‌اپ ارسال کنید یا با ${companyInfo.primaryPhoneLabel} تماس بگیرید.`,
          whatsappUrl: link,
        });
      } else {
        whatsappTab?.close();
        // Validation and rate-limit errors are the visitor's to fix; delivery
        // failures get the WhatsApp hand-off so the request is not lost.
        const deliveryProblem = payload.delivery === "failed" || payload.delivery === "manual" || response.status >= 500;
        setStatus({
          kind: "error",
          message: payload.message || "ارسال انجام نشد.",
          whatsappUrl: deliveryProblem ? link : undefined,
        });
        if (payload.field) form.querySelector<HTMLInputElement>(`[name="${payload.field}"]`)?.focus();
      }
    } catch {
      whatsappTab?.close();
      setStatus({
        kind: "error",
        message: "ارتباط با سرور برقرار نشد. اتصال خود را بررسی کنید یا از واتس‌اپ پیام دهید.",
        whatsappUrl: whatsappUrl ?? undefined,
      });
    }
  }

  return (
    <form
      id={id}
      ref={formRef}
      className={className}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby={statusId}
      aria-busy={status.kind === "sending"}
      data-pending={status.kind === "sending" ? "true" : undefined}
    >
      {children}
      <p className="text-xs leading-6 text-gray-600">معلومات شما برای پیگیری همین درخواست استفاده می‌شود. <Link href="/privacy" className="underline! underline-offset-2">پالیسی محرمیت</Link></p>

      {/* Honeypot: hidden from users and assistive tech, irresistible to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-px w-px -m-px overflow-hidden border-0 p-0 opacity-0"
      />

      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={
          status.kind === "idle"
            ? "absolute h-px w-px -m-px overflow-hidden p-0"
            : `w-full text-sm leading-6 ${
                status.kind === "error"
                  ? "text-red-700"
                  : status.kind === "manual"
                    ? "text-amber-800"
                    : status.kind === "ok"
                      ? "text-emerald-700"
                      : "text-gray-600"
              }`
        }
      >
        {status.kind === "sending"
          ? "در حال ارسال..."
          : status.kind !== "idle"
            ? status.message
            : "\u00a0"}
        {(status.kind === "ok" || status.kind === "manual" || status.kind === "error") && status.whatsappUrl ? (
          <>
            {" "}
            <a
              href={status.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              ارسال در واتس‌اپ
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}
