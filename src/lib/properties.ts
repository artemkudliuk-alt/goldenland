import type { Locale } from "@/lib/data";

export type PropertyType = "apartments" | "villas" | "hotels" | "commercial";
export type PropertyStatus = "off-plan" | "ready" | "exclusive" | "investment";

export interface Property {
  slug: string;
  type: PropertyType;
  status: PropertyStatus;
  title: Record<Locale, string>;
  location: Record<Locale, string>;
  city: "kyiv" | "lviv" | "odesa";
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
  // ── Apartments ────────────────────────────────────────────────────
  {
    slug: "kyiv-pechersk-penthouse",
    type: "apartments",
    status: "exclusive",
    city: "kyiv",
    price: 1_850_000,
    beds: 4,
    baths: 3,
    area: 320,
    roi: 8.5,
    gallery: galleries.kyivPenthouse,
    title: {
      en: "Panoramic Penthouse Overlooking the Lavra",
      ua: "Панорамний пентхаус з видом на Лавру",
      ru: "Панорамный пентхаус с видом на Лавру",
    },
    location: { en: "Pechersk, Kyiv", ua: "Печерськ, Київ", ru: "Печерск, Киев" },
    description: {
      en: "A double-height corner residence in one of Kyiv's most sought-after districts, with panoramic views of the gilded domes of Kyiv Pechersk Lavra and the Dnipro river. A wraparound terrace with a linear infinity pool, private lift lobby and dedicated concierge define the tier.",
      ua: "Двоповерхова кутова резиденція в одному з найбажаніших районів Києва з панорамним видом на позолочені куполи Києво-Печерської Лаври та Дніпро. Тераса з басейном інфініті, приватний ліфтовий хол і персональний консьєрж.",
      ru: "Двухуровневая угловая резиденция в одном из самых востребованных районов Киева с панорамным видом на золочёные купола Киево-Печерской Лавры и Днепр. Терраса с бассейном инфинити, приватный лифтовый холл и персональный консьерж.",
    },
    amenities: [
      { en: "Private terrace with infinity pool", ua: "Приватна тераса з басейном", ru: "Приватная терраса с бассейном" },
      { en: "24/7 concierge & valet", ua: "Консьєрж 24/7", ru: "Консьерж 24/7" },
      { en: "Underground parking (2 spots)", ua: "Підземний паркінг (2 місця)", ru: "Подземный паркинг (2 места)" },
      { en: "Private wine cellar", ua: "Приватний винний погріб", ru: "Приватный винный погреб" },
      { en: "Smart home automation", ua: "Розумний будинок", ru: "Умный дом" },
      { en: "Spa & fitness on premises", ua: "Спа та фітнес у будинку", ru: "Спа и фитнес в доме" },
    ],
    paymentPlan: readyPlan,
  },
  {
    slug: "kyiv-podil-loft",
    type: "apartments",
    status: "ready",
    city: "kyiv",
    price: 620_000,
    beds: 2,
    baths: 2,
    area: 145,
    roi: 7.2,
    gallery: galleries.kyivLoft,
    title: {
      en: "Historic Loft in Podil",
      ua: "Історичний лофт на Подолі",
      ru: "Исторический лофт на Подоле",
    },
    location: { en: "Podil, Kyiv", ua: "Поділ, Київ", ru: "Подол, Киев" },
    description: {
      en: "A restored loft in a 19th-century commercial building on Podil, blending exposed brick with contemporary design. Walking distance to the riverfront and Kontraktova square. Ideal city pied-à-terre or premium rental.",
      ua: "Реставрований лофт у комерційній будівлі XIX століття на Подолі. Поєднання цегли з сучасним дизайном. Кроки до набережної та Контрактової. Ідеально для міської квартири або преміальної оренди.",
      ru: "Отреставрированный лофт в коммерческом здании XIX века на Подоле. Сочетание кирпича с современным дизайном. Пешком до набережной и Контрактовой. Идеально для городской квартиры или премиум-аренды.",
    },
    amenities: [
      { en: "5m ceilings", ua: "Стелі 5м", ru: "Потолки 5м" },
      { en: "Exposed brick & steel", ua: "Відкрита цегла та сталь", ru: "Открытый кирпич и сталь" },
      { en: "Private courtyard", ua: "Приватне подвір'я", ru: "Приватный двор" },
      { en: "Underground parking", ua: "Підземний паркінг", ru: "Подземный паркинг" },
      { en: "Smart lighting", ua: "Розумне освітлення", ru: "Умное освещение" },
    ],
    paymentPlan: readyPlan,
  },
  {
    slug: "odesa-arkadia-apartment",
    type: "apartments",
    status: "off-plan",
    city: "odesa",
    price: 385_000,
    beds: 2,
    baths: 2,
    area: 98,
    roi: 9.1,
    gallery: galleries.odesaApt,
    title: {
      en: "Sea-view Apartment in Arkadia",
      ua: "Апартаменти з видом на море в Аркадії",
      ru: "Апартаменты с видом на море в Аркадии",
    },
    location: { en: "Arkadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    description: {
      en: "Off-plan seafront apartment in the Arkadia resort district, delivered furnished with panoramic Black Sea views, direct beach access, and a full on-site resort service package. Strong short-term rental yield in Odesa's summer season.",
      ua: "Off-plan апартаменти на першій лінії Аркадії з панорамним видом на Чорне море, прямим виходом до пляжу та повним resort-сервісом. Висока прибутковість короткострокової оренди у літньому сезоні.",
      ru: "Off-plan апартаменты на первой линии Аркадии с панорамным видом на Чёрное море, прямым выходом к пляжу и полным resort-сервисом. Высокая доходность краткосрочной аренды летом.",
    },
    amenities: [
      { en: "Direct beach access", ua: "Прямий вихід до пляжу", ru: "Прямой выход к пляжу" },
      { en: "Rooftop pool & sky bar", ua: "Басейн на даху та скай-бар", ru: "Бассейн на крыше и скай-бар" },
      { en: "24/7 concierge", ua: "Консьєрж 24/7", ru: "Консьерж 24/7" },
      { en: "Furnished delivery", ua: "З меблями", ru: "С мебелью" },
      { en: "Rental management program", ua: "Програма управління орендою", ru: "Программа управления арендой" },
    ],
    paymentPlan: offPlanPlan,
  },

  // ── Villas & Houses ───────────────────────────────────────────────
  {
    slug: "lviv-historic-townhouse",
    type: "villas",
    status: "ready",
    city: "lviv",
    price: 850_000,
    beds: 5,
    baths: 4,
    area: 410,
    roi: 6.4,
    gallery: galleries.lvivTownhouse,
    title: {
      en: "Restored 19th-Century Townhouse",
      ua: "Реставрований таунхаус XIX століття",
      ru: "Отреставрированный таунхаус XIX века",
    },
    location: { en: "Old Town, Lviv", ua: "Старе місто, Львів", ru: "Старый город, Львов" },
    description: {
      en: "A meticulously restored four-storey townhouse in Lviv's UNESCO-protected historic centre. Original stone facade, restored oak parquet, custom brass fittings and a private inner courtyard. Fully approved for boutique-hotel conversion.",
      ua: "Досконало відреставрований чотириповерховий таунхаус в історичному центрі Львова (ЮНЕСКО). Оригінальний кам'яний фасад, паркет з дуба, латунна фурнітура та приватний внутрішній дворик. З дозволами під бутик-готель.",
      ru: "Тщательно отреставрированный четырёхэтажный таунхаус в историческом центре Львова (ЮНЕСКО). Оригинальный каменный фасад, дубовый паркет, латунная фурнитура и приватный внутренний двор. С разрешениями под бутик-отель.",
    },
    amenities: [
      { en: "UNESCO-zone location", ua: "Розташування в зоні ЮНЕСКО", ru: "Расположение в зоне ЮНЕСКО" },
      { en: "Private inner courtyard", ua: "Приватний двір", ru: "Приватный двор" },
      { en: "Historic facade preserved", ua: "Збережений історичний фасад", ru: "Сохранённый исторический фасад" },
      { en: "Modern MEP throughout", ua: "Сучасні MEP-системи", ru: "Современные MEP-системы" },
      { en: "Approved for hotel conversion", ua: "З дозволами на переобладнання під готель", ru: "С разрешениями на отель" },
    ],
    paymentPlan: readyPlan,
  },
  {
    slug: "kozyn-forest-villa",
    type: "villas",
    status: "exclusive",
    city: "kyiv",
    price: 1_450_000,
    beds: 6,
    baths: 5,
    area: 580,
    roi: 5.8,
    gallery: galleries.kozynVilla,
    title: {
      en: "Forest Villa in Kozyn",
      ua: "Лісова вілла в Козині",
      ru: "Лесная вилла в Козине",
    },
    location: { en: "Kozyn, Kyiv region", ua: "Козин, Київська область", ru: "Козин, Киевская область" },
    description: {
      en: "A contemporary architect-designed villa on a private plot of pine and silver birch outside Kyiv. Floor-to-ceiling glass, cantilevered upper level and a reflecting pool. 30 minutes to central Kyiv, 45 minutes to Boryspil airport.",
      ua: "Сучасна авторська вілла на приватній ділянці серед сосен і берез під Києвом. Скло від підлоги до стелі, консольний другий поверх та відображаючий басейн. 30 хвилин до центру Києва, 45 до Борисполя.",
      ru: "Современная авторская вилла на приватном участке среди сосен и берёз под Киевом. Стекло от пола до потолка, консольный второй этаж и отражающий бассейн. 30 минут до центра Киева, 45 до Борисполя.",
    },
    amenities: [
      { en: "0.6 ha private forest plot", ua: "0.6 га лісової ділянки", ru: "0.6 га лесного участка" },
      { en: "Heated infinity pool", ua: "Басейн з підігрівом", ru: "Бассейн с подогревом" },
      { en: "Wine cellar & sauna", ua: "Винний погріб і сауна", ru: "Винный погреб и сауна" },
      { en: "Home cinema", ua: "Домашній кінотеатр", ru: "Домашний кинотеатр" },
      { en: "Guest house", ua: "Гостьовий будинок", ru: "Гостевой дом" },
      { en: "Managed grounds", ua: "Управління територією", ru: "Управление территорией" },
    ],
    paymentPlan: readyPlan,
  },
  {
    slug: "odesa-beachfront-villa",
    type: "villas",
    status: "off-plan",
    city: "odesa",
    price: 2_200_000,
    beds: 5,
    baths: 5,
    area: 480,
    roi: 7.9,
    gallery: galleries.odesaVilla,
    title: {
      en: "Beachfront Villa with Infinity Pool",
      ua: "Вілла на узбережжі з басейном інфініті",
      ru: "Вилла на побережье с бассейном инфинити",
    },
    location: { en: "Arkadia, Odesa", ua: "Аркадія, Одеса", ru: "Аркадия, Одесса" },
    description: {
      en: "An off-plan modernist villa on the Black Sea coast with private beach frontage and an infinity pool that visually meets the sea horizon. Designed for year-round living with underfloor heating, deep-set solar shading and full smart-home integration.",
      ua: "Off-plan модерна вілла на узбережжі Чорного моря з приватною береговою лінією та басейном інфініті, що зливається з горизонтом. Спроєктована для проживання цілорічно: тепла підлога, глибокі сонцезахисні виступи, повна smart-home інтеграція.",
      ru: "Off-plan модерн-вилла на побережье Чёрного моря с частной береговой линией и бассейном инфинити, сливающимся с горизонтом. Спроектирована для круглогодичного проживания: тёплые полы, глубокие солнцезащитные выступы, полная smart-home интеграция.",
    },
    amenities: [
      { en: "Private beach frontage", ua: "Приватний вихід до моря", ru: "Приватный выход к морю" },
      { en: "Infinity pool", ua: "Басейн інфініті", ru: "Бассейн инфинити" },
      { en: "Underfloor heating", ua: "Тепла підлога", ru: "Тёплые полы" },
      { en: "Smart home", ua: "Розумний будинок", ru: "Умный дом" },
      { en: "Boat mooring rights", ua: "Права на швартування", ru: "Права на швартовку" },
      { en: "24/7 security", ua: "Охорона 24/7", ru: "Охрана 24/7" },
    ],
    paymentPlan: offPlanPlan,
  },

  // ── Hotels ────────────────────────────────────────────────────────
  {
    slug: "lviv-rynok-boutique",
    type: "hotels",
    status: "investment",
    city: "lviv",
    price: 4_800_000,
    baths: 24,
    area: 2_150,
    roi: 11.2,
    gallery: galleries.lvivBoutique,
    title: {
      en: "24-Key Boutique Hotel near Rynok Square",
      ua: "Бутик-готель на 24 номери біля площі Ринок",
      ru: "Бутик-отель на 24 номера у площади Рынок",
    },
    location: { en: "Rynok, Lviv", ua: "Ринок, Львів", ru: "Рынок, Львов" },
    description: {
      en: "A fully operational 24-key boutique hotel in a restored Austro-Hungarian building, one block from Rynok Square. Historic detailing preserved throughout. Strong ADR and steady RevPAR growth across seasons.",
      ua: "Діючий бутик-готель на 24 номери у відреставрованій австро-угорській будівлі за квартал від Ринку. Історичні деталі збережено. Висока ADR та стабільне зростання RevPAR у сезонах.",
      ru: "Действующий бутик-отель на 24 номера в отреставрированном австро-угорском здании в квартале от Рынка. Исторические детали сохранены. Высокая ADR и стабильный рост RevPAR по сезонам.",
    },
    amenities: [
      { en: "24 keys, 3 suites", ua: "24 номери, 3 сьюти", ru: "24 номера, 3 сьюта" },
      { en: "Restaurant & wine bar", ua: "Ресторан і винний бар", ru: "Ресторан и винный бар" },
      { en: "Spa on premises", ua: "Спа у будівлі", ru: "Спа в здании" },
      { en: "Existing management contract", ua: "Діючий менеджмент-контракт", ru: "Действующий менеджмент-контракт" },
      { en: "Established staff team", ua: "Сформована команда", ru: "Сформированная команда" },
    ],
    paymentPlan: readyPlan,
  },
  {
    slug: "odesa-black-sea-hotel",
    type: "hotels",
    status: "off-plan",
    city: "odesa",
    price: 6_200_000,
    baths: 40,
    area: 3_400,
    roi: 12.5,
    gallery: galleries.odesaHotel,
    title: {
      en: "40-Key Seafront Hotel & Spa (Off-Plan)",
      ua: "Готель на 40 номерів на узбережжі та спа (off-plan)",
      ru: "Отель на 40 номеров на побережье и спа (off-plan)",
    },
    location: { en: "Frantsuzskyi Boulevard, Odesa", ua: "Французький бульвар, Одеса", ru: "Французский бульвар, Одесса" },
    description: {
      en: "Off-plan 40-key seafront resort hotel with full-service spa, sea-view rooftop restaurant and direct beach access. Positioned in Odesa's premium resort corridor. Institutional-grade specification with international operator interest already secured.",
      ua: "Off-plan 40-номерний resort-готель з повноцінним спа, ресторан на даху з видом на море та прямим виходом до пляжу. Розташування в преміальному курортному коридорі Одеси. Institutional-grade специфікація, є попередній інтерес операторів.",
      ru: "Off-plan 40-номерный resort-отель с полноценным спа, рестораном на крыше с видом на море и прямым выходом к пляжу. Расположение в премиальном курортном коридоре Одессы. Institutional-grade спецификация, есть предварительный интерес операторов.",
    },
    amenities: [
      { en: "40 keys, 8 suites, 2 villas", ua: "40 номерів, 8 сьютів, 2 вілли", ru: "40 номеров, 8 сьютов, 2 виллы" },
      { en: "Full-service spa & pool", ua: "Спа та басейн", ru: "Спа и бассейн" },
      { en: "Sea-view rooftop restaurant", ua: "Ресторан на даху з видом на море", ru: "Ресторан на крыше с видом на море" },
      { en: "Direct beach access", ua: "Прямий вихід до пляжу", ru: "Прямой выход к пляжу" },
      { en: "Operator interest secured", ua: "Інтерес операторів", ru: "Интерес операторов" },
    ],
    paymentPlan: offPlanPlan,
  },
  {
    slug: "kyiv-hospitality-project",
    type: "hotels",
    status: "investment",
    city: "kyiv",
    price: 8_400_000,
    baths: 78,
    area: 5_200,
    roi: 10.8,
    gallery: galleries.kyivHospitality,
    title: {
      en: "78-Key Central Kyiv Hotel Redevelopment",
      ua: "Проєкт реновації готелю в центрі Києва (78 номерів)",
      ru: "Проект реновации отеля в центре Киева (78 номеров)",
    },
    location: { en: "Central Kyiv", ua: "Центральний Київ", ru: "Центральный Киев" },
    description: {
      en: "Existing central-Kyiv hotel building with approved redevelopment plans to a 78-key upper-upscale hospitality asset. Structural surveys complete. Positioned adjacent to leading corporate and government districts.",
      ua: "Готель у центрі Києва з затвердженими планами реновації до 78-номерного upper-upscale активу. Обстеження конструкцій завершено. Розташування поруч з корпоративним і урядовим кварталом.",
      ru: "Отель в центре Киева с утверждёнными планами реновации до 78-номерного upper-upscale актива. Обследование конструкций завершено. Расположение рядом с корпоративным и правительственным кварталом.",
    },
    amenities: [
      { en: "78 keys post-renovation", ua: "78 номерів після реновації", ru: "78 номеров после реновации" },
      { en: "Approved redevelopment plans", ua: "Затверджені проєкти реновації", ru: "Утверждённые проекты реновации" },
      { en: "Corporate district location", ua: "Розташування в корп. кварталі", ru: "Расположение в корп. квартале" },
      { en: "Conference & banquet space", ua: "Конференц- та банкетна зона", ru: "Конференц- и банкетная зона" },
      { en: "Underground parking", ua: "Підземний паркінг", ru: "Подземный паркинг" },
    ],
    paymentPlan: offPlanPlan,
  },

  // ── Commercial ────────────────────────────────────────────────────
  {
    slug: "kyiv-business-tower",
    type: "commercial",
    status: "investment",
    city: "kyiv",
    price: 12_500_000,
    area: 8_600,
    roi: 9.4,
    gallery: galleries.kyivBusinessTower,
    title: {
      en: "Grade-A Business Tower Floors",
      ua: "Поверхи бізнес-центру Grade-A",
      ru: "Этажи бизнес-центра Grade-A",
    },
    location: { en: "Central business district, Kyiv", ua: "Центральний діловий квартал, Київ", ru: "Центральный деловой квартал, Киев" },
    description: {
      en: "Full-floor and multi-floor blocks in a Grade-A glass tower in central Kyiv's business district. Blue-chip anchor tenants secured for 60% of the leasable area. Long WALT and inflation-linked leases.",
      ua: "Повнотиповерхові блоки в скляному Grade-A бізнес-центрі у діловому кварталі Києва. Blue-chip якірні орендарі на 60% площі. Довгий WALT та індексовані оренди.",
      ru: "Полноэтажные блоки в стеклянном Grade-A бизнес-центре в деловом квартале Киева. Blue-chip якорные арендаторы на 60% площади. Длинный WALT и индексируемые аренды.",
    },
    amenities: [
      { en: "Grade-A specification", ua: "Grade-A специфікація", ru: "Grade-A спецификация" },
      { en: "Anchor tenants secured", ua: "Якірні орендарі закріплені", ru: "Якорные арендаторы закреплены" },
      { en: "Long WALT", ua: "Довгий WALT", ru: "Длинный WALT" },
      { en: "On-site parking (240 spots)", ua: "Паркінг (240 місць)", ru: "Паркинг (240 мест)" },
      { en: "24/7 building security", ua: "Охорона 24/7", ru: "Охрана 24/7" },
    ],
    paymentPlan: readyPlan,
  },
  {
    slug: "lviv-office-building",
    type: "commercial",
    status: "ready",
    city: "lviv",
    price: 3_400_000,
    area: 2_800,
    roi: 8.6,
    gallery: galleries.lvivOffice,
    title: {
      en: "Boutique Office Building in Lviv IT District",
      ua: "Бутик-офісна будівля у львівському IT-кластері",
      ru: "Бутик-офисное здание в львовском IT-кластере",
    },
    location: { en: "IT district, Lviv", ua: "IT-квартал, Львів", ru: "IT-квартал, Львов" },
    description: {
      en: "A restored 4-storey boutique office building in the heart of Lviv's IT cluster, currently 92% leased to tech tenants on 3-5 year terms. Modern MEP, on-site parking and shared meeting suites.",
      ua: "Відреставрована 4-поверхова бутик-офісна будівля в серці львівського IT-квартала, наразі здана на 92% техно-орендарям на 3–5 років. Сучасні MEP, паркінг та переговорні кімнати.",
      ru: "Отреставрированное 4-этажное бутик-офисное здание в сердце львовского IT-квартала, сейчас сдано на 92% техно-арендаторам на 3–5 лет. Современные MEP, паркинг и переговорные комнаты.",
    },
    amenities: [
      { en: "92% leased at acquisition", ua: "92% зданості на момент угоди", ru: "92% сданности на момент сделки" },
      { en: "Tech tenant mix", ua: "Технологічний tenant mix", ru: "Технологический tenant mix" },
      { en: "On-site parking", ua: "Паркінг на території", ru: "Паркинг на территории" },
      { en: "Shared meeting suites", ua: "Переговорні кімнати", ru: "Переговорные комнаты" },
      { en: "Historic exterior preserved", ua: "Збережений історичний екстер'єр", ru: "Сохранённый исторический экстерьер" },
    ],
    paymentPlan: readyPlan,
  },
  {
    slug: "odesa-retail-plaza",
    type: "commercial",
    status: "off-plan",
    city: "odesa",
    price: 5_600_000,
    area: 4_200,
    roi: 10.1,
    gallery: galleries.odesaRetail,
    title: {
      en: "Seaside Retail Plaza (Off-Plan)",
      ua: "Приморський retail-plaza (off-plan)",
      ru: "Приморский retail-plaza (off-plan)",
    },
    location: { en: "Frantsuzskyi Boulevard, Odesa", ua: "Французький бульвар, Одеса", ru: "Французский бульвар, Одесса" },
    description: {
      en: "Off-plan mixed-use retail plaza on Odesa's premium boulevard, delivered with pre-leased anchor F&B tenants and street-level premium retail spaces. Direct seasonal foot traffic and strong year-round resident base.",
      ua: "Off-plan mixed-use retail plaza на преміальному бульварі Одеси з переднайманими F&B-якорними орендарями та вуличним ритейлом. Прямий сезонний трафік і стабільний резидентський попит.",
      ru: "Off-plan mixed-use retail plaza на премиальном бульваре Одессы с преднанятыми F&B-якорными арендаторами и уличным ритейлом. Прямой сезонный трафик и стабильный резидентский спрос.",
    },
    amenities: [
      { en: "Pre-leased F&B anchors", ua: "Переднаймані F&B-якорі", ru: "Преднанятые F&B-якоря" },
      { en: "Premium boulevard location", ua: "Преміальне розташування на бульварі", ru: "Премиальное расположение на бульваре" },
      { en: "18 retail units", ua: "18 ритейл-юнітів", ru: "18 ритейл-юнитов" },
      { en: "Basement parking", ua: "Паркінг в цокольному поверсі", ru: "Паркинг в цокольном этаже" },
      { en: "Seasonal outdoor terraces", ua: "Сезонні тераси", ru: "Сезонные террасы" },
    ],
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
