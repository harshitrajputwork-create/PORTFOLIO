// ─────────────────────────────────────────────────────────────────────────────
// ALL site content lives here. Edit this file to update the portfolio —
// no need to touch any component. Long-form case text is in content/cases.ts.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Harshit Rajput",
  role: "Product @ Taqtics",
  tagline: "I ship products, not decks.",
  intro:
    "I've shipped a two-sided marketplace from zero, run fraud analytics for a US fintech, and now own discovery-to-delivery on a SaaS platform used by 25+ brands. " +
    "I start with the user and the numbers, then use AI to get a working product in front of people fast.",
  email: "harshitrajputwork@gmail.com",
  github: "https://github.com/harshitrajputwork-create",
  linkedin: "https://www.linkedin.com/in/harshit-rajput-9a9a69189/",
  photo: "/harshit.jpg",
  resume: "", // put a PDF in /public and set "/resume.pdf" to show a Resume button
  location: "New Delhi, India",
};

// Big numbers strip: every one of these is on the resume and can be defended in an interview.
export const stats = [
  { value: "~95%", label: "less implementation effort with an AI config engine" },
  { value: "70%", label: "faster issue resolution after a workflow redesign" },
  { value: "65%", label: "vendor-to-client conversion in a marketplace's first month" },
  { value: "30%", label: "lower frontline attrition reported by clients" },
  { value: "50+", label: "dashboards shipped via a self-serve analytics layer" },
  { value: "25+", label: "brands across US, GCC, EU & Indonesia" },
];

// Industries touched through work or case studies. Shown as a sticker strip.
export const industries = [
  "Marketplaces", "Fintech", "B2B SaaS", "AI / LLM apps", "EdTech", "EV & Energy", "Telecom", "Pet care", "Retail & F&B", "Hardware",
];

// The 3 things the site must prove.
export const pillars = [
  {
    key: "pm",
    title: "PM fundamentals",
    color: "pink",
    emoji: "🧭",
    points: [
      "Problem first: user interviews, personas and journey maps before any solution",
      "PRDs, prioritisation and 30/60/90-day rollouts that ship on the standard product",
      "Root-cause the metric: slow resolution was really unowned hand-offs",
      "Two-sided thinking: supply, demand and the monetisation model that connects them",
    ],
  },
  {
    key: "ai",
    title: "AI-native PM",
    color: "blue",
    emoji: "⚡",
    points: [
      "Shipped an LLM engine that turns SOP documents into working product setups",
      "Build my own prototypes: Next.js, Supabase and Claude Code, live on Vercel",
      "Designed an AI interviewer with rubric scoring, difficulty tuning and voice",
      "Guardrails and human review designed in, not bolted on",
    ],
  },
  {
    key: "numbers",
    title: "Street-smart with numbers",
    color: "yellow",
    emoji: "🧮",
    points: [
      "Define the metric before the feature: what number moves if this ships?",
      "Fraud anomaly signals on large fintech transaction data",
      "Unit economics, take rates and ROI math live in the room",
      "SQL, Python, Power BI and Tableau: comfortable in the raw data",
    ],
  },
];

export type Color = "pink" | "blue" | "yellow" | "lime" | "orange" | "purple";

export type Project = {
  title: string;
  kicker: string; // one-line category
  problem: string;
  built: string;
  impact: string;
  stack: string[];
  tags: ("PM" | "AI" | "Numbers" | "Build")[];
  link?: string;
  repo?: string;
  color: Color;
  featured?: boolean;
};

// Things built and shipped.
export const projects: Project[] = [
  {
    title: "AI Configuration Engine",
    kicker: "LLM feature · Onboarding",
    problem:
      "Every new enterprise account needed its SOPs rebuilt by hand in the product. Go-lives waited on engineering and custom builds.",
    built:
      "Upload a client's SOP or Excel file and an LLM (GPT-4o) parses it into checklists, roles and workflows. One click creates the working setup.",
    impact: "15+ enterprise accounts went live with no custom implementation, and implementation effort fell by about 95%.",
    stack: ["LLM (GPT-4o)", "Node/Express", "XLSX parsing", "REST APIs"],
    tags: ["AI", "PM", "Build"],
    repo: "https://github.com/harshitrajputwork-create/TaqticsImplAutomation",
    color: "blue",
    featured: true,
  },
  {
    title: "Implementation Tracker",
    kicker: "Internal tool · 0 → 1",
    problem:
      "Client onboarding lived in spreadsheets and chat. Nobody knew which account was slipping until the client escalated.",
    built:
      "A Gantt per client, automatic 'At Risk / Blocked' flags when steps pass target date, deviation logs tagged by cause, @mentions, a planner and client-safe PDF exports.",
    impact: "Went from v1.0 to v1.6 in about a week, driven by team feedback. Every account's status is now on one screen.",
    stack: ["Next.js", "Supabase", "TypeScript", "Vercel", "Claude Code"],
    tags: ["PM", "AI", "Build"],
    link: "https://implementation-tracker-navy.vercel.app",
    repo: "https://github.com/harshitrajputwork-create/implementation-tracker",
    color: "pink",
    featured: true,
  },
  {
    title: "Self-serve Analytics Layer",
    kicker: "Data product · 50+ dashboards",
    problem:
      "One-off reporting requests kept landing on the engineering backlog: which locations fail checks, which tickets breach SLA, where cost is leaking.",
    built:
      "A configurable analytics layer over internal and external APIs, with a reusable family of dashboards for SLAs, audit scores, compliance and cost variance.",
    impact: "50+ client dashboards shipped, and custom reporting came off the engineering backlog.",
    stack: ["Python", "pandas", "Plotly", "Streamlit", "APIs"],
    tags: ["Numbers", "AI", "Build"],
    repo: "https://github.com/harshitrajputwork-create/ticket-analytics-dashboard-v2",
    color: "yellow",
    featured: true,
  },
  {
    title: "Overtime → Payroll Uploader",
    kicker: "Workforce ops tool",
    problem:
      "HR converted attendance exports (\"01h 32m - overtime\") into payroll upload sheets by hand every cycle.",
    built:
      "A Streamlit tool that parses deviation strings, nets overtime against undertime per employee and outputs an upload-ready Excel file.",
    impact: "A manual, error-prone monthly task became an upload-and-download job.",
    stack: ["Python", "Streamlit", "openpyxl"],
    tags: ["Numbers", "Build"],
    repo: "https://github.com/harshitrajputwork-create/Al-mana-Excess-Hours--Bulk-upload-csv-",
    color: "lime",
  },
  {
    title: "GramEEE: Scheme Finder",
    kicker: "Consumer · GovTech",
    problem: "Rural citizens can't find which government schemes they qualify for.",
    built: "A scheme repository with browse, a guided eligibility finder and program pages.",
    impact: "Consumer discovery UX for a low-digital-literacy audience.",
    stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    tags: ["PM", "Build"],
    repo: "https://github.com/harshitrajputwork-create/Gramee",
    color: "orange",
  },
  {
    title: "Kosha Life",
    kicker: "D2C brand site",
    problem: "A natural skincare brand needed a premium storefront feel.",
    built: "A Next.js brand site with benefit-led product storytelling.",
    impact: "End to end: positioning, copy and a shipped site.",
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
    kicker: "Weekend build · Fintech-lite",
    problem: "Three friends, one trip, zero clarity on who owes whom.",
    built: "A trip expense splitter that settles up in the fewest transactions.",
    impact: "Solved my own problem in one sitting.",
    stack: ["HTML", "JS"],
    tags: ["Numbers", "Build"],
    link: "https://tripsplit-snowy.vercel.app",
    color: "pink",
  },
];

// Case studies: one per industry. Each gets its own page at /case/<slug>.
export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  industry: string;
  color: Color;
  emoji: string;
  summary: string;
  tags: string[];
  tools: string[];
  when?: string;
  cover?: string;
  hook: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mockai",
    title: "MockAI: an AI interviewer for PM case rounds",
    kicker: "AI product · live app",
    industry: "AI / EdTech",
    color: "blue",
    emoji: "🤖",
    summary:
      "Built for a friend preparing for PM interviews: 15 real cases, 4 difficulty levels up to MAANG, voice mode, 6-dimension rubric scoring, focused drills and an analytics view to measure retention.",
    tags: ["LLM product", "Rubric design", "Voice", "Analytics"],
    tools: ["Lovable", "LLM"],
    hook: { value: "6", label: "scored skills, from framing to prioritisation" },
  },
  {
    slug: "pet-care-marketplace",
    title: "INFINITY: a one-stop pet-care marketplace",
    kicker: "Two-sided marketplace · Miro",
    industry: "Consumer marketplace",
    color: "purple",
    emoji: "🐾",
    summary:
      "Sector research, a persona, customer journey, services map, user and vendor flows, and wireframes for a marketplace that puts grooming, training, walking and adoption in one app.",
    tags: ["Sector research", "Persona", "User flows", "Wireframes"],
    tools: ["Miro", "Balsamiq"],
    when: "2024",
    hook: { value: "2", label: "sides designed: pet parents and service vendors" },
  },
  {
    slug: "kazam",
    title: "Kazam EV: 4 features for India's EV charging app",
    kicker: "Product case · EV / Climate",
    industry: "EV & Energy",
    color: "pink",
    emoji: "⚡",
    summary:
      "Four personas, their charging pain points, and four features with mock-ups, expected impact and success metrics: demand-based price bids, community filters, SOS mode and P2P solar charging.",
    tags: ["Personas", "Feature design", "Metrics", "Wireframes"],
    tools: ["Miro", "PPT"],
    cover: "/case/kazam/s5.jpg",
    hook: { value: "28.5%", label: "CAGR of India's EV market that sizes the bet" },
  },
  {
    slug: "telecom-churn",
    title: "Why 27% of telecom customers churned",
    kicker: "Data case · Telecom",
    industry: "Telecom / Subscriptions",
    color: "yellow",
    emoji: "📉",
    summary:
      "Cleaned a 7,043-customer dataset, wrote DAX measures and built a two-page Power BI dashboard. Found that month-to-month, low-tenure, fibre customers paying by e-check are the ones who leave.",
    tags: ["DAX", "Cohorts", "Recommendations"],
    tools: ["Power BI"],
    when: "Dec 2021",
    cover: "/case/churn/risk.png",
    hook: { value: "1,869", label: "of 7,043 customers churned in a month" },
  },
  {
    slug: "ldr",
    title: "Light & dark detection on Arduino",
    kicker: "Hardware · Electronics",
    industry: "Hardware / IoT",
    color: "lime",
    emoji: "🔌",
    summary:
      "Two LDR sensors, an Arduino Uno and a 16x2 LCD that shows light/dark states. The LCD is driven bit by bit in C. This is where the engineering brain comes from.",
    tags: ["C/C++", "Arduino", "Embedded"],
    tools: ["Tinkercad"],
    when: "Jan 2022",
    hook: { value: "4", label: "states from 2 sensors on 1 LCD" },
  },
];

export const experience = [
  {
    when: "Apr '25 — now",
    role: "Product Specialist",
    org: "Taqtics · SaaS platform",
    what:
      "Own discovery and delivery across onboarding, workflow automation, ticketing and analytics for 25+ brands. Shipped the AI config engine (~95% less implementation effort), a 30/60/90-day onboarding product line (30% lower attrition), a single SLA-governed issue workflow (70% faster resolution) and the first documentation library.",
  },
  {
    when: "Mar — Sep '24",
    role: "Product Management Intern",
    org: "Connect · two-sided marketplace",
    what:
      "Shipped a marketplace website and app from zero, coordinating design, engineering and content, and hit 65% vendor-to-client conversion in month one. Built the FY24 monetisation model and sequenced the backlog around what could be validated first.",
  },
  {
    when: "Feb '23 — Mar '24",
    role: "MIS & Fraud Analytics Associate",
    org: "Genpact · US fintech client",
    what:
      "Defined anomaly signals from large transaction datasets that were adopted into ongoing fraud monitoring. Built Power BI and Excel dashboards used team-wide that cut error resolution time by 20%.",
  },
  {
    when: "Sep — Oct '22",
    role: "Business Development Intern",
    org: "BYJU'S · EdTech",
    what: "Closed ₹50,000 in four weeks from 120+ self-sourced leads through product demos, objection handling and CRM follow-up.",
  },
  {
    when: "2019 — 2022",
    role: "B.Sc. (Hons.) Electronics, 1st Division",
    org: "SGTB Khalsa College, University of Delhi",
    what:
      "President of ETRAM, the Western Dance Society: led 50+ members and secured brand partnerships including Realme. Represented Haryana twice at the National Energy Conservation Programme (BEE, Govt. of India).",
  },
];

export const toolbox = [
  "Claude Code", "LLM workflows", "Prompt design", "Next.js", "Supabase", "Vercel",
  "SQL", "Python", "Power BI", "Tableau", "GA4", "A/B testing",
  "Figma", "Miro", "Balsamiq", "JIRA", "Notion", "REST APIs",
];
