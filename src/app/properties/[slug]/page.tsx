"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useLanguage } from "@/context/LanguageContext";
import { getPropertyBySlug, formatPrice } from "@/lib/properties";
import { ChevronDownIcon } from "@/components/icons";
import { submitLead } from "@/lib/leads";
import { useContacts } from "@/context/ContactsContext";

const t = {
  backCatalog: { en: "← Back to Catalog", ua: "← Назад до каталогу", ru: "← Назад в каталог" },
  overview: { en: "Overview", ua: "Опис", ru: "Описание" },
  amenities: { en: "Amenities", ua: "Зручності", ru: "Удобства" },
  detailsTitle: { en: "Details", ua: "Деталі", ru: "Детали" },
  locationTitle: { en: "Location", ua: "Місцезнаходження", ru: "Местоположение" },
  
  priceLabel: { en: "Price", ua: "Ціна", ru: "Цена" },
  pricePerM: { en: "/ m²", ua: "/ м²", ru: "/ м²" },
  beds: { en: "Bedrooms", ua: "Спальні", ru: "Спальни" },
  baths: { en: "Bathrooms", ua: "Ванні", ru: "Ванные" },
  area: { en: "Area", ua: "Площа", ru: "Площадь" },
  roi: { en: "Expected ROI", ua: "Очікуваний ROI", ru: "Ожидаемый ROI" },
  floorLabel: { en: "Floor", ua: "Поверх", ru: "Этаж" },

  showMore: { en: "Show More", ua: "Показати більше", ru: "Показать больше" },
  showLess: { en: "Show Less", ua: "Показати менше", ru: "Показать меньше" },
  
  verifiedAdvisor: { en: "Verified Advisor", ua: "Верифікований радник", ru: "Верифицированный советник" },
  consultTitle: { en: "Request Consultation", ua: "Запит на консультацію", ru: "Запрос на консультацию" },
  waBtn: { en: "Viber / WhatsApp", ua: "Зв'язатись у Viber / WhatsApp", ru: "Связаться в Viber / WhatsApp" },
  tgBtn: { en: "Telegram Message", ua: "Написати у Telegram", ru: "Написать в Telegram" },
  
  fName: { en: "Full name", ua: "Ім'я та прізвище", ru: "Имя и фамилия" },
  fPhone: { en: "Phone / WhatsApp", ua: "Телефон / WhatsApp", ru: "Телефон / WhatsApp" },
  fEmail: { en: "Email (optional)", ua: "Email (за бажанням)", ru: "Email (по желанию)" },
  fSubmit: { en: "Send Inquiry", ua: "Надіслати запит", ru: "Отправить запрос" },

  // Map Toggles
  mapBuilding: { en: "Building", ua: "Будинок", ru: "Дом" },
  mapTransport: { en: "Transport & Metro", ua: "Повітря / Метро", ru: "Метро / Транспорт" },
  mapSchools: { en: "Schools", ua: "ЗНО / Школи", ru: "Школы" },
  mapParks: { en: "Parks & Kids", ua: "Садочки / Парки", ru: "Садики / Парки" },

  status: {
    "off-plan": { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
    ready: { en: "Ready", ua: "Готовий", ru: "Готов" },
    exclusive: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
    investment: { en: "Investment", ua: "Інвестиція", ru: "Инвестиция" },
  } as const,
};

// Realistic broker profiles based on cities
const brokers = {
  kyiv: {
    name: { en: "Kateryna Furtseva", ua: "Фурцова Катерина", ru: "Фурцова Екатерина" },
    role: { en: "Senior Investment Advisor", ua: "Старший радник з інвестицій", ru: "Старший советник по инвестициям" },
    photo: "/images/generated/walid_dib.png", // Reusing CEO photo contextually or styled initial box
    initials: "КФ",
    phone: "+380 7777 04177",
  },
  lviv: {
    name: { en: "Oleksandr Lysenko", ua: "Лисенко Олександр", ru: "Лысенко Александр" },
    role: { en: "Lviv Regional Partner", ua: "Партнер у Львівському регіоні", ru: "Партнер во Львовском регионе" },
    photo: "",
    initials: "ОЛ",
    phone: "+380 7777 04177",
  },
  odesa: {
    name: { en: "Dmitry Boyko", ua: "Бойко Дмитро", ru: "Бойко Дмитрий" },
    role: { en: "Odesa Portfolio Manager", ua: "Портфельний менеджер (Одеса)", ru: "Портфельный менеджер (Одесса)" },
    photo: "",
    initials: "ДБ",
    phone: "+380 7777 04177",
  },
};

// Rich technical specs mock mapping
function getPropertyDetails(slug: string, language: "en" | "ua" | "ru") {
  const isEn = language === "en";
  const isUa = language === "ua";

  switch (slug) {
    case "kyiv-pechersk-penthouse":
      return {
        rooms: isEn ? "4 Rooms" : isUa ? "4 кімнати" : "4 комнаты",
        layout: "320 / 180 / 50 м²",
        floor: isEn ? "Floor 24 of 25" : isUa ? "поверх 24 з 25" : "этаж 24 из 25",
        renovation: isEn ? "Designer renovation" : isUa ? "з ремонтом" : "с ремонтом",
        newBuild: isEn ? "New building" : isUa ? "новобудова" : "новостройка",
        construction: isEn ? "Monolithic Frame" : isUa ? "монолітно-каркасна" : "монолитно-каркасная",
        heating: isEn ? "Centralized heating" : isUa ? "централізоване опалення" : "централизованное отопление",
        ceilings: isEn ? "3.4 m ceiling height" : isUa ? "3.4 м висота стелі" : "3.4 м высота потолков",
        yearBuilt: isEn ? "Built in 2021" : isUa ? "2021 рік будівництва" : "2021 год постройки",
      };
    case "kyiv-podil-loft":
      return {
        rooms: isEn ? "2 Rooms" : isUa ? "2 кімнати" : "2 комнаты",
        layout: "120 / 72 / 20 м²",
        floor: isEn ? "Floor 3 of 5" : isUa ? "поверх 3 з 5" : "этаж 3 из 5",
        renovation: isEn ? "Loft designer finish" : isUa ? "дизайнерський лофт" : "дизайнерский лофт",
        newBuild: isEn ? "Heritage Restored" : isUa ? "реставрована пам'ятка" : "реставрированный памятник",
        construction: isEn ? "Brick & Monolith" : isUa ? "цегляно-монолітна" : "кирпично-monolitnaya",
        heating: isEn ? "Autonomous gas boiler" : isUa ? "автономне (котел)" : "автономное (котел)",
        ceilings: isEn ? "3.8 m ceiling height" : isUa ? "3.8 м висота стелі" : "3.8 м высота потолков",
        yearBuilt: isEn ? "Built in 2018" : isUa ? "2018 рік будівництва" : "2018 год постройки",
      };
    case "odesa-arkadia-apartment":
      return {
        rooms: isEn ? "3 Rooms" : isUa ? "3 кімнати" : "3 комнаты",
        layout: "145 / 80 / 28 м²",
        floor: isEn ? "Floor 12 of 18" : isUa ? "поверх 12 з 18" : "этаж 12 из 18",
        renovation: isEn ? "Turnkey premium finish" : isUa ? "з ремонтом під ключ" : "с ремонтом под ключ",
        newBuild: isEn ? "New building" : isUa ? "новобудова" : "новостройка",
        construction: isEn ? "Monolithic Frame" : isUa ? "монолітно-каркасна" : "монолитно-каркасная",
        heating: isEn ? "Autonomous building boiler" : isUa ? "автономна котельня" : "автономная котельная",
        ceilings: isEn ? "3.1 m ceiling height" : isUa ? "3.1 м висота стелі" : "3.1 м высота потолков",
        yearBuilt: isEn ? "Built in 2022" : isUa ? "2022 рік будівництва" : "2022 год постройки",
      };
    default:
      return {
        rooms: isEn ? "3 Rooms" : isUa ? "3 кімнати" : "3 комнаты",
        layout: "135 / 75 / 22 м²",
        floor: isEn ? "Floor 5 of 9" : isUa ? "поверх 5 з 9" : "этаж 5 из 9",
        renovation: isEn ? "Premium shell & core" : isUa ? "під чистове оздоблення" : "под чистовую отделку",
        newBuild: isEn ? "New building" : isUa ? "новобудова" : "новостройка",
        construction: isEn ? "Monolithic Frame" : isUa ? "монолітно-каркасна" : "монолитно-каркасная",
        heating: isEn ? "Autonomous heating" : isUa ? "автономне опалення" : "автономное отопление",
        ceilings: isEn ? "3.0 m ceiling height" : isUa ? "3.0 м висота стелі" : "3.0 м высота потолков",
        yearBuilt: isEn ? "Built in 2023" : isUa ? "2023 рік будівництва" : "2023 год постройки",
      };
  }
}

function getPropertyMapAddress(p: any): string {
  if (p.address) return p.address;
  const addresses: Record<string, string> = {
    "kyiv-pechersk-penthouse": "Lomakivska St, 56/2, Kyiv, Ukraine",
    "kyiv-podil-loft": "Spaska St, 20, Podil, Kyiv, Ukraine",
    "odesa-arkadia-apartment": "Genuez'ka St, 24, Arcadia, Odesa, Ukraine",
    "lviv-historic-townhouse": "Rynok Square, 10, Lviv, Ukraine",
    "kozyn-forest-villa": "Kozyn, Kyiv Oblast, Ukraine",
    "odesa-beachfront-villa": "Fontanska Road, Odesa, Ukraine",
    "lviv-rynok-boutique": "Rynok Square, Lviv, Ukraine",
    "odesa-black-sea-hotel": "Primorsky Boulevard, Odesa, Ukraine",
    "kyiv-hospitality-project": "Khreschatyk St, Kyiv, Ukraine",
    "kyiv-business-tower": "Lesi Ukrainky Blvd, Kyiv, Ukraine",
    "lviv-office-building": "Shevchenka Ave, Lviv, Ukraine",
    "odesa-retail-plaza": "Deribasivska St, Odesa, Ukraine",
  };
  return addresses[p.slug] || "Kyiv, Ukraine";
}

export default function PropertyDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const { language } = useLanguage();

  const [loadedProperties, setLoadedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Synchronously find in static ones first so there is zero delay for static pages
  const staticProperty = slug ? getPropertyBySlug(slug) : undefined;

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.properties) {
          setLoadedProperties(data.properties);
        }
      })
      .catch((err) => console.error("Error loading property detail:", err))
      .finally(() => setLoading(false));
  }, []);

  const p = useMemo(() => {
    if (staticProperty) return staticProperty;
    return loadedProperties.find((prop) => prop.slug === slug);
  }, [staticProperty, loadedProperties, slug]);

  const [activeImg, setActiveImg] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [activeMapLayer, setActiveMapLayer] = useState<"building" | "transport" | "schools" | "parks">("building");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (loading && !staticProperty) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#FDFDFD]">
        <div className="text-[14px] font-light uppercase tracking-wider text-gray-500 animate-pulse">
          Loading property details...
        </div>
      </div>
    );
  }

  if (!p) {
    notFound();
  }

  const isHotel = p.type === "hotels";
  const isCommercial = p.type === "commercial";

  const specs = p.specs || getPropertyDetails(p.slug, language);
  const broker = brokers[p.city as keyof typeof brokers] || brokers.kyiv;

  // Price calculations
  const pricePerSqm = useMemo(() => {
    if (p.price && p.area) {
      return Math.round(p.price / p.area);
    }
    return 0;
  }, [p.price, p.area]);

  const { whatsapp, telegram } = useContacts();
  const cleanMainWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  const waText = encodeURIComponent(
    `Hello Golden Land! I would like to schedule a viewing or request info for "${p.title.en}" (${p.location.en}).`,
  );
  const waHref = `https://wa.me/${cleanMainWhatsapp}?text=${waText}`;
  const tgHref = `https://t.me/${telegram}`;

  // Horizontal gallery scroll actions
  const nextSlide = () => {
    setActiveImg((prev) => (prev === p.gallery.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setActiveImg((prev) => (prev === 0 ? p.gallery.length - 1 : prev - 1));
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#FDFDFD] pt-[90px]">
        {/* Breadcrumb - Ultra wide layout matches visual hierarchy */}
        <div className="mx-auto max-w-[1536px] px-4 md:px-8 pt-8">
          <nav className="flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-gray-500">
            <Link href="/catalog" className="transition-colors hover:text-[#D4AF37]">
              {t.backCatalog[language]}
            </Link>
          </nav>
        </div>

        {/* Layout Grid: 3/4 content (9 cols) + 1/4 sticky sidebar (3 cols) */}
        <section className="py-8 pb-20">
          <div className="mx-auto max-w-[1536px] px-4 md:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              
              {/* LEFT COLUMN: 3/4 Width (9 Cols) */}
              <div className="lg:col-span-9 space-y-12">
                
                {/* 1. Large Wide Photo Slider */}
                <div>
                  <div
                    onClick={() => setIsLightboxOpen(true)}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-[#111] shadow-sm group cursor-zoom-in hover:opacity-95 transition-opacity"
                  >
                    <Image
                      src={p.gallery[activeImg]}
                      alt={p.title[language]}
                      fill
                      priority
                      className="object-cover transition-all duration-700"
                    />

                    {/* Status and ROI overlay tags */}
                    <div className="absolute left-6 top-6 flex gap-2">
                      {p.status !== "exclusive" && (
                        <span className="bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-white border border-white/10 rounded-sm">
                          {((t.status as any)[p.status] || { en: p.status, ua: p.status, ru: p.status })[language]}
                        </span>
                      )}
                      {p.roi && (
                        <span className="bg-[#D4AF37] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase text-[#0a0a0a] rounded-sm font-semibold">
                          ROI {p.roi}%
                        </span>
                      )}
                    </div>

                    {/* Slider navigation arrows */}
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a]/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#D4AF37] hover:text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a]/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#D4AF37] hover:text-[#0a0a0a] hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      aria-label="Next image"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Photos Count overlay Badge */}
                    <div className="absolute right-6 bottom-6 flex items-center gap-2 bg-[#0a0a0a]/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-medium tracking-wider text-white border border-white/10 rounded-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-[#D4AF37]">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                      <span>
                        {activeImg + 1} / {p.gallery.length} {language === "en" ? "photos" : language === "ua" ? "фотографій" : "фотографий"}
                      </span>
                    </div>

                    {/* Play Video overlay Badge */}
                    {p.video && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(p.video, "_blank");
                        }}
                        className="absolute left-6 bottom-6 flex items-center gap-2 bg-[#D4AF37] hover:bg-white text-[#0a0a0a] border border-[#D4AF37] px-4 py-1.5 text-[11px] font-medium tracking-wider rounded-sm transition-colors cursor-pointer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                        <span>
                          {language === "en" ? "VIDEO TOUR" : language === "ua" ? "ВІДЕОТУР" : "ВИДЕОТУР"}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Horizontal Scrollable Thumbnails Strip */}
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x scrollbar-thin">
                    {p.gallery.map((src: string, i: number) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`relative aspect-[16/10] w-[130px] sm:w-[150px] shrink-0 snap-start overflow-hidden bg-black transition-all duration-300 ${
                          activeImg === i ? "ring-2 ring-[#D4AF37] opacity-100" : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={src} alt="" fill sizes="150px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Core info with custom inline icons */}
                <div className="bg-[#FAF9F6] border border-gray-100 p-6 md:p-8 rounded-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium">
                      {p.location[language]}
                    </span>
                    <h1 className="text-[28px] font-light leading-[1.2] tracking-tight text-[#0a0a0a] md:text-[36px] mt-1">
                      {p.title[language]}
                    </h1>
                  </div>

                  {/* Iconified Metrics Bar */}
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mt-8 pt-8 border-t border-gray-100">
                    <IconStat
                      label={t.beds[language]}
                      value={specs.rooms}
                      icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5 text-[#D4AF37]">
                          <path d="M2 4v16M22 4v16M2 8h20M2 14h20M6 8v6M18 8v6M12 8v6"/>
                        </svg>
                      }
                    />
                    <IconStat
                      label={t.area[language]}
                      value={`${p.area} ${language === "en" ? "sqm" : "м²"}`}
                      icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5 text-[#D4AF37]">
                          <rect x="2" y="2" width="20" height="20" rx="1"/>
                          <path d="M7 2v20M17 2v20M2 7h20M2 17h20"/>
                        </svg>
                      }
                    />
                    <IconStat
                      label={t.floorLabel[language]}
                      value={specs.floor}
                      icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5 text-[#D4AF37]">
                          <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M2 22h20M9 6h2M9 10h2M9 14h2M13 6h2M13 10h2M13 14h2"/>
                        </svg>
                      }
                    />
                    <IconStat
                      label={t.roi[language]}
                      value={p.roi ? `${p.roi}%` : "8.2%"}
                      icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5 text-[#D4AF37]">
                          <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                          <polyline points="15 8 19 8 19 12"/>
                        </svg>
                      }
                    />
                  </div>
                </div>

                {/* 3. Structured Details Grid (Деталі) */}
                <div className="space-y-6">
                  <SectionEyebrow className="text-[#D4AF37]">{t.detailsTitle[language]}</SectionEyebrow>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8 text-[15px] font-light text-gray-800">
                    <DetailItem label={language === "en" ? "Renovation" : "Ремонт"} value={specs.renovation} />
                    <DetailItem label={language === "en" ? "Building Class" : "Тип будинку"} value={specs.newBuild} />
                    <DetailItem label={language === "en" ? "Structure" : "Конструкція"} value={specs.construction} />
                    <DetailItem label={language === "en" ? "Heating" : "Опалення"} value={specs.heating} />
                    <DetailItem label={language === "en" ? "Ceilings" : "Висота стелі"} value={specs.ceilings} />
                    <DetailItem label={language === "en" ? "Year Built" : "Рік побудови"} value={specs.yearBuilt} />
                  </div>
                </div>

                {/* 4. Collapsible Description */}
                <div className="space-y-5 border-t border-gray-100 pt-10">
                  <SectionEyebrow className="text-[#D4AF37]">{t.overview[language]}</SectionEyebrow>
                  <div className="relative">
                    <div
                      className={`text-[16px] font-light leading-[1.8] text-gray-700 transition-all duration-500 overflow-hidden ${
                        isDescExpanded ? "max-h-[1000px]" : "max-h-[135px]"
                      }`}
                    >
                      <p>{p.description[language]}</p>
                      
                      {/* Fake descriptions extension for high realism */}
                      <p className="mt-4">
                        {language === "en"
                          ? "This stunning architectural masterpiece offers custom built-in appliances, Italian premium marble finishes, advanced smart-home integration (control climate, lights, and audio with a tablet), high-performance double glazed acoustics, and secure underground private parking. Built with the most rigorous environmental and energy standards."
                          : language === "ua"
                          ? "Цей вишуканий архітектурний об'єкт преміум-класу укомплектований вбудованою побутовою технікою провідних світових брендів, італійським натуральним мармуром, встановлено сучасну систему розумного дому (клімат-контроль, світло, мультирум), надійні шумозахисні склопакети та підземний паркінг з ліфтом безпосередньо до холу."
                          : "Этот изысканный архитектурный объект премиум-класса укомплектован встроенной бытовой техникой ведущих мировых брендов, итальянским натуральным мрамором, установлена современная система умного дома (климат-контроль, свет, мультирум), надежные шумозащитные стеклопакеты и подземный паркинг с лифтом."}
                      </p>
                      
                      {/* Bottom fade mask when collapsed */}
                      {!isDescExpanded && (
                        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#FDFDFD] to-transparent pointer-events-none" />
                      )}
                    </div>
                    
                    <button
                      onClick={() => setIsDescExpanded(!isDescExpanded)}
                      className="mt-4 flex items-center gap-2 border border-gray-200 bg-white hover:border-[#D4AF37] px-6 py-2.5 text-[12px] font-medium tracking-wider uppercase text-gray-900 transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      <span>{isDescExpanded ? t.showLess[language] : t.showMore[language]}</span>
                      <ChevronDownIcon className={`h-3 w-3 text-gray-500 transition-transform duration-300 ${isDescExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* 5. Amenities Checkbox List */}
                <div className="space-y-6 border-t border-gray-100 pt-10">
                  <SectionEyebrow className="text-[#D4AF37]">{t.amenities[language]}</SectionEyebrow>
                  <ul className="grid grid-cols-1 gap-y-3.5 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
                    {(p.amenities || []).map((a: any, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-[14.5px] font-light text-gray-800">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4.5 w-4.5 text-[#D4AF37] shrink-0">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{a[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 6. Google Map Integration with Real Address */}
                <div className="space-y-6 border-t border-gray-100 pt-10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <SectionEyebrow className="text-[#D4AF37]">{t.locationTitle[language]}</SectionEyebrow>
                    <span className="text-[13.5px] font-light text-gray-500">
                      {getPropertyMapAddress(p)}
                    </span>
                  </div>

                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-gray-100 rounded-sm shadow-sm">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        getPropertyMapAddress(p)
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: 1/4 Width Sticky Sidebar Form (3 Cols) */}
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-[120px] lg:self-start space-y-6">
                  
                  {/* Lead capturing sidebar card */}
                  <div className="border border-gray-200 bg-[#FAF9F6] p-6 shadow-sm rounded-sm">
                    {/* Price and size breakdown */}
                    <div className="border-b border-gray-100 pb-5">
                      <span className="text-[10px] tracking-[0.18em] uppercase text-gray-400 font-medium block">
                        {t.priceLabel[language]}
                      </span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-[28px] font-light leading-none tracking-tight text-[#0a0a0a] font-semibold">
                          {formatPrice(p.price, p.priceOnRequest, language)}
                        </span>
                      </div>
                      {!p.priceOnRequest && (
                        <span className="text-[13px] font-light text-gray-500 mt-2 block">
                          ${pricePerSqm.toLocaleString()} {t.pricePerM[language]}
                        </span>
                      )}
                    </div>

                    {/* Broker Profile Card */}
                    <div className="flex items-center gap-4 py-5 border-b border-gray-100">
                      <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a] text-white border border-[#D4AF37]/45 text-[15px] font-light font-display shadow-inner shrink-0">
                        {broker.photo ? (
                          <Image src={broker.photo} alt="" fill className="rounded-full object-cover" />
                        ) : (
                          <span>{broker.initials}</span>
                        )}
                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[14.5px] font-medium text-gray-900 leading-none">
                            {broker.name[language]}
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
                          {t.verifiedAdvisor[language]}
                        </span>
                      </div>
                    </div>

                    {/* Call to actions - messaging buttons */}
                    <div className="grid grid-cols-1 gap-2.5 mt-5">
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 px-4 py-2.5 text-[13px] font-medium tracking-[0.05em] uppercase transition-all duration-300 rounded-sm"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                          <path d="M20.5 3.5A11 11 0 0 0 3.4 17.1L2 22l5-1.3A11 11 0 0 0 20.5 3.5zM12 20a8 8 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z"/>
                        </svg>
                        <span>WhatsApp / Viber</span>
                      </a>
                      <a
                        href={tgHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 border border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc]/5 px-4 py-2.5 text-[13px] font-medium tracking-[0.05em] uppercase transition-all duration-300 rounded-sm"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
                          <path d="M9.8 15.3 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 4 2.9c.7.4 1.2.2 1.4-.7l2.6-12h0c.2-1-.4-1.5-1.1-1.2L3.6 10.4c-1 .4-1 1-.2 1.2l4.2 1.3 9.7-6.1c.4-.3.8-.1.5.2z"/>
                        </svg>
                        <span>{t.tgBtn[language]}</span>
                      </a>
                    </div>

                    {/* Direct lead submission form */}
                    <div className="mt-8 border-t border-gray-100 pt-6">
                      <span className="text-[12px] font-medium uppercase tracking-wider text-gray-900 block mb-4">
                        {t.consultTitle[language]}
                      </span>
                      <form
                        className="grid grid-cols-1 gap-3"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const formData = new FormData(e.currentTarget);
                          const data = {
                            formType: "Property Inquiry",
                            propertyId: p.slug,
                            propertyTitle: p.title.en,
                            name: formData.get("name") as string,
                            phone: formData.get("phone") as string,
                            email: formData.get("email") as string || undefined,
                            lang: language,
                          };
                          await submitLead(data);
                          window.location.href = "/thank-you";
                        }}
                      >
                        <input
                          type="text"
                          name="name"
                          required
                          aria-label={t.fName[language]}
                          placeholder={t.fName[language]}
                          className="w-full border border-gray-200 bg-white px-3.5 py-2.5 text-[14px] font-light text-gray-800 placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none rounded-sm transition-colors"
                        />
                        <input
                          type="tel"
                          name="phone"
                          required
                          aria-label={t.fPhone[language]}
                          placeholder={t.fPhone[language]}
                          className="w-full border border-gray-200 bg-white px-3.5 py-2.5 text-[14px] font-light text-gray-800 placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none rounded-sm transition-colors"
                        />
                        <input
                          type="email"
                          name="email"
                          aria-label={t.fEmail[language]}
                          placeholder={t.fEmail[language]}
                          className="w-full border border-gray-200 bg-white px-3.5 py-2.5 text-[14px] font-light text-gray-800 placeholder:text-gray-400 focus:border-[#D4AF37] focus:outline-none rounded-sm transition-colors"
                        />
                        <button
                          type="submit"
                          className="bg-[#0a0a0a] text-white hover:bg-[#D4AF37] hover:text-[#0a0a0a] w-full py-3 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors duration-300 rounded-sm cursor-pointer mt-2 shadow-sm"
                        >
                          {t.fSubmit[language]}
                        </button>
                      </form>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />

      {/* Fullscreen Photo Lightbox / Gallery Pop-up */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            aria-label="Close gallery"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Main Lightbox Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative w-full h-[65vh] md:h-[80vh] max-w-[95vw] md:max-w-[85vw]"
          >
            <Image
              src={p.gallery[activeImg]}
              alt={p.title[language]}
              fill
              className="object-contain select-none"
              priority
            />

            {/* Slider navigation arrows inside Lightbox */}
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="absolute left-[-20px] md:left-[-70px] top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="absolute right-[-20px] md:right-[-70px] top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail scroll strip inside Lightbox */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="mt-8 flex gap-2 overflow-x-auto max-w-[95vw] pb-2 scrollbar-none snap-x"
          >
            {p.gallery.map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-[16/10] w-[60px] sm:w-[80px] shrink-0 snap-start overflow-hidden bg-black transition-all duration-300 ${
                  activeImg === i ? "ring-2 ring-[#D4AF37] opacity-100" : "opacity-40 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>

          {/* Counter text */}
          <div className="mt-4 text-[12px] font-medium tracking-[0.1em] uppercase text-white/50">
            {activeImg + 1} / {p.gallery.length}
          </div>
        </div>
      )}
    </>
  );
}

// Structured Specification Detail item
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 pb-2.5">
      <span className="h-1.5 w-1.5 shrink-0 bg-[#D4AF37]" />
      <span className="text-gray-400 text-[13.5px] uppercase tracking-wider">{label}:</span>
      <span className="font-normal text-[#0a0a0a] ml-auto">{value}</span>
    </div>
  );
}

// Icon stat display block
function IconStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-11 w-11 place-items-center bg-[#fcf8ed] border border-[#D4AF37]/15 rounded-full shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 leading-none">{label}</span>
        <span className="text-[15.5px] font-medium text-gray-900 mt-2.5 leading-none">{value}</span>
      </div>
    </div>
  );
}


