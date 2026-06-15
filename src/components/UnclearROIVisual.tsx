"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  isHovered: boolean;
}

export default function UnclearROIVisual({ isHovered }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Refs for numbers and labels
  const kpiValue1Ref = useRef<HTMLDivElement>(null);
  const kpiValue2Ref = useRef<HTMLDivElement>(null);
  const chartWrapperRef = useRef<HTMLDivElement>(null);
  
  // Refs for chart paths
  const flatPathRef = useRef<SVGPathElement>(null);
  const curvePathRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);

  // Floating badge ref
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial states
    gsap.set(cardRef.current, { y: 20 });
    gsap.set([kpiValue1Ref.current, kpiValue2Ref.current, chartWrapperRef.current], {
      filter: "blur(2px)",
      opacity: 0.5,
    });
    
    // Set initial chart line states
    if (curvePathRef.current) {
      const pathLength = curvePathRef.current.getTotalLength();
      gsap.set(curvePathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });
    }

    if (fillPathRef.current) {
      gsap.set(fillPathRef.current, { opacity: 0 });
    }

    gsap.set(badgeRef.current, {
      opacity: 0,
      scale: 0.7,
      y: 12,
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // 1. Dashboard card lifts up
      tl.to(cardRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 0);

      // 2. Remove blur and increase opacity
      tl.to([kpiValue1Ref.current, kpiValue2Ref.current, chartWrapperRef.current], {
        filter: "blur(0px)",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, 0);

      // 3. Flat line fades down
      tl.to(flatPathRef.current, {
        opacity: 0.1,
        duration: 0.3,
      }, 0);

      // 4. Upward curve line draws in
      if (curvePathRef.current) {
        tl.to(curvePathRef.current, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }, 0.1);
      }

      // 5. Gradient fill under the curve fades in
      if (fillPathRef.current) {
        tl.to(fillPathRef.current, {
          opacity: 0.15,
          duration: 0.5,
          ease: "power2.out",
        }, 0.2);
      }

      // 6. Floating "+47% ROI" Badge pops in
      tl.to(badgeRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, 0.2);

      if (isHovered) {
        tl.play();
      } else {
        tl.reverse();
      }
    }, containerRef);

    return () => ctx.revert();
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
          {/* KPI 1 */}
          <div className="bg-[#f8fafc] border border-black/[0.02] rounded-lg p-1.5 flex flex-col justify-between h-[36px]">
            <div className="text-[6.5px] font-bold text-brand-navy/40 uppercase tracking-wider">
              CAC
            </div>
            <div
              ref={kpiValue1Ref}
              className="text-[10px] font-extrabold text-brand-navy leading-none relative h-3 flex items-center"
            >
              {isHovered ? (
                <span className="text-[#f6861f]">$18.40</span>
              ) : (
                <span className="text-brand-navy/30 font-black">?</span>
              )}
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-[#f8fafc] border border-black/[0.02] rounded-lg p-1.5 flex flex-col justify-between h-[36px]">
            <div className="text-[6.5px] font-bold text-brand-navy/40 uppercase tracking-wider">
              Conversions
            </div>
            <div
              ref={kpiValue2Ref}
              className="text-[10px] font-extrabold text-brand-navy leading-none relative h-3 flex items-center"
            >
              {isHovered ? (
                <span className="text-brand-navy font-bold">+184%</span>
              ) : (
                <span className="text-brand-navy/30 font-black">?</span>
              )}
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
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f6861f" />
                <stop offset="100%" stopColor="#f6861f" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines inside chart */}
            <line x1="0" y1="18" x2="230" y2="18" stroke="#000" strokeOpacity="0.02" strokeWidth="1" />
            <line x1="0" y1="36" x2="230" y2="36" stroke="#000" strokeOpacity="0.02" strokeWidth="1" />

            {/* Default flat/uncertain path */}
            <path
              ref={flatPathRef}
              d="M 10 27 Q 60 30 110 27 T 220 28"
              fill="none"
              stroke="#161443"
              strokeWidth="1.5"
              strokeOpacity="0.25"
              strokeDasharray="3 3"
            />

            {/* Hover upward curve path */}
            <path
              ref={curvePathRef}
              d="M 10 44 Q 80 40 130 22 T 220 6"
              fill="none"
              stroke="#f6861f"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Fill under hover curve */}
            <path
              ref={fillPathRef}
              d="M 10 44 Q 80 40 130 22 T 220 6 L 220 54 L 10 54 Z"
              fill="url(#chart-grad)"
            />
          </svg>
        </div>
      </div>

      {/* Floating Accent Badge: "+47% ROI" */}
      <div
        ref={badgeRef}
        className="absolute top-[10%] right-[3%] bg-[#f6861f] text-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-[0_4px_12px_rgba(246,134,31,0.25)] flex items-center gap-1 z-20 animate-bounce-subtle"
      >
        <span className="text-[10px]">📈</span>
        <span>+47% ROI</span>
      </div>
    </div>
  );
}
