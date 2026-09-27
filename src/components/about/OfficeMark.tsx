import { DirectionalLiquidButton } from "@/components/DirectionalLiquidButton";
import { OFFICE } from "@/data/about";
import { ADDRESS, EMAIL, MAPS_URL, PHONE_PRIMARY, PHONE_SECONDARY } from "@/data/social";
import { Arrow } from "./Arrow";
import { OfficePlate } from "./OfficePlate";
import { H2, LABEL, LEAD, LINK_PAPER, SECTION, WRAP } from "./ui";

const CITY = "Islamabad";

/** The office mark and the close: the address struck into a red plate, and how to reach the bench. */
export function OfficeMark() {
  return (
    <section id="office" aria-labelledby="office-title" className={`${SECTION} bg-paper-warm text-ink`}>
      <div className={WRAP}>
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="office-title" className={`${H2} lg:col-span-7`}>
            {OFFICE.title} {OFFICE.titleEnd}
          </h2>
          <p className={`${LEAD} max-w-[42ch] text-ink-muted lg:col-span-5 lg:self-end`}>{OFFICE.intro}</p>
        </div>

        <OfficePlate label={OFFICE.label} lines={ADDRESS.lines} full={ADDRESS.full} city={CITY} />

        <div className="mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-3">
            <p className={`${LABEL} text-ink-muted`}>{OFFICE.callLabel}</p>
            <ul className="mt-2">
              {[PHONE_PRIMARY, PHONE_SECONDARY].map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className={LINK_PAPER}>
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className={`${LABEL} text-ink-muted`}>{OFFICE.emailLabel}</p>
            <p className="mt-2">
              <a href={`mailto:${EMAIL}`} className={`${LINK_PAPER} [overflow-wrap:anywhere]`}>
                {EMAIL}
              </a>
            </p>
          </div>
          <div className="lg:col-span-3">
            <p className={`${LABEL} text-ink-muted`}>Visit</p>
            <p className="mt-2">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={LINK_PAPER}>
                {OFFICE.maps}
                <Arrow dir="up-right" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
          <div className="sm:col-span-2 lg:col-span-3 lg:flex lg:items-end lg:justify-end">
            <DirectionalLiquidButton
              href="/contact"
              fillClassName="bg-ink"
              className="inline-flex min-h-12 items-center gap-3 rounded-full border-[1.5px] border-accent bg-accent px-8 py-3.5 font-ui text-[13px] font-semibold uppercase tracking-[0.18em] text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <span>{OFFICE.cta}</span>
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                &rarr;
              </span>
            </DirectionalLiquidButton>
          </div>
        </div>
      </div>
    </section>
  );
}
