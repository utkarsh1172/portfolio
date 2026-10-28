"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/**
 * The active colour theme. `null` during server render and hydration, so the
 * markup never mismatches; the inline script in the root layout applies the
 * saved choice (or dark) before paint.
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
