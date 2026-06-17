"use client";

import React from "react";

// All brands from the image, organized by row
// Using Clearbit Logo API for real logos: https://logo.clearbit.com/{domain}
const logoRows = [
  // Row 1: FMCG / Fashion / Retail
  [
    { name: "Closeup", domain: "closeup.com", w: 80 },
    { name: "Lakmé", domain: "lakmeindia.com", w: 80 },
    { name: "Azorte", domain: "azorte.com", w: 85 },
    { name: "Ajio", domain: "ajio.com", w: 60 },
    { name: "Reliance Industries", domain: "ril.com", w: 85 },
    { name: "Reliance Digital", domain: "reliancedigital.in", w: 85 },
    { name: "Frooti", domain: "frooti.com", w: 70 },
    { name: "Parle Agro", domain: "parleagro.com", w: 90 },
    { name: "Tide", domain: "tide.com", w: 55 },
    { name: "Whisper", domain: "whisper.com", w: 80 },
  ],
  // Row 2: HUL / Personal Care
  [
    { name: "Vaseline", domain: "vaseline.com", w: 75 },
    { name: "Minimalist", domain: "beminimalist.co", w: 90 },
    { name: "Unilever", domain: "unilever.com", w: 80 },
    { name: "Surf Excel", domain: "surfexcel.in", w: 80 },
    { name: "Dove", domain: "dove.com", w: 60 },
    { name: "Cadbury", domain: "cadbury.co.in", w: 80 },
    { name: "Mondelez", domain: "mondelezinternational.com", w: 95 },
    { name: "Parle", domain: "parleproducts.com", w: 65 },
    { name: "Ariel", domain: "ariel.com", w: 55 },
    { name: "P&G", domain: "pg.com", w: 50 },
    { name: "Gillette", domain: "gillette.com", w: 75 },
    { name: "Olay", domain: "olay.com", w: 55 },
  ],
  // Row 3: Auto / Real Estate / Entertainment
  [
    { name: "Maruti Suzuki", domain: "marutisuzuki.com", w: 80 },
    { name: "Volkswagen", domain: "volkswagen.com", w: 55 },
    { name: "Lodha", domain: "lodhagroup.com", w: 85 },
    { name: "Kalpataru", domain: "kalpataru.com", w: 90 },
    { name: "Amul", domain: "amul.com", w: 65 },
    { name: "Netflix", domain: "netflix.com", w: 80 },
    { name: "Sugar Cosmetics", domain: "sugarcosmetics.com", w: 75 },
    { name: "Hyundai", domain: "hyundai.com", w: 85 },
  ],
  // Row 4: Healthcare / Hospitality
  [
    { name: "Nykaa", domain: "nykaa.com", w: 75 },
    { name: "VIP Industries", domain: "vipindustries.co.in", w: 60 },
    { name: "Cipla", domain: "cipla.com", w: 65 },
    { name: "UltraTech", domain: "ultratechcement.com", w: 90 },
    { name: "Hyatt", domain: "hyatt.com", w: 75 },
    { name: "Marriott", domain: "marriott.com", w: 85 },
    { name: "Novotel", domain: "novotel.com", w: 85 },
    { name: "ITC Hotels", domain: "itchotels.com", w: 80 },
    { name: "The Fern", domain: "thefernhotels.com", w: 80 },
  ],
];

function LogoItem({ name, domain, w }: { name: string; domain: string; w: number }) {
  const src = `https://logo.clearbit.com/${domain}?size=200`;

  return (
    <div
      className="flex items-center justify-center h-[50px] px-3 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={w}
        height={40}
        className="max-h-[38px] w-auto object-contain"
        loading="lazy"
        onError={(e) => {
          // If clearbit fails, show text fallback
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            const fallback = document.createElement("span");
            fallback.textContent = name;
            fallback.className =
              "text-[13px] font-bold text-brand-navy/60 tracking-tight whitespace-nowrap";
            parent.appendChild(fallback);
          }
        }}
      />
    </div>
  );
}

export default function LogoWall() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-16 gap-2">
      {/* Section header */}
      <div className="text-center mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#f6861f] mb-2">
          Trusted By Industry Leaders
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
          Brands that choose us
        </h2>
      </div>

      {/* Logo rows — matching the image layout */}
      <div className="w-full max-w-[1050px] flex flex-col items-center gap-5">
        {logoRows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 w-full"
          >
            {row.map((logo) => (
              <LogoItem
                key={logo.domain}
                name={logo.name}
                domain={logo.domain}
                w={logo.w}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Subtle bottom divider line */}
      <div className="mt-10 w-16 h-[2px] rounded-full bg-brand-navy/10" />
    </div>
  );
}
