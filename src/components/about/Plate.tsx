"use client";

import { useRef, type HTMLAttributes, type PointerEvent } from "react";
import styles from "./about.module.css";

type PlateProps = HTMLAttributes<HTMLElement> & { as?: "div" | "article" };

/**
 * A red plate of worked metal. Under a fine pointer a soft light follows the cursor
 * across it: one absolutely positioned gradient, moved by transform once per frame.
 * Touch, pens and reduced motion get the plain plate.
 */
export function Plate({ as = "div", className = "", children, ...rest }: PlateProps) {
  const sheen = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  const move = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (sheen.current) sheen.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.dataset.lit = "true";
    });
  };

  const leave = (e: PointerEvent<HTMLElement>) => {
    cancelAnimationFrame(frame.current);
    e.currentTarget.dataset.lit = "false";
  };

  const Tag = as;
  return (
    <Tag {...rest} className={`${styles.bar} relative ${className}`} onPointerMove={move} onPointerLeave={leave}>
      <span ref={sheen} aria-hidden="true" className={styles.sheen} />
      {children}
    </Tag>
  );
}
