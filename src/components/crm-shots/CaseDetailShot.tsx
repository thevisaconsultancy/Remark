import {
  LuCalendar,
  LuCheck,
  LuClock,
  LuFileText,
  LuHandCoins,
  LuMessageCircle,
  LuPaperclip,
  LuReceipt,
  LuSend,
  LuStickyNote,
  LuTriangleAlert,
  LuUpload,
} from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, Badge, GhostButton, Panel, Pin, PrimaryButton, Tabs } from "./parts";
import a from "./shots.module.css";
import { CARD, LINE, SCREEN, T_FAINT, T_INK, T_MUTED, T_TEAL } from "./tokens";

const STAGES = [
  "Enquiry",
  "Assessment",
  "Document collection",
  "Submission",
  "Biometrics",
  "Decision",
];
const CURRENT = 2;

const DOCS: { name: string; state: "ok" | "review" | "missing" }[] = [
  { name: "Passport, all pages", state: "ok" },
  { name: "Degree and transcripts", state: "ok" },
  { name: "Certificate of sponsorship", state: "ok" },
  { name: "English test result", state: "review" },
  { name: "Bank statement, 28 days", state: "missing" },
  { name: "TB test certificate", state: "missing" },
];

const DEADLINES = [
  { date: "Sep 26", what: "Documents complete", late: true, left: "" },
  {
    date: "Oct 09",
    what: "Biometrics appointment",
    late: false,
    left: "11 days",
  },
  { date: "Nov 15", what: "Sponsor start date", late: false, left: "48 days" },
];

const TIMELINE = [
  {
    t: "Today, 10:42",
    e: "Bank statement requested on WhatsApp",
    who: "Mehwish",
  },
  { t: "Sep 25, 16:10", e: "English test result uploaded", who: "Client form" },
  {
    t: "Sep 22, 11:05",
    e: "Stage moved to Document collection",
    who: "Mehwish",
  },
  { t: "Sep 18, 09:30", e: "Case opened from lead", who: "Saad" },
];

export function CaseDetailScreen({ pins = false }: { pins?: boolean }) {
  return (
    <>
      <CrmShell active="cases" bodyClassName="px-8 pt-5">
        <p className={`text-[12px] ${T_MUTED}`}>
          Cases <span className={T_FAINT}>/</span>{" "}
          <span className="font-mono">UK-SKW-0009</span>
        </p>
        <div className="mt-2 flex items-start">
          <div>
            <div className="flex items-center gap-2.5">
              <p
                className={`text-[22px] font-bold tracking-[-0.015em] ${T_INK}`}
              >
                Bilal Aslam
              </p>
              <Badge kind="active">Active</Badge>
              <span className={`font-mono text-[12px] ${T_MUTED}`}>
                UK-SKW-0009
              </span>
            </div>
            <p className={`mt-0.5 text-[13px] ${T_MUTED}`}>
              United Kingdom · Skilled Worker · Assigned to Mehwish · City
              office
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="inline-flex h-[32px] items-center gap-1.5 rounded-[7px] border border-[#fecaca] bg-[#fef2f2] px-3 text-[12px] font-semibold text-[#dc2626]">
              <LuTriangleAlert className="h-3.5 w-3.5" /> Documents due Sep 26 ·
              2d over
            </span>
            <PrimaryButton icon={LuSend}>Submit for sign-off</PrimaryButton>
          </div>
        </div>

        {/* Stages come from the visa type */}
        <div className="mt-4 flex items-center">
          {STAGES.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <span className="flex items-center gap-2">
                <span
                  className={`grid h-[22px] w-[22px] place-items-center rounded-full text-[10px] font-bold ${
                    i < CURRENT
                      ? "bg-[#0f4c45] text-white"
                      : i === CURRENT
                        ? "border-2 border-[#0f4c45] bg-white text-[#0f4c45]"
                        : "border border-[#d1d5db] bg-white text-[#9ca3af]"
                  }`}
                >
                  {i < CURRENT ? <LuCheck className="h-3 w-3" /> : i + 1}
                </span>
                <span
                  className={`whitespace-nowrap text-[12px] ${i === CURRENT ? `font-semibold ${T_TEAL}` : i < CURRENT ? T_INK : T_MUTED}`}
                >
                  {s}
                </span>
              </span>
              {i < STAGES.length - 1 && (
                <span className="mx-3 h-[2px] flex-1 bg-[#e5e7eb]">
                  {i < CURRENT && <span className={`${a.grow} block h-full bg-[#0f4c45]`} style={at(i * 4)} />}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Tabs
            items={[
              "Overview",
              "Documents",
              "Notes",
              "Timeline",
              "Conversations",
              "Invoices",
              "Commission",
            ]}
            active="Overview"
          />
        </div>

        <div className="mt-4 grid grid-cols-[1fr_380px] gap-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              {pins && <Pin n={1} />}
              <Panel
                title="Documents"
                icon={LuFileText}
                meta="4 of 6"
                action="Upload"
              >
                <ul className="grid grid-cols-2 gap-x-6 px-4 py-2">
                  {DOCS.map((d) => (
                    <li
                      key={d.name}
                      className={`flex h-[34px] items-center gap-2 border-b ${LINE} text-[12px] last:border-b-0 [&:nth-last-child(2)]:border-b-0`}
                    >
                      {d.state === "ok" && (
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-[#15803d] text-white">
                          <LuCheck className="h-2.5 w-2.5" />
                        </span>
                      )}
                      {d.state === "review" && (
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-[#fde68a] text-[#b45309]">
                          <LuClock className="h-2.5 w-2.5" />
                        </span>
                      )}
                      {d.state === "missing" && (
                        <span className="h-4 w-4 rounded-full border-2 border-dashed border-[#d1d5db]" />
                      )}
                      <span className={d.state === "missing" ? T_MUTED : T_INK}>
                        {d.name}
                      </span>
                      <span className="ml-auto">
                        {d.state === "ok" && (
                          <LuPaperclip className={`h-3 w-3 ${T_FAINT}`} />
                        )}
                        {d.state === "review" && (
                          <Badge kind="amber">In review</Badge>
                        )}
                        {d.state === "missing" && (
                          <LuUpload className={`h-3 w-3 ${T_FAINT}`} />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
            <div className="relative">
              {pins && <Pin n={7} />}
              <Panel
                title="Conversations"
                icon={LuMessageCircle}
                meta="WhatsApp · Email"
              >
                <div className="flex flex-col gap-2 px-4 py-3">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 rounded-[4px] bg-[#e6eeec] px-1.5 text-[10px] font-semibold text-[#0f4c45]">
                      WA
                    </span>
                    <p className="text-[12px] leading-snug">
                      <b className={T_INK}>Mehwish:</b> Salam Bilal, please
                      share the last 28 days of your bank statement so we can
                      close document collection.
                      <span className={`ml-1 ${T_FAINT}`}>10:42</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 rounded-[4px] bg-[#f3f4f6] px-1.5 text-[10px] font-semibold text-[#4b5563]">
                      EM
                    </span>
                    <p className="text-[12px] leading-snug">
                      <b className={T_INK}>Bilal:</b> Test result attached. Bank
                      statement by Monday.
                      <span className={`ml-1 ${T_FAINT}`}>Sep 25</span>
                    </p>
                  </div>
                </div>
              </Panel>
            </div>
            <div className="relative">
              {pins && <Pin n={3} />}
              <Panel title="Deadlines" icon={LuCalendar} meta="3">
                <ul className="px-4 py-1.5">
                  {DEADLINES.map((d) => (
                    <li
                      key={d.what}
                      className={`flex h-[34px] items-center gap-3 border-b ${LINE} text-[12px] last:border-b-0`}
                    >
                      <span
                        className={`w-[52px] font-mono text-[11px] ${d.late ? "font-semibold text-[#dc2626]" : T_MUTED}`}
                      >
                        {d.date}
                      </span>
                      <span className={T_INK}>{d.what}</span>
                      <span className="ml-auto">
                        {d.late ? (
                          <Badge kind="refused" icon={LuTriangleAlert}>
                            2d over
                          </Badge>
                        ) : (
                          <Badge kind="outline">{d.left}</Badge>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              {pins && <Pin n={4} />}
              <Panel title="Timeline" icon={LuClock} action="Add note">
                <ol className="relative px-4 py-3">
                  <span className="absolute top-5 bottom-5 left-[21px] w-px bg-[#e5e7eb]" />
                  {TIMELINE.map((ev, i) => (
                    <li
                      key={ev.t}
                      className="relative flex gap-3 pb-2.5 last:pb-0"
                    >
                      <span
                        className={`relative z-[1] mt-1 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${i === 0 ? "border-[#0f4c45] bg-[#0f4c45]" : "border-[#cbd5d3] bg-white"}`}
                      />
                      <span className="min-w-0 leading-tight">
                        <span className={`block text-[12px] ${T_INK}`}>
                          {ev.e}
                        </span>
                        <span className={`block text-[11px] ${T_MUTED}`}>
                          {ev.t} · {ev.who}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
                <div
                  className={`relative mx-4 mb-3 flex items-start gap-2 rounded-[7px] bg-[#fffbeb] py-2 pr-10 pl-3 text-[11px] leading-snug text-[#92400e]`}
                >
                  <LuStickyNote className="mt-[1px] h-3 w-3 shrink-0" /> Note:
                  sponsor asked for start date before Nov 15.
                  {pins && <Pin n={2} x={310} y={2} />}
                </div>
              </Panel>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`relative ${CARD} px-3.5 py-3`}>
                {pins && <Pin n={6} />}
                <p
                  className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4b5563]`}
                >
                  <LuReceipt className="h-3.5 w-3.5" /> Invoice
                </p>
                <p
                  className={`mt-1.5 font-mono text-[14px] font-semibold ${T_INK}`}
                >
                  PKR 160,000
                </p>
                <span className="mt-2 block h-[6px] overflow-hidden rounded-full bg-[#f1f2f4]">
                  <span className="block h-full w-[62%] rounded-full bg-[#15803d]" />
                </span>
                <p className={`mt-1.5 text-[11px] ${T_MUTED}`}>
                  Paid 100,000 · Due 60,000
                </p>
              </div>
              <div className={`relative ${CARD} px-3.5 py-3`}>
                {pins && <Pin n={5} />}
                <p
                  className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4b5563]`}
                >
                  <LuHandCoins className="h-3.5 w-3.5" /> Commission
                </p>
                <p
                  className={`mt-1.5 font-mono text-[14px] font-semibold ${T_INK}`}
                >
                  PKR 8,000
                </p>
                <p className={`mt-2 text-[11px] leading-snug ${T_MUTED}`}>
                  Mehwish · 5% of fee
                  <br />
                  Released on payment
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <GhostButton icon={LuReceipt}>New invoice</GhostButton>
              <GhostButton icon={LuSend}>Record payment</GhostButton>
            </div>
          </div>
        </div>
      </CrmShell>
    </>
  );
}

export function CaseDetailShot({
  label,
  pins = false,
  ...rest
}: ShotProps & { pins?: boolean }) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/cases/UK-SKW-0009"
      caption="A case"
      label={
        label ??
        "A single case in the CRM with sample data: a United Kingdom skilled worker case at the document collection stage, with a stage tracker, an overdue document deadline, a document checklist, WhatsApp and email conversations, a timeline with notes, an invoice with payments against the balance, and the assigned employee's commission."
      }
      {...rest}
    >
      <CaseDetailScreen pins={pins} />
    </CrmFrame>
  );
}
