"use client";

import { useRef, type ReactNode } from "react";
import s from "./work.module.css";

/** Largest tilt, in degrees. Enough to feel the cursor, not enough to read as a gimmick. */
const MAX = 1.6;

/**
 * Leans a product shot very slightly toward the cursor, as if the screen were a
 * sheet on the desk. Fine pointers only, never under reduced motion; one rAF per
 * frame at most, transform only, and it eases back flat when the pointer leaves.
 */
export function ShotTilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const allowed = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || !allowed()) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (clientX - r.left) / r.width - 0.5;
      const y = (clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1800px) rotateX(${(-y * MAX).toFixed(2)}deg) rotateY(${(x * MAX).toFixed(2)}deg) translateY(-4px)`;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} className={`${s.tilt} ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
