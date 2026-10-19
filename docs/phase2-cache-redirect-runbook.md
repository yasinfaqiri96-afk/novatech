# راهنمای اجرایی Cache، Redirect و HSTS — مرحله دوم

این تنظیمات **هنوز روی production اعمال نشده‌اند.** هر بخش باید جداگانه اعمال و آزمایش شود و روش بازگشت آن مشخص است.
ترتیب پیشنهادی: ۱ (www)، ۲ (منبع no-store)، ۳ (Cache Rules)، ۴ (HSTS).

## وضعیت فعلی (اندازه‌گیری‌شده در ۲۷ مهر ۱۴۰۵ / 19 Oct 2026)

| مسیر | Cache-Control در production | cf-cache-status | Cache-Control ارسالی Next.js |
|---|---|---|---|
| HTML (`/`, `/blog`, …) | `no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0` | DYNAMIC | `s-maxage=31536000` |
| `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` | همان no-store | BYPASS / DYNAMIC | `public, max-age=0, must-revalidate` |
| `/favicon.ico`, `/icon.png` | همان no-store | BYPASS | `public, max-age=31536000, immutable` |
| `/_next/static/*` | `public, max-age=31536000, immutable` | HIT | همان |
| `/fonts/*`, `/images/*`, `/media/*` | `public, max-age=31536000, immutable` | MISS/HIT | همان |
| `/_next/image?...` | `public, max-age=31536000, must-revalidate` + `Vary: Accept` | DYNAMIC | همان |
| `/api/contact` | — | DYNAMIC | `no-store` (از این مرحله) |

- TTFB صفحات HTML از خارج: حدود ۱.۰۶ ثانیه، چون هر درخواست تا سرور اصلی می‌رود.
- Next.js هیچ‌جا `no-store` نمی‌فرستد. این هدر یا در nginx سرور اضافه می‌شود، یا با یک Rule در Cloudflare (Transform Rule، Page Rule یا Cache Rule).

---

## ۱. Redirect دائمی www → دامنه اصلی

**وضعیت فعلی:**
- `https://www.novatechsoft.com/` پاسخ 200 می‌دهد، با همان محتوا و canonical به دامنه بدون www.
- `http://www…` فقط به `https://www…` می‌رود.

**پیشنهاد:** Redirect در Cloudflare انجام شود. در این حالت درخواست اصلاً به سرور نمی‌رسد.

Cloudflare → Rules → Redirect Rules → Create rule (Single Redirect):
- **When incoming requests match:** Custom filter → `Hostname` `equals` `www.novatechsoft.com`
- **Then:** Dynamic
  - Expression: `concat("https://novatechsoft.com", http.request.uri.path)`
  - Status code: **301**
  - **Preserve query string: روشن**

DNS رکورد `www` باید Proxied (ابر نارنجی) بماند تا Rule اجرا شود.

**آزمایش (بعد از اعمال):**
```bash
curl -sI https://www.novatechsoft.com/contact?utm_source=x | grep -iE "^(HTTP|location)"
# انتظار: 301 و location: https://novatechsoft.com/contact?utm_source=x
curl -sI http://www.novatechsoft.com/blog | grep -iE "^(HTTP|location)"
# انتظار: 301 به https://novatechsoft.com/blog (حداکثر یک پرش اضافه برای http→https)
curl -sI https://novatechsoft.com/ | grep -iE "^HTTP"
# انتظار: 200 (هیچ حلقه‌ای نباشد)
```

**بازگشت:** غیرفعال کردن همین Rule.

**جایگزین nginx** (فقط اگر Cloudflare در دسترس نیست): یک server block جدا برای `www` با `return 301 https://novatechsoft.com$request_uri;`

---

## ۲. پیدا کردن و حذف منبع `no-store`

روی سرور (فقط خواندن):
```bash
sudo grep -rnE "no-store|proxy-revalidate|s-maxage=0|add_header +Cache-Control|expires" /etc/nginx/
```

در Cloudflare، این بخش‌ها را برای قاعده‌ای که Cache-Control را بازنویسی می‌کند بررسی کنید:
- Rules → Transform Rules (Modify Response Header)
- Page Rules
- Cache Rules

**پیشنهاد nginx** (داخل `server` دامنه اصلی):
```nginx
# API: never cached anywhere.
location /api/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    add_header Cache-Control "no-store" always;
}

# Everything else: pass Next.js's own Cache-Control through unchanged.
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # do NOT add Cache-Control / Expires / Pragma here
}
```

بعد از تغییر: `sudo nginx -t && sudo systemctl reload nginx`

**بازگشت:** فایل قبلی nginx را پیش از ویرایش کپی کنید (`sudo cp … …bak`)، سپس آن را برگردانید و reload کنید.

---

## ۳. Cache Rules در Cloudflare

**چرا کش HTML امن است:**
- همه صفحات سایت هنگام build به HTML ثابت تبدیل می‌شوند (فقط `/api/contact` پویاست).
- سایت cookie، ورود کاربر یا محتوای شخصی ندارد.
- درخواست‌های RSC در Next.js پارامتر `?_rsc=` دارند و Cloudflare به‌طور پیش‌فرض query string را در کلید کش نگه می‌دارد. پس پاسخ HTML و RSC هرگز با هم قاطی نمی‌شوند (طبق راهنمای CDN خود Next.js).

Rules → Cache Rules (ترتیب مهم است؛ قانون bypass باید اول باشد):

| # | شرط | تنظیم |
|---|---|---|
| 1 | `URI Path` starts with `/api/` | **Bypass cache** |
| 2 | `Hostname` equals `novatechsoft.com` **and** `URI Path` does not start with `/api/` **and** `URI Path` does not start with `/_next/image` | Eligible for cache · Edge TTL: **Ignore cache-control header, 1 day** · Browser TTL: **Respect origin** · Cache key: پیش‌فرض (**query string حذف نشود**) |
| 3 | (اختیاری، پس از تصمیم بخش ۳-ب) `URI Path` starts with `/_next/image` | Eligible · Edge TTL 30 days |

**پس از هر deploy باید کش purge شود** (Purge Everything یا API)، وگرنه نسخه قبلی تا ۱ روز سرو می‌شود:
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/purge_cache" \
  -H "Authorization: Bearer <API_TOKEN>" -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### ۳-ب. تصمیم درباره `/_next/image`

پاسخ‌های `/_next/image` بر اساس هدر `Accept` مرورگر AVIF یا WebP برمی‌گردانند (`Vary: Accept`). Cloudflare (در پلن‌های غیر Enterprise) `Vary: Accept` را رعایت نمی‌کند. اگر این مسیر کش شود، ممکن است AVIF به مرورگری برسد که آن را پشتیبانی نمی‌کند و تصویر خالی نمایش داده شود.

دو گزینه:
- **الف (امن، پیشنهادی):** در `next.config.ts`، `images.formats` به `["image/webp"]` تغییر کند، سپس قانون ۳ فعال شود. WebP در همه مرورگرهای فعلی پشتیبانی می‌شود. حجم کمی بیشتر از AVIF است، ولی تصاویر از edge نزدیک کاربر می‌رسند (بدون TTFB حدود ۱ ثانیه‌ای سرور).
- **ب:** وضعیت فعلی بماند (AVIF، بدون کش edge).

این تغییر در کد اعمال **نشده** و منتظر تصمیم شماست.

### آزمایش بعد از اعمال

```bash
# HTML: first MISS, then HIT
curl -sI https://novatechsoft.com/herat | grep -iE "cf-cache-status|age"
curl -sI https://novatechsoft.com/herat | grep -iE "cf-cache-status|age"     # expect HIT

# RSC request must stay RSC (content-type text/x-component), never HTML
curl -s -D - -o /dev/null -H "RSC: 1" "https://novatechsoft.com/herat?_rsc=1" | grep -iE "^(HTTP|content-type|location|cf-cache-status)"
# expect 307 to the correct _rsc hash or 200 text/x-component — never text/html

# API is never cached
curl -s -D - -o /dev/null -X POST -H "Content-Type: application/json" -d '{}' https://novatechsoft.com/api/contact | grep -iE "^(HTTP|cache-control|cf-cache-status)"
# expect: cache-control: no-store, cf-cache-status: DYNAMIC or BYPASS

# Client-side navigation still works: open the site, click header/footer links, use Back
```

**نشانه‌های مشکل و بازگشت:**
- اگر بعد از کلیک روی لینک‌ها کل صفحه reload شد یا HTML خام نمایش داده شد، یعنی RSC و HTML قاطی شده‌اند. در این صورت قانون ۲ را غیرفعال و Purge Everything کنید.

---

## ۴. HSTS

Cloudflare → SSL/TLS → Edge Certificates → **HTTP Strict Transport Security**:
- Max-Age: **6 months** (شروع محتاطانه)
- Include subdomains: فقط اگر همه زیردامنه‌ها HTTPS دارند
- Preload: **خاموش**، تا چند هفته بعد از پایداری

**بازگشت:** Max-Age را صفر کنید. توجه کنید مرورگرهایی که HSTS را دیده‌اند تا پایان Max-Age آن را نگه می‌دارند.

---

## Cache Policy پیشنهادی برای هر نوع فایل

| نوع | مرورگر | Cloudflare edge | دلیل |
|---|---|---|---|
| HTML صفحات | بازبینی در هر بار (Next.js max-age نمی‌فرستد) | 1 روز + purge بعد از deploy | صفحات ثابت‌اند؛ purge نسخه جدید را فوری می‌رساند |
| درخواست‌های RSC (`?_rsc=`) | همان | همان (کلید شامل `_rsc`) | پیمایش client-side سریع |
| `/_next/static/*` | 1 سال immutable | 1 سال | نام فایل hash دارد |
| `/fonts/*`, `/images/*`, `/media/*` | 1 سال immutable | 1 سال | در صورت تغییر محتوا، نام فایل عوض شود |
| `/_next/image` | 1 سال | فقط با گزینه الف | مشکل `Vary: Accept` |
| `robots.txt`, `sitemap.xml`, `manifest` | max-age=0 | 1 روز (قانون ۲) + purge | سبک‌اند؛ purge بعد از deploy کافی است |
| `/api/*` | no-store | Bypass | داده شخصی |
