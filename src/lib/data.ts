export interface Translation {
  title: string;
  description: string;
}

export const goldenLandData = {
  aboutUs: {
    en: {
      title: "About Us",
      description:
        "Golden Land Property Investment is a dynamic Ukrainian real estate and property investment company specializing in residential and commercial property sales, property investment solutions, and hotel management services. With an international business approach and strong market knowledge, the company provides professional real estate services to local and international clients seeking secure and profitable investment opportunities in Ukraine and overseas markets. Our company combines global business experience with local market expertise, offering tailored solutions for investors, property owners, developers, and hospitality businesses.",
    },
    ua: {
      title: "Про компанію",
      description:
        "Golden Land Property Investment — це сучасна українська компанія, що спеціалізується на купівлі, продажу та оренді житлової й комерційної нерухомості, інвестиціях у нерухомість та управлінні готелями. Компанія надає професійні послуги місцевим та міжнародним клієнтам, які шукають надійні та прибуткові інвестиційні можливості в Україні та за кордоном. Ми поєднуємо міжнародний досвід із глибоким знанням ринку нерухомості, забезпечуючи індивідуальний підхід до кожного клієнта та інвестора.",
    },
    ru: {
      title: "О компании",
      description:
        "Golden Land Property Investment — это динамичная украинская компания по недвижимости и инвестициям, специализирующаяся на продаже жилой и коммерческой недвижимости, инвестиционных решениях и управлении отелями. Сочетая международный бизнес-подход и глубокое знание рынка, компания предоставляет профессиональные услуги локальным и международным клиентам, ищущим надежные и прибыльные инвестиционные возможности в Украине и за рубежом.",
    },
  },
  founder: {
    en: {
      title: "Founder & CEO",
      name: "Walid Dib",
      bio: "Walid Dib is a highly experienced real estate professional with more than 22 years of experience in the international property market. He holds a diploma in property studies and has successfully worked across several international markets including Australia, New Zealand, United Arab Emirates, Qatar, Bahrain, and Kuwait. Throughout his career, Walid Dib has specialized in buying, selling, and managing high-end residential and commercial properties, including luxury hotels and hospitality investments.",
      network:
        "His international experience and strong business network have enabled him to work with investors, developers, hotel owners, and private clients across multiple global markets. Walid Dib is recognized for his deep understanding of international real estate trends, investment strategies, and luxury property markets. His professional approach, market knowledge, and commitment to excellence continue to drive the success and growth of Golden Land Property Investment in both local and international markets.",
    },
    ua: {
      title: "Засновник та Генеральний директор",
      name: "Walid Dib",
      bio: "Walid Dib — висококваліфікований фахівець у сфері нерухомості з понад 22-річним досвідом роботи на міжнародному ринку нерухомості. Він має диплом у сфері нерухомості та успішно працював на міжнародних ринках, зокрема в Австралії, Новій Зеландії, ОАЕ, Катарі, Бахрейні та Кувейті. Протягом своєї кар’єри Валід Діб спеціалізувався на купівлі, продажу та управлінні елітною житловою і комерційною нерухомістю, включаючи розкішні готелі та інвестиції у сфері гостинності.",
      network:
        "Його міжнародний досвід та широка ділова мережа дозволили успішно співпрацювати з інвесторами, девелоперами, власниками готелів та приватними клієнтами на різних світових ринках. Валід Діб відомий своїм глибоким розумінням міжнародних тенденцій ринку нерухомості, інвестиційних стратегій та сегменту елітної нерухомості. Його професійний підхід, знання ринку та прагнення до досконалості продовжують сприяти успіху та розвитку Golden Land Property Investment.",
    },
    ru: {
      title: "Основатель и Генеральный директор",
      name: "Валид Диб",
      bio: "Валид Диб — высококвалифицированный специалист в сфере недвижимости с более чем 22-летним опытом работы на международном рынке. Он имеет профильный диплом и успешно работал на рынках Австралии, Новой Зеландии, ОАЭ, Катара, Бахрейна и Кувейта. На протяжении своей карьеры Валид Диб специализировался на покупке, продаже и управлении элитной жилой и коммерческой недвижимостью, включая роскошные отели и инвестиции в сферу гостеприимства.",
      network:
        "Его международный опыт и обширная деловая сеть позволили наладить успешное сотрудничество с инвесторами, девелоперами и частными клиентами по всему миру. Валид Диб известен глубоким пониманием глобальных тенденций рынка недвижимости и инвестиционных стратегий. Его профессиональный подход обеспечивает стабильный рост компании Golden Land Property Investment.",
    },
  },
  services: [
    {
      id: "residential",
      en: {
        title: "Residential Property",
        desc: "Buying and selling residential properties, luxury apartments, family homes, and rental management.",
      },
      ua: {
        title: "Житлова нерухомість",
        desc: "Купівля та продаж житлової нерухомості, елітні квартири та приватні будинки, інвестиції у житлові проєкти.",
      },
      ru: {
        title: "Жилая недвижимость",
        desc: "Покупка и продажа жилой недвижимости, элитные квартиры и частные дома, инвестиции в жилые проекты.",
      },
    },
    {
      id: "commercial",
      en: {
        title: "Commercial Property",
        desc: "Commercial property sales and leasing, office buildings, retail spaces, and valuations.",
      },
      ua: {
        title: "Комерційна нерухомість",
        desc: "Продаж та оренда комерційної нерухомості, офісні приміщення та торгові площі, аналіз та оцінка.",
      },
      ru: {
        title: "Коммерческая недвижимость",
        desc: "Продажа и аренда коммерческой недвижимости, офисные помещения и торговые площади, анализ и оценка.",
      },
    },
    {
      id: "hotel",
      en: {
        title: "Hotel Management",
        desc: "Hotel operations management, hospitality investment consulting, leasing and acquisitions.",
      },
      ua: {
        title: "Управління готелями",
        desc: "Управління готелями та апартаментами, готельний інвестиційний консалтинг, купівля та продаж готелів.",
      },
      ru: {
        title: "Управление отелями",
        desc: "Управление отелями и апартаментами, отельный инвестиционный консалтинг, покупка и продажа отелей.",
      },
    },
    {
      id: "investment",
      en: {
        title: "Property Investment",
        desc: "Real estate investment advisory, international investor support, and portfolio development.",
      },
      ua: {
        title: "Інвестиції в нерухомість",
        desc: "Інвестиційний консалтинг, супровід міжнародних інвесторів, формування портфеля.",
      },
      ru: {
        title: "Инвестиции в недвижимость",
        desc: "Инвестиционный консалтинг, сопровождение международных инвесторов, формирование портфеля.",
      },
    },
  ],
  whyInvestInUkraine: {
    en: {
      title: "Why Invest in Ukraine",
      intro:
        "Ukraine is an amazing country with enormous potential and a bright future. Strategic location in Europe, highly educated workforce, and growing infrastructure make it highly attractive for long-term growth.",
      citiesTitle: "Key Investment Hubs",
      cities:
        "Major cities such as Kyiv, Odesa, and Lviv continue to demonstrate strong long-term investment potential due to increasing international interest, urban development, and tourism growth.",
    },
    ua: {
      title: "Чому варто інвестувати в Україну",
      intro:
        "Україна — це дивовижна країна з великим потенціалом і перспективним майбутнім. Вигідне розташування у Європі, висококваліфікована робоча сила та зростаюча інфраструктура приваблюють міжнародних інвесторів.",
      citiesTitle: "Ключові інвестиційні центри",
      cities:
        "Такі міста, як Київ, Одеса та Львів, мають великий потенціал для довгострокових інвестицій завдяки розвитку інфраструктури, туризму та зростаючому міжнародному інтересу.",
    },
    ru: {
      title: "Почему стоит инвестировать в Украину",
      intro:
        "Украина — удивительная страна с огромным потенциалом и перспективным будущим. Выгодное географическое положение в Европе, квалифицированная рабочая сила и растущая инфраструктура привлекают внимание глобальных инвесторов.",
      citiesTitle: "Ключевые инвестиционные центры",
      cities:
        "Такие города, как Киев, Одесса и Львов, демонстрируют высокий потенциал долгосрочных инвестиций благодаря развитию инфраструктуры и росту международного интереса.",
    },
  },
  offices: [
    {
      id: "kyiv",
      name: {
        en: "Kyiv - Head Office",
        ua: "Kyiv — головний офіс",
        ru: "Киев — головной офис",
      },
      phone: "+380 75 926 4432",
    },
    {
      id: "sydney",
      name: { en: "Sydney Office", ua: "Сідней", ru: "Сидней" },
      phone: "+61 415 779 783",
    },
    {
      id: "qatar",
      name: { en: "Qatar Connection", ua: "Катар", ru: "Катар" },
      phone: "+97430007788",
    },
    {
      id: "dubai",
      name: { en: "Dubai Office", ua: "Дубай", ru: "Дубай" },
      phone: "+971588841737",
    },
    {
      id: "odesa",
      name: { en: "Odesa Office", ua: "Одеса", ru: "Одесса" },
      phone: "+380 7777 04177",
    },
  ],
} as const;

export type Locale = "en" | "ua" | "ru";
export type GoldenLandData = typeof goldenLandData;
