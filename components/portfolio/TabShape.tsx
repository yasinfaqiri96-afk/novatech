/*
 * Flared "tab" used all over the portfolio page: a strip with concave
 * shoulders that grows out of an edge (the SPECIAL label, the services tab,
 * the title and favourite tabs). Coordinates are in tenths of the page unit,
 * and the SVG box is sized to the same w × h in CSS, so the shoulders never
 * stretch.
 */
export function tabPath(w: number, h: number, flank: number, direction: "down" | "up") {
  const f = flank;
  // "down": wide edge on top (hangs from an edge). "up": wide edge at the bottom.
  const [edge, far] = direction === "down" ? [0, h] : [h, 0];
  return `M0 ${edge}H${w}C${w - f * 0.45} ${edge} ${w - f * 0.5} ${far} ${w - f} ${far}H${f}C${f * 0.5} ${far} ${f * 0.45} ${edge} 0 ${edge}Z`;
}

export default function TabShape({
  w,
  h,
  flank,
  direction,
  className,
  fill,
  gradient,
}: {
  w: number;
  h: number;
  flank: number;
  direction: "down" | "up";
  className?: string;
  fill?: string;
  /** Vertical gradient [top, bottom]; overrides `fill`. */
  gradient?: [string, string];
}) {
  const id = gradient ? `tab-${gradient.join("-").replace(/[^a-z0-9]/gi, "")}` : undefined;
  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {gradient && (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={gradient[0]} />
            <stop offset="1" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
      )}
      <path d={tabPath(w, h, flank, direction)} fill={gradient ? `url(#${id})` : fill ?? "currentColor"} />
    </svg>
  );
}
