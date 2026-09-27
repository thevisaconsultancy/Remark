"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { getEdge, type Edge } from "./edge";

interface LiquidSubmitProps {
  children: ReactNode;
  className?: string;
  /** Colour of the liquid. On a red button the liquid is ink so it contrasts. */
  fillClassName?: string;
}

/**
 * A full-width variant of DirectionalLiquidButton for the submit.
 * The shared button's liquid is a fixed 320px blob, which cannot cover a 600px-wide
 * button, so this copy sizes the blob to the button's diagonal and starts it just
 * outside the edge the pointer came in through.
 */
export function LiquidSubmit({ children, className = "", fillClassName = "bg-ink" }: LiquidSubmitProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const liquidRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const magnetic = useRef(false);

  // Magnetic label: the words lean toward the pointer, at most 10px across and 3px down,
  // written once per frame. Off for touch, coarse pointers and reduced motion.
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!magnetic.current) return;
    const button = buttonRef.current;
    const x = e.clientX;
    const y = e.clientY;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const label = labelRef.current;
      if (!button || !label) return;
      const r = button.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / (r.width / 2)));
      const dy = Math.max(-1, Math.min(1, (y - (r.top + r.height / 2)) / (r.height / 2)));
      label.style.transform = `translate3d(${(dx * 10).toFixed(2)}px, ${(dy * 3).toFixed(2)}px, 0)`;
    });
  };

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const outside = (edge: Edge, w: number, h: number, d: number) => {
    const off = d / 2 + 12;
    if (edge === "top") return { x: w / 2, y: -off };
    if (edge === "bottom") return { x: w / 2, y: h + off };
    if (edge === "left") return { x: -off, y: h / 2 };
    return { x: w + off, y: h / 2 };
  };

  const onEnter = (e: PointerEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    const el = liquidRef.current;
    if (!button || !el || e.pointerType === "touch") return;
    magnetic.current =
      e.pointerType === "mouse" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { width: w, height: h } = button.getBoundingClientRect();
    const d = Math.hypot(w, h) * 1.12;
    const start = outside(getEdge(button, e.clientX, e.clientY), w, h, d);
    el.style.transition = "none";
    el.style.width = `${d}px`;
    el.style.height = `${d}px`;
    el.style.transform = `translate3d(${start.x - d / 2}px, ${start.y - d / 2}px, 0) rotate(0deg)`;
    void el.offsetWidth;
    el.style.transition = "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = `translate3d(${w / 2 - d / 2}px, ${h / 2 - d / 2}px, 0) rotate(180deg)`;
  };

  const onLeave = (e: PointerEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    const el = liquidRef.current;
    if (!button || !el || e.pointerType === "touch") return;
    magnetic.current = false;
    cancelAnimationFrame(frame.current);
    if (labelRef.current) labelRef.current.style.transform = "";
    const { width: w, height: h } = button.getBoundingClientRect();
    const d = parseFloat(el.style.width) || Math.hypot(w, h) * 1.12;
    const end = outside(getEdge(button, e.clientX, e.clientY), w, h, d);
    el.style.transition = "transform 850ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = `translate3d(${end.x - d / 2}px, ${end.y - d / 2}px, 0) rotate(0deg)`;
  };

  return (
    <button
      ref={buttonRef}
      type="submit"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onPointerMove={onMove}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <span
        ref={liquidRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 -z-10 block size-0 rounded-[40%] ${fillClassName}`}
      />
      <span
        ref={labelRef}
        className="relative inline-flex items-center gap-4 transition-transform duration-500 ease-out-expo motion-reduce:transition-none"
      >
        {children}
      </span>
    </button>
  );
}
