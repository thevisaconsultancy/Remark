import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  LuBanknote,
  LuBell,
  LuBookOpen,
  LuBriefcase,
  LuBuilding2,
  LuClipboardCheck,
  LuColumns3,
  LuFileText,
  LuFolderOpen,
  LuHandCoins,
  LuLayoutGrid,
  LuLogOut,
  LuPlay,
  LuSearch,
  LuSettings,
  LuShield,
  LuSparkles,
  LuSun,
  LuUser,
  LuUserPlus,
  LuUsers,
} from "react-icons/lu";
import { BG_SIDE, BG_TEAL_SOFT, LINE, T_BODY, T_FAINT, T_INK, T_MUTED, T_TEAL } from "./tokens";

export type NavId =
  | "dashboard"
  | "leads"
  | "clients"
  | "cases"
  | "pipeline"
  | "cv"
  | "review"
  | "jobs"
  | "search"
  | "finance"
  | "commissions"
  | "reports"
  | "settings"
  | "team"
  | "notifications"
  | "security"
  | "guide";

/** The product's real navigation, in its real order. */
export const NAV: { id: NavId; label: string; icon: IconType; ai?: boolean }[] = [
  { id: "dashboard", label: "Dashboard", icon: LuLayoutGrid },
  { id: "leads", label: "Leads", icon: LuUserPlus },
  { id: "clients", label: "Clients", icon: LuUsers },
  { id: "cases", label: "Cases", icon: LuFolderOpen },
  { id: "pipeline", label: "Pipeline", icon: LuColumns3 },
  { id: "cv", label: "CV Assessment", icon: LuSparkles, ai: true },
  { id: "review", label: "Review Queue", icon: LuClipboardCheck },
  { id: "jobs", label: "Job Hunting", icon: LuBriefcase },
  { id: "search", label: "Search", icon: LuSearch },
  { id: "finance", label: "Finance", icon: LuBanknote },
  { id: "commissions", label: "Commissions", icon: LuHandCoins },
  { id: "reports", label: "Reports", icon: LuFileText },
  { id: "settings", label: "Settings", icon: LuSettings },
  { id: "team", label: "Team", icon: LuUser },
  { id: "notifications", label: "Notifications", icon: LuBell },
  { id: "security", label: "Security", icon: LuShield },
  { id: "guide", label: "Guide", icon: LuBookOpen },
];

/** A neutral emblem standing in for the client's logo. */
function Emblem() {
  return (
    <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#0f4c45] font-ui text-[12px] font-bold text-white">
      V
    </span>
  );
}

function Sidebar({ active }: { active: NavId }) {
  return (
    <aside className={`flex h-full w-[208px] shrink-0 flex-col border-r ${LINE} ${BG_SIDE}`}>
      <div className="flex h-[58px] items-center gap-2.5 px-4">
        <Emblem />
        <span className={`text-[14px] font-bold tracking-[-0.01em] ${T_INK}`}>The Visa Consultancy</span>
      </div>
      <nav className="mt-2 flex flex-col gap-[2px] px-2.5">
        {NAV.map(({ id, label, icon: Icon, ai }) => {
          const on = id === active;
          return (
            <span
              key={id}
              className={`relative flex h-[30px] items-center gap-2.5 rounded-[7px] px-2.5 text-[13px] ${
                on ? `${BG_TEAL_SOFT} font-semibold ${T_TEAL}` : T_BODY
              }`}
            >
              {on && <span className="absolute top-[6px] bottom-[6px] -left-[1px] w-[3px] rounded-full bg-[#0f4c45]" />}
              <Icon className="h-[15px] w-[15px] shrink-0 opacity-80" />
              {label}
              {ai && (
                <span className="ml-auto rounded-[4px] bg-[#e9ebee] px-1.5 py-[1px] text-[9px] font-bold text-[#374151]">AI</span>
              )}
            </span>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-2 px-4 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-[28px] w-[28px] place-items-center rounded-full bg-[#e5e7eb] text-[12px] font-semibold text-[#374151]">
            A
          </span>
          <span className="min-w-0 leading-tight">
            <span className={`block text-[13px] font-semibold ${T_INK}`}>Areeba</span>
            <span className={`block text-[11px] ${T_MUTED}`}>Operations · Admin</span>
          </span>
          <span className="relative ml-auto">
            <LuBell className={`h-[15px] w-[15px] ${T_MUTED}`} />
            <span className="absolute -top-2 -right-2 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-[#dc2626] px-1 text-[9px] font-bold text-white">
              4
            </span>
          </span>
        </div>
        <span className={`flex items-center gap-1.5 text-[11px] ${T_MUTED}`}>
          <LuBuilding2 className="h-3 w-3" /> All offices
        </span>
        <span className={`flex items-center gap-1.5 text-[12px] ${T_BODY}`}>
          <LuLogOut className="h-3.5 w-3.5" /> Sign out
        </span>
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <div className={`flex h-[58px] shrink-0 items-center border-b ${LINE} bg-white px-6`}>
      <span className={`flex h-[34px] w-[300px] items-center gap-2 rounded-[8px] border ${LINE} px-3 text-[13px] ${T_FAINT}`}>
        <LuSearch className="h-[14px] w-[14px]" />
        Search...
        <span className={`ml-auto rounded-[4px] border ${LINE} px-1.5 text-[10px] ${T_MUTED}`}>⌘K</span>
      </span>
      <span className={`ml-auto flex h-[30px] items-center gap-1.5 rounded-[7px] ${BG_TEAL_SOFT} px-3 text-[12px] font-semibold ${T_TEAL}`}>
        <LuPlay className="h-3 w-3" /> Tours
      </span>
      <LuSun className={`ml-4 h-[15px] w-[15px] ${T_MUTED}`} />
    </div>
  );
}

/** The product's app shell: sidebar with the real navigation, search bar, page body. */
export function CrmShell({ active, children, bodyClassName = "px-8 pt-7" }: { active: NavId; children: ReactNode; bodyClassName?: string }) {
  return (
    <div className={`flex h-full w-full bg-white font-ui ${T_BODY} [font-variant-numeric:tabular-nums]`}>
      <Sidebar active={active} />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <div className={`min-h-0 flex-1 overflow-hidden ${bodyClassName}`}>{children}</div>
      </div>
    </div>
  );
}
