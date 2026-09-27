// Work page content. Real facts only: every module, feature and integration below
// is one the owner confirmed exists in the Visa Consultancy CRM. Sample values
// (names, case numbers, figures) live in src/components/crm-shots/sample.ts, never here.

export type CrmModule = {
  /** In-page anchor of the module's chapter. */
  id: "leads" | "case" | "assessment" | "jobs" | "library" | "team";
  name: string;
  line: string;
};

/** What we built, in the order the story tells it. */
export const CRM_MODULES: CrmModule[] = [
  { id: "leads", name: "Leads and campaigns", line: "Custom form campaigns, each tracked to the leads it brings in." },
  { id: "case", name: "Clients and cases", line: "A case per client and country: documents, deadlines, money and messages." },
  { id: "assessment", name: "CV assessment", line: "Eligibility, a score and a country ranking, checked by a person, issued as a PDF." },
  { id: "jobs", name: "Job hunting", line: "Visa-sponsored jobs matched to the CV, with the titles to search for." },
  { id: "library", name: "Visa type library", line: "Add a country and its stages and documents configure themselves." },
  { id: "team", name: "Team", line: "Daily tasks, contributions, reports, issues and blockers." },
];

/** The brief: what the consultancy was running across spreadsheets and WhatsApp. */
export const BRIEF_JOBS = ["Leads", "Cases", "Documents", "Deadlines", "Commissions", "Team reports"] as const;

/** Lead management, as built. */
export const LEAD_FACTS = [
  "Build a custom form for each campaign, with its own link and fields.",
  "Every lead keeps the campaign it came from.",
  "Track each campaign from fills to converted clients.",
];

/** Everything a case holds. Numbered to match the pins on the case shot. */
export const CASE_FACETS = [
  { name: "Documents", line: "The client’s documents, checked off against the visa type." },
  { name: "Notes", line: "Notes kept on the case, not in someone’s phone." },
  { name: "Deadlines", line: "Every deadline on the case, flagged when it slips." },
  { name: "Timeline", line: "Everything that happened, in order." },
  { name: "Employee commission", line: "The commission earned by whoever handles the case." },
  { name: "Invoices and payments", line: "Invoices issued and payments tracked to the balance." },
  { name: "Conversations", line: "Every conversation with the client, tracked on the case." },
];

/** The CV assessment's real six-step pipeline. */
export const ASSESSMENT_STEPS = [
  { step: "Parse CV", line: "Extract the profile from the document." },
  { step: "Recommend countries", line: "Rank the best-fit destinations." },
  { step: "Requirements", line: "Source the rules from official government sites." },
  { step: "Validate", line: "A dual-agent cross-check." },
  { step: "Compliance", line: "Flag items for review." },
  { step: "Synthesize", line: "Assemble the final report." },
];

/** What the assessment gives the consultant. */
export const ASSESSMENT_OUTPUTS = [
  "Eligibility and a score",
  "A ranking of countries",
  "Requirements per country",
  "Missing items and blockers",
  "A human check before it is used",
  "A PDF report",
];

/** Job hunting flags, as the product shows them. */
export const JOB_FLAGS = ["Latest", "Recommended", "Easy to apply"] as const;

/** The Team page, as built. */
export const TEAM_FACTS = [
  "Daily tasks",
  "Contributions",
  "Reports",
  "Issues",
  "Blockers",
  "Google Sheet links",
  "Attachments and screenshots",
];

/** A day in the system: the path an applicant takes. */
export const DAY_STEPS = [
  { name: "A lead arrives", line: "From a campaign form, tagged with that campaign." },
  { name: "The lead becomes a client", line: "Converted into a client record, ready for a case." },
  { name: "The client gets a case", line: "Under a country. The visa type sets its stages and documents." },
  { name: "The CV is assessed", line: "Countries ranked, checked by a person, jobs matched." },
  { name: "Managers sign off", line: "On WhatsApp, with the day’s reports beside it." },
];

/** Integrations configured in the CRM's Settings page. */
export const INTEGRATIONS = [
  "Canva Enterprise",
  "WhatsApp via Twilio",
  "WhatsApp via Meta",
  "Email via SMTP",
  "Google Sheets",
] as const;

export type WebsiteProject = {
  slug: string;
  name: string;
  kind: "Website";
  client?: string;
  url?: string;
  year?: number;
  summary?: string;
  /** A short factual aside shown beside the address (e.g. how it relates to the CRM). */
  note?: string;
};

// TODO(remark): `year` and `summary` are still yours to fill. Leave a field out and
// the row still renders complete. Nothing about these projects is invented on the
// page, so only add real facts.
export const WEBSITES: WebsiteProject[] = [
  {
    slug: "visa-consultancy",
    name: "Visa Consultancy Website",
    kind: "Website",
    client: "The Visa Consultancy",
    url: "https://www.thevisaconsultancy.com/",
    note: "The same client as the CRM.",
  },
  {
    slug: "printing-company",
    name: "Printing Company Website",
    kind: "Website",
    client: "The Printing Company",
    url: "https://theprintingcompany.org/",
  },
  {
    slug: "bin-arab",
    name: "Bin Arab Website",
    kind: "Website",
    client: "Bin Arab Real Estate",
    url: "https://www.binarabrealestate.com/",
  },
];
