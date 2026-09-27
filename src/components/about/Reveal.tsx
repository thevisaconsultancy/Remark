"use client";

import { createElement, type HTMLAttributes } from "react";
import { useSeen } from "./useSeen";

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "ol" | "ul";
  threshold?: number;
};

/**
 * A plain element that reports `data-seen` once it has been on screen. Children style
 * their own entrance off that attribute (see about.module.css); with no script or with
 * reduced motion the CSS shows everything finished, whatever the attribute says.
 */
export function Reveal({ as = "div", threshold = 0.2, ...rest }: RevealProps) {
  const [ref, seen] = useSeen<HTMLElement>(threshold);
  return createElement(as, { ...rest, ref, "data-seen": seen });
}
