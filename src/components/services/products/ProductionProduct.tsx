import Image from "next/image";
import type { CSSProperties } from "react";
import { ProductCanvas } from "./ProductCanvas";
import styles from "./products.module.css";

const CLIPS = [
  { src: "/art/film-dhoop-01.webp", w: 190 },
  { src: "/art/film-dhoop-02.webp", w: 130 },
  { src: "/art/film-dhoop-03.webp", w: 220 },
  { src: "/art/film-dhoop-04.webp", w: 150 },
  { src: "/art/film-dhoop-05.webp", w: 170 },
  { src: "/art/film-dhoop-06.webp", w: 150 },
];

const TRACK_X = 64; // track header width
const TRACK_W = 1236 - TRACK_X - 24;

function Wave({ seed, w, h, color }: { seed: number; w: number; h: number; color: string }) {
  const n = Math.floor(w / 5);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const v = 0.25 + (((i * seed) % 17) / 17) * 0.75 * Math.abs(Math.sin(i / 6 + seed));
        const bh = Math.max(2, v * (h - 6));
        return <rect key={i} x={i * 5} y={(h - bh) / 2} width="3" height={bh} rx="1" fill={color} />;
      })}
    </svg>
  );
}

function Wheel({ name, dx, dy }: { name: string; dx: number; dy: number }) {
  return (
    <div className="flex flex-col items-center gap-[8px]">
      <span className="relative size-[86px] rounded-full bg-[radial-gradient(circle,#2a2320_0%,#1b1614_70%)] ring-1 ring-fg/15">
        <span className="absolute left-1/2 top-0 h-full w-px bg-fg/10" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-fg/10" />
        <span
          className="absolute size-[10px] rounded-full bg-red-300 ring-2 ring-[#141110]"
          style={{ left: `calc(50% - 5px + ${dx}px)`, top: `calc(50% - 5px + ${dy}px)` }}
        />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{name}</span>
    </div>
  );
}

/** Creative Production: a brand film on the edit timeline, with its grade and deliverables. */
export function ProductionProduct({ label }: { label: string }) {
  return (
    <ProductCanvas w={1280} h={780} label={label}>
      <div className={`${styles.device} absolute inset-[10px] overflow-hidden rounded-[14px] bg-[#141110] text-fg ring-1 ring-fg/12`}>
        {/* Title bar */}
        <div className="flex h-[38px] items-center justify-between border-b border-fg/10 px-[16px] text-[12px]">
          <span className="flex gap-[18px] text-muted">
            <span className="text-fg">Edit</span>
            <span>Colour</span>
            <span>Deliver</span>
          </span>
          <span className="text-muted">Dhoop · Brand film · v3</span>
          <span className="w-[120px] text-right font-mono text-[11px] text-muted">25 fps</span>
        </div>

        <div className="grid grid-cols-[1fr_360px]">
          {/* Viewer */}
          <div className="border-r border-fg/10 px-[20px] pt-[18px]">
            <div className="relative h-[352px] overflow-hidden bg-black">
              <Image src="/art/film-dhoop-01.webp" alt="" fill sizes="(min-width: 1280px) 900px, 70vw" className="object-cover object-[50%_60%]" />
              {/* Letterbox */}
              <span className="absolute inset-x-0 top-0 h-[34px] bg-black" />
              <span className="absolute inset-x-0 bottom-0 h-[34px] bg-black" />
              <div className="absolute bottom-[58px] left-[36px]">
                <p className="font-cranio text-[54px] leading-none text-fg">dhoop</p>
                <p className="mt-[6px] text-[15px] text-fg/85">Poured at sunrise.</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-[12px]">
              <span className="font-mono text-[15px] tracking-[0.06em] text-fg">00:00:18:12</span>
              <span className="flex items-center gap-[18px] text-muted">
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M4 4h2v12H4zM16 4v12L7 10z" />
                </svg>
                <span className="flex size-[34px] items-center justify-center rounded-full bg-fg text-ink">
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">
                    <path d="M5 3v14l12-7z" />
                  </svg>
                </span>
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M14 4h2v12h-2zM4 4v12l9-6z" />
                </svg>
              </span>
              <span className="font-mono text-[13px] text-muted">00:00:45:00</span>
            </div>
          </div>

          {/* Inspector */}
          <div className="px-[22px] pt-[18px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Grade</p>
            <div className="mt-[14px] flex justify-between">
              <Wheel name="Lift" dx={-8} dy={10} />
              <Wheel name="Gamma" dx={4} dy={-3} />
              <Wheel name="Gain" dx={12} dy={-8} />
            </div>
            <p className="mt-[26px] font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Deliver</p>
            <ul className="mt-[10px] flex flex-col gap-[8px] text-[13px]">
              {[
                ["16:9", "45 s master", true],
                ["9:16", "15 s reel", true],
                ["1:1", "6 s bumper", false],
                ["Stills", "24 graded frames", false],
              ].map(([ratio, what, done]) => (
                <li key={what as string} className="flex items-center gap-[12px] rounded-[8px] bg-fg/5 px-[12px] py-[9px]">
                  <span className="w-[46px] font-mono text-[12px] text-red-300">{ratio}</span>
                  <span className="flex-1">{what}</span>
                  <span className={`text-[12px] ${done ? "text-fg" : "text-muted"}`}>{done ? "Rendered" : "Queued"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="absolute inset-x-0 bottom-0 h-[296px] border-t border-fg/10 bg-[#100d0c] px-[12px] pt-[8px]">
          {/* Ruler */}
          <div className="relative ml-[64px] h-[24px]" style={{ width: TRACK_W }}>
            {Array.from({ length: 46 }, (_, i) => (
              <span
                key={i}
                className="absolute bottom-0 w-px bg-fg/25"
                style={{ left: (i / 45) * TRACK_W, height: i % 5 === 0 ? 10 : 5 }}
              />
            ))}
            {[0, 10, 20, 30, 40].map((s) => (
              <span key={s} className="absolute top-0 font-mono text-[9px] text-muted" style={{ left: (s / 45) * TRACK_W + 3 }}>
                00:{String(s).padStart(2, "0")}
              </span>
            ))}
          </div>

          {/* Tracks */}
          <div className="mt-[6px] flex flex-col gap-[6px]">
            <div className="flex h-[34px] items-center">
              <span className="w-[64px] font-mono text-[11px] text-muted">V2</span>
              <div className="relative h-full" style={{ width: TRACK_W }}>
                <span className="absolute inset-y-0 left-[40px] flex w-[150px] items-center rounded-[4px] bg-red-500 px-[8px] text-[11px] font-semibold">
                  Title
                </span>
                <span className="absolute inset-y-0 left-[560px] flex w-[200px] items-center rounded-[4px] bg-red-500 px-[8px] text-[11px] font-semibold">
                  Lower third
                </span>
              </div>
            </div>
            <div className="flex h-[72px] items-center">
              <span className="w-[64px] font-mono text-[11px] text-muted">V1</span>
              <div className="relative flex h-full gap-[3px]" style={{ width: TRACK_W }}>
                {CLIPS.map((c) => {
                  return (
                    <span key={c.src} className="relative h-full overflow-hidden rounded-[4px] ring-1 ring-red-300/40" style={{ width: c.w }}>
                      <Image src={c.src} alt="" fill sizes="220px" className="object-cover opacity-90" />
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="flex h-[48px] items-center">
              <span className="w-[64px] font-mono text-[11px] text-muted">A1</span>
              <div className="flex h-full items-center rounded-[4px] bg-red-950 px-[6px]" style={{ width: 640 }}>
                <Wave seed={7} w={628} h={40} color="var(--color-red-300)" />
              </div>
            </div>
            <div className="flex h-[48px] items-center">
              <span className="w-[64px] font-mono text-[11px] text-muted">A2</span>
              <div className="flex h-full items-center rounded-[4px] bg-bg-light px-[6px]" style={{ width: TRACK_W - 40 }}>
                <Wave seed={3} w={TRACK_W - 52} h={40} color="var(--color-muted)" />
              </div>
            </div>
          </div>

          {/* Playhead */}
          <div
            className={`${styles.playhead} absolute bottom-[10px] top-[18px] w-[2px] bg-red-500`}
            style={{ left: TRACK_X + 12 + 380, "--travel": `${TRACK_W - 400}px` } as CSSProperties}
          >
            <span className="absolute -left-[6px] -top-[2px] h-[12px] w-[14px] rounded-[2px] bg-red-500" />
          </div>
        </div>
      </div>
    </ProductCanvas>
  );
}
