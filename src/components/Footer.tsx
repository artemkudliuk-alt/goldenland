"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/icons";
import { goldenLandData } from "@/lib/data";
import { submitLead } from "@/lib/leads";
import { useContacts } from "@/context/ContactsContext";

const t = {
  tagline: {
    en: "Premium real estate and investment services. Ukraine · UAE · Australia · Qatar.",
    ua: "Преміальні послуги з нерухомості та інвестицій. Україна · ОАЕ · Австралія · Катар.",
    ru: "Премиальные услуги в недвижимости и инвестициях. Украина · ОАЭ · Австралия · Катар.",
  },
  companyTitle: { en: "Company", ua: "Компанія", ru: "Компания" },
  navHome: { en: "Home", ua: "Головна", ru: "Главная" },
  navAbout: { en: "About Us", ua: "Про нас", ru: "О компании" },
  navServices: { en: "Services", ua: "Послуги", ru: "Услуги" },
  navCatalog: { en: "Properties", ua: "Каталог", ru: "Каталог" },
  navContacts: { en: "Contacts", ua: "Контакти", ru: "Контакты" },

  infoTitle: { en: "Information", ua: "Information", ru: "Информация" },
  terms: { en: "Terms & Conditions", ua: "Умови користування", ru: "Пользовательское соглашение" },
  privacy: { en: "Privacy Policy", ua: "Політика конфіденційності", ru: "Политика конфиденциальности" },
  media: { en: "Media & Press", ua: "Медіа та преса", ru: "Медиа и пресса" },

  officesTitle: { en: "Offices", ua: "Офіси", ru: "Офисы" },
  headOffice: { en: "Head Office", ua: "Головний офіс", ru: "Головной офис" },
  address: {
    en: "Kyiv, Ukraine",
    ua: "Київ, Україна",
    ru: "Киев, Украина",
  },

  subscribeTitle: {
    en: "Investment insights, delivered.",
    ua: "Інвестиційні інсайти на пошту.",
    ru: "Инвестиционные инсайты — на почту.",
  },
  subscribeCopy: {
    en: "Get off-plan opportunities, market briefs and premium listings before they go public.",
    ua: "Отримуйте off-plan можливості, огляди ринку та ексклюзивні об'єкти першими.",
    ru: "Получайте off-plan возможности, обзоры рынка и эксклюзивные объекты первыми.",
  },
  emailPh: { en: "Email address", ua: "Ел. пошта", ru: "Email" },
  success: { en: "Subscribed successfully!", ua: "Успішно підписано!", ru: "Успешно подписано!" },

  followTitle: { en: "Follow", ua: "Ми в мережі", ru: "Мы в сети" },
  rights: {
    en: "All rights reserved.",
    ua: "Усі права захищені.",
    ru: "Все права защищены.",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const year = new Date().getFullYear();
  const { whatsapp, telegram, offices } = useContacts();
  const cleanMainWhatsapp = whatsapp.replace(/[^0-9]/g, "");

  const companyLinks = [
    { label: t.navHome[language], href: "/" },
    { label: t.navAbout[language], href: "/about" },
    { label: t.navServices[language], href: "/services" },
    { label: t.navCatalog[language], href: "/catalog" },
    { label: t.navContacts[language], href: "/contacts" },
  ];

  const [customPages, setCustomPages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.pages) {
          setCustomPages(data.pages);
        }
      })
      .catch((err) => console.error("Error loading footer pages:", err));
  }, []);

  const infoLinks = [
    { label: t.terms[language], href: "/terms" },
    { label: t.privacy[language], href: "/privacy" },
    { label: t.media[language], href: "/press" },
  ];

  const dynamicInfoLinks = [
    ...infoLinks,
    ...customPages
      .filter((p) => p.showInFooter && !["about", "services", "catalog", "contacts", "privacy", "terms", "press"].includes(p.slug))
      .map((p) => ({
        label: p.title[language] || p.title.en,
        href: `/${p.slug}`,
      })),
  ];

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0c0c0c] text-white border-t border-white/5">
      {/* Мягкий фоновый свет на всю секцию */}
      <div className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute right-[10%] bottom-0 h-[400px] w-[500px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] blur-3xl" />

      <div className="mx-auto max-w-[1440px] px-8 py-24 md:px-16 lg:py-28">
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.8fr] lg:gap-24">
          
          {/* Brand & Video column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-center md:items-start justify-start text-center md:text-left">
            <div className="relative mb-6 w-full max-w-[280px] aspect-square overflow-hidden bg-transparent mx-auto md:mx-0">
              {/* Золотой градиент-подсветка сзади логотипа */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_65%)] blur-2xl pointer-events-none" />
              
              {/* Видео без рамок, сливающееся с черным фоном при помощи маски и наложения */}
              <video
                className="absolute inset-0 h-full w-full object-cover mix-blend-screen pointer-events-none"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
                  WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
                }}
              >
                <source src="/videos/Black_logo_banner.mp4" type="video/mp4" />
              </video>
            </div>

            <p className="max-w-[340px] text-[14.5px] font-light leading-[1.8] text-white/60 mx-auto md:mx-0">
              {t.tagline[language]}
            </p>

            <div className="mt-8 flex items-center gap-3.5 justify-center md:justify-start">
              <SocialIcon
                href={`https://wa.me/${cleanMainWhatsapp}`}
                label="WhatsApp"
                hoverClass="hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.5 3.5A11 11 0 0 0 3.4 17.1L2 22l5-1.3A11 11 0 0 0 20.5 3.5zM12 20a8 8 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z"/>
                </svg>
              </SocialIcon>
              <SocialIcon
                href={`https://t.me/${telegram}`}
                label="Telegram"
                hoverClass="hover:border-[#0088cc] hover:text-[#0088cc] hover:bg-[#0088cc]/5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M9.8 15.3 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 4 2.9c.7.4 1.2.2 1.4-.7l2.6-12h0c.2-1-.4-1.5-1.1-1.2L3.6 10.4c-1 .4-1 1-.2 1.2l4.2 1.3 9.7-6.1c.4-.3.8-.1.5.2z"/>
                </svg>
              </SocialIcon>
              <SocialIcon
                href="mailto:info@goldenlandproperty.com"
                label="Email"
                hoverClass="hover:border-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                  <rect x="3" y="5" width="18" height="14" rx="1"/>
                  <path d="m3 7 9 6 9-6"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Company links */}
          <div className="col-span-1 text-center md:text-left">
            <span className="mb-8 text-[11px] font-medium tracking-[0.3em] uppercase text-[#D4AF37] block">
              {t.companyTitle[language]}
            </span>
            <ul className="space-y-4">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[14px] font-light text-white/60 hover:text-white transition-all duration-300 hover:translate-x-0.5 inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div className="col-span-1 text-center md:text-left">
            <span className="mb-8 text-[11px] font-medium tracking-[0.3em] uppercase text-[#D4AF37] block">
              {t.infoTitle[language]}
            </span>
            <ul className="space-y-4">
              {dynamicInfoLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[14px] font-light text-white/60 hover:text-white transition-all duration-300 hover:translate-x-0.5 inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 text-center md:text-left">
            <span className="mb-8 text-[11px] font-medium tracking-[0.3em] uppercase text-[#D4AF37] block">
              {t.officesTitle[language]}
            </span>
            <ul className="space-y-4.5 text-white/85">
              {offices.map((office) => {
                const cleanPhone = office.phone.replace(/\s+/g, "");
                const waHref = `https://wa.me/${cleanPhone.replace(/^\+/, "")}`;
                const tgHref = `https://t.me/${telegram}`;
                return (
                  <li key={office.id} className="border-b border-white/5 pb-3.5 last:border-none last:pb-0 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-1 md:flex-row md:justify-between">
                      <span className="text-[14px] font-light text-white/95 text-center md:text-left">{office.name[language]}</span>
                      <div className="flex items-center gap-3 justify-center md:justify-start">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="text-[13px] font-light text-white/50 transition-colors hover:text-[#D4AF37]"
                        >
                          {office.phone}
                        </a>
                        <div className="flex items-center gap-2">
                          <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-[#25D366] transition-all hover:scale-110"
                            aria-label="WhatsApp"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                              <path d="M20.5 3.5A11 11 0 0 0 3.4 17.1L2 22l5-1.3A11 11 0 0 0 20.5 3.5zM12 20a8 8 0 0 1-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7 1-.1.1-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5c0-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1z"/>
                            </svg>
                          </a>
                          <a
                            href={tgHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-[#0088cc] transition-all hover:scale-110"
                            aria-label="Telegram"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                              <path d="M9.8 15.3 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 4 2.9c.7.4 1.2.2 1.4-.7l2.6-12h0c.2-1-.4-1.5-1.1-1.2L3.6 10.4c-1 .4-1 1-.2 1.2l4.2 1.3 9.7-6.1c.4-.3.8-.1.5.2z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="pt-1.5 text-center md:text-left">
                <a
                  href="mailto:info@goldenlandproperty.com"
                  className="text-[13.5px] font-light text-white/50 transition-colors hover:text-[#D4AF37]"
                >
                  info@goldenlandproperty.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center md:items-start justify-between gap-4 border-t border-white/5 pt-8 text-[12px] text-white/45 md:flex-row">
          <p className="text-center md:text-left">© {year} Golden Land Property Investment. {t.rights[language]}</p>
          <p className="text-center md:text-left">
            <a href="/privacy" className="transition-colors hover:text-[#D4AF37]">
              {t.privacy[language]}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  hoverClass = "hover:border-[#D4AF37] hover:text-[#D4AF37]",
  children,
}: {
  href: string;
  label: string;
  hoverClass?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`grid h-9 w-9 place-items-center border border-white/20 text-white/80 transition-colors ${hoverClass}`}
    >
      {children}
    </a>
  );
}
