import assert from "node:assert/strict";
import { test } from "node:test";
import { isConfirmed, visible } from "./placeholders.ts";

test("treats empty and placeholder values as unconfirmed", () => {
  assert.equal(isConfirmed(""), false);
  assert.equal(isConfirmed(null), false);
  assert.equal(isConfirmed("{{EMAIL: contact address}}"), false);
  assert.equal(isConfirmed("Shipped in {{YEAR}}"), false);
  assert.equal(isConfirmed("Oct 2025 to present"), true);
});

test("drops list items that contain a placeholder anywhere", () => {
  const items = [
    { label: "Screens", text: "{{METRIC: screens designed}}" },
    { label: "Platform", text: "Responsive web" },
    { label: "{{LABEL}}", text: "Fine" },
  ];
  assert.deepEqual(visible(items), [{ label: "Platform", text: "Responsive web" }]);
  assert.deepEqual(visible(["a", "{{b}}", "c"]), ["a", "c"]);
});

test("keeps ordinary braces that are not placeholders", () => {
  assert.equal(isConfirmed("Uses {curly} braces"), true);
});
