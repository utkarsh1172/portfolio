"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { Role, RoleId } from "@/types";

/** Roles as expandable checkpoints. The current role starts open. */
export function RoleList({ roles }: { roles: readonly Role[] }) {
  const [open, setOpen] = useState<Partial<Record<RoleId, boolean>>>(() =>
    Object.fromEntries(roles.filter((r) => r.current).map((r) => [r.id, true])),
  );
  const reduce = useReducedMotion();

  return (
    <ol className="mt-16 space-y-4">
      {roles.map((r) => {
        const isOpen = !!open[r.id];
        return (
          <Card as="li" key={r.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`role-${r.id}`}
                onClick={() => setOpen((o) => ({ ...o, [r.id]: !o[r.id] }))}
                className="grid w-full gap-3 px-5 py-5 text-left sm:grid-cols-12 sm:items-center sm:px-7"
              >
                <span className="font-semi text-[0.98rem] font-semibold text-muted tabular-nums sm:col-span-3">
                  {r.start} to {r.end}
                </span>
                <span className="sm:col-span-6">
                  <span className="heading block text-[1.5rem]">{r.title}</span>
                  <span className="mt-1 block text-muted">{r.company}</span>
                </span>
                <span className="flex items-center justify-between gap-3 sm:col-span-3 sm:justify-end">
                  {r.current ? <Badge tone="accent">Current role</Badge> : <Badge tone="muted">Completed</Badge>}
                  <ChevronDown
                    size={18}
                    aria-hidden
                    className={cn("shrink-0 text-muted transition-transform", isOpen && "rotate-180")}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`role-${r.id}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.7, 0.1, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 border-t border-line px-5 py-6 sm:grid-cols-12 sm:px-7">
                    <div className="sm:col-span-3">
                      {r.stack && (
                        <>
                          <p className="text-sm text-muted">Stack</p>
                          <p className="mt-1 text-[0.95rem]">{r.stack}</p>
                        </>
                      )}
                    </div>
                    <ul className="space-y-3 sm:col-span-9">
                      {r.points.map((p) => (
                        <li key={p.label} className="grid gap-1 md:grid-cols-[13rem_1fr] md:gap-5">
                          <span className="font-semi font-semibold">{p.label}</span>
                          <span className="text-muted">{p.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </ol>
  );
}
