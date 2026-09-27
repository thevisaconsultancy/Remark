import { CrmFrame, type ShotProps } from "./CrmFrame";

const ROWS = [
  ["1", "United Kingdom", "Health and Care Worker", "82"],
  ["2", "Ireland", "Critical Skills Employment Permit", "74"],
  ["3", "New Zealand", "Skilled Migrant Category", "69"],
  ["4", "Canada", "Express Entry", "61"],
];

function Line({ w }: { w: string }) {
  return <span className="block h-[6px] rounded-full bg-[#e9ebee]" style={{ width: w }} />;
}

export function AssessmentReportPage() {
  return (
    <div className="flex h-full flex-col bg-white px-10 pt-10 pb-8 font-ui text-[#1f2937] [font-variant-numeric:tabular-nums]">
      <div className="flex items-center gap-2.5 border-b-2 border-[#0f4c45] pb-4">
        <span className="grid h-[28px] w-[28px] place-items-center rounded-full bg-[#0f4c45] text-[12px] font-bold text-white">V</span>
        <span className="leading-tight">
          <span className="block text-[13px] font-bold text-[#111827]">The Visa Consultancy</span>
          <span className="block text-[10px] uppercase tracking-[0.12em] text-[#636a77]">CV assessment report</span>
        </span>
        <span className="ml-auto text-right font-mono text-[10px] leading-tight text-[#636a77]">
          Ref CVA-0417
          <br />
          Sep 26
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#636a77]">Candidate</p>
          <p className="mt-1 text-[20px] font-bold text-[#111827]">Kamran Yousaf</p>
          <p className="text-[11px] text-[#636a77]">Registered nurse · 6 years ICU</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#636a77]">Eligibility</p>
          <p className="text-[34px] font-bold leading-none text-[#0f4c45]">
            78<span className="text-[14px] text-[#9ca3af]">/100</span>
          </p>
        </div>
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#374151]">Recommended countries</p>
      <table className="mt-2 w-full text-[11px]">
        <tbody>
          {ROWS.map(([n, c, r, s]) => (
            <tr key={c} className="border-t border-[#eef0f2]">
              <td className="h-[28px] w-5 font-mono text-[#9ca3af]">{n}</td>
              <td className="font-semibold text-[#111827]">{c}</td>
              <td className="text-[#636a77]">{r}</td>
              <td className="text-right font-semibold">{s}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#374151]">Requirements, United Kingdom</p>
      <div className="mt-3 flex flex-col gap-2.5">
        <Line w="88%" />
        <Line w="72%" />
        <Line w="80%" />
        <Line w="64%" />
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#374151]">Missing items and blockers</p>
      <div className="mt-3 flex flex-col gap-2.5">
        <Line w="76%" />
        <Line w="58%" />
      </div>

      <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#374151]">Suggested job titles</p>
      <p className="mt-2 text-[11px] text-[#374151]">Staff Nurse (ICU) · Critical Care Nurse · Registered Nurse, Adult</p>

      <div className="mt-auto flex items-center justify-between border-t border-[#e5e7eb] pt-3 text-[10px] text-[#636a77]">
        <span>Reviewed by Kinza, Assessment team</span>
        <span className="font-mono">Page 1 of 3</span>
      </div>
    </div>
  );
}

export function AssessmentReportShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={560}
      height={792}
      caption="Assessment report, PDF"
      radius={3}
      frameClassName="shadow-[0_30px_70px_-25px_rgba(20,10,8,0.5)] ring-1 ring-black/10"
      label={
        label ??
        "The first page of a CV assessment PDF report with sample data: the candidate, an eligibility score of 78 out of 100, recommended countries with visa routes and scores, sections for requirements, missing items and blockers, suggested job titles, and the name of the person who reviewed it."
      }
      {...rest}
    >
      <AssessmentReportPage />
    </CrmFrame>
  );
}
