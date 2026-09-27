"use client";

import type { CSSProperties, ReactNode } from "react";
import { PenMark } from "./PenMark";
import { ReceivedStamp } from "./ReceivedStamp";
import type { FreshInk, LeadField, LeadValues, RecordRow } from "./types";
import styles from "./contact.module.css";

const BRIEF_LIMIT = 240;
// A paste lands as a short burst, not 400 animated spans: only the last few characters ink in.
const MAX_INKED = 14;

interface CarbonRecordProps {
  titleId: string;
  values: LeadValues;
  needLabels: string[];
  /** The characters the visitor's last edit added; only those animate. */
  fresh: FreshInk | null;
  /** Which sheet of this visit the docket is (1, 2, ...). Shown as the brief number. */
  sheetNo: number;
  /** When this file was opened, in PKT. Null until mounted, so the server renders "Today". */
  fileTime: string | null;
  /** Set once the brief is filed: the stamp lands with this time. */
  filedAt: string | null;
  /** The row under the visitor's pen: the record line for the field that has focus. */
  active: RecordRow | null;
}

const Blank = () => <span className="text-red-100">&mdash;</span>;

/**
 * A value as it lands on the carbon copy. The stable prefix is plain text; the newest
 * characters are keyed spans, so each keystroke mounts only the new ones and each plays
 * its own short press: a bloom of ink that tightens into the letter.
 */
function Carbon({ text, count }: { text: string; count: number }) {
  if (!text) return <Blank />;
  if (count <= 0) return <>{text}</>;
  const chars = Array.from(text);
  const n = Math.min(count, MAX_INKED, chars.length);
  const start = chars.length - n;
  return (
    <>
      {chars.slice(0, start).join("")}
      {chars.slice(start).map((char, i) => (
        <span key={start + i} className={styles.char} style={{ "--i": i } as CSSProperties}>
          {char === " " ? " " : char}
        </span>
      ))}
    </>
  );
}

/** One ruled line of the docket. The line under the visitor's pen draws its rule in fg. */
function Row({
  no,
  label,
  on = false,
  children,
  className = "",
}: {
  no: string;
  label: string;
  on?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-on={on || undefined}
      className={`${styles.docketRow} relative grid grid-cols-[7ch_minmax(0,1fr)] gap-x-4 lg:grid-cols-[2.5ch_7ch_minmax(0,1fr)] lg:gap-x-4 border-b border-red-100/25 py-2.5 ${className}`}
    >
      <span className={`hidden tabular-nums transition-colors duration-300 lg:inline ${on ? "text-fg" : "text-red-100"}`}>{no}</span>
      <span className={`uppercase tracking-[0.2em] transition-colors duration-300 ${on ? "text-fg" : "text-red-100"}`}>{label}</span>
      <span className={`${styles.carbon} min-w-0 text-fg [overflow-wrap:anywhere]`}>{children}</span>
    </div>
  );
}

/**
 * The red office copy, set as a studio job docket. The heading and intro are the page's
 * accessible title; the docket beneath is an aria-hidden mirror of the form, which stays
 * the source of truth.
 */
export function CarbonRecord({ titleId, values, needLabels, fresh, sheetNo, fileTime, filedAt, active }: CarbonRecordProps) {
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const brief = values.brief.replace(/\s+/g, " ").trimStart();
  const briefShown = brief.length > BRIEF_LIMIT ? `${brief.slice(0, BRIEF_LIMIT).trimEnd()}…` : brief;
  const needs = needLabels.join(", ");
  const inked = (field: LeadField) => (fresh?.field === field ? fresh.count : 0);

  return (
    <div
      className={`${styles.slab} relative flex-1 bg-accent px-4 pb-11 pt-8 text-fg sm:px-6 md:px-[max(1.5rem,6vw)] lg:pb-14 lg:pl-[max(1.5rem,6vw)] lg:pr-12 lg:pt-14`}
    >
      {/* The carbon: a faint displacement that makes values look pressed through, not typed. */}
      <svg aria-hidden="true" width="0" height="0" className="absolute" focusable="false">
        <filter id="carbon-transfer" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={1} seed={4} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={1.2} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="flex flex-col gap-7 lg:sticky lg:top-36 lg:min-h-[calc(100svh-14rem)] lg:justify-between lg:gap-14">
        <div>
          <h1
            id={titleId}
            className="font-normal text-[clamp(3rem,15vw,4.5rem)] leading-[0.95] md:text-[clamp(3rem,9vw,5rem)] lg:text-[clamp(3rem,6.5vw,6.5rem)] tracking-[-0.01em] text-fg [overflow-wrap:anywhere]"
          >
            <span className="lg:block">Open a</span> <PenMark word="file" delay={500} />.
          </h1>
          {filedAt ? (
            <>
              <p className="mt-7 hidden max-w-[40ch] font-ui text-[17px] leading-relaxed text-red-100 lg:block">
                Our copy stays here. Yours is on the right.
              </p>
              {/* The stamp lands in the open red under the heading: in flow, so it never sits on text. */}
              <div aria-hidden="true" className="mt-5 flex lg:mr-[3%] lg:mt-10 lg:justify-end">
                <ReceivedStamp time={filedAt} />
              </div>
            </>
          ) : (
            <p className="mt-4 max-w-[34ch] font-ui text-[17px] leading-relaxed text-red-100 lg:mt-7">
              <span className="lg:hidden">Fill in the sheet below.</span>
              <span className="hidden lg:inline">Fill in the sheet. Every word lands on our copy as you type.</span>
            </p>
          )}
        </div>

        <div aria-hidden="true" className="font-mono text-[13px] leading-[1.55] lg:text-[14px]">
          {/* Docket head: who the copy belongs to, and which sheet of this visit it is. */}
          <div className="flex items-end justify-between gap-4 border-b-2 border-fg pb-2 text-[11px] uppercase tracking-[0.2em]">
            <span>
              Office copy<span className="hidden sm:inline"> &middot; Remark Studio</span>
            </span>
            <span className="whitespace-nowrap">
              Brief no. <span className="tabular-nums">{String(sheetNo).padStart(2, "0")}</span>
            </span>
          </div>
          <Row no="01" label="Date" className="hidden lg:grid">
            {fileTime ?? "Today"}
          </Row>
          <Row no="02" label="From" on={active === "from"}>
            <Carbon text={name} count={inked("name")} />
          </Row>
          <Row no="03" label="Email" on={active === "email"} className="hidden lg:grid">
            <Carbon text={email} count={inked("email")} />
          </Row>
          <Row no="04" label="Phone" on={active === "phone"} className="hidden lg:grid">
            <Carbon text={phone} count={inked("phone")} />
          </Row>
          <Row no="05" label="For" on={active === "for"}>
            {needs ? <span key={needs} className={styles.needs}>{needs}</span> : <Blank />}
          </Row>
          <Row no="06" label="Brief" on={active === "brief"} className="hidden lg:grid">
            <Carbon text={briefShown} count={brief.length <= BRIEF_LIMIT ? inked("brief") : 0} />
          </Row>
        </div>
      </div>
    </div>
  );
}
