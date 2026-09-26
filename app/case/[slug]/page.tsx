import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, profile } from "@/content/data";
import { caseBodies, type Block } from "@/content/cases";

const inkLight = (c: string) => (["blue", "purple"].includes(c) ? "ink-light" : "");

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
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
          <div className="stats cs-stats">
            {b.items.map((s, i) => (
              <div key={s.label} className={`card stat bg-${["yellow", "pink", "lime", "blue"][i % 4]} ${i % 4 === 3 ? "ink-light" : ""}`}>
                <span className="stat-val mono">{s.value}</span>
                <span className="stat-lbl">{s.label}</span>
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
              <div key={c.title} className="card persona">
                <div className={`pillar-head bg-${c.color} ${inkLight(c.color)}`}>
                  <div>
                    <h3>{c.title}</h3>
                    <span className="persona-sub">{c.sub}</span>
                  </div>
                </div>
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
              <article key={f.title} className="card feature">
                <div className={`project-head bg-${f.color} ${inkLight(f.color)}`}>
                  <h3>{f.title}</h3>
                  <p className="feature-obj">{f.objective}</p>
                </div>
                <div className="feature-grid">
                  <div><b className="lbl">How it works</b><ul className="cs-list">{f.how.map((h) => <li key={h}>{h}</li>)}</ul></div>
                  <div><b className="lbl">Impact</b><ul className="cs-list">{f.impact.map((h) => <li key={h}>{h}</li>)}</ul></div>
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
          {b.note && <p className="cs-note">{b.note}</p>}
          <div className="card embed">
            <iframe src={b.src} title={b.title} style={{ height: b.height }} loading="lazy" allow="fullscreen; clipboard-read; clipboard-write; microphone" allowFullScreen />
          </div>
          <a className="btn btn-sm bg-yellow cs-open" href={b.open} target="_blank" rel="noreferrer">Open full screen ↗</a>
        </section>
      );
    case "video":
      if (!b.src) return null;
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="card embed">
            {/youtube\.com|youtu\.be|vimeo\.com|tinkercad\.com|drive\.google\.com/.test(b.src) ? (
              <iframe src={b.src} title={b.caption} className="video-frame" allowFullScreen />
            ) : (
              <video src={b.src} poster={b.poster} controls playsInline muted loop autoPlay className="video" />
            )}
          </div>
          <p className="cs-note">{b.caption}</p>
        </section>
      );
    case "code":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          {b.note && <p className="cs-note">{b.note}</p>}
          <pre className="card code"><code>{b.code}</code></pre>
        </section>
      );
    case "table":
      return (
        <section className="cs-block">
          <h2>{b.heading}</h2>
          <div className="card table-wrap">
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
              <div key={g.label} className="card chip-group">
                <div className={`pillar-head bg-${g.color} ${inkLight(g.color)}`}><h3>{g.label}</h3></div>
                <ul className="chip-list">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
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
                <img className="card cs-img" src={im.src} alt={im.alt} loading="lazy" />
              </a>
            ))}
          </div>
        </section>
      );
  }
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  const body = caseBodies[slug];
  if (!c || !body) notFound();

  return (
    <main>
      <nav className="nav">
        <Link href="/" className="logo">HR<span>.</span></Link>
        <div className="nav-links">
          <Link href="/#cases" className="btn btn-sm">← All cases</Link>
        </div>
      </nav>
      <header className={`wrap cs-hero`}>
        <span className={`sticker bg-${c.color} ${inkLight(c.color)} rot-l`}>{c.emoji} {c.kicker}</span>{" "}
        <span className="sticker bg-yellow rot-r">{c.industry}</span>
        <h1>{c.title}</h1>
        <p className="lead">{c.summary}</p>
        <div className="cs-meta">
          {c.when && <span className="sticker">{c.when}</span>}
          {[...c.tools, ...c.tags].map((t) => (
            <span key={t} className="sticker">{t}</span>
          ))}
        </div>
      </header>
      <div className="wrap">
        {body.map((b) => (
          <Section key={b.heading} b={b} />
        ))}
        <div className="card contact bg-yellow cs-end">
          <h2>Want to go deeper on this one?</h2>
          <div className="cta-row">
            <a className="btn bg-pink" href={`mailto:${profile.email}`}>✉️ Let&apos;s talk</a>
            <Link className="btn" href="/#cases">More cases →</Link>
          </div>
        </div>
      </div>
      <footer className="wrap footer">© {new Date().getFullYear()} {profile.name}</footer>
    </main>
  );
}
