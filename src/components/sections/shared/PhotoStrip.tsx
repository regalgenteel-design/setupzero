import type { SiteImage } from "@/content/images";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/ui/Reveal";

/** Full-width photo with a caption, used under inner-page heroes. */
export function PhotoStrip({ image, title, body }: { image: SiteImage; title: string; body: string }) {
  return (
    <section className="overflow-hidden">
      <Reveal>
        <div className="group relative">
          <Picture image={image} className="aspect-[16/10] md:aspect-[21/8]" sizes="100vw" fade="bottom" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <span className="tag">In practice</span>
            <h2 className="mt-4 font-display text-2xl font-medium text-ink md:text-4xl">{title}</h2>
            <p className="mt-2 max-w-xl text-sm text-soft md:text-base">{body}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
