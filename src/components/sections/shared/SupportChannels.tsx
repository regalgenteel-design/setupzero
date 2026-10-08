import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";

type Channel = { label: string; icon: string; note?: string };

export function SupportChannels({ heading, channels }: { heading: string; channels: Channel[] }) {
  return (
    <section>
      <Reveal>
        <div className="flex flex-col gap-5 px-6 py-7 md:flex-row md:items-center md:justify-between md:px-10">
          <span className="tag">{heading}</span>
          <ul className="flex flex-wrap gap-1.5">
            {channels.map((c) => {
              const Icon = getIcon(c.icon);
              return (
                <li key={c.label} className="inline-flex items-center gap-2 border border-line bg-raise px-3 py-1.5 text-[13px] text-ink">
                  <Icon className="size-3.5 text-soft" />
                  {c.label}
                  {c.note ? <span className="text-xs text-muted">({c.note})</span> : null}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
