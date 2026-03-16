import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const row = db.prepare("SELECT message FROM welcome WHERE id = 1").get() as
    | { message: string }
    | undefined;

  return NextResponse.json({
    message: row?.message ?? "Hello from SiteBridge!",
    timestamp: new Date().toISOString(),
  });
}
