import { ProductCanvas } from "./ProductCanvas";
import styles from "./products.module.css";

// The client CRM's own accent (dark teal), used only inside this product image.
const TEAL = "#0f4c45";
const TEAL_SOFT = "#e3eeec";

const NAV = [
  "Dashboard",
  "Leads",
  "Clients",
  "Cases",
  "Pipeline",
  "CV Assessment",
  "Job Hunting",
  "Finance",
  "Reports",
  "Settings",
  "Team",
];

const KPIS = [
  ["New leads", "48", "this week"],
  ["Active cases", "126", "across 9 visa types"],
  ["Assessments due", "9", "before Friday"],
  ["Fees collected", "Rs 1.2M", "this month"],
];

const STAGES: [string, number][] = [
  ["Enquiry", 64],
  ["Assessed", 41],
  ["Documents", 29],
  ["Filed", 18],
  ["Decision", 11],
];

const LEADS = [
  ["Hira Malik", "Student visa", "Website", "Assessed"],
  ["Usman Tariq", "Skilled worker", "Referral", "Documents"],
  ["Ayesha Noor", "Visit visa", "Facebook", "Enquiry"],
  ["Bilal Ahmed", "Spouse visa", "Walk-in", "Filed"],
];

// One simple line glyph per module, drawn on a 14px grid.
const ICONS: Record<string, string> = {
  Dashboard: "M2 2h4v5H2zM8 2h4v3H8zM8 7h4v5H8zM2 9h4v3H2z",
  Leads: "M2 3h10L8 8v4L6 11V8z",
  Clients: "M7 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2.5 12.5a4.5 4.5 0 019 0",
  Cases: "M2 4h10v8H2zM5 4V2h4v2",
  Pipeline: "M2 3h10M2 7h7M2 11h4",
  "CV Assessment": "M3 1.5h6l2.5 2.5v8.5H3zM5 7l1.5 1.5L9.5 5.5",
  "Job Hunting": "M6 10.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM9.5 9.5L12.5 12.5",
  Finance: "M2 11l3.5-4 2.5 2.5L12 4M9 4h3v3",
  Reports: "M2 12V6M6 12V2M10 12V8",
  Settings: "M7 9a2 2 0 100-4 2 2 0 000 4zM7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M2.8 11.2l1.4-1.4M9.8 4.2l1.4-1.4",
  Team: "M5 6a2 2 0 100-4 2 2 0 000 4zM10 6.5a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2zM1.5 12a3.5 3.5 0 017 0M9 9a3 3 0 013.5 3",
};

function NavIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

/** CRM and ERP: a white dashboard in a browser window, sample data throughout. */
export function CrmProduct({ label }: { label: string }) {
  const max = STAGES[0][1];
  return (
    <ProductCanvas w={1200} h={760} label={label}>
      <div className={`${styles.device} absolute inset-[10px] overflow-hidden rounded-[14px] bg-white text-[#16211f]`}>
        {/* Window bar */}
        <div className="flex h-[40px] items-center gap-[7px] border-b border-[#e8ecea] bg-[#f6f7f6] px-[16px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-[11px] rounded-full bg-[#d9dedc]" />
          ))}
          <span className="mx-auto flex h-[24px] w-[340px] items-center justify-center rounded-[6px] bg-white text-[12px] text-[#5b6865] ring-1 ring-[#e8ecea]">
            crm.yourfirm.example/dashboard
          </span>
          <span className="w-[50px]" />
        </div>

        <div className="grid h-[calc(100%-40px)] grid-cols-[210px_1fr]">
          {/* Sidebar */}
          <div className="flex flex-col border-r border-[#e8ecea] px-[14px] py-[18px]">
            <div className="flex items-center gap-[9px] px-[8px] pb-[18px]">
              <span className="flex size-[28px] items-center justify-center rounded-[7px] text-[14px] font-extrabold text-white" style={{ background: TEAL }}>
                C
              </span>
              <span className="text-[15px] font-extrabold tracking-[-0.01em]">Consult CRM</span>
            </div>
            <ul className="flex flex-col gap-[2px] text-[13px]">
              {NAV.map((item, i) => {
                const active = i === 0;
                return (
                  <li
                    key={item}
                    className={`flex items-center gap-[10px] rounded-[8px] px-[10px] py-[7px] ${active ? "font-semibold" : "text-[#5b6865]"}`}
                    style={active ? { background: TEAL_SOFT, color: TEAL } : undefined}
                  >
                    <NavIcon name={item} />
                    {item}
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto flex items-center gap-[9px] rounded-[10px] bg-[#f6f7f6] p-[10px]">
              <span className="flex size-[30px] items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: TEAL }}>
                SK
              </span>
              <span className="text-[12px] leading-tight">
                <span className="block font-semibold">Sana Khan</span>
                <span className="block text-[#5b6865]">Case manager</span>
              </span>
            </div>
          </div>

          {/* Main */}
          <div className="bg-[#fafbfa] px-[26px] py-[20px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[22px] font-extrabold tracking-[-0.02em]">Good morning, Sana</p>
                <p className="mt-[2px] text-[13px] text-[#5b6865]">Here is where every case stands today.</p>
              </div>
              <div className="flex items-center gap-[10px]">
                <span className="rounded-full border border-dashed border-[#5f6b68] px-[10px] py-[4px] font-mono text-[10px] uppercase tracking-[0.16em] text-[#5b6865]">
                  Sample data
                </span>
                <span className="flex h-[34px] w-[220px] items-center rounded-[8px] bg-white px-[12px] text-[12px] text-[#5f6b68] ring-1 ring-[#e3e8e6]">
                  Search clients, cases, passports…
                </span>
                <span className="rounded-[8px] px-[14px] py-[9px] text-[12px] font-semibold text-white" style={{ background: TEAL }}>
                  + New lead
                </span>
              </div>
            </div>

            {/* KPIs */}
            <div className="mt-[18px] grid grid-cols-4 gap-[12px]">
              {KPIS.map(([k, v, sub]) => (
                <div key={k} className="rounded-[12px] bg-white p-[16px] ring-1 ring-[#e8ecea]">
                  <p className="text-[12px] text-[#5b6865]">{k}</p>
                  <p className="mt-[6px] text-[28px] font-extrabold leading-none tracking-[-0.02em]">{v}</p>
                  <p className="mt-[8px] text-[11px] text-[#5f6b68]">{sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-[14px] grid grid-cols-[1.35fr_1fr] gap-[12px]">
              {/* Pipeline */}
              <div className="rounded-[12px] bg-white p-[18px] ring-1 ring-[#e8ecea]">
                <div className="flex items-baseline justify-between">
                  <p className="text-[14px] font-bold">Case pipeline</p>
                  <p className="text-[11px] text-[#5f6b68]">Open cases by stage</p>
                </div>
                <ul className="mt-[14px] flex flex-col gap-[10px]">
                  {STAGES.map(([stage, n], i) => (
                    <li key={stage} className="grid grid-cols-[82px_1fr_28px] items-center gap-[10px] text-[12px]">
                      <span className="text-[#5b6865]">{stage}</span>
                      <span className="h-[14px] rounded-[4px] bg-[#eef2f1]">
                        <span
                          className="block h-full rounded-[4px]"
                          style={{ width: `${(n / max) * 100}%`, background: TEAL, opacity: 1 - i * 0.14 }}
                        />
                      </span>
                      <span className="text-right font-semibold tabular-nums">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Today */}
              <div className="rounded-[12px] bg-white p-[18px] ring-1 ring-[#e8ecea]">
                <p className="text-[14px] font-bold">Today</p>
                <ul className="mt-[12px] flex flex-col gap-[10px] text-[12px]">
                  {[
                    ["10:00", "CV assessment, Hira Malik", true],
                    ["12:30", "Collect bank statements, Usman T.", false],
                    ["15:00", "Visa decision call, Bilal A.", false],
                  ].map(([t, task, done]) => (
                    <li key={t as string} className="flex items-center gap-[10px]">
                      <span
                        className="flex size-[16px] shrink-0 items-center justify-center rounded-[4px] ring-1"
                        style={done ? { background: TEAL, boxShadow: "none", color: "white" } : { boxShadow: `inset 0 0 0 1px #c9d2cf` }}
                      >
                        {done && (
                          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
                            <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                          </svg>
                        )}
                      </span>
                      <span className="w-[38px] font-mono text-[11px] text-[#5f6b68]">{t}</span>
                      <span className={done ? "text-[#5f6b68] line-through" : ""}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Leads table */}
            <div className="mt-[14px] rounded-[12px] bg-white px-[18px] pb-[8px] pt-[16px] ring-1 ring-[#e8ecea]">
              <div className="flex items-baseline justify-between">
                <p className="text-[14px] font-bold">Recent leads</p>
                <p className="text-[12px] font-semibold" style={{ color: TEAL }}>
                  View all →
                </p>
              </div>
              <table className="mt-[8px] w-full text-left text-[12px]">
                <thead className="text-[11px] text-[#5f6b68]">
                  <tr>
                    <th className="py-[6px] font-medium">Name</th>
                    <th className="py-[6px] font-medium">Visa type</th>
                    <th className="py-[6px] font-medium">Source</th>
                    <th className="py-[6px] font-medium">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {LEADS.map(([name, visa, source, stage]) => (
                    <tr key={name} className="border-t border-[#eef2f1]">
                      <td className="py-[7px] font-semibold">{name}</td>
                      <td className="py-[7px] text-[#5b6865]">{visa}</td>
                      <td className="py-[7px] text-[#5b6865]">{source}</td>
                      <td className="py-[7px]">
                        <span className="rounded-full px-[9px] py-[3px] text-[11px] font-semibold" style={{ background: TEAL_SOFT, color: TEAL }}>
                          {stage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProductCanvas>
  );
}
