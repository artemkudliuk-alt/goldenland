import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCustomPages, saveCustomPages, type CustomPage } from "@/lib/pages-store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const pages = await getCustomPages();
    return NextResponse.json({ success: true, pages });
  } catch (error) {
    console.error("Error fetching pages for admin:", error);
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

    const { pages } = body;
    if (!Array.isArray(pages)) {
      return NextResponse.json({ error: "Missing pages array" }, { status: 400 });
    }

    // Validate pages structure
    for (const page of pages) {
      if (typeof page.slug !== "string" || !page.slug) {
        return NextResponse.json({ error: "Invalid page slug" }, { status: 400 });
      }
      if (!page.title || typeof page.title !== "object" || !page.content || typeof page.content !== "object") {
        return NextResponse.json({ error: "Page translations must be objects" }, { status: 400 });
      }
      if (typeof page.title.en !== "string" || typeof page.title.ua !== "string" || typeof page.title.ru !== "string" ||
          typeof page.content.en !== "string" || typeof page.content.ua !== "string" || typeof page.content.ru !== "string") {
        return NextResponse.json({ error: "Title and content translations must be strings" }, { status: 400 });
      }
    }

    const ok = await saveCustomPages(pages);
    if (!ok) {
      return NextResponse.json({ error: "Failed to save pages" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving pages for admin:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
