"use client";

import type { PunchKind } from "@/data/about";
import { Punch, type Metal } from "./Punch";
import { useSeen } from "./useSeen";
import { LABEL } from "./ui";
import styles from "./about.module.css";

/** A chapter's punch, small, struck once as it comes into view, with its name beneath. */
export function ChapterMark({ kind, metal, label, tone }: { kind: PunchKind; metal: Metal; label: string; tone: "void" | "paper" }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.6);
  return (
    <div ref={ref} data-struck={seen} className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-5">
      <Punch
        kind={kind}
        metal={metal}
        ink
        className={`${styles.strike} h-auto ${kind === "office" ? "w-[52px] md:w-[64px]" : "w-[76px] md:w-[92px]"}`}
      />
      <p className={`${LABEL} ${tone === "void" ? "text-muted" : "text-ink-muted"}`}>{label}</p>
    </div>
  );
}
