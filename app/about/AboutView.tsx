"use client";

import Link from "next/link";
import PageTheme, { ThemeZone } from "../components/PageTheme";
import Button from "../components/Button";
import Accordion from "../components/Accordion";
import ScrambleText from "../components/Scramble";
import { ArrowRight } from "../components/Icons";
import { useRevealGroup } from "../hooks/useReveal";
import { about, cardGrids, offices, projects, services, site } from "../lib/site";
import styles from "./about.module.css";

const count = (id: string) => cardGrids.find((g) => g.id === id)?.items.length ?? 0;

const stats = [
  { value: site.since.match(/\d{4}/)?.[0] ?? "2016", label: "Building software since" },
  { value: String(services.length), label: "Service lines" },
  { value: String(count("industries")), label: "Industries served" },
  { value: String(count("products")), label: "Products in production" },
  { value: String(projects.length), label: "Featured projects" },
  { value: String(offices.length), label: `Offices: ${offices.map((o) => o.country).join(" and ")}` },
];

const pillars = [
  {
    code: "S001",
    title: "Services",
    body: `${services.map((s) => s.title.replace(/ \(.*\)/, "")).slice(0, 4).join(", ")} and more, delivered by one team from plan to results.`,
    cta: "Explore services",
    href: "/#services",
  },
  {
    code: "I001",
    title: "Industries",
    body: `Production systems across ${count("industries")} industries, from automotive and energy to healthcare and financial services.`,
    cta: "Find your industry",
    href: "/#industries",
  },
  {
    code: "P001",
    title: "Products",
    body: "Software we built, own and run ourselves, so the patterns we bring are already proven.",
    cta: "See the portfolio",
    href: "/#products",
  },
];

/** First and last initial: "Muhammad Mosleh Uddin" → "MU". */
const initials = (name: string) => {
  const parts = name.split(" ");
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
};

/** Mono red label above each section title. */
function Label({ children }: { children: string }) {
  return (
    <p className={styles.label} data-reveal>
      <ScrambleText>{children}</ScrambleText>
    </p>
  );
}

export default function AboutView() {
  const ref = useRevealGroup<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageTheme base="dark" />

      <header className={styles.hero}>
        <div className={styles.heroBar}>
          <p className={styles.crumb}>
            <span className={styles.slash}>/</span>
            <span>About {site.name}</span>
          </p>
          <ScrambleText className={styles.est} delay={0.2}>
            {`Est. ${stats[0].value}`}
          </ScrambleText>
        </div>

        <div className={styles.heroBody}>
          <h1 className={styles.heroTitle}>{about.hero.title}</h1>
          <div className={styles.heroSide}>
            <p className={styles.heroLead} data-reveal>
              {about.hero.lead}
            </p>
            <div className={styles.heroActions} data-reveal>
              <Button href="/contact" color="red" full>
                Let’s talk
              </Button>
              <Button href="/#services" color="grey" full>
                What we do
              </Button>
            </div>
          </div>
        </div>
      </header>

      <ThemeZone theme="light">
        <section className={styles.intro}>
          <Label>Who we are</Label>
          <div className={styles.introText}>
            <h2 className={styles.h2} data-reveal>
              {about.intro.title}
            </h2>
            <p className={styles.muted} data-reveal>
              {about.intro.body}
            </p>
          </div>
        </section>

        <ul className={styles.stats}>
          {stats.map((stat) => (
            <li key={stat.label} className={styles.stat} data-reveal>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>

        <section className={styles.section}>
          <Label>What we do</Label>
          <h2 className={styles.h2} data-reveal>
            What we change for our clients
          </h2>
          <ul className={styles.pillars}>
            {pillars.map((p) => (
              <li key={p.code} data-reveal>
                <Link href={p.href} className={styles.pillar}>
                  <span className={styles.pillarCode}>{p.code}</span>
                  <span className={styles.pillarTitle}>{p.title}</span>
                  <span className={styles.pillarBody}>{p.body}</span>
                  <span className={styles.pillarCta}>
                    {p.cta} <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.operate}>
          <Label>How we operate</Label>
          <h2 className={styles.h2} data-reveal>
            Responsible by default
          </h2>
          <ol className={styles.columns}>
            {about.operate.map((item, i) => (
              <li key={item.title} className={styles.column} data-reveal>
                <span className={styles.code}>{`R${String(i + 1).padStart(3, "0")}`}</span>
                <h3 className={styles.h3}>{item.title}</h3>
                <p className={styles.muted}>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section}>
          <Label>Leadership</Label>
          <h2 className={styles.h2} data-reveal>
            The people accountable for your project
          </h2>
          {/* Five fit on one row; any other count wraps four to a row. */}
          <ul
            className={styles.people}
            style={{ ["--cols" as string]: about.leadership.length === 5 ? 5 : 4 }}
          >
            {about.leadership.map((person, i) => (
              <li key={person.name} className={styles.person} data-reveal>
                <div className={styles.portrait} aria-hidden="true">
                  <span className={styles.code}>{`L${String(i + 1).padStart(3, "0")}`}</span>
                  <span className={styles.initials}>{initials(person.name)}</span>
                </div>
                <h3 className={styles.h3}>{person.name}</h3>
                <p className={styles.role}>{person.role}</p>
                {person.bio ? <p className={styles.muted}>{person.bio}</p> : null}
                {person.note ? <p className={styles.personNote}>{person.note}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <Label>Offices</Label>
          <h2 className={styles.h2} data-reveal>
            In-house, in Bangladesh
          </h2>
          <ul className={styles.offices}>
            {offices.map((office, i) => (
              <li key={office.country} className={styles.office} data-reveal>
                <span className={styles.officeCode}>
                  {`O${String(i + 1).padStart(3, "0")}`}
                  <span className={styles.slash}>/</span>
                  Bangladesh
                </span>
                <span className={styles.officeCity}>{office.country}</span>
                <address className={styles.officeLines}>
                  {office.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <a href={`tel:+88${office.phone}`} className={styles.officePhone}>
                  {office.phone}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.faq}>
          <div className={styles.faqHead}>
            <p className={styles.faqLabel}>
              FAQ <span>({String(about.faq.length).padStart(3, "0")})</span>
            </p>
            <h2 className={styles.h2}>About working with {site.name}</h2>
          </div>
          <div className={styles.faqList}>
            <Accordion rows={about.faq} compact />
          </div>
        </section>
      </ThemeZone>
    </div>
  );
}
