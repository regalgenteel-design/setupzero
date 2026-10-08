import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";

type TextBlockProps = {
  heading: string;
  paragraphs: string[];
  eyebrow?: string;
  dropcap?: boolean;
  aside?: React.ReactNode;
  className?: string;
};

/** Heading on the left, prose on the right. */
export function TextBlock({ heading, paragraphs, eyebrow, dropcap = true, aside, className }: TextBlockProps) {
  return (
    <section className={className}>
      <div className={cn("grid gap-px bg-line", aside ? "lg:grid-cols-[0.8fr_1.4fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.6fr]")}>
        <div className="bg-paper px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            {eyebrow ? <Badge variant="bracket">{eyebrow}</Badge> : null}
            <h2 className="mt-5 font-display text-[32px] leading-[1.05] font-medium tracking-[-0.025em] text-ink md:text-[40px]">{heading}</h2>
          </Reveal>
        </div>
        <div className="bg-paper px-6 py-12 md:px-10 md:py-16">
          <Reveal delay={0.08}>
            <div className="space-y-5 text-[17px] leading-relaxed text-soft md:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i} className={cn(i === 0 && dropcap && "dropcap")}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
        {aside ? (
          <div className="bg-paper p-6 md:p-8">
            <Reveal delay={0.16}>{aside}</Reveal>
          </div>
        ) : null}
      </div>
    </section>
  );
}
