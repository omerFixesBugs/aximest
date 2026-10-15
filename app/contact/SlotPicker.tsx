"use client";

import { useId, useState, useSyncExternalStore } from "react";
import styles from "./SlotPicker.module.css";

const MONTHS_AHEAD = 3;
const LEAD_MINUTES = 60; // earliest bookable slot today is an hour out
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 9:00 AM to 8:00 PM in the visitor's own time, every 30 minutes
const SLOTS = Array.from({ length: 23 }, (_, i) => 540 + i * 30);
const GROUPS = [
  { name: "Morning", from: 0, to: 720 },
  { name: "Afternoon", from: 720, to: 1020 },
  { name: "Evening", from: 1020, to: 1440 },
];

const label = (mins: number) => {
  const h = Math.floor(mins / 60);
  return `${((h + 11) % 12) + 1}:${String(mins % 60).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

const key = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const noop = () => () => {};

/** Local "YYYY-MM-DD|minute-of-day", rounded to 30 minutes so the snapshot stays stable. */
function localNow() {
  const d = new Date();
  const mins = d.getHours() * 60 + d.getMinutes();
  return `${key(d.getFullYear(), d.getMonth(), d.getDate())}|${mins - (mins % 30)}`;
}

export default function SlotPicker() {
  // the visitor's clock decides what's bookable; the server renders a placeholder
  const now = useSyncExternalStore(noop, localNow, () => "");
  const tz = useSyncExternalStore(noop, () => Intl.DateTimeFormat().resolvedOptions().timeZone, () => "");
  const [page, setPage] = useState(0); // months from the current one
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<number | null>(null);
  const id = useId();

  const [today, nowMins] = now ? [now.split("|")[0], Number(now.split("|")[1])] : ["", 0];
  const [ty, tm, td] = today ? today.split("-").map(Number) : [2000, 1, 1];
  const end = new Date(ty, tm - 1 + MONTHS_AHEAD, td);
  const last = key(end.getFullYear(), end.getMonth(), end.getDate());

  const open = (day: string, mins: number) => day !== today || mins >= nowMins + 30 + LEAD_MINUTES;
  const bookable = (day: string) => day >= today && day <= last && SLOTS.some((s) => open(day, s));

  // the month on screen, as a Monday-first grid
  const view = new Date(ty, tm - 1 + page, 1);
  const vy = view.getFullYear();
  const vm = view.getMonth();
  const lead = (view.getDay() + 6) % 7;
  const length = new Date(vy, vm + 1, 0).getDate();

  const pickDay = (day: string) => {
    setDate(day);
    if (slot !== null && !open(day, slot)) setSlot(null);
  };

  const [dy, dm, dd] = date ? date.split("-").map(Number) : [0, 0, 0];
  const at = date && slot !== null ? new Date(dy, dm - 1, dd, Math.floor(slot / 60), slot % 60) : null;
  const dayName = date
    ? new Date(dy, dm - 1, dd).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
    : "";

  return (
    <div className={styles.picker}>
      <input type="hidden" name="tz" value={tz} />
      <input type="hidden" name="at" value={at ? at.toISOString() : ""} />

      <div className={styles.calendar} role="radiogroup" aria-labelledby={`${id}-month`}>
        <div className={styles.head}>
          <span className={styles.month} id={`${id}-month`} aria-live="polite">
            {today ? view.toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : " "}
          </span>
          <div className={styles.nav}>
            <button type="button" aria-label="Previous month" disabled={page === 0} onClick={() => setPage(page - 1)}>
              <svg viewBox="0 0 8 12" aria-hidden="true"><path d="M6.5 1 1.5 6l5 5" /></svg>
            </button>
            <button type="button" aria-label="Next month" disabled={page === MONTHS_AHEAD} onClick={() => setPage(page + 1)}>
              <svg viewBox="0 0 8 12" aria-hidden="true"><path d="m1.5 1 5 5-5 5" /></svg>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {WEEKDAYS.map((w) => (
            <span key={w} className={styles.weekday} aria-hidden="true">
              {w}
            </span>
          ))}
          {Array.from({ length: lead }, (_, i) => (
            <span key={`pad${i}`} />
          ))}
          {Array.from({ length }, (_, i) => {
            const day = key(vy, vm, i + 1);
            const can = today !== "" && bookable(day);
            return (
              <label key={day} className={styles.day} data-today={day === today}>
                <input
                  type="radio"
                  name="day"
                  value={day}
                  required
                  disabled={!can}
                  checked={date === day}
                  onChange={() => pickDay(day)}
                  aria-label={new Date(vy, vm, i + 1).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                />
                <span>{i + 1}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.times} role="radiogroup" aria-labelledby={`${id}-time`}>
        <div className={styles.head}>
          <span className={styles.month} id={`${id}-time`}>
            {date ? dayName : "Pick a day"}
          </span>
        </div>
        <p className={styles.zone}>Times shown in your timezone{tz ? ` (${tz.replace(/_/g, " ")})` : ""}</p>

        <div className={styles.groups} data-waiting={!date}>
          {GROUPS.map((g) => (
            <div key={g.name} className={styles.group}>
              <span className={styles.groupName}>{g.name}</span>
              <div className={styles.slots}>
                {SLOTS.filter((s) => s >= g.from && s < g.to).map((s) => (
                  <label key={s} className={styles.slot}>
                    <input
                      type="radio"
                      name="slot"
                      value={label(s)}
                      required
                      disabled={!date || !open(date, s)}
                      checked={slot === s}
                      onChange={() => setSlot(s)}
                    />
                    <span>{label(s)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!date ? <p className={styles.waiting}>Choose a day on the calendar</p> : null}
        </div>
      </div>

      <div className={styles.summary} data-show={Boolean(at)} aria-live="polite">
        {at ? (
          <>
            <span className={styles.check} aria-hidden="true">
              <svg viewBox="0 0 12 10"><path d="m1 5 3.5 3.5L11 1.5" /></svg>
            </span>
            <span>
              <strong>
                {dayName} at {label(slot!)}
              </strong>
              <em>Your local time. The call takes about 30 minutes.</em>
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
