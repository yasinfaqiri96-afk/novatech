# راهنمای استقرار production نواتیک

این پروژه با Next.js 16 و Node.js اجرا می‌شود و برای استقرار روی یک سرور Linux آماده است.

## نیازمندی‌های سرور

- Ubuntu 22.04 یا جدیدتر
- Node.js 20 یا جدیدتر (ترجیحاً نسخه LTS)
- یک دامنه که به IP سرور اشاره کند؛ مقدار فعلی پروژه `novatechsoft.com` است
- Nginx و گواهی SSL معتبر

## نصب اولیه روی سرور

```bash
sudo apt update
sudo apt install -y nginx git curl

# نصب Node.js LTS با nvm یا روش رسمی مورد اعتماد شما
# سپس بررسی نسخه‌ها:
node --version
npm --version

sudo mkdir -p /var/www/novatech
sudo chown -R "$USER":"$USER" /var/www/novatech
git clone https://github.com/yasinfaqiri96-afk/novatech.git /var/www/novatech
cd /var/www/novatech
npm ci
```

## تنظیم متغیرهای محیطی

فایل محیطی را فقط روی خود سرور ایجاد کنید و در Git commit نکنید:

```bash
cp .env.example .env.local
nano .env.local
```

حداقل مقدار پیشنهادی:

```dotenv
NEXT_PUBLIC_SITE_URL=https://novatechsoft.com
```

برای فرم تماس، در صورت نیاز `LEAD_WEBHOOK_URL` یا متغیرهای WhatsApp را نیز مقداردهی کنید. توکن‌ها و مقادیر خصوصی را در چت، Git یا لاگ‌ها قرار ندهید.

## ساخت و اجرای production

```bash
cd /var/www/novatech
npm ci
npm run lint
npm run typecheck
npm run build
npm run start
```

برنامه به‌صورت پیش‌فرض روی `127.0.0.1:3000` اجرا می‌شود. برای اجرای دائمی، از systemd استفاده کنید.

## سرویس systemd

فایل `/etc/systemd/system/novatech.service` را با محتوای زیر بسازید و مسیر `WorkingDirectory` و `User` را در صورت نیاز تغییر دهید:

```ini
[Unit]
Description=Novatech Next.js website
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/novatech
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/var/www/novatech/.env.local
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

سپس:

```bash
sudo chown -R www-data:www-data /var/www/novatech
sudo systemctl daemon-reload
sudo systemctl enable --now novatech
sudo systemctl status novatech
```

بررسی محلی سرویس:

```bash
curl -I http://127.0.0.1:3000
```

## پیکربندی Nginx

فایل `/etc/nginx/sites-available/novatech`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name novatechsoft.com www.novatechsoft.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

فعال‌سازی:

```bash
sudo ln -s /etc/nginx/sites-available/novatech /etc/nginx/sites-enabled/novatech
sudo nginx -t
sudo systemctl reload nginx
```

پس از اطمینان از DNS، SSL رایگان Let's Encrypt را فعال کنید:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d novatechsoft.com -d www.novatechsoft.com
```

## روند انتشار نسخه جدید

```bash
cd /var/www/novatech
sudo systemctl stop novatech
git pull --ff-only origin main
npm ci
npm run lint
npm run typecheck
npm run build
sudo systemctl start novatech
sudo systemctl status novatech
```

بعد از انتشار، این مسیرها را بررسی کنید:

```bash
curl -I https://novatechsoft.com/
curl -I https://novatechsoft.com/robots.txt
curl -I https://novatechsoft.com/sitemap.xml
```

برای مشاهده خطاها:

```bash
sudo journalctl -u novatech -n 100 --no-pager
sudo journalctl -u novatech -f
```

## نکات امنیتی و عملیاتی

- فایل `.env.local` را در Git commit نکنید.
- پورت 3000 را عمومی نکنید؛ فقط Nginx باید به آن دسترسی داشته باشد.
- قبل از هر انتشار، از نسخه فعلی و فایل محیطی پشتیبان بگیرید.
- `npm audit` را دوره‌ای اجرا کنید و به‌روزرسانی‌های breaking را ابتدا در staging آزمایش کنید.
- در صورت خطا، نسخه قبلی را با `git checkout <commit>` برگردانید، سپس `npm ci` و `npm run build` را اجرا و سرویس را restart کنید.
