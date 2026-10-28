"use client";

import { Menu } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const ids = navigation.map((s) => s.id);

/**
 * Floating glass bar. Links point at home-page sections, so they work from a
 * case study too; on the home page the section in view is marked. Takes the
 * name as a prop so profile data (and its placeholders) stays out of the
 * client bundle.
 */
export function Header({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  const { active } = useScrollSpy(ids);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Return focus to the menu button when the menu is dismissed, but not after
  // following a link (focus should stay with the section the visitor jumped to).
  const restoreFocus = useRef(false);
  const close = useCallback(() => {
    restoreFocus.current = true;
    setOpen(false);
  }, []);
  const navigate = useCallback(() => {
    restoreFocus.current = false;
    setOpen(false);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)] sm:px-6">
        <div className="glass glass-bar mx-auto flex h-14 max-w-page items-center gap-3 rounded-2xl pr-1.5 pl-2.5 sm:pl-3">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-xl" aria-label={`${name}, home`}>
            <span
              className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-[0.8125rem] font-semibold tracking-wide text-accent-ink"
              aria-hidden
            >
              {initials}
            </span>
            <span className="hidden text-[0.9375rem] font-semibold sm:block">{name}</span>
          </Link>

          <nav aria-label="Main" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((s) => {
                const current = active === s.id;
                return (
                  <li key={s.id}>
                    <Link
                      href={`/#${s.id}`}
                      aria-current={current ? "location" : undefined}
                      className={cn(
                        "inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors",
                        current ? "bg-ink/10 text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      {s.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="hidden min-h-10 items-center rounded-full bg-accent px-4 text-[0.9375rem] font-semibold text-accent-ink transition hover:brightness-110 md:inline-flex"
            >
              Get in touch
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/8 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence
        onExitComplete={() => {
          if (restoreFocus.current) menuButtonRef.current?.focus();
        }}
      >
        {open && <MobileMenu active={active} onClose={close} onNavigate={navigate} />}
      </AnimatePresence>
    </>
  );
}
