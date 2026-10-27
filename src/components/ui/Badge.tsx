import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "teal" | "amber" | "accent" | "muted";

const tones: Record<BadgeTone, string> = {
  teal: "border-teal/30 bg-teal/10 text-teal",
  amber: "border-amber/30 bg-amber/10 text-amber",
  accent: "border-accent/30 bg-accent/10 text-accent",
  muted: "border-line bg-surface-2 text-muted",
};

const dots: Record<BadgeTone, string> = { teal: "bg-teal", amber: "bg-amber", accent: "bg-accent", muted: "bg-muted" };

/** Status chip. Colour carries meaning; the text always repeats it, so colour is never the only signal. */
export function Badge({ tone, children, className }: { tone: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semi text-[0.8rem] font-semibold whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dots[tone])} aria-hidden />
      {children}
    </span>
  );
}
