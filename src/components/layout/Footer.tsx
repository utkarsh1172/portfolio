import { LAST_UPDATED, profile } from "@/data/profile";

export function Footer() {
  const { github, linkedin } = profile.links;
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:px-8">
        <p>
          {profile.name}, {new Date().getFullYear()}. Built with Next.js, TypeScript, Tailwind CSS and Motion. Last
          updated {LAST_UPDATED}.
        </p>
        <nav
          aria-label="Elsewhere"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 font-semi font-semibold text-ink"
        >
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              GitHub
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              LinkedIn
            </a>
          )}
          <a href={profile.resume.path} download={profile.resume.fileName} className="hover:text-accent">
            Resume
          </a>
          <a href="#top" className="hover:text-accent">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
