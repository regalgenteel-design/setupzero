"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Splits "99.9%" into prefix/number/suffix and counts the number up when scrolled into view. */
function parse(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
  return { prefix: m[1], target: parseFloat(raw), decimals, suffix: m[3] };
}

export function CountUp({ value, durationMs = 1400 }: { value: string; durationMs?: number }) {
  const parsed = parse(value);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(`${parsed.prefix}${(parsed.target * eased).toFixed(parsed.decimals)}${parsed.suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      setDisplay(`${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`);
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
