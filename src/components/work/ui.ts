import type { CSSProperties } from "react";

// Shared class strings for the Work page. Kept as whole literals so Tailwind sees them.

/** Page container. */
export const CONTAINER = "relative mx-auto w-full max-w-[1320px] px-4 md:px-8";

/** Vertical rhythm for a chapter. */
export const SECTION_PAD = "py-20 md:py-24 lg:py-28";

/** Chapter headline: Cranio, one weight, poster scale. */
export const H2 =
  "min-w-0 font-normal text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[0.98] tracking-[-0.01em] [overflow-wrap:anywhere] text-balance";

/** Body lede. */
export const LEDE = "max-w-[54ch] font-ui text-[17px] leading-relaxed md:text-[18px]";

/** Focus rings: 2px, offset 2px, never animated. */
export const FOCUS_VOID = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg";
export const FOCUS_PAPER = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export type Register = "void" | "paper" | "red";

export const REGISTER_BG: Record<Register, string> = {
  void: "bg-void text-fg",
  paper: "bg-paper-warm text-ink",
  red: "bg-accent text-fg",
};

/** Secondary text per register (AA on each surface). */
export const MUTED: Record<Register, string> = {
  void: "text-muted",
  paper: "text-ink-muted",
  red: "text-fg/90",
};

/** A stagger index as a CSS custom property (`--i`), typed for React's style prop. */
export const stagger = (i: number, extra?: CSSProperties) => ({ "--i": i, ...extra }) as CSSProperties;
