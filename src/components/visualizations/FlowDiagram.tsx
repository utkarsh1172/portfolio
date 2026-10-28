"use client";

import { motion, useReducedMotion } from "motion/react";
import type { FlowNode } from "@/types";

/** A system flow drawn as a lane of numbered stops, top to bottom. */
export function FlowDiagram({ nodes, label }: { nodes: readonly FlowNode[]; label: string }) {
  const reduce = useReducedMotion();
  return (
    <figure aria-label={`${label} architecture`} className="relative">
      <ol className="relative">
        <span className="absolute top-6 bottom-6 left-[19px] w-[2px] bg-line" aria-hidden />
        {nodes.map((n, i) => (
          <motion.li
            key={n.title}
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="relative flex items-start gap-4 py-2.5"
          >
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-line bg-surface font-semi text-sm font-bold text-muted tabular-nums">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 rounded-card border border-line bg-bg-2 px-4 py-2.5">
              <span className="block font-semi text-[1.02rem] leading-snug font-semibold">{n.title}</span>
              {n.note && <span className="block text-sm text-muted">{n.note}</span>}
            </span>
          </motion.li>
        ))}
      </ol>
    </figure>
  );
}
