"use client";

import React from "react";
import Image from "next/image";

interface DoctorBadgeProps {
  avatarUrl: string;
  name: string;
  role: string;
  theme: "navy" | "orange" | "white";
  pointerPosition: "top-left" | "top-right";
  animationClass?: string;
  className?: string;
  delayMs?: number;
}

export default function DoctorBadge({
  avatarUrl,
  name,
  role,
  theme,
  pointerPosition,
  animationClass = "animate-float-medium",
  className = "",
  delayMs = 0,
}: DoctorBadgeProps) {
  const bgClass = 
    theme === "navy" 
      ? "bg-[#161443] text-white" 
      : theme === "orange" 
        ? "bg-brand-orange text-white" 
        : "bg-white text-[#161443]";

  const textRoleClass = 
    theme === "navy" 
      ? "text-brand-orange-light" 
      : theme === "orange" 
        ? "text-brand-peach" 
        : "text-[#161443]/60";

  const borderClass = 
    theme === "navy" 
      ? "border-[#161443]/40" 
      : theme === "orange" 
        ? "border-brand-orange-light/40" 
        : "border-[#161443]/10";

  // Cursor pointing direction
  const isLeftPointer = pointerPosition === "top-left";
  const rippleColorClass = 
    theme === "navy" 
      ? "border-[#161443]/40 bg-[#161443]/10" 
      : theme === "orange" 
        ? "border-[#f6861f]/40 bg-[#f6861f]/10" 
        : "border-white/40 bg-white/10";
  const delayStyle = delayMs ? { animationDelay: `${delayMs}ms` } : undefined;

  return (
    <div className={`absolute flex items-center ${animationClass} ${className}`}>
      {/* Badge Pill Container */}
      <div
        className={`flex items-center gap-3.5 rounded-full h-[56px] pl-2.5 overflow-hidden shadow-premium border transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-card-hover ${bgClass} ${borderClass} animate-badge-reveal`}
        style={{ width: "fit-content", ...delayStyle }}
      >
        {/* Avatar */}
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/10">
          <Image
            src={avatarUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>

        {/* Text */}
        <div className="leading-tight pr-1 whitespace-nowrap animate-text-reveal" style={delayStyle}>
          <h5 className="text-[13px] font-semibold tracking-tight">{name}</h5>
          <p className={`text-[10px] font-medium ${textRoleClass} mt-0.5`}>
            {role}
          </p>
        </div>
      </div>

      {/* Click Ripple Effect */}
      <div
        className={`absolute -top-3.5 ${
          isLeftPointer ? "-left-4.5" : "-right-4.5"
        } h-3 w-3 pointer-events-none z-0`}
      >
        <span className={`absolute inset-0 rounded-full border-2 opacity-0 animate-click-ripple-1 ${rippleColorClass}`} style={delayStyle}></span>
        <span className={`absolute inset-0 rounded-full border-2 opacity-0 animate-click-ripple-2 ${rippleColorClass}`} style={delayStyle}></span>
        <span className={`absolute inset-0 rounded-full border-2 opacity-0 animate-click-ripple-3 ${rippleColorClass}`} style={delayStyle}></span>
      </div>

      {/* Cursor Pointer Arrow */}
      <div
        className={`absolute -top-3 ${
          isLeftPointer ? "-left-4 animate-cursor-click-left" : "-right-4 animate-cursor-click-right"
        } pointer-events-none z-20`}
        style={delayStyle}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_2px_4px_rgba(16,20,59,0.15)]"
        >
          <path
            d="M4 4C3.7 4 3.4 4.3 3.6 4.7L9.5 20.5C9.9 21.6 11.4 21.3 11.6 20.1L12.5 13.5L19.1 12.6C20.3 12.4 20.6 10.9 19.5 10.5L4.7 3.6C4.4 3.5 4.2 3.8 4 4Z"
            fill={theme === "navy" ? "#161443" : theme === "orange" ? "#f6861f" : "#161443"}
            stroke="white"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
