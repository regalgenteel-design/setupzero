"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { setTheme, useTheme } from "@/lib/hooks/useTheme";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "flex size-9 items-center justify-center border border-line bg-raise text-muted transition-colors hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
