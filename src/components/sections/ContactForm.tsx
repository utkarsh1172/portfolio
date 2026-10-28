"use client";

import { LoaderCircle, Mail, Phone, Send } from "lucide-react";
import { useActionState, useState } from "react";
import { sendContactMessage } from "@/app/actions/contact";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { profile } from "@/data/profile";
import {
  buildMailto,
  contactSchema,
  deliveredContactSchema,
  fieldErrors,
  type ContactErrors,
  type ContactInput,
  type ContactState,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

const fieldClass =
  "mt-1.5 w-full rounded-card border border-line bg-bg-2 px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-accent focus:outline-none aria-[invalid=true]:border-accent";

const empty: ContactInput = { name: "", email: "", company: "", message: "" };

/**
 * With `delivery`, messages go through the server action (Resend). Without it,
 * the form opens the visitor's email app with the message filled in.
 */
export function ContactForm({ delivery }: { delivery: boolean }) {
  const [values, setValues] = useState<ContactInput>(empty);
  const [clientErrors, setClientErrors] = useState<ContactErrors>({});
  const [mailtoOpened, setMailtoOpened] = useState(false);
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContactMessage, { status: "idle" });

  const errors: ContactErrors = { ...(state.status === "invalid" ? state.errors : {}), ...clientErrors };
  const schema = delivery ? deliveredContactSchema : contactSchema;

  const update = (key: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (clientErrors[key]) setClientErrors((er) => ({ ...er, [key]: undefined }));
  };

  // Validate in the browser first; the server validates again with the same schema.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      e.preventDefault();
      setClientErrors(fieldErrors(parsed.error));
      return;
    }
    setClientErrors({});
    if (!delivery) {
      e.preventDefault();
      window.location.href = buildMailto(profile.email, parsed.data);
      setMailtoOpened(true);
    }
  };

  if (state.status === "sent") {
    return (
      <Card className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-6" role="status">
        <p className="heading text-[1.75rem]">Message sent.</p>
        <p className="mt-2 text-muted">Thanks for reaching out. I&rsquo;ll reply to the address you gave.</p>
      </Card>
    );
  }

  const describedBy = (key: keyof ContactInput) => (errors[key] ? `${key}-error` : undefined);

  return (
    <Card
      as="form"
      action={delivery ? formAction : undefined}
      onSubmit={onSubmit}
      noValidate
      className="p-6 sm:p-8 lg:col-span-6"
      aria-labelledby="contact-form-title"
    >
      <p id="contact-form-title" className="font-semi text-lg font-semibold">
        Write to me
      </p>
      <p className="text-sm text-muted">
        {delivery
          ? "Your message comes straight to my inbox."
          : "This opens your email app with the message filled in."}
      </p>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.name} id="name">
          <input
            id="name"
            name="name"
            className={fieldClass}
            value={values.name}
            onChange={update("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
          />
        </Field>
        <Field label="Company" error={errors.company} id="company">
          <input
            id="company"
            name="company"
            className={fieldClass}
            value={values.company}
            onChange={update("company")}
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
          />
        </Field>
      </div>
      {delivery && (
        <div className="mt-4">
          <Field label="Your email" error={errors.email} id="email">
            <input
              id="email"
              name="email"
              type="email"
              className={fieldClass}
              value={values.email}
              onChange={update("email")}
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={describedBy("email")}
            />
          </Field>
        </div>
      )}
      <div className="mt-4">
        <Field label="Message" error={errors.message} id="message">
          <textarea
            id="message"
            name="message"
            className={cn(fieldClass, "min-h-[8rem] resize-y")}
            value={values.message}
            onChange={update("message")}
            placeholder="The role, the team and what you’re shipping"
            required
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
          />
        </Field>
      </div>

      <div role="status" aria-live="polite" className="mt-3 min-h-5 text-sm">
        {state.status === "error" && <p className="text-accent">{state.message}</p>}
        {mailtoOpened && (
          <p className="text-muted">
            Your email app should open with the message ready. If it didn&rsquo;t, write to {profile.email}.
          </p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? (
            <LoaderCircle size={18} className="animate-spin" aria-hidden />
          ) : delivery ? (
            <Send size={18} aria-hidden />
          ) : (
            <Mail size={18} aria-hidden />
          )}
          {pending ? "Sending" : delivery ? "Send message" : "Open in email app"}
        </Button>
        <ButtonLink href={profile.phoneHref}>
          <Phone size={18} aria-hidden /> Call
        </ButtonLink>
      </div>
    </Card>
  );
}

function Field({
  label,
  error,
  id,
  children,
}: {
  label: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
