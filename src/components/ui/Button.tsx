"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useDemo } from "@/components/forms/demo-context";
import type { ButtonVariant, Cta } from "@/content/schema";
import { Frame } from "./Frame";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-soft",
  outline: "border border-line-strong bg-raise text-ink hover:border-ink/60",
  ghost: "text-muted hover:text-ink",
  cream: "bg-ink text-paper hover:bg-soft",
};

const sizeClasses = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-10 px-4 text-[13.5px]",
  lg: "h-11 px-5 text-sm",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: keyof typeof sizeClasses;
  icon?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  (
    | { href: string; action?: never; onClick?: never; type?: never; disabled?: never }
    | { action: "demo"; href?: never; onClick?: never; type?: never; disabled?: never }
    | ({ href?: never; action?: never } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">)
  );

export function Button({ variant = "primary", size = "md", icon, className, children, ...rest }: ButtonProps) {
  const demo = useDemo();
  const classes = cn(
    "group/btn inline-flex items-center justify-center gap-2 rounded-[2px] font-medium whitespace-nowrap transition-colors duration-300 active:translate-y-px disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight className="size-3.5 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden />
      ) : null}
    </>
  );

  let el: ReactNode;
  if ("action" in rest && rest.action === "demo") {
    el = (
      <button type="button" className={classes} onClick={() => demo.open(String(children))}>
        {content}
      </button>
    );
  } else if ("href" in rest && typeof rest.href === "string") {
    el = (
      <Link href={rest.href} className={classes}>
        {content}
      </Link>
    );
  } else {
    const { type = "button", ...buttonProps } = rest as ComponentPropsWithoutRef<"button">;
    el = (
      <button type={type} className={classes} {...buttonProps}>
        {content}
      </button>
    );
  }

  // Outline buttons get the template's corner brackets.
  if (variant === "outline") {
    return (
      <Frame as="span" className={cn("inline-flex", className?.includes("w-full") && "w-full")}>
        {el}
      </Frame>
    );
  }
  return el;
}

/** Renders a content-driven CTA. */
export function CtaButton({
  cta,
  size = "lg",
  className,
  icon,
}: {
  cta: Cta;
  size?: keyof typeof sizeClasses;
  className?: string;
  icon?: boolean;
}) {
  const variant = cta.variant ?? "primary";
  if (cta.action === "demo") {
    return (
      <Button action="demo" variant={variant} size={size} className={className} icon={icon}>
        {cta.label}
      </Button>
    );
  }
  return (
    <Button href={cta.href ?? "/contact"} variant={variant} size={size} className={className} icon={icon}>
      {cta.label}
    </Button>
  );
}
