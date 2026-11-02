import type { Metadata } from "next";
import Link from "next/link";
import IssuePrototype from "@/components/IssuePrototype";

export const metadata: Metadata = {
  title: "Issue resolution prototype · Harshit Rajput",
  description: "Interactive prototype: failed checks become owned actions that close only with a root cause, and Head Office groups tickets into vendor work orders. Made-up data.",
};

export default function IssuePrototypePage() {
  return (
    <main className="proto-page">
      <header className="proto-head">
        <div>
          <span className="kicker">Interactive prototype · made-up data</span>
          <h1>From failed check to fixed store</h1>
          <p>Store view: close an action only with photo proof and a root cause. Head Office view: group one region&apos;s tickets into a vendor work order and take it to invoice.</p>
        </div>
        <Link href="/case/issue-resolution" className="btn btn-sm">Read the case →</Link>
      </header>
      <IssuePrototype />
    </main>
  );
}
