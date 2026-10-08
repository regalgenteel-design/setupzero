import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Wraps children with the four corner brackets that spring outward on hover. */
export function Frame({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "span";
}) {
  return (
    <Tag className={cn("frame", hover && "frame-hover", className)}>
      <span className="frame-c frame-tl" aria-hidden />
      <span className="frame-c frame-tr" aria-hidden />
      <span className="frame-c frame-bl" aria-hidden />
      <span className="frame-c frame-br" aria-hidden />
      {children}
    </Tag>
  );
}
