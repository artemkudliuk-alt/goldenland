"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useLanguage } from "@/context/LanguageContext";
import { useLeadModal } from "@/context/LeadModalContext";
import { getPostBySlug } from "@/lib/posts";

const t = {
  backBtn: { en: "← Back to Insights", ua: "← Назад до інсайтів", ru: "← Назад к инсайтам" },
  shareTitle: { en: "Discuss with advisory team", ua: "Обговорити з консультантом", ru: "Обсудить с консультантом" },
  shareBody: {
    en: "If you have questions about this briefing or would like to explore investment opportunities in Ukraine, reach out to our team.",
    ua: "Якщо у вас є запитання щодо цього огляду або ви хочете обговорити інвестиційні можливості в Україні, зв'яжіться з нами.",
    ru: "Если у вас есть вопросы по этому обзору или вы хотите обсудить инвестиционные возможности в Украине, свяжитесь с нами.",
  },
  contactBtn: { en: "Contact Investment Advisor", ua: "Зв'язатися з радником", ru: "Связаться с советником" },
};

function formatDate(iso: string, language: "en" | "ua" | "ru") {
  const locale = language === "ua" ? "uk-UA" : language === "ru" ? "ru-RU" : "en-US";
  return new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

export default function InsightDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { language } = useLanguage();
  const { openModal } = useLeadModal();

  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[color:var(--bower-cream)]">
        <PageHero
          eyebrow={formatDate(post.date, language)}
          title={post.title[language]}
          subtitle={post.excerpt[language]}
          bgImage={post.image}
        />

        <section className="section-py">
          <div className="bower-container">
            <div className="mx-auto max-w-[800px]">
              {/* Back button */}
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.14em] uppercase text-[#0a0a0a] transition-colors hover:text-[#D4AF37] mb-10"
              >
                {t.backBtn[language]}
              </Link>

              {/* Main Content */}
              <article 
                className="prose prose-stone max-w-none text-[16px] leading-[1.8] font-light text-[color:var(--bower-mute)] space-y-6 bg-white border border-[#D4AF37]/20 p-8 md:p-14 shadow-sm"
                dangerouslySetInnerHTML={{ __html: post.content[language] }}
              />

              {/* Contact box */}
              <div className="mt-14 border border-[#D4AF37]/35 bg-[#fcf8ed] p-8 text-center rounded-sm">
                <h3 className="text-[20px] font-light text-[#0a0a0a]">
                  {t.shareTitle[language]}
                </h3>
                <p className="mt-3 text-[14.5px] font-light leading-[1.6] text-gray-700 max-w-[540px] mx-auto">
                  {t.shareBody[language]}
                </p>
                <button
                  onClick={() => openModal(t.contactBtn[language])}
                  className="mt-6 inline-flex items-center justify-center bg-[#0a0a0a] text-white border border-[#0a0a0a] px-8 py-3 text-[13px] font-medium tracking-[0.08em] uppercase transition-all duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0a0a0a] shadow-sm cursor-pointer"
                >
                  {t.contactBtn[language]}
                </button>
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
