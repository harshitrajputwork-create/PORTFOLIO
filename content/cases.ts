// Long-form content for /case/<slug> pages.

export type Block =
  | { kind: "text"; heading: string; body: string }
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "stats"; heading: string; items: { value: string; label: string }[] }
  | { kind: "cards"; heading: string; items: { title: string; sub: string; body: string; color: string }[] }
  | {
      kind: "features";
      heading: string;
      items: { title: string; objective: string; how: string[]; impact: string[]; metrics: string[]; image?: string; color: string }[];
    }
  | { kind: "images"; heading: string; items: { src: string; alt: string }[] }
  | { kind: "embed"; heading: string; src: string; title: string; height: number; open: string; note?: string }
  | { kind: "video"; heading: string; src?: string; poster?: string; caption: string }
  | { kind: "code"; heading: string; lang: string; code: string; note?: string }
  | { kind: "table"; heading: string; headers: string[]; rows: string[][]; note?: string }
  | { kind: "chips"; heading: string; groups: { label: string; color: string; items: string[] }[] }
  | { kind: "flow"; heading: string; steps: { title: string; sub: string }[]; note?: string }
  | { kind: "options"; heading: string; items: { name: string; verdict: "chosen" | "rejected" | "later"; why: string }[] };

export type CaseMeta = {
  title: string;
  kicker: string;
  color: string;
  summary: string;
  facts: { label: string; value: string }[];
  tldr?: { problem: string; decision: string; result: string };
};

export const caseMeta: Record<string, CaseMeta> = {
  "ai-configuration": {
    title: "Client setup in 30 seconds with an AI configuration engine",
    kicker: "B2B SaaS · AI · Onboarding",
    color: "yellow",
    summary: "How I spotted that client setup was a data-entry problem, not an engineering problem, and fixed it with a JSON upload and an AI tool.",
    facts: [
      { label: "Where", value: "Taqtics, frontline-operations SaaS" },
      { label: "My role", value: "Product Specialist. Found the problem, proposed the fix, built the AI tool" },
      { label: "With", value: "Engineering (JSON upload), implementation team (users)" },
      { label: "Status", value: "Live, used for every new client" },
    ],
    tldr: {
      problem: "Checklists were configured by hand, 3–4 a day, which held up every go-live.",
      decision: "Upload JSON directly and let AI write the JSON from the client's SOP.",
      result: "About 30 seconds per checklist; 15+ enterprise accounts live with no custom implementation.",
    },
  },
  "onboarding-paths": {
    title: "30/60/90-day onboarding paths for frontline teams",
    kicker: "B2B SaaS · Retention · Learning",
    color: "pink",
    summary: "A structured first 90 days for new store staff, which I later made configurable for seasonal campaigns and promotions.",
    facts: [
      { label: "Where", value: "Taqtics" },
      { label: "My role", value: "Product Specialist. Discovery, spec and rollout" },
      { label: "With", value: "Store and area managers at client brands, engineering" },
      { label: "Status", value: "Live with 20+ clients" },
    ],
    tldr: {
      problem: "New frontline hires left early. Nobody gave them a clear plan for their first weeks.",
      decision: "Scheduled paths of training, short assignments and a manager-led practical test, built to be configurable.",
      result: "20+ clients adopted it. 12–13 reported lower attrition, averaging ~30%.",
    },
  },
  "connect-marketplace": {
    title: "Launching a services marketplace by going narrow first",
    kicker: "Marketplace · 0 → 1 · B2C",
    color: "blue",
    summary: "Why we picked two verticals out of four, started with a handful of vendors, and charged vendors from day one.",
    facts: [
      { label: "Where", value: "Connect, early-stage startup" },
      { label: "My role", value: "Product Management Intern on a product team of four" },
      { label: "When", value: "Mar – Sep 2024" },
      { label: "Status", value: "Launched: website and mobile app" },
    ],
    tldr: {
      problem: "Four verticals at once, and no traction or trust in any of them.",
      decision: "Go deep on home services and construction with a small vendor pilot, and charge vendors a one-time subscription.",
      result: "52 of 80 vendor quotes accepted by clients in month one (65%).",
    },
  },
  mockai: {
    title: "MockAI: an AI interviewer for PM case rounds",
    kicker: "Side product · AI",
    color: "purple",
    summary: "Built for my PM prep group when we couldn't find time for mock interviews.",
    facts: [
      { label: "Built by", value: "Harshit Rajput (design, build, testing)" },
      { label: "Built with", value: "Lovable and an LLM" },
      { label: "Users", value: "My PM interview prep group" },
      { label: "Status", value: "Live" },
    ],
  },
  kazam: {
    title: "Kazam EV: which feature to ship first",
    kicker: "Product case · EV",
    color: "pink",
    summary: "A self-initiated product case: four personas, four feature ideas, and which one I'd ship first. One of the ideas later went live in Kazam's app.",
    facts: [
      { label: "Type", value: "Self-initiated product case" },
      { label: "Tools", value: "Miro, PowerPoint" },
    ],
  },
  "telecom-churn": {
    title: "Finding high-churn segments in a telecom dataset",
    kicker: "Analytics practice · Power BI",
    color: "yellow",
    summary: "Early practice on IBM's sample Telco dataset: which customer segments churn most, and what I'd test.",
    facts: [
      { label: "Data", value: "IBM Telco Customer Churn sample (fictional), 7,043 rows" },
      { label: "Tools", value: "Power BI, DAX" },
      { label: "When", value: "Dec 2021" },
    ],
  },
  ldr: {
    title: "Light and dark detection on Arduino",
    kicker: "College build · Electronics",
    color: "lime",
    summary: "From my electronics degree: two light sensors, an Arduino and an LCD, programmed in C.",
    facts: [
      { label: "When", value: "Jan 2022, B.Sc. Electronics" },
      { label: "Tools", value: "Arduino Uno, C/C++, Tinkercad" },
    ],
  },
};

export const caseBodies: Record<string, Block[]> = {

  "ai-configuration": [
    {
      kind: "text",
      heading: "The problem",
      body:
        "Taqtics runs checklists, SOPs and audits for retail, restaurant and hospitality chains. Clients' checklists are long, and each one had to be configured in the product by hand: questions, answer types, scores, sections. The team could do 3–4 a day. A new client with dozens of checklists waited weeks to go live, and the implementation team did nothing else.",
    },
    {
      kind: "text",
      heading: "What I noticed",
      body:
        "Underneath the form builder, the product was just storing JSON. The slow part wasn't the product. It was people translating a client's document into that structure one click at a time. That's a translation job, which is something AI does well.",
    },
    {
      kind: "options",
      heading: "Options I weighed",
      items: [
        { name: "Hire or train more implementers", verdict: "rejected", why: "Cost grows with every client, and setup would stay slow." },
        { name: "Ready-made templates per industry", verdict: "rejected", why: "Every enterprise has its own SOPs and scoring. Templates would still need heavy editing." },
        { name: "Engineering builds a full document importer", verdict: "rejected", why: "Months of work for a problem that changes with every client's document format." },
        { name: "JSON upload in the product + AI that writes the JSON", verdict: "chosen", why: "A small change for engineering. The AI part could be built and improved outside the core product, without waiting on a release." },
      ],
    },
    {
      kind: "flow",
      heading: "How it works now",
      steps: [
        { title: "Client SOP", sub: "Checklist or audit in any format" },
        { title: "AI tool", sub: "Internal tool I built on Lovable" },
        { title: "Form JSON", sub: "Questions, answer types, weightages" },
        { title: "Upload", sub: "Engineering added the upload slot" },
        { title: "Live checklist", sub: "Editable in the product" },
      ],
      note: "Messy or ambiguous SOPs: the AI fills gaps from context. Anything it gets wrong is edited in the normal form builder after upload, so no separate review step is needed.",
    },
    {
      kind: "stats",
      heading: "What changed",
      items: [
        { value: "30 sec", label: "per checklist, down from 3–4 checklists a day" },
        { value: "15+", label: "enterprise accounts live with no custom implementation" },
        { value: "0", label: "engineering needed per new client setup" },
      ],
    },
    {
      kind: "text",
      heading: "Same idea, second problem: custom reports",
      body:
        "Clients kept asking for their own dashboards, and too much customisation kills a SaaS product. Instead of building report after report, I asked engineering for a slot where a Python script can be uploaded. Each script pulls live data from our APIs, and I write them with AI help. That covered 50+ client dashboards without custom development.",
    },
    {
      kind: "list",
      heading: "What I'd do next",
      items: [
        "Track how often an uploaded form is edited afterwards, as a simple accuracy measure for the AI",
        "Show a preview before upload, so obvious mistakes are caught earlier",
        "Build the upload into the product itself, so clients can set up their own checklists",
      ],
    },
  ],

  "onboarding-paths": [
    {
      kind: "text",
      heading: "The problem",
      body:
        "Retail, restaurant and multi-store chains have very high frontline attrition. Pay is one reason, but so is the first month. New staff get little attention, no fixed plan and patchy training, so they're unsure what their job is and leave. We already had a course library, but it was just videos with no structure around them.",
    },
    {
      kind: "flow",
      heading: "What I built",
      steps: [
        { title: "Plan", sub: "Set a 30/60/90-day schedule per role" },
        { title: "Train", sub: "Courses on fixed days" },
        { title: "Practise", sub: "Short assignments in between" },
        { title: "Prove it", sub: "Manager records a live practical test" },
        { title: "Visibility", sub: "Head office sees every store's progress" },
      ],
      note: "Example: a new barista is tested on serving a coffee. The manager records it and it goes to head office, so every store trains to the same standard.",
    },
    {
      kind: "text",
      heading: "The decision that widened it",
      body:
        "It was requested for onboarding, but I built it as a general schedule of training and checks rather than a new-hire feature. With simple configuration it covered two more needs that clients raised later: seasonal campaigns (summer, Diwali and winter visual merchandising, where every store has to learn the new setup before launch) and promotion readiness (minimum courses and tests for each role before someone moves up).",
    },
    {
      kind: "stats",
      heading: "Results",
      items: [
        { value: "20+", label: "clients adopted it" },
        { value: "12–13", label: "clients reported lower frontline attrition" },
        { value: "~30%", label: "average attrition drop across those clients (client-reported)" },
      ],
    },
    {
      kind: "list",
      heading: "What I'd do next",
      items: [
        "Measure 90-day retention in the product, instead of relying on client reports",
        "Compare stores that finish their path with stores that don't",
      ],
    },
  ],

  "connect-marketplace": [
    {
      kind: "text",
      heading: "Where we started",
      body:
        "Connect was an early-stage startup connecting customers with service providers. It was spread across four verticals at once: home services, pet care, entertainment and construction. Being spread that thin meant building four supply sides and four sets of trust, with little traction in any of them.",
    },
    {
      kind: "options",
      heading: "Which verticals to focus on",
      items: [
        { name: "Home services", verdict: "chosen", why: "Local vendors were easy to bring on, and their services are standard and easy to list." },
        { name: "Construction", verdict: "chosen", why: "Same as home services: easy supply and services that fit a fixed listing." },
        { name: "Entertainment", verdict: "rejected", why: "Every gig is different, so services don't fit a fixed listing, and matching is harder." },
        { name: "Pet care", verdict: "later", why: "Explored in depth, but parked so the team could go deep on two verticals first." },
      ],
    },
    {
      kind: "list",
      heading: "How we launched",
      items: [
        "Went vertical, not broad: a pilot with a few vendors, covering the whole journey from request to quote to service",
        "Used early customers' reviews and testimonials to build trust, so word of mouth could bring the next users",
        "Charged vendors a one-time subscription from the start, to test whether they would pay before building more",
        "Shipped a website and a mobile app, working with design, engineering and content",
        "Built the FY24 monetisation model: mapped every customer–vendor touchpoint to a possible revenue stream, then ordered the backlog by what we could validate first",
      ],
    },
    {
      kind: "stats",
      heading: "First month",
      items: [
        { value: "80", label: "vendor quotes sent to clients" },
        { value: "52", label: "quotes accepted and serviced" },
        { value: "65%", label: "vendor-to-client conversion" },
      ],
    },
    {
      kind: "embed",
      heading: "The exploration board",
      src: "https://miro.com/app/live-embed/uXjVLvFBvoE=/?share_link_id=429930558861&embedId=592354660804&embedSource=oembed&embedMode=view_only_without_ui&moveToViewport=-82000,-306000,128000,74000",
      title: "Connect sector exploration Miro board",
      height: 560,
      open: "https://miro.com/app/board/uXjVLvFBvoE=/",
      note: "The Miro board from this period: sector research, personas, user and vendor flows, and wireframes across the verticals we explored.",
    },
    {
      kind: "list",
      heading: "What I'd do differently",
      items: [
        "Set up tracking from launch day, so conversion and repeat use could be broken down by service type",
        "Test the vendor subscription price with a few different offers, instead of one price for everyone",
      ],
    },
  ],

  mockai: [
    {
      kind: "embed",
      heading: "Try it live",
      src: "https://mockaipminterview.lovable.app/",
      title: "MockAI PM Interview Engine",
      height: 680,
      open: "https://mockaipminterview.lovable.app/",
      note: "This is the real app running in the page. Pick a difficulty and start a case.",
    },
    {
      kind: "text",
      heading: "Why I built it",
      body:
        "My PM prep group kept running out of time for mock interviews, and feedback varied depending on who was interviewing. I built an interviewer we could use any time, with the same scoring every round.",
    },
    {
      kind: "chips",
      heading: "What it does",
      groups: [
        { label: "Interview", color: "purple", items: ["15 real cases, e.g. WhatsApp Search, Airbnb host supply", "4 phases: clarify, structure, deep dive, recommend", "Text or push-to-talk voice"] },
        { label: "Difficulty", color: "yellow", items: ["Easy: coaching, unlimited hints", "Medium: 5 hints, some pushback", "Hard: no hints, more pushback", "Hardest: numbers required, penalties for gaps"] },
        { label: "Feedback", color: "lime", items: ["Scores on 6 skills: framing, structure, clarifying, metrics, prioritisation, assumptions", "Report with strengths, gaps and an example answer", "Short drills on one skill"] },
      ],
    },
    {
      kind: "list",
      heading: "What I'd validate next",
      items: [
        "Whether the scores match what an experienced interviewer would give",
        "Where people stop partway through a case, and why",
        "Whether the difficulty levels feel meaningfully different to users",
      ],
    },
  ],

  kazam: [
    {
      kind: "text",
      heading: "The context",
      body:
        "Kazam is a hardware-agnostic EV charging platform building India's largest smart, affordable charging network. It wants to lead EV charging in India and beyond, and the long game is EVs as energy assets: homes store solar power in EVs and sell the excess.",
    },
    {
      kind: "stats",
      heading: "Why now",
      items: [
        { value: "$5.2B → $18.3B", label: "India EV market, 2024 → 2029" },
        { value: "28.5%", label: "CAGR" },
        { value: "1.3M → 15.3M", label: "EVs registered, 2018 → 2023 (PIB)" },
      ],
    },
    {
      kind: "cards",
      heading: "Who I designed for",
      items: [
        { title: "Aman, 28", sub: "Freelancer · Ola S1 Pro", color: "lime", body: "Can wait for cheaper slots, but peak pricing feels random and he can't negotiate." },
        { title: "Priya, 32", sub: "Corporate commuter · Okinawa", color: "yellow", body: "Wants stations with cafés and clean restrooms, but can only filter by distance and plug." },
        { title: "Neetu, 53", sub: "Business owner · Nexon EV", color: "pink", body: "Long trips and remote routes. No reliable roadside help when the battery runs out." },
        { title: "Rajiv, 42", sub: "Solar homeowner · Ola", color: "blue", body: "Sells excess solar to the grid at low rates and wants to monetise his home charger." },
      ],
    },
    {
      kind: "features",
      heading: "Four features, one per pain",
      items: [
        {
          title: "1 · Demand-based price requests",
          color: "purple",
          objective: "Let price-flexible users bid for a lower rate, so owners can shift demand to off-peak hours.",
          how: ["User picks a price band and sends a bid", "Owner sees clustered low bids and chooses to accept", "User is notified and charges at the agreed rate"],
          impact: ["Spreads load between peak and off-peak", "Better station utilisation", "Users save money"],
          metrics: ["% of users bidding", "Avg. off-peak price drop", "Peak congestion ↓", "Off-peak bookings ↑"],
          image: "/case/kazam/s5.jpg",
        },
        {
          title: "2 · Customised community filters",
          color: "lime",
          objective: "Save and share filters on price, plug type and nearby amenities.",
          how: ["Filter by ₹/kWh, charger type, café, restroom, Wi-Fi", "Save filters for repeat searches", "Share them to city EV communities"],
          impact: ["Faster, more relevant search", "Community-driven discovery"],
          metrics: ["% of bookings using a filter", "Top filter combos", "Time to find a charger ↓", "CSAT ↑"],
          image: "/case/kazam/s6.jpg",
        },
        {
          title: "3 · Emergency SOS mode",
          color: "pink",
          objective: "One tap for towing, a portable charger, a battery swap or a technician.",
          how: ["SOS button on the map", "Choose a service, and the nearest provider is assigned", "Live tracking until help arrives"],
          impact: ["Less range anxiety", "Trust that keeps users on the platform"],
          metrics: ["Avg. response time", "% of SOS requests fulfilled", "Retention after an SOS", "SOS ratings"],
          image: "/case/kazam/s7.jpg",
        },
        {
          title: "4 · P2P solar charge & earn",
          color: "yellow",
          objective: "Homeowners list solar-powered chargers and sell surplus energy to nearby EV owners.",
          how: ["List a charger with availability and ₹/kWh", "EV owners find and book green chargers", "Payments and commission handled in-app (Razorpay/Stripe)"],
          impact: ["Cheaper, greener charging", "Homeowners recover solar costs"],
          metrics: ["% of solar owners listing", "kWh shared", "Grid dependency ↓", "Host earnings"],
          image: "/case/kazam/s8.jpg",
        },
      ],
    },
    {
      kind: "text",
      heading: "The pricing insight behind feature 4",
      body:
        "P2P solar works because of a price gap. Homeowners can charge less than public chargers but still earn more than the grid buy-back rate, so both sides win.",
    },
    {
      kind: "options",
      heading: "If I could ship only one first",
      items: [
        { name: "Customised community filters", verdict: "chosen", why: "Solves a daily search problem for most users with existing station data. No new operations, pricing changes or partners needed, so it can ship fast and prove demand." },
        { name: "Demand-based price bids", verdict: "later", why: "Needs station owners to take part and changes their revenue. Test once there's enough usage data to show where off-peak demand sits." },
        { name: "Emergency SOS mode", verdict: "later", why: "High value but high operating cost: towing and portable-charger partners in every city, plus response-time promises." },
        { name: "P2P solar charge & earn", verdict: "later", why: "The biggest idea, but it needs hardware, payments, trust and regulatory work. A long-term bet, not a first release." },
      ],
    },
  ],

  "telecom-churn": [
    {
      kind: "text",
      heading: "What this is",
      body:
        "An early analytics exercise from around the end of college. I used IBM's sample Telco Customer Churn dataset, which is fictional, to practise cleaning data, writing DAX measures and building dashboards. The goal was to find which customer segments churn most, and what a telecom could test to reduce it.",
    },
    {
      kind: "stats",
      heading: "What the dataset shows",
      items: [
        { value: "27%", label: "churn in the most recent month" },
        { value: "1,869 / 7,043", label: "customers lost" },
        { value: "88.6%", label: "of churners on month-to-month contracts" },
        { value: "54.6%", label: "churn on fibre, among month-to-month customers" },
      ],
    },
    {
      kind: "list",
      heading: "How I did it",
      items: [
        "Cleaned missing values, duplicates and inconsistent formats in the 7,043-row dataset",
        "Wrote DAX measures for churn rate, revenue at risk and tickets per customer",
        "Built two Power BI pages: Revenue, and Customer Risk Analysis with slicers for contract, internet type and tenure",
      ],
    },
    {
      kind: "images",
      heading: "The dashboards",
      items: [
        { src: "/case/churn/risk.png", alt: "Customer risk analysis dashboard" },
        { src: "/case/churn/revenue.png", alt: "Revenue dashboard" },
      ],
    },
    {
      kind: "list",
      heading: "Patterns in the data (association, not cause)",
      items: [
        "Contract length and tenure matter most. Month-to-month customers in their first year leave the most.",
        "Customers without a partner or dependents churn more.",
        "Gender has no real effect, and senior citizens are less likely to leave.",
        "Fibre optic users churn more than DSL users.",
        "Electronic check is the most common payment method among churners, and 53.7% of month-to-month e-check users churn.",
        "Customers without tech support, device protection or online security are the most likely to switch.",
      ],
    },
    {
      kind: "list",
      heading: "What I'd test, not just recommend",
      items: [
        "Offer a discount for switching to a 3- or 6-month contract, as an A/B test. Risk: it may only delay churn, or put off people who value flexibility. Measure 6-month retention and revenue per user, not just contract uptake.",
        "Target first-year customers with an onboarding offer, then compare their churn against a holdout group.",
        "Pilot bundling tech support into one plan tier. Customers without it churn more, but that may be because the cheapest customers skip add-ons, so only an experiment can tell.",
      ],
    },
    {
      kind: "list",
      heading: "Limitations",
      items: [
        "The data is a fictional sample, so the patterns show my method, not real-world findings.",
        "It's one snapshot. Without data over time I can't say what causes churn, only which segments churn more.",
        "Several factors overlap (new customers are also mostly on monthly contracts), so their effects can't be separated here.",
      ],
    },
  ],

  ldr: [
    {
      kind: "video",
      heading: "See it work",
      src: "/case/ldr/demo.mp4",
      caption: "35-second demo of the circuit switching between light and dark states.",
    },
    {
      kind: "text",
      heading: "What it does",
      body:
        "Two light-dependent resistors (LDRs) read ambient light. An Arduino Uno compares the readings to thresholds and prints 'light' or 'dark' for each sensor on a 16x2 LCD. The LCD is driven directly in 4-bit mode by writing bits to PORTD, with no library.",
    },
    {
      kind: "chips",
      heading: "Parts",
      groups: [
        { label: "Hardware", color: "lime", items: ["Arduino Uno", "16x2 LCD", "2 × LDR", "Potentiometer (LCD contrast)", "Resistors", "Breadboard & jumpers", "USB power"] },
        { label: "Software", color: "yellow", items: ["C/C++", "Arduino IDE", "Tinkercad Circuits"] },
      ],
    },
    {
      kind: "table",
      heading: "The logic",
      headers: ["LDR 1 (A0)", "LDR 2 (A1)", "LCD shows"],
      rows: [
        ["< 800", "> 500", "light · dark"],
        ["> 500", "< 800", "dark · light"],
        ["> 500", "> 500", "dark · dark"],
        ["otherwise", "otherwise", "light · light"],
      ],
      note: "An LDR's resistance drops in bright light, so the analog reading changes with light level. The branches are checked top to bottom.",
    },
    {
      kind: "code",
      heading: "The code",
      lang: "cpp",
      note: "Condensed from the original: the branches are the same, and the repeated print loops are folded together. LCD bytes go out as two 4-bit nibbles, toggling the enable bit (bit 3) with a 10 ms delay.",
      code: `int a[7] = {0x33, 0x32, 0x28, 0x01, 0x06, 0x0F};
char l[] = "light";
char d[] = "dark ";
int x, y, z, i;

void command(int q) {            // RS = 0
  z = 0x00; x = q;
  y = x & B11110000; z |= y;     // upper nibble
  PORTD = z; PORTD = z | B00001000; delay(10);
  PORTD = z & B11110111; delay(10);
  z = 0x00;
  y = (x & B00001111) << 4; z |= y; // lower nibble
  PORTD = z; PORTD = z | B00001000; delay(10);
  PORTD = z & B11110111; delay(10);
}

void data(int q) { /* same as command(), with RS = 1 (z = 0x01) */ }

void setup() {
  DDRD = 0xFF;                    // PORTD as output
  for (i = 0; i <= 5; i++) command(a[i]);
  command(0x80);                  // cursor to line 1
}

void loop() {
  int c = analogRead(A0);
  int p = analogRead(A1);
  char *left, *right;
  if      (c < 800 && p > 500) { left = l; right = d; }
  else if (c > 500 && p < 800) { left = d; right = l; }
  else if (c > 500 && p > 500) { left = d; right = d; }
  else                         { left = l; right = l; }
  for (i = 0; i <= 4; i++) data(left[i]);
  command(0x8A);                  // jump to column 10
  for (i = 0; i <= 4; i++) data(right[i]);
  command(0x80);
}`,
    },
    {
      kind: "list",
      heading: "Where this shows up in real life",
      items: [
        "Smart lighting and automatic street lights that switch on at dusk",
        "Security systems that trigger when a sensor is suddenly blocked",
        "Home automation that adjusts lighting to ambient brightness",
        "Next steps: relay control for real lights, IoT (Wi-Fi/Bluetooth) monitoring, better calibration, an OLED display",
      ],
    },
  ],
};
