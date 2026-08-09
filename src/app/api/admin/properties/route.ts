import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCustomProperties, saveCustomProperties, type PropertyData } from "@/lib/properties-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0400-\u04FF-]/gi, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const properties = await getCustomProperties();
    return NextResponse.json({ success: true, properties });
  } catch (error) {
    console.error("Error fetching properties for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { properties } = body;
    if (!Array.isArray(properties)) {
      return NextResponse.json({ error: "Missing properties array" }, { status: 400 });
    }

    const sanitizedProperties: PropertyData[] = properties.map((p: any, idx: number) => {
      const id = typeof p?.id === "string" && p.id.trim().length > 0 ? p.id : `prop_${Date.now()}_${idx}`;

      const titleObj = {
        en: typeof p?.title === "object" ? (p.title.en || "") : (typeof p?.title === "string" ? p.title : ""),
        ua: typeof p?.title === "object" ? (p.title.ua || p.title.en || "") : "",
        ru: typeof p?.title === "object" ? (p.title.ru || p.title.en || "") : "",
      };

      let slug = typeof p?.slug === "string" ? p.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") : "";
      if (!slug) {
        slug = slugify(titleObj.en || titleObj.ua || titleObj.ru || `property-${idx + 1}`);
      }

      const locationObj = {
        en: typeof p?.location === "object" ? (p?.location?.en || "") : (typeof p?.location === "string" ? p.location : ""),
        ua: typeof p?.location === "object" ? (p?.location?.ua || p?.location?.en || "") : "",
        ru: typeof p?.location === "object" ? (p?.location?.ru || p?.location?.en || "") : "",
      };

      const descriptionObj = {
        en: typeof p?.description === "object" ? (p?.description?.en || "") : (typeof p?.description === "string" ? p.description : ""),
        ua: typeof p?.description === "object" ? (p?.description?.ua || p?.description?.en || "") : "",
        ru: typeof p?.description === "object" ? (p?.description?.ru || p?.description?.en || "") : "",
      };

      const addressObj = typeof p?.address === "object" && p.address !== null ? {
        en: typeof p.address.en === "string" ? p.address.en : "",
        ua: typeof p.address.ua === "string" ? p.address.ua : (typeof p.address.en === "string" ? p.address.en : ""),
        ru: typeof p.address.ru === "string" ? p.address.ru : (typeof p.address.en === "string" ? p.address.en : ""),
      } : (typeof p?.address === "string" ? { en: p.address, ua: p.address, ru: p.address } : { en: "", ua: "", ru: "" });

      const galleryArray = Array.isArray(p?.gallery)
        ? p.gallery.filter((g: any) => typeof g === "string" && g.trim().length > 0)
        : [];

      const validTypes = ["apartments", "villas", "hotels", "commercial"];
      const propType = validTypes.includes(p?.type) ? p.type : "apartments";
      const validCities = ["odesa", "dubai", "kyiv", "lviv"];
      const propCity = validCities.includes(p?.city) ? p.city : "odesa";

      return {
        id,
        slug,
        title: titleObj,
        location: locationObj,
        city: propCity,
        type: propType as any,
        price: typeof p?.price === "number" ? p.price : (Number(p?.price) || 0),
        area: typeof p?.area === "number" ? p.area : (Number(p?.area) || 0),
        bedrooms: typeof p?.bedrooms === "number" ? p.bedrooms : (Number(p?.bedrooms) || 0),
        roi: typeof p?.roi === "string" ? p.roi : (p?.roi ? String(p.roi) : ""),
        gallery: galleryArray,
        video: typeof p?.video === "string" ? p.video : "",
        status: typeof p?.status === "string" ? p.status : "ready",
        address: addressObj,
        managerName: typeof p?.managerName === "string" ? p.managerName.trim() : "",
        managerInitials: typeof p?.managerInitials === "string" ? p.managerInitials.trim().toUpperCase().slice(0, 3) : "",
        managerPhoto: typeof p?.managerPhoto === "string" ? p.managerPhoto.trim() : "",
        managerWhatsapp: typeof p?.managerWhatsapp === "string" ? p.managerWhatsapp.trim() : "",
        managerTelegram: typeof p?.managerTelegram === "string" ? p.managerTelegram.trim() : "",
        description: descriptionObj,
        specs: p?.specs && typeof p.specs === "object" ? p.specs : undefined,
      };
    });

    const ok = await saveCustomProperties(sanitizedProperties);
    if (!ok) {
      return NextResponse.json({ error: "Failed to save properties" }, { status: 500 });
    }

    return NextResponse.json({ success: true, properties: sanitizedProperties });
  } catch (error: any) {
    console.error("Error saving properties for admin:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
