import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Sora, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { Effects } from "@/components/layout/Effects";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { themeInitScript } from "@/lib/theme";
import {
  googleSiteVerification,
  siteDescription,
  siteKeywords,
  siteLastModified,
  siteTitle,
  siteUrl,
} from "@/lib/site";
import "./globals.css";

// Google Fonts through next/font: downloaded at build time and served from this
// site, so visitors never call Google and the fallback is sized to avoid layout shift.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
// Section headings sit below the fold, so Sora isn't preloaded.
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s | ${profile.name}` },
  description: siteDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [...siteKeywords],
  category: "technology",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "profile",
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    title: siteTitle,
    description: siteDescription,
    locale: "en_IN",
    firstName: "Utkarsh",
    lastName: "Kamble",
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07070c",
};

const current = experience.find((r) => r.current);
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const profilePageId = `${siteUrl}/#profile`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: `${profile.name} Portfolio`,
      alternateName: [profile.name, "Utkarsh Kamble Portfolio"],
      description: siteDescription,
      inLanguage: "en-IN",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "en-IN",
      dateModified: siteLastModified,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      identifier: "utkarsh1172",
      name: profile.name,
      givenName: profile.firstName,
      familyName: "Kamble",
      alternateName: "utkarsh1172",
      jobTitle: profile.role,
      description: siteDescription,
      email: `mailto:${profile.email}`,
      telephone: profile.phone,
      image: {
        "@type": "ImageObject",
        url: `${siteUrl}${profile.photo.src}`,
        caption: profile.photo.alt,
      },
      url: siteUrl,
      mainEntityOfPage: { "@id": profilePageId },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
      alumniOf: [
        { "@type": "EducationalOrganization", name: "Newton School" },
        { "@type": "CollegeOrUniversity", name: "University of Mumbai" },
      ],
      knowsAbout: [
        "Logistics software",
        "E-commerce platforms",
        "Customer relationship management software",
        "Amazon Selling Partner API",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "React Native",
      ],
      sameAs: [profile.links.github, profile.links.linkedin].filter(Boolean),
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} ${sora.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Applies the saved theme (dark by default) before first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
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
