import type { Metadata, Viewport } from "next";
// FONT EXPERIMENT — default was Geist. To revert: restore these two imports,
// drop the Funnel/JetBrains block below, put the Geist variables back on <html>,
// and swap the font tokens at the top of globals.css.
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import { Funnel_Display, Funnel_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import Cursor from "./components/Cursor";
import { site } from "./lib/site";

const display = Funnel_Display({ subsets: ["latin"], variable: "--font-display-face" });
const text = Funnel_Sans({ subsets: ["latin"], variable: "--font-text-face" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.title,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

/** Tells Google the brand name and which image is the logo. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/Logo/logo/aximest-app-icon.png`,
      email: "hello@aximest.com",
      description: site.description,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <SmoothScroll />
        <PageTransition />
        <Cursor />
        <Header />
        <main>
          {children}
          {/* Closes every route. It takes no theme of its own: whatever the
              page has latched by the time you reach it is what the statement
              renders on, so a dark page stays dark all the way down. */}
          <CtaSection />
        </main>
        <Footer />
      </body>
    </html>
  );
}
