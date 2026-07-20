"use client";

import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Check, 
  Building, 
  Globe, 
  Smartphone, 
  Users, 
  Search, 
  Map, 
  Cpu, 
  Calculator, 
  PhoneCall, 
  Compass,
  ArrowRight
} from "lucide-react";

// ── iPhone Device Wrapper ──
function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[230px] h-[460px] bg-[#151311] rounded-[36px] p-2.5 shadow-2xl border-[3px] border-[#38332d] ring-1 ring-white/10 overflow-hidden select-none shrink-0 max-md:scale-95">
      {/* Screen Gloss Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.04] to-white/0 pointer-events-none z-30" />
      
      {/* Dynamic Island */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#000000] rounded-full z-40" />
      
      {/* Internal Phone Viewport */}
      <div className="w-full h-full rounded-[28px] overflow-hidden bg-[#090807] relative flex flex-col justify-between border border-black z-10 text-[9px] no-scrollbar">
        {children}
      </div>
    </div>
  );
}

// ── Mockup Screen 1: Map View ──
function MockupMapView() {
  return (
    <IPhoneMockup>
      {/* Status Bar */}
      <div className="h-8 pt-2.5 px-5 flex justify-between items-center text-[8px] text-white/60 bg-black/45 z-20">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <span className="w-2.5 h-1.5 bg-white/60 rounded-xs" />
        </div>
      </div>
      
      {/* Search Header */}
      <div className="px-3 pt-2 pb-1 bg-black/45 border-b border-white/5 z-20">
        <div className="flex items-center gap-1.5 bg-[#1a1816] border border-white/5 rounded-lg px-2 py-1 text-white/50 text-[8px]">
          <Search className="w-2.5 h-2.5 text-[#cfa24d]" />
          <span>Search cities...</span>
        </div>
      </div>
      
      {/* Map Content Area */}
      <div className="flex-1 relative bg-[#090807] overflow-hidden">
        {/* Mock road grid lines */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ 
          backgroundImage: "linear-gradient(rgba(207, 162, 77, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(207, 162, 77, 0.3) 1px, transparent 1px)", 
          backgroundSize: "20px 20px" 
        }} />
        
        {/* City Marker Pills */}
        <div className="absolute top-12 left-6 bg-[#12100e] border border-[#cfa24d]/40 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-md scale-90">
          <span className="w-1 h-1 rounded-full bg-[#cfa24d] animate-pulse" />
          <span className="text-[7.5px] font-bold text-white tracking-wide">Kyiv (12)</span>
        </div>

        <div className="absolute top-24 right-4 bg-[#12100e] border border-[#cfa24d]/45 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-md scale-95">
          <span className="w-1 h-1 rounded-full bg-[#cfa24d] animate-pulse" />
          <span className="text-[7.5px] font-bold text-white tracking-wide">Odesa (8)</span>
        </div>

        <div className="absolute bottom-16 left-12 bg-[#12100e] border border-[#cfa24d]/40 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-md scale-90">
          <span className="w-1 h-1 rounded-full bg-[#cfa24d] animate-pulse" />
          <span className="text-[7.5px] font-bold text-white tracking-wide">Lviv (5)</span>
        </div>

        {/* Bottom Property Sheet */}
        <div className="absolute bottom-2 left-2 right-2 bg-[#12100e]/95 border border-white/10 rounded-xl p-2 z-20 flex gap-2 items-center">
          <img src="/images/generated/prop-odesa-beachfront-villa-1.webp" alt="Property" className="w-10 h-10 object-cover rounded-lg" />
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-bold text-white truncate">Beachfront Villa Odesa</p>
            <p className="text-[7px] text-[#cfa24d] font-light mt-0.5">$2,400,000 • ROI: 8.5%</p>
          </div>
          <ArrowRight className="w-3 h-3 text-[#cfa24d]" />
        </div>
      </div>
    </IPhoneMockup>
  );
}

// ── Mockup Screen 2: Property Detail View ──
function MockupDetailView() {
  return (
    <IPhoneMockup>
      {/* Banner Image */}
      <div className="h-32 bg-[url('/images/generated/thumb_kozyn_villa.png')] bg-cover bg-center relative">
        <div className="absolute top-2.5 left-3 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white">
          <span className="text-[7px] font-bold">←</span>
        </div>
        <div className="absolute bottom-2 left-3 bg-black/65 px-2 py-0.5 rounded-full border border-white/10">
          <span className="text-[6.5px] text-[#cfa24d] font-bold">RESIDENTIAL</span>
        </div>
      </div>
      
      {/* Property specs details */}
      <div className="flex-1 p-3 flex flex-col justify-between bg-[#0f0e0d]">
        <div className="space-y-2">
          <h4 className="text-[11px] font-display font-medium text-white">Kozyn Pine Villa</h4>
          <p className="text-[7.5px] text-white/50 leading-relaxed font-light">
            Luxury residence in pine forest. Features smart heating system, solar panels, and private access to the bay.
          </p>

          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div className="bg-[#181613] p-1.5 rounded-lg border border-white/5 text-center">
              <p className="text-[6px] text-white/40">Area</p>
              <p className="text-[8px] font-bold text-[#cfa24d] mt-0.5">450 m²</p>
            </div>
            <div className="bg-[#181613] p-1.5 rounded-lg border border-white/5 text-center">
              <p className="text-[6px] text-white/40">Est. Yield</p>
              <p className="text-[8px] font-bold text-[#cfa24d] mt-0.5">8.9%</p>
            </div>
            <div className="bg-[#181613] p-1.5 rounded-lg border border-white/5 text-center">
              <p className="text-[6px] text-white/40">ROI</p>
              <p className="text-[8px] font-bold text-[#cfa24d] mt-0.5">12.4%</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[6px] text-white/40 uppercase">Invest Price</p>
            <p className="text-[9px] font-bold text-white">$1,850,000</p>
          </div>
          <button className="bg-[#cfa24d] text-black font-bold px-3 py-1.5 rounded-lg text-[7.5px] shadow-lg">
            Consult Now
          </button>
        </div>
      </div>
    </IPhoneMockup>
  );
}

// ── Mockup Screen 3: Welcome Sign In Screen ──
function MockupWelcomeView() {
  return (
    <IPhoneMockup>
      <div className="flex-1 p-4 flex flex-col justify-between items-center text-center bg-[#0f0e0d] relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-[#cfa24d]/10 blur-[40px] pointer-events-none" />
        
        <div className="pt-8 flex flex-col items-center">
          <img src="/images/logo-golden-land.png" alt="Golden Land" className="h-10 object-contain mb-4 filter brightness-110" />
          <h4 className="text-[12px] font-display font-medium text-white tracking-wider">GOLDEN LAND INVEST</h4>
          <p className="text-[7.5px] text-[#cfa24d]/80 font-light mt-1 tracking-widest uppercase">PORTFOLIO PORTAL</p>
        </div>

        <div className="space-y-2 w-full pb-6 relative z-10">
          <p className="text-[7.5px] text-white/50 font-light leading-relaxed max-w-[150px] mx-auto mb-3">
            Sign in to unlock exclusive investment offers and consult with top advisors.
          </p>

          <button className="w-full bg-white text-black font-bold py-2 rounded-xl text-[7.5px] flex items-center justify-center gap-1.5 shadow-md">
            <span className="text-[9px]"></span> Sign in with Apple
          </button>
          
          <button className="w-full bg-[#181613] border border-white/5 text-white/70 py-2 rounded-xl text-[7.5px]">
            Continue with Email
          </button>
        </div>
      </div>
    </IPhoneMockup>
  );
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 8;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const printPresentation = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#090807] text-white font-ui flex flex-col items-center justify-center p-4 md:p-8 select-none relative overflow-x-hidden">
      
      {/* ── Background Gradients (Desktop Screen Mode only) ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#cfa24d]/5 blur-[120px] pointer-events-none max-md:hidden" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#cfa24d]/3 blur-[120px] pointer-events-none max-md:hidden" />

      {/* ── Top controls bar (Hidden on Print / Mobile) ── */}
      <div className="w-full max-w-[1100px] flex items-center justify-between mb-4 print-btn relative z-30 max-md:hidden">
        <div className="flex items-center gap-3">
          <img src="/images/logo-golden-land.png" alt="Golden Land" className="h-6 object-contain filter brightness-110" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#cfa24d] border-l border-white/10 pl-3">INVEST</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={printPresentation} 
            className="flex items-center gap-2 bg-[#cfa24d]/10 hover:bg-[#cfa24d]/20 border border-[#cfa24d]/30 text-[#cfa24d] px-4 py-2 rounded-xl text-[12px] font-bold tracking-wider transition-all cursor-pointer bg-transparent"
          >
            <Download className="w-4 h-4" />
            PDF / PRINT
          </button>
        </div>
      </div>

      {/* ── Slide Viewer Container (Unified Premium Dark Border & Shadow) ── */}
      <div className="w-full max-w-[1100px] md:min-h-[620px] border border-white/5 md:rounded-3xl flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-500 slide-container">
        
        {/* Slide Counter (Desktop only) */}
        <div className="absolute top-6 right-8 text-[12px] font-bold tracking-[0.2em] select-none print-hide z-20 max-md:hidden text-[#cfa24d]/45">
          {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </div>

        {/* ── Slide Content Slider (Desktop) / Vertical Stack (Mobile) ── */}
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <div 
            className="flex h-full transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.3,1)] slide-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            
            {/* SLIDE 1: COVER PAGE */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col items-center justify-center h-full slide-node bg-[#0f0e0d] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#cfa24d]/12 to-transparent blur-[95px] pointer-events-none z-0" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <img src="/images/logo-golden-land.png" alt="Golden Land" className="h-16 md:h-20 object-contain mb-8 filter brightness-110" />
                <h1 className="font-display font-light text-[36px] md:text-[54px] text-white tracking-[0.05em] leading-tight">
                  GOLDEN LAND INVEST
                </h1>
                <p className="text-[13px] md:text-[15px] text-[#cfa24d] font-light tracking-[0.3em] uppercase mt-3 mb-8">
                  Digital Real Estate Investment Platform
                </p>
                
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#cfa24d]/40 to-transparent mb-8" />

                <p className="text-[14px] md:text-[16px] text-white/60 font-light italic tracking-wide max-w-lg mb-10">
                  "Global Opportunities. Trusted Investments."
                </p>

                <div className="text-left md:text-center mt-4 text-white/50 text-[11px] tracking-[0.15em] uppercase font-light">
                  <p className="font-medium text-white/80">Walid Dib</p>
                  <p className="mt-0.5 text-[#cfa24d]/75">Founder & Director</p>
                  <p className="mt-1 text-white/30 text-[9px]">Golden Land Property & Investment</p>
                </div>
              </div>
            </div>

            {/* SLIDE 2: ABOUT & VISION (With Mockup 1: Map Screen) */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col justify-center h-full slide-node bg-[#0f0e0d] relative">
              {/* Luxury Business Center image blended under gold gradient */}
              <div className="absolute inset-0 z-0 bg-[url('/images/generated/kyiv_luxury_business_center.png')] bg-cover bg-center opacity-[0.08] filter saturate-50 brightness-75 pointer-events-none" />
              <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#cfa24d]/10 to-transparent blur-[100px] pointer-events-none z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full">
                <div className="md:col-span-7 space-y-4">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">01. About Platform</span>
                  <h2 className="font-display text-[28px] md:text-[34px] font-light text-white leading-tight">
                    Next-Gen Real Estate Ecosystem
                  </h2>
                  <div className="w-12 h-[1px] bg-[#cfa24d] my-3" />
                  <p className="text-[13px] md:text-[14px] text-white/70 leading-relaxed font-light">
                    Golden Land Invest is a next-generation digital real estate investment platform designed to connect property developers, real estate companies, and international investors through one professional digital ecosystem.
                  </p>
                  
                  <div className="border border-white/5 bg-white/[0.01] backdrop-blur-sm rounded-2xl p-5 space-y-4 mt-4">
                    <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">02. Our Vision</span>
                    <p className="text-[13.5px] text-[#cfa24d] italic font-light">
                      "To become a trusted global digital gateway for real estate investment."
                    </p>
                    <div className="grid grid-cols-2 gap-2.5 text-[11px] font-light text-white/60">
                      <div className="flex items-center gap-2"><Building className="w-3.5 h-3.5 text-[#cfa24d]" /> Developers</div>
                      <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-[#cfa24d]" /> Investors</div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 flex justify-center items-center max-md:hidden">
                  <MockupMapView />
                </div>
              </div>
            </div>

            {/* SLIDE 3: MARKET CHALLENGE & SOLUTION */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col justify-center h-full slide-node bg-[#0f0e0d] relative">
              {/* Business Tower image blended under gradients */}
              <div className="absolute inset-0 z-0 bg-[url('/images/generated/prop-kyiv-business-tower-1.webp')] bg-cover bg-center opacity-[0.08] filter saturate-50 brightness-75 pointer-events-none" />
              <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-[#cfa24d]/8 to-transparent blur-[100px] pointer-events-none z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center relative z-10">
                
                {/* Challenge Box */}
                <div className="border border-red-950/20 bg-red-950/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-4">
                  <span className="text-red-400 text-[11px] font-bold tracking-[0.25em] uppercase block">03. The Market Challenge</span>
                  <h3 className="font-display text-[22px] font-light text-white leading-snug">
                    Fragmented International Access
                  </h3>
                  <p className="text-[12.5px] text-white/65 font-light leading-relaxed">
                    Developers face hurdles in reaching verified international buyers, while global investors struggle to discover, analyze, and secure reliable properties abroad.
                  </p>
                  <div className="space-y-2 mt-4 text-[12px] font-light text-white/70">
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-1.5 shrink-0" />
                      <span>Sourcing trustworthy international investment deals</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-1.5 shrink-0" />
                      <span>Obtaining professional, verified project data</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-1.5 shrink-0" />
                      <span>Lack of direct connection with reputable developers</span>
                    </div>
                  </div>
                </div>

                {/* Solution Box */}
                <div className="border border-[#cfa24d]/15 bg-[#cfa24d]/[0.02] backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-4">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">04. Our Solution</span>
                  <h3 className="font-display text-[22px] font-light text-white leading-snug">
                    One Unified Digital Platform
                  </h3>
                  <p className="text-[12.5px] text-white/65 font-light leading-relaxed">
                    Golden Land Invest coordinates both sides within a digital environment, enabling investors to smoothly transition from discovery to professional advising.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { label: "Discover", desc: "Select opportunities" },
                      { label: "Evaluate", desc: "Deep project data" },
                      { label: "Explore", desc: "Interactive search" },
                      { label: "Connect", desc: "Direct consultation" }
                    ].map((s, i) => (
                      <div key={i} className="bg-[#181613] border border-white/5 p-3 rounded-xl shadow-sm">
                        <p className="text-[12px] font-bold text-[#cfa24d]">{s.label}</p>
                        <p className="text-[10px] text-white/45 font-light mt-0.5">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* SLIDE 4: VALUE PROP BY AUDIENCE */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col justify-center h-full slide-node bg-[#0f0e0d] relative">
              {/* Luxury residential apartment interior blended under gradient */}
              <div className="absolute inset-0 z-0 bg-[url('/images/generated/shared-apt-living.webp')] bg-cover bg-center opacity-[0.08] filter saturate-50 brightness-75 pointer-events-none" />
              <div className="absolute top-1/4 left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-[#cfa24d]/9 to-transparent blur-[95px] pointer-events-none z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                
                <div className="space-y-4">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">05. For Property Developers</span>
                  <h3 className="font-display text-[26px] font-light text-white leading-tight">
                    Global Marketing & Sales Channel
                  </h3>
                  <p className="text-[12.5px] text-white/55 font-light leading-relaxed">
                    Unlock access to international markets and present your projects directly to qualified high-net-worth investors.
                  </p>

                  <div className="space-y-2 pt-2 text-[12px] font-light text-white/80">
                    {[
                      "International Exposure across GCC, Europe & Australia",
                      "Professional Online Project Presentation & Media Hosting",
                      "Direct Lead Generation & Strategic Partnership Support",
                      "Strategic Sales Cooperation with Golden Land Advisors"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#cfa24d]/10 border border-[#cfa24d]/25 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-[#cfa24d]" />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.01] backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-5">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">06. For International Investors</span>
                  <h3 className="font-display text-[22px] font-light text-white leading-tight">
                    Diverse Asset Selection
                  </h3>
                  
                  <div className="space-y-4 pt-1">
                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase mb-1.5">Target Markets</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Ukraine", "UAE", "Qatar", "Australia", "Europe"].map((c, i) => (
                          <span key={i} className="text-[11px] font-light bg-[#1e1c18] border border-[#cfa24d]/15 text-white/80 px-2.5 py-0.5 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase mb-1.5">Asset Categories</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-light text-white/70">
                        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]/70" /> Residential Property</div>
                        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]/70" /> Commercial Space</div>
                        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]/70" /> Hotels & Hospitality</div>
                        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]/70" /> Land & Business Deals</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* SLIDE 5: KEY FEATURES (With Mockup 2: Property Detail) */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col justify-center h-full slide-node bg-[#0f0e0d] relative">
              {/* Ukraine gold map blended softly under gradients */}
              <div className="absolute inset-0 z-0 bg-[url('/images/generated/ukraine_investment_gold_map.png')] bg-cover bg-center opacity-[0.08] filter saturate-50 brightness-75 pointer-events-none" />
              <div className="absolute bottom-10 right-10 w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-[#cfa24d]/10 to-transparent blur-[90px] pointer-events-none z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full">
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">07. Platform Ecosystem</span>
                    <h3 className="font-display text-[26px] md:text-[32px] font-light text-white mt-1">
                      Key Investment Features
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2">
                    {[
                      { icon: Search, title: "Advanced Search", desc: "Filter by location, price, yield, and objectives." },
                      { icon: Map, title: "Interactive Map", desc: "Discover properties geographically via GPS." },
                      { icon: Compass, title: "Project Profiles", desc: "Specs, developer details, media galleries." },
                      { icon: Calculator, title: "ROI Calculator", desc: "Estimate rental yield and income on the fly." }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-white/5 bg-white/[0.02] hover:border-[#cfa24d]/25 p-3.5 rounded-2xl transition-all group backdrop-blur-sm">
                        <div className="w-7 h-7 rounded-lg bg-[#cfa24d]/5 border border-[#cfa24d]/20 flex items-center justify-center mb-2.5">
                          <item.icon className="w-3.5 h-3.5 text-[#cfa24d]" />
                        </div>
                        <h4 className="text-[12.5px] font-semibold text-white group-hover:text-[#cfa24d] transition-colors">{item.title}</h4>
                        <p className="text-[10.5px] text-white/40 font-light mt-1 leading-snug">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 flex justify-center items-center max-md:hidden">
                  <MockupDetailView />
                </div>
              </div>
            </div>

            {/* SLIDE 6: HOW IT WORKS (FLOW CHART) */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col justify-center h-full slide-node bg-[#0f0e0d] relative">
              {/* Investment consult graphic blended under gradient */}
              <div className="absolute inset-0 z-0 bg-[url('/images/generated/service-investment.webp')] bg-cover bg-center opacity-[0.08] filter saturate-50 brightness-75 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-[#cfa24d]/8 to-transparent blur-[100px] pointer-events-none z-0" />
              
              <div className="space-y-8 relative z-10">
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">08. Operational Flow</span>
                  <h3 className="font-display text-[26px] md:text-[32px] font-light text-white mt-1">
                    How The Platform Works
                  </h3>
                </div>

                <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-2 pt-6">
                  
                  {/* Visual Connector Line */}
                  <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-[#cfa24d]/5 via-[#cfa24d]/25 to-[#cfa24d]/5 z-0" />

                  {[
                    { step: "1", title: "Developer", desc: "Submits property for strategic screening." },
                    { step: "2", title: "Golden Land", desc: "Professionally presents and markets the project." },
                    { step: "3", title: "Investor", desc: "Discovers and reviews complete data sheets." },
                    { step: "4", title: "Consultation", desc: "Requests expert support on selected opportunities." },
                    { step: "5", title: "Investment", desc: "Golden Land facilitates deal execution." }
                  ].map((s, idx) => (
                    <div key={idx} className="flex-1 bg-[#100f0d]/90 border border-white/5 backdrop-blur-sm rounded-2xl p-4 text-center relative z-10 flex flex-col items-center shadow-md">
                      <div className="w-7 h-7 rounded-full bg-[#1e1c18] border border-[#cfa24d]/40 flex items-center justify-center mb-3">
                        <span className="text-[12px] font-bold text-[#cfa24d]">{s.step}</span>
                      </div>
                      <h4 className="text-[13px] font-semibold text-white">{s.title}</h4>
                      <p className="text-[10px] text-white/45 font-light mt-1.5 leading-relaxed max-w-[150px]">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SLIDE 7: NETWORK & PARTNERSHIP */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col justify-center h-full slide-node bg-[#0f0e0d] relative">
              {/* Service banner blended softly under gradient */}
              <div className="absolute inset-0 z-0 bg-[url('/images/generated/services_banner.png')] bg-cover bg-center opacity-[0.08] filter saturate-50 brightness-75 pointer-events-none" />
              <div className="absolute top-10 right-10 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#cfa24d]/7 to-transparent blur-[90px] pointer-events-none z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                
                <div className="space-y-4">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">09. Global Reach</span>
                  <h3 className="font-display text-[26px] font-light text-white leading-tight">
                    International Investor Network
                  </h3>

                  <div className="grid grid-cols-3 gap-2.5 pt-4">
                    {[
                      { flag: "AU", label: "Australia" },
                      { flag: "QA", label: "Qatar" },
                      { flag: "AE", label: "UAE" },
                      { flag: "KW", label: "Kuwait" },
                      { flag: "EU", label: "Europe" },
                      { flag: "UA", label: "Ukraine" }
                    ].map((c, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-xl px-3 py-2.5">
                        <span className="text-[10px] font-bold text-[#cfa24d]">{c.flag}</span>
                        <span className="text-[11px] text-white/80 font-light">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.01] backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-4">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">10. Developer Partnership</span>
                  <h3 className="font-display text-[22px] font-light text-white leading-tight">
                    Strategic Projects Welcomed
                  </h3>
                  
                  <div className="space-y-3 pt-2 text-[12px] font-light text-white/70">
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d] mt-1.5 shrink-0" />
                      <span>Project types: Residential, Commercial, Hotels, Land & Development</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d] mt-1.5 shrink-0" />
                      <span>Scope: Global marketing, cross-border promotion, sales representation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d] mt-1.5 shrink-0" />
                      <span>Models: Commission-based structure, Strategic partnerships</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* SLIDE 8: WHY US & FUTURE / CTA (With Mockup 3: Onboarding/Login View) */}
            <div className="w-full shrink-0 p-6 md:p-10 pb-20 md:pb-24 flex flex-col justify-center h-full slide-node bg-[#0f0e0d] relative">
              {/* Premium Odesa luxury waterfront villa photo backdrop under gradient */}
              <div className="absolute inset-0 z-0 bg-[url('/images/generated/featured-odesa-villa.webp')] bg-cover bg-center opacity-[0.08] filter saturate-50 brightness-75 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-r from-[#cfa24d]/12 to-[#cfa24d]/2 blur-[80px] pointer-events-none z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 w-full">
                <div className="md:col-span-7 space-y-4">
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">11. Why Golden Land Invest?</span>
                  <h3 className="font-display text-[24px] md:text-[26px] font-light text-white leading-tight">
                    Platform Core Pillars
                  </h3>

                  <div className="space-y-3 pt-2 text-[12px] font-light text-white/80">
                    {[
                      { label: "International Vision", desc: "Designed to connect cross-border capital." },
                      { label: "Digital First", desc: "Tailored to modern investor search behavior." },
                      { label: "Professional Approach", desc: "Rooted in transparency and long-term trust." }
                    ].map((p, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#cfa24d]/10 border border-[#cfa24d]/25 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]" />
                        </div>
                        <div>
                          <strong className="text-white font-medium">{p.label}</strong>
                          <span className="text-white/50 block text-[11px] mt-0.5">{p.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border border-[#cfa24d]/15 bg-[#cfa24d]/[0.02] rounded-xl p-4 text-center mt-4">
                    <p className="text-[#cfa24d] font-display text-[15px] font-light">Partner With Golden Land Invest</p>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-0.5">Present Projects. Reach Investors. Grow Globally.</p>
                  </div>
                </div>

                <div className="md:col-span-5 flex justify-center items-center max-md:hidden">
                  <MockupWelcomeView />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Slide Footer (Desktop only) ── */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 print-hide max-md:hidden z-20 absolute bottom-0 left-0 right-0 h-16 px-10 bg-[#0f0e0d]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-white/30">GOLDEN LAND INVEST</span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11.5px] font-light text-white/35">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button 
              onClick={nextSlide}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white/60 hover:text-white transition-all cursor-pointer bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ── Global Styles ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-ui      { font-family: 'Manrope', system-ui, sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .slide-container {
          background-color: #0c0b0a !important;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(207, 162, 77, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(207, 162, 77, 0.04) 0%, transparent 45%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23cfa24d' stroke-width='0.5' stroke-opacity='0.025'/%3E%3C/svg%3E") !important;
          background-size: auto, auto, 60px 60px !important;
        }

        @media (max-width: 767px) {
          .slide-container {
            aspect-ratio: auto !important;
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .slide-track {
            display: flex !important;
            flex-direction: column !important;
            transform: none !important;
            gap: 4rem !important;
          }
          .slide-node {
            width: 100% !important;
            flex-shrink: 1 !important;
            min-height: auto !important;
            padding: 2.5rem 1.5rem 4rem 1.5rem !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          }
        }

        @media print {
          body, html {
            background: #090807 !important;
            color: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            height: 100vh !important;
            width: 100vw !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-btn {
            display: none !important;
          }
          .print-hide {
            display: none !important;
          }
          .slide-container {
            border: none !important;
            box-shadow: none !important;
            background: #090807 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            aspect-ratio: auto !important;
            padding: 2.5rem !important;
            border-radius: 0 !important;
            box-sizing: border-box !important;
            page-break-after: always !important;
            break-after: page !important;
          }
          .slide-track {
            transform: none !important;
            display: block !important;
          }
          .slide-node {
            display: flex !important;
            page-break-after: always !important;
            break-after: page !important;
            height: 100vh !important;
            width: 100vw !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

    </div>
  );
}
