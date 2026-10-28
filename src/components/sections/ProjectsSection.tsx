"use client";

import { Mail } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { useCaseSelection } from "@/components/providers/CaseSelectionProvider";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/visualizations/FlowDiagram";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { CaseStudy, CaseStudyKind } from "@/types";

type Filter = "All" | CaseStudyKind;
const filters: Filter[] = ["All", "Logistics", "CRM", "E-commerce", "Integration", "Mobile"];

type Tab = "overview" | "architecture" | "stack";
const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Stack and decisions" },
];

const shortCompany = (company: string) => company.replace(" Retail and Management Services", "");

export function ProjectsSection() {
  const { caseId, openCase } = useCaseSelection();
  const [filter, setFilter] = useState<Filter>("All");
  const [tab, setTab] = useState<Tab>("overview");
  const reduce = useReducedMotion();

  const list = useMemo(() => caseStudies.filter((c) => filter === "All" || c.kind === filter), [filter]);
  const current = caseStudies.find((c) => c.id === caseId) ?? caseStudies[0];

  const select = (c: CaseStudy) => {
    openCase(c.id, false);
    setTab("overview");
  };

  // Arrow keys move between tabs (WAI-ARIA tabs pattern).
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = tabs[(i + delta + tabs.length) % tabs.length];
    setTab(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  return (
    <Section id="work">
      <SectionHeading id="work-heading" title="Systems I’ve built">
        Six real projects from my three roles, written up as case studies. Each one lists the problem, what I built, how
        it fits together and the outcome as stated on my resume.
      </SectionHeading>

      <Card className="grid overflow-hidden lg:grid-cols-12">
        <div className="border-b border-line lg:col-span-4 lg:border-r lg:border-b-0">
          <div
            className="flex scroll-x gap-2 border-b border-line px-4 py-3 lg:flex-wrap"
            role="group"
            aria-label="Filter projects by type"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "min-h-9 shrink-0 rounded-full px-3 font-semi text-[0.88rem] font-semibold transition",
                  filter === f ? "bg-ink text-bg" : "text-muted hover:bg-surface-2 hover:text-ink",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <ul className="flex scroll-x lg:block lg:max-h-[42rem] lg:overflow-y-auto" aria-label="Projects">
            {list.map((c) => {
              const on = c.id === current.id;
              return (
                <li key={c.id} className="w-[17rem] shrink-0 border-r border-line lg:w-auto lg:border-r-0 lg:border-b">
                  <button
                    type="button"
                    onClick={() => select(c)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "relative block h-full w-full px-5 py-4 text-left transition",
                      on ? "bg-surface-2" : "hover:bg-surface-2/60",
                    )}
                  >
                    {on && <span className="absolute inset-y-0 left-0 w-[3px] bg-accent" aria-hidden />}
                    <span className="block font-semi text-[1.05rem] leading-snug font-semibold">{c.name}</span>
                    <span className="mt-1 block text-sm text-muted">{shortCompany(c.company)}</span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      <Badge tone="muted">{c.kind}</Badge>
                      <Badge tone={c.status === "In production" ? "accent" : "muted"}>{c.status}</Badge>
                    </span>
                  </button>
                </li>
              );
            })}
            {list.length === 0 && (
              <li className="px-5 py-6 text-sm text-muted">
                No projects of this type. Choose All to see every project.
              </li>
            )}
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-8"
              aria-labelledby="case-title"
            >
              <header className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 id="case-title" className="heading text-[2rem] sm:text-[2.5rem]">
                    {current.name}
                  </h3>
                  <p className="mt-2 text-muted">
                    {current.company}, {current.period}
                  </p>
                </div>
                <Badge tone="accent">Real project</Badge>
              </header>
              <p className="mt-5 max-w-[60ch] text-[1.08rem]">{current.summary}</p>

              <div role="tablist" aria-label="Case study views" className="mt-7 flex gap-1 border-b border-line">
                {tabs.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={tab === t.id}
                    aria-controls={`panel-${t.id}`}
                    tabIndex={tab === t.id ? 0 : -1}
                    onClick={() => setTab(t.id)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={cn(
                      "relative -mb-px min-h-11 px-3 font-semi text-[0.98rem] font-semibold transition",
                      tab === t.id ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {t.label}
                    {tab === t.id && (
                      <motion.span
                        layoutId="case-tab-underline"
                        className="absolute inset-x-2 bottom-0 h-[2px] bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={0} className="pt-7">
                {tab === "overview" && <Overview study={current} />}
                {tab === "architecture" && <FlowDiagram nodes={current.flow} label={current.name} />}
                {tab === "stack" && <StackView study={current} />}
              </div>

              <footer className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
                <ButtonLink
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(`About your ${current.name} work`)}`}
                >
                  <Mail size={18} aria-hidden /> Ask me about this project
                </ButtonLink>
              </footer>
            </motion.article>
          </AnimatePresence>
        </div>
      </Card>
    </Section>
  );
}

function Overview({ study }: { study: CaseStudy }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h4 className="font-semi text-sm font-semibold text-muted">The problem</h4>
        <p className="mt-2">{study.problem}</p>
        <div className="mt-6 rounded-card border-l-[3px] border-accent bg-accent/5 py-3 pr-3 pl-4">
          <h4 className="font-semi text-sm font-semibold text-accent">Outcome</h4>
          <p className="mt-1 font-medium">{study.outcome}</p>
        </div>
      </div>
      <div>
        <h4 className="font-semi text-sm font-semibold text-muted">What I built</h4>
        <ul className="mt-2 space-y-2.5">
          {study.built.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StackView({ study }: { study: CaseStudy }) {
  const role = experience.find((r) => r.id === study.roleId);
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h4 className="font-semi text-sm font-semibold text-muted">Built with</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {study.stack.map((s) => (
            <li
              key={s}
              className="rounded-card border border-line bg-bg-2 px-3 py-1.5 font-semi text-[0.95rem] font-semibold"
            >
              {s}
            </li>
          ))}
        </ul>
        {role?.stack && (
          <p className="mt-5 text-sm text-muted">
            Team stack at {role.company.split(" ")[0]}: {role.stack}.
          </p>
        )}
      </div>
      <div>
        <h4 className="font-semi text-sm font-semibold text-muted">Engineering decisions</h4>
        <ul className="mt-2 space-y-3">
          {study.decisions.map((d) => (
            <li key={d} className="border-l-2 border-line pl-4">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
