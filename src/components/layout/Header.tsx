"use client";

import { ArrowUpRight, Menu } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToSection } from "@/lib/scroll";
import { CommandPalette } from "./CommandPalette";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const ids = navigation.map((section) => section.id);
const desktopLinks = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "career", label: "Experience" },
  { id: "stack", label: "Stack" },
];

export function Header() {
  const { active, progress } = useScrollSpy(ids);
  const [open, setOpen] = useState(false);
  const activeIndex = ids.indexOf(active as (typeof ids)[number]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const close = useCallback(() => {
    restoreFocus.current = true;
    setOpen(false);
  }, []);
  const go = useCallback(
    (id: string) => (event: React.MouseEvent) => {
      event.preventDefault();
      restoreFocus.current = false;
      setOpen(false);
      requestAnimationFrame(() => scrollToSection(id));
    },
    [],
  );

  return (
    <>
      <header className="site-header glass-bar fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)]">
        <div className="mx-auto flex h-20 max-w-[85rem] items-center gap-8 px-5 sm:px-8 lg:px-16">
          <a
            href="#top"
            onClick={go("top")}
            className="brand-link group flex shrink-0 items-center gap-3"
            aria-label={`${profile.name}, back to top`}
          >
            <span className="brand-monogram">
              uk<span>.</span>
            </span>
            <span className="hidden font-display text-sm font-medium tracking-tight sm:block">{profile.name}</span>
          </a>
          <nav aria-label="Sections" className="ml-auto hidden items-center gap-7 lg:flex">
            {desktopLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={go(link.id)}
                aria-current={active === link.id ? "location" : undefined}
                className="header-link"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <CommandPalette />
            <ThemeToggle />
            <a
              href="#contact"
              onClick={go("contact")}
              className="header-contact ml-3 hidden min-h-11 items-center gap-3 rounded-full border border-line px-5 text-xs font-semibold hover:border-accent md:inline-flex"
            >
              Let’s talk <ArrowUpRight size={15} aria-hidden />
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
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
        <div
          className="header-progress h-px origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
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
