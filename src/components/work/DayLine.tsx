import { MarkedWord } from "@/components/MarkedWord";
import { DAY_STEPS } from "@/data/projects";
import { ChapterHead } from "./ChapterHead";
import { Seen } from "./Seen";
import { CONTAINER, LEDE, SECTION_PAD, stagger } from "./ui";
import s from "./work.module.css";

/**
 * 03, a day in the system: the applicant's path as one red line with five
 * stations. Horizontal from md up, vertical on phones. When it arrives the line
 * runs once from the first station to the last, and each station lights as the
 * line reaches it; the last answers with a single ring. Without motion it is
 * simply drawn and lit.
 */
export function DayLine() {
  const last = DAY_STEPS.length - 1;
  return (
    <section id="day" aria-labelledby="day-title" className="scroll-mt-24 bg-void text-fg">
      <div className={`${CONTAINER} ${SECTION_PAD}`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <ChapterHead id="day" num="03" label="A day in the system" register="void" className="lg:col-span-7">
            How an applicant <MarkedWord word="moves" /> through it.
          </ChapterHead>
          <p className={`${LEDE} text-muted lg:col-span-5 lg:pt-20`}>
            Put together, the modules make one path, and each step starts from what the last one left behind: the
            campaign travels with the lead, the country sets up the case, the CV feeds the job search.
          </p>
        </div>

        <Seen className="relative mt-14 md:mt-20" threshold={0.45}>
          {/* The rail, faint, and the red run drawn over it. */}
          <span aria-hidden="true" className="absolute top-4 bottom-20 left-[13px] w-[6px] bg-white/10 md:hidden">
            <span className={`block h-full w-full bg-accent ${s.runY}`} />
          </span>
          <span aria-hidden="true" className="absolute top-[13px] right-[calc(20%-35px)] left-4 hidden h-[6px] bg-white/10 md:block">
            <span className={`block h-full w-full bg-accent ${s.runX}`} />
          </span>
          <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
            {DAY_STEPS.map((step, i) => (
              <li key={step.name} className="relative pl-14 md:pl-0" style={stagger(i)}>
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 grid h-8 w-8 place-items-center rounded-full border-[6px] border-accent bg-void md:relative"
                >
                  {/* The station's light: a red core that switches on as the line arrives. */}
                  <span className={`${s.dot} block rounded-full bg-accent ${i === last ? "h-full w-full" : "h-2 w-2"}`} />
                  {i === last && <span className={`${s.ring} absolute -inset-[6px] rounded-full border-2 border-accent`} />}
                </span>
                <div className={s.station}>
                  <p className="font-mono text-[12px] tracking-[0.2em] text-muted md:mt-7">0{i + 1}</p>
                  <h3 className="mt-2 font-normal text-[clamp(1.6rem,2.3vw,2.25rem)] leading-[1.05] text-fg">{step.name}</h3>
                  <p className="mt-3 max-w-[30ch] font-ui text-[15px] leading-relaxed text-muted">{step.line}</p>
                </div>
              </li>
            ))}
          </ol>
        </Seen>
      </div>
    </section>
  );
}
