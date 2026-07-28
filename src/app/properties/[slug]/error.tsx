"use client";

import Link from "next/link";

export default function PropertyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 bg-[#FDFDFD] pt-[140px] pb-24 text-center">
      <div className="mx-auto max-w-[600px] px-4">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium mb-4">Error</p>
        <h1 className="text-[28px] font-light text-[#0a0a0a] mb-4 uppercase tracking-wider">
          Something went wrong
        </h1>
        <p className="text-gray-500 font-light text-[14px] mb-8">
          This property page encountered an error. Please try again.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-[#D4AF37] text-[#0a0a0a] px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase hover:bg-[#b8972e] transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/catalog"
            className="border border-gray-300 text-gray-700 px-6 py-3 text-[12px] font-medium tracking-[0.14em] uppercase hover:border-gray-500 transition-colors"
          >
            ← Catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
