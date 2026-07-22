"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const translations = {
  eyebrow: { en: "Market Potential", ua: "Потенціал ринку", ru: "Потенциал рынка" },
  title: {
    en: "Why Invest in Ukraine",
    ua: "Чому варто інвестувати в Україну",
    ru: "Почему стоит инвестировать в Украину",
  },
  intro: {
    en: "Ukraine is an amazing country with enormous potential and a bright future. Strategic location in Europe, highly educated workforce, and growing infrastructure make it highly attractive for long-term growth.",
    ua: "Україна — це дивовижна країна з великим потенціалом і перспективним майбутнім. Вигідне розташування у Європі, висококваліфікована робоча сила та зростаюча інфраструктура роблять її надзвичайно привабливою для довгострокового зростання.",
    ru: "Украина — удивительная страна с огромным потенциалом и перспективным будущим. Выгодное географическое положение в Европе, высококвалифицированная рабочая сила и растущая инфраструктура делают её крайне привлекательной для долгосрочного роста.",
  },
  citiesTitle: {
    en: "Key Investment Hubs",
    ua: "Ключові інвестиційні центри",
    ru: "Ключевые инвестиционные центры",
  },
  cities: {
    en: "Major cities such as Kyiv, Odesa, and Lviv continue to demonstrate strong long-term investment potential due to increasing international interest, urban development, and tourism growth.",
    ua: "Такі міста, як Київ, Одеса та Львів, продовжують демонструвати високий потенціал для довгострокових інвестицій завдяки розвитку інфраструктури, туризму та зростаючому міжнародному інтересу.",
    ru: "Такие города, как Киев, Одесса и Львов, продолжают демонстрировать высокий потенциал долгосрочных инвестиций благодаря развитию инфраструктуры, туризма и растущему международному интересу.",
  },
  partnersLabel: {
    en: "Our Partners",
    ua: "Наші партнери",
    ru: "Наши партнёры",
  },
};

type Partner = {
  id: string;
  name: string;
  logo: string;
  description: Record<"en" | "ua" | "ru", string>;
};

const partnersData: Partner[] = [
  {
    id: "azizi",
    name: "AZIZI Developments",
    logo: "/partners/1.png",
    description: {
      en: "Leading Dubai-based property developer specializing in luxury residential towers and vibrant urban communities across the UAE and Europe.",
      ua: "Провідний девелопер Дубая, що спеціалізується на розкішних житлових вежах та інноваційних міських комплексах.",
      ru: "Ведущий девелопер Дубая, специализирующийся на элитных жилых комплексах и инновационных городских проектах.",
    },
  },
  {
    id: "emaar",
    name: "EMAAR Properties",
    logo: "/partners/2.png",
    description: {
      en: "World-renowned master developer behind iconic global landmarks including Burj Khalifa, Dubai Mall, and premier master-planned estates.",
      ua: "Всесвітньо відомий девелопер, творець таких архітектурних символів, як Бурдж Халіфа, Дубай Молл та елітні квартали.",
      ru: "Всемирно известный девелопер, создатель таких архитектурных символов, как Бурдж-Халифа, Дубай Молл и элитные кварталы.",
    },
  },
  {
    id: "damac",
    name: "DAMAC Properties",
    logo: "/partners/3.png",
    description: {
      en: "Premier luxury real estate developer delivering ultra-luxury residential towers, branded hotel residences, and golf communities in the Middle East.",
      ua: "Преміальний девелопер Близького Сходу, що створює ультрарозкішні житлові вежі, готельні резиденції та ґольф-комплекси.",
      ru: "Премиальный девелопер Ближнего Востока, создающий ультрароскошные жилые башни, отельные резиденции и гольф-комплексы.",
    },
  },
  {
    id: "kadorr",
    name: "KADORR Group",
    logo: "/partners/4.png",
    description: {
      en: "Leading Ukrainian real estate company renowned for high-end residential complexes, business centers, and urban architecture in Odesa and Kyiv.",
      ua: "Провідна українська компанія у сфері нерухомості, відома елітними житловими комплексами та бізнес-центрами в Одесі та Києві.",
      ru: "Ведущая украинская девелоперская компания, известная элитными жилыми комплексами и бизнес-центрами в Одессе и Киеве.",
    },
  },
  {
    id: "hutchinson",
    name: "HUTCHINSON BUILDERS",
    logo: "/partners/5.png",
    description: {
      en: "Australia's largest privately owned construction and development firm with over 112 years of landmark building heritage.",
      ua: "Найбільша приватна будівельно-інвестиційна компанія Австралії з понад 112-річною історією створення інфраструктури.",
      ru: "Крупнейшая частная строительно-инвестиционная компания Австралии с более чем 112-летней историей создания инфраструктуры.",
    },
  },
  {
    id: "binghatti",
    name: "BINGHATTI",
    logo: "/partners/6.png",
    description: {
      en: "Visionary Dubai luxury developer famous for iconic architectural geometry, high-end branded skyscrapers, and innovative residential engineering.",
      ua: "Інноваційний девелопер Дубая, відомий впізнаваною архітектурною геометрією та брендовими хмарочосами.",
      ru: "Инновационный девелопер Дубая, известный узнаваемой архитектурной геометрией и брендовыми небоскрёбами.",
    },
  },
];

export function SunshineSection() {
  const { language } = useLanguage();
  const t = translations;

  const [activeHoverPartner, setActiveHoverPartner] = useState<Partner | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle mouse wheel interaction on the marquee strip
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY * 1.5 || e.deltaX * 1.5;
    }
  };

  // Duplicating partners list 3 times for seamless 360-degree continuous infinite loop
  const marqueeList = [...partnersData, ...partnersData, ...partnersData];

  return (
    <section id="why-ukraine" className="py-20 md:py-28 bg-white border-b border-gray-100 overflow-hidden relative">
      <div className="bower-container">
        
        {/* TOP SECTION: 3D Gold Map (Left) & Why Invest text (Right) */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Left Column: 3D Gold Map of Ukraine */}
          <div className="relative w-full aspect-[4/3] max-w-[540px] mx-auto flex items-center justify-center group">
            <Image
              src="/images/generated/ukraine_gold_ingot_map.png"
              alt="Golden Land Ukraine Real Estate Investment Gold Ingot Map"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(212,175,55,0.2)]"
              priority
            />
          </div>

          {/* Right Column: Heading & Content */}
          <div className="max-w-[640px]">
            <SectionEyebrow className="mb-5">{t.eyebrow[language]}</SectionEyebrow>
            <h2 className="font-display text-[38px] leading-[1.1] font-light text-[color:var(--bower-ink-2)] md:text-[46px]">
              {t.title[language]}
            </h2>
            <div className="mt-8 space-y-6 text-[16px] leading-[1.75] font-light text-[color:var(--bower-mute)]">
              <p>{t.intro[language]}</p>
              <div>
                <h3 className="text-[18px] font-semibold text-[color:var(--bower-ink-2)] mb-3">
                  {t.citiesTitle[language]}
                </h3>
                <p>{t.cities[language]}</p>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: OUR PARTNERS MARQUEE & POPUP (Expanded Vertically) */}
        <div className="mt-20 md:mt-24 pt-12 border-t border-gray-100 relative">
          
          {/* Label + Header line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 bg-[#D4AF37]" />
              <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]">
                {t.partnersLabel[language]}
              </span>
            </div>
            <p className="text-[12px] text-[color:var(--bower-mute)] font-light tracking-wide italic">
              {language === "en"
                ? "Trusted international developers & strategic partners"
                : language === "ua"
                ? "Надійні міжнародні девелопери та стратегічні партнери"
                : "Надёжные международные девелоперы и стратегические партнёры"}
            </p>
          </div>

          {/* INFINITE MARQUEE CAROUSEL CONTAINER */}
          <div
            ref={scrollContainerRef}
            onWheel={handleWheel}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setActiveHoverPartner(null);
            }}
            className="w-full overflow-x-auto no-scrollbar relative py-4 cursor-grab active:cursor-grabbing"
          >
            <div
              className={`flex items-center gap-6 w-max transition-all ${
                isHovered ? "[animation-play-state:paused]" : "animate-marquee-slow"
              }`}
            >
              {marqueeList.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoverPos({
                      x: rect.left + rect.width / 2,
                      y: rect.top,
                    });
                    setActiveHoverPartner(partner);
                  }}
                  className="group relative flex items-center justify-center w-[180px] h-[100px] md:w-[210px] md:h-[115px] p-4 bg-white border border-gray-200/80 hover:border-[#D4AF37] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 shrink-0 bg-gradient-to-b from-white to-[#fcfbfa]"
                >
                  {/* Subtle Golden Touch Frame */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#D4AF37]/30 transition-colors pointer-events-none" />
                  
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="210px"
                      className="object-contain p-2 filter grayscale group-hover:grayscale-0 contrast-125 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOVER TOOLTIP POP-UP MODAL */}
          {activeHoverPartner && (
            <div
              style={{
                position: "fixed",
                left: `${hoverPos.x}px`,
                top: `${hoverPos.y - 12}px`,
                transform: "translate(-50%, -100%)",
              }}
              className="z-50 w-[290px] md:w-[320px] bg-[#0c0b0a]/95 text-white backdrop-blur-md border border-[#D4AF37]/40 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.4)] pointer-events-none animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Top pointer arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0c0b0a] border-r border-b border-[#D4AF37]/40 rotate-45" />

              {/* Logo preview */}
              <div className="w-full h-12 relative bg-white/90 rounded-xl p-2 mb-3 flex items-center justify-center">
                <Image
                  src={activeHoverPartner.logo}
                  alt={activeHoverPartner.name}
                  fill
                  sizes="200px"
                  className="object-contain p-1"
                />
              </div>

              {/* Partner Title */}
              <h4 className="text-[15px] font-bold text-[#D4AF37] tracking-wide mb-1.5 font-display">
                {activeHoverPartner.name}
              </h4>

              {/* 2-Sentence Description */}
              <p className="text-[12px] leading-relaxed text-white/80 font-light">
                {activeHoverPartner.description[language]}
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Marquee Animation Keyframes in CSS */}
      <style jsx global>{`
        @keyframes marqueeSlow {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-slow {
          animation: marqueeSlow 32s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
