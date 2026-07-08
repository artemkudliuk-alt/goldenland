"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { ArrowRightIcon } from "@/components/icons";

const translations = {
  eyebrow: { en: "Our Services", ua: "Наші послуги", ru: "Наши услуги" },
  heading: {
    en: "Four pillars of real estate expertise.",
    ua: "Чотири напрямки експертизи в нерухомості.",
    ru: "Четыре направления экспертизы в недвижимости.",
  },
  subhead: {
    en: "Full-cycle support from selection and due diligence to acquisition, operations and portfolio growth.",
    ua: "Повний цикл супроводу — від підбору й due diligence до купівлі, управління та розвитку портфеля.",
    ru: "Полный цикл сопровождения — от подбора и due diligence до покупки, управления и роста портфеля.",
  },
  cta: { en: "Learn more", ua: "Дізнатись більше", ru: "Подробнее" },
  ctaAll: { en: "View All Services", ua: "Усі послуги", ru: "Все услуги" },
};

type ServiceKey = "residential" | "commercial" | "hotel" | "investment";

const services: {
  key: ServiceKey;
  image: string;
  title: Record<"en" | "ua" | "ru", string>;
  desc: Record<"en" | "ua" | "ru", string>;
}[] = [
  {
    key: "residential",
    image: "/images/generated/service-residential.webp",
    title: {
      en: "Residential Property",
      ua: "Житлова нерухомість",
      ru: "Жилая недвижимость",
    },
    desc: {
      en: "Luxury apartments, family homes, rental management and residential investment opportunities across Ukraine and abroad.",
      ua: "Елітні квартири, приватні будинки, оренда та інвестиції у житлові проєкти в Україні та за кордоном.",
      ru: "Элитные квартиры, частные дома, аренда и инвестиции в жилые проекты в Украине и за рубежом.",
    },
  },
  {
    key: "commercial",
    image: "/images/generated/service-commercial.webp",
    title: {
      en: "Commercial Property",
      ua: "Комерційна нерухомість",
      ru: "Коммерческая недвижимость",
    },
    desc: {
      en: "Office buildings, retail spaces, investment acquisitions, market analysis and commercial project consulting.",
      ua: "Офісні приміщення, торгові площі, інвестиційні об'єкти, аналіз ринку та комерційний консалтинг.",
      ru: "Офисные помещения, торговые площади, инвестиционные объекты, анализ рынка и коммерческий консалтинг.",
    },
  },
  {
    key: "hotel",
    image: "/images/generated/service-hotel.webp",
    title: {
      en: "Hotel Management",
      ua: "Управління готелями",
      ru: "Управление отелями",
    },
    desc: {
      en: "Hotel operations, hospitality investment consulting, acquisitions and strategic hospitality development.",
      ua: "Операційне управління готелями, готельний інвестиційний консалтинг та стратегічний розвиток hospitality-проєктів.",
      ru: "Операционное управление отелями, отельный инвестиционный консалтинг и стратегическое развитие hospitality-проектов.",
    },
  },
  {
    key: "investment",
    image: "/images/generated/service-investment.webp",
    title: {
      en: "Property Investment",
      ua: "Інвестиції в нерухомість",
      ru: "Инвестиции в недвижимость",
    },
    desc: {
      en: "Advisory, international investor support, project management, portfolio development and partnership opportunities.",
      ua: "Консалтинг, супровід міжнародних інвесторів, управління проєктами та розвиток інвестиційного портфеля.",
      ru: "Консалтинг, сопровождение международных инвесторов, управление проектами и развитие портфеля.",
    },
  },
];

export function ServicesSection() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <section id="services" className="section-py bg-[color:var(--bower-cream)]">
      <div className="bower-container">
        <div className="mx-auto max-w-[820px] text-center">
          <SectionEyebrow className="mb-5">{t.eyebrow[language]}</SectionEyebrow>
          <h2 className="text-[34px] font-light leading-[1.15] tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[44px]">
            {t.heading[language]}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[15px] font-light leading-[1.7] text-[color:var(--bower-mute)] md:text-[16px]">
            {t.subhead[language]}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((s) => (
            <article key={s.key} className="group flex flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
                <Image
                  src={s.image}
                  alt={s.title[language]}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-[20px] font-light tracking-[-0.01em] text-[color:var(--bower-ink-2)]">
                  {s.title[language]}
                </h3>
                <p className="mt-3 text-[14px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
                  {s.desc[language]}
                </p>
                <a
                  href={`/services#${s.key}`}
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.12em] uppercase text-[#0a0a0a] transition-colors hover:text-[#D4AF37]"
                >
                  <span>{t.cta[language]}</span>
                  <ArrowRightIcon className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a href="/services" className="btn-primary">{t.ctaAll[language]}</a>
        </div>
      </div>
    </section>
  );
}
