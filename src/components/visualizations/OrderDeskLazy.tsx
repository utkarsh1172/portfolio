"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/Card";

/** Reserves the desk's height while its code loads, so the page doesn't jump. */
function OrderDeskSkeleton() {
  return (
    <Card className="h-[52rem] animate-pulse sm:h-[46rem] lg:h-[44rem]" aria-busy="true">
      <span className="sr-only">Loading the order desk demo</span>
    </Card>
  );
}

export const OrderDeskLazy = dynamic(() => import("./OrderDesk"), { ssr: false, loading: OrderDeskSkeleton });
