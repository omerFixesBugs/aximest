"use client";

import Link from "next/link";
import SectionHead from "./SectionHead";
import ScrambleText, { scrambleWithin } from "./Scramble";
import { ArrowRight } from "./Icons";
import { useInView } from "../hooks/useInView";
import { useRevealGroup } from "../hooks/useReveal";
import type { cardGrids } from "../lib/site";
import styles from "./CardGrid.module.css";

/**
 * Section head over a three-up grid of grey cards. The cards rise in by
 * column once the grid reaches the viewport; hovering re-shuffles the label.
 */
export default function CardGrid({ grid }: { grid: (typeof cardGrids)[number] }) {
  const ref = useRevealGroup<HTMLElement>();
  const list = useInView<HTMLOListElement>();

  return (
    <section className={styles.section} id={grid.id} ref={ref}>
      <SectionHead
        label={grid.label}
        title={grid.title}
        aside={<span className={styles.aside}>{grid.aside}</span>}
      />

      <ol className={styles.list} ref={list} data-wide={grid.wide || undefined}>
        {grid.items.map((item, i) => (
          <li
            key={item.title}
            className={styles.item}
            style={{ ["--stagger" as string]: `${(i % (grid.wide ? 4 : 3)) * 0.08}s` }}
          >
            <article
              className={styles.card}
              onMouseEnter={(e) => scrambleWithin(e.currentTarget)}
            >
              <Link href={item.href} className={styles.link} aria-label={item.title} />
              <div className={styles.header}>
                <p className={styles.label}>
                  <ScrambleText>{grid.code}</ScrambleText>
                  <span>{String(i + 1).padStart(3, "0")}</span>
                </p>
                <i className={styles.indicator} aria-hidden="true" />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </div>
              <div className={styles.footer} aria-hidden="true">
                <ArrowRight />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
