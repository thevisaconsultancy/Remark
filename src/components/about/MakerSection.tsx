import Link from "next/link";
import type { CSSProperties } from "react";
import { MarkedWord } from "@/components/MarkedWord";
import { MAKER } from "@/data/about";
import { SERVICES } from "@/data/services";
import { Arrow } from "./Arrow";
import { ChapterMark } from "./ChapterMark";
import { Reveal } from "./Reveal";
import { BODY, H2, H3, H4, LABEL, LEAD, LINK_VOID, MONO_HEADING, SECTION, WRAP } from "./ui";
import styles from "./about.module.css";

/** The maker's mark: who strikes it, what that means in practice, and what they make. */
export function MakerSection() {
  return (
    <section id="maker" aria-labelledby="maker-title" className={`${SECTION} bg-void text-fg`}>
      <div className={WRAP}>
        {/* Who we are */}
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3 lg:pt-3">
            <ChapterMark kind="maker" metal="void" label={MAKER.label} tone="void" />
          </div>
          <div className="min-w-0 lg:col-span-9">
            <h2 id="maker-title" className={`${H2} max-w-[16ch]`}>
              {MAKER.title} <MarkedWord word={MAKER.mark} />.
            </h2>
            <div className={`${LEAD} mt-8 max-w-[60ch] space-y-5 text-muted md:mt-10`}>
              {MAKER.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>

        {/* In practice */}
        <div className="mt-20 grid grid-cols-1 gap-y-8 md:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <h3 className={`${LABEL} text-muted lg:col-span-3 lg:pt-6`} style={MONO_HEADING}>{MAKER.practiceTitle}</h3>
          <Reveal as="ol" className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3 lg:col-span-9">
            {MAKER.practice.map((item, i) => (
              <li key={item.name} className={`${styles.rule} pt-6`} style={{ "--i": i * 2 } as CSSProperties}>
                <span className={`${LABEL} ${styles.tick} tabular-nums text-subtle`} aria-hidden="true">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </span>
                <div className={styles.rise}>
                  <h4 className={`${H4} mt-4 text-fg md:min-h-[2.3em]`}>{item.name}</h4>
                  <p className={`${BODY} mt-3 max-w-[34ch] text-muted`}>{item.text}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        {/* What we make */}
        <div className="mt-20 grid grid-cols-1 gap-y-8 md:mt-28 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <h3 id="make-title" className={`${H3} text-fg`}>
              {MAKER.servicesTitle}
            </h3>
            <p className={`${BODY} mt-4 max-w-[30ch] text-muted`}>{MAKER.servicesIntro}</p>
          </div>
          <div className="min-w-0 lg:col-span-9">
            <Reveal
              as="ul"
              aria-labelledby="make-title"
              className={styles.ruleEnd}
              style={{ "--n": SERVICES.length } as CSSProperties}
            >
              {SERVICES.map((service, i) => (
                <li key={service.slug} className={styles.rule} style={{ "--i": i } as CSSProperties}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 rounded-[2px] py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)_auto] md:gap-x-8 md:py-7"
                  >
                    <span className="col-start-1 row-start-1 font-cranio text-[clamp(1.375rem,2.2vw,1.75rem)] leading-[1.1] text-fg underline decoration-transparent decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 group-hover:decoration-accent group-focus-visible:decoration-accent">
                      {service.name}
                    </span>
                    <span className="col-span-2 col-start-1 row-start-2 min-w-0 md:col-span-1 md:col-start-2 md:row-start-1">
                      <span className="block font-ui text-[16px] font-semibold leading-snug text-fg">
                        {service.product.noun}
                      </span>
                      <span className={`${BODY} mt-1 block text-muted`}>{service.product.line}</span>
                    </span>
                    <span className="col-start-2 row-start-1 mt-1.5 text-muted transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent md:col-start-3">
                      <Arrow className="h-5 w-5" />
                    </span>
                  </Link>
                </li>
              ))}
            </Reveal>
            <p className="mt-8">
              <Link href="/services" className={LINK_VOID}>
                {MAKER.servicesLink}
                <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
