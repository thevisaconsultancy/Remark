// The CRM's own look, redrawn: white UI, dark-teal primary, grey sidebar.
// These colours belong to the client's product and are only used inside shots.
// Kept as whole class literals so Tailwind can see them.

/** Text */
export const T_INK = "text-[#111827]";
export const T_BODY = "text-[#1f2937]";
export const T_MUTED = "text-[#636a77]";
export const T_FAINT = "text-[#9ca3af]";
export const T_TEAL = "text-[#0f4c45]";

/** Surfaces */
export const BG_TEAL = "bg-[#0f4c45]";
export const BG_TEAL_SOFT = "bg-[#e6eeec]";
export const BG_SIDE = "bg-[#f6f6f7]";

/** Lines */
export const LINE = "border-[#e5e7eb]";
export const LINE_SOFT = "border-[#eef0f2]";

/** Small caps label used across the product (e.g. "NEEDS YOU", column heads). */
export const CAPS = "text-[11px] font-semibold uppercase tracking-[0.08em]";

/** Card: white, hairline, soft shadow, as in the product. */
export const CARD = "rounded-[10px] border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(17,24,39,0.04)]";

/** Canvas size every full-screen shot is drawn at. */
export const SCREEN = { w: 1280, h: 800 } as const;
