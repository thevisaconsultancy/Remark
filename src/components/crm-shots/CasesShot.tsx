import { LuChevronDown, LuPlus, LuSearch } from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { Badge, Overdue, PageTitle, PrimaryButton, Td, Th } from "./parts";
import { SAMPLE_CASES, type CaseStatus } from "./sample";
import { CARD, LINE, SCREEN, T_FAINT, T_INK, T_MUTED } from "./tokens";

const STATUS_KIND: Record<CaseStatus, "active" | "refused" | "closed" | "approved"> = {
  Active: "active",
  Refused: "refused",
  Closed: "closed",
  Approved: "approved",
};

function Select({ children }: { children: string }) {
  return (
    <span className={`flex h-[32px] w-[160px] items-center justify-between rounded-[7px] border ${LINE} bg-white px-3 text-[12px] ${T_INK}`}>
      {children}
      <LuChevronDown className="h-3.5 w-3.5 text-[#636a77]" />
    </span>
  );
}

export function CasesScreen() {
  return (
    <CrmShell active="cases">
      <PageTitle title="Cases" tag="Cases Deep Dive" sub="48 total" action={<PrimaryButton icon={LuPlus}>New Case</PrimaryButton>} />
      <div className="mt-5 flex items-center gap-2">
        <span className={`flex h-[32px] w-[300px] items-center gap-2 rounded-[7px] border ${LINE} px-3 text-[12px] ${T_FAINT}`}>
          <LuSearch className="h-3.5 w-3.5" /> Search case no., stage or client name
        </span>
        <span className="ml-2 flex gap-1">
          {["All", "Active", "Refused", "Closed", "Approved"].map((t) => (
            <span
              key={t}
              className={`rounded-[6px] px-2.5 py-[6px] text-[12px] ${t === "All" ? "bg-[#111827] font-semibold text-white" : "bg-[#f3f4f6] text-[#4b5563]"}`}
            >
              {t}
            </span>
          ))}
        </span>
        <span className="ml-2 flex gap-2">
          <Select>All assignees</Select>
          <Select>All offices</Select>
        </span>
      </div>
      <div className={`${CARD} mt-4 overflow-hidden`}>
        <table className="w-full">
          <thead className="bg-[#fafafa]">
            <tr>
              <Th>Case</Th>
              <Th>Client</Th>
              <Th>Assignee</Th>
              <Th>Visa</Th>
              <Th>Stage</Th>
              <Th>Status</Th>
              <Th>SLA</Th>
              <Th className="text-right">Fee</Th>
              <Th>Created</Th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_CASES.map((c) => (
              <tr key={c.no}>
                <Td className={`font-mono text-[12px] font-medium ${T_INK}`}>{c.no}</Td>
                <Td className={`font-semibold ${T_INK}`}>{c.client}</Td>
                <Td>{c.assignee}</Td>
                <Td>{c.visa}</Td>
                <Td>{c.stage}</Td>
                <Td><Badge kind={STATUS_KIND[c.status]}>{c.status}</Badge></Td>
                <Td>{c.overdue ? <Overdue days={c.overdue} /> : <span className={T_FAINT}>—</span>}</Td>
                <Td className="text-right font-mono text-[12px]">{c.fee ?? <span className={T_FAINT}>—</span>}</Td>
                <Td className={T_MUTED}>{c.created}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CrmShell>
  );
}

export function CasesShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/cases"
      caption="Cases"
      label={
        label ??
        "The Cases list with sample data: case numbers by country and visa, client, assignee, current stage, status badges for active, refused, closed and approved, overdue deadline warnings and fees, filterable by status, assignee and office."
      }
      {...rest}
    >
      <CasesScreen />
    </CrmFrame>
  );
}
