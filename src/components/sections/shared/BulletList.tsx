import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type BulletListProps = {
  eyebrow?: string;
  heading?: string;
  highlight?: string;
  sub?: string;
  bullets: string[];
  className?: string;
};

export function BulletList({ eyebrow, heading, highlight, sub, bullets, className }: BulletListProps) {
  return (
    <section className={className}>
      <div className="grid gap-px bg-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-paper px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <SectionHeading eyebrow={eyebrow} heading={heading ?? "Key features"} highlight={highlight} sub={sub} />
          </Reveal>
        </div>
        <ul className="grid content-start gap-px bg-line">
          {bullets.map((b, i) => (
            <li key={b} className="flex items-start gap-4 bg-paper px-6 py-5 text-[15px] leading-relaxed text-ink md:px-8">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-line bg-raise text-soft">
                <Check className="size-3" />
              </span>
              <span className="flex-1">{b}</span>
              <span className="font-mono text-[10.5px] text-faint">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
