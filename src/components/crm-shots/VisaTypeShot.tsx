import { LuFileText, LuFolderPlus, LuGripVertical, LuInfo, LuPlus } from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, Badge, PageTitle, Panel, PrimaryButton, Tabs } from "./parts";
import a from "./shots.module.css";
import { CARD, LINE, SCREEN, T_INK, T_MUTED, T_TEAL } from "./tokens";

export const ADMIN_TABS = [
  "Users",
  "Access Matrix",
  "Attendance",
  "Branches",
  "Handlers",
  "Visa Types",
  "Settings",
  "Integrations",
  "Audit",
  "Retention",
  "Junk box",
];

const TYPES = [
  { c: "United Kingdom", t: "Skilled Worker", code: "UK-SKW", on: true },
  { c: "Canada", t: "Visitor visa", code: "CA-VIS" },
  { c: "Australia", t: "Student visa", code: "AU-STU" },
  { c: "New Zealand", t: "Skilled Migrant", code: "NZ-WRK" },
  { c: "Germany", t: "Opportunity Card", code: "DE-OPP" },
  { c: "Ireland", t: "Critical Skills", code: "IE-CSP" },
  { c: "Canada", t: "Study permit", code: "CA-STU" },
  { c: "United Kingdom", t: "Student visa", code: "UK-STU" },
  { c: "Greece", t: "Schengen visit", code: "GR-VIS" },
  { c: "Australia", t: "Skilled Independent", code: "AU-SKI" },
];

const STAGES = [
  ["Enquiry", "1 day"],
  ["Assessment", "3 days"],
  ["Document collection", "7 days"],
  ["Submission", "2 days"],
  ["Biometrics", "5 days"],
  ["Decision", "—"],
];

const DOCS: [string, boolean][] = [
  ["Passport, all pages", true],
  ["Certificate of sponsorship", true],
  ["Degree and transcripts", true],
  ["English test result", true],
  ["Bank statement, 28 days", true],
  ["TB test certificate", true],
  ["Police certificate", false],
  ["Reference letters", false],
];

export function VisaTypeScreen() {
  return (
    <CrmShell active="settings">
      <PageTitle title="Admin" sub="Manage users, visa types, and system configuration" />
      <div className="mt-4">
        <Tabs items={ADMIN_TABS} active="Visa Types" />
      </div>
      <div className="mt-4 grid grid-cols-[270px_1fr] gap-4">
        <div className={`${CARD} overflow-hidden`}>
          <div className={`flex h-[42px] items-center border-b ${LINE} px-3`}>
            <span className={`text-[12px] font-semibold ${T_INK}`}>12 visa types</span>
            <span className="ml-auto"><PrimaryButton icon={LuPlus}>Add</PrimaryButton></span>
          </div>
          {TYPES.map((v) => (
            <div
              key={v.code}
              className={`flex h-[52px] items-center gap-2.5 border-b ${LINE} px-3 last:border-b-0 ${v.on ? "bg-[#f1f6f5]" : ""}`}
            >
              {v.on && <span className="-ml-3 mr-0.5 h-full w-[3px] bg-[#0f4c45]" />}
              <span className="min-w-0 leading-tight">
                <span className={`block text-[13px] font-semibold ${v.on ? T_TEAL : T_INK}`}>{v.c}</span>
                <span className={`block text-[11px] ${T_MUTED}`}>{v.t}</span>
              </span>
              <span className={`ml-auto font-mono text-[10px] ${T_MUTED}`}>{v.code}</span>
            </div>
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <p className={`text-[17px] font-bold ${T_INK}`}>United Kingdom · Skilled Worker</p>
            <Badge kind="active">Live</Badge>
            <span className={`ml-auto flex items-center gap-1.5 text-[12px] ${T_MUTED}`}>
              <LuInfo className="h-3.5 w-3.5" /> New cases on this type start with these stages and documents
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Panel title="Stages" meta="6" action="Add stage" accent>
              <ol className="px-3 py-2">
                {STAGES.map(([s, sla], i) => (
                  <li key={s} style={at(i)} className={`${a.rise} flex h-[36px] items-center gap-2 border-b ${LINE} text-[13px] last:border-b-0`}>
                    <LuGripVertical className="h-3.5 w-3.5 text-[#d1d5db]" />
                    <span className="grid h-[20px] w-[20px] place-items-center rounded-full bg-[#e6eeec] text-[10px] font-bold text-[#0f4c45]">{i + 1}</span>
                    <span className={T_INK}>{s}</span>
                    <span className={`ml-auto text-[11px] ${T_MUTED}`}>SLA {sla}</span>
                  </li>
                ))}
              </ol>
            </Panel>
            <Panel title="Documents" icon={LuFileText} meta="8" action="Add document" accent>
              <ul className="px-3 py-2">
                {DOCS.map(([d, req], i) => (
                  <li key={d} className="flex h-[27px] items-center gap-2 text-[12px]">
                    <span style={at(i + 2)} className={`${a.pop} h-[14px] w-[14px] rounded-[4px] border-2 ${req ? "border-[#0f4c45] bg-[#0f4c45]" : "border-[#d1d5db] bg-white"}`} />
                    <span className={T_INK}>{d}</span>
                    <span className={`ml-auto text-[10px] font-semibold uppercase tracking-[0.06em] ${req ? T_TEAL : T_MUTED}`}>
                      {req ? "Required" : "If asked"}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          <div className={`${CARD} flex items-center gap-4 border-l-[3px] border-l-[#0f4c45] px-4 py-3`}>
            <span className={`grid h-9 w-9 place-items-center rounded-[8px] bg-[#e6eeec] ${T_TEAL}`}>
              <LuFolderPlus className="h-4 w-4" />
            </span>
            <span className="leading-snug">
              <span className={`block text-[13px] font-semibold ${T_INK}`}>Next case on this type</span>
              <span className={`block text-[12px] ${T_MUTED}`}>
                UK-SKW-0010 opens at Enquiry, with 6 stages and 8 documents already on it.
              </span>
            </span>
            <span className={`ml-auto text-[11px] ${T_MUTED}`}>Used by 9 open cases</span>
          </div>
        </div>
      </div>
    </CrmShell>
  );
}

export function VisaTypeShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/admin/visa-types"
      caption="Visa type library"
      label={
        label ??
        "The visa type library in the CRM's admin, with sample data: a list of visa types by country, and the United Kingdom skilled worker type open, showing its six stages with a time limit each and its eight required or conditional documents, which every new case on that type starts with."
      }
      {...rest}
    >
      <VisaTypeScreen />
    </CrmFrame>
  );
}
