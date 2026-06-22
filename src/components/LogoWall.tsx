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

interface LogoInfo {
  name: string;
  domain?: string;
  logoPath?: string;
  w: number;
  h?: number;
}

const strip1Logos: LogoInfo[] = [
  { name: "Nexa", logoPath: "/brands/nexa.png", w: 140 },
  { name: "Volkswagen", logoPath: "/brands/volkswagen.png", w: 80, h: 68 },
  { name: "Lodha", logoPath: "/brands/lodha.png", w: 210 },
  { name: "Kalpataru", logoPath: "/brands/kalpataru.png", w: 170 },
  { name: "Amul", logoPath: "/brands/amul.png", w: 125 },
  { name: "Netflix", logoPath: "/brands/netflix.png", w: 125 },
  { name: "Sugar Cosmetics", logoPath: "/brands/sugar.png", w: 140 },
  { name: "Hyundai", logoPath: "/brands/hyundai.png", w: 190 },
];

const strip2Logos: LogoInfo[] = [
  { name: "UltraTech", domain: "ultratechcement.com", w: 105 },
  { name: "Hyatt", domain: "hyatt.com", w: 90 },
  { name: "Marriott", domain: "marriott.com", w: 100 },
  { name: "Novotel", domain: "novotel.com", w: 100 },
  { name: "ITC Hotels", domain: "itchotels.com", w: 90 },
  { name: "The Fern", domain: "thefernhotels.com", w: 90 },
  { name: "Parle", domain: "parleproducts.com", w: 75 },
  { name: "Reliance Digital", domain: "reliancedigital.in", w: 100 },
];

function LogoItem({
  name,
  domain,
  w,
  h,
  logoPath,
}: {
  name: string;
  domain?: string;
  w: number;
  h?: number;
  logoPath?: string;
}) {
  const src = logoPath || `https://logo.clearbit.com/${domain}?size=200`;

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
        height={h || 48}
        className={h ? "w-auto object-contain" : "max-h-[40px] md:max-h-[48px] w-auto object-contain"}
        style={h ? { maxHeight: `${h}px` } : undefined}
        loading="lazy"
        onError={(e) => {
          // If logo fails, show text fallback
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
      <div className="w-full max-w-[1550px] flex flex-col gap-8 md:gap-12 px-4">
        {/* Top Section containing Columns 1, 2, 3, 4 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 w-full md:h-[350px]">
          {/* Column 1: Box 1 (Leftmost large square-ish box - no background/label as requested) */}
          <div id="brand-box-1" className="md:col-span-3 p-6 flex flex-col justify-center items-center h-[350px] md:h-full select-none relative">
            <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-black bg-white/70 px-1.5 py-0.5 rounded border border-black/10 z-30">brand-box-1</span>
            {/* Pattern layout matching the Unilever-centered image */}
            <div className="relative w-full h-[240px] flex items-center justify-center">
              {/* Center: Unilever (larger, central focal point) */}
              <div className="z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/unilever-logo.webp"
                  alt="Unilever"
                  title="Unilever"
                  className="w-[102px] h-auto object-contain"
                />
              </div>

              {/* Top Right: Lakme */}
              <div className="absolute top-[-15px] right-[-15px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/lakme.webp"
                  alt="Lakmé"
                  title="Lakmé"
                  className="w-[80px] h-auto object-contain"
                />
              </div>

              {/* Middle Left: Vaseline */}
              <div className="absolute left-[-35px] top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/vaseline.png"
                  alt="Vaseline"
                  title="Vaseline"
                  className="w-[80px] h-auto object-contain"
                />
              </div>

              {/* Middle Right: Minimalist */}
              <div className="absolute right-[-35px] top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/minimalist.png"
                  alt="Minimalist"
                  title="Minimalist"
                  className="w-[85px] h-auto object-contain"
                />
              </div>

              {/* Bottom Right: Surf Excel */}
              <div className="absolute bottom-[-25px] right-[-25px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/surf-excel.webp"
                  alt="Surf Excel"
                  title="Surf Excel"
                  className="w-[90px] h-auto object-contain"
                />
              </div>

              {/* Bottom Center: Dove */}
              <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/dove.png"
                  alt="Dove"
                  title="Dove"
                  className="w-[68px] h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Box 2 and Box 3 (col-span 3) */}
          <div className="md:col-span-3 flex flex-col justify-between h-[420px] md:h-full gap-6 md:gap-8">
            {/* Box 2 (top: wider horizontal rectangle containing the Reliance group brand pattern - no background as requested) */}
            <div id="brand-box-2" className="h-[60%] p-4 flex flex-col justify-center items-center select-none relative">
              <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-black bg-white/70 px-1.5 py-0.5 rounded border border-black/10 z-30">brand-box-2</span>
              {/* Pattern layout matching the Reliance-centered image */}
              <div className="relative w-full h-[180px] flex items-center justify-center">
                {/* Center: Reliance Industries */}
                <div className="z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-industries.webp"
                    alt="Reliance Industries"
                    title="Reliance Industries"
                    className="w-[108px] h-auto object-contain"
                  />
                </div>

                {/* Top Left: AZORTE */}
                <div className="absolute top-[-15px] left-[-25px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/azorte.webp"
                    alt="Azorte"
                    title="Azorte"
                    className="w-[85px] h-auto object-contain"
                  />
                </div>

                {/* Top Right: AJIO */}
                <div className="absolute top-[-15px] right-[-25px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/Ajio-Logo.webp"
                    alt="Ajio"
                    title="Ajio"
                    className="w-[75px] h-auto object-contain"
                  />
                </div>

                {/* Middle Right: Reliance digital */}
                <div className="absolute right-[-35px] top-[40%] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-digital.webp"
                    alt="Reliance Digital"
                    title="Reliance Digital"
                    className="w-[85px] h-auto object-contain"
                  />
                </div>

                {/* Bottom Right: TRENDS */}
                <div className="absolute bottom-[-22px] right-[-22px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-trends.webp"
                    alt="Reliance Trends"
                    title="Reliance Trends"
                    className="w-[80px] h-auto object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Box 3 (bottom: smaller horizontal rectangle) */}
            <div id="brand-box-3" className="h-[37%] p-4 flex flex-col justify-center items-center relative select-none">
              <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-black bg-white/70 px-1.5 py-0.5 rounded border border-black/10 z-30">brand-box-3</span>
              <div className="relative w-[150px] h-[90px] mx-auto select-none">
                {/* Center: Mondelēz International */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-logo.png"
                    alt="Mondelēz International"
                    title="Mondelēz International"
                    className="h-[30px] w-auto object-contain"
                  />
                </div>

                {/* Top Center: Dairy Milk */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-dairy-milk.png"
                    alt="Cadbury Dairy Milk"
                    title="Cadbury Dairy Milk"
                    className="h-[30px] w-auto object-contain"
                  />
                </div>

                {/* Mid Left: Bournvita */}
                <div className="absolute top-1/2 left-[-35px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-bournvita.png"
                    alt="Bournvita"
                    title="Bournvita"
                    className="h-[42px] w-auto object-contain"
                  />
                </div>

                {/* Mid Right: Bournville */}
                <div className="absolute top-1/2 right-[-45px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-bournville.png"
                    alt="Cadbury Bournville"
                    title="Cadbury Bournville"
                    className="h-[37px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Box 4 and Box 5 (col-span 2, narrow width with vertical gap in the middle) */}
          <div className="md:col-span-2 flex flex-col justify-between h-[280px] md:h-full gap-6 md:gap-8">
            {/* Box 4 (top: small rectangle) */}
            <div id="brand-box-4" className="h-[37%] p-3 flex flex-col justify-center items-center select-none relative">
              <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-black bg-white/70 px-1.5 py-0.5 rounded border border-black/10 z-30">brand-box-4</span>
              <div className="flex flex-col justify-center items-center gap-5">
                {/* Top Row: Frooti (Left) and Fizz (Right) */}
                <div className="flex items-center justify-center gap-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/frooti-logo-cropped.png"
                    alt="Frooti"
                    className="h-[32px] md:h-[34px] w-auto object-contain"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/fizz-logo-cropped.png"
                    alt="Fizz"
                    className="h-[32px] md:h-[34px] w-auto object-contain"
                  />
                </div>
                {/* Bottom Row: Parle Agro (Center) */}
                <div className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-agro-logo-cropped.png"
                    alt="Parle Agro"
                    className="h-[36px] md:h-[40px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Box 5 (bottom: small rectangle) - no background/border */}
            <div id="brand-box-5" className="h-[37%] p-4 flex flex-col justify-center items-center relative select-none">
              <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-black bg-white/70 px-1.5 py-0.5 rounded border border-black/10 z-30">brand-box-5</span>
              <div className="relative w-full h-[90px] select-none">
                {/* Center: Parle Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-logo.png"
                    alt="Parle"
                    title="Parle"
                    className="h-[32px] w-auto object-contain"
                  />
                </div>

                {/* Top Center: Kismi */}
                <div className="absolute top-[-18px] left-1/2 -translate-x-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-kismi.png"
                    alt="Kismi"
                    title="Kismi"
                    className="h-[32px] w-auto object-contain"
                  />
                </div>

                {/* Mid Left: Parle-G */}
                <div className="absolute top-1/2 left-[-32px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-parleg.png"
                    alt="Parle-G"
                    title="Parle-G"
                    className="h-[48px] w-auto object-contain"
                  />
                </div>

                {/* Mid Right: Hide & Seek */}
                <div className="absolute top-1/2 right-[-32px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-hideseek.png"
                    alt="Hide & Seek"
                    title="Hide & Seek"
                    className="h-[44px] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Merged Box 6, 7, 8 (col-span 4) - no background/border */}
          <div id="brand-box-6-7-8" className="md:col-span-4 p-6 flex flex-col justify-center items-center h-[350px] md:h-full select-none relative">
            <span className="absolute top-2 left-2 text-[10px] font-mono font-bold text-black bg-white/70 px-1.5 py-0.5 rounded border border-black/10 z-30">brand-box-6, 7, 8</span>
            <div className="relative w-[290px] h-[290px] mx-auto flex items-center justify-center">
              {/* Center: P&G */}
              <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-logo.png"
                  alt="P&G"
                  title="P&G"
                  className="w-[108px] h-auto object-contain"
                />
              </div>

              {/* Top Left: Tide */}
              <div className="absolute top-[-10px] left-[-15px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-tide.png"
                  alt="Tide"
                  title="Tide"
                  className="w-[85px] h-auto object-contain"
                />
              </div>

              {/* Top Right: Whisper */}
              <div className="absolute top-[-10px] right-[-25px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-whisper.png"
                  alt="Whisper"
                  title="Whisper"
                  className="w-[140px] h-auto object-contain"
                />
              </div>

              {/* Middle Left: Ariel */}
              <div className="absolute top-[48%] left-[-20px] -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-ariel.png"
                  alt="Ariel"
                  title="Ariel"
                  className="w-[75px] h-auto object-contain"
                />
              </div>

              {/* Middle Right: Gillette */}
              <div className="absolute top-[50%] right-[-35px] -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-gillette.png"
                  alt="Gillette"
                  title="Gillette"
                  className="w-[98px] h-auto object-contain"
                />
              </div>

              {/* Bottom Center: Olay */}
              <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-olay.png"
                  alt="Olay"
                  title="Olay"
                  className="w-[85px] h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section containing two long full-width horizontal strips (Strip 9 and Strip 10) */}
        <div className="w-full flex flex-col gap-3.5 mt-1.5">
          {/* Strip 9 (top horizontal strip) */}
          <div id="brand-strip-1" className="w-full h-[85px] px-8 flex items-center justify-between overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between w-full min-w-[1200px] gap-6">
              {strip1Logos.map((logo) => (
                <LogoItem key={logo.logoPath || logo.domain} {...logo} />
              ))}
            </div>
          </div>
          {/* Strip 10 (bottom horizontal strip) */}
          <div id="brand-strip-2" className="w-full h-[85px] bg-slate-100/70 border border-slate-200/50 rounded-2xl px-8 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:scale-[1.002] hover:shadow-sm transition-all duration-300 overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between w-full min-w-[1200px] gap-6">
              {strip2Logos.map((logo) => (
                <LogoItem key={logo.logoPath || logo.domain} {...logo} />
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
