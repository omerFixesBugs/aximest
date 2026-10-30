import type { CSSProperties, ReactNode } from "react";
import styles from "./ServiceGlyph.module.css";

const i = (n: number) => ({ ["--i" as string]: String(n) }) as CSSProperties;

/** A tiny app window: the shared frame every service scene sits in. */
function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={styles.window}>
      <div className={styles.bar}>
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

/**
 * Each service as a small piece of working software, looping on its own:
 * what the service ships, rather than an abstract mark.
 */
export default function ServiceGlyph({ id }: { id: string }) {
  switch (id) {
    case "ai":
      // a question, the assistant thinking, then the answer streaming in
      return (
        <Window title="assistant">
          <div className={styles.chat}>
            <p className={styles.ask}>Summarise this week&apos;s orders</p>
            <p className={styles.typing}>
              <i />
              <i />
              <i />
            </p>
            <div className={styles.answer}>
              <span style={i(0)} />
              <span style={i(1)} />
              <span style={i(2)} />
            </div>
          </div>
        </Window>
      );

    case "product-development":
      // a wireframe whose blocks snap in, then fill with colour
      return (
        <Window title="app / v1.0">
          <div className={styles.wire}>
            <span className={styles.wNav} style={i(0)} />
            <span className={styles.wHero} style={i(1)} />
            <span className={styles.wCard} style={i(2)} />
            <span className={styles.wCard} style={i(3)} />
            <span className={styles.wCard} style={i(4)} />
          </div>
        </Window>
      );

    case "data":
      // a live chart with its headline number
      return (
        <Window title="reports">
          <div className={styles.chart}>
            <div className={styles.kpi}>
              <strong>+18.4%</strong>
              <span>revenue, 7d</span>
            </div>
            <div className={styles.bars}>
              {[0.5, 0.7, 0.45, 0.8, 0.6, 0.9, 1].map((h, n) => (
                <span key={n} style={{ ...i(n), ["--h" as string]: String(h) }} />
              ))}
            </div>
          </div>
        </Window>
      );

    case "enterprise-software":
      // one ticket travelling the board, to do → doing → done
      return (
        <Window title="operations">
          <div className={styles.board}>
            {["To do", "Doing", "Done"].map((col) => (
              <div key={col} className={styles.col}>
                <em>{col}</em>
                <span />
              </div>
            ))}
            <span className={styles.ticket} />
          </div>
        </Window>
      );

    case "advisory":
      // a roadmap filling milestone by milestone
      return (
        <Window title="roadmap">
          <div className={styles.road}>
            <span className={styles.track} />
            {["Audit", "Plan", "Build", "Scale"].map((step, n) => (
              <span key={step} className={styles.step} style={i(n)}>
                <i />
                {step}
              </span>
            ))}
          </div>
        </Window>
      );

    default:
      // blockchain: a conveyor of linked blocks. Two copies of the same four,
      // marched four slots, so the loop restarts without a jump.
      return (
        <Window title="ledger">
          <div className={styles.chain}>
            <div className={styles.links}>
              {[0, 1].flatMap((copy) =>
                ["0x9c1", "0xa3f", "0xe07", "0x4b2"].map((hash) => (
                  <span key={copy + hash} className={styles.block}>
                    <em>block</em>
                    {hash}
                  </span>
                )),
              )}
            </div>
          </div>
        </Window>
      );
  }
}
