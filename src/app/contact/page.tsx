import type { Metadata } from "next";
import { pageMetadata, breadcrumb } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCounter } from "@/components/contact/ContactCounter";
import { DirectLine } from "@/components/contact/DirectLine";
import type { NeedOption } from "@/components/contact/types";
import { SERVICES } from "@/data/services";
import { PHONE_PRIMARY } from "@/data/social";

const DESCRIPTION =
  "Start a project with Remark Studio. Office #104, Mezzanine Floor, Embassy Gardens, Bahria Enclave, Islamabad. +92 326 8450001.";

export const metadata: Metadata = pageMetadata({ title: "Start a Project", description: DESCRIPTION, path: "/contact" });

// What the form offers: every service by its form label, then a catch-all.
const NEED_OPTIONS: NeedOption[] = [
  ...SERVICES.map((service) => ({ slug: service.slug, label: service.formLabel })),
  { slug: "other", label: "Something else" },
];
const KNOWN = new Set(NEED_OPTIONS.map((option) => option.slug));

/** /contact?service=crm-erp,chatbots arrives with both ticked; unknown slugs are dropped. */
function needsFrom(param: string | string[] | undefined): string[] {
  const joined = Array.isArray(param) ? param.join(",") : (param ?? "");
  const slugs = joined
    .split(",")
    .map((slug) => slug.trim().toLowerCase())
    .filter((slug) => KNOWN.has(slug));
  return Array.from(new Set(slugs));
}

/**
 * Contact: the counter, in daylight. A duplicate order book: the visitor writes on the
 * paper top sheet and the studio's red office copy fills in beside it.
 * Register sequence: paper with a red office-copy slab, void (direct line), then the Footer.
 */
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const initialNeeds = needsFrom((await searchParams).service);

  return (
    <>
      <Header tone="paper" cta={{ label: "Call us", href: PHONE_PRIMARY.href }} />
      <main id="main-content" className="flex-1">
        <JsonLd data={breadcrumb("Contact", "/contact")} />
        <ContactCounter key={initialNeeds.join(",")} options={NEED_OPTIONS} initialNeeds={initialNeeds} />
        <DirectLine />
      </main>
      <Footer />
    </>
  );
}
