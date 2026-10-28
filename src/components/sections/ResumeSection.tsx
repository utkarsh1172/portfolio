import { ArrowUpRight, CodeXml, Download, Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { getFeaturedRepos } from "@/lib/github";

export async function ResumeSection() {
  const { github, linkedin } = profile.links;
  const repos = await getFeaturedRepos();

  return (
    <Section id="resume">
      <SectionHeading id="resume-heading" title="Resume and code">
        The full resume as a PDF, plus where to find me and my code.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="relative overflow-hidden lg:col-span-7">
          <div className="p-6 sm:p-8">
            <p className="display text-[2.2rem]">{profile.name}</p>
            <p className="text-muted">Full-stack developer: Next.js, Node.js, React Native, PostgreSQL</p>
            <div className="mt-6 space-y-4">
              {experience.map((r) => (
                <div key={r.id} className="grid grid-cols-[1fr_auto] gap-x-4 border-t border-line pt-3">
                  <p className="font-semi font-semibold">{r.title}</p>
                  <p className="text-sm text-muted tabular-nums">
                    {r.start} to {r.end}
                  </p>
                  <p className="col-span-2 text-sm text-muted">{r.company}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-line bg-bg-2 px-6 py-4 sm:px-8">
            <ButtonLink href={profile.resume.path} download={profile.resume.fileName} variant="primary">
              <Download size={18} aria-hidden /> Download resume (PDF)
            </ButtonLink>
          </div>
        </Card>

        <Card className="flex flex-col p-6 sm:p-8 lg:col-span-5">
          <CodeXml size={28} className="text-accent" aria-hidden />
          <h3 className="display mt-4 text-[2.2rem]">Code</h3>
          {github ? (
            <>
              <p className="mt-2 text-muted">
                My production work lives in private company repositories, so GitHub shows side projects. I&rsquo;m glad
                to walk through the architecture of the systems above in an interview.
              </p>
              {repos.length > 0 && (
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {repos.map((r) => (
                    <li key={r.name} className="py-3">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 font-semi font-semibold hover:text-accent"
                      >
                        {r.name} <ArrowUpRight size={16} className="nudge-r" aria-hidden />
                      </a>
                      {r.description && <p className="mt-0.5 text-sm text-muted">{r.description}</p>}
                      <p className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
                        {r.language && <span>{r.language}</span>}
                        {r.topics.slice(0, 4).map((t) => (
                          <span key={t}>{t}</span>
                        ))}
                        {r.homepage && (
                          <a
                            href={r.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                          >
                            Live demo
                          </a>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-6">
                <ButtonLink href={github} target="_blank" rel="noopener noreferrer" variant="primary">
                  View GitHub <ArrowUpRight size={18} className="nudge-r" aria-hidden />
                </ButtonLink>
              </div>
            </>
          ) : (
            <>
              <p className="mt-2 text-muted">
                My production work lives in private company repositories. I&rsquo;m glad to walk through architecture
                and code from these systems in an interview, within what my employers allow.
              </p>
              <div className="mt-auto pt-6">
                <ButtonLink href={`mailto:${profile.email}?subject=${encodeURIComponent("Code walkthrough request")}`}>
                  <Mail size={18} aria-hidden /> Request a code walkthrough
                </ButtonLink>
              </div>
            </>
          )}
          {linkedin && (
            <ButtonLink
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="quiet"
              className="mt-3 self-start"
            >
              Connect on LinkedIn <ArrowUpRight size={18} className="nudge-r" aria-hidden />
            </ButtonLink>
          )}
        </Card>
      </div>
    </Section>
  );
}
