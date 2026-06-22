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

  const activeTab =
    propActiveTab !== undefined ? propActiveTab : localActiveTab;
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
      const activeEl = navContainerRef.current?.querySelector(
        ".active-nav-btn",
      ) as HTMLButtonElement;
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

  useEffect(() => {
    const handleOpenFormEvent = () => {
      window.open(`https://wa.me/919998526134?text=${encodeURIComponent("Hi Jukebox Media! I would like to connect.")}`, "_blank");
    };
    window.addEventListener("openContactForm", handleOpenFormEvent);
    return () => {
      window.removeEventListener("openContactForm", handleOpenFormEvent);
    };
  }, []);

  const handleTabClick = (name: string) => {
    if (onTabClick) {
      onTabClick(name);
    } else {
      setLocalActiveTab(name);
    }
  };

  return (
    <header ref={ref} {...rest} className={`fixed z-50 ${className || ""}`}>
      <div className="mx-auto flex max-w-[1550px] w-full items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleTabClick("home");
          }}
          className="flex items-center group cursor-pointer"
        >
          <img
            src="/final logo-TM.png"
            alt="Jukebox Media"
            className="h-10 md:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Center Pill Navigation Dock */}
        <nav
          ref={navContainerRef}
          className="relative hidden xl:flex items-center gap-0.5 rounded-full p-1 bg-brand-navy/[0.02]"
        >
          {/* Sliding Active Bubble */}
          <div
            ref={bubbleRef}
            className="absolute bg-[#161443] rounded-full shadow-[0_2px_6px_rgba(22,20,67,0.15)] z-0"
            style={{ opacity: 0 }}
          />
          {[
            { name: "Home", id: "home" },
            { name: "Leadership", id: "about" },
            { name: "Brands", id: "brands" },
            { name: "Common Problem", id: "problem" },
            { name: "Jukebox Solution", id: "service" },
            { name: "Jukebox Method", id: "blueprint" },
            { name: "Who we work with", id: "industries" },
            { name: "Our Reviews", id: "testimonial" },
            { name: "Pricing", id: "pricing" },
            { name: "Jukebox Brand Film", id: "brand-film" },
          ].map((item) => {
            const isActive = activeTab.toLowerCase() === item.id.toLowerCase();
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(item.id);
                }}
                className={`relative px-3.5 py-1.5 text-[13px] font-semibold rounded-full transition-colors duration-300 cursor-pointer z-10 ${
                  isActive
                    ? "text-white active-nav-btn"
                    : "text-brand-navy/70 hover:text-brand-navy hover:bg-brand-navy/[0.03]"
                }`}
              >
                <span className="flex items-center gap-1">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* WhatsApp Us CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3 relative">
          <a
            href={`https://wa.me/919998526134?text=${encodeURIComponent("Hi Jukebox Media! I would like to connect.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="lets-talk-btn group hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-[14px] font-medium text-white transition-all duration-300 hover:bg-brand-navy-light hover:shadow-premium cursor-pointer"
          >
            WhatsApp Us
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-brand-orange">
              ↗
            </span>
          </a>

          {/* Hamburger toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-full border border-brand-navy/10 bg-white/80 shadow-premium cursor-pointer z-50 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 right-0 h-0.5 bg-brand-navy rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-brand-navy rounded-full transition-all duration-300 top-1.5 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-brand-navy rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-500 xl:hidden ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
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
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="#f6861f"
                    stroke="#ffffff"
                    strokeWidth="4.5"
                  />
                  <circle cx="50" cy="50" r="18" fill="#161443" />
                  <polygon points="46,42 46,58 60,50" fill="#ffffff" />
                </svg>
                <span className="font-bold text-white text-[18px] tracking-tight">
                  Menu
                </span>
              </div>
            </div>

            <nav className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] scrollbar-none">
              {[
                { name: "Home", id: "home" },
                { name: "Leadership", id: "about" },
                { name: "Brands", id: "brands" },
                { name: "Common Problem", id: "problem" },
                { name: "Jukebox Solution", id: "service" },
                { name: "Jukebox Method", id: "blueprint" },
                { name: "Who we work with", id: "industries" },
                { name: "Our Reviews", id: "testimonial" },
                { name: "Pricing", id: "pricing" },
                { name: "Jukebox Brand Film", id: "brand-film" },
              ].map((item) => {
                const isActive =
                  activeTab.toLowerCase() === item.id.toLowerCase();
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left py-2.5 px-4 rounded-xl text-[15px] font-semibold transition-all duration-300 w-full ${
                      isActive
                        ? "bg-[#f6861f] text-white shadow-[0_4px_12px_rgba(246,134,31,0.3)]"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-8 border-t border-white/10">
              <a
                href={`https://wa.me/919998526134?text=${encodeURIComponent("Hi Jukebox Media! I would like to connect.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="lets-talk-btn flex items-center justify-center gap-2 rounded-full bg-[#f6861f] py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#f6861f]/90 w-full cursor-pointer text-center"
              >
                WhatsApp Us
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
