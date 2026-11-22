import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const paymentId = typeof body?.paymentId === "string" ? body.paymentId : ""
    if (!paymentId) return NextResponse.json({ error: "paymentId required" }, { status: 400 })
    // Server-side approval hook: integrate with Pi Platform API when PI_API_KEY is configured.
    return NextResponse.json({ ok: true, paymentId, status: "approved" })
  } catch {
    return NextResponse.json({ error: "Approval failed" }, { status: 500 })
  }
}
