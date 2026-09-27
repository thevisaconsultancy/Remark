import { FiArrowDown } from "react-icons/fi";
import { MarkedWord } from "@/components/MarkedWord";
import { SERVICES } from "@/data/services";
import { Grain } from "./Grain";

/**
 * The catalogue's cover: one poster-scale line, and the contents page it
 * promises. Every row drops to the product it names.
 */
export function ServicesHero() {
  return (
    <section
      id="top"
      aria-labelledby="services-hero-title"
      className="relative isolate overflow-clip bg-void text-fg"
    >
      {/* Heat rising from below the fold, where the first product sits */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_70%_60%_at_20%_100%,oklch(0.5_0.195_27/0.28),transparent_70%)]"
      />
      <Grain opacity={0.08} className="-z-10" />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl content-end gap-y-14 px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44 lg:grid-cols-12 lg:items-end lg:gap-x-8 lg:px-16 lg:pb-24">
        <div className="lg:col-span-6">
          <h1
            id="services-hero-title"
            className="text-[clamp(3.25rem,8.2vw,7.5rem)] font-normal leading-[0.95] [overflow-wrap:anywhere]"
          >
            See what we <MarkedWord word="make" animateOnLoad delay={500} weight="heavy" />.
          </h1>
          <p className="mt-7 max-w-[40ch] text-pretty font-ui text-[17px] leading-relaxed text-muted md:text-[18px]">
            Seven services, each shown as the thing you get at the end. The brands and numbers are samples; yours are
            built for you.
          </p>
        </div>

        <nav aria-label="Catalogue contents" className="lg:col-span-6 lg:col-start-7">
          <ol className="border-b border-fg/12">
            {SERVICES.map((service, i) => (
              <li key={service.slug} className="border-t border-fg/12">
                <a
                  href={`#${service.slug}`}
                  className="group grid min-h-14 grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-4 py-3 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fg md:py-3.5"
                >
                  <span className="font-mono text-[12px] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="min-w-0">
                    <span className="block font-cranio text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.1] text-fg transition-colors duration-300 group-hover:text-red-300">
                      {service.name}
                    </span>
                    <span className="mt-0.5 block font-ui text-[14px] leading-snug text-muted">{service.product.noun}</span>
                  </span>
                  <FiArrowDown
                    aria-hidden="true"
                    className="size-4 text-muted transition-[transform,color] duration-500 ease-out-expo group-hover:translate-y-0.5 group-hover:text-red-300 motion-reduce:transition-none"
                  />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
