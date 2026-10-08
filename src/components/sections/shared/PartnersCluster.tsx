import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

const partners = ["Liquidity providers", "Payment gateways", "KYC providers", "Hosting", "Data feeds", "Legal partners"];

/** "5 years" statement next to a grid of the provider types we work with. */
export function PartnersCluster({ years, className }: { years: string; className?: string }) {
  return (
    <section className={cn("overflow-hidden", className)}>
      <div className="grid gap-px bg-line lg:grid-cols-2">
        <div className="bg-paper px-6 py-12 md:px-10 md:py-16">
          <Reveal>
            <span className="tag">Experience</span>
            <h2 className="mt-6 font-display text-[64px] leading-[0.95] font-medium tracking-[-0.04em] text-ink md:text-[96px]">
              {years} <span className="highlight">years</span>
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              of building, hosting and supporting brokerage technology alongside the industry&apos;s providers.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="grid h-full grid-cols-2 gap-px bg-line sm:grid-cols-3">
            {partners.map((p, i) => (
              <div key={p} className="flex min-h-[120px] flex-col justify-between bg-paper p-5 transition-colors hover:bg-card">
                <span className="font-mono text-[10.5px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[15px] font-semibold text-ink">{p}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
