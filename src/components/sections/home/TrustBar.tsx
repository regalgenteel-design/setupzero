import { trustBar } from "@/content/home";
import { Reveal } from "@/components/ui/Reveal";
import { StatTile } from "@/components/ui/StatTile";

export function TrustBar() {
  return (
    <section id="trust">
      <div className="grid gap-px bg-line lg:grid-cols-[1.1fr_2fr]">
        <div className="bg-paper p-6 md:p-10">
          <Reveal>
            <span className="tag">Why teams trust us</span>
            <p className="mt-6 font-display text-[26px] leading-[1.15] font-medium tracking-[-0.02em] text-ink md:text-[30px]">
              A results-driven technology partner
              <span className="highlight block">for brokers, prop firms and fintechs.</span>
            </p>
            <p className="mt-5 text-sm text-muted">{trustBar.line}</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line">
          {trustBar.stats.map((s, i) => (
            <div key={s.label} className="flex items-end bg-paper p-6 md:p-8">
              <Reveal delay={i * 0.06}>
                <StatTile value={s.value} label={s.label} size="sm" />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
