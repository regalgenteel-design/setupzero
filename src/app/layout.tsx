import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { themeInitScript } from "@/lib/hooks/useTheme";
import { DemoProvider } from "@/components/forms/demo-context";
import { DemoModal } from "@/components/forms/DemoModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap", style: ["normal", "italic"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Brokerage Technology Partner`,
    template: `%s | ${site.name}`,
  },
  description: site.positioning,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
    { media: "(prefers-color-scheme: light)", color: "#efefef" },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/brand/setupzero-wordmark-white.svg`,
  description: site.description,
  slogan: site.tagline,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${manrope.variable} ${newsreader.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <DemoProvider>
          <Preloader />
          <Header />
          <div className="flex flex-1 flex-col px-[clamp(10px,2.4vw,28px)] pt-[92px] pb-7">
            <main className="page-stack flex-1">{children}</main>
            <Footer />
          </div>
          <DemoModal />
        </DemoProvider>
      </body>
    </html>
  );
}
