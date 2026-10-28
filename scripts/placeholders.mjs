/**
 * Unconfirmed facts live in content as {{LABEL: note}} and are never rendered.
 *
 *   node scripts/placeholders.mjs           List every placeholder still in src/data.
 *   node scripts/placeholders.mjs --built   Fail if any built page or script contains one (run after `next build`).
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const PLACEHOLDER = /\{\{[^}]*\}\}/g;

async function* walk(dir, ext) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path, ext);
    else if (ext.some((e) => entry.name.endsWith(e))) yield path;
  }
}

if (process.argv.includes("--built")) {
  const leaks = [];
  let checked = 0;
  const built = [
    walk(join(root, ".next/server/app"), [".html", ".rsc", ".body"]),
    walk(join(root, ".next/static/chunks"), [".js"]),
  ];
  for (const files of built) {
    for await (const file of files) {
      checked++;
      const text = await readFile(file, "utf8");
      for (const match of text.match(PLACEHOLDER) ?? []) leaks.push(`${relative(root, file)}: ${match}`);
    }
  }
  if (leaks.length > 0) {
    console.error(`Placeholders reached the built site:\n${leaks.join("\n")}`);
    process.exit(1);
  }
  console.log(`No placeholders in ${checked} built pages and scripts.`);
} else {
  let count = 0;
  for await (const file of walk(join(root, "src/data"), [".ts"])) {
    const lines = (await readFile(file, "utf8")).split("\n");
    lines.forEach((line, i) => {
      if (/^\s*(\*|\/\/|\/\*)/.test(line)) return; // documentation, not content
      for (const match of line.match(PLACEHOLDER) ?? []) {
        count++;
        console.log(`${relative(root, file)}:${i + 1}  ${match}`);
      }
    });
  }
  console.log(count === 0 ? "No placeholders left." : `\n${count} placeholder(s) to fill.`);
}
