"use client";

import React, { useRef, useEffect } from "react";

interface LogoItem {
  alt: string;
  type: "img" | "svg";
  src?: string;
  render?: () => React.ReactElement;
  h: number;
}

// ─── SVG logo components ───────────────────────────────────────────────────────

const NexaSvg = () => (
  <svg width="90" height="44" viewBox="0 0 100 48">
    <rect width="100" height="48" rx="4" fill="#1a1a1a"/>
    <text x="50" y="22" textAnchor="middle" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#c8a04a" letterSpacing="2">NEXA</text>
    <text x="50" y="36" textAnchor="middle" fontFamily="Arial" fontWeight="300" fontSize="6" fill="#aaa" letterSpacing="1">MARUTI SUZUKI</text>
  </svg>
);

const VwSvg = () => (
  <svg width="120" height="44" viewBox="0 0 130 48">
    <circle cx="24" cy="24" r="20" fill="#001c3d"/>
    <path d="M15 13 L22 29 M33 13 L26 29 M13 23 L20 37 M35 23 L28 37 M20 37 L24 31 M28 37 L24 31" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <text x="52" y="30" fontFamily="Arial" fontWeight="600" fontSize="15" fill="#001c3d">Volkswagen</text>
  </svg>
);

const LodhaSvg = () => (
  <svg width="110" height="38" viewBox="0 0 130 42">
    <rect x="4" y="8" width="16" height="2" fill="#c5a059"/>
    <rect x="4" y="14" width="16" height="2" fill="#c5a059"/>
    <rect x="4" y="20" width="16" height="2" fill="#c5a059"/>
    <rect x="4" y="26" width="16" height="2" fill="#c5a059"/>
    <text x="28" y="28" fontFamily="Arial" fontWeight="700" fontSize="20" fill="#c5a059" letterSpacing="3">LODHA</text>
  </svg>
);

const KalpaSvg = () => (
  <svg width="130" height="38" viewBox="0 0 160 42">
    <circle cx="18" cy="21" r="14" fill="none" stroke="#1e4d8c" strokeWidth="1.5"/>
    <path d="M12 28 L18 12 L24 28" stroke="#1e4d8c" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M14 22 L22 22" stroke="#1e4d8c" strokeWidth="1.5"/>
    <text x="40" y="26" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#1e4d8c" letterSpacing="1.5">KALPA·TARU</text>
  </svg>
);

const NetflixSvg = () => (
  <svg width="100" height="38" viewBox="0 0 120 42">
    <path d="M8 6 L8 36 L14 36 L14 6Z" fill="#E50914"/>
    <path d="M28 6 L28 36 L34 36 L34 6Z" fill="#E50914"/>
    <path d="M8 6 L28 36 L34 36 L14 6Z" fill="#B20710"/>
    <text x="42" y="27" fontFamily="Arial" fontWeight="900" fontSize="17" fill="#E50914" letterSpacing="-0.5">NETFLIX</text>
  </svg>
);

const HyundaiSvg = () => (
  <svg width="120" height="40" viewBox="0 0 140 44">
    <ellipse cx="22" cy="22" rx="19" ry="15" fill="none" stroke="#002c5f" strokeWidth="2.5"/>
    <path d="M14 30 L18 14 M30 30 L26 14 M16 22 L28 22" stroke="#002c5f" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
    <text x="48" y="27" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#002c5f" letterSpacing="0.5">HYUNDAI</text>
  </svg>
);

const VipSvg = () => (
  <svg width="70" height="38" viewBox="0 0 80 42">
    <rect x="2" y="4" width="76" height="34" rx="3" fill="#e8c022"/>
    <text x="40" y="27" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="20" fill="#1a1a1a" letterSpacing="2">VIP</text>
  </svg>
);

const CiplaSvg = () => (
  <svg width="85" height="38" viewBox="0 0 100 42">
    <text x="6" y="30" fontFamily="Arial" fontWeight="800" fontSize="26" fill="#0c4a9f">Cipla</text>
  </svg>
);

const UltraTechSvg = () => (
  <svg width="130" height="44" viewBox="0 0 150 48">
    <rect x="2" y="8" width="34" height="28" rx="2" fill="#e8c022"/>
    <text x="19" y="24" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="9" fill="#1a1a1a">ULTRA</text>
    <text x="19" y="33" textAnchor="middle" fontFamily="Arial" fontWeight="900" fontSize="8" fill="#1a1a1a">TECH</text>
    <text x="44" y="26" fontFamily="Arial" fontWeight="700" fontSize="14" fill="#1a1a1a">UltraTech</text>
    <text x="44" y="38" fontFamily="Arial" fontWeight="400" fontSize="9" fill="#555">Cement</text>
  </svg>
);

const HyattSvg = () => (
  <svg width="90" height="38" viewBox="0 0 110 42">
    <text x="6" y="30" fontFamily="Arial" fontWeight="300" fontSize="26" fill="#1a1a1a" letterSpacing="2">HYATT</text>
    <circle cx="100" cy="10" r="4" fill="#a8804a"/>
  </svg>
);

const MarriottSvg = () => (
  <svg width="120" height="38" viewBox="0 0 140 42">
    <path d="M4 32 L4 10 L13 24 L22 10 L22 32 L17 32 L17 20 L13 26 L9 20 L9 32Z" fill="#b01f24"/>
    <circle cx="28" cy="10" r="2.5" fill="#b01f24"/>
    <text x="36" y="28" fontFamily="Georgia, serif" fontWeight="700" fontSize="18" fill="#1a1a1a" letterSpacing="0.3">Marriott.</text>
  </svg>
);

const NovotelSvg = () => (
  <svg width="110" height="38" viewBox="0 0 130 42">
    <circle cx="16" cy="21" r="13" fill="none" stroke="#0d3b6e" strokeWidth="2"/>
    <path d="M9 21 Q16 10 23 21 Q16 32 9 21Z" fill="#0d3b6e"/>
    <text x="36" y="27" fontFamily="Arial" fontWeight="700" fontSize="17" fill="#0d3b6e">novotel</text>
  </svg>
);

const ItcSvg = () => (
  <svg width="120" height="44" viewBox="0 0 140 48">
    <rect x="4" y="10" width="26" height="26" rx="2" fill="none" stroke="#8b6914" strokeWidth="1.5"/>
    <path d="M10 24 L17 14 L24 24" stroke="#8b6914" strokeWidth="1.5" fill="none"/>
    <text x="38" y="24" fontFamily="Arial" fontWeight="700" fontSize="11" fill="#1a1a1a" letterSpacing="0.5">ITC HOTELS</text>
    <text x="38" y="35" fontFamily="Arial" fontWeight="300" fontSize="7" fill="#666" letterSpacing="0.5">RESPONSIBLE LUXURY</text>
  </svg>
);

const FernSvg = () => (
  <svg width="120" height="44" viewBox="0 0 140 48">
    <path d="M8 36 Q14 12 20 36" stroke="#2e6b2e" strokeWidth="1.5" fill="none"/>
    <path d="M8 26 Q14 16 20 26" stroke="#2e6b2e" strokeWidth="1" fill="none"/>
    <path d="M8 18 Q14 10 20 18" stroke="#2e6b2e" strokeWidth="1" fill="none"/>
    <text x="28" y="24" fontFamily="Georgia, serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#2e6b2e" letterSpacing="1">THE FERN</text>
    <text x="28" y="35" fontFamily="Arial" fontWeight="300" fontSize="7" fill="#555" letterSpacing="0.5">HOTELS &amp; RESORTS</text>
  </svg>
);

// ─── Logo data ────────────────────────────────────────────────────────────────

const row1: LogoItem[] = [
  { alt: "NEXA",       type: "svg", render: () => <NexaSvg />,     h: 44 },
  { alt: "Volkswagen", type: "svg", render: () => <VwSvg />,       h: 40 },
  { alt: "Lodha",      type: "svg", render: () => <LodhaSvg />,    h: 36 },
  { alt: "Kalpa-Taru", type: "svg", render: () => <KalpaSvg />,    h: 36 },
  { alt: "Amul",       type: "img", src: "/brands/amul.png",       h: 38 },
  { alt: "Netflix",    type: "svg", render: () => <NetflixSvg />,  h: 36 },
  { alt: "Sugar",      type: "img", src: "/brands/sugar.png",      h: 30 },
  { alt: "Hyundai",    type: "svg", render: () => <HyundaiSvg />,  h: 38 },
];

const row2: LogoItem[] = [
  { alt: "Nykaa",        type: "img", src: "/brands/nykaa.png",    h: 28 },
  { alt: "VIP",          type: "svg", render: () => <VipSvg />,    h: 36 },
  { alt: "Cipla",        type: "svg", render: () => <CiplaSvg />,  h: 36 },
  { alt: "UltraTech",    type: "svg", render: () => <UltraTechSvg />, h: 42 },
  { alt: "Hyatt",        type: "svg", render: () => <HyattSvg />,  h: 36 },
  { alt: "Marriott",     type: "svg", render: () => <MarriottSvg />, h: 36 },
  { alt: "Novotel",      type: "svg", render: () => <NovotelSvg />, h: 36 },
  { alt: "ITC Hotels",   type: "svg", render: () => <ItcSvg />,    h: 42 },
  { alt: "The Fern",     type: "svg", render: () => <FernSvg />,   h: 42 },
];

// ─── Logo node ────────────────────────────────────────────────────────────────

function LogoNode({ item }: { item: LogoItem }) {
  if (item.type === "img" && item.src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.src}
        alt={item.alt}
        style={{ height: `${item.h}px`, width: "auto", objectFit: "contain", opacity: 0.75, flexShrink: 0 }}
      />
    );
  }
  if (item.type === "svg" && item.render) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", opacity: 0.75, flexShrink: 0 }}>
        {item.render()}
      </span>
    );
  }
  return null;
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  logos,
  reverse = false,
  rowId,
}: {
  logos: LogoItem[];
  reverse?: boolean;
  rowId: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    let pos = 0;
    const speed = 0.55;

    function step() {
      if (!track) return;
      const halfW = track.scrollWidth / 2;
      if (reverse) {
        pos -= speed;
        if (Math.abs(pos) >= halfW) pos = 0;
        track.style.transform = `translateX(${pos}px)`;
      } else {
        pos += speed;
        if (pos >= halfW) pos = 0;
        track.style.transform = `translateX(${-pos}px)`;
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reverse]);

  const doubled = [...logos, ...logos];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        height: "64px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ID badge */}
      <span
        style={{
          position: "absolute", top: "4px", left: "8px",
          fontSize: "10px", fontFamily: "monospace", fontWeight: "bold",
          color: "#000", backgroundColor: "rgba(255,255,255,0.75)",
          padding: "1px 6px", borderRadius: "3px",
          border: "1px solid rgba(0,0,0,0.1)", zIndex: 30, pointerEvents: "none",
        }}
      >
        {rowId}
      </span>
      {/* Left fade */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #fafaf9, transparent)", zIndex: 10, pointerEvents: "none" }} />
      {/* Right fade */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #fafaf9, transparent)", zIndex: 10, pointerEvents: "none" }} />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        style={{ display: "flex", alignItems: "center", gap: "56px", willChange: "transform", flexShrink: 0 }}
      >
        {doubled.map((logo, i) => (
          <LogoNode key={i} item={logo} />
        ))}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function LogoMarquee() {
  return (
    <div style={{ width: "100%", backgroundColor: "#fafaf9", paddingTop: "24px", paddingBottom: "24px", borderTop: "1px solid rgba(20,30,60,0.04)", borderBottom: "1px solid rgba(20,30,60,0.04)", userSelect: "none" }}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "10px", fontWeight: "bold", letterSpacing: "0.25em", color: "rgba(20,30,60,0.4)", textTransform: "uppercase", fontFamily: "Inter, Arial, sans-serif" }}>
          Trusted By Industry Leaders &amp; Global Brands
        </span>
      </div>
      <MarqueeRow logos={row1} reverse={false} rowId="marquee-row-1" />
      <div style={{ height: "12px" }} />
      <MarqueeRow logos={row2} reverse={true} rowId="marquee-row-2" />
    </div>
  );
}
