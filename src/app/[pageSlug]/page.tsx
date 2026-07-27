import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { getCustomPages } from "@/lib/pages-store";
import { DynamicPageContent } from "./DynamicPageContent";

// Force dynamic rendering so new pages added via admin appear immediately
// without requiring a redeploy
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{
    pageSlug: string;
  }>;
}

export default async function CustomDynamicPage({ params }: PageProps) {
  const { pageSlug } = await params;

  // Exclude paths that are handled by dedicated route files
  const staticRoutes = [
    "about", "catalog", "contacts", "services", "insights",
    "properties", "admin", "app", "presentation", "profile",
    "thank-you", "api",
  ];
  if (staticRoutes.includes(pageSlug)) {
    notFound();
  }

  let pageData = null;
  try {
    const pages = await getCustomPages();
    pageData = pages.find((p) => p.slug === pageSlug) || null;
  } catch (error) {
    console.error("Error loading dynamic page data:", error);
  }

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[color:var(--bower-cream)]">
        <DynamicPageContent page={pageData} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
