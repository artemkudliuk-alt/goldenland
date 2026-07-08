"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  eyebrow: { en: "Insights", ua: "Інсайти", ru: "Инсайты" },
  heading: { en: "Market briefings", ua: "Огляди ринку", ru: "Обзоры рынка" },
  viewAll: { en: "View all", ua: "Всі статті", ru: "Все статьи" },
  readMore: { en: "Read more", ua: "Читати", ru: "Читать" },
};

import { posts, type Post } from "@/lib/posts";

function formatDate(iso: string, language: "en" | "ua" | "ru") {
  const locale = language === "ua" ? "uk-UA" : language === "ru" ? "ru-RU" : "en-US";
  return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

export function Insights() {
  const { language } = useLanguage();
  const t = translations;

  return (
    <section id="insights" className="section-py bg-[color:var(--bower-cream)]">
      <div className="bower-container">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-4 text-[12px] font-normal uppercase tracking-[0.32em] text-[color:var(--bower-eyebrow)]">
              {t.eyebrow[language]}
            </p>
            <h2 className="text-[32px] font-light tracking-[-0.015em] text-[color:var(--bower-ink-2)] md:text-[40px]">
              {t.heading[language]}
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-[12px] font-medium tracking-[0.14em] uppercase text-[color:var(--bower-ink)] transition-colors hover:text-[#D4AF37]"
          >
            {t.viewAll[language]} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((p) => (
            <article key={p.slug} className="group">
              <Link href={`/insights/${p.slug}`} className="block overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title[language]}
                    fill
                    sizes="(min-width: 768px) 32vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </Link>
              <p className="mt-6 text-[11px] tracking-[0.18em] uppercase text-[color:var(--bower-mute)]">
                {formatDate(p.date, language)}
              </p>
              <h3 className="mt-3 text-[19px] font-light leading-[1.35] tracking-[-0.005em] text-[color:var(--bower-ink-2)]">
                <Link href={`/insights/${p.slug}`} className="transition-colors hover:text-[#D4AF37]">
                  {p.title[language]}
                </Link>
              </h3>
              <p className="mt-4 text-[14px] font-light leading-[1.7] text-[color:var(--bower-mute)]">
                {p.excerpt[language]}
              </p>
              <Link
                href={`/insights/${p.slug}`}
                className="mt-5 inline-block text-[12px] font-medium tracking-[0.12em] uppercase text-[#0a0a0a] transition-colors hover:text-[#D4AF37]"
              >
                {t.readMore[language]}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
