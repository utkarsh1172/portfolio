"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies text to the clipboard, falling back to a visible message when the API is unavailable. */
export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2500);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-muted transition hover:text-ink"
      >
        {state === "copied" ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
        {state === "copied" ? "Copied" : label}
      </button>
      <span role="status" className="text-sm text-muted">
        {state === "failed" ? `Copy isn't available here. The address is ${text}.` : ""}
      </span>
    </>
  );
}
