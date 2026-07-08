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
    en: "A curated selection of current opportunities — Kyiv panoramic penthouses, restored Lviv townhouses and Odesa beachfront villas.",
    ua: "Курована добірка актуальних можливостей — панорамні пентхауси Києва, відреставровані таунхауси Львова та вілли на узбережжі Одеси.",
    ru: "Курируемая подборка актуальных возможностей — панорамные пентхаусы Киева, отреставрированные таунхаусы Львова и виллы на побережье Одессы.",
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
    slug: "kyiv-pechersk-penthouse",
    image: "/images/generated/prop-kyiv-pechersk-penthouse-1.webp",
    location: { en: "Pechersk, Kyiv", ua: "Печерськ, Київ", ru: "Печерск, Киев" },
    title: {
      en: "Panoramic Penthouse Overlooking the Lavra",
      ua: "Панорамний пентхаус з видом на Лавру",
      ru: "Панорамный пентхаус с видом на Лавру",
    },
    price: "$1,850,000",
    beds: 4,
    area: 320,
    tag: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
  },
  {
    slug: "lviv-historic-townhouse",
    image: "/images/generated/prop-lviv-historic-townhouse-1.webp",
    location: { en: "Old Town, Lviv", ua: "Старе місто, Львів", ru: "Старый город, Львов" },
    title: {
      en: "Restored 19th-Century Townhouse",
      ua: "Реставрований таунхаус XIX століття",
      ru: "Отреставрированный таунхаус XIX века",
    },
    price: "$850,000",
    beds: 5,
    area: 410,
    tag: { en: "Ready", ua: "Готовий", ru: "Готов" },
  },
  {
    slug: "odesa-beachfront-villa",
    image: "/images/generated/prop-odesa-beachfront-villa-1.webp",
    location: { en: "Arkadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    title: {
      en: "Beachfront Villa with Infinity Pool",
      ua: "Вілла на узбережжі з басейном інфініті",
      ru: "Вилла на побережье с бассейном инфинити",
    },
    price: "$2,200,000",
    beds: 5,
    area: 480,
    tag: { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
  },
  {
    slug: "kozyn-forest-villa",
    image: "/images/generated/prop-kozyn-forest-villa-1.webp",
    location: { en: "Kozyn, Kyiv Region", ua: "Козин, Київська область", ru: "Козин, Киевская область" },
    title: {
      en: "Luxury Pine Forest Villa in Kozyn",
      ua: "Розкішна вілла в сосновому лісі в Козині",
      ru: "Роскошная вилла в сосновом лесу в Козине",
    },
    price: "$1,650,000",
    beds: 5,
    area: 450,
    tag: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
  },
  {
    slug: "kyiv-podil-loft",
    image: "/images/generated/prop-kyiv-podil-loft-1.webp",
    location: { en: "Podil, Kyiv", ua: "Поділ, Київ", ru: "Подол, Киев" },
    title: {
      en: "Historic High-Ceiling Loft in Podil",
      ua: "Історичний лофт з високою стелею на Подолі",
      ru: "Исторический лофт с высокими потолками на Подоле",
    },
    price: "$620,000",
    beds: 2,
    area: 145,
    tag: { en: "Ready", ua: "Готовий", ru: "Готов" },
  },
  {
    slug: "odesa-arkadia-apartment",
    image: "/images/generated/prop-odesa-arkadia-apartment-1.webp",
    location: { en: "Arkadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    title: {
      en: "Panoramic Sea View Apartment",
      ua: "Панорамні апартаменти з видом на море",
      ru: "Панорамные апартаменты с видом на море",
    },
    price: "$385,000",
    beds: 2,
    area: 98,
    tag: { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
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
