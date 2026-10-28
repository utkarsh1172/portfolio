import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "accent" | "muted";

const tones: Record<BadgeTone, string> = {
  accent: "border-accent/35 bg-accent/10 text-accent",
  muted: "border-line bg-surface-2/60 text-muted",
};

/** Small label chip. Colour only reinforces the text, never replaces it. */
export function Badge({
  tone = "muted",
  dot = false,
  children,
  className,
}: {
  tone?: BadgeTone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.8125rem] font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
