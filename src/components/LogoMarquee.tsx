"use client";

import React from "react";

// 12 Premium Vector SVGs of Brands Shown in Screenshot
const UnileverLogo = () => (
  <svg
    width="130"
    height="40"
    viewBox="0 0 160 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <path
      d="M22 6C22 26 26 36 38 36C50 36 54 26 54 6"
      stroke="#161443"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="28" cy="14" r="2.5" fill="#f6861f" />
    <circle cx="48" cy="14" r="2.5" fill="#f6861f" />
    <circle cx="38" cy="22" r="2" fill="#161443" />
    <path
      d="M38 29C35 29 34 28 34 26C34 24 36 23 38 23C40 23 42 24 42 26C42 28 41 29 38 29Z"
      fill="#161443"
    />
    <text
      x="66"
      y="29"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="800"
      fontSize="20"
      fill="#161443"
      letterSpacing="-0.5"
    >
      Unilever
    </text>
  </svg>
);

const NetflixLogo = () => (
  <svg
    width="110"
    height="35"
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <path d="M12 5H18V35H12z" fill="#E50914" />
    <path d="M30 5H36V35H30z" fill="#E50914" />
    <path d="M12 5L30 35H36L18 5z" fill="#B20710" />
    <text
      x="45"
      y="28"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="900"
      fontSize="20"
      fill="#E50914"
      letterSpacing="-0.5"
    >
      NETFLIX
    </text>
  </svg>
);

const PGLogo = () => (
  <svg
    width="100"
    height="35"
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <defs>
      <radialGradient id="pgGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#0066cc" />
        <stop offset="100%" stopColor="#001a66" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="20" r="17" fill="url(#pgGrad)" />
    <text
      x="20"
      y="25"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="800"
      fontSize="12"
      fill="white"
      textAnchor="middle"
    >
      P&amp;G
    </text>
    <text
      x="46"
      y="27"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="800"
      fontSize="22"
      fill="#001a66"
    >
      P&amp;G
    </text>
  </svg>
);

const LodhaLogo = () => (
  <svg
    width="130"
    height="35"
    viewBox="0 0 160 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-85 hover:opacity-100 transition-opacity duration-300"
  >
    <rect x="5" y="10" width="20" height="2" fill="#c5a059" />
    <rect x="5" y="16.5" width="20" height="2" fill="#c5a059" />
    <rect x="5" y="23" width="20" height="2" fill="#c5a059" />
    <rect x="5" y="29.5" width="20" height="2" fill="#c5a059" />
    <text
      x="36"
      y="28"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="700"
      fontSize="20"
      fill="#c5a059"
      letterSpacing="3.5"
    >
      LODHA
    </text>
  </svg>
);

const HyundaiLogo = () => (
  <svg
    width="130"
    height="35"
    viewBox="0 0 160 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <rect
      x="2"
      y="3"
      width="44"
      height="34"
      rx="17"
      stroke="#002c5f"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M16 28L19 12M32 28L29 12M17.5 20L30.5 20"
      stroke="#002c5f"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <text
      x="54"
      y="26"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="800"
      fontSize="16"
      fill="#002c5f"
      letterSpacing="0.5"
    >
      HYUNDAI
    </text>
  </svg>
);

const VolkswagenLogo = () => (
  <svg
    width="140"
    height="35"
    viewBox="0 0 160 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <circle
      cx="20"
      cy="20"
      r="16"
      stroke="#001c3d"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M13 11L19.5 25.5M27 11L20.5 25.5"
      stroke="#001c3d"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M9 18.5L16.5 33M31 18.5L23.5 33"
      stroke="#001c3d"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M16.5 33L20 27M23.5 33L20 27"
      stroke="#001c3d"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <text
      x="44"
      y="26"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="700"
      fontSize="14"
      fill="#001c3d"
      letterSpacing="0.5"
    >
      Volkswagen
    </text>
  </svg>
);

const MarriottLogo = () => (
  <svg
    width="130"
    height="35"
    viewBox="0 0 150 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <path d="M5 30V10L13 22L21 10V30H16V18L13 24L10 18V30H5Z" fill="#b01f24" />
    <circle cx="27" cy="10" r="2" fill="#b01f24" />
    <text
      x="36"
      y="26"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="700"
      fontSize="17"
      fill="#161443"
      letterSpacing="0.5"
    >
      Marriott
    </text>
  </svg>
);

const AmulLogo = () => (
  <svg
    width="90"
    height="35"
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-85 hover:opacity-100 transition-opacity duration-300"
  >
    <text
      x="10"
      y="30"
      fontFamily="var(--font-serif), Georgia, serif"
      fontWeight="900"
      fontStyle="italic"
      fontSize="30"
      fill="#d01b1b"
      letterSpacing="-1"
    >
      Amul
    </text>
  </svg>
);

const NykaaLogo = () => (
  <svg
    width="110"
    height="35"
    viewBox="0 0 140 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <text
      x="10"
      y="29"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="800"
      fontSize="25"
      fill="#e82b75"
      letterSpacing="1"
    >
      NYKAA
    </text>
  </svg>
);

const CiplaLogo = () => (
  <svg
    width="90"
    height="35"
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <text
      x="10"
      y="29"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="800"
      fontSize="28"
      fill="#0c4a9f"
      letterSpacing="-0.5"
    >
      Cipla
    </text>
  </svg>
);

const GilletteLogo = () => (
  <svg
    width="110"
    height="35"
    viewBox="0 0 140 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <text
      x="10"
      y="29"
      fontFamily="var(--font-sans), sans-serif"
      fontWeight="900"
      fontStyle="italic"
      fontSize="25"
      fill="#001844"
      letterSpacing="-0.8"
    >
      Gillette
    </text>
  </svg>
);

const OlayLogo = () => (
  <svg
    width="80"
    height="35"
    viewBox="0 0 100 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-80 hover:opacity-100 transition-opacity duration-300"
  >
    <text
      x="10"
      y="29"
      fontFamily="var(--font-serif), Georgia, serif"
      fontWeight="600"
      fontStyle="italic"
      fontSize="24"
      fill="#161443"
      letterSpacing="1"
    >
      OLAY
    </text>
  </svg>
);

const BrandLogos = [
  UnileverLogo,
  NetflixLogo,
  PGLogo,
  LodhaLogo,
  HyundaiLogo,
  VolkswagenLogo,
  MarriottLogo,
  AmulLogo,
  NykaaLogo,
  CiplaLogo,
  GilletteLogo,
  OlayLogo,
];

export default function LogoMarquee() {
  // We repeat the array twice to ensure seamless infinite looping marquee
  const marqueeItems = [...BrandLogos, ...BrandLogos];

  return (
    <div className="w-full bg-[#fafaf9] py-8 border-y border-brand-navy/[0.04] overflow-hidden select-none pointer-events-auto">
      <div className="mx-auto max-w-7xl px-6 mb-3 text-center">
        <span className="text-[10px] font-bold tracking-[0.25em] text-brand-navy/40 uppercase">
          Trusted By Industry Leaders &amp; Global Brands
        </span>
      </div>
      <div className="relative flex overflow-x-hidden w-full items-center">
        {/* Shadow Overlays for premium fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#fafaf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#fafaf9] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="animate-marquee flex items-center gap-16 py-2">
          {marqueeItems.map((Logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center shrink-0 min-w-[120px]"
            >
              <Logo />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
