"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const translations = {
  eyebrow: { en: "Property Categories", ua: "Категорії об'єктів", ru: "Категории объектов" },
  heading: {
    en: "Curated across four asset classes.",
    ua: "Курований портфель з чотирьох класів активів.",
    ru: "Курируемый портфель из четырёх классов активов.",
  },
  subhead: {
    en: "From city apartments and premium villas to hospitality assets and commercial buildings — each opportunity is vetted by our international team.",
    ua: "Від міських апартаментів і преміальних вілл до готельних активів і комерційних будівель — кожна можливість перевірена нашою міжнародною командою.",
    ru: "От городских апартаментов и премиальных вилл до отельных активов и коммерческих зданий — каждая возможность проверена нашей международной командой.",
  },
  cards: {
    apartments: {
      en: "Apartments",
      ua: "Апартаменти",
      ru: "Апартаменты",
    },
    villas: {
      en: "Villas & Houses",
      ua: "Вілли та будинки",
      ru: "Виллы и дома",
    },
    hotels: {
      en: "Hotels",
      ua: "Готелі",
      ru: "Отели",
    },
    commercial: {
      en: "Commercial",
      ua: "Комерційна",
      ru: "Коммерческая",
    },
  },
};

type CardKey = keyof typeof translations.cards;
type Card = { slug: CardKey; image: string; href: string };

const cards: Card[] = [
  { slug: "apartments", image: "/images/generated/category-apartments.webp", href: "/catalog?type=apartments" },
  { slug: "villas", image: "/images/generated/category-villas.webp", href: "/catalog?type=villas" },
  { slug: "hotels", image: "/images/generated/category-hotels.webp", href: "/catalog?type=hotels" },
  { slug: "commercial", image: "/images/generated/category-commercial.webp", href: "/catalog?type=commercial" },
];

export function AccommodationGrid() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <section id="properties" className="section-py bg-[color:var(--bower-cream)]">
      <div className="bower-container">
        <div className="mx-auto mb-14 max-w-[820px] text-center md:mb-16">
          <SectionEyebrow className="mb-5">{t.eyebrow[language]}</SectionEyebrow>
          <h2 className="text-[34px] font-light leading-[1.15] tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[44px]">
            {t.heading[language]}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[15px] font-light leading-[1.7] text-[color:var(--bower-mute)] md:text-[16px]">
            {t.subhead[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {cards.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              className="group relative block aspect-[3/4] overflow-hidden bg-black"
            >
              <Image
                src={c.image}
                alt={t.cards[c.slug][language]}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 text-white">
                <span className="text-[16px] font-light tracking-[0.16em] uppercase">
                  {t.cards[c.slug][language]}
                </span>
                <ArrowRightIcon className="h-4 w-4 text-[#D4AF37] transition-transform duration-500 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
