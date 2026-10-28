import type { ComponentPropsWithRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = { as?: T; variant?: "glass" | "solid" } & ComponentPropsWithRef<T>;

/**
 * Raised surface. `glass` is for short, scannable content (cards, meta panels);
 * `solid` is for anything people read at length.
 */
export function Card<T extends ElementType = "div">({ as, variant = "glass", className, ...rest }: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("rounded-3xl", variant === "glass" ? "glass" : "solid", className)} {...rest} />;
}
