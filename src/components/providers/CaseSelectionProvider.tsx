"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { CaseStudyId } from "@/types";
import { scrollToSection } from "@/lib/scroll";

interface CaseSelection {
  caseId: CaseStudyId;
  /** Selects a case study, optionally scrolling the Work section into view. */
  openCase: (id: CaseStudyId, scroll?: boolean) => void;
}

const CaseSelectionContext = createContext<CaseSelection | null>(null);

/** Lets the pipeline and skills map open a case study in the Work section. */
export function CaseSelectionProvider({ children }: { children: ReactNode }) {
  const [caseId, setCaseId] = useState<CaseStudyId>("crm");
  const openCase = useCallback((id: CaseStudyId, scroll = true) => {
    setCaseId(id);
    if (scroll) requestAnimationFrame(() => scrollToSection("work"));
  }, []);
  const value = useMemo(() => ({ caseId, openCase }), [caseId, openCase]);
  return <CaseSelectionContext.Provider value={value}>{children}</CaseSelectionContext.Provider>;
}

export function useCaseSelection(): CaseSelection {
  const ctx = useContext(CaseSelectionContext);
  if (!ctx) throw new Error("useCaseSelection must be used inside <CaseSelectionProvider>.");
  return ctx;
}
