/**
 * Content types shared by data modules and components.
 *
 * Any string may hold a placeholder such as `{{METRIC: screens designed}}`
 * for a fact that is not confirmed yet. Placeholders are never rendered
 * (see lib/placeholders.ts) and `npm run placeholders` lists them.
 */

export type SectionId = "work" | "about" | "experience" | "skills" | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
}

export type CaseStudySlug = "redfox-courier" | "growve-design-system" | "walherb";

export type RoleId = "growve" | "kalpins" | "hygwell" | "bombay-tone";

export interface FlowStep {
  title: string;
  note?: string;
}

/** Diagrams are drawn from structure only: no screenshots, no client data. */
export type Diagram =
  | {
      kind: "flow";
      title: string;
      caption?: string;
      steps: FlowStep[];
      /** Terminal branches after the last step, e.g. delivered / returned. */
      outcomes?: FlowStep[];
    }
  | {
      kind: "layers";
      title: string;
      caption?: string;
      layers: { title: string; note?: string; items: string[] }[];
    }
  | {
      kind: "scale";
      title: string;
      caption?: string;
      rows: { name: string; size: number; weight: number; note?: string }[];
    };

export interface Decision {
  title: string;
  /** What was decided, in one or two sentences. */
  detail: string;
  /** Why: the reasoning behind it. */
  why: string;
}

export interface LabelledPoint {
  label: string;
  text: string;
}

export interface CaseStudy {
  slug: CaseStudySlug;
  title: string;
  company: string;
  /** One line for cards and the page lede. */
  summary: string;
  tags: string[];
  overview: {
    role: string;
    timeline: string;
    team: string;
    platform: string;
    tools: string;
  };
  problem: string[];
  users: string[];
  constraints: string[];
  process: { intro?: string; diagram: Diagram };
  decisions: Decision[];
  states: LabelledPoint[];
  final: { intro: string; diagrams: Diagram[]; built: string[]; link?: { href: string; label: string } };
  outcome: string[];
  next: string[];
}

export interface WorkItem {
  id: string;
  title: string;
  company: string;
  period: string;
  summary: string;
  tags: string[];
  ongoing?: boolean;
  link?: { href: string; label: string };
}

export interface Position {
  title: string;
  start: string;
  end: string;
}

export interface Role {
  id: RoleId;
  company: string;
  /** Most recent first; more than one shows a promotion. */
  positions: Position[];
  current?: boolean;
  points: string[];
}

export interface Education {
  title: string;
  org: string;
  period: string;
}

export interface Certification {
  title: string;
  org: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: { name: string; usedIn?: (CaseStudySlug | RoleId)[] }[];
}

export interface Profile {
  name: string;
  role: string;
  /** The one-line value proposition. */
  pitch: string;
  location: string;
  email: string;
  links: { linkedin: string };
  /** Null until a PDF is added under public/resume/. */
  resume: { path: string; fileName: string } | null;
  seeking: string;
}
