import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
  const hasKvUrl = !!(process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL);
  const isVercel = !!process.env.VERCEL;

  let blobList: any[] = [];
  let blobError: string | null = null;
  let blobContent: any = null;

  if (hasBlobToken) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: "data/custom_properties.json" });
      blobList = blobs.map((b) => ({ url: b.url, uploadedAt: b.uploadedAt, size: b.size }));

      if (blobs.length > 0) {
        const sorted = [...blobs].sort(
          (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        const res = await fetch(sorted[0].url, { cache: "no-store" });
        if (res.ok) {
          const arr = await res.json();
          blobContent = { count: Array.isArray(arr) ? arr.length : null };
        }
      }
    } catch (err: any) {
      blobError = err?.message || String(err);
    }
  }

  return NextResponse.json({
    isVercel,
    hasBlobToken,
    hasKvUrl,
    blobList,
    blobError,
    blobContent,
    env: {
      BLOB_READ_WRITE_TOKEN: hasBlobToken ? "SET ✅" : "NOT SET ❌",
      KV_REST_API_URL: hasKvUrl ? "SET ✅" : "NOT SET ❌",
    },
  });
}
