"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useLanguage } from "@/context/LanguageContext";
import { useLeadModal } from "@/context/LeadModalContext";

const t = {
  hero: {
    eyebrow: { en: "Our Services", ua: "Наші послуги", ru: "Наши услуги" },
    title: {
      en: "Full-cycle real estate services.",
      ua: "Повний цикл послуг у сфері нерухомості.",
      ru: "Полный цикл услуг в сфере недвижимости.",
    },
    subtitle: {
      en: "From selection and due diligence to acquisition, operations and portfolio growth — across four asset classes and global markets.",
      ua: "Від підбору й due diligence до купівлі, управління та зростання портфеля — у чотирьох класах активів і на світових ринках.",
      ru: "От подбора и due diligence до покупки, управления и роста портфеля — в четырёх классах активов и на мировых рынках.",
    },
  },
  learnMore: { en: "Book a Consultation", ua: "Записатись", ru: "Записаться" },
};

type ServiceKey = "residential" | "commercial" | "hotel" | "investment";
type Service = {
  key: ServiceKey;
  image: string;
  eyebrow: { en: string; ua: string; ru: string };
  title: { en: string; ua: string; ru: string };
  intro: { en: string; ua: string; ru: string };
  bullets: { en: string; ua: string; ru: string }[];
};

const services: Service[] = [
  {
    key: "residential",
    image: "/images/generated/service-residential.webp",
    eyebrow: { en: "01 · Residential Property", ua: "01 · Житлова нерухомість", ru: "01 · Жилая недвижимость" },
    title: {
      en: "Homes and residential investment.",
      ua: "Житло та інвестиції у житлову нерухомість.",
      ru: "Жильё и инвестиции в жилую недвижимость.",
    },
    intro: {
      en: "Luxury apartments, family homes, rental management and residential investment opportunities across Ukraine and overseas.",
      ua: "Елітні квартири, приватні будинки, оренда та інвестиції у житлові проєкти в Україні та за кордоном.",
      ru: "Элитные квартиры, частные дома, аренда и инвестиции в жилые проекты в Украине и за рубежом.",
    },
    bullets: [
      {
        en: "Buying and selling residential properties",
        ua: "Купівля та продаж житлової нерухомості",
        ru: "Покупка и продажа жилой недвижимости",
      },
      {
        en: "Luxury apartments and family homes",
        ua: "Елітні квартири та приватні будинки",
        ru: "Элитные квартиры и частные дома",
      },
      {
        en: "Property investment opportunities",
        ua: "Інвестиційні можливості",
        ru: "Инвестиционные возможности",
      },
      {
        en: "Rental management services",
        ua: "Управління орендою",
        ru: "Управление арендой",
      },
      {
        en: "Real estate consulting",
        ua: "Консультації з нерухомості",
        ru: "Консультации по недвижимости",
      },
    ],
  },
  {
    key: "commercial",
    image: "/images/generated/service-commercial.webp",
    eyebrow: { en: "02 · Commercial Property", ua: "02 · Комерційна нерухомість", ru: "02 · Коммерческая недвижимость" },
    title: {
      en: "Offices, retail and commercial assets.",
      ua: "Офіси, ритейл та комерційні активи.",
      ru: "Офисы, ритейл и коммерческие активы.",
    },
    intro: {
      en: "Office buildings, retail spaces, investment acquisitions, market analysis and commercial project consulting.",
      ua: "Офісні приміщення, торгові площі, інвестиційні угоди, аналіз ринку та комерційний консалтинг.",
      ru: "Офисные помещения, торговые площади, инвестиционные сделки, анализ рынка и коммерческий консалтинг.",
    },
    bullets: [
      {
        en: "Commercial property sales and leasing",
        ua: "Продаж та оренда комерційної нерухомості",
        ru: "Продажа и аренда коммерческой недвижимости",
      },
      {
        en: "Office buildings and retail spaces",
        ua: "Офісні приміщення та торгові площі",
        ru: "Офисные помещения и торговые площади",
      },
      {
        en: "Investment property acquisition",
        ua: "Купівля інвестиційних об'єктів",
        ru: "Покупка инвестиционных объектов",
      },
      {
        en: "Commercial project consulting",
        ua: "Консалтинг комерційних проєктів",
        ru: "Консалтинг коммерческих проектов",
      },
      {
        en: "Market analysis and valuation",
        ua: "Аналіз ринку та оцінка",
        ru: "Анализ рынка и оценка",
      },
    ],
  },
  {
    key: "hotel",
    image: "/images/generated/service-hotel.webp",
    eyebrow: { en: "03 · Hotel Management", ua: "03 · Управління готелями", ru: "03 · Управление отелями" },
    title: {
      en: "Hospitality operations and investment.",
      ua: "Готельні операції та інвестиції.",
      ru: "Гостиничные операции и инвестиции.",
    },
    intro: {
      en: "Hotel operations, hospitality investment consulting, acquisitions and strategic hospitality development.",
      ua: "Управління готелями, готельний інвестиційний консалтинг, купівля та стратегічний розвиток hospitality-проєктів.",
      ru: "Управление отелями, отельный инвестиционный консалтинг, покупка и стратегическое развитие hospitality-проектов.",
    },
    bullets: [
      {
        en: "Hotel operations management",
        ua: "Управління готельними операціями",
        ru: "Управление гостиничными операциями",
      },
      {
        en: "Hospitality investment consulting",
        ua: "Готельний інвестиційний консалтинг",
        ru: "Отельный инвестиционный консалтинг",
      },
      {
        en: "Hotel leasing and acquisitions",
        ua: "Оренда та купівля готелів",
        ru: "Аренда и покупка отелей",
      },
      {
        en: "Tourism and accommodation projects",
        ua: "Туристичні та hospitality проєкти",
        ru: "Туристические и hospitality проекты",
      },
      {
        en: "Strategic hotel development",
        ua: "Стратегічний розвиток готелів",
        ru: "Стратегическое развитие отелей",
      },
    ],
  },
  {
    key: "investment",
    image: "/images/generated/service-investment.webp",
    eyebrow: { en: "04 · Property Investment", ua: "04 · Інвестиції в нерухомість", ru: "04 · Инвестиции в недвижимость" },
    title: {
      en: "Advisory and portfolio growth.",
      ua: "Консалтинг і зростання портфеля.",
      ru: "Консалтинг и рост портфеля.",
    },
    intro: {
      en: "Advisory, international investor support, project management, portfolio development and partnership opportunities.",
      ua: "Консалтинг, супровід міжнародних інвесторів, управління проєктами, розвиток портфеля та партнерство.",
      ru: "Консалтинг, сопровождение международных инвесторов, управление проектами, развитие портфеля и партнёрство.",
    },
    bullets: [
      {
        en: "Real estate investment advisory",
        ua: "Інвестиційний консалтинг",
        ru: "Инвестиционный консалтинг",
      },
      {
        en: "International investor support",
        ua: "Супровід міжнародних інвесторів",
        ru: "Сопровождение международных инвесторов",
      },
      {
        en: "Project management",
        ua: "Управління проєктами",
        ru: "Управление проектами",
      },
      {
        en: "Investment portfolio development",
        ua: "Розвиток інвестиційного портфеля",
        ru: "Развитие инвестиционного портфеля",
      },
      {
        en: "Partnership opportunities",
        ua: "Партнерські можливості",
        ru: "Партнёрские возможности",
      },
    ],
  },
];

export default function ServicesPage() {
  const { language } = useLanguage();
  const { openModal } = useLeadModal();
  const [customPage, setCustomPage] = useState<any>(null);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.pages)) {
          const found = data.pages.find((p: any) => p.slug === "services");
          if (found) {
            setCustomPage(found);
          }
        }
      })
      .catch((err) => console.error("Error fetching services custom text:", err));
  }, []);

  const heroTitle = customPage?.title?.[language] || t.hero.title[language];
  const heroSubtitle = customPage?.content?.[language] || t.hero.subtitle[language];

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={t.hero.eyebrow[language]}
          title={heroTitle}
          subtitle={heroSubtitle}
          bgImage="/images/generated/services_banner.png"
        />

        <div className="bg-[color:var(--bower-cream)]">
          {services.map((s, idx) => {
            const imageLeft = idx % 2 === 0;
            return (
              <section
                key={s.key}
                id={s.key}
                className="section-py border-b border-[color:var(--bower-line)]/60 last:border-b-0"
              >
                <div className="bower-container">
                  <div className={`grid grid-cols-1 gap-14 items-center md:grid-cols-[1fr_1fr] md:gap-20 ${imageLeft ? "" : "md:[&>:first-child]:order-2"}`}>
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                      <Image
                        src={s.image}
                        alt={s.title[language]}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="max-w-[540px]">
                      <SectionEyebrow className="mb-5 text-[#D4AF37]">
                        {s.eyebrow[language]}
                      </SectionEyebrow>
                      <h2 className="text-[32px] font-light leading-[1.15] tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[40px]">
                        {s.title[language]}
                      </h2>
                      <p className="mt-5 text-[16px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
                        {s.intro[language]}
                      </p>
                      <ul className="mt-8 grid grid-cols-1 gap-3">
                        {s.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-3 text-[15px] font-light text-[color:var(--bower-ink-2)]">
                            <span className="mt-2 h-1 w-3 shrink-0 bg-[#D4AF37]" />
                            <span>{b[language]}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => openModal(`${t.hero.eyebrow[language]} - ${s.title[language]}`)}
                        className="btn-primary mt-10 cursor-pointer"
                      >
                        {t.learnMore[language]}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
