import type { Metadata } from "next";
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

const TITLE = "About | Remark Studio";
const DESCRIPTION =
  "Remark Studio is a design studio in Islamabad that happens to code: websites, AI voice agents, chatbots, CRM and ERP systems, marketing, brand identity and creative production.";
const CANONICAL = "https://remarkstudio.tech/about";
const OG_IMAGE = "https://remarkstudio.tech/og-image.png";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Remark Studio",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Remark Studio" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
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
