"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  eyebrow: {
    en: "Start Your Journey",
    ua: "Розпочніть свій шлях",
    ru: "Начните свой путь",
  },
  title: {
    en: "Your gateway to premium property investments.",
    ua: "Ваш шлях до преміальних інвестицій у нерухомість.",
    ru: "Ваш путь к премиальным инвестициям в недвижимость.",
  },
  body: {
    en: "From city apartments and luxury villas to hotel investments, discover secure opportunities across Ukraine and key global markets. Our team guides you at every step, from selection to closing.",
    ua: "Від міських апартаментів і елітних вілл до готельних інвестицій — відкрийте надійні можливості в Україні та на ключових світових ринках. Наша команда супроводжує вас на кожному етапі, від вибору до угоди.",
    ru: "От городских апартаментов и элитных вилл до отельных инвестиций — откройте надёжные возможности в Украине и на ключевых мировых рынках. Наша команда сопровождает вас на каждом этапе, от выбора до сделки.",
  },
  cta: {
    en: "Book a Consultation",
    ua: "Записатися на консультацію",
    ru: "Записаться на консультацию",
  },
};

import { useLeadModal } from "@/context/LeadModalContext";

export function TimeToUnwind() {
  const { language } = useLanguage();
  const { openModal } = useLeadModal();
  const t = translations;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[85vh] w-full flex items-center">
        {/* Панорамная фоновая картинка Киева на весь экран */}
        <Image
          src="/images/generated/kyiv_panoramic_banner.png"
          alt="Kyiv luxury property investments skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Градиентное затемнение слева для контраста текста и открытых зданий справа */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />

        {/* Контент слева */}
        <div className="relative z-10 mx-auto max-w-[1440px] w-full px-6 md:px-12 flex justify-start">
          <div className="max-w-[620px] text-left text-white py-16 md:py-24">
            <p className="mb-4 text-[11px] font-normal uppercase tracking-[0.32em] text-[#D4AF37]">
              {t.eyebrow[language]}
            </p>

            <h2 className="text-[36px] font-light leading-[1.12] tracking-[-0.015em] text-white md:text-[52px]">
              {t.title[language]}
            </h2>

            <p className="mt-6 text-[15px] font-light leading-[1.8] text-white/90 md:text-[16px]">
              {t.body[language]}
            </p>

            <div className="mt-10">
              <button
                onClick={() => openModal(t.cta[language])}
                className="inline-flex items-center justify-center bg-[#D4AF37] text-[#0a0a0a] border border-[#D4AF37] px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white hover:border-white hover:text-[#0a0a0a] shadow-lg cursor-pointer"
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
