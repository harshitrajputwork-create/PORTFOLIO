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
  | { kind: "images"; heading: string; items: { src: string; alt: string }[] };

export const caseBodies: Record<string, Block[]> = {
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
