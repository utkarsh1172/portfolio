import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { getEmailConfig } from "@/lib/email-config";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  const delivery = getEmailConfig() !== null;

  return (
    <Section id="contact" className="pb-16">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="contact-heading" className="heading text-[clamp(2.25rem,5vw,3.75rem)]">
            Let&rsquo;s talk about the role.
          </h2>
          <p className="lede mt-6">{profile.seeking}</p>

          <ul className="mt-10 space-y-4">
            <li className="flex flex-wrap items-center gap-3">
              <Mail size={18} className="text-accent" aria-hidden />
              <a
                href={`mailto:${profile.email}`}
                className="font-semi text-lg font-semibold underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
              <CopyButton text={profile.email} />
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-accent" aria-hidden />
              <a
                href={profile.phoneHref}
                className="font-semi text-lg font-semibold tabular-nums underline-offset-4 hover:underline"
              >
                {profile.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-accent" aria-hidden />
              <span className="font-semi text-lg font-semibold">{profile.location}</span>
            </li>
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            {profile.links.linkedin && (
              <ButtonLink href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" variant="primary">
                Connect on LinkedIn <ArrowUpRight size={18} className="nudge-r" aria-hidden />
              </ButtonLink>
            )}
            {profile.links.github && (
              <ButtonLink href={profile.links.github} target="_blank" rel="noopener noreferrer">
                View GitHub <ArrowUpRight size={18} className="nudge-r" aria-hidden />
              </ButtonLink>
            )}
            <ButtonLink href={profile.resume.path} download={profile.resume.fileName} variant="quiet">
              <Download size={18} aria-hidden /> Resume (PDF)
            </ButtonLink>
          </div>
        </div>

        <ContactForm delivery={delivery} />
      </div>
    </Section>
  );
}
