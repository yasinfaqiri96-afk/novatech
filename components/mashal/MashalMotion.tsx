"use client";

import { useEffect } from "react";

/**
 * Progressive scroll reveal for the Mashal landing page. Content is fully
 * visible without JavaScript; the reveal styles only apply once this sets
 * `data-motion="ready"` on the page root, and never when the visitor prefers
 * reduced motion.
 */
export default function MashalMotion({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-visible", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    // Anything already on screen stays visible immediately, so the first paint
    // never flashes content out and back in.
    const viewportBottom = window.innerHeight;
    for (const target of targets) {
      if (target.getBoundingClientRect().top < viewportBottom) {
        target.setAttribute("data-visible", "");
      } else {
        observer.observe(target);
      }
    }
    root.setAttribute("data-motion", "ready");

    return () => observer.disconnect();
  }, [rootId]);

  return null;
}
