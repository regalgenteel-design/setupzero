import { cn } from "@/lib/cn";

/** Pure-CSS stand-in for the 3D hero: a glossy ink ring. Adapts to the theme. */
export function HeroFallback({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex size-full items-center justify-center", className)} aria-hidden>
      <div
        className="relative aspect-square w-[58%] max-w-[420px] rounded-full animate-float"
        style={{
          background: "radial-gradient(circle at 32% 26%, #4a4a4a 0%, #161616 34%, #070707 66%)",
          boxShadow: "inset 10px -14px 40px rgb(255 255 255 / 0.10), inset -18px 18px 50px rgb(0 0 0 / 0.8), var(--sz-shadow)",
        }}
      >
        <div
          className="absolute inset-[27%] rounded-full"
          style={{ background: "var(--sz-paper)", boxShadow: "inset 0 10px 30px rgb(0 0 0 / 0.55)" }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 210deg, transparent 0deg, rgb(255 255 255 / 0.35) 30deg, transparent 80deg, transparent 260deg, rgb(255 255 255 / 0.18) 300deg, transparent 340deg)",
            mixBlendMode: "screen",
            filter: "blur(4px)",
          }}
        />
      </div>
    </div>
  );
}
