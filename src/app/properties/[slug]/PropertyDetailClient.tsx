"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDownIcon } from "@/components/icons";
import { submitLead } from "@/lib/leads";
import { useContacts } from "@/context/ContactsContext";
import { formatPrice } from "@/lib/properties";

const t = {
  backCatalog: { en: "← Back to Catalog", ua: "← Назад до каталогу", ru: "← Назад в каталог" },
  overview: { en: "Overview", ua: "Опис", ru: "Описание" },
  amenities: { en: "Amenities", ua: "Зручності", ru: "Удобства" },
  detailsTitle: { en: "Details", ua: "Деталі", ru: "Детали" },
  locationTitle: { en: "Location", ua: "Місцезнаходження", ru: "Местоположение" },
  priceLabel: { en: "Price", ua: "Ціна", ru: "Цена" },
  pricePerM: { en: "/ m²", ua: "/ м²", ru: "/ м²" },
  beds: { en: "Bedrooms", ua: "Спальні", ru: "Спальни" },
  area: { en: "Area", ua: "Площа", ru: "Площадь" },
  roi: { en: "Expected ROI", ua: "Очікуваний ROI", ru: "Ожидаемый ROI" },
  floorLabel: { en: "Floor", ua: "Поверх", ru: "Этаж" },
  showMore: { en: "Show More", ua: "Показати більше", ru: "Показать больше" },
  showLess: { en: "Show Less", ua: "Показати менше", ru: "Показать меньше" },
  verifiedAdvisor: { en: "Verified Advisor", ua: "Верифікований радник", ru: "Верифицированный советник" },
  consultTitle: { en: "Request Consultation", ua: "Запит на консультацію", ru: "Запрос на консультацию" },
  tgBtn: { en: "Telegram Message", ua: "Написати у Telegram", ru: "Написать в Telegram" },
  fName: { en: "Full name", ua: "Ім'я та прізвище", ru: "Имя и фамилия" },
  fPhone: { en: "Phone / WhatsApp", ua: "Телефон / WhatsApp", ru: "Телефон / WhatsApp" },
  fEmail: { en: "Email (optional)", ua: "Email (за бажанням)", ru: "Email (по желанию)\" " },
  fSubmit: { en: "Send Inquiry", ua: "Надіслати запит", ru: "Отправить запрос" },
  status: {
    "off-plan": { en: "Off-Plan", ua: "Off-Plan", ru: "Off-Plan" },
    ready: { en: "Ready", ua: "Готовий", ru: "Готов" },
    exclusive: { en: "Exclusive", ua: "Ексклюзив", ru: "Эксклюзив" },
    investment: { en: "Investment", ua: "Інвестиція", ru: "Инвестиция" },
  } as const,
};

const brokers = {
  kyiv: {
    name: { en: "Olena Marchenko", ua: "Олена Марченко", ru: "Елена Марченко" },
    initials: "OM",
    photo: "",
  },
  lviv: {
    name: { en: "Taras Kovalenko", ua: "Тарас Коваленко", ru: "Тарас Коваленко" },
    initials: "TK",
    photo: "",
  },
  odesa: {
    name: { en: "Victoria Shevchenko", ua: "Вікторія Шевченко", ru: "Виктория Шевченко" },
    initials: "VS",
    photo: "",
  },
};

function getText(val: any, lang: "en" | "ua" | "ru", fallback = ""): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val || fallback;
  if (typeof val === "object") {
    return val[lang] || val.en || val.ua || val.ru || fallback;
  }
  return String(val) || fallback;
}

function getDefaultSpecs(language: "en" | "ua" | "ru") {
  const isEn = language === "en";
  const isUa = language === "ua";
  return {
    rooms: isEn ? "3 Rooms" : isUa ? "3 кімнати" : "3 комнаты",
    layout: "100 / 60 / 20 m²",
    floor: isEn ? "Floor 5 of 9" : isUa ? "поверх 5 з 9" : "этаж 5 из 9",
    renovation: isEn ? "Designer finish" : isUa ? "дизайнерський ремонт" : "дизайнерский ремонт",
    newBuild: isEn ? "New building" : isUa ? "новобудова" : "новостройка",
    construction: isEn ? "Monolithic Frame" : isUa ? "монолітно-каркасна" : "монолитно-каркасная",
    heating: isEn ? "Autonomous heating" : isUa ? "автономне опалення" : "автономное отопление",
    ceilings: isEn ? "3.0 m" : isUa ? "3.0 м" : "3.0 м",
    yearBuilt: isEn ? "Built in 2023" : isUa ? "2023 рік будівництва" : "2023 год постройки",
  };
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-gray-100 pb-2.5">
      <span className="h-1.5 w-1.5 shrink-0 bg-[#D4AF37]" />
      <span className="text-gray-400 text-[13.5px] uppercase tracking-wider">{label}:</span>
      <span className="font-normal text-[#0a0a0a] ml-auto">{value}</span>
    </div>
  );
}

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

interface PropertyDetailClientProps {
  property: any;
}

export function PropertyDetailClient({ property: p }: PropertyDetailClientProps) {
  const { language } = useLanguage();
  const { whatsapp, telegram } = useContacts();

  const [activeImg, setActiveImg] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const isHotel = p.type === "hotels";
  const isCommercial = p.type === "commercial";

  // Safe text helpers
  const titleText = getText(p.title, language, "Property");
  const titleEn = getText(p.title, "en", "Property");
  const locationText = getText(p.location, language, "Ukraine");
  const locationEn = getText(p.location, "en", "Ukraine");
  const descriptionText = getText(p.description, language, "");

  const defaultSpecs = getDefaultSpecs(language);
  const rawSpecs = p.specs && typeof p.specs === "object" ? p.specs : {};
  const specs = {
    rooms: rawSpecs.rooms || defaultSpecs.rooms,
    layout: rawSpecs.layout || defaultSpecs.layout,
    floor: rawSpecs.floor || defaultSpecs.floor,
    renovation: rawSpecs.renovation || defaultSpecs.renovation,
    newBuild: rawSpecs.newBuild || defaultSpecs.newBuild,
    construction: rawSpecs.construction || defaultSpecs.construction,
    heating: rawSpecs.heating || defaultSpecs.heating,
    ceilings: rawSpecs.ceilings || defaultSpecs.ceilings,
    yearBuilt: rawSpecs.yearBuilt || defaultSpecs.yearBuilt,
  };

  const statusMap = (t.status as any)[p.status] || { en: "Ready", ua: "Готовий", ru: "Готов" };
  const statusText = getText(statusMap, language, "Ready");

  const broker = brokers[p.city as keyof typeof brokers] || brokers.kyiv;
  // Use property-level manager name if set, otherwise fall back to city default
  const managerName = p.managerName || getText(broker.name, language);
  const managerInitials = p.managerInitials || broker.initials;

  const priceNum = Number(p.price) || 0;
  const areaNum = Number(p.area) || 0;
  const pricePerSqm = useMemo(() => {
    if (priceNum > 0 && areaNum > 0) return Math.round(priceNum / areaNum);
    return 0;
  }, [priceNum, areaNum]);

  // Property-specific manager contacts override global contacts
  const effectiveWhatsapp = p.managerWhatsapp || whatsapp || "";
  const effectiveTelegram = p.managerTelegram || telegram || "";

  const cleanWhatsapp = effectiveWhatsapp.replace(/[^0-9]/g, "");
  const waText = encodeURIComponent(
    `Hello Golden Land! I would like to schedule a viewing or request info for "${titleEn}" (${locationEn}).`
  );
  const waHref = `https://wa.me/${cleanWhatsapp}?text=${waText}`;
  const tgHref = `https://t.me/${effectiveTelegram || ""}`;

  const galleryImages: string[] = Array.isArray(p.gallery) ? p.gallery.filter(Boolean) : [];
  const hasGallery = galleryImages.length > 0;

  const prevSlide = () => setActiveImg((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  const nextSlide = () => setActiveImg((i) => (i === galleryImages.length - 1 ? 0 : i + 1));

  return (
    <main className="flex-1 bg-[#FDFDFD] pt-[90px]">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1536px] px-4 md:px-8 pt-8">
        <nav className="flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase text-gray-500">
          <Link href="/catalog" className="transition-colors hover:text-[#D4AF37]">
            {t.backCatalog[language]}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#D4AF37] truncate max-w-[200px]">{titleText}</span>
        </nav>
      </div>

      <section className="py-8 pb-20">
        <div className="mx-auto max-w-[1536px] px-4 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-9 space-y-12">

              {/* Gallery */}
              <div>
                <div
                  onClick={() => hasGallery && setIsLightboxOpen(true)}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-[#111] shadow-sm group cursor-zoom-in hover:opacity-95 transition-opacity"
                >
                  {hasGallery ? (
                    <Image
                      src={galleryImages[activeImg] || galleryImages[0]}
                      alt={titleText}
                      fill
                      priority
                      className="object-cover transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111] gap-3">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" className="h-16 w-16 opacity-20">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                      <span className="text-[#D4AF37]/30 text-[11px] tracking-[0.2em] uppercase">No photos yet</span>
                    </div>
                  )}

                  {/* Status / ROI badges */}
                  <div className="absolute left-6 top-6 flex gap-2">
                    {p.status !== "exclusive" && (
                      <span className="bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-white border border-white/10 rounded-sm">
                        {statusText}
                      </span>
                    )}
                    {p.roi && (
                      <span className="bg-[#D4AF37] px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase text-[#0a0a0a] rounded-sm font-semibold">
                        ROI {p.roi}%
                      </span>
                    )}
                  </div>

                  {/* Nav arrows */}
                  {hasGallery && galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a]/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label="Previous image"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                          <path d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a]/40 text-white backdrop-blur-sm border border-white/10 hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                        aria-label="Next image"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Photos count */}
                  {hasGallery && (
                    <div className="absolute right-6 bottom-6 flex items-center gap-2 bg-[#0a0a0a]/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-medium tracking-wider text-white border border-white/10 rounded-sm">
                      {activeImg + 1} / {galleryImages.length} {language === "en" ? "photos" : "фото"}
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {hasGallery && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x">
                    {galleryImages.map((src, i) => (
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
                )}
              </div>

              {/* Core info */}
              <div className="bg-[#FAF9F6] border border-gray-100 p-6 md:p-8 rounded-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium">{locationText}</span>
                  <h1 className="text-[28px] font-light leading-[1.2] tracking-tight text-[#0a0a0a] md:text-[36px] mt-1">
                    {titleText}
                  </h1>
                </div>
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
                    value={`${areaNum} ${language === "en" ? "sqm" : "м²"}`}
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
                        <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M2 22h20"/>
                      </svg>
                    }
                  />
                  <IconStat
                    label={t.roi[language]}
                    value={p.roi ? `${p.roi}%` : "—"}
                    icon={
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-5 w-5 text-[#D4AF37]">
                        <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
                      </svg>
                    }
                  />
                </div>
              </div>

              {/* Specs grid */}
              <div className="space-y-6">
                <SectionEyebrow className="text-[#D4AF37]">{t.detailsTitle[language]}</SectionEyebrow>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-8 text-[15px] font-light text-gray-800">
                  <DetailItem label={language === "en" ? "Renovation" : "Ремонт"} value={specs.renovation} />
                  <DetailItem label={language === "en" ? "Building Class" : "Тип будинку"} value={specs.newBuild} />
                  <DetailItem label={language === "en" ? "Structure" : "Конструкція"} value={specs.construction} />
                  <DetailItem label={language === "en" ? "Heating" : "Опалення"} value={specs.heating} />
                  <DetailItem label={language === "en" ? "Ceilings" : "Висота стелі"} value={specs.ceilings} />
                  <DetailItem label={language === "en" ? "Year Built" : "Рік"} value={specs.yearBuilt} />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-5 border-t border-gray-100 pt-10">
                <SectionEyebrow className="text-[#D4AF37]">{t.overview[language]}</SectionEyebrow>
                <div className="relative">
                  <div
                    className={`text-[16px] font-light leading-[1.8] text-gray-700 transition-all duration-500 overflow-hidden ${
                      isDescExpanded ? "max-h-[1000px]" : "max-h-[120px]"
                    }`}
                  >
                    {descriptionText ? (
                      <p>{descriptionText}</p>
                    ) : (
                      <p className="text-gray-400 italic">
                        {language === "en" ? "No description yet." : language === "ua" ? "Опис відсутній." : "Описание отсутствует."}
                      </p>
                    )}
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

              {/* Location map */}
              <div className="space-y-6 border-t border-gray-100 pt-10">
                <SectionEyebrow className="text-[#D4AF37]">{t.locationTitle[language]}</SectionEyebrow>
                <p className="text-[13.5px] font-light text-gray-500">
                  {p.address || `${p.city || "Kyiv"}, Ukraine`}
                </p>
                <div className="relative aspect-[16/9] w-full overflow-hidden border border-gray-100 rounded-sm shadow-sm">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(p.address || `${p.city || "Kyiv"}, Ukraine`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN — sticky sidebar */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-[120px] lg:self-start space-y-6">
                <div className="border border-gray-200 bg-[#FAF9F6] p-6 shadow-sm rounded-sm">
                  {/* Price */}
                  <div className="border-b border-gray-100 pb-5">
                    <span className="text-[10px] tracking-[0.18em] uppercase text-gray-400 font-medium block">{t.priceLabel[language]}</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-[28px] font-light leading-none tracking-tight text-[#0a0a0a] font-semibold">
                        {formatPrice(priceNum, false, language)}
                      </span>
                    </div>
                    {pricePerSqm > 0 && (
                      <span className="text-[13px] font-light text-gray-500 mt-2 block">
                        ${pricePerSqm.toLocaleString()} {t.pricePerM[language]}
                      </span>
                    )}
                  </div>

                  {/* Broker */}
                  <div className="flex items-center gap-4 py-5 border-b border-gray-100">
                    <div className="relative grid h-12 w-12 place-items-center rounded-full bg-[#0a0a0a] text-white border border-[#D4AF37]/45 text-[15px] font-light shrink-0 overflow-hidden">
                      {p.managerPhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.managerPhoto} alt={managerName} className="w-full h-full object-cover" />
                      ) : (
                        <span>{managerInitials || "GL"}</span>
                      )}
                      <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14.5px] font-medium text-gray-900 leading-none">{managerName}</span>
                      <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">{t.verifiedAdvisor[language]}</span>
                    </div>
                  </div>

                  {/* Contact buttons */}
                  <div className="grid grid-cols-1 gap-2.5 mt-5">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 px-4 py-2.5 text-[13px] font-medium tracking-[0.05em] uppercase transition-all duration-300 rounded-sm"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M20.5 3.5A11 11 0 0 0 3.4 17.1L2 22l5-1.3A11 11 0 0 0 20.5 3.5zM12 20a8 8 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z"/>
                      </svg>
                      WhatsApp / Viber
                    </a>
                    <a
                      href={tgHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc]/5 px-4 py-2.5 text-[13px] font-medium tracking-[0.05em] uppercase transition-all duration-300 rounded-sm"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M9.8 15.3 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 4 2.9c.7.4 1.2.2 1.4-.7l2.6-12h0c.2-1-.4-1.5-1.1-1.2L3.6 10.4c-1 .4-1 1-.2 1.2l4.2 1.3 9.7-6.1c.4-.3.8-.1.5.2z"/>
                      </svg>
                      {t.tgBtn[language]}
                    </a>
                  </div>

                  {/* Lead form */}
                  <div className="mt-8 border-t border-gray-100 pt-6">
                    <span className="text-[12px] font-medium uppercase tracking-wider text-gray-900 block mb-4">
                      {t.consultTitle[language]}
                    </span>
                    <LeadForm
                      propertySlug={p.slug}
                      propertyTitle={titleEn}
                      language={language}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && hasGallery && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute right-6 top-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer"
            aria-label="Close gallery"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-[65vh] md:h-[80vh] max-w-[95vw] md:max-w-[85vw]"
          >
            <Image
              src={galleryImages[activeImg] || galleryImages[0]}
              alt={titleText}
              fill
              className="object-contain select-none"
              priority
            />
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

          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-8 flex gap-2 overflow-x-auto max-w-[95vw] pb-2"
          >
            {galleryImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-[16/10] w-[60px] sm:w-[80px] shrink-0 overflow-hidden bg-black transition-all duration-300 ${
                  activeImg === i ? "ring-2 ring-[#D4AF37] opacity-100" : "opacity-40 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-4 text-[12px] font-medium tracking-[0.1em] uppercase text-white/50">
            {activeImg + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </main>
  );
}

// Extracted lead form to keep component clean
function LeadForm({ propertySlug, propertyTitle, language }: { propertySlug: string; propertyTitle: string; language: "en" | "ua" | "ru" }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (submitted) {
    return (
      <div className="py-4 text-center">
        <p className="text-emerald-600 text-[13px] font-medium">
          {language === "en" ? "✓ Request sent! We'll contact you soon." : language === "ua" ? "✓ Заявку надіслано! Ми зв'яжемось з вами." : "✓ Заявка отправлена! Мы свяжемся с вами."}
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid grid-cols-1 gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const formData = new FormData(e.currentTarget);
        try {
          await submitLead({
            formType: "Property Inquiry",
            propertyId: propertySlug,
            propertyTitle,
            lang: language,
            name: formData.get("name") as string,
            phone: formData.get("phone") as string,
            email: (formData.get("email") as string) || undefined,
          });
          setSubmitted(true);
        } catch {
          // Silent fail — still show success to user
          setSubmitted(true);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <input
        name="name"
        required
        type="text"
        placeholder={language === "en" ? "Full name" : language === "ua" ? "Ім'я та прізвище" : "Имя и фамилия"}
        className="w-full border border-gray-200 bg-white px-4 py-3 text-[13px] font-light placeholder-gray-400 outline-none focus:border-[#D4AF37] transition-colors"
      />
      <input
        name="phone"
        required
        type="tel"
        placeholder={language === "en" ? "Phone / WhatsApp" : "Телефон / WhatsApp"}
        className="w-full border border-gray-200 bg-white px-4 py-3 text-[13px] font-light placeholder-gray-400 outline-none focus:border-[#D4AF37] transition-colors"
      />
      <input
        name="email"
        type="email"
        placeholder={language === "en" ? "Email (optional)" : language === "ua" ? "Email (за бажанням)" : "Email (по желанию)"}
        className="w-full border border-gray-200 bg-white px-4 py-3 text-[13px] font-light placeholder-gray-400 outline-none focus:border-[#D4AF37] transition-colors"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#D4AF37] px-4 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase text-[#0a0a0a] hover:bg-[#b8972e] transition-colors disabled:opacity-60 cursor-pointer"
      >
        {submitting
          ? (language === "en" ? "Sending..." : "Відправка...")
          : (language === "en" ? "Send Inquiry" : language === "ua" ? "Надіслати запит" : "Отправить запрос")}
      </button>
    </form>
  );
}
