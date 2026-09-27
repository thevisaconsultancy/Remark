"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import s from "./work.module.css";

/** Every chapter anchor on the page, in reading order. */
const CHAPTERS = [
  { id: "brief", num: "01", label: "The brief" },
  { id: "crm", num: "02", label: "What we built" },
  { id: "leads", num: "02.1", label: "Leads and campaigns" },
  { id: "case", num: "02.2", label: "Clients and cases" },
  { id: "assessment", num: "02.3", label: "CV assessment" },
  { id: "jobs", num: "02.4", label: "Job hunting" },
  { id: "library", num: "02.5", label: "Visa type library" },
  { id: "team", num: "02.6", label: "Team" },
  { id: "day", num: "03", label: "A day in the system" },
  { id: "access", num: "04", label: "Underneath" },
  { id: "closing", num: "05", label: "In short" },
  { id: "websites", num: "06", label: "Also built" },
] as const;

type Chapter = (typeof CHAPTERS)[number];

/**
 * A small fixed chip, bottom right, naming the chapter you are in, with a hairline
 * of reading progress along its foot. It opens into the full chapter list. It only
 * appears once the story starts (after the opening) and steps aside at the footer.
 * One IntersectionObserver; the progress line is a scroll-driven transform.
 */
export function ChapterRail() {
  const [active, setActive] = useState<Chapter | null>(null);
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const inBand = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        // The latest chapter in reading order that crosses the band wins.
        const hit = [...CHAPTERS].reverse().find((c) => inBand.has(c.id)) ?? null;
        setActive(hit);
        if (!hit && details.current) details.current.open = false;
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const c of CHAPTERS) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const close = (e: Event) => {
      const d = details.current;
      if (!d?.open) return;
      if (e instanceof KeyboardEvent) {
        if (e.key !== "Escape") return;
        d.open = false;
        d.querySelector("summary")?.focus();
        return;
      }
      if (!d.contains(e.target as Node)) d.open = false;
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, []);

  const on = active !== null;

  return (
    <nav
      aria-label="Case study chapters"
      data-on={on}
      className={`${s.rail} fixed right-4 bottom-4 z-40 md:right-8 md:bottom-8`}
    >
      <details ref={details} className={`${s.railDetails} group relative`}>
        <summary
          className="relative flex h-11 cursor-pointer list-none items-center gap-2.5 overflow-hidden rounded-full bg-void pr-4 pl-1.5 font-mono text-[11px] uppercase tracking-[0.1em] md:gap-3 md:text-[12px] md:tracking-[0.16em] text-fg shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 [&::-webkit-details-marker]:hidden"
        >
          <span className="inline-grid h-8 min-w-[3rem] place-items-center overflow-hidden rounded-full bg-accent px-2.5 tracking-[0.06em]">
            <span key={active?.num} className={s.chipNum}>
              {active?.num ?? "01"}
            </span>
          </span>
          <span className="max-w-[56vw] truncate md:max-w-none">
            <span className="sr-only">Chapter: </span>
            {active?.label ?? "The brief"}
          </span>
          <FiChevronUp aria-hidden="true" className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180" />
          <span aria-hidden="true" className={`${s.progress} absolute right-4 bottom-[5px] left-[3.75rem] h-px bg-white/15`}>
            <span className="block h-full w-full bg-red-300" />
          </span>
        </summary>
        <ol className={`${s.railList} absolute right-0 bottom-[calc(100%+10px)] w-[min(18rem,calc(100vw-2rem))] rounded-[8px] bg-void py-2 ring-1 ring-white/15 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]`}>
          {CHAPTERS.map((c) => {
            const current = c.id === active?.id;
            const sub = c.num.includes(".");
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  aria-current={current ? "location" : undefined}
                  onClick={() => {
                    if (details.current) details.current.open = false;
                  }}
                  className={`flex min-h-10 items-center gap-3 px-4 py-2 font-ui text-[14px] transition-colors duration-200 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red-300 ${
                    current ? "text-fg" : "text-muted hover:text-fg"
                  } ${sub ? "pl-8" : ""}`}
                >
                  <span className={`w-9 shrink-0 font-mono text-[11px] tracking-[0.08em] ${current ? "text-red-300" : ""}`}>{c.num}</span>
                  {c.label}
                  {current && <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />}
                </a>
              </li>
            );
          })}
        </ol>
      </details>
    </nav>
  );
}
