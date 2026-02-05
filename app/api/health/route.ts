import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Simple health check
    return NextResponse.json({ 
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "admin-dashboard"
    })
  } catch (error) {
    return NextResponse.json(
      { status: "error", error: "Service unavailable" },
      { status: 503 }
    )
  }
}
