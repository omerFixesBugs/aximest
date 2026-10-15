"use client";

import { useActionState, useState, type ReactNode } from "react";
import Button from "../components/Button";
import { ArrowRight } from "../components/Icons";
import ScrambleText from "../components/Scramble";
import { bookCall, sendEnquiry, type FormState } from "./actions";
import SlotPicker from "./SlotPicker";
import styles from "./contact.module.css";

const SUBJECTS = [
  "New project",
  "Custom software",
  "Web or mobile app",
  "AI automation",
  "Enterprise software / ERP",
  "Advisory / fractional CTO",
  "Blockchain",
  "Something else",
];

function Label({ text, delay = 0, required = true }: { text: string; delay?: number; required?: boolean }) {
  return (
    <span className={styles.label}>
      <ScrambleText delay={delay}>{text}</ScrambleText>
      {required ? <em>*</em> : null}
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  autoComplete,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  delay?: number;
}) {
  return (
    <label className={styles.field}>
      <Label text={label} delay={delay} required={required} />
      <input
        className={styles.input}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
      />
    </label>
  );
}

function Select({ label, name, options, required = true, placeholder = "Select one", delay = 0, onChange }: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
  delay?: number;
  onChange?: (v: string) => void;
}) {
  return (
    <label className={styles.field}>
      <Label text={label} delay={delay} required={required} />
      <span className={styles.selectWrap}>
        <select
          className={styles.input}
          name={name}
          required={required}
          defaultValue=""
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="" disabled={required}>
            {placeholder}
          </option>
          {options.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          <svg viewBox="0 0 12 8" fill="none" width="100%" height="100%">
            <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </span>
    </label>
  );
}

/** Spam trap: hidden from people, filled in by bots. */
function Honeypot() {
  return (
    <input className={styles.trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
  );
}

function Submit({ state, pending, children }: { state: FormState; pending: boolean; children: ReactNode }) {
  return (
    <div className={styles.submitRow}>
      <p className={styles.note} role="status" data-error={state ? !state.ok : undefined}>
        {pending ? "Sending…" : state?.message}
      </p>
      <Button icon={<ArrowRight />} type="submit" className={styles.submit} disabled={pending}>
        {children}
      </Button>
    </div>
  );
}

function MessageForm() {
  const [state, action, pending] = useActionState(sendEnquiry, null);
  return (
    <form className={styles.form} action={action}>
      <Honeypot />
      <Select label="Subject" name="subject" options={SUBJECTS} />
      <Field label="First name" name="firstName" autoComplete="given-name" delay={0.1} />
      <Field label="Last name" name="lastName" autoComplete="family-name" delay={0.2} />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" delay={0.3} />
      <Field label="Email" name="email" type="email" autoComplete="email" delay={0.4} />
      <label className={styles.field}>
        <Label text="Message" delay={0.5} />
        <textarea className={styles.textarea} name="message" rows={4} required maxLength={5000} />
      </label>
      <Submit state={state} pending={pending}>Send message</Submit>
    </form>
  );
}

function BookingForm() {
  const [state, action, pending] = useActionState(bookCall, null);
  return (
    <form className={styles.form} action={action}>
      <Honeypot />
      <Field label="Your name" name="name" autoComplete="name" />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" delay={0.1} />
      <Field label="Email" name="email" type="email" autoComplete="email" delay={0.2} />

      <SlotPicker />

      <Select label="What's it about" name="topic" options={SUBJECTS} required={false} placeholder="Optional" delay={0.5} />
      <label className={styles.field}>
        <Label text="Anything we should know" delay={0.6} required={false} />
        <textarea className={styles.textarea} name="note" rows={3} maxLength={2000} />
      </label>
      <Submit state={state} pending={pending}>Book the call</Submit>
    </form>
  );
}

export default function ContactForm() {
  const [mode, setMode] = useState<"message" | "call">("message");

  return (
    <div className={styles.forms}>
      <div className={styles.switch} role="group" aria-label="How to reach us">
        <button type="button" aria-pressed={mode === "message"} onClick={() => setMode("message")}>
          Send a message
        </button>
        <button type="button" aria-pressed={mode === "call"} onClick={() => setMode("call")}>
          Book a call
        </button>
      </div>
      <p className={styles.switchNote}>
        {mode === "message"
          ? "Tell us what you need. We reply within one business day."
          : "Pick a time and we'll call you. Calls take about 30 minutes."}
      </p>
      {mode === "message" ? <MessageForm /> : <BookingForm />}
    </div>
  );
}
