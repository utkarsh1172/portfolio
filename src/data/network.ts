import type { Hub } from "@/types";

/** Globe network. Illustrative: regions the systems serve, not real shipping lanes. */
export const hubs: readonly Hub[] = [
  { id: "mum", name: "Mumbai", lat: 19.08, lon: 72.88, kind: "home" },
  { id: "uae", name: "UAE warehouse", lat: 25.2, lon: 55.27, kind: "warehouse" },
  { id: "usa", name: "US warehouse", lat: 39.5, lon: -98.35, kind: "warehouse" },
  { id: "del", name: "Delhi", lat: 28.61, lon: 77.21, kind: "domestic" },
  { id: "blr", name: "Bengaluru", lat: 12.97, lon: 77.59, kind: "domestic" },
  { id: "ccu", name: "Kolkata", lat: 22.57, lon: 88.36, kind: "domestic" },
];

export const routes: readonly (readonly [string, string])[] = [
  ["mum", "uae"],
  ["mum", "usa"],
  ["mum", "del"],
  ["mum", "blr"],
  ["mum", "ccu"],
];
