"use client";

import styles from "./contact.module.css";

interface TickBoxProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
}

/**
 * A real checkbox, drawn as a 22px square that takes a crimson pen tick when checked.
 * The tick is one stroke: a short press down, then the long flick up that overshoots the
 * box, the way a hand ticks a form. stroke-dashoffset only; unticking lifts it faster.
 */
export function TickBox({ name, value, label, checked, onChange }: TickBoxProps) {
  return (
    <label className={`${styles.tick} group relative flex min-h-11 cursor-pointer items-center gap-3.5 py-1.5`}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(value, e.target.checked)}
        className="peer absolute left-0 top-1/2 m-0 size-[22px] -translate-y-1/2 cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        className={`${styles.box} relative size-[22px] shrink-0 border-[1.5px] border-ink transition-colors duration-150 group-hover:border-accent`}
      >
        <svg viewBox="0 0 22 22" className="absolute -inset-[5px] size-[32px] overflow-visible" fill="none">
          <path
            className={styles.stroke}
            d="M3.6 11.8c1.6 1.4 3.1 3.2 4.4 5.6.3.5.9.5 1.2 0C12.2 11.6 16 6.4 21.4 1.2"
            pathLength={40}
            stroke="var(--color-red-500, #b91319)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-ui text-[16px] leading-snug text-ink">{label}</span>
    </label>
  );
}
