import Link from "next/link";
import Haptics from "@/components/Haptics";
import HireMe from "@/components/HireMe";
import { profile, proof, featured, moreWork, sideProduct, earlier, sideQuests, journey } from "@/content/data";

const inkLight = (c: string) => (["blue", "purple"].includes(c) ? "ink-light" : "");

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a href="#top" className="logo">Harshit Rajput<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
          <a href="#contact" className="btn btn-sm bg-pink">Say hi</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero wrap">
        <div className="hero-copy">
          <div className="hero-id">
            <img className="avatar-mobile" src={profile.photo} alt={profile.name} />
            <span className="sticker bg-lime rot-l">{profile.title}</span>
          </div>
          <h1>
            I turn complex <span className="hl bg-yellow">problems</span> into simple, useful <span className="hl bg-pink">products</span>.
          </h1>
          <p className="lead">
            <b>{profile.name}.</b> {profile.intro}
          </p>
          <div className="cta-row">
            <a href="#work" className="btn bg-yellow">View selected work ↓</a>
            <a href={profile.resume} className="btn" target="_blank" rel="noreferrer">Resume (PDF) ↗</a>
            <a href={profile.linkedin} className="btn" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <div className="hero-photo">
          <img className="photo" src={profile.photo} alt={profile.name} />
          <span className="sticker bg-blue ink-light photo-tag rot-r">📍 {profile.location}</span>
        </div>
      </header>

      {/* JOURNEY: right under the hero, one glance */}
      <section id="about" className="wrap journey-wrap" aria-label="My journey">
        <h2 className="journey-title mono">The journey so far →</h2>
        <ol className="journey">
          {journey.map((j) => (
            <li key={j.org} className={j.state ?? ""}>
              <span className="j-when mono">{j.when}</span>
              <b className="j-org">{j.org}</b>
              <span className="j-role">{j.role}</span>
              <p>{j.line}</p>
              {j.link && (
                <Link className="j-link" href={j.link.href}>{j.link.label} →</Link>
              )}
              {j.state === "next" && <HireMe className="btn btn-sm bg-yellow j-hire" label="Work with me →" />}
            </li>
          ))}
        </ol>
      </section>

      {/* PROOF */}
      <section className="wrap proof" aria-label="Proof points">
        {proof.map((p) => (
          <a key={p.label} href={p.link} className={`proof-tile bg-${p.color}`}>
            <span className="proof-val mono">{p.value}</span>
            <b>{p.label}</b>
            <span className="proof-ctx">{p.context}</span>
            <span className="proof-more">How →</span>
          </a>
        ))}
      </section>

      {/* SELECTED WORK */}
      <section id="work" className="wrap section">
        <h2 className="section-title">Selected work</h2>
        <p className="section-sub">Three problems I owned: why they mattered, what I chose, and what happened.</p>
        <div className="featured">
          {featured.map((f) => (
            <article key={f.slug} className={`feat ${f.embed ? "feat-embed" : ""} ${f.video ? "feat-video" : ""}`}>
              {f.video ? (
                <div className={`feat-visual feat-demo bg-${f.color}`}>
                  <video src={f.video.src} poster={f.video.poster} autoPlay muted loop playsInline preload="auto" aria-label={f.video.label} />
                  <p className="board-cap">{f.video.label}</p>
                </div>
              ) : f.embed ? (
                <div className={`feat-visual feat-board bg-${f.color} ${inkLight(f.color)}`}>
                  <iframe src={f.embed.src} title={`${f.title}: Miro board`} loading="eager" allowFullScreen />
                  <p className="board-cap">
                    {f.embed.label}{" "}
                    <a href={f.embed.open} target="_blank" rel="noreferrer">Open in Miro ↗</a>
                  </p>
                </div>
              ) : (
                <Link href={`/case/${f.slug}`} className={`feat-visual bg-${f.color} ${inkLight(f.color)}`} aria-hidden tabIndex={-1}>
                  <ol className="mini-flow">
                    {f.flow.map((st) => (
                      <li key={st}>{st}</li>
                    ))}
                  </ol>
                </Link>
              )}
              <Link href={`/case/${f.slug}`} className="feat-body">
                <span className="kicker">{f.kicker}</span>
                <h3>{f.title}</h3>
                <span className="feat-meta">{f.where} · {f.when}</span>
                <dl className="pdr">
                  <div><dt>Problem</dt><dd>{f.problem}</dd></div>
                  <div><dt>Decision</dt><dd>{f.decision}</dd></div>
                  <div><dt>Result</dt><dd>{f.result}</dd></div>
                </dl>
                <span className="btn btn-sm bg-yellow read-more">Read the case →</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* MORE WORK */}
      <section id="more-work" className="wrap section section-tight">
        <h2 className="section-title small">More from my work at Taqtics</h2>
        <div className="more-grid">
          {moreWork.map((w) => (
            <article key={w.title} className="more">
              <span className="kicker">{w.where}</span>
              <h3>{w.title}</h3>
              <p><b>Problem.</b> {w.problem}</p>
              <p><b>What I did.</b> {w.what}</p>
              <p className="more-result"><b>Result.</b> {w.result}</p>
              {w.link && (
                <a className="text-link" href={w.link.href} target="_blank" rel="noreferrer">{w.link.label} ↗</a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* SIDE PRODUCT */}
      <section className="wrap section section-tight">
        <h2 className="section-title small">Side product</h2>
        <div className="side-product">
          <div className="sp-body">
            <h3>{sideProduct.title}</h3>
            <p>{sideProduct.why}</p>
            <p className="muted">{sideProduct.what}</p>
            <div className="cta-row">
              <Link href={`/case/${sideProduct.slug}`} className="btn btn-sm bg-yellow">How I built it →</Link>
              <a href={sideProduct.link} className="btn btn-sm" target="_blank" rel="noreferrer">Try it live ↗</a>
            </div>
          </div>
          <div className="sp-visual bg-purple ink-light" aria-hidden>
            <span className="mono">Clarify → Structure → Deep dive → Recommend</span>
            <b>6 skills scored</b>
          </div>
        </div>
      </section>

      {/* EARLIER + SIDE QUESTS */}
      <section className="wrap section section-tight two-col">
        <div>
          <h2 className="section-title small">Earlier case studies</h2>
          <div className="list-links">
            {earlier.map((e) => (
              <Link key={e.slug} href={`/case/${e.slug}`} className="list-link">
                <span className="kicker">{e.tag}</span>
                <b>{e.title} →</b>
                <span className="muted">{e.note}</span>
                <span className="cue">Open the case →</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="section-title small">Side quests</h2>
          <p className="section-sub small-sub">Small builds for friends, and one for myself.</p>
          <div className="quests">
            {sideQuests.map((q) => (
              <a key={q.title} href={q.href} target="_blank" rel="noreferrer" className="quest">
                <b>{q.title} ↗</b>
                <span>{q.story}</span>
                <span className="cue">{q.href.includes("github.com") ? "See the code ↗" : "Visit the site ↗"}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="wrap section">
        <div className="contact bg-yellow">
          <h2>Looking for a PM who knows the workflow <span className="hl bg-pink">and</span> the numbers?</h2>
          <p className="contact-mail mono">{profile.email}</p>
          <div className="cta-row">
            <HireMe className="btn bg-pink" label="Work with me" />
            <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">Resume ↗</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </section>

      <footer className="wrap footer">© {new Date().getFullYear()} {profile.name} · Built with Next.js and Claude Code</footer>

      <nav className="mobile-bar" aria-label="Quick actions">
        <a href="#work">Work</a>
        <a href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="#contact" className="mb-cta">Say hi</a>
      </nav>
      <Haptics />
    </main>
  );
}
