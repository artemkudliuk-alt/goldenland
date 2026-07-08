"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { useLeadModal } from "@/context/LeadModalContext";

const menuTranslations = {
  catalog: { en: "Catalog", ua: "Каталог", ru: "Каталог" },
  services: { en: "Services", ua: "Послуги", ru: "Услуги" },
  about: { en: "About Us", ua: "Про нас", ru: "О компании" },
  contacts: { en: "Contacts", ua: "Контакти", ru: "Контакты" },
  contactUsBtn: { en: "Contact Us", ua: "Зв'язатися", ru: "Связаться" }
};

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
                    "text-[12px] font-medium uppercase tracking-[0.05em] transition-colors px-1",
                    language === lng
                      ? "text-[#D4AF37] font-semibold"
                      : "text-white/50 hover:text-white"
                  ].join(" ")}
                >
                  {lng}
                </button>
              ))}
            </div>
          </div>

          {/* Мобильная кнопка меню */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 text-white"
            aria-label="Open menu"
          >
            <span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </span>
          </button>
        </div>
      </header>

      {/* Мобильное меню (Overlay / Drawer) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0a0a] text-white p-6 lg:hidden animate-[fade-in_0.2s_ease-out]">
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 select-none">
              <Image
                src="/images/logo-golden-land.png"
                alt="Golden Land Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="font-display text-[18px] font-light tracking-[0.25em] uppercase text-white leading-none">
                  Golden Land
                </span>
                <span className="mt-1 text-[8px] font-light tracking-[0.32em] uppercase text-[#D4AF37]">
                  Property Investment
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-6 text-[22px] font-light tracking-[0.05em] uppercase">
            {dynamicNavItems.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className="transition-colors hover:text-[#D4AF37]"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openModal(t.contactUsBtn[language]);
              }}
              className="mt-4 border border-[#D4AF37] px-6 py-3 text-center text-[14px] font-medium tracking-[0.15em] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-colors uppercase cursor-pointer"
            >
              {t.contactUsBtn[language]}
            </button>
          </nav>

          <div className="mt-auto border-t border-white/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">Language</p>
            <div className="flex items-center gap-4">
              {(["en", "ua", "ru"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => {
                    setLanguage(lng);
                    setIsMenuOpen(false);
                  }}
                  className={`text-[14px] uppercase tracking-[0.1em] ${
                    language === lng ? "text-[#D4AF37] font-semibold" : "text-white/40"
                  }`}
                >
                  {lng}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
