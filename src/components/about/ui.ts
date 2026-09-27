// Shared class strings for the About page, so every section keeps one rhythm:
// the same section padding, the same heading scale, the same label and body type.

export const SECTION = "relative scroll-mt-20 py-24 md:py-36";
export const WRAP = "mx-auto w-full max-w-7xl px-4 md:px-8";

/** Section headline: display face, one weight, one scale. Balanced, tightened a hair at size. */
export const H2 =
  "font-normal text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.012em] text-balance";

/** Sub-heading inside a section. */
export const H3 = "font-normal text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.005em] text-balance";

/** Small item title. */
export const H4 = "font-cranio text-[1.375rem] leading-[1.15] text-balance";

export const LABEL = "font-mono text-[11px] uppercase leading-[1.4] tracking-[0.22em]";

/** Lead paragraphs: a touch more leading than body, never wider than ~62 characters. */
export const LEAD = "font-ui text-[17px] leading-[1.65] text-pretty md:text-[18px]";
export const BODY = "font-ui text-[16px] leading-[1.6] text-pretty";

const LINK_BASE =
  "inline-flex min-h-11 items-center gap-2 rounded-[2px] font-ui text-[16px] underline decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

export const LINK_VOID = `${LINK_BASE} text-fg decoration-fg/35 hover:decoration-accent focus-visible:outline-fg`;
export const LINK_PAPER = `${LINK_BASE} text-ink decoration-ink/35 hover:decoration-accent focus-visible:outline-ink`;

/**
 * Headings carry the display face from the global h1-h6 rule, which sits outside
 * Tailwind's layers and so beats `font-mono`. A label set as a heading takes this style.
 */
export const MONO_HEADING = { fontFamily: "var(--font-mono), ui-monospace, monospace" } as const;
