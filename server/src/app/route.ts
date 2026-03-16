import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const indexPath = path.join(publicDir, "index.html");

  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, "utf-8");
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse(
    `<html><body><h1>Server is running</h1><p>Build and deploy the client to see your app.</p></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
