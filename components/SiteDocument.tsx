import type { Metadata } from "next";
import "@/app/legacy-base.css";
import "@/app/globals.css";
import MashalContext from "@/components/MashalContext";
import Header from "@/components/Header";
import SiteBreadcrumbBar from "@/components/SiteBreadcrumbBar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { detailBreadcrumbLabels } from "@/lib/breadcrumb-details";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";
import { companyInfo, siteUrl } from "@/lib/site-content";

// Fonts: every face is declared once in CSS against the files in /public/fonts
// (the per-weight `IranYekan*` families in legacy-base.css and the multi-weight
// `IranYekanX` family behind `--font-iranyekan-next` in globals.css). Both point
// at the same URLs, so each weight is downloaded at most once. next/font is not
// used: it re-published the same files under /_next/static/media, and pages that
// used both names downloaded Regular, Bold and ExtraBlack twice.

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${companyInfo.title} | ${companyInfo.brandName}`,
    template: `%s | ${companyInfo.brandName}`,
  },
  description: companyInfo.shortDescription,
  applicationName: companyInfo.legalName,
  // No default canonical here on purpose: every page sets its own. A default
  // would silently point a new page at the home page.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "fa_AF",
    siteName: companyInfo.legalName,
    url: siteUrl,
    title: `${companyInfo.title} | ${companyInfo.brandName}`,
    description: companyInfo.shortDescription,
    images: [{ url: "/images/novatech-logo-social-v2.webp", width: 1200, height: 630, alt: `لوگوی ${companyInfo.brandName}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${companyInfo.title} | ${companyInfo.brandName}`,
    description: companyInfo.shortDescription,
    images: ["/images/novatech-logo-social-v2.webp"],
  },
};

const CV_FRAGMENT_GUARD =
  "(function(){var d=document.documentElement,o=function(){d.classList.add('cv-off')};" +
  "if(location.hash.length>1)o();" +
  "addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href*=\"#\"]');if(a&&a.hash)o()},true);" +
  "addEventListener('hashchange',o)})();";

export default function SiteDocument({
  children,
  language = "fa-AF",
}: Readonly<{
  children: React.ReactNode;
  language?: "fa-AF" | "en-AF" | "ps-AF";
}>) {
  return (
    <html lang={language} dir={language === "en-AF" ? "ltr" : "rtl"} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Turns deferred rendering (`.defer-render`, see globals.css) off before
            any jump to a #fragment: on a deep link it runs before the first
            layout, and on a click it runs in the capture phase, before the
            browser or the router scrolls. Everything else keeps the saving. */}
        <script dangerouslySetInnerHTML={{ __html: CV_FRAGMENT_GUARD }} />
        {/* The two faces that paint above the fold on every page. They are
            referenced from a stylesheet, so without these hints the browser
            only discovers them after CSS parsing, which is what makes the
            fallback-to-brand-font swap visible. */}
        <link
          rel="preload"
          href="/fonts/IRANYekanXFaNum-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/IRANYekanXFaNum-ExtraBlack.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ direction: language === "en-AF" ? "ltr" : "rtl" }} className={`font-sans antialiased text-text-dark bg-white flex flex-col min-h-screen`}>
        <a href="#main-content" className="skip-to-content">
          {language === "en-AF" ? "Skip to main content" : language === "ps-AF" ? "اصلي منځپانګې ته لاړ شئ" : "رفتن به محتوای اصلی"}
        </a>
        {/* Header sets its own lang/dir so the sticky header is not trapped in a wrapper. */}
        <Header />
        <SiteBreadcrumbBar language={language} detailLabels={detailBreadcrumbLabels()} />
        <main id="main-content" className="flex-grow">
          <MashalContext>{children}</MashalContext>
        </main>
        <div lang="fa-AF" dir="rtl"><Footer /></div>
        {/* Organization and WebSite are site-wide identity; pages add their own
            WebPage, BreadcrumbList and Service nodes that reference them by @id. */}
        <JsonLd data={graph(organizationSchema, websiteSchema)} />
      </body>
    </html>
  );
}
