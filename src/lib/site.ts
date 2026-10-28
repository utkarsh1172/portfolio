import { z } from "zod";

/**
 * Public, build-time configuration. Validated once so a bad value fails the
 * build instead of shipping broken canonical URLs.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("https://portfolio-utkarsh-kamble11.vercel.app"),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().trim().min(1).optional(),
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
});

if (!parsed.success) {
  throw new Error(`Invalid public environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const siteUrl = parsed.data.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
export const googleSiteVerification = parsed.data.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

/** Keep these concise and aligned with the visible H1 for stable search snippets. */
export const siteTitle = "Utkarsh Kamble | Senior Full-Stack Developer in Mumbai";

export const siteDescription =
  "Official portfolio of Utkarsh Kamble, a senior full-stack developer in Mumbai building logistics, CRM and e-commerce platforms with Next.js and Node.js.";

/** Natural search phrases for metadata consumers that still read keywords. */
export const siteKeywords = [
  "Utkarsh Kamble portfolio",
  "Utkarsh Kamble software engineer",
  "Utkarsh Kamble full-stack developer",
  "Utkarsh Kamble developer Mumbai",
  "senior software developer Mumbai",
  "full-stack developer Mumbai",
  "logistics software engineer",
  "e-commerce software developer",
  "CRM developer",
  "Next.js developer",
  "Node.js developer",
] as const;

/** Human-edited content date used by ProfilePage JSON-LD and the sitemap. */
export const siteLastModified = "2026-10-28";
