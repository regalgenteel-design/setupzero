"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ArticleMeta } from "@/content/schema";
import { blogImage } from "@/content/images";
import { Picture } from "@/components/ui/Picture";

export function BlogGrid({ articles, categories }: { articles: ArticleMeta[]; categories: readonly string[] }) {
  const [active, setActive] = useState<string>("All");
  const list = active === "All" ? articles : articles.filter((a) => a.category === active);
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={cn(
              "border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
              active === c ? "border-ink bg-ink text-paper" : "border-line bg-raise text-muted hover:border-line-strong hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a, i) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="group relative flex flex-col overflow-hidden border border-line bg-card transition-colors duration-300 hover:border-line-strong"
          >
            <div className="relative aspect-[16/10] border-b border-line">
              <Picture image={blogImage(a.slug)} className="absolute inset-0" rounded="rounded-none" sizes="(max-width: 640px) 100vw, 33vw" />
              <span className="tag absolute top-3 left-3">{a.category}</span>
              <span className="absolute top-3 right-3 border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="relative p-6">
              <h3 className="font-display text-lg font-semibold leading-snug text-ink">{a.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{a.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-dim">
                <span>
                  {new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {a.readingTime}
                </span>
                <ArrowUpRight className="size-4 text-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {list.length === 0 ? <p className="mt-10 text-sm text-muted">No articles in this category yet.</p> : null}
    </div>
  );
}
