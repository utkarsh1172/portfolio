import { caseStudies, getCaseStudy } from "@/data/projects";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  return ogImage({
    eyebrow: `Case study · ${study?.company ?? ""}`,
    title: study?.title ?? "Case study",
    body: study?.summary ?? "",
  });
}
