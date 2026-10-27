import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "ghost" | "quiet" | "link";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semi text-[0.98rem] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "px-5 bg-accent text-accent-ink shadow-[0_8px_24px_-12px_rgb(var(--accent)/0.8)] hover:brightness-110 active:brightness-95",
  ghost: "px-5 border border-line text-ink hover:border-ink/40 hover:bg-surface-2",
  quiet: "px-5 text-muted hover:bg-surface-2 hover:text-ink",
  /** Text link with button sizing, for secondary destinations in a row of buttons. */
  link: "px-2.5 text-ink/85 underline-offset-4 hover:text-accent hover:underline",
};

export function buttonClasses(variant: ButtonVariant = "ghost", className?: string): string {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "ghost",
  className,
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />;
}

export function ButtonLink({
  variant = "ghost",
  className,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: ButtonVariant }) {
  return <a className={buttonClasses(variant, className)} {...rest} />;
}
