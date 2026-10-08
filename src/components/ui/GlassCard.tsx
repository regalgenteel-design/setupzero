import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Frame } from "./Frame";

type GlassCardProps = ComponentPropsWithoutRef<"div"> & {
  hover?: boolean;
  tone?: "glass" | "strong" | "dark";
  children: ReactNode;
};

const tones = {
  glass: "bg-card border border-line",
  strong: "bg-raise border border-line-strong",
  dark: "bg-paper border border-line",
};

/** Flat square card. With `hover`, it gets corner brackets that spring out. */
export function GlassCard({ hover, tone = "glass", className, children, ...rest }: GlassCardProps) {
  const card = (
    <div className={cn("relative h-full p-6 transition-colors duration-300", tones[tone], hover && "hover:border-line-strong", className)} {...rest}>
      {children}
    </div>
  );
  return hover ? <Frame className="h-full">{card}</Frame> : card;
}

export function GlassLinkCard({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <Frame className="h-full">
      <Link href={href} className={cn("group relative block h-full border border-line bg-card p-6 transition-colors duration-300 hover:border-line-strong", className)}>
        {children}
      </Link>
    </Frame>
  );
}
