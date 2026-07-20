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
            ← Home
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <p className="text-[12px] text-white/70">
            Company Profile <strong className="text-[#D4AF37]">Golden Land</strong> (A4 PDF)
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/profile/ua" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] uppercase tracking-widest px-4 py-2 transition-colors duration-300">
            UA
          </Link>
          <Link href="/profile/ar" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] uppercase tracking-widest px-4 py-2 transition-colors duration-300">
            AR
          </Link>
          <button
            onClick={handlePrint}
            className="bg-[#D4AF37] hover:bg-white text-black font-semibold text-[11px] uppercase tracking-widest px-6 py-2.5 transition-colors duration-300 shadow-md cursor-pointer"
          >
            Print to PDF (A4)
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
              REAL ESTATE & INVESTMENT
            </p>
          </div>

          {/* MID 1/3: Title Section */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-px bg-[#D4AF37] mb-8" />
            <h2 className="font-display font-light text-[28px] tracking-[0.35em] text-white uppercase">
              COMPANY PROFILE
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
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">PROFESSIONAL PROFILE</span>
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
                  Founder & Chairman
                </p>
                <h2 className="font-display font-light text-[40px] tracking-[0.1em] text-white uppercase leading-tight mt-1">
                  Walid Dib
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-8 items-start">
              <div className="col-span-8 space-y-4 text-[13px] leading-relaxed text-white/85 font-light">
                <p>
                  Walid Dib is a highly qualified real estate professional with over 22 years of experience in the international real estate market.
                </p>
                <p>
                  Throughout his career, Walid Dib has specialized in the acquisition, sale, and management of luxury residential and commercial properties, including luxury hotels and hospitality investments.
                </p>
                <p>
                  His international experience and extensive business network have enabled successful collaborations with investors, developers, hotel owners, and private clients across various global markets.
                </p>
                <p>
                  Walid Dib is recognized for his deep understanding of global real estate trends, investment strategies, and the luxury property segment. His professional approach, market knowledge, and commitment to excellence continue to drive the success and growth of Golden Land Property Investment in both local and international markets.
                </p>
              </div>

              <div className="col-span-4 bg-white/[0.03] border border-white/10 p-5 rounded-xs">
                <p className="text-[10px] tracking-[0.15em] text-[#D4AF37] uppercase font-semibold mb-3">
                  International Experience:
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
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">WHY INVEST</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

                    {/* Slide Content */}
          <div className="relative z-10 flex-1 py-12 flex flex-col justify-center">
            <h2 className="font-display font-light text-[26px] tracking-[0.1em] text-[#D4AF37] uppercase mb-6 border-b border-[#D4AF37]/20 pb-2">
              Why Invest in Ukraine
            </h2>

            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Left Column: Text */}
              <div className="col-span-8 space-y-4 text-[13px] leading-relaxed text-white/80 font-light">
                <p>
                  Ukraine is an amazing country with vast potential and a promising future. It is renowned for its beautiful cities, rich culture, friendly people, and strategic European location. Ukraine offers a comfortable lifestyle and excellent opportunities for international business and investment.
                </p>
                <p>
                  The country boasts a highly skilled workforce, modern infrastructure, and significant development potential across many economic sectors. Ukraine continues to attract the attention of international investors seeking long-term growth and emerging markets.
                </p>
                <p>
                  One of the most promising sectors is the real estate and hospitality market. The property sector offers substantial opportunities for investment in:
                </p>

                <div className="grid grid-cols-2 gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> residential real estate
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> commercial real estate
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> luxury apartments
                    </li>
                  </ul>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> hotels & hospitality
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> land plots
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#D4AF37]" /> tourism & investments
                    </li>
                  </ul>
                </div>

                <p>
                  Cities like Kyiv, Odesa, and Lviv hold immense potential for long-term investments due to infrastructure development, tourism, and growing international interest.
                </p>
                <p>
                  At Golden Land Property Investment, we are confident that Ukraine represents one of the best opportunities for investors seeking stable growth and a successful future in the European market.
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
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">ABOUT THE COMPANY & SERVICES</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-10 flex flex-col justify-center">
            <h2 className="font-display font-light text-[22px] tracking-[0.1em] text-[#D4AF37] uppercase mb-4">
              About the Company
            </h2>
            <div className="space-y-3 text-[13px] leading-relaxed text-white/80 font-light mb-8">
              <p>
                Golden Land Property Investment is a modern Ukrainian company specializing in the purchase, sale, and lease of residential and commercial real estate, property investments, and hotel management.
              </p>
              <p>
                The company provides professional services to local and international clients seeking reliable and profitable investment opportunities in Ukraine and abroad. We combine international experience with deep market knowledge, ensuring a personalized approach to each client and investor.
              </p>
            </div>

            <h2 className="font-display font-light text-[22px] tracking-[0.1em] text-[#D4AF37] uppercase mb-4 border-t border-white/10 pt-6">
              Our Services
            </h2>

            <div className="grid grid-cols-3 gap-5">
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  Residential Real Estate
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• Purchase & Sale</li>
                  <li>• Luxury Apartments</li>
                  <li>• Private Houses</li>
                  <li>• Investment Projects</li>
                  <li>• Lease & Management</li>
                  <li>• Consultation</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  Commercial Real Estate
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• Sale & Lease</li>
                  <li>• Office Premises</li>
                  <li>• Retail Spaces</li>
                  <li>• Investment Properties</li>
                  <li>• Consulting</li>
                  <li>• Analysis & Valuation</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xs">
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3">
                  Hotel Management
                </h3>
                <ul className="space-y-2 text-[11px] text-white/70 font-light">
                  <li>• Hotel Management</li>
                  <li>• Hospitality Consulting</li>
                  <li>• Purchase & Sale</li>
                  <li>• Project Development</li>
                  <li>• Hospitality Management</li>
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
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">STRATEGY & ADVANTAGES</span>
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
                  Property Investment
                </h3>
                <ul className="space-y-1.5 text-[12px] text-white/80 font-light">
                  <li>• Investment Consulting</li>
                  <li>• Support for International Investors</li>
                  <li>• Project Management</li>
                  <li>• Portfolio Formation</li>
                  <li>• Partnership Opportunities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  Our Vision
                </h3>
                <p className="text-[12px] text-white/80 font-light leading-relaxed">
                  To become one of the leading international real estate and investment companies, delivering professional, reliable, and innovative solutions for clients and partners.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 items-start my-4">
              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  Our Mission
                </h3>
                <ul className="space-y-1.5 text-[12px] text-white/80 font-light">
                  <li>• Deliver high-quality services</li>
                  <li>• Create successful investment opportunities</li>
                  <li>• Support the development of the Ukrainian market</li>
                  <li>• Build long-term relationships</li>
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mb-3 border-b border-white/10 pb-1">
                  International Presence
                </h3>
                <p className="text-[12px] text-white/80 font-light leading-relaxed">
                  The company operates internationally with partnerships in:
                </p>
                <ul className="mt-2 space-y-1 text-[12px] text-white/85">
                  <li>• <strong className="text-white">Kyiv</strong> — head office</li>
                  <li>• <strong className="text-white">Sydney</strong></li>
                  <li>• <strong className="text-white">Qatar</strong></li>
                </ul>
              </div>
            </div>

            <h3 className="text-[13px] text-[#D4AF37] uppercase tracking-wider font-semibold mt-4 mb-3 border-b border-white/10 pb-1">
              Our Advantages
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] text-white/80 font-light">
              <li className="flex items-center gap-2">• Over 22 years of international experience</li>
              <li className="flex items-center gap-2">• Deep knowledge of the international market</li>
              <li className="flex items-center gap-2">• Professional approach and standards</li>
              <li className="flex items-center gap-2">• Personalized client approach</li>
              <li className="flex items-center gap-2">• Broad partner network</li>
              <li className="flex items-center gap-2">• Experience with luxury properties & hotels</li>
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
            <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">CONTACTS</span>
            <img 
              src="/images/logo-golden-land.png" 
              alt="Golden Land Logo" 
              className="h-8 w-8 object-contain" 
            />
          </div>

          {/* Slide Content */}
          <div className="relative z-10 flex-1 py-12 flex flex-col justify-center items-center text-center">
            
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold mb-2">
              FOUNDER & CHAIRMAN
            </p>
            <h2 className="font-display font-light text-[32px] tracking-[0.1em] text-white uppercase mb-8">
              Walid Dib
            </h2>

            <p className="max-w-[500px] text-[13px] leading-relaxed text-white/85 font-light mb-12">
              Has over 22 years of international experience in real estate. He has worked in global markets, including Australia, New Zealand, United Arab Emirates, Qatar, Bahrain, and Kuwait. He specialized in the purchase, sale, and management of luxury residential and commercial real estate, including hotels and major investment projects. His international experience, professional approach, and extensive network of business contacts enable successful collaboration with investors, developers, and property owners worldwide.
            </p>

            <div className="w-12 h-px bg-[#D4AF37] mb-12" />

            <div className="space-y-4 text-[14px] tracking-wider text-white/90">
              <p className="font-semibold text-[#D4AF37] text-[16px] tracking-widest">
                GOLDEN LAND PROPERTY & INVESTMENT
              </p>
              <p className="text-white/60 font-light">ODESA, UKRAINE</p>
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
