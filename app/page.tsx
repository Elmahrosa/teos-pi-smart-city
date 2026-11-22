"use client"

import { useEffect, useState } from "react"
import { createPetitionPayment } from "@/lib/pi-payments"
import { isPiBrowserAvailable } from "@/lib/pi-auth"

type Language = "ar" | "en"
type PiUser = { uid: string; username: string }

const copy = {
  ar: {
    tagline: "منصة مصرية للمشاركة المدنية على Pi. أبلغ، وقّع، وابنِ مدينتك بشفافية.",
    login: "تسجيل الدخول عبر Pi",
    browser: "لأفضل تجربة، افتح هذا الموقع في Pi Browser. يمكنك استكشاف العرض التجريبي هنا.",
    demo: "بيانات تجريبية لمسابقة Pi Next Hackathon",
    sandbox: "وضع Sandbox — لن يتم خصم Pi حقيقي في الوقت الحالي",
    petition: "عريضة تنظيم العملات الرقمية في مصر (عرض تجريبي)",
    governance: "الحوكمة والعرائض",
    treasury: "الخزينة (عرض تجريبي — تتبع شفاف)",
    map: "الإسكندرية (خريطة مجتمعية تجريبية)",
    badges: "شارات الرواد",
    sign: "توقيع العريضة — 5 Pi تجريبية",
    submit: "محاكاة دفع 5 Pi",
    screenshots: "معاينة شاشات Pi Console",
    screen1: "الرئيسية — نظرة على الخدمات المدنية وخريطة الإسكندرية التجريبية.",
    screen2: "العريضة — توضيح رسوم 5 Pi في وضع Sandbox دون خصم حقيقي.",
    screen3: "المجتمع — الحوكمة والخزينة التجريبية وشارات الرواد.",
    foot: "صُنع في الإسكندرية، مصر من أجل Pi Next Hackathon 2026",
    connected: "مرحباً",
    unavailable: "افتح الموقع في Pi Browser لتسجيل الدخول باستخدام Pi.",
    paymentDone: "تمت محاكاة الدفع التجريبي — لم يتم إنشاء معاملة Pi حقيقية.",
    paymentError: "تعذرت محاكاة الدفع. حاول مرة أخرى.",
    loading: "جارٍ التحضير…",
  },
  en: {
    tagline: "Egypt's first Pi-powered civic platform. Report, sign, and build your city transparently.",
    login: "Sign in with Pi",
    browser: "For the full experience, open this site in Pi Browser. You can explore the demo here.",
    demo: "Demo data for Pi Next Hackathon",
    sandbox: "Sandbox Mode — No real Pi will be charged yet",
    petition: "Egypt Crypto Regulation Petition (Demo)",
    governance: "Governance & Petitions",
    treasury: "Treasury (Demo — transparent tracking)",
    map: "Alexandria (Community map — demo)",
    badges: "Pioneer Badges",
    sign: "Sign petition — 5 Pi demo",
    submit: "Simulate 5 Pi payment",
    screenshots: "Pi Console screenshot previews",
    screen1: "Home — civic services and the Alexandria demo map at a glance.",
    screen2: "Petition — 5 Pi fee clearly marked Sandbox; no real charge.",
    screen3: "Community — demo governance, treasury tracking, and pioneer badges.",
    foot: "Built in Alexandria, Egypt for Pi Next Hackathon 2026",
    connected: "Welcome",
    unavailable: "Open this site in Pi Browser to sign in with Pi.",
    paymentDone: "Sandbox payment simulated — no real Pi transaction was created.",
    paymentError: "Could not simulate payment. Please try again.",
    loading: "Preparing…",
  },
}

export default function SmartCityApp() {
  const [language, setLanguage] = useState<Language>("ar")
  const [piUser, setPiUser] = useState<PiUser | null>(null)
  const [sdkReady, setSdkReady] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState("")
  const t = copy[language]

  useEffect(() => {
    if (window.Pi) {
      try {
        window.Pi.init({ version: "2.0", sandbox: true })
        setSdkReady(true)
      } catch {
        setSdkReady(false)
      }
      return
    }
    const timer = window.setInterval(() => {
      if (!window.Pi) return
      try {
        window.Pi.init({ version: "2.0", sandbox: true })
        setSdkReady(true)
      } catch {
        setSdkReady(false)
      }
      window.clearInterval(timer)
    }, 250)
    return () => window.clearInterval(timer)
  }, [])

  async function signIn() {
    setNotice("")
    if (!isPiBrowserAvailable() || !sdkReady || !window.Pi) {
      setNotice(t.unavailable)
      return
    }
    setBusy(true)
    try {
      const result = await window.Pi.authenticate(["username"], () => undefined)
      setPiUser(result.user)
    } catch {
      setNotice(t.unavailable)
    } finally {
      setBusy(false)
    }
  }

  async function simulatePayment() {
    setBusy(true)
    setNotice("")
    try {
      await createPetitionPayment(piUser?.uid ?? "demo-visitor")
      setNotice(t.paymentDone)
    } catch {
      setNotice(t.paymentError)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="app-shell" dir={language === "ar" ? "rtl" : "ltr"}>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Elmahrosa Smart City home">
          <span className="brand-mark" aria-hidden="true">م</span>
          <span><strong>Elmahrosa Smart City</strong><small>Alexandria · Egypt</small></span>
        </a>
        <div className="top-actions">
          <button className="language-toggle" onClick={() => setLanguage(language === "ar" ? "en" : "ar")}>
            {language === "ar" ? "English" : "العربية"}
          </button>
          <button className="button button-gold" onClick={signIn} disabled={busy}>
            {piUser ? `${t.connected} @${piUser.username}` : t.login}
          </button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span class="live-dot" /> PI NEXT HACKATHON 2026</span>
          <h1>Elmahrosa<br /><em>Smart City</em></h1>
          <p>{t.tagline}</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#petition">{t.sign} <span aria-hidden="true">↗</span></a>
            <span className="demo-chip">{t.demo}</span>
          </div>
        </div>
        <div className="city-art" aria-label="Illustration of Alexandria city at dusk" role="img">
          <div className="sun" />
          <div className="skyline skyline-back"><i /><i /><i /><i /><i /></div>
          <div className="skyline skyline-front"><i /><i /><i /><i /><i /><i /></div>
          <div className="coastline" />
          <div className="map-pin pin-one">●</div><div className="map-pin pin-two">●</div><div className="map-pin pin-three">●</div>
          <span className="art-caption">31.2001° N · 29.9187° E</span>
        </div>
      </section>

      <div className="sandbox-banner"><span>ⓘ</span> {t.sandbox}</div>
      {!sdkReady && <p className="browser-hint">{t.browser}</p>}
      {notice && <div className="notice" role="status">{notice}</div>}

      <section className="content-section">
        <div className="section-heading"><div><span className="eyebrow">A CIVIC DEMO</span><h2>{language === "ar" ? "مدينة أفضل تبدأ بالمشاركة" : "Better cities start with participation"}</h2></div><span className="demo-chip">{t.demo}</span></div>
        <div className="feature-grid">
          <article className="feature-card feature-primary"><div className="feature-icon">✍</div><span className="card-kicker">01 / PETITIONS</span><h3>{t.petition}</h3><p>{language === "ar" ? "استكشف نموذجاً توضيحياً للمشاركة المدنية. البيانات والأرقام المعروضة تجريبية." : "Explore a civic participation demo. Displayed figures and activity are demo data."}</p><a href="#petition" className="text-link">{language === "ar" ? "استكشف العريضة" : "Explore petition"} ↗</a></article>
          <article className="feature-card"><div className="feature-icon">◈</div><span className="card-kicker">02 / COMMUNITY</span><h3>{t.governance}</h3><p>{language === "ar" ? "مساحة تجريبية لمقترحات المجتمع ومناقشاته." : "A demo space for community proposals and discussion."}</p></article>
          <article className="feature-card"><div className="feature-icon">◎</div><span className="card-kicker">03 / TRANSPARENCY</span><h3>{t.treasury}</h3><p>{language === "ar" ? "واجهة توضيحية للتتبع؛ لا توجد أموال أو أرصدة فعلية معروضة." : "An illustrative tracking interface; no real funds or balances are shown."}</p></article>
          <article className="feature-card"><div className="feature-icon">⌖</div><span className="card-kicker">04 / ALEXANDRIA</span><h3>{t.map}</h3><p>{language === "ar" ? "تصور مجتمعي تجريبي، وليس خريطة حية أو بيانات بلدية رسمية." : "A community demo concept, not a live map or official municipal data."}</p></article>
          <article className="feature-card"><div className="feature-icon">✦</div><span className="card-kicker">05 / CONTRIBUTION</span><h3>{t.badges}</h3><p>{language === "ar" ? "شارات تجريبية للاكتشاف والمشاركة المدنية." : "Demo badges for discovery and civic participation."}</p></article>
        </div>
      </section>

      <section id="petition" className="petition-panel">
        <div><span className="eyebrow">TESTNET SANDBOX CHECKOUT</span><h2>{t.petition}</h2><p>{language === "ar" ? "رسوم نموذجية قدرها 5 Pi لأغراض العرض فقط. الزر يحاكي الدفع محلياً ولا يستدعي معاملة حقيقية." : "A 5 Pi sample fee for demonstration only. This button simulates payment locally and does not create a real transaction."}</p><strong className="sandbox-label">{t.sandbox}</strong></div>
        <button className="button button-gold payment-button" onClick={simulatePayment} disabled={busy}>{busy ? t.loading : t.submit} <span aria-hidden="true">→</span></button>
      </section>

      <section className="content-section screenshots-section">
        <div className="section-heading"><div><span className="eyebrow">SUBMISSION ASSETS</span><h2>{t.screenshots}</h2></div></div>
        <div className="screenshots-grid">
          <Screenshot number="01" title={language === "ar" ? "مدينة الإسكندرية" : "Alexandria city"} description={t.screen1} variant="map" />
          <Screenshot number="02" title={language === "ar" ? "مشاركة مدنية" : "Civic participation"} description={t.screen2} variant="petition" />
          <Screenshot number="03" title={language === "ar" ? "مجتمع الرواد" : "Pioneer community"} description={t.screen3} variant="community" />
        </div>
      </section>
      <footer><span className="brand-mark small">م</span><span>{t.foot}</span><span className="footer-demo">DEMO · SANDBOX</span></footer>
    </main>
  )
}

function Screenshot({ number, title, description, variant }: { number: string; title: string; description: string; variant: string }) {
  return <article className="screenshot-card"><div className={`screenshot-preview ${variant}`}><div className="preview-top"><span className="preview-logo">م</span><span>ELMAHROSA</span><span className="preview-pill">DEMO</span></div><div className="preview-title">{title}</div><div className="preview-lines"><i /><i /><i /></div><div className="preview-bottom"><span>PI · SANDBOX</span><span>✦ &nbsp; ◈ &nbsp; ⌖</span></div></div><div className="screenshot-caption"><span>{number}</span><p>{description}</p></div></article>
}
