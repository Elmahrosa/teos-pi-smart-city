"use client"

import { useState } from "react"
import Link from "next/link"

const proposals = ["Community-led street lighting priorities", "Safer pedestrian crossings near community services"]

export default function CitizenDashboard() {
  const [vote, setVote] = useState<string | null>(null)
  return (
    <main className="site-shell" dir="auto">
      <section className="section">
        <Link className="button button-outline" href="/">← Home</Link>
        <div className="section-heading" style={{ marginTop: 28 }}><div><span className="eyebrow">PIONEER DASHBOARD</span><h1>My Pioneer Dashboard</h1></div></div>
        <div className="district-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          <article className="district-card"><span className="card-kicker">MY BADGE</span><h2>Citizen</h2><p>Pioneer profile connected through Pi Browser.</p></article>
          <article className="district-card"><span className="card-kicker">MY VOTES</span><h2>{vote ? "1 vote" : "No votes yet"}</h2><p>Your votes help shape community priorities.</p></article>
          <article className="district-card"><span className="card-kicker">MY PROPOSALS</span><h2>Concept space</h2><p>Share civic ideas for community feedback.</p></article>
        </div>
        <h2 style={{ marginTop: 36 }}>Community proposals</h2>
        <div className="proposal-list">{proposals.map((proposal) => <article className="proposal-card" key={proposal}><div><span className="proposal-tag">PROPOSAL</span><h3>{proposal}</h3><small>Community votes</small></div><button className="button button-outline" disabled={!!vote} onClick={() => setVote(proposal)}>{vote ? "Voted" : "Vote"}</button></article>)}</div>
        <div className="land-note" style={{ marginTop: 24 }}>No land sale, investment, profit, or return is offered.</div>
      </section>
    </main>
  )
}
