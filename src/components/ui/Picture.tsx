import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SiteImage } from "@/content/images";

type PictureProps = {
  image: SiteImage;
  className?: string;
  /** Kept for compatibility. Every photo renders in monochrome to match the theme. */
  tone?: "warm" | "none";
  fade?: "bottom" | "top" | "none";
  sizes?: string;
  priority?: boolean;
  rounded?: string;
};

/** Monochrome photo: greyscale with a light contrast lift, so it sits in both themes. */
export function Picture({ image, className, fade = "none", sizes = "(max-width: 768px) 100vw, 50vw", priority, rounded = "" }: PictureProps) {
  return (
    <div className={cn("relative overflow-hidden bg-card", rounded, className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover grayscale contrast-[1.08] brightness-[0.92] transition-[transform,filter] duration-[1200ms] ease-out-expo group-hover:scale-[1.03] group-hover:brightness-100"
      />
      {fade === "bottom" ? <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper via-paper/40 to-transparent" aria-hidden /> : null}
      {fade === "top" ? <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper via-paper/40 to-transparent" aria-hidden /> : null}
    </div>
  );
}
