import { ArrowDown } from "lucide-react";
import type { Diagram as DiagramData, FlowStep } from "@/types";
import { cn } from "@/lib/cn";

/**
 * Diagrams of structure and flow. Case studies show no real UI or client data,
 * so these carry the visual story. Server-rendered, no JavaScript.
 */
export function Diagram({ diagram }: { diagram: DiagramData }) {
  return (
    <figure className="diagram rounded-2xl border border-line bg-bg-2/70 p-4 sm:p-6" data-reveal>
      <figcaption className="mb-5">
        <span className="block text-[0.9375rem] font-semibold">{diagram.title}</span>
        {diagram.caption && <span className="mt-1 block text-sm text-muted">{diagram.caption}</span>}
      </figcaption>
      {diagram.kind === "flow" && <Flow steps={diagram.steps} outcomes={diagram.outcomes} />}
      {diagram.kind === "layers" && <Layers layers={diagram.layers} />}
      {diagram.kind === "scale" && <Scale rows={diagram.rows} />}
    </figure>
  );
}

function Node({ step, index }: { step: FlowStep; index?: number }) {
  return (
    <div className="flex h-full min-w-0 flex-1 items-start gap-3 rounded-xl border border-line bg-surface px-3.5 py-3">
      {index !== undefined && (
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/12 text-xs font-semibold text-accent tabular-nums">
          {index + 1}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-[0.9375rem] leading-snug font-medium">{step.title}</span>
        {step.note && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">{step.note}</span>}
      </span>
    </div>
  );
}

/**
 * Numbered steps. Up to five read as a stepper: stops on a line (down the page
 * on phones, across from md up) with the text under each stop. Longer flows
 * wrap as a grid of cards; the numbers carry the order.
 */
function Flow({ steps, outcomes }: { steps: FlowStep[]; outcomes?: FlowStep[] }) {
  const stepper = steps.length <= 5;
  return (
    <div>
      {stepper ? (
        <ol className="grid gap-3 md:auto-cols-fr md:grid-flow-col md:gap-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-3 md:flex-col">
              {i < steps.length - 1 && (
                <span
                  className="absolute top-8 -bottom-3 left-3.5 w-px bg-line md:top-3.5 md:-right-3 md:bottom-auto md:left-9 md:h-px md:w-auto"
                  aria-hidden
                />
              )}
              <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/40 bg-surface text-xs font-semibold text-accent tabular-nums">
                {i + 1}
              </span>
              <span className="min-w-0 pb-1">
                <span className="block leading-snug font-medium">{s.title}</span>
                {s.note && <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">{s.note}</span>}
              </span>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Node step={s} index={i} />
            </li>
          ))}
        </ol>
      )}
      {outcomes && outcomes.length > 0 && (
        <div className="mt-3">
          <p className="flex items-center gap-2 text-sm text-muted">
            <ArrowDown size={15} aria-hidden /> Ends in one of
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {outcomes.map((o) => (
              <li key={o.title} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm">
                <span className="font-medium">{o.title}</span>
                {o.note && <span className="text-muted">, {o.note.toLowerCase()}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Stacked layers, each built from the one beneath it. Drawn top-down: products first, foundations last. */
function Layers({ layers }: { layers: { title: string; note?: string; items: string[] }[] }) {
  const ordered = [...layers].reverse();
  return (
    <ol className="space-y-2">
      {ordered.map((l, i) => (
        <li
          key={l.title}
          className={cn(
            "grid gap-3 rounded-xl border px-4 py-3.5 sm:grid-cols-[11rem_1fr] sm:items-center",
            i === ordered.length - 1 ? "border-accent/40 bg-accent/8" : "border-line bg-surface",
          )}
        >
          <span>
            <span className="block text-[0.9375rem] font-semibold">{l.title}</span>
            {l.note && <span className="block text-[0.8125rem] text-muted">{l.note}</span>}
          </span>
          <ul className="flex flex-wrap gap-1.5">
            {l.items.map((item) => (
              <li key={item} className="rounded-full border border-line bg-bg-2 px-2.5 py-1 text-[0.8125rem]">
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/** A type ladder: each style set at its real size, with its name and specs. */
function Scale({ rows }: { rows: { name: string; size: number; weight: number; note?: string }[] }) {
  return (
    <table className="w-full table-fixed border-collapse text-left">
      <thead className="sr-only">
        <tr>
          <th scope="col">Style</th>
          <th scope="col">Sample</th>
          <th scope="col">Size and weight</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {rows.map((r) => (
          <tr key={r.name}>
            <th scope="row" className="w-26 py-2.5 pr-3 align-middle text-[0.8125rem] font-medium text-muted sm:w-32">
              {r.name}
              {r.note && <span className="ml-1.5 text-accent">{r.note}</span>}
            </th>
            <td
              className="truncate py-2.5 pr-3 align-middle leading-tight"
              style={{ fontSize: r.size, fontWeight: r.weight }}
            >
              Orders in transit
            </td>
            <td className="w-22 py-2.5 text-right align-middle text-[0.8125rem] text-muted tabular-nums">
              {r.size} / {r.weight}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** A small, decorative preview of a flow for cards: the first steps as connected stops. */
export function DiagramThumb({ steps, className }: { steps: FlowStep[]; className?: string }) {
  const shown = steps.slice(0, 5);
  return (
    <div
      className={cn("thumb relative flex aspect-16/10 flex-col justify-center rounded-2xl p-5 sm:p-7", className)}
      aria-hidden
    >
      <ol className="relative space-y-2.5">
        <span className="absolute top-3 bottom-3 left-2.75 w-px bg-line" />
        {shown.map((s, i) => (
          <li key={s.title} className="relative flex items-center gap-3">
            <span
              className={cn(
                "relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.6875rem] font-semibold tabular-nums",
                i === 0 ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted",
              )}
            >
              {i + 1}
            </span>
            <span className="truncate rounded-lg border border-line bg-surface/80 px-3 py-1.5 text-[0.8125rem] font-medium">
              {s.title}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
