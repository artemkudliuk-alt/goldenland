import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

export const maxDuration = 60;

/** Find any BLOB_READ_WRITE_TOKEN* env var — Vercel may suffix it with store name */
function getBlobToken(): string | undefined {
  // Try the standard name first
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  // Search all env vars that start with BLOB_READ_WRITE_TOKEN
  for (const [key, val] of Object.entries(process.env)) {
    if (key.startsWith("BLOB_READ_WRITE_TOKEN") && val) return val;
  }
  return undefined;
}

function getContentType(ext: string, mimeType?: string): string {
  if (mimeType && mimeType.startsWith("image/")) return mimeType;
  const map: Record<string, string> = {
    jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
    webp: "image/webp", gif: "image/gif", svg: "image/svg+xml",
    mp4: "video/mp4", webm: "video/webm",
  };
  return map[ext] ?? "application/octet-stream";
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized. Please log in to admin." }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const formData = await req.formData();
    file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const originalName = file.name || "upload";
    const ext = (originalName.split(".").pop() ?? "jpg").toLowerCase();
    const safeName = originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .slice(0, 40);
    const filename = `gl-uploads/${Date.now()}_${safeName}.${ext}`;
    const contentType = getContentType(ext, file.type);

    // Convert file once to avoid stream-already-consumed errors
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ── 1. Try Vercel Blob Storage ────────────────────────────────────────
    const blobToken = getBlobToken();
    if (blobToken) {
      try {
        const blob = await put(filename, buffer, {
          access: "public",
          contentType,
          token: blobToken,
        });
        console.log("[upload] Blob upload success:", blob.url);
        return NextResponse.json({ success: true, url: blob.url, storage: "blob" });
      } catch (blobErr: any) {
        console.error("[upload] Vercel Blob upload failed:", blobErr?.message ?? blobErr);
        // Fall through to /tmp
      }
    } else {
      console.warn("[upload] BLOB_READ_WRITE_TOKEN not found — falling back to /tmp");
    }

    // ── 2. /tmp fallback (works on Vercel, but files are ephemeral!) ──────
    // Note: files in /tmp disappear when the serverless function is recycled.
    // To make images permanent, go to Vercel Dashboard → Project → Settings →
    // Environment Variables and verify BLOB_READ_WRITE_TOKEN is set.
    const tmpDir = path.join("/tmp", "uploads");
    try {
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    } catch {
      // ignore mkdir errors on read-only systems
    }

    const localFilename = `${Date.now()}_${safeName}.${ext}`;
    const filePath = path.join(tmpDir, localFilename);

    try {
      fs.writeFileSync(filePath, buffer);
    } catch (fsErr: any) {
      console.error("[upload] /tmp write failed:", fsErr?.message);
      return NextResponse.json(
        { error: "Upload failed: Vercel Blob not configured and /tmp is unavailable. Please add BLOB_READ_WRITE_TOKEN to your Vercel environment variables." },
        { status: 500 }
      );
    }

    console.warn("[upload] Saved to /tmp (ephemeral!) →", filePath);
    return NextResponse.json({
      success: true,
      url: `/api/uploads/${localFilename}`,
      storage: "tmp",
      warning: "⚠️ Image saved to temporary storage. Add BLOB_READ_WRITE_TOKEN to Vercel env vars for permanent storage.",
    });
  } catch (error: any) {
    console.error("[upload] Unexpected error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
