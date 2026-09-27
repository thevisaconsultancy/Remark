"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type PointerEvent } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { MarkedWord } from "@/components/MarkedWord";
import { ADDRESS, EMAIL, MAPS_URL, PHONE_PRIMARY, PHONE_SECONDARY, SOCIALS, WHATSAPP } from "@/data/social";
import { CopyButton } from "./CopyButton";
import { getEdge, type Edge } from "./edge";
import styles from "./contact.module.css";

// The red duplicate of the number is revealed by an inset clip that starts collapsed on one edge.
const COLLAPSED: Record<Edge, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  top: "inset(0 0 100% 0)",
  bottom: "inset(100% 0 0 0)",
};
const WIPE = "clip-path 400ms var(--ease-out-expo, cubic-bezier(0.19, 1, 0.22, 1))";
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The detail visitors miss when they arrive at Embassy Gardens.
const EMPHASIS = "Mezzanine Floor";
function AddressLine({ line }: { line: string }) {
  const at = line.indexOf(EMPHASIS);
  if (at < 0) return <>{line}</>;
  return (
    <>
      {line.slice(0, at)}
      <span className="font-semibold text-fg">{EMPHASIS}</span>
      {line.slice(at + EMPHASIS.length)}
    </>
  );
}

/**
 * The number, set as reels. Each digit sits in its own clipped slot with two lead-in
 * digits stacked above it; the reel turns once when the number first scrolls into view.
 * Server markup is the finished number, so nothing is hidden without JavaScript.
 */
function Reels({ text }: { text: string }) {
  let digit = 0;
  return (
    <>
      {Array.from(text).map((char, i) => {
        if (char === " ") return " ";
        const n = Number(char);
        const isDigit = !Number.isNaN(n);
        const order = digit++;
        // The two lead-in digits live in ::before/::after content, so they are never
        // selected, copied or read out: the DOM text is exactly the number.
        return (
          <span key={i} className={styles.slot}>
            <span
              className={styles.reel}
              data-a={isDigit ? (n + 9) % 10 : undefined}
              data-b={isDigit ? (n + 8) % 10 : undefined}
              style={{ "--i": order } as CSSProperties}
            >
              {char}
            </span>
          </span>
        );
      })}
    </>
  );
}

const caption = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted";

const lineLink =
  "inline-block min-w-0 py-2.5 font-cranio text-[clamp(1.5rem,3.5vw,3rem)] font-normal leading-[1.1] text-fg transition-colors duration-300 [overflow-wrap:anywhere] hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg max-[359px]:text-[1.375rem]";

/** Section 2: one giant clickable line, the studio number, with the other ways in beneath it. */
export function DirectLine() {
  const numberRef = useRef<HTMLAnchorElement>(null);
  const wipeRef = useRef<HTMLSpanElement>(null);
  const [announcement, setAnnouncement] = useState("");
  const announceTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(announceTimer.current), []);

  // Arm the reels only while the number is still below the fold, then turn them once on view.
  useEffect(() => {
    const el = numberRef.current;
    if (!el || reducedMotion() || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.dataset.roll = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.roll = "in";
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onCopied = () => {
    setAnnouncement("Copied");
    window.clearTimeout(announceTimer.current);
    announceTimer.current = window.setTimeout(() => setAnnouncement(""), 1600);
  };

  const reveal = (edge: Edge) => {
    const el = wipeRef.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.transition = "none";
      el.style.clipPath = "inset(0 0 0 0)";
      return;
    }
    el.style.transition = "none";
    el.style.clipPath = COLLAPSED[edge];
    void el.offsetWidth;
    el.style.transition = WIPE;
    el.style.clipPath = "inset(0 0 0 0)";
  };

  const conceal = (edge: Edge) => {
    const el = wipeRef.current;
    if (!el) return;
    el.style.transition = reducedMotion() ? "none" : WIPE;
    el.style.clipPath = COLLAPSED[edge];
  };

  // Touch has no hover: a tap simply calls. The action never waits for the animation.
  const onPointerEnter = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch" || !numberRef.current) return;
    reveal(getEdge(numberRef.current, e.clientX, e.clientY));
  };
  const onPointerLeave = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch" || !numberRef.current) return;
    if (document.activeElement === numberRef.current && numberRef.current.matches(":focus-visible")) return;
    conceal(getEdge(numberRef.current, e.clientX, e.clientY));
  };
  const onFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.matches(":focus-visible")) reveal("left");
  };
  const onBlur = (e: FocusEvent<HTMLAnchorElement>) => {
    if (!e.currentTarget.matches(":hover")) conceal("right");
  };

  const lines = [
    { key: "phone", caption: "Second line", href: PHONE_SECONDARY.href, text: PHONE_SECONDARY.display, copy: PHONE_SECONDARY.display, label: "Copy second phone number" },
    { key: "email", caption: "Email", href: `mailto:${EMAIL}`, text: EMAIL, copy: EMAIL, label: "Copy email address" },
    ...(WHATSAPP
      ? [{ key: "whatsapp", caption: "WhatsApp", href: WHATSAPP.href, text: WHATSAPP.display, copy: WHATSAPP.display, label: "Copy WhatsApp number" }]
      : []),
  ];

  return (
    <section
      id="direct"
      aria-labelledby="direct-title"
      className="relative bg-void px-4 pb-16 pt-24 text-fg sm:px-6 md:px-[max(1.5rem,6vw)] md:pt-32 lg:pt-40"
    >
      <h2 id="direct-title" className="font-normal text-[clamp(2rem,4vw,3.5rem)] leading-none text-fg">
        Rather <MarkedWord word="talk" gesture="underline" />?
      </h2>

      <p className={`${caption} mt-10 md:mt-14`}>Studio line</p>
      <div className={`${styles.numberRow} flex flex-wrap items-center gap-x-3 md:gap-x-4`}>
        <a
          ref={numberRef}
          href={PHONE_PRIMARY.href}
          aria-label={`Call ${PHONE_PRIMARY.display}`}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`${styles.number} ${styles.roll} relative -mx-1 inline-block whitespace-nowrap px-1 py-1 font-cranio font-normal leading-[1.1] text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg`}
        >
          <span>
            <Reels text={PHONE_PRIMARY.display} />
          </span>
          <span
            ref={wipeRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 px-1 py-1 text-accent"
            style={{ clipPath: COLLAPSED.left }}
          >
            {PHONE_PRIMARY.display}
          </span>
        </a>
        {/* Below 360px a tap on the number calls; the copy control would only wrap onto its own line. */}
        <CopyButton value={PHONE_PRIMARY.display} label="Copy phone number" onCopied={onCopied} className="max-[359px]:hidden" />
      </div>

      <ul className="mt-6 flex flex-col gap-y-4 md:mt-10 md:flex-row md:flex-wrap md:items-end md:gap-x-14 lg:gap-x-20">
        {lines.map((line) => (
          <li key={line.key} className="min-w-0">
            <p className={caption}>{line.caption}</p>
            <div className="flex min-w-0 items-center gap-x-2">
            <a
              href={line.href}
              target={line.key === "whatsapp" ? "_blank" : undefined}
              rel={line.key === "whatsapp" ? "noopener noreferrer" : undefined}
              className={lineLink}
            >
              {line.text}
            </a>
            <CopyButton value={line.copy} label={line.label} onCopied={onCopied} />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-16 grid gap-10 border-t border-fg/10 pt-10 md:mt-24 md:grid-cols-[auto_minmax(0,1fr)] md:gap-16 md:pt-12">
        <address className="font-ui text-[17px] not-italic leading-relaxed text-fg/85">
          {ADDRESS.lines.map((line) => (
            <span key={line} className="block">
              <AddressLine line={line} />
            </span>
          ))}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex min-h-11 items-center gap-2 font-medium text-fg underline decoration-fg/30 underline-offset-4 transition-colors hover:decoration-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
          >
            Open in Maps
            <FiArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </address>

        {/* Each link is padded out to a 44px target and pulled back by the same margin, so the words keep their spacing. */}
        <ul aria-label="Remark Studio elsewhere" className="flex flex-wrap content-start gap-x-8 gap-y-1 font-ui text-[17px] md:justify-end">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="-mx-2.5 inline-flex min-h-11 min-w-11 items-center justify-center px-2.5 text-fg/80 transition-colors duration-200 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </section>
  );
}
