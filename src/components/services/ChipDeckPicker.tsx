"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { DirectionalLiquidButton } from "@/components/DirectionalLiquidButton";
import { PROBLEMS, SERVICES, contactHref, type Heat } from "@/data/services";
import { EMAIL, PHONE_PRIMARY, PHONE_SECONDARY } from "@/data/social";
import { HEAT, heatVars } from "./heat";
import styles from "./services.module.css";

const sameSet = (a: readonly string[], b: readonly string[]) =>
  a.length === b.length && a.every((slug) => b.includes(slug));

/** Mini chips are too small for the white-heat glow; the palest two get a hairline instead. */
const MINI_EDGE: Partial<Record<Heat, string>> = {
  "red-100": "ring-1 ring-inset ring-ink/15",
  white: "ring-1 ring-inset ring-ink/25",
};

const UNDERLINE_REST = "decoration-ink/20 group-hover:decoration-ink/60";

const CONTACT_LINK =
  "inline-flex min-h-11 self-start items-center underline decoration-ink/20 decoration-2 underline-offset-[6px] outline-none transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ink";

/**
 * The fan, closed: seven chips on a crimson binding. Pressing a chip slides
 * it out and floods it with its heat; the CTA deep-links to /contact with the
 * chosen slugs (fan order) so the form arrives pre-ticked.
 *
 * lg: the deck is the left mass (cols 1-7); the order column (cols 9-12)
 * holds the problem shortcuts, then the button and the direct lines.
 */
export function ChipDeckPicker() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (slug: string) =>
    setSelected((cur) => (cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]));

  const count = selected.length;
  const href = contactHref(selected);
  const noun = count === 1 ? "service" : "services";
  const label = count === 0 ? "Start a project" : `Start with ${count} ${noun}`;
  const status = count === 0 ? "Nothing picked yet. Pick any, or just start." : `${count} ${noun} selected`;

  return (
    <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
      {/* Cols 1-7 (1-6 below xl): the closed fan. self-start keeps the binding
          flush with the last chip when the order column is the taller one. */}
      <div
        className="relative min-w-0 pl-3 lg:col-span-6 lg:self-start xl:col-span-7"
        role="group"
        aria-label="Services to start with"
      >
        {/* The binding that holds the deck together */}
        <span aria-hidden="true" className="absolute inset-y-0 left-0 w-3 rounded-[2px] bg-accent" />
        <ul className="flex flex-col gap-1.5">
          {SERVICES.map((service) => {
            const heat = HEAT[service.heat];
            const pressed = selected.includes(service.slug);
            return (
              <li key={service.slug}>
                <button
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => toggle(service.slug)}
                  className={`${styles.chip} group relative flex h-14 w-[calc(100%-24px)] items-center overflow-hidden rounded-r-[2px] bg-paper text-left outline-none ring-1 ring-inset ring-ink/10 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ink md:h-16`}
                  style={heatVars(service.heat)}
                >
                  {/* Resting swatch: the chip's left 64px (48px on the narrowest phones) */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-y-0 left-0 w-12 min-[400px]:w-16 ${heat.bg} ${heat.edge}`}
                  />
                  {/* Flood: the heat fills the whole chip from the left */}
                  <span aria-hidden="true" className={`${styles.chipFlood} absolute inset-0 ${heat.bg} ${heat.edge}`} />
                  <span
                    className={`${styles.chipText} relative min-w-0 flex-1 text-balance pl-16 pr-3 font-cranio text-[1.1rem] font-normal leading-[1.05] min-[400px]:pl-[5.25rem] sm:text-[1.3rem] md:pl-24 md:text-[1.45rem]`}
                  >
                    {service.displayName}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className={`${styles.chipText} relative mr-4 size-5 shrink-0 md:mr-6 md:size-6`}
                    fill="none"
                  >
                    <path
                      className={styles.chipCheck}
                      d="M4 12.5l5 5L20 6.5"
                      stroke="currentColor"
                      strokeWidth="2.25"
                      strokeLinecap="square"
                    />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Cols 9-12 (8-12 below xl, so each problem stays on one line): the order
          column. Shortcuts level with the first chip, the order and the direct
          lines level with the last. */}
      <div className="flex min-w-0 flex-col lg:col-span-5 lg:col-start-8 lg:justify-between xl:col-span-4 xl:col-start-9">
        <div>
          <p id="problem-presets-label" className="font-ui text-[15px] leading-relaxed text-ink-muted">
            Or start from a problem:
          </p>
          <ul className="mt-1 flex flex-col items-start" aria-labelledby="problem-presets-label">
            {PROBLEMS.map((problem) => {
              const pressed = count > 0 && sameSet(selected, problem.services);
              const words = problem.text.split(" ");
              const last = words.pop();
              const head = words.join(" ");
              const underline = "underline decoration-2 underline-offset-[6px] transition-colors duration-300";
              return (
                <li key={problem.text}>
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setSelected([...problem.services])}
                    className={`group block min-h-11 py-2.5 text-left font-ui text-[17px] leading-snug outline-none transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ink ${
                      pressed ? "font-semibold text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span className={`${underline} ${pressed ? "decoration-ink" : UNDERLINE_REST}`}>{head} </span>
                    {/* The last word and the chips this problem pulls from the deck never part */}
                    <span className="whitespace-nowrap">
                      <span className={`${underline} ${pressed ? "decoration-ink" : UNDERLINE_REST}`}>{last}</span>
                      <span aria-hidden="true" className="ml-3 inline-flex gap-1 align-[0.05em]">
                        {SERVICES.filter((s) => problem.services.includes(s.slug)).map((s) => (
                          <span
                            key={s.slug}
                            className={`block size-3 rounded-[1px] ${HEAT[s.heat].bg} ${MINI_EDGE[s.heat] ?? ""}`}
                          />
                        ))}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 lg:mt-12">
          <DirectionalLiquidButton
            href={href}
            fillClassName="bg-ink"
            className="inline-flex w-full items-center justify-between rounded-full bg-accent px-8 py-5 font-ui text-[13px] font-semibold uppercase tracking-[0.16em] text-fg outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <span>{label}</span>
            <FiArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
            />
          </DirectionalLiquidButton>
          <p role="status" aria-live="polite" className="mt-3 min-h-[1.5em] font-ui text-[14px] text-ink-muted">
            {status}
          </p>

          {/* Direct lines */}
          <div className="mt-8 flex flex-col font-ui text-[18px] text-ink">
            <a href={PHONE_PRIMARY.href} className={CONTACT_LINK}>
              {PHONE_PRIMARY.display}
            </a>
            <a href={PHONE_SECONDARY.href} className={CONTACT_LINK}>
              {PHONE_SECONDARY.display}
            </a>
            <a href={`mailto:${EMAIL}`} className={`${CONTACT_LINK} break-all`}>
              {EMAIL}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
