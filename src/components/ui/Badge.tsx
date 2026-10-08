import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  variant?: "bracket" | "bracket-muted" | "pill" | "dot" | "solid";
  className?: string;
  children: ReactNode;
};

export function Badge({ variant = "pill", className, children }: BadgeProps) {
  if (variant === "bracket" || variant === "pill") return <span className={cn("tag", className)}>{children}</span>;
  if (variant === "bracket-muted") return <span className={cn("bracket-muted", className)}>{children}</span>;
  if (variant === "dot") {
    return (
      <span className={cn("inline-flex items-center gap-2 text-sm text-muted", className)}>
        <span className="size-1.5 bg-ink" aria-hidden />
        {children}
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center bg-ink px-2 py-0.5 font-mono text-[10px] tracking-wide text-paper uppercase", className)}>
      {children}
    </span>
  );
}
