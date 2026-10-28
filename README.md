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
| `npm run contrast`           | WCAG AA check of every text colour on every surface, both themes     |
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
│   ├── layout/              Header (glass bar, scroll spy), MobileMenu, ThemeToggle, Footer, Effects
│   ├── sections/            One file per home-page section
│   ├── case-study/          CaseStudyView (nine-part page) and Diagram
│   └── ui/                  Button, Badge, Card, Section, SectionHeading, CopyButton
├── data/                    All site content
├── hooks/                   useScrollSpy, useTheme
├── lib/                     Placeholders, theme, site config, OG image, small helpers
└── types/                   Shared content types
```

Components are server components by default. Client JavaScript is limited to the header (scroll spy, mobile menu),
the theme toggle, the copy-email button and `Effects` (scroll reveal and card sheen).

## Visual system

- **Tokens:** every colour is a CSS custom property in `src/app/globals.css`, stored as RGB channels so Tailwind can
  apply opacity. Dark is the default; `[data-theme="light"]` overrides. One accent colour.
- **Glass** (`.glass`): tinted translucent fill, `backdrop-filter: blur(20px) saturate(140%)`, hairline border, inset
  top highlight, soft shadow. Used for the nav, cards, meta panels and the contact card. Long-form text sits on
  `.solid` instead. The tint caps how bright the background can get under text, which is what keeps it readable.
- **Background:** two slow accent blooms (transform-only animation) and an SVG grain layer, fixed behind content.
- **Fallbacks:** no `backdrop-filter` support → solid surfaces. `prefers-reduced-transparency` → solid surfaces and
  no blooms. `prefers-reduced-motion` → no blooms, no movement, nothing waits on scroll. Phones blur only the nav bar
  (12px) because `backdrop-filter` is expensive on low-end GPUs.
- **Type:** Geist (variable) with Instrument Serif italic accents, self-hosted under the OFL (`src/fonts/OFL-*.txt`),
  with size-adjusted fallbacks so the swap doesn't shift layout.
- **Motion:** 150–300 ms. Scroll reveal only hides content once JavaScript has run, and shows anything already on
  screen immediately. The hero headline and lede move but never fade, so they count for Largest Contentful Paint.

## Accessibility

- `npm run contrast` fails the build below WCAG AA (4.5:1) for any text colour on any surface in either theme,
  including text on glass over the brightest point of the background.
- Skip link to `<main>`, visible focus on everything (a focused case-study link outlines its whole card), semantic
  landmarks and headings, one `h1` per page.
- Mobile menu is a modal dialog: focus moves in, Tab is trapped, Escape closes it and focus returns to the button.
- Diagrams are real lists and figures with captions, so they read correctly without the visuals.

## Performance

Lighthouse 12 against the production build (`next start`), October 2026. Lab numbers, not field data:

| Page                   | Device  | Performance | Accessibility | Best Practices | SEO |
| ---------------------- | ------- | ----------- | ------------- | -------------- | --- |
| `/`                    | Mobile  | 97          | 100           | 100            | 100 |
| `/`                    | Desktop | 100         | 100           | 100            | 100 |
| `/work/redfox-courier` | Mobile  | 97          | 100           | 100            | 100 |
| `/work/redfox-courier` | Desktop | 100         | 100           | 100            | 100 |

CLS is 0 on every page. Mobile LCP is about 2.4–2.6 s under Lighthouse's simulated slow 4G (0.5 s on desktop); most of
it is the stylesheet request. Inlining the CSS (`experimental.inlineCss`) was tried and dropped: it more than doubled the HTML
transfer for a gain within run-to-run noise.
