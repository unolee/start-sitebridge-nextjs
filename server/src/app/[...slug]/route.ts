import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json",
};

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || "application/octet-stream";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const slugPath = slug.join("/");

  // Skip API and Next.js internal routes
  if (slugPath.startsWith("api/") || slugPath.startsWith("_next/")) {
    return NextResponse.next();
  }

  const publicDir = path.join(process.cwd(), "public");

  // Check if the requested path matches a static file in public/
  const filePath = path.join(publicDir, slugPath);
  const normalizedFilePath = path.normalize(filePath);

  // Prevent directory traversal
  if (!normalizedFilePath.startsWith(publicDir)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  if (fs.existsSync(normalizedFilePath) && fs.statSync(normalizedFilePath).isFile()) {
    const content = fs.readFileSync(normalizedFilePath);
    return new NextResponse(content, {
      headers: { "Content-Type": getMimeType(normalizedFilePath) },
    });
  }

  // SPA fallback: serve index.html for client-side routing
  const indexPath = path.join(publicDir, "index.html");
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, "utf-8");
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  return new NextResponse("Not Found", { status: 404 });
}
