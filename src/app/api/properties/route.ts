import { NextResponse } from "next/server";
import { getCustomProperties } from "@/lib/properties-store";

export async function GET() {
  try {
    const custom = await getCustomProperties();
    
    // Map custom properties to match public Property shape
    const mapped = custom.map((p) => {
      let roiVal: number | undefined = undefined;
      if (p.roi) {
        const cleaned = p.roi.replace(/[^0-9.]/g, "");
        roiVal = parseFloat(cleaned) || undefined;
      }

      return {
        slug: p.slug,
        type: p.type,
        status: (p.status || "ready") as any,
        title: p.title,
        location: p.location,
        city: p.city as any,
        price: p.price,
        area: p.area,
        beds: p.bedrooms,
        roi: roiVal,
        gallery: p.gallery,
        video: p.video,
        description: p.description,
        amenities: [],
        specs: p.specs,
        address: p.address,
        id: p.id,
      };
    });

    return NextResponse.json({ success: true, properties: mapped });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
