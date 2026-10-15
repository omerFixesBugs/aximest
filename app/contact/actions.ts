"use server";

const TO = "aximest@gmail.com";
// RESEND_EMAIL_DOMAIN comes from the Vercel Resend integration; sending only
// works once that domain shows "verified" in Resend
const FROM =
  process.env.RESEND_FROM ??
  `Aximest Website <website@${process.env.RESEND_EMAIL_DOMAIN ?? "aximest.com"}>`;

export type FormState = { ok: boolean; message: string } | null;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Trimmed text field, capped so nobody can post a novel. */
function field(form: FormData, name: string, max = 200) {
  return String(form.get(name) ?? "").trim().slice(0, max);
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

async function send(subject: string, rows: [string, string][], replyTo: string): Promise<FormState> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY is not set");
    return { ok: false, message: "Sending is not set up yet. Call or email us directly." };
  }

  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="color:#666;vertical-align:top">${escape(k)}</td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: replyTo, subject, html, text }),
  });

  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text());
    return { ok: false, message: "Couldn't send right now. Try again, or call us directly." };
  }
  return null;
}

export async function sendEnquiry(_: FormState, form: FormData): Promise<FormState> {
  if (field(form, "website")) return { ok: true, message: "Sent." }; // honeypot

  const d = {
    subject: field(form, "subject", 80),
    firstName: field(form, "firstName", 80),
    lastName: field(form, "lastName", 80),
    phone: field(form, "phone", 40),
    email: field(form, "email", 120),
    message: field(form, "message", 5000),
  };
  if (!d.subject || !d.firstName || !d.lastName || !d.phone || !d.message || !isEmail(d.email)) {
    return { ok: false, message: "Fill in every field with a valid email address." };
  }

  const failed = await send(
    `New enquiry: ${d.subject} from ${d.firstName} ${d.lastName}`,
    [
      ["Subject", d.subject],
      ["Name", `${d.firstName} ${d.lastName}`],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Message", d.message],
    ],
    d.email,
  );
  return failed ?? { ok: true, message: "Message sent. We'll reply within one business day." };
}

/** "Tuesday 20 October 2026, 3:00 pm" in the given timezone. */
function when(at: Date, timeZone: string) {
  return at.toLocaleString("en-GB", {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const isZone = (tz: string) => {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

export async function bookCall(_: FormState, form: FormData): Promise<FormState> {
  if (field(form, "website")) return { ok: true, message: "Booked." }; // honeypot

  const d = {
    name: field(form, "name", 120),
    email: field(form, "email", 120),
    phone: field(form, "phone", 40),
    at: new Date(field(form, "at", 40)),
    topic: field(form, "topic", 80),
    note: field(form, "note", 2000),
    tz: field(form, "tz", 60),
  };
  if (!d.name || !d.phone || !isEmail(d.email)) {
    return { ok: false, message: "Add your name, phone and a valid email." };
  }
  // a real slot: valid, not in the past, within the bookable window
  const t = d.at.getTime();
  if (Number.isNaN(t) || t < Date.now() || t > Date.now() + 130 * 864e5) {
    return { ok: false, message: "Pick a day and time on the calendar." };
  }

  const zone = isZone(d.tz) ? d.tz : "UTC";
  const theirs = when(d.at, zone);
  const ours = when(d.at, "Asia/Dhaka");

  const failed = await send(
    `Call booked: ${d.name}, ${ours} (BD time)`,
    [
      ["Call them at (Bangladesh)", ours],
      ["Their local time", `${theirs} (${zone})`],
      ["Name", d.name],
      ["Phone", d.phone],
      ["Email", d.email],
      ["Topic", d.topic],
      ["Notes", d.note],
    ],
    d.email,
  );
  return failed ?? { ok: true, message: `Booked for ${theirs}, your time. We'll call you on ${d.phone}.` };
}
