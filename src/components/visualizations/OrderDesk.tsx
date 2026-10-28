"use client";

import { Pause, Play, Plus, StepForward } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { pipeline } from "@/data/pipeline";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";
import { LAST_STAGE, countByStage, createReducer, seedState } from "@/lib/order-simulation";

const TICK_MS = 1500;

const toneFor = (stage: number): BadgeTone => (stage === LAST_STAGE ? "teal" : stage >= 3 ? "amber" : "muted");
const counterColor = (stage: number) => (stage === LAST_STAGE ? "text-teal" : stage >= 3 ? "text-amber" : "text-ink");
const formatTime = (t: number) =>
  new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

/**
 * The view over the order simulation. Rendered client-only (see OrderDeskLazy):
 * its data is random, so server-rendering it would only cause a hydration mismatch.
 */
export default function OrderDesk() {
  const reduce = useReducedMotion();
  const reducer = useMemo(() => createReducer(), []);
  // Starts paused: the workers run only when the visitor presses the button.
  const [state, dispatch] = useReducer(reducer, undefined, () => seedState(false));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "-80px");

  useEffect(() => {
    if (!state.running || !inView) return;
    const t = window.setInterval(() => dispatch({ type: "tick" }), TICK_MS);
    return () => window.clearInterval(t);
  }, [state.running, inView]);

  const counts = countByStage(state.orders);
  const selected = state.orders.find((o) => o.id === state.selected) ?? state.orders[0];
  const select = (id: string) => dispatch({ type: "select", id });

  return (
    <Card ref={ref} className="overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
        <Badge tone="muted">Demo with simulated data</Badge>
        {/* Fixed width for the longest label, so the toolbar never reflows as the status changes. */}
        <span className="inline-block min-w-[10.5rem] text-sm whitespace-nowrap text-muted" aria-live="polite">
          {state.running ? (inView ? "Workers running" : "Paused while off screen") : "Paused"}
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button
            variant="quiet"
            onClick={() => dispatch({ type: "run", on: !state.running })}
            aria-pressed={state.running}
            className="min-h-10 px-4"
          >
            {state.running ? <Pause size={18} aria-hidden /> : <Play size={18} aria-hidden />}
            {state.running ? "Pause workers" : "Start workers"}
          </Button>
          <Button variant="quiet" onClick={() => dispatch({ type: "step" })} className="min-h-10 px-4">
            <StepForward size={18} aria-hidden /> Run scheduler once
          </Button>
          <Button variant="primary" onClick={() => dispatch({ type: "sync" })} className="min-h-10 px-4">
            <Plus size={18} aria-hidden /> Sync a new order
          </Button>
        </div>
      </div>

      <ol className="grid grid-cols-3 border-b border-line sm:grid-cols-6" aria-label="Orders per stage">
        {pipeline.map((p, i) => (
          <li key={p.id} className="border-r border-b border-line px-4 py-4 last:border-r-0 sm:border-b-0 sm:px-5">
            <span className="block text-[0.82rem] leading-tight text-muted">{p.label}</span>
            <motion.span
              key={counts[i]}
              initial={reduce ? false : { y: -4, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              className={cn("display mt-1 block text-[2.2rem] tabular-nums", counterColor(i))}
            >
              {counts[i]}
            </motion.span>
          </li>
        ))}
      </ol>

      <div className="grid lg:grid-cols-12">
        <div className="min-w-0 border-b border-line lg:col-span-8 lg:border-r lg:border-b-0">
          <div className="scroll-x">
            <table className="w-full min-w-[40rem] text-left text-[0.95rem]">
              <caption className="sr-only">Simulated orders. Select an order to see its tracking history.</caption>
              <thead className="text-sm text-muted">
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-3 font-medium">
                    Order
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Account
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Destination
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Stage
                  </th>
                  <th scope="col" className="px-3 py-3 font-medium">
                    Courier
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {state.orders.map((o) => {
                    const on = selected?.id === o.id;
                    return (
                      <motion.tr
                        key={o.id}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className={cn(
                          "cursor-pointer border-b border-line/70 transition-colors",
                          on ? "bg-surface-2" : "hover:bg-surface-2/50",
                        )}
                        onClick={() => select(o.id)}
                      >
                        <td className="px-5 py-3">
                          <button
                            type="button"
                            className="text-left font-semi font-semibold tabular-nums"
                            aria-label={`Show tracking for order ${o.id}`}
                            aria-pressed={on}
                            onClick={(e) => {
                              e.stopPropagation();
                              select(o.id);
                            }}
                          >
                            {o.id}
                          </button>
                          <span className="block text-sm text-muted">{o.item}</span>
                        </td>
                        <td className="px-3 py-3 text-muted">{o.account.replace("Seller account ", "Account ")}</td>
                        <td className="px-3 py-3">{o.dest}</td>
                        <td className="px-3 py-3">
                          <Badge tone={toneFor(o.stage)}>{pipeline[o.stage].label}</Badge>
                        </td>
                        <td className="px-3 py-3 text-muted">{o.courier ?? "Not booked"}</td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          {state.orders.length === 0 && (
            <p className="px-5 py-8 text-muted">No orders yet. Select Sync a new order to pull one in.</p>
          )}
        </div>

        <aside className="lg:col-span-4" aria-label="Tracking">
          {selected ? (
            <div className="p-5 sm:p-6">
              <p className="text-sm text-muted">Tracking</p>
              <p className="mt-0.5 font-semi text-lg font-semibold tabular-nums">{selected.id}</p>
              <p className="text-sm text-muted">
                {selected.item} to {selected.dest}
                {selected.awb ? `, AWB ${selected.awb}` : ""}
              </p>
              <ol className="relative mt-5 space-y-4 border-l-2 border-line pl-6">
                {pipeline.map((p, i) => {
                  const reached = i <= selected.stage;
                  const current = i === selected.stage;
                  return (
                    <li key={p.id} className="relative">
                      <span
                        className={cn(
                          "absolute top-1 -left-[33px] h-4 w-4 rounded-full border-2",
                          current
                            ? "border-accent bg-accent"
                            : reached
                              ? "border-teal bg-teal"
                              : "border-line bg-surface",
                        )}
                        aria-hidden
                      />
                      <p className={cn("font-semi leading-tight font-semibold", reached ? "text-ink" : "text-muted")}>
                        {p.label}
                        {current && <span className="sr-only"> (current)</span>}
                      </p>
                      <p className="text-sm text-muted tabular-nums">
                        {reached ? formatTime(selected.history[i]) : "Waiting"}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          ) : (
            <p className="p-6 text-muted">Select an order to see its tracking history.</p>
          )}
        </aside>
      </div>

      <div className="border-t border-line bg-bg-2 px-5 py-4 sm:px-6">
        <p className="mb-2 text-sm text-muted">Worker log</p>
        <ol className="h-28 space-y-1 overflow-hidden text-[0.92rem]" aria-live="off">
          {state.log.slice(0, 6).map((l) => (
            <li key={l.id} className="flex gap-3">
              <span className="shrink-0 text-muted tabular-nums">{formatTime(l.at)}</span>
              <span className="truncate">{l.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}
