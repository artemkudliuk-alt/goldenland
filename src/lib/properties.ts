import type { Locale } from "@/lib/data";

export type PropertyType = "apartments" | "villas" | "hotels" | "commercial";
export type PropertyStatus = "off-plan" | "ready" | "exclusive" | "investment";

export interface Property {
  slug: string;
  type: PropertyType;
  status: PropertyStatus;
  title: Record<Locale, string>;
  location: Record<Locale, string>;
  city: "kyiv" | "lviv" | "odesa" | "dubai";
  price: number;
  priceOnRequest?: boolean;
  beds?: number;
  baths?: number;
  area: number;
  roi?: number;
  gallery: string[];
  description: Record<Locale, string>;
  amenities: Record<Locale, string>[];
  paymentPlan?: { label: Record<Locale, string>; percent: number }[];
}

const galleries = {
  kyivPenthouse: [
    "/images/generated/prop-kyiv-pechersk-penthouse-1.webp",
    "/images/generated/shared-apt-living.webp",
    "/images/generated/shared-apt-bedroom.webp",
    "/images/generated/shared-apt-kitchen.webp",
    "/images/generated/shared-apt-bathroom.webp",
  ],
  kyivLoft: [
    "/images/generated/prop-kyiv-podil-loft-1.webp",
    "/images/generated/shared-apt-living.webp",
    "/images/generated/shared-apt-bedroom.webp",
    "/images/generated/shared-apt-kitchen.webp",
    "/images/generated/shared-apt-bathroom.webp",
  ],
  odesaApt: [
    "/images/generated/prop-odesa-arkadia-apartment-1.webp",
    "/images/generated/shared-apt-living.webp",
    "/images/generated/shared-apt-bedroom.webp",
    "/images/generated/shared-apt-kitchen.webp",
    "/images/generated/shared-apt-bathroom.webp",
  ],
  lvivTownhouse: [
    "/images/generated/prop-lviv-historic-townhouse-1.webp",
    "/images/generated/category-villas.webp",
    "/images/generated/featured-odesa-villa.webp",
    "/images/generated/service-residential.webp",
    "/images/generated/insight-offplan.webp",
  ],
  kozynVilla: [
    "/images/generated/prop-kozyn-forest-villa-1.webp",
    "/images/generated/category-villas.webp",
    "/images/generated/featured-odesa-villa.webp",
    "/images/generated/service-residential.webp",
    "/images/generated/insight-offplan.webp",
  ],
  odesaVilla: [
    "/images/generated/prop-odesa-beachfront-villa-1.webp",
    "/images/generated/category-villas.webp",
    "/images/generated/featured-odesa-villa.webp",
    "/images/generated/service-residential.webp",
    "/images/generated/insight-offplan.webp",
  ],
  lvivBoutique: [
    "/images/generated/prop-lviv-rynok-boutique-1.webp",
    "/images/generated/category-hotels.webp",
    "/images/generated/service-hotel.webp",
    "/images/generated/insight-hotels.webp",
    "/images/generated/featured-lviv-townhouse.webp",
  ],
  odesaHotel: [
    "/images/generated/prop-odesa-black-sea-hotel-1.webp",
    "/images/generated/category-hotels.webp",
    "/images/generated/service-hotel.webp",
    "/images/generated/insight-hotels.webp",
    "/images/generated/featured-lviv-townhouse.webp",
  ],
  kyivHospitality: [
    "/images/generated/prop-kyiv-hospitality-project-1.webp",
    "/images/generated/category-hotels.webp",
    "/images/generated/service-hotel.webp",
    "/images/generated/insight-hotels.webp",
    "/images/generated/featured-lviv-townhouse.webp",
  ],
  kyivBusinessTower: [
    "/images/generated/prop-kyiv-business-tower-1.webp",
    "/images/generated/category-commercial.webp",
    "/images/generated/service-commercial.webp",
    "/images/generated/service-investment.webp",
    "/images/generated/insight-kyiv-market.webp",
  ],
  lvivOffice: [
    "/images/generated/prop-lviv-office-building-1.webp",
    "/images/generated/category-commercial.webp",
    "/images/generated/service-commercial.webp",
    "/images/generated/service-investment.webp",
    "/images/generated/insight-kyiv-market.webp",
  ],
  odesaRetail: [
    "/images/generated/prop-odesa-retail-plaza-1.webp",
    "/images/generated/category-commercial.webp",
    "/images/generated/service-commercial.webp",
    "/images/generated/service-investment.webp",
    "/images/generated/insight-kyiv-market.webp",
  ],
};

const offPlanPlan = [
  { label: { en: "On booking", ua: "При бронюванні", ru: "При бронировании" }, percent: 10 },
  { label: { en: "Foundation stage", ua: "Стадія фундаменту", ru: "Стадия фундамента" }, percent: 15 },
  { label: { en: "Structural completion", ua: "Завершення каркасу", ru: "Завершение каркаса" }, percent: 25 },
  { label: { en: "Facade & MEP", ua: "Фасад та MEP", ru: "Фасад и MEP" }, percent: 20 },
  { label: { en: "On handover", ua: "При передачі", ru: "При передаче" }, percent: 30 },
];

const readyPlan = [
  { label: { en: "Reservation", ua: "Бронювання", ru: "Бронирование" }, percent: 10 },
  { label: { en: "Contract signing", ua: "Підписання договору", ru: "Подписание договора" }, percent: 30 },
  { label: { en: "Final settlement", ua: "Остаточний розрахунок", ru: "Окончательный расчёт" }, percent: 60 },
];

export const properties: Property[] = [
  // ── Odesa & Dubai Real Properties ─────────────────────────────────
  {
    slug: "commercial-property-kadorr-new-city",
    type: "commercial",
    status: "investment",
    city: "odesa",
    price: 0,
    priceOnRequest: true,
    area: 338,
    gallery: galleries.odesaRetail,
    title: {
      en: "Commercial Property for Sale in KADORR New City",
      ua: "Комерційна нерухомість у KADORR New City",
      ru: "Коммерческая недвижимость в KADORR New City",
    },
    location: { en: "KADORR New City, Odesa", ua: "KADORR New City, Одеса", ru: "KADORR New City, Одесса" },
    description: {
      en: "Investment commercial space ideal for retail or office in KADORR New City, Odesa.",
      ua: "Інвестиційне комерційне приміщення під ритейл або офіс у KADORR New City, Одеса.",
      ru: "Инвестиционное коммерческое помещение под ритейл или офис в KADORR New City, Одесса.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "residential-hotel-kadorr-new-city",
    type: "commercial",
    status: "investment",
    city: "odesa",
    price: 0,
    priceOnRequest: true,
    area: 613,
    gallery: galleries.odesaRetail,
    title: {
      en: "Residential / Hotel Investment Property for Sale - KADORR New City",
      ua: "Інвестиційний житлово-готельний об'єкт - KADORR New City",
      ru: "Инвестиционный жилой / отельный объект - KADORR New City",
    },
    location: { en: "KADORR New City, Odesa", ua: "KADORR New City, Одеса", ru: "KADORR New City, Одесса" },
    description: {
      en: "Spacious investment space suited for boutique hotel or residential units in KADORR New City.",
      ua: "Просторе інвестиційне приміщення під бутик-готель або житлові юніти в KADORR New City.",
      ru: "Просторное инвестиционное помещение под бутик-отель или жилые юниты в KADORR New City.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "luxury-villa-arcadia-odesa",
    type: "villas",
    status: "exclusive",
    city: "odesa",
    price: 0,
    priceOnRequest: true,
    area: 512,
    gallery: galleries.kozynVilla,
    title: {
      en: "Luxury Villa in the Heart of Arcadia",
      ua: "Розкішна вілла в серці Аркадії",
      ru: "Роскошная вилла в сердце Аркадии",
    },
    location: { en: "Arcadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    description: {
      en: "Exclusive private villa with pool and private garden in the heart of Arcadia, Odesa.",
      ua: "Ексклюзивна приватна вілла з басейном та власністю в серці Аркадії, Одеса.",
      ru: "Эксклюзивная частная вилла с бассейном и садом в сердце Аркадии, Одесса.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "geneva-hotel-odesa",
    type: "hotels",
    status: "ready",
    city: "odesa",
    price: 650_000,
    area: 443,
    roi: 9.2,
    gallery: galleries.lvivBoutique,
    title: {
      en: "Geneva Hotel",
      ua: "Готель Женева",
      ru: "Отель Женева",
    },
    location: { en: "Center, Odesa", ua: "Центр, Одеса", ru: "Центр, Одесса" },
    description: {
      en: "Operating boutique hotel in the historic center of Odesa with high occupancy rate.",
      ua: "Діючий бутик-готель в історичному центрі Одеси з високою завантаженістю.",
      ru: "Действующий бутик-отель в историческом центре Одессы с высокой загрузкой.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "ekaterina-hotel-odesa",
    type: "hotels",
    status: "ready",
    city: "odesa",
    price: 1_100_000,
    area: 700,
    roi: 9.8,
    gallery: galleries.odesaHotel,
    title: {
      en: "Ekaterina Hotel",
      ua: "Готель Катерина",
      ru: "Отель Екатерины",
    },
    location: { en: "Ekaterininsks Sq, Odesa", ua: "Катерининська пл., Одеса", ru: "Екатерининская пл., Одесса" },
    description: {
      en: "Premium boutique hotel located on Catherine Square in Odesa.",
      ua: "Преміальний бутик-готель розташований на Катерининській площі в Одесі.",
      ru: "Премиальный бутик-отель расположен на Екатерининской площади в Одессе.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "hotel-complex-prestigious-neighborhood-odesa",
    type: "hotels",
    status: "investment",
    city: "odesa",
    price: 2_100_000,
    area: 1230,
    roi: 10.5,
    gallery: galleries.kyivHospitality,
    title: {
      en: "A hotel complex in one of Odessa's most prestigious neighborhoods",
      ua: "Готельний комплекс у найпрестижнішому районі Одеси",
      ru: "Отельный комплекс в наиболее престижном районе Одессы",
    },
    location: { en: "French Blvd, Odesa", ua: "Французький бульвар, Одеса", ru: "Французский бульвар, Одесса" },
    description: {
      en: "Large hospitality complex with private grounds on French Boulevard, Odesa.",
      ua: "Великий готельний комплекс з власною територією на Французькому бульварі, Одеса.",
      ru: "Крупный отельный комплекс с собственной территорией на Французском бульваре, Одесса.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "modern-apartment-terrace-odesa",
    type: "apartments",
    status: "ready",
    city: "odesa",
    price: 0,
    priceOnRequest: true,
    area: 41,
    gallery: galleries.odesaApt,
    title: {
      en: "Modern Apartment with a Large Sea-View Terrace - Odesa",
      ua: "Сучасні апартаменти з великою терасою та видом на море - Одеса",
      ru: "Современные апартаменты с большой террасой и видом на море - Одесса",
    },
    location: { en: "Arcadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    description: {
      en: "Exclusive sea-view apartment featuring a large private terrace in Arcadia, Odesa.",
      ua: "Ексклюзивні апартаменти з видом на море та просторою приватною терасою в Аркадії.",
      ru: "Эксклюзивные апартаменты с видом на море и просторной частной террасой в Аркадии.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "premium-class-hotel-odesa",
    type: "hotels",
    status: "exclusive",
    city: "odesa",
    price: 2_500_000,
    area: 800,
    roi: 11.0,
    gallery: galleries.odesaHotel,
    title: {
      en: "Premium-class hotel",
      ua: "Преміум-клас готель",
      ru: "Премиум-класс отель",
    },
    location: { en: "Coastal Area, Odesa", ua: "Прибережна зона, Одеса", ru: "Прибрежная зона, Одесса" },
    description: {
      en: "Turnkey premium class hotel located near Odesa coastline.",
      ua: "Готовий преміальний готель біля прибережної зони Одеси.",
      ru: "Готовый премиальный отель возле прибрежной зоны Одессы.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "continental-hotel-odesa",
    type: "hotels",
    status: "exclusive",
    city: "odesa",
    price: 10_500_000,
    area: 3000,
    roi: 12.5,
    gallery: galleries.kyivHospitality,
    title: {
      en: "The Continental Hotel",
      ua: "Готель Континенталь",
      ru: "Отель Континенталь",
    },
    location: { en: "Deribasovskaya St, Odesa", ua: "вул. Дерибасівська, Одеса", ru: "ул. Дерибасовская, Одесса" },
    description: {
      en: "Flagship 5-star continental hotel landmark property on Deribasovskaya Street.",
      ua: "Флагманський 5-зірковий готельний комплекс на вулиці Дерибасівській.",
      ru: "Флагманский 5-звездочный отельный комплекс на улице Дерибасовской.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "exclusive-investment-proposal-70-pearl-residence-kadorr-group-odesa-ukraine",
    type: "commercial",
    status: "investment",
    city: "odesa",
    price: 184_800,
    area: 120,
    roi: 9.5,
    gallery: galleries.odesaRetail,
    title: {
      en: "Exclusive Investment Proposal 70 Pearl Residence - KADORR Group",
      ua: "Ексклюзивна інвестиційна пропозиція 70 Перлина - KADORR Group",
      ru: "Эксклюзивное инвестиционное предложение 70 Жемчужина - KADORR Group",
    },
    location: { en: "70 Pearl Residence, Odesa", ua: "70 Перлина, Одеса", ru: "70 Жемчужина, Одесса" },
    description: {
      en: "Commercial space in 70 Pearl Residence by KADORR Group in Odesa.",
      ua: "Комерційне приміщення в 70 Перлині від KADORR Group в Одесі.",
      ru: "Коммерческое помещение в 70 Жемчужине от KADORR Group в Одессе.",
    },
    amenities: [],
    paymentPlan: readyPlan,
  },
  {
    slug: "violet-4-dubai",
    type: "apartments",
    status: "off-plan",
    city: "dubai",
    price: 0,
    priceOnRequest: true,
    area: 120,
    gallery: galleries.kyivPenthouse,
    title: {
      en: "VIOLET 4",
      ua: "VIOLET 4",
      ru: "VIOLET 4",
    },
    location: { en: "DAMAC Hills 2, Dubai", ua: "DAMAC Hills 2, Дубай", ru: "DAMAC Hills 2, Дубай" },
    description: {
      en: "Off-plan luxury townhouses in DAMAC Hills 2, Dubai.",
      ua: "Off-plan розкішні таунхауси в DAMAC Hills 2, Дубай.",
      ru: "Off-plan роскошные таунхаусы в DAMAC Hills 2, Дубай.",
    },
    amenities: [],
    paymentPlan: offPlanPlan,
  },
  {
    slug: "azure-2-dubai",
    type: "apartments",
    status: "off-plan",
    city: "dubai",
    price: 0,
    priceOnRequest: true,
    area: 95,
    gallery: galleries.odesaApt,
    title: {
      en: "AZURE 2",
      ua: "AZURE 2",
      ru: "AZURE 2",
    },
    location: { en: "Dubai Marina, Dubai", ua: "Дубай Марина, Дубай", ru: "Дубай Марина, Дубай" },
    description: {
      en: "Waterfront apartments with panoramic views in Dubai Marina.",
      ua: "Апартаменти на першій лінії в Дубай Марина.",
      ru: "Апартаменты на первой линии в Дубай Марина.",
    },
    amenities: [],
    paymentPlan: offPlanPlan,
  },
  {
    slug: "damac-islands-dubai",
    type: "villas",
    status: "off-plan",
    city: "dubai",
    price: 0,
    priceOnRequest: true,
    area: 450,
    gallery: galleries.kozynVilla,
    title: {
      en: "DAMAC Islands",
      ua: "DAMAC Islands",
      ru: "DAMAC Islands",
    },
    location: { en: "DAMAC Islands, Dubai", ua: "DAMAC Islands, Дубай", ru: "DAMAC Islands, Дубай" },
    description: {
      en: "Exclusive island resort villas community by DAMAC in Dubai.",
      ua: "Ексклюзивне вільновий ком'юніті DAMAC Islands в Дубаї.",
      ru: "Эксклюзивное вилловое комьюнити DAMAC Islands в Дубае.",
    },
    amenities: [],
    paymentPlan: offPlanPlan,
  },
  {
    slug: "safa-gate-dubai",
    type: "apartments",
    status: "off-plan",
    city: "dubai",
    price: 0,
    priceOnRequest: true,
    area: 110,
    gallery: galleries.kyivPenthouse,
    title: {
      en: "SAFA GATE",
      ua: "SAFA GATE",
      ru: "SAFA GATE",
    },
    location: { en: "Safa Park, Dubai", ua: "Safa Park, Дубай", ru: "Safa Park, Дубай" },
    description: {
      en: "Luxury residence overlooking Safa Park and Dubai Canal.",
      ua: "Розкішна резиденція з видом на Safa Park та канал Дубай.",
      ru: "Роскошная резиденция с видом на Safa Park и канал Дубай.",
    },
    amenities: [],
    paymentPlan: offPlanPlan,
  },
  {
    slug: "chelsea-residences-dubai",
    type: "apartments",
    status: "off-plan",
    city: "dubai",
    price: 0,
    priceOnRequest: true,
    area: 88,
    gallery: galleries.kyivLoft,
    title: {
      en: "CHELSEA RESIDENCES",
      ua: "CHELSEA RESIDENCES",
      ru: "CHELSEA RESIDENCES",
    },
    location: { en: "Business Bay, Dubai", ua: "Business Bay, Дубай", ru: "Business Bay, Дубай" },
    description: {
      en: "Modern urban residences in the heart of Business Bay, Dubai.",
      ua: "Сучасні міські резиденції у серці Business Bay, Дубай.",
      ru: "Современные городские резиденции в сердце Business Bay, Дубай.",
    },
    amenities: [],
    paymentPlan: offPlanPlan,
  },
  {
    slug: "shoreline-by-damac-dubai",
    type: "apartments",
    status: "off-plan",
    city: "dubai",
    price: 0,
    priceOnRequest: true,
    area: 135,
    gallery: galleries.odesaApt,
    title: {
      en: "Shoreline by DAMAC",
      ua: "Shoreline by DAMAC",
      ru: "Shoreline by DAMAC",
    },
    location: { en: "Ras Al Khaimah / Dubai", ua: "Рас-аль-Хайма / Дубай", ru: "Рас-эль-Хайма / Дубай" },
    description: {
      en: "Beachfront residences with private beach access by DAMAC.",
      ua: "Пляжні резиденції з приватним доступом до пляжу від DAMAC.",
      ru: "Пляжные резиденции с частным доступом к пляжу от DAMAC.",
    },
    amenities: [],
    paymentPlan: offPlanPlan,
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function formatPrice(price: number, priceOnRequest?: boolean, locale: Locale = "en"): string {
  if (priceOnRequest) {
    return { en: "Price on request", ua: "Ціна за запитом", ru: "Цена по запросу" }[locale];
  }
  return "$" + price.toLocaleString("en-US");
}
