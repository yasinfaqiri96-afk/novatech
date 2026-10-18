"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { teamMembers, toPersianIndex } from "@/lib/team";
import styles from "./HomeTeamScroll.module.css";

const total = teamMembers.length;
const totalLabel = toPersianIndex(total);

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/**
 * Desktop pins the viewport while vertical scroll drives an RTL horizontal
 * sequence. Tablet, mobile, and reduced-motion layouts remain vertically stacked.
 */
export default function HomeTeamScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const memberRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    if (!track || !pin || !stage) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const reset = () => {
      stage.style.removeProperty("--team-x");
      railRef.current?.style.removeProperty("--team-rail");
      memberRefs.current.forEach((member, index) => {
        if (!member) return;
        member.style.removeProperty("--team-reveal");
        member.classList.toggle(styles.isActive, index === 0);
      });
    };

    const update = () => {
      frame = 0;
      if (!desktopQuery.matches || !motionQuery.matches) return;

      const header = document.getElementById("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 72;
      const pinTop = Math.ceil(headerHeight + 16);
      track.style.setProperty("--team-pin-top", `${pinTop}px`);
      const sceneWidth = pin.clientWidth;
      track.style.setProperty(
        "--team-runway",
        `${sceneWidth * (total - 1)}px`,
      );
      stage.style.setProperty("--team-scene-width", `${sceneWidth}px`);

      const distance = track.offsetHeight - pin.offsetHeight;
      const start = track.getBoundingClientRect().top + window.scrollY - pinTop;
      const progress =
        distance > 0 ? clamp01((window.scrollY - start) / distance) : 0;
      const position = progress * (total - 1);

      stage.style.setProperty(
        "--team-x",
        `${-(total - 1) * sceneWidth * (1 - progress)}px`,
      );
      railRef.current?.style.setProperty("--team-rail", progress.toFixed(4));

      memberRefs.current.forEach((member, index) => {
        if (!member) return;
        const distanceFromCenter = Math.abs(position - index);
        const reveal = 1 - smoothstep(0.25, 1.05, distanceFromCenter);
        member.style.setProperty("--team-reveal", reveal.toFixed(4));
        member.style.setProperty("--team-opacity", (0.55 + reveal * 0.45).toFixed(4));
        member.classList.toggle(styles.isActive, index === Math.round(position));
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const handleModeChange = () => {
      reset();
      track.style.removeProperty("--team-pin-top");
      requestUpdate();
    };

    handleModeChange();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    desktopQuery.addEventListener("change", handleModeChange);
    motionQuery.addEventListener("change", handleModeChange);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      desktopQuery.removeEventListener("change", handleModeChange);
      motionQuery.removeEventListener("change", handleModeChange);
      if (frame) window.cancelAnimationFrame(frame);
      reset();
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="home-team-title">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>تیم نواتیک</p>
        <h2 id="home-team-title" className={styles.title}>
          <span className="heavy">افرادی که</span>{" "}
          <span className="light">پشت راهکارهای نواتیک هستند</span>
        </h2>
        <Image
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={129}
          height={19}
          decoding="async"
          className={styles.signature}
          src="/images/signature.jpg"
        />
        <p className={styles.intro}>
          هر سیستمی که تحویل می‌دهیم نتیجه کار مشترک تحلیل، توسعه و طراحی است.
          اینها کسانی هستند که آن را می‌سازند.
        </p>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        style={{
          "--team-count": total,
          "--team-runway": `${(total - 1) * 100}vw`,
        } as React.CSSProperties}
      >
        <div ref={pinRef} className={styles.pin}>
          <div className={styles.rail} aria-hidden="true">
            <span ref={railRef} className={styles.railFill} />
          </div>
          <div
            ref={stageRef}
            className={styles.stage}
            style={{ "--team-x": `-${(total - 1) * 100}vw` } as React.CSSProperties}
          >
            {teamMembers.map((member, index) => (
              <article
                key={member.slug}
                ref={(element) => {
                  memberRefs.current[index] = element;
                }}
                className={`${styles.member}${index === 0 ? ` ${styles.isActive}` : ""}`}
                style={{ "--team-reveal": index === 0 ? 1 : 0 } as React.CSSProperties}
                aria-labelledby={`home-team-member-${member.slug}`}
              >
                <div className={styles.info}>
                  <p className={styles.counter}>
                    <span className={styles.counterCurrent}>
                      {toPersianIndex(index + 1)}
                    </span>
                    {" / "}
                    {totalLabel}
                  </p>
                  <h3
                    id={`home-team-member-${member.slug}`}
                    className={`${styles.name} heavy`}
                  >
                    {member.name}
                  </h3>
                  <span className={styles.divider} aria-hidden="true" />
                  <p className={styles.role}>{member.role}</p>
                </div>

                <div className={styles.visual}>
                  <Image
                    src={member.image}
                    alt={member.alt}
                    width={member.width}
                    height={member.height}
                    sizes="(min-width: 1024px) 42vw, (min-width: 768px) 22rem, 17.5rem"
                    className={styles.portrait}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <span className={styles.visualIndex} aria-hidden="true">
                    {toPersianIndex(index + 1)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
