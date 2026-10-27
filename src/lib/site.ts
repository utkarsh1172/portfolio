import { z } from "zod";

/**
 * Public, build-time configuration. Validated once so a bad value fails the
 * build instead of shipping broken canonical URLs.
 */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default("https://portfolio-utkarsh1172.netlify.app"),
});

const parsed = publicEnvSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
});

if (!parsed.success) {
  throw new Error(`Invalid public environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const siteUrl = parsed.data.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export const siteDescription =
  "Utkarsh Kamble, full-stack engineer in Mumbai. Builds order automation CRMs, logistics platforms and e-commerce systems: Amazon SP-API, courier integrations, PostgreSQL, Next.js, Node.js and React Native.";
