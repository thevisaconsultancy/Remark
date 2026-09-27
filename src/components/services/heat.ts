import type { CSSProperties } from "react";
import type { Heat } from "@/data/services";
import styles from "./services.module.css";

/** Dark cherry to white heat. White stays white (it only gains a glow). */
const HEAT_ORDER: Heat[] = ["red-950", "red-800", "red-600", "red-500", "red-300", "red-100", "white"];

function nextHotter(heat: Heat): Heat {
  const i = HEAT_ORDER.indexOf(heat);
  return HEAT_ORDER[Math.min(i + 1, HEAT_ORDER.length - 1)];
}

type HeatStyle = {
  /** Tailwind background class. */
  bg: string;
  /** Tailwind text class chosen for >= 4.5:1 on this heat. */
  text: string;
  /** Hairline edge, only where the heat would melt into its surroundings. */
  edge: string;
  /** Raw CSS colour for this heat (for CSS-variable driven states). */
  color: string;
  /** Raw CSS colour for text on this heat. */
  on: string;
};

// Contrast (WCAG): fg on red-950 17.1, red-800 12.7, red-600 6.9, red-500 6.0;
// ink on red-300 7.4, red-100 14.0, fg 16.7.
export const HEAT: Record<Heat, HeatStyle> = {
  "red-950": {
    bg: "bg-red-950",
    text: "text-fg",
    edge: "ring-1 ring-inset ring-red-800", // separates it from the void
    color: "var(--color-red-950)",
    on: "var(--color-fg)",
  },
  "red-800": { bg: "bg-red-800", text: "text-fg", edge: "", color: "var(--color-red-800)", on: "var(--color-fg)" },
  "red-600": { bg: "bg-red-600", text: "text-fg", edge: "", color: "var(--color-red-600)", on: "var(--color-fg)" },
  "red-500": { bg: "bg-accent", text: "text-fg", edge: "", color: "var(--color-red-500)", on: "var(--color-fg)" },
  "red-300": { bg: "bg-red-300", text: "text-ink", edge: "", color: "var(--color-red-300)", on: "var(--color-ink)" },
  "red-100": { bg: "bg-red-100", text: "text-ink", edge: "", color: "var(--color-red-100)", on: "var(--color-ink)" },
  white: {
    bg: "bg-fg",
    text: "text-ink",
    edge: styles.whiteHeat, // white-hot core, red rim: visible on paper, never an empty box
    color: "var(--color-fg)",
    on: "var(--color-ink)",
  },
};

/**
 * CSS variables for elements whose heat steps on hover:
 * --heat / --heat-on at rest, --next / --next-on one step hotter.
 */
export function heatVars(heat: Heat): CSSProperties {
  const next = nextHotter(heat);
  return {
    "--heat": HEAT[heat].color,
    "--heat-on": HEAT[heat].on,
    "--next": HEAT[next].color,
    "--next-on": HEAT[next].on,
  } as CSSProperties;
}
