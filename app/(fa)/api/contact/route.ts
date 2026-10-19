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
 * - "delivered": at least one server-side target accepted the lead.
 * - "manual": no target is configured, so nothing was recorded on the server;
 *   the visitor has to send the prepared WhatsApp message (or call) themselves.
 * - "failed": targets are configured but every one of them refused the lead.
 */
type Delivery = "delivered" | "manual" | "failed";

/** Error text only: target errors never contain the lead's personal data. */
const reason = (error: unknown) => (error instanceof Error ? error.message : String(error)).slice(0, 400);

/**
 * Delivers the lead to every configured target. WhatsApp is the primary route;
 * an optional webhook runs alongside it. The lead counts as delivered only when
 * at least one target accepts it, and every failed attempt is logged with its
 * cause.
 */
async function forward(lead: LeadPayload): Promise<Delivery> {
  const at = new Date();
  const targets: Array<{ name: string; send: Promise<void> }> = [];

  if (isWhatsappConfigured()) {
    targets.push({ name: "whatsapp", send: sendWhatsAppLead(lead, at) });
  }
  if (process.env.LEAD_WEBHOOK_URL) {
    targets.push({ name: "webhook", send: postWebhook(lead, at) });
  }

  if (targets.length === 0) {
    console.error(`[lead] no delivery target configured; source=${JSON.stringify(lead.source)} handed to the visitor's WhatsApp`);
    return "manual";
  }

  const results = await Promise.allSettled(targets.map((target) => target.send));
  results.forEach((result, index) => {
    if (result.status === "rejected") console.error(`[lead] ${targets[index].name} failed: ${reason(result.reason)}`);
  });
  if (results.every((result) => result.status === "rejected")) {
    console.error(`[lead] delivery failed on every target; source=${JSON.stringify(lead.source)}`);
    return "failed";
  }
  return "delivered";
}

export async function POST(request: Request) {
  // Cloudflare sets CF-Connecting-IP itself, so a client cannot forge it the way
  // it can prepend entries to X-Forwarded-For.
  const ip =
    request.headers.get("cf-connecting-ip") ||
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

  let delivery: Delivery;
  try {
    delivery = await forward(result.data);
  } catch (error) {
    console.error(`[lead] delivery threw: ${reason(error)}`);
    delivery = "failed";
  }

  if (delivery === "manual") {
    // Nothing was recorded, so this is not a success: the client keeps the form
    // filled in and points the visitor at WhatsApp or the phone instead.
    return NextResponse.json(
      { ok: false, delivery, message: "درخواست هنوز ثبت نشده است. برای ثبت، پیام آماده را در واتس‌اپ ارسال کنید یا تماس بگیرید." },
      { status: 503 }
    );
  }
  if (delivery === "failed") {
    return NextResponse.json(
      { ok: false, delivery, message: "ثبت درخواست با خطا مواجه شد. لطفاً از واتس‌اپ پیام دهید یا تماس بگیرید." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, delivery, message: result.message });
}
