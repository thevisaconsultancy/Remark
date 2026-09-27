import Link from "next/link";
import type { CSSProperties } from "react";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { CRM_MODULE_LINKS, SERVICES, contactHref, type Service } from "@/data/services";
import { PRODUCT_VISUALS } from "./products";
import { Reveal } from "./Reveal";
import styles from "./services.module.css";

type Tone = "paper" | "void" | "red";
/**
 * stage: statement above, product across the full measure, spec below.
 * split: product and spec side by side (the side alternates).
 * cinema: product at near full bleed, spec set as a colophon beneath.
 */
type Layout = "stage" | "split-right" | "split-left" | "cinema";

/** Register and composition per plate. Registers alternate down the page. */
const PLATES: Record<
  string,
  {
    tone: Tone;
    layout: Layout;
    backdrop?: "right" | "left";
    /** Below md, draw the canvas this many times wider and show its left part, so wide products stay legible. */
    crop?: number;
  }
> = {
  "web-development": { tone: "paper", layout: "stage", backdrop: "right" },
  "ai-voice-agents": { tone: "void", layout: "split-right" },
  chatbots: { tone: "red", layout: "split-left" },
  "crm-erp": { tone: "paper", layout: "stage", backdrop: "left", crop: 1.7 },
  "brand-identity": { tone: "void", layout: "cinema", crop: 1.45 },
  "digital-marketing": { tone: "paper", layout: "split-right" },
  "creative-production": { tone: "void", layout: "cinema", crop: 1.6 },
};

const FOCUS = "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4";

const TONES: Record<
  Tone,
  { section: string; muted: string; rule: string; cta: string; fill: string; link: string; backdrop: string }
> = {
  paper: {
    section: "bg-paper-warm text-ink",
    muted: "text-ink-muted",
    rule: "border-ink/15",
    cta: `bg-accent text-fg hover:bg-accent-bright focus-visible:outline-ink`,
    fill: "bg-accent",
    link: "decoration-ink/30 hover:decoration-ink focus-visible:outline-ink",
    backdrop: "bg-accent",
  },
  void: {
    section: "bg-void text-fg",
    muted: "text-muted",
    rule: "border-fg/15",
    cta: `bg-accent text-fg hover:bg-accent-bright focus-visible:outline-fg`,
    fill: "bg-accent",
    link: "decoration-fg/35 hover:decoration-fg focus-visible:outline-fg",
    backdrop: "bg-red-950",
  },
  red: {
    section: "bg-accent text-fg",
    muted: "text-red-100",
    rule: "border-fg/25",
    cta: `bg-ink text-fg hover:bg-red-950 focus-visible:outline-fg`,
    fill: "bg-ink",
    link: "decoration-fg/45 hover:decoration-fg focus-visible:outline-fg",
    backdrop: "bg-red-600",
  },
};

function Heading({ service, index, tone }: { service: Service; index: number; tone: Tone }) {
  const t = TONES[tone];
  return (
    <div className="min-w-0">
      <p className={`font-mono text-[12px] uppercase tracking-[0.2em] ${t.muted}`}>
        <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden="true"> / 07</span>
        <span className="mx-3" aria-hidden="true">
          ·
        </span>
        {service.name}
      </p>
      <h3
        id={`${service.slug}-title`}
        className="mt-4 max-w-[16ch] text-[clamp(2.25rem,4.4vw,4.25rem)] font-normal leading-[1.02] [overflow-wrap:anywhere]"
      >
        <span className="sr-only">{service.name}: </span>
        {service.product.noun}.
      </h3>
    </div>
  );
}

function Spec({
  service,
  tone,
  spread = false,
  className = "",
}: {
  service: Service;
  tone: Tone;
  /** lg: line, covers and actions side by side, each under its own rule. */
  spread?: boolean;
  className?: string;
}) {
  const t = TONES[tone];
  const col = spread ? `lg:border-t lg:pt-5 ${t.rule}` : "";
  return (
    <div
      className={`flex min-w-0 flex-col gap-6 ${
        spread ? "lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] lg:items-start lg:gap-x-8" : ""
      } ${className}`}
    >
      <p className={`max-w-[44ch] text-pretty font-ui text-[17px] leading-relaxed md:text-[18px] ${col}`}>
        {service.product.line}
      </p>

      <div className={`border-t pt-5 ${t.rule}`}>
        <p className={`font-mono text-[11px] uppercase tracking-[0.2em] ${t.muted}`}>Covers</p>
        <ul className="mt-2 flex flex-wrap gap-x-2 font-ui text-[15px] leading-[1.7]">
          {service.subServices.map((sub, i) => (
            <li key={sub} className="whitespace-nowrap">
              {sub}
              {i < service.subServices.length - 1 && (
                <span aria-hidden="true" className={`ml-2 ${t.muted}`}>
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
        {service.tools && (
          <p className={`mt-2 font-mono text-[12px] leading-[1.7] ${t.muted}`}>
            <span className="sr-only">Tools: </span>
            {service.tools.join(" · ")}
          </p>
        )}
      </div>

      <div className={`flex flex-wrap items-center gap-x-7 gap-y-4 ${spread ? `${col} lg:flex-col lg:items-start` : ""}`}>
        <Link
          href={contactHref([service.slug])}
          className={`group/cta inline-flex min-h-12 items-center gap-3 rounded-full px-7 font-ui text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${FOCUS} ${t.cta}`}
        >
          <span>
            Start with this
            <span className="sr-only"> service: {service.name}</span>
          </span>
          <FiArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
        {service.slug === "web-development" && (
          <Link
            href="/work#websites"
            className={`inline-flex min-h-11 items-center font-ui text-[15px] font-medium underline decoration-2 underline-offset-[6px] transition-colors ${FOCUS} ${t.link}`}
          >
            See the websites we built
          </Link>
        )}
        {service.slug === "crm-erp" && (
          <Link
            href="/work#crm"
            className={`inline-flex min-h-11 items-center font-ui text-[15px] font-medium underline decoration-2 underline-offset-[6px] transition-colors ${FOCUS} ${t.link}`}
          >
            See the full CRM build
          </Link>
        )}
      </div>
    </div>
  );
}

/** The real CRM's modules, each a door into the Work page. */
function CrmModules() {
  return (
    <nav aria-label="Modules of the CRM we built" className="min-w-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Inside the real build</p>
      <ul className="mt-3 border-t border-ink/15">
        {CRM_MODULE_LINKS.map(([label, href]) => (
          <li key={label} className="border-b border-ink/15">
            <Link
              href={href}
              className={`group flex min-h-12 items-center justify-between gap-4 py-2 font-ui text-[16px] text-ink ${FOCUS} focus-visible:outline-ink focus-visible:-outline-offset-2`}
            >
              <span className="relative">
                {label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-100 motion-reduce:transition-none"
                />
              </span>
              <FiArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-ink-muted group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Caption({ text, tone, className = "" }: { text: string; tone: Tone; className?: string }) {
  return <p className={`font-mono text-[12px] leading-relaxed ${TONES[tone].muted} ${className}`}>{text}</p>;
}

function Plate({ service, index }: { service: Service; index: number }) {
  const { tone, layout, backdrop, crop } = PLATES[service.slug];
  const t = TONES[tone];
  const { Visual, label } = PRODUCT_VISUALS[service.slug];
  const visual = crop ? (
    <div className="overflow-hidden">
      <div className={styles.crop} style={{ "--crop": crop } as CSSProperties}>
        <Visual label={label} />
      </div>
    </div>
  ) : (
    <Visual label={label} />
  );

  const shell = `relative scroll-mt-20 overflow-clip ${t.section}`;
  const inner = "mx-auto max-w-7xl px-6 md:px-12 lg:px-16";

  if (layout === "stage") {
    return (
      <article id={service.slug} aria-labelledby={`${service.slug}-title`} tabIndex={-1} className={`${shell} outline-none`}>
        <div className={`${inner} py-24 md:py-32`}>
          <Heading service={service} index={index} tone={tone} />
          <Reveal className="relative mt-12 md:mt-16">
            {/* The red mass the product stands on (Material Rule) */}
            <div
              aria-hidden="true"
              className={`absolute -inset-y-6 w-[72%] rounded-[2px] md:-inset-y-10 ${t.backdrop} ${
                backdrop === "left" ? "-left-6 md:-left-12 lg:-left-16" : "-right-6 md:-right-12 lg:-right-16"
              }`}
            />
            <div className="relative">{visual}</div>
          </Reveal>
          <Caption text={service.product.caption} tone={tone} className="mt-10 md:mt-14" />
          {service.slug === "crm-erp" ? (
            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-x-8">
              <Spec service={service} tone={tone} className="lg:col-span-6" />
              <div className="lg:col-span-5 lg:col-start-8">
                <CrmModules />
              </div>
            </div>
          ) : (
            <Spec service={service} tone={tone} spread className="mt-10" />
          )}
        </div>
      </article>
    );
  }

  if (layout === "cinema") {
    return (
      <article id={service.slug} aria-labelledby={`${service.slug}-title`} tabIndex={-1} className={`${shell} outline-none`}>
        <div className="py-24 md:py-32">
          <div className={inner}>
            <Heading service={service} index={index} tone={tone} />
          </div>
          <Reveal className="mx-auto mt-12 max-w-[1500px] px-4 md:mt-16 md:px-8">{visual}</Reveal>
          <div className={`${inner} mt-6`}>
            <Caption text={service.product.caption} tone={tone} />
            <Spec service={service} tone={tone} spread className="mt-12" />
          </div>
        </div>
      </article>
    );
  }

  const visualLeft = layout === "split-left";
  return (
    <article id={service.slug} aria-labelledby={`${service.slug}-title`} tabIndex={-1} className={`${shell} outline-none`}>
      <div className={`${inner} grid gap-y-12 py-24 md:py-32 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-10`}>
        <div className={`lg:col-span-5 lg:row-start-1 lg:self-end ${visualLeft ? "lg:col-start-8" : "lg:col-start-1"}`}>
          <Heading service={service} index={index} tone={tone} />
        </div>
        <div
          className={`lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:self-center ${visualLeft ? "lg:col-start-1" : "lg:col-start-6"}`}
        >
          <Reveal>{visual}</Reveal>
          <Caption text={service.product.caption} tone={tone} className="mt-5" />
        </div>
        <Spec
          service={service}
          tone={tone}
          className={`lg:col-span-5 lg:row-start-2 lg:self-start ${visualLeft ? "lg:col-start-8" : "lg:col-start-1"}`}
        />
      </div>
    </article>
  );
}

/** The catalogue: one plate per service, each led by the thing the client receives. */
export function Catalogue() {
  return (
    <section id="services" aria-labelledby="catalogue-title">
      <h2 id="catalogue-title" className="sr-only">
        The catalogue
      </h2>
      {SERVICES.map((service, i) => (
        <Plate key={service.slug} service={service} index={i} />
      ))}
    </section>
  );
}
