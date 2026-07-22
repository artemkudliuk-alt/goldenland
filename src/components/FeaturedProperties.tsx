"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useLeadModal } from "@/context/LeadModalContext";
import { ArrowRightIcon } from "@/components/icons";

type CaseItem = {
  id: string;
  number: string;
  tag: Record<"en" | "ua" | "ru", string>;
  subtitle: Record<"en" | "ua" | "ru", string>;
  title: Record<"en" | "ua" | "ru", string>;
  location: Record<"en" | "ua" | "ru", string>;
  price: string;
  pricePerSqm: string;
  roi: string;
  video: string;
  photos: string[];
  description: Record<"en" | "ua" | "ru", string>;
  highlights: Record<"en" | "ua" | "ru", string[]>;
};

const casesData: CaseItem[] = [
  {
    id: "case-1",
    number: "01",
    tag: {
      en: "Presidential Suite & Spa",
      ua: "Presidential Suite & Spa",
      ru: "Presidential Suite & Spa",
    },
    subtitle: {
      en: "Pechersk Lavra Panorama",
      ua: "Панорама Печерської Лаври",
      ru: "Панорама Печерской Лавры",
    },
    title: {
      en: "Panoramic Penthouse Overlooking the Lavra",
      ua: "Панорамний пентхаус з видом на Лавру",
      ru: "Панорамный пентхаус с видом на Лавру",
    },
    location: {
      en: "Pechersk · Kyiv",
      ua: "Печерськ · Київ",
      ru: "Печерск · Киев",
    },
    price: "$1,850,000",
    pricePerSqm: "$5,781 / m²",
    roi: "8.5%",
    video: "/videos/case_1_pechersk.mp4",
    photos: [
      "/images/cases/case1_photo1.png",
      "/images/cases/case1_photo2.png",
      "/images/cases/case1_photo3.png",
    ],
    description: {
      en: "Exclusive double-height penthouse on Pechersk with wraparound infinity pool terrace and direct views of Kyiv Pechersk Lavra.",
      ua: "Ексклюзивний двоповерховий пентхаус на Печерську з терасою, басейном інфініті та видом на позолочені куполи Лаври.",
      ru: "Эксклюзивный двухуровневый пентхаус на Печерске с террасой, бассейном инфинити и видом на купола Лавры.",
    },
    highlights: {
      en: ["Panoramic Domes View", "Private Infinity Terrace", "24/7 Valet & Concierge"],
      ua: ["Панорамний вид на Лавру", "Приватна терраса-інфініті", "Персональний консьєрж-сервіс"],
      ru: ["Панорамный вид на Лавру", "Частная терраса-инфинити", "Персональный консьерж-сервис"],
    },
  },
  {
    id: "case-2",
    number: "02",
    tag: {
      en: "Presidential Suite & Sea Marina",
      ua: "Presidential Suite & Sea Marina",
      ru: "Presidential Suite & Sea Marina",
    },
    subtitle: {
      en: "Arkadia Coastline",
      ua: "Узбережжя Аркадії",
      ru: "Побережье Аркадии",
    },
    title: {
      en: "Beachfront Villa with Private Marina",
      ua: "Вілла на узбережжі з власною мариною",
      ru: "Вилла на побережье с собственной мариной",
    },
    location: {
      en: "Arkadia · Odesa",
      ua: "Аркадія · Одеса",
      ru: "Аркадия · Одесса",
    },
    price: "$2,200,000",
    pricePerSqm: "$4,583 / m²",
    roi: "7.9%",
    video: "/videos/case_2_odesa_villa.mp4",
    photos: [
      "/images/cases/case2_photo1.png",
      "/images/cases/case2_photo2.png",
      "/images/cases/case2_photo3.png",
    ],
    description: {
      en: "Modernist oceanfront villa on the Black Sea coast featuring private beach access, direct yacht mooring and heated infinity pool.",
      ua: "Модерністська вілла на першій лінії Чорного моря з приватним пляжем, правами на причал для яхт та інфініті-басейном.",
      ru: "Модернистская вилла на первой линии Чёрного моря с частным пляжем, правами на причал для яхт и инфинити-бассейном.",
    },
    highlights: {
      en: ["Private Beach Frontage", "Yacht Mooring Rights", "Smart Home & Spa"],
      ua: ["Приватна берегова лінія", "Права на яхтовий причал", "Розумний будинок та спа"],
      ru: ["Частная береговая линия", "Права на яхтенный причал", "Умный дом и спа"],
    },
  },
  {
    id: "case-3",
    number: "03",
    tag: {
      en: "Heritage Boutique & Spa",
      ua: "Heritage Boutique & Spa",
      ru: "Heritage Boutique & Spa",
    },
    subtitle: {
      en: "UNESCO Historic District",
      ua: "Історична зона ЮНЕСКО",
      ru: "Историческая зона ЮНЕСКО",
    },
    title: {
      en: "Rynok Square Heritage Boutique Hotel",
      ua: "Бутик-готель біля площі Ринок",
      ru: "Бутик-отель у площади Рынок",
    },
    location: {
      en: "Rynok Sq · Lviv",
      ua: "Площа Ринок · Львів",
      ru: "Площадь Рынок · Львов",
    },
    price: "$2,400,000",
    pricePerSqm: "$2,609 / m²",
    roi: "9.2%",
    video: "/videos/case_3_lviv_hotel.mp4",
    photos: [
      "/images/cases/case3_photo1.png",
      "/images/cases/case3_photo2.png",
      "/images/cases/case3_photo3.png",
    ],
    description: {
      en: "Operating 18-key boutique hotel in a restored Austro-Hungarian mansion with court wellness spa and 92% annual occupancy.",
      ua: "Діючий бутик-готель на 18 номерів у відреставрованій австро-угорській садибі з внутрішнім спа та 92% заповнюваністю.",
      ru: "Действующий бутик-отель на 18 номеров в отреставрированной австро-венгерской усадьбе с внутренним спа и 92% загрузкой.",
    },
    highlights: {
      en: ["UNESCO Heritage Zone", "Fully Operating Asset", "92% Avg Occupancy"],
      ua: ["Локація спадщини ЮНЕСКО", "Повністю діючий бізнес", "92% середня заповнюваність"],
      ru: ["Локация наследия ЮНЕСКО", "Полностью действующий бизнес", "92% средняя загрузка"],
    },
  },
  {
    id: "case-4",
    number: "04",
    tag: {
      en: "Pine Forest & Wellness Estate",
      ua: "Pine Forest & Wellness Estate",
      ru: "Pine Forest & Wellness Estate",
    },
    subtitle: {
      en: "Kozyn Riverfront Sanctuary",
      ua: "Річковий заповідник Козин",
      ru: "Речной заповедник Козин",
    },
    title: {
      en: "Pine Forest Villa & Private Waterfront",
      ua: "Лісова вілла на набережній Дніпра",
      ru: "Лесная вилла на набережной Днепра",
    },
    location: {
      en: "Kozyn · Kyiv Region",
      ua: "Козин · Київщина",
      ru: "Козин · Киевская область",
    },
    price: "$1,650,000",
    pricePerSqm: "$3,667 / m²",
    roi: "8.2%",
    video: "/videos/case_4_kozyn.mp4",
    photos: [
      "/images/generated/prop-kozyn-forest-villa-1.webp",
      "/images/generated/thumb_kozyn_villa.png",
      "/images/generated/category-villas.webp",
    ],
    description: {
      en: "Architectural glass estate surrounded by ancient pine forest on the Dnipro embankment with thermal spa complex.",
      ua: "Архітектурна скляна резиденція в оточенні соснового лісу на набережній Дніпра з термальним спа-комплексом.",
      ru: "Архитектурная стеклянная резиденция в окружении соснового леса на набережной Днепра с термальным спа-комплексом.",
    },
    highlights: {
      en: ["Dnipro River Plot", "Private Pine Forest", "Thermal Spa & Pool"],
      ua: ["Ділянка біля Дніпра", "Приватний сосновий ліс", "Термальний спа-комплекс"],
      ru: ["Участок у Днепра", "Частный сосновый лес", "Термальный спа-комплекс"],
    },
  },
  {
    id: "case-5",
    number: "05",
    tag: {
      en: "Seafront Resort & Rooftop Ocean Spa",
      ua: "Seafront Resort & Rooftop Ocean Spa",
      ru: "Seafront Resort & Rooftop Ocean Spa",
    },
    subtitle: {
      en: "Frantsuzskyi Boulevard Corridor",
      ua: "Французький бульвар",
      ru: "Французский бульвар",
    },
    title: {
      en: "Seafront Resort & Hydrotherapy Spa",
      ua: "Курортний готель та спа на узбережжі",
      ru: "Курортный отель и спа на побережье",
    },
    location: {
      en: "Frantsuzskyi Blvd · Odesa",
      ua: "Французький б-р · Одеса",
      ru: "Французский б-р · Одесса",
    },
    price: "$6,200,000",
    pricePerSqm: "$1,823 / m²",
    roi: "12.5%",
    video: "/videos/case_5_odesa_resort.mp4",
    photos: [
      "/images/generated/prop-odesa-black-sea-hotel-1.webp",
      "/images/generated/service-hotel.webp",
      "/images/generated/insight-hotels.webp",
    ],
    description: {
      en: "Off-plan 40-suite seafront resort hotel with hydrotherapy ocean spa and panoramic rooftop lounge on Odesa's premier boulevard.",
      ua: "Off-plan resort-готель на 40 номерів з океанічним гідротерапевтичним спа та панорамним лаунжем на даху.",
      ru: "Off-plan resort-отель на 40 номеров с океаническим гидротерапевтическим спа и панорамным лаунджем на крыше.",
    },
    highlights: {
      en: ["40 Ocean Suites", "Rooftop Hydrotherapy Spa", "Pre-Leased Anchor F&B"],
      ua: ["40 океанічних номерів", "Гідротерапевтичне спа на даху", "Переднайнятий F&B ретейл"],
      ru: ["40 океанических номеров", "Гидротерапевтическое спа на крыше", "Преднанятый F&B ритейл"],
    },
  },
];

const translations = {
  sectionTitle: {
    en: "Our Projects",
    ua: "Наші проєкти",
    ru: "Наши проекты",
  },
  viewAll: {
    en: "View all (5 cases)",
    ua: "Дивитись всі (5 кейсів)",
    ru: "Смотреть все (5 кейсов)",
  },
  roiLabel: { en: "Expected ROI", ua: "Очікуваний ROI", ru: "Ожидаемый ROI" },
  consultBtn: { en: "Request Case Presentation", ua: "Замовити презентацію кейсу", ru: "Заказать презентацию кейса" },
  videoTab: { en: "Video Flythrough (5s)", ua: "Відео проліт (5 сек)", ru: "Видео пролёт (5 сек)" },
  galleryTab: { en: "Gallery (3 photos)", ua: "Галерея (3 фото)", ru: "Галерея (3 фото)" },
};

export function FeaturedProperties() {
  const { language } = useLanguage();
  const { openModal } = useLeadModal();
  const t = translations;

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [activeMediaMode, setActiveMediaMode] = useState<"video" | "photo">("video");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const activeCase = casesData[activeCaseIndex];

  return (
    <section id="featured" className="py-20 md:py-28 bg-[#0a0908] text-white relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#cfa24d]/8 to-transparent blur-[140px] pointer-events-none z-0" />

      <div className="bower-container relative z-10">
        
        {/* HEADER: Title left, "Дивитись всі (5 кейсів)" right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 md:mb-16 border-b border-white/10 pb-8">
          <div>
            <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block mb-2">
              PORTFOLIO CASES
            </span>
            <h2 className="text-[36px] font-light leading-[1.1] tracking-tight text-white md:text-[48px] font-display">
              {t.sectionTitle[language]}
            </h2>
          </div>

          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-[#cfa24d] hover:border-[#cfa24d] hover:text-black px-6 py-3 rounded-full text-[12px] font-semibold tracking-wider uppercase transition-all duration-300 group self-start md:self-auto"
          >
            <span>{t.viewAll[language]}</span>
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* CASE SWITCHER TABS (01 to 05) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {casesData.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setActiveMediaMode("video");
                setActivePhotoIndex(0);
              }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 shrink-0 cursor-pointer ${
                activeCaseIndex === idx
                  ? "bg-[#cfa24d] border-[#cfa24d] text-black shadow-[0_0_20px_rgba(207,162,77,0.3)] font-bold"
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 font-medium"
              }`}
            >
              <span className={`text-[11px] font-mono ${activeCaseIndex === idx ? "text-black" : "text-[#cfa24d]"}`}>
                {c.number}
              </span>
              <span className="text-[13px] tracking-wide whitespace-nowrap">
                {c.subtitle[language]}
              </span>
            </button>
          ))}
        </div>

        {/* MAIN CASE DISPLAY: 2-COL (Left Info elevated & centered, Right Media & 5s Video / 3 Photos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#13110e] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          
          {/* LEFT COL: High-level Centered Info */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            
            {/* Tag Badge: "Presidential Suite & Spa" */}
            <div>
              <span className="inline-block bg-[#cfa24d]/15 border border-[#cfa24d]/40 text-[#cfa24d] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase">
                {activeCase.tag[language]}
              </span>
              <p className="text-[12px] text-white/50 tracking-wider uppercase font-semibold mt-3">
                {activeCase.location[language]}
              </p>
            </div>

            {/* Main Title */}
            <h3 className="text-[28px] md:text-[34px] font-light leading-[1.15] text-white font-display">
              {activeCase.title[language]}
            </h3>

            {/* Description */}
            <p className="text-[14px] leading-relaxed text-white/70 font-light">
              {activeCase.description[language]}
            </p>

            {/* Key Investment Highlights */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              {activeCase.highlights[language].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#cfa24d]/20 border border-[#cfa24d]/40 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]" />
                  </div>
                  <span className="text-[13px] font-light text-white/90">{item}</span>
                </div>
              ))}
            </div>

            {/* Price & ROI */}
            <div className="flex items-baseline justify-between pt-4 border-t border-white/10">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block font-bold">STARTING INVESTMENT</span>
                <span className="text-[26px] font-bold text-[#cfa24d] font-display">{activeCase.price}</span>
                <span className="text-[12px] text-white/40 ml-2 font-light">{activeCase.pricePerSqm}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block font-bold">{t.roiLabel[language]}</span>
                <span className="text-[22px] font-bold text-white font-display">{activeCase.roi}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => openModal(`Case ${activeCase.number}: ${activeCase.title[language]}`)}
                className="w-full bg-[#cfa24d] hover:bg-[#d4aa5a] text-black font-bold text-[13px] uppercase tracking-widest py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(207,162,77,0.25)] cursor-pointer active:scale-[0.99]"
              >
                {t.consultBtn[language]}
              </button>
            </div>
          </div>

          {/* RIGHT COL: Media Container (5-second Slow-Flythrough MP4 Video + 3 Photos Gallery) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Media Viewport */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#090807] border border-white/10 shadow-2xl group">
              
              {activeMediaMode === "video" ? (
                /* 5-second Slow Flythrough MP4 Video */
                <video
                  key={activeCase.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={activeCase.video} type="video/mp4" />
                </video>
              ) : (
                /* Photo Gallery Image */
                <Image
                  src={activeCase.photos[activePhotoIndex]}
                  alt={activeCase.title[language]}
                  fill
                  priority
                  className="object-cover transition-all duration-700"
                />
              )}

              {/* Media Overlay Badge Top Left */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#cfa24d] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#cfa24d] animate-pulse" />
                <span>{activeCase.tag[language]}</span>
              </div>

              {/* Media Overlay Badge Top Right */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-white tracking-wider">
                {activeCase.roi} EXPECTED ROI
              </div>
            </div>

            {/* MEDIA CONTROLS & PHOTO SELECTOR (1 Video + 3 Photos per Case) */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1c1a17] border border-white/5 rounded-xl p-3">
              
              {/* Media mode toggle buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMediaMode("video")}
                  className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeMediaMode === "video"
                      ? "bg-[#cfa24d] text-black shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  ▶ {t.videoTab[language]}
                </button>
                <button
                  onClick={() => setActiveMediaMode("photo")}
                  className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeMediaMode === "photo"
                      ? "bg-[#cfa24d] text-black shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  📷 {t.galleryTab[language]}
                </button>
              </div>

              {/* 3 Photos Selector Thumbnails */}
              <div className="flex items-center gap-2">
                {activeCase.photos.map((photoSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveMediaMode("photo");
                      setActivePhotoIndex(idx);
                    }}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      activeMediaMode === "photo" && activePhotoIndex === idx
                        ? "border-[#cfa24d] ring-2 ring-[#cfa24d]/40 scale-105"
                        : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={photoSrc} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
