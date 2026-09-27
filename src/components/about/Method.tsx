import Link from "next/link";
import type { CSSProperties } from "react";
import { MarkedWord } from "@/components/MarkedWord";
import { COMMITMENTS, METHOD } from "@/data/about";
import { PROCESS } from "@/data/services";
import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import { BODY, H2, H3, H4, LABEL, LEAD, LINK_VOID, SECTION, WRAP } from "./ui";
import styles from "./about.module.css";

/** How an engagement runs (the Services page's five stages, as text) and what a client can count on. */
export function Method() {
  return (
    <section id="method" aria-labelledby="method-title" className={`${SECTION} bg-void text-fg`}>
      <div className={WRAP}>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="method-title" className={`${H2} max-w-[14ch] lg:col-span-7`}>
            {METHOD.title} <MarkedWord word={METHOD.mark} />.
          </h2>
          <div className="lg:col-span-5 lg:self-end">
            <p className={`${LEAD} max-w-[44ch] text-muted`}>{METHOD.intro}</p>
            <p className="mt-4">
              <Link href="/services#process" className={LINK_VOID}>
                {METHOD.processLink}
                <Arrow />
              </Link>
            </p>
          </div>
        </div>

        <Reveal
          as="ol"
          threshold={0.3}
          className={`${styles.stages} mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-24 lg:grid-cols-5 lg:gap-x-0`}
        >
          {PROCESS.map((stage, i) => (
            <li key={stage.name} className={`${styles.rule} pt-6 lg:pr-6`} style={{ "--i": i } as CSSProperties}>
              <span aria-hidden="true" className={styles.tickMark} />
              <span className={`${LABEL} inline-flex gap-[0.6em] text-subtle`}>
                Stage
                <span className={`${styles.tick} tabular-nums`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </span>
              </span>
              <div className={styles.rise}>
                <h3 className={`${H4} mt-4 text-fg`}>{stage.name}</h3>
                <p className={`${BODY} mt-3 text-muted`}>{stage.text}</p>
              </div>
            </li>
          ))}
        </Reveal>

        <div className="mt-24 grid grid-cols-1 gap-y-10 md:mt-32 lg:grid-cols-12 lg:gap-x-8">
          <h3 id="expect-title" className={`${H3} max-w-[14ch] text-fg lg:col-span-3`}>
            {METHOD.expectTitle}
          </h3>
          <Reveal
            as="ul"
            aria-labelledby="expect-title"
            className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:col-span-9"
          >
            {COMMITMENTS.map((c, i) => (
              <li key={c.name} className="grid grid-cols-[auto_1fr] gap-x-5" style={{ "--i": i * 2 } as CSSProperties}>
                <span aria-hidden="true" className="mt-[0.55rem] h-2 w-2 bg-accent" />
                <div className={styles.rise}>
                  <h4 className={`${H4} text-fg`}>{c.name}</h4>
                  <p className={`${BODY} mt-3 max-w-[40ch] text-muted`}>{c.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
