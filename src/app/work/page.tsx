import type { Metadata } from "next";
import { FiArrowDown } from "react-icons/fi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MarkedWord } from "@/components/MarkedWord";
import {
  AccessMatrixShot,
  AssessmentReportShot,
  CaseDetailShot,
  CasesShot,
  CvAssessmentShot,
  DashboardShot,
  JobHuntingShot,
  LeadsShot,
  TeamReportShot,
  VisaTypeShot,
  WhatsAppReportShot,
} from "@/components/crm-shots";
import { AlsoBuilt } from "@/components/work/AlsoBuilt";
import { ChapterHead } from "@/components/work/ChapterHead";
import { ChapterRail } from "@/components/work/ChapterRail";
import { CircleMark } from "@/components/work/CircleMark";
import { DayLine } from "@/components/work/DayLine";
import { Seen } from "@/components/work/Seen";
import { Shot } from "@/components/work/Shot";
import { ShotTilt } from "@/components/work/ShotTilt";
import { CONTAINER, FOCUS_VOID, LEDE, SECTION_PAD, stagger } from "@/components/work/ui";
import s from "@/components/work/work.module.css";
import {
  ASSESSMENT_STEPS,
  BRIEF_JOBS,
  CASE_FACETS,
  CRM_MODULES,
  INTEGRATIONS,
  JOB_FLAGS,
  LEAD_FACTS,
  TEAM_FACTS,
} from "@/data/projects";

const DESCRIPTION =
  "The story of the Visa Consultancy CRM: the brief, the six modules we designed and built, how it runs the day, and the system underneath. Plus three websites.";

export const metadata: Metadata = {
  title: "Work | Remark Studio",
  description: DESCRIPTION,
  alternates: { canonical: "https://remarkstudio.tech/work" },
  openGraph: {
    title: "Work | Remark Studio",
    description: DESCRIPTION,
    url: "https://remarkstudio.tech/work",
    siteName: "Remark Studio",
    images: [{ url: "https://remarkstudio.tech/og-image.png", width: 1200, height: 630, alt: "Remark Studio" }],
    locale: "en_US",
    type: "website",
  },
};

/** Small uppercase mono label, used for list heads inside chapters. */
const LIST_HEAD = "font-mono text-[12px] uppercase tracking-[0.2em]";

/** The brief's six jobs sit loose on the page, each indented differently. */
const STAGGER = ["md:pl-0", "md:pl-[16%]", "md:pl-[6%]", "md:pl-[28%]", "md:pl-[10%]", "md:pl-[38%]"];

/** On phones a shot never drops below half size; it crops (skipping the sidebar) instead. */
const PHONE = { minScale: 0.5, cropX: 208 };

/** Headline + side lede, the chapter opening most chapters share. */
const HEAD_ROW = "grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8";
const SIDE_LEDE = "lg:col-span-5 lg:pt-20";

export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 font-ui">
        {/* ------------------------------------------------------------ */}
        {/* Opening: the product, named and shown                         */}
        {/* ------------------------------------------------------------ */}
        <section aria-labelledby="work-title" className="relative z-10 bg-void text-fg">
          {/* The red mass the dashboard rests on, poured in from the right edge. */}
          <div aria-hidden="true" className={`${s.pour} absolute right-0 bottom-0 h-[34%] w-[62%] bg-accent md:h-[40%] md:w-[48%]`} />
          <div className={`${CONTAINER} pt-32 md:pt-36`}>
            <p className={`${s.load} font-mono text-[12px] uppercase tracking-[0.2em] text-muted`}>Case study · Visa Consultancy CRM</p>
            <h1
              id="work-title"
              className="mt-5 max-w-[14ch] text-[clamp(3rem,7.4vw,7.25rem)] font-normal leading-[0.94] tracking-[-0.015em] text-fg [overflow-wrap:anywhere]"
            >
              A visa consultancy, run from one <MarkedWord word="system" animateOnLoad delay={500} weight="heavy" />.
            </h1>
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <p className={`${s.load} ${LEDE} text-muted lg:col-span-6`} style={stagger(1)}>
                This is the story of a CRM we designed and built for The Visa Consultancy: what they were running
                before, the six modules that replaced it, and how an applicant now moves from a campaign form to a
                signed-off, paid case.
              </p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 font-ui text-[15px] lg:col-span-5 lg:col-start-8">
                {[
                  ["Client", "The Visa Consultancy"],
                  ["Our part", "Product design and engineering"],
                  ["Product", "Web app, six modules"],
                  ["Connected", "WhatsApp, email, Google Sheets, Canva"],
                ].map(([k, v], i) => (
                  <div key={k} className={s.load} style={stagger(i + 2)}>
                    <dt className={`${LIST_HEAD} text-muted`}>{k}</dt>
                    <dd className="mt-1.5 text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative z-10 mt-12 -mb-[22%] [perspective:2400px] md:mt-14">
              <div className={s.settle} style={{ transformOrigin: "50% 100%" }}>
                <ShotTilt>
                  <div data-play>
                    <DashboardShot
                      tone="void"
                      {...PHONE}
                      frameClassName="shadow-[0_40px_80px_-40px_rgba(26,18,16,0.55)] ring-1 ring-white/10"
                      noCaption
                    />
                  </div>
                </ShotTilt>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* 01 The brief                                                  */}
        {/* ------------------------------------------------------------ */}
        <section id="brief" aria-labelledby="brief-title" className="scroll-mt-24 bg-paper-warm text-ink">
          <div className={`${CONTAINER} pt-[calc(22%+2.5rem)] pb-20 md:pb-24 lg:pb-28`}>
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-ink-muted">
              Dashboard, redrawn from the live product · Sample data. Every screen on this page uses invented names and figures.
            </p>
            <div className={`mt-16 md:mt-24 ${HEAD_ROW}`}>
              <ChapterHead id="brief" num="01" label="The brief" register="paper" className="lg:col-span-7">
                Six jobs, and no <MarkedWord word="single" weight="heavy" /> place to run them.
              </ChapterHead>
              <div className={SIDE_LEDE}>
                <p className={`${LEDE} text-ink-muted`}>
                  A visa consultancy runs on detail. Leads come in from campaigns. Each applicant becomes a case, under a
                  country, with its own documents and deadlines. Staff earn commission on the work, and managers need to
                  know what the team did today. All of it was running across spreadsheets and WhatsApp.
                </p>
                <p className={`${LEDE} mt-5 text-ink`}>
                  The brief: one system that carries an applicant from the first form to the final payment, and runs
                  the team behind them.
                </p>
              </div>
            </div>
            <Seen as="ul" aria-label="What the consultancy was running" className="mt-14 flex flex-col md:mt-20" threshold={0.15}>
              {BRIEF_JOBS.map((job, i) => (
                <li
                  key={job}
                  style={stagger(i)}
                  className={`${s.rule} flex items-baseline gap-4 overflow-hidden py-2.5 font-cranio text-[clamp(2.25rem,6.2vw,5.75rem)] leading-[1.02] text-ink md:gap-8 ${STAGGER[i]}`}
                >
                  <span className="font-mono text-[12px] tracking-[0.2em] text-ink-muted">0{i + 1}</span>
                  <span className={s.word}>{job}</span>
                </li>
              ))}
            </Seen>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* 02 What we built                                              */}
        {/* ------------------------------------------------------------ */}
        <section id="crm" aria-labelledby="crm-title" className="scroll-mt-24 bg-void text-fg">
          <div className={`${CONTAINER} ${SECTION_PAD}`}>
            <div className={HEAD_ROW}>
              <ChapterHead id="crm" num="02" label="What we built" register="void" className="lg:col-span-7">
                So we built <CircleMark word="one" /><span className="ml-[0.2em]">.</span>
              </ChapterHead>
              <p className={`${LEDE} text-muted ${SIDE_LEDE}`}>
                Six modules around one record of each applicant, so the work done in one hands straight to the next.
                Here they are in the order an applicant meets them.
              </p>
            </div>
            <Seen as="ol" className="mt-12 md:mt-16" threshold={0.2}>
              {CRM_MODULES.map((m, i) => (
                <li key={m.id} className={`${s.rule} ${i === CRM_MODULES.length - 1 ? s.ruleEnd : ""}`} style={stagger(i)}>
                  <a
                    href={`#${m.id}`}
                    className={`${s.indexRow} group grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-5 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)_auto] md:gap-x-8 md:py-6 ${FOCUS_VOID}`}
                  >
                    <span className="font-mono text-[12px] tracking-[0.2em] text-muted transition-colors duration-300 group-hover:text-fg">
                      02.{i + 1}
                    </span>
                    <span className="font-cranio text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.02] text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                      {m.name}
                    </span>
                    <span className="col-start-2 font-ui text-[15px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-fg md:col-start-auto md:text-[16px]">
                      {m.line}
                    </span>
                    <span
                      aria-hidden="true"
                      className="col-start-3 row-span-2 row-start-1 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-fg transition-colors duration-300 group-hover:border-accent group-hover:bg-accent md:col-start-auto md:row-span-1 md:row-start-auto"
                    >
                      <FiArrowDown className={`${s.indexArrow} h-4 w-4`} />
                    </span>
                  </a>
                </li>
              ))}
            </Seen>
          </div>
        </section>

        {/* 02.1 Leads and campaigns */}
        <section id="leads" aria-labelledby="leads-title" className="scroll-mt-24 overflow-hidden bg-paper-warm text-ink">
          <div className={`${CONTAINER} ${SECTION_PAD}`}>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <ChapterHead id="leads" num="02.1" label="Leads and campaigns" register="paper">
                  Every lead keeps its <MarkedWord word="campaign" weight="heavy" />.
                </ChapterHead>
                <Seen as="ul" className="mt-10 flex flex-col">
                  {LEAD_FACTS.map((f, i) => (
                    <li key={f} style={stagger(i)} className={`${s.rule} py-4 font-ui text-[16px] leading-relaxed text-ink`}>
                      {f}
                    </li>
                  ))}
                </Seen>
              </div>
              <div className="relative lg:col-span-8">
                <div aria-hidden="true" className="absolute top-[12%] -right-4 bottom-[9%] left-[22%] md:-right-16 md:bottom-[7%]">
                  <div className={`${s.drift} h-full w-full bg-accent`} />
                </div>
                <Shot className="relative">
                  <LeadsShot {...PHONE} />
                </Shot>
              </div>
            </div>
          </div>
        </section>

        {/* 02.2 Clients and cases */}
        <section id="case" aria-labelledby="case-title" className="scroll-mt-24 bg-void text-fg">
          <div className={`${CONTAINER} ${SECTION_PAD} ${s.caseLink}`}>
            <div className={HEAD_ROW}>
              <ChapterHead id="case" num="02.2" label="Clients and cases" register="void" className="lg:col-span-7">
                A client, a country, a <MarkedWord word="case" />.
              </ChapterHead>
              <p className={`${LEDE} text-muted ${SIDE_LEDE}`}>
                Every client gets a case under a specific country. The case is where the work lives: seven things the
                spreadsheets and chats used to hold between them, now on one screen.
              </p>
            </div>
            <div className="relative mt-12 md:mt-16">
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 hidden w-[62%] [mask-image:linear-gradient(to_bottom,#000_35%,transparent_85%)] md:block"
              >
                <div className={s.drift}>
                  <CasesShot noCaption tone="void" frameClassName="ring-1 ring-white/10 brightness-[0.62]" />
                </div>
              </div>
              <Shot className="relative md:ml-auto md:w-[80%] md:pt-[9%]">
                <CaseDetailShot
                  pins
                  tone="void"
                  {...PHONE}
                  cropX={0}
                  frameClassName="shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
                />
              </Shot>
            </div>
            <Seen
              as="ol"
              aria-label="What a case holds, numbered to match the pins"
              className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
              threshold={0.2}
            >
              {CASE_FACETS.map((f, i) => (
                <li key={f.name} data-facet={i + 1} style={stagger(i)} className={`${s.rule} flex gap-4 py-5`}>
                  <span
                    aria-hidden="true"
                    className={`${s.legendNum} grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent font-mono text-[12px] font-bold text-fg`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-ui text-[16px] font-semibold text-fg">{f.name}</span>
                    <span className="mt-1 block font-ui text-[15px] leading-relaxed text-muted">{f.line}</span>
                  </span>
                </li>
              ))}
            </Seen>
          </div>
        </section>

        {/* 02.3 CV assessment */}
        <section id="assessment" aria-labelledby="assessment-title" className="scroll-mt-24 overflow-hidden bg-paper-warm text-ink">
          <div className={`${CONTAINER} ${SECTION_PAD}`}>
            <ChapterHead id="assessment" num="02.3" label="CV assessment" register="paper" h2ClassName="max-w-[13ch]">
              Which country <MarkedWord word="fits" weight="heavy" /> this CV?
            </ChapterHead>
            <div className="mt-12 grid grid-cols-1 gap-14 md:mt-16 lg:grid-cols-12 lg:gap-8">
              <div className="relative lg:col-span-8 lg:pb-[12%]">
                <Shot>
                  <CvAssessmentShot {...PHONE} />
                </Shot>
                <div className="relative z-10 mx-auto mt-8 w-[64%] rotate-[2.5deg] sm:w-[46%] lg:absolute lg:-right-[4%] lg:bottom-0 lg:mt-0 lg:w-[30%]">
                  <ShotTilt>
                    <AssessmentReportShot />
                  </ShotTilt>
                </div>
              </div>
              <div className="lg:col-span-4 lg:pl-8">
                <p className={`${LEDE} text-ink-muted`}>
                  Upload a CV and the assessment works out where the person is eligible, scores them, ranks the
                  countries and lists the requirements, what is missing and what blocks them. A person checks it before
                  anyone relies on it, and it goes out as a PDF report.
                </p>
                <p className={`${LIST_HEAD} mt-10 text-ink-muted`}>Six steps, in order</p>
                <Seen as="ol" className="mt-3">
                  {ASSESSMENT_STEPS.map((st, i) => (
                    <li
                      key={st.step}
                      style={stagger(i)}
                      className={`${s.rule} ${i === ASSESSMENT_STEPS.length - 1 ? s.ruleEnd : ""} flex gap-4 py-3`}
                    >
                      <span className="font-mono text-[12px] leading-[1.9] text-ink-muted">0{i + 1}</span>
                      <span>
                        <span className="block font-ui text-[16px] font-semibold text-ink">{st.step}</span>
                        <span className="block font-ui text-[15px] text-ink-muted">{st.line}</span>
                      </span>
                    </li>
                  ))}
                </Seen>
              </div>
            </div>
          </div>
        </section>

        {/* 02.4 Job hunting */}
        <section id="jobs" aria-labelledby="jobs-title" className="relative scroll-mt-24 bg-void text-fg">
          <div aria-hidden="true" className="absolute right-0 bottom-0 left-0 h-[30%] bg-accent" />
          <div className={`${CONTAINER} relative pt-20 pb-14 md:pt-24 md:pb-16 lg:pt-28`}>
            <div className={HEAD_ROW}>
              <ChapterHead id="jobs" num="02.4" label="Job hunting" register="void" className="lg:col-span-7">
                Then, the jobs that will <MarkedWord word="sponsor" /> them.
              </ChapterHead>
              <div className={SIDE_LEDE}>
                <p className={`${LEDE} text-muted`}>
                  The assessed CV goes straight into job hunting. The system suggests the job titles to search for, then
                  finds visa-sponsored openings that match, tagged against the sponsor registers.
                </p>
                <Seen as="ul" aria-label="Flags on each listing" className="mt-8 flex flex-wrap gap-2">
                  {JOB_FLAGS.map((f, i) => (
                    <li
                      key={f}
                      style={stagger(i)}
                      className={`${s.item} rounded-full border border-white/25 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.16em] text-fg`}
                    >
                      {f}
                    </li>
                  ))}
                </Seen>
              </div>
            </div>
            <Shot className="mt-12 md:mt-16">
              <JobHuntingShot
                {...PHONE}
                tone="red"
                frameClassName="shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
              />
            </Shot>
          </div>
        </section>

        {/* 02.5 Visa type library: the red chapter, continuing the red that rises under job hunting */}
        <section id="library" aria-labelledby="library-title" className="scroll-mt-24 bg-accent text-fg">
          <div className={`${CONTAINER} pt-10 pb-20 md:pt-14 md:pb-24 lg:pb-28`}>
            <ChapterHead id="library" num="02.5" label="Visa type library" register="red" h2ClassName="max-w-[15ch]">
              Add a country. The case builds <MarkedWord word="itself" tone="fg" weight="heavy" />.
            </ChapterHead>
            <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
              <Shot className="lg:col-span-8">
                <VisaTypeShot {...PHONE} tone="red" frameClassName="shadow-[0_50px_100px_-30px_rgba(44,0,5,0.75)]" />
              </Shot>
              <div className="lg:col-span-4 lg:pb-12 lg:pl-6">
                <p className={`${LEDE} text-fg`}>
                  Each visa type in the library carries its own stages, in order, and its required documents. Add one,
                  and every new case under that country opens already configured.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02.6 Team */}
        <section id="team" aria-labelledby="team-title" className="scroll-mt-24 overflow-hidden bg-paper-warm text-ink">
          <div className={`${CONTAINER} ${SECTION_PAD}`}>
            <div className={HEAD_ROW}>
              <ChapterHead id="team" num="02.6" label="Team" register="paper" className="lg:col-span-7">
                The team reports. Managers <MarkedWord word="sign" weight="heavy" /> off.
              </ChapterHead>
              <div className={SIDE_LEDE}>
                <p className={`${LEDE} text-ink-muted`}>
                  Everyone files their day in the Team page. The CRM sends the daily reports to admins and managers on
                  WhatsApp through Twilio, and the work that needs a manager’s approval is signed off there too.
                </p>
                <Seen as="ul" aria-label="On the Team page" className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-ui text-[15px] text-ink">
                  {TEAM_FACTS.map((f, i) => (
                    <li key={f} style={stagger(i)} className={`${s.item} flex items-center gap-2`}>
                      <span aria-hidden="true" className="h-2 w-2 bg-accent" />
                      {f}
                    </li>
                  ))}
                </Seen>
              </div>
            </div>
            <div className="relative mt-12 md:mt-16">
              <Shot className="md:w-[73%]">
                <TeamReportShot {...PHONE} />
              </Shot>
              <div className="relative mx-auto mt-12 w-[72%] max-w-[300px] sm:w-[46%] md:absolute md:right-0 md:-bottom-[6%] md:mt-0 md:w-[25%] md:max-w-none">
                <div aria-hidden="true" className="absolute -inset-x-[14%] top-[14%] bottom-[12%]">
                  <div className={`${s.drift} h-full w-full bg-accent`} />
                </div>
                <Shot className="relative">
                  <WhatsAppReportShot />
                </Shot>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* 03 A day in the system                                        */}
        {/* ------------------------------------------------------------ */}
        <DayLine />

        {/* ------------------------------------------------------------ */}
        {/* 04 Underneath: access and integrations                        */}
        {/* ------------------------------------------------------------ */}
        <section id="access" aria-labelledby="access-title" className="scroll-mt-24 bg-paper-warm text-ink">
          <div className={`${CONTAINER} ${SECTION_PAD}`}>
            <ChapterHead id="access" num="04" label="Underneath" register="paper" h2ClassName="max-w-[16ch]">
              Who sees what, down to a <MarkedWord word="single" weight="heavy" /> tab.
            </ChapterHead>
            <div className="mt-12 grid grid-cols-1 gap-14 md:mt-16 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-4">
                <p className={`${LEDE} text-ink-muted`}>
                  Give someone access, then narrow it to the modules and single tabs their role needs. Sales can be
                  given campaigns without commission; documentation can work a case without seeing finance.
                </p>
                <p className={`${LIST_HEAD} mt-10 text-ink-muted`}>Connected in Settings</p>
                <Seen as="ul" className="mt-3">
                  {INTEGRATIONS.map((name, i) => (
                    <li
                      key={name}
                      style={stagger(i)}
                      className={`${s.rule} ${i === INTEGRATIONS.length - 1 ? s.ruleEnd : ""} py-3 font-cranio text-[clamp(1.5rem,2.3vw,2.125rem)] leading-[1.1] text-ink`}
                    >
                      {name}
                    </li>
                  ))}
                </Seen>
              </div>
              <Shot className="lg:col-span-8">
                <AccessMatrixShot {...PHONE} />
              </Shot>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* 05 In short, then 06 Also built                               */}
        {/* ------------------------------------------------------------ */}
        <section id="closing" aria-labelledby="closing-title" className="scroll-mt-24 bg-void text-fg">
          <div className={`${CONTAINER} ${SECTION_PAD} grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8`}>
            <ChapterHead
              id="closing"
              num="05"
              label="In short"
              register="void"
              className="lg:col-span-8"
              h2ClassName="max-w-[16ch] text-[clamp(2.75rem,7vw,6.75rem)]! leading-[0.96]!"
            >
              From the first form to the final payment, <MarkedWord word="one" weight="heavy" /> line.
            </ChapterHead>
            <p className={`${LEDE} text-muted lg:col-span-4 lg:pb-3`}>
              Leads, cases, documents, deadlines, commissions and team reports: the six jobs from the brief, each with
              a place, each handing its work to the next. Designed and built by Remark Studio.
            </p>
          </div>
        </section>

        <AlsoBuilt />
        <ChapterRail />
      </main>
      <Footer />
    </>
  );
}
