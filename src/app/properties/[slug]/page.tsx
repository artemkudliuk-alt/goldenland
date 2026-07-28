import { getCustomProperties } from "@/lib/properties-store";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PropertyDetailClient } from "./PropertyDetailClient";
import Link from "next/link";

// Server-side rendering so new admin properties appear immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let property: any = null;

  try {
    const allProperties = await getCustomProperties();
    property = allProperties.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error("[PropertyDetailPage] Error loading property:", error);
  }

  if (!property) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-[#FDFDFD] pt-[140px] pb-24 text-center">
          <div className="mx-auto max-w-[600px] px-4">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-4">404</p>
            <h1 className="text-[32px] font-light text-[#0a0a0a] mb-6 uppercase tracking-wider">
              Property Not Found
            </h1>
            <p className="text-gray-500 font-light text-[15px] mb-8">
              The property &ldquo;{slug}&rdquo; was not found. It may have been removed or the URL is incorrect.
            </p>
            <Link
              href="/catalog"
              className="inline-block bg-[#D4AF37] text-[#0a0a0a] px-8 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-[#b8972e] transition-colors"
            >
              ← Back to Catalog
            </Link>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </>
    );
  }

  return (
    <>
      <Header />
      <PropertyDetailClient property={property} />
      <Footer />
      <BackToTop />
    </>
  );
}
