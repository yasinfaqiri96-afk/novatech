"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import styles from "./LazyVideo.module.css";

type LazyVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> & {
  src: string;
  type?: string;
  /**
   * "idle": start once the page has finished loading (above-the-fold media),
   * so the poster, fonts and scripts never queue behind megabytes of video.
   * "visible": start only when the video approaches the viewport.
   */
  start?: "idle" | "visible";
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/** Phones get the poster and a play button instead of a multi-megabyte autoplay. */
const MOBILE_QUERY = "(max-width: 799px)";

/** Data-saver users and 2G connections keep the poster: the film is decoration. */
function constrainedNetwork() {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return Boolean(connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? ""));
}

/**
 * A muted, looping background film whose file is not requested with the page.
 * An `autoPlay` video downloads in full no matter what `preload` says, so the
 * element is rendered without a source and the poster stands in until the
 * source is attached here. It also pauses while scrolled out of view.
 *
 * On phones, on data saver / 2G and under reduced motion nothing is fetched
 * automatically: the poster stays and a play button lets the visitor choose to
 * download the film. The button is absolutely positioned, so the parent must be
 * a positioned box; it is only rendered after hydration, so it never shifts
 * layout.
 */
export default function LazyVideo({ src, type = "video/mp4", start = "visible", ...props }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const attachedRef = useRef(false);
  const [manual, setManual] = useState(false);
  const [playing, setPlaying] = useState(false);

  const attach = () => {
    const video = ref.current;
    if (!video || attachedRef.current) return;
    attachedRef.current = true;
    const source = document.createElement("source");
    source.src = src;
    source.type = type;
    video.appendChild(source);
    video.load();
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    const removeMediaListeners = () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };

    if (
      window.matchMedia(MOBILE_QUERY).matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      constrainedNetwork()
    ) {
      // Deferred so the state update happens outside the effect body.
      const id = requestAnimationFrame(() => setManual(true));
      return () => { cancelAnimationFrame(id); removeMediaListeners(); };
    }

    let visible = start === "idle";
    let cancelIdle = () => {};
    const play = () => { void video.play().catch(() => {}); };
    const attachAndPlay = () => { attach(); if (visible) play(); };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) { if (attachedRef.current) video.pause(); return; }
      if (attachedRef.current) play();
      else if (start === "visible") attachAndPlay();
    }, { rootMargin: "300px 0px" });
    observer.observe(video);

    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(attachAndPlay, { timeout: 1500 });
        cancelIdle = () => window.cancelIdleCallback(id);
      } else {
        const id = setTimeout(attachAndPlay, 200);
        cancelIdle = () => clearTimeout(id);
      }
    };
    if (start === "idle") {
      if (document.readyState === "complete") scheduleIdle();
      else window.addEventListener("load", scheduleIdle, { once: true });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("load", scheduleIdle);
      cancelIdle();
      removeMediaListeners();
    };
    // `attach` only reads refs and the props listed here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, type, start]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (playing) { video.pause(); return; }
    attach();
    void video.play().catch(() => {});
  };

  return (
    <>
      <video ref={ref} muted loop playsInline preload="none" {...props} />
      {manual && (
        <button
          type="button"
          className={`${styles.toggle} ${playing ? styles.playing : ""}`}
          onClick={toggle}
          aria-label={playing ? "توقف ویدیو" : "پخش ویدیو"}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.5 12 8 18V6z" /></svg>
          )}
        </button>
      )}
    </>
  );
}
