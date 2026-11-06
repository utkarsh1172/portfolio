"use client";

import { useEffect } from "react";

/** The hero owns the entrance; reading sections stay visible and still. */
export function Effects() {
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last: PointerEvent | null = null;
    let current: HTMLElement | null = null;
    const light = document.createElement("span");
    light.className = "pointer-highlight";
    light.setAttribute("aria-hidden", "true");

    const clear = () => {
      light.remove();
      current = null;
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const apply = () => {
      frame = 0;
      const card = last?.target instanceof Element ? last.target.closest<HTMLElement>(".sheen") : null;
      if (card !== current) {
        light.remove();
        current = card;
        card?.appendChild(light);
      }
      if (!card || !last) return;
      const rect = card.getBoundingClientRect();
      light.style.transform = `translate(${last.clientX - rect.left - 140}px, ${last.clientY - rect.top - 140}px)`;
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || reduce.matches) return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", clear);
    reduce.addEventListener("change", clear);
    return () => {
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", clear);
      reduce.removeEventListener("change", clear);
      clear();
    };
  }, []);
  return null;
}
