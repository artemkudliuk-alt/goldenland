"use client";

import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

export function Logo({ className = "h-10 w-10", showText = true, light = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Standalone sharp vector emblem */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} shrink-0`}
      >
        {/* Outer thin elegant gold ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeOpacity="0.85"
        />
        
        {/* Stylized Architectural Towers representing Land/Property */}
        <path
          d="M32 68V42L44 32V68H32Z"
          fill="#D4AF37"
          fillOpacity="0.75"
        />
        <path
          d="M44 68V28L56 18V68H44Z"
          fill="#D4AF37"
          fillOpacity="0.95"
        />
        <path
          d="M56 68V48L68 38V68H56Z"
          fill="#D4AF37"
          fillOpacity="0.6"
        />
        
        {/* Golden horizon line */}
        <line
          x1="22"
          y1="68"
          x2="78"
          y2="68"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-display text-[15px] font-normal tracking-[0.25em] uppercase leading-none ${
              light ? "text-white" : "text-[color:var(--bower-ink)]"
            }`}
          >
            Golden Land
          </span>
          <span
            className={`mt-1 text-[8px] font-medium tracking-[0.3em] uppercase ${
              light ? "text-white/60" : "text-[color:var(--bower-mute)]"
            }`}
          >
            Property Investment
          </span>
        </div>
      )}
    </div>
  );
}
