"use client";

import { ArrowUpRight, Boxes, RotateCcw, Truck, Webhook, Workflow } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { useCaseSelection } from "@/components/providers/CaseSelectionProvider";
import type { CaseStudyId } from "@/types";
import styles from "./SystemsCanvas.module.css";

const WIDTH = 600;
const HEIGHT = 430;
const INTRO_MS = 3600;
const NODE_POINTS = [
  { x: 112, y: 112 },
  { x: 455, y: 148 },
  { x: 412, y: 330 },
  { x: 128, y: 302 },
] as const;

const systems = [
  {
    name: "Marketplace",
    detail: "Amazon SP-API",
    title: "Amazon order sync",
    description: "Syncs orders from three Amazon seller accounts into the CRM.",
    fact: "400+ orders a day",
    caseId: "crm" as CaseStudyId,
    icon: Webhook,
  },
  {
    name: "Automation",
    detail: "CRM + workers",
    title: "Order processing automation",
    description: "Background workers connect purchasing, procurement and shipment booking.",
    fact: "About 6 hours saved daily",
    caseId: "crm" as CaseStudyId,
    icon: Workflow,
  },
  {
    name: "Inventory",
    detail: "US + UAE warehouses",
    title: "Warehouse inventory",
    description: "Region-wise stock and inventory across warehouses in the US and UAE.",
    fact: "1M+ SKUs managed",
    caseId: "storefront" as CaseStudyId,
    icon: Boxes,
  },
  {
    name: "Shipping",
    detail: "Courier partner APIs",
    title: "Shipment booking and tracking",
    description: "Domestic and international shipment booking, tracking and operations.",
    fact: "5K+ shipments a month",
    caseId: "logistics" as CaseStudyId,
    icon: Truck,
  },
] as const;

type Point = { x: number; y: number };
type Curve = readonly [Point, Point, Point, Point];
const curves: readonly Curve[] = [
  [NODE_POINTS[0], { x: 248, y: 7 }, { x: 438, y: 24 }, NODE_POINTS[1]],
  [NODE_POINTS[1], { x: 572, y: 205 }, { x: 562, y: 305 }, NODE_POINTS[2]],
  [NODE_POINTS[2], { x: 315, y: 423 }, { x: 143, y: 412 }, NODE_POINTS[3]],
  [NODE_POINTS[3], { x: 17, y: 260 }, { x: 20, y: 160 }, NODE_POINTS[0]],
];

function curvePoint(curve: Curve, t: number): Point {
  const u = 1 - t;
  return {
    x: u ** 3 * curve[0].x + 3 * u ** 2 * t * curve[1].x + 3 * u * t ** 2 * curve[2].x + t ** 3 * curve[3].x,
    y: u ** 3 * curve[0].y + 3 * u ** 2 * t * curve[1].y + 3 * u * t ** 2 * curve[2].y + t ** 3 * curve[3].y,
  };
}

/** A bounded signal traversal across real systems; the diagram remains an operable project index. */
export function SystemsCanvas() {
  const { openCase } = useCaseSelection();
  const [selected, setSelected] = useState(1);
  const [playing, setPlaying] = useState(false);
  const hostRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedRef = useRef(selected);
  const replayRef = useRef<() => void>(() => {});
  const selectRef = useRef<(index: number) => void>(() => {});
  const pointerFrame = useRef(0);
  const inputRef = useRef({ reduced: false, fine: false });
  const dragRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = systems[selected];

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const stage = stageRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !stage || !context) return;
    const buttons = [...buttonRefs.current];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    inputRef.current = { reduced: reduced.matches, fine: fine.matches };
    let visible = false;
    let elapsed = 0;
    let previous = 0;
    let frame = 0;
    let pulse = 0;
    let pulseStarted = 0;
    let flowStep = -1;
    let intro = !reduced.matches;
    let scale = 1;
    let accent = "197, 239, 106";
    let ink = "240, 238, 230";
    let bg = "16, 18, 15";

    const readPalette = () => {
      const css = getComputedStyle(document.documentElement);
      accent = css.getPropertyValue("--accent").trim().replace(/\s+/g, ", ") || accent;
      ink = css.getPropertyValue("--ink").trim().replace(/\s+/g, ", ") || ink;
      bg = css.getPropertyValue("--bg").trim().replace(/\s+/g, ", ") || bg;
    };

    const curvePath = (curve: Curve) => {
      context.beginPath();
      context.moveTo(curve[0].x, curve[0].y);
      context.bezierCurveTo(curve[1].x, curve[1].y, curve[2].x, curve[2].y, curve[3].x, curve[3].y);
    };

    const draw = () => {
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, WIDTH, HEIGHT);
      const progress = intro && !reduced.matches ? Math.min(1, elapsed / INTRO_MS) : 1;
      const deployment = Math.min(1, progress / 0.46);
      const unfold = 1 - (1 - deployment) ** 3;
      const turn = (1 - unfold) * -0.3;
      const signal = Math.max(0, (progress - 0.15) / 0.85);
      const nextStep =
        intro && !reduced.matches && signal > 0 && signal < 0.98 ? Math.min(3, Math.floor(signal * 4)) : -1;
      if (nextStep !== flowStep) {
        flowStep = nextStep;
        buttons.forEach((button, index) => {
          if (button) button.dataset.signal = index === flowStep ? "true" : "false";
        });
      }

      // The rails form the spatial diagram, rather than a decorative page-wide grid.
      for (let layer = 0; layer < 3; layer++) {
        context.beginPath();
        for (let i = 0; i <= 120; i++) {
          const theta = (i / 120) * Math.PI * 2;
          const x = Math.cos(theta) * (177 + layer * 24);
          const z = Math.sin(theta) * (177 + layer * 24);
          const planeX = x * 0.92 + z * 0.28;
          const planeY = x * 0.13 - z * (0.035 + unfold * 0.355);
          const px = 300 + (planeX * Math.cos(turn) - planeY * Math.sin(turn)) * (0.76 + unfold * 0.24);
          const py =
            220 +
            (1 - unfold) * 72 +
            planeX * Math.sin(turn) +
            planeY * Math.cos(turn) +
            (layer - 1) * (5 + unfold * 16);
          if (i === 0) context.moveTo(px, py);
          else context.lineTo(px, py);
        }
        context.strokeStyle = `rgba(${ink}, ${layer === 1 ? 0.27 : 0.16})`;
        context.lineWidth = 0.8;
        context.stroke();
      }

      // Four real service boundaries connect through the routing core.
      NODE_POINTS.forEach((point, index) => {
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.quadraticCurveTo((point.x + 300) / 2, point.y < 220 ? 240 : 205, 300, 220);
        context.strokeStyle = `rgba(${index === selectedRef.current ? accent : ink}, ${index === selectedRef.current ? 0.75 : 0.2})`;
        context.lineWidth = index === selectedRef.current ? 1.3 : 0.8;
        context.setLineDash(index === selectedRef.current ? [] : [2, 6]);
        context.stroke();
        context.setLineDash([]);
      });

      curves.forEach((curve, index) => {
        curvePath(curve);
        context.strokeStyle = `rgba(${index === selectedRef.current ? accent : ink}, ${index === selectedRef.current ? 0.55 : 0.18})`;
        context.lineWidth = 1;
        context.stroke();
        if (intro && !reduced.matches) {
          const trace = Math.max(0, Math.min(1, (elapsed - 650 - index * 480) / 600));
          if (trace > 0) {
            context.beginPath();
            context.moveTo(curve[0].x, curve[0].y);
            for (let step = 1; step <= 64; step++) {
              const point = curvePoint(curve, Math.min(trace, step / 64));
              context.lineTo(point.x, point.y);
              if (step / 64 >= trace) break;
            }
            context.strokeStyle = `rgba(${accent}, ${0.65 * Math.min(1, (1 - progress) * 9)})`;
            context.lineWidth = 1.6;
            context.stroke();
          }
        }
      });

      // Small perpendicular marks make the curved paths read as drawn engineering geometry.
      for (let i = 0; i < 20; i++) {
        const theta = (i / 20) * Math.PI * 2;
        const x = Math.cos(theta) * 238;
        const z = Math.sin(theta) * 238;
        const px = 300 + x * 0.92 + z * 0.28;
        const py = 220 + x * 0.13 - z * 0.39;
        context.beginPath();
        context.moveTo(px, py - 2.5);
        context.lineTo(px, py + 2.5);
        context.strokeStyle = `rgba(${ink}, 0.25)`;
        context.stroke();
      }

      // A small stack of planes carries depth without covering the explanatory labels.
      for (let layer = 2; layer >= 0; layer--) {
        const y = 220 + layer * 12 + (1 - unfold) * (70 + layer * 34);
        context.beginPath();
        context.moveTo(300, y - 45);
        context.lineTo(366, y - 5);
        context.lineTo(300, y + 35);
        context.lineTo(234, y - 5);
        context.closePath();
        context.fillStyle = `rgba(${bg}, ${layer === 0 ? 1 : 0.8})`;
        context.fill();
        if (layer === 0) {
          context.fillStyle = `rgba(${accent}, 0.07)`;
          context.fill();
        }
        context.strokeStyle = `rgba(${layer === 0 ? accent : ink}, ${layer === 0 ? 0.9 : 0.4})`;
        context.lineWidth = layer === 0 ? 1.4 : 0.8;
        context.stroke();
      }

      // One traveling wave makes cause and effect readable, then the scene rests.
      if (intro && !reduced.matches) {
        const opacity = Math.min(1, signal * 10, (1 - signal) * 8);
        for (let particle = 0; particle < 9; particle++) {
          const distance = signal * 4.3 - particle * 0.065;
          if (distance < 0 || distance >= 4) continue;
          const edge = Math.floor(distance);
          const t = distance - edge;
          const point = curvePoint(curves[edge], t);
          context.beginPath();
          context.arc(point.x, point.y, particle === 0 ? 3.6 : 1.7, 0, Math.PI * 2);
          context.fillStyle = `rgba(${accent}, ${opacity * (1 - particle / 12)})`;
          context.fill();
        }
        // The central connector receives the same signal, keeping the detail tied to the gesture.
        const centerProgress = (signal * 3) % 1;
        const origin = NODE_POINTS[Math.min(3, Math.floor(signal * 4))];
        const t = 1 - (1 - centerProgress) ** 2;
        context.beginPath();
        context.arc(origin.x + (300 - origin.x) * t, origin.y + (220 - origin.y) * t, 2.4, 0, Math.PI * 2);
        context.fillStyle = `rgba(${accent}, ${opacity * 0.8})`;
        context.fill();
      }

      if (pulse > 0 && !reduced.matches) {
        const point = NODE_POINTS[selectedRef.current];
        context.beginPath();
        context.arc(point.x, point.y, 34 + (1 - pulse) * 24, 0, Math.PI * 2);
        context.strokeStyle = `rgba(${accent}, ${pulse * 0.35})`;
        context.stroke();
      }
    };

    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) {
        previous = 0;
        return;
      }
      if (intro) elapsed += previous ? Math.min(time - previous, 64) : 0;
      previous = time;
      if (elapsed >= INTRO_MS) {
        intro = false;
        elapsed = INTRO_MS;
        setPlaying(false);
      }
      pulse = reduced.matches ? 0 : Math.max(0, 1 - (time - pulseStarted) / 500);
      draw();
      if (intro || pulse > 0) frame = requestAnimationFrame(tick);
      else previous = 0;
    };

    const requestDraw = () => {
      if (visible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    };
    const syncVisibility = () => {
      if (document.hidden || !visible) {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = 0;
      } else requestDraw();
    };
    const resize = () => {
      const width = stage.clientWidth;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(((width * HEIGHT) / WIDTH) * pixelRatio));
      scale = canvas.width / WIDTH;
      draw();
      stage.dataset.rendered = "true";
    };
    const onPreference = () => {
      inputRef.current.reduced = reduced.matches;
      if (reduced.matches) {
        intro = false;
        elapsed = INTRO_MS;
        setPlaying(false);
        stage.style.transform = "none";
      }
      draw();
    };
    const onPointerType = () => {
      inputRef.current.fine = fine.matches;
    };

    readPalette();
    resize();
    replayRef.current = () => {
      if (reduced.matches) {
        draw();
        return;
      }
      elapsed = 0;
      previous = 0;
      intro = true;
      setPlaying(true);
      requestDraw();
    };
    selectRef.current = (index) => {
      selectedRef.current = index;
      pulseStarted = performance.now();
      pulse = 1;
      draw();
      requestDraw();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && intro) setPlaying(true);
        syncVisibility();
      },
      { threshold: 0.05 },
    );
    observer.observe(host);
    const sizing = new ResizeObserver(resize);
    sizing.observe(stage);
    const theme = new MutationObserver(() => {
      readPalette();
      draw();
    });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("visibilitychange", syncVisibility);
    reduced.addEventListener("change", onPreference);
    fine.addEventListener("change", onPointerType);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame.current);
      buttons.forEach((button) => {
        if (button) delete button.dataset.signal;
      });
      observer.disconnect();
      sizing.disconnect();
      theme.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      reduced.removeEventListener("change", onPreference);
      fine.removeEventListener("change", onPointerType);
      replayRef.current = () => {};
      selectRef.current = () => {};
    };
  }, []);

  const select = (index: number) => {
    setSelected(index);
    selectRef.current(index);
    openCase(systems[index].caseId, false);
  };

  const tilt = (x: number, y: number) => {
    cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      if (stageRef.current) stageRef.current.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (inputRef.current.reduced) return;
    const drag = dragRef.current;
    if (drag) {
      if (drag.id !== event.pointerId) return;
      tilt(
        Math.max(-9, Math.min(9, (event.clientX - drag.x) * 0.06)),
        Math.max(-6, Math.min(6, -(event.clientY - drag.y) * 0.05)),
      );
    } else if (event.pointerType === "mouse" && inputRef.current.fine) {
      const rect = event.currentTarget.getBoundingClientRect();
      tilt(((event.clientX - rect.left) / rect.width - 0.5) * 8, ((event.clientY - rect.top) / rect.height - 0.5) * -6);
    }
  };
  const release = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.id !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    tilt(0, 0);
  };

  return (
    <figure ref={hostRef} className={styles.root} aria-label="Interactive architecture of Utkarsh’s commerce systems">
      <div className={styles.utility}>
        <span>
          <span className={styles.legendDot} aria-hidden /> Select a system to explore
        </span>
        <button
          type="button"
          className={styles.replay}
          onClick={() => replayRef.current()}
          aria-label="Replay the signal flow"
        >
          <RotateCcw size={13} aria-hidden /> {playing ? "Tracing the flow" : "Replay flow"}
        </button>
      </div>
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerMove={move}
        onPointerDown={(event) => {
          if (dragRef.current || (event.target instanceof Element && event.target.closest("button"))) return;
          if (inputRef.current.reduced) return;
          dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={() => {
          if (!dragRef.current) tilt(0, 0);
        }}
      >
        <svg className={styles.fallback} viewBox="0 0 600 430" fill="none" aria-hidden>
          <g className={styles.staticRails}>
            <ellipse cx="300" cy="199" rx="191" ry="73" transform="rotate(8 300 199)" />
            <ellipse cx="300" cy="220" rx="216" ry="82" transform="rotate(8 300 220)" />
            <ellipse cx="300" cy="241" rx="240" ry="91" transform="rotate(8 300 241)" />
            <path d="M112 112C248 7 438 24 455 148S562 305 412 330S143 412 128 302S20 160 112 112" />
            <path d="M112 112Q206 240 300 220M455 148Q377 240 300 220M412 330Q356 205 300 220M128 302Q214 205 300 220" />
          </g>
          <g className={styles.staticCore}>
            <path d="M300 199L366 239L300 279L234 239Z" />
            <path d="M300 187L366 227L300 267L234 227Z" />
            <path d="M300 175L366 215L300 255L234 215Z" />
          </g>
        </svg>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
        <span className={styles.core} aria-hidden>
          UK<span>systems</span>
        </span>
        <div role="group" aria-label="Commerce systems">
          {systems.map((system, index) => {
            const Icon = system.icon;
            return (
              <button
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                type="button"
                key={system.name}
                aria-pressed={selected === index}
                className={styles.node}
                style={
                  {
                    "--x": `${(NODE_POINTS[index].x / WIDTH) * 100}%`,
                    "--y": `${(NODE_POINTS[index].y / HEIGHT) * 100}%`,
                  } as CSSProperties
                }
                onClick={() => select(index)}
                onKeyDown={(event) => {
                  const delta =
                    event.key === "ArrowRight" || event.key === "ArrowDown"
                      ? 1
                      : event.key === "ArrowLeft" || event.key === "ArrowUp"
                        ? -1
                        : 0;
                  if (!delta) return;
                  event.preventDefault();
                  const next = (index + delta + systems.length) % systems.length;
                  buttonRefs.current[next]?.focus();
                  select(next);
                }}
              >
                <span className={styles.nodeIcon}>
                  <Icon size={17} strokeWidth={1.6} aria-hidden />
                </span>
                <span className={styles.nodeText}>
                  <strong>{system.name}</strong>
                  <span>{system.detail}</span>
                </span>
                <span className={styles.nodePoint} aria-hidden />
              </button>
            );
          })}
        </div>
        <span className={styles.dragHint} aria-hidden>
          Drag to change perspective
        </span>
      </div>
      <figcaption className={styles.caption}>
        <div aria-live="polite" aria-atomic="true" className={styles.description}>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <span className={styles.fact}>{current.fact}</span>
        </div>
        <button
          type="button"
          onClick={() => openCase(current.caseId)}
          className={styles.open}
          aria-label={`Open ${systems[selected].name.toLowerCase()} case study`}
        >
          <ArrowUpRight size={21} aria-hidden />
        </button>
      </figcaption>
    </figure>
  );
}
