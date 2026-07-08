"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";

const translations = {
  eyebrow: { en: "Founder & CEO", ua: "Засновник та директор", ru: "Основатель и директор" },
  name: { en: "Walid Dib", ua: "Валід Діб", ru: "Валид Диб" },
  caption: {
    en: "22 years across Australia, New Zealand, UAE, Qatar, Bahrain and Kuwait — building trusted bridges for global property investors.",
    ua: "22 роки досвіду в Австралії, Новій Зеландії, ОАЕ, Катарі, Бахрейні та Кувейті — надійні мости для міжнародних інвесторів у нерухомість.",
    ru: "22 года в Австралии, Новой Зеландии, ОАЭ, Катаре, Бахрейне и Кувейте — надёжные мосты для международных инвесторов в недвижимость.",
  },
  bio1: {
    en: "Walid Dib is a highly experienced real estate professional with more than 22 years of experience in the international property market. He holds a diploma in property studies and has successfully worked across several international markets including Australia, New Zealand, United Arab Emirates, Qatar, Bahrain, and Kuwait.",
    ua: "Валід Діб — висококваліфікований фахівець у сфері нерухомості з понад 22-річним досвідом роботи на міжнародному ринку. Він має профільний диплом та успішно працював на міжнародних ринках, зокрема в Австралії, Новій Зеландії, ОАЕ, Катарі, Бахрейні та Кувейті.",
    ru: "Валид Диб — высококвалифицированный специалист в сфере недвижимости с более чем 22-летним опытом работы на международном рынке. Он имеет профильный диплом и успешно работал на рынках Австралии, Новой Зеландии, ОАЭ, Катара, Бахрейна и Кувейта.",
  },
  bio2: {
    en: "Throughout his career, Walid Dib has specialized in buying, selling, and managing high-end residential and commercial properties, including luxury hotels and hospitality investments. His international network connects global investors with premium real estate.",
    ua: "Протягом своєї кар’єри Валід Діб спеціалізувався на купівлі, продажу та управлінні елітною житловою і комерційною нерухомістю, включаючи розкішні готелі. Його міжнародна мережа зв'язків об'єднує глобальних інвесторів з преміальними об'єктами.",
    ru: "На протяжении своей карьеры Валид Диб специализировался на покупке, продаже и управлении элитной жилой и коммерческой недвижимостью, включая роскошные отели. Его международная сеть контактов объединяет глобальных инвесторов с премиальными объектами.",
  },
  cta: { en: "Get in Touch", ua: "Зв'язатися", ru: "Связаться" },
};

import { useLeadModal } from "@/context/LeadModalContext";

export function TheHotelSection() {
  const { language } = useLanguage();
  const { openModal } = useLeadModal();
  const t = translations;

  return (
    <section id="founder" className="section-py bg-[color:var(--bower-cream)]">
      <div className="bower-container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">

          {/* Левая колонка: Портрет основателя */}
          <div className="relative w-full overflow-hidden aspect-[4/5] bg-gray-100 rounded-sm">
            <Image
              src="/images/generated/walid_dib.png"
              alt="Walid Dib - Founder & CEO of Golden Land"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>

          {/* Правая колонка: Заголовок, биография и кнопка с золотым ховером */}
          <div className="flex flex-col justify-center">
            <SectionEyebrow className="mb-6">{t.eyebrow[language]}</SectionEyebrow>
            <h2 className="text-[36px] font-light leading-[1.15] tracking-[-0.02em] text-[color:var(--bower-ink-2)] md:text-[48px]">
              {t.name[language]}
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-[1.75] font-light text-[color:var(--bower-mute)]">
              <p>{t.bio1[language]}</p>
              <p>{t.bio2[language]}</p>
            </div>
            <div className="mt-8">
              <button
                onClick={() => openModal(t.cta[language])}
                className="inline-flex items-center justify-center bg-[#0a0a0a] text-white border border-[#0a0a0a] px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0a0a0a] shadow-sm cursor-pointer animate-none"
              >
                {t.cta[language]}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
