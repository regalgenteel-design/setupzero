import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductPage } from "@/content/schema";
import { products } from "@/content/products";
import { getIcon } from "@/lib/icons";
import { PageHero } from "@/components/sections/shared/PageHero";
import { BulletList } from "@/components/sections/shared/BulletList";
import { CTABand } from "@/components/sections/shared/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductTemplate({ page }: { page: ProductPage }) {
  const related = products.filter((p) => p.slug !== page.slug).slice(0, 4);
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        headline={page.hero.headline}
        highlight={page.hero.highlight}
        sub={page.hero.sub}
        ctas={page.hero.ctas}
        badges={page.hero.badges}
      />
      <BulletList eyebrow="Features" heading="What's included" highlight="included" sub={page.summary} bullets={page.bullets} />
      <section>
        <div>
          <div className="border-b border-line px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading eyebrow="Works with" heading="Part of one connected stack" highlight="connected stack" />
          </Reveal>
          </div>
          <Reveal>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => {
              const Icon = getIcon(p.nav.icon);
              return (
                <div key={p.slug} className="bg-paper">
                  <Link href={`/products/${p.slug}`} className="group flex h-full min-h-[170px] flex-col justify-between gap-6 bg-paper p-6 transition-colors hover:bg-card">
                    <div className="flex items-center justify-between">
                      <Icon className="size-5 text-soft" />
                      <ArrowUpRight className="size-4 text-dim transition-colors group-hover:text-ink" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{p.nav.label}</h3>
                      <p className="mt-1.5 text-sm text-muted">{p.nav.blurb}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          </Reveal>
        </div>
      </section>
      <CTABand block={page.cta} />
    </>
  );
}
