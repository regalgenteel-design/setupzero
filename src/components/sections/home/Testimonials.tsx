import { Quote } from "lucide-react";
import { testimonials } from "@/content/home";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section>
      <div className="border-b border-line px-6 py-12 md:px-10 md:py-16">
        <Reveal>
          <SectionHeading eyebrow={testimonials.eyebrow} heading={testimonials.heading} highlight={testimonials.highlight} />
        </Reveal>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-3 md:p-10">
        {testimonials.items.map((t, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <GlassCard hover className="flex h-full flex-col justify-between gap-10">
              <div>
                <Quote className="size-5 text-faint" />
                <p className="mt-4 font-serif text-xl leading-snug text-ink">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="flex items-center gap-3 border-t border-line pt-4">
                <span className="flex size-9 items-center justify-center border border-line bg-raise font-mono text-xs text-soft">{t.name.charAt(0)}</span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
                {t.placeholder ? <span className="ml-auto bracket-muted text-[9.5px]">pending</span> : null}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
