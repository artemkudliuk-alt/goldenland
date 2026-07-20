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
  TrendingUp, 
  Users, 
  Search, 
  Map, 
  Cpu, 
  Calculator, 
  Heart, 
  PhoneCall, 
  Compass, 
  AlertTriangle
} from "lucide-react";

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
      
      {/* ── Background Gradients ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#cfa24d]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#cfa24d]/3 blur-[120px] pointer-events-none" />

      {/* ── Top controls bar (Hidden on Print) ── */}
      <div className="w-full max-w-[1100px] flex items-center justify-between mb-4 print-btn relative z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#cfa24d]/10 border border-[#cfa24d]/25 flex items-center justify-center">
            <span className="font-display text-[16px] text-[#cfa24d] font-bold">G</span>
          </div>
          <span className="text-[12px] font-bold tracking-[0.2em] text-[#cfa24d]">GOLDEN LAND INVEST</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={printPresentation} 
            className="flex items-center gap-2 bg-[#cfa24d]/10 hover:bg-[#cfa24d]/20 border border-[#cfa24d]/30 text-[#cfa24d] px-4 py-2 rounded-xl text-[12px] font-bold tracking-wider transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            PDF / PRINT
          </button>
        </div>
      </div>

      {/* ── Slide Viewer Container ── */}
      <div className="w-full max-w-[1100px] aspect-[16/10] bg-[#100f0d] border border-white/5 md:rounded-3xl p-6 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-500 slide-container">
        
        {/* Decorative corner grid background */}
        <div className="absolute top-0 right-0 w-[150px] h-[150px] pointer-events-none opacity-[0.02]" 
             style={{ backgroundImage: "radial-gradient(#cfa24d 1px, transparent 0), radial-gradient(#cfa24d 1px, transparent 0)", backgroundSize: "8px 8px" }} />
        
        {/* Slide Counter (Gold numbering) */}
        <div className="absolute top-6 right-8 text-[12px] font-bold tracking-[0.2em] text-[#cfa24d]/40 select-none print-hide">
          {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </div>

        {/* ── Slide Content Router ── */}
        <div className="flex-1 flex flex-col justify-center">
          
          {/* SLIDE 1: COVER PAGE */}
          {currentSlide === 0 && (
            <div className="text-center flex flex-col items-center justify-center py-6 h-full slide-node">
              <div className="w-20 h-20 rounded-2xl bg-[#1a1815] border border-[#cfa24d]/35 flex items-center justify-center mb-8 shadow-lg">
                <span className="font-display text-[44px] text-[#cfa24d] font-bold">G</span>
              </div>
              <h1 className="font-display font-light text-[40px] md:text-[54px] text-white tracking-[0.05em] leading-tight">
                GOLDEN LAND INVEST
              </h1>
              <p className="text-[13px] md:text-[15px] text-[#cfa24d] font-light tracking-[0.3em] uppercase mt-3 mb-10">
                Digital Real Estate Investment Platform
              </p>
              
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#cfa24d]/40 to-transparent mb-10" />

              <p className="text-[14px] md:text-[16px] text-white/60 font-light italic tracking-wide max-w-lg mb-12">
                "Global Opportunities. Trusted Investments."
              </p>

              <div className="text-left md:text-center mt-6 text-white/50 text-[11px] tracking-[0.15em] uppercase font-light">
                <p className="font-medium text-white/80">Walid Dib</p>
                <p className="mt-0.5 text-[#cfa24d]/75">Founder & Director</p>
                <p className="mt-1 text-white/30 text-[9px]">Golden Land Property & Investment</p>
              </div>
            </div>
          )}

          {/* SLIDE 2: ABOUT & VISION */}
          {currentSlide === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-full items-center slide-node">
              <div className="space-y-4">
                <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">01. About Platform</span>
                <h2 className="font-display text-[28px] md:text-[34px] font-light text-white leading-tight">
                  Next-Gen Real Estate Ecosystem
                </h2>
                <div className="w-12 h-[1px] bg-[#cfa24d] my-3" />
                <p className="text-[13px] md:text-[14.5px] text-white/70 leading-relaxed font-light">
                  Golden Land Invest is a next-generation digital real estate investment platform designed to connect property developers, real estate companies, and international investors through one professional digital ecosystem.
                </p>
                <p className="text-[13px] md:text-[14.5px] text-white/70 leading-relaxed font-light">
                  We provide investors with curated international opportunities while giving developers a direct, powerful channel to present projects to qualified global buyers.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6 md:p-8 space-y-6">
                <div>
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">02. Our Vision</span>
                  <p className="text-[14px] text-[#cfa24d] italic font-light mt-1">
                    "To become a trusted global digital gateway for real estate investment."
                  </p>
                </div>
                <div className="flex gap-2">
                  {["More Accessible", "More Connected", "More Professional"].map((item, idx) => (
                    <div key={idx} className="flex-1 bg-[#1e1c18] border border-[#cfa24d]/15 rounded-lg py-2.5 text-center">
                      <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-white/80 block">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 text-[11px] font-light text-white/60">
                  <div className="flex items-center gap-2"><Building className="w-3.5 h-3.5 text-[#cfa24d]" /> Property Developers</div>
                  <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-[#cfa24d]" /> International Investors</div>
                  <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-[#cfa24d]" /> Global Markets</div>
                  <div className="flex items-center gap-2"><Smartphone className="w-3.5 h-3.5 text-[#cfa24d]" /> Digital Ecosystem</div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: MARKET CHALLENGE & SOLUTION */}
          {currentSlide === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 h-full items-center slide-node">
              
              {/* Challenge Box */}
              <div className="border border-red-950/20 bg-red-950/5 rounded-2xl p-6 md:p-8 space-y-4">
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
                    <span>Lack of direct, strategic connection with reputable developers</span>
                  </div>
                </div>
              </div>

              {/* Solution Box */}
              <div className="border border-[#cfa24d]/15 bg-[#cfa24d]/[0.02] rounded-2xl p-6 md:p-8 space-y-4">
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
                    <div key={i} className="bg-[#181613] border border-white/5 p-3 rounded-xl">
                      <p className="text-[12px] font-bold text-[#cfa24d]">{s.label}</p>
                      <p className="text-[10px] text-white/45 font-light mt-0.5">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* SLIDE 4: VALUE PROP BY AUDIENCE */}
          {currentSlide === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-full items-center slide-node">
              
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

              <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 md:p-8 space-y-5">
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

                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-white/40 uppercase mb-1">Flexibility</p>
                    <p className="text-[12px] text-white/60 font-light">Flexible budget tiers accommodating entry-level fractional holdings up to exclusive private portfolios.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SLIDE 5: KEY FEATURES */}
          {currentSlide === 4 && (
            <div className="space-y-6 slide-node">
              <div className="text-center max-w-xl mx-auto">
                <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">07. Platform Ecosystem</span>
                <h3 className="font-display text-[26px] md:text-[32px] font-light text-white mt-1">
                  Key Investment Features
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-2">
                {[
                  { icon: Search, title: "Advanced Search", desc: "Filter by location, price, yield, and investment objective." },
                  { icon: Map, title: "Interactive Map", desc: "Discover opportunities geographically via real coordinates." },
                  { icon: Compass, title: "Project Profiles", desc: "Media galleries, highlights, developer details, unit availability." },
                  { icon: Cpu, title: "Smart Matching", desc: "AI engine suggesting opportunities matching preferences." },
                  { icon: Calculator, title: "ROI Calculator", desc: "Estimate rental yield and income on the fly." },
                  { icon: PhoneCall, title: "Consultation Hub", desc: "Direct connection with the Golden Land strategic team." }
                ].map((item, idx) => (
                  <div key={idx} className="border border-white/5 bg-white/[0.01] hover:border-[#cfa24d]/25 p-4 rounded-2xl transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-[#cfa24d]/5 border border-[#cfa24d]/20 flex items-center justify-center mb-3">
                      <item.icon className="w-4 h-4 text-[#cfa24d]" />
                    </div>
                    <h4 className="text-[13px] font-semibold text-white group-hover:text-[#cfa24d] transition-colors">{item.title}</h4>
                    <p className="text-[11px] text-white/40 font-light mt-1 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 6: HOW IT WORKS (FLOW CHART) */}
          {currentSlide === 5 && (
            <div className="space-y-8 slide-node">
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
                  <div key={idx} className="flex-1 bg-[#100f0d] border border-white/5 rounded-2xl p-4 text-center relative z-10 flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-[#1e1c18] border border-[#cfa24d]/40 flex items-center justify-center mb-3">
                      <span className="text-[12px] font-bold text-[#cfa24d]">{s.step}</span>
                    </div>
                    <h4 className="text-[13px] font-semibold text-white">{s.title}</h4>
                    <p className="text-[10px] text-white/45 font-light mt-1.5 leading-relaxed max-w-[150px]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SLIDE 7: NETWORK & PARTNERSHIP */}
          {currentSlide === 6 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-full items-center slide-node">
              
              <div className="space-y-4">
                <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">09. Global Reach</span>
                <h3 className="font-display text-[26px] font-light text-white leading-tight">
                  International Investor Network
                </h3>
                <p className="text-[12.5px] text-white/55 font-light leading-relaxed">
                  Golden Land Invest targets verified capital and real estate interest across prominent global markets:
                </p>

                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  {[
                    { flag: "🇦🇺", label: "Australia" },
                    { flag: "🇶🇦", label: "Qatar" },
                    { flag: "🇦🇪", label: "UAE" },
                    { flag: "🇰🇼", label: "Kuwait" },
                    { flag: "🇪🇺", label: "Europe" },
                    { flag: "🇺🇦", label: "Ukraine" }
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/[0.02] border border-white/5 rounded-xl px-3 py-2">
                      <span className="text-[16px]">{c.flag}</span>
                      <span className="text-[11px] text-white/80 font-light">{c.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/40 italic font-light pt-2">
                  Building a global corridor for real estate investment flow.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-6 md:p-8 space-y-4">
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
                    <span>Models: Commission-based structure, Strategic strategic partnerships</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SLIDE 8: WHY US & FUTURE VISION (CTA) */}
          {currentSlide === 7 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 h-full items-center slide-node">
              
              <div className="space-y-4">
                <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block">11. Why Golden Land Invest?</span>
                <h3 className="font-display text-[26px] font-light text-white leading-tight">
                  Platform Core Pillars
                </h3>

                <div className="space-y-3 pt-2 text-[12.5px] font-light text-white/80">
                  {[
                    { label: "International Vision", desc: "Designed to connect cross-border capital." },
                    { label: "Digital First", desc: "Tailored to modern investor search behavior." },
                    { label: "Professional Approach", desc: "Rooted in transparency and long-term trust." },
                    { label: "Real Estate Experience", desc: "Backed by the network of Golden Land Property & Investment." }
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#cfa24d]/10 border border-[#cfa24d]/25 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#cfa24d]" />
                      </div>
                      <div>
                        <strong className="text-white font-medium">{p.label}</strong>
                        <span className="text-white/50 block text-[11.5px] mt-0.5">{p.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#cfa24d]/15 bg-[#cfa24d]/[0.02] rounded-2xl p-6 md:p-8 text-center flex flex-col justify-center items-center space-y-6">
                <div>
                  <span className="text-[#cfa24d] text-[11px] font-bold tracking-[0.25em] uppercase block mb-1">12. Future Vision</span>
                  <p className="text-[12px] text-white/60 font-light leading-relaxed max-w-xs">
                    Building a global digital ecosystem with advanced data analytics, smart recommendations, and strategic developer alignments.
                  </p>
                </div>

                <div className="w-full bg-[#181613] border border-white/5 rounded-xl p-4 text-center">
                  <p className="text-[#cfa24d] font-display text-[18px] font-light">Partner With Golden Land Invest</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Present Projects. Reach Investors. Grow Globally.</p>
                </div>

                <div className="text-[11px] font-light text-white/50 space-y-0.5">
                  <p className="font-semibold text-white/80">Walid Dib</p>
                  <p>Founder & Director</p>
                  <p className="text-[#cfa24d] mt-1 hover:underline cursor-pointer">info@goldenlandproperty.com.ua</p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ── Slide Footer ── */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 print-hide">
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

      {/* ── Print Instructions overlay (Hidden on print) ── */}
      <div className="w-full max-w-[1100px] mt-4 flex items-center gap-2 justify-center bg-white/[0.02] border border-white/5 py-2.5 rounded-2xl print-btn text-white/35 text-[11px] font-light">
        <AlertTriangle className="w-3.5 h-3.5 text-[#cfa24d]" />
        <span>Tip: For optimal PDF results, set Layout to **Landscape**, Margins to **None**, and check **Background graphics** in print options.</span>
      </div>

      {/* ── Global Styles including Print-to-PDF breaks ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
        
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-ui      { font-family: 'Manrope', system-ui, sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

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
          .slide-node {
            transform: scale(1) !important;
            opacity: 1 !important;
          }
        }
      `}</style>

    </div>
  );
}
