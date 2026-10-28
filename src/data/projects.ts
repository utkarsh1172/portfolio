import type { CaseStudy } from "@/types";

/**
 * Case studies. All real, all from the resume. Where the resume gives no metric,
 * the outcome is stated qualitatively.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    id: "crm",
    name: "Order automation CRM",
    company: "Growve Retail and Management Services",
    period: "Sep 2025 to present",
    kind: "CRM",
    status: "In production",
    summary:
      "An internal CRM that takes 400+ Amazon orders a day from three seller accounts through to a booked shipment, with no manual processing.",
    problem:
      "Orders arrive across several Amazon seller accounts, and each one has to be purchased, procured and shipped. Handled by hand, every order is a chain of manual steps.",
    built: [
      "Order sync from three Amazon seller accounts through the Selling Partner API (SP-API), 400+ orders a day.",
      "Background workers and schedulers that raise purchase orders, procure products and book shipments on their own.",
      "Courier booking with Blue Dart and XpressBees.",
      "The PostgreSQL schema and SQL behind orders, customers, inventory and shipments.",
    ],
    flow: [
      { title: "Amazon seller accounts", note: "3 accounts, 400+ orders a day" },
      { title: "SP-API order sync", note: "Pulled into the CRM" },
      { title: "PostgreSQL", note: "Orders, customers, inventory, shipments" },
      { title: "Workers and schedulers", note: "Run the flow unattended" },
      { title: "Purchase orders and procurement" },
      { title: "Courier booking", note: "Blue Dart, XpressBees" },
    ],
    stack: ["Amazon SP-API", "Workers and schedulers", "PostgreSQL", "Blue Dart", "XpressBees"],
    roleId: "growve",
    decisions: [
      "Order processing runs in background workers and schedulers rather than waiting on a person, so purchasing and shipment booking happen as orders arrive.",
      "Every seller account syncs into one CRM, so operations sees all orders in one place.",
      "A relational PostgreSQL schema links orders, customers, inventory and shipments.",
    ],
    outcome:
      "400+ orders a day run from sync to booked shipment on their own, saving about 6 hours of manual work every day.",
  },
  {
    id: "logistics",
    name: "Logistics platform",
    company: "Growve Retail and Management Services",
    period: "Sep 2025 to present",
    kind: "Logistics",
    status: "In production",
    summary: "The company's domestic and international logistics service, built on courier partner APIs.",
    problem:
      "The business ships both within India and abroad, and needed one service to take orders in, book shipments with couriers and track them through to delivery.",
    built: [
      "Order intake, shipment booking and live tracking on top of courier partner APIs, for 5K+ shipments a month.",
      "Coverage for both domestic and international shipments.",
      "An admin panel the operations team uses to manage and process orders.",
      "The company's logistics and courier websites, including hosting, SEO, indexing and load performance.",
    ],
    flow: [
      { title: "Order intake" },
      { title: "Shipment booking", note: "Courier partner APIs" },
      { title: "Live tracking", note: "Domestic and international" },
      { title: "Operations admin panel", note: "Manage and process orders" },
    ],
    stack: ["Courier partner APIs", "Live tracking", "Admin panel"],
    roleId: "growve",
    decisions: [
      "Booking and tracking run through courier partner APIs, covering both domestic and international shipments.",
      "Operations gets its own admin panel, separate from customer-facing pages, for day-to-day order handling.",
    ],
    outcome:
      "5K+ shipments a month, domestic and international, booked and tracked through one service and run by operations from one admin panel.",
  },
  {
    id: "storefront",
    name: "Storefront and warehouse admin",
    company: "Growve Retail and Management Services",
    period: "Sep 2025 to present",
    kind: "E-commerce",
    status: "In production",
    summary: "An e-commerce storefront with an admin panel for region-wise stock across US and UAE warehouses.",
    problem:
      "Stock sits in warehouses in more than one country, so inventory has to be managed per region while customers check out on a single storefront.",
    built: [
      "The customer storefront and its admin panel.",
      "Region-wise stock and inventory management for 1M+ SKUs across warehouses in the US and UAE.",
      "Razorpay payment integration.",
    ],
    flow: [
      { title: "Storefront", note: "Customer checkout" },
      { title: "Razorpay", note: "Payments" },
      { title: "Region-wise inventory", note: "1M+ SKUs, US and UAE" },
      { title: "Admin panel", note: "Stock per region" },
    ],
    stack: ["Razorpay", "Region-wise inventory"],
    roleId: "growve",
    decisions: [
      "Inventory is tracked per region, so stock in the US and UAE warehouses is managed separately from one panel.",
    ],
    outcome:
      "Admins manage stock for 1M+ SKUs per warehouse region from one panel, and customers pay through Razorpay.",
  },
  {
    id: "gateway",
    name: "API gateway",
    company: "Growve Retail and Management Services",
    period: "Sep 2025 to present",
    kind: "Integration",
    status: "In production",
    summary:
      "A gateway that carries storefront orders into the CRM and moves data between internal systems and third parties.",
    problem:
      "The storefront, the CRM and outside services each hold part of an order's story. Without a single path between them, data has to be moved by hand.",
    built: [
      "A gateway that brings storefront orders into the CRM.",
      "End-to-end data transfer between internal systems and third-party services.",
    ],
    flow: [
      { title: "Storefront orders" },
      { title: "API gateway", note: "One path between systems" },
      { title: "Order automation CRM" },
      { title: "Third-party services" },
    ],
    stack: ["API gateway", "Third-party integrations"],
    roleId: "growve",
    decisions: [
      "One gateway handles data transfer between internal systems and third-party services, so storefront orders reach the CRM through a single path.",
    ],
    outcome: "Storefront orders reach the CRM without manual transfer.",
  },
  {
    id: "linky",
    name: "Linky Pro app and web portal",
    company: "ACE International",
    period: "Jan 2024 to Jul 2025",
    kind: "Mobile",
    status: "Shipped",
    summary: "Features for the Linky Pro React Native app, kept in sync with its web portal.",
    problem:
      "Users work across the mobile app and the web portal, so their data has to match on both, and the app needed to load faster.",
    built: [
      "Visitor registry, tap to pay, social media and function booking in the Linky Pro React Native app, connected to backend APIs to load and display user data.",
      "Server-side work on those integrations.",
      "App-to-portal sync so user data stays consistent between mobile and web.",
      "Contributions to the company website, focused on user data management.",
    ],
    flow: [
      { title: "React Native app" },
      { title: "Backend APIs", note: "User data" },
      { title: "Web portal", note: "Kept in sync" },
    ],
    stack: ["React Native", "Backend APIs"],
    roleId: "ace",
    decisions: [
      "Reworked how the app fetched and handled data: API response caching, pagination and lazy loading, removing duplicate API calls and FlatList optimization.",
    ],
    outcome: "Faster app load times and better responsiveness, with user data in sync across mobile and web.",
  },
  {
    id: "fitness",
    name: "Fitness apps for AT&T and SportzVillage",
    company: "Fxgetactive",
    period: "Oct 2022 to Dec 2023",
    kind: "Mobile",
    status: "Shipped",
    summary: "React Native fitness apps (TinyBitsApp, ActiveKids, TinyBits) for enterprise clients.",
    problem:
      "Workout tracking had to be accurate, connect to the fitness services people already use, and live in a codebase the team could maintain.",
    built: [
      "React Native apps for clients including AT&T and SportzVillage.",
      "Posture detection with ML Kit to make workout tracking more accurate.",
      "Strava and Google Fit integrations.",
      "Leaderboards, player streams, authentication and authorization with PlayFab.",
      "Backend services in Nest.js, MySQL and C#, and the FitzActive website.",
    ],
    flow: [
      { title: "React Native apps" },
      { title: "ML Kit", note: "Posture detection" },
      { title: "Strava and Google Fit" },
      { title: "PlayFab", note: "Leaderboards, auth" },
      { title: "Nest.js and MySQL", note: "Backend services" },
    ],
    stack: ["React Native", "ML Kit", "Strava", "Google Fit", "PlayFab", "Nest.js", "MySQL", "C#"],
    roleId: "fxgetactive",
    decisions: ["Broke a monolithic codebase into modules that were easier to maintain."],
    outcome: "Shipped fitness apps for enterprise clients with more accurate, posture-aware workout tracking.",
  },
];
