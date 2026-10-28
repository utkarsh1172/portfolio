/**
 * WCAG 2.2 AA contrast check for every text colour on every surface, in both
 * themes. Reads the tokens straight from src/app/globals.css.
 *
 * Glass is tested at its worst case: the thinnest glass fill over the brightest
 * point of a background bloom, with the white sheen at full strength.
 *
 *   node scripts/contrast.mjs   Exits 1 if any pairing is below 4.5:1.
 */
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");

function block(selector) {
  const start = css.indexOf(`${selector} {`);
  if (start < 0) throw new Error(`No "${selector}" block in globals.css`);
  const body = css.slice(start, css.indexOf("\n}", start));
  const tokens = {};
  for (const [, name, value] of body.matchAll(/--([\w-]+):\s*([^;]+);/g)) tokens[name] = value.trim();
  return tokens;
}

const rgb = (v) => v.split(/\s+/).map(Number);
const over = (top, alpha, bottom) => top.map((c, i) => c * alpha + bottom[i] * (1 - alpha));
const lum = (c) =>
  c
    .map((v) => v / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const dark = block(":root");
const themes = { dark, light: { ...dark, ...block(':root[data-theme="light"]') } };

let failures = 0;
for (const [theme, t] of Object.entries(themes)) {
  const bg = rgb(t.bg);
  const alpha = Number(t["bloom-alpha"]);
  // Dark theme: the brightest backdrop is worst for light text; light theme: the darkest.
  const worst = [over(rgb(t["bloom-1"]), alpha, bg), over(rgb(t["bloom-2"]), alpha * 0.7, bg)].sort((a, b) =>
    theme === "dark" ? lum(b) - lum(a) : lum(a) - lum(b),
  )[0];
  const glassTint = over(rgb(t["glass-tint"]), Number(t["glass-tint-alpha"]), worst);
  const glass = over([255, 255, 255], Number(t["glass-sheen-alpha"]), glassTint);

  const surfaces = {
    bg,
    "bg-2": rgb(t["bg-2"]),
    surface: rgb(t.surface),
    "surface-2": rgb(t["surface-2"]),
    "glass (worst case)": glass,
    "accent badge on glass": over(rgb(t.accent), 0.1, glass),
  };
  const texts = { ink: rgb(t.ink), muted: rgb(t.muted), accent: rgb(t.accent) };

  console.log(`\n${theme}`);
  const rows = [["accent-ink on accent", ratio(rgb(t["accent-ink"]), rgb(t.accent))]];
  for (const [sName, s] of Object.entries(surfaces)) {
    for (const [tName, c] of Object.entries(texts)) {
      if (sName === "accent badge on glass" && tName !== "accent") continue;
      rows.push([`${tName} on ${sName}`, ratio(c, s)]);
    }
  }
  for (const [label, r] of rows) {
    const ok = r >= 4.5;
    if (!ok) failures++;
    console.log(`  ${ok ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  ${label}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} pairing(s) below WCAG AA (4.5:1).`);
  process.exit(1);
}
console.log("\nAll text pairings meet WCAG AA (4.5:1).");
