import type { ReactNode } from "react";

/** Section title on the left, a short lede on the right. */
export function SectionHeading({ id, title, children }: { id: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:items-end">
      <h2 id={id} className="h-section md:col-span-6">
        {title}
      </h2>
      {children && <div className="lede md:col-span-6 md:justify-self-end">{children}</div>}
    </header>
  );
}
