import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { certifications, education, experience } from "@/data/experience";
import { CAREER_START, profile } from "@/data/profile";
import { yearsSince } from "@/lib/experience";
import { visible } from "@/lib/placeholders";

export function AboutSection() {
  const current = experience.find((r) => r.current);
  const facts = visible<[string, string]>([
    ["Now", current ? `${current.positions[0].title}, ${current.company}` : ""],
    ["Before", "Kalpins.co, Hygwell, Bombay Tone"],
    ["Based in", profile.location],
    ["Education", `${education[0].title}, ${education[0].org}`],
    ["Certificate", certifications[0].title],
    ["Looking for", profile.seeking],
  ]);

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal>
          <p className="eyebrow mb-4">About</p>
          <h2 id="about-heading" className="h-section max-w-[18ch]">
            I design from the data model up.
          </h2>
          <div className="mt-8 max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed">
            <p>
              I&rsquo;m a product designer with {yearsSince(CAREER_START)}+ years of experience across fintech, health,
              e-commerce and logistics. I started as a UX intern at Bombay Tone, designing fintech loan websites and app
              experiences, and moved up to Junior UX Designer.
            </p>
            <p>
              Since then I&rsquo;ve freelanced for Hygwell, worked as the sole designer at Kalpins.co, and joined Growve
              Logistics as a Product Experience Designer. There I design operational workflows, the Growve Design
              System, and websites and landing pages for Growve&rsquo;s brands.
            </p>
            <p className="text-muted">
              At Growve I design from the backend data model and the operational workflow, so every screen maps to real
              fields and real stages, and developers build straight from the Figma file.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5" aria-label="Quick facts" data-reveal>
          <Card as="dl" className="divide-y divide-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 px-5 py-4 sm:grid-cols-[7.5rem_1fr]">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="leading-snug font-medium">{v}</dd>
              </div>
            ))}
          </Card>
        </aside>
      </div>
    </Section>
  );
}
