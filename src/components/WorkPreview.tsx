import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { MarkedWord } from "./MarkedWord";
import { Reveal } from "./home/Reveal";
import { ServiceIndex } from "./home/ServiceIndex";
import { CRM_ART } from "./home/art";
import { CRM_MODULES, WEBSITES } from "@/data/projects";

const LABEL = "font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted";
const FOCUS =
  "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-red-500";

/** Only sites with a live URL are shown; the client name falls back to the project name. */
const SITES = WEBSITES.flatMap((w) =>
  w.url ? [{ slug: w.slug, url: w.url, name: w.client ?? w.name, host: new URL(w.url).hostname.replace(/^www\./, "") }] : [],
);

/**
 * The home page's closing section (paper register, between two void sections).
 * One dominant gesture: the CRM case study as a large cast plate. It then hands
 * the visitor to the live sites and the services index; the footer that
 * follows carries the "start a project" invitation, so this section does not.
 */
export function WorkPreview() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-paper-warm text-ink">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-10 lg:pb-36 lg:pt-40">
        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal className="lg:col-span-8">
            <p className={LABEL}>Selected work</p>
            <h2
              id="work-title"
              className="mt-6 max-w-[13ch] text-[clamp(2.75rem,7.2vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.02em] text-ink"
            >
              Work that is already <MarkedWord word="running" weight="heavy" />.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-4" delay={1}>
            <p className="max-w-[42ch] font-ui text-base leading-relaxed text-ink-muted sm:text-lg">
              A CRM a visa consultancy runs its day on, websites taking enquiries right now, and the seven things we
              build.
            </p>
          </Reveal>
        </div>

        {/* The lead: the CRM case study */}
        <article className="group relative mt-16 grid gap-8 rounded-md outline-offset-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-solid has-[a:focus-visible]:outline-red-500 sm:mt-20 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <Reveal variant="plate" className="lg:col-span-8">
            <div className="relative aspect-[18/11] overflow-hidden rounded-md bg-void">
              <Image
                src={CRM_ART.src}
                alt={CRM_ART.alt}
                fill
                sizes="(min-width: 1280px) 820px, (min-width: 1024px) 64vw, 100vw"
                className="object-cover transition-transform duration-[1200ms] ease-out-expo motion-safe:group-hover:scale-[1.025]"
              />
            </div>
          </Reveal>
          <Reveal className="flex flex-col lg:col-span-4" delay={1}>
            <p className={LABEL}>Case study · CRM and ERP</p>
            <h3 className="mt-4 text-[clamp(2rem,3.2vw,3rem)] font-normal leading-none text-ink">
              <Link href="/work#crm" className="outline-none after:absolute after:inset-0 after:content-['']">
                Visa Consultancy CRM
              </Link>
            </h3>
            <p className="mt-5 max-w-[46ch] font-ui text-base leading-relaxed text-ink-muted">
              Leads, cases, CV assessment, job hunting and the team&rsquo;s day in one system, built round how the
              consultancy already worked.
            </p>
            <ol className="mt-8 border-t border-ink/15" aria-label="What the system does">
              {CRM_MODULES.map((m, i) => (
                <li key={m.id} className="flex items-baseline gap-4 border-b border-ink/15 py-2.5 font-ui text-[15px] text-ink">
                  <span className="w-6 shrink-0 font-mono text-[11px] text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  {m.name}
                </li>
              ))}
            </ol>
            <span
              aria-hidden="true"
              className="mt-8 inline-flex items-center gap-3 self-start rounded-full bg-red-500 px-6 py-3.5 font-ui text-[12px] font-bold uppercase tracking-[0.18em] text-fg transition-colors duration-300 group-hover:bg-red-600"
            >
              Read the case study
              <FiArrowRight className="size-4 transition-transform duration-300 ease-out-expo motion-safe:group-hover:translate-x-1" />
            </span>
          </Reveal>
        </article>

        {/* Live websites */}
        <Reveal className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-12 lg:gap-12">
          <h3 className={`${LABEL} pt-6 lg:col-span-3`} style={{ fontFamily: "var(--font-mono), monospace" }}>
            Also live
          </h3>
          <ul className="grid border-t border-ink/15 md:grid-cols-3 lg:col-span-9">
            {SITES.map((site) => (
              <li key={site.slug} className="border-b border-ink/15 md:border-b-0 md:border-l md:first:border-l-0 md:first:[&>a]:pl-0">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-start justify-between gap-4 py-6 md:px-6 ${FOCUS}`}
                >
                  <span>
                    <span className="block font-cranio text-[1.625rem] leading-tight text-ink">{site.name}</span>
                    <span className="mt-1.5 block font-mono text-[12px] tracking-[0.04em] text-ink-muted">{site.host}</span>
                  </span>
                  <FiArrowUpRight
                    aria-hidden="true"
                    className="mt-1.5 size-5 shrink-0 text-ink-muted transition-[color,translate] duration-300 ease-out-expo group-hover:text-red-500 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* What we build */}
        <div className="mt-24 sm:mt-28 lg:mt-36">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
            <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-none text-ink">What we build</h3>
            <Link
              href="/services"
              className={`group inline-flex items-center gap-3 rounded-full border-[1.5px] border-red-500 px-6 py-3 font-ui text-[12px] font-bold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-red-500 hover:text-fg ${FOCUS}`}
            >
              All services
              <FiArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 ease-out-expo motion-safe:group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <ServiceIndex />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
