import styles from "./contact.module.css";

interface CopyStubProps {
  name: string;
  reach: string;
  needs: string;
  brief: string;
}

/** The visitor's half of the duplicate: a torn paper stub repeating what was filed. */
export function CopyStub({ name, reach, needs, brief }: CopyStubProps) {
  const rows: [string, string][] = [
    ["From", name],
    ["Reach", reach],
    ["For", needs || "—"],
    ["Brief", brief],
  ];

  return (
    <div className={`${styles.stub} w-full max-w-[30rem] rounded-b-[2px] bg-paper px-5 pb-5 pt-6 text-ink sm:px-6`}>
      <p className="font-cranio text-[22px] font-normal leading-none text-ink">Your copy</p>
      <dl className="mt-4 font-mono text-[13px] leading-[1.55]">
        {rows.map(([key, value]) => (
          <div key={key} className="grid grid-cols-[7ch_minmax(0,1fr)] gap-x-4 border-t border-ink/15 py-2">
            <dt className="uppercase tracking-[0.2em] text-ink-muted">{key}</dt>
            <dd className="min-w-0 [overflow-wrap:anywhere]">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
