import {
  LuCircleCheck,
  LuFilter,
  LuFolderOpen,
  LuMegaphone,
  LuRotateCcw,
  LuSparkles,
  LuTriangleAlert,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, Panel, StatCard, Td, Th } from "./parts";
import a from "./shots.module.css";
import { SAMPLE_CAMPAIGNS } from "./sample";
import { CAPS, CARD, LINE, SCREEN, T_INK, T_MUTED, T_TEAL } from "./tokens";

const FUNNEL = [
  { stage: "New", n: 14 },
  { stage: "Contacted", n: 21 },
  { stage: "Qualified", n: 12 },
  { stage: "Converted", n: 31 },
  { stage: "Lost", n: 9 },
];

const STATS = [
  { label: "Active", value: "9", note: "4 opened this month", icon: LuFolderOpen, tone: "teal" as const },
  { label: "Approvals", value: "2", note: "awaiting sign-off", icon: LuCircleCheck },
  { label: "Blockers", value: "1", note: "bounced for rework", icon: LuRotateCcw },
  { label: "Clients", value: "14", note: "5 new this month", icon: LuUsers },
  { label: "Leads", value: "21", note: "31 converted", icon: LuUserPlus },
  { label: "Assessments", value: "6", note: "this month", icon: LuSparkles },
];

/** The dashboard's canvas, without a frame (for compositions). */
export function DashboardScreen() {
  return (
    <CrmShell active="dashboard">
      <div className="flex items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <p className={`text-[24px] font-bold tracking-[-0.015em] ${T_INK}`}>Good morning, Areeba</p>
            <span className={`inline-flex items-center gap-1 rounded-[6px] bg-[#e6eeec] px-2 py-[3px] text-[11px] font-semibold ${T_TEAL}`}>
              <LuSparkles className="h-3 w-3" /> Full CRM Lifecycle
            </span>
          </div>
          <p className={`mt-0.5 text-[13px] ${T_MUTED}`}>Monday, Sep 28</p>
        </div>
        <p className={`ml-auto flex gap-4 text-[12px] ${T_MUTED}`}>
          <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#15803d]" />9 active</span>
          <span className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#0f4c45]" />14 clients</span>
        </p>
      </div>

      <div className={`${CARD} mt-5`}>
        <div className={`flex h-[40px] items-center gap-2 border-b ${LINE} px-4`}>
          <LuTriangleAlert className="h-3.5 w-3.5 text-[#374151]" />
          <span className={`${CAPS} text-[#1f2937]`}>Needs you</span>
          <span className={`ml-auto text-[11px] ${T_MUTED}`}>5 across 2 queues</span>
        </div>
        <div className="grid grid-cols-2 gap-3 p-3">
          <div className="flex items-center gap-3 rounded-[8px] border border-[#fecaca] bg-[#fef2f2] px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-[7px] bg-white text-[#dc2626]"><LuTriangleAlert className="h-4 w-4" /></span>
            <span>
              <span className="block text-[13px]"><b className="mr-1 text-[18px] text-[#dc2626]">3</b> Overdue</span>
              <span className={`block text-[11px] ${T_MUTED}`}>UK-SKW-0009, NZ-WRK-0013, NZ-WRK-0012</span>
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-[8px] border border-[#cfe0dc] bg-[#f1f6f5] px-4 py-3">
            <span className={`grid h-8 w-8 place-items-center rounded-[7px] bg-white ${T_TEAL}`}><LuCircleCheck className="h-4 w-4" /></span>
            <span>
              <span className="block text-[13px]"><b className={`mr-1 text-[18px] ${T_TEAL}`}>2</b> Awaiting sign-off</span>
              <span className={`block text-[11px] ${T_MUTED}`}>CA-VIS-0011, UK-SKW-0008</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-6 gap-3">
        {STATS.map((st, i) => (
          <div key={st.label} className={a.rise} style={at(i + 2)}>
            <StatCard {...st} />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <Panel title="Campaigns" icon={LuMegaphone} action="Campaigns">
          <table className="w-full">
            <thead>
              <tr><Th>Campaign</Th><Th className="text-right">Fills</Th><Th className="text-right">Converted</Th></tr>
            </thead>
            <tbody>
              {SAMPLE_CAMPAIGNS.slice(0, 3).map((c) => (
                <tr key={c.name}>
                  <Td className="h-[40px]">{c.name}</Td>
                  <Td className="h-[40px] text-right">{c.fills}</Td>
                  <Td className="h-[40px] text-right">
                    <span className="font-semibold text-[#15803d]">{c.converted}</span>{" "}
                    <span className={`ml-1 rounded-full bg-[#f3f4f6] px-1.5 text-[10px] ${T_MUTED}`}>{Math.round((c.converted / c.fills) * 100)}%</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
        <Panel title="Leads" icon={LuFilter} meta="87" action="View all">
          <div className="flex flex-col gap-2.5 px-4 py-3.5">
            {FUNNEL.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-3 text-[12px]">
                <span className={`w-[70px] ${T_MUTED}`}>{f.stage}</span>
                <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#f1f2f4]">
                  <span
                    className={`${a.grow} block h-full rounded-full ${f.stage === "Converted" ? "bg-[#15803d]" : f.stage === "Lost" ? "bg-[#d1d5db]" : "bg-[#0f4c45]"}`}
                    style={{ width: `${(f.n / 31) * 100}%`, ...at(i + 6) }}
                  />
                </span>
                <span className={`w-6 text-right font-semibold ${f.stage === "Converted" ? "text-[#15803d]" : T_INK}`}>{f.n}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </CrmShell>
  );
}

export function DashboardShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/dashboard"
      caption="Dashboard"
      label={
        label ??
        "The CRM dashboard for The Visa Consultancy, with sample data: a Needs you panel flagging three overdue cases and two awaiting sign-off, counters for active cases, approvals, blockers, clients, leads and assessments, a campaigns table with fills and conversions, and a lead funnel from new to converted."
      }
      {...rest}
    >
      <DashboardScreen />
    </CrmFrame>
  );
}
