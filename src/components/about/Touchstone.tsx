"use client";

import type { CSSProperties } from "react";
import { MarkedWord } from "@/components/MarkedWord";
import { STANDARD, TESTS } from "@/data/about";
import { ChapterMark } from "./ChapterMark";
import { useSeen } from "./useSeen";
import { BODY, H2, LABEL, LEAD, SECTION, WRAP } from "./ui";
import styles from "./about.module.css";

// Each rub leaves a slightly different streak, rubbed to a different length.
const STREAKS = [
  "M10 30C60 14 220 8 392 15 408 16 414 26 404 36 300 48 110 52 18 45 4 43 2 34 10 30Z",
  "M6 27C90 18 250 12 360 18 396 20 412 28 398 38 280 47 100 46 16 42 2 40 0 31 6 27Z",
  "M14 32C80 16 200 12 330 14 380 15 402 22 396 33 330 45 140 50 22 46 6 44 4 36 14 32Z",
  "M8 29C70 20 230 10 402 18 414 19 416 30 402 37 290 45 120 50 14 43 2 41 0 33 8 29Z",
];
const REACH = ["100%", "84%", "92%", "76%"];

// The glint: a thinner, paler pass along the top of each streak, where the metal caught the light.
const GLINTS = [
  "M40 22C140 15 260 13 380 18 370 21 250 20 140 22 90 23 60 24 40 22Z",
  "M30 24C120 19 260 16 370 21 350 23 240 22 130 24 80 25 50 26 30 24Z",
  "M44 25C130 18 240 16 360 18 340 21 230 21 140 23 90 24 60 26 44 25Z",
  "M36 23C140 18 270 14 390 21 370 23 250 22 140 24 90 25 56 25 36 23Z",
];

function Streak({ index }: { index: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 420 60"
      preserveAspectRatio="none"
      className="block h-7 overflow-visible md:h-8"
      style={{ width: REACH[index % REACH.length] }}
    >
      <path d={STREAKS[index % STREAKS.length]} fill="var(--color-red-500)" />
      <path className={styles.glint} d={GLINTS[index % GLINTS.length]} fill="var(--color-red-300)" opacity="0.55" />
    </svg>
  );
}

/** The standard: every piece is rubbed on the touchstone before it takes the mark. */
export function Touchstone() {
  const [ref, seen] = useSeen<HTMLOListElement>(0.2);

  return (
    <section id="standard" aria-labelledby="standard-title" className={`${SECTION} bg-paper-warm text-ink`}>
      <div className={WRAP}>
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3 lg:pt-3">
            <ChapterMark kind="standard" metal="paper" label={STANDARD.label} tone="paper" />
          </div>
          <div className="min-w-0 lg:col-span-9">
            <h2 id="standard-title" className={`${H2} max-w-[17ch]`}>
              {STANDARD.title} <MarkedWord word={STANDARD.mark} weight="heavy" />.
            </h2>
            <p className={`${LEAD} mt-8 max-w-[60ch] text-ink-muted md:mt-10`}>{STANDARD.intro}</p>
          </div>
        </div>

        <div className={`${styles.stone} mt-16 px-6 py-12 text-fg sm:px-10 md:mt-24 md:px-14 md:py-16 lg:px-16 lg:py-20`}>
          <ol ref={ref} data-seen={seen} className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2 md:gap-y-16">
            {TESTS.map((test, i) => (
              <li key={test.question} className="min-w-0">
                <span className={`${LABEL} inline-flex gap-[0.6em] text-muted`}>
                  Test
                  <span className={`${styles.tick} tabular-nums`} style={{ "--i": i * 2 } as CSSProperties}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </span>
                </span>
                <div className={`${styles.streak} mt-4 max-w-[240px]`} style={{ "--d": `${i * 160}ms` } as CSSProperties}>
                  <Streak index={i} />
                </div>
                <div className={styles.rise} style={{ "--i": i * 2, "--d": "300ms" } as CSSProperties}>
                  <h3 className="mt-6 font-normal text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.005em] text-fg text-balance">
                    {test.question}
                  </h3>
                  <p className={`${BODY} mt-3 max-w-[46ch] text-muted`}>{test.answer}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-12 max-w-[34ch] font-cranio text-[clamp(1.375rem,2.4vw,1.875rem)] leading-[1.3] text-ink text-balance md:mt-16 lg:ml-[calc(25%+0.5rem)]">
          {STANDARD.closing}
        </p>
      </div>
    </section>
  );
}
