"use client";

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
  bedrooms: { en: "BR", ua: "спал.", ru: "спал." },
  area: { en: "sqm", ua: "м²", ru: "м²" },
};

type Property = {
  slug: string;
  image: string;
  location: { en: string; ua: string; ru: string };
  title: { en: string; ua: string; ru: string };
  price: string;
  beds: number;
  area: number;
  tag: { en: string; ua: string; ru: string };
};

const properties: Property[] = [
  {
    slug: "continental-hotel-odesa",
    image: "/images/generated/prop-kyiv-hospitality-project-1.webp",
    location: { en: "Deribasivska, Odesa", ua: "вул. Дерибасівська, Одеса", ru: "ул. Дерибасовская, Одесса" },
    title: {
      en: "The Continental Hotel",
      ua: "Готель «Континенталь»",
      ru: "Отель «Континенталь»",
    },
    price: "$5,500,000",
    beds: 55,
    area: 3163,
    tag: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
  },
  {
    slug: "luxury-villa-arcadia-odesa",
    image: "/images/generated/prop-kozyn-forest-villa-1.webp",
    location: { en: "Arcadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    title: {
      en: "Luxury Villa in the Heart of Arcadia",
      ua: "Елітна вілла в серці Аркадії",
      ru: "Элитная вилла в сердце Аркадии",
    },
    price: "$2,800,000",
    beds: 6,
    area: 650,
    tag: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
  },
  {
    slug: "geneva-hotel-odesa",
    image: "/images/generated/prop-lviv-rynok-boutique-1.webp",
    location: { en: "City Center, Odesa", ua: "Центр міста, Одеса", ru: "Центр города, Одесса" },
    title: {
      en: "Geneva Hotel",
      ua: "Готель «Женева»",
      ru: "Отель «Женева»",
    },
    price: "$1,800,000",
    beds: 21,
    area: 700,
    tag: { en: "Ready", ua: "Готовий", ru: "Готов" },
  },
  {
    slug: "damac-islands-dubai",
    image: "/images/generated/prop-kozyn-forest-villa-1.webp",
    location: { en: "DAMAC Islands, Dubai", ua: "DAMAC Islands, Дубай", ru: "DAMAC Islands, Дубай" },
    title: {
      en: "DAMAC Islands Luxury Residences",
      ua: "Елітні резиденції DAMAC Islands",
      ru: "Элитные резиденции DAMAC Islands",
    },
    price: "$850,000",
    beds: 4,
    area: 380,
    tag: { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
  },
  {
    slug: "violet-4-dubai",
    image: "/images/generated/prop-kyiv-pechersk-penthouse-1.webp",
    location: { en: "DAMAC Hills 2, Dubai", ua: "DAMAC Hills 2, Дубай", ru: "DAMAC Hills 2, Дубай" },
    title: {
      en: "VIOLET 4 Premier Townhouses",
      ua: "Таунхауси VIOLET 4",
      ru: "Таунхаусы VIOLET 4",
    },
    price: "$520,000",
    beds: 4,
    area: 224,
    tag: { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
  },
  {
    slug: "modern-apartment-terrace-odesa",
    image: "/images/generated/prop-odesa-arkadia-apartment-1.webp",
    location: { en: "Arcadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    title: {
      en: "Modern Apartment with Sea-View Terrace",
      ua: "Апартаменти з терасою та видом на море",
      ru: "Апартаменты с террасой и видом на море",
    },
    price: "$450,000",
    beds: 2,
    area: 120,
    tag: { en: "Ready", ua: "Готовий", ru: "Готов" },
  },
];

export function FeaturedProperties() {
  const { language } = useLanguage();
  const t = translations;

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
          {properties.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col bg-white border border-[#D4AF37]/25 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_16px_36px_rgba(212,175,55,0.14)] rounded-sm overflow-hidden"
            >
              <Link href={`/properties/${p.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-black">
                <Image
                  src={p.image}
                  alt={p.title[language]}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 top-0 flex justify-between p-4">
                  <span className="bg-[#0a0a0a]/90 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase text-white shadow-md">
                    {p.tag[language]}
                  </span>
                </div>
              </Link>

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
                  {/* Строгий структурированный блок цены и параметров в рамке */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    {/* Плашка Цены */}
                    <div className="flex items-baseline gap-1.5 bg-[#fcf8ed] border border-[#D4AF37]/40 px-3 py-1.5 rounded-xs">
                      <span className="text-[10px] tracking-[0.14em] uppercase text-[#D4AF37] font-semibold">{t.fromLabel[language]}</span>
                      <span className="text-[15px] font-semibold text-[#0a0a0a]">{p.price}</span>
                    </div>

                    {/* Параметры */}
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-700">
                      <span className="border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-xs">
                        {p.beds} {t.bedrooms[language]}
                      </span>
                      <span className="border border-gray-200 bg-gray-50/80 px-2.5 py-1 rounded-xs">
                        {p.area} {t.area[language]}
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
          ))}
        </div>
      </div>
    </section>
  );
}
