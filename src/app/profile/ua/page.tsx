"use client";

import React from "react";
import Link from "next/link";

export default function ProfilePresentation() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="profile-wrapper min-h-screen bg-[#0e0e0e] text-white flex flex-col items-center py-12 px-4 select-none relative">
      {/* Dynamic CSS for A4 print optimization */}
      <style jsx global>{`
                        @media print {
          * {
            box-sizing: border-box !important;
          }
          html, body {
            background: #0c0c0c !important;
            color: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 210mm !important;
            height: auto !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .profile-wrapper {
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
          }
          .page-container {
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            gap: 0 !important;
            width: 210mm !important;
          }
          .a4-page {
            width: 210mm !important;
            height: 296mm !important; /* 1mm safety margin to prevent browser overflow creating blank pages */
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        @page {
          size: A4 portrait;
          margin: 0;
        }
      `}</style>

      {/* Header Controls */}
      <div className="no-print w-full max-w-[794px] mb-8 bg-[#151515] border border-white/10 p-5 rounded-xs flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[12px] font-medium text-white/50 hover:text-white uppercase tracking-wider transition-colors">
            ← На головну
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <p className="text-[12px] text-white/70">
            Презентація компанії <strong className="text-[#D4AF37]">Golden Land</strong> (A4 PDF)
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/profile" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] uppercase tracking-widest px-4 py-2 transition-colors duration-300">
            EN
          </Link>
          <Link href="/profile/ar" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] uppercase tracking-widest px-4 py-2 transition-colors duration-300">
            AR
          </Link>
          <button
            onClick={handlePrint}
            className="bg-[#D4AF37] hover:bg-white text-black font-semibold text-[11px] uppercase tracking-widest px-6 py-2.5 transition-colors duration-300 shadow-md cursor-pointer"
          >
            Друк до PDF (A4)
          </button>
        </div>
      </div>

      {/* Pages Container */}
      <div className="page-container flex flex-col gap-8 items-center">
        
        {/* PAGE 1: COVER PAGE */}
        <div 
          className="a4-page w-[794px] h-[1123px] bg-[#0c0c0c] border border-white/10 relative overflow-hidden shadow-2xl p-16 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/images/profile/profile_cover_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Subtle dark overlay for premium readability */}
          <div className="absolute inset-0 bg-[#0c0c0c]/65 z-0" />

          {/* Golden frame outline */}
          <div className="absolute inset-8 border border-[#D4AF37]/15 pointer-events-none z-10" />

          {/* TOP 1/3: Brand Section */}
          <div className="relative z-10 flex flex-col items-center pt-16">
            <div className="mb-6">
              <img 
                src="/images/logo-golden-land.png" 
                alt="Golden Land Logo" 
                className="h-64 w-64 object-contain" 
              />
            </div>
            <h1 className="font-display font-light text-[46px] tracking-[0.25em] text-[#D4AF37] uppercase leading-none mb-4">
              GOLDEN LAND
            </h1>
            <p className="text-[12px] tracking-[0.45em] text-white/70 uppercase font-medium">
              НЕРУХОМІСТЬ ТА ІНВЕСТИЦІЇ
            </p>
          </div>

          {/* MID 1/3: Title Section */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-px bg-[#D4AF37] mb-8" />
            <h2 className="font-display font-light text-[28px] tracking-[0.35em] text-white uppercase">
              ПРОФІЛЬ КОМПАНІЇ
            </h2>
          </div>

          {/* BOTTOM 1/3: Document footer */}
          <div className="relative z-10 flex justify-between items-end text-[10px] tracking-[0.2em] text-white/40 uppercase pb-6">
            <span>GOLDEN LAND PROPERTY & INVESTMENT</span>
            <span>2026</span>
          </div>
        </div>

        {/* PAGE 2: FOUNDER PROFILE */}
        <div 
          className="a4-page w-[794px] h-[1123px] bg-[#0c0c0c] border border-white/10 relative overflow-hidden shadow-2xl p-16 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/images/profile/profile_founder_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-[#0c0c0c]/85 z-0" />
          <div className="absolute inset-8 border border-[#D4AF37]/10 pointer-events-none z-10" />

          {/* Slide Header */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">ПРОФЕСІЙНИЙ ПРОФІЛЬ</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-10 flex flex-col justify-center">
            {/* Header info with founder photo - enlarged */}
            <div className="flex gap-8 items-center mb-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-xl shrink-0 bg-black/40">
                <img 
                  src="/images/generated/walid_dib.png" 
                  alt="Walid Dib" 
                  className="w-full h-full object-cover object-top scale-105" 
                />
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  Засновник та Генеральний директор
                </p>
                <h2 className="font-display font-light text-[40px] tracking-[0.1em] text-white uppercase leading-tight mt-1">
                  Walid Dib
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-8 space-y-4 text-[13px] leading-relaxed text-white/85 font-light">
                <p>
                  Валід Діб — висококваліфікований фахівець у сфері нерухомості з понад 22-річним досвідом роботи на міжнародному ринку нерухомості.
                </p>
                <p>
                  Протягом своєї кар’єри Валід Діб спеціалізувався на купівлі, продажу та управлінні елітною житловою і комерційною нерухомістю, включаючи розкішні готелі та інвестиції у сфері гостинності.
                </p>
                <p>
                  Його міжнародний досвід та широка ділова мережа дозволили успішно співпрацювати з інвесторами, девелоперами, власниками готелів та приватними клієнтами на різних світових ринках.
                </p>
                <p>
                  Валід Діб відомий використовуючи своє глибоке розуміння міжнародних тенденцій ринку нерухомості, інвестиційних стратегій та сегмента елітної нерухомості. Його професійний підхід, знання ринку та прагнення до досконалості продовжують сприяти успіху та розвитку Golden Land Property Investment як на місцевому, так і на міжнародному ринках.
                </p>
              </div>

              <div className="col-span-4 bg-white/[0.03] border border-white/10 p-5 rounded-xs">
                <p className="text-[10px] tracking-[0.15em] text-[#D4AF37] uppercase font-semibold mb-3">
                  Міжнародний досвід:
                </p>
                <ul className="space-y-2 text-[12px] text-white/75 font-light">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]" /> Australia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]" /> New Zealand
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]" /> United Arab Emirates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]" /> Qatar
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]" /> Bahrain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]" /> Kuwait
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4">
            <span>GOLDEN LAND PROPERTY & INVESTMENT</span>
            <span>02 / 06</span>
          </div>
        </div>

        {/* PAGE 3: WHY INVEST IN UKRAINE */}
        <div 
          className="a4-page w-[794px] h-[1123px] bg-[#0c0c0c] border border-white/10 relative overflow-hidden shadow-2xl p-16 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/images/profile/profile_ukraine_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-[#0c0c0c]/85 z-0" />
          <div className="absolute inset-8 border border-[#D4AF37]/10 pointer-events-none z-10" />

          {/* Slide Header */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">ЧОМУ ВАРТО ІНВЕСТУВАТИ</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

                    {/* Slide Content */}
          <div className="relative z-10 flex-1 py-12 flex flex-col justify-center">
            <h2 className="font-display font-light text-[26px] tracking-[0.1em] text-[#D4AF37] uppercase mb-6 border-b border-[#D4AF37]/20 pb-2">
              Чому варто інвестувати в Україну
            </h2>

            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Left Column: Text */}
              <div className="col-span-8 space-y-4 text-[13px] leading-relaxed text-white/80 font-light">
                <p>
                  Ukraine — це дивовижна країна з великим потенціалом і перспективним майбутнім. Вона відома своїми красивими містами, багатою культурою, дружніми людьми та вигідним розташуванням у Європі. Україна пропонує комфортний стиль життя та чудові можливості для міжнародного бізнесу й інвестицій.
                </p>
                <p>
                  Країна має висококваліфіковану робочу силу, сучасну інфраструктуру та значний потенціал розвитку в багатьох секторах економіки. Україна продовжує привертати увагу міжнародних інвесторів, які шукають довгострокове зростання та перспективні ринки.
                </p>
                <p>
                  Одним із найперспективніших секторів є ринок нерухомості та готельно-ресторанний бізнес. Сфера нерухомості пропонує великі можливості для інвестицій у:
                </p>

                <div className="grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> житлову нерухомість
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> комерційну нерухомість
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> елітні апартаменти
                    </li>
                  </ul>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> готелі та проєкти
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> земельні ділянки
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> туризм та інвестиції
                    </li>
                  </ul>
                </div>

                <p>
                  Такі міста, як Київ, Одеса та Львів, мають великий потенціал для довгострокових інвестицій завдяки розвитку інфраструктури, туризму та зростаючому міжнародному інтересу.
                </p>
                <p>
                  У Golden Land Property Investment мы впевнені, що Україна є однією з найкращих можливостей для інвесторів, які прагнуть стабільного розвитку та успішного майбутнього на європейському ринку.
                </p>
              </div>

              {/* Right Column: Empty space for map visibility */}
              <div className="col-span-4 h-full pointer-events-none" />
            </div>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4">
            <span>GOLDEN LAND PROPERTY & INVESTMENT</span>
            <span>03 / 06</span>
          </div>
        </div>

        {/* PAGE 4: ABOUT COMPANY & SERVICES */}
        <div 
          className="a4-page w-[794px] h-[1123px] bg-[#0c0c0c] border border-white/10 relative overflow-hidden shadow-2xl p-16 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/images/profile/profile_services_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-[#0c0c0c]/85 z-0" />
          <div className="absolute inset-8 border border-[#D4AF37]/10 pointer-events-none z-10" />

          {/* Slide Header */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">ПРО КОМПАНІЮ ТА ПОСЛУГИ</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-10 flex flex-col justify-center">
            <h2 className="font-display font-light text-[22px] tracking-[0.1em] text-[#D4AF37] uppercase mb-4">
              Про компанію
            </h2>
            <div className="space-y-3 text-[13px] leading-relaxed text-white/80 font-light mb-8">
              <p>
                Golden Land Property Investment — це сучасна українська компанія, що спеціалізується на купівлі, продажу та оренді житлової й комерційної нерухомості, інвестиціях у нерухомість та управлінні готелями.
              </p>
              <p>
                Компанія надає професійні послуги місцевим та міжнародним клієнтам, які шукають надійні та прибуткові інвестиційні можливості в Україні та за кордоном. Ми поєднуємо міжнародний досвід із глибоким знанням ринку нерухомості, забезпечуючи індивідуальний підхід до кожного клієнта та інвестора.
              </p>
            </div>

            <h2 className="font-display font-light text-[22px] tracking-[0.1em] text-[#D4AF37] uppercase mb-4 border-t border-white/10 pt-6">
              Наші послуги
            </h2>

            <div className="grid grid-cols-3 gap-5">
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  Житлова нерухомість
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• Купівля та продаж</li>
                  <li>• Елітні квартири</li>
                  <li>• Приватні будинки</li>
                  <li>• Інвестиційні проєкти</li>
                  <li>• Оренда та управління</li>
                  <li>• Консультації</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  Комерційна нерухомість
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• Продаж та оренда</li>
                  <li>• Офісні приміщення</li>
                  <li>• Торгові площі</li>
                  <li>• Інвестиційні об’єкти</li>
                  <li>• Консалтинг</li>
                  <li>• Аналіз та оцінка</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  Управління готелями
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• Управління готелями</li>
                  <li>• Готельний консалтинг</li>
                  <li>• Купівля та продаж</li>
                  <li>• Розвиток проєктів</li>
                  <li>• Hospitality-менеджмент</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4">
            <span>GOLDEN LAND PROPERTY & INVESTMENT</span>
            <span>04 / 06</span>
          </div>
        </div>

        {/* PAGE 5: INVESTMENTS & ADVANTAGES */}
        <div 
          className="a4-page w-[794px] h-[1123px] bg-[#0c0c0c] border border-white/10 relative overflow-hidden shadow-2xl p-16 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/images/profile/profile_advantages_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-[#0c0c0c]/85 z-0" />
          <div className="absolute inset-8 border border-[#D4AF37]/10 pointer-events-none z-10" />

          {/* Slide Header */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">СТРАТЕГІЯ ТА ПЕРЕВАГИ</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-8 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8 items-start mb-6">
              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  Інвестиції в нерухомість
                </h3>
                <ul className="space-y-1.5 text-[12px] text-white/80 font-light">
                  <li>• Інвестиційний консалтинг</li>
                  <li>• Супровід міжнародних інвесторів</li>
                  <li>• Управління проєктами</li>
                  <li>• Формування інвестиційного портфеля</li>
                  <li>• Пошук партнерських можливостей</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  Наше бачення
                </h3>
                <p className="text-[12px] text-white/80 font-light leading-relaxed">
                  Стати однією з провідних міжнародних компаній у сфері нерухомості та інвестицій, забезпечуючи професійні, надійні та інноваційні рішення для клієнтів та партнерів.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 items-start my-4">
              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  Наша місія
                </h3>
                <ul className="space-y-1.5 text-[12px] text-white/80 font-light">
                  <li>• Надавати високоякісні послуги</li>
                  <li>• Створювати успішні інвестиційні можливості</li>
                  <li>• Підтримувати розвиток українського ринку</li>
                  <li>• Будувати довгострокові відносини</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  Міжнародна присутність
                </h3>
                <p className="text-[12px] text-white/80 font-light leading-relaxed">
                  Компанія має міжнародну діяльність та партнерські зв’язки у:
                </p>
                <ul className="mt-2 space-y-1 text-[12px] text-white/85">
                  <li>• <strong className="text-white">Kyiv</strong> — головний офіс</li>
                  <li>• <strong className="text-white">Sydney</strong></li>
                  <li>• <strong className="text-white">Qatar</strong></li>
                </ul>
              </div>
            </div>

            <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mt-4 mb-3 border-b border-white/10 pb-1">
              Наші переваги
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] text-white/80 font-light">
              <li className="flex items-center gap-2">• Понад 22 роки міжнародного досвіду</li>
              <li className="flex items-center gap-2">• Глибоке знання міжнародного ринку</li>
              <li className="flex items-center gap-2">• Професійний підхід та стандарти</li>
              <li className="flex items-center gap-2">• Індивідуальний підхід до клієнта</li>
              <li className="flex items-center gap-2">• Широка мережа партнерів</li>
              <li className="flex items-center gap-2">• Досвід роботи з елітою та готелями</li>
            </ul>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4">
            <span>GOLDEN LAND PROPERTY & INVESTMENT</span>
            <span>05 / 06</span>
          </div>
        </div>

        {/* PAGE 6: CONTACTS & CLOSING */}
        <div 
          className="a4-page w-[794px] h-[1123px] bg-[#0c0c0c] border border-white/10 relative overflow-hidden shadow-2xl p-16 flex flex-col justify-between"
          style={{
            backgroundImage: "url('/images/profile/profile_contacts_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-[#0c0c0c]/85 z-0" />
          <div className="absolute inset-8 border border-[#D4AF37]/10 pointer-events-none z-10" />

          {/* Slide Header */}
          <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-4">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">КОНТАКТИ</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-12 flex flex-col justify-center items-center text-center">
            
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold mb-2">
              ЗАСНОВНИК І ГОЛОВА
            </p>
            <h2 className="font-display font-light text-[32px] tracking-[0.1em] text-white uppercase mb-8">
              Walid Dib
            </h2>

            <p className="max-w-[500px] text-[13px] leading-relaxed text-white/85 font-light mb-12">
              Має понад 22 роки міжнародного досвіду у сфері нерухомості. Працював на міжнародних ринках, зокрема у: Australia, New Zealand, United Arab Emirates, Qatar, Bahrain, Kuwait. Спеціалізувався на купівлі, продажу та управлінні елітною житловою і комерційною нерухомістю, включаючи готелі та великі інвестиційні проєкти. Його міжнародний досвід, професійний підхід та широка мережа ділових контактів дозволяють успішно працювати з інвесторами, девелоперами та власниками нерухомості у різних країнах світу.
            </p>

            <div className="w-12 h-px bg-[#D4AF37] mb-12" />

            <div className="space-y-4 text-[14px] tracking-wider text-white/90">
              <p className="font-semibold text-[#D4AF37] text-[16px] tracking-widest">
                GOLDEN LAND PROPERTY & INVESTMENT
              </p>
              <p className="text-white/60 font-light">ОДЕСА, УКРАЇНА</p>
              <p className="font-medium text-[15px]">
                <a href="tel:+380777704177" className="hover:text-[#D4AF37] transition-colors">
                  +380 7777 04177
                </a>
              </p>
              <p className="font-medium">
                <a href="mailto:info@goldenlandproperty.com.ua" className="hover:text-[#D4AF37] transition-colors">
                  INFO@GOLDENLANDPROPERTY.COM.UA
                </a>
              </p>
              <p className="font-medium tracking-widest text-[13px] text-[#D4AF37]">
                <a href="https://www.goldenlandproperty.com.ua" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WWW.GOLDENLANDPROPERTY.COM.UA
                </a>
              </p>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4">
            <span>GOLDEN LAND PROPERTY & INVESTMENT</span>
            <span>06 / 06</span>
          </div>
        </div>

      </div>
    </div>
  );
}
