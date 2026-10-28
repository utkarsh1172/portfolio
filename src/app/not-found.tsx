import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-dvh max-w-page flex-col justify-center px-4 py-24 sm:px-8">
      <p className="eyebrow">Error 404</p>
      <h1 className="display mt-4 text-[clamp(2.75rem,8vw,5.5rem)]">
        This page <span className="serif-accent">isn&rsquo;t in the flow.</span>
      </h1>
      <p className="lede mt-6">The page you were looking for doesn&rsquo;t exist or has moved.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className={buttonClasses("primary")}>
          Back to the homepage
        </Link>
        <Link href="/#work" className={buttonClasses("ghost")}>
          See the case studies
        </Link>
      </div>
    </main>
  );
}
