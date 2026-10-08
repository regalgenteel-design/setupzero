import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type SectionShellProps = ComponentPropsWithoutRef<"section"> & {
  /** "panel" adds the band background used for forms and highlighted blocks. */
  variant?: "plain" | "panel";
  padded?: boolean;
};

export function SectionShell({ variant = "plain", padded = true, className, children, ...rest }: SectionShellProps) {
  return (
    <section className={cn(variant === "panel" && "bg-band!", className)} {...rest}>
      <div className={cn("container-x relative", padded && "py-12 md:py-16")}>{children}</div>
    </section>
  );
}
