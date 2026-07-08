"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { InternationalPresence } from "@/components/InternationalPresence";
import { useLanguage } from "@/context/LanguageContext";
import { useLeadModal } from "@/context/LeadModalContext";

const t = {
  hero: {
    eyebrow: { en: "About Us", ua: "Про компанію", ru: "О компании" },
    title: {
      en: "A Ukrainian company with an international standard.",
      ua: "Українська компанія з міжнародним стандартом.",
      ru: "Украинская компания с международным стандартом.",
    },
    subtitle: {
      en: "22 years of global expertise across residential, commercial and hospitality real estate — serving investors from Kyiv to Sydney.",
      ua: "22 роки міжнародного досвіду в житловій, комерційній та готельній нерухомості — від Києва до Сіднею.",
      ru: "22 года международного опыта в жилой, коммерческой и отельной недвижимости — от Киева до Сиднея.",
    },
  },
  aboutTitle: { en: "About Golden Land", ua: "Про Golden Land", ru: "О Golden Land" },
  aboutBody1: {
    en: "Golden Land Property Investment is a dynamic Ukrainian real estate and property investment company specialising in residential and commercial property sales, property investment solutions and hotel management services. With an international business approach and strong market knowledge, the company provides professional real estate services to local and international clients seeking secure and profitable investment opportunities in Ukraine and overseas markets.",
    ua: "Golden Land Property Investment — це сучасна українська компанія, що спеціалізується на купівлі, продажу та оренді житлової й комерційної нерухомості, інвестиціях у нерухомість та управлінні готелями. Компанія надає професійні послуги місцевим та міжнародним клієнтам, які шукають надійні та прибуткові інвестиційні можливості в Україні та за кордоном.",
    ru: "Golden Land Property Investment — это динамичная украинская компания по недвижимости и инвестициям, специализирующаяся на продаже жилой и коммерческой недвижимости, инвестиционных решениях и управлении отелями. Компания предоставляет профессиональные услуги локальным и международным клиентам, ищущим надёжные и прибыльные инвестиционные возможности в Украине и за рубежом.",
  },
  aboutBody2: {
    en: "Our company combines global business experience with local market expertise, offering tailored solutions for investors, property owners, developers and hospitality businesses.",
    ua: "Ми поєднуємо міжнародний досвід із глибоким знанням локального ринку, забезпечуючи індивідуальний підхід до інвесторів, власників, девелоперів та hospitality-бізнесу.",
    ru: "Мы сочетаем международный опыт с глубоким знанием локального рынка, обеспечивая индивидуальный подход к инвесторам, собственникам, девелоперам и hospitality-бизнесу.",
  },

  visionEyebrow: { en: "Our Vision", ua: "Наше бачення", ru: "Наше видение" },
  visionTitle: {
    en: "Become a trusted leader in the Ukrainian and international property markets.",
    ua: "Стати надійним лідером українського та міжнародного ринків нерухомості.",
    ru: "Стать надёжным лидером украинского и международного рынков недвижимости.",
  },

  missionEyebrow: { en: "Our Mission", ua: "Наша місія", ru: "Наша миссия" },
  missionTitle: {
    en: "Deliver trusted, professional and innovative real estate solutions.",
    ua: "Забезпечувати надійні, професійні та інноваційні рішення в нерухомості.",
    ru: "Обеспечивать надёжные, профессиональные и инновационные решения в недвижимости.",
  },
  missionPoints: [
    {
      en: "Provide high-quality real estate services with honesty and professionalism.",
      ua: "Надавати високоякісні послуги у сфері нерухомості з чесністю та професіоналізмом.",
      ru: "Предоставлять высококачественные услуги в сфере недвижимости с честностью и профессионализмом.",
    },
    {
      en: "Create strong investment opportunities for local and international clients.",
      ua: "Створювати сильні інвестиційні можливості для локальних і міжнародних клієнтів.",
      ru: "Создавать сильные инвестиционные возможности для локальных и международных клиентов.",
    },
    {
      en: "Support the growth of the Ukrainian property and hospitality sectors.",
      ua: "Підтримувати розвиток українського ринку нерухомості та hospitality.",
      ru: "Поддерживать развитие украинского рынка недвижимости и hospitality.",
    },
    {
      en: "Build long-term relationships based on trust, integrity and success.",
      ua: "Будувати довгострокові відносини на основі довіри, чесності та успіху.",
      ru: "Строить долгосрочные отношения на основе доверия, честности и успеха.",
    },
  ],

  commitEyebrow: { en: "Our Commitment", ua: "Наше зобов'язання", ru: "Наше обязательство" },
  commitTitle: {
    en: "Ready to invest? Talk to our team.",
    ua: "Готові інвестувати? Зв'яжіться з нами.",
    ru: "Готовы инвестировать? Свяжитесь с нами.",
  },
  commitBody: {
    en: "At Golden Land Property Investment, we deliver exceptional service and professional property management solutions that meet the highest international standards.",
    ua: "У Golden Land Property Investment ми забезпечуємо винятковий сервіс і професійне управління нерухомістю, що відповідає найвищим міжнародним стандартам.",
    ru: "В Golden Land Property Investment мы обеспечиваем исключительный сервис и профессиональное управление недвижимостью, соответствующее самым высоким международным стандартам.",
  },
  commitCTA: { en: "Book a Consultation", ua: "Записатися на консультацію", ru: "Записаться на консультацию" },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const { openModal } = useLeadModal();
  const [customPage, setCustomPage] = useState<any>(null);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.pages)) {
          const found = data.pages.find((p: any) => p.slug === "about");
          if (found) {
            setCustomPage(found);
          }
        }
      })
      .catch((err) => console.error("Error fetching about custom text:", err));
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
          bgImage="/images/generated/about_banner.png"
        />

        {/* About Us — full body */}
        <section className="section-py bg-[color:var(--bower-cream)]">
          <div className="bower-container">
            <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20 md:items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white flex items-center justify-center md:sticky md:top-[120px]">
                <video
                  className="h-full w-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/logo_banner.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="max-w-[620px]">
                <SectionEyebrow className="mb-5">{t.aboutTitle[language]}</SectionEyebrow>
                <p className="text-[17px] font-light leading-[1.75] text-[color:var(--bower-ink-2)]">
                  {t.aboutBody1[language]}
                </p>
                <p className="mt-5 text-[16px] font-light leading-[1.75] text-[color:var(--bower-mute)]">
                  {t.aboutBody2[language]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision + Mission */}
        <section className="section-py bg-white">
          <div className="bower-container">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
              <div>
                <SectionEyebrow className="mb-5">{t.visionEyebrow[language]}</SectionEyebrow>
                <h2 className="text-[30px] font-light leading-[1.2] tracking-[-0.01em] text-[color:var(--bower-ink-2)] md:text-[36px]">
                  {t.visionTitle[language]}
                </h2>
              </div>
              <div>
                <SectionEyebrow className="mb-5">{t.missionEyebrow[language]}</SectionEyebrow>
                <h2 className="text-[24px] font-light leading-[1.25] tracking-[-0.005em] text-[color:var(--bower-ink-2)] md:text-[28px]">
                  {t.missionTitle[language]}
                </h2>
                <ul className="mt-8 space-y-4">
                  {t.missionPoints.map((p, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-2 h-1 w-4 shrink-0 bg-[#D4AF37]" />
                      <span className="text-[15px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
                        {p[language]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us — reused */}
        <WhyChooseUs />

        {/* International Presence — reused */}
        <InternationalPresence />

        {/* Commitment CTA */}
        <section className="section-py bg-[color:var(--bower-cream)]">
          <div className="bower-container text-center">
            <SectionEyebrow className="mb-5">{t.commitEyebrow[language]}</SectionEyebrow>
            <h2 className="mx-auto max-w-[720px] text-[32px] font-light leading-[1.2] tracking-[-0.01em] text-[color:var(--bower-ink-2)] md:text-[42px]">
              {t.commitTitle[language]}
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-[16px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
              {t.commitBody[language]}
            </p>
            <button
              onClick={() => openModal(t.commitCTA[language])}
              className="btn-primary mt-10 cursor-pointer"
            >
              {t.commitCTA[language]}
            </button>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
