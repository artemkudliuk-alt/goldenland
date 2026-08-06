"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PageHero } from "@/components/PageHero";
import { type CustomPage } from "@/lib/pages-store";

interface DynamicPageContentProps {
  page: CustomPage;
}

function getText(val: any, lang: "en" | "ua" | "ru", fallback = ""): string {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string") return val || fallback;
  if (typeof val === "object") {
    return val[lang] || val.en || val.ua || val.ru || fallback;
  }
  return String(val) || fallback;
}

export function DynamicPageContent({ page }: DynamicPageContentProps) {
  const { language } = useLanguage();

  const title = getText(page.title, language, "Page");
  const content = getText(page.content, language, "");

  // Simple formatter to convert newlines to paragraphs/breaks if it's not HTML
  const isHtml = /<[a-z][\s\S]*>/i.test(content);

  return (
    <>
      <PageHero
        eyebrow={{ en: "Information", ua: "Інформація", ru: "Информация" }[language]}
        title={title}
        subtitle=""
        bgImage="/images/generated/about_banner.png"
      />

      <section className="section-py bg-white">
        <div className="bower-container max-w-[960px] mx-auto">
          <div className="max-w-none text-gray-800 leading-relaxed font-light text-[15px] md:text-[16px] dynamic-page-html">
            {isHtml ? (
              <div 
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            ) : (
              content.split("\n\n").map((para, idx) => (
                <p key={idx} className="whitespace-pre-line leading-relaxed">
                  {para}
                </p>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
