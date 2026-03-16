import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from SiteBridge!",
    timestamp: new Date().toISOString(),
  });
}
