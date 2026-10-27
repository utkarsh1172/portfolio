/** Smoothly scrolls to a section and records it in the URL, honouring reduced motion. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  if (id !== "top") window.history.replaceState(null, "", `#${id}`);
  else window.history.replaceState(null, "", window.location.pathname);
}
