import { FiArrowDown, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import styles from "./about.module.css";

const ICONS = { right: FiArrowRight, "up-right": FiArrowUpRight, down: FiArrowDown } as const;

/**
 * A link arrow. On hover or keyboard focus of the enclosing link it slides out in the
 * direction it points while a twin slides in behind it.
 */
export function Arrow({ dir = "right", className = "h-4 w-4" }: { dir?: keyof typeof ICONS; className?: string }) {
  const Icon = ICONS[dir];
  return (
    <span aria-hidden="true" data-dir={dir} className={`${styles.arrow} ${className}`}>
      <Icon className="h-full w-full" />
      <Icon className="h-full w-full" />
    </span>
  );
}
