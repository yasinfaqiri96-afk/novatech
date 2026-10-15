export type LeadPayload = {
  name: string;
  phone: string;
  company?: string;
  activity?: string;
  message?: string;
  source: string;
};

export type LeadResult =
  | { ok: true; message: string }
  | { ok: false; message: string; field?: keyof LeadPayload };

/** Afghan mobile number, with 0, +93, or 93 prefix and Persian digits. */
const PHONE_RE = /^(?:(?:\+?93)?7\d{8}|07\d{8})$/;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toLatinDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (d) => {
    const p = PERSIAN_DIGITS.indexOf(d);
    return String(p >= 0 ? p : ARABIC_DIGITS.indexOf(d));
  });
}

export function validateLead(raw: unknown): LeadResult & { data?: LeadPayload } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, message: "درخواست نامعتبر است." };
  }
  const body = raw as Record<string, unknown>;

  const name = String(body.name ?? "").trim();
  const phone = toLatinDigits(String(body.phone ?? "")).replace(/[\s\-()]/g, "");
  const company = String(body.company ?? "").trim();
  const activity = String(body.activity ?? "").trim();
  const message = String(body.message ?? "").trim();
  const source = String(body.source ?? "unknown").slice(0, 64);

  if (name.length < 3) {
    return { ok: false, message: "نام و نام خانوادگی را کامل وارد کنید.", field: "name" };
  }
  if (name.length > 120) {
    return { ok: false, message: "نام وارد شده بیش از حد طولانی است.", field: "name" };
  }
  if (!PHONE_RE.test(phone)) {
    return { ok: false, message: "شماره تماس معتبر نیست.", field: "phone" };
  }
  if (source === "mashal-product-page" && company.length < 2) {
    return { ok: false, message: "نام شرکت را وارد کنید.", field: "company" };
  }
  if (source === "mashal-product-page" && activity.length < 2) {
    return { ok: false, message: "نوع فعالیت را انتخاب کنید.", field: "activity" };
  }
  if (company.length > 160) {
    return { ok: false, message: "نام شرکت بیش از حد طولانی است.", field: "company" };
  }
  if (activity.length > 240) {
    return { ok: false, message: "شرح فعالیت بیش از حد طولانی است.", field: "activity" };
  }
  if (message.length > 2000) {
    return { ok: false, message: "متن پیام بیش از حد طولانی است.", field: "message" };
  }

  return {
    ok: true,
    message: "درخواست شما ثبت شد. همکاران ما در اولین فرصت تماس می گیرند.",
    data: {
      name,
      phone,
      company: company || undefined,
      activity: activity || undefined,
      message: message || undefined,
      source,
    },
  };
}
