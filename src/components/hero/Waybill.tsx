import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { Barcode } from "./Barcode";

interface Row {
  label: string;
  value: string;
  wide?: boolean;
}

/**
 * A shipping label for a person. Every value comes from the resume; the card
 * prints row by row as part of the hero's load sequence.
 */
export function Waybill({ years, className }: { years: number; className?: string }) {
  const rows: Row[] = [
    { label: "From", value: "Mumbai, India" },
    { label: "In service since", value: `Oct 2022, ${years} yrs` },
    { label: "Current hub", value: "Growve, Senior Software Developer", wide: true },
    { label: "Handled", value: "400+ orders a day, 5K+ shipments a month", wide: true },
    { label: "Connected", value: "Amazon SP-API, Blue Dart, XpressBees, Razorpay", wide: true },
  ];

  return (
    <aside
      aria-label="Profile at a glance"
      className={cn(
        "label-drop rounded-md border border-paper-line bg-paper font-semi text-paper-ink shadow-[0_24px_48px_-24px_rgb(0_0_0/0.55)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b-2 border-paper-ink px-4 py-2.5">
        <span className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-[5px] bg-paper-ink font-display text-[0.95rem] leading-none font-bold text-paper">
            UK
          </span>
          <span className="font-display text-[1.35rem] leading-none font-bold">Waybill</span>
        </span>
        <span className="text-[0.78rem] font-semibold text-paper-muted tabular-nums">Express, full-stack</span>
      </div>

      <dl className="grid grid-cols-2">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={cn("print-row border-b border-paper-line px-4 py-2", r.wide ? "col-span-2" : "odd:border-r")}
            style={{ "--i": i } as CSSProperties}
          >
            <dt className="text-[0.74rem] leading-tight font-medium text-paper-muted">{r.label}</dt>
            <dd className="text-[0.95rem] leading-snug font-semibold">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div
        className="flex print-row items-center gap-2 px-4 pt-2.5 pb-1"
        style={{ "--i": rows.length } as CSSProperties}
      >
        <span className="relative grid h-2.5 w-2.5 place-items-center" aria-hidden>
          <span className="absolute inset-0 pulse-ring rounded-full bg-teal/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-teal" />
        </span>
        <p className="text-[0.88rem] font-semibold">Open to senior full-stack roles</p>
      </div>

      <div className="px-4 pt-1 pb-3">
        <Barcode value="utkarsh1172" className="h-9 w-full" />
        <p className="mt-1 text-center text-[0.72rem] tracking-[0.3em] text-paper-muted">utkarsh1172</p>
      </div>
    </aside>
  );
}
