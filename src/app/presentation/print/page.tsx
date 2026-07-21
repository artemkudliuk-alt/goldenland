"use client";

import React, { useEffect } from "react";
import { Check, Building, Users, Search, Map, Calculator, Compass, ArrowRight } from "lucide-react";

// ── iPhone Device Wrapper ──
function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: "relative",
      width: "200px",
      height: "400px",
      background: "#151311",
      borderRadius: "32px",
      padding: "10px",
      boxShadow: "0 25px 50px rgba(0,0,0,0.8)",
      border: "3px solid #38332d",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: "absolute",
        top: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "72px",
        height: "14px",
        background: "#000",
        borderRadius: "9999px",
        zIndex: 40,
      }} />
      {/* Internal viewport */}
      <div style={{
        width: "100%",
        height: "100%",
        borderRadius: "24px",
        overflow: "hidden",
        background: "#090807",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #000",
        zIndex: 10,
        fontSize: "9px",
      }}>
        {children}
      </div>
    </div>
  );
}

function MockupMapView() {
  return (
    <IPhoneMockup>
      <div style={{ height: "28px", padding: "8px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "8px", color: "rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.45)" }}>
        <span>9:41</span>
        <div style={{ width: "10px", height: "6px", background: "rgba(255,255,255,0.6)", borderRadius: "1px" }} />
      </div>
      <div style={{ padding: "6px 10px 4px", background: "rgba(0,0,0,0.45)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#1a1816", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "4px 8px", color: "rgba(255,255,255,0.5)", fontSize: "8px" }}>
          <div style={{ width: "10px", height: "10px", color: "#cfa24d" }}>🔍</div>
          <span>Search city or district</span>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", background: "#110f0d", overflow: "hidden" }}>
        <img src="/images/generated/ukraine_investment_gold_map.png" alt="Map" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22, filter: "grayscale(100%) contrast(1.25) brightness(0.25)" }} />
        {/* Kyiv pill */}
        <div style={{ position: "absolute", top: "48px", left: "12px", background: "#1e1c18", border: "1px solid rgba(207,162,77,0.2)", borderRadius: "9999px", padding: "3px 9px", display: "flex", alignItems: "center", gap: "4px", fontSize: "8px", fontWeight: "bold", color: "white", whiteSpace: "nowrap" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#cfa24d" }} />
          Kyiv · 12
        </div>
        {/* Odesa pill (selected / gold) */}
        <div style={{ position: "absolute", top: "100px", right: "6px", background: "#cfa24d", borderRadius: "9999px", padding: "3px 9px", display: "flex", alignItems: "center", gap: "4px", fontSize: "8px", fontWeight: "bold", color: "#000", whiteSpace: "nowrap", boxShadow: "0 0 12px rgba(207,162,77,0.5)" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "rgba(0,0,0,0.5)" }} />
          Odesa · 8
        </div>
        {/* Lviv pill */}
        <div style={{ position: "absolute", bottom: "100px", left: "28px", background: "#1e1c18", border: "1px solid rgba(207,162,77,0.2)", borderRadius: "9999px", padding: "3px 9px", display: "flex", alignItems: "center", gap: "4px", fontSize: "8px", fontWeight: "bold", color: "white", whiteSpace: "nowrap" }}>
          <div style={{ width: "4px", height: "4px", borderRadius: "9999px", background: "#cfa24d" }} />
          Lviv · 5
        </div>
        {/* Bottom sheet */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#141210", borderTop: "1px solid rgba(207,162,77,0.15)", borderRadius: "12px 12px 0 0", padding: "8px 10px", zIndex: 20 }}>
          <div style={{ width: "24px", height: "2px", background: "rgba(255,255,255,0.2)", borderRadius: "9999px", margin: "0 auto 6px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <span style={{ fontSize: "9px", color: "white", fontFamily: "serif" }}>Odesa, Ukraine</span>
            <span style={{ fontSize: "7.5px", color: "#cfa24d", fontWeight: "bold" }}>8 properties</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#1e1b17", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "6px" }}>
            <img src="/images/generated/thumb_odesa_apartment.png" alt="" style={{ width: "28px", height: "28px", borderRadius: "6px", objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: "7.5px", fontWeight: "700", color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Beachfront Villa with Infinity Pool</p>
              <p style={{ margin: "2px 0 0", fontSize: "7px", color: "rgba(255,255,255,0.4)" }}>From $2,200,000 • ROI 7.9%</p>
            </div>
            <span style={{ color: "#cfa24d", fontSize: "10px", flexShrink: 0 }}>→</span>
          </div>
        </div>
      </div>
    </IPhoneMockup>
  );
}

function MockupDetailView() {
  return (
    <IPhoneMockup>
      {/* Status bar */}
      <div style={{ height: "28px", padding: "8px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "8px", color: "rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.4)", position: "absolute", top: 0, left: 0, right: 0, zIndex: 30 }}>
        <span>9:41</span>
        <div style={{ width: "10px", height: "6px", background: "rgba(255,255,255,0.6)", borderRadius: "1px" }} />
      </div>
      {/* Hero image */}
      <div style={{ height: "140px", flexShrink: 0, position: "relative", background: `url('/images/generated/prop-kozyn-forest-villa-1.webp') center/cover` }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ position: "absolute", top: "34px", left: "10px", width: "18px", height: "18px", borderRadius: "9999px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "8px" }}>←</div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, background: "#0e0d0b", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
        <div>
          <span style={{ display: "inline-block", fontSize: "6px", fontWeight: "bold", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(207,162,77,0.4)", color: "#cfa24d", padding: "2px 7px", borderRadius: "9999px", marginBottom: "7px" }}>OFF-PLAN • VERIFIED</span>
          <h4 style={{ margin: "0 0 3px", fontFamily: "serif", fontWeight: "300", fontSize: "13px", color: "white", lineHeight: 1.3 }}>Pine Forest Villa in Kozyn</h4>
          <p style={{ margin: "0 0 8px", fontSize: "7px", color: "rgba(255,255,255,0.45)" }}>Kozyn, Kyiv Region • Dnipro Embankment</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "8px" }}>
            <div style={{ background: "#1a1713", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "9px", padding: "8px" }}>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#cfa24d" }}>$1,650,000</p>
              <p style={{ margin: "2px 0 0", fontSize: "5.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>PRICE</p>
            </div>
            <div style={{ background: "#1a1713", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "9px", padding: "8px" }}>
              <p style={{ margin: 0, fontSize: "11px", fontWeight: "bold", color: "#cfa24d" }}>8.2%</p>
              <p style={{ margin: "2px 0 0", fontSize: "5.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>EXPECTED ROI</p>
            </div>
          </div>
          <p style={{ margin: "0 0 5px", fontSize: "6.5px", fontWeight: "bold", color: "#cfa24d", letterSpacing: "0.15em", textTransform: "uppercase" }}>INVESTMENT HIGHLIGHTS</p>
          {["Dnipro riverfront plot", "Private pine forest setting"].map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "9999px", background: "rgba(207,162,77,0.15)", border: "1px solid rgba(207,162,77,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "7px", color: "#cfa24d" }}>✓</div>
              <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.8)" }}>{h}</span>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "8px", display: "flex", gap: "8px", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, fontSize: "5.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>INVEST PRICE</p>
            <p style={{ margin: "2px 0 0", fontSize: "9px", fontWeight: "bold", color: "white" }}>$1,650,000</p>
          </div>
          <button style={{ flex: 1, background: "#cfa24d", color: "#000", fontWeight: "bold", fontSize: "7.5px", textTransform: "uppercase", padding: "7px 0", borderRadius: "9999px", border: "none" }}>REQUEST CONSULTATION</button>
        </div>
      </div>
    </IPhoneMockup>
  );
}

function MockupWelcomeView() {
  return (
    <IPhoneMockup>
      <div style={{
        flex: 1,
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        backgroundImage: "url('/images/burj_khalifa_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.92) 100%)" }} />
        <div style={{ position: "absolute", inset: "8px", border: "1px solid rgba(207,162,77,0.1)", pointerEvents: "none" }} />
        <div style={{ width: "100%", height: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "7px", color: "rgba(255,255,255,0.6)", zIndex: 20, position: "relative" }}>
          <span>9:41</span>
          <div style={{ width: "8px", height: "4px", background: "rgba(255,255,255,0.6)", borderRadius: "1px" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "16px" }}>
          <img src="/images/logo-golden-land.png" alt="Golden Land" style={{ height: "44px", width: "44px", objectFit: "contain", marginBottom: "10px", filter: "brightness(1.1)" }} />
          <h4 style={{ margin: 0, fontFamily: "serif", fontWeight: "500", fontSize: "11px", letterSpacing: "0.25em", color: "#cfa24d", textTransform: "uppercase" }}>GOLDEN LAND</h4>
          <p style={{ margin: "5px 0 0", fontSize: "6px", letterSpacing: "0.38em", color: "rgba(207,162,77,0.9)", textTransform: "uppercase", fontWeight: "bold" }}>PROPERTY INVESTMENT</p>
          <p style={{ margin: "12px 0 0", fontSize: "8px", color: "rgba(255,255,255,0.95)", fontWeight: "500", padding: "0 8px" }}>Global Opportunities. Trusted Investments.</p>
        </div>
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "7px", width: "100%", paddingBottom: "12px", paddingLeft: "6px", paddingRight: "6px" }}>
          <button style={{ width: "100%", background: "#cfa24d", color: "#000", fontWeight: "600", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "9px 0", borderRadius: "9999px", border: "none" }}>SIGN IN</button>
          <button style={{ width: "100%", background: "transparent", border: "1px solid rgba(207,162,77,0.4)", color: "white", fontWeight: "600", fontSize: "7.5px", textTransform: "uppercase", padding: "8px 0", borderRadius: "9999px" }}>CREATE ACCOUNT</button>
          <button style={{ width: "100%", background: "white", color: "#000", fontWeight: "600", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", padding: "9px 0", borderRadius: "9999px", border: "none" }}>
            <svg style={{ width: "10px", height: "10px", fill: "currentColor", flexShrink: 0 }} viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.52-.63.73-1.18 1.9-1.04 3.01 1.12.09 2.27-.61 2.99-1.47z" /></svg>
            Sign in with Apple
          </button>
        </div>
      </div>
    </IPhoneMockup>
  );
}

// ── Shared slide layout wrappers ──
function Slide({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      pageBreakAfter: "always",
      breakAfter: "page",
      backgroundColor: "#0f0e0d",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "40px 60px",
      boxSizing: "border-box",
      overflow: "hidden",
    }}>
      {bg && (
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${bg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.08,
          filter: "saturate(0.5) brightness(0.75)",
          pointerEvents: "none",
        }} />
      )}
      <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

const gold = "#cfa24d";
const s = {
  tag: { color: gold, fontSize: "11px", fontWeight: "bold", letterSpacing: "0.25em", textTransform: "uppercase" as const, display: "block", marginBottom: "10px" },
  h1: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "52px", color: "white", lineHeight: 1.15, margin: "0 0 10px" },
  h2: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "32px", color: "white", lineHeight: 1.2, margin: "0 0 10px" },
  h3: { fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "24px", color: "white", lineHeight: 1.2, margin: "0 0 10px" },
  p: { fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: "0 0 8px", fontWeight: 300 },
  divider: { width: "48px", height: "1px", background: gold, margin: "12px 0" },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center" },
  grid12_7: { display: "grid", gridTemplateColumns: "7fr 5fr", gap: "40px", alignItems: "center" },
  card: { border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)", borderRadius: "16px", padding: "24px" },
  bullet: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "8px" },
  dot: { width: "6px", height: "6px", borderRadius: "9999px", background: gold, marginTop: "6px", flexShrink: 0 },
  check: { width: "16px", height: "16px", borderRadius: "9999px", background: "rgba(207,162,77,0.1)", border: "1px solid rgba(207,162,77,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: gold, fontSize: "9px" },
};

export default function PresentationPrintPage() {
  useEffect(() => {
    document.title = "Golden Land Invest – Presentation";
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500&family=Manrope:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { background: #090807; color: white; font-family: 'Manrope', system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        @page { size: A4 landscape; margin: 0; }
        @media print {
          body, html { background: #090807 !important; }
        }
      `}</style>

      {/* SLIDE 1: COVER */}
      <Slide>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", borderRadius: "9999px", background: "radial-gradient(circle, rgba(207,162,77,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 10 }}>
          <img src="/images/logo-golden-land.png" alt="Golden Land" style={{ height: "80px", objectFit: "contain", marginBottom: "28px", filter: "brightness(1.1)" }} />
          <h1 style={s.h1}>GOLDEN LAND INVEST</h1>
          <p style={{ color: gold, fontSize: "14px", letterSpacing: "0.3em", textTransform: "uppercase", margin: "8px 0 28px", fontWeight: 300 }}>Digital Real Estate Investment Platform</p>
          <div style={s.divider} />
          <p style={{ ...s.p, fontStyle: "italic", fontSize: "16px", margin: "20px 0 32px" }}>&ldquo;Global Opportunities. Trusted Investments.&rdquo;</p>
          <div>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase" }}>Walid Dib</p>
            <p style={{ color: "rgba(207,162,77,0.75)", fontSize: "11px", marginTop: "4px", letterSpacing: "0.1em" }}>Founder & Director</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", marginTop: "4px" }}>Golden Land Property & Investment</p>
          </div>
        </div>
      </Slide>

      {/* SLIDE 2: ABOUT & VISION */}
      <Slide bg="/images/generated/kyiv_luxury_business_center.png">
        <div style={s.grid12_7}>
          <div>
            <span style={s.tag}>01. About Platform</span>
            <h2 style={s.h2}>Next-Gen Real Estate Ecosystem</h2>
            <div style={s.divider} />
            <p style={s.p}>Golden Land Invest is a next-generation digital real estate investment platform designed to connect property developers, real estate companies, and international investors through one professional digital ecosystem.</p>
            <div style={{ ...s.card, marginTop: "16px" }}>
              <span style={{ ...s.tag, fontSize: "10px", marginBottom: "8px" }}>02. Our Vision</span>
              <p style={{ ...s.p, color: gold, fontStyle: "italic", fontSize: "13px", marginBottom: "12px" }}>&ldquo;To become a trusted global digital gateway for real estate investment.&rdquo;</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: gold }}>⬛</span> Developers</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: gold }}>👥</span> Investors</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockupMapView />
          </div>
        </div>
      </Slide>

      {/* SLIDE 3: CHALLENGE & SOLUTION */}
      <Slide bg="/images/generated/prop-kyiv-business-tower-1.webp">
        <div style={s.grid2}>
          <div style={{ ...s.card, borderColor: "rgba(127,29,29,0.2)", background: "rgba(127,29,29,0.05)" }}>
            <span style={{ ...s.tag, color: "#f87171" }}>03. The Market Challenge</span>
            <h3 style={s.h3}>Fragmented International Access</h3>
            <p style={s.p}>Developers face hurdles in reaching verified international buyers, while global investors struggle to discover, analyze, and secure reliable properties abroad.</p>
            {["Sourcing trustworthy international investment deals", "Obtaining professional, verified project data", "Lack of direct connection with reputable developers"].map((item, i) => (
              <div key={i} style={s.bullet}>
                <div style={{ ...s.dot, background: "#f87171" }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ ...s.card, borderColor: "rgba(207,162,77,0.15)", background: "rgba(207,162,77,0.02)" }}>
            <span style={s.tag}>04. Our Solution</span>
            <h3 style={s.h3}>One Unified Digital Platform</h3>
            <p style={s.p}>Golden Land Invest coordinates both sides within a digital environment, enabling investors to smoothly transition from discovery to professional advising.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
              {[["Discover", "Select opportunities"], ["Evaluate", "Deep project data"], ["Explore", "Interactive search"], ["Connect", "Direct consultation"]].map(([label, desc], i) => (
                <div key={i} style={{ background: "#181613", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "10px" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold", color: gold, margin: "0 0 2px" }}>{label}</p>
                  <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 4: VALUE PROPOSITION */}
      <Slide bg="/images/generated/shared-apt-living.webp">
        <div style={s.grid2}>
          <div>
            <span style={s.tag}>05. For Property Developers</span>
            <h3 style={s.h3}>Global Marketing & Sales Channel</h3>
            <p style={s.p}>Unlock access to international markets and present your projects directly to qualified high-net-worth investors.</p>
            {["International Exposure across GCC, Europe & Australia", "Professional Online Project Presentation & Media Hosting", "Direct Lead Generation & Strategic Partnership Support", "Strategic Sales Cooperation with Golden Land Advisors"].map((item, i) => (
              <div key={i} style={{ ...s.bullet, marginBottom: "6px" }}>
                <div style={s.check}>✓</div>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={s.card}>
            <span style={s.tag}>06. For International Investors</span>
            <h3 style={s.h3}>Diverse Asset Selection</h3>
            <div style={{ marginTop: "12px" }}>
              <p style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Target Markets</p>
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px", marginBottom: "16px" }}>
                {["Ukraine", "UAE", "Qatar", "Australia", "Europe"].map((c, i) => (
                  <span key={i} style={{ fontSize: "11px", background: "#1e1c18", border: "1px solid rgba(207,162,77,0.15)", color: "rgba(255,255,255,0.8)", padding: "3px 10px", borderRadius: "9999px" }}>{c}</span>
                ))}
              </div>
              <p style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>Asset Categories</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {["Residential Property", "Commercial Space", "Hotels & Hospitality", "Land & Business Deals"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
                    <div style={{ ...s.dot, width: "5px", height: "5px" }} />{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 5: KEY FEATURES */}
      <Slide bg="/images/generated/ukraine_investment_gold_map.png">
        <div style={s.grid12_7}>
          <div>
            <span style={s.tag}>07. Platform Ecosystem</span>
            <h2 style={s.h2}>Key Investment Features</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "20px" }}>
              {[
                { title: "Advanced Search", desc: "Filter by location, price, yield, and objectives." },
                { title: "Interactive Map", desc: "Discover properties geographically via GPS." },
                { title: "Project Profiles", desc: "Specs, developer details, media galleries." },
                { title: "ROI Calculator", desc: "Estimate rental yield and income on the fly." },
              ].map((item, idx) => (
                <div key={idx} style={{ ...s.card, padding: "14px" }}>
                  <h4 style={{ fontSize: "13px", fontWeight: "600", color: "white", margin: "0 0 5px" }}>{item.title}</h4>
                  <p style={{ ...s.p, fontSize: "11px", margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockupDetailView />
          </div>
        </div>
      </Slide>

      {/* SLIDE 6: HOW IT WORKS */}
      <Slide bg="/images/generated/service-investment.webp">
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span style={s.tag}>08. Operational Flow</span>
          <h2 style={s.h2}>How The Platform Works</h2>
        </div>
        <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between", gap: "14px", position: "relative" }}>
          <div style={{ position: "absolute", top: "28px", left: "5%", right: "5%", height: "1px", background: "linear-gradient(to right, rgba(207,162,77,0.05), rgba(207,162,77,0.25), rgba(207,162,77,0.05))" }} />
          {[
            { step: "1", title: "Developer", desc: "Submits property for strategic screening." },
            { step: "2", title: "Golden Land", desc: "Professionally presents and markets the project." },
            { step: "3", title: "Investor", desc: "Discovers and reviews complete data sheets." },
            { step: "4", title: "Consultation", desc: "Requests expert support on selected opportunities." },
            { step: "5", title: "Investment", desc: "Golden Land facilitates deal execution." },
          ].map((s_item, idx) => (
            <div key={idx} style={{ flex: 1, background: "rgba(16,15,13,0.9)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "16px", textAlign: "center", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "9999px", background: "#1e1c18", border: "1px solid rgba(207,162,77,0.4)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: "bold", color: gold }}>{s_item.step}</span>
              </div>
              <h4 style={{ fontSize: "13px", fontWeight: "600", color: "white", margin: "0 0 6px" }}>{s_item.title}</h4>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.5 }}>{s_item.desc}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* SLIDE 7: NETWORK & PARTNERSHIP */}
      <Slide bg="/images/generated/services_banner.png">
        <div style={s.grid2}>
          <div>
            <span style={s.tag}>09. Global Reach</span>
            <h3 style={s.h3}>International Investor Network</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginTop: "20px" }}>
              {[["AU", "Australia"], ["QA", "Qatar"], ["AE", "UAE"], ["KW", "Kuwait"], ["EU", "Europe"], ["UA", "Ukraine"]].map(([flag, label], i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "8px 12px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "bold", color: gold }}>{flag}</span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={s.card}>
            <span style={s.tag}>10. Developer Partnership</span>
            <h3 style={s.h3}>Strategic Projects Welcomed</h3>
            {["Project types: Residential, Commercial, Hotels, Land & Development", "Scope: Global marketing, cross-border promotion, sales representation", "Models: Commission-based structure, Strategic partnerships"].map((item, i) => (
              <div key={i} style={{ ...s.bullet, marginBottom: "10px" }}>
                <div style={s.dot} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* SLIDE 8: WHY US & CTA */}
      <div style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#0f0e0d",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px 60px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/generated/featured-odesa-villa.webp')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08, filter: "saturate(0.5) brightness(0.75)" }} />
        <div style={{ position: "relative", zIndex: 10, ...s.grid12_7 }}>
          <div>
            <span style={s.tag}>11. Why Golden Land Invest?</span>
            <h2 style={s.h2}>Platform Core Pillars</h2>
            <div style={{ marginTop: "18px" }}>
              {[
                { label: "International Vision", desc: "Designed to connect cross-border capital." },
                { label: "Digital First", desc: "Tailored to modern investor search behavior." },
                { label: "Professional Approach", desc: "Rooted in transparency and long-term trust." },
              ].map((p, i) => (
                <div key={i} style={{ ...s.bullet, marginBottom: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "9999px", background: "rgba(207,162,77,0.1)", border: "1px solid rgba(207,162,77,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "9999px", background: gold }} />
                  </div>
                  <div>
                    <strong style={{ color: "white", fontSize: "13px" }}>{p.label}</strong>
                    <p style={{ margin: "2px 0 0", fontSize: "11px", color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ border: "1px solid rgba(207,162,77,0.15)", background: "rgba(207,162,77,0.02)", borderRadius: "12px", padding: "16px", textAlign: "center", marginTop: "20px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: gold, margin: "0 0 4px" }}>Partner With Golden Land Invest</p>
              <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>Present Projects. Reach Investors. Grow Globally.</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockupWelcomeView />
          </div>
        </div>
      </div>
    </>
  );
}
