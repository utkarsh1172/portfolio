// zod/mini: same validation as zod, tree-shakable, so the shared schema adds
// only a few KB to the browser bundle. Server-only schemas use regular zod.
import * as z from "zod/mini";

/** Shared by the contact form (client) and the send action (server). */
export const contactSchema = z.object({
  name: z.string().check(z.trim(), z.maxLength(100, "Keep your name under 100 characters.")),
  email: z.union([z.literal(""), z.email("Enter a valid email address so I can reply.")]),
  company: z.string().check(z.trim(), z.maxLength(120, "Keep the company name under 120 characters.")),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Add a short message so I know what the role is about."),
      z.maxLength(4000, "Keep the message under 4,000 characters."),
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function fieldErrors(error: z.core.$ZodError): ContactErrors {
  const out: ContactErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export function contactSubject(input: Pick<ContactInput, "name" | "company">): string {
  if (input.company) return `Opportunity at ${input.company}`;
  return `Hello from ${input.name || "a recruiter"}`;
}

/** Builds a mailto: link with the message pre-filled, used when server email delivery isn't configured. */
export function buildMailto(to: string, input: ContactInput): string {
  const signature = [input.name, input.company, input.email].filter(Boolean).join("\n");
  const body = [input.message, signature].filter(Boolean).join("\n\n");
  return `mailto:${to}?subject=${encodeURIComponent(contactSubject(input))}&body=${encodeURIComponent(body)}`;
}

/** When the message is delivered by the server, a reply address is required. */
export const deliveredContactSchema = z.extend(contactSchema, {
  email: z.email("Enter your email so I can reply."),
});

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: ContactErrors }
  | { status: "error"; message: string };
