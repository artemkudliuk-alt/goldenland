"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const translations = {
  eyebrow: { en: "Why Choose Us", ua: "Чому обирають нас", ru: "Почему выбирают нас" },
  heading: {
    en: "Built for investors who value expertise.",
    ua: "Створено для інвесторів, що цінують експертизу.",
    ru: "Создано для инвесторов, ценящих экспертизу.",
  },
  points: [
    {
      num: "01",
      icon: "management",
      title: { en: "Experienced management", ua: "Досвідчений менеджмент", ru: "Опытный менеджмент" },
      desc: {
        en: "22+ years across Australia, UAE, Qatar, Bahrain, Kuwait and Ukraine.",
        ua: "22+ років роботи в Австралії, ОАЕ, Катарі, Бахрейні, Кувейті та Україні.",
        ru: "22+ года работы в Австралии, ОАЭ, Катаре, Бахрейне, Кувейте и Украине.",
      },
    },
    {
      num: "02",
      icon: "network",
      title: { en: "International network", ua: "Міжнародна мережа", ru: "Международная сеть" },
      desc: {
        en: "Investors, developers, hotel owners and private clients across global markets.",
        ua: "Інвестори, девелопери, власники готелів і приватні клієнти на світових ринках.",
        ru: "Инвесторы, девелоперы, владельцы отелей и частные клиенты на мировых рынках.",
      },
    },
    {
      num: "03",
      icon: "knowledge",
      title: { en: "Deep market knowledge", ua: "Глибоке знання ринку", ru: "Глубокое знание рынка" },
      desc: {
        en: "Strong grasp of Ukrainian and international property trends and investment strategies.",
        ua: "Впевнене розуміння тенденцій ринку нерухомості в Україні та світі.",
        ru: "Уверенное понимание тенденций рынка недвижимости в Украине и мире.",
      },
    },
    {
      num: "04",
      icon: "solutions",
      title: { en: "Personalised solutions", ua: "Індивідуальні рішення", ru: "Индивидуальные решения" },
      desc: {
        en: "Every mandate is tailored to the client's investment thesis and portfolio goals.",
        ua: "Кожне доручення адаптоване під інвестиційну стратегію та цілі портфеля клієнта.",
        ru: "Каждое поручение адаптировано под инвестиционную стратегию и цели портфеля клиента.",
      },
    },
    {
      num: "05",
      icon: "transparency",
      title: { en: "Transparency by default", ua: "Прозорість за замовчуванням", ru: "Прозрачность по умолчанию" },
      desc: {
        en: "Clear terms, honest reporting, and no hidden fees — from first call to closing.",
        ua: "Чіткі умови, чесна звітність і жодних прихованих комісій — від першого дзвінка до угоди.",
        ru: "Чёткие условия, честная отчётность и никаких скрытых комиссий — от первого звонка до сделки.",
      },
    },
    {
      num: "06",
      icon: "portfolio",
      title: { en: "Residential + commercial", ua: "Житлова + комерційна", ru: "Жилая + коммерческая" },
      desc: {
        en: "End-to-end expertise across luxury residential, commercial and hospitality assets.",
        ua: "Комплексна експертиза в елітній житловій, комерційній та готельній нерухомості.",
        ru: "Комплексная экспертиза в элитной жилой, коммерческой и отельной недвижимости.",
      },
    },
  ],
};

export function WhyChooseUs() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <section id="why-us" className="section-py bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Мягкое золотое свечение фоном */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.06)_0%,transparent_60%)]" />

      <div className="bower-container relative">
        <div className="mx-auto mb-14 max-w-[820px] text-center md:mb-20">
          <SectionEyebrow className="mb-5">{t.eyebrow[language]}</SectionEyebrow>
          <h2 className="text-[34px] font-light leading-[1.15] tracking-[-0.015em] text-white md:text-[48px]">
            {t.heading[language]}
          </h2>
        </div>

        {/* Сетка карточек с золотыми анимированными иконками */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.points.map((p, i) => (
            <div
              key={i}
              className="group relative flex flex-col justify-between bg-white/[0.03] border border-white/10 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-white/[0.06] hover:shadow-[0_16px_36px_rgba(212,175,55,0.15)] rounded-sm overflow-hidden"
            >
              {/* Декоративный золотой градиент при наведении */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />

              <div>
                {/* Шапка карточки: Номер + Анимированная золотая иконка */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[14px] tracking-[0.25em] text-[#D4AF37] font-semibold">
                    {p.num}
                  </span>
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.05] border border-[#D4AF37]/30 transition-transform duration-500 group-hover:scale-110 group-hover:border-[#D4AF37]">
                    <AnimatedIcon type={p.icon} />
                  </div>
                </div>

                {/* Заголовок и описание */}
                <h3 className="text-[20px] font-light tracking-[-0.01em] text-white group-hover:text-[#D4AF37] transition-colors">
                  {p.title[language]}
                </h3>
                <p className="mt-3 text-[14.5px] font-light leading-[1.7] text-white/70">
                  {p.desc[language]}
                </p>
              </div>

              {/* Акцентная линейка внизу карточки, расширяющаяся при ховере */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="h-[2px] w-8 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* Компонент анимированных векторных золотых иконок */}
function AnimatedIcon({ type }: { type: string }) {
  switch (type) {
    case "management":
      // Корона & Лидерство
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white transition-colors group-hover:text-[#D4AF37]">
          <path
            d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-700 group-hover:-translate-y-0.5"
          />
          <circle cx="12" cy="19" r="1.2" fill="currentColor" className="animate-pulse" />
          <path d="M9 19h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case "network":
      // Международная сеть / Глобус
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white transition-colors group-hover:text-[#D4AF37]">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M3.6 9h16.8M3.6 15h16.8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-opacity duration-500 opacity-80 group-hover:opacity-100"
          />
          <path
            d="M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-700 group-hover:rotate-45 origin-center"
          />
        </svg>
      );

    case "knowledge":
      // Глубокий анализ & Рост
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white transition-colors group-hover:text-[#D4AF37]">
          <path
            d="M3 17l6-6 4 4 8-8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          <path
            d="M17 7h4v4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20h16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      );

    case "solutions":
      // Персональные решения / Золотой ключ
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white transition-colors group-hover:text-[#D4AF37]">
          <circle
            cx="8"
            cy="15"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-transform duration-500 group-hover:scale-110 origin-center"
          />
          <path
            d="M10.8 12.2L19 4M16 4l3 3M14 6l2 2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500 group-hover:rotate-6 origin-center"
          />
        </svg>
      );

    case "transparency":
      // Прозрачность / Бриллиант & Защита
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white transition-colors group-hover:text-[#D4AF37]">
          <path
            d="M6 3h12l4 6-10 12L2 9l4-6z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-700 group-hover:scale-105 origin-center"
          />
          <path
            d="M11 3l1 18M2 9h20M6.5 3L12 9l5.5-6"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.7"
          />
        </svg>
      );

    case "portfolio":
      // Жилая + Коммерческая недвижимость / Небоскреб
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white transition-colors group-hover:text-[#D4AF37]">
          <path
            d="M3 21h18M5 21V7l7-4 7 4v14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 10h2M13 10h2M9 14h2M13 14h2M11 21v-3h2v3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="transition-opacity duration-300 opacity-80 group-hover:opacity-100"
          />
        </svg>
      );

    default:
      return null;
  }
}
