"use client";

import Link from "next/link";
import Button from "./Button";
import Media from "./Media";
import PageTheme from "./PageTheme";
import ProductDemo from "./ProductDemo";
import ScrambleText from "./Scramble";
import { ArrowDown, ArrowRight } from "./Icons";
import { useInView } from "../hooks/useInView";
import { cardGrids } from "../lib/site";
// same layout as the service sub-pages, so every detail page reads alike
import styles from "../services/[slug]/[sub]/sub.module.css";

/** The page an industry, product or client card's Explore opens. */
export default function DetailView({ gridId, index }: { gridId: string; index: number }) {
  const grid = cardGrids.find((g) => g.id === gridId)!;
  const item = grid.items[index];
  const n = String(index + 1).padStart(3, "0");
  const caps = useInView<HTMLOListElement>();

  return (
    <>
      <PageTheme base="light" />

      <header className={styles.hero}>
        <Link href={`/#${grid.id}`} className={styles.back}>
          <span className={styles.backIcon}>
            <ArrowRight />
          </span>
          <ScrambleText>{grid.label}</ScrambleText>
        </Link>

        <div className={styles.heroMain}>
          <div className={styles.heroLabel}>
            <ScrambleText>{`${grid.code} ${n}`}</ScrambleText>
            <ScrambleText delay={0.1}>{item.title}</ScrambleText>
          </div>

          <h1 className={styles.statement}>{item.body}</h1>

          <p className={styles.intro}>{item.intro}</p>

          <div className={styles.heroFoot}>
            <Button href="/contact" icon={<ArrowRight />} className={styles.heroCta}>
              Let&apos;s Talk
            </Button>
            <span className={styles.slash}>/</span>
            <a href="#detail" className={styles.explore}>
              Explore
              <span className={styles.exploreIcon}>
                <ArrowDown />
              </span>
            </a>
          </div>
        </div>

        <figure className={styles.heroMedia}>
          <Media src={item.image} seed={index % 6} dark priority />
          <figcaption className={styles.heroMediaLabel}>
            <ScrambleText delay={0.2}>{grid.code}</ScrambleText>
            <ScrambleText delay={0.25}>{n}</ScrambleText>
          </figcaption>
        </figure>
      </header>

      <section className={styles.body} id="detail">
        <div className={styles.bodyLabel}>
          <span>{n}</span>
          <span className={styles.slash}>/</span>
          <span>{grid.label}</span>
        </div>

        <div className={styles.bodyMain}>
          <h2 className={styles.bodyTitle}>{item.title}</h2>

          <ol className={styles.caps} ref={caps}>
            {item.points.map((point, i) => (
              <li
                key={point}
                className={styles.cap}
                style={{ ["--index" as string]: String(i) }}
              >
                <ScrambleText className={styles.capNum} delay={i * 0.1}>
                  {String(i + 1).padStart(2, "0")}
                </ScrambleText>
                <span className={styles.capName}>{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* products get their own screen from the home page demo */}
      {grid.id === "products" ? (
        <div className={styles.demo}>
          <ProductDemo only={index} />
        </div>
      ) : null}

      <section className={styles.more}>
        <h2 className={styles.moreTitle}>More in {grid.label}</h2>
        <ul>
          {grid.items.map((other, i) =>
            i === index ? null : (
              <li key={other.slug}>
                <Link href={`${grid.base}/${other.slug}`} className={styles.moreLink}>
                  <span className={styles.moreIndex}>{String(i + 1).padStart(3, "0")}</span>
                  <span className={styles.moreName}>{other.title}</span>
                  <span className={styles.moreArrow}>
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ),
          )}
        </ul>
      </section>
    </>
  );
}
