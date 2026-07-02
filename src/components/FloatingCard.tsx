"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FloatingCardProps {
  avatarUrl: string;
  name: string;
  startDate: string;
  weekText: string;
  progressPercent: number; // 0 to 100
  animationClass?: string; // e.g. 'animate-float-slow', 'animate-float-medium'
  className?: string;
}

export default function FloatingCard({
  avatarUrl,
  name,
  startDate,
  weekText,
  progressPercent,
  animationClass = "animate-float-slow",
  className = "",
}: FloatingCardProps) {
  const [width, setWidth] = useState(0);

  // Animate the progress bar width on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(progressPercent);
    }, 300);
    return () => clearTimeout(timer);
  }, [progressPercent]);

  return (
    <div
      className={`group absolute rounded-2xl border border-[#161443]/[0.04] bg-white p-4 shadow-premium transition-all duration-500 hover:scale-[1.02] hover:shadow-card-hover ${animationClass} ${className}`}
      style={{ width: "240px" }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#161443]/[0.04]">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="40px"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 leading-tight">
          <h4 className="truncate text-[14px] font-semibold text-[#161443] tracking-tight">
            {name}
          </h4>
          <p className="truncate text-[10px] font-medium text-[#161443]/50 mt-0.5">
            {startDate}
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-4 pt-3 border-t border-[#161443]/[0.04]">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#161443]/70">
          <span>{weekText}</span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-[#161443]/[0.03] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#161443] transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
