"use client";

import { useEffect, useRef } from "react";

/**
 * The light behind the photo follows the pointer; the photo itself never moves.
 * Fine pointers only, off under reduced motion, one rAF per frame at most.
 */
export function HeroLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      const r = host.getBoundingClientRect();
      if (r.bottom < 0) return;
      el.style.setProperty("--mx", `${((px - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((py - r.top) / r.height) * 100}%`);
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="pointer-events-none absolute inset-0 hero-sheen" aria-hidden />;
}
