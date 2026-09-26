"use client";

import { useState } from "react";
import type { Project } from "@/content/data";

const filters = ["All", "PM", "AI", "Numbers", "Build"] as const;

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <>
      <div className="chips" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            className={`chip ${active === f ? "chip-on" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid-projects">
        {shown.map((p) => (
          <article key={p.title} className={`card project ${p.featured ? "featured" : ""}`}>
            <div className={`project-head bg-${p.color}`}>
              <span className="kicker">{p.kicker}</span>
              <h3>{p.title}</h3>
            </div>
            <div className="project-body">
              <p><b className="lbl">Problem</b>{p.problem}</p>
              <p><b className="lbl">Built</b>{p.built}</p>
              <p><b className="lbl">Impact</b>{p.impact}</p>
              <ul className="stack">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <div className="project-links">
                {p.link && (
                  <a className="btn btn-sm bg-yellow" href={p.link} target="_blank" rel="noreferrer">
                    Live ↗
                  </a>
                )}
                {p.repo && (
                  <a className="btn btn-sm" href={p.repo} target="_blank" rel="noreferrer">
                    Code ↗
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
