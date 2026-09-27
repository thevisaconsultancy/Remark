"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Tag = "div" | "ul" | "ol" | "span" | "p";

// One observer per threshold for the whole page: every Seen element shares it.
const observers = new Map<number, IntersectionObserver>();

function observerFor(threshold: number) {
  let io = observers.get(threshold);
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.seen = "true";
          io!.unobserve(e.target);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observers.set(threshold, io);
  }
  return io;
}

type SeenProps = {
  as?: Tag;
  /** Share of the element that must be on screen before it plays. */
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

/**
 * Marks its element `data-seen="true"` the first time it scrolls into view, so CSS
 * can play a one-off entrance on it and its children. Server HTML carries no
 * attribute, so without JS (or with reduced motion, handled in CSS) everything is
 * simply shown in its final state. Anything already on screen (or above it) at
 * hydration is left as it is rather than hidden and replayed.
 */
export function Seen({ as = "div", threshold = 0.3, className, style, children, ...rest }: SeenProps) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // Only something still below the fold waits for its entrance. Anything on
    // screen, or already scrolled past by the time the page hydrated, stays as it is.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.seen = "false";
    const io = observerFor(threshold);
    io.observe(el);
    return () => io.unobserve(el);
  }, [threshold]);

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
