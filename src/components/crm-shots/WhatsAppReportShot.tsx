import type { ReactNode } from "react";
import { LuCheckCheck, LuChevronLeft, LuEllipsisVertical, LuMic, LuPlus } from "react-icons/lu";
import { CrmFrame, type ShotProps } from "./CrmFrame";
import { at } from "./parts";
import a from "./shots.module.css";

function Bubble({ children, out = false, time, i }: { children: ReactNode; out?: boolean; time: string; i?: number }) {
  return (
    <div style={i === undefined ? undefined : at(i)} className={`${i === undefined ? "" : a.arrive} max-w-[84%] rounded-[12px] px-3 pt-2 pb-1.5 text-[13px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${out ? "ml-auto rounded-tr-[3px] bg-[#d9fdd3]" : "rounded-tl-[3px] bg-white"}`}>
      {children}
      <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-[#5a6870]">
        {time}
        {out && <LuCheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />}
      </span>
    </div>
  );
}

export function WhatsAppReportScreen() {
  return (
    <div className="h-full bg-[#141110] p-[11px]">
      <div className="flex h-full flex-col overflow-hidden rounded-[36px] bg-[#efeae2] font-ui">
        <div className="flex h-[30px] items-center justify-between px-7 pt-1 text-[12px] font-semibold text-[#111b21]">
          <span>18:12</span>
          <span className="h-[18px] w-[80px] rounded-full bg-[#141110]" />
          <span className="font-mono text-[10px]">5G</span>
        </div>
        <div className="flex h-[54px] items-center gap-2 bg-[#f0f2f5] px-3">
          <LuChevronLeft className="h-5 w-5 text-[#111b21]" />
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0f4c45] text-[12px] font-bold text-white">V</span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[14px] font-semibold text-[#111b21]">Visa Consultancy CRM</span>
            <span className="block text-[11px] text-[#5a6870]">Business account</span>
          </span>
          <LuEllipsisVertical className="ml-auto h-4 w-4 text-[#54656f]" />
        </div>
        <div className="flex flex-1 flex-col gap-2 px-3 py-3">
          <span className="mx-auto rounded-[6px] bg-white/80 px-2 py-0.5 text-[11px] text-[#54656f]">Today</span>
          <Bubble time="18:10" i={0}>
            <b>Daily report · Mon, Sep 28</b>
            <br />
            Reports in: 3 of 5
            <br />
            Overdue cases: 3
            <br />
            Blockers: 1 (NZ-WRK-0013, TB test slot)
            <br />
            Awaiting sign-off: 2
          </Bubble>
          <div className={`${a.arrive} max-w-[84%]`} style={at(1)}>
            <Bubble time="18:11">
              <b>Sign-off needed</b>
              <br />
              CA-VIS-0011 · Zoya Farooq
              <br />
              Ready for Submission. Sent by Saad.
            </Bubble>
            <div className="mt-1 grid grid-cols-2 gap-1">
              <span className="rounded-[10px] bg-white py-1.5 text-center text-[13px] font-semibold text-[#027eb5] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">Approve</span>
              <span className="rounded-[10px] bg-white py-1.5 text-center text-[13px] font-semibold text-[#027eb5] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">Send back</span>
            </div>
          </div>
          <Bubble out time="18:12" i={2}>Approve</Bubble>
          <Bubble time="18:12" i={3}>Approved by Areeba. CA-VIS-0011 moved to Submission.</Bubble>
        </div>
        <div className="flex h-[58px] items-center gap-2 bg-[#f0f2f5] px-3 pb-2">
          <LuPlus className="h-5 w-5 text-[#54656f]" />
          <span className="h-[34px] flex-1 rounded-full bg-white" />
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-[#0f4c45] text-white">
            <LuMic className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function WhatsAppReportShot({ label, ...rest }: ShotProps) {
  return (
    <CrmFrame
      width={360}
      height={740}
      radius={46}
      caption="WhatsApp via Twilio"
      frameClassName="shadow-[0_40px_80px_-30px_rgba(20,10,8,0.6)]"
      label={
        label ??
        "A manager's phone with sample data: WhatsApp messages from the CRM with the daily report summary of reports in, overdue cases, blockers and approvals waiting, then a sign-off request for a case with Approve and Send back buttons, the manager's approval, and the CRM's confirmation that the case moved on."
      }
      {...rest}
    >
      <WhatsAppReportScreen />
    </CrmFrame>
  );
}
