import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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
      return NextResponse.json({ error: "No file provided in form data" }, { status: 400 });
    }

    const originalName = file.name || "upload_file";
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}_${sanitizedName}`;

    // 1. If Vercel Blob token is set, upload to Vercel CDN
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(filename, file, {
          access: "public",
        });
        return NextResponse.json({
          success: true,
          url: blob.url,
        });
      } catch (blobErr: any) {
        console.error("Vercel Blob upload failed:", blobErr);
        // Fall back to local filesystem if Blob fails (e.g. invalid token during local testing)
      }
    }

    // 2. Local filesystem storage (/public/uploads)
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to process file upload" }, { status: 500 });
  }
}
