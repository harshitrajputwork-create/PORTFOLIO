import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile } from "@/content/data";
import { caseBodies, caseMeta, type Block } from "@/content/cases";

const inkLight = (c: string) => (["blue", "purple"].includes(c) ? "ink-light" : "");
const verdictLabel = { chosen: "Chosen", rejected: "Ruled out", later: "Later" } as const;

export function generateStaticParams() {
  return Object.keys(caseMeta).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseMeta[slug];
  return c ? { title: `${c.title} · ${profile.name}`, description: c.summary } : {};
}

function Section({ b }: { b: Block }) {
  switch (b.kind) {
    case "text":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <p className="cs-lead">{b.body}</p>
        </section>
      );
    case "list":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <ul className="cs-list">
            {b.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      );
    case "stats":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="cs-stats">
            {b.items.map((s) => (
              <div key={s.label} className="cs-stat">
                <span className="cs-stat-val mono">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      );
    case "flow":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <ol className="flow">
            {b.steps.map((s) => (
              <li key={s.title}>
                <b>{s.title}</b>
                <span>{s.sub}</span>
              </li>
            ))}
          </ol>
          {b.note && <p className="cs-note">{b.note}</p>}
        </section>
      );
    case "options":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="options">
            {b.items.map((o) => (
              <div key={o.name} className={`option option-${o.verdict}`}>
                <span className={`verdict verdict-${o.verdict}`}>{verdictLabel[o.verdict]}</span>
                <b>{o.name}</b>
                <p>{o.why}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case "cards":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="cs-cards">
            {b.items.map((c) => (
              <div key={c.title} className="persona">
                <h3>{c.title}</h3>
                <span className="persona-sub">{c.sub}</span>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case "features":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="cs-features">
            {b.items.map((f) => (
              <article key={f.title} className="feature">
                <div className={`feature-head bg-${f.color} ${inkLight(f.color)}`}>
                  <h3>{f.title}</h3>
                  <p className="feature-obj">{f.objective}</p>
                </div>
                <div className="feature-grid">
                  <div><b className="lbl">How it works</b><ul className="cs-list">{f.how.map((h) => <li key={h}>{h}</li>)}</ul></div>
                  <div><b className="lbl">Expected impact</b><ul className="cs-list">{f.impact.map((h) => <li key={h}>{h}</li>)}</ul></div>
                  <div><b className="lbl">Metrics</b><ul className="stack">{f.metrics.map((m) => <li key={m}>{m}</li>)}</ul></div>
                </div>
                {f.image && (
                  <a href={f.image} target="_blank" rel="noreferrer">
                    <img className="feature-img" src={f.image} alt={`${f.title} slide`} loading="lazy" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      );
    case "embed":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          {b.note && <p className="cs-note cs-note-top">{b.note}</p>}
          <div className="embed">
            <iframe src={b.src} title={b.title} style={{ height: b.height }} loading="lazy" allow="fullscreen; clipboard-read; clipboard-write; microphone" allowFullScreen />
          </div>
          <a className="btn btn-sm bg-yellow cs-open" href={b.open} target="_blank" rel="noreferrer">Open in a new tab ↗</a>
        </section>
      );
    case "video":
      if (!b.src) return null;
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="embed">
            <video src={b.src} poster={b.poster} controls playsInline muted loop autoPlay preload="metadata" className="video" />
          </div>
          <p className="cs-note">{b.caption}</p>
        </section>
      );
    case "code":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          {b.note && <p className="cs-note cs-note-top">{b.note}</p>}
          <pre className="code"><code>{b.code}</code></pre>
        </section>
      );
    case "table":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="table-wrap">
            <table className="cs-table">
              <thead><tr>{b.headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={j === r.length - 1 ? "mono" : ""}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {b.note && <p className="cs-note">{b.note}</p>}
        </section>
      );
    case "chips":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="chip-groups">
            {b.groups.map((g) => (
              <div key={g.label} className="chip-group">
                <h3>{g.label}</h3>
                <ul className="cs-list">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      );
    case "images":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="cs-images">
            {b.items.map((im) => (
              <a key={im.src} href={im.src} target="_blank" rel="noreferrer">
                <img className="cs-img" src={im.src} alt={im.alt} loading="lazy" />
              </a>
            ))}
          </div>
        </section>
      );
  }
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseMeta[slug];
  const body = caseBodies[slug];
  if (!c || !body) notFound();

  return (
    <main className="case-page">
      <nav className="nav">
        <Link href="/" className="logo">HR<span>.</span></Link>
        <div className="nav-links">
          <Link href="/#work" className="btn btn-sm">← All work</Link>
        </div>
      </nav>
      <header className={`cs-hero-band bg-${c.color} ${inkLight(c.color)}`}>
        <div className="cs-wrap">
          <span className="kicker">{c.kicker}</span>
          <h1>{c.title}</h1>
          <p className="cs-summary">{c.summary}</p>
        </div>
      </header>
      <div className="cs-wrap">
        <dl className="facts">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        {c.tldr && (
          <div className="tldr">
            <div><b className="lbl">Problem</b><p>{c.tldr.problem}</p></div>
            <div><b className="lbl">Decision</b><p>{c.tldr.decision}</p></div>
            <div><b className="lbl">Result</b><p>{c.tldr.result}</p></div>
          </div>
        )}
        {body.map((b) => (
          <Section key={b.heading} b={b} />
        ))}
        <div className="cs-end">
          <h2>Want to talk about this?</h2>
          <div className="cta-row">
            <a className="btn bg-pink" href={`mailto:${profile.email}`}>Email me</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <Link className="btn" href="/#work">More work →</Link>
          </div>
        </div>
      </div>
      <footer className="cs-wrap footer">© {new Date().getFullYear()} {profile.name}</footer>
    </main>
  );
}
