"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Local light/dark toggle (no next-themes — CRA app).
 * Persists to localStorage and applies `.dark` class to <html>.
 */
export function ThemeToggle({ className }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("rp-theme");
    const initial = stored
      ? stored
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("rp-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      data-testid="theme-toggle"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-ink dark:text-white transition-colors hover:border-brand",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={2} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={2} />
      )}
    </button>
  );
}
