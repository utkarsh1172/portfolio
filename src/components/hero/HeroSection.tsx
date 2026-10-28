import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { experience } from "@/data/experience";
import { CAREER_START, profile } from "@/data/profile";
import { yearsSince } from "@/lib/experience";

const delay = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

/** The headline renders from server HTML with a CSS-only entrance, so it never waits for JavaScript. */
export function HeroSection() {
  const years = yearsSince(CAREER_START);
  const current = experience.find((r) => r.current);

  const facts: [string, string][] = [
    ["Experience", `${years}+ years, including internship`],
    ["Now", current ? `${current.positions[0].title}, ${current.company}` : ""],
    ["Focus", "Operational workflows, CRMs and design systems"],
  ];

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative pt-32 pb-16 sm:pt-40 md:pb-24">
      <div className="mx-auto max-w-page px-4 sm:px-8">
        <p
          className="glass inline-flex hero-fade items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium"
          style={delay(0)}
        >
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          Open to product design roles
        </p>

        <h1 id="hero-heading" className="mt-8">
          <span className="block hero-fade text-lg font-medium text-muted" style={delay(0.05)}>
            {profile.name}
          </span>
          <span className="display mt-3 block hero-fade text-[clamp(2.6rem,7.4vw,5.75rem)]" style={delay(0.1)}>
            Product Designer
            <span className="text-muted" aria-hidden>
              {" "}
              |{" "}
            </span>
            <span className="sr-only"> and </span>
            <span className="serif-accent">UI/UX Designer</span>
          </span>
        </h1>

        <p className="lede mt-7 max-w-[46ch]! hero-fade text-[clamp(1.125rem,1.7vw,1.375rem)]" style={delay(0.18)}>
          {profile.pitch}
        </p>

        <div className="mt-9 flex hero-fade flex-wrap gap-3" style={delay(0.26)}>
          <ButtonLink href="#work" variant="primary" className="w-full sm:w-auto">
            View case studies <ArrowDown size={18} className="nudge-d" aria-hidden />
          </ButtonLink>
          <ButtonLink
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="w-full sm:w-auto"
          >
            Connect on LinkedIn <ArrowUpRight size={18} className="nudge-r" aria-hidden />
          </ButtonLink>
          {profile.resume && (
            <ButtonLink href={profile.resume.path} download={profile.resume.fileName} variant="quiet">
              <Download size={18} aria-hidden /> Download resume
            </ButtonLink>
          )}
        </div>

        <dl
          className="mt-14 grid hero-fade gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
          style={delay(0.34)}
        >
          {facts.map(([k, v]) => (
            <div key={k} className="bg-bg/92 px-5 py-4">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1.5 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
