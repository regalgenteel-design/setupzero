import { ArrowDown } from "lucide-react";
import { heroFloatingStats, heroTypewriter, homeHero } from "@/content/home";
import { Badge } from "@/components/ui/Badge";
import { CtaButton } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Typewriter } from "@/components/ui/Typewriter";
import { HeroScene } from "@/components/three/HeroScene";

export function Hero() {
  return (
    <section className="overflow-hidden">
      <div className="grid lg:min-h-[620px] lg:grid-cols-2">
        {/* Copy */}
        <div className="flex flex-col">
          <div className="px-6 pt-10 pb-7 md:px-10 md:pt-12">
            <Reveal>
              <Badge variant="bracket">{homeHero.eyebrow}</Badge>
            </Reveal>
          </div>
          <div className="band px-6 py-7 md:px-10">
            <Reveal delay={0.06}>
              <h1 className="font-display text-[40px] leading-[1.04] font-normal tracking-[-0.03em] text-ink sm:text-[48px] lg:text-[56px]">
                <span className="block">Launch Your Brokerage</span>
                <span className="highlight block min-h-[1.04em]">
                  <Typewriter phrases={heroTypewriter} />
                </span>
                <span className="block">Fully Set Up.</span>
              </h1>
            </Reveal>
          </div>
          <div className="flex flex-1 flex-col gap-8 px-6 py-8 md:px-10 md:py-10">
            <Reveal delay={0.14}>
              <p className="max-w-[30rem] text-base leading-relaxed text-muted md:text-[17px]">{homeHero.sub}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-3">
                {homeHero.ctas?.map((cta, i) => (
                  <CtaButton key={cta.label} cta={cta} icon={i === 0} size="md" />
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3} className="mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {homeHero.badges?.map((b) => (
                  <Badge key={b} variant="pill">
                    {b}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* 3D art */}
        <div className="relative flex min-h-[380px] flex-col border-t border-line lg:border-t-0 lg:border-l">
          <div className="relative flex-1">
            <HeroScene />
            <span className="bracket-muted pointer-events-none absolute top-4 left-4 hidden md:inline-flex">Drag to rotate</span>
            <a href="#trust" className="absolute top-3 right-3 hidden items-center gap-1.5 border border-line bg-paper px-2.5 py-1 font-mono text-[10.5px] tracking-wide text-muted uppercase transition-colors hover:text-ink md:inline-flex">
              Scroll <ArrowDown className="size-3" />
            </a>
          </div>
          <div className="grid grid-cols-2 border-t border-line">
            {heroFloatingStats.map((s, i) => (
              <div key={s.label} className={i === 0 ? "border-r border-line px-5 py-4 md:px-6" : "px-5 py-4 md:px-6"}>
                <div className="font-display text-2xl leading-none font-medium text-ink md:text-[28px]">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-1.5 font-mono text-[10.5px] tracking-wide text-muted uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
