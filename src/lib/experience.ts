/** Whole years between a start month (1-12) and `now`. Pure, so it can be unit-tested. */
export function yearsSince(start: { year: number; month: number }, now: Date = new Date()): number {
  const months = (now.getFullYear() - start.year) * 12 + (now.getMonth() + 1 - start.month);
  return Math.max(0, Math.floor(months / 12));
}
