import type { ComponentPropsWithRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = { as?: T } & ComponentPropsWithRef<T>;

/** The raised glass surface used for panels, records and forms across the site. */
export function Card<T extends ElementType = "div">({ as, className, ...rest }: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={cn("glass sheen rounded-card", className)} {...rest} />;
}
