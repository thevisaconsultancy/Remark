import type { ReactNode } from "react";
import { Seen } from "./Seen";
import { H2, type Register } from "./ui";
import s from "./work.module.css";

const TAG: Record<Register, string> = {
  void: "bg-accent text-fg",
  paper: "bg-accent text-fg",
  red: "bg-fg text-red-600",
};

const LABEL: Record<Register, string> = {
  void: "text-muted",
  paper: "text-ink-muted",
  red: "text-fg",
};

type ChapterHeadProps = {
  /** Section id; the h2 gets `${id}-title`. */
  id: string;
  /** Chapter number, e.g. "01" or "02.3". */
  num: string;
  /** What the chapter is, in plain words (read before the headline). */
  label: string;
  register: Register;
  children: ReactNode;
  className?: string;
  /** Classes for the h2 itself (e.g. a max width in ch, which must be measured at the h2's size). */
  h2ClassName?: string;
};

/**
 * A chapter's number tag, label and headline: the page's recurring story device.
 * On arrival the tag wipes open, its number ticks up into place and the label follows.
 */
export function ChapterHead({ id, num, label, register, children, className = "", h2ClassName = "" }: ChapterHeadProps) {
  return (
    <Seen className={className} threshold={0.6}>
      <p className={`flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] ${LABEL[register]}`}>
        <span className={`${s.tag} inline-grid h-7 min-w-[2.25rem] place-items-center overflow-hidden px-2 tracking-[0.08em] ${TAG[register]}`}>
          <span className={s.num}>{num}</span>
        </span>
        <span className={s.label}>{label}</span>
      </p>
      <h2 id={`${id}-title`} className={`${H2} mt-5 md:mt-7 ${h2ClassName}`}>
        {children}
      </h2>
    </Seen>
  );
}
