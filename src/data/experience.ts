import type { Certification, Education, Role } from "@/types";

export const experience: readonly Role[] = [
  {
    id: "growve",
    company: "Growve Logistics",
    positions: [{ title: "Product Experience Designer", start: "Oct 2025", end: "Present" }],
    current: true,
    points: [
      "Designed RedFox Courier's shipping workflow end to end from the backend data model and operational workflow: customer and shipment flows, verification, item details, weight and dimensions, payment and post-payment stages.",
      "Designed RedFox's landing page and lead-generation flow.",
      "Redesigned Growve's internal CRM for workflow structure and UI consistency.",
      "Built the Growve Design System: colour and design tokens, typography, spacing, Figma variables, components (buttons, forms, tables) and documentation.",
      "Designed the Walherb e-commerce landing page and built a working site from the design with Claude.",
      "Designed the Growve Logistics website; designing the Veltora travel-bag landing page.",
    ],
  },
  {
    id: "kalpins",
    company: "Kalpins.co",
    positions: [{ title: "UI/UX Designer", start: "Oct 2024", end: "Sep 2025" }],
    points: [
      "Sole designer on the team.",
      "Designed dashboards, landing pages, and dynamic loader and empty-state experiences.",
    ],
  },
  {
    id: "hygwell",
    company: "Hygwell",
    positions: [{ title: "Product Designer, Freelance", start: "Apr 2024", end: "Aug 2024" }],
    points: ["Research, UI design and graphics.", "Coordinated with development through the build."],
  },
  {
    id: "bombay-tone",
    company: "Bombay Tone",
    positions: [
      { title: "Junior UX Designer", start: "Dec 2023", end: "Apr 2024" },
      { title: "UX Designer Intern", start: "Jul 2023", end: "Nov 2023" },
    ],
    points: ["Designed fintech loan websites and app experiences."],
  },
];

export const education: readonly Education[] = [
  { title: "B.Sc. Information Technology", org: "Kirti M. Doongursee College, Dadar", period: "2020 to 2023" },
];

export const certifications: readonly Certification[] = [
  { title: "Google UX Design Professional Certificate", org: "Google" },
];
