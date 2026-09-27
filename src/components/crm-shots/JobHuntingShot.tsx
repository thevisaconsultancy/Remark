import { LuBriefcase, LuChevronDown, LuMapPin, LuSearch, LuSparkles, LuStar, LuZap } from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { CrmShell } from "./CrmShell";
import { at, Badge, GhostButton, PageTitle, PrimaryButton, Tabs } from "./parts";
import a from "./shots.module.css";
import { CAPS, CARD, LINE, SCREEN, T_FAINT, T_INK, T_MUTED, T_TEAL } from "./tokens";

type Job = {
  title: string;
  employer: string;
  place: string;
  pay: string;
  posted: string;
  sponsor: "Sponsor confirmed" | "Likely";
  latest?: boolean;
  recommended?: boolean;
  easy?: boolean;
};

const JOBS: Job[] = [
  { title: "Staff Nurse, Intensive Care", employer: "Harbourview Hospital", place: "Manchester", pay: "£31,000 – £37,500", posted: "2 days ago", sponsor: "Sponsor confirmed", latest: true, recommended: true },
  { title: "Critical Care Nurse, Nights", employer: "Northfield Care Group", place: "Salford", pay: "£33,200", posted: "3 days ago", sponsor: "Sponsor confirmed", recommended: true, easy: true },
  { title: "Registered Nurse, Adult Ward", employer: "Elmstead Clinics", place: "Stockport", pay: "£30,400 – £34,000", posted: "5 days ago", sponsor: "Likely", easy: true },
  { title: "Staff Nurse, Theatres", employer: "Kestrel Health", place: "Manchester", pay: "£32,100", posted: "1 week ago", sponsor: "Sponsor confirmed" },
];

function Field({ label, value, w, icon = false }: { label: string; value: string; w: number; icon?: boolean }) {
  return (
    <span className="flex flex-col gap-1.5">
      <span className={`${CAPS} text-[10px] text-[#4b5563]`}>{label}</span>
      <span className={`flex h-[34px] items-center gap-2 rounded-[7px] border ${LINE} px-3 text-[13px] ${T_INK}`} style={{ width: w }}>
        {icon && <LuSearch className={`h-3.5 w-3.5 ${T_FAINT}`} />}
        {value}
        {!icon && <LuChevronDown className={`ml-auto h-3.5 w-3.5 ${T_MUTED}`} />}
      </span>
    </span>
  );
}

export function JobHuntingScreen() {
  return (
    <CrmShell active="jobs">
      <PageTitle
        title="Job Hunting"
        icon={LuBriefcase}
        sub="Live listings from official job boards, tagged against the sponsor registers, saved per client"
      />
      <div className="mt-4">
        <Tabs items={["Listings", "Read a page", "Add by hand", "Employer brief", "Sponsor registers", "Sponsors", "Shortlist", "Applications"]} active="Listings" />
      </div>
      <div className={`${CARD} mt-4 flex items-end gap-3 px-4 py-3.5`}>
        <Field label="Country" value="United Kingdom" w={170} />
        <Field label="Job title or keyword" value="Staff Nurse" w={300} icon />
        <Field label="City or region" value="Manchester" w={150} />
        <Field label="Posted within" value="14 days" w={110} />
        <span className="ml-auto"><PrimaryButton>Search</PrimaryButton></span>
      </div>

      <div className="mt-3 flex items-center gap-2 text-[12px]">
        <span className={`flex items-center gap-1.5 font-semibold ${T_TEAL}`}>
          <LuSparkles className="h-3.5 w-3.5" /> Matched to CV · Kamran Yousaf
        </span>
        <span className={T_MUTED}>Recommended titles:</span>
        {["Staff Nurse (ICU)", "Critical Care Nurse", "Registered Nurse, Adult"].map((t) => (
          <span key={t} className="rounded-full border border-[#cfe0dc] bg-[#f1f6f5] px-2.5 py-[3px] text-[11px] font-semibold text-[#0f4c45]">
            {t}
          </span>
        ))}
        <span className={`ml-auto flex gap-1 text-[11px] ${T_MUTED}`}>
          {["Any", "Confirmed", "Likely", "Said no"].map((s) => (
            <span key={s} className={`rounded-[6px] border px-2 py-[3px] ${s === "Confirmed" ? "border-[#0f4c45] bg-[#e6eeec] font-semibold text-[#0f4c45]" : `${LINE} bg-white`}`}>
              {s}
            </span>
          ))}
        </span>
      </div>

      <div className={`${CARD} mt-3 overflow-hidden`}>
        <div className={`flex h-[36px] items-center border-b ${LINE} bg-[#fafafa] px-4 ${CAPS} text-[#4b5563]`}>
          <span>28 listings</span>
          <span className="ml-2 font-normal normal-case tracking-normal text-[#636a77]">· 6 of 6 boards · sponsors’ own careers pages</span>
          <span className="ml-auto font-normal normal-case tracking-normal text-[#636a77]">Sort: Recommended</span>
        </div>
        {JOBS.map((j, i) => (
          <div key={j.title} style={at(i + 1)} className={`${a.rise} flex items-center gap-4 border-t ${LINE} px-4 py-3 first:border-t-0`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-[#f3f4f6] text-[13px] font-bold text-[#4b5563]">
              {j.employer[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className={`text-[14px] font-semibold ${T_INK}`}>{j.title}</span>
                {j.latest && <Badge kind="teal">Latest</Badge>}
                {j.recommended && <Badge kind="dark" icon={LuStar}>Recommended</Badge>}
                {j.easy && <Badge kind="outline" icon={LuZap}>Easy to apply</Badge>}
              </span>
              <span className={`mt-0.5 flex items-center gap-3 text-[12px] ${T_MUTED}`}>
                <span>{j.employer}</span>
                <span className="flex items-center gap-1"><LuMapPin className="h-3 w-3" />{j.place}</span>
                <span>{j.pay}</span>
                <span>{j.posted}</span>
              </span>
            </span>
            <Badge kind={j.sponsor === "Likely" ? "amber" : "active"}>{j.sponsor}</Badge>
            <GhostButton>Shortlist</GhostButton>
          </div>
        ))}
      </div>
    </CrmShell>
  );
}

export function JobHuntingShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={SCREEN.w}
      height={SCREEN.h}
      url="/job-hunting"
      caption="Job hunting"
      label={
        label ??
        "Job Hunting with sample data: a search for staff nurse roles in Manchester, United Kingdom, matched to an assessed CV with three recommended job titles, and listings tagged as sponsor confirmed or likely against the sponsor registers, flagged latest, recommended or easy to apply, each ready to shortlist."
      }
      {...rest}
    >
      <JobHuntingScreen />
    </CrmFrame>
  );
}
