import type { ReactNode } from "react";

/** Eyebrow and title on the left, a short lede on the right. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-12 grid gap-5 md:mb-16 md:grid-cols-12 md:items-end" data-reveal>
      <div className="md:col-span-7">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 id={id} className="h-section">
          {title}
        </h2>
      </div>
      {children && <div className="lede md:col-span-5 md:justify-self-end">{children}</div>}
    </header>
  );
}
