"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MuteIcon, VolumeIcon } from "@/components/icons";

const translations = {
  eyebrow: {
    en: "Premium Real Estate Investment",
    ua: "Преміальні інвестиції в нерухомість",
    ru: "Премиальные инвестиции в недвижимость",
  },
  headline: {
    en: "Premium property investments across Ukraine's leading cities.",
    ua: "Преміальні інвестиції в нерухомість у провідних містах України.",
    ru: "Премиальные инвестиции в недвижимость в ведущих городах Украины.",
  },
  subhead: {
    en: "22 years of international expertise, connecting investors with high-end residential, commercial and hospitality opportunities.",
    ua: "22 роки міжнародного досвіду — з'єднуємо інвесторів з елітною житловою, комерційною та готельною нерухомістю.",
    ru: "22 года международного опыта — соединяем инвесторов с элитной жилой, коммерческой и отельной недвижимостью.",
  },
  ctaPrimary: { en: "Explore Catalog", ua: "Каталог об'єктів", ru: "Каталог объектов" },
  ctaSecondary: { en: "Book a Consultation", ua: "Консультація", ru: "Консультация" },
};

import Link from "next/link";
import { useLeadModal } from "@/context/LeadModalContext";

export function HeroVideo() {
  const [muted, setMuted] = useState(true);
  const { language } = useLanguage();
  const { openModal } = useLeadModal();
  const t = translations;

  return (
    <section className="relative w-full h-[100vh] min-h-[640px] overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
        poster="/images/hero_banner_poster.jpg"
      >
        <source src="/videos/hero_banner.mp4" type="video/mp4" />
      </video>

      {/* Затемнение для читаемости белого текста */}
      <div className="absolute inset-x-0 top-0 h-[240px] bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[320px] bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      
      {/* Левостороннее затемнение под текст */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[65%] bg-gradient-to-r from-black/90 via-black/55 to-transparent pointer-events-none" />

      {/* Контент, смещенный влево */}
      <div className="relative z-10 flex h-full items-center justify-start px-6 md:px-12 text-white">
        <div className="bower-container w-full transform translate-y-[10%] md:translate-y-0">
          <div className="max-w-[1180px] text-left">
            <span className="mb-4 hidden md:block text-[11px] font-normal uppercase tracking-[0.32em] text-[#D4AF37]">
              {t.eyebrow[language]}
            </span>

            <h1 className="text-[40px] font-light leading-[1.1] tracking-[-0.015em] md:text-[62px] lg:text-[76px] text-white">
              {t.headline[language]}
            </h1>

            <p className="mt-6 text-[16px] font-light leading-[1.8] text-white/90 md:text-[18px] max-w-[580px] hidden md:block">
              {t.subhead[language]}
            </p>

            <div className="mt-6 md:mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="bg-[#D4AF37] text-[#0a0a0a] border border-[#D4AF37] px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white hover:border-white hover:text-[#0a0a0a] shadow-lg"
              >
                {t.ctaPrimary[language]}
              </Link>
              <button
                onClick={() => openModal(t.ctaSecondary[language])}
                className="bg-transparent text-white border border-white/60 px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-white hover:border-white hover:text-[#0a0a0a] cursor-pointer"
              >
                {t.ctaSecondary[language]}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-6 right-6 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#0a0a0a] shadow-sm transition hover:bg-white"
      >
        {muted ? <MuteIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
      </button>
    </section>
  );
}
