"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import Button from "./Button";
import ScrambleText from "./Scramble";
import { site } from "../lib/site";
import styles from "./Hero.module.css";

/** The scattered tools a business starts with. */
const BEFORE = [
  "Spreadsheets",
  "WhatsApp orders",
  "Email threads",
  "Paper forms",
  "Disconnected apps",
];

/** What the one system we build gives back. */
const AFTER = [
  "Web & mobile app",
  "AI automations",
  "Live reports",
  "Connected tools",
];

type Wire = { d: string; side: "in" | "out" };

/** What the system says each time the mark opens into its box. */
const MESSAGES = [
  ["Your system", "One place for every order, task and number."],
  ["128 orders", "Synced from WhatsApp, email and forms today."],
  ["0 spreadsheets", "Stock, invoices and reports update themselves."],
  ["Always live", "Every number on one dashboard, as it happens."],
] as const;

type Pt = readonly [number, number];

/* The core is drawn in a 140x100 box. The Aximest symbol sits in the middle
   of it, and each of its six corners has a partner on the box's outline, in
   the same order round the loop, so the one shape can morph into the other. */
const MARK: Pt[] = [[79, 51], [59, 9], [35, 91], [79, 51], [105, 27], [91, 76]];
const BOX: Pt[] = [[70, 2.25], [2.25, 2.25], [2.25, 97.75], [137.75, 97.75], [137.75, 2.25], [105, 2.25]];

/* Where wires plug in, on the mark and on the box: tools enter on the left,
   results leave on the right. */
const PORTS = {
  in: { mark: [[59, 9], [47, 50], [35, 91]], box: [[2.25, 25], [2.25, 50], [2.25, 75]] },
  out: { mark: [[105, 27], [98, 51.5], [91, 76]], box: [[137.75, 25], [137.75, 50], [137.75, 75]] },
} as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);

/** The outline at morph progress `t` (0 mark, 1 box). */
function shape(t: number): Pt[] {
  const e = ease(t);
  return MARK.map(([x, y], i) => [lerp(x, BOX[i][0], e), lerp(y, BOX[i][1], e)]);
}

/** The closest point on the closed outline, so a wire end never floats off it. */
function snap(pts: Pt[], [px, py]: Pt): Pt {
  let best: Pt = pts[0];
  let bd = Infinity;
  pts.forEach(([ax, ay], i) => {
    const [bx, by] = pts[(i + 1) % pts.length];
    const [dx, dy] = [bx - ax, by - ay];
    const k = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
    const q: Pt = [ax + dx * k, ay + dy * k];
    const d = (q[0] - px) ** 2 + (q[1] - py) ** 2;
    if (d < bd) [best, bd] = [q, d];
  });
  return best;
}

const toPoints = (pts: Pt[]) => pts.map((p) => p.join(",")).join(" ");

const noop = () => () => {};

function useReducedMotion() {
  return useSyncExternalStore(
    noop,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * Curves from every chip to the core, measured from the laid-out DOM so they
 * follow the grid whether it runs across (desktop) or down (phone).
 */
function measure(root: HTMLElement, t: number): Wire[] {
  const box = root.getBoundingClientRect();
  // a rect in the flow's own coordinates, with its centre
  const local = (el: Element) => {
    const r = el.getBoundingClientRect();
    const x = r.left - box.left;
    const y = r.top - box.top;
    return { x, y, r: x + r.width, b: y + r.height, cx: x + r.width / 2, cy: y + r.height / 2 };
  };
  const core = local(root.querySelector("[data-core]")!);
  const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-node]"));
  const across = local(nodes[0]).r <= core.x;
  const f = (v: number) => v.toFixed(1);
  const mark = local(root.querySelector("[data-mark]")!);
  const scale = (mark.r - mark.x) / 140;
  const outline = shape(t);
  const port = (side: Wire["side"], y: number) => {
    const { mark: m, box: b } = PORTS[side];
    const pts = m.map(([mx, my], i) => {
      const [sx, sy] = snap(outline, [lerp(mx, b[i][0], ease(t)), lerp(my, b[i][1], ease(t))]);
      return [mark.x + sx * scale, mark.y + sy * scale];
    });
    return pts.reduce((a, c) => (Math.abs(c[1] - y) < Math.abs(a[1] - y) ? c : a));
  };

  return nodes.map((el) => {
    const n = local(el);
    const side = el.dataset.node as Wire["side"];
    if (across) {
      const [px, py] = port(side, n.cy);
      const [x1, y1, x2, y2] = side === "in" ? [n.r, n.cy, px, py] : [px, py, n.x, n.cy];
      const m = f((x1 + x2) / 2);
      return { side, d: `M${f(x1)},${f(y1)} C${m},${f(y1)} ${m},${f(y2)} ${f(x2)},${f(y2)}` };
    }
    // chips wrap into rows here, so wires leave from under (or above) the
    // whole group rather than cutting through the row below
    const group = local(el.parentElement!);
    const [x1, y1, x2, y2] =
      side === "in" ? [n.cx, group.b, core.cx, core.y] : [core.cx, core.b, n.cx, group.y];
    const m = f((y1 + y2) / 2);
    return { side, d: `M${f(x1)},${f(y1)} C${f(x1)},${m} ${f(x2)},${m} ${f(x2)},${f(y2)}` };
  });
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const flow = useRef<HTMLDivElement>(null);
  const [wires, setWires] = useState<Wire[]>([]);
  // odd ticks show the box, even ticks the mark; reduced motion holds the box
  const [tick, setTick] = useState(0);
  const [held, setHeld] = useState(false);
  const step = reduced ? 1 : tick;
  const [title, line] = MESSAGES[Math.floor(step / 2) % MESSAGES.length];

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    // holding it pauses the switching; it picks up again after release
    if (!ready || reduced || held) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 3600);
    return () => window.clearInterval(id);
  }, [ready, reduced, held]);

  // One animation loop drives the core: it follows the pointer while held
  // and eases back to the centre on release (no overshoot), and it morphs
  // between mark and box. The wires are re-measured on every frame of either.
  const core = useRef<HTMLDivElement>(null);
  const base = useRef<SVGPolygonElement>(null);
  const pulse = useRef<SVGPolygonElement>(null);
  const anim = useRef({ x: 0, y: 0, tx: 0, ty: 0, dx: 0, dy: 0, held: false, t: 0, from: 0, to: 0, start: 0, raf: 0 });

  const run = () => {
    const a = anim.current;
    if (a.raf) return;
    const frame = (now: number) => {
      const k = a.held ? 0.35 : 0.12;
      a.x += (a.tx - a.x) * k;
      a.y += (a.ty - a.y) * k;
      const parked = Math.abs(a.tx - a.x) < 0.3 && Math.abs(a.ty - a.y) < 0.3;
      if (parked) [a.x, a.y] = [a.tx, a.ty];
      a.t = lerp(a.from, a.to, Math.min(1, Math.max(0, (now - a.start) / 900)));

      const pts = toPoints(shape(a.t));
      base.current!.setAttribute("points", pts);
      // fill only once the outline has (almost) become the box
      base.current!.style.fillOpacity = String(Math.max(0, (a.t - 0.8) / 0.2));
      pulse.current!.setAttribute("points", pts);
      core.current!.style.translate = `${a.x}px ${a.y}px`;
      setWires(measure(flow.current!, a.t));

      a.raf = a.held || !parked || a.t !== a.to ? requestAnimationFrame(frame) : 0;
    };
    a.raf = requestAnimationFrame(frame);
  };

  // open into the box, or (once its text has faded) fold back into the mark
  const phase = step % 2;
  useEffect(() => {
    const a = anim.current;
    if (reduced) {
      a.t = a.from = a.to = 1;
      return;
    }
    if (a.to === phase) return;
    a.from = a.t;
    a.to = phase;
    a.start = performance.now() + (phase ? 0 : 250);
    run();
  }, [phase, reduced]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const a = anim.current;
    e.currentTarget.setPointerCapture(e.pointerId);
    a.held = true;
    a.dx = e.clientX - a.x;
    a.dy = e.clientY - a.y;
    [a.tx, a.ty] = [a.x, a.y];
    setHeld(true);
    run();
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const a = anim.current;
    if (!a.held) return;
    const root = flow.current!;
    // stay between the columns, so the wires never cross the chips
    const cs = getComputedStyle(root);
    const mx = parseFloat(cs.columnGap) * 0.8 || root.clientWidth * 0.2;
    const my = parseFloat(cs.rowGap) * 0.8 || root.clientHeight * 0.3;
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    a.tx = clamp(e.clientX - a.dx, mx);
    a.ty = clamp(e.clientY - a.dy, my);
  };

  const onPointerUp = () => {
    const a = anim.current;
    a.held = false;
    a.tx = a.ty = 0;
    setHeld(false);
    run();
  };

  useEffect(() => () => cancelAnimationFrame(anim.current.raf), []);

  useEffect(() => {
    const root = flow.current;
    if (!root) return;
    const update = () => setWires(measure(root, anim.current.t));
    const ro = new ResizeObserver(update);
    ro.observe(root);
    // the web font changes chip widths after first paint
    document.fonts.ready.then(update);
    return () => ro.disconnect();
  }, []);

  return (
    <section className={styles.hero} data-ready={ready}>
      <div className={styles.meta}>
        <ScrambleText delay={0}>{site.mark}</ScrambleText>
        <ScrambleText delay={0.2}>{site.city}</ScrambleText>
        <ScrambleText delay={0.4}>Software &amp; AI</ScrambleText>
        <ScrambleText delay={0.6}>{site.tagline}</ScrambleText>
      </div>

      <div className={styles.intro}>
        <h1 className={styles.headline}>
          <span>We build custom software</span>{" "}
          <span>that grows your business.</span>
        </h1>
        <div className={styles.side}>
          <p className={styles.lede}>
            Web and mobile apps, AI automation and business platforms that run
            your operations, track every number and scale with you.
          </p>
          <div className={styles.actions}>
            <Button href="/contact" color="black">
              Start a project
            </Button>
            <Button href="/projects">See our work</Button>
          </div>
        </div>
      </div>

      {/* What we do, as a picture: scattered tools in, one system, results out. */}
      <div className={styles.flow} ref={flow} aria-hidden="true">
        <svg className={styles.wires}>
          {wires.map((w, i) => (
            <g key={i} data-side={w.side}>
              <path className={styles.line} d={w.d} pathLength={1} />
              {/* the dot is a dash on the wire itself, so it rides the curve
                  smoothly however the wire bends; negative delays put every
                  dot mid-journey */}
              {reduced ? null : (
                <path
                  className={styles.dot}
                  d={w.d}
                  pathLength={1}
                  style={{ animationDelay: `${-((i * 0.53) % 2.4)}s` }}
                />
              )}
            </g>
          ))}
        </svg>

        <div className={styles.col}>
          <span className={styles.colLabel}>Before</span>
          <ul>
            {BEFORE.map((label, i) => (
              <li key={label} data-node="in" style={{ ["--i" as string]: i }}>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* the system is the mark itself, drawn on load with a signal circling
            it; every few seconds it morphs into a box saying what it does */}
        <div
          className={styles.core}
          ref={core}
          data-core
          data-phase={step % 2 ? "box" : "mark"}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className={styles.stage}>
            <svg className={styles.mark} viewBox="0 0 140 100" data-mark>
              <polygon
                ref={base}
                className={styles.markBase}
                points={toPoints(reduced ? BOX : MARK)}
                pathLength={1}
                style={{ fillOpacity: reduced ? 1 : 0 }}
              />
              <polygon
                ref={pulse}
                className={styles.markPulse}
                points={toPoints(MARK)}
                pathLength={1}
              />
            </svg>
            <div className={styles.box}>
              <span className={styles.boxLabel}>{site.name} · live</span>
              <strong>{title}</strong>
              <span>{line}</span>
            </div>
          </div>
          <span className={styles.coreLabel}>Your system · Built by {site.name}</span>
        </div>

        <div className={styles.col} data-side="out">
          <span className={styles.colLabel}>After</span>
          <ul>
            {AFTER.map((label, i) => (
              <li key={label} data-node="out" style={{ ["--i" as string]: i }}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
