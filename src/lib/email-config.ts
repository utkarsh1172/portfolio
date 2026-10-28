import { z } from "zod";

/** Server-only email settings. Read on the server; never import from a client component. */
const emailEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_FROM_EMAIL: z.string().min(3),
  CONTACT_TO_EMAIL: z.email().optional(),
});

export type EmailConfig = z.infer<typeof emailEnvSchema>;

/** Returns the config when email delivery is fully configured, otherwise null (form falls back to mailto). */
export function getEmailConfig(): EmailConfig | null {
  const parsed = emailEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || undefined,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || undefined,
  });
  return parsed.success ? parsed.data : null;
}
