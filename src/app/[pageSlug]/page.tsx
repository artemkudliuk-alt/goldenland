import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { getCustomPages } from "@/lib/pages-store";

interface PageProps {
  params: Promise<{
    pageSlug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const pages = await getCustomPages();
    return pages.map((p) => ({
      pageSlug: p.slug,
    }));
  } catch (error) {
    console.error("generateStaticParams failed for dynamic pages:", error);
    return [];
  }
}

export default async function CustomDynamicPage({ params }: PageProps) {
  const { pageSlug } = await params;
  
  let pageData = null;
  try {
    const pages = await getCustomPages();
    pageData = pages.find((p) => p.slug === pageSlug);
  } catch (error) {
    console.error("Error loading dynamic page data:", error);
  }

  if (!pageData) {
    notFound();
  }

  const p = pageData;

  return (
    <>
      <Header />
      <main className="flex-1 bg-[color:var(--bower-cream)]">
        {/* Pass translatable titles - our Header handles lang, but for static SSR we use standard display */}
        {/* We can use localized strings client-side or render standard EN default for SSR and translate dynamically */}
        <DynamicPageContent page={p} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

// Client helper to handle dynamic language switching from context
import { DynamicPageContent } from "./DynamicPageContent";
