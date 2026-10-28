import type { SkillGroup } from "@/types";

/**
 * Only skills the resume states or the case studies show. Don't add a tool or
 * technique here until it is confirmed.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "product",
    title: "Product and UX design",
    skills: [
      { name: "End-to-end workflow design", usedIn: ["redfox-courier", "growve-design-system"] },
      { name: "Designing from the data model", usedIn: ["redfox-courier"] },
      { name: "Dashboards", usedIn: ["kalpins"] },
      { name: "Landing pages and lead generation", usedIn: ["walherb", "redfox-courier"] },
      { name: "Empty, loading and error states", usedIn: ["kalpins", "growve-design-system"] },
      { name: "Research", usedIn: ["hygwell"] },
    ],
  },
  {
    id: "systems",
    title: "Design systems",
    skills: [
      { name: "Colour and design tokens", usedIn: ["growve-design-system"] },
      { name: "Typography and spacing", usedIn: ["growve-design-system"] },
      { name: "Figma variables", usedIn: ["growve-design-system"] },
      { name: "Components: buttons, forms, tables", usedIn: ["growve-design-system"] },
      { name: "Documentation", usedIn: ["growve-design-system"] },
    ],
  },
  {
    id: "delivery",
    title: "Working with engineering",
    skills: [
      { name: "Design to live build with Claude", usedIn: ["walherb"] },
      { name: "Coordinating with development", usedIn: ["hygwell", "redfox-courier"] },
      { name: "Graphics", usedIn: ["hygwell"] },
    ],
  },
];

export const tools: readonly string[] = ["Figma, including variables", "Adobe Creative Suite", "Claude"];
