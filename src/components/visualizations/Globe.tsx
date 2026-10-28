"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { LAND_DOTS } from "@/data/land-dots";
import { hubs, routes } from "@/data/network";
import { useInView } from "@/hooks/useInView";
import type { Hub } from "@/types";

const DEG = Math.PI / 180;

type V3 = [number, number, number];

const toVec = (lat: number, lon: number): V3 => [
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
  Math.sin(lat * DEG),
];

const toLatLon = (v: V3): [number, number] => {
  const len = Math.hypot(v[0], v[1], v[2]);
  return [Math.asin(v[2] / len) / DEG, Math.atan2(v[1], v[0]) / DEG];
};

/** Great-circle interpolation between two unit vectors. */
function slerp(a: V3, b: V3, t: number): V3 {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const om = Math.acos(dot);
  if (om < 1e-6) return a;
  const s = Math.sin(om);
  const k1 = Math.sin((1 - t) * om) / s;
  const k2 = Math.sin(t * om) / s;
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2];
}

type Arc = {
  from: Hub;
  to: Hub;
  pts: { lat: number; lon: number; r: number }[];
  domestic: boolean;
  delay: number;
  speed: number;
};

function buildArcs(): Arc[] {
  const byId = Object.fromEntries(hubs.map((h) => [h.id, h]));
  return routes.map(([a, b], i) => {
    const from = byId[a];
    const to = byId[b];
    const va = toVec(from.lat, from.lon);
    const vb = toVec(to.lat, to.lon);
    const ang = Math.acos(Math.min(1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
    const lift = Math.min(0.17, 0.03 + ang * 0.1);
    const n = Math.max(24, Math.round(ang * 90));
    const pts = Array.from({ length: n + 1 }, (_, k) => {
      const t = k / n;
      const [lat, lon] = toLatLon(slerp(va, vb, t));
      return { lat, lon, r: 1 + lift * Math.sin(Math.PI * t) };
    });
    const domestic = to.kind === "domestic";
    return { from, to, pts, domestic, delay: 0.5 + i * 0.22, speed: domestic ? 0.32 : 0.16 };
  });
}

function readColor(name: string, alpha = 1) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  return `rgb(${raw.split(/\s+/).join(" ")} / ${alpha})`;
}

/**
 * Dotted orthographic globe with animated shipping lanes, drawn on a 2D canvas
 * (~6 KB, versus several hundred KB for a WebGL library). Draggable, rotatable
 * with arrow keys, paused while off screen and static under reduced motion.
 */
export default function Globe({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrapRef, "100px");
  const reduced = useReducedMotion() ?? false;
  const kickRef = useRef<() => void>(() => {});
  const state = useRef({ lon0: 62, lat0: 14, vel: 0, dragging: false, lastX: 0, lastY: 0, start: 0 });
  const visibleRef = useRef(inView);
  useEffect(() => {
    visibleRef.current = inView;
  }, [inView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const arcs = buildArcs();
    const readColors = () => ({
      dot: readColor("globe-dot"),
      sea: readColor("globe-sea"),
      line: readColor("line"),
      accent: readColor("accent"),
      teal: readColor("teal"),
      amber: readColor("amber"),
      ink: readColor("ink"),
      muted: readColor("muted"),
    });
    let colors = readColors();
    const refreshColors = () => {
      colors = readColors();
      kickRef.current();
    };

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      kickRef.current();
    });
    ro.observe(wrap);

    const mo = new MutationObserver(refreshColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", refreshColors);

    const s = state.current;
    s.start = performance.now();

    const project = (lat: number, lon: number, r: number) => {
      const phi = lat * DEG;
      const dl = (lon - s.lon0) * DEG;
      const p0 = s.lat0 * DEG;
      const cosPhi = Math.cos(phi);
      const x = r * cosPhi * Math.sin(dl);
      const y = r * (Math.cos(p0) * Math.sin(phi) - Math.sin(p0) * cosPhi * Math.cos(dl));
      const z = r * (Math.sin(p0) * Math.sin(phi) + Math.cos(p0) * cosPhi * Math.cos(dl));
      return { x, y, z, visible: z > 0 || x * x + y * y > 1 };
    };

    let raf = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const elapsed = reduced ? 99 : (now - s.start) / 1000;

      if (!s.dragging) {
        if (Math.abs(s.vel) > 0.01) {
          s.lon0 -= s.vel * dt * 60;
          s.vel *= 0.94;
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.41;
      const cx = w / 2;
      const cy = h / 2;
      const intro = Math.min(1, elapsed / 0.9);
      const ease = 1 - Math.pow(1 - intro, 3);

      // Sea disc and rim
      ctx.globalAlpha = ease;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = colors.sea;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      ctx.stroke();

      // Land dots, dimmed toward the limb
      ctx.fillStyle = colors.dot;
      const size = Math.max(1.1, R / 210);
      for (let i = 0; i < LAND_DOTS.length; i += 2) {
        const p = project(LAND_DOTS[i] / 10, LAND_DOTS[i + 1] / 10, 1);
        if (p.z <= 0) continue;
        ctx.globalAlpha = ease * (0.25 + 0.75 * p.z);
        ctx.fillRect(cx + p.x * R - size / 2, cy - p.y * R - size / 2, size, size);
      }
      ctx.globalAlpha = 1;

      // Routes
      for (const arc of arcs) {
        const grow = Math.min(1, Math.max(0, (elapsed - arc.delay) / 1.1));
        if (grow <= 0) continue;
        const color = arc.domestic ? colors.teal : colors.accent;
        const upto = Math.floor(grow * (arc.pts.length - 1));
        ctx.lineWidth = arc.domestic ? 1.4 : 1.8;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        let pen = false;
        for (let k = 0; k <= upto; k++) {
          const q = arc.pts[k];
          const p = project(q.lat, q.lon, q.r);
          if (!p.visible) {
            pen = false;
            continue;
          }
          const X = cx + p.x * R;
          const Y = cy - p.y * R;
          if (pen) ctx.lineTo(X, Y);
          else ctx.moveTo(X, Y);
          pen = true;
        }
        ctx.stroke();

        // Parcel travelling the lane
        if (grow >= 1 && !reduced) {
          const t = ((elapsed - arc.delay - 1.1) * arc.speed) % 1;
          const idx = Math.floor(t * (arc.pts.length - 1));
          const q = arc.pts[idx];
          const p = project(q.lat, q.lon, q.r);
          if (p.visible) {
            const X = cx + p.x * R;
            const Y = cy - p.y * R;
            ctx.globalAlpha = 0.25;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(X, Y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(X, Y, 2.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Hubs and labels
      ctx.font = `600 ${Math.max(11, R / 26)}px ${getComputedStyle(document.body).fontFamily}`;
      for (const hub of hubs) {
        const p = project(hub.lat, hub.lon, 1);
        if (p.z <= 0.05) continue;
        const X = cx + p.x * R;
        const Y = cy - p.y * R;
        const c = hub.kind === "home" ? colors.accent : hub.kind === "warehouse" ? colors.amber : colors.teal;
        ctx.globalAlpha = ease * Math.min(1, p.z * 2);
        if (hub.kind !== "domestic") {
          const pulse = reduced ? 0 : (elapsed * 0.7) % 1;
          ctx.strokeStyle = c;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(X, Y, 4 + pulse * 12, 0, Math.PI * 2);
          ctx.globalAlpha *= 1 - pulse;
          ctx.stroke();
          ctx.globalAlpha = ease * Math.min(1, p.z * 2);
        }
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(X, Y, hub.kind === "domestic" ? 2.4 : 3.6, 0, Math.PI * 2);
        ctx.fill();
        if (hub.kind !== "domestic") {
          ctx.fillStyle = colors.ink;
          const left = hub.id === "uae";
          ctx.textAlign = left ? "right" : "left";
          ctx.fillText(hub.name, X + (left ? -10 : 10), Y + 4);
        }
      }
      ctx.globalAlpha = 1;

      // Keep drawing only while something moves: the intro, a drag, or its glide.
      const moving = s.dragging || Math.abs(s.vel) > 0.01 || elapsed < 4;
      if ((visibleRef.current || s.dragging) && moving) raf = requestAnimationFrame(draw);
      else raf = 0;
    };

    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    kick();
    kickRef.current = kick;

    // Pointer drag
    const onDown = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.vel = 0;
      canvas.setPointerCapture(e.pointerId);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      const k = 180 / Math.max(200, Math.min(w, h));
      s.lon0 -= dx * k;
      s.lat0 = Math.max(-40, Math.min(50, s.lat0 + dy * k));
      s.vel = dx * k * 0.6;
    };
    const onUp = () => {
      s.dragging = false;
      kick();
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      mq.removeEventListener("change", refreshColors);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [reduced]);

  // Resume the loop when the globe scrolls back into view.
  useEffect(() => {
    if (inView) kickRef.current();
  }, [inView]);

  const onKey = (e: React.KeyboardEvent) => {
    const s = state.current;
    const step = 12;
    if (e.key === "ArrowLeft") s.lon0 += step;
    else if (e.key === "ArrowRight") s.lon0 -= step;
    else if (e.key === "ArrowUp") s.lat0 = Math.min(50, s.lat0 + 6);
    else if (e.key === "ArrowDown") s.lat0 = Math.max(-40, s.lat0 - 6);
    else return;
    e.preventDefault();
    kickRef.current();
  };

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-square w-full select-none ${className}`}
      tabIndex={0}
      role="img"
      aria-label="Globe showing shipping lanes from Mumbai to warehouse regions in the UAE and the United States, and domestic lanes to Delhi, Bengaluru and Kolkata. Drag or use arrow keys to rotate."
      onKeyDown={onKey}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
      />
    </div>
  );
}
