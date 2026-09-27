import type { CSSProperties, ReactNode } from "react";
import type { IconType } from "react-icons";
import { LuSparkles, LuTriangleAlert } from "react-icons/lu";
import { BG_TEAL, BG_TEAL_SOFT, CAPS, CARD, LINE, T_INK, T_MUTED, T_TEAL } from "./tokens";
import a from "./shots.module.css";

/** Stagger index for the one-off in-shot animations (see shots.module.css). */
export const at = (i: number) => ({ "--i": i }) as CSSProperties;

export function PageTitle({
  title,
  tag,
  sub,
  icon: Icon,
  action,
}: {
  title: string;
  tag?: string;
  sub?: string;
  icon?: IconType;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <span className={`mt-0.5 grid h-[34px] w-[34px] place-items-center rounded-[8px] ${BG_TEAL_SOFT} ${T_TEAL}`}>
          <Icon className="h-4 w-4" />
        </span>
      )}
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <p className={`font-ui text-[22px] font-bold tracking-[-0.015em] ${T_INK}`}>{title}</p>
          {tag && (
            <span className={`inline-flex items-center gap-1 rounded-[6px] ${BG_TEAL_SOFT} px-2 py-[3px] text-[11px] font-semibold ${T_TEAL}`}>
              <LuSparkles className="h-3 w-3" />
              {tag}
            </span>
          )}
        </div>
        {sub && <p className={`mt-0.5 text-[13px] ${T_MUTED}`}>{sub}</p>}
      </div>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}

export function PrimaryButton({ children, icon: Icon }: { children: ReactNode; icon?: IconType }) {
  return (
    <span className={`inline-flex h-[32px] items-center gap-1.5 rounded-[7px] ${BG_TEAL} px-3.5 text-[12px] font-semibold text-white`}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

export function GhostButton({ children, icon: Icon }: { children: ReactNode; icon?: IconType }) {
  return (
    <span className={`inline-flex h-[32px] items-center gap-1.5 rounded-[7px] border ${LINE} bg-white px-3 text-[12px] font-semibold text-[#374151]`}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

type BadgeKind = "active" | "refused" | "closed" | "approved" | "dark" | "outline" | "teal" | "amber";

const BADGE: Record<BadgeKind, string> = {
  active: "bg-[#ecfdf3] text-[#15803d] border-[#bbf7d0]",
  approved: "bg-[#ecfdf3] text-[#15803d] border-[#bbf7d0]",
  refused: "bg-[#fef2f2] text-[#dc2626] border-[#fecaca]",
  closed: "bg-[#f3f4f6] text-[#4b5563] border-[#e5e7eb]",
  dark: "bg-[#111827] text-white border-[#111827]",
  outline: "bg-white text-[#374151] border-[#e5e7eb]",
  teal: "bg-[#e6eeec] text-[#0f4c45] border-[#cfe0dc]",
  amber: "bg-[#fffbeb] text-[#b45309] border-[#fde68a]",
};

export function Badge({ kind, children, icon: Icon }: { kind: BadgeKind; children: ReactNode; icon?: IconType }) {
  return (
    <span className={`inline-flex h-[22px] items-center gap-1 whitespace-nowrap rounded-[5px] border px-2 text-[11px] font-semibold ${BADGE[kind]}`}>
      {Icon && <Icon className="h-3 w-3" />}
      {children}
    </span>
  );
}

export function Overdue({ days }: { days: number }) {
  return (
    <Badge kind="refused" icon={LuTriangleAlert}>
      Overdue · {days}d over
    </Badge>
  );
}

export function Tabs({ items, active }: { items: string[]; active: string }) {
  return (
    <div className={`flex gap-7 border-b ${LINE}`}>
      {items.map((t) => (
        <span
          key={t}
          className={`relative pb-2.5 text-[13px] ${t === active ? `font-semibold ${T_TEAL}` : "text-[#4b5563]"}`}
        >
          {t}
          {t === active && <span className="absolute right-0 -bottom-px left-0 h-[2px] bg-[#0f4c45]" />}
        </span>
      ))}
    </div>
  );
}

export function Panel({
  title,
  icon: Icon,
  meta,
  action,
  children,
  className = "",
  accent = false,
}: {
  title: string;
  icon?: IconType;
  meta?: string;
  action?: string;
  children: ReactNode;
  className?: string;
  /** The product's teal top edge on featured cards. */
  accent?: boolean;
}) {
  return (
    <div className={`${CARD} overflow-hidden ${accent ? "border-t-2 border-t-[#0f4c45]" : ""} ${className}`}>
      <div className={`flex h-[42px] items-center gap-2 border-b ${LINE} px-4`}>
        {Icon && <Icon className="h-3.5 w-3.5 text-[#374151]" />}
        <span className={`${CAPS} text-[#1f2937]`}>{title}</span>
        {meta && <span className={`text-[11px] ${T_MUTED}`}>· {meta}</span>}
        {action && <span className={`ml-auto ${CAPS} ${T_TEAL}`}>{action}</span>}
      </div>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string;
  note: string;
  icon: IconType;
  tone?: "default" | "teal" | "alert";
}) {
  const edge = tone === "teal" ? "border-t-[#0f4c45]" : tone === "alert" ? "border-t-[#dc2626]" : "border-t-[#636a77]";
  return (
    <div className={`${CARD} border-t-2 ${edge} px-4 pt-3.5 pb-3.5`}>
      <div className="flex items-center gap-2">
        <span className={`grid h-[24px] w-[24px] place-items-center rounded-[6px] ${BG_TEAL_SOFT} ${T_TEAL}`}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className={`${CAPS} text-[#4b5563]`}>{label}</span>
      </div>
      <p className={`mt-2.5 text-[28px] font-bold leading-none ${T_INK}`}>{value}</p>
      <p className={`mt-2 text-[11px] ${T_MUTED}`}>{note}</p>
    </div>
  );
}

export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`h-[36px] px-3 text-left ${CAPS} font-semibold text-[#4b5563] ${className}`}>{children}</th>;
}

export function Td({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <td className={`h-[46px] border-t border-[#eef0f2] px-3 align-middle text-[13px] ${className}`}>{children}</td>;
}

/**
 * A Remark annotation pin over the client's product (Remark red, not the product's
 * palette). Positioned in canvas px; pair it with a visible legend in the page text.
 */
export function Pin({ n, x = -14, y = -14, className = "" }: { n: number; x?: number; y?: number; className?: string }) {
  return (
    <span
      data-pin={n}
      className={`${a.pin} absolute z-10 grid h-[30px] w-[30px] place-items-center rounded-full bg-[#b91319] font-mono text-[13px] font-bold text-white shadow-[0_0_0_4px_rgba(255,255,255,0.95),0_6px_16px_rgba(95,0,11,0.35)] ${className}`}
      style={{ left: x, top: y, ...at(n) }}
    >
      {n}
    </span>
  );
}
