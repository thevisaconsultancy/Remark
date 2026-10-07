import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Narrative } from "@/components/Narrative";
import { ArchitecturalDesign } from "@/components/ArchitecturalDesign/index";
import { WorkPreview } from "@/components/WorkPreview";
import { Footer } from "@/components/Footer";
import { SITE, pageMetadata } from "@/data/site";

export const metadata: Metadata = pageMetadata({ title: SITE.title, description: SITE.description, path: "/" });

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <TrustStrip />
        <Narrative />
        <ArchitecturalDesign />
        <WorkPreview />
      </main>
      <Footer />
    </>
  );
}


