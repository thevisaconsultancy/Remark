import Link from "next/link";
import type { CSSProperties } from "react";
import { MarkedWord } from "@/components/MarkedWord";
import { CIRCULATION, HALLMARK } from "@/data/about";
import { WEBSITES } from "@/data/projects";
import { Arrow } from "./Arrow";
import { Plate } from "./Plate";
import { Punch } from "./Punch";
import { Reveal } from "./Reveal";
import { BODY, H2, LABEL, LEAD, MONO_HEADING, SECTION, WRAP } from "./ui";
import styles from "./about.module.css";

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Pieces in circulation: the CRM as a red plate carrying the mark, then the live websites. */
export function Circulation() {
  const { crm } = CIRCULATION;
  const sites = WEBSITES.filter((w) => w.url);

  return (
    <section id="pieces" aria-labelledby="pieces-title" className={`${SECTION} bg-paper-warm text-ink`}>
      <div className={WRAP}>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="pieces-title" className={`${H2} max-w-[16ch] lg:col-span-7`}>
            {CIRCULATION.title} <MarkedWord word={CIRCULATION.mark} weight="heavy" />.
          </h2>
          <p className={`${LEAD} max-w-[40ch] text-ink-muted lg:col-span-5 lg:self-end`}>{CIRCULATION.intro}</p>
        </div>

        {/* The CRM: the one red plate in this section. */}
        <Plate as="article" aria-labelledby="crm-name" className="mt-16 text-fg md:mt-24">
          <div className="relative z-10 grid grid-cols-1 gap-y-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-x-8 lg:p-14">
            <div className="min-w-0 lg:col-span-7">
              <div className="flex items-center gap-2" aria-hidden="true">
                {HALLMARK.map((m) => (
                  <Punch key={m.kind} kind={m.kind} metal="red" className={`${m.kind === "office" ? "h-[34px]" : "h-[28px]"} w-auto`} />
                ))}
              </div>
              <p className={`${LABEL} mt-8 text-fg`}>{crm.kind}</p>
              <h3 id="crm-name" className="mt-3 font-cranio text-[clamp(2rem,4.6vw,4rem)] leading-[1] tracking-[-0.012em] text-balance [overflow-wrap:anywhere]">
                {crm.name}
              </h3>
              <p className="mt-2 font-ui text-[15px] text-fg">For {crm.client}</p>
              <p className={`${BODY} mt-6 max-w-[48ch] text-fg md:text-[17px]`}>{crm.text}</p>
              <p className="mt-8">
                <Link
                  href={crm.href}
                  className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-fg px-6 font-ui text-[14px] font-semibold text-ink transition-colors duration-300 hover:bg-paper-warm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                >
                  {crm.cta}
                  <Arrow />
                </Link>
              </p>
            </div>
            <div className="min-w-0 lg:col-span-5 lg:border-l lg:border-fg/25 lg:pl-8">
              <h4 id="crm-modules" className={`${LABEL} text-fg`} style={MONO_HEADING}>
                {crm.modulesLabel}
              </h4>
              <Reveal
                as="ul"
                aria-labelledby="crm-modules"
                className={`${styles.onRed} mt-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1`}
              >
                {crm.modules.map((m, i) => (
                  <li key={m} className={`${styles.rule} py-3 font-ui text-[16px] text-fg`} style={{ "--i": i * 0.6 } as CSSProperties}>
                    <span className={`${styles.rise} block`}>{m}</span>
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </Plate>

        {/* The websites */}
        <div className="mt-16 grid grid-cols-1 gap-y-6 md:mt-24 lg:grid-cols-12 lg:gap-x-8">
          <h3 id="sites-title" className={`${LABEL} text-ink-muted lg:col-span-3 lg:pt-8`} style={MONO_HEADING}>
            {CIRCULATION.websitesLabel}
          </h3>
          <Reveal
            as="ul"
            aria-labelledby="sites-title"
            className={`${styles.onPaper} ${styles.ruleEnd} lg:col-span-9`}
            style={{ "--n": sites.length } as CSSProperties}
          >
            {sites.map((site, i) => (
              <li key={site.slug} className={styles.rule} style={{ "--i": i } as CSSProperties}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-[2px] py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)_auto] md:py-7"
                >
                  <span className="col-start-1 row-start-1 min-w-0">
                    <span className="block font-cranio text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.1] underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:decoration-accent group-focus-visible:decoration-accent">
                      {site.client ?? site.name}
                    </span>
                    <span className="mt-1 block font-ui text-[14px] text-ink-muted">{CIRCULATION.websitesRole}</span>
                  </span>
                  <span className="col-span-2 col-start-1 row-start-2 font-mono text-[13px] text-ink-muted md:col-span-1 md:col-start-2 md:row-start-1">
                    {host(site.url!)}
                  </span>
                  <span className="col-start-2 row-start-1 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-fg transition-[background-color,transform] duration-500 ease-out group-hover:scale-110 group-hover:bg-accent-bright md:col-start-3">
                    <Arrow dir="up-right" />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
