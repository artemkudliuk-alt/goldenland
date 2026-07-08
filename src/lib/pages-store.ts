import fs from "fs";
import path from "path";

export interface CustomPage {
  slug: string;
  title: { en: string; ua: string; ru: string };
  content: { en: string; ua: string; ru: string };
  showInHeader: boolean;
  showInFooter: boolean;
}

function dataDir(): string {
  if (process.env.VERCEL) {
    return "/tmp";
  }
  return process.env.LEADS_DATA_DIR || process.cwd();
}

function filePath(): string {
  return path.join(dataDir(), "custom_pages.json");
}

function getSeededPages(): CustomPage[] {
  return [
    {
      slug: "privacy",
      title: {
        en: "Privacy Policy",
        ua: "Політика конфіденційності",
        ru: "Политика конфиденциальности",
      },
      showInHeader: false,
      showInFooter: false,
      content: {
        en: `Last updated: July 2026\n\nGolden Land Property Investment values your privacy. This Privacy Policy describes how we collect, use, and share your personal data when you visit our website or submit inquiries.\n\n1. Data We Collect\nWhen you interact with our website, we may collect personal information you voluntarily provide, including: name, phone number, email address, property preferences, and meeting booking details. We also collect automated technical data (IP addresses, browser types, cookies) to improve website functionality and user experience.\n\n2. How We Use Your Data\nWe process your data to: respond to your inquiries and catalog requests, deliver brochures, arrange Zoom or office meetings, send newsletter communications (if subscribed), and analyze traffic statistics to improve our service offerings.\n\n3. Data Security & Storage\nWe implement industry-standard administrative, physical, and technical measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. Your data is stored only for as long as necessary to fulfill the purposes outlined in this policy.\n\n4. Contact Us\nIf you have any questions about this Privacy Policy, please contact us at info@goldenlandproperty.com or visit one of our head offices.`,
        ua: `Останнє оновлення: липень 2026 р.\n\nGolden Land Property Investment цінує вашу конфіденційність. Ця Політика описує, як ми збираємо, використовуємо та ділимося вашими персональними даними під час відвідування нашого сайту або подання запитів.\n\n1. Дані, які ми збираємо\nКоли ви взаємодієте з нашим веб-сайтом, ми можемо збирати особисту інформацію, яку ви добровільно надаєте, включаючи: ім'я, номер телефону, адресу електронної пошти, уподобання щодо нерухомості та деталі бронювання зустрічей.\n\n2. Як ми використовуємо ваші дані\nМи обробляємо ваші дані для: надання відповідей на ваші запити та запити на каталоги, організації зустрічей у Zoom або офісі, надсилання новинних розсилок (за умови підписки) та аналізу статистики трафіку.\n\n3. Безпека та зберігання даних\nМи впроваджуємо стандартні адміністративні, фізичні та технічні заходи безпеки для захисту ваших персональних даних від несанкційного доступу, зміни, розкриття або знищення.\n\n4. Зв'язок з нами\nЯкщо у вас виникли запитання про цю Політику конфіденційності, будь ласка, зв'яжіться з нами за адресою info@goldenlandproperty.com або відвідайте один з наших офісів.`,
        ru: `Последнее обновление: июнь 2026 г.\n\nGolden Land Property Investment ценит вашу конфиденциальность. Настоящая Политика описывает, как мы собираем, используем и делимся вашими персональными данными при посещении нашего сайта или подаче запросов.\n\n1. Данные, которые мы собираем\nКогда вы взаимодействуете с нашим веб-сайтом, мы можете собирать личную информацию, которую вы добровольно предоставляете, включая: имя, номер телефона, адрес электронной почты, предпочтения по недвижимости и детали бронирования встреч.\n\n2. Как мы используем ваши данные\nМы обрабатываем ваши данные для: предоставления ответов на ваши запросы и запросы на каталоги, организации встреч в Zoom или офисе, отправки новостных рассылок (при условии подписки) и анализа статистики трафика.\n\n3. Безопасность и хранение данных\nМы внедряем стандартные административные, физические и технические меры безопасности для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.\n\n4. Связь с нами\nЕсли у вас есть какие-либо вопросы о настоящей Политике конфиденциальности, пожалуйста, свяжитесь с нами по адресу info@goldenlandproperty.com или посетите один из наших офисов.`,
      },
    },
    {
      slug: "terms",
      title: {
        en: "Terms of Service",
        ua: "Умови надання послуг",
        ru: "Условия предоставления услуг",
      },
      showInHeader: false,
      showInFooter: false,
      content: {
        en: `Last updated: July 2026\n\nWelcome to Golden Land Property Investment. By accessing or using our website, services, or catalog, you agree to comply with and be bound by the following Terms of Service.\n\n1. Agreement to Terms\nThese Terms of Service constitute a legally binding agreement between you and Golden Land. If you do not agree with any part of these terms, you must discontinue using our website and services immediately.\n\n2. Real Estate Information & Disclaimer\nThe property listings, descriptions, price estimates, expected ROI percentages, and specifications published on this website are for informational purposes only. While we aim for accuracy, they do not constitute formal commercial offers or financial advice. Verification of all property parameters should be conducted through signed direct contracts.\n\n3. Contact Form Submissions & Communication\nBy submitting contact forms or booking Zoom consultations, you guarantee that all details supplied are accurate and that you consent to our team reaching out via call, email, or messenger (WhatsApp/Telegram).\n\n4. Limitation of Liability\nGolden Land is not liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use this website, including but not limited to financial losses in property investments or reliance on website content.`,
        ua: `Останнє оновлення: липень 2026 р.\n\nЛаскаво просимо до Golden Land Property Investment. Використовуючи наш сайт, послуги або каталог, ви погоджуєтеся дотримуватися наведених нижче Умов надання послуг.\n\n1. Згода з Умовами\nЦі Умови є юридично обов'язковою угодою між вами та Golden Land. Якщо ви не згодні з будь-якою частиною цих умов, будь ласка, припиніть використання сайту.\n\n2. Інформація про нерухомість\nОписи об'єктів, оцінка цін, показники ROI та технічні деталі на сайті надаються виключно для інформаційних цілей та не є публічною офертою або фінансовою порадою.\n\n3. Заявки та зв'язок\nНадсилаючи форму запиту, ви підтверджуєте точність наданих даних та даєте згоду на зв'язок з вами через телефон, email або месенджери (WhatsApp/Telegram).\n\n4. Обмеження відповідальності\nGolden Land не несе відповідальності за будь-які прямі чи непрямі збитки, що виникли внаслідок використання матеріалів цього сайту або інвестиційних рішень.`,
        ru: `Последнее обновление: июнь 2026 г.\n\nДобро пожаловать в Golden Land Property Investment. Используя наш сайт, услуги или каталог, вы соглашаетесь соблюдать следующие Условия предоставления услуг.\n\n1. Согласие с Условиями\nНастоящие Условия представляют собой юридически обязательное соглашение между вами и Golden Land. Если вы не согласны с какой-либо частью этих условий, пожалуйста, прекратите использование сайта.\n\n2. Информация о недвижимости\nОписания объектов, оценка цен, показатели ROI и технические детали на сайте предоставляются исключительно в информационных целях и не являются публичной офертой или финансовым советом.\n\n3. Заявки и связь\nОтправляя форму запроса, вы подтверждаете точность предоставленных данных и даете согласие на связь с вами по телефону, email или через мессенджеры (WhatsApp/Telegram).\n\n4. Ограничение ответственности\nGolden Land не несеет ответственности за любые прямые или косвенные убытки, возникшие в результате использования материалов данного сайта или инвестиционных решений.`,
      },
    },
    {
      slug: "press",
      title: {
        en: "Press & Media",
        ua: "Преса та медіа",
        ru: "Пресса и медиа",
      },
      showInHeader: false,
      showInFooter: false,
      content: {
        en: `Welcome to the Golden Land Property Investment press center. Here you can find our latest corporate statements, media assets, and research reports on the Ukrainian and international real estate markets.\n\nFor media inquiries, press kit requests, or interview bookings with our executive team, please contact us at media@goldenlandproperty.com.\n\nOur latest publications cover topics such as: real estate market resilience in Kyiv, investment safety models for international funds, and expansion of hospitality offerings across Lviv and Odesa.`,
        ua: `Ласкаво просимо до прес-центру Golden Land Property Investment. Тут ви знайдете останні корпоративні релізи, медіа-матеріали та аналітичні звіти про ринок нерухомості України та світу.\n\nДля журналістських запитів та інтерв'ю з керівництвом, будь ласка, звертайтесь на email: media@goldenlandproperty.com.`,
        ru: `Добро пожаловать в пресс-центр Golden Land Property Investment. Здесь вы найдете последние корпоративные релизы, медиа-материалы и аналитические отчеты о рынке недвижимости Украины и мира.\n\nДля журналистских запросов и интервью с руководством, пожалуйста, обращайтесь по адресу: media@goldenlandproperty.com.`,
      },
    },
    {
      slug: "about",
      title: {
        en: "A Ukrainian company with an international standard.",
        ua: "Українська компанія з міжнародним стандартом.",
        ru: "Украинская компания со стандартом мирового уровня.",
      },
      showInHeader: false,
      showInFooter: false,
      content: {
        en: "22 years of global expertise across residential, commercial and hospitality real estate — serving investors from Kyiv to Sydney.",
        ua: "22 роки міжнародного досвіду в житловій, комерційній та готельній нерухомості — від Києва до Сіднею.",
        ru: "22 года международного опыта в жилой, коммерческой и отельной недвижимости — от Киева до Сиднея.",
      },
    },
    {
      slug: "services",
      title: {
        en: "Real estate services built for international investors.",
        ua: "Послуги у сфері нерухомості для міжнародних інвесторів.",
        ru: "Услуги в недвижимости для международных инвесторов.",
      },
      showInHeader: false,
      showInFooter: false,
      content: {
        en: "From residential sales in Pechersk to hospitality investments in Odesa and Lviv — backed by 22 years of market-leading experience.",
        ua: "Від продажу квартир на Печерську до інвестицій в готелі Одеси та Львова — з досвідом лідера ринку протягом 22 років.",
        ru: "От продажи квартир на Печерске до инвестиций в отели Одессы и Львова — с опытом лидера рынка в течение 22 лет.",
      },
    },
    {
      slug: "catalog",
      title: {
        en: "Premium properties for sale & investment in Ukraine.",
        ua: "Преміальні об'єкти для продажу та інвестицій в Україні.",
        ru: "Премиальные объекты для продажи и инвестиций в Украине.",
      },
      showInHeader: false,
      showInFooter: false,
      content: {
        en: "Kyiv, Lviv and Odesa — residential, commercial and hospitality opportunities vetted by our international team.",
        ua: "Київ, Львів і Одеса — житлові, комерційні та готельні можливості, перевірені нашою міжнародною командою.",
        ru: "Киев, Львов и Одесса — жилые, коммерческие и отельные возможности, проверенные нашей международной командой.",
      },
    },
    {
      slug: "contacts",
      title: {
        en: "Speak to a Golden Land investment advisor.",
        ua: "Зв'яжіться з інвестиційним консультантом Golden Land.",
        ru: "Свяжитесь с инвестиционным консультантом Golden Land.",
      },
      showInHeader: false,
      showInFooter: false,
      content: {
        en: "We reply within 15 minutes on WhatsApp during business hours. Send us your investment brief — our team will follow up with tailored opportunities.",
        ua: "Ми відповідаємо протягом 15 хвилин у WhatsApp у робочі години. Надішліть інвестиційний бриф — команда підбере релевантні можливості.",
        ru: "Отвечаем в течение 15 минут в WhatsApp в рабочие часы. Отправьте инвестиционный бриф — команда подберёт релевантные возможности.",
      },
    },
  ];
}

export async function getCustomPages(): Promise<CustomPage[]> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  let pagesList: CustomPage[] = [];
  let loaded = false;

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", "custom_pages"]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const raw = data?.result;
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            pagesList = parsed as CustomPage[];
            loaded = true;
          }
        }
      }
    } catch (err) {
      console.error("[pages-store] KV read failed, falling back to local file:", err);
    }
  }

  // Local file fallback
  if (!loaded) {
    const fp = filePath();
    try {
      if (fs.existsSync(fp)) {
        const raw = fs.readFileSync(fp, "utf-8");
        const parsed = JSON.parse(raw || "[]");
        if (Array.isArray(parsed) && parsed.length > 0) {
          pagesList = parsed as CustomPage[];
          loaded = true;
        }
      }
    } catch (err) {
      console.error("[pages-store] local read failed:", err);
    }
  }

  // Auto-seed if empty
  if (!loaded || pagesList.length === 0) {
    const seeded = getSeededPages();
    await saveCustomPages(seeded);
    return seeded;
  }

  // Inject any missing default pages
  const defaultSeeds = getSeededPages();
  let modified = false;
  for (const seed of defaultSeeds) {
    if (!pagesList.some((p) => p.slug === seed.slug)) {
      pagesList.push(seed);
      modified = true;
    }
  }
  if (modified) {
    await saveCustomPages(pagesList);
  }

  return pagesList;
}

export async function saveCustomPages(pages: CustomPage[]): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (kvUrl && kvToken) {
    try {
      const res = await fetch(kvUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", "custom_pages", JSON.stringify(pages)]),
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.error("[pages-store] KV write failed, saving locally:", err);
    }
  }

  // Local file fallback
  const fp = filePath();
  try {
    fs.writeFileSync(fp, JSON.stringify(pages, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[pages-store] local write failed:", err);
    return false;
  }
}
