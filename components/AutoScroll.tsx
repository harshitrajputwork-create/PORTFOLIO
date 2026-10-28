"use client";

import { useEffect, useRef } from "react";

// A window onto a tall screenshot: it drifts slowly down (and back up) on its
// own, pauses while the visitor hovers or touches it, and can be scrolled by hand.
export default function AutoScroll({ src, alt, href }: { src: string; alt: string; href: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let paused = false;
    let dir = 1;
    let pos = el.scrollTop;
    let raf = 0;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; pos = el.scrollTop; };
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", () => setTimeout(resume, 2500), { passive: true });
    const tick = () => {
      if (!paused) {
        const max = el.scrollHeight - el.clientHeight;
        pos += dir * 0.6;
        if (pos >= max) { pos = max; dir = -1; }
        if (pos <= 0) { pos = 0; dir = 1; }
        el.scrollTop = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
      el.removeEventListener("touchstart", pause);
    };
  }, []);

  return (
    <div className="browser">
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden><i /><i /><i /></span>
        <a href={href} target="_blank" rel="noreferrer" className="browser-url mono">mirrordock.pages.dev ↗</a>
      </div>
      <div className="browser-view" ref={box} tabIndex={0} aria-label={`${alt}. Scroll to see the whole page.`}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
