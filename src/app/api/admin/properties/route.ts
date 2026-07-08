import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCustomProperties, saveCustomProperties, type PropertyData } from "@/lib/properties-store";

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

    // Validate properties structure
    for (const p of properties) {
      if (typeof p.id !== "string" || !p.id) {
        return NextResponse.json({ error: "Invalid property id" }, { status: 400 });
      }
      if (typeof p.slug !== "string" || !p.slug) {
        return NextResponse.json({ error: "Invalid property slug" }, { status: 400 });
      }
      if (!p.title || typeof p.title !== "object" || !p.location || typeof p.location !== "object" || !p.description || typeof p.description !== "object") {
        return NextResponse.json({ error: "Title, location, and description translations must be objects" }, { status: 400 });
      }
      if (typeof p.title.en !== "string" || typeof p.title.ua !== "string" || typeof p.title.ru !== "string" ||
          typeof p.location.en !== "string" || typeof p.location.ua !== "string" || typeof p.location.ru !== "string" ||
          typeof p.description.en !== "string" || typeof p.description.ua !== "string" || typeof p.description.ru !== "string") {
        return NextResponse.json({ error: "Translation values must be strings" }, { status: 400 });
      }
      if (!Array.isArray(p.gallery)) {
        return NextResponse.json({ error: "Gallery must be an array of strings" }, { status: 400 });
      }
      if (p.gallery.length > 15) {
        return NextResponse.json({ error: "Gallery exceeds limit of 15 images" }, { status: 400 });
      }
    }

    const ok = await saveCustomProperties(properties);
    if (!ok) {
      return NextResponse.json({ error: "Failed to save properties" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving properties for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
