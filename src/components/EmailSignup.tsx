"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { submitLead } from "@/lib/leads";

const t = {
  eyebrow: { en: "Newsletter", ua: "Розсилка", ru: "Рассылка" },
  heading: {
    en: "Join Golden Land.",
    ua: "Приєднуйтесь до Golden Land.",
    ru: "Присоединяйтесь к Golden Land.",
  },
  body: {
    en: "Be first to receive Ukraine and UAE market updates, exclusive off-plan projects and investment briefings from our team.",
    ua: "Першими отримуйте огляди ринку України та ОАЕ, ексклюзивні off-plan проєкти та інвестиційні брифи від нашої команди.",
    ru: "Первыми получайте обзоры рынка Украины и ОАЭ, эксклюзивные off-plan проекты и инвестиционные брифы от нашей команды.",
  },
  emailPh: { en: "Email address", ua: "Ел. пошта", ru: "Email" },
  subscribe: { en: "Subscribe", ua: "Підписатись", ru: "Подписаться" },
  legal: {
    en: "By subscribing you agree to receive email communication and can unsubscribe at any time.",
    ua: "Підписуючись, ви погоджуєтесь отримувати email-розсилку і можете скасувати її в будь-який момент.",
    ru: "Подписываясь, вы соглашаетесь получать email-рассылку и можете отписаться в любой момент.",
  },
  success: {
    en: "Thank you! You have successfully subscribed to our newsletter.",
    ua: "Дякуємо! Ви успішно підписалися на нашу розсилку.",
    ru: "Спасибо! Вы успешно подписались на нашу рассылку.",
  },
};

export function EmailSignup() {
  const { language } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="section-py bg-[#faf9f6]">
      <div className="bower-container">
        <div className="mx-auto max-w-[840px] text-center bg-white border border-[#D4AF37]/20 p-10 md:p-20 shadow-[0_10px_35px_rgba(0,0,0,0.03)] rounded-sm">
          <SectionEyebrow className="mb-4">{t.eyebrow[language]}</SectionEyebrow>
          <h2 className="text-[34px] font-light leading-[1.15] tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[50px]">
            {t.heading[language]}
          </h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[16px] font-light leading-[1.75] text-[color:var(--bower-mute)] md:text-[17px]">
            {t.body[language]}
          </p>

          {subscribed ? (
            <div className="mx-auto mt-8 max-w-[520px] border border-[#D4AF37]/40 bg-[#fcf8ed] p-5 text-[15px] font-medium text-[#0a0a0a]">
              {t.success[language]}
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-[580px]">
              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = {
                    formType: "Newsletter Subscription",
                    email: formData.get("email") as string,
                    lang: language,
                  };
                  await submitLead(data);
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  name="email"
                  aria-label={t.emailPh[language]}
                  placeholder={t.emailPh[language]}
                  required
                  className="w-full border border-gray-300 bg-white px-5 py-4 text-[15px] font-light text-[#0a0a0a] placeholder:text-gray-400 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#0a0a0a] text-white border border-[#0a0a0a] px-8 py-4 text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0a0a0a] shrink-0 shadow-sm"
                >
                  {t.subscribe[language]}
                </button>
              </form>
              <p className="mx-auto mt-4 max-w-[480px] text-[12px] leading-[1.6] text-gray-500">
                {t.legal[language]}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
