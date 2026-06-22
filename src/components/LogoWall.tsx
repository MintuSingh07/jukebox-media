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
  { name: "Nykaa", logoPath: "/brands/nykaa.svg", w: 125, h: 56 },
  { name: "VIP", logoPath: "/brands/vip.svg", w: 125, h: 42 },
  { name: "Cipla", logoPath: "/brands/cipla.svg", w: 125, h: 42 },
  { name: "UltraTech Cement", logoPath: "/brands/ultratech.png", w: 130, h: 54 },
  { name: "Hyatt", logoPath: "/brands/hyatt.svg", w: 135, h: 38 },
  { name: "Marriott", logoPath: "/brands/marriott.svg", w: 130, h: 46 },
  { name: "Novotel", logoPath: "/brands/novotel.svg", w: 135, h: 50 },
  { name: "ITC Hotels", logoPath: "/brands/itchotels.svg", w: 130, h: 56 },
  { name: "The Fern", logoPath: "/brands/thefern.svg", w: 130, h: 54 },
];





function LogoItem({
  name,
  domain,
  w,
  h,
  logoPath,
  delay,
}: {
  name: string;
  domain?: string;
  w: number;
  h?: number;
  logoPath?: string;
  delay?: number;
}) {
  const src = logoPath || `https://logo.clearbit.com/${domain}?size=200`;

  return (
    <div
      className="flex items-center justify-center px-2 max-w-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={w}
        height={h || 48}
        className={`${h ? "w-auto object-contain" : "max-h-[40px] md:max-h-[48px] w-auto object-contain"} animate-logo-pop`}
        style={{
          ...(h ? { maxHeight: `${h}px` } : {}),
          animationDelay: delay ? `${delay}ms` : undefined,
        }}

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
        <h2 className="text-[32px] sm:text-[40px] font-bold text-brand-navy tracking-tight">
        Leadership Experience Across Brands
        </h2>
      </div>

      {/* Grid container matching the layout and sizing shown in the user's reference image */}
      <div className="w-full max-w-[1550px] flex flex-col gap-8 md:gap-12 px-4">
        {/* Top Section containing Columns 1, 2, 3, 4 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 w-full md:h-[350px]">
          {/* Column 1: Box 1 (Leftmost large square-ish box - no background/label as requested) */}
          <div id="brand-box-1" className="md:col-span-3 p-6 flex flex-col justify-center items-center h-[350px] md:h-full select-none relative">
            {/* Pattern layout matching the Unilever-centered image */}
            <div className="relative w-full h-[240px] flex items-center justify-center">
              {/* Center: Unilever (larger, central focal point) */}
              <div className="z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/unilever-logo.webp"
                  alt="Unilever"
                  className="w-[102px] h-auto object-contain animate-logo-pop"
                />
              </div>

              {/* Top Right: Lakme */}
              <div className="absolute top-[-15px] right-[-15px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/lakme.webp"
                  alt="Lakmé"
                  className="w-[80px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "60ms" }}
                />
              </div>

              {/* Middle Left: Vaseline */}
              <div className="absolute left-[-35px] top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/vaseline.png"
                  alt="Vaseline"
                  className="w-[80px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "120ms" }}
                />
              </div>

              {/* Middle Right: Minimalist */}
              <div className="absolute right-[-35px] top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/minimalist.png"
                  alt="Minimalist"
                  className="w-[85px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "180ms" }}
                />
              </div>

              {/* Bottom Right: Surf Excel */}
              <div className="absolute bottom-[-25px] right-[-25px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/surf-excel.webp"
                  alt="Surf Excel"
                  className="w-[90px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "240ms" }}
                />
              </div>

              {/* Bottom Center: Dove */}
              <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/dove.png"
                  alt="Dove"
                  className="w-[68px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>

          {/* Column 2: Box 2 and Box 3 (col-span 3) */}
          <div className="md:col-span-3 flex flex-col justify-between h-[420px] md:h-full gap-6 md:gap-8">
            {/* Box 2 (top: wider horizontal rectangle containing the Reliance group brand pattern - no background as requested) */}
            <div id="brand-box-2" className="h-[60%] p-4 flex flex-col justify-center items-center select-none relative">
              {/* Pattern layout matching the Reliance-centered image */}
              <div className="relative w-full h-[180px] flex items-center justify-center">
                {/* Center: Reliance Industries */}
                <div className="z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-industries.webp"
                    alt="Reliance Industries"
                    className="w-[108px] h-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "80ms" }}
                  />
                </div>

                {/* Top Left: AZORTE */}
                <div className="absolute top-[-15px] left-[-25px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/azorte.webp"
                    alt="Azorte"
                    className="w-[85px] h-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "140ms" }}
                  />
                </div>

                {/* Top Right: AJIO */}
                <div className="absolute top-[-15px] right-[-25px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/Ajio-Logo.webp"
                    alt="Ajio"
                    className="w-[75px] h-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "200ms" }}
                  />
                </div>

                {/* Middle Right: Reliance digital */}
                <div className="absolute right-[-35px] top-[40%] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-digital.webp"
                    alt="Reliance Digital"
                    className="w-[85px] h-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "260ms" }}
                  />
                </div>

                {/* Bottom Right: TRENDS */}
                <div className="absolute bottom-[-22px] right-[-22px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/reliance-trends.webp"
                    alt="Reliance Trends"
                    className="w-[80px] h-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "320ms" }}
                  />
                </div>
              </div>
            </div>
            {/* Box 3 (bottom: smaller horizontal rectangle) */}
            <div id="brand-box-3" className="h-[37%] p-4 flex flex-col justify-center items-center relative select-none">
              <div className="relative w-[150px] h-[90px] mx-auto select-none">
                {/* Center: Mondelēz International */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-logo.png"
                    alt="Mondelēz International"
                    className="h-[30px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "120ms" }}
                  />
                </div>

                {/* Top Center: Dairy Milk */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-dairy-milk.png"
                    alt="Cadbury Dairy Milk"
                    className="h-[30px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "180ms" }}
                  />
                </div>

                {/* Mid Left: Bournvita */}
                <div className="absolute top-1/2 left-[-35px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-bournvita.png"
                    alt="Bournvita"
                    className="h-[42px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "240ms" }}
                  />
                </div>

                {/* Mid Right: Bournville */}
                <div className="absolute top-1/2 right-[-45px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-bournville.png"
                    alt="Cadbury Bournville"
                    className="h-[37px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Box 4 and Box 5 (col-span 2, narrow width with vertical gap in the middle) */}
          <div className="md:col-span-2 flex flex-col justify-between h-[280px] md:h-full gap-6 md:gap-8">
            {/* Box 4 (top: small rectangle) */}
            <div id="brand-box-4" className="h-[37%] p-3 flex flex-col justify-center items-center select-none relative">
              <div className="flex flex-col justify-center items-center gap-5">
                {/* Top Row: Frooti (Left) and Fizz (Right) */}
                <div className="flex items-center justify-center gap-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/frooti-logo-cropped.png"
                    alt="Frooti"
                    className="h-[32px] md:h-[34px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "100ms" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/fizz-logo-cropped.png"
                    alt="Fizz"
                    className="h-[32px] md:h-[34px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "160ms" }}
                  />
                </div>
                {/* Bottom Row: Parle Agro (Center) */}
                <div className="flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-agro-logo-cropped.png"
                    alt="Parle Agro"
                    className="h-[36px] md:h-[40px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "220ms" }}
                  />
                </div>
              </div>
            </div>
            {/* Box 5 (bottom: small rectangle) - no background/border */}
            <div id="brand-box-5" className="h-[37%] p-4 flex flex-col justify-center items-center relative select-none">
              <div className="relative w-full h-[90px] select-none">
                {/* Center: Parle Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-logo.png"
                    alt="Parle"
                    className="h-[32px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "140ms" }}
                  />
                </div>

                {/* Top Center: Kismi */}
                <div className="absolute top-[-18px] left-1/2 -translate-x-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-kismi.png"
                    alt="Kismi"
                    className="h-[32px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "200ms" }}
                  />
                </div>

                {/* Mid Left: Parle-G */}
                <div className="absolute top-1/2 left-[-32px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-parleg.png"
                    alt="Parle-G"
                    className="h-[48px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "260ms" }}
                  />
                </div>

                {/* Mid Right: Hide & Seek */}
                <div className="absolute top-1/2 right-[-32px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-hideseek.png"
                    alt="Hide & Seek"
                    className="h-[44px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "320ms" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Merged Box 6, 7, 8 (col-span 4) - no background/border */}
          <div id="brand-box-6-7-8" className="md:col-span-4 p-6 flex flex-col justify-center items-center h-[350px] md:h-full select-none relative">
            <div className="relative w-[290px] h-[290px] mx-auto flex items-center justify-center">
              {/* Center: P&G */}
              <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-logo.png"
                  alt="P&G"
                  className="w-[108px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "150ms" }}
                />
              </div>

              {/* Top Left: Tide */}
              <div className="absolute top-[-10px] left-[-15px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-tide.png"
                  alt="Tide"
                  className="w-[85px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "210ms" }}
                />
              </div>

              {/* Top Right: Whisper */}
              <div className="absolute top-[-10px] right-[-25px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-whisper.png"
                  alt="Whisper"
                  className="w-[140px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "270ms" }}
                />
              </div>

              {/* Middle Left: Ariel */}
              <div className="absolute top-[48%] left-[-20px] -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-ariel.png"
                  alt="Ariel"
                  className="w-[75px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "330ms" }}
                />
              </div>

              {/* Middle Right: Gillette */}
              <div className="absolute top-[50%] right-[-35px] -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-gillette.png"
                  alt="Gillette"
                  className="w-[98px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "390ms" }}
                />
              </div>

              {/* Bottom Center: Olay */}
              <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-olay.png"
                  alt="Olay"
                  className="w-[85px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "450ms" }}
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
              {strip1Logos.map((logo, index) => (
                <LogoItem key={logo.logoPath || logo.domain} delay={index * 40} {...logo} />
              ))}
            </div>
          </div>
          {/* Strip 10 (bottom horizontal strip) */}
          <div id="brand-strip-2" className="w-full h-[85px] px-8 flex items-center justify-between overflow-x-auto scrollbar-none">
            <div className="flex items-center justify-between w-full min-w-[1200px] gap-6">
              {strip2Logos.map((logo, index) => (
                <LogoItem key={logo.logoPath || logo.domain} delay={index * 40} {...logo} />
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
