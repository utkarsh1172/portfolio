import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  LAST_STAGE,
  MAX_ORDERS,
  advance,
  countByStage,
  createReducer,
  makeOrder,
  prune,
  seedState,
  type Env,
  type Order,
} from "./order-simulation.ts";

/** Deterministic env: a seeded LCG and a fixed clock. */
function testEnv(seed = 42, start = 1_700_000_000_000): Env {
  let s = seed;
  let t = start;
  return {
    random: () => (s = (s * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32,
    now: () => (t += 1000),
  };
}

describe("order simulation", () => {
  it("creates Amazon-style order ids", () => {
    const o = makeOrder(testEnv());
    assert.match(o.id, /^40[2-9]-\d{7}-\d{7}$/);
    assert.equal(o.stage, 0);
    assert.equal(o.history.length, 1);
  });

  it("assigns a PO at stage 1 and a courier at stage 3", () => {
    const env = testEnv();
    let o: Order = { ...makeOrder(env), region: "IN" };
    o = advance(o, 1, env);
    assert.equal(o.po, "PO-1041");
    o = advance(advance(o, 2, env), 3, env);
    assert.equal(o.stage, 3);
    assert.ok(o.courier === "Blue Dart" || o.courier === "XpressBees");
    assert.match(o.awb ?? "", /^\d{11}$/);
  });

  it("uses an international partner outside India", () => {
    const env = testEnv();
    let o: Order = { ...makeOrder(env), region: "AE" };
    for (let i = 0; i < 3; i++) o = advance(o, i, env);
    assert.equal(o.courier, "International partner");
  });

  it("never advances past delivered", () => {
    const env = testEnv();
    let o = makeOrder(env);
    for (let i = 0; i < 10; i++) o = advance(o, i, env);
    assert.equal(o.stage, LAST_STAGE);
    assert.equal(o.history.length, LAST_STAGE + 1);
  });

  it("step moves every undelivered order exactly one stage and logs it", () => {
    const env = testEnv();
    const reducer = createReducer(env);
    const s0 = seedState(false, env);
    const s1 = reducer(s0, { type: "step" });
    s0.orders.forEach((o, i) => {
      assert.equal(s1.orders[i].stage, Math.min(LAST_STAGE, o.stage + 1));
    });
    const moved = s0.orders.filter((o) => o.stage < LAST_STAGE).length;
    assert.equal(s1.log.length, s0.log.length + moved);
  });

  it("keeps the table bounded, dropping the oldest delivered order first", () => {
    const env = testEnv();
    const orders = Array.from({ length: MAX_ORDERS + 1 }, (_, i) => ({
      ...makeOrder(env),
      stage: i === 3 ? LAST_STAGE : 0,
    }));
    const kept = prune(orders);
    assert.equal(kept.length, MAX_ORDERS);
    assert.ok(!kept.includes(orders[3]));
  });

  it("gives every log line a unique id", () => {
    const env = testEnv();
    const reducer = createReducer(env);
    let s = seedState(true, env);
    for (let i = 0; i < 30; i++) s = reducer(s, { type: "tick" });
    const ids = s.log.map((l) => l.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("counts orders per stage", () => {
    const env = testEnv();
    const s = seedState(false, env);
    const counts = countByStage(s.orders);
    assert.equal(
      counts.reduce((a, b) => a + b, 0),
      s.orders.length,
    );
  });
});
