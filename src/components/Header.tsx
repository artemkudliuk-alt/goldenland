"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { useLeadModal } from "@/context/LeadModalContext";

const menuTranslations = {
  home: { en: "Home", ua: "Головна", ru: "Главная" },
  navHome: { en: "Home", ua: "Головна", ru: "Главная" },
  catalog: { en: "Catalog", ua: "Каталог", ru: "Каталог" },
  navCatalog: { en: "Catalog", ua: "Каталог", ru: "Каталог" },
  services: { en: "Services", ua: "Послуги", ru: "Услуги" },
  navServices: { en: "Services", ua: "Послуги", ru: "Услуги" },
  about: { en: "About Us", ua: "Про нас", ru: "О компании" },
  navAbout: { en: "About Us", ua: "Про нас", ru: "О компании" },
  contacts: { en: "Contacts", ua: "Контакти", ru: "Контакты" },
  navContacts: { en: "Contacts", ua: "Контакти", ru: "Контакты" },
  contactUsBtn: { en: "Contact Us", ua: "Зв'язатися", ru: "Связаться" }
};

function FlagIcon({ code, className = "w-5 h-3.5" }: { code: "en" | "ua" | "ru"; className?: string }) {
  if (code === "en") {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] object-cover shadow-xs border border-white/20 shrink-0`}>
        <path fill="#012169" d="M0 0h640v480H0z"/>
        <path fill="#FFF" d="m0 0 640 480M640 0 0 480" stroke="#FFF" strokeWidth="60"/>
        <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480"/>
        <path fill="#FFF" d="M280 0h80v480h-80zM0 200h640v80H0z"/>
        <path fill="#C8102E" d="M300 0h40v480h-40zM0 220h640v40H0z"/>
      </svg>
    );
  }
  if (code === "ua") {
    return (
      <svg viewBox="0 0 640 480" className={`${className} rounded-[2px] object-cover shadow-xs border border-white/20 shrink-0`}>
        <path fill="#0057B7" d="M0 0h640v240H0z"/>
        <path fill="#FFD700" d="M0 240h640v240H0z"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 shrink-0 text-[#D4AF37]">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      <path d="M2 12h20"/>
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [scrollY, setScrollY] = useState(0);
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useLeadModal();

  useEffect(() => {
    if (!isHomepage) return;
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomepage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrolled = !isHomepage || scrollY > 80;
  const t = menuTranslations;

  const [customPages, setCustomPages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.pages) {
          setCustomPages(data.pages);
        }
      })
      .catch((err) => console.error("Error loading header pages:", err));
  }, []);

  const navItems = [
    { label: t.catalog[language], href: "/catalog" },
    { label: t.services[language], href: "/services" },
    { label: t.about[language], href: "/about" },
    { label: t.contacts[language], href: "/contacts" },
  ];

  const dynamicNavItems = [
    ...navItems,
    ...customPages
      .filter((p) => p.showInHeader && !["about", "services", "catalog", "contacts", "privacy", "terms", "press"].includes(p.slug))
      .map((p) => ({
        label: p.title[language] || p.title.en,
        href: `/${p.slug}`,
      })),
  ];

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-white/10 text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-transparent text-white",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[90px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
          {/* Левая часть: Маленький PNG логотип + Текст бренд слева */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              aria-label="Golden Land Property Investment — home"
              className="flex items-center gap-3 group select-none"
            >
              <Image
                src="/images/logo-golden-land.png"
                alt="Golden Land Logo"
                width={48}
                height={48}
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="flex flex-col text-left">
                <span className="font-display text-[18px] md:text-[20px] font-light tracking-[0.25em] uppercase leading-none transition-colors text-white group-hover:text-[#D4AF37]">
                  Golden Land
                </span>
                <span className="mt-1 text-[8px] md:text-[9px] font-light tracking-[0.32em] uppercase text-[#D4AF37]">
                  Property Investment
                </span>
              </div>
            </Link>
          </div>

          {/* Центр: Объединенное меню навигации */}
          <nav className="hidden items-center gap-8 lg:flex">
            {dynamicNavItems.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-[13px] font-light tracking-[0.05em] uppercase transition-colors relative py-1 text-white/85 hover:text-[#D4AF37]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Правая часть: Кнопка связи и Языковой переключатель */}
          <div className="hidden items-center gap-6 lg:flex">
            <button
              onClick={() => openModal(t.contactUsBtn[language])}
              className={[
                "px-5 py-2.5 text-[13px] tracking-[0.06em] transition-colors uppercase font-medium cursor-pointer",
                scrolled
                  ? "bg-[#D4AF37] text-[#0a0a0a] border border-[#D4AF37] hover:bg-white hover:border-white hover:text-[#0a0a0a]"
                  : "bg-transparent text-white border border-white hover:bg-white hover:text-[#0a0a0a]",
              ].join(" ")}
            >
              {t.contactUsBtn[language]}
            </button>
            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
              {(["en", "ua", "ru"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={[
                    "p-1.5 rounded-xs transition-all border flex items-center justify-center cursor-pointer",
                    language === lng
                      ? "border-[#D4AF37] bg-[#D4AF37]/20 shadow-[0_0_8px_rgba(212,175,55,0.4)] scale-105"
                      : "border-white/10 bg-black/40 hover:border-white/40 hover:bg-white/10 opacity-60 hover:opacity-100"
                  ].join(" ")}
                  title={`Switch language: ${lng.toUpperCase()}`}
                >
                  <FlagIcon code={lng} className="w-5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 text-white"
            aria-label="Open Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a] px-6 py-8 text-white lg:hidden animate-fade-in">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3">
              <span className="font-display text-[20px] tracking-[0.25em] text-[#D4AF37] uppercase font-light">
                Golden Land
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white/70 hover:text-white"
              aria-label="Close Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="my-auto flex flex-col gap-6 py-8">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className={`text-[16px] tracking-[0.15em] uppercase transition-colors ${pathname === "/" ? "text-[#D4AF37]" : "text-white/80 hover:text-white"}`}>
              {t.navHome[language]}
            </Link>
            <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className={`text-[16px] tracking-[0.15em] uppercase transition-colors ${pathname === "/catalog" ? "text-[#D4AF37]" : "text-white/80 hover:text-white"}`}>
              {t.navCatalog[language]}
            </Link>
            <Link href="/services" onClick={() => setIsMenuOpen(false)} className={`text-[16px] tracking-[0.15em] uppercase transition-colors ${pathname === "/services" ? "text-[#D4AF37]" : "text-white/80 hover:text-white"}`}>
              {t.navServices[language]}
            </Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`text-[16px] tracking-[0.15em] uppercase transition-colors ${pathname === "/about" ? "text-[#D4AF37]" : "text-white/80 hover:text-white"}`}>
              {t.navAbout[language]}
            </Link>
            <Link href="/contacts" onClick={() => setIsMenuOpen(false)} className={`text-[16px] tracking-[0.15em] uppercase transition-colors ${pathname === "/contacts" ? "text-[#D4AF37]" : "text-white/80 hover:text-white"}`}>
              {t.navContacts[language]}
            </Link>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                openModal(t.contactUsBtn[language]);
              }}
              className="mt-4 border border-[#D4AF37] bg-[#D4AF37] py-3 text-[13px] tracking-[0.1em] uppercase font-medium text-[#0a0a0a]"
            >
              {t.contactUsBtn[language]}
            </button>
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">Language</p>
            <div className="flex items-center gap-3">
              {(["en", "ua", "ru"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => {
                    setLanguage(lng);
                    setIsMenuOpen(false);
                  }}
                  className={`p-2 rounded-xs border transition-all flex items-center justify-center ${
                    language === lng
                      ? "border-[#D4AF37] bg-[#D4AF37]/20 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                      : "border-white/10 bg-black/40 opacity-60 hover:opacity-100"
                  }`}
                  title={`Switch language: ${lng.toUpperCase()}`}
                >
                  <FlagIcon code={lng} className="w-6 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
