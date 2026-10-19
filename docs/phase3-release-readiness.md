# آمادگی انتشار مرحله سوم — نواتیک

تاریخ بررسی: 2026-10-19 (۱۴۰۵/۷/۲۷)
وضعیت Git: شاخه `main`، آخرین Commit `754d0cb`؛ تغییرات سه مرحله Commit نشده‌اند. Stash قدیمی `stash@{0}` دست‌نخورده است.
**در این مرحله هیچ Commit، Push، Deploy، Stash، Reset و هیچ تغییری در Cloudflare، nginx یا سرور انجام نشد.**

## خلاصه تصمیم

| پرسش | پاسخ |
| --- | --- |
| همه تست‌ها موفق‌اند؟ | **بله** — ۲۸/۲۸ Unit Test، Build، TypeScript، SEO Audit و JSON-LD بدون خطا؛ ESLint بدون خطا با ۱ هشدار قدیمی |
| آماده Staging؟ | **بله**، با `noindex` در Staging و بدون تنظیم مقصد واقعی فرم (بخش ۴) |
| آماده Production؟ | **خیر** — سه مانع حقوقی/عملیاتی باقی است: تصاویر وب‌سیما، اجازه انتشار لوگوی مشتریان و اطلاعات کارکنان، و تنظیم مقصد ثبت درخواست‌ها (بخش ۵) |

## ۱. مشکلات حل‌شده

### وظیفه ۱ — موارد فهرست تأیید مالک که با اطلاعات موجود قابل اصلاح بودند

| مورد | تحلیل | اقدام |
| --- | --- | --- |
| «۹ سامانه» در About و «۱۲ نمونه‌کار» | **دو عدد یک چیز را اندازه نمی‌گیرند.** عدد ۹ از نخستین نسخه پروژه (Commit `31c9131`) دستی تایپ شده و برچسبش «سامانه و وب سایت منتشر شده» است. صفحه نمونه‌کارها ۱۳ مورد دارد: ۹ نرم‌افزار + ۴ وب‌سایت؛ ۱۲ مورد صفحه جزئیات دارند (مورد «نرم افزار تانک تیل» صفحه ندارد). یعنی ۹ فقط با تعداد نرم‌افزارها جور است، در حالی که برچسب وب‌سایت‌ها را هم شامل می‌کند؛ تناقض در صفحه دیده می‌شد. | عدد حالا از خود داده نمونه‌کارها شمرده می‌شود (۱۳) با برچسب دقیق «سامانه و وب سایت در صفحه نمونه کارها»؛ هر بازدیدکننده می‌تواند آن را در `/portfolio` بشمارد. **تعداد کل پروژه‌های تحویل‌شده شرکت** همچنان منتشر نمی‌شود تا مالک تأیید کند. |
| ادعاهای بدون مدرک در `/software-solutions` | «کارشناسان ارشد فنی … در کوتاه‌ترین زمان»، «کاملاً یکپارچه و بدون خطا»، «پشتیبانی همیشه در دسترس»، «رابط کاربری بسیار نرم»، «کاملاً رایگان» | به «کارشناسان فنی ما»، «در یک سیستم یکپارچه»، «پشتیبانی بعد از استقرار»، «رابط کاربری ساده»، «مشاوره رایگان و تخصصی» تغییر کرد. پیشنهاد «مشاوره رایگان» حفظ شد چون سیاست تجاری است و از مراحل قبل منتشر شده؛ در فهرست تأیید باقی است. |
| لینک فیسبوک «سید مهدی کاظمی» | به پروفایل `facebook.com/reza.kazemi.7583` می‌رفت؛ نام پروفایل با نام کارمند نمی‌خواند. | **حذف شد.** نوع داده `socialLinks` اختیاری شد و بخش تیم صفحه اصلی (`HomeTeamScroll`) فقط لینک‌های موجود را نشان می‌دهد. |
| تست Footer | بخش ۱-۲ | حل شد |
| پلن‌های ناظر | بخش ۱-۳ | حل شد (بدون حدس) |

بقیه ۱۴ مورد (سال تأسیس، Case Study، اجازه تصاویر، مشخصات کارکنان، نتایج پروژه‌ها و …) بدون سند قابل اصلاح نیستند و در بخش ۲ باقی‌اند.

### ۱-۲. Footer و تست شکست‌خورده

- تست قدیمی `Mashal retains grouped guides in the footer` انتظار داشت `components/Footer.tsx` آرایه `mashalNavigationGroups` (۲۲ لینک راهنمای مشعل در یک `<details>`) را رندر کند.
- در HEAD این بخش وجود داشت. بازطراحی Footer در کار Commit‌نشده مرحله قبل آن را برداشته و Footer را به مجموعه گزینش‌شده‌ای از لینک‌ها تبدیل کرده است. توضیح خود کد آن انتخاب را عمدی می‌نامد («Four distinct services … their pages stay reachable from related-service strips, articles and the sitemap»). همان کار، مسیرهای مشعل را عمداً به `lib/mashal-paths.ts` منتقل کرد تا کاتالوگ مشعل وارد bundle همه صفحات نشود.
- راهنماها هنوز در دسترس‌اند: صفحه `/oil-and-gas-software` فهرست کامل همه صفحات موضوعی را دارد (`mashalIntentPages.map`)، هر صفحه موضوعی به صفحات هم‌گروه لینک می‌دهد، نسخه‌های پشتو و انگلیسی از Hero مشعل لینک دارند و Footer همچنان به محصول مشعل و «امکانات مشعل» لینک می‌دهد. `npm run seo:audit` هیچ صفحه یتیمی گزارش نمی‌کند (۶۳/۶۳).
- **تصمیم:** حذف عمدی بوده؛ تست با رفتار فعلی هماهنگ شد، بدون پنهان کردن خطا. تست به دو تست تبدیل شد: (۱) Footer باید به محصول و امکانات مشعل لینک بدهد، صفحه محصول باید همه راهنماها و نسخه‌های fa/ps/en را لینک کند و صفحات موضوعی باید به هم لینک بدهند؛ (۲) قلم‌های فارسی مشعل (همان بررسی‌های قبلی، بدون تغییر).
- `lib/mashal-navigation.ts` اکنون هیچ import ندارد (کد مرده). حذف نشد؛ برای پاکسازی در Commit جداگانه پیشنهاد می‌شود.

### ۱-۳. پلن‌های ناظر

| سطر | مقدار قبلی | منبع | مقدار فعلی |
| --- | --- | --- | --- |
| پایه — تعداد کاربران | 3 کاربر | بدون منبع | پس از نیازسنجی |
| پایه — مدت استقرار | 7 (بدون واحد) | بدون منبع | پس از نیازسنجی |
| پایه — نوع پشتیبانی | 1 (بی‌معنا) | بدون منبع | پس از نیازسنجی |
| حرفه‌ای — مدت استقرار | 10 (بدون واحد) | بدون منبع | پس از نیازسنجی |
| حرفه‌ای — تعداد کاربران | 2 (کمتر از پلن پایه) | بدون منبع | پس از نیازسنجی |
| سازمانی — مدت استقرار | 15 (بدون واحد) | بدون منبع | پس از نیازسنجی |
| قیمت هر سه پلن | «استعلام / قیمت پس از نیازسنجی» | — | بدون تغییر |
| امکانات متنی هر پلن، «چندبخشی»، «اختصاصی»، «تیم کامل» | — | بدون منبع، ولی کیفی و غیرمتناقض | بدون تغییر؛ در فهرست تأیید |

همین مقادیر در نخستین Commit پروژه (`31c9131`) و همه نسخه‌های بعدی یکسان‌اند و در هیچ سند، README یا فایل محتوایی پروژه منبعی برایشان پیدا نشد؛ بنابراین واحد «روز» یا هر عدد دیگری حدس زده نشد. عبارت «پس از نیازسنجی» همان عبارتی است که صفحه برای قیمت به کار می‌برد. تست `Nazer plans publish no unconfirmed limits` از بازگشت عدد بی‌واحد جلوگیری می‌کند.

### ۱-۴. اعتبار برند، لینک‌ها و داده شخصی

- **Organization:** نام، تلفن، ایمیل، آدرس و `sameAs` در هر ۶۳ صفحه یکسان‌اند (`npm run seo:jsonld`) و همه از `lib/site-content.ts` خوانده می‌شوند. جستجو در کد هیچ تلفن، ایمیل یا آدرس دیگری خارج از این فایل پیدا نکرد. همه این اطلاعات در Footer هر صفحه دیده می‌شوند.
- **SoftwareApplication:** ناظر فقط امکاناتی را دارد که پنل Hero صفحه نشان می‌دهد (بدون تصویر و سیستم‌عامل)؛ مشعل امکانات سطح A سند `docs/MASHAL-PHASE2-EVIDENCE.md` و ۹ تصویر واقعی موجود را دارد.
- **Person:** فقط نام، نقش و عکسی که در کارت تیم `/about` دیده می‌شود؛ `@id` هر نفر به کارت قابل‌مشاهده می‌رسد. لینک شخصی شبکه اجتماعی در Schema منتشر نمی‌شود (تست جلوگیری می‌کند).
- **نام برند:** «Novatech Technology Solutions / نواتیک»؛ تنها «NOVATECH» باقی‌مانده نوشته تزئینی `aria-hidden` روی ساعت صفحه تماس است.
- **داده شخصی:** مسیر `/api/contact` اطلاعات فرم را در لاگ نمی‌نویسد (فقط `source` و متن خطا)، Honeypot و Rate limit دارد و پاسخش `Cache-Control: no-store` است. داده شخصی منتشرشده در سایت: نام، نقش و عکس سه کارمند، و لینک‌های اینستاگرام/فیسبوک شخصی آنها روی صفحه اصلی؛ اجازه انتشار هنوز ثبت نشده (بخش ۲).

### ۱-۵. جداسازی فایل‌ها

- `.gitignore` اکنون خروجی ابزارهای محلی را نادیده می‌گیرد: `/.output/` (۱۴ MB خروجی ابزار دیگر)، `/.manus/`، `/.wrangler/`، `/.claude/`، `/.work/`، `debug.log`. جستجوی الگوهای کلید/توکن در این پوشه‌ها فقط متن راهنمای ابزار را پیدا کرد، نه اعتبارنامه. هیچ فایلی حذف یا جابه‌جا نشد.
- فایل `.env` واقعی در پروژه نیست؛ فقط `.env.example` (بدون مقدار محرمانه).

## ۲. مواردی که هنوز تأیید مالک لازم دارند

| # | مورد | مانع Production؟ |
| --- | --- | --- |
| A | **تصاویر و ویدیوی وب‌سیما.** طبق `public/images/web-design-reference/SOURCE.md` و `docs/websima-home-reference.md`، این فایل‌ها از websima.com (یک شرکت دیگر) دانلود شده‌اند و اکنون در سایت نواتیک نمایش داده می‌شوند: آثار `web-design-reference/*` در `/web-design` و بخش طراحی سایت صفحه اصلی (`WebDesignHero`، `CorporateDesign`)، دو بنر Footer در **همه صفحات** (`ecommerce-banner.webp`, `seo-banner.webp` از روی `ecommerce.webp`/`seo.webp` وب‌سیما)، و در `/contact` فایل‌های `45555555.svg`، `3239763752-1.svg` و `Comp-3.mp4` (همان نام‌ها در `websima.txt`). فایل منشأ می‌گوید «Original artwork remains attributable to its original owner». بخشی از این‌ها در HEAD هم هست (Commit `25313e2`)؛ اگر HEAD روی سرور است، **احتمالاً همین حالا منتشر شده‌اند**. | **بله** — مجوز کتبی یا جایگزینی با اثر خود نواتیک |
| B | قلم‌های `YekanBakh-VF.woff2` و `Poppins-Light.woff2` در `public/images/contact-reference/` (صفحه تماس) و IRANYekanX در `public/fonts` | بله برای قلم تجاری بدون مجوز (YekanBakh و IRANYekan تجاری‌اند؛ Poppins آزاد است). مجوز وب را تأیید کنید |
| C | ۲۱ لوگوی مشتری در «برندهایی که به ما اعتماد کرده‌اند» — از جمله نام‌هایی مثل «TURD KFC»، «Super Cola»، «Manoto Potato Chips» که شبیه علامت تجاری شرکت‌های دیگرند | بله — فهرست مشتریان واقعی و اجازه نمایش لوگو |
| D | اجازه انتشار نام، عکس و نقش سه کارمند و لینک‌های شخصی باقی‌مانده: `instagram.com/haji_yaser_faqiri`، `facebook.com/yaser.faghery`، `instagram.com/aliahmadbakhtyari`، `facebook.com/aliJoO.2006`، `instagram.com/mahdi_kazemi1212` | بله (داده شخصی) |
| E | مقصد ثبت درخواست‌ها در Production: `WHATSAPP_*` یا `LEAD_WEBHOOK_URL` باید روی سرور تنظیم باشد؛ بدون آن فرم درخواست را ثبت نمی‌کند و کاربر را به واتس‌اپ خودش می‌فرستد (رفتار طراحی‌شده، ولی هیچ Lead در سرور ثبت نمی‌شود). از کد قابل بررسی نیست. | بله |
| F | مقادیر واقعی پلن‌های ناظر (تعداد کاربر، مدت استقرار با واحد، سطح پشتیبانی، امکانات هر پلن) | خیر (اکنون «پس از نیازسنجی» نمایش داده می‌شود) |
| G | سال شروع ۱۳۹۵ و نقاط زمانی About؛ تعداد کل پروژه‌های تحویل‌شده؛ «۶ حوزه کاری» | خیر |
| H | ادعاهای موجود: «جلسه اول/مشاوره رایگان»، «پروژه در ولایات دیگر»، «نصب نرم‌افزارهای پایه کمتر از یک هفته»، «مراجعه حضوری در هرات» | خیر |
| I | مورد «نرم افزار تانک تیل» در نمونه‌کارها: صفحه ندارد و از تصویر مشعل استفاده می‌کند — محصول جداست یا همان مشعل؟ | خیر |
| J | Case Studyها: نام مشتری، اجازه، تاریخ، تصاویر، نتیجه و نقل‌قول برای هفت سیستم ناشناس؛ تاریخ و دامنه پروژه فواد صدیقی؛ اجازه نام چهار وب‌سایت | خیر |
| K | ناظر: تصاویر واقعی محیط نرم‌افزار و پلتفرم | خیر |
| L | پروفایل‌های رسمی شرکت برای `sameAs` (Facebook، LinkedIn، Google Business Profile) | خیر |
| M | بازبینی بومی متن پشتو؛ بازبینی متن مقاله جدید و سه مقاله گسترش‌یافته | خیر (توصیه می‌شود پیش از Production) |
| N | مختصات نقشه و روزهای کاری (Schema: شنبه تا پنجشنبه؛ متن: «همه روز به جز تعطیلات رسمی») | خیر |
| O | فایل‌های طراحی در ریشه پروژه که در کد استفاده نمی‌شوند: `novatech-teal-final-*.webp`، `Mint Ribbon N Logo Emblem.webp`، `Novatech_Portfolio_Mockup_v3 (1) (1).mp4`، `websima.txt`؛ و `TensorPix-موکاپ-نمونه-کار.mp4` که در Git ثبت شده ولی استفاده نمی‌شود | خیر — پیشنهاد: خارج از مخزن نگه داشته شوند |

## ۳. نتیجه آزمایش‌ها

همه روی `npm run build` همین مخزن (نه کپی) و سرور `next start` محلی، 2026-10-19:

| آزمایش | نتیجه |
| --- | --- |
| Production Build (`npm run build`) | موفق؛ ۷۲ صفحه Static/SSG |
| ESLint | ۰ خطا، ۱ هشدار قدیمی (`<head>` در `components/SiteDocument.tsx`، از پیش از مرحله سوم) |
| TypeScript (`tsc --noEmit`) | ۰ خطا |
| Unit Tests (`npm test`) | **۲۸/۲۸ موفق** (قبلاً ۲۳/۲۴). تست Footer تحلیل و با رفتار فعلی هماهنگ شد؛ ۴ تست جدید برای پلن‌ها، شمارنده About و لینک کارکنان |
| SEO Audit (`npm run seo:audit`) | ۶۳/۶۳ URL، ۰ خطا، ۰ هشدار، بدون صفحه یتیم |
| JSON-LD (`npm run seo:jsonld`) | ۶۳ URL و ۱۰۴ پرسش FAQ، ۰ خطا |
| Sitemap و Canonical | ۶۳ URL، همه 200، Canonical هر صفحه = آدرس خودش روی novatechsoft.com؛ `robots.txt` و `llms.txt` 200؛ ریدایرکت‌های `/mashal`، `/database-design`، `/order` = 301 |
| hreflang | `/oil-and-gas-software`، `/en/...`، `/ps/...` هر سه `fa-AF, ps-AF, en-AF, x-default` متقابل؛ Canonical هر نسخه به خودش |
| صفحات fa / ps / en | `lang`/`dir`: `fa-AF rtl`، `ps-AF rtl`، `en-AF ltr`؛ H1 و متن Hero هر زبان در HTML سرور |
| فرم‌ها (۵ فرم: تماس، دموی ناظر، دموی مشعل، نرم‌افزار اختصاصی، طراحی سایت) | همه فیلدها برچسب دسترس‌پذیر دارند، Honeypot موجود است. در محیط محلی بدون مقصد پیکربندی‌شده: ارسال معتبر ← 503 `manual` و پیام «درخواست هنوز ثبت نشده… واتس‌اپ… 0702008454» (هیچ پیامی به بیرون ارسال نشد)؛ Honeypot ← 200 بی‌صدا؛ ورودی ناقص یا JSON خراب ← 400؛ بیش از ۵ درخواست در دقیقه ← 429؛ همه پاسخ‌ها `Cache-Control: no-store`. **ارسال واقعی به واتس‌اپ/Webhook تست نشد** (مورد E) |
| موبایل ۳۹۰ و دسکتاپ ۱۴۴۰ | بدون خطای JavaScript و بدون اسکرول افقی؛ بازبینی تصویری بخش‌های تغییرکرده (پلن‌های ناظر، شمارنده About، Hero پشتو و انگلیسی، فرم تماس، بخش‌های جدید مرحله سوم) |
| Lighthouse (Lab) | بخش ۴ |

یادداشت امنیتی (بدون تغییر): Rate limit مسیر فرم وقتی هدر `CF-Connecting-IP` نباشد به اولین مقدار `X-Forwarded-For` اعتماد می‌کند که کاربر می‌تواند جعل کند. پشت Cloudflare مشکلی نیست؛ اگر سرور بدون Cloudflare در دسترس باشد، nginx باید `X-Forwarded-For` را بازنویسی کند.

## ۴. عملکرد (Lab)

روش: همان روش مرحله دوم و سوم — دو Build Production محلی کنار هم (`build-base` = وضعیت پیش از مرحله سوم، و Build فعلی)، هر دو با `next start` روی یک دستگاه؛ به‌علاوه Lighthouse 12.8.2 با Chrome. موبایل = پیش‌فرض Lighthouse (Moto G Power، شبکه کند 4G شبیه‌سازی، CPU ×۴)، میانه ۳ تا ۱۲ اجرا؛ دسکتاپ = پیکربندی desktop، میانه ۳ اجرا. اندازه‌ها انتقال فشرده‌اند. INP و داده واقعی کاربران (CrUX) اندازه‌گیری نشده و حدس زده نمی‌شود؛ TBT جانشین آزمایشگاهی آن است.

**موبایل** (مرحله دوم → مرحله سوم)

| صفحه | Score | FCP (ms) | LCP (ms) | TBT (ms) | CLS | اجرا |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 77 → 79 | 1675 → 1676 | 4631 → 4601 | 244 → 207 | 0.002 → 0.002 | ۵ |
| `/about` | 90 → 95 | 1375 → 1375 | 3519 → 2728 | 110 → 115 | 0.004 → 0.004 | ۳ |
| `/herat` | 90 → 91 | 1675 → 1673 | 3234 → 3213 | 173 → 136 | 0.002 → 0.002 | ۳ |
| `/accounting-software` | — | 1373 → 1376 | 3365 → 2356 | 244 → 250 | 0 → 0 | ۱۲ (متناوب) |
| `/software-solutions` | 94 → 95 | 1375 → 1378 | 2879 → 2727 | 121 → 120 | 0.001 → 0.001 | ۵ |
| `/oil-and-gas-software` | 88 → 95 | 1374 → 1372 | 3701 → 2805 | 132 → 120 | 0 → 0 | ۳ |

**دسکتاپ** (میانه ۳ اجرا)

| صفحه | Score | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- |
| `/` | 99 → 100 | 394 → 389 | 853 → 774 | 21 → 14 | 0.003 → 0.003 |
| `/about` | 100 → 100 | 391 → 394 | 789 → 612 | 12 → 17 | 0.001 → 0.001 |
| `/herat` | 100 → 100 | 384 → 382 | 737 → 715 | 14 → 10 | 0.001 → 0.001 |
| `/accounting-software` | 100 → 100 | 347 → 343 | 693 → 547 | 11 → 10 | 0 → 0 |
| `/software-solutions` | 100 → 100 | 349 → 347 | 594 → 588 | 13 → 10 | 0 → 0 |
| `/oil-and-gas-software` | 99 → 100 | 349 → 350 | 825 → 812 | 19 → 14 | 0 → 0 |

**حجم JavaScript و CSS** — فایل‌هایی که HTML خود صفحه بارگذاری می‌کند (`npm run seo:weight`، gzip): JavaScript همه صفحات **بدون تغییر** (۱۸۵ تا ۱۹۵ KB)؛ CSS صفحات خدمات و مشعل بدون تغییر، صفحه اصلی 37.6→38.2، About 24.2→24.7، هرات 27.8→28.3 KB؛ HTML صفحه اصلی 34.8→39.3 و About 17.0→22.9 KB به خاطر متن جدید. در Lighthouse مجموع انتقال `/about` و `/herat` چند KB بیشتر است (JS +3 تا +7، CSS +6 تا +11 KB)؛ این فایل‌ها در HTML صفحه نیستند و از Prefetch خودکار Next برای لینک‌های جدید در صفحه می‌آیند. FCP و LCP همان صفحات تغییر نکرده یا بهتر شده‌اند.

**تفسیر:**

- هیچ افت سرعتی ناشی از مرحله سوم دیده نشد. تفاوت‌های LCP موبایل در حد نوسان اندازه‌گیری است: در ۱۲ اجرای متناوب `/accounting-software`، LCP **هر دو** نسخه بین دو مقدار حدود ۲.۳۵ و ۳.۳۵ ثانیه جابه‌جا شد (عنصر LCP در هر دو همان پاراگراف Hero بود).
- **مشکل قدیمی، نه مرحله سوم:** LCP موبایل صفحه اصلی حدود ۴.۶ ثانیه است (آستانه «خوب» گوگل ۲.۵ ثانیه است) و در نسخه مرحله دوم هم همین بود. عنصر LCP تصویر داشبورد مشعل در Hero است؛ ۹۱٪ زمان آن «Render Delay» است، یعنی تصویر زود دانلود می‌شود ولی نمایشش منتظر کار سنگین Main thread می‌ماند (۷.۱ ثانیه کار Main thread با CPU ×۴، و دو فایل CSS مسدودکننده رندر). پیشنهاد مرحله بعد: بررسی انیمیشن‌ها و اسکریپت‌های بالای صفحه اصلی (`MotionShowcase`، اسلایدر لوگوها، ویدیوها). در این مرحله به آن دست زده نشد چون تغییر طراحی است.
- بقیه صفحات در دسکتاپ ۱۰۰ و در موبایل ۹۱ تا ۹۵ هستند (به‌جز صفحه اصلی).

## ۵. آمادگی انتشار

### Staging — آماده

شرط‌ها: (۱) Staging با `noindex` یا محافظت رمز اجرا شود تا با سایت اصلی Duplicate نشود (`NEXT_PUBLIC_SITE_URL` را روی آدرس Staging نگذارید؛ Canonical باید به novatechsoft.com اشاره کند و Staging مسدود باشد)؛ (۲) مقصد واقعی فرم روی Staging تنظیم نشود یا به Webhook آزمایشی وصل شود.

### Production — هنوز آماده نیست

موانع: موارد A، B، C، D و E در بخش ۲. همه تست‌های فنی موفق‌اند؛ موانع حقوقی، مجوز و پیکربندی سرورند، نه کد.

## ۶. گروه‌بندی پیشنهادی Commit (هنوز انجام نشده)

تغییرات سه مرحله در بسیاری از فایل‌ها با هم مخلوط‌اند (مثلاً `lib/seo.ts` در مرحله دو و سه تغییر کرده). جداسازی دقیق hunk‌ها با `git add -p` ممکن است ولی خطرناک است؛ پیشنهاد: Commitها روی شاخه جدید `release/phase3` به ترتیب زیر ساخته شوند و **پس از هر Commit** `npm run build && npm test` اجرا شود. فایل‌های untracked که کد به آنها وابسته است (مثل `components/SitePage.module.css`, `lib/breadcrumbs.ts`, `lib/mashal-paths.ts`) باید در همان گروهی بیایند که import آنها را دارد.

| # | Commit پیشنهادی | فایل‌ها | وضعیت |
| --- | --- | --- | --- |
| 1 | `chore: ignore local tool output, update lint and dependencies` | `.gitignore`, `eslint.config.mjs`, `package.json`, `package-lock.json`, `scripts/.purged-selectors.json` | آماده |
| 2 | `feat(design): refresh home, header, footer, portfolio, web-design and contact` | `app/globals.css`, `app/legacy-base.css`, `components/{Header,Footer,HomeHero,HomeServicesScroll,HomeTeamScroll,ClientLogosSlider,BannerScroll,LazyVideo,IntentLink,ContactReferenceForm,ContactReferenceMap}*`, `components/motion-showcase/*`, `components/portfolio/*`, `components/web-design/*`, حذف `components/HomeSlidersInit.tsx`, `app/(fa)/contact/*`, `app/(fa)/HomeClient.tsx`, `public/images/client/*`, `public/images/contact-reference/`, `public/images/web-design-reference/*-banner.webp`, `public/media/*` | **مسدود** تا رفع A، B و C |
| 3 | `feat(seo): shared structured data, breadcrumbs, sitemap dates and llms.txt` | `lib/seo.ts`, `lib/breadcrumbs.ts`, `lib/breadcrumb-details.ts`, `lib/mashal-paths.ts`, `lib/mashal-navigation.ts`, `components/{Breadcrumbs,SiteBreadcrumbBar*,SiteDocument,MashalContext}.tsx`, `app/sitemap.ts`, `app/llms.txt/`, `next.config.ts`, `app/(fa)/privacy/page.tsx`, `app/(fa)/erp/page.tsx` | آماده |
| 4 | `content: brand identity, About, Nazer, service pages and guides` | `lib/{site-content,services,team,case-studies,mashal,mashal-case-study,blog-content}.ts`, `lib/portfolio-data.json`, `app/(fa)/{page.tsx,about/*,accounting-software/*,software-solutions/*,database-solutions/*,herat/*,blog/[slug]/*}`, `app/en/*`, `app/ps/*`, `components/{HomeExpertise*,SitePage.module.css,ServiceFaq*,ServicePageShell*,RelatedLinks*,NazerOverview.module.css,MashalProductPage.tsx,Blog.module.css}`, `components/mashal/*.module.css` | آماده برای Staging؛ متن‌ها نیازمند بازبینی مالک (M) |
| 5 | `fix(leads): report real delivery state of contact forms` | `app/(fa)/api/contact/route.ts`, `components/LeadForm.tsx`, `.env.example` | آماده؛ پیکربندی سرور (E) لازم |
| 6 | `test: SEO, structured-data and release regression checks` | `tests/*.test.mjs`, `tests/fixtures/`, `scripts/{seo-page-inventory,jsonld-check,gsc-report,page-weight}.mjs` | آماده |
| 7 | `docs: deployment, phase 2 runbook and phase 3 reports` | `DEPLOYMENT.md`, `docs/phase2-cache-redirect-runbook.md`, `docs/phase3-*.md`, `docs/phase3-measurement/` | آماده |

وابستگی‌ها: `app/(fa)/HomeClient.tsx` (گروه ۲) `components/HomeExpertise.tsx` (گروه ۴) را import می‌کند و صفحات گروه ۴ از Footer و Header گروه ۲ استفاده می‌کنند؛ پس Build تک‌تک Commitها تضمین نمی‌شود. فقط وضعیت نهایی شاخه build و تست شده است. اگر گروه ۲ تا رفع موانع نگه داشته شود، باید نسخه HEAD فایل‌های طراحی با گروه‌های ۳ تا ۷ جداگانه build و تست شود.

**هرگز Commit نشوند:** `.output/`، `.manus/`، `.wrangler/`، `.claude/`، `.work/`، `.next/`، `debug.log`، `websima.txt`، `.env*` واقعی، و فایل‌های طراحی ریشه (مورد O). گروه ۲ تا رفع مورد A و B به شاخه اصلی Merge نشود.

## ۷. نسخه پشتیبان

مسیر: `F:\novatech-backups\phase3-2026-10-19\` (بیرون از مخزن، ۱۰۰ MB). راهنمای بازگردانی در `RESTORE.md` و چک‌سام‌ها در `SHA256SUMS` همان پوشه است.

| فایل | محتوا | بررسی |
| --- | --- | --- |
| `repo-all-refs.bundle` | کل تاریخچه Git: همه شاخه‌ها، Remoteها و `refs/stash` | `git bundle verify` = okay |
| `tracked-changes-vs-754d0cb.patch` | همه تغییرات Commit‌نشده فایل‌های ثبت‌شده | روی Clone تازه بدون خطا اعمال شد (`git apply --check`) |
| `untracked-files.tar.gz` | فایل‌های جدید ثبت‌نشده (به‌جز موارد ignore) | — |
| `working-tree-snapshot.tar.gz` | نسخه بایت‌به‌بایت همه فایل‌های پروژه | بازگردانی و مقایسه: ۰ اختلاف |

این پشتیبان پیش از نوشتن نهایی همین سند گرفته شد؛ تنها تفاوت بعدی، متن همین فایل `docs/phase3-release-readiness.md` است. پوشه‌های `node_modules`، `.next` و خروجی ابزارها عمداً در آن نیستند. Git، شاخه‌ها و Stash تغییر داده نشدند (پشتیبان فقط خواندنی ساخته شد). پیشنهاد: یک کپی از این پوشه را بیرون از همین دیسک نگه دارید.

## ۸. مراحل انتشار و بازگشت

### انتشار (پس از رفع موانع و با تأیید شما)

1. Commitها روی `release/phase3` (بخش ۶) → بازبینی → Merge به `main` → `git tag pre-phase3 754d0cb` و `git tag phase3-release <commit>`.
2. روی سرور، **پیش از هر تغییری**: `git rev-parse HEAD > ~/novatech-prev-commit.txt`، کپی از `.env.local`، و آرشیو `.next` فعلی (`tar czf ~/novatech-next-$(date +%F).tgz .next`).
3. بهتر از روند فعلی `DEPLOYMENT.md` (که سرویس را پیش از build متوقف می‌کند): در پوشه جداگانه build کنید و فقط پس از build موفق سرویس را جابه‌جا/restart کنید، تا قطعی سایت فقط چند ثانیه باشد.
4. `npm ci && npm run lint && npm run typecheck && npm test && npm run build` → `sudo systemctl restart novatech`.
5. Purge کش Cloudflare (طبق `DEPLOYMENT.md`) — فقط پس از تأیید شما.
6. بررسی‌های بخش ۹ در ۱۵ دقیقه اول.

### بازگشت (Rollback)

- **سریع (بدون build):** سرویس را متوقف کنید، `.next` را از آرشیو مرحله ۲ بازگردانید، `git checkout $(cat ~/novatech-prev-commit.txt)`، سرویس را start کنید، کش Cloudflare را Purge کنید.
- **کامل:** `git checkout pre-phase3` (یا Commit ذخیره‌شده) → `npm ci && npm run build` → restart → Purge.
- **محلی:** نسخه پشتیبان بخش ۷ کل Working tree فعلی (شامل فایل‌های untracked) و تاریخچه Git (شامل Stash) را دارد.
- معیار بازگشت فوری: خطای 5xx، صفحه سفید، از کار افتادن `/api/contact`، Sitemap یا robots نادرست، یا افت شدید Core Web Vitals.
- ریدایرکت‌های 301 مرحله قبل (`/mashal`، `/database-design` و …) در `next.config.ts` هستند و با Rollback به HEAD هم باقی می‌مانند.

## ۹. بررسی‌های بعد از Deploy

**بلافاصله:**

- `curl -I` برای `/`، `/robots.txt`، `/sitemap.xml`، `/llms.txt`، یک صفحه مشعل fa/ps/en و ریدایرکت‌های 301؛ وضعیت 200/301 و هدرهای امنیتی.
- `SEO_AUDIT_BASE=https://novatechsoft.com npm run seo:audit` و همین برای `seo:jsonld` (هر دو فقط می‌خوانند).
- ارسال یک درخواست آزمایشی واقعی از فرم تماس و دموی ناظر/مشعل و تأیید رسیدن آن به واتس‌اپ/Webhook.
- Rich Results Test و Schema Markup Validator برای `/`، `/about`، `/accounting-software`، `/oil-and-gas-software`، یک مقاله.
- PageSpeed Insights (موبایل و دسکتاپ) برای همان شش صفحه بخش ۴ و مقایسه با جدول Lab.

**هفته اول:**

- Search Console: ارسال Sitemap، URL Inspection برای صفحات تغییرکرده، گزارش Page indexing و Enhancements.
- Bing Webmaster Tools: ارسال Sitemap.
- Cloudflare (فقط مشاهده): وضعیت Bot Fight Mode / AI crawlers، و اینکه Googlebot، Bingbot و OAI-SearchBot مسدود نشده‌اند.
- `journalctl -u novatech` برای خطاهای `[lead]`.

**ماهانه:** `npm run seo:gsc` با خروجی Search Console، `leads-log.csv`، `backlinks-log.csv`، و آزمون ثابت موتورهای AI (`docs/phase3-seo-geo-report.md` بخش ۹). داده میدانی Core Web Vitals (CrUX/INP) فقط پس از جمع شدن ترافیک واقعی در Search Console قابل گزارش است.
