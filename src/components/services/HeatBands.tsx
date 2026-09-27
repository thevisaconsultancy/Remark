"use client";

import { useState, type CSSProperties } from "react";
import { PROCESS } from "@/data/services";
import { HEAT } from "./heat";
import styles from "./services.module.css";

/** Matches the .bands grid breakpoint in services.module.css. */
const LG = "(min-width: 1024px)";

/**
 * Five adjoining bands, one per heat. On lg the active band widens
 * (grid-template-columns, the site's one sanctioned layout transition);
 * below lg they stack as 88px strips that open one at a time.
 */
export function HeatBands() {
  const [active, setActive] = useState(0);
  const cols = PROCESS.map((_, i) => (i === active ? "2.4fr" : "1fr")).join(" ");

  return (
    <div className={styles.bands} style={{ "--cols": cols } as CSSProperties}>
      {PROCESS.map((stage, i) => {
        const heat = HEAT[stage.heat];
        const isActive = i === active;
        const triggerId = `heat-trigger-${i}`;
        const panelId = `heat-panel-${i}`;
        return (
          <div key={stage.name} data-active={isActive} className={`${styles.band} ${heat.bg} ${heat.text}`}>
            <button
              type="button"
              id={triggerId}
              aria-expanded={isActive}
              aria-controls={panelId}
              onClick={() => setActive(i)}
              onMouseEnter={() => {
                // Hover only steers the side-by-side bands. In the stacked
                // accordion it would move the strips under the pointer.
                if (window.matchMedia(LG).matches) setActive(i);
              }}
              onFocus={() => setActive(i)}
              className={`${styles.bandTrigger} flex min-h-[88px] w-full cursor-pointer items-center gap-5 px-6 text-left md:px-8 lg:flex-1 lg:flex-col lg:items-start lg:justify-between lg:gap-0 lg:pt-8`}
            >
              <span className="w-7 shrink-0 font-mono text-[12px] tracking-[0.12em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="whitespace-nowrap font-cranio text-[clamp(1.75rem,3vw,3rem)] font-normal leading-none">
                {stage.name}
              </span>
            </button>
            <div id={panelId} className={styles.bandPanel}>
              <div className={styles.bandPanelInner}>
                <div className="px-6 pb-7 pl-[4.5rem] md:px-8 md:pl-[5rem] lg:h-[9rem] lg:px-8 lg:pb-0 lg:pt-4">
                  <p
                    className={`${styles.bandDesc} max-w-[30ch] font-ui text-base leading-relaxed lg:w-[30ch] lg:max-w-none`}
                  >
                    {stage.text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
