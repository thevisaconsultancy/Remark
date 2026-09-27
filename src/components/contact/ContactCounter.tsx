"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { PHONE_PRIMARY } from "@/data/social";
import { CarbonRecord } from "./CarbonRecord";
import { CopyStub } from "./CopyStub";
import { SheetForm } from "./SheetForm";
import { formatPKT } from "./formatPKT";
import { submitLead } from "./submitLead";
import { TEAR_EDGE } from "./tearEdge";
import type { FreshInk, LeadErrors, LeadField, LeadValues, NeedOption, RecordRow } from "./types";
import styles from "./contact.module.css";

const TITLE_ID = "contact-title";
const EMAIL_SHAPE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
const REQUIRED: (keyof LeadErrors)[] = ["name", "email", "brief"];

/** Precise about what is missing, never scolding: the message says what to add. */
function emailProblem(raw: string): string | undefined {
  const email = raw.trim();
  if (!email) return "We need an email to write back to.";
  if (/\s/.test(email)) return "An email cannot contain spaces.";
  const at = email.indexOf("@");
  if (at < 0) return "Missing the @, as in name@company.com.";
  if (at === 0) return "Add the part before the @.";
  const domain = email.slice(at + 1);
  if (!domain) return "Add the part after the @, as in name@company.com.";
  if (!domain.includes(".") || domain.endsWith(".")) return "The ending looks incomplete, as in .com or .pk.";
  if (!EMAIL_SHAPE.test(email)) return "That email does not look quite right.";
  return undefined;
}

const MESSAGES = {
  name: "What should we call you?",
  brief: "A line or two about the project is enough.",
};

function validate(values: LeadValues): LeadErrors {
  const errors: LeadErrors = {};
  if (!values.name.trim()) errors.name = MESSAGES.name;
  const email = emailProblem(values.email);
  if (email) errors.email = email;
  if (!values.brief.trim()) errors.brief = MESSAGES.brief;
  return errors;
}

const FIELD_NAMES: Record<keyof LeadErrors, string> = { name: "your name", email: "your email", brief: "the brief" };
const listOf = (items: string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

// Each new file is stamped with the time it was opened. The server has no visitor clock,
// so it renders "Today" and the client fills the real PKT time in after hydration.
const fileTimes = new Map<number, string>();
const subscribeNever = () => () => {};
function useFileTime(fileNo: number): string | null {
  return useSyncExternalStore(
    subscribeNever,
    () => {
      let time = fileTimes.get(fileNo);
      if (!time) {
        time = formatPKT(new Date());
        fileTimes.set(fileNo, time);
      }
      return time;
    },
    () => null,
  );
}

// Which line of the office copy each form control writes on.
const ROW_FOR: Record<string, RecordRow> = { name: "from", email: "email", phone: "phone", needs: "for", brief: "brief" };

const media = (query: string) => typeof window !== "undefined" && window.matchMedia(query).matches;

type Filed = { at: string; values: LeadValues };

interface ContactCounterProps {
  options: NeedOption[];
  initialNeeds: string[];
}

/**
 * The counter: a duplicate order book. The visitor writes on the paper top sheet, the
 * studio's red office copy fills in beside it, and on send the sheet tears off along the
 * perforation while the copy grows to the full width and is stamped RECEIVED.
 */
export function ContactCounter({ options, initialNeeds }: ContactCounterProps) {
  const [values, setValues] = useState<LeadValues>(() => ({
    name: "",
    email: "",
    phone: "",
    needs: initialNeeds,
    brief: "",
  }));
  const [errors, setErrors] = useState<LeadErrors>({});
  const [fresh, setFresh] = useState<FreshInk | null>(null);
  // Required fields only complain after the first send; until then a blur checks shape only.
  const [attempted, setAttempted] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [active, setActive] = useState<RecordRow | null>(null);
  const [filed, setFiled] = useState<Filed | null>(null);
  const [sheetGone, setSheetGone] = useState(false);
  const [fileNo, setFileNo] = useState(0);
  const [sendFailed, setSendFailed] = useState(false);
  const fileTime = useFileTime(fileNo);

  const sectionRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const goneTimer = useRef<number | undefined>(undefined);
  const refocusForm = useRef(false);
  // One send at a time: a double click must not file the same brief twice.
  const sending = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const briefRef = useRef<HTMLTextAreaElement>(null);

  // Keyboard users get the global focus ring on the underline inputs; pointer users
  // only see the crimson underline (text inputs match :focus-visible on every focus).
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") sheet.setAttribute("data-kbd", "");
    };
    const onPointer = () => sheet.removeAttribute("data-kbd");
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("pointerdown", onPointer, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("pointerdown", onPointer, true);
      window.clearTimeout(goneTimer.current);
    };
  }, []);

  // The perforation feels the pull: as a mouse nears the send button on the wide layout, the
  // sheet eases a few pixels off the perforation and a crease shadow gathers along the tear
  // line. One CSS variable, written at most once per frame.
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const wide = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = 0;
    const set = (pull: number) => {
      if (Math.abs(pull - last) < 0.01) return;
      last = pull;
      sheet.style.setProperty("--pull", pull.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (!wide.matches || still.matches || sheet.hasAttribute("data-torn")) return;
      const x = e.clientX;
      const y = e.clientY;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const button = sheet.querySelector<HTMLElement>("button[type=submit]");
        if (!button) return;
        const r = button.getBoundingClientRect();
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        set(Math.max(0, 1 - Math.hypot(dx, dy) / 140));
      });
    };
    const onOut = () => {
      cancelAnimationFrame(frame);
      set(0);
    };
    sheet.addEventListener("pointermove", onMove);
    sheet.addEventListener("pointerleave", onOut);
    return () => {
      cancelAnimationFrame(frame);
      sheet.removeEventListener("pointermove", onMove);
      sheet.removeEventListener("pointerleave", onOut);
    };
  }, []);

  // After a send the success heading takes focus; after "Write another" the name field does.
  useEffect(() => {
    if (filed) {
      successTitleRef.current?.focus({ preventScroll: true });
      // Bring the whole counter back into view: the stamped copy and the success panel.
      const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) {
        window.scrollTo({ top: window.scrollY + top, behavior: media("(prefers-reduced-motion: reduce)") ? "auto" : "smooth" });
      }
    } else if (refocusForm.current) {
      refocusForm.current = false;
      nameRef.current?.focus({ preventScroll: true });
    }
  }, [filed]);

  // Saying the same thing twice still reaches a screen reader: the text changes by a hair.
  const announce = (message: string) => setAnnouncement((prev) => (prev === message ? `${message}\u00a0` : message));

  const setError = (field: keyof LeadErrors, message: string | undefined) =>
    setErrors((e) => {
      if (e[field] === message) return e;
      const next = { ...e };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });

  const onField = (field: LeadField, value: string) => {
    const added = value.length - values[field].length;
    setFresh(added > 0 ? { field, count: added } : null);
    setValues((v) => ({ ...v, [field]: value }));
    if (field === "phone" || !errors[field]) return;
    // A shown error updates as the visitor fixes it, and clears the moment it is right.
    if (field === "email") setError("email", emailProblem(value));
    else if (value.trim()) setError(field, undefined);
  };

  // Leaving a half-typed email says what is missing; an untouched empty field stays quiet.
  const onLeave = (field: LeadField) => {
    if (field !== "email") {
      if (field === "name" && attempted) setError("name", values.name.trim() ? undefined : MESSAGES.name);
      return;
    }
    if (!values.email.trim() && !attempted) return;
    const problem = emailProblem(values.email);
    setError("email", problem);
    if (problem && problem !== errors.email) announce(`Email: ${problem}`);
  };

  const onNeed = (slug: string, checked: boolean) => {
    setFresh(null);
    setValues((v) => ({
      ...v,
      needs: checked ? [...v.needs.filter((s) => s !== slug), slug] : v.needs.filter((s) => s !== slug),
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending.current) return;
    const found = validate(values);
    setErrors(found);
    setAttempted(true);
    const invalid = REQUIRED.filter((field) => found[field]);
    const firstInvalid = invalid[0];
    if (firstInvalid) {
      // Focus lands on the first field; the live region names everything still to do.
      announce(
        invalid.length === 1
          ? `Not sent yet. ${found[firstInvalid]}`
          : `Not sent yet. Please check ${listOf(invalid.map((f) => FIELD_NAMES[f]))}.`,
      );
      const target = { name: nameRef, email: emailRef, brief: briefRef }[firstInvalid];
      target.current?.focus();
      return;
    }

    const lead = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      needs: values.needs,
      brief: values.brief.trim(),
    };
    sending.current = true;
    setSendFailed(false);
    try {
      await submitLead(lead);
    } catch {
      // Nothing is filed and nothing is cleared: the visitor can send again or call.
      setSendFailed(true);
      return;
    } finally {
      sending.current = false;
    }

    setFresh(null);
    setActive(null);
    setFiled({ at: formatPKT(new Date()), values });
    // Once the tear (or the mobile crossfade) has played, the sheet leaves the layout.
    const delay = media("(prefers-reduced-motion: reduce)") ? 0 : media("(min-width: 1024px)") ? 820 : 280;
    window.clearTimeout(goneTimer.current);
    goneTimer.current = window.setTimeout(() => setSheetGone(true), delay);
  };

  const writeAnother = () => {
    window.clearTimeout(goneTimer.current);
    refocusForm.current = true;
    setValues({ name: "", email: "", phone: "", needs: [], brief: "" });
    setErrors({});
    setAttempted(false);
    setAnnouncement("");
    setFresh(null);
    setSheetGone(false);
    setFiled(null);
    setFileNo((n) => n + 1);
  };

  const labelsFor = (needs: string[]) => options.filter((o) => needs.includes(o.slug)).map((o) => o.label);
  const torn = filed !== null;

  const stub = filed
    ? {
        name: filed.values.name.trim(),
        reach: [filed.values.email.trim(), filed.values.phone.trim()].filter(Boolean).join(" / "),
        needs: labelsFor(filed.values.needs).join(", "),
        brief: (() => {
          const text = filed.values.brief.replace(/\s+/g, " ").trim();
          return text.length > 240 ? `${text.slice(0, 240).trimEnd()}…` : text;
        })(),
      }
    : null;

  return (
    <section ref={sectionRef} id="brief" aria-labelledby={TITLE_ID} className="relative bg-paper-warm pt-20 lg:min-h-[100svh] lg:pt-28">
      <div className="relative overflow-x-clip lg:grid lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
        {/* The office copy's growth layer: sits behind both leaves, scales to full width on send. */}
        <div
          aria-hidden="true"
          data-on={torn || undefined}
          className={`${styles.grow} absolute inset-0 hidden bg-accent lg:block`}
        />

        <div className="relative z-10 flex min-w-0 flex-col">
          <CarbonRecord
            titleId={TITLE_ID}
            values={filed ? filed.values : values}
            needLabels={labelsFor(filed ? filed.values.needs : values.needs)}
            fresh={fresh}
            sheetNo={fileNo + 1}
            fileTime={fileTime}
            filedAt={filed?.at ?? null}
            active={filed ? null : active}
          />
        </div>

        <div className="relative z-10 grid min-w-0 grid-cols-[minmax(0,1fr)]">
          <div
            ref={sheetRef}
            data-torn={torn || undefined}
            data-gone={(torn && sheetGone) || undefined}
            inert={torn}
            style={{ "--tear": TEAR_EDGE } as CSSProperties}
            className={`${styles.sheet} bg-paper-warm [grid-area:1/1] ${sheetGone ? "max-lg:hidden" : ""}`}
          >
            <div className="px-4 pb-16 pt-9 sm:px-6 md:px-[max(1.5rem,6vw)] lg:pb-12 lg:pl-12 lg:pt-14 xl:pl-20">
              <div className="max-w-[44rem]">
                <SheetForm
                  labelledBy={TITLE_ID}
                  values={values}
                  errors={errors}
                  sendFailed={sendFailed}
                  options={options}
                  nameRef={nameRef}
                  emailRef={emailRef}
                  briefRef={briefRef}
                  onField={onField}
                  onLeave={onLeave}
                  onNeed={onNeed}
                  onSubmit={onSubmit}
                  onPen={(control) => setActive(control ? (ROW_FOR[control] ?? null) : null)}
                />
              </div>
            </div>
          </div>

          {filed && stub ? (
            <div
              className={`${styles.success} self-start px-4 pb-16 pt-9 [grid-area:1/1] sm:px-6 md:px-[max(1.5rem,6vw)] lg:pb-12 lg:pl-12 lg:pt-14 xl:pl-20`}
            >
              <div className="max-w-[40rem]">
                <h2
                  ref={successTitleRef}
                  tabIndex={-1}
                  className="font-normal text-[clamp(2.25rem,4vw,3.75rem)] leading-[1] text-ink [overflow-wrap:anywhere] focus:outline-none lg:text-fg"
                >
                  Filed. Thank you, {filed.values.name.trim().split(/\s+/)[0]}.
                </h2>
                <p className="mt-5 max-w-[38ch] font-ui text-[17px] leading-relaxed text-ink-muted lg:text-fg">
                  Your brief is on our copy. Yours is below, to keep.
                </p>

                {/* What happens next: plain steps, no promised times. */}
                {/* The global heading face would override a class on the h3 itself, so the mono sits on a span. */}
                <h3 id="next-steps" className="mt-8 text-[11px] font-normal uppercase tracking-[0.2em] text-ink-muted lg:text-red-100">
                  <span className="font-mono">What happens next</span>
                </h3>
                <ol aria-labelledby="next-steps" className="mt-3 max-w-[34rem] font-ui text-[16px] leading-snug text-ink lg:text-fg">
                  {[
                    <>Someone at the studio reads it.</>,
                    <>
                      We write back to <span className="font-semibold [overflow-wrap:anywhere]">{filed.values.email.trim()}</span>
                      {filed.values.phone.trim() ? ", or call if that is easier" : ""}.
                    </>,
                    <>
                      Cannot wait? Call{" "}
                      <a
                        href={PHONE_PRIMARY.href}
                        className="whitespace-nowrap font-semibold underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:focus-visible:outline-fg"
                      >
                        {PHONE_PRIMARY.display}
                      </a>
                      .
                    </>,
                  ].map((step, i) => (
                    <li
                      key={i}
                      style={{ "--i": i } as CSSProperties}
                      className={`${styles.step} grid grid-cols-[3ch_minmax(0,1fr)] gap-x-3 border-t border-ink/15 py-3 lg:border-fg/25`}
                    >
                      <span aria-hidden="true" className="pt-[0.2em] font-mono text-[12px] tabular-nums text-ink-muted lg:text-red-100">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-9">
                  <CopyStub {...stub} />
                </div>

                <div className="mt-9 flex flex-col items-start gap-3">
                  {/* The arrow stays glued to the last word when the line wraps. */}
                  <Link
                    href="/work#leads"
                    className="group inline-block max-w-[36rem] py-2.5 font-ui text-[16px] font-medium leading-snug text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:text-fg lg:decoration-fg/40 lg:focus-visible:outline-fg"
                  >
                    This is the same lead flow we built into a visa consultancy{" "}
                    <span className="whitespace-nowrap">
                      CRM
                      <FiArrowRight
                        aria-hidden="true"
                        className="ml-2.5 inline-block size-4 align-[-0.15em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={writeAnother}
                    className="inline-flex min-h-11 items-center font-ui text-[15px] text-ink-muted underline decoration-current/40 underline-offset-4 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:text-red-100 lg:hover:text-fg lg:focus-visible:outline-fg"
                  >
                    Write another
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {filed ? "Brief filed." : announcement}
      </p>
    </section>
  );
}
