"use client";

import { useState } from "react";

const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

type Field = { key: keyof State; label: string; min: number; max: number; step: number; unit?: string };
type State = { stores: number; checks: number; mins: number; wage: number; price: number };

const fields: Field[] = [
  { key: "stores", label: "Stores", min: 5, max: 500, step: 5 },
  { key: "checks", label: "Checklists / store / day", min: 1, max: 20, step: 1 },
  { key: "mins", label: "Minutes saved per checklist", min: 1, max: 30, step: 1, unit: "min" },
  { key: "wage", label: "Staff cost / hour", min: 100, max: 1500, step: 50, unit: "₹" },
  { key: "price", label: "SaaS price / store / month", min: 200, max: 5000, step: 100, unit: "₹" },
];

export default function NapkinMath() {
  const [s, setS] = useState<State>({ stores: 120, checks: 6, mins: 8, wage: 250, price: 1500 });

  const hours = (s.stores * s.checks * s.mins * 30) / 60;
  const saved = hours * s.wage;
  const cost = s.stores * s.price;
  const roi = saved / cost;
  const fte = hours / (26 * 9);

  return (
    <div className="napkin card">
      <div className="napkin-inputs">
        {fields.map((f) => (
          <label key={f.key} className="slider">
            <span className="slider-top">
              <span>{f.label}</span>
              <b className="mono">
                {f.unit === "₹" ? inr(s[f.key]) : s[f.key]}
                {f.unit === "min" ? " min" : ""}
              </b>
            </span>
            <input
              type="range"
              min={f.min}
              max={f.max}
              step={f.step}
              value={s[f.key]}
              onChange={(e) => setS({ ...s, [f.key]: Number(e.target.value) })}
            />
          </label>
        ))}
      </div>
      <div className="napkin-out">
        <div className="out bg-yellow">
          <span className="out-label">Hours freed / month</span>
          <span className="out-val mono">{Math.round(hours).toLocaleString("en-IN")}</span>
          <span className="out-sub">≈ {fte.toFixed(1)} full-time staff</span>
        </div>
        <div className="out bg-lime">
          <span className="out-label">Labour value / month</span>
          <span className="out-val mono">{inr(saved)}</span>
          <span className="out-sub">vs {inr(cost)} SaaS bill</span>
        </div>
        <div className={`out ${roi >= 1 ? "bg-pink" : "bg-orange"}`}>
          <span className="out-label">ROI multiple</span>
          <span className="out-val mono">{roi.toFixed(1)}×</span>
          <span className="out-sub">
            {roi >= 1 ? "Pays for itself on time saved alone" : "Needs a stronger compliance or loss-prevention story"}
          </span>
        </div>
      </div>
    </div>
  );
}
