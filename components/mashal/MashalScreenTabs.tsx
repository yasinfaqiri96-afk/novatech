"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import styles from "./MashalLanding.module.css";

export type ScreenTab = {
  key: string;
  label: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

/**
 * WAI-ARIA tabs over real Mashal screens. Every panel is server rendered, so
 * all screenshots and captions stay in the HTML; inactive panels are only
 * hidden visually and from assistive technology.
 */
export default function MashalScreenTabs({ screens }: { screens: readonly ScreenTab[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const focusTab = (index: number) => {
    const next = (index + screens.length) % screens.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // RTL: ArrowLeft moves to the next tab visually.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = { ArrowLeft: index + 1, ArrowRight: index - 1, Home: 0, End: screens.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    focusTab(keys[event.key]);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist" aria-label="صفحه‌های واقعی مشعل">
        {screens.map((screen, index) => (
          <button
            key={screen.key}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            id={`${baseId}-tab-${screen.key}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${baseId}-panel-${screen.key}`}
            tabIndex={active === index ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {screen.label}
          </button>
        ))}
      </div>

      <div className={styles.tabStage}>
        {screens.map((screen, index) => (
          <figure
            key={screen.key}
            id={`${baseId}-panel-${screen.key}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${screen.key}`}
            className={styles.tabPanel}
            data-active={active === index ? "" : undefined}
            aria-hidden={active !== index}
          >
            <div className={styles.frame}>
              <Image
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(min-width: 1240px) 1100px, 94vw"
                loading="lazy"
              />
            </div>
            <figcaption>{screen.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
