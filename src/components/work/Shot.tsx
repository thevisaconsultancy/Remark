import type { ReactNode } from "react";
import { Seen } from "./Seen";
import { ShotTilt } from "./ShotTilt";
import s from "./work.module.css";

/**
 * How every product shot enters: it settles up into place as it scrolls in
 * (scroll-driven), its small in-shot details play once when it is properly on
 * screen (Seen), and it leans a touch toward a mouse cursor (ShotTilt).
 */
export function Shot({ children, className = "", tilt = true }: { children: ReactNode; className?: string; tilt?: boolean }) {
  return (
    <div className={`${s.reveal} ${className}`}>
      <Seen threshold={0.3}>{tilt ? <ShotTilt>{children}</ShotTilt> : children}</Seen>
    </div>
  );
}
