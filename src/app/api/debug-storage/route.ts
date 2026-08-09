import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
  const hasKvUrl = !!(process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL);
  const isVercel = !!process.env.VERCEL;

  let allBlobs: any[] = [];
  let blobError: string | null = null;
  let customPropertiesBlobData: any = null;
  let kvData: any = null;

  if (hasBlobToken) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list();
      allBlobs = blobs.map((b) => ({ pathname: b.pathname, url: b.url, uploadedAt: b.uploadedAt, size: b.size }));

      const propBlobs = blobs.filter((b) => b.pathname.includes("custom_properties"));
      if (propBlobs.length > 0) {
        const sorted = [...propBlobs].sort(
          (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        const res = await fetch(`${sorted[0].url}?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          customPropertiesBlobData = await res.json();
        }
      }
    } catch (err: any) {
      blobError = err?.message || String(err);
    }
  }

  if (hasKvUrl) {
    try {
      const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL;
      const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN;
      const res = await fetch(kvUrl!, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", "custom_properties"]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        kvData = data?.result;
      }
    } catch (err: any) {
      // ignore
    }
  }

  return NextResponse.json({
    isVercel,
    allBlobs,
    blobError,
    customPropertiesBlobData,
    kvData,
  });
}
