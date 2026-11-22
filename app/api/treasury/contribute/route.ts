import { NextResponse } from "next/server"

/** No contributions are accepted or recorded by this demo endpoint. */
export async function POST() {
  return NextResponse.json(
    { error: "Sandbox Mode — No real Pi charged. Contributions and land/share purchases are not available." },
    { status: 410 },
  )
}
