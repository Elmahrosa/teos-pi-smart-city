"use client"

import { useState } from "react"
import { createPetitionPayment } from "@/lib/pi-payments"

type Language = "ar" | "en"

const proposals = [
  { id: "lights", title: "Community-led street lighting priorities", ar: "أولويات إنارة الشوارع بمشاركة المجتمع", votes: 28 },
  { id: "traffic", title: "Safer pedestrian crossings near community services", ar: "معابر مشاة أكثر أماناً قرب الخدمات المجتمعية", votes: 19 },
  { id: "reports", title: "A simple way to report neighborhood issues", ar: "طريقة بسيطة للإبلاغ عن مشكلات الحي", votes: 14 },
]
const districts = [
  { icon: "⌂", en: "Governance District", ar: "حيّ الحوكمة", description: "Community proposals, discussion and demo voting." },
  { icon: "◎", en: "Treasury District", ar: "حيّ الخزينة", description: "An open concept for transparent public-interest tracking." },
  { icon: "✳", en: "Services District", ar: "حيّ الخدمات", description: "Ideas for traffic, lighting and neighborhood reports." },
  { icon: "✦", en: "Pioneer Hub", ar: "ملتقى الرواد", description: "A place to learn, contribute and shape the vision." },
]
const phases = [
  ["01", "Community Building", "Now"],
  ["02", "Petitions & Voting", "Demo experience"],
  ["03", "Pilot Partnership Study", "Alexandria"],
  ["04", "Real Smart Services", "Future phase"],
]

export default function SmartCityHome() {
  const [language, setLanguage] = useState<Language>("ar")
  const [username, setUsername] = useState("")
  const [notice, setNotice] = useState("")
  const [busy, setBusy] = useState(false)
  const [votes, setVotes] = useState<Record<string, string>>({})
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const ar = language === "ar"

  async function signIn() {
    if (!window.Pi) { setNotice(ar ? "للدخول عبر Pi، افتح التطبيق في Pi Browser." : "Open this demo in Pi Browser to sign in with Pi."); return }
    try {
      window.Pi.init({ version: "2.0", sandbox: true })
      const result = await window.Pi.authenticate(["username"], () => undefined)
      setUsername(result.user.username)
      setNotice(ar ? "تم تسجيل الدخول عبر Pi." : "Signed in with Pi.")
    } catch {
      setNotice(ar ? "تعذر تسجيل الدخول. حاول مجدداً داخل Pi Browser." : "Pi sign-in was not completed. Try again in Pi Browser.")
    }
  }

  async function supportVision() {
    setBusy(true)
    setNotice("")
    try {
      const payment = await createPetitionPayment(username || "demo-visitor")
      const key = "elmahrosa-demo-pioneers"
      const next = Number(window.localStorage.getItem(key) || "0") + 1
      window.localStorage.setItem(key, String(next))
      setNotice(`${ar ? "رائد تجريبي" : "Demo Pioneer"} #${String(next).padStart(3, "0")} — ${ar ? "رؤية مدينة الإسكندرية الذكية" : "Alexandria Smart City Vision"}. ${payment.memo}`)
    } catch {
      setNotice(ar ? "تعذرت محاكاة الدعم. حاول مجدداً." : "Sandbox simulation failed. Please try again.")
    } finally { setBusy(false) }
  }

  return (
    <main className="site-shell" dir={ar ? "rtl" : "ltr"}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Elmahrosa Smart City"><span className="brand-mark">م</span><span><strong>Elmahrosa Smart City</strong><small>Alexandria · Egypt</small></span></a>
        <nav className="desktop-nav"><a href="#vision">{ar ? "الرؤية" : "Vision"}</a><a href="#districts">{ar ? "الأحياء" : "Districts"}</a><a href="#community">{ar ? "المجتمع" : "Community"}</a><a href="#treasury">{ar ? "الخزينة" : "Treasury"}</a></nav>
        <div className="top-actions"><button className="language-toggle" onClick={() => setLanguage(ar ? "en" : "ar")}>{ar ? "English" : "العربية"}</button><button className="button button-outline" onClick={signIn}>{username ? `@${username}` : (ar ? "الدخول عبر Pi" : "Sign in with Pi")}</button></div>
      </header>

      <div className="sandbox-banner">ⓘ &nbsp;{ar ? "بيانات تجريبية لمسابقة Pi Next Hackathon · وضع Sandbox — لا يتم خصم Pi حقيقي" : "Demo Data for Pi Next Hackathon · Sandbox Mode — No real Pi charged"}</div>
      <section id="home" className="hero">
        <div className="hero-copy"><span className="eyebrow"><i className="live-dot" /> PI NEXT HACKATHON 2026 · ALEXANDRIA</span>
          <h1>{ar ? <>أول مدينة ذكية مصرية<br /><em>على Pi تبدأ من إسكندرية</em></> : <>Egypt’s first Pi-powered<br /><em>civic smart city vision</em></>}</h1>
          <p>{ar ? "رؤية مدنية يقودها المجتمع في الإسكندرية. فكرة مفتوحة للتعلّم والتعاون — وليست مشروعاً عقارياً أو استثمارياً." : "A community-built civic smart city concept in Alexandria. An open vision for learning and collaboration—not a property or investment offering."}</p>
          <div className="hero-actions"><a className="button button-gold" href="#vision">{ar ? "اكتشف الرؤية" : "Explore the vision"} <span>↙</span></a><span className="demo-chip">{ar ? "مفهوم مجتمعي · بيانات تجريبية" : "Concept & Community Vision"}</span></div>
        </div>
        <div className="city-art" role="img" aria-label={ar ? "تصور توضيحي تجريبي لمدينة الإسكندرية" : "Illustrative demo concept map of Alexandria"}>
          <div className="map-grid"/><div className="map-water"/><div className="map-road road-one"/><div className="map-road road-two"/><div className="map-road road-three"/>
          <div className="map-label label-one">GOVERNANCE</div><div className="map-label label-two">SERVICES</div><div className="map-label label-three">PIONEER HUB</div><span className="map-caption">ALEXANDRIA · CONCEPT MAP · DEMO</span>
        </div>
      </section>

      {notice && <div className="notice" role="status">{notice}</div>}
      <section id="vision" className="section vision-section"><div className="section-heading"><div><span className="eyebrow">ALEXANDRIA · COMMUNITY FIRST</span><h2>{ar ? "مدينة أفضل تبدأ بفكرة مشتركة" : "A better city begins with shared ideas"}</h2></div><p>{ar ? "تصور رقمي للأحياء والخدمات المدنية — كل الخرائط والتصويتات والأرقام هنا تجريبية." : "A digital concept for civic districts and services. Maps, votes and figures shown here are demo data."}</p></div>
        <div className="district-grid" id="districts">{districts.map((district) => <article className="district-card" key={district.en}><span className="district-icon">{district.icon}</span><span className="card-kicker">CONCEPT DISTRICT</span><h3>{ar ? district.ar : district.en}</h3><p>{district.description}</p></article>)}</div>
        <div className="land-note">{ar ? "دراسة شراكة الأراضي قيد البحث — لا يوجد بيع أراضٍ أو حصص أو وعود بعائد." : "Land partnership under study — No land sale, shares, or promises of returns."}</div>
      </section>

      <section className="section timeline-section"><div className="section-heading"><div><span className="eyebrow">A VISION, BUILT STEP BY STEP</span><h2>{ar ? "مسار واقعي يبدأ بالمجتمع" : "A practical path, starting with community"}</h2></div></div><div className="timeline-grid">{phases.map(([number, title, detail], i) => <article className="phase-card" key={number}><span className="phase-number">{number}</span><span className="phase-status">{i === 0 ? (ar ? "جارٍ الآن" : "CURRENT FOCUS") : (ar ? "مرحلة تصورية" : "VISION PHASE")}</span><h3>{ar && i === 0 ? "بناء المجتمع" : ar && i === 1 ? "العرائض والتصويت" : ar && i === 2 ? "دراسة شراكة تجريبية" : ar && i === 3 ? "خدمات ذكية حقيقية" : title}</h3><p>{detail}</p></article>)}</div></section>

      <section id="community" className="section community-section"><div className="section-heading"><div><span className="eyebrow">COMMUNITY LAB · DEMO VOTING</span><h2>{ar ? "أفكار المجتمع وتصويت تجريبي" : "Community proposals & demo voting"}</h2></div><span className="demo-chip">{ar ? "بيانات تجريبية لمسابقة Pi Next Hackathon" : "Demo Data for Pi Next Hackathon"}</span></div>
        <div className="proposal-list">{proposals.map((proposal) => <article className="proposal-card" key={proposal.id}><div><span className="proposal-tag">{ar ? "خدمات مدنية" : "CIVIC SERVICES"}</span><h3>{ar ? proposal.ar : proposal.title}</h3><small>{ar ? "أصوات توضيحية فقط" : "Illustrative demo votes only"}</small></div><div className="vote-actions"><span className="vote-count">{proposal.votes + (votes[proposal.id] ? 1 : 0)} <small>{ar ? "صوتاً تجريبياً" : "demo votes"}</small></span><button className="button button-outline" disabled={!!votes[proposal.id]} onClick={() => setVotes({ ...votes, [proposal.id]: "yes" })}>{votes[proposal.id] ? (ar ? "تم التصويت" : "Voted") : (ar ? "صوّت تجريبياً" : "Vote (demo)")}</button></div></article>)}</div>
        <div className="assistant-card"><div><span className="eyebrow">AI PROPOSAL ASSISTANT · DEMO</span><h3>{ar ? "حوّل فكرتك إلى مقترح مدني" : "Shape an idea into a civic proposal"}</h3><p>{ar ? "مساعد توضيحي يعمل محلياً — لا يرسل بياناتك إلى خدمة ذكاء اصطناعي." : "A simple local demo helper—your text is not sent to an AI service."}</p></div><form onSubmit={(event) => { event.preventDefault(); if (question.trim()) setAnswer(ar ? `مقترح تجريبي: ${question.trim()} — ابدأ بمشكلة واضحة، وخطوة صغيرة، وطريقة لمشاركة المجتمع.` : `Demo proposal: ${question.trim()} — define the need, suggest a small first step, and invite community feedback.`) }}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={ar ? "اكتب فكرة للحي..." : "Describe a neighborhood idea…"} aria-label="Proposal idea"/><button className="button button-gold">{ar ? "صياغة" : "Shape idea"}</button></form>{answer && <p className="assistant-answer" role="status">{answer}</p>}</div>
        <div className="leaderboard"><div><span className="eyebrow">ALEXANDRIA PIONEERS</span><h3>{ar ? "مجتمع الرواد" : "Pioneer community"}</h3><p>{ar ? "قائمة تجريبية — لا يوجد ترتيب أو عدد أعضاء حقيقي." : "Demo leaderboard concept—no real ranking or member count is represented."}</p></div><span className="leaderboard-mark">01—100<br/><small>DEMO LIST CONCEPT</small></span></div>
      </section>

      <section id="treasury" className="section treasury-section"><div className="treasury-card"><div><span className="eyebrow">TRANSPARENCY CONCEPT</span><h2>{ar ? "الخزينة — لوحة توضيحية" : "Treasury — transparent demo dashboard"}</h2><p>{ar ? "لا توجد أموال حقيقية أو معاملات Pi أو بيانات خزينة فعلية معروضة. الأرقام غير متاحة لأنها ليست بيانات حقيقية." : "No real funds, Pi transactions or treasury records are shown. Real figures are intentionally not displayed."}</p></div><span className="treasury-stamp">DEMO<br/>ONLY</span></div></section>

      <section id="petition" className="section petition-section"><div className="petition-card"><div><span className="eyebrow">TESTNET SANDBOX · SIMULATION ONLY</span><h2>{ar ? "عريضة تنظيم العملات الرقمية في مصر" : "Egypt Crypto Regulation Petition"} <span className="demo-chip">{ar ? "تجريبية" : "Demo"}</span></h2><p>{ar ? "محاكاة تفاعلية لتوضيح تدفق Pi. لا يتم إنشاء دفعة أو معاملة فعلية؛ لا تستخدم أموالاً حقيقية." : "A UI simulation to illustrate a Pi flow. It does not create a real payment or transaction. No real Pi is charged."}</p><p className="free-badge">✦ &nbsp;{ar ? "احجز شارة رائد — مجاناً" : "Reserve a Pioneer Badge — Free"}</p></div><button className="button button-gold payment-button" onClick={supportVision} disabled={busy}>{busy ? (ar ? "جارٍ التحضير…" : "Preparing…") : (ar ? "محاكاة دعم تجريبي بقيمة 5 Pi" : "Simulate 5 Pi petition support")}</button></div><p className="no-returns">{ar ? "لا توجد أرض للبيع أو وعود بأرباح أو عوائد." : "No land is for sale. No profits or returns are promised."}</p></section>

      <footer><span className="brand-mark small">م</span><span>{ar ? "صُنع في الإسكندرية، مصر من أجل Pi Next Hackathon 2026" : "Built in Alexandria, Egypt for Pi Next Hackathon 2026"}</span><span className="footer-demo">DEMO · SANDBOX</span></footer>
    </main>
  )
}
