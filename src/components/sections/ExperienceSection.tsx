import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, certifications, education, experience, journey } from "@/data/experience";
import { CAREER_START } from "@/data/profile";
import { cn } from "@/lib/cn";
import { yearsSince } from "@/lib/experience";
import { RoleList } from "./RoleList";

export function ExperienceSection() {
  return (
    <Section id="career">
      <SectionHeading id="career-heading" title="Career route">
        {yearsSince(CAREER_START)} years across three companies, from enterprise fitness apps to the order and logistics
        systems I build today.
      </SectionHeading>

      {/* Journey: a route with one stop per milestone, plus the next one. */}
      <div className="-mx-5 scroll-x px-5 pb-2 sm:mx-0 sm:px-0">
        <ol className="relative flex min-w-[44rem] justify-between" aria-label="Career journey">
          <span className="absolute top-[11px] right-[12%] left-3 h-[2px] bg-accent" aria-hidden />
          <span className="absolute top-[11px] right-3 h-[2px] w-[12%] route-dash" aria-hidden />
          {journey.map((j, i) => {
            const last = i === journey.length - 1;
            return (
              <li key={j.year + j.title} className="relative flex w-[16%] flex-col items-start">
                <span className="relative grid h-6 w-6 place-items-center">
                  <span
                    className={cn("h-4 w-4 rounded-full border-[3px] border-accent", last ? "bg-accent" : "bg-bg")}
                  />
                </span>
                <span className="display mt-3 text-[1.9rem] tabular-nums">{j.year}</span>
                <span className="font-semi leading-tight font-semibold">{j.title}</span>
                <span className="text-sm text-muted">{j.note}</span>
              </li>
            );
          })}
          <li className="relative flex w-[12%] flex-col items-end text-right">
            <span className="grid h-6 w-6 place-items-center">
              <span className="h-4 w-4 rounded-full border-[3px] border-dashed border-muted bg-bg" />
            </span>
            <span className="display mt-3 text-[1.9rem] text-muted">Next</span>
            <span className="font-semi leading-tight font-semibold text-muted">Your team</span>
          </li>
        </ol>
      </div>

      <RoleList roles={experience} />

      <div className="mt-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h3 className="heading text-[1.75rem]">Highlights</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {achievements.map((a) => (
              <li key={a} className="flex gap-4 py-4">
                <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-accent" aria-hidden />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
          <div>
            <h3 className="heading text-[1.75rem]">Education</h3>
            <ul className="mt-5 space-y-4">
              {education.map((e) => (
                <li key={e.title}>
                  <p className="font-semi font-semibold">{e.title}</p>
                  <p className="text-sm text-muted">
                    {e.org}, {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="heading text-[1.75rem]">Certifications</h3>
            <ul className="mt-5 space-y-4">
              {certifications.map((c) => (
                <li key={c.title}>
                  <p className="font-semi font-semibold">{c.title}</p>
                  <p className="text-sm text-muted">
                    {c.org}
                    {c.year ? `, ${c.year}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
