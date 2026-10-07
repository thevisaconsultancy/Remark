import type { Metadata } from "next";
import { pageMetadata, breadcrumb } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { QUESTIONS } from "@/data/about";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HallmarkHero } from "@/components/about/HallmarkHero";
import { MakerSection } from "@/components/about/MakerSection";
import { Touchstone } from "@/components/about/Touchstone";
import { Method } from "@/components/about/Method";
import { Circulation } from "@/components/about/Circulation";
import { Questions } from "@/components/about/Questions";
import { OfficeMark } from "@/components/about/OfficeMark";
import styles from "@/components/about/about.module.css";

const DESCRIPTION =
  "Remark Studio is a design studio in Islamabad that happens to code: websites, AI voice agents, chatbots, CRM and ERP systems, marketing, brand identity and creative production.";

export const metadata: Metadata = pageMetadata({ title: "About the Studio", description: DESCRIPTION, path: "/about" });

// Mirrors the visible Questions section word for word.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

/**
 * About: the hallmark. A silversmith's hallmark certifies three things about a piece:
 * the maker, the standard it was assayed to and the office that struck it. The hero's
 * three punches open the three chapters (Maker, Standard, Office); between them sit how
 * the work gets made, the pieces already out in the world, and the usual questions.
 * Registers: paper (hero) / void (maker + services) / paper (standard) / void (method) /
 * paper (pieces) / void (questions) / paper (office + close) / Footer.
 */
export default function AboutPage() {
  return (
    <>
      <Header tone="paper" />
      <main id="main-content" className={`${styles.page} flex-1 font-ui`}>
        <JsonLd data={breadcrumb("About", "/about")} />
        <JsonLd data={FAQ_JSON_LD} />
        <HallmarkHero />
        <MakerSection />
        <Touchstone />
        <Method />
        <Circulation />
        <Questions />
        <OfficeMark />
      </main>
      <Footer />
    </>
  );
}
