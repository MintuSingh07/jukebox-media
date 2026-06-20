"use client";

import React from "react";

// Assigning brands from the logo list to individual boxes based on the required layout
const box1Logos = [
  { name: "Unilever", domain: "unilever.com", w: 55 },
  { name: "Reliance Industries", domain: "ril.com", w: 55 },
  { name: "P&G", domain: "pg.com", w: 40 },
  { name: "Mondelez", domain: "mondelezinternational.com", w: 65 },
];

const box2Logos = [
  { name: "Dove", domain: "dove.com", w: 60 },
  { name: "Cadbury", domain: "cadbury.co.in", w: 65 },
  { name: "Vaseline", domain: "vaseline.com", w: 60 },
];

const box3Logos = [
  { name: "Surf Excel", domain: "surfexcel.in", w: 65 },
  { name: "Tide", domain: "tide.com", w: 50 },
];

const box4Logos = [
  { name: "Maruti Suzuki", domain: "marutisuzuki.com", w: 65 },
  { name: "Volkswagen", domain: "volkswagen.com", w: 45 },
];

const box5Logos = [
  { name: "Lodha", domain: "lodhagroup.com", w: 65 },
  { name: "Kalpataru", domain: "kalpataru.com", w: 70 },
];

const box6Logos = [
  { name: "Netflix", domain: "netflix.com", w: 65 },
];

const box7Logos = [
  { name: "Ajio", domain: "ajio.com", w: 50 },
  { name: "Azorte", domain: "azorte.com", w: 60 },
];

const box8Logos = [
  { name: "Sugar Cosmetics", domain: "sugarcosmetics.com", w: 60 },
  { name: "Nykaa", domain: "nykaa.com", w: 60 },
  { name: "Lakmé", domain: "lakmeindia.com", w: 60 },
  { name: "Whisper", domain: "whisper.com", w: 60 },
];

const strip1Logos = [
  { name: "Closeup", domain: "closeup.com", w: 65 },
  { name: "Frooti", domain: "frooti.com", w: 55 },
  { name: "Parle Agro", domain: "parleagro.com", w: 70 },
  { name: "Ariel", domain: "ariel.com", w: 45 },
  { name: "Gillette", domain: "gillette.com", w: 60 },
  { name: "Olay", domain: "olay.com", w: 45 },
  { name: "Hyundai", domain: "hyundai.com", w: 65 },
  { name: "VIP Industries", domain: "vipindustries.co.in", w: 50 },
  { name: "Cipla", domain: "cipla.com", w: 50 },
];

const strip2Logos = [
  { name: "UltraTech", domain: "ultratechcement.com", w: 70 },
  { name: "Hyatt", domain: "hyatt.com", w: 60 },
  { name: "Marriott", domain: "marriott.com", w: 65 },
  { name: "Novotel", domain: "novotel.com", w: 65 },
  { name: "ITC Hotels", domain: "itchotels.com", w: 60 },
  { name: "The Fern", domain: "thefernhotels.com", w: 60 },
  { name: "Parle", domain: "parleproducts.com", w: 50 },
  { name: "Reliance Digital", domain: "reliancedigital.in", w: 65 },
];

function LogoItem({ name, domain, w }: { name: string; domain: string; w: number }) {
  const src = `https://logo.clearbit.com/${domain}?size=200`;

  return (
    <div
      className="flex items-center justify-center px-2 max-w-full"
      title={name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={w}
        height={32}
        className="max-h-[30px] md:max-h-[34px] w-auto object-contain"
        loading="lazy"
        onError={(e) => {
          // If clearbit fails, show text fallback
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            // Check if fallback span already exists to prevent duplicates
            if (!parent.querySelector(".logo-fallback")) {
              const fallback = document.createElement("span");
              fallback.textContent = name;
              fallback.className =
                "logo-fallback text-[10px] md:text-[12px] font-bold text-brand-navy/60 tracking-tight whitespace-nowrap";
              parent.appendChild(fallback);
            }
          }
        }}
      />
    </div>
  );
}

export default function LogoWall() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-24 pb-16 px-8 gap-2">
      {/* Section header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy tracking-tight">
          Experience across brands
        </h2>
      </div>

      {/* Grid container matching the layout and sizing shown in the user's reference image */}
      <div className="w-full max-w-[1320px] flex flex-col gap-3.5 px-4">
        {/* Top Section containing Columns 1, 2, 3, 4 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 w-full md:h-[350px]">
          {/* Column 1: Box 1 (Leftmost large square-ish box - no background/label as requested) */}
          <div id="brand-box-1" className="md:col-span-3 p-6 flex flex-col justify-center items-center h-[350px] md:h-full select-none">
            {/* Pattern layout matching the Unilever-centered image */}
            <div className="relative w-full h-[240px] flex items-center justify-center">
              {/* Center: Unilever (larger, central focal point) */}
              <div className="z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/unilever-logo.webp"
                  alt="Unilever"
                  title="Unilever"
                  className="w-[90px] h-auto object-contain"
                />
              </div>

              {/* Top Right: Lakme */}
              <div className="absolute top-2 right-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/lakme.webp"
                  alt="Lakmé"
                  title="Lakmé"
                  className="w-[70px] h-auto object-contain"
                />
              </div>

              {/* Middle Left: Vaseline */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/vaseline.png"
                  alt="Vaseline"
                  title="Vaseline"
                  className="w-[70px] h-auto object-contain"
                />
              </div>

              {/* Middle Right: Minimalist */}
              <div className="absolute right-1 top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/minimalist.png"
                  alt="Minimalist"
                  title="Minimalist"
                  className="w-[75px] h-auto object-contain"
                />
              </div>

              {/* Bottom Right: Surf Excel */}
              <div className="absolute bottom-2 right-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/surf-excel.webp"
                  alt="Surf Excel"
                  title="Surf Excel"
                  className="w-[65px] h-auto object-contain"
                />
              </div>

              {/* Bottom Center: Dove */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/dove.png"
                  alt="Dove"
                  title="Dove"
                  className="w-[60px] h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Box 2 and Box 3 (col-span 3) */}
          <div className="md:col-span-3 flex flex-col justify-between h-[420px] md:h-full gap-3.5">
            {/* Box 2 (top: wider horizontal rectangle containing the Reliance group brand pattern - no background as requested) */}
            <div id="brand-box-2" className="h-[60%] p-4 flex flex-col justify-center items-center select-none">
              {/* Pattern layout matching the Reliance-centered image */}
              <div className="relative w-full h-[180px] flex items-center justify-center">
                {/* Center: Reliance Industries */}
                <div className="z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-industries.webp"
                    alt="Reliance Industries"
                    title="Reliance Industries"
                    className="w-[95px] h-auto object-contain"
                  />
                </div>

                {/* Top Left: AZORTE */}
                <div className="absolute top-1 left-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/azorte.webp"
                    alt="Azorte"
                    title="Azorte"
                    className="w-[75px] h-auto object-contain"
                  />
                </div>

                {/* Top Right: AJIO */}
                <div className="absolute top-1 right-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/Ajio-Logo.webp"
                    alt="Ajio"
                    title="Ajio"
                    className="w-[65px] h-auto object-contain"
                  />
                </div>

                {/* Middle Right: Reliance digital */}
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-digital.webp"
                    alt="Reliance Digital"
                    title="Reliance Digital"
                    className="w-[75px] h-auto object-contain"
                  />
                </div>

                {/* Bottom Right: TRENDS */}
                <div className="absolute bottom-1 right-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-trends.webp"
                    alt="Reliance Trends"
                    title="Reliance Trends"
                    className="w-[70px] h-auto object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Box 3 (bottom: smaller horizontal rectangle) */}
            <div id="brand-box-3" className="h-[37%] bg-slate-100/70 border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-center items-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.01] hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-around w-full gap-3">
                {box3Logos.map((logo) => (
                  <LogoItem key={logo.domain} {...logo} />
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Box 4 and Box 5 (col-span 2, narrow width with vertical gap in the middle) */}
          <div className="md:col-span-2 flex flex-col justify-between h-[280px] md:h-full gap-3.5">
            {/* Box 4 (top: small rectangle) */}
            <div id="brand-box-4" className="h-[37%] bg-slate-100/70 border border-slate-200/50 rounded-2xl p-4 flex flex-col justify-center items-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.01] hover:shadow-md transition-all duration-300">
              <div className="flex flex-col items-center justify-center gap-3">
                {box4Logos.map((logo) => (
                  <LogoItem key={logo.domain} {...logo} />
                ))}
              </div>
            </div>
            {/* Box 5 (bottom: small rectangle) */}
            <div id="brand-box-5" className="h-[37%] bg-slate-100/70 border border-slate-200/50 rounded-2xl p-4 flex flex-col justify-center items-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.01] hover:shadow-md transition-all duration-300">
              <div className="flex flex-col items-center justify-center gap-3">
                {box5Logos.map((logo) => (
                  <LogoItem key={logo.domain} {...logo} />
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Top row (Box 6 & Box 7), and Box 8 (col-span 4) */}
          <div className="md:col-span-4 flex flex-col justify-between h-[420px] md:h-full gap-3.5">
            {/* Top row containing Box 6 (left) and Box 7 (right) */}
            <div className="flex justify-between w-full h-[37%] gap-3.5">
              {/* Box 6 (left: small square box) */}
              <div id="brand-box-6" className="w-[40%] bg-slate-100/70 border border-slate-200/50 rounded-2xl p-4 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.01] hover:shadow-md transition-all duration-300">
                {box6Logos.map((logo) => (
                  <LogoItem key={logo.domain} {...logo} />
                ))}
              </div>
              {/* Box 7 (right: small wider horizontal rectangle) */}
              <div id="brand-box-7" className="w-[57%] bg-slate-100/70 border border-slate-200/50 rounded-2xl p-4 flex items-center justify-around gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.01] hover:shadow-md transition-all duration-300">
                {box7Logos.map((logo) => (
                  <LogoItem key={logo.domain} {...logo} />
                ))}
              </div>
            </div>
            {/* Box 8 (bottom: large horizontal rectangle) */}
            <div id="brand-box-8" className="h-[60%] bg-slate-100/70 border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-center items-center shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.01] hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f6861f] mb-3 opacity-60">Lifestyle & Retail</span>
              <div className="grid grid-cols-2 gap-5 w-full justify-items-center items-center">
                {box8Logos.map((logo) => (
                  <LogoItem key={logo.domain} {...logo} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section containing two long full-width horizontal strips (Strip 9 and Strip 10) */}
        <div className="w-full flex flex-col gap-3.5 mt-1.5">
          {/* Strip 9 (top horizontal strip) */}
          <div id="brand-strip-1" className="w-full h-[65px] bg-slate-100/70 border border-slate-200/50 rounded-2xl px-8 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.002] hover:shadow-sm transition-all duration-300 overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between w-full min-w-[900px] gap-6">
              {strip1Logos.map((logo) => (
                <LogoItem key={logo.domain} {...logo} />
              ))}
            </div>
          </div>
          {/* Strip 10 (bottom horizontal strip) */}
          <div id="brand-strip-2" className="w-full h-[65px] bg-slate-100/70 border border-slate-200/50 rounded-2xl px-8 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.002] hover:shadow-sm transition-all duration-300 overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between w-full min-w-[900px] gap-6">
              {strip2Logos.map((logo) => (
                <LogoItem key={logo.domain} {...logo} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom divider line */}
      <div className="mt-10 w-16 h-[2px] rounded-full bg-brand-navy/10" />
    </div>
  );
}
