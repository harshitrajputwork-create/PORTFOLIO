import NapkinMath from "@/components/NapkinMath";
import ProjectGrid from "@/components/ProjectGrid";
import Link from "next/link";
import {
  profile,
  stats,
  pillars,
  projects,
  caseStudies,
  friends,
  experience,
  toolbox,
} from "@/content/data";

const marquee = ["DISCOVERY", "PRDs", "AI PROTOTYPES", "KPIs", "SQL", "SHIPPED", "UNIT ECONOMICS", "USER CALLS", "LLM FEATURES", "DASHBOARDS"];

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a href="#top" className="logo">HR<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#cases">Cases</a>
          <a href="#numbers">Numbers</a>
          <a href="#about">About</a>
          <a href="#contact" className="btn btn-sm bg-pink">Say hi</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero wrap">
        <div className="hero-copy">
          <span className="sticker bg-lime rot-l">👋 {profile.location}</span>
          <h1>
            {profile.name.split(" ")[0]} builds <span className="hl bg-yellow">products</span>{" "}
            with <span className="hl bg-pink">AI</span> &amp; <span className="nowrap"><span className="hl bg-blue ink-light">numbers</span>.</span>
          </h1>
          <p className="lead">
            <b>{profile.role}.</b> {profile.intro}
          </p>
          <div className="cta-row">
            <a href="#work" className="btn bg-yellow">See the work ↓</a>
            <a href={profile.github} className="btn" target="_blank" rel="noreferrer">GitHub ↗</a>
            {profile.resume && <a href={profile.resume} className="btn">Resume ↗</a>}
          </div>
        </div>
        <div className="hero-art" aria-hidden>
          <div className="blob bg-pink card" />
          <img className="photo card" src={profile.photo} alt={profile.name} />
          <span className="sticker bg-yellow tagline rot-l">{profile.tagline}</span>
          <div className="tile bg-yellow card rot-r"><span>🧭</span>PM</div>
          <div className="tile bg-blue card rot-l ink-light"><span>⚡</span>AI-native</div>
          <div className="tile bg-lime card rot-r"><span>🧮</span>₹ math</div>
        </div>
      </header>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i}>{m} ✦</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="wrap stats">
        {stats.map((s, i) => (
          <div key={s.label} className={`card stat bg-${["yellow", "pink", "lime", "blue"][i % 4]} ${i % 4 === 3 ? "ink-light" : ""}`}>
            <span className="stat-val mono">{s.value}</span>
            <span className="stat-lbl">{s.label}</span>
          </div>
        ))}
      </section>

      {/* PILLARS */}
      <section className="wrap section">
        <h2 className="section-title"><span className="num">01</span> What I bring</h2>
        <div className="pillars">
          {pillars.map((p) => (
            <div key={p.key} className="card pillar">
              <div className={`pillar-head bg-${p.color} ${p.color === "blue" ? "ink-light" : ""}`}>
                <span className="pillar-emoji">{p.emoji}</span>
                <h3>{p.title}</h3>
              </div>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="wrap section">
        <h2 className="section-title"><span className="num">02</span> Things I&apos;ve shipped</h2>
        <p className="section-sub">Each one is written up as problem, build and impact. Filter by the skill you care about.</p>
        <ProjectGrid projects={projects} />
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="wrap section">
        <h2 className="section-title"><span className="num">03</span> Case studies</h2>
        <p className="section-sub">From before the AI era: personas, features, metrics and dashboards. The fundamentals are the same.</p>
        <div className="grid-cases">
          {caseStudies.map((c) => {
            const inner = (
              <>
                <div className={`case-head bg-${c.color} ${["blue", "purple"].includes(c.color) ? "ink-light" : ""}`}>
                  <span className="kicker">{c.kicker}</span>
                  <span className="case-emoji">{c.emoji}</span>
                </div>
                {c.cover && <img className="case-cover" src={c.cover} alt="" loading="lazy" />}
                <div className="project-body">
                  <h3 className="case-title">{c.title}</h3>
                  <div className="hook"><b className="mono">{c.hook.value}</b> {c.hook.label}</div>
                  <p>{c.summary}</p>
                  <ul className="stack">
                    {[...c.tags, ...c.tools].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <span className="btn btn-sm bg-yellow read-more">{c.external ? "Open ↗" : "Read case →"}</span>
                </div>
              </>
            );
            return c.external ? (
              <a key={c.slug} href={c.external} target="_blank" rel="noreferrer" className="card project case">{inner}</a>
            ) : (
              <Link key={c.slug} href={`/case/${c.slug}`} className="card project case">{inner}</Link>
            );
          })}
        </div>
      </section>

      {/* NAPKIN MATH */}
      <section id="numbers" className="wrap section">
        <h2 className="section-title"><span className="num">04</span> Napkin math, live</h2>
        <p className="section-sub">
          The ROI conversation I have with every retail ops head: <i>is digitising store checklists worth it?</i> Drag the sliders.
        </p>
        <NapkinMath />
      </section>

      {/* FRIENDS */}
      <section className="wrap section">
        <h2 className="section-title"><span className="num">05</span> Friends&apos; builds</h2>
        <p className="section-sub">Good PMs hang out with good PMs.</p>
        <div className="grid-friends">
          {friends.map((f) => (
            <a key={f.title} href={f.link} target="_blank" rel="noreferrer" className="card row-card bg-purple ink-light">
              <b>{f.title} ↗</b>
              <span>{f.summary} · by {f.by}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="wrap section two-col">
        <div>
          <h2 className="section-title"><span className="num">06</span> Path so far</h2>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.role + e.org} className="card">
                <span className="mono when">{e.when}</span>
                <b>{e.role}</b> · {e.org}
                <p>{e.what}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="section-title"><span className="num">07</span> Toolbox</h2>
          <ul className="toolbox">
            {toolbox.map((t, i) => (
              <li key={t} className={`sticker bg-${["yellow", "pink", "lime", "blue", "orange", "purple"][i % 6]} ${i % 2 ? "rot-r" : "rot-l"} ${["blue", "purple"].includes(["yellow", "pink", "lime", "blue", "orange", "purple"][i % 6]) ? "ink-light" : ""}`}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="wrap section">
        <div className="card contact bg-yellow">
          <h2>Hiring a PM who can also <span className="hl bg-pink">build the prototype</span>?</h2>
          <div className="cta-row">
            <a className="btn bg-pink" href={`mailto:${profile.email}`}>✉️ {profile.email}</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </section>

      <footer className="wrap footer">
        Built with Next.js + Claude Code · © {new Date().getFullYear()} {profile.name}
      </footer>
    </main>
  );
}
