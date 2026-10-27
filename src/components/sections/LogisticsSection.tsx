import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrderDeskLazy } from "@/components/visualizations/OrderDeskLazy";

/** The interactive order desk: the only simulated content on the site, labelled as such. */
export function LogisticsSection() {
  return (
    <Section id="demo">
      <SectionHeading id="demo-heading" title="Order desk, a working demo">
        A small simulation I built for this portfolio. It runs the same order flow as the CRM I built at Growve, using
        made-up orders generated in your browser. It is not production code and holds no real data.
      </SectionHeading>
      <OrderDeskLazy />
    </Section>
  );
}
