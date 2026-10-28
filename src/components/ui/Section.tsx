import type { ReactNode } from "react";
import type { SectionId } from "@/types";
import { cn } from "@/lib/cn";

export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id: SectionId;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? `${id}-heading`}
      className={cn("relative mx-auto w-full max-w-page px-5 py-20 sm:px-8 md:py-28", className)}
    >
      {children}
    </section>
  );
}
