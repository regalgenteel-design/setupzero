import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { productsSection } from "@/content/home";
import { images } from "@/content/images";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductsGrid() {
  return (
    <section>
      <div className="grid gap-px border-b border-line bg-line lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-8 bg-paper px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading eyebrow={productsSection.eyebrow} heading={productsSection.heading} highlight={productsSection.highlight} />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Every module is available standalone and integrates with your existing systems, or take the full stack under one contract.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={productsSection.button.href} variant="outline" icon>
              {productsSection.button.label}
            </Button>
          </Reveal>
        </div>
        <div className="bg-paper p-6 md:p-10">
          <Reveal delay={0.1} className="h-full">
            <Frame className="group h-full">
              <Picture image={images.productsFeature} className="h-full min-h-[260px] border border-line" />
            </Frame>
          </Reveal>
        </div>
      </div>
      <Reveal>
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {productsSection.items.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <Link key={p.href} href={p.href} className="group flex min-h-[210px] flex-col justify-between bg-paper p-6 transition-colors hover:bg-card">
                <div className="flex items-start justify-between">
                  <span className="flex size-9 items-center justify-center border border-line bg-raise text-soft transition-colors group-hover:border-ink/50 group-hover:text-ink">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10.5px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                    <ArrowUpRight className="size-3.5 text-ink opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
