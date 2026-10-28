"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/cn";

interface MobileMenuProps {
  active: string;
  onClose: () => void;
  onNavigate: () => void;
}

/** Full-screen menu for small screens. Traps focus and closes on Escape; the header restores focus. */
export function MobileMenu({ active, onClose, onNavigate }: MobileMenuProps) {
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
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="menu-panel fixed inset-0 z-[70] pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="flex h-[calc(3.5rem+0.75rem)] items-end justify-between px-5 pb-1">
        <span className="eyebrow">Menu</span>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-ink/8"
          aria-label="Close menu"
          onClick={onClose}
          autoFocus
        >
          <X size={20} aria-hidden />
        </button>
      </div>
      <nav aria-label="Main" className="px-5 pt-6">
        <ul className="divide-y divide-line border-y border-line">
          {navigation.map((s, i) => (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.025 * i, duration: 0.2 }}
            >
              <Link
                href={`/#${s.id}`}
                onClick={onNavigate}
                aria-current={active === s.id ? "location" : undefined}
                className={cn(
                  "flex min-h-16 items-center justify-between text-[1.75rem] font-semibold tracking-tight",
                  active === s.id ? "text-accent" : "text-ink",
                )}
              >
                {s.label}
                <span className="text-sm font-medium text-muted tabular-nums" aria-hidden>
                  0{i + 1}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
