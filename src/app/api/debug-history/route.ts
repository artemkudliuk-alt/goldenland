import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
  if (!hasBlobToken) {
    return NextResponse.json({ error: "No BLOB_READ_WRITE_TOKEN" });
  }

  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list();

    // Find all JSON snapshots and image blobs
    const jsonBlobs = blobs.filter((b) => b.pathname.includes("custom_properties") || b.pathname.endsWith(".json"));
    const imageBlobs = blobs.filter((b) => !b.pathname.endsWith(".json"));

    const snapshots: any[] = [];
    for (const jb of jsonBlobs) {
      try {
        const res = await fetch(`${jb.url}?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          snapshots.push({
            pathname: jb.pathname,
            uploadedAt: jb.uploadedAt,
            url: jb.url,
            itemCount: Array.isArray(data) ? data.length : 0,
            properties: data,
          });
        }
      } catch (e: any) {
        snapshots.push({
          pathname: jb.pathname,
          uploadedAt: jb.uploadedAt,
          error: e.message,
        });
      }
    }

    return NextResponse.json({
      totalBlobs: blobs.length,
      imageCount: imageBlobs.length,
      imagesSample: imageBlobs.slice(0, 30).map((b) => ({ pathname: b.pathname, url: b.url, uploadedAt: b.uploadedAt })),
      snapshotsCount: snapshots.length,
      snapshots,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
