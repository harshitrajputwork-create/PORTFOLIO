// ─────────────────────────────────────────────────────────────────────────────
// ALL site content lives here. Long-form case text is in content/cases.ts.
// Keep it lean: every item on the homepage should earn its place.
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Harshit Rajput",
  title: "Product Specialist at Taqtics",
  headline: "I turn complex problems into simple, useful products.",
  intro:
    "I helped launch a two-sided marketplace at Connect, worked inside a US fintech's risk and payments operations at Genpact, and now drive product discovery, prioritisation and delivery at Taqtics, turning customer problems into features used by 25+ enterprise brands. Across all of it, I start with the user's problem, let data guide the decision, and build to test ideas.",
  email: "harshitrajputwork@gmail.com",
  linkedin: "https://www.linkedin.com/in/harshit-rajput-9a9a69189/",
  github: "https://github.com/harshitrajputwork-create",
  resume: "/Harshit-Rajput-Resume.pdf",
  photo: "/harshit.jpg",
  location: "New Delhi, India",
};

export type Color = "pink" | "blue" | "yellow" | "lime" | "orange" | "purple";

// Three proof points, each with the context needed to judge it.
export const proof = [
  {
    value: "30 sec",
    label: "to set up a client checklist",
    context: "Down from 3–4 checklists a day by hand, after I added AI-generated setup.",
    link: "/case/ai-configuration",
    color: "yellow" as Color,
  },
  {
    value: "~30%",
    label: "lower frontline attrition",
    context: "Average reported by 12–13 clients after using the 30/60/90-day onboarding paths I built.",
    link: "/case/onboarding-paths",
    color: "pink" as Color,
  },
  {
    value: "70%",
    label: "fewer reopened tickets",
    context: "Same-category tickets at a location stopped coming back once a root-cause step was required to close.",
    link: "#more-work",
    color: "lime" as Color,
  },
];

// The three flagship cases. Each has a full page at /case/<slug>.
export type Featured = {
  slug: string;
  title: string;
  kicker: string;
  where: string;
  when: string;
  color: Color;
  flow: string[]; // mini visual on the card
  embed?: { src: string; open: string; label: string }; // replaces the mini visual
  problem: string;
  decision: string;
  result: string;
};

export const featured: Featured[] = [
  {
    slug: "ai-configuration",
    title: "Client setup in 30 seconds with an AI configuration engine",
    kicker: "B2B SaaS · AI · Onboarding",
    where: "Taqtics",
    when: "2025",
    color: "yellow",
    flow: ["Client SOP", "AI", "Form JSON", "Live checklist"],
    problem: "Every client checklist was configured by hand. The team managed 3–4 a day, so go-lives waited on setup.",
    decision: "The product already stored forms as JSON. I got engineering to add a JSON upload and built an AI tool that turns an SOP into that JSON.",
    result: "About 30 seconds per checklist. 15+ enterprise accounts went live without custom implementation.",
  },
  {
    slug: "onboarding-paths",
    title: "30/60/90-day onboarding paths for frontline teams",
    kicker: "B2B SaaS · Retention · Learning",
    where: "Taqtics",
    when: "2025",
    color: "pink",
    flow: ["Day 1–30", "Train", "Practise", "Manager test"],
    problem: "Retail and restaurant chains lose new hires early. There was no fixed plan for their first weeks, so each store onboarded differently.",
    decision: "I built scheduled paths of training, short assignments and a manager-led practical test, then made them configurable for other uses.",
    result: "Adopted by 20+ clients. 12–13 of them reported attrition drops, averaging ~30%.",
  },
  {
    slug: "connect-marketplace",
    title: "Launching a services marketplace by going narrow first",
    kicker: "Marketplace · 0 → 1 · B2C",
    where: "Connect",
    when: "2024",
    color: "blue",
    flow: ["4 verticals", "Pick 2", "Few vendors", "Trust → growth"],
    embed: {
      src: "https://miro.com/app/live-embed/uXjVLvFBvoE=/?share_link_id=429930558861&embedId=592354660804&embedSource=oembed&embedMode=view_only_without_ui",
      open: "https://miro.com/app/board/uXjVLvFBvoE=/",
      label: "Our exploration board from Connect. Drag and zoom inside it.",
    },
    problem: "A startup spread across home services, pet care, entertainment and construction, with no traction in any of them.",
    decision: "We focused on home services and construction, where vendors were easy to bring on and services were easy to list, and piloted with a few vendors.",
    result: "52 of 80 vendor quotes were accepted by clients in the first month (65%).",
  },
];

// Smaller professional work: no separate page, the card says enough.
export type Work = {
  title: string;
  where: string;
  problem: string;
  what: string;
  result: string;
  link?: { label: string; href: string };
};

export const moreWork: Work[] = [
  {
    title: "Root cause before a ticket can close",
    where: "Taqtics · Issue tracking",
    problem: "Tickets moved between departments with no owner, and the same issues kept coming back.",
    what: "Closing a ticket now requires a root-cause note plus corrective and preventive actions. Clients can configure the workflow.",
    result: "70% fewer reopened tickets in the same category at a location.",
  },
  {
    title: "Custom reports without custom builds",
    where: "Taqtics · Analytics",
    problem: "Every enterprise wanted its own dashboard. Building each one would have bloated the product.",
    what: "I asked engineering for a slot where a Python script can be uploaded. I write each script with AI help, and it pulls live data from our APIs.",
    result: "50+ client dashboards shipped with no custom development.",
  },
  {
    title: "Opening the self-serve funnel",
    where: "Taqtics · Growth",
    problem: "Complex SaaS scares new buyers, and every question needed a sales or onboarding call.",
    what: "I built an ROI and budget planner for the pricing page, interactive demo videos and the first documentation library (8 modules).",
    result: "Prospects can size Taqtics themselves, and internal teams reuse the material with every new client.",
    link: { label: "Try the ROI planner", href: "https://taqtics.co/pricing/" },
  },
  {
    title: "One tracker for the whole client lifecycle",
    where: "Taqtics · Internal tool",
    problem: "Nobody could see which account was slipping as it moved from free trial to implementation to account management.",
    what: "A tracker with timelines per client, automatic at-risk flags and deviation logs. I built it with Next.js, Supabase and Claude Code.",
    result: "Used daily by 10–15 people across trial, implementation and account management, with read-only access for sales.",
  },
];

// Side product with its own page.
export const sideProduct = {
  slug: "mockai",
  title: "MockAI: an AI interviewer for PM case rounds",
  why: "My prep group couldn't schedule enough mock interviews, so I built one we could run any time.",
  what: "15 real cases, 4 difficulty levels, text or voice, and a report scoring 6 PM skills.",
  link: "https://mockaipminterview.lovable.app/",
};

// Earlier, smaller case studies.
export const earlier = [
  {
    slug: "kazam",
    title: "Kazam EV: which feature to ship first",
    note: "Self-initiated product case. One of the features I proposed later went live in Kazam's app.",
    tag: "EV · Product case",
  },
  {
    slug: "telecom-churn",
    title: "Finding high-churn segments in a telecom dataset",
    note: "Early analytics practice on IBM's sample Telco dataset, in Power BI.",
    tag: "Analytics · Practice",
  },
];

// Small builds for friends and myself.
export const sideQuests = [
  { title: "Kosha Life", story: "Brand site for a friend who started his own D2C skincare label.", href: "https://github.com/harshitrajputwork-create/Koshalife" },
  { title: "GramEEE", story: "Government-scheme finder for a friend working in the sustainability sector.", href: "https://github.com/harshitrajputwork-create/Gramee" },
  { title: "Bonjour Studio", story: "Website for a friend who started teaching French.", href: "https://bonjour-studio.vercel.app" },
  { title: "TripSplit", story: "Splitwise felt like too much for one trip, so I built a simpler splitter.", href: "https://tripsplit-snowy.vercel.app" },
];

// Journey timeline, oldest first. Kept short so it reads in one glance.
export type Step = {
  when: string;
  org: string;
  role: string;
  line: string;
  link?: { label: string; href: string };
  state?: "now" | "next";
};

export const journey: Step[] = [
  {
    when: "2019–22",
    org: "University of Delhi",
    role: "B.Sc. Electronics",
    line: "Led a 50+ member society; represented Haryana twice in national energy conservation.",
    link: { label: "Arduino build", href: "/case/ldr" },
  },
  { when: "2022", org: "BYJU'S", role: "Business Development Intern", line: "Closed ₹50,000 in 4 weeks from 120+ self-sourced leads." },
  {
    when: "2023–24",
    org: "Genpact",
    role: "MIS & Fraud Analytics, US fintech",
    line: "Fraud signals and risk reporting across payments, core banking, identity and lending. 20% faster error resolution.",
  },
  {
    when: "2024",
    org: "Connect",
    role: "Product Management Intern",
    line: "Helped launch a services marketplace; 65% quote-to-client conversion in month one.",
    link: { label: "Read the case", href: "/case/connect-marketplace" },
  },
  { when: "Late 2024", org: "CAT prep", role: "97%ile in Quant, strong DILR", line: "VARC didn't go my way. By then I knew I wanted to build products, so I went straight into product work." },
  { when: "2025–now", org: "Taqtics", role: "Product Specialist", line: "Discovery, prioritisation and delivery for 25+ enterprise brands.", state: "now" },
  { when: "Next", org: "Your team?", role: "Product role", line: "B2B, B2C or marketplaces. The problem matters more than the label.", state: "next" },
];
