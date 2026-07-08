"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const translations = {
  eyebrow: { en: "About Us", ua: "Про компанію", ru: "О компании" },
  lead: {
    en: "A Ukrainian real estate and investment company with international standards.",
    ua: "Українська компанія з нерухомості та інвестицій, що працює за міжнародними стандартами.",
    ru: "Украинская компания по недвижимости и инвестициям, работающая по международным стандартам.",
  },
  support: {
    en: "Golden Land Property Investment combines 22 years of global experience with deep local market expertise, delivering tailored solutions for investors, property owners, developers and hospitality businesses across Ukraine, the UAE and international markets.",
    ua: "Golden Land Property Investment поєднує 22 роки міжнародного досвіду з глибоким знанням локального ринку, забезпечуючи індивідуальні рішення для інвесторів, власників, девелоперів та готельного бізнесу в Україні, ОАЕ та на міжнародних ринках.",
    ru: "Golden Land Property Investment сочетает 22 года международного опыта с глубоким знанием локального рынка, предлагая индивидуальные решения для инвесторов, собственников, девелоперов и отельного бизнеса в Украине, ОАЭ и на международных рынках.",
  },
  cta: { en: "Learn more", ua: "Дізнатись більше", ru: "Подробнее" },
};

export function RichTextIntro() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <section id="about" className="section-py bg-[color:var(--bower-cream)]">
      <div className="bower-container text-center">
        <SectionEyebrow className="mb-6">{t.eyebrow[language]}</SectionEyebrow>
        <div className="mx-auto max-w-[860px] space-y-6 text-[color:var(--bower-ink-2)]">
          <p className="text-[25px] leading-[1.35] font-light md:text-[32px]">
            {t.lead[language]}
          </p>
          <p className="mx-auto max-w-[720px] text-[17px] leading-[1.7] font-light text-[color:var(--bower-mute)] md:text-[18px]">
            {t.support[language]}
          </p>
        </div>
        <a
          href="/about"
          className="mt-10 inline-flex items-center gap-3 text-[13px] tracking-[0.14em] uppercase text-[color:var(--bower-ink)] group"
        >
          <span>{t.cta[language]}</span>
          <span className="block h-px w-8 bg-[#D4AF37] transition-all duration-300 group-hover:w-12" />
        </a>
      </div>
    </section>
  );
}
