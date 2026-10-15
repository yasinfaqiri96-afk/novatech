"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Keep decorative loops asleep outside the viewport and for reduced motion. */
export default function ViewportMotion({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => { element.dataset.motionVisible = String(visible && !motion.matches); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    motion.addEventListener("change", update);
    return () => { observer.disconnect(); motion.removeEventListener("change", update); };
  }, []);
  return <div ref={root} className={className} style={style} data-viewport-motion="" data-motion-visible="false">{children}</div>;
}
