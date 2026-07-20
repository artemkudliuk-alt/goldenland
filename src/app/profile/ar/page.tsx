"use client";

import React from "react";
import Link from "next/link";

export default function ProfilePresentationArabic() {
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
      <div className="no-print w-full max-w-[794px] mb-8 bg-[#151515] border border-white/10 p-5 rounded-xs flex flex-col md:flex-row-reverse items-center justify-between gap-4 shadow-xl" dir="rtl">
        <div className="flex items-center gap-3 flex-row-reverse">
          <Link href="/" className="text-[12px] font-medium text-white/50 hover:text-white uppercase tracking-wider transition-colors">
            ← الرئيسية
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <p className="text-[12px] text-white/70">
            ملف تعريف شركة <strong className="text-[#D4AF37]">Golden Land</strong> (A4 PDF)
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/profile" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] uppercase tracking-widest px-4 py-2 transition-colors duration-300">
            EN
          </Link>
          <Link href="/profile/ua" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] uppercase tracking-widest px-4 py-2 transition-colors duration-300">
            UA
          </Link>
          <button
            onClick={handlePrint}
            className="bg-[#D4AF37] hover:bg-white text-black font-semibold text-[11px] uppercase tracking-widest px-6 py-2 transition-colors duration-300 shadow-md cursor-pointer"
          >
            طباعة إلى PDF (A4)
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
              العقارات والاستثمار
            </p>
          </div>

          {/* MID 1/3: Title Section */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-px bg-[#D4AF37] mb-8" />
            <h2 className="font-display font-light text-[28px] tracking-[0.35em] text-white uppercase">
              ملف تعريف الشركة
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
          <div className="relative z-10 flex flex-row-reverse justify-between items-center border-b border-white/10 pb-4" dir="rtl">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">الملف المهني</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-10 flex flex-col justify-center">
            {/* Header info with founder photo - enlarged */}
            <div className="flex gap-8 items-center mb-8 flex-row-reverse" dir="rtl">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-xl shrink-0 bg-black/40">
                <img 
                  src="/images/generated/walid_dib.png" 
                  alt="Walid Dib" 
                  className="w-full h-full object-cover object-top scale-105" 
                />
              </div>
              <div className="text-right">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  المؤسس ورئيس مجلس الإدارة
                </p>
                <h2 className="font-display font-light text-[40px] tracking-[0.1em] text-white uppercase leading-tight mt-1">
                  Walid Dib
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start flex-row-reverse" dir="rtl">
              <div className="col-span-8 space-y-4 text-[13px] leading-relaxed text-white/85 font-light text-right">
                <p>
                  وليد ديب هو خبير عقاري ذو مؤهلات عالية ويتمتع بخبرة تزيد عن 22 عامًا في سوق العقارات الدولي.
                </p>
                <p>
                  طوال مسيرته المهنية، تخصص وليد ديب في شراء وبيع وإدارة العقارات السكنية والتجارية الفاخرة، بما في ذلك الفنادق الفاخرة والاستثمارات في قطاع الضيافة.
                </p>
                <p>
                  وقد أتاحت له خبرته الدولية وشبكته التجارية الواسعة التعاون بنجاح مع المستثمرين والمطورين وأصحاب الفنادق والعملاء من القطاع الخاص في مختلف الأسواق العالمية.
                </p>
                <p>
                  يُعرف وليد ديب بفهمه العميق لاتجاهات العقارات العالمية، واستراتيجيات الاستثمار، وقطاع العقارات الفاخرة. ويستمر نهجه المهني، ومعرفته بالسوق، والتزامه بالتميز في دفع نجاح ونمو استثمارات Golden Land العقارية في الأسواق المحلية والدولية على حد سواء.
                </p>
              </div>

              <div className="col-span-4 bg-white/[0.03] border border-white/10 p-5 rounded-xs text-right">
                <p className="text-[10px] tracking-[0.15em] text-[#D4AF37] uppercase font-semibold mb-3">
                  الخبرة الدولية:
                </p>
                <ul className="space-y-2 text-[12px] text-white/75 font-light">
                  <li className="flex items-center gap-2 justify-end">
                    أستراليا <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                  </li>
                  <li className="flex items-center gap-2 justify-end">
                    نيوزيلندا <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                  </li>
                  <li className="flex items-center gap-2 justify-end">
                    الإمارات العربية المتحدة <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                  </li>
                  <li className="flex items-center gap-2 justify-end">
                    قطر <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                  </li>
                  <li className="flex items-center gap-2 justify-end">
                    البحرين <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                  </li>
                  <li className="flex items-center gap-2 justify-end">
                    الكويت <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex flex-row-reverse justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4" dir="rtl">
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
          <div className="relative z-10 flex flex-row-reverse justify-between items-center border-b border-white/10 pb-4" dir="rtl">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">لماذا الاستثمار</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-12 flex flex-col justify-center">
            <h2 className="font-display font-light text-[26px] tracking-[0.1em] text-[#D4AF37] uppercase mb-6 border-b border-[#D4AF37]/20 pb-2 text-right" dir="rtl">
              لماذا الاستثمار في أوكرانيا
            </h2>

            <div className="grid grid-cols-12 gap-6 items-start flex-row-reverse" dir="rtl">
              {/* Left Column: Text */}
              <div className="col-span-8 space-y-4 text-[13px] leading-relaxed text-white/80 font-light text-right">
                <p>
                  أوكرانيا بلد مذهل يتمتع بإمكانيات هائلة ومستقبل واعد. تشتهر بمدنها الجميلة، وثقافتها الغنية، وشعبها الودود، وموقعها الأوروبي الاستراتيجي. توفر أوكرانيا أسلوب حياة مريحًا وفرصًا ممتازة للأعمال والاستثمارات الدولية.
                </p>
                <p>
                  تفخر البلاد بوجود قوى عاملة ماهرة للغاية، وبنية تحتية حديثة، وإمكانيات تطوير كبيرة في العديد من القطاعات الاقتصادية. وتستمر أوكرانيا في جذب اهتمام المستثمرين الدوليين الذين يبحثون عن نمو طويل الأجل وأسواق ناشئة.
                </p>
                <p>
                  أحد أكثر القطاعات واعدة هو سوق العقارات والضيافة. يوفر قطاع العقارات فرصًا كبيرة للاستثمار في:
                </p>

                <div className="grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-xs text-right">
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 justify-end">
                      العقارات السكنية <span className="w-1 h-1 bg-[#D4AF37]" />
                    </li>
                    <li className="flex items-center gap-2 justify-end">
                      العقارات التجارية <span className="w-1 h-1 bg-[#D4AF37]" />
                    </li>
                    <li className="flex items-center gap-2 justify-end">
                      الشقق الفاخرة <span className="w-1 h-1 bg-[#D4AF37]" />
                    </li>
                  </ul>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 justify-end">
                      الفنادق والضيافة <span className="w-1 h-1 bg-[#D4AF37]" />
                    </li>
                    <li className="flex items-center gap-2 justify-end">
                      الأراضي <span className="w-1 h-1 bg-[#D4AF37]" />
                    </li>
                    <li className="flex items-center gap-2 justify-end">
                      السياحة والاستثمارات <span className="w-1 h-1 bg-[#D4AF37]" />
                    </li>
                  </ul>
                </div>

                <p>
                  تحمل مدن مثل كييف وأوديسا ولفيف إمكانيات هائلة للاستثمارات طويلة الأجل بسبب تطوير البنية التحتية، والسياحة، والاهتمام الدولي المتزايد.
                </p>
                <p>
                  في استثمارات Golden Land العقارية، نحن واثقون من أن أوكرانيا تمثل واحدة من أفضل الفرص للمستثمرين الذين يبحثون عن نمو مستقر ومستقبل ناجح في السوق الأوروبية.
                </p>
              </div>

              {/* Right Column: Empty space for map visibility */}
              <div className="col-span-4 h-full pointer-events-none" />
            </div>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex flex-row-reverse justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4" dir="rtl">
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
          <div className="relative z-10 flex flex-row-reverse justify-between items-center border-b border-white/10 pb-4" dir="rtl">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">نبذة عن الشركة والخدمات</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-10 flex flex-col justify-center text-right" dir="rtl">
            <h2 className="font-display font-light text-[22px] tracking-[0.1em] text-[#D4AF37] uppercase mb-4">
              نبذة عن الشركة
            </h2>
            <div className="space-y-3 text-[13px] leading-relaxed text-white/80 font-light mb-8">
              <p>
                إن Golden Land للاستثمار العقاري هي شركة أوكرانية حديثة متخصصة في شراء وبيع وتأجير العقارات السكنية والتجارية، والاستثمارات العقارية، وإدارة الفنادق.
              </p>
              <p>
                تقدم الشركة خدمات مهنية للعملاء المحليين والدوليين الذين يبحثون عن فرص استثمارية موثوقة ومربحة في أوكرانيا والخارج. نحن نجمع بين الخبرة الدولية والمعرفة العميقة بالسوق، مما يضمن نهجًا مخصصًا لكل عميل ومستثمر.
              </p>
            </div>

            <h2 className="font-display font-light text-[22px] tracking-[0.1em] text-[#D4AF37] uppercase mb-4 border-t border-white/10 pt-6">
              خدماتنا
            </h2>

            <div className="grid grid-cols-3 gap-5">
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  العقارات السكنية
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• الشراء والبيع</li>
                  <li>• الشقق الفاخرة</li>
                  <li>• البيوت الخاصة</li>
                  <li>• المشاريع الاستثمارية</li>
                  <li>• الإيجار والإدارة</li>
                  <li>• الاستشارات</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  العقارات التجارية
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• البيع والإيجار</li>
                  <li>• المكاتب</li>
                  <li>• المساحات التجارية</li>
                  <li>• العقارات الاستثمارية</li>
                  <li>• الاستشارات</li>
                  <li>• التحليل والتقييم</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  إدارة الفنادق
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• إدارة الفنادق</li>
                  <li>• استشارات الضيافة</li>
                  <li>• الشراء والبيع</li>
                  <li>• تطوير المشاريع</li>
                  <li>• إدارة الضيافة</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex flex-row-reverse justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4" dir="rtl">
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
          <div className="relative z-10 flex flex-row-reverse justify-between items-center border-b border-white/10 pb-4" dir="rtl">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">الاستراتيجية والمزايا</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-8 flex flex-col justify-center text-right" dir="rtl">
            <div className="grid grid-cols-2 gap-8 items-start mb-6">
              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  الاستثمار العقاري
                </h3>
                <ul className="space-y-1.5 text-[12px] text-white/80 font-light">
                  <li>• الاستشارات الاستثمارية</li>
                  <li>• دعم المستثمرين الدوليين</li>
                  <li>• إدارة المشاريع</li>
                  <li>• تكوين المحفظة الاستثمارية</li>
                  <li>• فرص الشراكة</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  رؤيتنا
                </h3>
                <p className="text-[12px] text-white/80 font-light leading-relaxed">
                  أن نصبح واحدة من الشركات الدولية الرائدة في مجال العقارات والاستثمار، وتقديم حلول مهنية وموثوقة ومبتكرة للعملاء والشركاء.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 items-start my-4">
              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  مهمتنا
                </h3>
                <ul className="space-y-1.5 text-[12px] text-white/80 font-light">
                  <li>• تقديم خدمات عالية الجودة</li>
                  <li>• خلق فرص استثمارية ناجحة</li>
                  <li>• دعم تطوير السوق الأوكراني</li>
                  <li>• بناء علاقات طويلة الأمد</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  التواجد الدولي
                </h3>
                <p className="text-[12px] text-white/80 font-light leading-relaxed">
                  تعمل الشركة على المستوى الدولي من خلال شراكات في:
                </p>
                <ul className="mt-2 space-y-1 text-[12px] text-white/85">
                  <li>• <strong className="text-white">Kyiv</strong> — المكتب الرئيسي</li>
                  <li>• <strong className="text-white">Sydney</strong></li>
                  <li>• <strong className="text-white">Qatar</strong></li>
                </ul>
              </div>
            </div>

            <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mt-4 mb-3 border-b border-white/10 pb-1">
              مزايانا
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] text-white/80 font-light">
              <li className="flex items-center gap-2 justify-end">أكثر من 22 عامًا من الخبرة الدولية •</li>
              <li className="flex items-center gap-2 justify-end">معرفة عميقة بالسوق الدولي •</li>
              <li className="flex items-center gap-2 justify-end">نهج ومعايير مهنية •</li>
              <li className="flex items-center gap-2 justify-end">نهج مخصص لكل عميل •</li>
              <li className="flex items-center gap-2 justify-end">شبكة شركاء واسعة •</li>
              <li className="flex items-center gap-2 justify-end">خبرة في العقارات الفاخرة والفنادق •</li>
            </ul>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex flex-row-reverse justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4" dir="rtl">
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
          <div className="relative z-10 flex flex-row-reverse justify-between items-center border-b border-white/10 pb-4" dir="rtl">
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">الاتصال</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-12 flex flex-col justify-center items-center text-center">
            
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold mb-2">
              المؤسس ورئيس مجلس الإدارة
            </p>
            <h2 className="font-display font-light text-[32px] tracking-[0.1em] text-white uppercase mb-8">
              Walid Dib
            </h2>

            <p className="max-w-[500px] text-[13px] leading-relaxed text-white/85 font-light mb-12">
              يمتلك أكثر من 22 عامًا من الخبرة الدولية في مجال العقارات. عمل في الأسواق العالمية، بما في ذلك أستراليا ونيوزيلندا والإمارات العربية المتحدة وقطر والبحرين والكويت. وتخصص في شراء وبيع وإدارة العقارات السكنية والتجارية الفاخرة، بما في ذلك الفنادق والمشاريع الاستثمارية الكبرى. وتتيح له خبرته الدولية ونهجه المهني وشبكته الواسعة من الاتصالات التجارية التعاون بنجاح مع المستثمرين والمطورين وأصحاب العقارات في جميع أنحاء العالم.
            </p>

            <div className="w-12 h-px bg-[#D4AF37] mb-12" />

            <div className="space-y-4 text-[14px] tracking-wider text-white/90">
              <p className="font-semibold text-[#D4AF37] text-[16px] tracking-widest">
                GOLDEN LAND PROPERTY & INVESTMENT
              </p>
              <p className="text-white/60 font-light">أوديسا، أوكرانيا</p>
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
          <div className="relative z-10 flex flex-row-reverse justify-between items-center text-[10px] tracking-[0.2em] text-white/40 border-t border-white/10 pt-4" dir="rtl">
            <span>GOLDEN LAND PROPERTY & INVESTMENT</span>
            <span>06 / 06</span>
          </div>
        </div>

      </div>
    </div>
  );
}
