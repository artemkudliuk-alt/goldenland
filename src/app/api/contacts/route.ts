import { NextResponse } from "next/server";
import { getContactSettings } from "@/lib/contacts-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await getContactSettings();
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Error fetching contact settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
