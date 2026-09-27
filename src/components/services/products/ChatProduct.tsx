import type { CSSProperties, ReactNode } from "react";
import { Phone } from "./Phone";
import { ProductCanvas } from "./ProductCanvas";
import styles from "./products.module.css";

function In({ children, time }: { children: ReactNode; time: string }) {
  return (
    <div className="max-w-[82%] self-start rounded-[18px] rounded-tl-[4px] bg-white px-[14px] py-[10px] text-[15px] leading-[1.4] text-ink shadow-[0_1px_0_oklch(0.2_0.02_27/0.08)]">
      {children}
      <span className="ml-[8px] inline-block translate-y-[3px] text-[10px] text-ink-muted">{time}</span>
    </div>
  );
}

function Out({ children, time }: { children: ReactNode; time: string }) {
  return (
    <div className="max-w-[80%] self-end rounded-[18px] rounded-tr-[4px] bg-red-100 px-[14px] py-[10px] text-[15px] leading-[1.4] text-ink">
      {children}
      <span className="ml-[8px] inline-block translate-y-[3px] text-[10px] text-ink-muted">{time} ✓✓</span>
    </div>
  );
}

/** Chatbots: a WhatsApp-style thread where the bot qualifies a print order, and the lead it files. */
export function ChatProduct({ label }: { label: string }) {
  return (
    <ProductCanvas w={800} h={900} label={label}>
      <Phone className="left-[10px] top-[10px] h-[880px] w-[410px]" screenClassName="bg-[#efe6e0]">
        {/* Chat header */}
        <div className="flex shrink-0 items-center gap-[12px] border-b border-ink/10 bg-[#f8f2ee] px-[18px] pb-[12px] pt-[4px] text-ink">
          <span className="text-[22px] leading-none text-ink-muted">‹</span>
          <span className="flex size-[40px] items-center justify-center rounded-full bg-red-500 text-[15px] font-extrabold text-fg">
            K
          </span>
          <span className="flex-1">
            <span className="block text-[16px] font-bold">Kohsar Print</span>
            <span className="block text-[12px] text-ink-muted">Assistant · replies instantly</span>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-[10px] px-[14px] pt-[16px]">
          <span className="self-center rounded-[8px] bg-white/70 px-[10px] py-[4px] text-[11px] text-ink-muted">Today</span>
          <Out time="23:12">Salam! Do you print business cards? I need 500 by Friday.</Out>
          <In time="23:12">
            Wa alaikum salam! Yes. 500 cards on 350gsm stock can be ready by Thursday. Which finish would you like?
          </In>
          <div className="flex gap-[6px] self-start pl-[2px]">
            {["Matte", "Gloss", "Spot UV"].map((f, i) => (
              <span
                key={f}
                className={`rounded-full px-[13px] py-[6px] text-[13px] font-semibold ${
                  i === 0 ? "bg-red-500 text-fg" : "bg-white text-red-500 ring-1 ring-inset ring-red-500/40"
                }`}
              >
                {f}
              </span>
            ))}
          </div>
          <Out time="23:13">Matte. Can you send me a price?</Out>
          <In time="23:13">
            Of course. Our team will send a quote first thing tomorrow. What name and number should they use?
          </In>
          <Out time="23:14">Ali Raza, 0300 555 0142</Out>
          <In time="23:14">Thanks, Ali. Your request is with the team. You will have the quote by 10 am.</In>
          <div className="flex gap-[5px] self-start rounded-[18px] rounded-tl-[4px] bg-white px-[14px] py-[13px]">
            {[0, 1, 2].map((d) => (
              <span key={d} className={`${styles.dot} size-[7px] rounded-full bg-ink-muted`} style={{ "--d": d } as CSSProperties} />
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="flex shrink-0 items-center gap-[10px] bg-[#f8f2ee] px-[14px] pb-[26px] pt-[10px]">
          <span className="flex-1 rounded-full bg-white px-[16px] py-[11px] text-[14px] text-ink-muted">Message</span>
          <span className="flex size-[42px] items-center justify-center rounded-full bg-red-500">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-fg)" aria-hidden="true">
              <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
            </svg>
          </span>
        </div>
      </Phone>

      {/* Lead card */}
      <div className={`${styles.lift} absolute left-[440px] top-[330px] w-[350px] rounded-[20px] bg-paper p-[24px] text-ink`}>
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">New lead</p>
          <span className="rounded-full bg-red-500 px-[10px] py-[4px] text-[12px] font-semibold text-fg">Sent to sales</span>
        </div>
        <p className="mt-[14px] text-[24px] font-extrabold tracking-[-0.02em]">Ali Raza</p>
        <dl className="mt-[12px] grid grid-cols-[84px_1fr] gap-x-[12px] gap-y-[9px] text-[15px]">
          <dt className="text-ink-muted">Wants</dt>
          <dd className="font-semibold">500 business cards, matte</dd>
          <dt className="text-ink-muted">Needed by</dt>
          <dd className="font-semibold">Friday</dd>
          <dt className="text-ink-muted">Channel</dt>
          <dd className="font-semibold">WhatsApp, 23:14</dd>
          <dt className="text-ink-muted">Next step</dt>
          <dd className="font-semibold">Quote by 10 am</dd>
        </dl>
      </div>

      {/* Channels */}
      <div className={`${styles.lift} absolute left-[480px] top-[150px] w-[300px] rounded-[20px] bg-red-950 p-[22px] text-fg`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-100">Same bot, every channel</p>
        <div className="mt-[14px] flex flex-wrap gap-[8px] text-[14px] font-semibold">
          <span className="rounded-full bg-fg/10 px-[12px] py-[6px]">Website</span>
          <span className="rounded-full bg-fg/10 px-[12px] py-[6px]">WhatsApp</span>
          <span className="rounded-full bg-fg/10 px-[12px] py-[6px]">Instagram</span>
        </div>
      </div>
    </ProductCanvas>
  );
}
