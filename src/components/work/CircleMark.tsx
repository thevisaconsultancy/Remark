"use client";

import { useEffect, useRef, useState } from "react";

type CircleMarkProps = {
  word: string;
  /** Mark colour: red-500 (default) or fg. */
  tone?: "accent" | "fg" | "ink";
  /** Always "heavy" on paper (Material Rule). */
  weight?: "hair" | "heavy";
};

/**
 * A variant of MarkedWord's circle gesture, copied so the shared component stays
 * untouched: the ring is an ellipse sized to the word itself rather than a fixed
 * 1.3em square, so short words set in Cranio are fully encircled.
 */
export function CircleMark({ word, tone = "accent", weight = "hair" }: CircleMarkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const colour = tone === "fg" ? "border-fg" : tone === "ink" ? "border-ink" : "border-accent";
  const thickness = weight === "heavy" ? "border-[0.07em]" : "border-2";

  return (
    <span ref={ref} className="relative inline-flex">
      {word}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-[0.04em] -right-[0.16em] -bottom-[0.1em] -left-[0.16em] rounded-[50%] ${colour} ${thickness} transition-[clip-path] duration-[600ms] ease-out-expo motion-reduce:duration-[1ms]`}
        style={{ clipPath: visible ? "circle(75% at 50% 50%)" : "circle(0% at 50% 50%)" }}
      />
    </span>
  );
}
