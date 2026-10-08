import Link from "next/link";
import { site } from "@/content/site";
import { footerColumns, legalLinks } from "@/content/nav";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="grid gap-px bg-line lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="bg-paper p-6 md:p-8">
          <Link href="/" className="inline-flex text-ink" aria-label="SetupZero home">
            <Logo className="h-6" />
          </Link>
          <p className="mt-5 font-display text-lg font-medium leading-snug text-ink">
            The technology behind
            <span className="highlight block">tomorrow&apos;s brokers.</span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
          <div className="mt-6 flex items-center gap-1.5">
            {site.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="flex size-9 items-center justify-center border border-line bg-raise text-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <SocialIcon name={s.icon} width={14} height={14} />
              </a>
            ))}
          </div>
        </div>
        {footerColumns.map((col) => (
          <div key={col.heading} className="bg-paper p-6 md:p-8">
            <span className="font-mono text-[11px] tracking-[0.06em] text-muted uppercase">{col.heading}</span>
            <ul className="mt-5 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-soft transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid gap-6 border-t border-line p-6 md:p-8 lg:grid-cols-[1.4fr_2fr] lg:items-center">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Get brokerage technology insights in your inbox.</h3>
          <p className="mt-1 text-sm text-muted">One email a month. No spam.</p>
        </div>
        <NewsletterForm />
      </div>

      <div className="border-t border-line p-6 md:p-8">
        <p className="max-w-4xl text-xs leading-relaxed text-faint">{site.disclaimer}</p>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] text-faint">
            © {site.copyrightYear} {site.name} ({site.legalName}). All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-muted transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
