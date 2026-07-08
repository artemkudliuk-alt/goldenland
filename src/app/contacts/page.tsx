"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { InternationalPresence } from "@/components/InternationalPresence";
import { useLanguage } from "@/context/LanguageContext";
import { goldenLandData } from "@/lib/data";
import { submitLead } from "@/lib/leads";

const t = {
  hero: {
    eyebrow: { en: "Our Commitment", ua: "Наше зобов'язання", ru: "Наше обязательство" },
    title: {
      en: "Speak to a Golden Land investment advisor.",
      ua: "Зв'яжіться з інвестиційним консультантом Golden Land.",
      ru: "Свяжитесь с инвестиционным консультантом Golden Land.",
    },
    subtitle: {
      en: "We reply within 15 minutes on WhatsApp during business hours. Send us your investment brief — our team will follow up with tailored opportunities.",
      ua: "Ми відповідаємо протягом 15 хвилин у WhatsApp у робочі години. Надішліть інвестиційний бриф — команда підбере релевантні можливості.",
      ru: "Отвечаем в течение 15 минут в WhatsApp в рабочие часы. Отправьте инвестиционный бриф — команда подберёт релевантные возможности.",
    },
  },
  formTitle: { en: "Book a meeting", ua: "Записатись на зустріч", ru: "Записаться на встречу" },
  formSubtitle: {
    en: "In-person at one of our offices, or via Zoom.",
    ua: "В офісі чи онлайн через Zoom.",
    ru: "В офисе или онлайн через Zoom.",
  },
  fName: { en: "Full name", ua: "Ім'я та прізвище", ru: "Имя и фамилия" },
  fPhone: { en: "Phone / WhatsApp", ua: "Телефон / WhatsApp", ru: "Телефон / WhatsApp" },
  fEmail: { en: "Email", ua: "Ел. пошта", ru: "Email" },
  fInterest: { en: "What are you looking for?", ua: "Що вас цікавить?", ru: "Что вас интересует?" },
  fInterestPh: {
    en: "e.g. Kyiv penthouse, off-plan Lviv, hotel investment...",
    ua: "напр. пентхаус у Києві, off-plan Львів, готельні інвестиції...",
    ru: "напр. пентхаус в Киеве, off-plan Львов, отельные инвестиции...",
  },
  fMsg: { en: "Additional details (optional)", ua: "Додаткова інформація (за бажанням)", ru: "Дополнительная информация (по желанию)" },
  fFormat: { en: "Preferred format", ua: "Формат зустрічі", ru: "Формат встречи" },
  fOffice: { en: "In office", ua: "В офісі", ru: "В офисе" },
  fZoom: { en: "Zoom call", ua: "Zoom-дзвінок", ru: "Zoom-звонок" },
  fWA: { en: "WhatsApp chat", ua: "Чат WhatsApp", ru: "Чат WhatsApp" },
  fSubmit: { en: "Send Request", ua: "Надіслати", ru: "Отправить" },
  fLegal: {
    en: "By submitting you agree to our privacy policy. We respond within 15 minutes.",
    ua: "Надсилаючи, ви погоджуєтесь з нашою політикою конфіденційності. Відповідаємо протягом 15 хвилин.",
    ru: "Отправляя, вы соглашаетесь с нашей политикой конфиденциальности. Отвечаем в течение 15 минут.",
  },

  mapLabel: {
    en: "Head Office",
    ua: "Головний офіс",
    ru: "Головной офис",
  },
  headAddress: {
    en: "Kyiv, Ukraine",
    ua: "Київ, Україна",
    ru: "Киев, Украина",
  },
};

export default function ContactsPage() {
  const { language } = useLanguage();
  const kyiv = goldenLandData.offices.find((o) => o.id === "kyiv");
  const [customPage, setCustomPage] = useState<any>(null);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.pages)) {
          const found = data.pages.find((p: any) => p.slug === "contacts");
          if (found) {
            setCustomPage(found);
          }
        }
      })
      .catch((err) => console.error("Error fetching contacts custom text:", err));
  }, []);

  const heroTitle = customPage?.title?.[language] || t.hero.title[language];
  const heroSubtitle = customPage?.content?.[language] || t.hero.subtitle[language];

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow={t.hero.eyebrow[language]}
          title={heroTitle}
          subtitle={heroSubtitle}
          bgImage="/images/generated/contacts_banner.png"
        />

        <InternationalPresence />

        {/* Contact form */}
        <section id="form" className="section-py bg-[color:var(--bower-cream)]">
          <div className="bower-container">
            <div className="mx-auto max-w-[880px] bg-white p-8 md:p-14">
              <h2 className="text-[26px] font-light leading-[1.2] tracking-[-0.005em] text-[color:var(--bower-ink-2)] md:text-[32px]">
                {t.formTitle[language]}
              </h2>
              <p className="mt-2 text-[14px] font-light text-[color:var(--bower-mute)]">
                {t.formSubtitle[language]}
              </p>

              <form
                className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const data = {
                    formType: "Meeting Booking",
                    name: formData.get("name") as string,
                    phone: formData.get("phone") as string,
                    email: formData.get("email") as string || undefined,
                    interest: formData.get("interest") as string,
                    message: formData.get("message") as string || undefined,
                    format: formData.get("format") as string,
                    lang: language,
                  };
                  await submitLead(data);
                  window.location.href = "/thank-you";
                }}
              >
                <Field label={t.fName[language]} name="name" required />
                <Field label={t.fPhone[language]} name="phone" required type="tel" />
                <Field label={t.fEmail[language]} name="email" type="email" />
                <Field label={t.fInterest[language]} name="interest" placeholder={t.fInterestPh[language]} required />

                <div className="md:col-span-2">
                  <FieldTextarea label={t.fMsg[language]} name="message" />
                </div>

                <div className="md:col-span-2">
                  <legend className="mb-3 block text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--bower-mute)]">
                    {t.fFormat[language]}
                  </legend>
                  <div className="flex flex-wrap gap-3">
                    {[t.fOffice[language], t.fZoom[language], t.fWA[language]].map((opt, i) => (
                      <label
                        key={i}
                        className="inline-flex cursor-pointer items-center gap-2 border border-[color:var(--bower-line)] px-4 py-2 text-[13px] font-light transition-colors hover:border-[#D4AF37] has-[:checked]:border-[#D4AF37] has-[:checked]:bg-[#D4AF37]/8 has-[:checked]:text-[#0a0a0a]"
                      >
                        <input type="radio" name="format" value={opt} className="accent-[#D4AF37]" defaultChecked={i === 0} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[440px] text-[12px] leading-[1.6] text-[color:var(--bower-mute)]">
                    {t.fLegal[language]}
                  </p>
                  <button type="submit" className="btn-primary shrink-0">
                    {t.fSubmit[language]}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="bg-[color:var(--bower-cream)] pb-24">
          <div className="bower-container">
            <div className="relative aspect-[16/6] w-full overflow-hidden bg-[#0a0a0a]">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent("Kyiv Ukraine")}&hl=en&z=12&output=embed`}
                className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05]"
                title="Golden Land Head Office — Kyiv"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute left-6 top-6 bg-white/95 px-5 py-3">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#D4AF37]">
                  {t.mapLabel[language]}
                </p>
                <p className="mt-1 text-[14px] font-light text-[color:var(--bower-ink-2)]">
                  {kyiv?.name[language]}
                </p>
                <p className="text-[13px] font-light text-[color:var(--bower-mute)]">
                  {t.headAddress[language]}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--bower-mute)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border border-[color:var(--bower-line)] bg-transparent px-4 py-3 text-[15px] font-light text-[color:var(--bower-ink)] placeholder:text-[color:var(--bower-mute)] focus:border-[#D4AF37] focus:outline-none"
      />
    </div>
  );
}

function FieldTextarea({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--bower-mute)]">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        className="w-full resize-none border border-[color:var(--bower-line)] bg-transparent px-4 py-3 text-[15px] font-light text-[color:var(--bower-ink)] focus:border-[#D4AF37] focus:outline-none"
      />
    </div>
  );
}
