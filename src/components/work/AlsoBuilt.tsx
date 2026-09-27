import { FiArrowRight } from "react-icons/fi";
import { WEBSITES } from "@/data/projects";
import { ChapterHead } from "./ChapterHead";
import { Seen } from "./Seen";
import { CONTAINER, LEDE, SECTION_PAD, stagger } from "./ui";
import s from "./work.module.css";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

/**
 * 06, also built: the three live websites. No pictures of them (we would rather
 * send people to the real thing): each row is the client and the address, and
 * the whole row is the link. On hover or focus a red field wipes in behind it.
 */
export function AlsoBuilt() {
  const sites = WEBSITES.filter((w) => w.url);
  return (
    <section id="websites" aria-labelledby="websites-title" className="scroll-mt-24 bg-paper-warm text-ink">
      <div className={`${CONTAINER} ${SECTION_PAD}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <ChapterHead id="websites" num="06" label="Also built" register="paper" className="lg:col-span-7">
            And three websites.
          </ChapterHead>
          <p className={`${LEDE} text-ink-muted lg:col-span-5 lg:pt-20`}>
            Alongside the CRM, we designed and built three websites. All three are live, so rather than pictures of
            them, here are the addresses.
          </p>
        </div>

        <Seen as="ul" className="mt-12 md:mt-16" threshold={0.25}>
          {sites.map((site, i) => (
            <li key={site.slug} className={`${s.rule} ${i === sites.length - 1 ? s.ruleEnd : ""}`} style={stagger(i)}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.site} group -mx-4 grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 py-7 outline-none transition-colors duration-500 hover:text-fg focus-visible:text-fg md:-mx-6 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,16rem)_auto] md:gap-x-8 md:px-6 md:py-9 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`}
              >
                <span aria-hidden="true" className={s.siteFill} />
                <span className="self-start pt-[0.9em] font-mono text-[12px] tracking-[0.2em] text-ink-muted transition-colors duration-500 group-hover:text-fg group-focus-visible:text-fg md:pt-[1.4em]">
                  0{i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-cranio text-[clamp(1.9rem,4.6vw,4.25rem)] leading-[1] [overflow-wrap:anywhere]">
                    {site.client ?? site.name}
                  </span>
                  <span className="mt-3 block font-mono text-[13px] tracking-[0.04em] text-ink-muted transition-colors duration-500 group-hover:text-fg group-focus-visible:text-fg md:text-[14px]">
                    {host(site.url!)}
                  </span>
                </span>
                {/* Only real facts go here; a row without any simply leaves the column empty. */}
                <span className="col-start-2 font-ui text-[15px] leading-snug text-ink-muted transition-colors duration-500 empty:hidden group-hover:text-fg group-focus-visible:text-fg md:col-start-auto md:empty:block">
                  {site.year && <span className="block font-mono text-[11px] uppercase tracking-[0.2em]">{site.year}</span>}
                  {site.note && <span className="block">{site.note}</span>}
                  {site.summary && <span className="mt-1.5 block">{site.summary}</span>}
                </span>
                <span
                  aria-hidden="true"
                  className="col-start-3 row-span-2 row-start-1 grid h-12 w-12 place-items-center rounded-full border border-ink/25 transition-colors duration-500 group-hover:border-fg/60 group-focus-visible:border-fg/60 md:col-start-auto md:row-span-1 md:row-start-auto md:h-14 md:w-14"
                >
                  <FiArrowRight className={`${s.siteArrow} h-5 w-5`} />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </Seen>
      </div>
    </section>
  );
}
