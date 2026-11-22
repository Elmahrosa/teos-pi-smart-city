import Link from "next/link"

export default function PetitionPage() {
  return (
    <main className="site-shell" dir="auto">
      <section className="section petition-section">
        <a className="button button-outline" href="/">← Back to the vision</a>
        <div className="petition-card" style={{ marginTop: 24 }}>
          <div>
            <span className="eyebrow">DEMO · TESTNET SANDBOX</span>
            <h1>Egypt Crypto Regulation Petition <span className="demo-chip">Demo</span></h1>
            <p>This page illustrates a civic petition concept only. No official petition, signature count, or campaign status is represented here.</p>
            <p>Sandbox Mode — No real Pi charged. No land sale, shares, or promises of profit or returns.</p>
            <Link className="button button-gold" href="/#petition">View the sandbox simulation</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
