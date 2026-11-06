# Portfolio design

## Direction

A gallery of working systems: warm graphite, paper-like ivory and a sharp signal green. The interface makes Utkarsh’s engineering visible through operable diagrams, spatial geometry and a deliberately choreographed opening. This replaces the earlier portrait-and-waybill presentation. Product evidence, resume additions and contact functions stay authoritative.

## Visual system

- Canvas `#10120f`, foreground `#f0eee6`, secondary text `#a3a99b`, signal accent `#c5ef6a`, accent ink `#141b0d`.
- Light mode uses warm paper `#f2f0e6` and deep green `#3e6514`; controls and diagrams share the same runtime tokens.
- Space Grotesk owns display and section typography. Inter handles reading; Manrope handles small controls. All are self-hosted with Next/font. No Sora download.
- Display type stops at 6rem and tracking at -0.04em. Editorial headings use medium weight, close leading and deliberate line breaks.
- Hero and navigation use an 85rem outer stage. Reading sections retain the 75rem page measure, 20px phone gutters and 32px larger gutters.
- Open rules and negative space carry most structure. Bordered, 12–16px panels contain actual interactive artifacts. Status and selection have text or state attributes as well as color.
- The genuine portrait appears in the introduction identity and the About story, intact and without a geometric silhouette mask.

## Home surface

Mode: Experience. Visitors encounter the work immediately.

The first viewport pairs the factual role heading, “Full-stack software developer,” with a suspended architecture sculpture. Four real service terminals connect marketplace sync, CRM workers, inventory and couriers. Each terminal selects a real case study, and its caption provides resume-backed context and an explicit open-project action. Pointer movement or dragging changes perspective; arrow keys traverse the terminals. Replay restarts one bounded explanatory sequence.

Selected work follows the opening. The project exhibit combines compact project selectors, case-specific interactive system drawings, an introduction and outcome, then the complete Overview / Architecture / Stack and decisions views. A horizontal phone selector brings the visual into view sooner. The drawings are system overviews, not production screenshots or live monitoring.

About presents the current role, project responsibilities, previous employers and education in plain language. Do not invent personal lessons or motivation based on the commerce degree. The portrait, map, simulated order desk, full career, evidence-mapped skills, resume and contact remain available. Contact uses the direct heading “Get in touch.”

## Motion contract

- The authored opening is a single composition: three text masks overlap at 0/70/125ms with 850ms exponential arrivals; the arrow joins at 250ms. CTAs remain immediately available.
- The sculpture deploys its three orbital planes, assembles a layered core and traces the route. The whole explanatory sequence settles within 3.6 seconds. It never loops unattended; Replay is explicit.
- Four DOM terminals stay readable and operable while canvas geometry moves. An SVG fallback preserves the full composition before hydration or if canvas fails.
- Pointer/drag perspective is bounded, driven outside React render state and reset after release. Fine-pointer decoration is gated; touch keeps vertical page scrolling.
- Project swaps overlap in a 240ms opacity crossfade. Leaving content is inert and hidden from assistive technology. Diagram node changes explain real structure with a short signal trace.
- Buttons use 160ms press feedback; link arrows use restrained movement. Reading paragraphs, career data and skill catalogs do not repeatedly enter on scroll.
- Shared curves: `--ease-out: cubic-bezier(0.23,1,0.32,1)` and `--ease-in-out: cubic-bezier(0.77,0,0.175,1)`.
- `MotionConfig` and CSS honor reduced motion: immediate static geometry, no perspective, spatial entrances or inertia, with brief opacity and color feedback retained.
- Canvas and simulation work pause when offscreen or in hidden tabs. Animation frames, observers and event listeners clean up on unmount.

## References and scope

Impeccable supplies composition, hierarchy, material commitment and the craft floor. Emil Kowalski’s installed animation, choreography and performance skills supply interruption behavior, explicit timing, pointer gating and motion budgets. The user explicitly delegated direction and requested a visibly more ambitious rebuild. Canvas and SVG are the native medium for the artifacts; no bitmap stand-ins or fabricated product images.

## Verification

Inspect actual desktop, tablet and phone renders in both themes. Exercise sculpture nodes, perspective, replay, all six case studies, filters, node inspection, tab keyboard controls, cross-section links, menu focus, theme persistence, resume download and contact validation. Capture the actual opening in motion as well as its settled frame. Keep type, formatting and production build checks passing.

The primary TypeScript config retains both unused-declaration checks. Next’s framework config retains export validation while tolerating unused imports generated by Next 16.4.3 metadata routes. Development QA must use the exact origin printed by the running server: `localhost` and `127.0.0.1` differ for Next’s dev-origin checks.
