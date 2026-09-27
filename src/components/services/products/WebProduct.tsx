import { ProductCanvas } from "./ProductCanvas";
import styles from "./products.module.css";

/** Flight paths from Islamabad to four destinations, drawn on the site's hero panel. */
function RouteArt({ compact = false }: { compact?: boolean }) {
  const pins = compact
    ? [
        { x: 250, y: 60, label: "Toronto" },
        { x: 300, y: 150, label: "Manchester" },
      ]
    : [
        { x: 90, y: 70, label: "Toronto" },
        { x: 250, y: 50, label: "Manchester" },
        { x: 330, y: 150, label: "Berlin" },
        { x: 300, y: 250, label: "Melbourne" },
      ];
  const origin = { x: 60, y: 280 };
  return (
    <svg viewBox="0 0 400 330" className="absolute inset-0 h-full w-full" aria-hidden="true">
      {/* Latitude lines */}
      {[60, 120, 180, 240, 300].map((y) => (
        <path key={y} d={`M0 ${y} Q200 ${y - 26} 400 ${y}`} fill="none" stroke="var(--color-red-800)" strokeWidth="1" />
      ))}
      {[80, 200, 320].map((x) => (
        <path key={x} d={`M${x} 0 Q${x - 30} 165 ${x} 330`} fill="none" stroke="var(--color-red-800)" strokeWidth="1" />
      ))}
      {pins.map((p) => {
        const cx = (origin.x + p.x) / 2 - 20;
        const cy = Math.min(origin.y, p.y) - 70;
        return (
          <g key={p.label}>
            <path
              d={`M${origin.x} ${origin.y} Q${cx} ${cy} ${p.x} ${p.y}`}
              fill="none"
              stroke="var(--color-red-300)"
              strokeWidth="1.6"
              strokeDasharray="5 6"
            />
            <circle cx={p.x} cy={p.y} r="5" fill="var(--color-fg)" />
            <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="var(--color-fg)" strokeOpacity="0.35" />
            <text
              x={p.x + (p.x >= 250 ? -14 : 14)}
              y={p.y - 12}
              textAnchor={p.x >= 250 ? "end" : "start"}
              fill="var(--color-fg)"
              fontSize={compact ? 17 : 13}
              fontWeight="600"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {p.label}
            </text>
          </g>
        );
      })}
      <circle cx={origin.x} cy={origin.y} r="8" fill="var(--color-red-500)" />
      <circle cx={origin.x} cy={origin.y} r="16" fill="none" stroke="var(--color-red-500)" strokeWidth="1.5" />
      <text
        x={origin.x + 22}
        y={origin.y + 5}
        fill="var(--color-red-100)"
        fontSize={compact ? 16 : 12}
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}
      >
        ISLAMABAD
      </text>
    </svg>
  );
}

function Logo({ size = 17 }: { size?: number }) {
  return (
    <span className="flex items-center gap-[8px] font-extrabold tracking-[-0.01em] text-ink" style={{ fontSize: size }}>
      <svg viewBox="0 0 24 24" width={size + 5} height={size + 5} aria-hidden="true">
        <circle cx="12" cy="12" r="10.5" fill="var(--color-red-500)" />
        <path d="M5 16 Q10 4 19 8" fill="none" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="8" r="2" fill="var(--color-fg)" />
      </svg>
      Atlas Pathways
    </span>
  );
}

const VISAS = ["Student visa", "Skilled worker", "Visit visa", "Family and spouse"];

/** Web Development: a fictional visa advisory site on a laptop and a phone. */
export function WebProduct({ label }: { label: string }) {
  return (
    <ProductCanvas w={1200} h={760} label={label}>
      {/* Laptop */}
      <div className="absolute left-[46px] top-[16px] w-[900px]">
        <div className={`${styles.device} relative rounded-[26px] bg-[#1b1715] p-[14px] pt-[18px]`}>
          <span className="absolute left-1/2 top-[7px] size-[5px] -translate-x-1/2 rounded-full bg-[#3a3330]" />
          <div className="relative h-[570px] overflow-hidden rounded-[6px] bg-[#fbf6f2] text-ink">
            {/* Browser bar */}
            <div className="flex h-[34px] items-center gap-[7px] border-b border-ink/10 bg-[#f1e9e4] px-[14px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-[10px] rounded-full bg-ink/15" />
              ))}
              <span className="mx-auto flex h-[22px] w-[300px] items-center justify-center gap-[6px] rounded-[6px] bg-[#fbf6f2] text-[11px] text-ink-muted">
                <svg viewBox="0 0 12 12" width="9" height="9" aria-hidden="true">
                  <rect x="2" y="5" width="8" height="6" rx="1" fill="currentColor" />
                  <path d="M4 5V3.5a2 2 0 014 0V5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                atlaspathways.example
              </span>
              <span className="w-[44px]" />
            </div>
            {/* Nav */}
            <div className="flex h-[64px] items-center justify-between px-[40px]">
              <Logo />
              <div className="flex items-center gap-[28px] text-[13px] font-medium text-ink-muted">
                <span className="text-ink">Destinations</span>
                <span>Visa types</span>
                <span>Students</span>
                <span>About</span>
                <span className="rounded-full bg-red-950 px-[16px] py-[9px] text-[12px] font-semibold text-fg">
                  Free assessment
                </span>
              </div>
            </div>
            {/* Hero */}
            <div className="grid grid-cols-[1fr_380px] gap-[32px] px-[40px] pt-[26px]">
              <div className="pt-[8px]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-500">Study · Work · Settle</p>
                <p className="mt-[14px] text-[48px] font-extrabold leading-[1] tracking-[-0.035em]">
                  Your route abroad, planned properly.
                </p>
                <p className="mt-[18px] max-w-[380px] text-[14px] leading-[1.6] text-ink-muted">
                  Registered advisors who check your eligibility, prepare every document and stay with you until the
                  decision.
                </p>
                <div className="mt-[24px] flex gap-[10px] text-[13px] font-semibold">
                  <span className="rounded-full bg-red-500 px-[20px] py-[11px] text-fg">Check eligibility</span>
                  <span className="rounded-full px-[20px] py-[11px] ring-1 ring-inset ring-ink/25">
                    Explore destinations
                  </span>
                </div>
              </div>
              <div className="relative h-[330px] overflow-hidden rounded-[16px] bg-red-950">
                <RouteArt />
              </div>
            </div>
            {/* Visa types */}
            <div className="mt-[30px] grid grid-cols-4 gap-[12px] px-[40px]">
              {VISAS.map((v, i) => (
                <div key={v} className="flex items-center justify-between rounded-[10px] bg-[#f1e9e4] px-[16px] py-[14px]">
                  <span>
                    <span className="block font-mono text-[9px] tracking-[0.16em] text-ink-muted">0{i + 1}</span>
                    <span className="mt-[2px] block text-[13px] font-bold">{v}</span>
                  </span>
                  <span className="text-[15px] text-red-500">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Base */}
        <div className="relative -mx-[46px] h-[20px] rounded-b-[18px] rounded-t-[3px] bg-gradient-to-b from-[#d8cfca] via-[#b7aca7] to-[#7d736f]">
          <span className="absolute left-1/2 top-0 h-[7px] w-[150px] -translate-x-1/2 rounded-b-[8px] bg-[#8e8480]" />
        </div>
      </div>

      {/* Phone */}
      <div
        className={`${styles.device} absolute left-[926px] top-[196px] h-[540px] w-[262px] rounded-[44px] bg-[#1b1715] p-[10px]`}
      >
        <div className="relative h-full overflow-hidden rounded-[35px] bg-[#fbf6f2] text-ink">
          <span className="absolute left-1/2 top-[10px] h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-[#1b1715]" />
          <div className="flex h-[44px] items-end justify-between px-[22px] pb-[4px] text-[11px] font-semibold">
            <span>9:41</span>
            <span className="flex gap-[3px]">
              <span className="h-[8px] w-[14px] rounded-[2px] bg-ink" />
            </span>
          </div>
          <div className="flex items-center justify-between px-[18px] py-[10px]">
            <Logo size={13} />
            <span className="flex flex-col gap-[4px]">
              <span className="h-[2px] w-[18px] bg-ink" />
              <span className="h-[2px] w-[12px] self-end bg-ink" />
            </span>
          </div>
          <div className="px-[18px] pt-[8px]">
            <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-red-500">Study · Work · Settle</p>
            <p className="mt-[8px] text-[26px] font-extrabold leading-[1.02] tracking-[-0.035em]">
              Your route abroad, planned properly.
            </p>
          </div>
          <div className="relative mx-[14px] mt-[14px] h-[170px] overflow-hidden rounded-[14px] bg-red-950">
            <RouteArt compact />
          </div>
          <div className="mx-[14px] mt-[12px] rounded-full bg-red-500 py-[11px] text-center text-[12px] font-semibold text-fg">
            Check eligibility
          </div>
          <div className="mx-[14px] mt-[10px] flex items-center justify-between rounded-[10px] bg-[#f1e9e4] px-[14px] py-[11px]">
            <span className="text-[12px] font-bold">Student visa</span>
            <span className="text-[13px] text-red-500">→</span>
          </div>
        </div>
      </div>
    </ProductCanvas>
  );
}
