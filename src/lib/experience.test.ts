import assert from "node:assert/strict";
import { it } from "node:test";
import { yearsSince } from "./experience.ts";

it("counts whole years from the start month", () => {
  const start = { year: 2022, month: 10 };
  assert.equal(yearsSince(start, new Date(2026, 8, 30)), 3); // Sep 2026
  assert.equal(yearsSince(start, new Date(2026, 9, 1)), 4); // Oct 2026
  assert.equal(yearsSince(start, new Date(2020, 0, 1)), 0); // never negative
});
