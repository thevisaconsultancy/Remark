import { ProductCanvas } from "./ProductCanvas";
import styles from "./products.module.css";

/** Dhoop's mark: a sun rising over the rim of a cup. */
function Mark({ size, color }: { size: number; color: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <path d="M14 40a18 18 0 0136 0z" fill={color} />
      {[-60, -30, 0, 30, 60].map((a) => (
        <line
          key={a}
          x1="32"
          y1="40"
          x2="32"
          y2="10"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="0 26 6 40"
          transform={`rotate(${a} 32 40)`}
        />
      ))}
      <rect x="8" y="44" width="48" height="5" rx="2.5" fill={color} />
    </svg>
  );
}

function Wordmark({ size, color }: { size: number; color: string }) {
  return (
    <span className="font-cranio leading-none tracking-[0.02em]" style={{ fontSize: size, color }}>
      dhoop
    </span>
  );
}

const PALETTE = [
  { name: "Ember", hex: "#B91319", bg: "bg-red-500", on: "text-fg" },
  { name: "Roast", hex: "#2C0005", bg: "bg-red-950", on: "text-fg" },
  { name: "Crema", hex: "#F4E8E4", bg: "bg-paper-2", on: "text-ink" },
  { name: "Char", hex: "#1A1210", bg: "bg-ink", on: "text-fg" },
];

const TILE = "absolute overflow-hidden rounded-[6px]";

/** Brand Identity: a brand board for a fictional coffee roaster. */
export function BrandProduct({ label }: { label: string }) {
  return (
    <ProductCanvas w={1200} h={760} label={label}>
      {/* Primary logo */}
      <div className={`${TILE} left-0 top-0 flex h-[420px] w-[560px] flex-col justify-between bg-red-500 p-[34px] text-fg`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-red-100">Primary logo</p>
        <div className="flex flex-col items-center gap-[10px]">
          <Mark size={120} color="var(--color-fg)" />
          <Wordmark size={96} color="var(--color-fg)" />
        </div>
        <p className="text-center font-mono text-[12px] uppercase tracking-[0.3em] text-red-100">
          Coffee roasters · Islamabad
        </p>
      </div>

      {/* Mark alone */}
      <div className={`${TILE} left-[574px] top-0 flex h-[200px] w-[300px] items-center justify-center bg-paper`}>
        <p className="absolute left-[20px] top-[18px] font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">Mark</p>
        <Mark size={104} color="var(--color-red-500)" />
      </div>

      {/* Horizontal lockup */}
      <div className={`${TILE} left-[888px] top-0 flex h-[200px] w-[312px] items-center justify-center gap-[12px] bg-ink ring-1 ring-inset ring-fg/15`}>
        <p className="absolute left-[20px] top-[18px] font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Lockup</p>
        <Mark size={58} color="var(--color-red-300)" />
        <Wordmark size={54} color="var(--color-fg)" />
      </div>

      {/* Palette */}
      <div className={`${TILE} left-[574px] top-[214px] grid h-[206px] w-[626px] grid-cols-4`}>
        {PALETTE.map((c) => (
          <div key={c.name} className={`${c.bg} ${c.on} flex flex-col justify-end p-[16px] ${c.name === "Char" || c.name === "Roast" ? "ring-1 ring-inset ring-fg/15" : ""}`}>
            <p className="text-[17px] font-bold">{c.name}</p>
            <p className="mt-[2px] font-mono text-[11px] tracking-[0.1em] opacity-80">{c.hex}</p>
          </div>
        ))}
      </div>

      {/* Type specimen */}
      <div className={`${TILE} left-0 top-[434px] h-[326px] w-[380px] bg-paper p-[26px] text-ink`}>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">Typography</p>
        <div className="mt-[10px] flex items-end gap-[26px]">
          <span className="font-cranio text-[118px] leading-[0.9]">Aa</span>
          <span className="pb-[10px] text-[64px] font-extrabold leading-[0.9] tracking-[-0.03em]">Aa</span>
        </div>
        <div className="mt-[16px] grid grid-cols-2 gap-[14px] border-t border-ink/15 pt-[14px] text-[12px]">
          <p>
            <span className="block font-bold">Display</span>
            <span className="text-ink-muted">Headlines, packaging</span>
          </p>
          <p>
            <span className="block font-bold">Text</span>
            <span className="text-ink-muted">Menus, labels, web</span>
          </p>
        </div>
        <p className="mt-[14px] text-[15px] leading-[1.45] text-ink-muted">
          Slow-roasted in small batches, poured the moment the sun is up.
        </p>
      </div>

      {/* Stationery */}
      <div className={`${TILE} left-[394px] top-[434px] h-[326px] w-[806px] bg-paper-2`}>
        <p className="absolute left-[22px] top-[18px] z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          Stationery
        </p>
        {/* Letterhead */}
        <div
          className={`${styles.lift} absolute left-[60px] top-[46px] h-[380px] w-[268px] -rotate-[5deg] bg-[#fffaf7] p-[24px] text-ink`}
        >
          <div className="flex items-center gap-[6px]">
            <Mark size={26} color="var(--color-red-500)" />
            <Wordmark size={22} color="var(--color-ink)" />
          </div>
          <div className="mt-[34px] flex flex-col gap-[8px]">
            {[90, 100, 96, 100, 70, 0, 100, 94, 100, 60].map((w, i) => (
              <span key={i} className="h-[4px] rounded-full bg-ink/12" style={{ width: `${w}%`, opacity: w ? 1 : 0 }} />
            ))}
          </div>
          <span className="absolute inset-x-0 bottom-0 h-[8px] bg-red-500" />
        </div>
        {/* Business card, back */}
        <div
          className={`${styles.lift} absolute left-[360px] top-[34px] flex h-[190px] w-[330px] rotate-[3deg] flex-col justify-between bg-[#fffaf7] p-[22px] text-ink`}
        >
          <div>
            <p className="text-[18px] font-extrabold tracking-[-0.01em]">Zara Qureshi</p>
            <p className="text-[12px] text-ink-muted">Head roaster</p>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-[11px] leading-[1.5] text-ink-muted">
              hello@dhoop.example
              <br />
              F-7 Markaz, Islamabad
            </p>
            <Mark size={34} color="var(--color-red-500)" />
          </div>
        </div>
        {/* Business card, front */}
        <div
          className={`${styles.lift} absolute left-[455px] top-[200px] flex h-[190px] w-[330px] -rotate-[4deg] items-center justify-center gap-[10px] bg-red-500`}
        >
          <Mark size={52} color="var(--color-fg)" />
          <Wordmark size={48} color="var(--color-fg)" />
        </div>
      </div>
    </ProductCanvas>
  );
}
