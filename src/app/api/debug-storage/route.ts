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
      const snapshots: any[] = [];
      for (const pb of propBlobs) {
        try {
          const res = await fetch(`${pb.url}?t=${Date.now()}`, { cache: "no-store" });
          if (res.ok) {
            const arr = await res.json();
            snapshots.push({
              pathname: pb.pathname,
              uploadedAt: pb.uploadedAt,
              url: pb.url,
              count: Array.isArray(arr) ? arr.length : 0,
              data: arr,
            });
          }
        } catch (e: any) {
          snapshots.push({ pathname: pb.pathname, uploadedAt: pb.uploadedAt, error: e.message });
        }
      }

      if (snapshots.length > 0) {
        snapshots.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
        customPropertiesBlobData = snapshots[0].data;
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
