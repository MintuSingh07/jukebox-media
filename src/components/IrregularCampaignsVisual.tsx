"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  isHovered: boolean;
}

export default function IrregularCampaignsVisual({ isHovered }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pillInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  const gapsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  const eventPills = [
    {
      id: 0,
      label: "Campaign A",
      start: { col: 2, row: 0 }, // Week 1, Wed
      end: { col: 2, row: 0 },   // Week 1, Wed (Consistent)
      color: "navy",
      rotation: -2.5,
    },
    {
      id: 1,
      label: "Social Ad",
      start: { col: 0, row: 2 }, // Week 3, Mon (Crammed)
      end: { col: 2, row: 1 },   // Week 2, Wed (Consistent)
      color: "orange",
      rotation: 3.5,
    },
    {
      id: 2,
      label: "Newsletter",
      start: { col: 2, row: 2 }, // Week 3, Wed (Crammed)
      end: { col: 2, row: 2 },   // Week 3, Wed (Consistent)
      color: "navy",
      rotation: -1.8,
    },
    {
      id: 3,
      label: "PR Launch",
      start: { col: 4, row: 2 }, // Week 3, Fri (Crammed)
      end: { col: 2, row: 3 },   // Week 4, Wed (Consistent)
      color: "orange",
      rotation: 2.2,
    }
  ];

  // Coordinates of warning dots (gaps) on empty weeks in default state
  const gapDots = [
    { col: 3, row: 1 }, // Week 2, Thu
    { col: 1, row: 3 }, // Week 4, Tue
    { col: 5, row: 3 }, // Week 4, Sat
  ];

  useEffect(() => {
    // Set initial GSAP states
    gsap.set(cardRef.current, { y: 24 });
    gsap.set(headerRef.current, { opacity: 0.4 });
    
    // Set initial states for floating elements
    gsap.set([badge1Ref.current, badge2Ref.current, badge3Ref.current], {
      opacity: 0,
      scale: 0.7,
      y: 12,
    });

    // Set initial positions for event pills
    eventPills.forEach((pill) => {
      const el = pillsRef.current[pill.id];
      const inner = pillInnersRef.current[pill.id];
      if (el) {
        gsap.set(el, {
          left: `${pill.start.col * 14.2857}%`,
          top: `${pill.start.row * 25}%`,
        });
      }
      if (inner) {
        gsap.set(inner, {
          rotate: pill.rotation,
          backgroundColor: pill.color === "navy" ? "rgba(22, 20, 67, 0.08)" : "rgba(246, 134, 31, 0.1)",
          borderColor: pill.color === "navy" ? "rgba(22, 20, 67, 0.12)" : "rgba(246, 134, 31, 0.15)",
          color: pill.color === "navy" ? "rgba(22, 20, 67, 0.65)" : "rgba(246, 134, 31, 0.75)",
        });
      }
    });

    // Set initial states for gap dots
    gapsRef.current.forEach((gap) => {
      if (gap) {
        gsap.set(gap, { opacity: 0.35 });
      }
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // 1. Calendar card lifts up
      tl.to(cardRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 0);

      // 2. Header text sharpens
      tl.to(headerRef.current, {
        opacity: 1,
        duration: 0.3,
      }, 0);

      // 3. Event pills smoothly redistribute, straighten and intensify
      eventPills.forEach((pill) => {
        const el = pillsRef.current[pill.id];
        const inner = pillInnersRef.current[pill.id];
        if (el) {
          tl.to(el, {
            left: `${pill.end.col * 14.2857}%`,
            top: `${pill.end.row * 25}%`,
            duration: 0.6,
            ease: "power3.out",
          }, 0);
        }
        if (inner) {
          tl.to(inner, {
            rotate: 0,
            backgroundColor: pill.color === "navy" ? "rgba(22, 20, 67, 0.22)" : "rgba(246, 134, 31, 0.25)",
            borderColor: pill.color === "navy" ? "rgba(22, 20, 67, 0.35)" : "rgba(246, 134, 31, 0.4)",
            color: pill.color === "navy" ? "rgba(22, 20, 67, 0.95)" : "rgba(246, 134, 31, 1)",
            duration: 0.5,
            ease: "power2.out",
          }, 0);
        }
      });

      // 4. Gap indicators fade out
      gapsRef.current.forEach((gap) => {
        if (gap) {
          tl.to(gap, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
          }, 0);
        }
      });

      // 5. Floating badges pop in with staggered delays
      tl.to(badge1Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, 0.08); // 80ms delay

      tl.to(badge2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, 0.16); // 160ms delay

      tl.to(badge3Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, 0.24); // 240ms delay

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
      className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-6 relative overflow-hidden select-none"
    >
      {/* Calendar Card */}
      <div
        ref={cardRef}
        className="w-[84%] max-w-[260px] bg-white rounded-2xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3 relative z-10"
      >
        {/* Card Header */}
        <div className="flex justify-between items-center mb-2 px-0.5">
          <span
            ref={headerRef}
            className="text-[10px] font-bold text-brand-navy tracking-tight"
          >
            This month
          </span>
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-brand-navy/20"></span>
            <span className="w-1 h-1 rounded-full bg-brand-navy/20"></span>
          </div>
        </div>

        {/* Weekdays Header */}
        <div className="grid grid-cols-7 text-center border-b border-black/[0.03] pb-1 mb-1">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span
              key={i}
              className="text-[8px] font-bold text-brand-navy/30 tracking-wider"
            >
              {d}
            </span>
          ))}
        </div>

        {/* 4x7 Days Grid Container */}
        <div className="relative w-full h-[96px]">
          {/* Background Grid Cells */}
          <div className="grid grid-cols-7 border-t border-l border-black/[0.015] w-full h-full">
            {Array.from({ length: 28 }).map((_, idx) => (
              <div
                key={idx}
                className="relative border-r border-b border-black/[0.015] flex items-start justify-end p-0.5"
              >
                <span className="text-[6px] font-medium text-brand-navy/15">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Empty Week Gaps / Warnings (hidden on hover) */}
          {gapDots.map((gap, i) => (
            <div
              key={i}
              ref={(el) => { gapsRef.current[i] = el; }}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                left: `${gap.col * 14.2857}%`,
                top: `${gap.row * 25}%`,
                width: "14.2857%",
                height: "25%",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shadow-sm shadow-red-400/30" />
            </div>
          ))}

          {/* Event Pills Layer */}
          {eventPills.map((pill) => (
            <div
              key={pill.id}
              ref={(el) => { pillsRef.current[pill.id] = el; }}
              className="absolute flex items-center justify-center p-[2px]"
              style={{
                width: "14.2857%",
                height: "25%",
              }}
            >
              <div
                ref={(el) => { pillInnersRef.current[pill.id] = el; }}
                className="w-full h-full rounded-[4px] border text-[6.5px] font-extrabold flex items-center justify-center tracking-tighter truncate px-0.5 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                {pill.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING ACCENTS */}
      
      {/* 1. "✓ Scheduled" Orange badge - top right */}
      <div
        ref={badge1Ref}
        className="absolute top-[10%] right-[3%] bg-[#f6861f] text-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-[0_4px_12px_rgba(246,134,31,0.25)] flex items-center gap-1 z-20"
      >
        <svg
          className="w-2.5 h-2.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <span>Scheduled</span>
      </div>

      {/* 2. Clock Icon badge - bottom left */}
      <div
        ref={badge2Ref}
        className="absolute bottom-[20%] left-[4%] bg-white border border-black/[0.04] w-7 h-7 rounded-lg flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.06)] z-20"
      >
        <svg
          className="w-3.5 h-3.5 text-brand-navy"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* 3. Streak Card badge - bottom right */}
      <div
        ref={badge3Ref}
        className="absolute bottom-[8%] right-[4%] bg-white border border-black/[0.04] px-2 py-1 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center gap-1 z-20"
      >
        <span className="text-[9px] font-extrabold text-brand-navy tracking-tight whitespace-nowrap">
          4-week streak 🔥
        </span>
      </div>
    </div>
  );
}
