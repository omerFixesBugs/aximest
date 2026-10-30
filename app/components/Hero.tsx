"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

/* The Aximest symbol (viewBox "2 4 78 90"), and the points along its outer
   edges where wires plug in: tools enter on the left, results leave right. */
const MARK = "50,50 30,8 6,90 50,50 76,26 62,75";
const PORTS = {
  in: [[30, 8], [18, 49], [6, 90]],
  out: [[76, 26], [69, 50.5], [62, 75]],
} as const;

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
function measure(root: HTMLElement): Wire[] {
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
  const scale = (mark.r - mark.x) / 78;
  const port = (side: Wire["side"], y: number) => {
    const pts = PORTS[side].map(([px, py]) => [mark.x + (px - 2) * scale, mark.y + (py - 4) * scale]);
    return pts.reduce((a, b) => (Math.abs(b[1] - y) < Math.abs(a[1] - y) ? b : a));
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

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const root = flow.current;
    if (!root) return;
    const update = () => setWires(measure(root));
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
              <path d={w.d} pathLength={1} />
              {reduced ? null : (
                <circle r="3">
                  {/* negative begin: every dot is already mid-journey */}
                  <animateMotion
                    dur="2.4s"
                    begin={`${-((i * 0.53) % 2.4)}s`}
                    repeatCount="indefinite"
                    path={w.d}
                  />
                </circle>
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

        {/* the system is the mark itself: drawn on load, a signal circling it */}
        <div className={styles.core} data-core>
          <svg className={styles.mark} viewBox="2 4 78 90" data-mark>
            <polygon className={styles.markBase} points={MARK} pathLength={1} />
            <polygon className={styles.markPulse} points={MARK} pathLength={1} />
          </svg>
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
