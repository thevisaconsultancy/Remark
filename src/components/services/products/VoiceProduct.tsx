import type { CSSProperties, ReactNode } from "react";
import { Phone } from "./Phone";
import { ProductCanvas } from "./ProductCanvas";
import styles from "./products.module.css";

// Deterministic bar heights: a speech-like envelope, louder in the middle.
const BARS = Array.from({ length: 44 }, (_, i) => {
  const env = Math.sin((i / 43) * Math.PI);
  const jitter = ((i * 37) % 11) / 11;
  return Math.round(10 + env * 46 * (0.45 + jitter * 0.55));
});

const TRANSCRIPT: { who: "Caller" | "Agent"; text: string }[] = [
  { who: "Caller", text: "Hi, my car is due a service. Can I come in on Saturday?" },
  { who: "Agent", text: "Of course. I have 10:30 or 2:00 on Saturday. Which suits you?" },
  { who: "Caller", text: "Ten thirty, please." },
  { who: "Agent", text: "Booked for Saturday at 10:30. I have sent the details by SMS" },
];

function Control({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`flex size-[62px] items-center justify-center rounded-full ${active ? "bg-fg text-ink" : "bg-fg/10 text-fg"}`}
    >
      {children}
    </span>
  );
}

/** AI Voice Agents: a live call screen with transcript, plus the summary it files. */
export function VoiceProduct({ label }: { label: string }) {
  return (
    <ProductCanvas w={800} h={900} label={label}>
      {/* Routing card */}
      <div className={`${styles.lift} absolute left-[10px] top-[96px] w-[350px] rounded-[20px] bg-bg-light p-[24px] text-fg`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Call routing</p>
        <ul className="mt-[16px] flex flex-col gap-[12px] text-[15px]">
          {[
            ["Bookings", "AI agent", true],
            ["Service questions", "AI agent", true],
            ["Complaints", "Service desk", false],
            ["New car sales", "Showroom team", false],
          ].map(([from, to, ai]) => (
            <li key={from as string} className="flex items-center justify-between gap-[10px]">
              <span className="text-muted">{from}</span>
              <span
                className={`rounded-full px-[11px] py-[4px] text-[13px] font-semibold ${
                  ai ? "bg-red-500 text-fg" : "bg-fg/10 text-fg"
                }`}
              >
                {to}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary card */}
      <div className={`${styles.lift} absolute left-[0px] top-[520px] w-[370px] rounded-[20px] bg-paper p-[24px] text-ink`}>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Call summary</p>
          <p className="text-[12px] text-ink-muted">Written by the agent</p>
        </div>
        <dl className="mt-[16px] grid grid-cols-[92px_1fr] gap-x-[12px] gap-y-[10px] text-[15px]">
          <dt className="text-ink-muted">Reason</dt>
          <dd className="font-semibold">Periodic service</dd>
          <dt className="text-ink-muted">Outcome</dt>
          <dd className="font-semibold text-red-500">Booked, Sat 10:30</dd>
          <dt className="text-ink-muted">Follow-up</dt>
          <dd className="font-semibold">SMS confirmation sent</dd>
          <dt className="text-ink-muted">Handed over</dt>
          <dd className="font-semibold">No</dd>
        </dl>
      </div>

      <Phone dark className="left-[380px] top-[10px] h-[880px] w-[410px]" screenClassName="bg-[#120e0c] text-fg">
        <div className="flex flex-1 flex-col px-[26px] pb-[30px]">
          {/* Caller header */}
          <div className="mt-[18px] flex flex-col items-center text-center">
            <span className="relative flex size-[76px] items-center justify-center rounded-full bg-red-950 ring-2 ring-red-500">
              <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
                {[6, 11, 16, 21, 26].map((x, i) => (
                  <rect key={x} x={x - 1.5} y={16 - [4, 9, 12, 8, 5][i]} width="3" height={[8, 18, 24, 16, 10][i]} rx="1.5" fill="var(--color-fg)" />
                ))}
              </svg>
            </span>
            <p className="mt-[14px] text-[22px] font-bold">Mehran Motors</p>
            <p className="mt-[2px] flex items-center gap-[8px] text-[14px] text-muted">
              <span className={`${styles.live} size-[8px] rounded-full bg-red-500`} />
              AI agent on call · 02:14
            </p>
          </div>

          {/* Waveform */}
          <div className="mt-[22px] flex h-[64px] items-center justify-center gap-[3px]">
            {BARS.map((hgt, i) => (
              <span
                key={i}
                className={`${styles.wave} w-[4px] rounded-full ${i > 14 && i < 30 ? "bg-red-300" : "bg-red-500"}`}
                style={{ height: hgt, "--d": i } as CSSProperties}
              />
            ))}
          </div>

          {/* Transcript */}
          <p className="mt-[22px] font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Live transcript</p>
          <ol className="mt-[12px] flex flex-col gap-[14px]">
            {TRANSCRIPT.map((line, i) => {
              const agent = line.who === "Agent";
              const last = i === TRANSCRIPT.length - 1;
              return (
                <li key={i} className="grid grid-cols-[58px_1fr] gap-[10px] text-[15px] leading-[1.45]">
                  <span className={`pt-[1px] text-[12px] font-semibold ${agent ? "text-red-300" : "text-muted"}`}>
                    {line.who}
                  </span>
                  <span className={agent ? "text-fg" : "text-muted"}>
                    {line.text}
                    {last && <span className={`${styles.live} ml-[2px] inline-block h-[15px] w-[2px] translate-y-[2px] bg-red-300`} />}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-[18px] flex flex-wrap gap-[8px] text-[12px]">
            <span className="rounded-full bg-fg/10 px-[12px] py-[6px]">Intent: book a service</span>
            <span className="rounded-full bg-fg/10 px-[12px] py-[6px]">Slot held</span>
          </div>

          {/* Controls */}
          <div className="mt-auto flex items-center justify-between">
            <Control>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0014 0M12 18v3" />
              </svg>
            </Control>
            <Control>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                {[5, 12, 19].flatMap((x) => [5, 12, 19].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.9" />))}
              </svg>
            </Control>
            <span className="flex h-[62px] items-center rounded-full bg-fg/10 px-[18px] text-[13px] font-semibold">
              Hand to a person
            </span>
            <span className="flex size-[62px] items-center justify-center rounded-full bg-red-500">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--color-fg)" aria-hidden="true">
                <path d="M3 14.5c5-4.7 13-4.7 18 0l-2.4 2.6-3.6-1.4v-2.6a13 13 0 00-6 0v2.6L5.4 17.1z" />
              </svg>
            </span>
          </div>
        </div>
      </Phone>
    </ProductCanvas>
  );
}
