import type { ComponentPropsWithRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = { as?: T } & ComponentPropsWithRef<T>;

/** The raised surface used for panels, records and forms across the site. */
export function Card<T extends ElementType = "div">({ as, className, ...rest }: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("rounded-2xl border border-line bg-surface", className)} {...rest} />;
}
