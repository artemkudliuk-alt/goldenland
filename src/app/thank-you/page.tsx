"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const t = {
  eyebrow: { en: "Request received", ua: "Заявку отримано", ru: "Заявка получена" },
  title: {
    en: "Thank you.",
    ua: "Дякуємо.",
    ru: "Спасибо.",
  },
  body: {
    en: "Our investment broker will contact you via WhatsApp or phone within 15 minutes.",
    ua: "Наш інвестиційний брокер зв'яжеться з вами у WhatsApp або телефоном протягом 15 хвилин.",
    ru: "Наш инвестиционный брокер свяжется с вами в WhatsApp или по телефону в течение 15 минут.",
  },
  hint: {
    en: "Meanwhile, feel free to keep browsing our featured properties and market briefings.",
    ua: "Тим часом можете переглянути обрані об'єкти та огляди ринку.",
    ru: "Тем временем вы можете посмотреть избранные объекты и обзоры рынка.",
  },
  ctaHome: { en: "Return to Home", ua: "На головну", ru: "На главную" },
  ctaCatalog: { en: "Explore Catalog", ua: "Каталог", ru: "Каталог" },
};

export default function ThankYouPage() {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-[color:var(--bower-cream)] pt-[90px]">
        <section className="section-py w-full">
          <div className="bower-container text-center">
            <div className="mx-auto max-w-[720px]">
              <p className="mb-6 text-[12px] font-normal uppercase tracking-[0.32em] text-[#D4AF37]">
                {t.eyebrow[language]}
              </p>
              <h1 className="text-[54px] font-light leading-[1.05] tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[80px]">
                {t.title[language]}
              </h1>
              <p className="mx-auto mt-8 max-w-[560px] text-[18px] font-light leading-[1.65] text-[color:var(--bower-ink-2)] md:text-[20px]">
                {t.body[language]}
              </p>
              <p className="mx-auto mt-4 max-w-[520px] text-[15px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
                {t.hint[language]}
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/" className="btn-primary">
                  {t.ctaHome[language]}
                </Link>
                <Link
                  href="/catalog"
                  className="inline-flex items-center justify-center border border-[#0a0a0a] px-8 py-3 text-[13px] font-medium tracking-[0.08em] text-[#0a0a0a] uppercase transition-colors hover:bg-[#0a0a0a] hover:text-white"
                >
                  {t.ctaCatalog[language]}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
