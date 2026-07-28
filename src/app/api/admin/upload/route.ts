import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import fs from "fs";
import path from "path";

export const maxDuration = 60;

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

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const originalName = file.name || "upload";
    const ext = (originalName.split(".").pop() ?? "jpg").toLowerCase();
    const safeName = originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .slice(0, 40);
    const blobPath = `gl-uploads/${Date.now()}_${safeName}.${ext}`;
    const contentType = getContentType(ext, file.type);

    // Read file into buffer ONCE to avoid stream-consumed errors
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ── 1. Try Vercel Blob (SDK auto-reads BLOB_READ_WRITE_TOKEN from env) ─
    try {
      const blob = await put(blobPath, buffer, {
        access: "public",
        contentType,
      });
      console.log("[upload] ✅ Vercel Blob success:", blob.url);
      return NextResponse.json({ success: true, url: blob.url, storage: "blob" });
    } catch (blobErr: any) {
      // Log the REAL blob error so we can see it in Vercel logs
      console.error("[upload] ❌ Vercel Blob failed:", blobErr?.message ?? String(blobErr));
    }

    // ── 2. /tmp fallback ──────────────────────────────────────────────────
    // Works within the same Lambda instance but NOT across cold starts.
    // Files uploaded here will disappear when the serverless function restarts.
    // Solution: connect Blob store to project in Vercel Dashboard.
    const localFilename = `${Date.now()}_${safeName}.${ext}`;
    const tmpDir = "/tmp/uploads";
    try {
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
      fs.writeFileSync(path.join(tmpDir, localFilename), buffer);
      console.warn("[upload] ⚠️  Saved to /tmp (ephemeral):", localFilename);
      return NextResponse.json({
        success: true,
        url: `/api/uploads/${localFilename}`,
        storage: "tmp",
      });
    } catch (fsErr: any) {
      console.error("[upload] /tmp write failed:", fsErr?.message);
    }

    // ── 3. Last resort: local public/uploads (dev only) ───────────────────
    try {
      const devDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(devDir)) fs.mkdirSync(devDir, { recursive: true });
      fs.writeFileSync(path.join(devDir, localFilename), buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/${localFilename}`,
        storage: "local",
      });
    } catch {
      // ignore
    }

    return NextResponse.json(
      { error: "All upload methods failed. Check Vercel logs for details." },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("[upload] Unexpected error:", error);
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
