"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

/**
 * A `<Link>` that prefetches on intent instead of on sight.
 *
 * A plain `<Link>` prefetches its route (RSC payload, plus the CSS and images
 * that route preloads) as soon as it scrolls into view. For links that are
 * seen on every page but rarely followed (the footer, the off-canvas menu) that
 * is mostly wasted mobile data. Here prefetching stays off until the visitor
 * points at, touches or focuses the link, then reverts to the default, so the
 * navigation they do take is still prefetched a moment before the click.
 *
 * Pattern from the Next.js prefetching guide ("Hover-triggered prefetch").
 */
export default function IntentLink({ onMouseEnter, onTouchStart, onFocus, ...props }: Omit<ComponentProps<typeof Link>, "prefetch">) {
  const [active, setActive] = useState(false);
  return (
    <Link
      {...props}
      prefetch={active ? null : false}
      onMouseEnter={(event) => { setActive(true); onMouseEnter?.(event); }}
      onTouchStart={(event) => { setActive(true); onTouchStart?.(event); }}
      onFocus={(event) => { setActive(true); onFocus?.(event); }}
    />
  );
}
