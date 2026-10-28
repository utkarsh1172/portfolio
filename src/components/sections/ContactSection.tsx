import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Section } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { isConfirmed } from "@/lib/placeholders";

export function ContactSection() {
  const email = isConfirmed(profile.email) ? profile.email : null;
  const location = isConfirmed(profile.location) ? profile.location : null;

  return (
    <Section id="contact" className="pb-24">
      <div className="glass sheen relative overflow-hidden rounded-4xl px-6 py-12 sm:px-12 sm:py-16" data-reveal>
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading" className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,4.5rem)]">
          Let&rsquo;s talk about <span className="serif-accent">your product.</span>
        </h2>
        <p className="lede mt-6">{profile.seeking}</p>

        {(email || location) && (
          <ul className="mt-8 space-y-3">
            {email && (
              <li className="flex flex-wrap items-center gap-3">
                <Mail size={18} className="text-accent" aria-hidden />
                <a href={`mailto:${email}`} className="text-lg font-semibold underline-offset-4 hover:underline">
                  {email}
                </a>
                <CopyButton text={email} label="Copy email" />
              </li>
            )}
            {location && (
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-accent" aria-hidden />
                <span className="text-lg font-semibold">{location}</span>
              </li>
            )}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="w-full sm:w-auto"
          >
            Connect on LinkedIn <ArrowUpRight size={18} className="nudge-r" aria-hidden />
          </ButtonLink>
          {email && (
            <ButtonLink href={`mailto:${email}`} className="w-full sm:w-auto">
              Email me
            </ButtonLink>
          )}
          {profile.resume && (
            <ButtonLink href={profile.resume.path} download={profile.resume.fileName} variant="quiet">
              <Download size={18} aria-hidden /> Resume (PDF)
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
