"use client";

import { useState } from "react";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
const num = (n: number) => Math.round(n).toLocaleString("en-IN");

type Field = { key: string; label: string; min: number; max: number; step: number; unit?: "₹" | "%" | "min" };
type Out = { label: string; value: string; sub: string; tone: string };
type Scenario = {
  id: string;
  tab: string;
  question: string;
  fields: Field[];
  initial: Record<string, number>;
  compute: (s: Record<string, number>) => Out[];
};

const scenarios: Scenario[] = [
  {
    id: "marketplace",
    tab: "🛒 Marketplace",
    question: "Does each order pay back what we spent to get the customer?",
    fields: [
      { key: "orders", label: "Orders / month", min: 500, max: 50000, step: 500 },
      { key: "aov", label: "Average order value", min: 100, max: 5000, step: 50, unit: "₹" },
      { key: "take", label: "Take rate", min: 2, max: 30, step: 1, unit: "%" },
      { key: "varcost", label: "Payments + support cost / order", min: 0, max: 200, step: 5, unit: "₹" },
      { key: "freq", label: "Orders / customer / month", min: 1, max: 8, step: 0.5 },
      { key: "cac", label: "Cost to acquire a customer", min: 50, max: 2000, step: 50, unit: "₹" },
    ],
    initial: { orders: 8000, aov: 600, take: 15, varcost: 30, freq: 2, cac: 400 },
    compute: (s) => {
      const gmv = s.orders * s.aov;
      const contrib = s.aov * (s.take / 100) - s.varcost;
      const payback = contrib > 0 ? s.cac / (contrib * s.freq) : Infinity;
      return [
        { label: "GMV / month", value: inr(gmv), sub: `${inr(gmv * (s.take / 100))} net revenue`, tone: "bg-yellow" },
        { label: "Contribution / order", value: inr(contrib), sub: contrib > 0 ? "after payment and support costs" : "Negative: every order loses money", tone: contrib > 0 ? "bg-lime" : "bg-orange" },
        {
          label: "CAC payback",
          value: Number.isFinite(payback) ? `${payback.toFixed(1)} mo` : "never",
          sub: payback <= 3 ? "Healthy: scale acquisition" : payback <= 12 ? "OK: work on repeat rate" : "Fix unit economics before scaling",
          tone: payback <= 3 ? "bg-pink" : "bg-orange",
        },
      ];
    },
  },
  {
    id: "subscription",
    tab: "💳 Subscription / Fintech",
    question: "Is a customer worth more than they cost to acquire?",
    fields: [
      { key: "arpu", label: "Revenue per user / month", min: 50, max: 2000, step: 10, unit: "₹" },
      { key: "gm", label: "Gross margin", min: 10, max: 95, step: 5, unit: "%" },
      { key: "churn", label: "Monthly churn", min: 1, max: 30, step: 0.5, unit: "%" },
      { key: "cac", label: "Cost to acquire a customer", min: 50, max: 5000, step: 50, unit: "₹" },
    ],
    initial: { arpu: 299, gm: 70, churn: 6, cac: 900 },
    compute: (s) => {
      const life = 100 / s.churn;
      const ltv = s.arpu * (s.gm / 100) * life;
      const ratio = ltv / s.cac;
      const payback = s.cac / (s.arpu * (s.gm / 100));
      return [
        { label: "Customer lifetime", value: `${life.toFixed(1)} mo`, sub: "= 1 ÷ monthly churn", tone: "bg-yellow" },
        { label: "LTV", value: inr(ltv), sub: `${payback.toFixed(1)} months to pay back CAC`, tone: "bg-lime" },
        { label: "LTV : CAC", value: `${ratio.toFixed(1)}×`, sub: ratio >= 3 ? "3× or more: room to spend on growth" : "Under 3×: fix churn or CAC first", tone: ratio >= 3 ? "bg-pink" : "bg-orange" },
      ];
    },
  },
  {
    id: "saas",
    tab: "🏢 B2B SaaS",
    question: "Does automating a manual workflow pay for the software?",
    fields: [
      { key: "sites", label: "Locations / teams", min: 5, max: 500, step: 5 },
      { key: "tasks", label: "Manual tasks / location / day", min: 1, max: 20, step: 1 },
      { key: "mins", label: "Minutes saved per task", min: 1, max: 30, step: 1, unit: "min" },
      { key: "wage", label: "Staff cost / hour", min: 100, max: 1500, step: 50, unit: "₹" },
      { key: "price", label: "Price / location / month", min: 200, max: 5000, step: 100, unit: "₹" },
    ],
    initial: { sites: 120, tasks: 6, mins: 8, wage: 250, price: 1500 },
    compute: (s) => {
      const hours = (s.sites * s.tasks * s.mins * 30) / 60;
      const saved = hours * s.wage;
      const cost = s.sites * s.price;
      const roi = saved / cost;
      return [
        { label: "Hours freed / month", value: num(hours), sub: `≈ ${(hours / (26 * 9)).toFixed(1)} full-time staff`, tone: "bg-yellow" },
        { label: "Labour value / month", value: inr(saved), sub: `vs ${inr(cost)} software bill`, tone: "bg-lime" },
        { label: "ROI multiple", value: `${roi.toFixed(1)}×`, sub: roi >= 1 ? "Pays for itself on time saved alone" : "Needs a stronger compliance or revenue story", tone: roi >= 1 ? "bg-pink" : "bg-orange" },
      ];
    },
  },
];

const fmt = (f: Field, v: number) =>
  f.unit === "₹" ? inr(v) : f.unit === "%" ? `${v}%` : f.unit === "min" ? `${v} min` : num(v) === String(v) ? num(v) : String(v);

export default function NapkinMath() {
  const [active, setActive] = useState(scenarios[0].id);
  const [values, setValues] = useState<Record<string, Record<string, number>>>(
    Object.fromEntries(scenarios.map((sc) => [sc.id, sc.initial])),
  );
  const sc = scenarios.find((x) => x.id === active)!;
  const s = values[sc.id];
  const outs = sc.compute(s);

  return (
    <>
      <div className="chips" role="tablist" aria-label="Business model">
        {scenarios.map((x) => (
          <button key={x.id} role="tab" aria-selected={active === x.id} className={`chip ${active === x.id ? "chip-on" : ""}`} onClick={() => setActive(x.id)}>
            {x.tab}
          </button>
        ))}
      </div>
      <div className="napkin card">
        <div className="napkin-inputs">
          <p className="napkin-q"><b>The question:</b> {sc.question}</p>
          {sc.fields.map((f) => (
            <label key={f.key} className="slider">
              <span className="slider-top">
                <span>{f.label}</span>
                <b className="mono">{fmt(f, s[f.key])}</b>
              </span>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={s[f.key]}
                onChange={(e) => setValues({ ...values, [sc.id]: { ...s, [f.key]: Number(e.target.value) } })}
              />
            </label>
          ))}
        </div>
        <div className="napkin-out">
          {outs.map((o) => (
            <div key={o.label} className={`out ${o.tone}`}>
              <span className="out-label">{o.label}</span>
              <span className="out-val mono">{o.value}</span>
              <span className="out-sub">{o.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
