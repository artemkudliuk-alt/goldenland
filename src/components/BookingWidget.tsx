"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDownIcon } from "@/components/icons";

const translations = {
  location: { en: "Location", ua: "Локація", ru: "Локация" },
  type: { en: "Property Type", ua: "Тип нерухомості", ru: "Тип недвижимости" },
  beds: { en: "Bedrooms", ua: "Спальні", ru: "Спальни" },
  budget: { en: "Max Budget", ua: "Макс. Бюджет", ru: "Макс. Бюджет" },
  searchBtn: { en: "Search", ua: "Пошук", ru: "Поиск" },

  // Options
  locKyiv: { en: "Kyiv, Ukraine", ua: "Київ, Україна", ru: "Киев, Украина" },
  locOdesa: { en: "Odesa, Ukraine", ua: "Одеса, Україна", ru: "Одесса, Украина" },
  locLviv: { en: "Lviv, Ukraine", ua: "Львів, Україна", ru: "Львов, Украина" },

  typeAll: { en: "All Types", ua: "Всі типи", ru: "Все типы" },
  typeApartments: { en: "Apartments", ua: "Апартаменти", ru: "Апартаменты" },
  typeVillas: { en: "Villas & Houses", ua: "Вілли та будинки", ru: "Виллы и дома" },
  typeHotels: { en: "Hotel Investments", ua: "Готельні інвестиції", ru: "Отельные инвестиции" },
  typeCommercial: { en: "Commercial Real Estate", ua: "Комерційна нерухомість", ru: "Коммерческая недвижимость" },

  bedsAny: { en: "Any Bedrooms", ua: "Будь-яка к-сть", ru: "Любое число" },
  beds1: { en: "1 Bedroom", ua: "1 спальня", ru: "1 спальня" },
  beds2: { en: "2 Bedrooms", ua: "2 спальні", ru: "2 спальни" },
  beds3: { en: "3 Bedrooms", ua: "3 спальні", ru: "3 спальни" },
  beds4: { en: "4+ Bedrooms", ua: "4+ спалень", ru: "4+ спален" },
};

export function BookingWidget() {
  const { language } = useLanguage();
  const t = translations;
  const router = useRouter();

  const [city, setCity] = useState("all");
  const [type, setType] = useState("all");
  const [beds, setBeds] = useState("any");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city !== "all") params.set("city", city);
    if (type !== "all") params.set("type", type);
    if (beds !== "any") params.set("beds", beds);
    if (budget.trim()) params.set("budget", budget.trim());

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <section id="search" className="relative z-30 -mt-16 sm:-mt-20">
      <div className="mx-auto max-w-[1180px] px-4">
        <div className="grid grid-cols-1 gap-0 bg-[#0a0a0a] text-white sm:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">

          {/* Поле выбора локации */}
          <div className="flex flex-col justify-center gap-1 border-l border-white/10 first:border-l-0 px-6 py-4">
            <span className="text-[11px] tracking-[0.06em] text-white/70 uppercase">
              {t.location[language]}
            </span>
            <div className="relative">
              <select
                className="w-full bg-transparent text-[15px] font-light text-white focus:outline-none appearance-none pr-8 cursor-pointer"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="all" className="bg-[#0a0a0a] text-white">{language === "en" ? "All Locations" : language === "ua" ? "Всі локації" : "Все локации"}</option>
                <option value="kyiv" className="bg-[#0a0a0a] text-white">{t.locKyiv[language]}</option>
                <option value="lviv" className="bg-[#0a0a0a] text-white">{t.locLviv[language]}</option>
                <option value="odesa" className="bg-[#0a0a0a] text-white">{t.locOdesa[language]}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-3 w-3 text-white/70" />
              </div>
            </div>
          </div>

          {/* Поле выбора типа недвижимости */}
          <div className="flex flex-col justify-center gap-1 border-l border-white/10 px-6 py-4">
            <span className="text-[11px] tracking-[0.06em] text-white/70 uppercase">
              {t.type[language]}
            </span>
            <div className="relative">
              <select
                className="w-full bg-transparent text-[15px] font-light text-white focus:outline-none appearance-none pr-8 cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="all" className="bg-[#0a0a0a] text-white">{t.typeAll[language]}</option>
                <option value="apartments" className="bg-[#0a0a0a] text-white">{t.typeApartments[language]}</option>
                <option value="villas" className="bg-[#0a0a0a] text-white">{t.typeVillas[language]}</option>
                <option value="hotels" className="bg-[#0a0a0a] text-white">{t.typeHotels[language]}</option>
                <option value="commercial" className="bg-[#0a0a0a] text-white">{t.typeCommercial[language]}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-3 w-3 text-white/70" />
              </div>
            </div>
          </div>

          {/* Поле выбора спален */}
          <div className="flex flex-col justify-center gap-1 border-l border-white/10 px-6 py-4">
            <span className="text-[11px] tracking-[0.06em] text-white/70 uppercase">
              {t.beds[language]}
            </span>
            <div className="relative">
              <select
                className="w-full bg-transparent text-[15px] font-light text-white focus:outline-none appearance-none pr-8 cursor-pointer"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
              >
                <option value="any" className="bg-[#0a0a0a] text-white">{t.bedsAny[language]}</option>
                <option value="1" className="bg-[#0a0a0a] text-white">{t.beds1[language]}</option>
                <option value="2" className="bg-[#0a0a0a] text-white">{t.beds2[language]}</option>
                <option value="3" className="bg-[#0a0a0a] text-white">{t.beds3[language]}</option>
                <option value="4" className="bg-[#0a0a0a] text-white">{t.beds4[language]}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-3 w-3 text-white/70" />
              </div>
            </div>
          </div>

          {/* Поле ввода бюджета */}
          <div className="flex flex-col justify-center gap-1 border-l border-white/10 px-6 py-4">
            <span className="text-[11px] tracking-[0.06em] text-white/70 uppercase">
              {t.budget[language]}
            </span>
            <input
              type="text"
              placeholder="e.g. $500k"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-transparent text-[15px] font-light text-white placeholder:text-white/40 focus:outline-none border-none p-0"
            />
          </div>

          {/* Кнопка Поиска */}
          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#0a0a0a] px-10 py-6 text-[14px] font-medium tracking-[0.08em] text-white uppercase transition-colors hover:bg-white hover:text-[#0a0a0a] border-l border-white/10 cursor-pointer"
          >
            {t.searchBtn[language]}
          </button>
        </div>
      </div>
    </section>
  );
}
