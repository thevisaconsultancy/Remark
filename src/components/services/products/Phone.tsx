import type { ReactNode } from "react";
import styles from "./products.module.css";

/** A generic phone: bezel, island, status bar. Position and size come from the caller. */
export function Phone({
  className = "",
  screenClassName = "",
  dark = false,
  children,
}: {
  className?: string;
  screenClassName?: string;
  /** Light status-bar glyphs for a dark screen. */
  dark?: boolean;
  children: ReactNode;
}) {
  const ink = dark ? "bg-fg" : "bg-ink";
  return (
    <div className={`${styles.device} absolute rounded-[58px] bg-[#1b1715] p-[12px] ${className}`}>
      <div className={`relative flex h-full flex-col overflow-hidden rounded-[46px] ${screenClassName}`}>
        <span className="absolute left-1/2 top-[12px] z-10 h-[30px] w-[108px] -translate-x-1/2 rounded-full bg-[#0c0a09]" />
        <div
          className={`flex h-[54px] shrink-0 items-center justify-between px-[34px] pt-[6px] text-[15px] font-semibold ${
            dark ? "text-fg" : "text-ink"
          }`}
        >
          <span>9:41</span>
          <span className="flex items-center gap-[5px]">
            <span className="flex items-end gap-[2px]">
              {[5, 7, 9, 11].map((hgt) => (
                <span key={hgt} className={`w-[3px] rounded-[1px] ${ink}`} style={{ height: hgt }} />
              ))}
            </span>
            <span className={`ml-[3px] h-[11px] w-[22px] rounded-[3px] p-[1.5px] ring-1 ${dark ? "ring-fg/50" : "ring-ink/50"}`}>
              <span className={`block h-full w-[70%] rounded-[1.5px] ${ink}`} />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
