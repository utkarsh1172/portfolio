import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { caseStudies } from "@/data/projects";
import { skillGroups, tools } from "@/data/skills";
import type { CaseStudySlug, RoleId } from "@/types";

const caseTitle = new Map<string, string>(caseStudies.map((c) => [c.slug, c.title]));
const roleCompany = new Map<string, string>(experience.map((r) => [r.id, r.company]));

/** Evidence for a skill: a link when a case study shows it, otherwise the company where it was used. */
function Evidence({ ids }: { ids: (CaseStudySlug | RoleId)[] }) {
  return (
    <span className="mt-0.5 block text-sm text-muted">
      Seen in{" "}
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && ", "}
          {caseTitle.has(id) ? (
            <Link href={`/work/${id}`} className="underline underline-offset-2 hover:text-accent">
              {caseTitle.get(id)}
            </Link>
          ) : (
            roleCompany.get(id)
          )}
        </span>
      ))}
    </span>
  );
}

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading id="skills-heading" eyebrow="Skills and tools" title="What I bring to a team">
        Every skill points to the project that shows it.
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <Card key={g.id} as="section" aria-labelledby={`skills-${g.id}`} className="p-6 sm:p-7" data-reveal>
            <h3 id={`skills-${g.id}`} className="text-[1.1875rem] font-semibold">
              {g.title}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {g.skills.map((s) => (
                <li key={s.name} className="border-t border-line pt-3.5 first:border-0 first:pt-0">
                  <span className="block font-medium">{s.name}</span>
                  {s.usedIn && s.usedIn.length > 0 && <Evidence ids={s.usedIn} />}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="glass mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-3xl px-6 py-5" data-reveal>
        <h3 className="eyebrow">Tools</h3>
        <ul className="flex flex-wrap gap-2">
          {tools.map((t) => (
            <li key={t} className="rounded-full border border-line px-3.5 py-1.5 text-[0.9375rem] font-medium">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
