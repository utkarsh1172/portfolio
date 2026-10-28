"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
  activeIndex: number;
  onClose: () => void;
  onNavigate: (id: string) => (e: React.MouseEvent) => void;
}

/** Full-screen route menu for small screens. Traps focus and closes on Escape; the header restores focus. */
export function MobileMenu({ activeIndex, onClose, onNavigate }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <motion.div
      ref={dialogRef}
      id="mobile-route"
      role="dialog"
      aria-modal="true"
      aria-label="Sections"
      className="fixed inset-0 z-[70] bg-bg/95 pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-xl lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex h-16 items-center justify-between px-5">
        <span className="font-semi font-semibold text-muted">Jump to a stop</span>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"
          aria-label="Close sections menu"
          onClick={onClose}
          autoFocus
        >
          <X size={18} aria-hidden />
        </button>
      </div>
      <ol className="relative mx-8 mt-4 border-l-2 border-dashed border-line pl-8">
        {navigation.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.03 * i }}
            className="relative py-3"
          >
            <span
              className={cn(
                "absolute top-1/2 -left-[41px] h-4 w-4 -translate-y-1/2 rounded-full border-2",
                i === activeIndex
                  ? "border-accent bg-accent"
                  : i < activeIndex
                    ? "border-accent bg-bg"
                    : "border-line bg-bg",
              )}
              aria-hidden
            />
            <a
              href={`#${s.id}`}
              onClick={onNavigate(s.id)}
              className="display block text-[2.6rem] text-ink"
              aria-current={i === activeIndex ? "location" : undefined}
            >
              {s.label}
            </a>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}
