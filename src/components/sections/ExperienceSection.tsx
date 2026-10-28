import { ArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications, education, experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading id="experience-heading" eyebrow="Experience" title="From intern to product designer">
        Four teams since 2023: fintech, health, SaaS dashboards, and now logistics and e-commerce at Growve.
      </SectionHeading>

      <ol className="relative space-y-4 before:absolute before:top-3 before:bottom-3 before:left-[7px] before:w-px before:bg-line md:space-y-5">
        {experience.map((r) => {
          const latest = r.positions[0];
          const first = r.positions[r.positions.length - 1];
          return (
            <li key={r.id} className="relative pl-9" data-reveal>
              <span
                className={
                  r.current
                    ? "absolute top-7 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-bg bg-accent ring-1 ring-accent"
                    : "absolute top-7 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-bg bg-line ring-1 ring-line"
                }
                aria-hidden
              />
              <article className="solid rounded-3xl p-6 sm:p-8">
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[1.375rem] font-semibold tracking-tight">{r.company}</h3>
                    <p className="mt-1 text-muted">
                      {latest.title}
                      <span aria-hidden> · </span>
                      <span className="sr-only">, </span>
                      {first.start} to {latest.end}
                    </p>
                  </div>
                  {r.current && (
                    <Badge tone="accent" dot>
                      Current role
                    </Badge>
                  )}
                </header>

                {r.positions.length > 1 && (
                  <ol
                    className="mt-5 flex flex-col gap-2 sm:flex-row-reverse sm:items-stretch sm:justify-end"
                    aria-label="Promotion"
                  >
                    {r.positions.map((p, i) => (
                      <li key={p.title} className="flex items-center gap-2">
                        {i < r.positions.length - 1 && (
                          <ArrowUp size={16} className="order-first shrink-0 text-accent sm:rotate-90" aria-hidden />
                        )}
                        <span className="rounded-xl border border-line bg-bg-2 px-3.5 py-2 text-sm">
                          <span className="block font-medium">{p.title}</span>
                          <span className="text-muted">
                            {p.start} to {p.end}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                )}

                <ul className="mt-5 space-y-2.5">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span className="text-ink/90">{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 grid gap-4 sm:grid-cols-2" data-reveal>
        {education.map((e) => (
          <div key={e.title} className="glass rounded-3xl p-6">
            <p className="eyebrow">Education</p>
            <p className="mt-2 font-semibold">{e.title}</p>
            <p className="text-muted">
              {e.org}, {e.period}
            </p>
          </div>
        ))}
        {certifications.map((c) => (
          <div key={c.title} className="glass rounded-3xl p-6">
            <p className="eyebrow">Certification</p>
            <p className="mt-2 font-semibold">{c.title}</p>
            <p className="text-muted">{c.org}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
