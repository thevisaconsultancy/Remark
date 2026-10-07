// Site identity for metadata, structured data, sitemap and manifest.
import type { Metadata } from "next";
import { ADDRESS, EMAIL, PHONE_PRIMARY } from "@/data/social";
import { SERVICES } from "@/data/services";

export const SITE = {
  url: "https://remarkstudio.tech",
  name: "Remark Studio",
  title: "Remark Studio | Web Development, AI Agents & CRM, Islamabad",
  description:
    "Remark Studio is a design and engineering studio in Islamabad building websites, AI voice agents, chatbots, CRM and ERP systems, brand identity and marketing.",
  locale: "en_US",
} as const;

/** Every indexable route, for the sitemap. */
export const ROUTES = ["/", "/services", "/work", "/about", "/contact"] as const;

/**
 * Page metadata. openGraph and twitter are rebuilt in full because Next merges
 * metadata shallowly: a page's openGraph replaces the layout's whole object.
 * OG images come from each segment's opengraph-image.png file.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE.name, locale: SITE.locale, url: path, title: fullTitle, description },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

const ORG_ID = `${SITE.url}/#organization`;

/** Site-wide graph: the business and the website. NAP matches what the pages show (data/social.ts). */
export const SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: SITE.name,
      alternateName: "Remark",
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/icon-512.png`, width: 512, height: 512 },
      image: `${SITE.url}/opengraph-image.png`,
      description: SITE.description,
      email: EMAIL,
      telephone: PHONE_PRIMARY.href.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.lines.slice(0, 2).join(", "),
        addressLocality: "Islamabad",
        addressRegion: "Islamabad Capital Territory",
        addressCountry: "PK",
      },
      areaServed: "Worldwide",
      knowsAbout: SERVICES.flatMap((s) => [s.name, ...s.subServices]),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.statement, url: `${SITE.url}/services` },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ],
};

/** Home > page breadcrumb for a top-level route. */
export const breadcrumb = (name: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name, item: `${SITE.url}${path}` },
  ],
});
