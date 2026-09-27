// Services catalogue: the single source for the /services page.
// Owned by the Services page; the Contact page reads `slug` and `formLabel`
// (for /contact?service=slug1,slug2 pre-ticking).
//
// TODO(remark): confirm tools and statements. Statements paraphrase CONTENT.md;
// the tool-per-service mapping is inferred from its tech list, not confirmed.
// The product lines are new copy for the product catalogue; every brand shown
// in the product visuals (Atlas Pathways, Mehran Motors, Kohsar Print, Dhoop)
// is fictional and every figure is a labelled sample.

/** Heat = a step of the one red ramp, dark cherry to white heat. */
export type Heat = "red-950" | "red-800" | "red-600" | "red-500" | "red-300" | "red-100" | "white";

export type Service = {
  slug: string;
  /** Plain name, used in UI copy and accessible names. */
  name: string;
  /** Name set in Cranio (no &, no apostrophes, no dashes). */
  displayName: string;
  /** Short name for the fan below md; must be a substring of displayName (WCAG 2.5.3 label in name). */
  shortName: string;
  /** Label the Contact form uses for this service. */
  formLabel: string;
  statement: string;
  subServices: string[];
  tools?: string[];
  heat: Heat;
  /** What the client actually receives, as shown by the coded product visual. */
  product: {
    /** The thing itself, in a few words. */
    noun: string;
    /** One line on what it does for the client. */
    line: string;
    /** Caption under the visual; always says the brand and figures are samples. */
    caption: string;
  };
};

/** Catalogue order = picker order = heat order (darkest to white). */
export const SERVICES: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    displayName: "Web Development",
    shortName: "Web",
    formLabel: "Web development",
    statement: "Custom-built, high-conversion websites and web apps, optimised for search and modern speed standards.",
    subServices: ["Property sites", "Portfolios", "Business websites", "SaaS platforms"],
    tools: ["React", "Next.js", "Node.js"],
    heat: "red-950",
    product: {
      noun: "A website that works on every screen",
      line: "Designed, built and launched, from the laptop on your desk to the phone in your client's hand.",
      caption: "Sample build for Atlas Pathways, a fictional visa advisory, on laptop and phone.",
    },
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    displayName: "AI Voice Agents",
    shortName: "AI Voice",
    formLabel: "AI voice agent",
    statement: "Voice agents for customer support, call handling, helpline routing and marketing campaigns.",
    subServices: ["Customer support", "Call handling", "Helpline routing", "Marketing campaigns"],
    tools: ["Python", "OpenAI"],
    heat: "red-800",
    product: {
      noun: "A voice agent that answers your line",
      line: "It picks up every call, books, routes and answers, and hands over to a person when it should.",
      caption: "Sample call for Mehran Motors, a fictional workshop, with live transcript.",
    },
  },
  {
    slug: "chatbots",
    name: "Chatbots",
    displayName: "Chatbots",
    shortName: "Chatbots",
    formLabel: "Chatbot",
    statement:
      "Conversational bots for round-the-clock support, user guidance and instant lead capture across platforms.",
    subServices: ["24/7 support", "User guidance", "Lead capture"],
    tools: ["Python", "OpenAI"],
    heat: "red-600",
    product: {
      noun: "A chatbot that turns questions into leads",
      line: "It answers in your tone on your website and WhatsApp, day and night, and passes every lead to your team.",
      caption: "Sample conversation for Kohsar Print, a fictional print shop.",
    },
  },
  {
    slug: "crm-erp",
    name: "CRM & ERP",
    displayName: "CRM and ERP",
    shortName: "CRM",
    formLabel: "CRM or ERP",
    statement: "End-to-end CRM and ERP systems that streamline operations, implemented and managed with you.",
    subServices: ["Implementation", "Management", "Custom systems"],
    heat: "red-500",
    product: {
      noun: "A CRM built round how you work",
      line: "Leads, clients, cases, finance and your team in one system, shaped to your process rather than the other way round.",
      caption: "Sample dashboard with made-up data, modelled on the visa consultancy CRM we built.",
    },
  },
  {
    slug: "brand-identity",
    name: "Brand Identity",
    displayName: "Brand Identity",
    shortName: "Brand",
    formLabel: "Brand identity",
    statement: "Logos, style guides and brand architecture that establish creative authority, in print and on screen.",
    subServices: ["Logo", "Style guide", "Brand architecture", "Graphic design", "Printing and marketing materials"],
    tools: ["Figma", "Adobe Creative Suite"],
    heat: "red-300",
    product: {
      noun: "A brand people remember",
      line: "Logo, colour, type and the printed pieces that carry them, set down in a guide your team can follow.",
      caption: "Sample identity for Dhoop, a fictional coffee roaster.",
    },
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    displayName: "Digital Marketing",
    shortName: "Marketing",
    formLabel: "Digital marketing",
    statement: "Data-driven campaigns that grow awareness and conversions, and the social presence that keeps them.",
    subServices: [
      "SEO",
      "SEM",
      "PPC",
      "Social media management",
      "Advertising and promotional campaigns",
      "Event management",
    ],
    tools: ["Meta Ads", "Google Analytics"],
    heat: "red-100",
    product: {
      noun: "Campaigns you can measure",
      line: "Creative, targeting and reporting in one loop, so you can see what the spend did.",
      caption: "Sample campaign for Mehran Motors, a fictional workshop. All figures are illustrative.",
    },
  },
  {
    slug: "creative-production",
    name: "Creative Production",
    displayName: "Creative Production",
    shortName: "Production",
    formLabel: "Creative production",
    statement: "Film, photography and content, from script and direction to colour grading and VFX.",
    subServices: [
      "Film production",
      "Scripting and direction",
      "Colour grading",
      "VFX",
      "Photography and product shoots",
      "Content creation",
    ],
    tools: ["DaVinci Resolve", "Adobe Creative Suite"],
    heat: "white",
    product: {
      noun: "Films, photos and content",
      line: "From script and shoot to the grade and the final cut for every channel.",
      caption: "Sample brand film edit for Dhoop, a fictional coffee roaster.",
    },
  },
];

/** The home page's three problems, verbatim, mapped to the services that answer them. */
export const PROBLEMS = [
  { text: "Customer queries going unanswered.", services: ["ai-voice-agents", "chatbots"] },
  { text: "Manual processes slowing growth.", services: ["crm-erp"] },
  {
    text: "Outdated or no web presence.",
    services: ["web-development", "brand-identity", "digital-marketing", "creative-production"],
  },
];

/** The Visa Consultancy CRM's real modules, linking into the Work page's anchors. */
export const CRM_MODULE_LINKS = [
  ["Leads and campaigns", "/work#leads"],
  ["Clients and cases", "/work#case"],
  ["CV assessment", "/work#assessment"],
  ["Job hunting", "/work#assessment"],
  ["Visa type library", "/work#library"],
  ["Teams", "/work#team"],
  ["Settings and access", "/work#access"],
] as const;

/** Build the Contact deep link for a set of slugs, always in catalogue order. */
export function contactHref(slugs: readonly string[]): string {
  const ordered = SERVICES.map((s) => s.slug).filter((slug) => slugs.includes(slug));
  return ordered.length ? `/contact?service=${ordered.join(",")}` : "/contact";
}

// TODO(remark): proposed method copy for the "five heats" process. It carries
// no durations and no guarantees on purpose; confirm the wording with the studio.
export const PROCESS: { name: string; heat: Heat; text: string }[] = [
  { name: "Pattern", heat: "red-950", text: "We listen, audit what exists and define the job in writing." },
  { name: "Mould", heat: "red-800", text: "Design and architecture you can click through before we build." },
  { name: "Pour", heat: "red-600", text: "The build itself: code, content, integrations and automation." },
  { name: "Finish", heat: "red-300", text: "Testing, refinement, speed and search optimisation." },
  { name: "Temper", heat: "red-100", text: "Launch, training for your team, and support as you scale." },
];
