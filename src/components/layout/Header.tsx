"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { getIcon } from "@/lib/icons";
import { mainNav, type NavGroup } from "@/content/nav";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function isActive(pathname: string, group: NavGroup) {
  if (group.href && (pathname === group.href || pathname.startsWith(`${group.href}/`))) return true;
  return group.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`));
}

export function Header() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close menus when the route changes.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const activeGroup = mainNav.find((g) => isActive(pathname, g))?.label ?? null;
  const markerKey = hovered ?? activeGroup;
  const open = openGroup ? mainNav.find((g) => g.label === openGroup) : null;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-[clamp(10px,2.4vw,28px)]">
      <div
        className="shell relative"
        onMouseLeave={() => {
          setOpenGroup(null);
          setHovered(null);
        }}
      >
        <Frame hover={false}>
          <div className="flex h-[58px] items-center justify-between gap-4 border border-line bg-paper/[0.86] pr-3 pl-4 backdrop-blur-xl md:pl-5">
            <Link href="/" className="flex items-center text-ink" aria-label="SetupZero home">
              <Logo className="h-[18px] md:h-5" />
            </Link>

            <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
              {mainNav.map((group) => {
                const hasMenu = group.links.length > 0;
                const classes = cn(
                  "relative inline-flex h-[58px] items-center gap-1 px-3.5 text-[13.5px] font-medium transition-colors",
                  activeGroup === group.label || openGroup === group.label ? "text-ink" : "text-muted hover:text-ink",
                );
                const inner = (
                  <>
                    {group.label}
                    {hasMenu ? <ChevronDown className={cn("size-3.5 transition-transform duration-300", openGroup === group.label && "rotate-180")} /> : null}
                    {markerKey === group.label ? (
                      <motion.span layoutId="nav-marker" className="absolute inset-x-3.5 -bottom-px h-px bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
                    ) : null}
                  </>
                );
                return (
                  <div
                    key={group.label}
                    onMouseEnter={() => {
                      setHovered(group.label);
                      setOpenGroup(hasMenu ? group.label : null);
                    }}
                    onFocus={() => hasMenu && setOpenGroup(group.label)}
                  >
                    {group.href ? (
                      <Link href={group.href} className={classes} aria-current={activeGroup === group.label ? "page" : undefined}>
                        {inner}
                      </Link>
                    ) : (
                      <button type="button" className={classes} aria-haspopup="true" aria-expanded={openGroup === group.label} onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}>
                        {inner}
                      </button>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden sm:block">
                <Button action="demo" variant="outline" size="sm">
                  Book a Free Demo
                </Button>
              </div>
              <button
                type="button"
                className="flex size-9 items-center justify-center border border-line bg-raise text-ink lg:hidden"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
        </Frame>

        {/* Mega menu */}
        <AnimatePresence>
          {open && open.links.length > 0 ? (
            <motion.div
              key={open.label}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-x-0 top-full hidden pt-2 lg:block"
            >
              <div className="grid gap-px border border-line bg-line shadow-card lg:grid-cols-[1fr_280px]">
                <div className={cn("grid gap-px bg-line", open.links.length > 6 ? "grid-cols-3" : "grid-cols-2")}>
                  {open.links.map((link) => {
                    const Icon = getIcon(link.icon);
                    return (
                      <Link key={link.href} href={link.href} className="group flex items-start gap-3 bg-paper p-4 transition-colors hover:bg-card">
                        <span className="flex size-8 shrink-0 items-center justify-center border border-line bg-raise text-soft transition-colors group-hover:border-ink/50 group-hover:text-ink">
                          <Icon className="size-4" />
                        </span>
                        <span>
                          <span className="block text-[13.5px] font-semibold text-ink">{link.label}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-muted">{link.blurb}</span>
                        </span>
                      </Link>
                    );
                  })}
                  {open.links.length % (open.links.length > 6 ? 3 : 2) !== 0 ? <div className="bg-paper" /> : null}
                </div>
                <div className="flex flex-col justify-between bg-band p-5">
                  <div>
                    <span className="tag">{open.label}</span>
                    <p className="mt-4 font-display text-xl font-medium leading-tight text-ink">
                      {open.label === "Solutions" ? (
                        <>
                          One partner.
                          <span className="highlight block">Every brokerage model.</span>
                        </>
                      ) : open.label === "Products" ? (
                        <>
                          Everything you need
                          <span className="highlight block">to run a brokerage.</span>
                        </>
                      ) : (
                        <>
                          The technology behind
                          <span className="highlight block">tomorrow&apos;s brokers.</span>
                        </>
                      )}
                    </p>
                  </div>
                  <Link href={open.href ?? "/about"} className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:text-soft">
                    {open.href ? `View all ${open.label.toLowerCase()}` : "About SetupZero"}
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[78px] bottom-0 z-40 overflow-y-auto px-[clamp(10px,2.4vw,28px)] pb-6 lg:hidden"
          >
            <div className="border border-line bg-paper px-5 py-4 shadow-card">
              {mainNav.map((group) => (
                <MobileGroup key={group.label} group={group} pathname={pathname} />
              ))}
              <div className="mt-5 flex flex-col gap-2">
                <Button action="demo" size="lg" className="w-full">
                  Book a Free Demo
                </Button>
                <Button href="/contact" variant="outline" size="lg" className="w-full">
                  Talk to Sales
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MobileGroup({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(isActive(pathname, group));
  if (group.links.length === 0 && group.href) {
    return (
      <Link href={group.href} className="flex items-center justify-between border-b border-line py-3.5 font-display text-lg font-medium text-ink">
        {group.label}
        <ArrowUpRight className="size-4 text-muted" />
      </Link>
    );
  }
  return (
    <div className="border-b border-line">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center justify-between py-3.5 font-display text-lg font-medium text-ink">
        {group.label}
        <ChevronDown className={cn("size-4 text-muted transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="grid gap-0.5 pb-3">
          {group.href ? (
            <Link href={group.href} className="px-2 py-2 text-sm font-medium text-ink">
              View all {group.label.toLowerCase()}
            </Link>
          ) : null}
          {group.links.map((link) => {
            const Icon = getIcon(link.icon);
            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 px-2 py-2 text-sm text-muted hover:bg-card hover:text-ink">
                <Icon className="size-4 text-soft" />
                {link.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
