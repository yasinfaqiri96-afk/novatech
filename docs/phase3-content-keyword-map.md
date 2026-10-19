# نقشه محتوا و کلمات کلیدی نواتیک — مرحله سوم

به‌روزرسانی: 2026-10-19

این نقشه برای هر **نیت جستجو** یک صفحه مالک (Canonical owner) تعیین می‌کند تا دو صفحه برای یک نیت با هم رقابت نکنند. فهرستی برای تکرار مکانیکی در متن نیست. نسخه ماشینی همین نقشه در `docs/phase3-measurement/keyword-groups.json` است و `scripts/gsc-report.mjs` پرسش‌های Search Console را با آن گروه‌بندی می‌کند؛ هر تغییر در این فایل باید در آن JSON هم اعمال شود.

نقشه مالکیت محصول مشعل (۱۶ نیت) جداگانه در `docs/MASHAL-KEYWORD-MAP.md` نگه داشته می‌شود و این فایل آن را تکرار نمی‌کند.

## محدودیت این نقشه

- در پروژه هیچ داده‌ای از Search Console، GA4 یا ابزار حجم جستجو وجود ندارد. ستون «اولویت» برداشت ویرایشی از اهمیت تجاری هر نیت است، **نه حجم جستجو**.
- رتبه فعلی هیچ عبارتی معلوم نیست. هر جا «همپوشانی احتمالی» نوشته شده، فرضیه است و باید با گزارش `query × page` تأیید شود (بخش «بعد از اتصال Search Console»).
- املای رایج کاربران افغانستان با فارسی ایران فرق دارد (دیتابس/دیتابیس، تکنالوژی/تکنولوژی، حسابات/حسابداری، گدام/انبار، راپور/گزارش). سایت هر دو شکل را به‌طور طبیعی در متن دارد؛ تصمیم درباره اینکه کدام شکل در Title بیاید فقط با داده Search Console گرفته شود.

## الف — شرکت و برند

| نیت / عبارت | صفحه مالک | صفحات پشتیبان | وضعیت |
| --- | --- | --- | --- |
| نواتیک، Novatech، novatechsoft | `/` | `/about`, `/contact` | Title صفحه اصلی حالا «نواتیک (Novatech)» را دارد |
| Novatech Herat، نواتیک هرات | `/herat` | `/` , `/contact` | |
| Novatech Technology Solutions | `/about` | `/` | نام رسمی در Title و Description درباره ما |
| شرکت نرم‌افزاری هرات، شرکت تکنالوژی هرات، شرکت برنامه‌نویسی هرات | `/herat` | `/about`, `/blog/choosing-software-company-herat` | H1 هرات از قبل همین نیت را دارد |
| شرکت توسعه نرم‌افزار افغانستان | `/` | `/software-solutions`, `/about` | |
| بهترین شرکت نرم‌افزاری در هرات | `/blog/choosing-software-company-herat` | `/herat` | **ادعای «بهترین» منتشر نمی‌شود.** مقاله معیارهای قابل بررسی برای انتخاب را می‌دهد و عبارت را فقط داخل گیومه به‌عنوان پرسش کاربر آورده است |

## ب — حسابداری

| نیت / عبارت | صفحه مالک | صفحات پشتیبان | وضعیت |
| --- | --- | --- | --- |
| نرم‌افزار حسابداری افغانستان، سیستم حسابداری هرات، نرم افزار حسابات | `/accounting-software` | `/blog/choosing-accounting-software` | صفحه محصول ناظر؛ SoftwareApplication اضافه شد |
| نرم‌افزار حسابداری ناظر | `/accounting-software` | `/about`, `/` | |
| ساخت نرم‌افزار حسابداری (اختصاصی) | `/accounting-software` (بخش «راهکارهای اختصاصی در کنار ناظر») | `/software-solutions` | FAQ «نرم افزار حسابداری اختصاصی هم ساخته می‌شود؟» اضافه شد |
| نرم‌افزار حسابداری چندارزی، حسابداری دالر و افغانی | `/accounting-software` | `/blog/choosing-accounting-software` (بخش چندارزی)، `/oil-and-gas-software/accounting` (فقط شرکت نفتی) | صفحه جدا ساخته نشد؛ محتوای کافی و غیرتکراری برای صفحه مستقل وجود ندارد |
| انتخاب نرم‌افزار حسابداری (اطلاعاتی) | `/blog/choosing-accounting-software` | `/accounting-software` | مقاله گسترش یافت |
| برنامه مدیریت فروش و حسابات | `/accounting-software` | `/business-systems` | نیازمند داده: اگر این عبارت بیشتر سیستم فروش/انبار بخواهد، مالک باید `/business-systems` شود |
| تفاوت ERP و نرم‌افزار حسابداری | `/blog/what-is-erp-and-when-you-need-it` | `/erp`, `/accounting-software` FAQ | |

## ج — دیتابیس

| نیت / عبارت | صفحه مالک | صفحات پشتیبان | وضعیت |
| --- | --- | --- | --- |
| طراحی دیتابیس، طراحی دیتابس، ساخت دیتابس، ساخت سیستم دیتابیس | `/database-solutions` | `/blog/database-design-for-growing-business` | Description حالا شکل «دیتابیس» را هم دارد؛ Title بدون داده تغییر نکرد |
| نرم‌افزار دیتابیس حسابداری | `/database-solutions` (FAQ جدید) | `/accounting-software` | |
| انتقال معلومات از اکسل به دیتابیس | `/database-solutions` | `/blog/migrating-data-from-excel`, `/blog/database-vs-excel-for-business-data` | |
| دیتابیس یا اکسل (اطلاعاتی) | `/blog/database-vs-excel-for-business-data` | `/blog/migrating-data-from-excel` | همپوشانی احتمالی بین دو مقاله؛ یکی «تصمیم» و دیگری «اجرا» است، ادغام نشد |
| دیتابیس نفت و گاز | `/oil-and-gas-software/database` | `/database-solutions` | مالک در نقشه مشعل |

## د — نرم‌افزار اختصاصی و سیستم‌های مدیریتی

| نیت / عبارت | صفحه مالک | صفحات پشتیبان | وضعیت |
| --- | --- | --- | --- |
| ساخت نرم‌افزار اختصاصی، شرکت برنامه‌نویسی | `/software-solutions` | `/blog/custom-software-vs-off-the-shelf`, `/blog/custom-software-cost-afghanistan` | دو H2 که «راهکارهای دیتابیس» را هدف گرفته بودند به نرم‌افزار اختصاصی برگشتند تا با `/database-solutions` رقابت نکنند |
| سیستم مدیریت شرکت، نرم‌افزار تجارتی | `/business-systems` | `/erp` | |
| توسعه ERP، نرم‌افزار ERP | `/erp` | `/blog/what-is-erp-and-when-you-need-it` | همپوشانی احتمالی `/erp` و `/business-systems`؛ بدون داده ادغام نمی‌شود |
| سیستم گدام و انبار | `/portfolio/warehouse-management-system` (نمونه) و `/business-systems` (خدمت) | `/software-solutions` | صفحه خدمت مستقل گدام وجود ندارد؛ اگر Search Console تقاضا نشان دهد، صفحه‌ای با محتوای واقعی پروژه انبار پیشنهاد می‌شود |
| نرم‌افزار آماده یا اختصاصی | `/blog/custom-software-vs-off-the-shelf` | `/software-solutions` FAQ جدید | |

## هـ — محصولات تخصصی

| نیت / عبارت | صفحه مالک | وضعیت |
| --- | --- | --- |
| نرم‌افزار حسابداری ناظر | `/accounting-software` | |
| سیستم مدیریت نفت و گاز مشعل، نرم‌افزار مدیریت شرکت نفتی | `/oil-and-gas-software` | H1 حالا «مدیریت نفت و گاز، در یک مشعل» است |
| مدیریت مخزن و تانکر | `/oil-and-gas-software/tank-inventory`, `/oil-and-gas-software/tanker-logistics` | |
| سیستم قرارداد و حسابداری چندارزی نفت | `/oil-and-gas-software/contracts`, `/oil-and-gas-software/accounting` | |
| petroleum trading software | `/en/oil-and-gas-erp-afghanistan` | Title دری‌زبان `/oil-and-gas-software/petroleum-trading` به دری برگشت (قبلاً انگلیسی بود در صفحه دری) |

### همپوشانی احتمالی در خوشه مشعل (نیازمند داده)

شش مقاله وبلاگ نفتی (حدود ۲۸۰ تا ۳۶۰ کلمه) موضوعی نزدیک به صفحات موضوعی مشعل دارند:

| مقاله (اطلاعاتی) | صفحه محصول (تجارتی) |
| --- | --- |
| `/blog/fuel-tank-inventory-management` | `/oil-and-gas-software/tank-inventory` |
| `/blog/tanker-logistics-management` | `/oil-and-gas-software/tanker-logistics` |
| `/blog/multi-currency-oil-company-accounting` | `/oil-and-gas-software/accounting` |
| `/blog/oil-partner-settlement` | `/oil-and-gas-software/partner-settlement` |
| `/blog/oil-cargo-cost-profitability` | `/oil-and-gas-software/profit-loss` |
| `/blog/oil-contract-loading-sales-workflow` | `/oil-and-gas-software/contracts` |

نیت مقاله «چگونه انجام شود» و نیت صفحه محصول «کدام نرم‌افزار» است و هر مقاله به صفحه محصولش لینک دارد. ادغام یا ریدایرکت **بدون داده انجام نشد**. پس از سه ماه داده: اگر برای یک پرسش هر دو URL نمایش می‌گیرند و هیچ‌کدام در صفحه اول نیست، محتوای مقاله در صفحه محصول ادغام و مقاله با 301 به آن منتقل شود.

## پشتو و انگلیسی

- تنها صفحات پشتو و انگلیسی، نسخه‌های محصول مشعل‌اند (`/ps/...`, `/en/...`) با hreflang متقابل `fa-AF`, `ps-AF`, `en-AF`, `x-default`.
- عبارت‌های پشتو مانند «د حسابدارۍ سافټویر»، «په هرات کې د سافټویر شرکت» یا «ډیټابیس جوړول» صفحه مالک ندارند. **صفحه پشتو تازه ساخته نشد**: نویسنده بومی پشتو در پروژه نیست و ترجمه ماشینی منتشر نمی‌شود. پیشنهاد: اگر Search Console پرسش پشتو با نمایش واقعی نشان داد، اول صفحه حسابداری ناظر توسط نویسنده پشتوزبان ترجمه شود.
- برای انگلیسی هم تنها مشعل صفحه دارد. «Novatech Herat» و «software company Herat» به صفحات دری می‌رسند؛ ساخت `/en/` برای شرکت یا ناظر نیازمند متن انگلیسی تأییدشده است.

## بعد از اتصال Search Console

1. هر ماه خروجی Performance (Queries و Pages) را بگیرید و اجرا کنید:
   `npm run seo:gsc -- --queries Queries.csv --pages Pages.csv --label 2026-11 --out docs/phase3-measurement/reports/2026-11.md`
2. برای تشخیص رقابت دو صفحه، جدول `query, page, clicks, impressions, ctr, position` را از Search Console API یا Looker Studio بگیرید و با `--query-page` بدهید.
3. فقط وقتی یک پرسش در دست‌کم دو ماه پیاپی بین دو صفحه تقسیم شده، تصمیم ادغام بگیرید.
