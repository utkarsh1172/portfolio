import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { themeInitScript } from "@/lib/theme";
import { siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";

// Barlow superfamily, self-hosted (SIL Open Font License): condensed for display,
// semi-condensed for UI labels, regular for body text.
const barlowCondensed = localFont({
  src: [
    { path: "../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});
const barlowSemi = localFont({
  src: [
    { path: "../fonts/barlow-semi-condensed-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/barlow-semi-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/barlow-semi-condensed-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-barlow-semi",
  display: "swap",
  fallback: ["Arial Narrow", "sans-serif"],
});
const barlow = localFont({
  src: [
    { path: "../fonts/barlow-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/barlow-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/barlow-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-barlow",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const title = `${profile.name}, ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description: siteDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Abhay Maske",
    "product designer",
    "UI/UX designer",
    "B2B SaaS design",
    "CRM design",
    "logistics UX",
    "design systems",
    "Figma variables",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: siteDescription,
    locale: "en_IN",
    firstName: "Abhay",
    lastName: "Maske",
  },
  twitter: { card: "summary_large_image", title, description: siteDescription },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0b0f",
};

const current = experience.find((r) => r.current);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Product Designer",
  description: siteDescription,
  url: siteUrl,
  worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Kirti M. Doongursee College" },
  hasCredential: { "@type": "EducationalOccupationalCredential", name: "Google UX Design Professional Certificate" },
  knowsAbout: ["Product design", "UI/UX design", "Design systems", "Figma variables", "CRM", "Logistics", "B2B SaaS"],
  sameAs: [profile.links.linkedin],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlowSemi.variable} ${barlow.variable}`}
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Applies the saved theme (dark by default) before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[80] rounded-lg bg-accent px-4 py-2 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
