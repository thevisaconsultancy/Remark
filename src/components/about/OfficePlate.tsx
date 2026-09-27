"use client";

import type { CSSProperties, ReactNode } from "react";
import { Plate } from "./Plate";
import { Punch } from "./Punch";
import { useSeen } from "./useSeen";
import { LABEL } from "./ui";
import styles from "./about.module.css";

type Props = { label: string; lines: readonly string[]; full: string; city: string };

/**
 * The office plate. The address sets itself sort by sort, like type dropped into a
 * composing stick, the city takes its mark, and the town punch is struck beside it.
 * Screen readers get the address once, as plain text.
 */
export function OfficePlate({ label, lines, full, city }: Props) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.35);

  // Give every character a running index so the setting reads left to right, line by line.
  let c = 0;
  const sorts = (text: string) =>
    Array.from(text).map((ch, i) =>
      ch === " " ? (
        " "
      ) : (
        <span key={i} className={styles.sort} style={{ "--c": c++ } as CSSProperties}>
          {ch}
        </span>
      )
    );

  // Keep "Sector C1" and "Bahria Enclave" whole: lines wrap only after their commas.
  const segments = (text: string): ReactNode =>
    text.split(/(?<=,) /).map((part, i, all) => (
      <span key={part} className="whitespace-nowrap">
        {sorts(part)}
        {i < all.length - 1 ? " " : ""}
      </span>
    ));

  const last = lines[lines.length - 1];
  const cityAt = last.lastIndexOf(city);

  const rendered = lines.map((line, n) => {
    if (n < lines.length - 1 || cityAt < 0) {
      return (
        <span key={line} className="block">
          {segments(line)}
        </span>
      );
    }
    const before = last.slice(0, cityAt).trimEnd();
    const after = last.slice(cityAt + city.length);
    const lead = segments(before);
    const citySorts = sorts(city);
    const markDelay = { "--c": c } as CSSProperties;
    return (
      <span key={line} className="block">
        {lead}{" "}
        <span className="relative inline-block whitespace-nowrap">
          {citySorts}
          <span
            aria-hidden="true"
            className={`${styles.setMark} absolute inset-x-0 -bottom-[0.08em] h-[0.09em] origin-left bg-fg`}
            style={markDelay}
          />
        </span>
        {after}
      </span>
    );
  });

  return (
    <Plate className="mt-16 text-fg md:mt-24">
      <div
        ref={ref}
        data-seen={seen}
        data-struck={seen}
        className="relative z-10 flex flex-col-reverse gap-10 p-6 sm:p-10 md:flex-row md:items-end md:justify-between lg:p-14"
      >
        <address className="min-w-0 not-italic">
          <p className={`${LABEL} text-fg`}>{label}</p>
          <p className="mt-6 font-cranio text-[clamp(1.375rem,6.2vw,3.75rem)] leading-[1.06] tracking-[-0.01em]">
            <span className="sr-only">{full}</span>
            <span aria-hidden="true">{rendered}</span>
          </p>
        </address>
        <Punch
          kind="office"
          metal="red"
          ink
          className={`${styles.strike} h-auto w-[84px] shrink-0 md:w-[120px] lg:w-[148px]`}
          style={{ "--d": "900ms" } as CSSProperties}
        />
      </div>
    </Plate>
  );
}
