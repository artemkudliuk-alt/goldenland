"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { goldenLandData } from "@/lib/data";
import { useContacts } from "@/context/ContactsContext";

const translations = {
  eyebrow: { en: "International Presence", ua: "Міжнародна присутність", ru: "Международное присутствие" },
  heading: {
    en: "Five locations, one team.",
    ua: "П'ять локацій, єдина команда.",
    ru: "Пять локаций, единая команда.",
  },
  subhead: {
    en: "Local expertise on the ground in each market — with a single point of contact for your entire investment journey.",
    ua: "Локальна експертиза в кожному ринку — з єдиним контактом для всього інвестиційного шляху.",
    ru: "Локальная экспертиза в каждом рынке — с единым контактом на всём инвестиционном пути.",
  },
  role: {
    kyiv: { en: "Head Office", ua: "Головний офіс", ru: "Головной офис" },
    sydney: { en: "Regional Hub", ua: "Регіональний хаб", ru: "Региональный хаб" },
    qatar: { en: "Investor Relations", ua: "Робота з инвесторами", ru: "Работа с инвесторами" },
    dubai: { en: "Investment Desk", ua: "Інвестиційний деск", ru: "Инвестиционный деск" },
    odesa: { en: "Regional Office", ua: "Регіональний офіс", ru: "Региональный офис" },
  },
  callBtn: { en: "Call", ua: "Дзвінок", ru: "Звонок" },
  waBtn: { en: "WhatsApp", ua: "WhatsApp", ru: "WhatsApp" },
};
type OfficeKey = "kyiv" | "sydney" | "qatar" | "dubai" | "odesa";

const flags: Record<OfficeKey, React.ReactNode> = {
  kyiv: (
    <svg viewBox="0 0 3 2" className="h-4.5 w-6 rounded-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.35)] overflow-hidden border border-white/10">
      <rect width="3" height="1" fill="#0057B7"/>
      <rect y="1" width="3" height="1" fill="#FFD700"/>
    </svg>
  ),
  sydney: (
    <svg viewBox="0 0 60 30" className="h-4.5 w-6 rounded-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.35)] overflow-hidden border border-white/10">
      <rect width="60" height="30" fill="#00008B"/>
      <line x1="0" y1="0" x2="30" y2="15" stroke="#ffffff" strokeWidth="4"/>
      <line x1="0" y1="15" x2="30" y2="0" stroke="#ffffff" strokeWidth="4"/>
      <line x1="0" y1="0" x2="30" y2="15" stroke="#FF0000" strokeWidth="2"/>
      <line x1="0" y1="15" x2="30" y2="0" stroke="#FF0000" strokeWidth="2"/>
      <rect x="12" y="0" width="6" height="15" fill="#ffffff"/>
      <rect x="0" y="4.5" width="30" height="6" fill="#ffffff"/>
      <rect x="13.5" y="0" width="3" height="15" fill="#FF0000"/>
      <rect x="0" y="6" width="30" height="3" fill="#FF0000"/>
      <polygon points="15,20 17,23 21,23 18,25 20,28 15,26 10,28 12,25 9,23 13,23" fill="#ffffff"/>
      <circle cx="45" cy="7.5" r="1.5" fill="#ffffff"/>
      <circle cx="45" cy="22.5" r="1.5" fill="#ffffff"/>
      <circle cx="52.5" cy="12.5" r="1.5" fill="#ffffff"/>
      <circle cx="37.5" cy="15" r="1.5" fill="#ffffff"/>
      <circle cx="48" cy="18" r="0.75" fill="#ffffff"/>
    </svg>
  ),
  qatar: (
    <svg viewBox="0 0 28 11" className="h-4.5 w-6 rounded-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.35)] overflow-hidden border border-white/10">
      <rect width="28" height="11" fill="#8D1B3D"/>
      <path d="M 0,0 L 8,0 L 10,0.61 L 8,1.22 L 10,1.83 L 8,2.44 L 10,3.05 L 8,3.66 L 10,4.27 L 8,4.88 L 10,5.49 L 8,6.1 L 10,6.71 L 8,7.32 L 10,7.93 L 8,8.54 L 10,9.15 L 8,9.76 L 10,10.37 L 8,11 L 0,11 Z" fill="#ffffff"/>
    </svg>
  ),
  dubai: (
    <svg viewBox="0 0 6 3" className="h-4.5 w-6 rounded-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.35)] overflow-hidden border border-white/10">
      <rect width="6" height="3" fill="#ffffff"/>
      <rect width="1.5" height="3" fill="#FF0000"/>
      <rect x="1.5" width="4.5" height="1" fill="#00732F"/>
      <rect x="1.5" y="1" width="4.5" height="1" fill="#ffffff"/>
      <rect x="1.5" y="2" width="4.5" height="1" fill="#000000"/>
    </svg>
  ),
  odesa: (
    <svg viewBox="0 0 3 2" className="h-4.5 w-6 rounded-[2px] shadow-[0_1px_4px_rgba(0,0,0,0.35)] overflow-hidden border border-white/10">
      <rect width="3" height="1" fill="#0057B7"/>
      <rect y="1" width="3" height="1" fill="#FFD700"/>
    </svg>
  ),
};

export function InternationalPresence() {
  const { language } = useLanguage();
  const { offices } = useContacts();
  const t = translations;

  return (
    <section id="offices" className="relative overflow-hidden bg-[#0a0a0a] text-white section-py-lg">
      {/* Мягкое золотое свечение фоном */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.08)_0%,transparent_60%)]" />

      <div className="bower-container relative">
        <div className="mx-auto mb-14 max-w-[820px] text-center md:mb-16">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.32em] text-[#D4AF37]">
            {t.eyebrow[language]}
          </p>
          <h2 className="text-[36px] font-light leading-[1.15] tracking-[-0.015em] text-white md:text-[50px]">
            {t.heading[language]}
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16px] font-light leading-[1.75] text-white/90 md:text-[17px]">
            {t.subhead[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {offices.map((o) => {
            const key = o.id as OfficeKey;
            const cleanPhone = o.phone.replace(/\s+/g, "");
            const waHref = `https://wa.me/${cleanPhone.replace(/^\+/, "")}`;
            
            // Safety fallbacks if client adds new offices not present in hardcoded keys
            const flag = flags[key] || (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-6 text-[#D4AF37]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 16.5h1.5M13.5 16.5H15" />
              </svg>
            );
            
            const roleText = t.role[key as keyof typeof t.role]?.[language] || {
              en: "Partner Office",
              ua: "Партнерський офіс",
              ru: "Партнерский офис"
            }[language];

            return (
              <div
                key={o.id}
                className="group relative flex flex-col border border-white/20 bg-white/[0.06] p-8 backdrop-blur-md transition-all duration-300 hover:border-[#D4AF37] hover:bg-white/[0.1] shadow-lg"
              >
                <div className="absolute right-6 top-6">
                  {flag}
                </div>

                <p className="text-[11px] tracking-[0.24em] uppercase text-[#D4AF37] font-semibold">
                  {roleText}
                </p>
                <h3 className="mt-3 text-[22px] md:text-[24px] font-normal tracking-[-0.01em] text-white">
                  {o.name[language]}
                </h3>

                <div className="mt-6 flex-1">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="block text-[16px] font-medium text-white transition-colors hover:text-[#D4AF37]"
                  >
                    {o.phone}
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex-1 border border-white/40 py-2.5 text-center text-[11px] font-medium tracking-[0.14em] uppercase text-white transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    {t.callBtn[language]}
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#D4AF37] py-2.5 text-center text-[11px] font-medium tracking-[0.14em] uppercase text-[#0a0a0a] transition-colors hover:bg-white"
                  >
                    {t.waBtn[language]}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
