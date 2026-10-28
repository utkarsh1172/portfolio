import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { caseStudies } from "@/data/projects";
import { isConfirmed, visible } from "@/lib/placeholders";
import type { CaseStudy } from "@/types";
import { Diagram } from "./Diagram";

const sections = [
  { id: "problem", label: "Problem and context" },
  { id: "users", label: "Users and constraints" },
  { id: "process", label: "Process" },
  { id: "decisions", label: "Key design decisions" },
  { id: "states", label: "Edge cases and states" },
  { id: "final", label: "Final design" },
  { id: "outcome", label: "Outcome and learnings" },
  { id: "next", label: "What I’d do next" },
] as const;

type SectionKey = (typeof sections)[number]["id"];

/**
 * A case study page. Meta sits on glass; everything read at length sits on a
 * solid surface for contrast. Placeholder content is filtered out here.
 */
export function CaseStudyView({ study }: { study: CaseStudy }) {
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const prev = caseStudies[(index - 1 + caseStudies.length) % caseStudies.length];
  const next = caseStudies[(index + 1) % caseStudies.length];

  const overview = visible<[string, string]>([
    ["Role", study.overview.role],
    ["Timeline", study.overview.timeline],
    ["Team", study.overview.team],
    ["Platform", study.overview.platform],
    ["Tools", study.overview.tools],
  ]);
  const outcome = visible(study.outcome);
  const shown = sections.filter((s) => s.id !== "outcome" || outcome.length > 0);

  const body: Record<SectionKey, ReactNode> = {
    problem: <Paragraphs items={visible(study.problem)} />,
    users: (
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-[1.0625rem] font-semibold">Who uses it</h3>
          <Bullets items={visible(study.users)} />
        </div>
        <div>
          <h3 className="text-[1.0625rem] font-semibold">Constraints</h3>
          <Bullets items={visible(study.constraints)} />
        </div>
      </div>
    ),
    process: (
      <>
        {study.process.intro && <p className="mb-6">{study.process.intro}</p>}
        <Diagram diagram={study.process.diagram} />
      </>
    ),
    decisions: (
      <ol className="space-y-4">
        {visible(study.decisions).map((d, i) => (
          <li key={d.title} className="rounded-2xl border border-line bg-bg-2/60 p-5 sm:p-6">
            <h3 className="flex gap-3 text-[1.1875rem] leading-snug font-semibold">
              <span className="text-accent tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              {d.title}
            </h3>
            <p className="mt-3">{d.detail}</p>
            <p className="mt-3 text-muted">
              <span className="font-semibold text-ink">Why: </span>
              {d.why}
            </p>
          </li>
        ))}
      </ol>
    ),
    states: (
      <dl className="grid gap-3 sm:grid-cols-2">
        {visible(study.states).map((s) => (
          <div key={s.label} className="rounded-2xl border border-line p-4">
            <dt className="font-semibold">{s.label}</dt>
            <dd className="mt-1 text-muted">{s.text}</dd>
          </div>
        ))}
      </dl>
    ),
    final: (
      <>
        <p className="mb-6">{study.final.intro}</p>
        <div className="space-y-5">
          {study.final.diagrams.map((d) => (
            <Diagram key={d.title} diagram={d} />
          ))}
        </div>
        <h3 className="mt-10 text-[1.0625rem] font-semibold">Built from the designs</h3>
        <Bullets items={visible(study.final.built)} />
        {study.final.link && isConfirmed(study.final.link.href) && (
          <a
            href={study.final.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-semibold text-accent underline-offset-4 hover:underline"
          >
            {study.final.link.label} <ArrowUpRight size={18} aria-hidden />
          </a>
        )}
      </>
    ),
    outcome: <Paragraphs items={outcome} />,
    next: <Bullets items={visible(study.next)} />,
  };

  return (
    <article aria-labelledby="case-title">
      <header id="top" className="mx-auto max-w-page px-4 pt-32 pb-10 sm:px-8 sm:pt-40">
        <Link
          href="/#work"
          className="inline-flex min-h-11 hero-fade items-center gap-2 rounded-full text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden /> All work
        </Link>
        <p className="eyebrow mt-6 hero-fade">Case study · {study.company}</p>
        <h1 id="case-title" className="display mt-4 hero-fade text-[clamp(2.75rem,8vw,6rem)]">
          {study.title}
        </h1>
        <p className="lede mt-6 max-w-[56ch]! hero-fade text-[clamp(1.125rem,1.6vw,1.3125rem)]">{study.summary}</p>
        <ul className="mt-6 flex hero-fade flex-wrap gap-2" aria-label="Topics">
          {study.tags.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>

        <Card
          as="dl"
          className="mt-10 grid hero-fade sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col"
          aria-label="Overview"
        >
          {overview.map(([k, v]) => (
            <div key={k} className="px-5 py-4 sm:px-6 sm:py-5">
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1.5 leading-snug font-medium">{v}</dd>
            </div>
          ))}
        </Card>
      </header>

      <div className="mx-auto grid max-w-page gap-8 px-4 pb-24 sm:px-8 lg:grid-cols-12">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <div className="glass sticky top-24 rounded-2xl p-4">
            <p className="eyebrow px-2">On this page</p>
            <ol className="mt-3 space-y-0.5">
              {shown.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-lg px-2 py-1.5 text-[0.9375rem] text-muted transition-colors hover:bg-ink/6 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="solid prose-case rounded-4xl px-5 py-10 sm:px-10 sm:py-14 lg:col-span-9 lg:px-14">
          {shown.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-heading`}
              className={i > 0 ? "mt-16 border-t border-line pt-14" : undefined}
            >
              <h2 id={`${s.id}-heading`} className="mb-6 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight">
                {s.label}
              </h2>
              {body[s.id]}
            </section>
          ))}
        </div>
      </div>

      <nav aria-label="More case studies" className="mx-auto grid max-w-page gap-4 px-4 pb-24 sm:grid-cols-2 sm:px-8">
        <CaseLink study={prev} direction="Previous" />
        <CaseLink study={next} direction="Next" />
      </nav>
    </article>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-5">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((p) => (
        <li key={p} className="flex gap-3">
          <span className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseLink({ study, direction }: { study: CaseStudy; direction: "Previous" | "Next" }) {
  const next = direction === "Next";
  return (
    <Link
      href={`/work/${study.slug}`}
      className={`glass lift group flex flex-col rounded-3xl p-6 ${next ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="eyebrow flex items-center gap-1.5">
        {!next && <ArrowLeft size={14} aria-hidden />}
        {direction} case study
        {next && <ArrowRight size={14} aria-hidden />}
      </span>
      <span className="mt-2 text-[1.375rem] font-semibold tracking-tight group-hover:text-accent">{study.title}</span>
    </Link>
  );
}
