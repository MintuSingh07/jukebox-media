"use client";

import React from "react";

interface Props {
  isHovered: boolean;
}

export default function ConsistencyStrugglesVisual({ isHovered }: Props) {
  return (
    <div className="relative w-full h-full bg-[#f8fafc] flex items-center justify-center overflow-hidden p-6 select-none">
      
      {/* Container for mockups */}
      <div className="relative w-[180px] h-[130px] flex items-center justify-center">
        
        {/* Touchpoint 1: Email Newsletter Mockup */}
        <div
          className={`absolute w-[125px] h-[80px] rounded-xl border p-2 flex flex-col justify-between shadow-md transition-all duration-500 ease-out ${
            isHovered
              ? "bg-[#161443] border-[#161443]/10 -translate-x-6 -translate-y-5 rotate-0 scale-95 z-10 opacity-70"
              : "bg-[#fff6e6] border-[#f2dcb3] -translate-x-12 -translate-y-2 -rotate-12 z-10 opacity-80"
          }`}
        >
          {/* Email Header */}
          <div className="flex items-center justify-between pb-1 border-b border-white/10">
            <div className="flex items-center gap-1">
              {/* Logo icon */}
              <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                isHovered ? "bg-[#f6861f]" : "bg-red-400"
              }`} />
              {/* Sender Name */}
              <div className={`h-1 rounded-full transition-all duration-500 bg-current ${
                isHovered ? "w-8 text-white/40" : "w-10 text-gray-500/40"
              }`} />
            </div>
            <div className="w-4 h-1 rounded-full bg-current opacity-20" />
          </div>
          {/* Email Body Hero Area */}
          <div className="flex-1 flex items-center justify-center my-1 rounded bg-black/10">
            <div className={`h-2 rounded transition-all duration-500 bg-current ${
              isHovered ? "w-12 text-[#f6861f]" : "w-8 text-[#bfa16f]"
            }`} />
          </div>
          {/* Email Footer line */}
          <div className={`h-0.5 w-6 rounded-full self-center bg-current opacity-30`} />
        </div>

        {/* Touchpoint 2: Social Post Mockup (Front/Center) */}
        <div
          className={`absolute w-[105px] h-[105px] rounded-xl border p-2 flex flex-col justify-between shadow-xl transition-all duration-500 ease-out ${
            isHovered
              ? "bg-white border-black/[0.04] translate-x-0 translate-y-0 rotate-0 scale-105 z-30 opacity-100"
              : "bg-[#e3ecfc] border-[#c5d8f6] translate-y-2 rotate-2 z-20 opacity-95"
          }`}
        >
          {/* Post Header */}
          <div className="flex items-center gap-1.5 pb-1">
            <div className={`w-3.5 h-3.5 rounded-full transition-colors duration-500 ${
              isHovered ? "bg-[#161443]" : "bg-blue-400"
            }`} />
            <div className="flex flex-col gap-0.5">
              <div className={`h-1 rounded-full transition-all duration-500 bg-current ${
                isHovered ? "w-8 text-black/50" : "w-6 text-blue-900/40"
              }`} />
              <div className="w-4 h-0.5 rounded-full bg-black/10" />
            </div>
          </div>
          {/* Post Image Container */}
          <div className="flex-1 relative rounded overflow-hidden flex items-center justify-center my-1 bg-black/[0.03] border border-black/[0.02]">
            {/* Visual art representation inside post */}
            <div className={`w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
              isHovered ? "bg-[#f6861f]/10 border border-[#f6861f]/20 text-[#f6861f]" : "bg-blue-500/10 border border-blue-500/20 text-blue-500"
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          </div>
          {/* Post Actions (Like/Comment) */}
          <div className="flex justify-between items-center pt-0.5">
            <div className="flex gap-1">
              <div className={`w-2.5 h-2.5 rounded-full bg-current opacity-20`} />
              <div className={`w-2.5 h-2.5 rounded-full bg-current opacity-20`} />
            </div>
            <div className="w-5 h-1 rounded-full bg-black/10" />
          </div>
        </div>

        {/* Touchpoint 3: Business Card Mockup */}
        <div
          className={`absolute w-[125px] h-[80px] rounded-xl border p-2.5 flex flex-col justify-between shadow-md transition-all duration-500 ease-out ${
            isHovered
              ? "bg-[#161443] border-[#161443]/10 translate-x-6 -translate-y-5 rotate-0 scale-95 z-10 opacity-70"
              : "bg-[#fceae8] border-[#ebd1cf] translate-x-12 -translate-y-2 rotate-12 z-10 opacity-80"
          }`}
        >
          {/* Logo Brand Name */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded transition-colors duration-500 ${
              isHovered ? "bg-[#f6861f]" : "bg-green-400"
            }`} />
            <div className={`h-1.5 rounded-full transition-all duration-500 bg-current ${
              isHovered ? "w-6 text-white/50" : "w-8 text-gray-500/50"
            }`} />
          </div>
          {/* Business Card Info */}
          <div className="flex flex-col gap-1 mt-auto">
            <div className={`h-1.5 rounded-full transition-all duration-500 bg-current ${
              isHovered ? "w-12 text-white" : "w-10 text-gray-600"
            }`} />
            <div className={`h-1 rounded-full transition-all duration-500 bg-current ${
              isHovered ? "w-8 text-[#f6861f]" : "w-6 text-green-500"
            }`} />
          </div>
        </div>

      </div>

      {/* Floating Accent Badge: "Unified ✓" */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#f6861f] text-white text-[9px] font-extrabold px-3 py-1 rounded-full shadow-[0_4px_12px_rgba(246,134,31,0.25)] transition-all duration-500 ease-out flex items-center gap-1 z-40 ${
          isHovered
            ? "opacity-100 scale-100 translate-y-0 delay-300"
            : "opacity-0 scale-90 translate-y-2 pointer-events-none"
        }`}
      >
        <svg
          className="w-2.5 h-2.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        <span>Unified</span>
      </div>
    </div>
  );
}
