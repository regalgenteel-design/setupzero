import { cn } from "@/lib/cn";
import { CountUp } from "./CountUp";

type StatTileProps = {
  value: string;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-[34px] md:text-[40px]",
  md: "text-[44px] md:text-[56px]",
  lg: "text-[56px] md:text-[72px]",
};

/** Large counting number with a mono caption, like the template's About stats. */
export function StatTile({ value, label, size = "md", className }: StatTileProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className={cn("font-display leading-none font-medium tracking-[-0.03em] text-ink", sizes[size])}>
        <CountUp value={value} />
      </div>
      <div className="font-mono text-[11px] tracking-[0.04em] text-muted uppercase">{label}</div>
    </div>
  );
}

export function FloatingStat({ value, label, className }: StatTileProps) {
  return (
    <div className={cn("border border-line bg-raise px-4 py-3 shadow-card", className)}>
      <div className="font-display text-2xl leading-none font-medium text-ink">
        <CountUp value={value} />
      </div>
      <div className="mt-1.5 font-mono text-[10px] tracking-wide text-muted uppercase">{label}</div>
    </div>
  );
}
