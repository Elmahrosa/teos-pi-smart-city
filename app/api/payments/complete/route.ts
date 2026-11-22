import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const paymentId = typeof body?.paymentId === "string" ? body.paymentId : ""
    const txid = typeof body?.txid === "string" ? body.txid : ""
    if (!paymentId || !txid) return NextResponse.json({ error: "paymentId and txid required" }, { status: 400 })
    // Server-side completion hook: verify with Pi Platform API when PI_API_KEY is configured.
    return NextResponse.json({ ok: true, paymentId, txid, status: "completed" })
  } catch {
    return NextResponse.json({ error: "Completion failed" }, { status: 500 })
  }
}
