"use client";

import { ArrowUpRight, Box, Database, Mail, Route, Server, ShieldCheck, Smartphone, Workflow } from "lucide-react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { forwardRef, useState } from "react";
import { useCaseSelection } from "@/components/providers/CaseSelectionProvider";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowDiagram } from "@/components/visualizations/FlowDiagram";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { caseStudies } from "@/data/projects";
import { cn } from "@/lib/cn";
import type { CaseStudy, CaseStudyId, CaseStudyKind } from "@/types";
import styles from "./ProjectsSection.module.css";

type Filter = "All" | CaseStudyKind;
const filters: Filter[] = ["All", "Logistics", "CRM", "E-commerce", "Integration", "Mobile"];
type Tab = "overview" | "architecture" | "stack";
const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Stack and decisions" },
];
const shortNames: Record<CaseStudyId, string> = {
  crm: "Order automation",
  logistics: "Logistics platform",
  storefront: "Storefront & stock",
  gateway: "API gateway",
  linky: "Linky Pro",
  fitness: "Fitness apps",
};

export function ProjectsSection() {
  const { caseId, openCase } = useCaseSelection();
  const [view, setView] = useState({ filter: "All" as Filter, caseId });
  const filter = view.caseId === caseId ? view.filter : "All";
  const list = caseStudies.filter((c) => filter === "All" || c.kind === filter);
  const current = caseStudies.find((c) => c.id === caseId) ?? caseStudies[0];
  const select = (study: CaseStudy) => {
    setView({ filter, caseId: study.id });
    openCase(study.id, false);
  };
  const changeFilter = (nextFilter: Filter) => {
    const next =
      nextFilter === "All" || current.kind === nextFilter ? current : caseStudies.find((c) => c.kind === nextFilter);
    if (!next) return;
    setView({ filter: nextFilter, caseId: next.id });
    if (next.id !== caseId) openCase(next.id, false);
  };

  return (
    <Section id="work" className={styles.section}>
      <SectionHeading id="work-heading" title="Projects">
        Six projects covering CRM, logistics, e-commerce and mobile apps. Select a project to view its features,
        architecture and technologies.
      </SectionHeading>
      <div className={styles.filters} role="group" aria-label="Filter projects by type">
        {filters.map((item) => (
          <button key={item} type="button" aria-pressed={filter === item} onClick={() => changeFilter(item)}>
            {item}
          </button>
        ))}
      </div>
      <ul className={styles.projects} aria-label="Projects">
        {list.map((study) => (
          <li key={study.id}>
            <button
              type="button"
              onClick={() => select(study)}
              aria-current={study.id === current.id ? "true" : undefined}
              className={cn(styles.project, study.id === current.id && styles.selected)}
            >
              <span className={styles.projectKind}>{study.kind}</span>
              <span className={styles.projectName}>{shortNames[study.id]}</span>
              <ArrowUpRight size={17} aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.exhibit}>
        <AnimatePresence initial={false} mode="popLayout">
          <CaseStudyPanel key={current.id} study={current} />
        </AnimatePresence>
      </div>
    </Section>
  );
}

const CaseStudyPanel = forwardRef<HTMLElement, { study: CaseStudy }>(function CaseStudyPanel({ study }, ref) {
  const [tab, setTab] = useState<Tab>("overview");
  const reduce = useReducedMotion();
  const present = useIsPresent();
  const tabId = (id: Tab) => `tab-${study.id}-${id}`;
  const panelId = (id: Tab) => `panel-${study.id}-${id}`;
  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? tabs.length - 1
          : event.key === "ArrowRight"
            ? (index + 1) % tabs.length
            : event.key === "ArrowLeft"
              ? (index - 1 + tabs.length) % tabs.length
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setTab(tabs[next].id);
    document.getElementById(tabId(tabs[next].id))?.focus();
  };
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.1 : 0.24, ease: [0.23, 1, 0.32, 1] }}
      className={styles.article}
      aria-labelledby={`case-title-${study.id}`}
      aria-hidden={!present || undefined}
      inert={!present}
    >
      <div className={styles.opening}>
        <ProjectDiagram study={study} />
        <div className={styles.intro}>
          <h3 id={`case-title-${study.id}`} className={styles.title}>
            {study.name}
          </h3>
          <Badge tone={study.status === "In production" ? "accent" : "muted"}>{study.status}</Badge>
          <p className={styles.company}>
            {study.company}
            <br />
            {study.period}
          </p>
          {study.links?.length ? (
            <ul className={styles.liveLinks} aria-label="Project websites">
              {study.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                    <span>{link.label}</span>
                    <ArrowUpRight size={15} aria-hidden />
                    {link.access && (
                      <span className={styles.linkHint}>{link.access === "login" ? "Sign-in required" : "Demo"}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <p className={styles.summary}>{study.summary}</p>
          <div className={styles.outcome}>
            <h4>Outcome</h4>
            <p>{study.outcome}</p>
          </div>
        </div>
      </div>
      <div role="tablist" aria-label="Case study views" className={styles.tabs}>
        {tabs.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={tabId(item.id)}
            aria-selected={tab === item.id}
            aria-controls={panelId(item.id)}
            tabIndex={tab === item.id ? 0 : -1}
            onClick={() => setTab(item.id)}
            onKeyDown={(event) => onTabKey(event, index)}
          >
            {item.label}
            {tab === item.id && <span className={styles.tabMark} />}
          </button>
        ))}
      </div>
      {tabs.map((item) => (
        <div
          key={item.id}
          id={panelId(item.id)}
          role="tabpanel"
          aria-labelledby={tabId(item.id)}
          tabIndex={0}
          hidden={tab !== item.id}
          className={styles.panel}
        >
          {tab === item.id && item.id === "overview" && <Overview study={study} />}
          {tab === item.id && item.id === "architecture" && <FlowDiagram nodes={study.flow} label={study.name} />}
          {tab === item.id && item.id === "stack" && <StackView study={study} />}
        </div>
      ))}
      <footer className={styles.footer}>
        <ButtonLink href={`mailto:${profile.email}?subject=${encodeURIComponent(`About your ${study.name} work`)}`}>
          <Mail size={16} aria-hidden /> Ask me about this project <ArrowUpRight size={16} aria-hidden />
        </ButtonLink>
      </footer>
    </motion.article>
  );
});

type Point = [number, number];
const positions: Record<CaseStudyId, Point[]> = {
  crm: [
    [110, 115],
    [350, 80],
    [590, 115],
    [590, 300],
    [350, 330],
    [110, 300],
  ],
  logistics: [
    [110, 300],
    [270, 100],
    [460, 300],
    [620, 100],
  ],
  storefront: [
    [100, 210],
    [350, 80],
    [600, 210],
    [350, 340],
  ],
  gateway: [
    [110, 210],
    [350, 210],
    [600, 100],
    [600, 320],
  ],
  linky: [
    [110, 210],
    [350, 210],
    [590, 210],
  ],
  fitness: [
    [100, 210],
    [270, 90],
    [480, 90],
    [620, 210],
    [350, 330],
  ],
};
const icons = {
  crm: Workflow,
  logistics: Route,
  storefront: Box,
  gateway: ShieldCheck,
  linky: Smartphone,
  fitness: Smartphone,
};
const nodeLabels: Record<CaseStudyId, string[]> = {
  crm: ["Amazon", "SP-API", "Data", "Workers", "Purchase", "Courier"],
  logistics: ["Intake", "Booking", "Tracking", "Admin"],
  storefront: ["Store", "Payments", "Stock", "Admin"],
  gateway: ["Orders", "Gateway", "CRM", "Services"],
  linky: ["Mobile", "APIs", "Web"],
  fitness: ["Mobile", "ML Kit", "Fitness", "PlayFab", "Backend"],
};

/** A labeled architecture drawing, never a fabricated product screenshot. */
function ProjectDiagram({ study }: { study: CaseStudy }) {
  const [selected, setSelected] = useState(study.id === "crm" ? 3 : study.id === "gateway" ? 1 : 0);
  const [traced, setTraced] = useState(false);
  const points = positions[study.id];
  const focus = study.flow[selected];
  const Icon = icons[study.id];
  const links =
    study.id === "gateway"
      ? [
          [0, 1],
          [1, 2],
          [1, 3],
        ]
      : study.flow.slice(1).map((_, index) => [index, index + 1]);
  const select = (index: number) => {
    setSelected(index);
    setTraced(true);
  };
  return (
    <figure className={styles.diagram}>
      <figcaption className={styles.diagramCaption}>
        <span>
          <Icon size={15} aria-hidden /> System overview
        </span>
        <span>Select a system to inspect it</span>
      </figcaption>
      <div className={styles.diagramSurface}>
        <svg
          viewBox="0 0 700 430"
          className={styles.diagramSvg}
          aria-label={`${study.name}: interactive system overview`}
        >
          <g className={styles.structure} aria-hidden="true">
            <path d="M350 26 672 210 350 403 28 210Z" />
            <path d="M350 70 600 210 350 358 100 210Z" />
            <path d="M350 26V403M28 210H672" />
          </g>
          <g aria-hidden="true">
            {links.map(([from, to]) => {
              const a = points[from],
                b = points[to];
              const active = from === selected || to === selected;
              const path =
                study.id === "logistics"
                  ? `M${a[0]},${a[1]} Q${(a[0] + b[0]) / 2},${a[1]} ${b[0]},${b[1]}`
                  : `M${a[0]},${a[1]} C${(a[0] + b[0]) / 2},${a[1]} ${(a[0] + b[0]) / 2},${b[1]} ${b[0]},${b[1]}`;
              return (
                <g key={`${from}-${to}`}>
                  <path d={path} className={styles.connection} />
                  <path
                    key={`${selected}-${from}-${to}`}
                    d={path}
                    className={cn(styles.signal, active && styles.activeSignal, traced && styles.traced)}
                  />
                </g>
              );
            })}
          </g>
          {study.id === "storefront" && (
            <g className={styles.inventory} aria-hidden="true">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <rect
                  key={index}
                  x={240 + (index % 3) * 38}
                  y={172 + Math.floor(index / 3) * 38}
                  width="29"
                  height="29"
                  rx="3"
                />
              ))}
              <text x="296" y="270" textAnchor="middle">
                US / UAE stock
              </text>
            </g>
          )}
          {study.id === "gateway" && (
            <g className={styles.gatewayRing} aria-hidden="true">
              <circle cx="350" cy="210" r="100" />
              <circle cx="350" cy="210" r="115" strokeDasharray="3 8" />
            </g>
          )}
          {study.id === "linky" && (
            <g className={styles.phoneFrame} aria-hidden="true">
              <rect x="42" y="98" width="136" height="222" rx="21" />
              <path d="M89 112H131M91 304H129" />
              <rect x="510" y="124" width="160" height="170" rx="9" />
              <path d="M510 150H670M530 137H536M546 137H552" />
            </g>
          )}
          {study.flow.map((node, index) => (
            <foreignObject
              key={`${study.id}-${node.title}`}
              x={points[index][0] - 82}
              y={points[index][1] - 57}
              width="164"
              height="126"
            >
              <button
                type="button"
                className={cn(styles.node, index === selected && styles.activeNode)}
                aria-pressed={index === selected}
                aria-label={node.title}
                onClick={() => select(index)}
              >
                {index === selected ? (
                  <Icon size={18} aria-hidden />
                ) : index === 2 && study.id === "crm" ? (
                  <Database size={17} aria-hidden />
                ) : (
                  <Server size={16} aria-hidden />
                )}
                <span className={styles.fullNodeLabel}>{node.title}</span>
                <span className={styles.shortNodeLabel} aria-hidden="true">
                  {nodeLabels[study.id][index]}
                </span>
              </button>
            </foreignObject>
          ))}
        </svg>
      </div>
      <div className={styles.nodeDetail} aria-live="polite">
        <span className={styles.nodeStatus} aria-hidden />
        <div>
          <p>{focus.title}</p>
          <span>{focus.note ?? "Part of the project architecture"}</span>
        </div>
        <span className={styles.nodeCount}>
          {selected + 1} / {study.flow.length}
        </span>
      </div>
    </figure>
  );
}

function Overview({ study }: { study: CaseStudy }) {
  return (
    <div className={styles.overview}>
      <div>
        <h4>The problem</h4>
        <p>{study.problem}</p>
      </div>
      <div>
        <h4>What I built</h4>
        <ul>
          {study.built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function StackView({ study }: { study: CaseStudy }) {
  const role = experience.find((item) => item.id === study.roleId);
  return (
    <div className={styles.overview}>
      <div>
        <h4>Built with</h4>
        <ul className={styles.stack}>
          {study.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {role?.stack && (
          <p className={styles.roleStack}>
            Team stack at {role.company.split(" ")[0]}: {role.stack}.
          </p>
        )}
      </div>
      <div>
        <h4>Engineering decisions</h4>
        <ul>
          {study.decisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
