"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "newsletter" }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-ink" role="status">
        <Check className="size-4" /> You are subscribed. Watch your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-lg items-stretch border border-line bg-raise focus-within:border-ink/60">
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        aria-label="Subscribe"
        className="flex items-center gap-2 bg-ink px-4 text-[13px] font-medium text-paper transition-colors hover:bg-soft"
      >
        {status === "submitting" ? <Loader2 className="size-4 animate-spin" /> : <>Subscribe <ArrowRight className="size-3.5" /></>}
      </button>
      {status === "error" ? <span className="sr-only">Subscription failed</span> : null}
    </form>
  );
}
