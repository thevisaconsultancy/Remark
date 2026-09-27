"use client";

import { useEffect, useState } from "react";
import styles from "./contact.module.css";

interface PenMarkProps {
  word: string;
  /** ms after mount before the stroke is drawn. */
  delay?: number;
}

/**
 * The counter's version of the studio mark: one pen stroke under a word, pressed hard at
 * the start and lifting off at the end, the way a clerk underlines the file on a carbon
 * copy. It is drawn once, left to right, with a clip-path wipe; reduced motion shows it
 * finished. The stroke scales with the word, so it keeps its weight at every size.
 */
export function PenMark({ word, delay = 500 }: PenMarkProps) {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDrawn(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <span className="relative inline-block">
      {word}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 160 22"
        data-drawn={drawn || undefined}
        className={`${styles.pen} pointer-events-none absolute -left-[0.05em] top-[calc(100%-0.2em)] h-auto w-[calc(100%+0.12em)]`}
        fill="currentColor"
      >
        <path d="M4 11.5C48 8 104 4.5 156.5 2.6c2.1-.1 2.5 3 .5 3.6C106 8.6 52 14.2 5.5 20.6 .8 21.3-.4 12 4 11.5Z" />
      </svg>
    </span>
  );
}
