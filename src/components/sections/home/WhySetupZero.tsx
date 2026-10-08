import { whySetupZero } from "@/content/home";
import { images } from "@/content/images";
import { getIcon } from "@/lib/icons";
import { Frame } from "@/components/ui/Frame";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhySetupZero() {
  return (
    <section>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.5fr]">
        <div className="bg-paper px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading eyebrow={whySetupZero.eyebrow} heading={whySetupZero.heading} highlight={whySetupZero.highlight} />
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
                We combine the right modules to solve your specific goals. From strategy to execution, everything we do is focused on speed to launch, uptime and revenue.
              </p>
              <Frame className="group mt-8 max-w-sm">
                <Picture image={images.why} className="aspect-[4/3] border border-line" />
              </Frame>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div className="grid h-full gap-px bg-line sm:grid-cols-2">
            {whySetupZero.items.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={item.title} className="flex flex-col gap-8 bg-paper p-6 transition-colors hover:bg-card md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center border border-line bg-raise text-soft">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-mono text-[10.5px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
