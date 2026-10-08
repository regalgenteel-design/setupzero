import { cn } from "@/lib/cn";
import type { CtaBlock } from "@/content/schema";
import { CtaButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Final call to action on an inverted panel, like the template's "Clear the queue." band. */
export function CTABand({ block, className }: { block: CtaBlock; className?: string }) {
  return (
    <section className={cn("theme-invert", className)}>
      <div className="grid gap-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <Reveal>
          <h2 className="font-display text-[34px] leading-[1.04] font-medium tracking-[-0.03em] text-ink md:text-[52px]">{block.heading}</h2>
          {block.sub ? <p className="mt-5 max-w-lg text-base text-muted">{block.sub}</p> : null}
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {block.ctas.map((cta, i) => (
              <CtaButton key={cta.label} cta={cta} icon={i === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
