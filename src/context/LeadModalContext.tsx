"use client";

import React, { createContext, useContext, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { submitLead } from "@/lib/leads";

interface LeadModalContextType {
  isOpen: boolean;
  openModal: (title?: string) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

const t = {
  bookTitle: { en: "Book a Consultation", ua: "Замовити консультацію", ru: "Заказать консультацию" },
  getInTouch: { en: "Get in Touch", ua: "Зв'язатися з нами", ru: "Связаться с нами" },
  subhead: {
    en: "Our investment specialist will contact you within 15 minutes.",
    ua: "Наш інвестиційний спеціаліст зв'яжеться з вами протягом 15 хвилин.",
    ru: "Наш инвестиционный специалист свяжется с вами в течение 15 минут.",
  },
  name: { en: "Full Name", ua: "Ваше ім'я", ru: "Ваше имя" },
  phone: { en: "Phone Number", ua: "Номер телефону", ru: "Номер телефона" },
  email: { en: "Email Address", ua: "Електронна пошта", ru: "Электронная почта" },
  interest: { en: "Interested in", ua: "Що вас цікавить?", ru: "Что вас интересует?" },
  selectType: { en: "Select asset type...", ua: "Оберіть тип активу...", ru: "Выберите тип актива..." },
  typeApts: { en: "Apartments & Penthouses", ua: "Апартаменти та пентхауси", ru: "Апартаменты и пентхаусы" },
  typeVillas: { en: "Villas & Houses", ua: "Вілли та будинки", ru: "Виллы и дома" },
  typeHotels: { en: "Hotels & Hospitality", ua: "Готелі та готельний бізнес", ru: "Отели и отельный бизнес" },
  typeCommercial: { en: "Commercial Buildings", ua: "Комерційна нерухомість", ru: "Коммерческая недвижимость" },
  typePortfolio: { en: "Portfolio Diversification", ua: "Диверсифікація портфеля", ru: "Диверсификация портфеля" },
  message: { en: "Message (optional)", ua: "Повідомлення (необов'язково)", ru: "Сообщение (необязательно)" },
  submit: { en: "Submit Request", ua: "Надіслати запит", ru: "Отправить запрос" },
  sending: { en: "Sending...", ua: "Надсилання...", ru: "Отправка..." },
  thanksTitle: { en: "Thank You!", ua: "Дякуємо!", ru: "Благодарим!" },
  thanksBody: {
    en: "Your request has been successfully received. Our investment desk will call you shortly.",
    ua: "Ваш запит успішно отримано. Наш інвестиційний деск зв'яжеться з вами найближчим часом.",
    ru: "Ваш запрос успешно получен. Наш инвестиционный деск свяжется с вами в ближайшее время.",
  },
  close: { en: "Close Window", ua: "Закрити вікно", ru: "Закрыть окно" },
};

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const { language } = useLanguage();

  const openModal = (title?: string) => {
    setModalTitle(title || "");
    setStatus("idle");
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const data = {
      formType: `Popup Form: ${modalTitle || "General Consultation"}`,
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      interest: formData.get("interest") as string,
      message: formData.get("message") as string,
      lang: language,
    };
    try {
      await submitLead(data);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("idle");
    }
  };

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-[500px] bg-[#0d0d0d] border border-[#D4AF37]/30 text-white p-8 md:p-10 shadow-[0_24px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden z-10 scale-100 transition-all duration-300 animate-in fade-in zoom-in-95 duration-200">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 w-44 h-44 bg-[#D4AF37]/10 rounded-full blur-[80px]" />
            <div className="pointer-events-none absolute -left-20 -bottom-20 w-44 h-44 bg-white/5 rounded-full blur-[80px]" />

            {/* Close X Button */}
            <button
              onClick={closeModal}
              className="absolute right-5 top-5 p-2 text-white/50 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === "success" ? (
              /* Success State */
              <div className="text-center py-6">
                <div className="mx-auto w-14 h-14 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-display text-[28px] tracking-[0.02em] text-white font-light mb-4">
                  {t.thanksTitle[language]}
                </h3>
                <p className="text-[14.5px] font-light leading-[1.7] text-white/70 mb-8 max-w-[360px] mx-auto">
                  {t.thanksBody[language]}
                </p>
                <button
                  onClick={closeModal}
                  className="bg-[#D4AF37] text-black w-full py-3.5 text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-white transition-colors duration-300 rounded-sm font-semibold"
                >
                  {t.close[language]}
                </button>
              </div>
            ) : (
              /* Form State */
              <div>
                <h3 className="font-display text-[26px] tracking-[0.02em] text-white font-light mb-1.5">
                  {modalTitle || t.bookTitle[language]}
                </h3>
                <p className="text-[12.5px] font-light text-white/60 mb-8 leading-[1.5]">
                  {t.subhead[language]}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.12em] text-white/50 block font-medium">
                      {t.name[language]} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    />
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-[0.12em] text-white/50 block font-medium">
                        {t.phone[language]} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+380..."
                        className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-[0.12em] text-white/50 block font-medium">
                        {t.email[language]} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@email.com"
                        className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Interest dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.12em] text-white/50 block font-medium">
                      {t.interest[language]}
                    </label>
                    <div className="relative">
                      <select
                        name="interest"
                        className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none cursor-pointer"
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#0d0d0d] text-white/30">
                          {t.selectType[language]}
                        </option>
                        <option value="Apartments" className="bg-[#0d0d0d] text-white">
                          {t.typeApts[language]}
                        </option>
                        <option value="Villas" className="bg-[#0d0d0d] text-white">
                          {t.typeVillas[language]}
                        </option>
                        <option value="Hotels" className="bg-[#0d0d0d] text-white">
                          {t.typeHotels[language]}
                        </option>
                        <option value="Commercial" className="bg-[#0d0d0d] text-white">
                          {t.typeCommercial[language]}
                        </option>
                        <option value="Portfolio" className="bg-[#0d0d0d] text-white">
                          {t.typePortfolio[language]}
                        </option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-[0.12em] text-white/50 block font-medium">
                      {t.message[language]}
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-[14px] font-light text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full mt-6 bg-[#D4AF37] text-black py-4 text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-sm font-semibold shadow-md active:scale-98"
                  >
                    {status === "sending" ? t.sending[language] : t.submit[language]}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
