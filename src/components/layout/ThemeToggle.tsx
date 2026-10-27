"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const label =
    theme === "dark" ? "Switch to light theme" : theme === "light" ? "Switch to dark theme" : "Switch theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-ink"
    >
      {theme === "dark" ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
