"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { ArrowRightIcon } from "@/components/icons";

const translations = {
  eyebrow: { en: "Featured Properties", ua: "Обрані об'єкти", ru: "Избранные объекты" },
  heading: {
    en: "Selected investment-grade properties.",
    ua: "Ретельно відібрані інвестиційні об'єкти.",
    ru: "Тщательно отобранные инвестиционные объекты.",
  },
  subhead: {
    en: "A curated selection of current opportunities — exclusive Odesa luxury hotels, private seaside residences and premier Dubai developments.",
    ua: "Курована добірка актуальних можливостей — ексклюзивні готелі Одеси, приватні резиденції біля моря та преміальні проєкти в Дубаї.",
    ru: "Курируемая подборка актуальных возможностей — эксклюзивные отели Одессы, частные резиденции у моря и премиальные проекты в Дубае.",
  },
  viewDetails: { en: "View Details", ua: "Детальніше", ru: "Подробнее" },
  exploreAll: { en: "Explore Full Catalog", ua: "Весь каталог", ru: "Весь каталог" },
  fromLabel: { en: "From", ua: "Від", ru: "От" },
  onRequest: { en: "Price on Request", ua: "Ціна за запитом", ru: "Цена по запросу" },
  bedrooms: { en: "BR", ua: "спал.", ru: "спал." },
  area: { en: "sqm", ua: "м²", ru: "м²" },
  tags: {
    exclusive: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
    ready: { en: "Ready", ua: "Готовий", ru: "Готов" },
    "off-plan": { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
    investment: { en: "Investment", ua: "Інвестиційний", ru: "Инвестиционный" },
  }
};

type ApiProperty = {
  slug: string;
  type: string;
  status: string;
  title: { en: string; ua: string; ru: string };
  location: { en: string; ua: string; ru: string };
  city: string;
  price: number;
  area: number;
  beds?: number;
  gallery: string[];
};

// Fallback items if API is loading/empty
const FALLBACK_PROPERTIES: ApiProperty[] = [
  {
    slug: "continental-hotel-odesa",
    type: "hotels",
    status: "exclusive",
    city: "odesa",
    title: { en: "The Continental Hotel", ua: "Готель «Континенталь»", ru: "Отель «Континенталь»" },
    location: { en: "Deribasivska, Odesa", ua: "вул. Дерибасівська, Одеса", ru: "ул. Дерибасовская, Одесса" },
    price: 10500000,
    area: 3000,
    beds: 0,
    gallery: ["https://sor9fvtsekakbkwi.public.blob.vercel-storage.com/gl-uploads/1785872621495_WhatsApp_Image_2026_08_03_at_22_36_35.jpeg"]
  },
  {
    slug: "luxury-villa-arcadia-odesa",
    type: "villas",
    status: "exclusive",
    city: "odesa",
    title: { en: "Luxury Villa in the Heart of Arcadia", ua: "Елітна вілла в серці Аркадії", ru: "Элитная вилла в сердце Аркадии" },
    location: { en: "Arcadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    price: 0,
    area: 512,
    beds: 0,
    gallery: ["https://sor9fvtsekakbkwi.public.blob.vercel-storage.com/gl-uploads/1785872439274_WhatsApp_Image_2026_08_03_at_22_36_36__1.jpeg"]
  },
  {
    slug: "geneva-hotel-odesa",
    type: "hotels",
    status: "ready",
    city: "odesa",
    title: { en: "Geneva Hotel", ua: "Готель «Женева»", ru: "Отель «Женева»" },
    location: { en: "City Center, Odesa", ua: "Центр міста, Одеса", ru: "Центр города, Одесса" },
    price: 650000,
    area: 443,
    beds: 0,
    gallery: ["https://sor9fvtsekakbkwi.public.blob.vercel-storage.com/gl-uploads/1785872435581_WhatsApp_Image_2026_08_03_at_22_36_38__1.jpeg"]
  },
  {
    slug: "damac-islands-dubai",
    type: "villas",
    status: "off-plan",
    city: "dubai",
    title: { en: "DAMAC Islands", ua: "DAMAC Islands", ru: "DAMAC Islands" },
    location: { en: "DAMAC Islands, Dubai", ua: "DAMAC Islands, Дубай", ru: "DAMAC Islands, Дубай" },
    price: 0,
    area: 450,
    beds: 0,
    gallery: ["https://sor9fvtsekakbkwi.public.blob.vercel-storage.com/gl-uploads/1786053644339_imgi_3_DAMAC_Islands___5BR_01.jpg"]
  },
  {
    slug: "violet-4-dubai",
    type: "apartments",
    status: "off-plan",
    city: "dubai",
    title: { en: "VIOLET 4", ua: "VIOLET 4", ru: "VIOLET 4" },
    location: { en: "DAMAC Hills 2, Dubai", ua: "DAMAC Hills 2, Дубай", ru: "DAMAC Hills 2, Дубай" },
    price: 0,
    area: 120,
    beds: 0,
    gallery: ["https://sor9fvtsekakbkwi.public.blob.vercel-storage.com/gl-uploads/1786038438689_imgi_209_Violet_4_Gallery_4x3_00.jpg"]
  },
  {
    slug: "modern-apartment-terrace-odesa",
    type: "apartments",
    status: "ready",
    city: "odesa",
    title: { en: "Modern Apartment with Sea-View Terrace", ua: "Апартаменти з терасою та видом на море", ru: "Апартаменты с террасой и видом на море" },
    location: { en: "Arcadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    price: 0,
    area: 41,
    beds: 0,
    gallery: ["https://sor9fvtsekakbkwi.public.blob.vercel-storage.com/gl-uploads/1785231530962_WhatsApp_Image_2026_07_27_at_18_07_01__2.jpg"]
  }
];

export function FeaturedProperties() {
  const { language } = useLanguage();
  const t = translations;
  const [items, setItems] = useState<ApiProperty[]>(FALLBACK_PROPERTIES);

  useEffect(() => {
    async function loadProperties() {
      try {
        const res = await fetch("/api/properties?t=" + Date.now(), { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.properties) && data.properties.length > 0) {
            // Pick featured slugs or top 6 properties
            const featuredSlugs = [
              "continental-hotel-odesa",
              "luxury-villa-arcadia-odesa",
              "geneva-hotel-odesa",
              "damac-islands-dubai",
              "violet-4-dubai",
              "modern-apartment-terrace-odesa"
            ];
            const mapBySlug = new Map<string, ApiProperty>(data.properties.map((p: ApiProperty) => [p.slug, p]));
            const selected: ApiProperty[] = [];

            for (const s of featuredSlugs) {
              if (mapBySlug.has(s)) {
                selected.push(mapBySlug.get(s)!);
              }
            }

            // Fill remaining if needed
            for (const p of data.properties) {
              if (selected.length >= 6) break;
              if (!selected.some((s) => s.slug === p.slug)) {
                selected.push(p);
              }
            }

            if (selected.length > 0) {
              setItems(selected);
            }
          }
        }
      } catch (err) {
        console.error("Error loading featured properties:", err);
      }
    }
    loadProperties();
  }, []);

  return (
    <section id="featured" className="section-py bg-[color:var(--bower-cream)]">
      <div className="bower-container">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-[640px]">
            <SectionEyebrow className="mb-5">{t.eyebrow[language]}</SectionEyebrow>
            <h2 className="text-[34px] font-light leading-[1.15] tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[44px]">
              {t.heading[language]}
            </h2>
            <p className="mt-4 text-[15px] font-light leading-[1.7] text-[color:var(--bower-mute)] md:text-[16px]">
              {t.subhead[language]}
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-[12px] font-medium tracking-[0.14em] uppercase text-[#0a0a0a] transition-colors hover:text-[#D4AF37]"
          >
            {t.exploreAll[language]} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {items.map((p) => {
            // ALWAYS use gallery[0] (the Main Cover Photo set in admin)
            const mainCoverPhoto = (Array.isArray(p.gallery) && p.gallery.length > 0 && p.gallery[0])
              ? p.gallery[0]
              : "/images/hero_banner_poster.jpg";

            const title = typeof p.title === "object" ? (p.title[language] || p.title.en || "") : String(p.title || "");
            const location = typeof p.location === "object" ? (p.location[language] || p.location.en || "") : String(p.location || "");
            
            const tagObj = (t.tags as any)[p.status] || t.tags.ready;
            const tagLabel = tagObj[language] || tagObj.en;

            const priceDisplay = p.price && p.price > 0
              ? `$${p.price.toLocaleString("en-US")}`
              : t.onRequest[language];

            return (
              <article
                key={p.slug}
                className="group flex flex-col bg-white border border-[#D4AF37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_16px_36px_rgba(212,175,55,0.14)] rounded-sm overflow-hidden"
              >
                <Link href={`/properties/${p.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-black">
                  <Image
                    src={mainCoverPhoto}
                    alt={title}
                    fill
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-x-0 top-0 flex justify-between p-4">
                    <span className="bg-[#0a0a0a]/90 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase text-white shadow-md">
                      {tagLabel}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-2">
                      {location}
                    </p>
                    <h3 className="text-[20px] font-light leading-[1.3] text-[#0a0a0a]">
                      <Link href={`/properties/${p.slug}`} className="transition-colors hover:text-[#D4AF37]">
                        {title}
                      </Link>
                    </h3>
                  </div>

                  <div>
                    {/* Price and Parameters Box */}
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1.5 bg-[#fcf8ed] border border-[#D4AF37]/40 px-3 py-1.5 rounded-xs">
                        {p.price > 0 && (
                          <span className="text-[10px] tracking-[0.14em] uppercase text-[#D4AF37] font-semibold">
                            {t.fromLabel[language]}
                          </span>
                        )}
                        <span className="text-[14px] font-semibold text-[#0a0a0a]">{priceDisplay}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-700">
                        {p.beds !== undefined && p.beds > 0 && (
                          <span className="border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-xs">
                            {p.beds} {t.bedrooms[language]}
                          </span>
                        )}
                        <span className="border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-xs">
                          {p.area} {t.area[language]}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
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
          })}
        </div>
      </div>
    </section>
  );
}
