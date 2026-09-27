// About page content: every word the page shows lives here (service names and the
// "what you get" lines come from src/data/services.ts; addresses and phones from
// src/data/social.ts; project names and URLs from src/data/projects.ts).
//
// Real facts only. No team names, founding year, headcount, client counts, awards,
// testimonials or metrics appear here. Anything that states how the studio works
// is phrased as the studio's approach and is marked TODO(remark) for the owner to
// confirm before launch.

/* ------------------------------------------------------------------ Hero */

export const HERO = {
  title: "Everything we make leaves with our",
  mark: "mark",
  intro:
    "Remark Studio is a digital solutions studio in Islamabad: a design studio that happens to code. We design and build websites, AI voice agents, chatbots, CRM and ERP systems, brands, campaigns and films.",
  hallmarkIntro:
    "A silversmith’s hallmark says three things about a piece: who made it, the standard it was tested to, and where it was struck. Ours says the same.",
} as const;

/** The three punches of the studio's hallmark, left to right as they are struck. Each opens a chapter below. */
export const HALLMARK = [
  { kind: "maker", label: "Maker", reading: "Remark Studio", href: "#maker" },
  { kind: "standard", label: "Standard", reading: "Ideas → reality", href: "#standard" },
  { kind: "office", label: "Office", reading: "Islamabad", href: "#office" },
] as const;

export type PunchKind = (typeof HALLMARK)[number]["kind"];

/* ----------------------------------------------------------------- Maker */

export const MAKER = {
  label: "Maker’s mark",
  title: "A design studio that happens to",
  mark: "code",
  body: [
    "We design first: how a thing looks, reads and feels in the hand. Then we build it all the way down, to the database, the call flow of a voice agent, the access rules of a CRM.",
    "Design and engineering sit under one roof, so nothing is lost between a drawing and the thing that ships. A website, a voice agent and an ERP are the same problem underneath: someone needs to get something done, and the tool has to get out of their way.",
  ],
  practiceTitle: "What that means in practice",
  // TODO(remark): confirm these three describe how the studio actually runs projects.
  practice: [
    {
      name: "One team, start to finish",
      text: "The people who design your product are the people who build and launch it. There is no hand-off to a stranger halfway through.",
    },
    {
      name: "Design decisions that survive the build",
      text: "Because the designers know what the code can do, and the engineers care how it looks, what you approve is what goes live.",
    },
    {
      name: "One studio for the whole job",
      text: "A site, the chatbot on it, the CRM behind it and the campaign that fills it can come from the same bench, built to work together.",
    },
  ],
  servicesTitle: "What we make",
  servicesIntro: "Seven services. Each one stands on its own, and each one fits the others.",
  servicesLink: "See every service in detail",
} as const;

/* -------------------------------------------------------------- Standard */

export const STANDARD = {
  label: "Standard mark",
  title: "Tested on the stone before it’s",
  mark: "marked",
  intro:
    "An assayer rubs metal on a black touchstone and reads the streak before a hallmark goes on. Our standard is four questions, and every piece is rubbed against all of them.",
  closing: "Fail one and it goes back to the bench. Pass all four and it takes the mark.",
} as const;

/** The touchstone: four questions every piece is rubbed against before it is marked. */
export const TESTS = [
  {
    question: "Does it read without a guide?",
    answer:
      "If a screen needs a walkthrough, the design isn’t finished. We cut until the next step is obvious to the person using it.",
  },
  {
    question: "Does it actually run?",
    answer:
      "A mockup is not a piece. We ship the working thing: the site live, the agent answering the phone, the CRM holding real cases.",
  },
  {
    question: "Is every part doing a job?",
    answer:
      "Nothing decorative standing in for substance. If a part can be taken out and nothing breaks, it comes out.",
  },
  {
    question: "Will it take the next piece?",
    answer:
      "We build so the next module fits without starting over: a new country in a library, a new campaign in a funnel, a new page on a site.",
  },
] as const;

/* ---------------------------------------------------------------- Method */

export const METHOD = {
  title: "How a piece gets",
  mark: "made",
  intro:
    "Every engagement runs through the same five stages, whatever we are making. The Services page shows them in full.",
  processLink: "The process on the Services page",
  expectTitle: "What you can expect from us",
} as const;

// The five stages use the names and wording of PROCESS in src/data/services.ts
// (the Services page's "five heats"); read from there so the two never drift.

// TODO(remark): confirm each commitment. They are phrased as the studio's approach,
// not as contractual terms. "Yours at handover" in particular should match your
// contracts (code, design files, domains and accounts).
export const COMMITMENTS = [
  {
    name: "You talk to the makers",
    text: "The people you brief are the people designing and building your project, so questions get answered by someone who knows the work.",
  },
  {
    name: "The job, in writing",
    text: "Before anything is built, we agree what is being made, and what isn’t, in writing.",
  },
  {
    name: "See it before it’s built",
    text: "You click through the design and the structure first, while changes are still cheap.",
  },
  {
    name: "Yours at handover",
    text: "When the project is complete and paid for, the code, the design files and the accounts are handed to you, with training for the people who will run it.",
  },
] as const;

/* ------------------------------------------------------------ Circulation */

export const CIRCULATION = {
  title: "Pieces already in",
  mark: "circulation",
  intro: "Real work, running today. The full story of the CRM lives on the Work page.",
  crm: {
    kind: "CRM · Internal product",
    name: "Visa Consultancy CRM",
    client: "The Visa Consultancy",
    text: "An internal system that replaced spreadsheets and WhatsApp threads: from the first lead to the finished case, with the team’s daily work in the same place.",
    modulesLabel: "Inside it",
    modules: [
      "Leads and campaigns",
      "Clients and cases",
      "CV assessment",
      "Job hunting",
      "Visa type library",
      "Team reports",
      "Access control",
      "Integrations",
    ],
    href: "/work#crm",
    cta: "Follow the case study",
  },
  websitesLabel: "Websites we built",
  websitesRole: "Website designed and built by Remark Studio",
} as const;

/* -------------------------------------------------------------- Questions */

export const QUESTIONS_HEAD = {
  title: "Fair questions,",
  mark: "plain",
  titleEnd: "answers.",
  intro: "The things people usually ask before a first call.",
} as const;

// TODO(remark): confirm every answer below before launch. Each is written as the
// studio's approach; edit freely, the layout takes any length.
export const QUESTIONS = [
  {
    q: "Do you work with clients outside Islamabad?",
    a: "The studio is in Islamabad, but the work doesn’t need us in the same room. Briefs, reviews and handover can all run over calls and shared links, and you are welcome at the office if you would rather meet.",
  },
  {
    q: "Who owns the code and the designs?",
    a: "You do. Our approach is that once a project is complete and paid for, the code, the design files and the accounts it runs on are handed over to you. Nothing is held back to keep you tied to us.",
  },
  {
    q: "Can you take over an existing website or system?",
    a: "Yes. We start by auditing what is already there, then tell you plainly what is worth keeping, what needs fixing and what should be rebuilt, before any work begins.",
  },
  {
    q: "Can we hire you for just one service?",
    a: "Yes. Each service stands on its own. If you only need a website, a voice agent or a brand, that is all we will propose.",
  },
  {
    q: "What happens after launch?",
    a: "We train the people who will run it and stay on for support as you grow. New modules, pages and campaigns are built to fit what is already there.",
  },
] as const;

/* ---------------------------------------------------------------- Office */

export const OFFICE = {
  label: "Office mark · ISB",
  title: "Come to the",
  titleEnd: "bench.",
  intro:
    "This is where the work is designed, built and tested before it goes out with the mark on it. Call before you visit, or start with a message.",
  cta: "Start a project",
  maps: "Open in Maps",
  callLabel: "Call",
  emailLabel: "Email",
} as const;
