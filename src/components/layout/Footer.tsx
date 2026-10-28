import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 font-medium text-ink">
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            LinkedIn
          </a>
          {profile.resume && (
            <a href={profile.resume.path} download={profile.resume.fileName} className="hover:text-accent">
              Resume
            </a>
          )}
          <a href="#top" className="hover:text-accent">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
