# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hiring managers, engineering teams and recruiters evaluating Utkarsh Kamble for senior full-stack roles. This audience is inferred from the existing `profile.seeking` and resume; the user delegated decisions to the existing portfolio.

## Product Purpose

Show Utkarsh's engineering work, explain his technical decisions and make it easy to explore projects, download his resume and contact him.

## Positioning

A Mumbai-based senior software developer whose production work connects marketplaces, order automation, warehouses and courier services. Experience also includes enterprise React Native applications.

## Operating Context

Visitors can scan the professional introduction, inspect six case studies and their architecture, try a clearly labeled simulated order desk, explore technologies mapped to actual work, and review the career timeline.

## Capabilities and Constraints

- Existing Next.js App Router, React, TypeScript, Tailwind CSS and Motion stack.
- Preserve personal details, employment history, real project claims, resume and social destinations.
- Theme switching, keyboard command palette, project filters, architecture tabs and accessible mobile navigation.
- The globe illustrates warehouse regions and routes; it is not a production tracking map.
- The order desk uses browser-generated simulated data and starts paused.
- Contact delivery uses the existing environment configuration, with an email-client fallback when delivery is not configured.
- Deployment remains under the existing project's control; this work modifies the local checkout.

## Evidence on Hand

- `src/data/profile.ts`, `projects.ts`, `experience.ts`, `skills.ts` and related typed data.
- Real portrait: `public/images/utkarsh-kamble.jpg`.
- Resume: `public/resume/Utkarsh_Kamble_Resume.pdf`.
- The resume supplied on 6 November 2026 confirms Redis caching, Docker services, AWS EC2/VPS hosting behind Nginx, GitHub Actions CI/CD and event-driven workers at Growve. It ties JWT/OAuth 2.0, RBAC and Swagger/OpenAPI to the API gateway. WebSockets, Jest, Android and iOS are listed as skills without a specific project association.
- Existing verified project figures include 400+ Amazon orders daily, 5K+ shipments monthly, approximately six hours saved daily and 1M+ warehouse SKUs.
- User-supplied working project URLs are stored with the matching case studies: WindyCart seller and supplier CRM login pages, Linky Pro, Atlantic Basket’s demo storefront, Red Fox Courier and Growve Logistics. Keep login and demo labels visible; do not imply access beyond the linked public pages.
- No project screenshots, testimonials or additional performance benchmarks were supplied; do not invent them.

## Product Principles

- Lead with the person and the work he can explain.
- Connect technology to concrete business flows and outcomes.
- Keep demonstrations clearly distinguished from production work.
- Make project exploration and contact usable on phones and keyboards.
- Motion should explain relationships or acknowledge actions without delaying reading.
- Use simple, factual copy based on the supplied resume and project evidence. Avoid slogans, dramatic career stories and invented personal lessons, including claims about what a commerce degree taught Utkarsh.
