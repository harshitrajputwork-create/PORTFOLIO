"use client";

import { useMemo, useState } from "react";

// Interactive prototype of the issue-resolution flow I worked on at Taqtics.
// All data is made up. Store view = what shipped (every failed check becomes an
// owned action that can't close without a root cause). Head Office view = the
// Work Orders layer I proposed on top of tickets.

type Severity = "High" | "Medium" | "Low";
type TStatus = "Open" | "Escalated" | "Closed";
type Ticket = {
  id: string;
  title: string;
  store: string;
  region: "North" | "South" | "West";
  category: string;
  severity: Severity;
  source: string;
  owner: string;
  due: string;
  status: TStatus;
  photo: boolean;
  rca?: { cause: string; corrective: string; preventive: string };
  wo?: string;
};

const START: Ticket[] = [
  { id: "TK-1042", title: "Fire extinguisher past expiry", store: "Store 14 · Pune", region: "West", category: "Safety", severity: "High", source: "Opening checklist · Q7 failed", owner: "Store manager", due: "Due in 4h", status: "Open", photo: false },
  { id: "TK-1043", title: "AC not cooling on sales floor", store: "Store 14 · Pune", region: "West", category: "HVAC", severity: "High", source: "Store audit · Q12 failed", owner: "Maintenance lead", due: "Overdue by 1 day", status: "Escalated", photo: false },
  { id: "TK-1044", title: "Billing printer not working", store: "Store 09 · Mumbai", region: "West", category: "IT", severity: "Medium", source: "Opening checklist · Q3 failed", owner: "Store manager", due: "Due tomorrow", status: "Open", photo: false },
  { id: "TK-1045", title: "Fitting-room mirror cracked", store: "Store 21 · Bengaluru", region: "South", category: "Fixtures", severity: "Medium", source: "VM audit · Q5 failed", owner: "Area manager", due: "Due in 2 days", status: "Open", photo: false },
  { id: "TK-1046", title: "Cash-counter shelf loose", store: "Store 22 · Hyderabad", region: "South", category: "Furniture", severity: "Low", source: "Closing checklist · Q9 failed", owner: "Store manager", due: "Due in 3 days", status: "Open", photo: false },
  { id: "TK-1047", title: "Entrance floor tile cracked", store: "Store 21 · Bengaluru", region: "South", category: "Flooring", severity: "Medium", source: "Store audit · Q2 failed", owner: "Maintenance lead", due: "Due in 2 days", status: "Open", photo: false },
];

const VENDORS = [
  { name: "CoolAir Services", region: "West", quote: "₹14,500", tat: "2 days" },
  { name: "FixRight Facilities", region: "South", quote: "₹18,000", tat: "3 days" },
  { name: "BrightSpark Electricals", region: "North", quote: "₹9,800", tat: "1 day" },
];

const WO_STEPS = ["Sent to vendor", "Quote received", "Approved", "In execution", "Completed", "Invoiced"] as const;
type WoStep = (typeof WO_STEPS)[number];
type WorkOrder = { id: string; tickets: string[]; region: string; vendor: (typeof VENDORS)[number]; step: WoStep; log: string[] };

const sevClass = (s: Severity) => (s === "High" ? "pt-sev-high" : s === "Medium" ? "pt-sev-med" : "pt-sev-low");

export default function IssuePrototype() {
  const [view, setView] = useState<"store" | "ho">("store");
  const [tickets, setTickets] = useState<Ticket[]>(START);
  const [sel, setSel] = useState("TK-1042");
  const [form, setForm] = useState({ cause: "", corrective: "", preventive: "" });
  const [picked, setPicked] = useState<string[]>([]);
  const [vendorIdx, setVendorIdx] = useState(1);
  const [wos, setWos] = useState<WorkOrder[]>([]);
  const [openWo, setOpenWo] = useState<string | null>(null);

  const t = tickets.find((x) => x.id === sel)!;
  const canClose = t.photo && form.cause.trim() && form.corrective.trim() && form.preventive.trim();
  const openCount = tickets.filter((x) => x.status !== "Closed").length;
  const pool = tickets.filter((x) => x.status !== "Closed" && !x.wo);
  const pickedRegion = picked.length ? tickets.find((x) => x.id === picked[0])!.region : null;
  const togglePick = (x: Ticket) => {
    setPicked((p) => (p.includes(x.id) ? p.filter((y) => y !== x.id) : [...p, x.id]));
    const v = VENDORS.findIndex((v) => v.region === x.region);
    if (v >= 0) setVendorIdx(v);
  };

  const update = (id: string, patch: Partial<Ticket>) => setTickets((all) => all.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const closeTicket = () => {
    if (!canClose) return;
    update(t.id, { status: "Closed", rca: { ...form } });
    setForm({ cause: "", corrective: "", preventive: "" });
  };

  const reset = () => {
    setTickets(START); setSel("TK-1042"); setForm({ cause: "", corrective: "", preventive: "" });
    setPicked([]); setWos([]); setOpenWo(null);
  };

  const createWo = () => {
    if (!picked.length) return;
    const id = `WO-${201 + wos.length}`;
    const region = tickets.find((x) => x.id === picked[0])!.region;
    const vendor = VENDORS[vendorIdx];
    setWos((w) => [{ id, tickets: picked, region, vendor, step: "Sent to vendor", log: [`Created from ${picked.length} ticket${picked.length > 1 ? "s" : ""} and sent to ${vendor.name}`] }, ...w]);
    setTickets((all) => all.map((x) => (picked.includes(x.id) ? { ...x, wo: id } : x)));
    setPicked([]); setOpenWo(id);
  };

  const advance = (id: string, to: WoStep, line: string) =>
    setWos((all) => all.map((w) => (w.id === id ? { ...w, step: to, log: [...w.log, line] } : w)));

  const reassign = (id: string) =>
    setWos((all) => all.map((w) => {
      if (w.id !== id) return w;
      const next = VENDORS[(VENDORS.indexOf(w.vendor) + 1) % VENDORS.length];
      return { ...w, vendor: next, step: "Sent to vendor", log: [...w.log, `Quote rejected. Re-assigned to ${next.name}`] };
    }));

  const wo = useMemo(() => wos.find((w) => w.id === openWo) ?? null, [wos, openWo]);

  return (
    <div className="pt">
      <nav className="pt-rail" aria-hidden>
        <span className="pt-logo">T</span>
        {["⊞", "📅", "🎫", "💬", "📊", "🔧"].map((i, n) => <span key={i} className={`pt-ico ${(view === "store" && n === 2) || (view === "ho" && n === 5) ? "on" : ""}`}>{i}</span>)}
        <span className="pt-ico pt-ico-end">⚙️</span>
        <span className="pt-ico">❓</span>
      </nav>
      <div className="pt-main">
      <header className="pt-top">
        <b className="pt-title">{view === "store" ? "Corrective Actions" : "Work Order Dashboard"}</b>
        <span className="pt-bell" aria-hidden>🔔<i>5</i></span>
        <span className="pt-user" aria-hidden><i>A</i>Admin ▾</span>
      </header>
      <div className="pt-bar">
        <div className="pt-tabs" role="tablist">
          <button role="tab" aria-selected={view === "store"} className={view === "store" ? "on" : ""} onClick={() => setView("store")}>Store</button>
          <button role="tab" aria-selected={view === "ho"} className={view === "ho" ? "on" : ""} onClick={() => setView("ho")}>Head Office</button>
        </div>
        <span className="pt-sub">{view === "store" ? "Every failed check becomes an owned action." : "Group store tickets into vendor work orders."}</span>
        <button className="pt-reset" onClick={reset}>Reset demo</button>
      </div>

      {view === "store" ? (
        <div className="pt-body pt-split">
          <aside className="pt-list">
            <div className="pt-list-head"><b>Actions from failed checks</b><span>{openCount} open</span></div>
            {tickets.map((x) => (
              <button key={x.id} className={`pt-item ${x.id === sel ? "sel" : ""} ${x.status === "Closed" ? "done" : ""}`} onClick={() => { setSel(x.id); setForm({ cause: "", corrective: "", preventive: "" }); }}>
                <span className="pt-item-top"><span className="pt-id">{x.id}</span><span className={`pt-pill ${x.status === "Closed" ? "pt-st-closed" : x.status === "Escalated" ? "pt-st-esc" : "pt-st-open"}`}>{x.status}</span></span>
                <b>{x.title}</b>
                <span className="pt-meta">{x.store} · <span className={sevClass(x.severity)}>{x.severity}</span></span>
              </button>
            ))}
          </aside>

          <section className="pt-detail">
            <div className="pt-detail-head">
              <span className="pt-muted">{t.id} · from “{t.source}”</span>
              <h4>{t.title}</h4>
              <div className="pt-chips">
                <span className="pt-chip">👤 {t.owner}</span>
                <span className={`pt-chip ${sevClass(t.severity)}`}>Severity: {t.severity}</span>
                <span className={`pt-chip ${t.status === "Escalated" ? "pt-st-esc" : ""}`}>⏰ {t.status === "Closed" ? "Closed" : t.due}</span>
                <span className="pt-chip">📍 {t.store}</span>
              </div>
              {t.status === "Escalated" && <p className="pt-alert">Missed its due time, so it escalated to the area manager automatically.</p>}
              {t.wo && <p className="pt-note">Grouped by Head Office into work order <b>{t.wo}</b>.</p>}
            </div>

            {t.status === "Closed" && t.rca ? (
              <div className="pt-closed">
                <b>✓ Closed with a root cause</b>
                <dl>
                  <div><dt>Root cause</dt><dd>{t.rca.cause}</dd></div>
                  <div><dt>Corrective action</dt><dd>{t.rca.corrective}</dd></div>
                  <div><dt>Preventive action</dt><dd>{t.rca.preventive}</dd></div>
                </dl>
                <p className="pt-muted">Next time this check fails at this store, the team sees what was done before.</p>
              </div>
            ) : (
              <div className="pt-close">
                <div className="pt-step">
                  <span className="pt-num">1</span>
                  <div><b>Fix it and add photo proof</b>
                    <button className={`pt-photo ${t.photo ? "has" : ""}`} onClick={() => update(t.id, { photo: !t.photo })}>{t.photo ? "📷 after-fix.jpg ✓" : "📷 Add photo proof"}</button>
                  </div>
                </div>
                <div className="pt-step">
                  <span className="pt-num">2</span>
                  <div className="pt-fields"><b>Say why it happened, before closing</b>
                    <label>Root cause<input value={form.cause} onChange={(e) => setForm({ ...form, cause: e.target.value })} placeholder="e.g. Refill date not tracked anywhere" /></label>
                    <label>Corrective action<input value={form.corrective} onChange={(e) => setForm({ ...form, corrective: e.target.value })} placeholder="e.g. Replaced the extinguisher" /></label>
                    <label>Preventive action<input value={form.preventive} onChange={(e) => setForm({ ...form, preventive: e.target.value })} placeholder="e.g. Added expiry date to monthly safety audit" /></label>
                  </div>
                </div>
                <div className="pt-actions">
                  <button className="pt-btn pt-btn-main" disabled={!canClose} onClick={closeTicket}>Close action</button>
                  {!canClose && <span className="pt-muted">Needs photo proof and all three answers.</span>}
                  <button className="pt-btn pt-link" onClick={() => setForm({ cause: "Refill date not tracked anywhere", corrective: "Replaced the item and logged the date", preventive: "Added the check to the monthly audit" })}>Fill an example</button>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="pt-body pt-split">
          <aside className="pt-list">
            <div className="pt-list-head"><b>Open store tickets</b><span>{pool.length} not grouped</span></div>
            {pool.length === 0 && <p className="pt-muted pt-pad">Everything open is already in a work order.</p>}
            {pool.map((x) => {
              const off = !!pickedRegion && x.region !== pickedRegion;
              return (
              <label key={x.id} className={`pt-item pt-check ${picked.includes(x.id) ? "sel" : ""} ${off ? "off" : ""}`} title={off ? "A work order covers one region" : undefined}>
                <input type="checkbox" disabled={off} checked={picked.includes(x.id)} onChange={() => togglePick(x)} />
                <span><b>{x.title}</b><span className="pt-meta">{x.store} · {x.region} · {x.category}</span></span>
              </label>
              );
            })}
            {pickedRegion && <p className="pt-muted pt-pad">One work order covers one region, so only {pickedRegion} tickets can be added.</p>}
            <div className="pt-group">
              <label className="pt-muted">Vendor
                <select value={vendorIdx} onChange={(e) => setVendorIdx(Number(e.target.value))}>
                  {VENDORS.map((v, i) => <option key={v.name} value={i}>{v.name} ({v.region})</option>)}
                </select>
              </label>
              <button className="pt-btn pt-btn-main" disabled={!picked.length} onClick={createWo}>Group {picked.length || ""} into a work order →</button>
            </div>
          </aside>

          <section className="pt-detail">
            {!wo ? (
              <div className="pt-empty">
                <b>Head Office coordinates repairs across stores</b>
                <p className="pt-muted">Tick a few tickets in the same region, pick a vendor and group them into one work order. Then move it through quote, approval, execution and invoice.</p>
                {wos.length > 0 && <div className="pt-wolist">{wos.map((w) => <button key={w.id} className="pt-chip" onClick={() => setOpenWo(w.id)}>{w.id} · {w.step}</button>)}</div>}
              </div>
            ) : (
              <div>
                <div className="pt-detail-head">
                  <span className="pt-muted">{wo.id} · {wo.region} · {wo.tickets.length} ticket{wo.tickets.length > 1 ? "s" : ""}</span>
                  <h4>{wo.vendor.name}</h4>
                  {wos.length > 1 && <div className="pt-wolist">{wos.map((w) => <button key={w.id} className={`pt-chip ${w.id === wo.id ? "on" : ""}`} onClick={() => setOpenWo(w.id)}>{w.id}</button>)}</div>}
                </div>
                <ol className="pt-stepper">
                  {WO_STEPS.map((s) => {
                    const i = WO_STEPS.indexOf(s), cur = WO_STEPS.indexOf(wo.step);
                    return <li key={s} className={i < cur ? "done" : i === cur ? "cur" : ""}>{s}</li>;
                  })}
                </ol>
                <div className="pt-wo-tickets">
                  {wo.tickets.map((id) => { const x = tickets.find((y) => y.id === id)!; return <span key={id} className="pt-chip">{x.id} · {x.title}</span>; })}
                </div>
                {wo.step !== "Sent to vendor" && (
                  <p className="pt-note">Vendor quote: <b>{wo.vendor.quote}</b> · turnaround <b>{wo.vendor.tat}</b></p>
                )}
                <div className="pt-actions">
                  {wo.step === "Sent to vendor" && <button className="pt-btn pt-btn-main" onClick={() => advance(wo.id, "Quote received", `${wo.vendor.name} quoted ${wo.vendor.quote}, ${wo.vendor.tat}`)}>Simulate vendor quote</button>}
                  {wo.step === "Quote received" && <>
                    <button className="pt-btn pt-btn-main" onClick={() => advance(wo.id, "Approved", `Quote approved by Head Office`)}>Approve quote</button>
                    <button className="pt-btn" onClick={() => reassign(wo.id)}>Reject &amp; re-assign</button>
                  </>}
                  {wo.step === "Approved" && <button className="pt-btn pt-btn-main" onClick={() => advance(wo.id, "In execution", "Vendor started work")}>Mark in execution</button>}
                  {wo.step === "In execution" && <button className="pt-btn pt-btn-main" onClick={() => advance(wo.id, "Completed", "Vendor marked done with photo proof")}>Vendor marks completed</button>}
                  {wo.step === "Completed" && <button className="pt-btn pt-btn-main" onClick={() => advance(wo.id, "Invoiced", "Invoice attached. Work order closed")}>Close with invoice</button>}
                  {wo.step === "Invoiced" && <span className="pt-done">✓ Closed. Tickets, quote and invoice live in one record.</span>}
                </div>
                <ul className="pt-log">{[...wo.log].reverse().map((l, i) => <li key={i}>{l}</li>)}</ul>
              </div>
            )}
          </section>
        </div>
      )}
      <p className="pt-foot">Prototype I built to show the flow · made-up stores, vendors and data · not the production UI</p>
      </div>
    </div>
  );
}
