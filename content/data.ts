// ─────────────────────────────────────────────────────────────────────────────
// ALL site content lives here. Edit this file to update the portfolio —
// no need to touch any component. Items marked TODO need your real numbers.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Harshit Rajput",
  role: "Product Manager @ Taqtics",
  tagline: "I ship products, not decks.",
  intro:
    "PM building frontline-ops SaaS for retail & F&B brands across India and the GCC. " +
    "I talk to the store manager, write the spec, and then use AI to build the working prototype myself, usually in the same week.",
  email: "harshitrajputwork@gmail.com",
  github: "https://github.com/harshitrajputwork-create",
  linkedin: "https://www.linkedin.com/", // TODO: your LinkedIn URL
  resume: "", // TODO: link to a PDF resume (put it in /public and use "/resume.pdf")
  oldPortfolio: "https://harshit-project-portfolio.super.site/",
  location: "New Delhi, India",
};

// Big numbers strip. Keep them honest & specific. Recruiters love numbers they can ask about.
export const stats = [
  { value: "1+", label: "yrs as PM in B2B SaaS" },
  { value: "18", label: "repos shipped on GitHub" },
  { value: "10+", label: "client dashboards built with AI" },
  { value: "7 days", label: "v1.0 → v1.6 of Impl. Tracker" },
  // TODO: add real impact numbers e.g. { value: "38%", label: "faster client go-live" }
];

// The 3 things the site must prove.
export const pillars = [
  {
    key: "pm",
    title: "PM fundamentals",
    color: "pink",
    emoji: "🧭",
    points: [
      "Problem first: discovery calls with ops heads, store managers and auditors",
      "PRDs, user journeys, edge cases (\"what if the phase activates before the last one is done?\")",
      "Competitive teardowns before building anything",
      "Prioritise by impact × effort, and ship in versions with a changelog",
    ],
  },
  {
    key: "ai",
    title: "AI-native PM",
    color: "blue",
    emoji: "⚡",
    points: [
      "Prototype → production with Claude Code, Next.js, Supabase and Vercel",
      "LLM features in real products: GPT-4o turns messy Excel SOPs into live app setups",
      "Use AI to cut the spec → demo loop from weeks to days",
      "Know where AI breaks, and design guardrails and human review into the flow",
    ],
  },
  {
    key: "numbers",
    title: "Street-smart with numbers",
    color: "yellow",
    emoji: "🧮",
    points: [
      "Build the KPI before the feature: what number moves if this ships?",
      "Ops analytics: audit scores, ticket SLAs, overtime and variance",
      "Napkin-math ROI in the room, so deals don't wait for a spreadsheet",
      "Comfortable in Python/pandas, SQL-ish thinking and messy CSVs",
    ],
  },
];

export type Project = {
  title: string;
  kicker: string; // one-line category
  problem: string;
  built: string;
  impact: string; // TODO: sharpen with real numbers
  stack: string[];
  tags: ("PM" | "AI" | "Numbers" | "Build")[];
  link?: string;
  repo?: string;
  color: "pink" | "blue" | "yellow" | "lime" | "orange" | "purple";
  featured?: boolean;
};

// Things built in the AI era: pulled from GitHub.
export const projects: Project[] = [
  {
    title: "Implementation Tracker",
    kicker: "Internal SaaS · 0 → 1",
    problem:
      "Client onboarding lived in spreadsheets and Slack. Nobody knew which account was slipping until the client escalated.",
    built:
      "A full implementation-ops app: Gantt per client, auto 'At Risk / Blocked' flags when steps pass target date, deviation logs tagged by cause (client vs internal), @mentions, a Planner and client-safe PDF exports.",
    impact:
      "Shipped v1.0 → v1.6 in about 7 days from team feedback. Every client's status is now visible on one dashboard, grouped by KAM.",
    stack: ["Next.js", "Supabase", "TypeScript", "Vercel", "Claude Code"],
    tags: ["PM", "AI", "Build"],
    link: "https://implementation-tracker-navy.vercel.app",
    repo: "https://github.com/harshitrajputwork-create/implementation-tracker",
    color: "pink",
    featured: true,
  },
  {
    title: "AI Trial Setup Generator",
    kicker: "LLM feature · Sales ops",
    problem:
      "Setting up a free-trial workspace meant hand-typing each prospect's checklists, roles and SOPs, which took hours per trial.",
    built:
      "Upload the prospect's Excel or SOP file and GPT-4o parses it, fills the checklist structure and roles, and one click creates everything in the trial workspace.",
    impact: "Trial setup went from hours to minutes, so sales can demo on the prospect's own data.",
    stack: ["Node/Express", "OpenAI GPT-4o", "XLSX parsing", "REST APIs"],
    tags: ["AI", "Build", "PM"],
    repo: "https://github.com/harshitrajputwork-create/TaqticsImplAutomation",
    color: "blue",
    featured: true,
  },
  {
    title: "Ops Analytics Dashboard Series",
    kicker: "Custom reports · 10+ clients",
    problem:
      "Enterprise retail and F&B clients (GCC and India) needed answers the core product didn't give: Which stores fail audits? Which tickets breach SLA? Where is food cost leaking?",
    built:
      "A family of dashboards: ticket SLA analytics, QA/QC audit scoring, VM checklist scoring, chiller/freezer temperature compliance, and bun-variance (food cost) tracking.",
    impact:
      "Turned raw checklist data into weekly decisions for area managers. Became a repeatable, sellable custom-report offering.",
    stack: ["Python", "pandas", "Plotly", "Streamlit", "HTML reports"],
    tags: ["Numbers", "AI", "Build"],
    repo: "https://github.com/harshitrajputwork-create/ticket-analytics-dashboard-v2",
    color: "yellow",
    featured: true,
  },
  {
    title: "Excess Hours → Payroll Uploader",
    kicker: "Workforce ops tool",
    problem:
      "HR was converting attendance exports (\"01h 32m - overtime\") into payroll bulk-upload sheets by hand every cycle.",
    built:
      "A Streamlit tool that parses deviation strings, nets overtime against undertime per employee and outputs a ready-to-upload Excel.",
    impact: "A manual, error-prone monthly task became an upload-and-download job.",
    stack: ["Python", "Streamlit", "openpyxl"],
    tags: ["Numbers", "Build"],
    repo: "https://github.com/harshitrajputwork-create/Al-mana-Excess-Hours--Bulk-upload-csv-",
    color: "lime",
  },
  {
    title: "GramEEE: Scheme Finder",
    kicker: "Side project · GovTech",
    problem: "Rural citizens can't find which government schemes they qualify for.",
    built: "A scheme repository with browse, a guided eligibility finder and program pages.",
    impact: "Shows consumer UX thinking outside B2B SaaS.",
    stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    tags: ["PM", "Build"],
    repo: "https://github.com/harshitrajputwork-create/Gramee",
    color: "orange",
  },
  {
    title: "Kosha Life",
    kicker: "D2C brand site",
    problem: "A natural skincare brand needed a premium storefront feel.",
    built: "A Next.js brand site with product benefit storytelling.",
    impact: "End-to-end: brand positioning → copy → shipped site.",
    stack: ["Next.js", "Tailwind"],
    tags: ["Build"],
    repo: "https://github.com/harshitrajputwork-create/Koshalife",
    color: "purple",
  },
  {
    title: "Bonjour Studio",
    kicker: "EdTech landing",
    problem: "Online French classes (A1–B1, DELF prep) needed a site that converts.",
    built: "A Next.js 16 marketing site with animated sections.",
    impact: "Live on Vercel.",
    stack: ["Next.js 16", "Tailwind v4", "Framer Motion"],
    tags: ["Build"],
    link: "https://bonjour-studio.vercel.app",
    repo: "https://github.com/harshitrajputwork-create/bonjour-studio",
    color: "blue",
  },
  {
    title: "TripSplit",
    kicker: "Weekend build",
    problem: "Three friends, one trip, zero clarity on who owes whom.",
    built: "A trip expense splitter with minimum-transactions settle-up.",
    impact: "Solved my own problem in one sitting.",
    stack: ["HTML", "JS"],
    tags: ["Numbers", "Build"],
    link: "https://tripsplit-snowy.vercel.app",
    color: "pink",
  },
];

// Case studies from the original Notion + super.site portfolio.
// TODO: paste the titles/summaries from https://harshit-project-portfolio.super.site/
export const classicCaseStudies: { title: string; summary: string; link?: string }[] = [
  {
    title: "Pre-AI case studies",
    summary:
      "Product teardowns, RCA and feature case studies from my original portfolio. Moving them here soon.",
    link: "https://harshit-project-portfolio.super.site/",
  },
];

// Friends' / collaborators' projects.
export const friends: { title: string; by: string; summary: string; link: string }[] = [
  {
    title: "MockAI: PM Interview Engine",
    by: "Anant",
    summary: "An AI mock-interviewer for product management interviews.", // TODO: refine
    link: "https://app.notion.com/p/MockAI-PM-Interview-Engine-ba62b6ff95c9829ca6b5019cd9452119",
  },
  {
    title: "Anant's portfolio",
    by: "Anant",
    summary: "More PM projects & case studies.",
    link: "https://app.notion.com/p/Hi-I-m-Anant-1-15f2b6ff95c982c2aa8e81abe4c701fc",
  },
];

export const experience = [
  {
    when: "2025 — now",
    role: "Product Manager",
    org: "Taqtics",
    what:
      "Frontline-ops SaaS (checklists, audits, tickets, e-learning) for retail & F&B chains in India and the GCC. Own discovery → spec → rollout, plus AI tooling for implementation and sales.",
  },
  // TODO: verify/adjust earlier roles
  { when: "Earlier", role: "Ops & growth roles", org: "Genpact · BYJU'S · Begin · Connect", what: "Customer, sales and operations roles where I learned how businesses actually make money." },
  { when: "2019 — 2022", role: "B.Sc. Electronics", org: "SGTB Khalsa College, DU", what: "Engineering brain, business curiosity." },
];

export const toolbox = [
  "Claude Code", "ChatGPT / GPT-4o", "Cursor", "Next.js", "Supabase", "Vercel",
  "Python · pandas", "Streamlit", "Plotly", "SQL", "Notion", "Figma", "Jira", "Excel wizardry",
];
