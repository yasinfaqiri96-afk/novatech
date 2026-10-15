import { NextResponse } from "next/server";
import { validateLead, type LeadPayload } from "@/lib/lead";
import { isWhatsappConfigured, sendWhatsAppLead } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * In-process rate limit. Enough to stop a single browser/script hammering the
 * endpoint; put a real gateway limit in front of it for anything serious.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  // Drop only entries whose window has expired. Clearing the whole map would
  // let anyone reset every other caller's counter just by filling it up.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (k !== key && now - times[times.length - 1] >= WINDOW_MS) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

async function postWebhook(lead: LeadPayload, at: Date): Promise<void> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) throw new Error("webhook not configured");
  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, at: at.toISOString() }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
}

/**
 * Delivers the lead to every configured target. WhatsApp is the primary route;
 * an optional webhook runs alongside it. The lead counts as delivered when at
 * least one target accepts it, and every attempt is logged either way.
 */
async function forward(lead: LeadPayload): Promise<"whatsapp" | "delivered"> {
  const at = new Date();
  const targets: Array<Promise<void>> = [];

  if (isWhatsappConfigured()) {
    targets.push(sendWhatsAppLead(lead, at));
  }
  if (process.env.LEAD_WEBHOOK_URL) {
    targets.push(postWebhook(lead, at));
  }

  if (targets.length === 0) {
    return "whatsapp";
  }

  const results = await Promise.allSettled(targets);
  for (const result of results) {
    if (result.status === "rejected") console.error("[lead] target failed");
  }
  if (results.every((result) => result.status === "rejected")) {
    // Record failure metadata without exposing personal lead data.
    console.error("[lead] delivery failed");
    throw new Error("no delivery target accepted the lead");
  }
  return "delivered";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "تعداد درخواست ها زیاد است. کمی بعد دوباره تلاش کنید." },
      { status: 429 }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "درخواست نامعتبر است." }, { status: 400 });
  }

  // Honeypot: real users never fill a hidden field.
  if (typeof raw === "object" && raw !== null && String((raw as Record<string, unknown>).website ?? "")) {
    return NextResponse.json({ ok: true, message: "درخواست شما ثبت شد." });
  }

  const result = validateLead(raw);
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message, field: result.field }, { status: 400 });
  }
  if (!result.data) {
    return NextResponse.json({ ok: false, message: "درخواست نامعتبر است." }, { status: 400 });
  }

  let delivery: "whatsapp" | "delivered";
  try {
    delivery = await forward(result.data);
  } catch {
    console.error("[lead] delivery failed");
    return NextResponse.json(
      { ok: false, message: "ثبت درخواست با خطا مواجه شد. لطفا تماس بگیرید." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, delivery, message: delivery === "whatsapp" ? "برای تکمیل درخواست، پیام واتس‌اپ را ارسال کنید." : result.message });
}
