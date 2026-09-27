import { LuCopy, LuFileText, LuGripVertical, LuLink, LuPlus, LuUpload } from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, Badge, PageTitle, Panel, PrimaryButton, Tabs, Td, Th } from "./parts";
import a from "./shots.module.css";
import { SAMPLE_CAMPAIGNS, SAMPLE_LEADS, type SampleLead } from "./sample";
import { CAPS, CARD, LINE, SCREEN, T_INK, T_MUTED, T_TEAL } from "./tokens";

const STATUS: Record<SampleLead["status"], "teal" | "outline" | "amber" | "active" | "closed"> = {
  New: "teal",
  Contacted: "outline",
  Qualified: "amber",
  Converted: "active",
  Lost: "closed",
};

const FIELDS: [string, boolean, boolean?][] = [
  ["Full name", true],
  ["WhatsApp number", true],
  ["Email", false],
  ["Current job title", true],
  ["Years of experience", true],
  ["CV upload", true, true],
];

export function LeadsScreen() {
  return (
    <CrmShell active="leads">
      <PageTitle title="Leads" sub="87 leads from 4 campaigns" action={<PrimaryButton icon={LuPlus}>New campaign</PrimaryButton>} />
      <div className="mt-4 grid grid-cols-4 gap-3">
        {SAMPLE_CAMPAIGNS.map((c, i) => (
          <div key={c.name} className={`${CARD} border-t-2 ${i === 0 ? "border-t-[#0f4c45]" : "border-t-[#d1d5db]"} px-3.5 py-3`}>
            <p className={`truncate text-[12px] font-semibold ${i === 0 ? T_TEAL : T_INK}`}>{c.name}</p>
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className={`text-[22px] font-bold leading-none ${T_INK}`}>{c.fills}</span>
              <span className={`text-[11px] ${T_MUTED}`}>fills</span>
              <span className="ml-auto text-[12px] font-semibold text-[#15803d]">{c.converted} converted</span>
            </p>
            <span className="mt-2.5 block h-[5px] overflow-hidden rounded-full bg-[#f1f2f4]">
              <span className={`${a.grow} block h-full rounded-full bg-[#15803d]`} style={{ width: `${(c.converted / c.fills) * 100}%`, ...at(i) }} />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1fr_300px] gap-4">
        <div className="min-w-0">
          <Tabs items={["All", "New", "Contacted", "Qualified", "Converted", "Lost"]} active="All" />
          <div className={`${CARD} mt-3 overflow-hidden`}>
            <table className="w-full">
              <thead className="bg-[#fafafa]">
                <tr>
                  <Th>Name</Th>
                  <Th>Campaign</Th>
                  <Th>Destination</Th>
                  <Th>Status</Th>
                  <Th>Owner</Th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_LEADS.map((l, i) => (
                  <tr key={l.name} className={a.rise} style={at(i + 2)}>
                    <Td className="h-[48px]">
                      <span className={`block font-semibold ${T_INK}`}>{l.name}</span>
                      <span className={`block text-[11px] ${T_MUTED}`}>{l.when}</span>
                    </Td>
                    <Td className="h-[48px] text-[12px]">{l.campaign}</Td>
                    <Td className="h-[48px] text-[12px]">{l.country}</Td>
                    <Td className="h-[48px]"><Badge kind={STATUS[l.status]}>{l.status}</Badge></Td>
                    <Td className="h-[48px] text-[12px]">{l.owner}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Panel title="Campaign form" icon={LuFileText} className="self-start" accent>
          <div className="px-4 pt-3">
            <p className={`text-[13px] font-semibold ${T_INK}`}>Canada work permit webinar</p>
            <span className={`mt-2 flex h-[30px] items-center gap-2 rounded-[7px] border ${LINE} bg-[#fafafa] px-2.5 font-mono text-[11px] text-[#374151]`}>
              <LuLink className="h-3 w-3 shrink-0" /> /f/canada-webinar
              <LuCopy className="ml-auto h-3 w-3 text-[#9ca3af]" />
            </span>
          </div>
          <p className={`mt-3 px-4 ${CAPS} text-[10px] text-[#4b5563]`}>Fields</p>
          <ul className="px-3 pt-1 pb-3">
            {FIELDS.map(([f, req, file]) => (
              <li key={f} className={`flex h-[32px] items-center gap-2 border-b ${LINE} text-[12px] last:border-b-0`}>
                <LuGripVertical className="h-3.5 w-3.5 text-[#d1d5db]" />
                {file && <LuUpload className="h-3 w-3 text-[#636a77]" />}
                <span className={T_INK}>{f}</span>
                <span className={`ml-auto text-[10px] font-semibold uppercase tracking-[0.06em] ${req ? T_TEAL : T_MUTED}`}>
                  {req ? "Required" : "Optional"}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </CrmShell>
  );
}

export function LeadsShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/leads"
      caption="Leads and campaigns"
      label={
        label ??
        "The Leads page with sample data: four form campaigns, each with its fills and conversions, a list of leads showing the campaign each came from, destination country, status from new to converted or lost, and owner, and a custom campaign form with its own link and required and optional fields including a CV upload."
      }
      {...rest}
    >
      <LeadsScreen />
    </CrmFrame>
  );
}
