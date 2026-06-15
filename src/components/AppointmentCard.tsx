"use client";

import React, { useRef, useState, useEffect } from "react";

export default function AppointmentCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [formattedDateTime, setFormattedDateTime] = useState("");

  useEffect(() => {
    const now = new Date();
    // Format Time: h:mm A
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const timeStr = `${hours}:${minutes} ${ampm}`;

    // Format Date: D MMM
    const day = now.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthStr = monthNames[now.getMonth()];

    setFormattedDateTime(`${timeStr}, ${day} ${monthStr}`);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Normalize coordinates
    setCoords({ x: x / (rect.width / 2), y: y / (rect.height / 2) });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const tiltStyle = isHovered
    ? {
        transform: `perspective(1000px) rotateX(${-coords.y * 10}deg) rotateY(${
          coords.x * 10
        }deg) scale3d(1.05, 1.05, 1.05)`,
        transition: "transform 0.1s ease-out, box-shadow 0.2s ease",
      }
    : {
        transform: "perspective(1000px) rotate(-6deg)",
        transition: "transform 0.5s ease-out, box-shadow 0.3s ease",
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="absolute z-20 left-[48%] top-[35%] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl border border-brand-navy/[0.04] bg-white shadow-premium overflow-hidden select-none"
    >
      <div className="w-[190px]">
        {/* Top Orange Container */}
        <div className="bg-brand-orange p-3.5 pb-4 text-white leading-tight">
          <p className="text-[10px] font-medium text-white/80">
            Discovery Call with
          </p>
          <h4 className="text-[15px] font-semibold mt-0.5 tracking-tight">
            Ankit Jani
          </h4>
        </div>

        {/* Bottom Details Container */}
        <div className="p-3 bg-white flex flex-col gap-2">
          {/* Tags */}
          <div className="flex gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-brand-navy/[0.06] bg-brand-navy/[0.03] text-[9px] font-semibold text-brand-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]"></span>
              Strategy
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-brand-navy/[0.06] bg-brand-navy/[0.03] text-[9px] font-semibold text-brand-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
              Growth
            </span>
          </div>

          {/* Time/Date */}
          <div className="flex items-center gap-1.5 text-[9.5px] font-semibold text-brand-navy/70 mt-1">
            {/* Calendar SVG */}
            <svg
              className="h-3.5 w-3.5 text-brand-orange"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>{formattedDateTime || "12:00 PM, 7 Oct"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
