import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60svh] items-center overflow-hidden py-20">
      <div className="container-x relative text-center">
        <span className="tag">Page not found</span>
        <p className="mt-6 font-display text-8xl font-medium tracking-[-0.05em] text-ink md:text-9xl">4<span className="highlight">0</span>4</p>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">This page does not exist or has moved. Let&apos;s get you back to the technology.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" icon>
            Back home
          </Button>
          <Button href="/solutions" variant="outline">
            Explore Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
