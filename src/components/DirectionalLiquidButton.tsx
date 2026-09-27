"use client";

import { useRef, type AriaAttributes, type CSSProperties, type MouseEvent, type MouseEventHandler, type ReactNode } from "react";

type DirectionalLiquidButtonProps = AriaAttributes & {
  href?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Render as a link (default) or a native button. */
  as?: "a" | "button";
  /** Native button type (only used with as="button"). Defaults to "button". */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  /** Colour of the liquid fill. Filled red buttons pass "bg-ink" so the liquid contrasts. */
  fillClassName?: string;
  id?: string;
};

export function DirectionalLiquidButton({
  href,
  className,
  style,
  children,
  onClick,
  as = "a",
  type = "button",
  disabled,
  fillClassName = "bg-accent",
  id,
  ...aria
}: DirectionalLiquidButtonProps) {
  const buttonRef = useRef<HTMLElement | null>(null);
  const liquidRef = useRef<HTMLSpanElement>(null);

  const getEdge = (e: MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return "bottom";
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const top = y;
    const bottom = rect.height - y;
    const left = x;
    const right = rect.width - x;

    const min = Math.min(top, bottom, left, right);
    if (min === top) return "top";
    if (min === bottom) return "bottom";
    if (min === left) return "left";
    return "right";
  };

  const getStartPositions = (edge: string) => {
    if (edge === "top") return { top: "-220px", left: "50%" };
    if (edge === "bottom") return { top: "calc(100% + 220px)", left: "50%" };
    if (edge === "left") return { top: "50%", left: "-220px" };
    return { top: "50%", left: "calc(100% + 220px)" };
  };

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (!liquidRef.current || disabled) return;
    const edge = getEdge(e);
    const startPos = getStartPositions(edge);

    const el = liquidRef.current;
    el.style.transition = "none";
    el.style.top = startPos.top;
    el.style.left = startPos.left;

    // Force browser reflow to lock start position
    void el.offsetWidth;

    // Slow, silky smooth, luxury liquid entrance (1000ms with ultra-smooth cubic-bezier curve)
    el.style.transition = "all 1000ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%, -50%) rotate(180deg)";
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    if (!liquidRef.current) return;
    const edge = getEdge(e);
    const exitPos = getStartPositions(edge);

    // Slow, gentle liquid exit (850ms)
    const el = liquidRef.current;
    el.style.transition = "all 850ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.top = exitPos.top;
    el.style.left = exitPos.left;
    el.style.transform = "translate(-50%, -50%) rotate(0deg)";
  };

  // A <button> may only hold phrasing content, so its label wrapper is a span.
  const Wrapper = as === "button" ? "span" : "div";

  const inner = (
    <>
      {/* Heavy Foreground Red Liquid Wave */}
      <span
        ref={liquidRef}
        className={`pointer-events-none absolute z-0 block h-80 w-80 rounded-[40%] ${fillClassName}`}
        style={{
          top: "calc(100% + 220px)",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(0deg)",
        }}
      />
      <Wrapper className="relative z-10 inline-flex items-center gap-4 md:gap-5">
        {children}
      </Wrapper>
    </>
  );

  const shared = {
    id,
    onClick,
    className: `group relative overflow-hidden transition-colors duration-700 hover:border-transparent ${className}`,
    style,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...aria,
  };

  if (as === "button") {
    return (
      <button
        ref={(node) => { buttonRef.current = node; }}
        type={type}
        disabled={disabled}
        {...shared}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      ref={(node) => { buttonRef.current = node; }}
      href={href}
      aria-disabled={disabled || aria["aria-disabled"] || undefined}
      {...shared}
    >
      {inner}
    </a>
  );
}
