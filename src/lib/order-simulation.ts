/*
 * Order desk simulation: a pure state machine that walks made-up orders through
 * the same six stages as the CRM pipeline. No network, no real data.
 *
 * Randomness and time are injected through `Env`, so the logic is deterministic
 * under test and the component stays a thin view over it.
 */

export const STAGE_COUNT = 6;
export const LAST_STAGE = STAGE_COUNT - 1;
export const MAX_ORDERS = 12;
export const MAX_LOG = 40;

export type Region = "IN" | "AE" | "US";

export interface Order {
  id: string;
  account: string;
  item: string;
  dest: string;
  region: Region;
  stage: number;
  po?: string;
  courier?: string;
  awb?: string;
  /** Timestamp for each stage reached, index = stage. */
  history: number[];
}

export interface LogLine {
  id: number;
  at: number;
  text: string;
}

export interface DeskState {
  orders: Order[];
  log: LogLine[];
  selected: string | null;
  running: boolean;
  seq: number;
  tick: number;
  logSeq: number;
}

export type DeskAction =
  | { type: "sync" }
  | { type: "tick" }
  | { type: "step" }
  | { type: "select"; id: string }
  | { type: "run"; on: boolean };

export interface Env {
  /** Returns a float in [0, 1). */
  random: () => number;
  now: () => number;
}

export const defaultEnv: Env = { random: Math.random, now: Date.now };

const ACCOUNTS = ["Seller account A", "Seller account B", "Seller account C"];
const ITEMS = [
  "Steel water bottle",
  "Cotton kurta",
  "Desk lamp",
  "Yoga mat",
  "Ceramic mug set",
  "Backpack",
  "Phone stand",
  "Wall clock",
];
const DESTINATIONS: readonly { dest: string; region: Region }[] = [
  { dest: "Pune, IN", region: "IN" },
  { dest: "Jaipur, IN", region: "IN" },
  { dest: "Kochi, IN", region: "IN" },
  { dest: "Lucknow, IN", region: "IN" },
  { dest: "Dubai, AE", region: "AE" },
  { dest: "Dallas, US", region: "US" },
];

const int = (env: Env, n: number) => Math.floor(env.random() * n);
const digits = (env: Env, n: number) => Array.from({ length: n }, () => int(env, 10)).join("");
const pick = <T>(env: Env, list: readonly T[]): T => list[int(env, list.length)];

export function makeOrder(env: Env): Order {
  const d = pick(env, DESTINATIONS);
  return {
    id: `40${int(env, 8) + 2}-${digits(env, 7)}-${digits(env, 7)}`,
    account: pick(env, ACCOUNTS),
    item: pick(env, ITEMS),
    dest: d.dest,
    region: d.region,
    stage: 0,
    history: [env.now()],
  };
}

/** Moves an order one stage forward, assigning PO and courier details as they become known. */
export function advance(order: Order, seq: number, env: Env): Order {
  if (order.stage >= LAST_STAGE) return order;
  const stage = order.stage + 1;
  const next: Order = { ...order, stage, history: [...order.history, env.now()] };
  if (stage === 1) next.po = `PO-${1040 + seq}`;
  if (stage === 3) {
    next.courier = order.region === "IN" ? (seq % 2 ? "Blue Dart" : "XpressBees") : "International partner";
    next.awb = digits(env, 11);
  }
  return next;
}

export function describe(order: Order): string {
  switch (order.stage) {
    case 0:
      return `Synced ${order.id} from ${order.account} via SP-API`;
    case 1:
      return `Worker raised ${order.po} for ${order.id}`;
    case 2:
      return `Scheduler marked ${order.id} procured`;
    case 3:
      return `Booked ${order.id} with ${order.courier}, AWB ${order.awb}`;
    case 4:
      return `${order.id} in transit to ${order.dest}`;
    default:
      return `${order.id} delivered in ${order.dest}`;
  }
}

function appendLog(state: DeskState, changed: Order[], env: Env): Pick<DeskState, "log" | "logSeq"> {
  let logSeq = state.logSeq;
  const lines = changed.map((o) => ({ id: ++logSeq, at: env.now(), text: describe(o) }));
  return { log: [...lines.reverse(), ...state.log].slice(0, MAX_LOG), logSeq };
}

/** Keeps the table bounded by dropping the oldest delivered order first. */
export function prune(orders: Order[]): Order[] {
  if (orders.length <= MAX_ORDERS) return orders;
  for (let i = orders.length - 1; i >= 0; i--) {
    if (orders[i].stage === LAST_STAGE) return orders.filter((_, k) => k !== i);
  }
  return orders.slice(0, MAX_ORDERS);
}

function advanceAll(state: DeskState, env: Env, chance: number): DeskState {
  const changed: Order[] = [];
  let seq = state.seq;
  const orders = state.orders.map((o) => {
    if (o.stage < LAST_STAGE && (chance >= 1 || env.random() < chance)) {
      const n = advance(o, seq++, env);
      changed.push(n);
      return n;
    }
    return o;
  });
  const base: DeskState = { ...state, seq, tick: state.tick + 1, orders };
  return changed.length ? { ...base, ...appendLog(base, changed, env) } : base;
}

export function createReducer(env: Env = defaultEnv) {
  return function reducer(state: DeskState, action: DeskAction): DeskState {
    switch (action.type) {
      case "sync": {
        const order = makeOrder(env);
        const next: DeskState = { ...state, seq: state.seq + 1, orders: prune([order, ...state.orders]) };
        return { ...next, ...appendLog(next, [order], env), selected: state.selected ?? order.id };
      }
      case "tick": {
        const next = advanceAll(state, env, 0.42);
        // A new marketplace order arrives every third tick.
        return state.tick % 3 === 0 ? reducer(next, { type: "sync" }) : next;
      }
      case "step":
        return advanceAll(state, env, 1);
      case "select":
        return { ...state, selected: action.id };
      case "run":
        return { ...state, running: action.on };
    }
  };
}

/** A busy starting desk: six orders spread across the pipeline with plausible, backdated timestamps. */
export function seedState(running: boolean, env: Env = defaultEnv): DeskState {
  const reducer = createReducer(env);
  let s: DeskState = { orders: [], log: [], selected: null, running, seq: 0, tick: 1, logSeq: 0 };
  for (let i = 0; i < 6; i++) s = reducer(s, { type: "sync" });

  const now = env.now();
  const orders = s.orders.map((o, i) => {
    let n = o;
    for (let k = 0; k < Math.min(LAST_STAGE, i); k++) n = advance(n, s.seq + i * 7 + k, env);
    return {
      ...n,
      history: n.history.map(
        (_, k) => now - (n.history.length - 1 - k) * (7 + ((i * 5 + k * 3) % 11)) * 60_000 - i * 45_000,
      ),
    };
  });
  return { ...s, orders, selected: orders[2]?.id ?? null };
}

export function countByStage(orders: readonly Order[]): number[] {
  const counts = Array.from({ length: STAGE_COUNT }, () => 0);
  for (const o of orders) counts[o.stage] += 1;
  return counts;
}
