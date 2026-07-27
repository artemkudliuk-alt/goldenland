import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getCustomPages, saveCustomPages, type CustomPage } from "@/lib/pages-store";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

    const sanitizedPages: CustomPage[] = pages.map((page: any, idx: number) => {
      const titleObj = {
        en: typeof page?.title === "object" ? (page.title.en || "") : (typeof page?.title === "string" ? page.title : ""),
        ua: typeof page?.title === "object" ? (page.title.ua || page.title.en || "") : "",
        ru: typeof page?.title === "object" ? (page.title.ru || page.title.en || "") : "",
      };

      const contentObj = {
        en: typeof page?.content === "object" ? (page.content.en || "") : (typeof page?.content === "string" ? page.content : ""),
        ua: typeof page?.content === "object" ? (page.content.ua || page.content.en || "") : "",
        ru: typeof page?.content === "object" ? (page.content.ru || page.content.en || "") : "",
      };

      let slug = typeof page?.slug === "string" ? page.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "") : "";
      if (!slug) {
        slug = slugify(titleObj.en || titleObj.ua || `page-${idx + 1}`);
      }

      return {
        slug,
        title: titleObj,
        content: contentObj,
        showInHeader: Boolean(page?.showInHeader),
        showInFooter: Boolean(page?.showInFooter),
      };
    });

    const ok = await saveCustomPages(sanitizedPages);
    if (!ok) {
      return NextResponse.json({ error: "Failed to save pages" }, { status: 500 });
    }

    return NextResponse.json({ success: true, pages: sanitizedPages });
  } catch (error: any) {
    console.error("Error saving pages for admin:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
