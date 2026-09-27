import { MarkedWord } from "@/components/MarkedWord";
import { HeatBands } from "./HeatBands";

/** The method, and the page's one moment where red becomes the whole field. */
export function FiveHeats() {
  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-24 bg-accent text-fg">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-24 md:px-12 md:pb-20 md:pt-32 lg:px-16">
        <h2
          id="process-title"
          className="max-w-[16ch] text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.02] text-fg [overflow-wrap:anywhere]"
        >
          Every project goes through <MarkedWord word="five" tone="deep" weight="heavy" /> heats.
        </h2>
      </div>
      <HeatBands />
    </section>
  );
}
