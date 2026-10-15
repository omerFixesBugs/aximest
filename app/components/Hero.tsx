"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Button from "./Button";
import ScrambleText from "./Scramble";
import { site } from "../lib/site";
import styles from "./Hero.module.css";

/** What the hero app's automation feed cycles through. */
const EVENTS = [
  { tag: "Finance", text: "Invoice #2041 matched to bank payment" },
  { tag: "Sales", text: "New lead scored 86, assigned to Rafi" },
  { tag: "Stock", text: "SKU-118 running low, reorder drafted" },
  { tag: "Support", text: "Ticket #932 answered by AI agent" },
  { tag: "Reports", text: "Weekly sales report sent to 4 managers" },
  { tag: "Delivery", text: "Order #5520 rescheduled, customer notified" },
  { tag: "HR", text: "Leave request approved, payroll updated" },
];

const NAV = [
  "Overview",
  "Orders",
  "Inventory",
  "Customers",
  "Automations",
  "Reports",
];

// twelve weeks of revenue, drawn as a rising line
const SERIES = [32, 30, 38, 36, 44, 41, 52, 50, 58, 63, 61, 74];
const CHART_W = 600;
const CHART_H = 180;
const points = SERIES.map((v, i) => [
  (i / (SERIES.length - 1)) * CHART_W,
  CHART_H - (v / 80) * CHART_H,
]);
const LINE = points
  .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`)
  .join(" ");
const AREA = `${LINE} L${CHART_W},${CHART_H} L0,${CHART_H} Z`;
const [lastX, lastY] = points[points.length - 1];

const noop = () => () => {};

function useReducedMotion() {
  return useSyncExternalStore(
    noop,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Counts from 0 to `to` once `start` flips, easing out. */
function Count({
  to,
  start,
  prefix = "",
  suffix = "",
}: {
  to: number;
  start: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!start || reduced) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1600);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start, reduced]);
  return (
    <>
      {prefix}
      {(reduced ? to : n).toLocaleString("en-US")}
      {suffix}
    </>
  );
}

export default function Hero() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  // newest first; each entry keeps a unique key so the arrival animates
  const [feed, setFeed] = useState(() =>
    EVENTS.slice(0, 5).map((e, i) => ({ ...e, key: i })),
  );

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready || reduced) return;
    let next = 5;
    const id = window.setInterval(() => {
      // built outside the updater: StrictMode runs updaters twice
      const item = { ...EVENTS[next % EVENTS.length], key: next };
      next += 1;
      setFeed((f) => [item, ...f.slice(0, 4)]);
    }, 2600);
    return () => window.clearInterval(id);
  }, [ready, reduced]);

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

      {/* An example of what we build: a company's own operations app. */}
      <div className={styles.app} aria-hidden="true">
        <div className={styles.bar}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>yourbusiness.app/overview</span>
          <span className={styles.live}>Live</span>
        </div>

        <div className={styles.body}>
          <nav className={styles.nav}>
            {NAV.map((n, i) => (
              <span key={n} data-active={i === 0}>
                {n}
              </span>
            ))}
          </nav>

          <div className={styles.main}>
            <div className={styles.kpis}>
              <div>
                <span>Revenue this month</span>
                <strong>
                  <Count to={482190} start={ready} prefix="$" />
                </strong>
                <em>+18.4% vs last month</em>
              </div>
              <div>
                <span>Orders</span>
                <strong>
                  <Count to={1284} start={ready} />
                </strong>
                <em>+9.1% vs last month</em>
              </div>
              <div>
                <span>Hours saved by automation</span>
                <strong>
                  <Count to={312} start={ready} suffix=" h" />
                </strong>
                <em>Across 14 workflows</em>
              </div>
            </div>

            <div className={styles.panels}>
              <div className={styles.chart}>
                <span className={styles.panelTitle}>
                  Revenue, last 12 weeks
                </span>
                <div className={styles.plot}>
                  <svg
                    viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                    preserveAspectRatio="none"
                  >
                    {[0.25, 0.5, 0.75].map((f) => (
                      <line
                        key={f}
                        x1="0"
                        x2={CHART_W}
                        y1={CHART_H * f}
                        y2={CHART_H * f}
                      />
                    ))}
                    <path className={styles.area} d={AREA} />
                    <path className={styles.line} d={LINE} pathLength={1} />
                  </svg>
                  <span
                    className={styles.point}
                    style={{
                      left: `${(lastX / CHART_W) * 100}%`,
                      top: `${(lastY / CHART_H) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className={styles.feed}>
                <span className={styles.panelTitle}>AI automations</span>
                <ul>
                  {feed.map((e, i) => (
                    <li key={e.key}>
                      <b>{e.tag}</b>
                      <span>{e.text}</span>
                      <time>{i ? `${i * 2}m ago` : "just now"}</time>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
