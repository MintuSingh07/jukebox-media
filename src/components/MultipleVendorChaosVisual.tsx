"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  isHovered: boolean;
}

export default function MultipleVendorChaosVisual({ isHovered }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const message1Ref = useRef<HTMLDivElement>(null);
  const message2Ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // 1. Set initial GSAP positions on mount
    gsap.set(phoneRef.current, { y: 32 });
    gsap.set(logoRef.current, {
      opacity: 0,
      scale: 0.5,
      y: 16,
      x: 8,
    });
    gsap.set(message1Ref.current, {
      opacity: 0,
      scale: 0.75,
      x: 16,
      y: 8,
    });
    gsap.set(message2Ref.current, {
      opacity: 0,
      scale: 0.75,
      x: -16,
      y: 8,
    });

    // 2. Create the timeline ONCE on mount
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // Phone slides up smoothly
      tl.to(phoneRef.current, {
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      }, 0);

      // Floating Jukebox logo pops in
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
        duration: 0.5,
        ease: "back.out(1.4)",
      }, 0.08);

      // Message 1 (orange bubble) pops out to the left
      tl.to(message1Ref.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.2)",
      }, 0.16);

      // Message 2 (blue bubble) pops out to the right
      tl.to(message2Ref.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.2)",
      }, 0.24);

      tlRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3. Control play/reverse smoothly when isHovered changes
  useEffect(() => {
    if (tlRef.current) {
      if (isHovered) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse();
      }
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 select-none pointer-events-none"
    >
      {/* Clipped Phone Container (bounds phone mockup to card area) */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden flex justify-center">
        {/* iPhone Chassis Mockup with overflow-hidden to clip the screen content */}
        <div
          ref={phoneRef}
          className="absolute top-6 w-[180px] md:w-[150px] h-[320px] bg-slate-900 rounded-[2.2rem] border-[4.5px] border-slate-950 shadow-[0_15px_35px_rgba(0,0,0,0.15)] flex flex-col z-10 pointer-events-auto overflow-hidden"
        >
          {/* Dynamic Island Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[52px] h-[13px] bg-black rounded-full z-30" />

          {/* Time & Status bar details (iOS style) */}
          <div className="h-6 pt-2 px-3.5 flex justify-between items-center text-[7.5px] font-bold text-slate-800 bg-white border-b border-slate-100/40 z-20">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              {/* Cellular */}
              <svg className="w-1.5 h-1.5 fill-slate-800" viewBox="0 0 24 24">
                <rect x="2" y="16" width="3" height="5" rx="0.5" />
                <rect x="7" y="12" width="3" height="9" rx="0.5" />
                <rect x="12" y="8" width="3" height="13" rx="0.5" />
                <rect x="17" y="4" width="3" height="17" rx="0.5" />
              </svg>
              {/* Wifi */}
              <svg className="w-1.5 h-1.5 stroke-slate-800" viewBox="0 0 24 24" fill="none" strokeWidth="3">
                <path d="M12 21a1 1 0 110-2 1 1 0 010 2zM4.8 11.2a10 10 0 0114.4 0m-11.5 3.3a6 6 0 018.6 0" strokeLinecap="round" />
              </svg>
              {/* Battery */}
              <div className="w-3.5 h-1.5 rounded-[2px] border border-slate-800 p-[1px] flex items-center">
                <div className="w-[85%] h-full bg-slate-800 rounded-[0.5px]" />
              </div>
            </div>
          </div>

          {/* Messaging Interface Mockup (Light Theme) */}
          <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden text-slate-800">
            {/* iOS Navigation Bar */}
            <div className="px-3 py-1.5 border-b border-slate-200/60 bg-white/95 backdrop-blur flex items-center justify-between">
              <div className="flex items-center gap-1">
                <svg className="w-2.5 h-2.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="text-[7.5px] font-medium text-blue-500">Filters</span>
              </div>
              <span className="text-[8.5px] font-bold text-slate-900 pr-3">Messages</span>
              <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>

            {/* Chat list representing multiple chaotic vendors */}
            <div className="flex-1 p-1.5 flex flex-col gap-1.5 overflow-hidden">
              
              {/* Vendor Thread 1 */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[7.5px] font-bold text-orange-600 flex-shrink-0">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[7px] font-bold text-slate-900 truncate">Ad Agency</span>
                    <span className="text-[5px] text-slate-400">10:42 AM</span>
                  </div>
                  <p className="text-[6px] text-slate-500 truncate mt-0.5">Need copy approval for launch!</p>
                </div>
              </div>

              {/* Vendor Thread 2 */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[7.5px] font-bold text-blue-600 flex-shrink-0">
                  MB
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[7px] font-bold text-slate-900 truncate">Media Buyer</span>
                    <span className="text-[5px] text-slate-400">10:38 AM</span>
                  </div>
                  <p className="text-[6px] text-slate-500 truncate mt-0.5">Where is the updated tracking code?</p>
                </div>
              </div>

              {/* Vendor Thread 3 */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[7.5px] font-bold text-emerald-600 flex-shrink-0">
                  PR
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[7px] font-bold text-slate-900 truncate">PR Specialist</span>
                    <span className="text-[5px] text-slate-400">10:15 AM</span>
                  </div>
                  <p className="text-[6px] text-slate-500 truncate mt-0.5">The press release copy has changed.</p>
                </div>
              </div>

              {/* Vendor Thread 4 */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] opacity-60">
                <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[7.5px] font-bold text-purple-600 flex-shrink-0">
                  SE
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[7px] font-bold text-slate-900 truncate">SEO Lead</span>
                    <span className="text-[5px] text-slate-400">Yesterday</span>
                  </div>
                  <p className="text-[6px] text-slate-500 truncate mt-0.5">Waiting on keywords report...</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements Container (Outside of overflow wrapper so items can pop out of the box boundaries) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[180px] md:w-[150px] h-[320px] pointer-events-none z-20">
        
        {/* Floating Custom Jukebox Vinyl Logo (Top-left of the phone) */}
        <div
          ref={logoRef}
          className="absolute -top-4 -left-6 w-[52px] md:w-[44px] h-[52px] md:h-[44px] z-30 pointer-events-auto transition-transform duration-300 hover:scale-110 hover:-rotate-12 cursor-pointer group"
        >
          {/* Custom Vinyl SVG matching Jukebox branding */}
          <svg className="w-full h-full drop-shadow-lg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#161443" stroke="#f6861f" strokeWidth="4.5"/>
            <path d="M22 50C22 34.5 34.5 22 50 22" stroke="#f6861f" strokeWidth="3" strokeLinecap="round"/>
            <path d="M28 50C28 37.8 37.8 28 50 28" stroke="#f6861f" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M34 50C34 41.2 41.2 34 50 34" stroke="#f6861f" strokeWidth="2" strokeLinecap="round"/>
            <path d="M78 50C78 65.5 65.5 78 50 78" stroke="#f6861f" strokeWidth="3" strokeLinecap="round"/>
            <path d="M72 50C72 62.2 62.2 72 50 72" stroke="#f6861f" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M66 50C66 58.8 58.8 66 50 66" stroke="#f6861f" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="50" cy="50" r="18" fill="#f6861f"/>
            <polygon points="46,42 46,58 60,50" fill="#161443"/>
          </svg>
        </div>

        {/* Message 1 (orange accent) - Floats to the left, out of the card boundaries */}
        <div
          ref={message1Ref}
          className="absolute top-[22%] -left-[105px] md:-left-[95px] w-[170px] md:w-[145px] bg-white/95 backdrop-blur-sm border border-orange-100 shadow-[0_8px_30px_rgba(246,134,31,0.12)] rounded-2xl p-2.5 flex items-start gap-2 pointer-events-auto transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[9px] font-bold text-orange-600 flex-shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-orange-950 truncate">Agency A</span>
              <span className="text-[7px] text-orange-500/80">10:42 AM</span>
            </div>
            <p className="text-[8px] leading-tight text-orange-800 mt-0.5">Need copy feedback asap!</p>
          </div>
          {/* Pointed Speech Bubble Tail */}
          <div className="absolute bottom-[-5px] right-[16px] w-2.5 h-2.5 bg-white border-r border-b border-orange-100 rotate-45 pointer-events-none" />
        </div>

        {/* Message 2 (blue accent) - Floats to the right, out of the card boundaries */}
        <div
          ref={message2Ref}
          className="absolute top-[42%] -right-[105px] md:-right-[95px] w-[170px] md:w-[145px] bg-white/95 backdrop-blur-sm border border-blue-100 shadow-[0_8px_30px_rgba(59,130,246,0.12)] rounded-2xl p-2.5 flex items-start gap-2 pointer-events-auto transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[9px] font-bold text-blue-600 flex-shrink-0">
            B
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold text-blue-950 truncate">Buyer B</span>
              <span className="text-[7px] text-blue-500/80">10:45 AM</span>
            </div>
            <p className="text-[8px] leading-tight text-blue-800 mt-0.5">Wait, where is the link?</p>
          </div>
          {/* Pointed Speech Bubble Tail */}
          <div className="absolute bottom-[-5px] left-[16px] w-2.5 h-2.5 bg-white border-l border-b border-blue-100 rotate-45 pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
