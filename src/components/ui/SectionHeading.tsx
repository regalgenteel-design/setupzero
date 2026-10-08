import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
import { Highlighted } from "./Highlighted";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  highlight?: string;
  sub?: string;
  align?: "left" | "center";
  size?: "md" | "lg";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, heading, highlight, sub, align = "left", size = "md", className, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-start gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <Badge variant="bracket">{eyebrow}</Badge> : null}
      <Tag
        className={cn(
          "font-display font-medium text-ink",
          size === "lg" ? "text-[40px] leading-[1.02] md:text-[58px]" : "text-[32px] leading-[1.05] md:text-[44px]",
        )}
      >
        <Highlighted text={heading} highlight={highlight} />
      </Tag>
      {sub ? <p className="max-w-xl text-[15px] leading-relaxed text-muted md:text-base">{sub}</p> : null}
    </div>
  );
}
