"use client";

import { useEffect, useRef } from "react";
import Media from "./Media";
import { useParallax } from "../hooks/useInView";
import { testimonial } from "../lib/site";
import styles from "./Testimonial.module.css";

/** Unlit words stay readable over the photo, like the reference's grey. */
const DIM = 0.55;

/**
 * Full-bleed quote over a darkened photo. Words brighten one by one as the
 * section scrolls through the viewport.
 */
export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);
  const bg = useParallax<HTMLDivElement>(0.15);
  const words = testimonial.quote.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const quote = el.querySelector("blockquote");
    if (!quote) return;
    const spans = Array.from(quote.querySelectorAll<HTMLElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    let frame = 0;
    const update = () => {
      // Driven by the quote itself, not the section: nothing lights until
      // the whole quote is on screen, and the last word lands while its top
      // is still well inside the viewport — so the sweep is always seen.
      const rect = quote.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh - rect.height;
      // a quote taller than the screen (phones) still gets a scroll's worth of sweep
      const end = Math.min(vh * 0.1, start - vh * 0.25);
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      const reach = progress * spans.length;
      spans.forEach((span, i) => {
        const local = Math.max(0, Math.min(1, reach - i));
        span.style.opacity = String(DIM + local * (1 - DIM));
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgWrapper} ref={bg}>
          <Media src={testimonial.image} seed={4} dark sizes="100vw" />
        </div>
      </div>

      <figure className={styles.figure}>
        <blockquote className={styles.quote}>
          <span className={styles.mark} aria-hidden="true">
            “
          </span>
          {words.map((word, i) => (
            <span key={i} data-word style={{ opacity: DIM }}>
              {word}{" "}
            </span>
          ))}
        </blockquote>

        <figcaption className={styles.caption}>
          <span className={styles.author}>{testimonial.author}</span>
          <span className={styles.role}>{testimonial.role}</span>
          <span className={styles.company}>{testimonial.company}</span>
        </figcaption>
      </figure>
    </section>
  );
}
