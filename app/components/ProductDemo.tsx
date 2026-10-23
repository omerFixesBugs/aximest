"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cardGrids } from "../lib/site";
import styles from "./ProductDemo.module.css";

/** The products section's own cards, so the tabs follow any rename there. */
const PRODUCTS = cardGrids.find((g) => g.id === "products")!.items;

/** How long each product stays up before the next one fades in. */
const SLIDE_MS = 6500;

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

type Kpi = {
  label: string;
  to: number;
  prefix?: string;
  suffix?: string;
  note: string;
};

function Kpis({ items, on }: { items: Kpi[]; on: boolean }) {
  return (
    <div className={styles.kpis}>
      {items.map((k) => (
        <div key={k.label}>
          <span>{k.label}</span>
          <strong>
            <Count to={k.to} start={on} prefix={k.prefix} suffix={k.suffix} />
          </strong>
          <em>{k.note}</em>
        </div>
      ))}
    </div>
  );
}

/* ---------------- ERP: operations overview ---------------- */

const EVENTS = [
  { tag: "Finance", text: "Invoice #2041 matched to bank payment" },
  { tag: "Sales", text: "New lead scored 86, assigned to Rafi" },
  { tag: "Stock", text: "SKU-118 running low, reorder drafted" },
  { tag: "Support", text: "Ticket #932 answered by AI agent" },
  { tag: "Reports", text: "Weekly sales report sent to 4 managers" },
  { tag: "Delivery", text: "Order #5520 rescheduled, customer notified" },
  { tag: "HR", text: "Leave request approved, payroll updated" },
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

function Erp({ on }: { on: boolean }) {
  const reduced = useReducedMotion();
  // newest first; each entry keeps a unique key so the arrival animates
  const [feed, setFeed] = useState(() =>
    EVENTS.slice(0, 5).map((e, i) => ({ ...e, key: i })),
  );
  // survives the slideshow leaving and coming back, so keys never repeat
  const next = useRef(5);

  useEffect(() => {
    if (!on || reduced) return;
    const id = window.setInterval(() => {
      // built outside the updater: StrictMode runs updaters twice
      const n = next.current++;
      const item = { ...EVENTS[n % EVENTS.length], key: n };
      setFeed((f) => [item, ...f.slice(0, 4)]);
    }, 2200);
    return () => window.clearInterval(id);
  }, [on, reduced]);

  return (
    <>
      <Kpis
        on={on}
        items={[
          {
            label: "Revenue this month",
            to: 482190,
            prefix: "$",
            note: "+18.4% vs last month",
          },
          { label: "Orders", to: 1284, note: "+9.1% vs last month" },
          {
            label: "Hours saved by automation",
            to: 312,
            suffix: " h",
            note: "Across 14 workflows",
          },
        ]}
      />
      <div className={styles.panels}>
        <div className={styles.panel}>
          <span className={styles.panelTitle}>Revenue, last 12 weeks</span>
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

        <div className={styles.panel}>
          <span className={styles.panelTitle}>AI automations</span>
          <ul className={styles.feed}>
            {feed.map((e, i) => (
              <li key={e.key}>
                <b className={styles.tag}>{e.tag}</b>
                <span>{e.text}</span>
                <time>{i ? `${i * 2}m ago` : "just now"}</time>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ---------------- CRM: sales pipeline ---------------- */

const STAGES = [
  {
    name: "Lead",
    deals: [
      { company: "Meghna Foods", value: "$18,400", owner: "RA" },
      { company: "Northwind Clinics", value: "$42,000", owner: "SK" },
      { company: "Padma Textiles", value: "$9,800", owner: "TJ" },
    ],
  },
  {
    name: "Qualified",
    deals: [
      { company: "Blue Harbor Logistics", value: "$64,500", owner: "RA" },
      { company: "Sundarban Agro", value: "$27,300", owner: "MI" },
    ],
  },
  {
    name: "Proposal",
    deals: [
      { company: "Crescent Pharma", value: "$118,000", owner: "SK" },
      { company: "Lotus Retail Group", value: "$51,200", owner: "TJ" },
    ],
  },
  {
    name: "Won",
    deals: [
      { company: "Delta Motors", value: "$86,900", owner: "MI" },
      { company: "Riverside Hotels", value: "$33,750", owner: "RA" },
    ],
  },
];

function Crm({ on }: { on: boolean }) {
  return (
    <>
      <Kpis
        on={on}
        items={[
          {
            label: "Open pipeline",
            to: 1240000,
            prefix: "$",
            note: "86 deals in play",
          },
          {
            label: "Win rate",
            to: 32,
            suffix: "%",
            note: "+6 pts this quarter",
          },
          { label: "Follow-ups sent by AI", to: 418, note: "This month" },
        ]}
      />
      <div className={styles.board}>
        {STAGES.map((stage, s) => (
          <div key={stage.name} className={styles.panel}>
            <span className={styles.panelTitle}>
              {stage.name} <i>{stage.deals.length}</i>
            </span>
            <ul className={styles.deals}>
              {stage.deals.map((d, i) => (
                <li
                  key={d.company}
                  style={{ ["--d" as string]: `${0.15 + (s * 3 + i) * 0.06}s` }}
                  data-won={stage.name === "Won" || undefined}
                >
                  <b>{d.company}</b>
                  <span>
                    {d.value}
                    <i>{d.owner}</i>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------- Pulse: live business metrics ---------------- */

const REGIONS = [
  { name: "Dhaka", value: 92 },
  { name: "Chattogram", value: 71 },
  { name: "Sylhet", value: 48 },
  { name: "Khulna", value: 39 },
  { name: "Rajshahi", value: 33 },
  { name: "Online", value: 84 },
];

const ACCOUNTS = [
  { name: "Delta Motors", value: "$212k", change: "+12%" },
  { name: "Crescent Pharma", value: "$184k", change: "+8%" },
  { name: "Riverside Hotels", value: "$131k", change: "+21%" },
  { name: "Meghna Foods", value: "$97k", change: "-3%" },
  { name: "Lotus Retail", value: "$88k", change: "+5%" },
];

function Pulse({ on }: { on: boolean }) {
  return (
    <>
      <Kpis
        on={on}
        items={[
          {
            label: "Gross margin",
            to: 42,
            suffix: "%",
            note: "Updated 2 min ago",
          },
          { label: "Active customers", to: 3912, note: "+214 this month" },
          {
            label: "Data sources connected",
            to: 11,
            note: "ERP, POS, ads, bank",
          },
        ]}
      />
      <div className={styles.panels}>
        <div className={styles.panel}>
          <span className={styles.panelTitle}>
            Revenue by region, this quarter
          </span>
          <div className={styles.bars}>
            {REGIONS.map((r, i) => (
              <div
                key={r.name}
                style={{
                  ["--v" as string]: r.value / 100,
                  ["--d" as string]: `${0.2 + i * 0.08}s`,
                }}
              >
                <i />
                <span>{r.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <span className={styles.panelTitle}>Top accounts</span>
          <ul className={styles.table}>
            {ACCOUNTS.map((a) => (
              <li key={a.name}>
                <span>{a.name}</span>
                <b>{a.value}</b>
                <em data-down={a.change.startsWith("-") || undefined}>
                  {a.change}
                </em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ---------------- Inbox Agent: AI support email ---------------- */

const MAIL = [
  {
    from: "Nadia R.",
    subject: "Where is my order #5520?",
    tag: "Order status",
    status: "Auto-replied",
  },
  {
    from: "Karim Traders",
    subject: "Invoice copy for March please",
    tag: "Billing",
    status: "Auto-replied",
  },
  {
    from: "S. Ahmed",
    subject: "Product arrived damaged",
    tag: "Refund",
    status: "Drafted",
  },
  {
    from: "Blue Harbor",
    subject: "Contract renewal question",
    tag: "Sales",
    status: "Routed to Rafi",
  },
  {
    from: "Tania M.",
    subject: "Can I change my delivery slot?",
    tag: "Delivery",
    status: "Auto-replied",
  },
];

const REPLY =
  "Hi S. Ahmed, sorry your order arrived damaged. I've issued a full refund of $48.00 to your card and booked a free pickup for tomorrow, 10am to 1pm. No need to repack it.";

function Inbox({ on }: { on: boolean }) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState(0);

  // the agent "writes" its draft each time this product comes up
  useEffect(() => {
    if (!on || reduced) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 2;
      setTyped(Math.min(n, REPLY.length));
      if (n >= REPLY.length) window.clearInterval(id);
    }, 28);
    return () => {
      window.clearInterval(id);
      setTyped(0);
    };
  }, [on, reduced]);

  return (
    <>
      <Kpis
        on={on}
        items={[
          { label: "Emails today", to: 248, note: "Support and sales inboxes" },
          {
            label: "Answered by AI",
            to: 71,
            suffix: "%",
            note: "The rest routed to a person",
          },
          { label: "First reply", to: 2, suffix: " min", note: "Was 6 hours" },
        ]}
      />
      <div className={styles.panels} data-flip>
        <div className={styles.panel}>
          <span className={styles.panelTitle}>Inbox</span>
          <ul className={styles.mail}>
            {MAIL.map((m, i) => (
              <li key={m.subject} data-active={i === 2 || undefined}>
                <b>{m.from}</b>
                <span>{m.subject}</span>
                <span className={styles.mailMeta}>
                  <b className={styles.tag}>{m.tag}</b>
                  <em>{m.status}</em>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panel}>
          <span className={styles.panelTitle}>Draft reply, written by AI</span>
          <p className={styles.reply}>
            {reduced ? REPLY : REPLY.slice(0, typed)}
            <i className={styles.caret} />
          </p>
          <div className={styles.replyActions}>
            <span>Refund $48.00</span>
            <span>Pickup booked</span>
            <span data-send>Send</span>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- the window ---------------- */

const SCREENS = [
  {
    Screen: Erp,
    url: "erp.demo.aximest.app/overview",
    nav: [
      "Overview",
      "Orders",
      "Inventory",
      "Customers",
      "Automations",
      "Reports",
    ],
  },
  {
    Screen: Crm,
    url: "crm.demo.aximest.app/pipeline",
    nav: ["Pipeline", "Contacts", "Companies", "Tasks", "Sequences", "Reports"],
  },
  {
    Screen: Pulse,
    url: "pulse.demo.aximest.app/regions",
    nav: ["Overview", "Regions", "Products", "Customers", "Sources", "Alerts"],
  },
  {
    Screen: Inbox,
    url: "inbox.demo.aximest.app/support",
    nav: ["Support", "Sales", "Billing", "Escalated", "Rules", "Analytics"],
  },
];

/**
 * Our products, one after another, in the same app window. Every number is
 * sample data; the caption and the tag in the window bar say so. A progress
 * line under the active tab times each slide, and its animationend moves on.
 * With `only`, it shows that one product and no tabs (the product pages).
 */
export default function ProductDemo({ only }: { only?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(only ?? 0);
  const count = Math.min(PRODUCTS.length, SCREENS.length);

  // the slideshow starts the first time the window scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={styles.demo}
      ref={ref}
      data-ready={ready}
      style={{ ["--slide" as string]: `${SLIDE_MS}ms` }}
    >
      <p className={styles.caption}>
        <span>Product demo</span>
        <span>
          {only === undefined
            ? `${String(count).padStart(2, "0")} products, shown with sample data`
            : "Shown with sample data"}
        </span>
      </p>

      {only === undefined ? (
        <div className={styles.tabs} role="tablist" aria-label="Product demos">
          {PRODUCTS.slice(0, count).map((p, i) => (
            <button
              key={p.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={styles.tab}
              onClick={() => setActive(i)}
            >
              <span className={styles.tabIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.tabName}>{p.title}</span>
              <i
                className={styles.progress}
                onAnimationEnd={() => setActive((a) => (a + 1) % count)}
              />
            </button>
          ))}
        </div>
      ) : null}

      <div className={styles.app} aria-hidden="true">
        <div className={styles.bar}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>{SCREENS[active].url}</span>
          <span className={styles.live}>Sample data</span>
        </div>

        <div className={styles.slides}>
          {SCREENS.slice(0, count).map(({ Screen, nav }, i) => (
            <div
              key={i}
              className={styles.body}
              data-on={(ready && i === active) || undefined}
            >
              <nav className={styles.nav}>
                <span className={styles.navTitle}>{PRODUCTS[i].title}</span>
                {nav.map((n, j) => (
                  <span key={n} data-active={j === 0}>
                    {n}
                  </span>
                ))}
              </nav>
              <div className={styles.main}>
                <Screen on={ready && i === active} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
