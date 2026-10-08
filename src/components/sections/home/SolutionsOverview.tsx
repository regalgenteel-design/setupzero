import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { solutionsOverview } from "@/content/home";
import { solutions } from "@/content/solutions";
import { solutionImage } from "@/content/images";
import { Frame } from "@/components/ui/Frame";
import { ImageCard } from "@/components/ui/ImageCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SolutionsOverview() {
  return (
    <section>
      <div className="grid gap-8 border-b border-line px-6 py-12 md:px-10 md:py-16 lg:grid-cols-2 lg:items-end">
        <Reveal>
          <SectionHeading eyebrow={solutionsOverview.eyebrow} heading={solutionsOverview.heading} highlight={solutionsOverview.highlight} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-md text-[15px] leading-relaxed text-muted lg:ml-auto">{solutionsOverview.intro}</p>
        </Reveal>
      </div>
      <div className="grid gap-6 p-6 sm:grid-cols-2 md:p-10 lg:grid-cols-3">
        {solutions.map((s, i) => (
          <Reveal key={s.slug} delay={Math.min(i * 0.06, 0.36)}>
            <ImageCard title={s.nav.label} body={s.summary} href={`/solutions/${s.slug}`} image={solutionImage(s.slug)} index={i} />
          </Reveal>
        ))}
        <Reveal delay={0.36}>
          <Frame className="h-full">
            <Link href="/solutions" className="group flex h-full min-h-[220px] flex-col justify-between border border-dashed border-line-strong bg-band p-6 transition-colors hover:border-ink/50">
              <span className="font-mono text-[11px] tracking-[0.06em] text-muted uppercase">All solutions</span>
              <div>
                <p className="font-display text-xl leading-snug font-medium text-ink">
                  You don&apos;t need everything,
                  <span className="highlight block">just what works.</span>
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  View all solutions <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Frame>
        </Reveal>
      </div>
    </section>
  );
}
