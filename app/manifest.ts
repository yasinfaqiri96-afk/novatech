import type { MetadataRoute } from "next";
import { companyInfo } from "@/lib/site-content";

/**
 * The manifest exists for the icons: it is what Android and Chrome read when
 * someone adds the site to a home screen. `display` is deliberately left at the
 * browser default — this is a website, not an installable app, and nothing else
 * about how the site opens should change.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: companyInfo.legalName,
    short_name: companyInfo.brandName,
    description: companyInfo.shortDescription,
    start_url: "/",
    lang: "fa-AF",
    dir: "rtl",
    theme_color: "#00a896",
    background_color: "#ffffff",
    icons: [
      { src: "/images/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/images/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/images/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
