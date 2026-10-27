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

const title = `${profile.name}, Full-Stack Engineer for Logistics and E-commerce`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description: siteDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Utkarsh Kamble",
    "full-stack developer Mumbai",
    "logistics software engineer",
    "e-commerce developer",
    "CRM developer",
    "Amazon SP-API",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "React Native",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: siteDescription,
    locale: "en_IN",
    firstName: "Utkarsh",
    lastName: "Kamble",
  },
  twitter: { card: "summary_large_image", title, description: siteDescription },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1626" },
    { media: "(prefers-color-scheme: light)", color: "#ecf1f6" },
  ],
};

const current = experience.find((r) => r.current);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: siteDescription,
  email: `mailto:${profile.email}`,
  image: `${siteUrl}${profile.photo.src}`,
  url: siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
  worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Newton School" },
    { "@type": "CollegeOrUniversity", name: "University of Mumbai" },
  ],
  knowsAbout: [
    "Logistics software",
    "E-commerce",
    "CRM",
    "Amazon SP-API",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "React Native",
  ],
  sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${barlowSemi.variable} ${barlow.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies a saved theme before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a
          href="#about"
          className="sr-only z-[80] rounded-lg bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
