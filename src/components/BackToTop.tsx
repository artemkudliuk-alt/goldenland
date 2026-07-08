"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useContacts } from "@/context/ContactsContext";

const t = {
  call: { en: "Call Company Office", ua: "Дзвінок в офіс компанії", ru: "Звонок в офис компании" },
  whatsapp: { en: "Chat on WhatsApp", ua: "Чат у WhatsApp", ru: "Чат в WhatsApp" },
  telegram: { en: "Contact in Telegram", ua: "Зв'язатись у Telegram", ru: "Связаться в Telegram" },
  top: { en: "Back to Top", ua: "Вгору", ru: "Наверх" },
  concierge: { en: "Contact Us", ua: "Зв'язатися", ru: "Связаться" },
};

export function BackToTop() {
  const [showScroll, setShowScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const { whatsapp, telegram } = useContacts();
  const cleanMainWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".group")) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div className="group fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {/* Main Trigger Horizontal Badge */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle concierge menu"
        className="px-5 py-2.5 h-11 rounded-full bg-[#0a0a0a] border border-white/20 text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white font-medium text-[12px] uppercase tracking-[0.08em] select-none active:scale-95 flex items-center gap-2.5 group-hover:border-white cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
        <span>{t.concierge[language]}</span>
      </button>

      {/* Floating Actions Dock */}
      <div 
        className={[
          "flex flex-col items-end gap-3 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] mb-1",
          isOpen 
            ? "pointer-events-auto opacity-100 translate-y-0" 
            : "pointer-events-none opacity-0 translate-y-6 md:group-hover:pointer-events-auto md:group-hover:opacity-100 md:group-hover:translate-y-0"
        ].join(" ")}
      >
        
        {/* Back to Top */}
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
          }}
          className={[
            "relative flex items-center group/item cursor-pointer transition-all duration-300",
            showScroll ? "opacity-100 scale-100 h-10" : "opacity-0 scale-75 h-0 overflow-hidden pointer-events-none"
          ].join(" ")}
        >
          <span className="absolute right-12 opacity-0 translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 bg-[#0a0a0a]/90 backdrop-blur-md text-white border border-[#D4AF37]/50 px-3 py-1.5 rounded-sm text-[12px] font-light tracking-[0.05em] whitespace-nowrap pointer-events-none shadow-md">
            {t.top[language]}
          </span>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0a0a0a] border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </div>
        </button>

        {/* Telegram Chat */}
        <a
          href={`https://t.me/${telegram}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="relative flex items-center group/item cursor-pointer"
        >
          <span className="absolute right-12 opacity-0 translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 bg-[#0a0a0a]/90 backdrop-blur-md text-white border border-[#D4AF37]/50 px-3 py-1.5 rounded-sm text-[12px] font-light tracking-[0.05em] whitespace-nowrap pointer-events-none shadow-md">
            {t.telegram[language]}
          </span>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0a0a0a] border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white shadow-lg">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M9.8 15.3 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 4 2.9c.7.4 1.2.2 1.4-.7l2.6-12h0c.2-1-.4-1.5-1.1-1.2L3.6 10.4c-1 .4-1 1-.2 1.2l4.2 1.3 9.7-6.1c.4-.3.8-.1.5.2z"/>
            </svg>
          </div>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${cleanMainWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="relative flex items-center group/item cursor-pointer"
        >
          <span className="absolute right-12 opacity-0 translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 bg-[#0a0a0a]/90 backdrop-blur-md text-white border border-[#D4AF37]/50 px-3 py-1.5 rounded-sm text-[12px] font-light tracking-[0.05em] whitespace-nowrap pointer-events-none shadow-md">
            {t.whatsapp[language]}
          </span>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#0a0a0a] border border-white/20 text-white transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white shadow-lg">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
              <path d="M20.5 3.5A11 11 0 0 0 3.4 17.1L2 22l5-1.3A11 11 0 0 0 20.5 3.5zM12 20a8 8 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z"/>
            </svg>
          </div>
        </a>

        {/* Direct Phone Call */}
        <a
          href={`tel:${whatsapp.replace(/\s+/g, "")}`}
          onClick={() => setIsOpen(false)}
          className="relative flex items-center group/item cursor-pointer"
        >
          <span className="absolute right-12 opacity-0 translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 bg-[#0a0a0a]/90 backdrop-blur-md text-white border border-[#D4AF37]/50 px-3 py-1.5 rounded-sm text-[12px] font-light tracking-[0.05em] whitespace-nowrap pointer-events-none shadow-md">
            {t.call[language]}: {whatsapp}
          </span>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#D4AF37] text-[#0a0a0a] border border-[#D4AF37] transition-all duration-300 hover:bg-white hover:text-[#0a0a0a] hover:border-white shadow-lg animate-[pulse_2.5s_infinite]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4.5 w-4.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
        </a>

      </div>
    </div>
  );
}
