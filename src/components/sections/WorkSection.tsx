import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { DiagramThumb } from "@/components/case-study/Diagram";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies, selectedWork } from "@/data/projects";
import { isConfirmed } from "@/lib/placeholders";
import type { CaseStudy, WorkItem } from "@/types";

export function WorkSection() {
  return (
    <Section id="work">
      <SectionHeading id="work-heading" eyebrow="Selected work" title="Case studies">
        Three projects, each written up from problem to decisions to what I&rsquo;d do next. Client screens stay
        private, so the visuals show structure and flow.
      </SectionHeading>

      <ol className="space-y-5 md:space-y-6">
        {caseStudies.map((c, i) => (
          <li key={c.slug}>
            <CaseCard study={c} index={i} />
          </li>
        ))}
      </ol>

      <div className="mt-24" data-reveal>
        <h3 id="more-work" className="text-[1.375rem] font-semibold tracking-tight">
          More work
        </h3>
        <ul aria-labelledby="more-work" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selectedWork.map((w) => (
            <li key={w.id} className="h-full">
              <WorkCard item={w} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** The whole card is clickable through the title link's stretched hit area, so there is one link per card. */
function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const steps = study.process.diagram.kind === "flow" ? study.process.diagram.steps : [];
  return (
    <Card as="article" className="lift sheen group relative grid overflow-hidden lg:grid-cols-12" data-reveal>
      <div className="flex flex-col p-6 sm:p-9 lg:col-span-6">
        <p className="eyebrow">
          <span className="text-accent tabular-nums">0{index + 1}</span>
          <span aria-hidden> · </span>
          {study.company}
        </p>
        <h3 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-semibold tracking-tight">
          <Link href={`/work/${study.slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
            {study.title}
          </Link>
        </h3>
        <p className="mt-3 max-w-[48ch] text-[1.0625rem] text-muted">{study.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
          {study.tags.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-auto flex items-center gap-1.5 pt-8 font-semibold text-accent" aria-hidden>
          Read case study <ArrowUpRight size={18} className="nudge-r" />
        </p>
      </div>
      <div className="p-3 pt-0 sm:p-4 sm:pt-0 lg:col-span-6 lg:pt-4 lg:pl-0">
        <DiagramThumb steps={steps} />
      </div>
    </Card>
  );
}

function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Card as="article" className="lift flex h-full flex-col p-6" data-reveal>
      <p className="flex items-center justify-between gap-3 text-sm text-muted">
        <span>{item.company}</span>
        {item.ongoing && (
          <Badge tone="accent" dot>
            Ongoing
          </Badge>
        )}
      </p>
      <h4 className="mt-3 text-[1.1875rem] leading-snug font-semibold">{item.title}</h4>
      <p className="mt-2 text-muted">{item.summary}</p>
      <div className="mt-auto pt-6">
        {isConfirmed(item.period) && !item.ongoing && <p className="text-sm text-muted">{item.period}</p>}
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Topics">
          {item.tags.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
        {item.link && isConfirmed(item.link.href) && (
          <a
            href={item.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
          >
            {item.link.label} <ArrowUpRight size={16} aria-hidden />
          </a>
        )}
      </div>
    </Card>
  );
}
