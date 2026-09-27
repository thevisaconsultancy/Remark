"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { SERVICES } from "@/data/services";
import { SERVICE_ART } from "./art";

const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-red-500";

/**
 * The seven services as an editorial index. On large screens a single plate
 * beside the list shows the artwork of whichever row is hovered or focused;
 * below that, each row carries its own small plate.
 */
export function ServiceIndex() {
  const [active, setActive] = useState(0);
  const current = SERVICES[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ol className="border-t border-ink/15 lg:col-span-7">
        {SERVICES.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.slug}>
              <Link
                href={`/services#${s.slug}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative flex items-center gap-4 border-b border-ink/15 py-5 sm:gap-6 sm:py-6 ${FOCUS}`}
              >
                <span
                  className={`w-7 shrink-0 font-mono text-[11px] tracking-[0.2em] transition-colors duration-300 ${on ? "text-red-500" : "text-ink-muted"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative size-14 shrink-0 overflow-hidden rounded-[4px] bg-void sm:size-16 lg:hidden">
                  <Image src={SERVICE_ART[s.slug].src} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-cranio text-[clamp(1.5rem,3vw,2.375rem)] leading-[1.02] text-ink">
                    {s.displayName}
                  </span>
                  <span className="mt-2 hidden max-w-[52ch] font-ui text-[15px] leading-relaxed text-ink-muted sm:block">
                    {s.statement}
                  </span>
                </span>
                <FiArrowRight
                  aria-hidden="true"
                  className={`size-5 shrink-0 transition-[color,translate] duration-300 ease-out-expo motion-safe:group-hover:translate-x-1.5 ${on ? "text-red-500" : "text-ink-muted"}`}
                />
                {/* The row being shown in the plate carries a crimson rule. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px hidden h-[3px] origin-left lg:block bg-red-500 transition-transform duration-500 ease-out-expo motion-reduce:transition-none ${on ? "scale-x-100" : "scale-x-0"}`}
                />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:col-span-5 lg:block">
        <figure className="sticky top-28">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-void">
            {SERVICES.map((s, i) => {
              const on = i === active;
              return (
                <Image
                  key={s.slug}
                  src={SERVICE_ART[s.slug].src}
                  alt={on ? SERVICE_ART[s.slug].alt : ""}
                  aria-hidden={on ? undefined : true}
                  fill
                  sizes="(min-width: 1280px) 520px, 40vw"
                  className={`object-cover transition-[opacity,scale] duration-700 ease-out-expo motion-reduce:transition-none ${on ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
                />
              );
            })}
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            <span>{current.product.noun}</span>
            <span className="shrink-0 text-red-500">{String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
