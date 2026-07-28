import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const maxDuration = 60;

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
    const ext = originalName.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .slice(0, 40);
    const filename = `gl-uploads/${Date.now()}_${safeName}.${ext}`;

    // ─── Production: Vercel Blob Storage ────────────────────────────────────
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Convert File to ArrayBuffer first — prevents stream-already-consumed errors
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const blob = await put(filename, buffer, {
        access: "public",
        contentType: file.type || `image/${ext}`,
      });

      return NextResponse.json({ success: true, url: blob.url });
    }

    // ─── Local Development: public/uploads folder ────────────────────────────
    const fs = await import("fs");
    const path = await import("path");
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const localFilename = `${Date.now()}_${safeName}.${ext}`;
    fs.writeFileSync(path.join(uploadDir, localFilename), buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${localFilename}`,
    });
  } catch (error: any) {
    console.error("[upload] Error:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "Upload failed. Make sure Vercel Blob Store is connected to this project.",
      },
      { status: 500 }
    );
  }
}
