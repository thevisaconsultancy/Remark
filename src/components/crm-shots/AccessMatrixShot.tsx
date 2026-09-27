import { LuShieldCheck } from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, PageTitle, PrimaryButton, Tabs } from "./parts";
import a from "./shots.module.css";
import { ADMIN_TABS } from "./VisaTypeShot";
import { CAPS, CARD, LINE, SCREEN, T_INK, T_MUTED } from "./tokens";

type Level = "E" | "V" | "-";

const PEOPLE = [
  { name: "Areeba", team: "Operations" },
  { name: "Mehwish", team: "Documentation" },
  { name: "Danish", team: "Application" },
  { name: "Saad", team: "Sales" },
  { name: "Kinza", team: "Assessment" },
];

/** Module › tab rows, with a level per person. */
const ROWS: { mod: string; tab?: string; lv: Level[] }[] = [
  { mod: "Leads", tab: "Campaigns", lv: ["E", "-", "-", "E", "-"] },
  { mod: "Leads", tab: "Form builder", lv: ["E", "-", "-", "V", "-"] },
  { mod: "Cases", tab: "Documents", lv: ["E", "E", "E", "V", "V"] },
  { mod: "Cases", tab: "Notes and timeline", lv: ["E", "E", "E", "V", "V"] },
  { mod: "Cases", tab: "Invoices", lv: ["E", "V", "-", "V", "-"] },
  { mod: "Cases", tab: "Commission", lv: ["E", "-", "-", "-", "-"] },
  { mod: "CV Assessment", lv: ["E", "V", "V", "V", "E"] },
  { mod: "Job Hunting", tab: "Sponsors", lv: ["E", "-", "V", "-", "E"] },
  { mod: "Finance", lv: ["E", "-", "-", "-", "-"] },
  { mod: "Reports", tab: "Team reports", lv: ["E", "V", "V", "V", "V"] },
  { mod: "Settings", tab: "Integrations", lv: ["E", "-", "-", "-", "-"] },
];

function Cell({ lv }: { lv: Level }) {
  if (lv === "E") return <span className="inline-flex h-[22px] w-[52px] items-center justify-center rounded-[5px] bg-[#0f4c45] text-[11px] font-semibold text-white">Edit</span>;
  if (lv === "V") return <span className="inline-flex h-[22px] w-[52px] items-center justify-center rounded-[5px] border border-[#cfe0dc] bg-[#e6eeec] text-[11px] font-semibold text-[#0f4c45]">View</span>;
  return <span className="inline-flex h-[22px] w-[52px] items-center justify-center rounded-[5px] border border-dashed border-[#d1d5db] text-[11px] text-[#9ca3af]">Off</span>;
}

export function AccessMatrixScreen() {
  return (
    <CrmShell active="settings">
      <PageTitle title="Admin" sub="Manage users, visa types, and system configuration" />
      <div className="mt-4">
        <Tabs items={ADMIN_TABS} active="Access Matrix" />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className={`flex items-center gap-1.5 text-[12px] ${T_MUTED}`}>
          <LuShieldCheck className="h-3.5 w-3.5" /> Access is set per person, down to single tabs. Administrators keep everything.
        </span>
        <span className="ml-auto flex overflow-hidden rounded-[7px] border border-[#e5e7eb] text-[12px]">
          <span className="bg-[#111827] px-3 py-[6px] font-semibold text-white">By person</span>
          <span className="px-3 py-[6px] text-[#4b5563]">By role</span>
        </span>
        <PrimaryButton>Save changes</PrimaryButton>
      </div>
      <div className={`${CARD} mt-3 overflow-hidden`}>
        <table className="w-full">
          <thead className="bg-[#fafafa]">
            <tr>
              <th className={`h-[48px] px-4 text-left ${CAPS} text-[#4b5563]`}>Module › Tab</th>
              {PEOPLE.map((p) => (
                <th key={p.name} className="px-2 text-center">
                  <span className={`block text-[13px] font-semibold ${T_INK}`}>{p.name}</span>
                  <span className={`block text-[10px] font-normal ${T_MUTED}`}>{p.team}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, ri) => (
              <tr key={r.mod + (r.tab ?? "")}>
                <td className={`h-[40px] border-t ${LINE} px-4 text-[13px]`}>
                  <span className={`font-semibold ${T_INK}`}>{r.mod}</span>
                  {r.tab && <span className={T_MUTED}> › {r.tab}</span>}
                </td>
                {r.lv.map((lv, i) => (
                  <td key={i} className={`border-t ${LINE} text-center`}>
                    <span className={`${a.pop} inline-block`} style={at((ri + i) * 0.45)}>
                      <Cell lv={lv} />
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CrmShell>
  );
}

export function AccessMatrixShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/admin/access"
      caption="Access matrix"
      label={
        label ??
        "The access matrix in the CRM's admin, with sample data: five staff members across the top and modules broken down into single tabs down the side, such as Cases documents, invoices and commission, each set to edit, view or off per person."
      }
      {...rest}
    >
      <AccessMatrixScreen />
    </CrmFrame>
  );
}
