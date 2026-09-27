import {
  LuBan,
  LuCheck,
  LuCircleAlert,
  LuDownload,
  LuFileText,
  LuListChecks,
  LuSparkles,
  LuUserCheck,
} from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, Badge, GhostButton, PageTitle, Panel, PrimaryButton } from "./parts";
import a from "./shots.module.css";
import { CAPS, CARD, LINE, SCREEN, T_INK, T_MUTED, T_TEAL } from "./tokens";

/** The product's real six-step pipeline. */
export const CV_PIPELINE = [
  { step: "Parse CV", note: "Extracting profile from document" },
  { step: "Recommend Countries", note: "Ranking best-fit destinations" },
  { step: "Requirements", note: "Sourcing rules from official gov sites" },
  { step: "Validate", note: "Dual-agent cross-check" },
  { step: "Compliance", note: "Flagging items for review" },
  { step: "Synthesize", note: "Assembling final report" },
] as const;

const RANKING = [
  { c: "United Kingdom", route: "Health and Care Worker", s: 82 },
  { c: "Ireland", route: "Critical Skills Employment Permit", s: 74 },
  { c: "New Zealand", route: "Skilled Migrant Category", s: 69 },
  { c: "Canada", route: "Express Entry", s: 61 },
];

const REQS: { r: string; ok: boolean }[] = [
  { r: "Job offer from a licensed sponsor", ok: false },
  { r: "Relevant qualification", ok: true },
  { r: "English language, level B1 or above", ok: true },
  { r: "Salary at or above the threshold", ok: false },
  { r: "Professional registration", ok: true },
];

function ScoreRing({ value }: { value: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 84 84" className="h-[84px] w-[84px]">
      <circle cx="42" cy="42" r={r} fill="none" stroke="#eef0f2" strokeWidth="8" />
      <circle
        cx="42"
        cy="42"
        r={r}
        fill="none"
        stroke="#0f4c45"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * c} ${c}`}
        transform="rotate(-90 42 42)"
      />
      <text x="42" y="47" textAnchor="middle" className="fill-[#111827] font-ui text-[20px] font-bold">
        {value}
      </text>
    </svg>
  );
}

export function CvAssessmentScreen() {
  return (
    <CrmShell active="cv">
      <PageTitle
        title="CV Assessment"
        icon={LuSparkles}
        sub="AI-powered visa pathways, job matching & PDF report"
        action={<PrimaryButton icon={LuDownload}>PDF report</PrimaryButton>}
      />
      <div className="mt-5 grid grid-cols-[1fr_300px] gap-4">
        <div className="flex min-w-0 flex-col gap-4">
          <div className={`${CARD} border-t-2 border-t-[#0f4c45] p-4`}>
            <div className="flex items-center gap-4">
              <ScoreRing value={78} />
              <div className="min-w-0">
                <p className={`${CAPS} text-[#4b5563]`}>Eligibility score</p>
                <p className={`mt-1 text-[17px] font-bold ${T_INK}`}>Kamran Yousaf · Registered nurse</p>
                <p className={`text-[12px] ${T_MUTED}`}>6 years ICU experience · BSc Nursing · IELTS 7.0 · cv_kamran_yousaf.pdf</p>
              </div>
              <span className="ml-auto self-start"><Badge kind="teal">Eligible · 3 routes</Badge></span>
            </div>
            <p className={`mt-4 mb-1.5 ${CAPS} text-[#4b5563]`}>Country ranking</p>
            <ol className="flex flex-col">
              {RANKING.map((row, i) => (
                <li key={row.c} className={`flex h-[36px] items-center gap-3 border-t ${LINE} text-[13px]`}>
                  <span className={`w-4 font-mono text-[11px] ${T_MUTED}`}>{i + 1}</span>
                  <span className={`w-[130px] font-semibold ${T_INK}`}>{row.c}</span>
                  <span className={`w-[230px] truncate text-[12px] ${T_MUTED}`}>{row.route}</span>
                  <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#f1f2f4]">
                    <span className={`${a.grow} block h-full rounded-full ${i === 0 ? "bg-[#0f4c45]" : "bg-[#7fa7a0]"}`} style={{ width: `${row.s}%`, ...at(i) }} />
                  </span>
                  <span className={`w-7 text-right font-semibold ${T_INK}`}>{row.s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Panel title="Requirements" icon={LuListChecks} meta="United Kingdom">
              <ul className="px-4 py-2">
                {REQS.map((q) => (
                  <li key={q.r} className="flex h-[27px] items-center gap-2 text-[12px]">
                    {q.ok ? (
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-[#15803d] text-white"><LuCheck className="h-2.5 w-2.5" /></span>
                    ) : (
                      <span className="h-4 w-4 rounded-full border-2 border-dashed border-[#d1d5db]" />
                    )}
                    <span className={q.ok ? T_INK : T_MUTED}>{q.r}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Missing and blockers" icon={LuCircleAlert} meta="3">
              <ul className="flex flex-col gap-2 px-4 py-3 text-[12px]">
                <li className="flex items-start gap-2">
                  <LuBan className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#dc2626]" />
                  <span><b className={T_INK}>Blocker:</b> no sponsored job offer yet. Matched roles in Job Hunting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <LuCircleAlert className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#b45309]" />
                  <span><b className={T_INK}>Missing:</b> NMC registration reference.</span>
                </li>
                <li className="flex items-start gap-2">
                  <LuCircleAlert className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#b45309]" />
                  <span><b className={T_INK}>Missing:</b> reference letter from current employer.</span>
                </li>
              </ul>
            </Panel>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`${CARD} border-t-2 border-t-[#636a77] px-4 py-3.5`}>
            <p className={`${CAPS} text-[#4b5563]`}>
              Pipeline <span className="ml-1 font-normal normal-case tracking-normal text-[#636a77]">6 steps</span>
            </p>
            <ol className="mt-2.5 flex flex-col gap-2.5">
              {CV_PIPELINE.map((p, i) => (
                <li key={p.step} className="flex items-start gap-2.5">
                  <span style={at(i + 1)} className={`${a.pop} mt-[1px] grid h-[20px] w-[20px] shrink-0 place-items-center rounded-full bg-[#0f4c45] text-white`}>
                    <LuCheck className="h-3 w-3" />
                  </span>
                  <span className="leading-tight">
                    <span className={`block text-[13px] font-semibold ${T_INK}`}>{p.step}</span>
                    <span className={`block text-[11px] ${T_MUTED}`}>{p.note}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className={`${CARD} px-4 py-3.5`}>
            <p className={`flex items-center gap-1.5 ${CAPS} ${T_TEAL}`}>
              <LuUserCheck className="h-3.5 w-3.5" /> Human check
            </p>
            <p className={`mt-1.5 text-[12px] leading-snug ${T_INK}`}>Reviewed and approved by Kinza, Assessment team.</p>
            <p className={`mt-0.5 text-[11px] ${T_MUTED}`}>Sep 26 · 2 flags resolved</p>
            <div className="mt-3">
              <GhostButton icon={LuFileText}>assessment_kamran_yousaf.pdf</GhostButton>
            </div>
          </div>
        </div>
      </div>
    </CrmShell>
  );
}

export function CvAssessmentShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/cv-assessment"
      caption="CV assessment"
      label={
        label ??
        "A completed CV assessment with sample data: an eligibility score of 78 for a registered nurse, a ranking of four countries with the best-fit visa route for each, the requirements for the top country with the ones still unmet, missing items and blockers, the six pipeline steps from parsing the CV to synthesising the report, and a human check before the PDF report is issued."
      }
      {...rest}
    >
      <CvAssessmentScreen />
    </CrmFrame>
  );
}
