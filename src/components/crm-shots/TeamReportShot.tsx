import {
  LuBan,
  LuCheck,
  LuCircleAlert,
  LuImage,
  LuListChecks,
  LuMessageCircle,
  LuPaperclip,
  LuSheet,
  LuTrendingUp,
  LuUserCheck,
} from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, Badge, GhostButton, PageTitle, Panel, PrimaryButton, Tabs } from "./parts";
import a from "./shots.module.css";
import { CAPS, CARD, LINE, SCREEN, T_INK, T_MUTED, T_TEAL } from "./tokens";

const MEMBERS = [
  { n: "Mehwish", t: "Documentation", s: "Submitted", on: true },
  { n: "Danish", t: "Application", s: "Submitted" },
  { n: "Saad", t: "Sales", s: "Submitted" },
  { n: "Kinza", t: "Assessment", s: "Pending" },
  { n: "Hassan", t: "Front desk", s: "Pending" },
];

const TASKS: [string, boolean][] = [
  ["Chase bank statement, UK-SKW-0009", true],
  ["Verify translations, CA-VIS-0011", true],
  ["Book biometrics, UK-SKW-0008", true],
  ["Upload TB certificate, NZ-WRK-0013", false],
];

export function TeamReportScreen() {
  return (
    <CrmShell active="team">
      <PageTitle title="Team" sub="Daily tasks, contributions and reports" action={<PrimaryButton>New report</PrimaryButton>} />
      <div className="mt-4">
        <Tabs items={["Today", "Tasks", "Reports", "Issues", "Blockers"]} active="Today" />
      </div>
      <div className="mt-4 grid grid-cols-[230px_1fr] gap-4">
        <div className="flex flex-col gap-4">
        <div className={`${CARD} overflow-hidden`}>
          <p className={`border-b ${LINE} px-3 py-2.5 ${CAPS} text-[#4b5563]`}>Mon, Sep 28</p>
          {MEMBERS.map((m) => (
            <div key={m.n} className={`flex h-[50px] items-center gap-2.5 border-b ${LINE} px-3 last:border-b-0 ${m.on ? "bg-[#f1f6f5]" : ""}`}>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#e5e7eb] text-[11px] font-semibold text-[#374151]">{m.n[0]}</span>
              <span className="leading-tight">
                <span className={`block text-[13px] font-semibold ${m.on ? T_TEAL : T_INK}`}>{m.n}</span>
                <span className={`block text-[11px] ${T_MUTED}`}>{m.t}</span>
              </span>
              <span className="ml-auto">
                <Badge kind={m.s === "Submitted" ? "active" : "closed"}>{m.s}</Badge>
              </span>
            </div>
          ))}
        </div>
        <div className={`${CARD} px-3 py-3`}>
          <p className={`flex items-center gap-1.5 ${CAPS} ${T_TEAL}`}>
            <LuMessageCircle className="h-3.5 w-3.5" /> Daily report
          </p>
          <p className={`mt-1.5 text-[12px] leading-snug ${T_INK}`}>Sent to admins and managers on WhatsApp via Twilio.</p>
          <p className={`mt-1 text-[11px] ${T_MUTED}`}>Today 18:10 · Areeba, Usman</p>
        </div>
        </div>

        <div className={`${CARD} self-start border-t-2 border-t-[#0f4c45] p-4`}>
          <div className="flex items-center gap-2.5">
            <p className={`text-[17px] font-bold ${T_INK}`}>Mehwish · Daily report</p>
            <Badge kind="teal">Documentation</Badge>
            <span className={`ml-auto text-[12px] ${T_MUTED}`}>Submitted 18:05</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Panel title="Tasks" icon={LuListChecks} meta="3 of 4">
              <ul className="px-3 py-2">
                {TASKS.map(([t, d], i) => (
                  <li key={t} className="flex h-[26px] items-center gap-2 text-[12px]">
                    {d ? (
                      <span style={at(i + 2)} className={`${a.pop} grid h-4 w-4 place-items-center rounded-[4px] bg-[#0f4c45] text-white`}><LuCheck className="h-2.5 w-2.5" /></span>
                    ) : (
                      <span className="h-4 w-4 rounded-[4px] border-2 border-[#d1d5db]" />
                    )}
                    <span className={d ? T_INK : T_MUTED}>{t}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Contributions" icon={LuTrendingUp}>
              <ul className="flex flex-col gap-1.5 px-3 py-2.5 text-[12px]">
                <li><b className={T_INK}>5</b> documents collected across 3 cases</li>
                <li><b className={T_INK}>2</b> cases moved to Submission</li>
                <li><b className={T_INK}>11</b> client messages answered on WhatsApp</li>
              </ul>
            </Panel>
            <Panel title="Issues" icon={LuCircleAlert} meta="1">
              <p className="px-3 py-2.5 text-[12px] leading-snug">Embassy portal slow after 4 pm; two uploads retried.</p>
            </Panel>
            <Panel title="Blockers" icon={LuBan} meta="1">
              <p className="px-3 py-2.5 text-[12px] leading-snug">
                <span className="font-semibold text-[#dc2626]">NZ-WRK-0013:</span> clinic has no TB test slot until Oct 6.
              </p>
            </Panel>
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <span className="inline-flex h-[30px] items-center gap-1.5 rounded-[7px] border border-[#cfe0dc] bg-[#f1f6f5] px-3 text-[12px] font-semibold text-[#0f4c45]">
              <LuSheet className="h-3.5 w-3.5" /> Documentation tracker, September
            </span>
            <span className={`inline-flex h-[30px] items-center gap-1.5 rounded-[7px] border ${LINE} px-3 text-[12px] text-[#374151]`}>
              <LuImage className="h-3.5 w-3.5" /> portal-upload.png
            </span>
            <span className={`inline-flex h-[30px] items-center gap-1.5 rounded-[7px] border ${LINE} px-3 text-[12px] text-[#374151]`}>
              <LuPaperclip className="h-3.5 w-3.5" /> clinic-reply.pdf
            </span>
          </div>
          <div className={`mt-4 flex items-center gap-3 rounded-[8px] border border-[#cfe0dc] bg-[#f1f6f5] px-3.5 py-2.5`}>
            <LuUserCheck className={`h-4 w-4 ${T_TEAL}`} />
            <span className="text-[12px] leading-snug">
              <b className={T_INK}>Manager sign-off</b>
              <span className={`block text-[11px] ${T_MUTED}`}>Requested from Areeba on WhatsApp · 18:11</span>
            </span>
            <span className="ml-auto flex gap-2">
              <GhostButton>Send back</GhostButton>
              <PrimaryButton icon={LuCheck}>Approve</PrimaryButton>
            </span>
          </div>
        </div>
      </div>
    </CrmShell>
  );
}

export function TeamReportShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/team"
      caption="Team, daily report"
      label={
        label ??
        "The Team page with sample data: who has submitted today's report, and one team member's daily report with tasks done and pending, contributions, an issue, a blocker on a case, a linked Google Sheet, and attached screenshots and files."
      }
      {...rest}
    >
      <TeamReportScreen />
    </CrmFrame>
  );
}
