"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const translations = {
  eyebrow: { en: "Market Potential", ua: "Потенціал ринку", ru: "Потенциал рынка" },
  title: {
    en: "Why Invest in Ukraine",
    ua: "Чому варто інвестувати в Україну",
    ru: "Почему стоит инвестировать в Украину",
  },
  intro: {
    en: "Ukraine is an amazing country with enormous potential and a bright future. Strategic location in Europe, highly educated workforce, and growing infrastructure make it highly attractive for long-term growth.",
    ua: "Україна — це дивовижна країна з великим потенціалом і перспективним майбутнім. Вигідне розташування у Європі, висококваліфікована робоча сила та зростаюча інфраструктура роблять її надзвичайно привабливою для довгострокового зростання.",
    ru: "Украина — удивительная страна с огромным потенциалом и перспективным будущим. Выгодное географическое положение в Европе, высококвалифицированная рабочая сила и растущая инфраструктура делают её крайне привлекательной для долгосрочного роста.",
  },
  citiesTitle: {
    en: "Key Investment Hubs",
    ua: "Ключові інвестиційні центри",
    ru: "Ключевые инвестиционные центры",
  },
  cities: {
    en: "Major cities such as Kyiv, Odesa, and Lviv continue to demonstrate strong long-term investment potential due to increasing international interest, urban development, and tourism growth.",
    ua: "Такі міста, як Київ, Одеса та Львів, продовжують демонструвати високий потенціал для довгострокових інвестицій завдяки розвитку інфраструктури, туризму та зростаючому міжнародному інтересу.",
    ru: "Такие города, как Киев, Одесса и Львов, продолжают демонстрировать высокий потенциал долгосрочных инвестиций благодаря развитию инфраструктуры, туризма и растущему международному интересу.",
  },
};

export function SunshineSection() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <section id="why-ukraine" className="section-py bg-white">
      <div className="bower-container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

          {/* Левая колонка: 3D Золотая карта-слиток Украины на прозрачном фоне */}
          <div className="relative w-full aspect-[4/3] max-w-[540px] mx-auto flex items-center justify-center group">
            <Image
              src="/images/generated/ukraine_gold_ingot_map.png"
              alt="Golden Land Ukraine Real Estate Investment Gold Ingot Map"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(212,175,55,0.2)]"
              priority
            />
          </div>

          {/* Правая колонка: заголовок и параграфы */}
          <div className="max-w-[640px]">
            <SectionEyebrow className="mb-5">{t.eyebrow[language]}</SectionEyebrow>
            <h2 className="font-display text-[38px] leading-[1.1] font-light text-[color:var(--bower-ink-2)] md:text-[46px]">
              {t.title[language]}
            </h2>
            <div className="mt-8 space-y-6 text-[16px] leading-[1.75] font-light text-[color:var(--bower-mute)]">
              <p>{t.intro[language]}</p>
              <div>
                <h3 className="text-[18px] font-semibold text-[color:var(--bower-ink-2)] mb-3">
                  {t.citiesTitle[language]}
                </h3>
                <p>{t.cities[language]}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
