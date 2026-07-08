"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons";
import { formatPrice, type Property } from "@/lib/properties";

const t = {
  viewDetails: { en: "View Details", ua: "Детальніше", ru: "Подробнее" },
  fromLabel: { en: "From", ua: "Від", ru: "От" },
  bedrooms: { en: "BR", ua: "спал.", ru: "спал." },
  keys: { en: "keys", ua: "номерів", ru: "номеров" },
  area: { en: "sqm", ua: "м²", ru: "м²" },
  roi: { en: "ROI", ua: "ROI", ru: "ROI" },
  status: {
    "off-plan": { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
    ready: { en: "Ready", ua: "Готовий", ru: "Готов" },
    exclusive: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
    investment: { en: "Investment Grade", ua: "Investment Grade", ru: "Investment Grade" },
  } as const,
};

export function PropertyCard({ property }: { property: Property }) {
  const { language } = useLanguage();
  const p = property;
  const isHotel = p.type === "hotels";
  const isCommercial = p.type === "commercial";

  return (
    <article className="group flex flex-col bg-white border border-[#D4AF37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_16px_36px_rgba(212,175,55,0.14)] rounded-sm overflow-hidden h-full relative">
      {/* Full card clickable overlay */}
      <Link href={`/properties/${p.slug}`} className="absolute inset-0 z-10 cursor-pointer" aria-label={p.title[language]} />

      <div className="relative block aspect-[4/3] w-full overflow-hidden bg-black">
        <Image
          src={p.gallery[0]}
          alt={p.title[language]}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 top-0 flex justify-between p-4">
          {p.status !== "exclusive" && (
            <span className="bg-[#0a0a0a]/90 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase text-white shadow-md">
              {t.status[p.status][language]}
            </span>
          )}
          {p.roi && (
            <span className="bg-[#D4AF37] px-3 py-1 text-[10px] font-medium tracking-[0.12em] uppercase text-[#0a0a0a] shadow-md font-semibold">
              {t.roi[language]} {p.roi}%
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between bg-white">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">
            {p.location[language]}
          </p>
          <h3 className="text-[20px] font-light leading-[1.3] text-[#0a0a0a]">
            <Link href={`/properties/${p.slug}`} className="transition-colors hover:text-[#D4AF37]">
              {p.title[language]}
            </Link>
          </h3>
        </div>

        <div>
          {/* Блок цены и параметров */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
            {/* Плашка Цены */}
            <div className="flex items-baseline gap-1.5 bg-[#fcf8ed] border border-[#D4AF37]/40 px-3 py-1.5 rounded-xs">
              <span className="text-[10px] tracking-[0.14em] uppercase text-[#D4AF37] font-semibold">{t.fromLabel[language]}</span>
              <span className="text-[15px] font-semibold text-[#0a0a0a]">{formatPrice(p.price, p.priceOnRequest, language)}</span>
            </div>

            {/* Параметры */}
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-700">
              {p.beds !== undefined && !isCommercial && !isHotel && (
                <span className="border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-xs">
                  {p.beds} {t.bedrooms[language]}
                </span>
              )}
              {isHotel && p.baths !== undefined && (
                <span className="border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-xs">
                  {p.baths} {t.keys[language]}
                </span>
              )}
              <span className="border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-xs">
                {p.area.toLocaleString("en-US")} {t.area[language]}
              </span>
            </div>
          </div>

          {/* Кнопка подробнее с золотой акцентной линией */}
          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
            <Link
              href={`/properties/${p.slug}`}
              className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.14em] uppercase text-[#0a0a0a] transition-colors group-hover:text-[#D4AF37]"
            >
              <span>{t.viewDetails[language]}</span>
              <ArrowRightIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 text-[#D4AF37]" />
            </Link>
            <span className="h-[2px] w-6 bg-[#D4AF37] transition-all duration-500 group-hover:w-12" />
          </div>
        </div>
      </div>
    </article>
  );
}
