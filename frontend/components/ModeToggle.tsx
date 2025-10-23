"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// Should match the value in ThemeProvider

const fixed_theme = true;

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  if (fixed_theme) return null;
  return (
    <div className="relative">
      <button
        type="button"
        className="relative p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
        onClick={() => setTheme((prev: string) => prev === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? (
          <Moon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-0" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:-rotate-90" />
        )}
      </button>
    </div>
  );
}
