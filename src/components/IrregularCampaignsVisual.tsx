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

  const badgeRef = useRef<HTMLDivElement>(null);
  const conflictFlash1Ref = useRef<HTMLDivElement>(null);
  const conflictFlash2Ref = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const eventPills = [
    {
      id: 0,
      label: "Campaign A",
      start: { col: 0, row: 2 },
      end: { col: 1, row: 2 },
      color: "navy",
      startRotation: -3,
      endRotation: -18,
    },
    {
      id: 1,
      label: "Social Ad",
      start: { col: 2, row: 2 },
      end: { col: 1.4, row: 2 },
      color: "orange",
      startRotation: 4,
      endRotation: 15,
    },
    {
      id: 2,
      label: "Newsletter",
      start: { col: 3, row: 2 },
      end: { col: 2, row: 2 },
      color: "navy",
      startRotation: -2,
      endRotation: -12,
    },
    {
      id: 3,
      label: "PR Launch",
      start: { col: 5, row: 2 },
      end: { col: 2.5, row: 2 },
      color: "orange",
      startRotation: 3,
      endRotation: 20,
    },
  ];

  const gapDots = [
    { col: 3, row: 0, isExtra: false },
    { col: 2, row: 1, isExtra: false },
    { col: 3, row: 3, isExtra: false },
    { col: 1, row: 0, isExtra: true },
    { col: 5, row: 1, isExtra: true },
    { col: 1, row: 3, isExtra: true },
    { col: 5, row: 3, isExtra: true },
  ];

  // Build timeline ONCE on mount
  useEffect(() => {
    // Set initial GSAP states
    gsap.set(cardRef.current, { y: 20 });
    gsap.set(headerRef.current, { opacity: 0.45 });
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.6, y: 15 });
    gsap.set([conflictFlash1Ref.current, conflictFlash2Ref.current], {
      opacity: 0,
    });

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
          rotate: pill.startRotation,
          backgroundColor:
            pill.color === "navy"
              ? "rgba(22, 20, 67, 0.08)"
              : "rgba(246, 134, 31, 0.1)",
          borderColor:
            pill.color === "navy"
              ? "rgba(22, 20, 67, 0.12)"
              : "rgba(246, 134, 31, 0.15)",
          color:
            pill.color === "navy"
              ? "rgba(22, 20, 67, 0.65)"
              : "rgba(246, 134, 31, 0.75)",
        });
      }
    });

    gapDots.forEach((gap, i) => {
      const el = gapsRef.current[i];
      if (el) {
        if (gap.isExtra) {
          gsap.set(el, { opacity: 0, scale: 0 });
        } else {
          gsap.set(el, { opacity: 0.35, scale: 1 });
        }
      }
    });

    // Build the master timeline (paused)
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

    // 1. Calendar card lifts up
    tl.to(cardRef.current, { y: 0, duration: 0.5 }, 0);

    // 2. Header sharpens
    tl.to(headerRef.current, { opacity: 1, duration: 0.3 }, 0);

    // 3. Pills cluster tighter and rotate wildly
    eventPills.forEach((pill) => {
      const el = pillsRef.current[pill.id];
      const inner = pillInnersRef.current[pill.id];
      if (el) {
        tl.to(
          el,
          {
            left: `${pill.end.col * 14.2857}%`,
            top: `${pill.end.row * 25}%`,
            duration: 0.55,
            ease: "power3.out",
          },
          0
        );
      }
      if (inner) {
        const isConflict = pill.id === 1 || pill.id === 3;
        tl.to(
          inner,
          {
            rotate: pill.endRotation,
            borderColor: isConflict
              ? "rgba(239, 68, 68, 0.7)"
              : pill.color === "navy"
                ? "rgba(22, 20, 67, 0.25)"
                : "rgba(246, 134, 31, 0.3)",
            backgroundColor: isConflict
              ? "rgba(239, 68, 68, 0.08)"
              : pill.color === "navy"
                ? "rgba(22, 20, 67, 0.12)"
                : "rgba(246, 134, 31, 0.14)",
            color:
              pill.color === "navy"
                ? "rgba(22, 20, 67, 0.85)"
                : "rgba(246, 134, 31, 0.95)",
            scale: isConflict ? 1.05 : 1,
            duration: 0.5,
          },
          0
        );
      }
    });

    // 4. Warning dots grow / new ones appear
    gapDots.forEach((gap, i) => {
      const el = gapsRef.current[i];
      if (!el) return;
      if (gap.isExtra) {
        tl.to(el, { opacity: 0.6, scale: 1, duration: 0.35, ease: "back.out(1.5)" }, 0.1 + i * 0.04);
      } else {
        tl.to(el, { opacity: 0.8, scale: 1.6, duration: 0.4 }, 0);
      }
    });

    // 5. Conflict flash overlays
    tl.to(conflictFlash1Ref.current, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.15);
    tl.to(conflictFlash2Ref.current, { opacity: 1, duration: 0.3, ease: "power1.out" }, 0.22);

    // 6. Red warning badge
    tl.to(badgeRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, 0.12);

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

          {/* Empty Week Gaps / Warning Dots */}
          {gapDots.map((gap, i) => (
            <div
              key={i}
              ref={(el) => {
                gapsRef.current[i] = el;
              }}
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

          {/* Conflict Flash Overlays */}
          <div
            ref={conflictFlash1Ref}
            className="absolute pointer-events-none flex items-center justify-center z-20"
            style={{
              left: `${1.2 * 14.2857}%`,
              top: `${2 * 25}%`,
              width: "14.2857%",
              height: "25%",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500/20 animate-ping" />
          </div>
          <div
            ref={conflictFlash2Ref}
            className="absolute pointer-events-none flex items-center justify-center z-20"
            style={{
              left: `${2.3 * 14.2857}%`,
              top: `${2 * 25}%`,
              width: "14.2857%",
              height: "25%",
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/25 animate-ping" />
          </div>

          {/* Event Pills Layer */}
          {eventPills.map((pill) => (
            <div
              key={pill.id}
              ref={(el) => {
                pillsRef.current[pill.id] = el;
              }}
              className="absolute flex items-center justify-center p-[2px] z-10"
              style={{
                width: "14.2857%",
                height: "25%",
              }}
            >
              <div
                ref={(el) => {
                  pillInnersRef.current[pill.id] = el;
                }}
                className="w-full h-full rounded-[4px] border text-[6.5px] font-extrabold flex items-center justify-center tracking-tighter truncate px-0.5 select-none shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                {pill.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING ACCENT: Red Warning Badge */}
      <div
        ref={badgeRef}
        className="absolute top-[10%] right-[3%] bg-red-500 text-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-[0_4px_12px_rgba(239,68,68,0.3)] flex items-center gap-1 z-20"
      >
        <span className="text-[10px]">❌</span>
        <span>No Cadence</span>
      </div>
    </div>
  );
}
