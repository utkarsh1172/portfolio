/**
 * Unconfirmed facts are written into content as `{{LABEL: note}}`. They must
 * never reach the page: components render only `isConfirmed` values and
 * `visible` lists, and `npm run check` fails if a built page contains `{{`.
 */
const PLACEHOLDER = /\{\{[^}]*\}\}/;

export function isConfirmed(value: string | null | undefined): value is string {
  return !!value && !PLACEHOLDER.test(value);
}

/** Drops every item that contains a placeholder anywhere inside it. */
export function visible<T>(items: readonly T[]): T[] {
  return items.filter((item) => !PLACEHOLDER.test(JSON.stringify(item)));
}
