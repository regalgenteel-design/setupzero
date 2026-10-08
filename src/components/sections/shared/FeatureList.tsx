import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import type { Feature } from "@/content/schema";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FeatureListProps = {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  sub?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
  className?: string;
};

const cols = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Heading row, then a hairline grid of feature cells. */
export function FeatureList({ eyebrow, heading, highlight, sub, features, columns = 3, numbered, className }: FeatureListProps) {
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
        <div className={cn("grid gap-px bg-line", cols[columns])}>
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <div key={f.title} className="flex flex-col gap-8 bg-paper p-6 transition-colors hover:bg-card md:p-7">
                <div className="flex items-start justify-between">
                  <span className="flex size-9 items-center justify-center border border-line bg-raise text-soft">
                    <Icon className="size-4" />
                  </span>
                  {numbered ? <span className="font-mono text-[10.5px] text-faint">{String(i + 1).padStart(2, "0")}</span> : null}
                </div>
                <div>
                  <h3 className="font-display text-base leading-snug font-semibold text-ink">{f.title}</h3>
                  {f.body ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p> : null}
                </div>
              </div>
            );
          })}
          {features.length % columns !== 0 && columns > 2
            ? Array.from({ length: columns - (features.length % columns) }).map((_, i) => <div key={`pad-${i}`} className="hidden bg-paper lg:block" />)
            : null}
        </div>
      </Reveal>
    </section>
  );
}
