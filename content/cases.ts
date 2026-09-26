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
  | { kind: "chips"; heading: string; groups: { label: string; color: string; items: string[] }[] };

export const caseBodies: Record<string, Block[]> = {
  mockai: [
    {
      kind: "embed",
      heading: "Try it live",
      src: "https://mockaipminterview.lovable.app/",
      title: "MockAI PM Interview Engine",
      height: 720,
      open: "https://mockaipminterview.lovable.app/",
      note: "This is the real app running inside the page. Pick a difficulty and start a case.",
    },
    {
      kind: "text",
      heading: "The problem",
      body:
        "A friend was preparing for PM interviews. Mock partners are hard to schedule, feedback is inconsistent, and nobody pushes back like a real MAANG interviewer does. So I built him an interviewer that's always available, scores against the same rubric every time, and gets tougher as he improves.",
    },
    {
      kind: "stats",
      heading: "What's inside",
      items: [
        { value: "15", label: "real cases, from WhatsApp Search to Airbnb host supply" },
        { value: "4", label: "difficulty levels, from coach to MAANG" },
        { value: "6", label: "scored dimensions with anchor bands" },
        { value: "2", label: "modes: text, or push-to-talk voice" },
      ],
    },
    {
      kind: "cards",
      heading: "Difficulty is a product decision",
      items: [
        { title: "Easy", sub: "Coach", color: "lime", body: "Phases are visible, hints are unlimited and guidance is gentle." },
        { title: "Medium", sub: "Balanced", color: "yellow", body: "5 hint credits (a hint economy), light nudges and occasional pushback." },
        { title: "Hard", sub: "No safety net", color: "pink", body: "No phase visibility, no hints, heavy pushback. Weak structure can be rejected." },
        { title: "MAANG", sub: "Aggressive", color: "blue", body: "Quantification is mandatory and penalty scoring applies." },
      ],
    },
    {
      kind: "chips",
      heading: "How an interview runs, and how it's scored",
      groups: [
        { label: "4 phases", color: "purple", items: ["Clarify: gather context", "Structure: propose a framework", "Deep dive: metrics, trade-offs, constraints", "Recommend: plan, measurement, risks"] },
        { label: "6 scored skills", color: "yellow", items: ["Problem framing", "Structured thinking", "Clarifying quality", "Metrics selection", "Prioritisation", "Assumptions"] },
        { label: "12 case types", color: "lime", items: ["Search", "Marketplace", "Pricing", "Retention", "Trust & Safety", "Logistics", "Onboarding", "Monetisation", "GTM", "Operations", "Feature adoption", "Conversion"] },
      ],
    },
    {
      kind: "list",
      heading: "Beyond the chat",
      items: [
        "Interview report after each case: score breakdown, a SWOT, an ideal answer and recommended practice",
        "Focused drills: short, turn-capped sessions on one skill (clarifying or prioritisation) with Practice and Challenge modes",
        "Progress dashboard: cumulative scores, both raw and difficulty-normalised, plus a skill radar and trends",
        "Voice mode: push-to-talk with live transcription and spoken interviewer replies",
      ],
    },
    {
      kind: "list",
      heading: "Instrumented like a real product",
      items: [
        "7-day cohort return rate: do people come back after their first case?",
        "Prompts per session, and its distribution, used as the signal for where a freemium gate would sit",
        "Hint and 'moment' usage by difficulty, to check the hint economy is balanced",
        "Average turns per phase, to catch interviews that stall in Clarify or rush to Recommend",
      ],
    },
  ],

  "pet-care-marketplace": [
    {
      kind: "embed",
      heading: "The whole Miro board",
      src: "https://miro.com/app/live-embed/uXjVLvFBvoE=/?share_link_id=429930558861&embedId=592354660804&embedSource=oembed&embedMode=view_only_without_ui",
      title: "INFINITY Pet Care Miro board",
      height: 620,
      open: "https://miro.com/app/board/uXjVLvFBvoE=/",
      note: "Drag and zoom to explore. The pet-care work sits alongside my sector research on entertainment, parking and logistics.",
    },
    {
      kind: "text",
      heading: "Start wide: which sector?",
      body:
        "Before picking a problem I mapped several consumer sectors on one board: entertainment professionals, urban parking, logistics and pet care. For each one I looked at the players, how money moves and where users struggle. Pet care stood out: demand is growing fast, pets are treated as family, and both sides of the market are underserved.",
    },
    {
      kind: "text",
      heading: "The problem",
      body:
        "Pet owners are tired of stitching together grooming, training, vet care and walking from different sources, and struggle to find providers they can trust. Providers have the opposite problem: poor visibility, weak communication tools and no easy way to reach customers. INFINITY is one platform for both sides: book everything your pet needs, all under one roof.",
    },
    {
      kind: "cards",
      heading: "Who I designed for",
      items: [
        { title: "Sarah, 32", sub: "Tech professional · owns Max, a Labrador", color: "purple", body: "Works long hours and lives alone with Max. She wants the best care for him but can't juggle grooming, training and vet appointments, and feels guilty about it." },
        { title: "Her needs", sub: "Needs & goals", color: "yellow", body: "One place to schedule and manage every appointment, regular exercise for Max, and trustworthy tips on nutrition and behaviour." },
        { title: "Her pains", sub: "Undesired situations", color: "pink", body: "Can't find reliable providers nearby, struggles to fit Max's care around work, and doesn't spend enough quality time with him." },
        { title: "Her gains", sub: "What makes her happy", color: "lime", body: "Services that save her time, a healthy and well-groomed Max, and an intuitive app she can trust." },
      ],
    },
    {
      kind: "chips",
      heading: "What the marketplace offers, and how it works",
      groups: [
        { label: "Services (demand side)", color: "yellow", items: ["Grooming at home: the groomer brings the tools", "Training", "Dog walking", "Adoption", "Pet matchmaking"] },
        { label: "Pet parent flows", color: "pink", items: ["Sign up", "Profile creation", "Pet profile: breed, weight, vaccination", "Add another pet", "Booking", "Payment", "Booking confirmation", "Messages", "Support"] },
        { label: "Vendor flows (supply side)", color: "blue", items: ["Vendor sign-up", "Service provider profile", "Profile visibility", "Terms & conditions"] },
      ],
    },
    {
      kind: "list",
      heading: "For every service, the same five questions",
      items: [
        "What is it, and how is it delivered?",
        "Who are the competitors?",
        "Which user functions become which product features?",
        "What's the business model: commission, subscription or in-house service?",
        "Then a customer journey map from awareness to repeat booking, and low-fi wireframes in Balsamiq",
      ],
    },
  ],

  ldr: [
    {
      kind: "video",
      heading: "See it work",
      src: "",
      caption: "A 30-second demo of the circuit switching between light and dark.",
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
      heading: "The pricing insight",
      body:
        "P2P solar works because of a price gap. Homeowners can charge less than public chargers but still earn more than the grid buy-back rate, so both sides win.",
    },
  ],

  "telecom-churn": [
    {
      kind: "text",
      heading: "The problem",
      body:
        "Churn costs telecoms revenue and pushes up acquisition spend. I wanted to know which customer, contract and service factors actually predict who leaves, and what the business should change.",
    },
    {
      kind: "stats",
      heading: "Headline numbers",
      items: [
        { value: "27%", label: "monthly churn" },
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
      heading: "What the data said",
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
      heading: "What I'd do about it",
      items: [
        "Move the base plan from 1-month to 3- or 6-month contracts, with an incentive to lock in",
        "'Catch them young': exclusive deals for single, low-tenure customers",
        "Bundle tech support, device protection and online security into the standard plan",
      ],
    },
  ],
};
