import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildMailto, contactSchema, contactSubject, fieldErrors } from "./contact.ts";

describe("contact schema", () => {
  it("accepts a minimal valid message", () => {
    const r = contactSchema.safeParse({
      name: "",
      email: "",
      company: "",
      message: "We are hiring a full-stack engineer.",
    });
    assert.ok(r.success);
  });

  it("rejects a short message with a helpful error", () => {
    const r = contactSchema.safeParse({ name: "A", email: "", company: "", message: "hi" });
    assert.ok(!r.success);
    assert.match(fieldErrors(r.error).message ?? "", /short message/);
  });

  it("rejects an invalid email but allows an empty one", () => {
    const bad = contactSchema.safeParse({ name: "", email: "nope", company: "", message: "A long enough message." });
    assert.ok(!bad.success);
    assert.ok(fieldErrors(bad.error).email);
  });

  it("trims whitespace", () => {
    const r = contactSchema.parse({
      name: "  Priya ",
      email: "",
      company: " Acme ",
      message: "  Hello there, role inside. ",
    });
    assert.equal(r.name, "Priya");
    assert.equal(r.company, "Acme");
  });
});

describe("mailto builder", () => {
  it("prefers the company in the subject", () => {
    assert.equal(contactSubject({ name: "Priya", company: "Acme Logistics" }), "Opportunity at Acme Logistics");
    assert.equal(contactSubject({ name: "", company: "" }), "Hello from a recruiter");
  });

  it("encodes subject and body", () => {
    const href = buildMailto("me@example.com", {
      name: "Priya",
      email: "p@acme.com",
      company: "Acme & Co",
      message: "Role: SDE-2",
    });
    assert.ok(href.startsWith("mailto:me@example.com?subject="));
    assert.ok(href.includes(encodeURIComponent("Acme & Co")));
    assert.ok(href.includes(encodeURIComponent("Role: SDE-2")));
  });
});
