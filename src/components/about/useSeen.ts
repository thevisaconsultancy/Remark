"use client";

import { useEffect, useRef, useState } from "react";

/** True once the element has been on screen. Fires at once when observers are unavailable. */
export function useSeen<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  // Without IntersectionObserver there is nothing to wait for, so start out seen.
  const [seen, setSeen] = useState(() => typeof window !== "undefined" && typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}
