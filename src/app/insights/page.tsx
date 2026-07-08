"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { BackToTop } from "@/components/BackToTop";
import { useLanguage } from "@/context/LanguageContext";
import { posts } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";

const t = {
  hero: {
    eyebrow: { en: "Advisory", ua: "Консалтинг", ru: "Консалтинг" },
    title: {
      en: "Market briefings & investment insights.",
      ua: "Огляди ринку та інвестиційні інсайти.",
      ru: "Обзоры рынка и инвестиционные инсайты.",
    },
    subtitle: {
      en: "In-depth analysis of high-end real estate, off-plan projects and hospitality assets in Ukraine by our international team.",
      ua: "Глибокий аналіз елітної нерухомості, off-plan проєктів та готельних активів в Україні від нашої міжнародної команди.",
      ru: "Глубокий анализ элитной недвижимости, off-plan проектов и отельных активов в Украине от нашей международной команды.",
    },
  },
  readMore: { en: "Read full article", ua: "Читати повністю", ru: "Читать полностью" },
};

function formatDate(iso: string, language: "en" | "ua" | "ru") {
  const locale = language === "ua" ? "uk-UA" : language === "ru" ? "ru-RU" : "en-US";
  return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

export default function InsightsPage() {
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1 bg-[color:var(--bower-cream)]">
        <PageHero
          eyebrow={t.hero.eyebrow[language]}
          title={t.hero.title[language]}
          subtitle={t.hero.subtitle[language]}
          bgImage="/images/generated/services_banner.png"
        />

        <section className="section-py">
          <div className="bower-container">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
              {posts.map((p) => (
                <article key={p.slug} className="group flex flex-col justify-between bg-white border border-[#D4AF37]/25 p-6 hover:border-[#D4AF37] hover:shadow-[0_16px_36px_rgba(212,175,55,0.08)] transition-all duration-500 rounded-sm">
                  <div>
                    <Link href={`/insights/${p.slug}`} className="block overflow-hidden relative aspect-[4/3] w-full mb-6">
                      <Image
                        src={p.image}
                        alt={p.title[language]}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                      />
                    </Link>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[color:var(--bower-mute)]">
                      {formatDate(p.date, language)}
                    </p>
                    <h2 className="mt-3 text-[22px] font-light leading-[1.3] tracking-[-0.01em] text-[color:var(--bower-ink-2)] group-hover:text-[#D4AF37] transition-colors">
                      <Link href={`/insights/${p.slug}`}>
                        {p.title[language]}
                      </Link>
                    </h2>
                    <p className="mt-4 text-[14.5px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
                      {p.excerpt[language]}
                    </p>
                  </div>
                  <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
                    <Link
                      href={`/insights/${p.slug}`}
                      className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.12em] uppercase text-[#0a0a0a] transition-colors hover:text-[#D4AF37]"
                    >
                      <span>{t.readMore[language]}</span>
                      <span className="block h-[1px] w-6 bg-[#D4AF37] transition-all duration-300 group-hover:w-10" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
