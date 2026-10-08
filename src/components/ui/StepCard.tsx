import { cn } from "@/lib/cn";

type StepCardProps = { step: string; title: string; body: string; className?: string };

export function StepCard({ step, title, body, className }: StepCardProps) {
  return (
    <div className={cn("flex h-full flex-col gap-10 p-6 md:p-7", className)}>
      <span className="font-mono text-[11px] tracking-[0.06em] text-muted">STEP {step}</span>
      <div>
        <h3 className="font-display text-lg font-semibold leading-tight text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}
