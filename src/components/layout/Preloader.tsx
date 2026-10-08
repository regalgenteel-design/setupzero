"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";

type Phase = "show" | "fade" | "gone";

/** Short brand splash on the first visit of a session. Timers + CSS only. */
export function Preloader() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("sz-preloader") === "1";
    } catch {}
    const skip = reduce || seen;
    const fadeTimer = window.setTimeout(() => setPhase("fade"), skip ? 0 : 1000);
    const goneTimer = window.setTimeout(
      () => {
        setPhase("gone");
        try {
          sessionStorage.setItem("sz-preloader", "1");
        } catch {}
      },
      skip ? 50 : 1600,
    );
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(goneTimer);
    };
  }, [reduce]);

  if (phase === "gone") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-page transition-opacity duration-500 ease-in-out",
        phase === "fade" && "pointer-events-none opacity-0",
      )}
      style={{ backgroundImage: "repeating-linear-gradient(135deg, var(--sz-hatch) 0 1px, transparent 1px 10px)" }}
      aria-hidden
    >
      <div className="frame border border-line bg-paper px-10 py-8">
        <span className="frame-c frame-tl" />
        <span className="frame-c frame-tr" />
        <span className="frame-c frame-bl" />
        <span className="frame-c frame-br" />
        <div className="text-ink">
          <Logo className="h-7 md:h-8" />
        </div>
        <p className="mt-4 text-center font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase">{site.tagline}</p>
      </div>
    </div>
  );
}
