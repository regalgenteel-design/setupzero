import { finalCta } from "@/content/home";
import { Hero } from "@/components/sections/home/Hero";
import { TrustBar } from "@/components/sections/home/TrustBar";
import { SolutionsOverview } from "@/components/sections/home/SolutionsOverview";
import { ProductsGrid } from "@/components/sections/home/ProductsGrid";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { WhySetupZero } from "@/components/sections/home/WhySetupZero";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CTABand } from "@/components/sections/shared/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <SolutionsOverview />
      <ProductsGrid />
      <HowItWorks />
      <WhySetupZero />
      <Testimonials />
      <CTABand block={finalCta} />
    </>
  );
}
