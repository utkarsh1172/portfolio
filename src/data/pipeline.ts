import type { PipelineStage } from "@/types";

/** The order-to-doorstep flow automated by the Growve systems, stage by stage. */
export const pipeline: readonly PipelineStage[] = [
  {
    id: "sync",
    label: "Order synced",
    system: "Order automation CRM",
    caseId: "crm",
    detail: "Customer orders are pulled from multiple Amazon seller accounts through the Selling Partner API.",
  },
  {
    id: "po",
    label: "Purchase order raised",
    system: "Order automation CRM",
    caseId: "crm",
    detail: "Background workers raise the purchase order for each synced order, with no one keying it in.",
  },
  {
    id: "procure",
    label: "Procured",
    system: "Order automation CRM",
    caseId: "crm",
    detail: "Schedulers move procurement forward on their own so the order is ready to ship.",
  },
  {
    id: "book",
    label: "Shipment booked",
    system: "CRM and logistics platform",
    caseId: "logistics",
    detail: "Shipments are booked through courier partner APIs, including Blue Dart and XpressBees.",
  },
  {
    id: "transit",
    label: "In transit",
    system: "Logistics platform",
    caseId: "logistics",
    detail: "Live tracking follows each shipment, domestic and international.",
  },
  {
    id: "delivered",
    label: "Delivered",
    system: "Logistics platform",
    caseId: "logistics",
    detail: "The operations team manages and closes out orders from the admin panel.",
  },
];
