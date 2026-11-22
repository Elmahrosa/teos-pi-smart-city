import Link from "next/link"

export default function PetitionPage() {
  return (
    <main className="site-shell" dir="auto">
      <section className="section petition-section">
        <a className="button button-outline" href="/">← Back to the vision</a>
        <div className="petition-card" style={{ marginTop: 24 }}>
          <div>
            <span className="eyebrow">PI NETWORK · CIVIC PETITION</span>
            <h1>Egypt Crypto Regulation Petition</h1>
            <p>A civic petition concept for community support and transparent participation.</p>
            <p>No land sale, shares, or promises of profit or returns.</p>
            <Link className="button button-gold" href="/#petition">Support the petition</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
