import { cn } from "@/lib/cn";
import type { Cta } from "@/content/schema";
import { Badge } from "@/components/ui/Badge";
import { CtaButton } from "@/components/ui/Button";
import { Highlighted } from "@/components/ui/Highlighted";
import { Reveal } from "@/components/ui/Reveal";
import { HeroScene } from "@/components/three/HeroScene";

type PageHeroProps = {
  eyebrow?: string;
  headline: string;
  highlight?: string;
  sub?: string;
  ctas?: Cta[];
  badges?: string[];
  compact?: boolean;
  className?: string;
};

/** Inner-page hero: copy on the left, the animated ink ring on the right. */
export function PageHero({ eyebrow, headline, highlight, sub, ctas, badges, compact, className }: PageHeroProps) {
  return (
    <section className={cn("overflow-hidden", className)}>
      <div className={cn("grid lg:grid-cols-[1.1fr_0.9fr]", compact ? "lg:min-h-[440px]" : "lg:min-h-[540px]")}>
        <div className="flex flex-col">
          <div className="px-6 pt-10 pb-7 md:px-10 md:pt-12">
            <Reveal>{eyebrow ? <Badge variant="bracket">{eyebrow}</Badge> : null}</Reveal>
          </div>
          <div className="band px-6 py-7 md:px-10">
            <Reveal delay={0.06}>
              <h1 className="font-display text-[36px] leading-[1.05] font-normal tracking-[-0.03em] text-ink sm:text-[44px] lg:text-[52px]">
                <Highlighted text={headline} highlight={highlight} />
              </h1>
            </Reveal>
          </div>
          <div className="flex flex-1 flex-col gap-7 px-6 py-8 md:px-10">
            {sub ? (
              <Reveal delay={0.12}>
                <p className="max-w-[34rem] text-base leading-relaxed text-muted md:text-[17px]">{sub}</p>
              </Reveal>
            ) : null}
            {ctas && ctas.length > 0 ? (
              <Reveal delay={0.18}>
                <div className="flex flex-wrap gap-3">
                  {ctas.map((cta, i) => (
                    <CtaButton key={cta.label} cta={cta} icon={i === 0} size="md" />
                  ))}
                </div>
              </Reveal>
            ) : null}
            {badges && badges.length > 0 ? (
              <Reveal delay={0.24} className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {badges.map((b) => (
                    <Badge key={b} variant="pill">
                      {b}
                    </Badge>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
        <div className="relative hidden border-l border-line lg:block">
          <HeroScene />
          <span className="bracket-muted pointer-events-none absolute top-4 left-4">Drag to rotate</span>
        </div>
      </div>
    </section>
  );
}
