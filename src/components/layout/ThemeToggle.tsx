"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const light = theme === "light";
  const label = light ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(light ? "dark" : "light")}
      aria-label={label}
      title={label}
      className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:bg-ink/8 hover:text-ink"
    >
      {light ? <Moon size={18} aria-hidden /> : <Sun size={18} aria-hidden />}
    </button>
  );
}
