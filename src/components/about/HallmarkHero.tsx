"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { MarkedWord } from "@/components/MarkedWord";
import { HALLMARK, HERO } from "@/data/about";
import { Arrow } from "./Arrow";
import { Plate } from "./Plate";
import { Punch } from "./Punch";
import { LABEL, LEAD, WRAP } from "./ui";
import styles from "./about.module.css";

const SIZE: Record<(typeof HALLMARK)[number]["kind"], string> = {
  maker: "h-[48px] sm:h-[68px] lg:h-[96px] w-auto",
  standard: "h-[48px] sm:h-[68px] lg:h-[96px] w-auto",
  office: "h-[58px] sm:h-[82px] lg:h-[116px] w-auto",
};

/** Hero: the studio's hallmark, struck into a bar of red. Each punch opens its chapter. */
export function HallmarkHero() {
  const [struck, setStruck] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setStruck(true), 350);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="about-title"
      className="@container relative overflow-clip bg-paper-warm pb-24 pt-32 text-ink md:pb-36 md:pt-44 [--gut:1rem] md:[--gut:2rem]"
    >
      <div className={`${WRAP} grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8`}>
        <h1
          id="about-title"
          className="min-w-0 font-normal text-[clamp(2.6rem,7vw,6.75rem)] leading-[0.95] tracking-[-0.02em] text-balance lg:col-span-8"
        >
          {HERO.title}{" "}
          <span className="whitespace-nowrap">
            <MarkedWord word={HERO.mark} weight="heavy" animateOnLoad delay={1300} />.
          </span>
        </h1>
        <p className={`${LEAD} max-w-[44ch] text-ink-muted lg:col-span-4 lg:self-end lg:pb-[0.35rem]`}>{HERO.intro}</p>
      </div>

      {/* The bar: starts on the text column, runs off the right edge. */}
      <div
        data-struck={struck}
        className="mt-16 md:mt-24"
        style={{ marginLeft: "max(var(--gut), calc((100% - 80rem) / 2 + var(--gut)))" } as CSSProperties}
      >
        <Plate className="text-fg">
          <div className="relative z-10 flex flex-col gap-8 px-5 py-8 sm:px-10 md:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-12 lg:pl-12 lg:pr-[max(2rem,calc((100cqw-80rem)/2+2rem))]">
            <nav aria-label="The hallmark: chapters of this page">
              <ul className="flex items-start gap-3 sm:gap-8 lg:gap-12">
                {HALLMARK.map((mark, i) => (
                  <li key={mark.kind} className="min-w-0">
                    <a
                      href={mark.href}
                      className="group flex flex-col items-start rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                    >
                      <span className="flex h-[58px] items-center transition-transform duration-500 ease-out group-hover:-translate-y-0.5 sm:h-[82px] lg:h-[116px]">
                        <Punch
                          kind={mark.kind}
                          metal="red"
                          ink
                          className={`${SIZE[mark.kind]} ${styles.strike}`}
                          style={{ "--i": i } as CSSProperties}
                        />
                      </span>
                      <span className={`${LABEL} mt-4 text-[10px] text-fg sm:text-[11px]`}>{mark.label}</span>
                      <span className="mt-1 inline-flex items-center gap-1.5 font-ui text-[13px] leading-snug text-fg sm:text-[15px]">
                        <span className="underline decoration-transparent decoration-1 underline-offset-4 transition-[text-decoration-color] duration-300 group-hover:decoration-fg group-focus-visible:decoration-fg">
                          {mark.reading}
                        </span>
                        <span className="hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:inline-flex">
                          <Arrow dir="down" className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="max-w-[40ch] shrink-0 font-ui text-[15px] leading-[1.65] text-fg text-pretty md:text-[16px] lg:w-[calc((min(100cqw,80rem)-4rem-22rem)/12*4+6rem)] lg:max-w-none">
              {HERO.hallmarkIntro}
            </p>
          </div>
        </Plate>
      </div>
    </section>
  );
}
