# Utkarsh Kamble — Portfolio

Personal portfolio for a full-stack engineer working on logistics, e-commerce and CRM platforms.
Built with Next.js (App Router), React Server Components, TypeScript (strict), Tailwind CSS v4 and Motion.

Every fact on the site comes from the resume. The order desk demo is the only simulated content and is
labelled as such in the UI.

## Quick start

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command             | What it does                                           |
| ------------------- | ------------------------------------------------------ |
| `npm run dev`       | Development server                                     |
| `npm run build`     | Production build                                       |
| `npm start`         | Serve the production build                             |
| `npm run typecheck` | TypeScript, strict mode                                |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)    |
| `npm run format`    | Prettier, including Tailwind class sorting             |
| `npm test`          | Unit tests with Node's built-in test runner            |
| `npm run check`     | All of the above in sequence: run before every push    |
| `npm run land-dots` | Regenerate the globe's land-point data (rarely needed) |

## Environment variables

Copy `.env.example` to `.env.local`. All variables are validated with Zod.

| Variable                               | Required           | Purpose                                                                           |
| -------------------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | Yes, in production | Canonical URL, sitemap, robots.txt, Open Graph tags. A bad value fails the build. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No                 | Google Search Console HTML-tag verification token.                                |
| `RESEND_API_KEY`                       | No                 | Enables email delivery for the contact form through [Resend](https://resend.com). |
| `CONTACT_FROM_EMAIL`                   | With Resend        | Sender, on a domain verified in Resend, e.g. `Portfolio <hi@your-domain.com>`.    |
| `CONTACT_TO_EMAIL`                     | No                 | Where messages go. Defaults to the email in `src/data/profile.ts`.                |

**Contact form behaviour.** Without `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`, the form opens the visitor's
email app with the message pre-filled. With both set, it sends through a server action: validated on the
client and again on the server with the same Zod schema, protected by a honeypot field, with a 10-second
timeout and a clear fallback message if delivery fails. The page is static, so changing these variables
takes effect on the next deploy.

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository. Vercel detects Next.js; no build
   settings are needed.
3. Under **Environment Variables**, add `NEXT_PUBLIC_SITE_URL` (your production URL) and, optionally, the
   Resend variables.
4. Deploy. Add your custom domain under **Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` to match
   and redeploy.

The home page is statically prerendered and revalidated daily, so "years of experience" updates itself.

## Google Search setup

The site emits a canonical URL, crawl directives, Open Graph metadata, a generated `/robots.txt`, a generated
`/sitemap.xml`, and JSON-LD describing the site as Utkarsh's profile page. After deploying SEO changes:

1. Keep one permanent production URL. A short custom domain is preferable; set that exact HTTPS URL in
   `NEXT_PUBLIC_SITE_URL` and redeploy so the canonical, sitemap and structured data all agree.
2. Add the production site to Google Search Console. Choose HTML-tag verification, copy only the token inside
   the tag's `content` attribute into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, and redeploy before verifying.
3. Submit `https://your-domain.com/sitemap.xml` in Search Console.
4. Inspect the home-page URL and request indexing. Repeat this only after meaningful content changes.
5. Link to the portfolio from LinkedIn and GitHub using the same name, role and production URL. These external
   identity signals help Google distinguish this Utkarsh Kamble from people with the same name.

Search ranking is not guaranteed by metadata alone. Keep the portfolio public, fast and current, and earn
relevant links to it rather than using repetitive keywords or artificial backlink schemes.

## Architecture

```text
src/
├── app/                     Routes and route-level files
│   ├── layout.tsx           Fonts, metadata, JSON-LD, theme script, skip link
│   ├── page.tsx             Composes the sections (server component)
│   ├── actions/contact.ts   Server action: validate + deliver contact messages
│   ├── loading.tsx, not-found.tsx, robots.ts, sitemap.ts, opengraph-image.tsx, icon.svg
│   └── globals.css          Design tokens (CSS variables) + Tailwind v4 theme
├── components/
│   ├── layout/              Header (route nav, scroll spy), MobileMenu, ThemeToggle, Footer, Effects
│   ├── sections/            One file per page section, plus RoleList and ContactForm
│   ├── visualizations/      Globe, OrderPipeline, FlowDiagram, OrderDesk + lazy wrappers
│   ├── providers/           CaseSelectionProvider (cross-section "open this case study")
│   └── ui/                  Button, Badge, Card, Section, SectionHeading, CopyButton
├── data/                    All site content: profile, projects, experience, skills, navigation…
├── hooks/                   useScrollSpy, useInView, useTheme
├── lib/                     Pure logic: order simulation, contact schema, env, scroll, theme
└── types/                   Shared content types
```

**Server and client boundaries.** Components are server components by default. Client components are
limited to what is genuinely interactive: the header, the case-study browser, the skills map, the role
accordion, the contact form and the visualisations. Static sections (hero, about, experience shell, resume,
contact details, footer) ship no component JavaScript.

**Content is separate from UI.** Everything the site says lives in `src/data/`. Types in `src/types/` make
mistakes fail the build: for example, a skill's `usedIn` must reference a real case-study or role id.

**Logic is separate from views.** The order desk simulation (`lib/order-simulation.ts`) is a pure reducer
with injectable randomness and time, so it is unit-tested deterministically. The component is a thin view.

### Editing content

- **Links:** fill `links.github` / `links.linkedin` in `src/data/profile.ts`; the buttons appear automatically.
- **Metrics:** update a project's `outcome` in `src/data/projects.ts`.
- **Resume:** replace `public/resume/Utkarsh_Kamble_Resume.pdf` (keep the file name, or update `profile.resume`).
- **Experience start date:** `CAREER_START` in `src/data/profile.ts`.
- **"Learning now" and "Last updated":** `LEARNING` and `LAST_UPDATED` in `src/data/profile.ts`.

## Performance

- The hero headline (the LCP element) renders from server HTML with a CSS-only entrance animation, so it
  never waits for JavaScript.
- The globe and the order desk load after the critical path via `next/dynamic`, with
  same-size placeholders so nothing shifts.
- Fonts (Inter, Space Grotesk, Manrope) come from Google Fonts through `next/font/google`, which downloads
  them at build time and serves them from this site: no third-party requests, no layout shift on swap.
- The contact schema uses `zod/mini` so validation adds only a few KB to the browser bundle.
- The introduction plays once and has a replay control. Both canvas scenes pause when hidden; the order desk runs only when started;
  both pause work offscreen and in hidden tabs.
- Glass (`backdrop-filter`) is limited to the fixed header.

Measured locally against the previous Next.js 14 build (production servers, headless Chromium; mobile with
4× CPU throttling). These historical lab measurements predate the November visual update and are not field data:

| Metric            | Before (Next 14) | After (Next 16) |
| ----------------- | ---------------- | --------------- |
| LCP, mobile       | 2.2–2.4 s        | ~1.0 s          |
| LCP, desktop      | ~1.5 s           | 0.4–0.65 s      |
| CLS, mobile       | 0.06–0.13        | 0.00            |
| JavaScript (gzip) | 156 KB           | 233 KB          |

JavaScript grew mainly because the React 19 / Next.js 16 runtime is larger than React 18 / Next.js 14.
LCP and CLS improved regardless.

## Accessibility

Semantic landmarks and a single `h1`; skip link; visible focus states; WAI-ARIA tabs with arrow-key support
(pipeline and case studies); a mobile menu that traps focus, closes on Escape and restores focus; labelled
form fields with inline, announced errors; status changes in live regions; colour never used as the only
signal; 16 px form inputs (prevents iOS zoom-on-focus); reduced-motion support throughout.

## Testing

`npm test` runs unit tests for the order simulation, the contact schema and mailto builder, and the
years-of-experience calculation. During the migration the production build was also checked in a headless
browser: 38 functional checks (navigation, mobile menu, theme persistence, cross-section links, filters,
tabs, demo controls, form validation, copy, resume download, 404) plus console-error and horizontal-overflow
checks at 320, 390, 820, 1024, 1440 and 2560 px. Those browser checks are not part of this repository.

## Design decisions

- **No GSAP or Three.js.** The signature geometry uses Canvas2D and SVG, with Motion for interruptible state transitions.
  These artifacts do not need a separate timeline library or WebGL runtime.
- **One authored entrance.** Kinetic typography introduces an interactive orbital system sculpture. Its planes deploy,
  the core assembles and signals trace the marketplace-to-courier route within 3.6 seconds. Replay is explicit;
  reading sections stay still. Project exhibits crossfade together in 240ms. Reduced motion retains static geometry and feedback.
- **Solid surfaces.** Hairline borders organize panels; translucent blur is reserved for the fixed header.
  The About story uses an intact portrait and open rules. Project drawings visualize real architecture and are labeled system overviews.
- **Design context.** [PRODUCT.md](PRODUCT.md) records the product evidence; [DESIGN.md](DESIGN.md) records
  the visual system, motion timeline, accessibility behavior and installed skill references.
- **Strict source checks.** The build first checks authored TypeScript with both unused-declaration checks.
  Next uses `tsconfig.framework.json` to retain generated export validation while tolerating its own unused
  metadata-route imports in version 16.4.3.
- **Tooling versions.** ESLint 9 rather than 10 and TypeScript 6 rather than 7, because Next.js's ESLint
  plugins and typescript-eslint do not support the newer majors yet. Node's built-in test runner instead of
  Vitest keeps the dependency tree small.
