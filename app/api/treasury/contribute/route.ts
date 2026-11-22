import { NextResponse } from "next/server"

/** Contributions endpoint - connect payment processing before enabling. */
export async function POST() {
  return NextResponse.json(
    { error: "Contributions are not available yet. No land sale or share sale is offered." },
    { status: 503 },
  )
}
