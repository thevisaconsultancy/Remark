"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Variant = "rise" | "plate";

const VARIANTS: Record<Variant, string> = {
  rise: "data-[reveal=armed]:translate-y-5 data-[reveal=armed]:opacity-0",
  plate: "data-[reveal=armed]:scale-[1.035] data-[reveal=armed]:opacity-0",
};

/**
 * Reveals its children once, as they scroll into view: opacity and transform
 * only. Content is visible by default (server render, no JS, reduced motion,
 * or already on screen at mount); it is only hidden ("armed") when it is
 * genuinely below the fold and motion is allowed.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger step (×90 ms). */
  delay?: number;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    let armed = true;
    // Arm on the next frame so the hidden state never paints over visible content.
    const raf = requestAnimationFrame(() => armed && setState("armed"));
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          armed = false;
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      armed = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      style={{ "--reveal-delay": `${delay * 90}ms` } as CSSProperties}
      className={`transition-[opacity,translate,scale] duration-[1000ms] ease-out-expo data-[reveal=shown]:delay-(--reveal-delay) motion-reduce:transition-none ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
