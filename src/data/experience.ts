import type { Certification, Education, JourneyStop, Role } from "@/types";

export const experience: readonly Role[] = [
  {
    id: "growve",
    title: "Senior Software Developer",
    company: "Growve Retail and Management Services Pvt. Ltd.",
    start: "Sep 2025",
    end: "Present",
    current: true,
    stack: "Next.js, Node.js, Express.js, Fastify, PostgreSQL, Firebase / Firestore",
    points: [
      {
        label: "Order automation CRM",
        text: "Syncs 400+ orders a day from three Amazon seller accounts via SP-API; background workers and schedulers raise purchase orders, procure products and book Blue Dart and XpressBees shipments, saving about 6 hours of manual work a day.",
      },
      {
        label: "Logistics platform",
        text: "Domestic and international logistics service on courier partner APIs: order intake, shipment booking and live tracking for 5K+ shipments a month, plus an operations admin panel.",
      },
      {
        label: "Storefront and warehouse admin",
        text: "Storefront plus admin for region-wise stock across US and UAE warehouses (1M+ SKUs), with Razorpay payments.",
      },
      {
        label: "API gateway",
        text: "Brings storefront orders into the CRM and handles data transfer between internal systems and third-party services.",
      },
      {
        label: "Database design",
        text: "PostgreSQL schema and complex SQL for orders, customers, inventory and shipments.",
      },
      {
        label: "Websites and SEO",
        text: "Built and deployed the company's logistics, courier and business websites; manage production hosting, SEO, indexing and load performance.",
      },
      {
        label: "Team",
        text: "Plan and assign tasks for a team of 5 developers, review code and help other developers, working closely with product and operations.",
      },
    ],
  },
  {
    id: "ace",
    title: "React Native Developer",
    company: "ACE International",
    start: "Jan 2024",
    end: "Jul 2025",
    points: [
      {
        label: "Linky Pro app",
        text: "Built visitor registry, tap to pay, social media and function booking, connected the app to backend APIs for user data, and worked on the server side of those integrations.",
      },
      {
        label: "Linky Pro web portal",
        text: "Kept user data in sync between mobile and web; contributed to the company website with a focus on user data management.",
      },
      {
        label: "Performance",
        text: "Improved load time and responsiveness with API response caching, pagination and lazy loading, fewer duplicate API calls and FlatList optimization.",
      },
    ],
  },
  {
    id: "fxgetactive",
    title: "Software Developer",
    company: "Fxgetactive",
    start: "Oct 2022",
    end: "Dec 2023",
    points: [
      {
        label: "Fitness apps",
        text: "React Native apps (TinyBitsApp, ActiveKids, TinyBits) for clients including AT&T and SportzVillage, with ML Kit posture detection, Strava and Google Fit, and a monolith split into modules.",
      },
      {
        label: "Backend and web",
        text: "Backend services in Nest.js, MySQL and C#; the FitzActive website; leaderboards, player streams and auth with PlayFab.",
      },
      {
        label: "Kiosk game",
        text: "Improved microcontroller software for a kiosk game and demoed it at the Renewable Energy Expo, Delhi.",
      },
    ],
  },
];

export const journey: readonly JourneyStop[] = [
  { year: "2019", title: "B.Com, Mumbai University", note: "Jai Bharat College" },
  { year: "2021", title: "Full Stack Development", note: "Newton School" },
  { year: "2022", title: "Software Developer", note: "Fxgetactive" },
  { year: "2024", title: "React Native Developer", note: "ACE International" },
  { year: "2025", title: "Senior Software Developer", note: "Growve" },
];

export const achievements: readonly string[] = [
  "Built an order automation CRM that removed manual order processing for a cross-border retail business.",
  "Delivered React Native fitness apps for enterprise clients including AT&T and SportzVillage.",
  "Plan and assign tasks, review code and help other developers at Growve.",
  "Demoed a kiosk game at the Renewable Energy Expo, Delhi.",
];

export const education: readonly Education[] = [
  { title: "Full Stack Development", org: "Newton School", period: "Oct 2021 to Aug 2022" },
  { title: "B.Com", org: "Jai Bharat College, Mumbai University", period: "2019 to 2021, CGPA 7.0" },
];

export const certifications: readonly Certification[] = [
  { title: "Full Stack Web Development", org: "Newton School", year: "2022" },
  { title: "Responsive Web Design", org: "freeCodeCamp" },
  { title: "Back End Development and APIs", org: "freeCodeCamp" },
  { title: "Object Detection and Recognition with TensorFlow", org: "Udemy" },
];
