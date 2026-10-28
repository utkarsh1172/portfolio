"use server";

import { profile } from "@/data/profile";
import { contactSubject, deliveredContactSchema, fieldErrors, type ContactState } from "@/lib/contact";
import { getEmailConfig } from "@/lib/email-config";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Validates a contact message and delivers it through Resend.
 * Only reachable when email delivery is configured (see .env.example).
 */
export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (formData.get("website")) return { status: "sent" };

  const config = getEmailConfig();
  if (!config) {
    return { status: "error", message: `Email delivery isn't set up. Please write to ${profile.email} directly.` };
  }

  const parsed = deliveredContactSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    message: formData.get("message") ?? "",
  });
  if (!parsed.success) return { status: "invalid", errors: fieldErrors(parsed.error) };

  const input = parsed.data;
  const lines = [input.message, "", `From: ${input.name || "(no name)"} <${input.email}>`];
  if (input.company) lines.push(`Company: ${input.company}`);
  const text = lines.join("\n");

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: config.CONTACT_FROM_EMAIL,
        to: [config.CONTACT_TO_EMAIL ?? profile.email],
        reply_to: input.email,
        subject: `[Portfolio] ${contactSubject(input)}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Contact delivery failed", res.status, await res.text().catch(() => ""));
      return { status: "error", message: `The message couldn't be sent. Please write to ${profile.email} directly.` };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("Contact delivery error", error);
    return { status: "error", message: `The message couldn't be sent. Please write to ${profile.email} directly.` };
  }
}
