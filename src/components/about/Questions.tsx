import type { CSSProperties } from "react";
import { MarkedWord } from "@/components/MarkedWord";
import { QUESTIONS, QUESTIONS_HEAD } from "@/data/about";
import { Reveal } from "./Reveal";
import { H2, LEAD, SECTION, WRAP } from "./ui";
import styles from "./about.module.css";

/**
 * Fair questions: native disclosure widgets, so they work with keyboard and without
 * script. Where the browser can animate `::details-content`, each opens to its height
 * and its chevron hinges over; elsewhere they simply open.
 */
export function Questions() {
  return (
    <section id="questions" aria-labelledby="questions-title" className={`${SECTION} bg-void text-fg`}>
      <div className={`${WRAP} grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8`}>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="questions-title" className={`${H2} max-w-[12ch]`}>
              {QUESTIONS_HEAD.title} <MarkedWord word={QUESTIONS_HEAD.mark} /> {QUESTIONS_HEAD.titleEnd}
            </h2>
            <p className={`${LEAD} mt-8 max-w-[36ch] text-muted`}>{QUESTIONS_HEAD.intro}</p>
          </div>
        </div>
        <Reveal
          className={`${styles.ruleEnd} min-w-0 lg:col-span-7`}
          style={{ "--n": QUESTIONS.length } as CSSProperties}
        >
          {QUESTIONS.map((item, i) => (
            <details key={item.q} className={`${styles.qa} ${styles.rule}`} style={{ "--i": i } as CSSProperties}>
              <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-6 rounded-[2px] py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg md:py-7 [&::-webkit-details-marker]:hidden">
                <h3 className="font-cranio text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.25] text-fg text-balance">{item.q}</h3>
                <span aria-hidden="true" className={`${styles.chev} mt-[0.4em] shrink-0`} />
              </summary>
              <p
                className={`${styles.answer} max-w-[58ch] pb-8 pr-10 font-ui text-[16px] leading-[1.65] text-muted text-pretty md:text-[17px]`}
              >
                {item.a}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
