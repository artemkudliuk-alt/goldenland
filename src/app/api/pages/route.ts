import { NextResponse } from "next/server";
import { getCustomPages } from "@/lib/pages-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const pages = await getCustomPages();
    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error("Error fetching custom pages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
