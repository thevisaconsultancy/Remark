"use client";

import { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import styles from "./contact.module.css";

interface CopyButtonProps {
  value: string;
  label: string;
  /** Called after a successful copy so the section's shared live region can announce it. */
  onCopied: () => void;
  className?: string;
}

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers and insecure contexts: fall back to a hidden selection.
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

/** A 44px copy control: the icon tips into a drawn check and a mono "Copied" rises for 1.6s. */
export function CopyButton({ value, label, onCopied, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    if (!(await writeClipboard(value))) return;
    setCopied(true);
    onCopied();
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span data-copied={copied || undefined} className={`relative inline-flex shrink-0 items-center ${className}`}>
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className="relative inline-flex size-11 items-center justify-center rounded-full text-fg/70 transition-colors duration-200 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        <FiCopy aria-hidden="true" className={`${styles.copyIcon} size-[18px]`} />
        <FiCheck aria-hidden="true" className={`${styles.checkIcon} size-[18px] text-fg`} />
      </button>
      <span
        aria-hidden="true"
        className={`${styles.copiedTag} pointer-events-none absolute bottom-[calc(100%-2px)] left-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-fg/80`}
      >
        Copied
      </span>
    </span>
  );
}
