/*
 * All site copy lives here so it can be reviewed in one place.
 *
 * Anything wrapped in [square brackets] is a placeholder that must be replaced
 * with real, verifiable information before launch. Never replace a placeholder
 * with an invented claim, number, client or quote.
 */

export const site = {
  name: "ALRO",
  descriptor: "Digital Craft & Intelligence",
  tagline: "Bespoke websites. Intelligent systems. Considered by design.",
  // TODO: replace with the studio's real business address before launch.
  email: "hello@alro.studio",
  primaryAction: "Start a conversation",
  url: "https://alro.studio",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/digital-experiences", label: "Digital Experiences" },
  { href: "/intelligent-systems", label: "Intelligent Systems" },
  { href: "/studio", label: "Studio" },
];

// Secondary destinations, linked from the footer and the mobile menu.
export const moreNav = [{ href: "/company-intelligence", label: "Company Intelligence" }];

// Pages that end in the contact block, so "Start a conversation" can scroll
// instead of navigating away.
export const pagesWithContact = [
  "/",
  "/digital-experiences",
  "/intelligent-systems",
  "/company-intelligence",
  "/studio",
  "/contact",
];

/* The two ways into the studio, offered from the first screen */
export const paths = [
  {
    index: "01",
    href: "/digital-experiences",
    label: "For how you present",
    title: "A digital experience",
    body: "Websites, landing pages, founder sites and digital products.",
  },
  {
    index: "02",
    href: "/company-intelligence",
    label: "For how you work",
    title: "An intelligent system",
    body: "Company knowledge, AI workflows, integrations and internal tools.",
  },
];

export const practices = [
  {
    slug: "digital-experiences",
    index: "01",
    discipline: "Design & Development",
    title: "Digital Experiences",
    summary:
      "We create bespoke websites and digital products that translate a business's identity into a thoughtful, cohesive experience.",
    offers: [
      "Bespoke websites",
      "SaaS marketing sites and landing pages",
      "Founder and personal-brand sites",
      "Product and interface design",
      "Frontend development",
    ],
  },
  {
    slug: "intelligent-systems",
    index: "02",
    discipline: "AI & Automation",
    title: "Intelligent Systems",
    summary:
      "We connect tools, information and workflows so knowledge is easier to find and repetitive work gets lighter. Company Intelligence is our flagship system.",
    offers: [
      "Company Intelligence",
      "Custom AI workflows",
      "Tool integrations",
      "Internal tools and reporting",
    ],
  },
] as const;

/* ── New copy, written for the site (not in the source brief) ── */

export const gap = {
  title: "Two sides of a business, rarely given the same care.",
  emphasis: "care",
  outside: {
    label: "How it presents",
    body: "The website is often the first thing people see. Too often it is a template that makes a considered business look like everyone else.",
  },
  inside: {
    label: "How it works",
    body: "Behind it, knowledge sits in meeting notes, threads and documents, and the same updates are pieced together by hand every week.",
  },
};

// TODO: the founders should confirm every commitment here before launch.
export const terms = [
  {
    title: "A written proposal first",
    body: "Scope, deliverables, timeline and price, agreed in writing. Nothing starts until you have agreed to it.",
  },
  {
    title: "You own the work",
    body: "Design files, code and documentation are handed over at the end of the project.",
  },
  {
    title: "Direct access",
    body: "You work with the founders throughout, not through an account manager.",
  },
  {
    title: "Honest advice",
    body: "If AI isn't the right tool, or we aren't the right studio, we will tell you.",
  },
];

// TODO: replace with a note the founders write themselves, in their own words.
export const founderNote = {
  body: "[A short personal note in your own words: why you started ALRO, and what a client can expect from working with the two of you.]",
  signature: "[Founder One] & [Founder Two]",
};

export const process = [
  {
    title: "Understand",
    body: "We learn about your business, audience, existing tools, constraints, and the outcome you're looking for.",
  },
  {
    title: "Define",
    body: "We agree on scope, creative direction or workflow design, deliverables, timeline, and success criteria.",
  },
  {
    title: "Craft",
    body: "We design and build the website or system, sharing progress and testing important decisions along the way.",
  },
  {
    title: "Validate",
    body: "We review the finished experience, test relevant functionality, and check it against the agreed requirements.",
  },
  {
    title: "Evolve",
    body: "Where useful, we continue with maintenance, monitoring, improvements, and new requirements.",
  },
];

export const principles = [
  {
    title: "Designed for the context.",
    body: "We start with the business and its audience, not a template.",
  },
  {
    title: "Craft without excess.",
    body: "Every visual and interaction should serve a purpose.",
  },
  {
    title: "Technology with intent.",
    body: "We use AI where it solves a real problem, not because it is fashionable.",
  },
  {
    title: "Built to be understood.",
    body: "We aim for maintainable implementations, documented decisions, and clear handovers.",
  },
];

export const fit = {
  good: [
    "Founders and small teams who care how their business presents itself.",
    "Businesses with a specific, repetitive workflow worth doing better.",
    "People who want to work directly with the people doing the work.",
  ],
  notFor: [
    "A templated site that needs to launch this week.",
    "“AI everything” without a defined problem to solve.",
    "Procurement that requires an established vendor with a large team.",
  ],
};

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Can you guarantee that AI will save us time or money?",
    a: "No blanket guarantee. We first define the workflow and the intended outcome, then validate the solution against agreed criteria. Any measured savings should be based on actual usage and evidence.",
  },
  {
    q: "How much does a project cost?",
    a: "Pricing depends on scope, complexity, integrations and delivery requirements. After a first conversation we send a written proposal with deliverables, timeline and price. AI work usually starts with a smaller, scoped pilot rather than a large commitment.",
  },
  {
    q: "Who owns the work, and do we get the source code?",
    a: "You do. Design files, source code and documentation are handed over at the end of the project. If a system is built on a reusable core of ours, the proposal states exactly what is yours, what is licensed, and on what terms.",
  },
  {
    q: "What third-party costs should we expect?",
    a: "Hosting, domains, fonts, software subscriptions and AI model or API usage are listed separately in the proposal, with estimates where they can be made. Where possible, accounts are opened in your name so you pay providers directly.",
  },
  {
    q: "Where will it be hosted?",
    a: "Websites are usually hosted on a managed platform in your name. For AI systems, where data and models run is agreed during discovery and written down before anything is connected — see how we approach deployment on the Company Intelligence page.",
  },
  {
    q: "What happens after launch?",
    a: "Each project ends with a documented handover. Ongoing maintenance, monitoring or improvement is optional and agreed separately, with a clear description of what it covers — including what happens when an external service changes or fails. Nothing includes indefinite support by default.",
  },
  {
    q: "Can you work with our existing tools?",
    a: "We build around your existing systems where practical. Available integrations, access permissions and technical constraints are assessed before work begins, and we only commit to integrations we have tested.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes, provided the scope and budget fit. We work with early-stage businesses that need a clear, considered digital presence or a well-defined operational solution.",
  },
];

export const nextSteps = [
  {
    title: "We read your note",
    body: "Every message is read by the founders, and we reply personally.",
  },
  {
    title: "A short conversation",
    body: "We talk through the business, what you need, and whether we're the right studio for it.",
  },
  {
    title: "A written proposal",
    body: "Scope, deliverables, timeline and price, in writing. Nothing starts until you've agreed to it.",
  },
];

export type Founder = {
  name: string;
  role: string;
  bio: string;
  portfolio: string;
};

// TODO: replace with real names, responsibilities and portfolio links.
// Only claim skills each founder can substantiate.
export const founders: Founder[] = [
  {
    name: "[Founder One]",
    role: "Design & Development",
    bio: "[A short, factual description of this founder's strengths and experience in visual design, interface design and frontend development.]",
    portfolio: "#",
  },
  {
    name: "[Founder Two]",
    role: "AI & Systems",
    bio: "[A short, factual description of this founder's technical strengths and experience with AI systems, integrations and automation.]",
    portfolio: "#",
  },
];

export type ProjectKind = "portfolio" | "experiment" | "demonstration";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  label: string;
  practice: "Digital Experiences" | "Intelligent Systems";
  year: string;
  summary: string;
  context: string;
  role: string;
  challenge: string;
  approach: string;
  work: string;
  demonstrates: string[];
  limitations: string;
  link?: { href: string; label: string };
};

export const kindLabels: Record<ProjectKind, string> = {
  portfolio: "Previous work by the founders",
  experiment: "Independent digital experiments",
  demonstration: "AI product demonstrations",
};

export const projects: Project[] = [
  {
    slug: "company-knowledge-assistant",
    title: "Company Knowledge Assistant",
    kind: "demonstration",
    label: "Product concept / technical demonstration",
    practice: "Intelligent Systems",
    year: "[Year]",
    summary:
      "A working assistant that answers questions from sample company documents, cites its sources, and prepares a weekly briefing.",
    context:
      "Businesses rarely lack information; they lack a reliable way to find it. Decisions sit in meeting notes, context sits in chat threads and documents. This demonstration exists to show, concretely, what a bounded company knowledge system does, using permitted sample data.",
    role: "[Which founder built it, and what they personally did: retrieval pipeline, interface, evaluation, etc.]",
    challenge:
      "Answer questions only from approved sources, show where every answer came from, respect who is allowed to see what, and say plainly when the sources don't contain an answer.",
    approach:
      "[Describe the real architecture: how documents are ingested, chunked and indexed, how retrieval and ranking work, which model is used and why, and how permissions are enforced.]",
    work: "[Add a short screen recording of the working prototype and one diagram of the architecture.]",
    demonstrates: [
      "Retrieval over a defined set of documents",
      "Answers with source citations",
      "A scheduled briefing and a simple alert",
      "Clear handling of questions it cannot answer",
    ],
    limitations:
      "Built with fictional sample documents. It has not been deployed for a client, and no business outcomes have been measured.",
  },
  {
    slug: "birthday-website",
    title: "A Birthday, Told as a Website",
    kind: "experiment",
    label: "Independent project · Personal concept, not commissioned client work",
    practice: "Digital Experiences",
    year: "[Year]",
    summary:
      "A personal, narrative website made as a gift. An exercise in story, personalisation, motion and mobile layout.",
    context:
      "A one-off website made for a birthday. It was never commissioned; it exists because the medium allowed a kind of message a card could not.",
    role: "[Which founder made it, and what they personally did: concept, design, development, writing.]",
    challenge:
      "Turn a personal story into a sequence that unfolds well on a phone, where it would most likely be opened, without the motion overwhelming the message.",
    approach:
      "[Explain the structure of the story, the motion decisions, and how the layout was rethought for small screens rather than shrunk.]",
    work: "[Add screenshots or a short capture of the key moments, on mobile and desktop.]",
    demonstrates: [
      "Narrative structure on the web",
      "Personalisation and tone",
      "Purposeful motion",
      "Mobile-first layout",
    ],
    limitations:
      "A personal project with an audience of one. No user testing or measurement took place.",
  },
  {
    slug: "founder-one-portfolio",
    title: "Selected work by [Founder One]",
    kind: "portfolio",
    label: "Individual portfolio · Created by [Founder One]",
    practice: "Digital Experiences",
    year: "[Years]",
    summary:
      "Design and frontend work made before ALRO, presented with clear attribution of role and context.",
    context:
      "[For each piece: what it was, and whether it was made independently, for an employer, or with another team.]",
    role: "[What this founder personally did on each piece.]",
    challenge: "[What each piece set out to achieve.]",
    approach: "[The key design or technical decisions, and why.]",
    work: "[Selected images, at their native proportions.]",
    demonstrates: ["[Specific, substantiated capabilities]"],
    limitations:
      "This work predates ALRO and was not commissioned from the studio.",
    link: { href: "#", label: "View the full portfolio" },
  },
  {
    slug: "founder-two-portfolio",
    title: "Selected work by [Founder Two]",
    kind: "portfolio",
    label: "Individual portfolio · Created by [Founder Two]",
    practice: "Intelligent Systems",
    year: "[Years]",
    summary:
      "Systems, automation and engineering work made before ALRO, presented with clear attribution of role and context.",
    context:
      "[For each piece: what it was, and whether it was made independently, for an employer, or with another team.]",
    role: "[What this founder personally did on each piece.]",
    challenge: "[What each piece set out to achieve.]",
    approach: "[The key technical decisions, and why.]",
    work: "[Diagrams, screenshots or demos.]",
    demonstrates: ["[Specific, substantiated capabilities]"],
    limitations:
      "This work predates ALRO and was not commissioned from the studio.",
    link: { href: "#", label: "View the full portfolio" },
  },
];

export const knowledgeFlow = {
  connect:
    "Approved documents, meeting notes, team conversations and project information.",
  retrieve:
    "Search relevant information, reference original sources, and respect permissions.",
  outputs: [
    { title: "Ask", body: "Find answers and decisions." },
    { title: "Alert", body: "Surface blockers and changes." },
    { title: "Brief", body: "Prepare useful summaries." },
    { title: "Act", body: "Trigger approved workflows." },
  ],
};

export const evidenceKinds = [
  {
    title: "Craft evidence",
    body: "Websites, interfaces and technical projects, with each founder's contribution and the reasoning behind it.",
    kinds: ["portfolio", "experiment"] as ProjectKind[],
  },
  {
    title: "Capability evidence",
    body: "Working demonstrations and walkthroughs. They show what we can build, not results a client has achieved.",
    kinds: ["demonstration"] as ProjectKind[],
  },
];

/* ── Company Intelligence ─────────────────────
   Strategic shorthand from the founders' discussion ("omnipresent,
   omniscient, omnipotent") is translated here into concrete, bounded use
   cases. Don't put the shorthand itself on the site. */

export const ci = {
  name: "Company Intelligence",
  summary:
    "A configurable system that connects approved company information and helps people find answers, see what was decided, and notice what still needs doing.",
  // TODO: confirm this stays accurate as the prototype changes.
  stage: "Working prototype · available as a scoped pilot",
};

export const useCases = [
  {
    title: "Find what your company already knows",
    body: "Ask what was agreed with a client, locate a project decision, or retrieve the latest relevant document — with a pointer back to where it came from.",
    example: "“What did we agree with the supplier about the autumn reorder?”",
  },
  {
    title: "Surface what needs attention",
    body: "Pull action items, owners and deadlines out of connected sources, then flag work that looks incomplete or overdue for a person to review.",
    example: "“Three actions from Tuesday’s review have no owner.”",
  },
  {
    title: "Move work forward",
    body: "Draft a follow-up, create a task or trigger a connected workflow — once the right conditions are met and a person has approved it.",
    example: "“Draft the follow-up to the supplier for me to check.”",
  },
];

// TODO: the founders must keep this list true to what the prototype does today.
export const capabilityStatus = [
  {
    key: "now",
    title: "Working in our prototype",
    body: "Built and running, tested with [sample / internal] data.",
    items: [
      "Live connectors to selected tools [list the connectors that work today]",
      "Extraction of decisions, action items, owners and dates",
      "Chat with the information it has connected",
      "Automatic triggers, notifications and events",
    ],
  },
  {
    key: "pilot",
    title: "Through a scoped pilot",
    body: "Configured with you, for one defined workflow, under an agreed scope.",
    items: [
      "Your own sources, with the permissions they already have",
      "A deployment model agreed during discovery",
      "A person approves every action that leaves the company",
      "Evaluation against criteria agreed before the build",
    ],
  },
  {
    key: "future",
    title: "Future direction",
    body: "Where we intend to go. Not available, and not part of any current offer.",
    items: [
      "Agents dedicated to individual departments",
      "Shared memory across agents",
      "Agents that coordinate work between teams",
    ],
  },
];

export const deploymentModels = [
  {
    title: "Managed cloud",
    body: "The system runs in an environment operated by ALRO or its hosting provider, with its data flows documented for you.",
  },
  {
    title: "Your cloud account",
    body: "The system is deployed inside cloud infrastructure your company already owns and controls.",
  },
  {
    title: "Your own hardware",
    body: "The system runs on infrastructure you operate, once the architecture and operating requirements are established.",
  },
];

export const deploymentQuestions = [
  "Where documents, embeddings, logs and backups are stored",
  "Which model providers or external services receive data, and what they receive",
  "How permissions from your source systems are enforced",
  "What is retained, for how long, and how it is deleted",
  "How credentials and secrets are protected",
  "What happens when a connector or a model fails",
  "Which actions need a person’s approval before they happen",
];

export const engagements = [
  {
    key: "websites",
    label: "Digital Experiences",
    title: "A scoped project, then a handover",
    steps: [
      {
        title: "Written proposal",
        body: "Deliverables, revision rounds, timeline and price, agreed before anything starts.",
      },
      {
        title: "Design and build",
        body: "Discovery, messaging structure, art direction, responsive design and development.",
      },
      {
        title: "Launch and handover",
        body: "Analytics set up, code and files handed over, decisions documented.",
      },
      {
        title: "Optional: ongoing care",
        body: "Maintenance, analytics or optimisation, under a separate agreement.",
        optional: true,
      },
    ],
  },
  {
    key: "systems",
    label: "Intelligent Systems",
    title: "Start small, prove it, then build",
    steps: [
      {
        title: "Discovery",
        body: "We map one workflow, the tools involved, the data, and how it should be deployed.",
      },
      {
        title: "Proof of concept or paid pilot",
        body: "A scoped version, with your sources, judged against criteria agreed up front.",
      },
      {
        title: "Implementation",
        body: "Integration, testing, documentation and onboarding for the team.",
      },
      {
        title: "Optional: support",
        body: "Monitoring and improvement, with what is covered — including failures of external services — written down.",
        optional: true,
      },
    ],
  },
];

export const ciFaqs: Faq[] = [
  {
    q: "Is it a product or a custom build?",
    // TODO: confirm how licensing of the reusable core will work.
    a: "Both, deliberately. The core is reusable; each deployment is configured for your tools, sources, permissions and branding. The proposal sets out what is configured, what is built specifically for you, and what is licensed.",
  },
  {
    q: "Which tools can it connect to?",
    a: "[List the connectors that are working and tested.] Others are assessed during discovery. We only commit to connectors we have built and tested.",
  },
  {
    q: "Will it act on its own?",
    a: "It can raise notifications and trigger internal events automatically. Anything that leaves your company — an email, a booking, a change in another business system — waits for a person to approve it.",
  },
  {
    q: "Where does our data go?",
    a: "That is agreed during discovery and written down before anything is connected: where it is stored, which providers receive it, how long it is kept and how it is deleted.",
  },
  {
    q: "Can we try it?",
    a: "We can walk you through the prototype on a call, using sample data. A pilot then uses your own sources, under an agreed scope.",
  },
  {
    q: "Has it been deployed for a client?",
    a: "Not yet. It is a working prototype, and we’re looking for the first teams to pilot it with. We would rather tell you that than imply otherwise.",
  },
];
