/** Content types shared by data modules and components. */

export type RoleId = "growve" | "ace" | "fxgetactive";

export type CaseStudyId = "crm" | "logistics" | "storefront" | "gateway" | "linky" | "fitness";

export type SectionId = "about" | "work" | "demo" | "career" | "stack" | "resume" | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface PipelineStage {
  id: string;
  label: string;
  system: string;
  caseId: CaseStudyId;
  detail: string;
}

export interface FlowNode {
  title: string;
  note?: string;
}

export type CaseStudyKind = "Logistics" | "CRM" | "E-commerce" | "Integration" | "Mobile";

export interface CaseStudy {
  id: CaseStudyId;
  name: string;
  company: string;
  period: string;
  kind: CaseStudyKind;
  status: "In production" | "Shipped";
  summary: string;
  problem: string;
  built: string[];
  flow: FlowNode[];
  /** Tech the resume ties to this project specifically. */
  stack: string[];
  /** Role whose team stack is shown separately, so nothing is over-attributed. */
  roleId: RoleId;
  decisions: string[];
  outcome: string;
}

export interface Role {
  id: RoleId;
  title: string;
  company: string;
  start: string;
  end: string;
  current?: boolean;
  stack?: string;
  points: { label: string; text: string }[];
}

export interface JourneyStop {
  year: string;
  title: string;
  note: string;
}

export interface Education {
  title: string;
  org: string;
  period: string;
}

export interface Certification {
  title: string;
  org: string;
  year?: string;
}

export interface Skill {
  name: string;
  /** Case study ids or role ids the resume ties this skill to. */
  usedIn?: (CaseStudyId | RoleId)[];
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
}

export interface Hub {
  id: string;
  name: string;
  lat: number;
  lon: number;
  kind: "home" | "warehouse" | "domestic";
}

export interface Profile {
  name: string;
  firstName: string;
  role: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  links: { github: string; linkedin: string; site: string };
  resume: { path: string; fileName: string };
  photo: { src: string; alt: string };
  seeking: string;
}
