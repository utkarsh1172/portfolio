"use client";

import dynamic from "next/dynamic";

/** Same footprint as the globe, so nothing shifts when the canvas loads. */
function GlobePlaceholder() {
  return (
    <div className="relative aspect-square w-full" aria-hidden>
      <div className="absolute inset-[9%] rounded-full border border-line bg-[rgb(var(--globe-sea))]" />
    </div>
  );
}

/** The globe is canvas-only and below the headline, so it loads after the critical path. */
export const GlobeLazy = dynamic(() => import("./Globe"), { ssr: false, loading: GlobePlaceholder });
