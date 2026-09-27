"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ReactNode } from "react";
import { FiArrowRight, FiArrowUp, FiArrowUpRight } from "react-icons/fi";
import { DirectionalLiquidButton } from "./DirectionalLiquidButton";
import { SERVICES } from "@/data/services";
import { WEBSITES } from "@/data/projects";
import { ADDRESS, EMAIL, MAPS_URL, PHONE_PRIMARY, PHONE_SECONDARY, SOCIALS } from "@/data/social";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** One focus treatment for every footer control: a solid red-300 ring, clear on void. */
const FOCUS =
  "rounded-[2px] outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-red-300";
const LINK = `font-ui text-[15px] leading-snug text-muted transition-colors duration-200 hover:text-fg ${FOCUS}`;
/** Only sites with a live URL are linked; client name falls back to the project name. */
const SITES = WEBSITES.flatMap((w) =>
  w.url ? [{ slug: w.slug, url: w.url, name: w.client ?? w.name, host: new URL(w.url).hostname.replace(/^www\./, "") }] : [],
);
/** globals.css sets h1–h6 to the display face outside any layer, which beats utilities; labels restate mono inline. */
const MONO = { fontFamily: "var(--font-mono), monospace" } as const;
const LABEL = "font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-subtle";

/**
 * Year for the copyright line. The server snapshot is a fixed fallback so the
 * hydrated HTML always matches; the client's real year replaces it right after.
 */
const FALLBACK_YEAR = 2026;
const noopSubscribe = () => () => {};
function useYear() {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => FALLBACK_YEAR,
  );
}

function Column({ id, title, children, className = "" }: { id: string; title: string; children: ReactNode; className?: string }) {
  return (
    <nav aria-labelledby={id} className={className}>
      <h2 id={id} className={`${LABEL} mb-6`} style={MONO}>
        {title}
      </h2>
      {children}
    </nav>
  );
}

function External({ href, children, className = LINK }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-baseline gap-1.5 ${className}`}>
      {children}
      <FiArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 self-center text-subtle transition-[color,transform] duration-200 group-hover:text-red-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const year = useYear();
  // Contact and About already close on their own "start a project" invitation.
  const hasOwnInvite = pathname === "/contact" || pathname === "/about";

  const backToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    // Return keyboard focus to the top of the document along with the view.
    const main = document.getElementById("main-content");
    if (main) {
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  };

  return (
    <footer className="relative w-full border-t border-border-subtle bg-void text-fg">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12">
        {/* Closing line (skipped where the page already ends on the invitation) */}
        {!hasOwnInvite && (
          <div className="flex flex-col gap-10 pb-16 pt-24 md:pb-20 md:pt-32 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-cranio max-w-[14ch] text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.98] text-fg">
              Have something to build?
            </h2>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <DirectionalLiquidButton
                href="/contact"
                fillClassName="bg-ink"
                className="inline-flex items-center rounded-full bg-accent px-8 py-4 font-ui text-[13px] font-semibold uppercase tracking-[0.16em] text-fg outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-red-300"
              >
                <span>Start a project</span>
                <FiArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-500 motion-safe:group-hover:translate-x-1"
                />
              </DirectionalLiquidButton>
              <a
                href={`mailto:${EMAIL}`}
                className={`font-ui text-[17px] text-fg underline decoration-white/25 underline-offset-[6px] transition-colors duration-200 hover:decoration-red-300 ${FOCUS}`}
              >
                {EMAIL}
              </a>
            </div>
          </div>
        )}

        {/* Index */}
        <div className={`grid grid-cols-2 gap-x-6 gap-y-14 py-16 ${hasOwnInvite ? "" : "border-t border-border"} md:grid-cols-4 md:py-20 lg:grid-cols-12 lg:gap-x-8`}>
          <Column id="footer-studio" title="Studio" className="lg:col-span-2">
            <ul className="space-y-3.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={LINK} aria-current={pathname === l.href ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column id="footer-services" title="Services" className="lg:col-span-3">
            <ul className="space-y-3.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className={LINK}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Column>

          <Column id="footer-sites" title="Live sites" className="col-span-2 md:col-span-1 lg:col-span-3">
            <ul className="space-y-5">
              {SITES.map((w) => (
                <li key={w.slug}>
                  <External href={w.url}>{w.name}</External>
                  <p className="mt-1 font-mono text-[11px] tracking-[0.04em] text-subtle">
                    {w.host}
                  </p>
                </li>
              ))}
            </ul>
          </Column>

          <section aria-labelledby="footer-contact" className="col-span-2 md:col-span-1 lg:col-span-4">
            <h2 id="footer-contact" className={`${LABEL} mb-6`} style={MONO}>
              Contact
            </h2>
            <ul className="space-y-3.5">
              <li>
                <a href={PHONE_PRIMARY.href} className={LINK}>
                  {PHONE_PRIMARY.display}
                </a>
              </li>
              <li>
                <a href={PHONE_SECONDARY.href} className={LINK}>
                  {PHONE_SECONDARY.display}
                </a>
              </li>
            </ul>
            <address className="mt-6 font-ui text-[15px] not-italic leading-relaxed text-muted">
              {ADDRESS.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-3">
              <External href={MAPS_URL} className={`${LINK} text-fg`}>
                Open in Maps
              </External>
            </div>
          </section>
        </div>

        {/* Wordmark */}
        <div className="pt-8 md:pt-12">
          <Link href="/" aria-label="Remark Studio, home" className={`block ${FOCUS}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rs logo.png"
              alt=""
              width={11122}
              height={2931}
              loading="lazy"
              decoding="async"
              className="h-auto w-full select-none"
            />
          </Link>
        </div>

        {/* Base line */}
        <div className="mt-14 flex flex-col gap-6 border-t border-border py-8 md:mt-20 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            © {year} Remark Studio · Islamabad
          </p>
          <nav aria-label="Social" className="md:order-none">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`font-ui text-[14px] text-muted transition-colors duration-200 hover:text-fg ${FOCUS}`}>
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={backToTop}
            className={`group inline-flex w-max items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-red-300 transition-colors duration-200 hover:text-fg ${FOCUS}`}
          >
            <FiArrowUp aria-hidden="true" className="size-3.5 transition-transform duration-200 motion-safe:group-hover:-translate-y-0.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
