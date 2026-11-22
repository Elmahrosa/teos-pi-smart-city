"use client"

import { useState } from "react"
import Link from "next/link"

const demoProposals = ["Community-led street lighting priorities", "Safer pedestrian crossings near community services"]

export default function CitizenDashboard() {
  const [vote, setVote] = useState<string | null>(null)
  return (
    <main className="site-shell" dir="auto">
      <section className="section">
        <Link className="button button-outline" href="/">← Home</Link>
        <div className="section-heading" style={{ marginTop: 28 }}><div><span className="eyebrow">DEMO DATA FOR PI NEXT HACKATHON</span><h1>My Pioneer Dashboard</h1></div></div>
        <div className="district-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          <article className="district-card"><span className="card-kicker">MY BADGE</span><h2>Citizen</h2><p>Reserve Pioneer Badge — Free. Demo profile; no real Pi account data is stored.</p></article>
          <article className="district-card"><span className="card-kicker">MY VOTES</span><h2>{vote ? "1 demo vote" : "No demo votes yet"}</h2><p>Votes are stored only for this page session and have no real governance effect.</p></article>
          <article className="district-card"><span className="card-kicker">MY PROPOSALS</span><h2>Concept space</h2><p>Share civic ideas for community feedback. Proposal records are not persisted.</p></article>
        </div>
        <h2 style={{ marginTop: 36 }}>Community proposals · Demo</h2>
        <div className="proposal-list">{demoProposals.map((proposal) => <article className="proposal-card" key={proposal}><div><span className="proposal-tag">DEMO PROPOSAL</span><h3>{proposal}</h3><small>Illustrative demo votes only</small></div><button className="button button-outline" disabled={!!vote} onClick={() => setVote(proposal)}>{vote ? "Voted (demo)" : "Vote (demo)"}</button></article>)}</div>
        <div className="land-note" style={{ marginTop: 24 }}>Sandbox Mode — No real Pi charged. No land sale, investment, profit, or return is offered.</div>
      </section>
    </main>
  )
}
