import { cn } from "@/lib/cn";
import type { Step } from "@/content/schema";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/ui/StepCard";

type TimelineProps = {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  sub?: string;
  steps: Step[];
  className?: string;
};

export function Timeline({ eyebrow, heading, highlight, sub, steps, className }: TimelineProps) {
  const cols = steps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <section className={className}>
      {heading ? (
        <div className="border-b border-line px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} heading={heading} highlight={highlight} sub={sub} />
          </Reveal>
        </div>
      ) : null}
      <Reveal>
        <div className={cn("grid gap-px bg-line", cols)}>
          {steps.map((s) => (
            <div key={s.step} className="bg-paper transition-colors hover:bg-card">
              <StepCard {...s} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
