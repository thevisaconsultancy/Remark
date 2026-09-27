import { ProductCanvas } from "./ProductCanvas";
import styles from "./products.module.css";

// Illustrative leads per day over a 14-day flight. Not client data.
const SERIES = [8, 11, 10, 15, 14, 19, 17, 22, 26, 24, 29, 31, 28, 34];

function Chart() {
  const w = 600;
  const h = 170;
  const max = 40;
  const pts = SERIES.map((v, i) => [(i / (SERIES.length - 1)) * w, h - (v / max) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h + 22}`} width={w} height={h + 22} aria-hidden="true" className="overflow-visible">
      {[0, 10, 20, 30].map((v) => (
        <line key={v} x1="0" x2={w} y1={h - (v / max) * h} y2={h - (v / max) * h} stroke="var(--color-ink)" strokeOpacity="0.08" />
      ))}
      <path d={area} fill="var(--color-red-500)" fillOpacity="0.12" />
      <path d={line} fill="none" stroke="var(--color-red-500)" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="5" fill="var(--color-red-500)" />
      <circle cx={lx} cy={ly} r="10" fill="none" stroke="var(--color-red-500)" strokeOpacity="0.35" />
      {["Day 1", "Day 7", "Day 14"].map((d, i) => (
        <text
          key={d}
          x={(i / 2) * w}
          y={h + 18}
          textAnchor={i === 0 ? "start" : i === 2 ? "end" : "middle"}
          fontSize="11"
          fill="var(--color-ink-muted)"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {d}
        </text>
      ))}
    </svg>
  );
}

/** Digital Marketing: a social ad, a search ad and the campaign report, all sample. */
export function MarketingProduct({ label }: { label: string }) {
  return (
    <ProductCanvas w={1100} h={820} label={label}>
      {/* Social ad */}
      <div className={`${styles.lift} absolute left-[20px] top-[40px] w-[420px] -rotate-[3deg] overflow-hidden rounded-[18px] bg-white text-ink`}>
        <div className="flex items-center gap-[10px] px-[16px] py-[12px]">
          <span className="flex size-[36px] items-center justify-center rounded-full bg-ink text-[14px] font-extrabold text-fg">M</span>
          <span className="flex-1 leading-tight">
            <span className="block text-[14px] font-bold">Mehran Motors</span>
            <span className="block text-[12px] text-ink-muted">Sponsored</span>
          </span>
          <span className="text-[18px] tracking-[2px] text-ink-muted">···</span>
        </div>
        <div className="relative h-[420px] overflow-hidden bg-red-500 p-[28px] text-fg">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red-100">Winter service</p>
          <p className="mt-[14px] font-cranio text-[58px] leading-[0.98]">Serviced in a day. Back by dinner.</p>
          {/* Car line drawing */}
          <svg viewBox="0 0 360 120" className="absolute bottom-[24px] left-[30px] w-[360px]" aria-hidden="true">
            <path
              d="M10 92h24a22 22 0 0144 0h150a22 22 0 0144 0h60l6-22-40-10-44-34H120L78 58 16 66z"
              fill="none"
              stroke="var(--color-fg)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="56" cy="92" r="16" fill="none" stroke="var(--color-fg)" strokeWidth="3" />
            <circle cx="250" cy="92" r="16" fill="none" stroke="var(--color-fg)" strokeWidth="3" />
            <path d="M128 32h84l34 28H100z" fill="var(--color-red-950)" fillOpacity="0.5" />
          </svg>
        </div>
        <div className="flex items-center justify-between bg-[#f6f0ec] px-[16px] py-[12px]">
          <span className="leading-tight">
            <span className="block text-[11px] uppercase text-ink-muted">mehranmotors.example</span>
            <span className="block text-[14px] font-bold">Book a winter service</span>
          </span>
          <span className="rounded-[8px] bg-ink px-[14px] py-[8px] text-[13px] font-semibold text-fg">Book now</span>
        </div>
      </div>

      {/* Report */}
      <div className={`${styles.lift} absolute left-[400px] top-[120px] w-[680px] rounded-[18px] bg-white p-[28px] text-ink`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Campaign report</p>
            <p className="mt-[6px] text-[22px] font-extrabold tracking-[-0.02em]">Winter service, 14 days</p>
          </div>
          <span className="rounded-full border border-dashed border-ink/40 px-[10px] py-[4px] font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            Sample figures
          </span>
        </div>
        <div className="mt-[20px] grid grid-cols-4 gap-[10px]">
          {[
            ["Reach", "84.2k"],
            ["Clicks", "2,430"],
            ["Leads", "312"],
            ["Cost per lead", "Rs 180"],
          ].map(([k, v], i) => (
            <div key={k} className={`rounded-[12px] p-[14px] ${i === 2 ? "bg-red-500 text-fg" : "bg-[#f6f0ec]"}`}>
              <p className={`text-[12px] ${i === 2 ? "text-red-100" : "text-ink-muted"}`}>{k}</p>
              <p className="mt-[4px] text-[26px] font-extrabold leading-none tracking-[-0.02em]">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-[22px] flex items-baseline justify-between">
          <p className="text-[14px] font-bold">Leads per day</p>
          <p className="text-[12px] text-ink-muted">Meta Ads + Google Ads</p>
        </div>
        <div className="mt-[10px]">
          <Chart />
        </div>
      </div>

      {/* Search ad */}
      <div className={`${styles.lift} absolute left-[300px] top-[600px] w-[560px] rounded-[16px] bg-white p-[22px] text-ink`}>
        <p className="text-[12px] text-ink-muted">
          <span className="font-bold text-ink">Sponsored</span> · mehranmotors.example
        </p>
        <p className="mt-[6px] text-[20px] font-semibold leading-[1.25] text-red-600">
          Car Service in Islamabad · Book Online in 60 Seconds
        </p>
        <p className="mt-[6px] text-[13px] leading-[1.5] text-ink-muted">
          Same-day servicing for all makes. Genuine parts, fixed prices, pick-up and drop-off in F and G sectors.
        </p>
      </div>
    </ProductCanvas>
  );
}
