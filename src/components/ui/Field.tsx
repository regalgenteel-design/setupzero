import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const base =
  "w-full rounded-[2px] border border-line bg-raise px-3.5 py-2.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-ink/60 focus:outline-none";

export function Label({ className, ...props }: ComponentPropsWithoutRef<"label">) {
  return <label className={cn("mb-1.5 block font-mono text-[11px] tracking-[0.04em] text-muted uppercase", className)} {...props} />;
}

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(base, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentPropsWithoutRef<"textarea">) {
  return <textarea className={cn(base, "min-h-[110px] resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn(base, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27none%27 stroke=%27%238d8d8d%27 stroke-width=%272%27><path d=%27m4 6 4 4 4-4%27/></svg>')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10", className)} {...props}>
      {children}
    </select>
  );
}
