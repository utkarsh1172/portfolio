"use client";

import { Menu } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import { scrollToSection } from "@/lib/scroll";
import { CommandPalette } from "./CommandPalette";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const ids = navigation.map((s) => s.id);

/**
 * The nav is a delivery route: each section is a checkpoint, the line fills
 * as you scroll, and the checkpoint you are on is marked like a live stop.
 */
export function Header() {
  const { active, progress } = useScrollSpy(ids);
  const [open, setOpen] = useState(false);
  const activeIndex = ids.indexOf(active as (typeof ids)[number]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Return focus to the menu button when the menu is dismissed, but not after
  // following a link (focus should stay with the page the visitor jumped to).
  const restoreFocus = useRef(false);
  const close = useCallback(() => {
    restoreFocus.current = true;
    setOpen(false);
  }, []);

  const go = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      restoreFocus.current = false;
      setOpen(false);
      // Wait a frame so the mobile menu releases its scroll lock first.
      requestAnimationFrame(() => scrollToSection(id));
    },
    [],
  );

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 hero-fade border-b border-line/60 bg-bg/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl"
        style={{ "--d": "0.7s" } as React.CSSProperties}
      >
        <div className="mx-auto flex h-16 max-w-page items-center gap-4 px-5 sm:px-8">
          <a
            href="#top"
            onClick={go("top")}
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${profile.name}, back to top`}
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg border-2 border-accent font-display text-lg leading-none font-bold text-accent transition group-hover:bg-accent group-hover:text-accent-ink">
              UK
            </span>
            <span className="hidden font-semi text-[1.02rem] font-semibold sm:block">{profile.name}</span>
          </a>

          <nav aria-label="Sections" className="relative mx-auto hidden flex-1 lg:block">
            <div className="relative mx-6">
              <div className="absolute top-[7px] right-0 left-0 h-[2px] route-dash" aria-hidden />
              <div
                className="absolute top-[7px] left-0 h-[2px] bg-accent transition-[width] duration-200"
                style={{ width: `${progress * 100}%` }}
                aria-hidden
              />
              <ol className="relative flex justify-between">
                {navigation.map((s, i) => {
                  const current = i === activeIndex;
                  const passed = i < activeIndex;
                  return (
                    <li key={s.id} className="flex flex-col items-center">
                      <a
                        href={`#${s.id}`}
                        onClick={go(s.id)}
                        aria-current={current ? "location" : undefined}
                        className="group flex flex-col items-center gap-1.5 rounded-md px-1"
                      >
                        <span className="relative grid h-4 w-4 place-items-center">
                          {current && (
                            <span className="absolute inset-0 pulse-ring rounded-full bg-accent/50" aria-hidden />
                          )}
                          <span
                            className={cn(
                              "h-3 w-3 rounded-full border-2 transition",
                              current
                                ? "border-accent bg-accent"
                                : passed
                                  ? "border-accent bg-bg"
                                  : "border-line bg-bg group-hover:border-ink/50",
                            )}
                          />
                        </span>
                        <span
                          className={cn(
                            "font-semi text-[0.82rem] font-semibold transition",
                            current ? "text-ink" : "text-muted group-hover:text-ink",
                          )}
                        >
                          {s.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <CommandPalette />
            <ThemeToggle />
            <a
              href="#contact"
              onClick={go("contact")}
              className="hidden min-h-10 items-center rounded-full bg-accent px-4 font-semi text-[0.95rem] font-semibold text-accent-ink transition hover:brightness-110 md:inline-flex"
            >
              Get in touch
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-surface-2 lg:hidden"
              aria-label="Open sections menu"
              aria-expanded={open}
              aria-controls="mobile-route"
              onClick={() => setOpen(true)}
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </div>
        <div className="h-[2px] bg-accent lg:hidden" style={{ width: `${progress * 100}%` }} aria-hidden />
      </header>

      <AnimatePresence
        onExitComplete={() => {
          if (restoreFocus.current) menuButtonRef.current?.focus();
        }}
      >
        {open && <MobileMenu activeIndex={activeIndex} onClose={close} onNavigate={go} />}
      </AnimatePresence>
    </>
  );
}
