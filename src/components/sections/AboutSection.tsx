import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { GlobeLazy } from "@/components/visualizations/GlobeLazy";
import { profile } from "@/data/profile";

const strengths = [
  {
    title: "Automating the order lifecycle",
    text: "Background workers and schedulers that carry an order from marketplace sync to a booked shipment without manual steps.",
  },
  {
    title: "Integrating the outside world",
    text: "Amazon SP-API, Blue Dart, XpressBees and Razorpay at Growve; PlayFab, Strava, Google Fit and ML Kit before that.",
  },
  {
    title: "Owning the data model",
    text: "PostgreSQL schemas and complex SQL for orders, customers, inventory and shipments, plus an API gateway between systems.",
  },
  {
    title: "Shipping on web and mobile",
    text: "Next.js storefronts, admin panels and company websites, and React Native apps for enterprise clients.",
  },
];

const facts: [string, string][] = [
  ["Based in", profile.location],
  ["Now", `${profile.role}, Growve Retail and Management Services`],
  ["Before", "ACE International, Fxgetactive"],
  ["Focus", "Order automation, logistics, CRM and e-commerce"],
  ["Education", "Full Stack Development, Newton School; B.Com, Mumbai University"],
  ["Looking for", profile.seeking],
];

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="about-heading" className="h-section max-w-[16ch]">
            I start from how the business moves.
          </h2>
          <div className="mt-8 max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed">
            <p>
              I came to engineering through a commerce degree and the full-stack programme at Newton School. That shapes
              how I work: before I design a schema or an API, I trace the real flow. An order arrives, stock is checked,
              someone buys the product, a courier picks it up, a customer waits for it.
            </p>
            <p>
              I&rsquo;ve shipped React Native apps for enterprise clients like AT&amp;T and SportzVillage, kept mobile
              and web data in sync at ACE International, and now build the order, logistics and storefront systems at
              Growve, including the workers and schedulers that process orders with no one in the loop.
            </p>
            <p className="text-muted">
              Day to day I also plan and assign work, review code and help other developers, working closely with
              product and operations.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5" aria-label="Quick facts">
          <Card as="dl" className="divide-y divide-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-4">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="leading-snug font-medium">{v}</dd>
              </div>
            ))}
          </Card>
        </aside>
      </div>

      <ul className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {strengths.map((s) => (
          <li key={s.title} className="border-t-2 border-ink/80 pt-4">
            <h3 className="font-semi text-[1.15rem] leading-snug font-semibold">{s.title}</h3>
            <p className="mt-2 text-[0.98rem] text-muted">{s.text}</p>
          </li>
        ))}
      </ul>

      <figure className="mt-20 grid items-center gap-8 border-t border-line pt-12 md:grid-cols-12">
        <div className="mx-auto w-full max-w-[28rem] md:col-span-6 md:max-w-none lg:col-span-5">
          <GlobeLazy />
        </div>
        <figcaption className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <p className="h-section max-w-[14ch]">Where the orders go.</p>
          <p className="lede mt-5">
            The systems I build at Growve serve warehouses in the United States and the UAE and ship across India, all
            run from Mumbai. Lanes are illustrative. Drag the globe to rotate it.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.98rem] text-muted">
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden /> Mumbai, home base
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber" aria-hidden /> Warehouse regions
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal" aria-hidden /> Domestic lanes
            </li>
          </ul>
        </figcaption>
      </figure>
    </Section>
  );
}
