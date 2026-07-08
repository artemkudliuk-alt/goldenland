"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { PageHero } from "@/components/PageHero";
import { PropertyCard } from "@/components/PropertyCard";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { useLanguage } from "@/context/LanguageContext";
import { useLeadModal } from "@/context/LeadModalContext";
import { properties, type PropertyType } from "@/lib/properties";
import { submitLead } from "@/lib/leads";

const t = {
  hero: {
    eyebrow: { en: "Catalog", ua: "Каталог", ru: "Каталог" },
    title: {
      en: "Premium properties for sale & investment in Ukraine.",
      ua: "Преміальні об'єкти для продажу та інвестицій в Україні.",
      ru: "Премиальные объекты для продажи и инвестиций в Украине.",
    },
    subtitle: {
      en: "Kyiv, Lviv and Odesa — residential, commercial and hospitality opportunities vetted by our international team.",
      ua: "Київ, Львів і Одеса — житлові, комерційні та готельні можливості, перевірені нашою міжнародною командою.",
      ru: "Киев, Львов и Одесса — жилые, коммерческие и отельные возможности, проверенные нашей международной командой.",
    },
  },
  filterAll: { en: "All", ua: "Всі", ru: "Все" },
  filterApartments: { en: "Apartments", ua: "Апартаменти", ru: "Апартаменты" },
  filterVillas: { en: "Villas & Houses", ua: "Вілли та будинки", ru: "Виллы и дома" },
  filterHotels: { en: "Hotels", ua: "Готелі", ru: "Отели" },
  filterCommercial: { en: "Commercial", ua: "Комерційна", ru: "Коммерческая" },

  sortLabel: { en: "Sort", ua: "Сортування", ru: "Сортировка" },
  sortNewest: { en: "Featured", ua: "Обрані", ru: "Избранные" },
  sortPriceAsc: { en: "Price: low → high", ua: "Ціна: за зростанням", ru: "Цена: по возрастанию" },
  sortPriceDesc: { en: "Price: high → low", ua: "Ціна: за спаданням", ru: "Цена: по убыванию" },
  sortRoiDesc: { en: "ROI: highest first", ua: "ROI: найвищий", ru: "ROI: наивысший" },

  resultsLabel: { en: "results", ua: "результатів", ru: "результатов" },
  emptyTitle: { en: "No properties match this filter.", ua: "Немає об'єктів під цей фільтр.", ru: "Нет объектов под этот фильтр." },
  emptyBody: { en: "Try a different category or reach out — off-market deals may be available.", ua: "Спробуйте іншу категорію або зв'яжіться з нами — можливі off-market угоди.", ru: "Попробуйте другую категорию или свяжитесь — возможны off-market сделки." },
  emptyCta: { en: "Contact team", ua: "Написати команді", ru: "Написать команде" },

  ctaTitle: { en: "Access the closed off-plan catalog.", ua: "Отримайте закритий off-plan каталог.", ru: "Получите закрытый off-plan каталог." },
  ctaBody: {
    en: "Off-market opportunities from trusted Ukrainian developers, pre-launch pricing and priority allocations — shared privately with qualified investors.",
    ua: "Off-market можливості від перевірених українських девелоперів, цени до старту продажів і пріоритетні алокації — приватно для кваліфікованих інвесторів.",
    ru: "Off-market возможности от проверенных украинских девелоперов, цены до старта продаж и приоритетные аллокации — приватно для квалифицированных инвесторов.",
  },
  fName: { en: "Full name", ua: "Ім'я та прізвище", ru: "Имя и фамилия" },
  fPhone: { en: "Phone / WhatsApp", ua: "Телефон / WhatsApp", ru: "Телефон / WhatsApp" },
  fEmail: { en: "Email", ua: "Email", ru: "Email" },
  fSubmit: { en: "Request the closed catalog", ua: "Отримати закритий каталог", ru: "Получить закрытый каталог" },
  fLegal: {
    en: "We reply within 15 minutes. By submitting you agree to our privacy policy.",
    ua: "Відповідаємо протягом 15 хвилин. Надсилаючи, ви погоджуєтесь з політикою конфіденційності.",
    ru: "Отвечаем в течение 15 минут. Отправляя, вы соглашаетесь с политикой конфиденциальности.",
  },

  pageLabel: { en: "Page", ua: "Стор.", ru: "Стр." },
  ofLabel: { en: "of", ua: "з", ru: "из" },

  activeFilters: { en: "Active filters:", ua: "Активні фільтри:", ru: "Активные фильтры:" },
  clearAll: { en: "Clear all", ua: "Скинути все", ru: "Сбросить все" },
  bedsLabel: { en: "bedrooms", ua: "спальні", ru: "спальни" },
  maxBudgetLabel: { en: "Max budget:", ua: "Макс. бюджет:", ru: "Макс. бюджет:" },
  kyiv: { en: "Kyiv", ua: "Київ", ru: "Киев" },
  lviv: { en: "Lviv", ua: "Львів", ru: "Львов" },
  odesa: { en: "Odesa", ua: "Одеса", ru: "Одесса" },
};

type SortKey = "featured" | "price-asc" | "price-desc" | "roi-desc";

const PAGE_SIZE = 9;

function CatalogInner() {
  const { language } = useLanguage();
  const { openModal } = useLeadModal();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [type, setType] = useState<PropertyType | "all">("all");
  const [city, setCity] = useState<string>("all");
  const [beds, setBeds] = useState<string>("any");
  const [budget, setBudget] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);
  const [loadedProperties, setLoadedProperties] = useState<any[]>(properties);
  const [customPage, setCustomPage] = useState<any>(null);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.properties) {
          setLoadedProperties(data.properties);
        }
      })
      .catch((err) => console.error("Error loading properties:", err));

    fetch("/api/pages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.pages)) {
          const found = data.pages.find((p: any) => p.slug === "catalog");
          if (found) {
            setCustomPage(found);
          }
        }
      })
      .catch((err) => console.error("Error loading catalog custom page:", err));
  }, []);

  // Sync state from query parameters
  useEffect(() => {
    setType((searchParams.get("type") as PropertyType | "all" | null) || "all");
    setCity(searchParams.get("city") || "all");
    setBeds(searchParams.get("beds") || "any");
    setBudget(searchParams.get("budget") || "");
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  const filtered = useMemo(() => {
    let result = loadedProperties;

    // Filter by type
    if (type !== "all") {
      result = result.filter((p) => p.type === type);
    }

    // Filter by city
    if (city !== "all") {
      result = result.filter((p) => p.city === city);
    }

    // Filter by bedrooms
    if (beds !== "any") {
      const bedsNum = Number(beds);
      if (bedsNum === 4) {
        result = result.filter((p) => p.beds !== undefined && p.beds >= 4);
      } else {
        result = result.filter((p) => p.beds === bedsNum);
      }
    }

    // Filter by max budget
    if (budget) {
      const cleaned = budget.toLowerCase().replace(/[^0-9k]/g, "");
      let maxVal = 0;
      if (cleaned.endsWith("k")) {
        maxVal = parseFloat(cleaned) * 1000;
      } else {
        const val = parseFloat(cleaned);
        if (val < 10000) {
          maxVal = val * 1000; // e.g. 500 -> 500,000
        } else {
          maxVal = val;
        }
      }
      if (!isNaN(maxVal) && maxVal > 0) {
        result = result.filter((p) => p.price <= maxVal);
      }
    }

    // Sort
    const copy = [...result];
    switch (sort) {
      case "price-asc":
        copy.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        copy.sort((a, b) => b.price - a.price);
        break;
      case "roi-desc":
        copy.sort((a, b) => (b.roi ?? 0) - (a.roi ?? 0));
        break;
    }
    return copy;
  }, [type, city, beds, budget, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const filters: { key: PropertyType | "all"; label: string }[] = [
    { key: "all", label: t.filterAll[language] },
    { key: "apartments", label: t.filterApartments[language] },
    { key: "villas", label: t.filterVillas[language] },
    { key: "hotels", label: t.filterHotels[language] },
    { key: "commercial", label: t.filterCommercial[language] },
  ];

  const handleTypeChange = (newType: PropertyType | "all") => {
    const params = new URLSearchParams(window.location.search);
    if (newType === "all") {
      params.delete("type");
    } else {
      params.set("type", newType);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  const handleFilterRemove = (key: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    router.push(`/catalog?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push("/catalog");
  };

  const hasActiveFilters = type !== "all" || city !== "all" || beds !== "any" || budget !== "";

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow[language]}
        title={customPage?.title?.[language] || t.hero.title[language]}
        subtitle={customPage?.content?.[language] || t.hero.subtitle[language]}
        bgImage="/images/generated/catalog_banner.png"
      />

      {/* Filter bar */}
      <section className="relative md:sticky md:top-[90px] z-20 border-b border-[color:var(--bower-line)]/60 bg-[color:var(--bower-cream)]/95 backdrop-blur-sm">
        <div className="bower-container flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:py-5">
          <div className="flex w-full overflow-x-auto gap-2 pb-2 scrollbar-none snap-x whitespace-nowrap -mx-4 px-4 md:w-auto md:overflow-x-visible md:flex-wrap md:pb-0 md:mx-0 md:px-0">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => handleTypeChange(f.key)}
                className={[
                  "snap-start shrink-0 px-3.5 py-2 text-[11px] md:px-4 md:py-2 md:text-[12px] font-medium tracking-[0.1em] md:tracking-[0.12em] uppercase transition-colors border rounded-xs",
                  type === f.key
                    ? "border-[#0a0a0a] bg-[#0a0a0a] text-white"
                    : "border-[color:var(--bower-line)] bg-transparent text-[color:var(--bower-ink-2)] hover:border-[#D4AF37]",
                ].join(" ")}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 mt-1 md:mt-0">
            <label className="text-[11px] tracking-[0.14em] uppercase text-[color:var(--bower-mute)]">
              {t.sortLabel[language]}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-[color:var(--bower-line)] bg-transparent px-3 py-2 text-[13px] font-light text-[color:var(--bower-ink-2)] focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="featured">{t.sortNewest[language]}</option>
              <option value="price-asc">{t.sortPriceAsc[language]}</option>
              <option value="price-desc">{t.sortPriceDesc[language]}</option>
              <option value="roi-desc">{t.sortRoiDesc[language]}</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="pt-10 md:pt-14 pb-16 md:pb-28 bg-[color:var(--bower-cream)]">
        <div className="bower-container">
          <div className="flex flex-col gap-2 mb-8">
            <p className="text-[13px] font-light text-[color:var(--bower-mute)]">
              <span className="font-normal text-[color:var(--bower-ink-2)]">{filtered.length}</span> {t.resultsLabel[language]}
            </p>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-[12px] font-medium text-[color:var(--bower-mute)] mr-1">
                  {t.activeFilters[language]}
                </span>
                {type !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#fcf8ed] border border-[#D4AF37]/35 px-2.5 py-1 text-[12px] font-light text-[#0a0a0a] rounded-sm">
                    {filters.find((f) => f.key === type)?.label}
                    <button onClick={() => handleFilterRemove("type")} className="hover:text-[#D4AF37] font-bold ml-1 text-[10px]" aria-label="Remove filter">✕</button>
                  </span>
                )}
                {city !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#fcf8ed] border border-[#D4AF37]/35 px-2.5 py-1 text-[12px] font-light text-[#0a0a0a] rounded-sm">
                    {(t as any)[city]?.[language] || city}
                    <button onClick={() => handleFilterRemove("city")} className="hover:text-[#D4AF37] font-bold ml-1 text-[10px]" aria-label="Remove filter">✕</button>
                  </span>
                )}
                {beds !== "any" && (
                  <span className="inline-flex items-center gap-1.5 bg-[#fcf8ed] border border-[#D4AF37]/35 px-2.5 py-1 text-[12px] font-light text-[#0a0a0a] rounded-sm">
                    {beds === "4" ? "4+" : beds} {t.bedsLabel[language]}
                    <button onClick={() => handleFilterRemove("beds")} className="hover:text-[#D4AF37] font-bold ml-1 text-[10px]" aria-label="Remove filter">✕</button>
                  </span>
                )}
                {budget && (
                  <span className="inline-flex items-center gap-1.5 bg-[#fcf8ed] border border-[#D4AF37]/35 px-2.5 py-1 text-[12px] font-light text-[#0a0a0a] rounded-sm">
                    {t.maxBudgetLabel[language]} {budget.toLowerCase().endsWith("k") ? `$${budget.toLowerCase()}` : isNaN(Number(budget)) ? budget : `$${Number(budget).toLocaleString()}`}
                    <button onClick={() => handleFilterRemove("budget")} className="hover:text-[#D4AF37] font-bold ml-1 text-[10px]" aria-label="Remove filter">✕</button>
                  </span>
                )}
                <button
                  onClick={handleClearAll}
                  className="text-[12px] font-medium text-[#D4AF37] hover:underline uppercase tracking-wider ml-2"
                >
                  {t.clearAll[language]}
                </button>
              </div>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="mx-auto max-w-[520px] py-20 text-center">
              <h3 className="text-[24px] font-light text-[color:var(--bower-ink-2)]">{t.emptyTitle[language]}</h3>
              <p className="mt-4 text-[15px] font-light leading-[1.7] text-[color:var(--bower-mute)]">{t.emptyBody[language]}</p>
              <button
                onClick={() => openModal(t.emptyCta[language])}
                className="btn-primary mt-8 inline-flex cursor-pointer"
              >
                {t.emptyCta[language]}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {visible.map((p) => (
                  <PropertyCard key={p.slug} property={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border border-[color:var(--bower-line)] px-4 py-2 text-[12px] font-medium tracking-[0.12em] uppercase transition-colors hover:border-[#D4AF37] disabled:opacity-30 disabled:hover:border-[color:var(--bower-line)]"
                  >
                    ←
                  </button>
                  <span className="text-[13px] font-light text-[color:var(--bower-mute)]">
                    {t.pageLabel[language]} <span className="text-[color:var(--bower-ink-2)]">{currentPage}</span> {t.ofLabel[language]} {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border border-[color:var(--bower-line)] px-4 py-2 text-[12px] font-medium tracking-[0.12em] uppercase transition-colors hover:border-[#D4AF37] disabled:opacity-30 disabled:hover:border-[color:var(--bower-line)]"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Off-plan capture form */}
      <section className="section-py bg-[#0a0a0a] text-white">
        <div className="bower-container">
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_1fr] md:gap-20">
            <div className="max-w-[520px]">
              <SectionEyebrow className="mb-5 text-[#D4AF37]">Off-Plan</SectionEyebrow>
              <h2 className="text-[30px] font-light leading-[1.15] tracking-[-0.01em] md:text-[38px] text-white">
                {t.ctaTitle[language]}
              </h2>
              <p className="mt-5 text-[15px] font-light leading-[1.75] text-white/70">
                {t.ctaBody[language]}
              </p>
            </div>

            <form
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  formType: "Catalog Request",
                  name: formData.get("name") as string,
                  phone: formData.get("phone") as string,
                  email: formData.get("email") as string || undefined,
                  lang: language,
                };
                await submitLead(data);
                window.location.href = "/thank-you";
              }}
            >
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="name"
                  required
                  aria-label={t.fName[language]}
                  placeholder={t.fName[language]}
                  className="w-full border border-white/20 bg-transparent px-4 py-3 text-[15px] font-light text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <input
                type="tel"
                name="phone"
                required
                aria-label={t.fPhone[language]}
                placeholder={t.fPhone[language]}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-[15px] font-light text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none"
              />
              <input
                type="email"
                name="email"
                aria-label={t.fEmail[language]}
                placeholder={t.fEmail[language]}
                className="w-full border border-white/20 bg-transparent px-4 py-3 text-[15px] font-light text-white placeholder:text-white/40 focus:border-[#D4AF37] focus:outline-none"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-[#D4AF37] px-6 py-3 text-[13px] font-medium tracking-[0.08em] text-[#0a0a0a] uppercase transition-colors hover:bg-white"
              >
                {t.fSubmit[language]}
              </button>
              <p className="md:col-span-2 text-[12px] leading-[1.6] text-white/50">{t.fLegal[language]}</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="h-[70vh]" />}>
          <CatalogInner />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
