"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

function subscribe(onChange: () => void) {
  const mq = darkQuery();
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  mq.addEventListener("change", onChange);
  return () => {
    mo.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === "light" || explicit === "dark") return explicit;
  return darkQuery().matches ? "dark" : "light";
}

/**
 * The resolved colour theme. `null` during server render and hydration, so the
 * markup never mismatches; the saved choice is applied before paint by the
 * inline script in the root layout.
 */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getSnapshot, () => null);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); the choice still applies for this visit.
    }
  }, []);

  return { theme, setTheme };
}
