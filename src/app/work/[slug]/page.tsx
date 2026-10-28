import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { caseStudies, getCaseStudy } from "@/data/projects";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  const title = `${study.title} case study`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${study.slug}`,
      title,
      description: study.summary,
      authors: [profile.name],
    },
    twitter: { card: "summary_large_image", title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    headline: `${study.title} case study`,
    description: study.summary,
    url: `${siteUrl}/work/${study.slug}`,
    keywords: study.tags.join(", "),
    author: { "@type": "Person", name: profile.name, url: siteUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Header name={profile.name} />
      <main id="main">
        <CaseStudyView study={study} />
      </main>
      <Footer />
    </>
  );
}
