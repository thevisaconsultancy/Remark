import type { Metadata } from "next";
import { pageMetadata, breadcrumb } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { Catalogue } from "@/components/services/Catalogue";
import { FiveHeats } from "@/components/services/FiveHeats";
import { StartSection } from "@/components/services/StartSection";

const DESCRIPTION =
  "Web development, AI voice agents, chatbots, CRM and ERP systems, brand identity, digital marketing and creative production from Remark Studio, Islamabad.";

export const metadata: Metadata = pageMetadata({ title: "Services: Web, AI Agents, CRM & Branding", description: DESCRIPTION, path: "/services" });

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
        <JsonLd data={breadcrumb("Services", "/services")} />
        <ServicesHero />
        <Catalogue />
        <FiveHeats />
        <StartSection />
      </main>
      <Footer />
    </>
  );
}
