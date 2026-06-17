"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  isHovered: boolean;
}

export default function UnclearROIVisual({ isHovered }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // KPI value refs
  const kpiValue1Ref = useRef<HTMLDivElement>(null);
  const kpiValue2Ref = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);

  // Chart path refs
  const flatPathRef = useRef<SVGPathElement>(null);
  const dropPathRef = useRef<SVGPathElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);

  // Drop-off dots
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);
  const dot3Ref = useRef<SVGCircleElement>(null);

  // KPI question marks and alarming values
  const qMark1Ref = useRef<HTMLSpanElement>(null);
  const qMark2Ref = useRef<HTMLSpanElement>(null);
  const badValue1Ref = useRef<HTMLSpanElement>(null);
  const badValue2Ref = useRef<HTMLSpanElement>(null);

  // Badge
  const badgeRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Build timeline ONCE on mount
  useEffect(() => {
    // --- Initial states ---
    gsap.set(cardRef.current, { y: 20 });
    gsap.set(chartWrapperRef.current, {
      filter: "blur(1.5px)",
      opacity: 0.55,
    });

    // Question marks visible, bad values hidden
    gsap.set([qMark1Ref.current, qMark2Ref.current], { opacity: 1, scale: 1 });
    gsap.set([badValue1Ref.current, badValue2Ref.current], { opacity: 0, scale: 0.7, y: 4 });

    // Flat path visible, drop path hidden
    gsap.set(flatPathRef.current, { opacity: 0.3 });

    if (dropPathRef.current) {
      const pathLength = dropPathRef.current.getTotalLength();
      gsap.set(dropPathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });
    }
    gsap.set(fillPathRef.current, { opacity: 0 });

    // Drop-off dots hidden
    gsap.set([dot1Ref.current, dot2Ref.current, dot3Ref.current], {
      opacity: 0,
      r: 0,
    });

    // Badge hidden
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.6, y: 14 });

    // --- Build master timeline ---
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

    // 1. Card lifts up
    tl.to(cardRef.current, { y: 0, duration: 0.5 }, 0);

    // 2. Chart fog partially clears
    tl.to(chartWrapperRef.current, {
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.4,
    }, 0);

    // 3. Question marks fade out
    tl.to([qMark1Ref.current, qMark2Ref.current], {
      opacity: 0,
      scale: 0.5,
      duration: 0.25,
    }, 0);

    // 4. Alarming bad values fade in (red)
    tl.to(badValue1Ref.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.35,
    }, 0.12);
    tl.to(badValue2Ref.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.35,
    }, 0.15);

    // 5. Flat line fades down
    tl.to(flatPathRef.current, { opacity: 0.08, duration: 0.3 }, 0);

    // 6. Declining curve draws in
    if (dropPathRef.current) {
      tl.to(dropPathRef.current, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.6,
      }, 0.1);
    }

    // 7. Red gradient fill under declining curve
    tl.to(fillPathRef.current, { opacity: 0.18, duration: 0.5 }, 0.2);

    // 8. Drop-off dots pulse in at key points
    tl.to(dot1Ref.current, {
      opacity: 1,
      r: 3,
      duration: 0.3,
      ease: "back.out(1.5)",
    }, 0.3);
    tl.to(dot2Ref.current, {
      opacity: 1,
      r: 3,
      duration: 0.3,
      ease: "back.out(1.5)",
    }, 0.38);
    tl.to(dot3Ref.current, {
      opacity: 1,
      r: 2.5,
      duration: 0.3,
      ease: "back.out(1.5)",
    }, 0.45);

    // 9. Red warning badge
    tl.to(badgeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.5)",
    }, 0.2);

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  // Play / reverse on hover
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
      className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-5 relative overflow-hidden select-none"
    >
      {/* Analytics Card */}
      <div
        ref={cardRef}
        className="w-[88%] max-w-[270px] bg-white rounded-2xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3.5 relative z-10 flex flex-col h-[155px]"
      >
        {/* Card Title */}
        <div className="flex justify-between items-center mb-2 px-0.5">
          <span className="text-[10px] font-bold text-brand-navy tracking-tight">
            Marketing ROI
          </span>
          <span className="text-[8px] font-medium text-brand-navy/30">Live updates</span>
        </div>

        {/* KPI Tiles (2 Columns) */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* KPI 1: CAC */}
          <div className="bg-[#f8fafc] border border-black/[0.02] rounded-lg p-1.5 flex flex-col justify-between h-[36px]">
            <div className="text-[6.5px] font-bold text-brand-navy/40 uppercase tracking-wider">
              CAC
            </div>
            <div className="text-[10px] font-extrabold leading-none relative h-3 flex items-center">
              {/* Question mark (default) */}
              <span
                ref={qMark1Ref}
                className="text-brand-navy/30 font-black absolute"
              >
                ?
              </span>
              {/* Alarming value (hover) */}
              <span
                ref={badValue1Ref}
                className="text-red-500 font-black absolute"
              >
                $94.20
              </span>
            </div>
          </div>

          {/* KPI 2: Conversions */}
          <div className="bg-[#f8fafc] border border-black/[0.02] rounded-lg p-1.5 flex flex-col justify-between h-[36px]">
            <div className="text-[6.5px] font-bold text-brand-navy/40 uppercase tracking-wider">
              Conversions
            </div>
            <div className="text-[10px] font-extrabold leading-none relative h-3 flex items-center">
              {/* Question mark (default) */}
              <span
                ref={qMark2Ref}
                className="text-brand-navy/30 font-black absolute"
              >
                ?
              </span>
              {/* Alarming value (hover) */}
              <span
                ref={badValue2Ref}
                className="text-red-500 font-black absolute"
              >
                -23%
              </span>
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div
          ref={chartWrapperRef}
          className="flex-1 relative bg-[#f8fafc] border border-black/[0.02] rounded-lg overflow-hidden h-[54px] w-full"
        >
          <svg className="w-full h-full" viewBox="0 0 230 54" preserveAspectRatio="none">
            <defs>
              <linearGradient id="drop-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="18" x2="230" y2="18" stroke="#000" strokeOpacity="0.02" strokeWidth="1" />
            <line x1="0" y1="36" x2="230" y2="36" stroke="#000" strokeOpacity="0.02" strokeWidth="1" />

            {/* Default flat/uncertain dashed path */}
            <path
              ref={flatPathRef}
              d="M 10 27 Q 60 30 110 27 T 220 28"
              fill="none"
              stroke="#161443"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Hover: DECLINING curve path (drops from left to right) */}
            <path
              ref={dropPathRef}
              d="M 10 8 Q 50 10 90 18 T 150 34 Q 180 42 220 48"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Red fill under declining curve */}
            <path
              ref={fillPathRef}
              d="M 10 8 Q 50 10 90 18 T 150 34 Q 180 42 220 48 L 220 54 L 10 54 Z"
              fill="url(#drop-grad)"
            />

            {/* Red pulsing dots at drop-off points */}
            <circle ref={dot1Ref} cx="60" cy="12" r="0" fill="#ef4444" />
            <circle ref={dot2Ref} cx="140" cy="30" r="0" fill="#ef4444" />
            <circle ref={dot3Ref} cx="210" cy="46" r="0" fill="#ef4444" />
          </svg>
        </div>
      </div>

      {/* Floating Red Badge: "📉 Losing Money" */}
      <div
        ref={badgeRef}
        className="absolute top-[10%] right-[3%] bg-red-500 text-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-[0_4px_12px_rgba(239,68,68,0.3)] flex items-center gap-1 z-20"
      >
        <span className="text-[10px]">📉</span>
        <span>Losing Money</span>
      </div>
    </div>
  );
}
