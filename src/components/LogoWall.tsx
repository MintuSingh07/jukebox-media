"use client";

import React from "react";
import ScrollReveal from "./ScrollReveal";

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
  { name: "Maruti Suzuki", domain: "marutisuzuki.com", w: 80 },
  { name: "Volkswagen", domain: "volkswagen.com", w: 60 },
];

const box5Logos = [
  { name: "Lodha", domain: "lodhagroup.com", w: 65 },
  { name: "Kalpataru", domain: "kalpataru.com", w: 70 },
];

const box6Logos = [{ name: "Netflix", domain: "netflix.com", w: 65 }];

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
  isLarge?: boolean;
  customClass?: string;
}

const strip1Logos: LogoInfo[] = [
  { name: "Nexa", logoPath: "/brands/nexa.png", w: 230, h: 56, isLarge: true },
  { name: "Volkswagen", logoPath: "/brands/volkswagen.png", w: 125, h: 105, isLarge: true, customClass: "h-[44px] lg:h-[56px] xl:h-[64px]" },
  { name: "Lodha", logoPath: "/brands/lodha.png", w: 210 },
  { name: "Kalpataru", logoPath: "/brands/kalpataru.png", w: 170 },
  { name: "Amul", logoPath: "/brands/amul.png", w: 125 },
  { name: "Netflix", logoPath: "/brands/netflix.png", w: 125 },
  { name: "Sugar Cosmetics", logoPath: "/brands/sugar.png", w: 140 },
  { name: "Hyundai", logoPath: "/brands/hyundai.png", w: 120, h: 36 },
];

const strip2Logos: LogoInfo[] = [
  { name: "Nykaa", logoPath: "/brands/nykaa.svg", w: 125, h: 56 },
  { name: "VIP", logoPath: "/brands/vip.svg", w: 125, h: 42 },
  { name: "Cipla", logoPath: "/brands/cipla.svg", w: 125, h: 42 },
  {
    name: "UltraTech Cement",
    logoPath: "/brands/ultratech.png",
    w: 130,
    h: 54,
  },
  { name: "Hyatt", logoPath: "/brands/hyatt.svg", w: 135, h: 38 },
  { name: "Marriott", logoPath: "/brands/marriott.svg", w: 130, h: 46 },
  { name: "Novotel", logoPath: "/brands/novotel.svg", w: 135, h: 50, isLarge: true },
  { name: "ITC Hotels", logoPath: "/brands/itchotels.svg", w: 130, h: 56, isLarge: true },
  { name: "The Fern", logoPath: "/brands/thefern.svg", w: 130, h: 54, isLarge: true },
];

function LogoItem({
  name,
  domain,
  w,
  h,
  logoPath,
  delay,
  isLarge,
  customClass,
}: {
  name: string;
  domain?: string;
  w: number;
  h?: number;
  logoPath?: string;
  delay?: number;
  isLarge?: boolean;
  customClass?: string;
}) {
  const [hasError, setHasError] = React.useState(false);
  const src = logoPath || `https://logo.clearbit.com/${domain}?size=200`;

  const heightStyle = name === "Volkswagen"
    ? "clamp(32px, 5.8vh, 56px)"
    : isLarge
    ? "clamp(24px, 4.2vh, 42px)"
    : "clamp(16px, 2.8vh, 26px)";

  return (
    <div className="flex items-center justify-center px-1.5 max-w-full">
      {hasError ? (
        <span className="logo-fallback text-[10px] md:text-[12px] font-bold text-[#161443]/60 tracking-tight whitespace-nowrap">
          {name}
        </span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={name}
          className="w-auto max-w-[9vw] 2xl:max-w-none object-contain animate-logo-pop"
          style={{
            height: heightStyle,
            animationDelay: delay ? `${delay}ms` : undefined,
          }}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}


export default function LogoWall() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-8 md:pt-16 lg:pt-24 pb-8 md:pb-12 lg:pb-16 px-4 sm:px-8 gap-2">
      {/* Section header */}
      <div className="text-center mb-6 md:mb-8 mt-8 md:mt-10 lg:mt-14">
        <ScrollReveal
          as="h2"
          containerClassName="text-[32px] sm:text-[40px] font-bold text-[#161443] tracking-tight"
        >
          Leadership Experience Across Brands
        </ScrollReveal>
      </div>

      {/* Grid container matching the layout and sizing shown in the user's reference image */}
      <div className="w-full max-w-[1550px] flex flex-col gap-6 md:gap-8 lg:gap-12 px-4">
        {/* Top Section containing Columns 1, 2, 3, 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-12 w-full lg:h-[350px]">
          {/* Column 1: Box 1 (Leftmost large square-ish box - no background/label as requested) */}
          <div
            id="brand-box-1"
            className="lg:col-span-3 p-4 md:p-6 flex flex-col justify-center items-center h-[195px] sm:h-[240px] md:h-[300px] lg:h-full select-none relative"
          >
            {/* Pattern layout matching the Unilever-centered image */}
            <div className="relative w-full h-[240px] flex items-center justify-center scale-[0.8] sm:scale-[0.88] md:scale-[0.88] lg:scale-[0.8] xl:scale-100 origin-center transition-transform select-none">
              {/* Center: Unilever (larger, central focal point) */}
              <div className="z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/unilever-logo.webp"
                  alt="Unilever"
                  className="w-[118px] h-auto object-contain animate-logo-pop"
                />
              </div>

              {/* Top Left: Closeup */}
              <div className="absolute top-[-10px] left-[65px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/closeup.png"
                  alt="Closeup"
                  className="w-[52px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "360ms" }}
                />
              </div>

              {/* Top Right: Lakme */}
              <div className="absolute top-[-15px] right-[-15px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/lakme.webp"
                  alt="Lakmé"
                  className="w-[70px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "60ms" }}
                />
              </div>

              {/* Middle Left: Vaseline */}
              <div className="absolute left-[-25px] top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/vaseline.png"
                  alt="Vaseline"
                  className="w-[48px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "120ms" }}
                />
              </div>

              {/* Middle Right: Minimalist */}
              <div className="absolute right-[-35px] top-1/2 -translate-y-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/minimalist.png"
                  alt="Minimalist"
                  className="w-[75px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "180ms" }}
                />
              </div>

              {/* Bottom Left: Vim */}
              <div className="absolute bottom-[-10px] left-[-10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/vim.png"
                  alt="Vim"
                  className="w-[55px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "420ms" }}
                />
              </div>

              {/* Bottom Right: Surf Excel */}
              <div className="absolute bottom-[-25px] right-[-25px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/surf-excel.webp"
                  alt="Surf Excel"
                  className="w-[80px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "240ms" }}
                />
              </div>

              {/* Bottom Center: Dove */}
              <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/dove.png"
                  alt="Dove"
                  className="w-[58px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>

          {/* Column 2: Box 2 and Box 3 (col-span 3) */}
          <div className="lg:col-span-3 flex flex-col justify-between h-[260px] sm:h-[310px] md:h-[320px] lg:h-full gap-4 sm:gap-6 md:gap-5 lg:gap-8">
            {/* Box 2 (top: wider horizontal rectangle containing the Reliance group brand pattern - no background as requested) */}
            <div
              id="brand-box-2"
              className="h-[60%] p-4 flex flex-col justify-center items-center select-none relative"
            >
              {/* Pattern layout matching the Reliance-centered image */}
              <div className="relative w-full h-[180px] flex items-center justify-center scale-[0.72] sm:scale-[0.82] md:scale-[0.82] lg:scale-[0.8] xl:scale-100 origin-center transition-transform select-none">
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
                <div className="absolute top-[-15px] left-[65px]">
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

                {/* Middle Left: Avantra */}
                <div className="absolute left-[-35px] top-[40%] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/avantra.png"
                    alt="Avantra by Trends"
                    className="w-[90px] h-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "380ms" }}
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

                {/* Bottom Left: Yousta */}
                <div className="absolute bottom-[-2px] left-[42px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/yousta.png"
                    alt="Yousta"
                    className="w-[80px] h-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "440ms" }}
                  />
                </div>

                {/* Bottom Right: TRENDS */}
                <div className="absolute bottom-[-12px] right-[-2px]">
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
            <div
              id="brand-box-3"
              className="h-[37%] p-4 flex flex-col justify-center items-center relative select-none"
            >
              <div className="relative w-[260px] h-[140px] mx-auto select-none scale-[0.72] sm:scale-[0.82] md:scale-[0.82] lg:scale-[0.8] xl:scale-100 origin-center transition-transform">
                {/* Center: Mondelēz International */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-logo.png"
                    alt="Mondelēz International"
                    className="h-[112px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "120ms" }}
                  />
                </div>

                {/* Top Center: Dairy Milk */}
                <div className="absolute top-[-22px] left-1/2 -translate-x-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-dairy-milk.png"
                    alt="Cadbury Dairy Milk"
                    className="h-[30px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "180ms" }}
                  />
                </div>

                {/* Mid Left: Bournvita */}
                <div className="absolute top-1/2 left-[-15px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-bournvita.png"
                    alt="Bournvita"
                    className="h-[35px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "240ms" }}
                  />
                </div>

                {/* Mid Right: Bournville */}
                <div className="absolute top-1/2 right-[-30px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/mondelez-bournville.png"
                    alt="Cadbury Bournville"
                    className="h-[30px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Box 4 and Box 5 (col-span 2, narrow width with vertical gap in the middle) */}
          <div className="lg:col-span-2 flex flex-col justify-between h-[165px] sm:h-[210px] md:h-[270px] lg:h-full gap-4 sm:gap-6 md:gap-5 lg:gap-8">
            {/* Box 4 (top: small rectangle) */}
            <div
              id="brand-box-4"
              className="h-[37%] p-3 flex flex-col justify-center items-center select-none relative"
            >
              <div className="flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-3 lg:gap-5 scale-[0.8] sm:scale-[0.9] md:scale-[0.88] lg:scale-[0.8] xl:scale-100 origin-center transition-transform">
                {/* Top Row: Frooti (Left) and Fizz (Right) */}
                <div className="flex items-center justify-center gap-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/frooti-logo-cropped.png"
                    alt="Frooti"
                    className="h-[25px] md:h-[27px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "100ms" }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/fizz-logo-cropped.png"
                    alt="Fizz"
                    className="h-[25px] md:h-[27px] w-auto object-contain animate-logo-pop"
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
            <div
              id="brand-box-5"
              className="h-[37%] p-4 flex flex-col justify-center items-center relative select-none -translate-y-4 md:-translate-y-4 lg:-translate-y-8"
            >
              <div className="relative w-[260px] h-[90px] mx-auto select-none scale-[0.72] sm:scale-[0.82] md:scale-[0.82] lg:scale-[0.8] xl:scale-100 origin-center transition-transform">
                {/* Center: Parle Logo */}
                <div className="absolute top-[64px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-logo.png"
                    alt="Parle"
                    className="h-[48px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "140ms" }}
                  />
                </div>

                {/* Top Center: Kismi */}
                <div className="absolute top-[0px] left-1/2 -translate-x-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-kismi.png"
                    alt="Kismi"
                    className="h-[26px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "200ms" }}
                  />
                </div>

                {/* Mid Left: Parle-G */}
                <div className="absolute top-[64px] left-[15px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-parleg.png"
                    alt="Parle-G"
                    className="h-[44px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "260ms" }}
                  />
                </div>

                {/* Mid Right: Hide & Seek */}
                <div className="absolute top-[64px] right-[15px] -translate-y-1/2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brands/parle-hideseek.png"
                    alt="Hide & Seek"
                    className="h-[42px] w-auto object-contain animate-logo-pop"
                    style={{ animationDelay: "320ms" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Merged Box 6, 7, 8 (col-span 4) - no background/border */}
          <div
            id="brand-box-6-7-8"
            className="lg:col-span-4 p-4 md:p-6 flex flex-col justify-center items-center h-[225px] sm:h-[270px] md:h-[320px] lg:h-full select-none relative"
          >
            <div className="relative w-[290px] h-[290px] mx-auto flex items-center justify-center scale-[0.72] sm:scale-[0.82] md:scale-[0.88] lg:scale-[0.8] xl:scale-100 origin-center transition-transform">
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
              <div className="absolute top-[-10px] left-[-5px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/tide.png"
                  alt="Tide"
                  className="w-[75px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "210ms" }}
                />
              </div>

              {/* Top Right: Whisper */}
              <div className="absolute top-[-10px] right-[-10px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brands/pg-whisper.png"
                  alt="Whisper"
                  className="w-[140px] h-auto object-contain animate-logo-pop"
                  style={{ animationDelay: "270ms" }}
                />
              </div>

              {/* Middle Left: Ariel */}
              <div className="absolute top-[68%] left-[-20px] -translate-y-1/2">
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

        {/* On Mobile: Static wrapping grid of all strip logos. On Desktop: two horizontal marquee strips */}
        <div className="lg:hidden flex flex-wrap items-center justify-center gap-x-5 gap-y-4 px-4 w-full select-none mt-4">
          <img src="/brands/nexa.png" alt="Nexa" className="h-[22px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/volkswagen.png" alt="Volkswagen" className="h-[40px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/lodha.png" alt="Lodha" className="h-[20px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/kalpataru.png" alt="Kalpataru" className="h-[20px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/amul.png" alt="Amul" className="h-[22px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/netflix.png" alt="Netflix" className="h-[20px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/sugar.png" alt="Sugar" className="h-[18px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/hyundai.png" alt="Hyundai" className="h-[14px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/nykaa.svg" alt="Nykaa" className="h-[20px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/vip.svg" alt="VIP" className="h-[16px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/cipla.svg" alt="Cipla" className="h-[14px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/ultratech.png" alt="UltraTech" className="h-[18px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/hyatt.svg" alt="Hyatt" className="h-[15px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/marriott.svg" alt="Marriott" className="h-[16px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/novotel.svg" alt="Novotel" className="h-[22px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/itchotels.svg" alt="ITC Hotels" className="h-[24px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
          <img src="/brands/thefern.svg" alt="The Fern" className="h-[24px] w-auto object-contain hover:scale-105 transition-transform duration-300" />
        </div>

        <div className="hidden lg:flex flex-col gap-2 mt-1.5 w-full">
          {/* Strip 9 (top horizontal strip) */}
          <div
            id="brand-strip-1"
            className="w-full px-4 lg:px-8 flex items-center justify-center overflow-hidden"
            style={{ height: "clamp(55px, 8.5vh, 85px)" }}
          >
            <div className="flex items-center justify-between w-full gap-2 lg:gap-4 xl:gap-6">
              {strip1Logos.map((logo, index) => (
                <LogoItem
                  key={logo.logoPath || logo.domain}
                  delay={index * 40}
                  {...logo}
                />
              ))}
            </div>
          </div>
          {/* Strip 10 (bottom horizontal strip) */}
          <div
            id="brand-strip-2"
            className="w-full px-4 lg:px-8 flex items-center justify-center overflow-hidden"
            style={{ height: "clamp(55px, 8.5vh, 85px)" }}
          >
            <div className="flex items-center justify-between w-full gap-2 lg:gap-4 xl:gap-6">
              {strip2Logos.map((logo, index) => (
                <LogoItem
                  key={logo.logoPath || logo.domain}
                  delay={index * 40}
                  {...logo}
                />
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Subtle bottom divider line */}
      <div className="mt-6 md:mt-10 w-16 h-[2px] rounded-full bg-[#161443]/10" />
    </div>
  );
}
