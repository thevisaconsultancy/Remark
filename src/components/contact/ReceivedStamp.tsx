import styles from "./contact.module.css";

/** Rubber stamp pressed onto the office copy once the brief is filed. */
export function ReceivedStamp({ time }: { time: string }) {
  return (
    <div
      className={`${styles.stamp} inline-flex flex-col items-center border-[5px] border-double border-fg px-3 pb-1.5 pt-2.5 text-fg lg:px-5 lg:pb-2.5 lg:pt-3.5`}
    >
      <span className="font-stamp text-[1.35rem] lg:text-[clamp(1.75rem,2.9vw,2.75rem)] font-normal uppercase leading-none tracking-[0.05em]">
        Received
      </span>
      <span className="mt-1.5 font-mono text-[10px] lg:mt-2 lg:text-[11px] uppercase leading-none tracking-[0.14em] whitespace-nowrap">{time}</span>
    </div>
  );
}
