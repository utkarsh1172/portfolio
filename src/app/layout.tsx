import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Sora, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Effects } from "@/components/layout/Effects";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { themeInitScript } from "@/lib/theme";
import { siteDescription, siteUrl } from "@/lib/site";
import "./globals.css";

// Google Fonts through next/font: downloaded at build time and served from this
// site, so visitors never call Google and the fallback is sized to avoid layout shift.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
// Section headings sit below the fold, so Sora isn't preloaded.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", preload: false });

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
  themeColor: "#0b0b0f",
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
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} ${sora.variable}`}
      data-theme="dark"
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
          href="#about"
          className="sr-only z-[80] rounded-lg bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
        <Effects />
      </body>
    </html>
  );
}
