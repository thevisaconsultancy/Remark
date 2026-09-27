"use client";

import { useEffect, useRef, useState } from "react";

type Gesture = "underline" | "circle" | "strike" | "bracket";
type Tone = "accent" | "fg" | "ink" | "deep";
type Weight = "hair" | "heavy";

interface MarkedWordProps {
  word: string;
  gesture?: Gesture;
  className?: string;
  animateOnLoad?: boolean;
  delay?: number;
  /** Mark colour: red-500 (default), fg, ink or red-950. */
  tone?: Tone;
  /** Mark thickness. Always use "heavy" on paper (Material Rule). */
  weight?: Weight;
}

// Static class strings so Tailwind can see every variant.
const tones: Record<Tone, { bg: string; border: string }> = {
  accent: { bg: "bg-accent", border: "border-accent" },
  fg: { bg: "bg-fg", border: "border-fg" },
  ink: { bg: "bg-ink", border: "border-ink" },
  deep: { bg: "bg-red-950", border: "border-red-950" },
};

const thickness: Record<Gesture, Record<Weight, string>> = {
  underline: { hair: "h-[0.045em]", heavy: "h-[0.09em]" },
  strike: { hair: "h-[0.045em]", heavy: "h-[0.09em]" },
  circle: { hair: "border-2", heavy: "border-[0.07em]" },
  bracket: { hair: "border-l-2 border-r-2", heavy: "border-l-[0.07em] border-r-[0.07em]" },
};

const gestures = {
  underline: {
    wrapper: `relative inline-flex`,
    mark: `absolute -bottom-[0.08em] left-0 right-0 origin-left`,
    fill: "bg" as const,
    style: (visible: boolean) => ({ transform: visible ? "scaleX(1)" : "scaleX(0)" }),
  },
  circle: {
    wrapper: `relative inline-flex`,
    mark: `absolute w-[1.3em] h-[1.3em] -bottom-[0.15em] -left-[0.1em] rounded-full bg-transparent`,
    fill: "border" as const,
    style: (visible: boolean) => ({ clipPath: visible ? "circle(50%)" : "circle(0%)" }),
  },
  strike: {
    wrapper: `relative inline-flex`,
    mark: `absolute top-[52%] bottom-auto left-0 right-0 origin-left`,
    fill: "bg" as const,
    style: (visible: boolean) => ({ transform: visible ? "scaleX(1)" : "scaleX(0)" }),
  },
  bracket: {
    wrapper: `relative inline-flex`,
    mark: `absolute -left-1.5 -right-1.5 top-[-2px] bottom-[-2px]`,
    fill: "border" as const,
    style: (visible: boolean) => ({ scale: visible ? "1 1" : "1 0", opacity: visible ? 1 : 0 }),
  },
};

export function MarkedWord({
  word,
  gesture = "underline",
  className = "",
  animateOnLoad = false,
  delay = 0,
  tone = "accent",
  weight = "hair",
}: MarkedWordProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const g = gestures[gesture];
  const colour = g.fill === "bg" ? tones[tone].bg : tones[tone].border;

  useEffect(() => {
    if (animateOnLoad) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOnLoad, delay]);

  return (
    <span ref={ref} className={`${g.wrapper} ${className}`}>
      {word}
      <span
        aria-hidden="true"
        className={`${g.mark} ${thickness[gesture][weight]} ${colour} transition duration-[600ms] ease-out-expo motion-reduce:duration-[1ms]`}
        style={g.style(visible)}
      />
    </span>
  );
}
