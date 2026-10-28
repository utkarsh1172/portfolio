"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useCaseSelection } from "@/components/providers/CaseSelectionProvider";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { caseStudies } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/cn";
import type { CaseStudyId, RoleId } from "@/types";

const caseName = new Map<string, string>(caseStudies.map((c) => [c.id, c.name]));
const roleName = new Map<string, string>(experience.map((r) => [r.id, `${r.title}, ${r.company.split(" ")[0]}`]));
const allSkills = skillGroups.flatMap((g) => g.skills.map((s) => ({ ...s, group: g.title })));

const isCase = (id: CaseStudyId | RoleId): id is CaseStudyId => caseName.has(id);

export function SkillsSection() {
  const [skill, setSkill] = useState("Amazon SP-API");
  const { openCase } = useCaseSelection();
  const reduce = useReducedMotion();
  const current = allSkills.find((s) => s.name === skill);

  return (
    <Section id="stack">
      <SectionHeading id="stack-heading" title="Stack, mapped to the work">
        Grouped by where each tool sits in a commerce system. Select one to see where I&rsquo;ve used it.
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="space-y-9 lg:col-span-8">
          {skillGroups.map((g) => (
            <div key={g.id} className="grid gap-3 border-t border-line pt-5 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="heading text-[1.12rem] leading-snug">{g.title}</h3>
                <p className="text-sm text-muted">{g.blurb}</p>
              </div>
              <ul className="flex flex-wrap gap-2 md:col-span-8">
                {g.skills.map((s) => {
                  const on = s.name === skill;
                  return (
                    <li key={s.name}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => setSkill(s.name)}
                        className={cn(
                          "min-h-10 rounded-card border px-3 font-semi text-[0.95rem] font-semibold transition",
                          on
                            ? "border-accent bg-accent text-accent-ink"
                            : s.usedIn
                              ? "border-line bg-surface hover:border-ink/40"
                              : "border-dashed border-line text-muted hover:border-ink/40 hover:text-ink",
                        )}
                      >
                        {s.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <p className="text-sm text-muted">
            Dashed items are on my resume but not tied to a specific project listed here.
          </p>
        </div>

        <aside className="lg:col-span-4" aria-live="polite" aria-label="Where I've used the selected skill">
          <Card className="p-6 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={skill}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm text-muted">{current?.group}</p>
                <p className="heading mt-1 text-[2rem]">{skill}</p>
                {current?.usedIn?.length ? (
                  <>
                    <p className="mt-5 text-sm text-muted">Where I&rsquo;ve used it</p>
                    <ul className="mt-2 space-y-2">
                      {current.usedIn.map((id) =>
                        isCase(id) ? (
                          <li key={id}>
                            <button
                              type="button"
                              onClick={() => openCase(id)}
                              className="group flex w-full items-center justify-between gap-3 rounded-card border border-line px-3 py-2.5 text-left hover:border-accent"
                            >
                              <span className="font-semi font-semibold">{caseName.get(id)}</span>
                              <span className="text-sm text-accent group-hover:underline">Open</span>
                            </button>
                          </li>
                        ) : (
                          <li key={id} className="rounded-card border border-line px-3 py-2.5">
                            <span className="font-semi font-semibold">{roleName.get(id)}</span>
                            <span className="block text-sm text-muted">Part of the team stack in this role</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </>
                ) : (
                  <p className="mt-5 text-muted">Listed on my resume. Happy to talk through how I&rsquo;ve used it.</p>
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
        </aside>
      </div>
    </Section>
  );
}
