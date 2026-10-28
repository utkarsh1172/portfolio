import type { CaseStudy, WorkItem } from "@/types";

/**
 * Flagship case studies. Real UI and client data are never shown: visuals are
 * diagrams of structure and flow. Unconfirmed facts are `{{placeholders}}`.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "redfox-courier",
    title: "RedFox Courier",
    company: "Growve Logistics",
    summary:
      "An international shipping flow, from quote to pickup, designed from the backend data model and the operational workflow.",
    tags: ["Logistics", "Booking flow", "Pricing UX", "Responsive web"],
    overview: {
      role: "Product Designer: workflow, screens and states in Figma",
      timeline: "{{TIMELINE: when Abhay designed RedFox}}",
      team: "Me on design; an engineering lead who set requirements and the data model with the company owner; two developers",
      platform: "Responsive web: marketing site, booking flow and customer dashboard",
      tools: "Figma",
    },
    problem: [
      "RedFox Courier ships parcels from India to customers abroad, mostly in the USA, for individuals and for businesses. Pricing a parcel like that is not simple: the charge depends on chargeable weight, the service chosen, and duties and taxes at the destination.",
      "The booking had to collect everything operations needs to pick up and ship a parcel (who is sending it, from where, to where, what is inside, how heavy and how big) and take a payment, without turning into a customs form.",
    ],
    users: [
      "Individuals sending personal parcels abroad, often for the first time.",
      "Businesses shipping e-commerce orders, Amazon FBA stock and dropshipping orders.",
    ],
    constraints: [
      "The data model came first. The engineering lead agreed services, lanes and pricing rules with the company owner, so every field on screen had to map to something real.",
      "Price depends on chargeable weight: the higher of actual weight and volumetric weight (length × width × height ÷ 5,000), rounded up to the next half kilo.",
      "Some services have a minimum weight, and some destinations can only be priced on request.",
      "Duties and destination taxes are not always known when someone books.",
      "Verification had to work without one-time SMS codes at launch.",
    ],
    process: {
      intro:
        "I worked from requirements to data model to workflow, and only then to screens. Developers built from the Figma file.",
      diagram: {
        kind: "flow",
        title: "How the work was done",
        steps: [
          { title: "Requirements", note: "Owner and engineering lead agree services, lanes and pricing" },
          { title: "Data model", note: "Shipment record, statuses and pricing rules" },
          { title: "Workflow", note: "Verification, items, weight and size, payment, post-payment" },
          { title: "Figma", note: "Flow, screens and every state" },
          { title: "Build", note: "Developers implement from the Figma file" },
        ],
      },
    },
    decisions: [
      {
        title: "One page instead of nine",
        detail:
          "The flow began as separate pages for shipment, rates, summary, verification, shipper type, pickup, delivery, parcel and payment. The final design is one page with seven sections. Each unlocks when the one before it is complete, and finished sections stay open to edit.",
        why: "Shippers change weight or service after they see a price. On one page, a change re-prices on the spot instead of sending them back through several screens.",
      },
      {
        title: "The price stays in view",
        detail: "A live order summary sits beside every step on desktop and stays pinned to the top on mobile.",
        why: "Price is the question a shipper has the whole time. Keeping it visible shows the effect of every input as it happens.",
      },
      {
        title: "Duty terms in plain language",
        detail: "“I pay” and “Receiver pays” replace the trade terms DDP and DDU, with “I pay” as the default.",
        why: "Most individual shippers have never heard of DDP or DDU. The real choice is simply who pays the duties.",
      },
      {
        title: "Pricing that explains itself",
        detail:
          "The flow prices on chargeable weight, and a per-kilo rate ladder shows when a heavier parcel moves into a cheaper rate.",
        why: "Volumetric pricing surprises people when the price does not match what the scale says. Showing the rule up front removes the surprise.",
      },
      {
        title: "Unavailable options say why",
        detail: "Every service shows one of three states: a price, “On request”, or below the minimum weight.",
        why: "Hiding options that do not apply leaves shippers wondering what they missed. A reason tells them what would make the option available.",
      },
      {
        title: "A small fee now, the balance after pickup",
        detail: "Shippers pay a small booking fee to confirm, and the balance after the parcel is collected.",
        why: "Weight and size are confirmed at pickup. Charging the full estimate up front would mean refunds or extra charges later.",
      },
    ],
    states: [
      { label: "Below minimum weight", text: "The service stays visible but disabled, with the minimum it needs." },
      { label: "No automatic rate", text: "The service shows “On request” instead of a made-up price." },
      { label: "Duties not known yet", text: "Duties and taxes read “At checkout”, never a guess presented as fact." },
      { label: "Signed-in shippers", text: "The details step is skipped for people who are already signed in." },
      { label: "Business shippers", text: "Company fields appear only when the shipper chooses Business." },
      { label: "Changes at payment", text: "Edit links on the payment step jump straight back to the right section." },
      {
        label: "Pickup location",
        text: "A map pin marks the pickup point, with a circle showing how accurate the location is.",
      },
      {
        label: "Dashboard",
        text: "Empty (“No shipments yet”, with a link to book), loading, an error with Try again, and a banner for failed or returned shipments.",
      },
      { label: "Identity checks", text: "KYC shows its status: not started, pending or verified." },
    ],
    final: {
      intro: "The finished flow takes a shipper from the landing page to a confirmed booking, then into a dashboard.",
      diagrams: [
        {
          kind: "flow",
          title: "Booking flow",
          caption: "Seven sections on one page, then payment and confirmation.",
          steps: [
            { title: "Get a quote", note: "Landing page or a country page" },
            { title: "Basic details", note: "Route, weight, size, duty terms" },
            { title: "Choose a service", note: "Price, on request or below minimum" },
            { title: "Your details", note: "Name and phone" },
            { title: "Shipper type", note: "Individual or business" },
            { title: "Pickup", note: "Sender address and map pin" },
            { title: "Delivery", note: "Receiver address" },
            { title: "Package details", note: "Contents, value, pickup slot, handling" },
            { title: "Payment", note: "Booking fee now, balance after pickup" },
            { title: "Confirmation" },
          ],
        },
        {
          kind: "flow",
          title: "Shipment lifecycle",
          caption: "The statuses a shipper sees in the dashboard and in tracking.",
          steps: [{ title: "Pending" }, { title: "Picked up" }, { title: "In transit" }, { title: "Out for delivery" }],
          outcomes: [
            { title: "Delivered" },
            { title: "Returned", note: "Flagged for attention" },
            { title: "Failed", note: "Flagged for attention" },
          ],
        },
      ],
      built: [
        "A marketing site with 15 country pages and 8 service pages, each leading into a quote.",
        "The single-page booking flow, from quote to confirmation.",
        "A customer dashboard for shipments, tracking, KYC and settings.",
      ],
    },
    outcome: [
      "{{OUTCOME: is RedFox live, and any results such as bookings or completion rate}}",
      "Designing from the data model kept the flow honest: every field on screen maps to something operations uses, and nothing is asked twice.",
      "Pricing turned out to be a design problem as much as a maths problem. Chargeable weight, minimums and unknown duties each needed a clear state, not just a number.",
    ],
    next: [
      "Design the operations side: a verification queue, re-weighing at pickup, and settling the balance after pickup.",
      "Test the booking flow with first-time individual shippers, starting with the pricing and duty-terms steps.",
      "Finish business onboarding: company, compliance and warehouse details.",
    ],
  },
  {
    slug: "growve-design-system",
    title: "Growve Design System",
    company: "Growve Logistics",
    summary:
      "Tokens, a type scale and components in Figma variables, used to redesign Growve's operations CRM for clear workflows and consistent UI.",
    tags: ["Design system", "Figma variables", "CRM", "B2B SaaS"],
    overview: {
      role: "Product Designer: design system and CRM redesign",
      timeline: "{{TIMELINE: design system dates}}",
      team: "Me on design; Growve's engineering team built it into the product",
      platform: "Web: Growve's internal operations CRM",
      tools: "Figma, Figma variables",
    },
    problem: [
      "Growve runs a cross-border business. Orders placed on Amazon in India are bought from suppliers in the USA, flown in, cleared through customs and handed to couriers for delivery. Operations, warehouse and finance teams run all of it from an internal CRM.",
      "The CRM was built on a purchased admin template, so screens inherited the template's typeface, colours and spacing, and new features added their own variations on top. The same table, tab or action could look and behave differently from one screen to the next, in a tool the team works in all day.",
    ],
    users: [
      "Operations and warehouse teams moving orders through purchasing, shipping, customs and delivery.",
      "Finance and admin teams handling purchase orders, refunds and reports.",
    ],
    constraints: [
      "The system had to work with the template and component library already in the code, not replace them.",
      "Screens are dense: a single order row carries order, product, purchase and shipment details.",
      "Several developers build screens in parallel, so the rules had to be easy to follow without a designer in the room.",
    ],
    process: {
      intro:
        "I built the system in layers in Figma, documented it, and redesigned CRM workflows on top of it. Developers implemented each screen from the Figma file.",
      diagram: {
        kind: "flow",
        title: "How the work was done",
        steps: [
          { title: "Tokens", note: "Colour, typography and spacing as Figma variables" },
          { title: "Components", note: "Buttons, forms and tables" },
          { title: "Documentation", note: "How and when to use each part" },
          { title: "Workflow redesign", note: "CRM screens rebuilt on the system" },
          { title: "Build", note: "Developers implement from the Figma file" },
        ],
      },
    },
    decisions: [
      {
        title: "Type styles named by role",
        detail:
          "Five families (Display, Heading, Title, Body and Caption), each with numbered sizes and named weights, such as Title 1 Bold or Body 2 Regular. Body text moved from the template's 13.125 px to 14 px.",
        why: "A role name tells a designer or developer where a style belongs, and the same name works in Figma and in code. 14 px keeps dense tables readable without losing density.",
      },
      {
        title: "One brand colour, with tints derived from it",
        detail:
          "Growve blue (#3E6DF4) replaced the template's purple. Table headers, alternating rows and borders are mixed from that one colour instead of picked by hand.",
        why: "When every tint comes from one source, a brand change updates every table at once, and nothing drifts.",
      },
      {
        title: "Work organised by stage",
        detail:
          "Order lists split first by route (all, international, domestic), then into stage tabs that show how many orders wait in each.",
        why: "Each team owns a stage. Counts on the tabs show where work is piling up before anyone opens a list.",
      },
      {
        title: "One row answers four questions",
        detail:
          "Each order row groups order, product, purchase and shipment details, with an ETA chip that counts days left or days overdue, and one primary action.",
        why: "Operations can see what was ordered, where it was bought, how it is shipping and whether it is late without opening the order.",
      },
      {
        title: "States built into components",
        detail:
          "The shared table brings its own loading skeleton and empty state. Confirmation dialogs lock while an action runs, and disabled buttons explain why they are disabled.",
        why: "When states live in the component, every screen gets them, instead of each developer remembering to add them.",
      },
    ],
    states: [
      {
        label: "Empty table",
        text: "An illustration in the brand colour, with a Clear filters action when filters caused the empty result.",
      },
      { label: "Loading", text: "A skeleton that matches the table's columns and rows, so the layout does not jump." },
      { label: "Irreversible actions", text: "A confirmation dialog that cannot be dismissed while the action runs." },
      { label: "Disabled actions", text: "A tooltip says what is needed before the action becomes available." },
      {
        label: "Exceptions",
        text: "Problems get their own stage instead of a hidden flag: detained by customs, problem with order, on hold, undelivered, delayed, returned to origin.",
      },
      { label: "Late orders", text: "The ETA chip switches from days left to days overdue." },
      { label: "Status", text: "Every status chip carries a text label, so colour is never the only signal." },
    ],
    final: {
      intro: "The system is a stack of layers, and the CRM's order workflow is built on top of it.",
      diagrams: [
        {
          kind: "layers",
          title: "System structure",
          caption: "Each layer is built only from the one beneath it.",
          layers: [
            {
              title: "Foundations",
              note: "Figma variables",
              items: ["Colour", "Typography", "Spacing on a 4 px base"],
            },
            {
              title: "Semantic tokens",
              items: ["Text and surfaces", "Brand primary and tints", "Status colours", "Table colours"],
            },
            {
              title: "Components",
              items: ["Buttons and action groups", "Form fields", "Tables with built-in states", "Tabs with counts"],
            },
            { title: "Products", items: ["Growve CRM", "RedFox Courier"] },
          ],
        },
        {
          kind: "scale",
          title: "Type scale",
          caption:
            "Sizes in px, shown in this site's typeface. Each style also comes in bold, semibold, medium and regular.",
          rows: [
            { name: "Display L", size: 56, weight: 700 },
            { name: "Display M", size: 44, weight: 700 },
            { name: "Display S", size: 36, weight: 700 },
            { name: "Heading 1", size: 32, weight: 700 },
            { name: "Heading 2", size: 28, weight: 700 },
            { name: "Heading 3", size: 24, weight: 700 },
            { name: "Title 1", size: 22, weight: 600 },
            { name: "Title 2", size: 16, weight: 600 },
            { name: "Title 3", size: 14, weight: 600 },
            { name: "Body 1", size: 16, weight: 400 },
            { name: "Body 2", size: 14, weight: 400, note: "Default" },
            { name: "Body 3", size: 12, weight: 400 },
            { name: "Caption 1", size: 12, weight: 500 },
            { name: "Caption 2", size: 10, weight: 500 },
          ],
        },
        {
          kind: "flow",
          title: "International orders",
          caption: "Stage tabs in the CRM, in order.",
          steps: [
            { title: "Order accepted" },
            { title: "Vendor to supplier" },
            { title: "US hub received" },
            { title: "Shipped to India" },
            { title: "Arrived at India hub" },
          ],
        },
        {
          kind: "flow",
          title: "Domestic orders",
          caption: "From dispatch to a final outcome.",
          steps: [{ title: "Ready to dispatch" }, { title: "In transit" }],
          outcomes: [
            { title: "Delivered" },
            { title: "Undelivered" },
            { title: "Delivery delayed" },
            { title: "Returned to origin" },
            { title: "Refunded" },
          ],
        },
      ],
      built: [
        "The type scale and its names are in the CRM's code as theme tokens.",
        "Table colours are computed from the brand primary.",
        "Shared table, tabs, action group and confirmation dialog components.",
        "RedFox Courier uses the same type scale and naming.",
      ],
    },
    outcome: [
      "{{METRIC: number of components in the library}}",
      "{{METRIC: Figma variable collections and modes}}",
      "{{METRIC: CRM screens redesigned on the system}}",
      "A system pays off only once it reaches code. Sharing names between Figma and code did more for consistency than any single component.",
    ],
    next: [
      "Bring Growve's supplier app onto the same tokens and components.",
      "Replace the remaining one-off colours in screens with tokens.",
      "Add page-level error states; today most errors appear only as short toast messages.",
      "Add a darker brand blue for small text: #3E6DF4 on white is just under the 4.5:1 contrast ratio.",
    ],
  },
  {
    slug: "walherb",
    title: "Walherb",
    company: "Growve Logistics",
    summary:
      "A landing page for an import store of US wellness and baby-care brands, designed in Figma and built into a working site with Claude.",
    tags: ["E-commerce", "Landing page", "Design to build", "AI-assisted"],
    overview: {
      role: "Designer and builder: landing page in Figma, working site with Claude",
      timeline: "{{TIMELINE: Walherb dates}}",
      team: "Me, with Claude for the build",
      platform: "Responsive web",
      tools: "Figma, Claude",
    },
    problem: [
      "Walherb brings American vitamins, supplements, skincare, bath and baby care to families in India.",
      "Buying from the USA comes with familiar worries: duties at the door, slow deliveries and fakes. The landing page had to make an import store feel as safe and predictable as a local one, before anyone placed a first order.",
    ],
    users: [
      "Families in India who already trust American wellness and baby-care brands.",
      "Repeat buyers who reorder the same products every month.",
    ],
    constraints: [
      "A very large catalogue (supplements, sports, bath, beauty, baby and pets) had to be reachable from one header.",
      "Trust had to be earned on the page, before the first order.",
      "Prices include customs duties and taxes, so the number on the page is the number paid.",
    ],
    process: {
      intro: "I designed the page in Figma, then built a working site from that design with Claude.",
      diagram: {
        kind: "flow",
        title: "How the work was done",
        steps: [
          { title: "Buyer worries", note: "Duties, delivery, authenticity" },
          { title: "Page structure", note: "Each section answers one worry" },
          { title: "Figma design", note: "Landing page, header and menu" },
          { title: "Build with Claude", note: "From the Figma design to a working site" },
          { title: "Live site", note: "walherb.vercel.app" },
        ],
      },
    },
    decisions: [
      {
        title: "Lead with price certainty",
        detail:
          "The top bar says duties and taxes are included, and the hero opens with “Stop paying 3x on international shipping”.",
        why: "Hidden import charges are the first thing that stops someone buying from abroad, so the page answers it before anything else.",
      },
      {
        title: "Trust directly under the hero",
        detail:
          "Four promises sit right below the hero: straight from the source, one price with no surprises, fast tracked delivery, and a full refund if something arrives wrong or damaged.",
        why: "They answer the three big worries (duties, delivery and fakes) on the first screen, where a hesitant visitor decides whether to scroll.",
      },
      {
        title: "Three ways into the catalogue",
        detail: "The menu offers categories, brands and health goals such as immunity, sleep and energy.",
        why: "Some shoppers know the brand they want, some know the product, and some only know the problem they want to solve.",
      },
      {
        title: "Designed for the re-order",
        detail:
          "A “Why our customers come back” section covers authenticity, 30-day returns, familiar payment options (UPI, cards, net banking, wallets, no-cost EMI) and real human support.",
        why: "Supplements and baby care are bought again and again, so the second order matters as much as the first.",
      },
      {
        title: "Straight answers to import questions",
        detail: "The FAQ covers authenticity, delivery time, freshness, returns, payment methods and tracking.",
        why: "These are the questions buyers would otherwise ask support, or leave over.",
      },
    ],
    states: [
      { label: "Deep catalogue", text: "Every menu column ends in a View all link, so no category is a dead end." },
      {
        label: "Wrong or damaged orders",
        text: "The refund promise is stated before purchase, not hidden in a policy page.",
      },
      { label: "Payment preferences", text: "Familiar Indian payment options are listed up front." },
      {
        label: "After the first order",
        text: "The account menu covers orders, KYC, addresses, saved payment methods and two-step verification.",
      },
    ],
    final: {
      intro: "The page reads top to bottom as a sequence of answers.",
      diagrams: [
        {
          kind: "flow",
          title: "Page structure",
          steps: [
            { title: "Top bar", note: "Duties and taxes included" },
            { title: "Header and menu", note: "Categories, brands, health goals, deals" },
            { title: "Hero", note: "Stop paying 3x on international shipping" },
            { title: "Trust strip", note: "Source, price, delivery, refunds" },
            { title: "Trending this week" },
            { title: "Customer favourites", note: "Supplements, beauty and skincare" },
            { title: "Why customers come back" },
            { title: "FAQ" },
            { title: "Footer", note: "Support by chat, email and phone" },
          ],
        },
      ],
      built: ["A working, deployed site built from the Figma design with Claude."],
      link: { href: "https://walherb.vercel.app", label: "Visit the live site" },
    },
    outcome: [
      "{{METRIC: time from Figma design to live site}}",
      "Building the design myself with Claude meant I could check the real page at real screen sizes, and fix spacing and hierarchy that a static mock-up hides.",
    ],
    next: [
      "Test the page with parents who already buy imported supplements, and see which trust messages they notice first.",
      "Design the product page and checkout in the same visual system.",
    ],
  },
];

/** Smaller projects, shown as cards on the home page. */
export const selectedWork: readonly WorkItem[] = [
  {
    id: "veltora",
    title: "Veltora",
    company: "Growve Logistics",
    period: "In progress",
    summary: "Landing page for Veltora, a travel-bag brand.",
    tags: ["Landing page", "Visual design"],
    ongoing: true,
  },
  {
    id: "growve-website",
    title: "Growve Logistics website",
    company: "Growve Logistics",
    period: "{{PERIOD: when the Growve website was designed}}",
    summary: "The company website for Growve Logistics.",
    tags: ["Website", "Visual design"],
  },
  {
    id: "kalpins",
    title: "Dashboards and empty states",
    company: "Kalpins.co",
    period: "Oct 2024 to Sep 2025",
    summary: "Dashboards, landing pages, and dynamic loader and empty-state experiences, as the team's sole designer.",
    tags: ["Dashboards", "Landing pages", "States"],
  },
  {
    id: "hygwell",
    title: "Hygwell",
    company: "Freelance",
    period: "Apr 2024 to Aug 2024",
    summary: "Research, UI design and graphics, coordinating with development through the build.",
    tags: ["Research", "UI design", "Graphics"],
  },
  {
    id: "bombay-tone",
    title: "Fintech loan experiences",
    company: "Bombay Tone",
    period: "Jul 2023 to Apr 2024",
    summary: "Loan websites and app experiences, first as a UX intern, then as a Junior UX Designer.",
    tags: ["Fintech", "Web", "App"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
