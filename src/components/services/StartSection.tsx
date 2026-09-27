import { MarkedWord } from "@/components/MarkedWord";
import { ChipDeckPicker } from "./ChipDeckPicker";

/** The catalogue closes into the order form. */
export function StartSection() {
  return (
    <section id="start" aria-labelledby="start-title" className="scroll-mt-24 bg-paper-warm text-ink">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32 lg:px-16 lg:py-40">
        <h2
          id="start-title"
          className="mb-14 text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.02] text-ink [overflow-wrap:anywhere] md:mb-20"
        >
          Tell us what you <MarkedWord word="need" weight="heavy" />.
        </h2>
        <ChipDeckPicker />
      </div>
    </section>
  );
}
