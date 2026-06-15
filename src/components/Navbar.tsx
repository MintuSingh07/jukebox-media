"use client";

import React, { useState, forwardRef, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  activeTab?: string;
  onTabClick?: (tabName: string) => void;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  const { activeTab: propActiveTab, onTabClick, className, ...rest } = props;
  const [localActiveTab, setLocalActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeTab = propActiveTab !== undefined ? propActiveTab : localActiveTab;
  const navContainerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const updatePosition = (immediate = false) => {
      const activeEl = navContainerRef.current?.querySelector(".active-nav-btn") as HTMLButtonElement;
      if (activeEl && bubbleRef.current) {
        const targetLeft = activeEl.offsetLeft;
        const targetWidth = activeEl.offsetWidth;
        const targetHeight = activeEl.offsetHeight;
        const targetTop = activeEl.offsetTop;

        if (immediate) {
          gsap.set(bubbleRef.current, {
            left: targetLeft,
            width: targetWidth,
            height: targetHeight,
            top: targetTop,
            opacity: 1,
          });
        } else {
          gsap.to(bubbleRef.current, {
            left: targetLeft,
            width: targetWidth,
            height: targetHeight,
            top: targetTop,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      } else if (bubbleRef.current) {
        if (immediate) {
          gsap.set(bubbleRef.current, { opacity: 0 });
        } else {
          gsap.to(bubbleRef.current, {
            opacity: 0,
            duration: 0.3,
            overwrite: "auto",
          });
        }
      }
    };

    if (isFirstRender.current) {
      updatePosition(true);
      isFirstRender.current = false;
    } else {
      updatePosition(false);
    }

    const handleResize = () => updatePosition(true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeTab]);

  const handleTabClick = (name: string) => {
    if (onTabClick) {
      onTabClick(name);
    } else {
      setLocalActiveTab(name);
    }
  };

  return (
    <header
      ref={ref}
      {...rest}
      className={`fixed z-50 bg-white/40 backdrop-blur-sm ${className || ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("home");
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative transition-transform duration-300 group-hover:scale-105">
            {/* Custom SVG Vinyl Record Logo matching Jukebox Media */}
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#10143b" stroke="#e8801a" strokeWidth="4.5"/>
              <path d="M22 50C22 34.5 34.5 22 50 22" stroke="#e8801a" strokeWidth="3" strokeLinecap="round"/>
              <path d="M28 50C28 37.8 37.8 28 50 28" stroke="#e8801a" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M34 50C34 41.2 41.2 34 50 34" stroke="#e8801a" strokeWidth="2" strokeLinecap="round"/>
              <path d="M78 50C78 65.5 65.5 78 50 78" stroke="#e8801a" strokeWidth="3" strokeLinecap="round"/>
              <path d="M72 50C72 62.2 62.2 72 50 72" stroke="#e8801a" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M66 50C66 58.8 58.8 66 50 66" stroke="#e8801a" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="50" cy="50" r="18" fill="#e8801a"/>
              <polygon points="46,42 46,58 60,50" fill="#10143b"/>
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold tracking-tight text-[18px] text-brand-navy">
              Jukebox
            </span>
            <span className="font-semibold tracking-[0.15em] text-[11px] text-brand-navy/70 uppercase mt-0.5">
              media
            </span>
          </div>
        </a>

        {/* Center Pill Navigation Dock */}
        <nav ref={navContainerRef} className="relative hidden lg:flex items-center gap-0.5 rounded-full border border-brand-navy/[0.04] bg-white/75 p-1 backdrop-blur-md shadow-premium">
          {/* Sliding Active Bubble */}
          <div
            ref={bubbleRef}
            className="absolute bg-[#11143B] rounded-full shadow-[0_2px_6px_rgba(17,20,59,0.15)] z-0"
            style={{ opacity: 0 }}
          />
          {[
            { name: "Home", id: "home" },
            { name: "Situation", id: "problem" },
            { name: "Services", id: "service" },
            { name: "Process", id: "blueprint" },
            { name: "Sectors", id: "industries" },
            { name: "About", id: "about" },
            { name: "Results", id: "testimonial" },
            { name: "Partnership", id: "partnership" },
          ].map((item) => {
            const isActive = activeTab.toLowerCase() === item.id.toLowerCase();
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(item.id);
                }}
                className={`relative px-3.5 py-1.5 text-[13px] font-bold rounded-full transition-colors duration-300 cursor-pointer z-10 ${
                  isActive
                    ? "text-white active-nav-btn"
                    : "text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/[0.03]"
                }`}
              >
                <span className="flex items-center gap-1">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Let's Talk CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-brand-navy-light hover:shadow-premium"
          >
            Let's Talk
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-brand-orange">
              ↗
            </span>
          </Link>

          {/* Hamburger toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-full border border-brand-navy/10 bg-white/80 shadow-premium cursor-pointer z-50 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-4">
              <span className={`absolute left-0 right-0 h-0.5 bg-brand-navy rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 right-0 h-0.5 bg-brand-navy rounded-full transition-all duration-300 top-1.5 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"}`} />
              <span className={`absolute left-0 right-0 h-0.5 bg-brand-navy rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-navy/30 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Card */}
          <div
            className={`absolute top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-brand-navy border-l border-white/10 shadow-2xl flex flex-col p-8 transition-transform duration-500 ease-out z-10 ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#e8801a" stroke="#ffffff" strokeWidth="4.5"/>
                  <circle cx="50" cy="50" r="18" fill="#10143b"/>
                  <polygon points="46,42 46,58 60,50" fill="#ffffff"/>
                </svg>
                <span className="font-extrabold text-white text-[18px] tracking-tight">Menu</span>
              </div>
            </div>

            <nav className="flex flex-col gap-4">
              {[
                { name: "Home", id: "home" },
                { name: "Situation", id: "problem" },
                { name: "Services", id: "service" },
                { name: "Process", id: "blueprint" },
                { name: "Sectors", id: "industries" },
                { name: "About", id: "about" },
                { name: "Results", id: "testimonial" },
                { name: "Partnership", id: "partnership" },
              ].map((item) => {
                const isActive = activeTab.toLowerCase() === item.id.toLowerCase();
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left py-2.5 px-4 rounded-xl text-[15px] font-bold transition-all duration-300 w-full ${
                      isActive
                        ? "bg-[#e8801a] text-white shadow-[0_4px_12px_rgba(232,128,26,0.3)]"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10">
              <Link
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#e8801a] py-3 text-[14px] font-bold text-white transition-all duration-300 hover:bg-[#d67215]"
              >
                Let's Talk
                <span>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
