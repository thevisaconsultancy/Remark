import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { Catalogue } from "@/components/services/Catalogue";
import { FiveHeats } from "@/components/services/FiveHeats";
import { StartSection } from "@/components/services/StartSection";

const DESCRIPTION =
  "Web development, AI voice agents, chatbots, CRM and ERP systems, brand identity, digital marketing and creative production from Remark Studio, Islamabad.";

export const metadata: Metadata = {
  title: "Services | Remark Studio",
  description: DESCRIPTION,
  alternates: { canonical: "https://remarkstudio.tech/services" },
  openGraph: {
    title: "Services | Remark Studio",
    description: DESCRIPTION,
    url: "https://remarkstudio.tech/services",
    siteName: "Remark Studio",
    images: [{ url: "https://remarkstudio.tech/og-image.png", width: 1200, height: 630, alt: "Remark Studio" }],
    locale: "en_US",
    type: "website",
  },
};

/**
 * Services: a product catalogue. Each service is shown as the thing the client
 * receives, drawn in code (fictional sample brands, labelled sample figures).
 * Register sequence: void (cover), then the plates alternate paper / void / red,
 * red (five heats), paper (start), then the Footer.
 */
export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <ServicesHero />
        <Catalogue />
        <FiveHeats />
        <StartSection />
      </main>
      <Footer />
    </>
  );
}
