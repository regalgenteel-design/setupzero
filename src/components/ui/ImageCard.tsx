import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/content/images";
import { Frame } from "./Frame";
import { Picture } from "./Picture";

type ImageCardProps = {
  title: string;
  body?: string;
  href: string;
  image: SiteImage;
  eyebrow?: string;
  index?: number;
  className?: string;
  aspect?: string;
};

/** Monochrome photo card with corner brackets, title and arrow. */
export function ImageCard({ title, body, href, image, eyebrow, index, className, aspect = "aspect-[16/10]" }: ImageCardProps) {
  return (
    <Frame className={cn("h-full", className)}>
      <Link href={href} className="group flex h-full flex-col border border-line bg-card transition-colors duration-300 hover:border-line-strong">
        <div className={cn("relative border-b border-line", aspect)}>
          <Picture image={image} className="absolute inset-0" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          {eyebrow ? <span className="tag absolute top-3 left-3">{eyebrow}</span> : null}
          {typeof index === "number" ? (
            <span className="absolute top-3 right-3 border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 items-start justify-between gap-4 p-5">
          <div>
            <h3 className="font-display text-[17px] font-semibold leading-snug text-ink">{title}</h3>
            {body ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p> : null}
          </div>
          <span className="flex size-8 shrink-0 items-center justify-center border border-line text-muted transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </Link>
    </Frame>
  );
}
