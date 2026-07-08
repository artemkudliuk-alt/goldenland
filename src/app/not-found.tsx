"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

const t = {
  code: { en: "404", ua: "404", ru: "404" },
  title: { en: "Page not found.", ua: "Сторінку не знайдено.", ru: "Страница не найдена." },
  body: {
    en: "Explore our property catalog instead — new premium opportunities added weekly.",
    ua: "Перегляньте каталог об'єктів — нові преміальні можливості щотижня.",
    ru: "Посмотрите каталог объектов — новые премиальные возможности каждую неделю.",
  },
  ctaCatalog: { en: "Open Catalog", ua: "Каталог", ru: "Каталог" },
  ctaHome: { en: "Home", ua: "Головна", ru: "Главная" },
};

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center bg-[color:var(--bower-cream)] pt-[90px]">
        <section className="section-py w-full">
          <div className="bower-container text-center">
            <div className="mx-auto max-w-[640px]">
              <p className="text-[140px] font-extralight leading-none tracking-[-0.02em] text-[#D4AF37]/40 md:text-[220px]">
                {t.code[language]}
              </p>
              <h1 className="mt-2 text-[36px] font-light leading-[1.1] tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[48px]">
                {t.title[language]}
              </h1>
              <p className="mx-auto mt-6 max-w-[480px] text-[16px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
                {t.body[language]}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/catalog" className="btn-primary">
                  {t.ctaCatalog[language]}
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center border border-[#0a0a0a] px-8 py-3 text-[13px] font-medium tracking-[0.08em] text-[#0a0a0a] uppercase transition-colors hover:bg-[#0a0a0a] hover:text-white"
                >
                  {t.ctaHome[language]}
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
