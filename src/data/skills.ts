import type { SkillGroup } from "@/types";

/** Skills grouped by where each tool sits in a commerce system. */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: "integrations",
    title: "Marketplaces, carriers and payments",
    blurb: "The outside systems an order touches.",
    skills: [
      { name: "Amazon SP-API", usedIn: ["crm"] },
      { name: "Blue Dart", usedIn: ["crm", "logistics"] },
      { name: "XpressBees", usedIn: ["crm", "logistics"] },
      { name: "Razorpay", usedIn: ["storefront"] },
      { name: "Amazon SQS", usedIn: ["growve"] },
      { name: "AWS S3", usedIn: ["growve"] },
      { name: "PlayFab", usedIn: ["fitness"] },
      { name: "Strava", usedIn: ["fitness"] },
      { name: "Google Fit", usedIn: ["fitness"] },
      { name: "ML Kit", usedIn: ["fitness"] },
    ],
  },
  {
    id: "backend",
    title: "Services and automation",
    blurb: "APIs, gateways, workers and schedulers.",
    skills: [
      { name: "Node.js", usedIn: ["growve"] },
      { name: "Express.js", usedIn: ["growve"] },
      { name: "Fastify", usedIn: ["growve"] },
      { name: "Nest.js", usedIn: ["fitness"] },
      { name: "REST APIs", usedIn: ["growve", "linky"] },
      { name: "Workers, schedulers and cron jobs", usedIn: ["crm"] },
      { name: "Firebase / Firestore", usedIn: ["growve"] },
      { name: "C#", usedIn: ["fitness"] },
    ],
  },
  {
    id: "data",
    title: "Data",
    blurb: "Schemas for orders, customers, inventory and shipments.",
    skills: [
      { name: "PostgreSQL", usedIn: ["crm", "growve"] },
      { name: "MySQL", usedIn: ["fitness"] },
      { name: "MongoDB" },
    ],
  },
  {
    id: "frontend",
    title: "Web and mobile",
    blurb: "Storefronts, admin panels and apps.",
    skills: [
      { name: "Next.js", usedIn: ["growve"] },
      { name: "React.js" },
      { name: "React Native", usedIn: ["linky", "fitness"] },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "Redux" },
      { name: "HTML5 and CSS3" },
    ],
  },
  {
    id: "tools",
    title: "Tools and practice",
    blurb: "How the work gets shipped.",
    skills: [
      { name: "Git and GitHub" },
      { name: "Postman" },
      { name: "Android Studio" },
      { name: "Xcode" },
      { name: "VPS deployment", usedIn: ["growve"] },
      { name: "Google Search Console and Analytics", usedIn: ["logistics"] },
      { name: "Agile / Scrum" },
    ],
  },
];
