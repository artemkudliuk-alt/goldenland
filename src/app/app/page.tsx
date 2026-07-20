"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Info, Search, X, ChevronDown, ChevronRight, LogOut, Heart, Share2, ArrowLeft, Check, Calculator } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
type Lang     = "en" | "ua" | "ar";
type Screen   = "welcome" | "home" | "explore" | "map" | "portfolio" | "profile" | "property" | "calculator";
type Category = "apartments" | "commercial" | "hotels" | "villas";

interface AppProperty {
  slug:        string;
  title:       Record<Lang, string>;
  location:    Record<Lang, string>;
  fullAddress: Record<Lang, string>;
  city:        string;
  price:       number;
  pricePerSqm: number;
  roi:         string;
  badge:       Record<Lang, string>;
  badgeLabel:  Record<Lang, string>;
  image:       string;
  thumb:       string;
  beds:        number;
  sqm:         number;
  category:    Category;
  highlights:  Record<Lang, string[]>;
  about:       Record<Lang, string>;
  verified:    boolean;
}

interface CityData {
  id:    string;
  name:  Record<Lang, string>;
  count: number;
  xPct:  number;
  yPct:  number;
}

// ─── City data ───────────────────────────────────────────────────────────────
const CITIES: CityData[] = [
  { id: "kyiv",  name: { en: "Kyiv",  ua: "Київ",  ar: "كييف"   }, count: 12, xPct: 54, yPct: 28 },
  { id: "kozyn", name: { en: "Kozyn", ua: "Козин", ar: "كوزين"  }, count: 3,  xPct: 51, yPct: 36 },
  { id: "odesa", name: { en: "Odesa", ua: "Одеса", ar: "أوديسا" }, count: 8,  xPct: 36, yPct: 66 },
  { id: "lviv",  name: { en: "Lviv",  ua: "Львів", ar: "لفيف"   }, count: 5,  xPct: 16, yPct: 26 },
];

// ─── All property data ───────────────────────────────────────────────────────
const ALL_PROPERTIES: AppProperty[] = [
  {
    slug: "odesa-beachfront-villa", city: "odesa", category: "villas", verified: true,
    title:       { en: "Beachfront Villa with Infinity Pool", ua: "Вілла на узбережжі з інфініті-басейном", ar: "فيلا على الشاطئ مع مسبح لا متناهي" },
    location:    { en: "Arkadia · Odesa", ua: "Аркадія · Одеса", ar: "أركاديا · أوديسا" },
    fullAddress: { en: "Arkadia, Odesa · Fontanska Road", ua: "Аркадія, Одеса · вул. Фонтанська", ar: "أركاديا، أوديسا · طريق فونتانسكا" },
    price: 2_200_000, pricePerSqm: 4_583, roi: "7.9%", beds: 5, sqm: 480,
    badge: { en: "ROI 7.9%", ua: "ROI 7.9%", ar: "العائد 7.9%" },
    badgeLabel: { en: "OFF-PLAN · VERIFIED", ua: "ОФФ-ПЛАН · ВЕРИФІКОВАНО", ar: "خطة المشروع · موثق" },
    image: "/images/generated/prop-odesa-beachfront-villa-1.webp",
    thumb: "/images/generated/thumb_odesa_apartment.png",
    highlights: {
      en: ["Private beach frontage", "Infinity pool & smart home", "Boat mooring rights", "24/7 security & underground parking"],
      ua: ["Приватний пляж", "Інфініті-басейн та розумний будинок", "Права на причал для яхт", "Цілодобова охорона та паркінг"],
      ar: ["واجهة بحرية خاصة", "مسبح لا متناهي ومنزل ذكي", "حقوق إرساء القوارب", "أمن على مدار الساعة وموقف سيارات تحت الأرض"],
    },
    about: {
      en: "An off-plan modernist villa on the Black Sea coast with private beach frontage and an infinity pool that meets the sea horizon. Premium finishes throughout, with smart home integration and direct sea access.",
      ua: "Вілла в стилі модернізму на березі Чорного моря з приватним пляжем та інфініті-басейном, що зливається з морським горизонтом. Преміальне оздоблення та інтеграція розумного будинку.",
      ar: "فيلا حديثة على ساحل البحر الأسود مع واجهة بحرية خاصة ومسبح لا متناهي يلتقي مع أفق البحر. تشطيبات فاخرة في جميع أنحاء الفيلا مع تكامل المنزل الذكي.",
    },
  },
  {
    slug: "odesa-sea-view-apt", city: "odesa", category: "apartments", verified: true,
    title:       { en: "Panoramic Sea View Apartment", ua: "Апартаменти з панорамним видом на море", ar: "شقة بإطلالة بحرية بانورامية" },
    location:    { en: "Arkadia · Odesa", ua: "Аркадія · Одеса", ar: "أركاديا · أوديسا" },
    fullAddress: { en: "Arkadia, Odesa · Genuezkaya St.", ua: "Аркадія, Одеса · вул. Генуезька", ar: "أركاديا، أوديسا · شارع جنويزكايا" },
    price: 385_000, pricePerSqm: 3_929, roi: "7.5%", beds: 2, sqm: 98,
    badge: { en: "ROI 7.5%", ua: "ROI 7.5%", ar: "العائد 7.5%" },
    badgeLabel: { en: "READY · VERIFIED", ua: "ГОТОВЕ · ВЕРИФІКОВАНО", ar: "جاهز · موثق" },
    image: "/images/generated/prop-odesa-arkadia-apartment-1.webp",
    thumb: "/images/generated/thumb_odesa_apartment.png",
    highlights: {
      en: ["Panoramic Black Sea views", "Fully furnished & equipped", "Managed rental program", "Concierge & pool access"],
      ua: ["Панорамний вид на Чорне море", "Повністю мебльовані", "Керована програма оренди", "Консьєрж та доступ до басейну"],
      ar: ["إطلالات بانورامية على البحر الأسود", "مفروش ومجهز بالكامل", "برنامج إيجار مُدار", "بواب وإمكانية الوصول إلى المسبح"],
    },
    about: {
      en: "A stunning sea-view apartment in Arkadia's premier residential complex. Panoramic floor-to-ceiling windows frame the Black Sea, while the fully managed rental program ensures consistent passive income.",
      ua: "Розкішні апартаменти з видом на море в одному з найпрестижніших житлових комплексів Аркадії.",
      ar: "شقة رائعة بإطلالة على البحر في أرقى مجمع سكني في أركاديا.",
    },
  },
  {
    slug: "kyiv-pechersk-penthouse", city: "kyiv", category: "apartments", verified: true,
    title:       { en: "Penthouse Overlooking the Lavra", ua: "Пентхаус з видом на Лавру", ar: "بنتهاوس مطل على اللافرة" },
    location:    { en: "Pechersk · Kyiv", ua: "Печерськ · Київ", ar: "بيشيرسك · كييف" },
    fullAddress: { en: "Pechersk, Kyiv · Instytutska St.", ua: "Печерськ, Київ · вул. Інститутська", ar: "بيشيرسك، كييف · شارع إنستيتوتسكا" },
    price: 1_850_000, pricePerSqm: 5_781, roi: "6.8%", beds: 4, sqm: 320,
    badge: { en: "Exclusive", ua: "Ексклюзив", ar: "حصري" },
    badgeLabel: { en: "RESALE · EXCLUSIVE", ua: "ПЕРЕПРОДАЖ · ЕКСКЛЮЗИВ", ar: "إعادة بيع · حصري" },
    image: "/images/generated/prop-kyiv-pechersk-penthouse-1.webp",
    thumb: "/images/generated/prop-kyiv-pechersk-penthouse-1.webp",
    highlights: {
      en: ["Panoramic Lavra & Dnipro views", "Private rooftop terrace", "Concierge & valet parking", "Smart home & premium finishes"],
      ua: ["Вид на Лавру та Дніпро", "Приватна тераса на даху", "Консьєрж та парковка з валетом", "Розумний будинок"],
      ar: ["إطلالات بانورامية على اللافرة ودنيبرو", "تراس خاص على السطح", "بواب وخدمة صف السيارات", "منزل ذكي وتشطيبات فاخرة"],
    },
    about: {
      en: "An extraordinary penthouse in Kyiv's most prestigious district, offering breathtaking views over the UNESCO-listed Lavra monastery and the Dnipro river valley. A truly unique piece of Kyiv.",
      ua: "Видатний пентхаус у найпрестижнішому районі Києва з приголомшливим видом на Лавру та Дніпро.",
      ar: "بنتهاوس استثنائي في أرقى أحياء كييف، يوفر إطلالات خلابة على دير لافرا المدرج في قائمة اليونسكو.",
    },
  },
  {
    slug: "kyiv-podil-loft", city: "kyiv", category: "apartments", verified: false,
    title:       { en: "Historic Loft in Podil", ua: "Історичний лофт у Подолі", ar: "شقة تاريخية في بوديل" },
    location:    { en: "Podil · Kyiv", ua: "Поділ · Київ", ar: "بوديل · كييف" },
    fullAddress: { en: "Podil, Kyiv · Kontraktova Sq.", ua: "Поділ, Київ · Контрактова пл.", ar: "بوديل، كييف · ميدان كونتراكتوفا" },
    price: 620_000, pricePerSqm: 4_276, roi: "7.1%", beds: 2, sqm: 145,
    badge: { en: "ROI 7.1%", ua: "ROI 7.1%", ar: "العائد 7.1%" },
    badgeLabel: { en: "RENOVATION · UNIQUE", ua: "РЕНОВАЦІЯ · УНІКАЛЬНЕ", ar: "تجديد · فريد" },
    image: "/images/generated/prop-kyiv-pechersk-penthouse-1.webp",
    thumb: "/images/generated/thumb_kyiv_loft.png",
    highlights: {
      en: ["Original 19th-century brick walls", "5-meter vaulted ceilings", "Walking distance to Andriivsky", "High rental demand area"],
      ua: ["Оригінальна цегляна кладка XIX ст.", "Зведені стелі 5 метрів", "Пішки до Андріївського узвозу", "Висока орендна привабливість"],
      ar: ["جدران من الطوب الأصلي من القرن التاسع عشر", "أسقف مقببة بارتفاع 5 أمتار", "مسافة سير من أندريفسكي", "طلب إيجار مرتفع"],
    },
    about: {
      en: "A rare historic loft occupying an entire floor of a restored 19th-century warehouse in Podil, Kyiv's most vibrant and artistic neighborhood. Original exposed brick and dramatic arched ceilings.",
      ua: "Рідкісний лофт у відреставрованому складі XIX ст. у Подолі — найбільш живому районі Києва.",
      ar: "شقة تاريخية نادرة تحتل طابقاً كاملاً من مستودع مُرمَّم يعود للقرن التاسع عشر في بوديل.",
    },
  },
  {
    slug: "kozyn-pine-villa", city: "kozyn", category: "villas", verified: true,
    title:       { en: "Pine Forest Villa in Kozyn", ua: "Вілла в сосновому лісі в Козині", ar: "فيلا في غابة الصنوبر" },
    location:    { en: "Kozyn · Kyiv Region", ua: "Козин · Київщина", ar: "كوزين · منطقة كييف" },
    fullAddress: { en: "Kozyn, Kyiv Region · Dnipro Embankment", ua: "Козин, Київська обл. · набережна Дніпра", ar: "كوزين، منطقة كييف · كورنيش دنيبرو" },
    price: 1_650_000, pricePerSqm: 3_667, roi: "8.2%", beds: 5, sqm: 450,
    badge: { en: "ROI 8.2%", ua: "ROI 8.2%", ar: "العائد 8.2%" },
    badgeLabel: { en: "OFF-PLAN · VERIFIED", ua: "ОФФ-ПЛАН · ВЕРИФІКОВАНО", ar: "خطة المشروع · موثق" },
    image: "/images/generated/prop-kozyn-forest-villa-1.webp",
    thumb: "/images/generated/thumb_kozyn_villa.png",
    highlights: {
      en: ["Dnipro riverfront plot", "Private pine forest setting", "Heated pool & sauna", "40 min to Kyiv centre"],
      ua: ["Ділянка на березі Дніпра", "Приватний сосновий ліс", "Підігрівальний басейн та сауна", "40 хв до центру Києва"],
      ar: ["قطعة أرض على ضفة نهر دنيبرو", "محيط غابة صنوبر خاصة", "مسبح مدفأ وساونا", "40 دقيقة من وسط كييف"],
    },
    about: {
      en: "A masterpiece of contemporary architecture nestled in an ancient pine forest on the Dnipro riverbank. Only 40 minutes from Kyiv, this villa offers an unmatched retreat with river views from every room.",
      ua: "Шедевр сучасної архітектури в стародавньому сосновому лісі на березі Дніпра.",
      ar: "تحفة معمارية معاصرة مُحاطة بغابة صنوبر قديمة على ضفة نهر دنيبرو.",
    },
  },
  {
    slug: "lviv-19c-townhouse", city: "lviv", category: "commercial", verified: true,
    title:       { en: "Restored 19th-Century Townhouse", ua: "Реставрований таунхаус XIX ст.", ar: "تاون هاوس من القرن التاسع عشر" },
    location:    { en: "Old Town · Lviv", ua: "Старе місто · Львів", ar: "المدينة القديمة · لفيف" },
    fullAddress: { en: "Old Town, Lviv · Rynok Square area", ua: "Старе місто, Львів · район пл. Ринок", ar: "المدينة القديمة، لفيف · منطقة ساحة رينوك" },
    price: 850_000, pricePerSqm: 2_073, roi: "9.2%", beds: 5, sqm: 410,
    badge: { en: "ROI 9.2%", ua: "ROI 9.2%", ar: "العائد 9.2%" },
    badgeLabel: { en: "RESALE · VERIFIED", ua: "ПЕРЕПРОДАЖ · ВЕРИФІКОВАНО", ar: "إعادة بيع · موثق" },
    image: "/images/generated/prop-lviv-office-building-1.webp",
    thumb: "/images/generated/thumb_lviv_townhouse.png",
    highlights: {
      en: ["UNESCO Heritage Zone location", "Mixed commercial & residential", "Authentic frescoes & stonework", "High tourist rental yield"],
      ua: ["Зона спадщини ЮНЕСКО", "Змішана комерційно-житлова нерухомість", "Автентичні фрески та кам'яна кладка", "Висока туристична дохідність"],
      ar: ["موقع منطقة التراث العالمي لليونسكو", "مختلط تجاري وسكني", "لوحات جدارية وأعمال حجرية أصيلة", "عائد إيجاري سياحي مرتفع"],
    },
    about: {
      en: "A rare opportunity to own a fully restored 19th-century townhouse in Lviv's UNESCO Heritage Zone. Combining authentic architectural features with modern infrastructure, ideal for boutique hotel or premium offices.",
      ua: "Рідкісна можливість придбати повністю відреставрований таунхаус XIX ст. у зоні спадщини ЮНЕСКО у Львові.",
      ar: "فرصة نادرة لامتلاك تاون هاوس مُرمَّم بالكامل من القرن التاسع عشر في منطقة التراث العالمي لليونسكو في لفيف.",
    },
  },
  {
    slug: "lviv-rynok-boutique", city: "lviv", category: "hotels", verified: true,
    title:       { en: "Boutique Hotel on Rynok Square", ua: "Бутик-готель на Площі Ринок", ar: "فندق بوتيك في ساحة رينوك" },
    location:    { en: "Rynok Sq · Lviv", ua: "Площа Ринок · Львів", ar: "ساحة رينوك · لفيف" },
    fullAddress: { en: "Rynok Square 14, Lviv City Centre", ua: "пл. Ринок 14, Центр Львова", ar: "ساحة رينوك 14، وسط مدينة لفيف" },
    price: 2_400_000, pricePerSqm: 2_609, roi: "8.8%", beds: 0, sqm: 920,
    badge: { en: "ROI 8.8%", ua: "ROI 8.8%", ar: "العائد 8.8%" },
    badgeLabel: { en: "READY · OPERATING", ua: "ГОТОВЕ · ДІЮЧИЙ БІЗНЕС", ar: "جاهز · نشاط تجاري قائم" },
    image: "/images/generated/prop-lviv-rynok-boutique-1.webp",
    thumb: "/images/generated/prop-lviv-rynok-boutique-1.webp",
    highlights: {
      en: ["18 rooms, 92% avg occupancy", "Fully operating business", "Prime Rynok Square address", "Established brand & reviews"],
      ua: ["18 номерів, 92% середня заповнюваність", "Повністю діючий бізнес", "Преміальна адреса на пл. Ринок", "Вже відомий бренд"],
      ar: ["18 غرفة، متوسط إشغال 92٪", "نشاط تجاري يعمل بالكامل", "عنوان مميز في ساحة رينوك", "علامة تجارية وتقييمات راسخة"],
    },
    about: {
      en: "A rare chance to acquire a fully operating boutique hotel in the heart of Lviv's historic Rynok Square. With 18 luxury rooms and consistent 92% occupancy, this is a proven income-generating asset.",
      ua: "Рідкісна можливість придбати повністю діючий бутик-готель у центрі Львова на пл. Ринок.",
      ar: "فرصة نادرة للحصول على فندق بوتيك يعمل بالكامل في قلب ساحة رينوك التاريخية في لفيف.",
    },
  },
];

const HOME_PROPERTIES: Record<Category, AppProperty[]> = {
  apartments: ALL_PROPERTIES.filter(p => p.category === "apartments").slice(0, 2),
  villas:     ALL_PROPERTIES.filter(p => p.category === "villas"),
  commercial: ALL_PROPERTIES.filter(p => p.category === "commercial"),
  hotels:     ALL_PROPERTIES.filter(p => p.category === "hotels"),
};

const TABS: Screen[] = ["home", "explore", "map", "portfolio", "profile"];
const TAB_LABELS: Record<Screen, string> = {
  home: "HOME", explore: "EXPLORE", map: "MAP",
  portfolio: "PORTFOLIO", profile: "PROFILE", welcome: "", property: "", calculator: "",
};

const COUNTRIES  = ["Ukraine", "UAE", "Germany", "Spain"];
const PROP_TYPES = ["Apartment", "Villa", "Hotel", "Commercial"];
const BUDGETS    = ["Under $500k", "$500k–$1M", "$1M–$2M", "$2M+"];
const BEDROOMS   = ["Studio", "1 BR", "2 BR", "3+ BR"];

const T = {
  tagline:     { en: "Global Opportunities. Trusted Investments.", ua: "Глобальні можливості. Надійні інвестиції.", ar: "فرص عالمية. استثمارات موثوقة." },
  signin:      { en: "SIGN IN",            ua: "УВІЙТИ",            ar: "تسجيل الدخول" },
  create:      { en: "CREATE ACCOUNT",     ua: "СТВОРИТИ АКАУНТ",   ar: "إنشاء حساب" },
  apple:       { en: "Sign in with Apple", ua: "Увійти з Apple",    ar: "تسجيل الدخول باستخدام Apple" },
  explore_cta: { en: "Explore Opportunities →", ua: "Ознайомитись →", ar: "استكشاف الفرص ←" },
  good_morning:    { en: "Good morning",      ua: "Доброго ранку",   ar: "صباح الخير" },
  what_invest:     { en: "What are you looking to invest in?", ua: "У що ви бажаєте інвестувати?", ar: "ما الذي تبحث عن الاستثمار فيه؟" },
  categories: {
    apartments: { en: "Apartments",      ua: "Апартаменти", ar: "شقق" },
    commercial: { en: "Commercial",      ua: "Комерція",    ar: "تجاري" },
    hotels:     { en: "Hotels",          ua: "Готелі",      ar: "فنادق" },
    villas:     { en: "Villas & Houses", ua: "Вілли",       ar: "فلل" },
  },
  featured:        { en: "FEATURED",        ua: "РЕКОМЕНДОВАНІ",    ar: "المميزة" },
  view_all:        { en: "View all",        ua: "Дивитись всі",     ar: "عرض الكل" },
  from:            { en: "From",            ua: "Від",              ar: "من" },
  view:            { en: "View →",          ua: "Переглянути →",    ar: "← عرض" },
  close:           { en: "Got it",          ua: "Зрозуміло",        ar: "حسناً" },
  search_ph:       { en: "Search properties, cities, or investments", ua: "Пошук об'єктів, міст, інвестицій", ar: "ابحث عن عقارات أو مدن" },
  search_map_ph:   { en: "Search city or district", ua: "Пошук міста або району", ar: "ابحث عن مدينة أو حي" },
  properties_in:   { en: "properties in",  ua: "об'єктів в",       ar: "عقارات في" },
  properties:      { en: "properties",     ua: "об'єктів",         ar: "عقارات" },
  br:              { en: "BR",             ua: "кімн.",            ar: "غرف" },
  sqm:             { en: "sqm",            ua: "м²",               ar: "م²" },
  ukraine:         { en: "Ukraine",        ua: "Україна",          ar: "أوكرانيا" },
  price_label:     { en: "PRICE",          ua: "ЦІНА",             ar: "السعر" },
  roi_label:       { en: "EXPECTED ROI",   ua: "ОЧІКУВАНИЙ ROI",   ar: "العائد المتوقع" },
  per_sqm:         { en: "/ m²",           ua: "/ м²",             ar: "/ م²" },
  highlights:      { en: "INVESTMENT HIGHLIGHTS", ua: "ПЕРЕВАГИ ІНВЕСТИЦІЇ", ar: "مميزات الاستثمار" },
  about:           { en: "ABOUT THE OPPORTUNITY", ua: "ПРО ОБ'ЄКТ", ar: "عن الفرصة" },
  consult:         { en: "REQUEST CONSULTATION",  ua: "ЗАПИТ НА КОНСУЛЬТАЦІЮ", ar: "طلب استشارة" },
  consult_sent:    { en: "Your consultation request has been sent! Our specialist will contact you within 24 hours.", ua: "Ваш запит відправлено! Наш фахівець зв'яжеться з вами протягом 24 годин.", ar: "تم إرسال طلبك! سيتصل بك أحد متخصصينا خلال 24 ساعة." },
  calc_title:      { en: "Investment Calculator", ua: "Інвестиційний калькулятор", ar: "آلة حاسبة الاستثمار" },
  calc_price:      { en: "PURCHASE PRICE",        ua: "ЦІНА ПОКУПКИ",            ar: "سعر الشراء" },
  calc_rent:       { en: "MONTHLY RENT",           ua: "ЩОМІСЯЧНА ОРЕНДА",        ar: "الإيجار الشهري" },
  calc_expenses:   { en: "ANNUAL EXPENSES",        ua: "РІЧНІ ВИТРАТИ",           ar: "المصاريف السنوية" },
  calc_yield:      { en: "ESTIMATED ANNUAL YIELD", ua: "ОЦІНЮВАНИЙ РІЧНИЙ ДОХІД", ar: "العائد السنوي المقدر" },
  calc_income:     { en: "ANNUAL INCOME",          ua: "РІЧНИЙ ДОХІД",            ar: "الدخل السنوي" },
  calc_net:        { en: "NET INCOME",             ua: "ЧИСТИЙ ДОХІД",            ar: "صافي الدخل" },
  calc_disclaimer: { en: "Calculations are estimates for guidance only and do not constitute guaranteed returns or financial advice.", ua: "Розрахунки є орієнтовними та не є гарантованим прибутком або фінансовою порадою.", ar: "الحسابات تقديرية للتوجيه فقط ولا تشكل ضمانات على العوائد أو نصائح مالية." },
  calc_roi_btn:    { en: "Calculate ROI",          ua: "Розрахувати ROI",         ar: "احسب العائد" },
};

// ─────────────────────────────────────────────────────────────────────────────
export default function MobileAppSimulator() {
  const [appLang, setAppLang]             = useState<Lang>("en");
  const [screen, setScreen]               = useState<Screen>("welcome");
  const [prevScreen, setPrevScreen]       = useState<Screen>("welcome");
  const [category, setCategory]           = useState<Category>("apartments");
  const [modalMsg, setModalMsg]           = useState<string | null>(null);
  const [isLiked, setIsLiked]             = useState(false);
  // Explore
  const [searchQ, setSearchQ]             = useState("");
  const [country, setCountry]             = useState("Ukraine");
  const [openFilter, setOpenFilter]       = useState<string | null>(null);
  const [propType, setPropType]           = useState<string | null>(null);
  const [budget, setBudget]               = useState<string | null>(null);
  // Map
  const [selectedCity, setSelectedCity]   = useState<CityData | null>(null);
  const [mapSearch, setMapSearch]         = useState("");
  // Property detail
  const [currentProperty, setCurrentProperty] = useState<AppProperty | null>(null);
  const [consultSent, setConsultSent]     = useState(false);
  // Calculator state
  const [calcPrice, setCalcPrice]         = useState(500_000);
  const [calcRent, setCalcRent]           = useState(3_000);
  const [calcExpenses, setCalcExpenses]   = useState(5_000);

  // User Authentication & Profile details
  const [authMode, setAuthMode]           = useState<"none" | "signin" | "signup">("none");
  const [userName, setUserName]           = useState("");
  const [userEmail, setUserEmail]         = useState("");
  const [userPhone, setUserPhone]         = useState("");
  const [userPassword, setUserPassword]   = useState("");
  const [currentUser, setCurrentUser]     = useState({
    name: "Walid Dib",
    email: "walid.dib@goldenland.com",
    phone: "+971 50 123 4567",
    avatarUrl: "/images/generated/walid_dib.png"
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;

    const fallbackName = userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const loggedUser = {
      name: fallbackName || "Walid Dib",
      email: userEmail,
      phone: "+971 50 123 4567",
      avatarUrl: "/images/generated/walid_dib.png"
    };

    setCurrentUser(loggedUser);
    setAuthMode("none");
    goTo("home");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Mobile App User Sign In",
          name: loggedUser.name,
          email: loggedUser.email,
          phone: loggedUser.phone,
          lang: appLang,
          message: `User signed in via the Mobile App simulator.`
        })
      });
    } catch (err) {
      console.error("Failed to send login lead:", err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userName) return;

    const newUser = {
      name: userName,
      email: userEmail,
      phone: userPhone || "+380 50 123 4567",
      avatarUrl: "/images/generated/walid_dib.png"
    };

    setCurrentUser(newUser);
    setAuthMode("none");
    goTo("home");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Mobile App User Registration",
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          lang: appLang,
          message: `User signed up/registered via the Mobile App simulator.`
        })
      });
    } catch (err) {
      console.error("Failed to send registration lead:", err);
    }
  };

  const handleAppleSignIn = async () => {
    const appleUser = {
      name: "Apple User",
      email: "apple.user@icloud.com",
      phone: "+1 555 987 6543",
      avatarUrl: "/images/generated/walid_dib.png"
    };
    setCurrentUser(appleUser);
    goTo("home");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Mobile App Apple Sign In",
          name: appleUser.name,
          email: appleUser.email,
          phone: appleUser.phone,
          lang: appLang,
          message: `User signed in using Apple Auth via the Mobile App simulator.`
        })
      });
    } catch (err) {
      console.error("Failed to send Apple login lead:", err);
    }
  };

  const handleRequestConsultation = async () => {
    if (!currentProperty) return;
    setConsultSent(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Property Consultation (Mobile App)",
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          propertyTitle: currentProperty.title[appLang],
          propertyId: currentProperty.slug,
          lang: appLang,
          message: `Consultation request from Mobile App simulator. Property: ${currentProperty.title.en} ($${currentProperty.price.toLocaleString()})`
        })
      });
    } catch (err) {
      console.error("Failed to send lead:", err);
    }
  };

  // ── Leaflet map integration ────────────────────────────────────────────────
  React.useEffect(() => {
    if (screen !== "map") return;

    let cssLink = document.getElementById("leaflet-css") as HTMLLinkElement;
    if (!cssLink) {
      cssLink = document.createElement("link");
      cssLink.id = "leaflet-css";
      cssLink.rel = "stylesheet";
      cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(cssLink);
    }

    let jsScript = document.getElementById("leaflet-js") as HTMLScriptElement;
    if (!jsScript) {
      jsScript = document.createElement("script");
      jsScript.id = "leaflet-js";
      jsScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      jsScript.async = true;
      document.head.appendChild(jsScript);
    }

    let mapInstance: any = null;

    const initMap = () => {
      const L = (window as any).L;
      if (!L) return;

      const mapContainer = document.getElementById("leaflet-map");
      if (!mapContainer) return;

      mapInstance = L.map("leaflet-map", {
        zoomControl: false,
        attributionControl: false,
      }).setView([48.3794, 31.1656], 6);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(mapInstance);

      L.control.zoom({
        position: 'topright'
      }).addTo(mapInstance);

      const citiesCoords: Record<string, [number, number]> = {
        kyiv: [50.4501, 30.5234],
        kozyn: [50.2256, 30.6729],
        odesa: [46.4825, 30.7233],
        lviv: [49.8397, 24.0297],
      };

      filteredCities.forEach(city => {
        const coords = citiesCoords[city.id];
        if (!coords) return;

        const isSelected = selectedCity?.id === city.id;

        const iconHtml = `
          <div class="custom-leaflet-marker transition-all duration-300 transform hover:scale-105 active:scale-95" style="transform: translate(-50%, -50%);">
            <div class="bg-[#1e1c18] text-white border border-[#cfa24d]/20 px-3.5 py-1.5 rounded-full text-[12px] font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <span class="w-1.5 h-1.5 rounded-full bg-[#cfa24d]"></span>
              ${city.name[appLang]} · ${city.count}
            </div>
          </div>
        `;

        const selectedIconHtml = `
          <div class="custom-leaflet-marker transition-all duration-300 transform scale-105" style="transform: translate(-50%, -50%);">
            <div class="bg-[#cfa24d] text-black border-none px-3.5 py-1.5 rounded-full text-[12px] font-bold shadow-[0_0_16px_rgba(207,162,77,.5)] flex items-center gap-1.5 whitespace-nowrap">
              <span class="w-1.5 h-1.5 rounded-full bg-black/50"></span>
              ${city.name[appLang]} · ${city.count}
            </div>
          </div>
        `;

        const markerIcon = L.divIcon({
          className: '',
          html: isSelected ? selectedIconHtml : iconHtml,
          iconSize: [110, 30],
          iconAnchor: [55, 15]
        });

        const marker = L.marker(coords, { icon: markerIcon }).addTo(mapInstance);

        marker.on("click", (e: any) => {
          L.DomEvent.stopPropagation(e);
          setSelectedCity(city);
          mapInstance.setView(coords, 9, { animate: true });
        });
      });

      mapInstance.on("click", () => {
        setSelectedCity(null);
      });

      if (selectedCity) {
        const coords = citiesCoords[selectedCity.id];
        if (coords) {
          mapInstance.setView(coords, 9, { animate: false });
        }
      }
    };

    const handleScriptLoad = () => {
      initMap();
    };

    if ((window as any).L) {
      initMap();
    } else {
      jsScript.addEventListener("load", handleScriptLoad);
    }

    return () => {
      if (jsScript) {
        jsScript.removeEventListener("load", handleScriptLoad);
      }
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, [screen, selectedCity, appLang, mapSearch]);

  // ── navigation ──────────────────────────────────────────────────────────────
  const goTo = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
    setOpenFilter(null);
    setSelectedCity(null);
    setConsultSent(false);
  };

  const goToProperty = (prop: AppProperty) => {
    setPrevScreen(screen);
    setCurrentProperty(prop);
    setIsLiked(false);
    setConsultSent(false);
    setScreen("property");
  };

  const goBack = () => {
    setScreen(prevScreen === "property" ? "home" : prevScreen);
    setSelectedCity(null);
  };

  const handleTabClick = (tab: Screen) => {
    goTo(tab);
  };

  // ── expanded properties to match map counters ──────────────────────────────
  const expandedProperties = useMemo(() => {
    const result: AppProperty[] = [...ALL_PROPERTIES];
    const byCity: Record<string, AppProperty[]> = {};
    ALL_PROPERTIES.forEach(p => {
      if (!byCity[p.city]) byCity[p.city] = [];
      byCity[p.city].push(p);
    });

    CITIES.forEach(city => {
      const currentList = byCity[city.id] || [];
      if (currentList.length === 0) return;
      let index = 0;
      while (result.filter(p => p.city === city.id).length < city.count) {
        const source = currentList[index % currentList.length];
        const copyNum = Math.floor(result.filter(p => p.city === city.id).length / currentList.length) + 1;
        result.push({
          ...source,
          slug: `${source.slug}-copy-${copyNum}`,
          title: {
            en: `${source.title.en} (Unit ${copyNum + 1})`,
            ua: `${source.title.ua} (Блок ${copyNum + 1})`,
            ar: `${source.title.ar} (الوحدة ${copyNum + 1})`,
          },
          price: source.price + (copyNum * 15_000),
        });
        index++;
      }
    });
    return result;
  }, []);

  // ── explore filter ─────────────────────────────────────────────────────────
  const filteredProperties = useMemo(() => {
    const lang = appLang;
    return expandedProperties.filter(p =>
      searchQ === "" ||
      p.title[lang].toLowerCase().includes(searchQ.toLowerCase()) ||
      p.location[lang].toLowerCase().includes(searchQ.toLowerCase())
    );
  }, [searchQ, appLang, expandedProperties]);

  // ── map helpers ────────────────────────────────────────────────────────────
  const cityProperties = useMemo(
    () => selectedCity ? expandedProperties.filter(p => p.city === selectedCity.id) : [],
    [selectedCity, expandedProperties]
  );
  const filteredCities = useMemo(
    () => CITIES.filter(c =>
      mapSearch === "" ||
      c.name.en.toLowerCase().includes(mapSearch.toLowerCase()) ||
      c.name.ua.toLowerCase().includes(mapSearch.toLowerCase())
    ),
    [mapSearch]
  );

  const rtl = appLang === "ar";

  // ── shared bottom tab bar ─────────────────────────────────────────────────
  const TabBar = ({ currentScreen }: { currentScreen: Screen }) => (
    <nav className="absolute bottom-0 left-0 right-0 h-[72px] bg-[#0c0c0b] border-t border-white/5 flex justify-around items-center px-4 z-40">
      {TABS.map(tab => (
        <button key={tab} onClick={() => handleTabClick(tab)}
          className="flex flex-col items-center justify-center relative h-full py-2 bg-transparent border-none cursor-pointer group">
          {tab === currentScreen && (
            <span className="w-1.5 h-1.5 bg-[#cfa24d] rounded-full absolute top-2 shadow-[0_0_8px_#cfa24d]" />
          )}
          <span className={`text-[9.5px] font-bold tracking-[0.14em] transition-colors ${
            tab === currentScreen ? "text-[#cfa24d]" : "text-white/40 group-hover:text-white/75"
          }`}>{TAB_LABELS[tab]}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="fixed inset-0 bg-[#090807] text-white flex flex-col font-sans select-none overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-ui      { font-family: 'Manrope', system-ui, sans-serif; }
        .rtl { direction: rtl; text-align: right; }
        .ltr { direction: ltr; text-align: left;  }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .shadow-text  { text-shadow: 0 2px 4px rgba(0,0,0,.95), 0 4px 12px rgba(0,0,0,.7); }
        @keyframes goldPulse { 0%,100% { box-shadow:0 0 12px rgba(207,162,77,.25); } 50% { box-shadow:0 0 24px rgba(207,162,77,.45); } }
        .glow-btn { animation: goldPulse 3s infinite; }
        @keyframes fadeIn  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { transform:translateY(100%); } to { transform:translateY(0); } }
        @keyframes pulseDot { 0%,100% { transform:scale(1); opacity:.9; } 50% { transform:scale(1.3); opacity:1; } }
        @keyframes heartBeat { 0% { transform:scale(1); } 30% { transform:scale(1.35); } 60% { transform:scale(.9); } 100% { transform:scale(1); } }
        .anim-in       { animation: fadeIn   .35s ease; }
        .anim-slideup  { animation: slideUp  .38s cubic-bezier(.22,1,.36,1); }
        .anim-pin      { animation: pulseDot 2.4s ease-in-out infinite; }
        .anim-heart    { animation: heartBeat .4s ease; }
        .map-bg {
          background-color: #e8e5de;
          background-image: linear-gradient(rgba(120,110,90,.08) 1px, transparent 1px), linear-gradient(90deg,rgba(120,110,90,.08) 1px,transparent 1px);
          background-size: 32px 32px;
        }
        .map-road-h { background:linear-gradient(to right,transparent,rgba(255,255,255,.65) 20%,rgba(255,255,255,.65) 80%,transparent); height:2px; }
        .map-road-v { background:linear-gradient(to bottom,transparent,rgba(255,255,255,.55) 20%,rgba(255,255,255,.55) 80%,transparent); width:2px; }
        .leaflet-div-icon {
          background: none !important;
          border: none !important;
        }
      `}</style>

      {/* ── App viewport ── */}
      <div className={`flex-1 flex flex-col relative bg-[#090807] overflow-hidden font-ui w-full h-full ${rtl ? "rtl" : "ltr"}`}>

            {/* ══════════════════════════════════════════
                WELCOME
            ══════════════════════════════════════════ */}
            {screen === "welcome" && (
              <div className="absolute inset-0 flex flex-col justify-between p-8 text-center bg-cover bg-center z-10 anim-in"
                style={{ backgroundImage: "url('/images/burj_khalifa_bg.png')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/92 z-0" />
                <div className="absolute inset-5 border border-[#cfa24d]/10 pointer-events-none z-10" />
                <div className="relative z-10 flex flex-col items-center pt-14">
                  <div className="mb-5 hover:scale-105 transition-transform duration-500">
                    <img src="/images/logo-golden-land.png" alt="Golden Land Logo" className="h-28 w-28 object-contain" />
                  </div>
                  <h1 className="font-display font-medium text-[35px] tracking-[0.25em] text-[#cfa24d] uppercase leading-none shadow-text">GOLDEN LAND</h1>
                  <p className="text-[9px] tracking-[0.38em] text-[#cfa24d]/90 uppercase mt-2.5 font-bold shadow-text">
                    {rtl ? "العقارات والاستثمار" : "PROPERTY INVESTMENT"}
                  </p>
                  <p className="text-[12px] text-white/90 font-medium mt-4 px-2 max-w-[280px] shadow-text">{T.tagline[appLang]}</p>
                </div>
                <div className="relative z-10 flex flex-col items-center gap-3 pb-8">
                  <button onClick={() => setAuthMode("signin")} className="w-full bg-[#cfa24d] hover:bg-white text-black font-semibold text-[13px] uppercase tracking-widest py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer border-none glow-btn active:scale-[0.98]">{T.signin[appLang]}</button>
                  <button onClick={() => setAuthMode("signup")} className="w-full bg-transparent border border-[#cfa24d]/40 hover:border-[#cfa24d]/80 text-white font-semibold text-[12px] uppercase tracking-widest py-3.5 rounded-full transition-all cursor-pointer outline-none active:scale-[0.98]">{T.create[appLang]}</button>
                  <button onClick={handleAppleSignIn} className="w-full bg-white hover:bg-[#f5f5f7] text-black font-semibold text-[13px] flex items-center justify-center gap-2 py-3.5 rounded-full transition-all cursor-pointer border-none outline-none active:scale-[0.98]">
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.52-.63.73-1.18 1.9-1.04 3.01 1.12.09 2.27-.61 2.99-1.47z" /></svg>
                    <span>{T.apple[appLang]}</span>
                  </button>
                  <button onClick={() => goTo("explore")} className="text-[#cfa24d] hover:text-white transition-colors text-[11px] font-semibold uppercase tracking-widest mt-4 cursor-pointer bg-transparent border-none outline-none shadow-text">{T.explore_cta[appLang]}</button>
                </div>

                {/* Auth Overlay Sheet */}
                {authMode !== "none" && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-30 flex items-end justify-center anim-in">
                    <form onSubmit={authMode === "signin" ? handleSignIn : handleRegister}
                      className="w-full bg-[#141210] border-t border-[#cfa24d]/20 rounded-t-3xl p-6 shadow-2xl text-left anim-slideup"
                      onClick={e => e.stopPropagation()}>
                      <h3 className="font-display font-light text-[24px] text-[#cfa24d] mb-5 tracking-wide text-center">
                        {authMode === "signin"
                          ? (appLang === "ar" ? "تسجيل الدخول" : appLang === "ua" ? "Вхід в акаунт" : "Sign In")
                          : (appLang === "ar" ? "إنشاء حساب" : appLang === "ua" ? "Реєстрація" : "Create Account")
                        }
                      </h3>

                      {authMode === "signup" && (
                        <div className="mb-4">
                          <label className="text-[9px] font-bold tracking-wider text-white/50 block mb-1">
                            {appLang === "ar" ? "الاسم الكامل" : appLang === "ua" ? "ПОВНЕ ІМ'Я" : "FULL NAME"}
                          </label>
                          <input type="text" required value={userName} onChange={e => setUserName(e.target.value)}
                            placeholder="e.g. Walid Dib"
                            className="w-full bg-[#1d1b18] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-[#cfa24d]/40" />
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="text-[9px] font-bold tracking-wider text-white/50 block mb-1">
                          {appLang === "ar" ? "البريد الإلكتروني" : appLang === "ua" ? "ЕЛЕКТРОННА ПОШТА" : "EMAIL ADDRESS"}
                        </label>
                        <input type="email" required value={userEmail} onChange={e => setUserEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#1d1b18] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-[#cfa24d]/40" />
                      </div>

                      {authMode === "signup" && (
                        <div className="mb-4">
                          <label className="text-[9px] font-bold tracking-wider text-white/50 block mb-1">
                            {appLang === "ar" ? "رقم الهاتف" : appLang === "ua" ? "НОМЕР ТЕЛЕФОНУ" : "PHONE NUMBER"}
                          </label>
                          <input type="tel" required value={userPhone} onChange={e => setUserPhone(e.target.value)}
                            placeholder="+971 50 123 4567"
                            className="w-full bg-[#1d1b18] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-[#cfa24d]/40" />
                        </div>
                      )}

                      <div className="mb-5">
                        <label className="text-[9px] font-bold tracking-wider text-white/50 block mb-1">
                          {appLang === "ar" ? "كلمة المرور" : appLang === "ua" ? "ПАРОЛЬ" : "PASSWORD"}
                        </label>
                        <input type="password" required value={userPassword} onChange={e => setUserPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-[#1d1b18] border border-white/10 rounded-xl px-4 py-3 text-white text-[14px] outline-none focus:border-[#cfa24d]/40" />
                      </div>

                      <div className="flex flex-col gap-3">
                        <button type="submit"
                          className="w-full bg-[#cfa24d] hover:bg-[#d4aa5a] text-black font-semibold text-[13px] uppercase tracking-widest py-3.5 rounded-full transition-all cursor-pointer border-none active:scale-[0.98]">
                          {authMode === "signin"
                            ? (appLang === "ar" ? "دخول" : appLang === "ua" ? "Увійти" : "Log In")
                            : (appLang === "ar" ? "تسجيل" : appLang === "ua" ? "Зареєструватися" : "Register")
                          }
                        </button>
                        <button type="button" onClick={() => setAuthMode("none")}
                          className="w-full bg-transparent hover:bg-white/5 text-white/60 text-[12px] font-semibold tracking-wider py-3 rounded-full transition-colors border-none cursor-pointer">
                          {appLang === "ar" ? "إلغاء" : appLang === "ua" ? "Скасувати" : "Cancel"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ══════════════════════════════════════════
                HOME
            ══════════════════════════════════════════ */}
            {screen === "home" && (
              <div className="flex-1 flex flex-col anim-in overflow-y-auto no-scrollbar pb-[72px]">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="text-[11px] text-white/50 tracking-wide font-light">{T.good_morning[appLang]}</span>
                      <h2 className="font-display font-medium text-[23px] text-white tracking-wide mt-0.5">{rtl ? "وليد ديب" : "Walid Dib"}</h2>
                    </div>
                    <div onClick={() => goTo("profile")}
                      className="w-10 h-10 rounded-full border border-[#cfa24d]/30 overflow-hidden cursor-pointer shrink-0 hover:border-[#cfa24d]/60 transition-colors">
                      <img src="/images/generated/walid_dib.png" alt="Walid" className="w-full h-full object-cover object-top" />
                    </div>
                  </div>
                  <h3 className="font-display font-light text-[28px] text-white leading-tight tracking-wide mb-6">{T.what_invest[appLang]}</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {(["apartments", "commercial", "hotels", "villas"] as Category[]).map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transition-all cursor-pointer outline-none border ${
                          category === cat ? "bg-[#cfa24d] border-[#cfa24d] text-black" : "bg-transparent border-white/15 hover:border-white/30 text-white/90"
                        }`}>{T.categories[cat][appLang]}</button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] text-white/50 tracking-widest uppercase font-bold">{T.featured[appLang]}</span>
                    <button onClick={() => goTo("explore")} className="text-[11px] text-[#cfa24d] hover:underline uppercase tracking-wider bg-transparent border-none cursor-pointer font-semibold">{T.view_all[appLang]}</button>
                  </div>
                  <div className="space-y-5">
                    {(HOME_PROPERTIES[category] || []).map(p => (
                      <div key={p.slug} onClick={() => goToProperty(p)}
                        className="bg-[#171614] border border-white/5 rounded-[22px] overflow-hidden hover:border-[#cfa24d]/25 transition-all cursor-pointer">
                        <div className="h-[170px] w-full relative">
                          <img src={p.image} alt={p.title[appLang]} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-transparent to-transparent" />
                          <span className={`absolute top-3 ${rtl ? "left-3" : "right-3"} text-[9.5px] font-semibold bg-black/60 backdrop-blur-md text-[#cfa24d] px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#cfa24d]/15`}>{p.badge[appLang]}</span>
                        </div>
                        <div className="p-5">
                          <h4 className="font-display font-light text-[21px] text-white leading-snug">{p.title[appLang]}</h4>
                          <p className="text-[11px] text-white/45 font-light mt-1">{p.location[appLang]}</p>
                          <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-4">
                            <span className="text-[15px] font-bold text-white">{T.from[appLang]} ${p.price.toLocaleString("en-US")}</span>
                            <span className="text-[11px] text-[#cfa24d] font-bold uppercase tracking-wider">{T.view[appLang]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <TabBar currentScreen="home" />
              </div>
            )}

            {/* ══════════════════════════════════════════
                EXPLORE
            ══════════════════════════════════════════ */}
            {screen === "explore" && (
              <div className="flex-1 flex flex-col anim-in overflow-y-auto no-scrollbar pb-[72px]">
                <div className="p-6">
                  <h2 className="font-display font-light text-[34px] text-white tracking-wide mb-5">Explore</h2>
                  <div className="flex items-center gap-3 bg-[#161412] border border-white/8 rounded-2xl px-4 py-3.5 mb-5">
                    <Search className="w-4 h-4 text-white/35 shrink-0" />
                    <input type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder={T.search_ph[appLang]}
                      className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/30 outline-none font-light" />
                    {searchQ && <button onClick={() => setSearchQ("")} className="bg-transparent border-none cursor-pointer"><X className="w-4 h-4 text-white/40" /></button>}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <div className="relative">
                      <button onClick={() => setOpenFilter(openFilter === "country" ? null : "country")} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#cfa24d] bg-[#cfa24d]/10 text-[#cfa24d] text-[12px] font-semibold cursor-pointer">
                        {country} <ChevronDown className="w-3 h-3" />
                      </button>
                      {openFilter === "country" && (
                        <div className="absolute top-full mt-1 left-0 bg-[#1a1916] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl min-w-[130px]">
                          {COUNTRIES.map(c => <button key={c} onClick={() => { setCountry(c); setOpenFilter(null); }} className={`w-full text-left px-4 py-2.5 text-[12px] cursor-pointer border-none ${c === country ? "text-[#cfa24d] bg-[#cfa24d]/10" : "text-white/70 hover:bg-white/5"}`}>{c}</button>)}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <button onClick={() => setOpenFilter(openFilter === "type" ? null : "type")} className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[12px] font-semibold cursor-pointer ${propType ? "border-[#cfa24d] bg-[#cfa24d]/10 text-[#cfa24d]" : "border-white/15 text-white/70 hover:border-white/30"}`}>
                        {propType || "Type"} <ChevronDown className="w-3 h-3" />
                      </button>
                      {openFilter === "type" && (
                        <div className="absolute top-full mt-1 left-0 bg-[#1a1916] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl min-w-[140px]">
                          <button onClick={() => { setPropType(null); setOpenFilter(null); }} className="w-full text-left px-4 py-2.5 text-[12px] cursor-pointer border-none text-white/40 hover:bg-white/5">Any type</button>
                          {PROP_TYPES.map(t => <button key={t} onClick={() => { setPropType(t); setOpenFilter(null); }} className={`w-full text-left px-4 py-2.5 text-[12px] cursor-pointer border-none ${t === propType ? "text-[#cfa24d] bg-[#cfa24d]/10" : "text-white/70 hover:bg-white/5"}`}>{t}</button>)}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <button onClick={() => setOpenFilter(openFilter === "budget" ? null : "budget")} className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-[12px] font-semibold cursor-pointer ${budget ? "border-[#cfa24d] bg-[#cfa24d]/10 text-[#cfa24d]" : "border-white/15 text-white/70 hover:border-white/30"}`}>
                        {budget || "Budget"} <ChevronDown className="w-3 h-3" />
                      </button>
                      {openFilter === "budget" && (
                        <div className="absolute top-full mt-1 left-0 bg-[#1a1916] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl min-w-[155px]">
                          <button onClick={() => { setBudget(null); setOpenFilter(null); }} className="w-full text-left px-4 py-2.5 text-[12px] cursor-pointer border-none text-white/40 hover:bg-white/5">Any budget</button>
                          {BUDGETS.map(b => <button key={b} onClick={() => { setBudget(b); setOpenFilter(null); }} className={`w-full text-left px-4 py-2.5 text-[12px] cursor-pointer border-none ${b === budget ? "text-[#cfa24d] bg-[#cfa24d]/10" : "text-white/70 hover:bg-white/5"}`}>{b}</button>)}
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      <button onClick={() => setOpenFilter(openFilter === "beds" ? null : "beds")} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-white/70 hover:border-white/30 text-[12px] font-semibold cursor-pointer">
                        Bedrooms <ChevronDown className="w-3 h-3" />
                      </button>
                      {openFilter === "beds" && (
                        <div className="absolute top-full mt-1 left-0 bg-[#1a1916] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl min-w-[130px]">
                          {BEDROOMS.map(b => <button key={b} onClick={() => setOpenFilter(null)} className="w-full text-left px-4 py-2.5 text-[12px] cursor-pointer border-none text-white/70 hover:bg-white/5">{b}</button>)}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-[13px] text-white/55 mb-5 font-light">{filteredProperties.length} {T.properties_in[appLang]} {country}</p>
                  <div className="space-y-3">
                    {filteredProperties.map(p => (
                      <div key={p.slug} onClick={() => goToProperty(p)}
                        className="flex items-center gap-4 bg-[#161412] border border-white/5 rounded-2xl p-3.5 hover:border-[#cfa24d]/20 transition-all cursor-pointer">
                        <div className="w-[78px] h-[78px] rounded-[14px] overflow-hidden shrink-0 bg-[#222]">
                          <img src={p.thumb} alt={p.title[appLang]} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-ui font-semibold text-[14px] text-white leading-tight mb-1 truncate pr-1">{p.title[appLang]}</h4>
                          <p className="text-[11px] text-white/45 font-light">{p.location[appLang]}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-[15px] font-bold text-[#cfa24d]">${p.price.toLocaleString("en-US")}</p>
                          {p.beds > 0
                            ? <p className="text-[10px] text-white/35 mt-0.5">{p.beds} {T.br[appLang]} · {p.sqm} {T.sqm[appLang]}</p>
                            : <p className="text-[10px] text-white/35 mt-0.5">{p.sqm} {T.sqm[appLang]}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <TabBar currentScreen="explore" />
              </div>
            )}

            {/* ══════════════════════════════════════════
                MAP
            ══════════════════════════════════════════ */}
            {screen === "map" && (
              <div className="flex-1 flex flex-col anim-in relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 z-30 p-4">
                  <div className="flex items-center gap-3 bg-[#1a1815]/95 backdrop-blur-md border border-white/8 rounded-2xl px-4 py-3.5 shadow-lg">
                    <Search className="w-4 h-4 text-white/40 shrink-0" />
                    <input type="text" value={mapSearch} onChange={e => setMapSearch(e.target.value)} placeholder={T.search_map_ph[appLang]}
                      className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/30 outline-none font-light" />
                    {mapSearch && <button onClick={() => setMapSearch("")} className="bg-transparent border-none cursor-pointer"><X className="w-4 h-4 text-white/40" /></button>}
                  </div>
                </div>
                <div id="leaflet-map" className="absolute inset-0 z-0 bg-[#161412]" />
                {selectedCity && (
                  <div className="absolute bottom-[72px] left-0 right-0 bg-[#141210] border-t border-[#cfa24d]/15 rounded-t-3xl z-20 anim-slideup shadow-[0_-8px_30px_rgba(0,0,0,.6)]">
                    <div className="flex justify-center pt-3 pb-4"><div className="w-10 h-1 bg-white/20 rounded-full" /></div>
                    <div className="px-5 pb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-display font-light text-[24px] text-white">{selectedCity.name[appLang]}, {T.ukraine[appLang]}</h3>
                        <span className="text-[12px] text-[#cfa24d] font-bold">{selectedCity.count} {T.properties[appLang]}</span>
                      </div>
                      <div className="space-y-3">
                        {cityProperties.map(p => (
                          <button key={p.slug} onClick={() => goToProperty(p)}
                            className="w-full flex items-center gap-3.5 bg-[#1e1b17] hover:bg-[#252118] border border-white/5 hover:border-[#cfa24d]/20 rounded-2xl p-3 text-left transition-all cursor-pointer">
                            <div className="w-[56px] h-[56px] rounded-xl overflow-hidden shrink-0"><img src={p.thumb} alt={p.title[appLang]} className="w-full h-full object-cover" /></div>
                            <div className="flex-1 min-w-0">
                              <p className="font-ui font-semibold text-[13.5px] text-white leading-tight truncate">{p.title[appLang]}</p>
                              <p className="text-[11px] text-white/45 font-light mt-0.5">{T.from[appLang]} ${p.price.toLocaleString("en-US")} · ROI {p.roi}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#cfa24d] shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <TabBar currentScreen="map" />
              </div>
            )}

            {/* ══════════════════════════════════════════
                PROPERTY DETAIL
            ══════════════════════════════════════════ */}
            {screen === "property" && currentProperty && (
              <div className="flex-1 flex flex-col anim-in overflow-y-auto no-scrollbar pb-[90px]">
                {/* ── Hero image ── */}
                <div className="relative w-full h-[240px] shrink-0">
                  <img src={currentProperty.image} alt={currentProperty.title[appLang]} className="w-full h-full object-cover" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                  {/* Back button */}
                  <button onClick={goBack}
                    className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all border-none">
                    <ArrowLeft className="w-4 h-4 text-white" />
                  </button>
                  {/* Heart + Share buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => setIsLiked(!isLiked)}
                      className={`w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all border-none ${isLiked ? "anim-heart" : ""}`}>
                      <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </button>
                    <button onClick={() => setModalMsg("Share link copied to clipboard!")}
                      className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-all border-none">
                      <Share2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* ── Content ── */}
                <div className="flex-1 bg-[#0e0d0b] px-5 pt-5 pb-6">
                  {/* Badge */}
                  <span className="inline-flex items-center text-[9.5px] font-bold tracking-widest uppercase border border-[#cfa24d]/40 text-[#cfa24d] px-3 py-1 rounded-full mb-4">
                    {currentProperty.badgeLabel[appLang]}
                  </span>

                  {/* Title */}
                  <h2 className="font-display font-light text-[28px] text-white leading-tight tracking-wide mb-2">
                    {currentProperty.title[appLang]}
                  </h2>

                  {/* Address */}
                  <p className="text-[12px] text-white/45 font-light mb-5">{currentProperty.fullAddress[appLang]}</p>

                  {/* Price + ROI cards */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#1a1713] border border-white/5 rounded-2xl p-4">
                      <p className="text-[20px] font-bold text-[#cfa24d] leading-none mb-1">
                        ${currentProperty.price.toLocaleString("en-US")}
                      </p>
                      <p className="text-[9.5px] text-white/40 uppercase tracking-widest font-semibold">
                        {T.price_label[appLang]} · ${currentProperty.pricePerSqm.toLocaleString("en-US")} {T.per_sqm[appLang]}
                      </p>
                    </div>
                    <div className="bg-[#1a1713] border border-white/5 rounded-2xl p-4">
                      <p className="text-[20px] font-bold text-[#cfa24d] leading-none mb-1">{currentProperty.roi}</p>
                      <p className="text-[9.5px] text-white/40 uppercase tracking-widest font-semibold">{T.roi_label[appLang]}</p>
                    </div>
                  </div>

                  {/* Investment Highlights */}
                  <p className="text-[9.5px] font-bold tracking-[0.18em] text-[#cfa24d] uppercase mb-3">{T.highlights[appLang]}</p>
                  <div className="space-y-2 mb-6">
                    {currentProperty.highlights[appLang].map((h, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#cfa24d]/15 border border-[#cfa24d]/30 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#cfa24d]" />
                        </div>
                        <span className="text-[13px] text-white/85 font-light">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* About */}
                  <p className="text-[9.5px] font-bold tracking-[0.18em] text-[#cfa24d] uppercase mb-3">{T.about[appLang]}</p>
                  <p className="text-[12.5px] text-white/65 font-light leading-relaxed mb-6">{currentProperty.about[appLang]}</p>

                  {/* Calculate ROI button */}
                  <button
                    onClick={() => {
                      setCalcPrice(currentProperty.price);
                      setCalcRent(Math.round(currentProperty.price * parseFloat(currentProperty.roi) / 100 / 12));
                      setCalcExpenses(Math.round(currentProperty.price * 0.01));
                      goTo("calculator");
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-[#cfa24d]/30 text-white/70 hover:text-[#cfa24d] text-[12px] font-semibold tracking-wider py-3.5 rounded-full transition-all cursor-pointer">
                    <Calculator className="w-4 h-4" />
                    {T.calc_roi_btn[appLang]}
                  </button>
                </div>

                {/* ── Floating CTA bar ── */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0e0d0b]/95 backdrop-blur-md border-t border-white/5 px-5 py-4 z-40">
                  {consultSent ? (
                    <div className="flex items-center justify-center gap-2 py-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-[12px] text-green-400 font-semibold">Request sent! We'll contact you within 24h.</span>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button onClick={handleRequestConsultation}
                        className="flex-1 bg-[#cfa24d] hover:bg-[#d4aa5a] text-black font-bold text-[12px] uppercase tracking-[0.18em] py-4 rounded-full transition-all cursor-pointer border-none glow-btn active:scale-[0.98]">
                        {T.consult[appLang]}
                      </button>
                      <button onClick={() => setIsLiked(!isLiked)}
                        className={`w-14 rounded-full border flex items-center justify-center cursor-pointer transition-all border-none ${isLiked ? "bg-red-500/15 border-red-500/30" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
                        <Heart className={`w-5 h-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white/60"}`} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ══════════════════════════════════════════
                CALCULATOR
            ══════════════════════════════════════════ */}
            {screen === "calculator" && (() => {
              const annualIncome = calcRent * 12;
              const netIncome    = annualIncome - calcExpenses;
              const yieldPct     = calcPrice > 0 ? (netIncome / calcPrice) * 100 : 0;

              const fmtNum = (n: number) =>
                n.toLocaleString("en-US", { maximumFractionDigits: 0 });

              const CalcField = ({
                label, value, unit, onChange,
              }: { label: string; value: number; unit: string; onChange: (v: number) => void }) => (
                <div className="mb-5">
                  <p className="text-[9.5px] font-bold tracking-[0.2em] text-white/50 uppercase mb-2">{label}</p>
                  <div className="flex items-center bg-[#161412] border border-white/6 rounded-2xl px-4 py-3.5">
                    <span className="text-[18px] font-bold text-white mr-1">$</span>
                    <input
                      type="number"
                      value={value}
                      onChange={e => onChange(Math.max(0, parseInt(e.target.value) || 0))}
                      className="flex-1 bg-transparent text-[18px] font-bold text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-[11px] text-white/35 font-semibold tracking-wider shrink-0 ml-2">{unit}</span>
                  </div>
                </div>
              );

              return (
                <div className="flex-1 flex flex-col anim-in overflow-y-auto no-scrollbar">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <button onClick={goBack}
                        className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/12 flex items-center justify-center cursor-pointer border-none transition-all shrink-0">
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </button>
                      <h2 className="font-display font-light text-[26px] text-white tracking-wide">
                        {T.calc_title[appLang]}
                      </h2>
                    </div>

                    {/* Inputs */}
                    <CalcField label={T.calc_price[appLang]}    value={calcPrice}    unit="USD"       onChange={setCalcPrice} />
                    <CalcField label={T.calc_rent[appLang]}     value={calcRent}     unit="USD / MO"  onChange={setCalcRent} />
                    <CalcField label={T.calc_expenses[appLang]} value={calcExpenses} unit="USD / YR"  onChange={setCalcExpenses} />

                    {/* Results card */}
                    <div className="bg-[#131108] border border-[#cfa24d]/15 rounded-3xl p-6 mb-5">
                      <p className="text-[9.5px] font-bold tracking-[0.2em] text-[#cfa24d]/70 uppercase text-center mb-3">
                        {T.calc_yield[appLang]}
                      </p>
                      <p className="font-display font-light text-[52px] text-[#cfa24d] text-center leading-none mb-5">
                        {yieldPct.toFixed(1)}%
                      </p>
                      <div className="flex">
                        <div className="flex-1 text-center">
                          <p className="text-[17px] font-bold text-white mb-1">${fmtNum(annualIncome)}</p>
                          <p className="text-[9px] font-bold tracking-[0.18em] text-white/40 uppercase">{T.calc_income[appLang]}</p>
                        </div>
                        <div className="w-px bg-white/10 mx-3" />
                        <div className="flex-1 text-center">
                          <p className={`text-[17px] font-bold mb-1 ${netIncome >= 0 ? "text-white" : "text-red-400"}`}>${fmtNum(netIncome)}</p>
                          <p className="text-[9px] font-bold tracking-[0.18em] text-white/40 uppercase">{T.calc_net[appLang]}</p>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer */}
                    <p className="text-[10px] text-white/30 font-light text-center leading-relaxed px-2">
                      {T.calc_disclaimer[appLang]}
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* ══════════════════════════════════════════
                PORTFOLIO
            ══════════════════════════════════════════ */}
            {screen === "portfolio" && (() => {
              const holdings = [
                {
                  slug: "kyiv-podil-loft",
                  title: { en: "Historic Loft in Podil",       ua: "Лофт у Подолі",           ar: "شقة تاريخية في بوديل" },
                  invested: 620_000,
                  status: { en: "ACTIVE",   ua: "АКТИВНИЙ",  ar: "نشط" },
                  statusGold: true,
                  thumb: "/images/generated/thumb_kyiv_loft.png",
                  property: ALL_PROPERTIES.find(p => p.slug === "kyiv-podil-loft")!,
                },
                {
                  slug: "odesa-sea-view-apt",
                  title: { en: "Sea View Apartment, Arkadia", ua: "Апартаменти Аркадія",      ar: "شقة إطلالة بحرية، أركاديا" },
                  invested: 385_000,
                  status: { en: "OFF-PLAN", ua: "ОФФ-ПЛАН",  ar: "خطة المشروع" },
                  statusGold: false,
                  thumb: "/images/generated/thumb_odesa_apartment.png",
                  property: ALL_PROPERTIES.find(p => p.slug === "odesa-sea-view-apt")!,
                },
              ];
              const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
              const menuItems = [
                { en: "Documents",      ua: "Документи",       ar: "المستندات" },
                { en: "Rental income",  ua: "Дохід з оренди",  ar: "دخل الإيجار" },
                { en: "Property updates", ua: "Оновлення по об'єктах", ar: "تحديثات العقارات" },
              ];
              return (
                <div className="flex-1 flex flex-col anim-in overflow-y-auto no-scrollbar pb-[72px]">
                  <div className="p-6">
                    {/* Title */}
                    <h2 className="font-display font-light text-[34px] text-white tracking-wide mb-5">
                      {appLang === "ar" ? "محفظتي" : appLang === "ua" ? "Мій портфель" : "My Portfolio"}
                    </h2>

                    {/* Total Invested card */}
                    <div className="bg-[#151210] border border-[#cfa24d]/20 rounded-2xl p-5 mb-7">
                      <p className="text-[9.5px] font-bold tracking-[0.2em] text-white/45 uppercase mb-3">
                        {appLang === "ar" ? "إجمالي المستثمر" : appLang === "ua" ? "ЗАГАЛЬНІ ІНВЕСТИЦІЇ" : "TOTAL INVESTED"}
                      </p>
                      <p className="text-[32px] font-bold text-white leading-none mb-2">
                        ${totalInvested.toLocaleString("en-US")}
                      </p>
                      <p className="text-[12px] text-[#cfa24d] font-semibold">
                        {appLang === "ar" ? "كييف وأوديسا" : appLang === "ua" ? "Київ та Одеса" : "Kyiv & Odesa"}
                        {" · "}
                        {holdings.length}{" "}
                        {appLang === "ar" ? "أصول" : appLang === "ua" ? "активи" : "assets"}
                      </p>
                    </div>

                    {/* Holdings */}
                    <p className="text-[9.5px] font-bold tracking-[0.2em] text-white/45 uppercase mb-4">
                      {appLang === "ar" ? "الممتلكات" : appLang === "ua" ? "ПОРТФЕЛЬ" : "HOLDINGS"}
                    </p>
                    <div className="space-y-3 mb-6">
                      {holdings.map(h => (
                        <div key={h.slug}
                          onClick={() => h.property && goToProperty(h.property)}
                          className="flex items-center gap-4 bg-[#161412] border border-white/5 rounded-2xl p-3.5 hover:border-[#cfa24d]/20 transition-all cursor-pointer">
                          <div className="w-[64px] h-[64px] rounded-xl overflow-hidden shrink-0 bg-[#222]">
                            <img src={h.thumb} alt={h.title[appLang]} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-ui font-semibold text-[14px] text-white leading-tight mb-1">{h.title[appLang]}</p>
                            <p className="text-[11px] text-white/40 font-light">
                              {appLang === "ar" ? "مستثمر" : appLang === "ua" ? "Інвестовано" : "Invested"}{" "}
                              ${h.invested.toLocaleString("en-US")}
                            </p>
                          </div>
                          <span className={`text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full border shrink-0 ${
                            h.statusGold
                              ? "border-[#cfa24d]/50 text-[#cfa24d]"
                              : "border-white/20 text-white/55"
                          }`}>
                            {h.status[appLang]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Menu rows */}
                    <div className="bg-[#161412] border border-white/5 rounded-2xl overflow-hidden">
                      {menuItems.map((item, i) => (
                        <button key={i}
                          onClick={() => setModalMsg(`${item.en} section coming soon — send the screenshot!`)}
                          className={`w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer bg-transparent border-none hover:bg-white/4 transition-colors ${
                            i < menuItems.length - 1 ? "border-b border-white/5" : ""
                          }`}>
                          <span className="text-[14px] font-semibold text-white/85">{item[appLang]}</span>
                          <ChevronRight className="w-4 h-4 text-white/30" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <TabBar currentScreen="portfolio" />
                </div>
              );
            })()}

            {/* ══════════════════════════════════════════
                PROFILE
            ══════════════════════════════════════════ */}
            {screen === "profile" && (() => {
              const profileMenuItems = [
                {
                  section: { en: "Account Settings", ua: "Налаштування акаунту", ar: "إعدادات الحساب" },
                  items: [
                    { label: { en: "Personal Information", ua: "Особиста інформація", ar: "معلومات شخصية" }, action: () => setModalMsg("Personal Information editing coming soon!") },
                    { label: { en: "Investor Questionnaire", ua: "Анкета інвестора", ar: "استبيان المستثمر" }, action: () => setModalMsg("Investor questionnaire coming soon!") },
                  ]
                },
                {
                  section: { en: "Preferences", ua: "Параметри", ar: "التفضيلات" },
                  items: [
                    { label: { en: "Notifications", ua: "Сповіщення", ar: "الإشعارات" }, action: () => setModalMsg("Notifications preferences coming soon!") },
                  ]
                },
                {
                  section: { en: "Support & Legal", ua: "Підтримка та правова інформація", ar: "الدعم والقانوني" },
                  items: [
                    { label: { en: "Contact Advisor", ua: "Зв'язатися з радником", ar: "اتصل بالمستشار" }, action: () => setModalMsg("Advisor chat coming soon!") },
                    { label: { en: "Privacy Policy", ua: "Політика конфіденційності", ar: "سياسة الخصوصية" }, action: () => setModalMsg("Privacy Policy text coming soon!") },
                  ]
                }
              ];

              return (
                <div className="flex-1 flex flex-col anim-in overflow-y-auto no-scrollbar pb-[72px]">
                  <div className="p-6">
                    {/* Header */}
                    <h2 className="font-display font-light text-[34px] text-white tracking-wide mb-5">
                      {appLang === "ar" ? "الملف الشخصي" : appLang === "ua" ? "Профіль" : "Profile"}
                    </h2>

                    {/* User Info Card */}
                    <div className="bg-[#151210] border border-[#cfa24d]/20 rounded-3xl p-5 mb-6 text-center">
                      <div className="w-20 h-20 rounded-full border-2 border-[#cfa24d]/50 overflow-hidden mx-auto mb-3 shadow-[0_0_15px_rgba(207,162,77,0.25)]">
                        <img src="/images/generated/walid_dib.png" alt="Walid" className="w-full h-full object-cover object-top" />
                      </div>
                      <h3 className="font-display font-light text-[24px] text-white tracking-wide">
                        {rtl ? "وليد ديب" : "Walid Dib"}
                      </h3>
                      <p className="text-[12px] text-white/40 font-light mb-4">walid.dib@goldenland.com</p>
                      
                      <span className="inline-flex items-center text-[9px] font-bold tracking-[0.2em] bg-[#cfa24d]/10 text-[#cfa24d] border border-[#cfa24d]/20 px-4 py-1.5 rounded-full uppercase">
                        {appLang === "ar" ? "مستثمر بلاتيني" : appLang === "ua" ? "ПЛАТИНОВИЙ ІНВЕСТОР" : "PLATINUM INVESTOR"}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2.5 mb-6">
                      <div className="bg-[#161412] border border-white/5 rounded-2xl p-3 text-center">
                        <p className="text-[15px] font-bold text-[#cfa24d]">2</p>
                        <p className="text-[9px] text-white/40 uppercase tracking-wider font-semibold mt-1">
                          {appLang === "ar" ? "أصول" : appLang === "ua" ? "активи" : "Assets"}
                        </p>
                      </div>
                      <div className="bg-[#161412] border border-white/5 rounded-2xl p-3 text-center col-span-2">
                        <p className="text-[15px] font-bold text-white">$1,005,000</p>
                        <p className="text-[9px] text-white/40 uppercase tracking-wider font-semibold mt-1">
                          {appLang === "ar" ? "إجمالي المستثمر" : appLang === "ua" ? "ІНВЕСТОВАНО" : "Total Invested"}
                        </p>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="space-y-6 mb-6">
                      {profileMenuItems.map((sect, i) => (
                        <div key={i}>
                          <p className="text-[9.5px] font-bold tracking-[0.2em] text-white/45 uppercase mb-3">
                            {sect.section[appLang]}
                          </p>
                          <div className="bg-[#161412] border border-white/5 rounded-2xl overflow-hidden">
                            {sect.items.map((item, j) => (
                              <button key={j}
                                onClick={item.action}
                                className={`w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer bg-transparent border-[#161412] hover:bg-white/4 transition-colors ${
                                  j < sect.items.length - 1 ? "border-b border-white/5" : ""
                                }`}>
                                <span className="text-[14px] font-semibold text-white/85">{item.label[appLang]}</span>
                                <ChevronRight className="w-4 h-4 text-white/30" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sign Out Button */}
                    <button onClick={() => goTo("welcome")}
                      className="w-full text-center py-4 rounded-2xl bg-transparent hover:bg-red-500/10 text-red-400 text-[14px] font-semibold cursor-pointer border border-red-500/20 transition-all flex items-center justify-center gap-2">
                      <LogOut className="w-4 h-4" />
                      {appLang === "ar" ? "تسجيل الخروج" : appLang === "ua" ? "Вийти з акаунту" : "Sign Out"}
                    </button>
                  </div>
                  <TabBar currentScreen="profile" />
                </div>
              );
            })()}

            {/* ══════════════════════════════════════════
                MODAL / PROFILE SHEET
            ══════════════════════════════════════════ */}
            {modalMsg !== null && (
              <div className="absolute inset-0 bg-black/85 z-50 flex items-end justify-center anim-in" onClick={() => setModalMsg(null)}>
                <div className="w-full bg-[#141210] border-t border-[#cfa24d]/20 rounded-t-3xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                  {modalMsg === "__profile__" ? (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full border-2 border-[#cfa24d]/40 overflow-hidden mx-auto mb-3">
                        <img src="/images/generated/walid_dib.png" alt="Walid" className="w-full h-full object-cover object-top" />
                      </div>
                      <h3 className="font-display font-light text-[22px] text-white">{rtl ? "وليد ديب" : "Walid Dib"}</h3>
                      <p className="text-[11px] text-white/40 font-light mb-6">walid.dib@goldenland.com</p>
                      <div className="space-y-2 mb-4">
                        {[
                          { label: "My Portfolio",  action: () => { setModalMsg(null); handleTabClick("portfolio"); } },
                          { label: "Notifications", action: () => setModalMsg("Notifications coming soon — send the screenshot!") },
                          { label: "Settings",      action: () => setModalMsg("Settings coming soon — send the screenshot!") },
                        ].map(item => (
                          <button key={item.label} onClick={item.action}
                            className="w-full text-center py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-[13px] font-semibold cursor-pointer border border-white/8 transition-all">{item.label}</button>
                        ))}
                        <button onClick={() => { setModalMsg(null); goTo("welcome"); }}
                          className="w-full text-center py-3 rounded-full bg-transparent hover:bg-red-500/10 text-red-400 text-[13px] font-semibold cursor-pointer border border-red-500/20 transition-all flex items-center justify-center gap-2">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#cfa24d]/10 border border-[#cfa24d]/30 flex items-center justify-center mx-auto mb-4">
                        <Info className="w-6 h-6 text-[#cfa24d]" />
                      </div>
                      <h3 className="font-display font-light text-[20px] text-white mb-2">Coming Next</h3>
                      <p className="text-[11px] text-white/70 leading-relaxed font-light mb-6">{modalMsg}</p>
                      <button onClick={() => setModalMsg(null)}
                        className="w-full bg-[#cfa24d] hover:bg-white text-black font-semibold text-[11px] uppercase tracking-widest py-3 rounded-full transition-colors cursor-pointer border-none">
                        {T.close[appLang]}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      );
    }
