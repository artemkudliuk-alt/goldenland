import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContactSettings, saveContactSettings, type ContactSettings } from "@/lib/contacts-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const settings = await getContactSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Error fetching contact settings for admin:", error);
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

    const { whatsapp, telegram, offices } = body;
    if (typeof whatsapp !== "string" || typeof telegram !== "string" || !Array.isArray(offices)) {
      return NextResponse.json({ error: "Missing required contact settings fields" }, { status: 400 });
    }

    // Validate offices array structure
    for (const office of offices) {
      if (!office.id || !office.phone || !office.name || typeof office.name !== "object") {
        return NextResponse.json({ error: "Invalid office object structure" }, { status: 400 });
      }
      if (typeof office.name.en !== "string" || typeof office.name.ua !== "string" || typeof office.name.ru !== "string") {
        return NextResponse.json({ error: "Office name translations must be strings" }, { status: 400 });
      }
    }

    const newSettings: ContactSettings = {
      whatsapp,
      telegram,
      offices,
    };

    const ok = await saveContactSettings(newSettings);
    if (!ok) {
      return NextResponse.json({ error: "Failed to save contact settings" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving contact settings for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
