# Abhay Maske: Portfolio

Portfolio for Abhay Maske, Product Designer and UI/UX Designer. Three case studies (RedFox Courier, the Growve
Design System and Walherb), smaller selected work, experience, skills and contact.

Built with Next.js (App Router, fully static), React Server Components, TypeScript (strict) and Tailwind CSS v4.

## Content rules

- **Every fact comes from Abhay's resume or a confirmed answer.** Don't add metrics, tools, clients or research
  that aren't confirmed.
- **No real client UI or data.** Case-study visuals are diagrams of structure and flow, defined as data in
  `src/data/projects.ts` and drawn by `src/components/case-study/Diagram.tsx`.
- **Unconfirmed facts are placeholders:** `{{LABEL: note}}`. Components never render them (`src/lib/placeholders.ts`),
  and `npm run check` fails if one reaches a built page or script.

```bash
npm run placeholders   # list every placeholder still waiting for a fact
```

Fill one by replacing the whole `{{…}}` string with the confirmed text; the block appears on the next build.

## Quick start

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command                      | What it does                                                         |
| ---------------------------- | -------------------------------------------------------------------- |
| `npm run dev`                | Development server                                                   |
| `npm run build`              | Production build                                                     |
| `npm start`                  | Serve the production build                                           |
| `npm run typecheck`          | TypeScript, strict mode                                              |
| `npm run lint`               | ESLint (Next.js core-web-vitals + TypeScript rules)                  |
| `npm run format`             | Prettier, including Tailwind class sorting                           |
| `npm test`                   | Unit tests with Node's built-in test runner                          |
| `npm run placeholders`       | List unfilled `{{placeholders}}` in `src/data`                       |
| `npm run placeholders:built` | Fail if a placeholder reached the build output                       |
| `npm run check`              | Everything above in sequence, including the build: run before a push |

## Editing content

Everything the site says lives in `src/data/`:

| File            | Holds                                                                |
| --------------- | -------------------------------------------------------------------- |
| `profile.ts`    | Name, role, value proposition, location, email, LinkedIn, resume     |
| `projects.ts`   | The three case studies (nine-part structure) and selected-work cards |
| `experience.ts` | Roles (a role with two positions shows the promotion), education     |
| `skills.ts`     | Skill groups, each linked to the work that shows it, and tools       |
| `navigation.ts` | Header and mobile-menu sections                                      |

- **Resume:** put the PDF in `public/resume/` and set `profile.resume` to `{ path: "/resume/<file>.pdf", fileName: "<file>.pdf" }`.
  The download buttons appear in the hero, contact section and footer.
- **Email / location:** replace the placeholders in `profile.ts`; the contact rows appear automatically.

## Environment

| Variable               | Required           | Purpose                                                                           |
| ---------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Canonical URL, sitemap, robots.txt, Open Graph tags. A bad value fails the build. |

The page is static, so a change takes effect on the next deploy.

## Architecture

```text
src/
├── app/                     Routes: home, /work/[slug], OG images, sitemap, robots, 404
├── components/
│   ├── layout/              Header (glass bar, scroll spy), MobileMenu, ThemeToggle, Footer
│   ├── sections/            One file per home-page section
│   ├── case-study/          CaseStudyView (nine-part page) and Diagram
│   └── ui/                  Button, Badge, Card, Section, SectionHeading, CopyButton
├── data/                    All site content
├── hooks/                   useScrollSpy, useTheme
├── lib/                     Placeholders, theme, site config, OG image, small helpers
└── types/                   Shared content types
```

Components are server components by default. Client JavaScript is limited to the header (scroll spy, mobile menu),
the theme toggle and the copy-email button.
