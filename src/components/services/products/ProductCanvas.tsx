import type { CSSProperties, ReactNode } from "react";
import styles from "./products.module.css";

/**
 * A product visual drawn on a fixed w x h canvas and scaled to its
 * container's width with a pure-CSS transform (no JS, no layout shift), so
 * every visual is laid out once, in pixels, and stays crisp at any width.
 * The whole canvas is one image to assistive tech: role="img" + label.
 */
export function ProductCanvas({
  w,
  h,
  label,
  className = "",
  children,
}: {
  w: number;
  h: number;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`${styles.canvas} ${className}`}
      style={{ "--w": w, "--h": h } as CSSProperties}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
