"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  isHovered: boolean;
}

export default function ConsistencyStrugglesVisual({ isHovered }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Card refs
  const emailRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bizCardRef = useRef<HTMLDivElement>(null);

  // Inner accent elements
  const emailLogoRef = useRef<HTMLDivElement>(null);
  const emailHeroRef = useRef<HTMLDivElement>(null);
  const socialLogoRef = useRef<HTMLDivElement>(null);
  const socialIconRef = useRef<HTMLDivElement>(null);
  const bizLogoRef = useRef<HTMLDivElement>(null);
  const bizAccentRef = useRef<HTMLDivElement>(null);

  // Mismatch indicators
  const mismatch1Ref = useRef<HTMLDivElement>(null);
  const mismatch2Ref = useRef<HTMLDivElement>(null);

  // Badge
  const badgeRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Build timeline ONCE on mount
  useEffect(() => {
    // --- Initial states ---
    // Email card: warm yellow tones, slightly fanned left
    gsap.set(emailRef.current, {
      x: -18,
      y: -4,
      rotate: -8,
      scale: 0.97,
    });
    gsap.set(emailLogoRef.current, { backgroundColor: "rgba(234, 179, 8, 0.6)" });
    gsap.set(emailHeroRef.current, { backgroundColor: "rgba(234, 179, 8, 0.35)" });

    // Social card: blue tones, center
    gsap.set(socialRef.current, {
      x: 0,
      y: 3,
      rotate: 2,
      scale: 1,
    });
    gsap.set(socialLogoRef.current, { backgroundColor: "rgba(59, 130, 246, 0.5)" });
    gsap.set(socialIconRef.current, {
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 0.2)",
      color: "rgba(59, 130, 246, 1)",
    });

    // Business card: pink/green tones, fanned right
    gsap.set(bizCardRef.current, {
      x: 18,
      y: -4,
      rotate: 8,
      scale: 0.97,
    });
    gsap.set(bizLogoRef.current, { backgroundColor: "rgba(74, 222, 128, 0.5)" });
    gsap.set(bizAccentRef.current, { backgroundColor: "rgba(74, 222, 128, 0.5)" });

    // Mismatch indicators hidden
    gsap.set([mismatch1Ref.current, mismatch2Ref.current], {
      opacity: 0,
      scale: 0.5,
    });

    // Badge hidden
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.6, y: 14 });

    // --- Build master timeline ---
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

    // 1. Cards spread APART dramatically — repelling each other
    tl.to(emailRef.current, {
      x: -52,
      y: -12,
      rotate: -22,
      scale: 0.92,
      duration: 0.55,
    }, 0);

    tl.to(socialRef.current, {
      y: 10,
      rotate: 0,
      scale: 1.06,
      duration: 0.5,
    }, 0);

    tl.to(bizCardRef.current, {
      x: 52,
      y: -12,
      rotate: 22,
      scale: 0.92,
      duration: 0.55,
    }, 0);

    // 2. Colors shift to CLASHING extremes
    // Email: garish yellow
    tl.to(emailLogoRef.current, {
      backgroundColor: "rgba(250, 204, 21, 1)",
      duration: 0.4,
    }, 0);
    tl.to(emailHeroRef.current, {
      backgroundColor: "rgba(250, 204, 21, 0.7)",
      duration: 0.4,
    }, 0);

    // Social: neon blue
    tl.to(socialLogoRef.current, {
      backgroundColor: "rgba(37, 99, 235, 1)",
      duration: 0.4,
    }, 0);
    tl.to(socialIconRef.current, {
      backgroundColor: "rgba(37, 99, 235, 0.15)",
      borderColor: "rgba(37, 99, 235, 0.4)",
      color: "rgba(37, 99, 235, 1)",
      duration: 0.4,
    }, 0);

    // Business card: harsh green
    tl.to(bizLogoRef.current, {
      backgroundColor: "rgba(34, 197, 94, 1)",
      duration: 0.4,
    }, 0);
    tl.to(bizAccentRef.current, {
      backgroundColor: "rgba(34, 197, 94, 1)",
      duration: 0.4,
    }, 0);

    // 3. Mismatch "≠" indicators fade in between cards
    tl.to(mismatch1Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "back.out(1.4)",
    }, 0.12);

    tl.to(mismatch2Ref.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "back.out(1.4)",
    }, 0.18);

    // 4. Red badge pops in
    tl.to(badgeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.5)",
    }, 0.14);

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  // Play / reverse on hover change
  useEffect(() => {
    if (!tlRef.current) return;
    if (isHovered) {
      tlRef.current.timeScale(1).play();
    } else {
      tlRef.current.timeScale(0.85).reverse();
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden p-6 select-none"
    >
      {/* Container for mockups */}
      <div className="relative w-[200px] h-[140px] flex items-center justify-center">

        {/* Touchpoint 1: Email Newsletter Mockup */}
        <div
          ref={emailRef}
          className="absolute w-[125px] h-[80px] rounded-xl border border-yellow-300/40 bg-[#fffbeb] p-2 flex flex-col justify-between shadow-md z-10"
        >
          {/* Email Header */}
          <div className="flex items-center justify-between pb-1 border-b border-yellow-200/30">
            <div className="flex items-center gap-1">
              <div
                ref={emailLogoRef}
                className="w-2.5 h-2.5 rounded-full"
              />
              <div className="w-10 h-1 rounded-full bg-yellow-800/20" />
            </div>
            <div className="w-4 h-1 rounded-full bg-yellow-800/10" />
          </div>
          {/* Email Body Hero Area */}
          <div className="flex-1 flex items-center justify-center my-1 rounded bg-yellow-100/50">
            <div
              ref={emailHeroRef}
              className="w-10 h-2.5 rounded"
            />
          </div>
          {/* Email Footer line */}
          <div className="h-0.5 w-6 rounded-full self-center bg-yellow-800/15" />
        </div>

        {/* Touchpoint 2: Social Post Mockup (Center) */}
        <div
          ref={socialRef}
          className="absolute w-[105px] h-[105px] rounded-xl border border-blue-200/40 bg-[#eff6ff] p-2 flex flex-col justify-between shadow-xl z-20"
        >
          {/* Post Header */}
          <div className="flex items-center gap-1.5 pb-1">
            <div
              ref={socialLogoRef}
              className="w-3.5 h-3.5 rounded-full"
            />
            <div className="flex flex-col gap-0.5">
              <div className="w-8 h-1 rounded-full bg-blue-900/25" />
              <div className="w-4 h-0.5 rounded-full bg-blue-900/10" />
            </div>
          </div>
          {/* Post Image Container */}
          <div className="flex-1 relative rounded overflow-hidden flex items-center justify-center my-1 bg-blue-50/80 border border-blue-100/30">
            <div
              ref={socialIconRef}
              className="w-6 h-6 rounded-full flex items-center justify-center border"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
          {/* Post Actions */}
          <div className="flex justify-between items-center pt-0.5">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-300/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-300/30" />
            </div>
            <div className="w-5 h-1 rounded-full bg-blue-900/10" />
          </div>
        </div>

        {/* Touchpoint 3: Business Card Mockup */}
        <div
          ref={bizCardRef}
          className="absolute w-[125px] h-[80px] rounded-xl border border-green-200/40 bg-[#f0fdf4] p-2.5 flex flex-col justify-between shadow-md z-10"
        >
          {/* Logo Brand Name */}
          <div className="flex items-center gap-1">
            <div
              ref={bizLogoRef}
              className="w-2.5 h-2.5 rounded"
            />
            <div className="w-8 h-1.5 rounded-full bg-green-800/25" />
          </div>
          {/* Business Card Info */}
          <div className="flex flex-col gap-1 mt-auto">
            <div className="w-12 h-1.5 rounded-full bg-green-900/20" />
            <div
              ref={bizAccentRef}
              className="w-8 h-1 rounded-full"
            />
          </div>
        </div>

        {/* Mismatch "≠" indicators between cards */}
        {/* Between email and social */}
        <div
          ref={mismatch1Ref}
          className="absolute z-30 pointer-events-none"
          style={{ left: "22%", top: "42%" }}
        >
          <div className="w-5 h-5 rounded-full bg-red-100 border border-red-300/60 flex items-center justify-center shadow-sm">
            <span className="text-[10px] font-black text-red-500 leading-none">≠</span>
          </div>
        </div>

        {/* Between social and business card */}
        <div
          ref={mismatch2Ref}
          className="absolute z-30 pointer-events-none"
          style={{ right: "20%", top: "42%" }}
        >
          <div className="w-5 h-5 rounded-full bg-red-100 border border-red-300/60 flex items-center justify-center shadow-sm">
            <span className="text-[10px] font-black text-red-500 leading-none">≠</span>
          </div>
        </div>
      </div>

      {/* Floating Red Badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(239,68,68,0.3)] flex items-center gap-1 z-40"
      >
        <span className="text-[10px]">❌</span>
        <span>3 Different Brands</span>
      </div>
    </div>
  );
}
