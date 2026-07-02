"use client";

import React, { useState, forwardRef, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          className="relative hidden xl:flex items-center gap-0.5 rounded-full p-1 bg-[#161443]/[0.02]"
        >
          {/* Sliding Active Bubble */}
          <div
            ref={bubbleRef}
            className="absolute bg-[#161443] rounded-full shadow-[0_2px_6px_rgba(22, 20, 67,0.15)] z-0"
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
          ].map((item) => {
            const isActive = activeTab.toLowerCase() === item.id.toLowerCase();
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(item.id);
                }}
                className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-300 cursor-pointer z-10 ${
                  isActive
                    ? "text-white active-nav-btn"
                    : "text-[#161443]/70 hover:text-[#161443] hover:bg-[#161443]/[0.03]"
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
            className="lets-talk-btn group hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-[#161443] text-white transition-all duration-300 hover:bg-[#161443]/90 hover:scale-105 shadow-md cursor-pointer border border-white/15"
          >
            <svg className="w-5.5 h-5.5 shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="#25D366" />
              <path fill="#ffffff" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
          </a>

          {/* Hamburger toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-full border border-[#161443]/10 bg-white/80 shadow-premium cursor-pointer z-50 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 right-0 h-0.5 bg-[#161443] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-[#161443] rounded-full transition-all duration-300 top-1.5 ${isMobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 right-0 h-0.5 bg-[#161443] rounded-full transition-all duration-300 ${isMobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Portal */}
        {mounted && createPortal(
          <div
            className="fixed inset-0 z-[100] bg-brand-orange flex flex-col justify-between p-6 sm:p-8 xl:hidden"
            style={{
              clipPath: isMobileMenuOpen
                ? "circle(150% at calc(100% - 36px) calc(3.5vh + 24px))"
                : "circle(0px at calc(100% - 36px) calc(3.5vh + 24px))",
              transition: "clip-path 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
              pointerEvents: isMobileMenuOpen ? "auto" : "none",
            }}
          >
            {/* Top Bar inside Drawer */}
            <div className="relative flex items-center justify-between w-full z-10" style={{ marginTop: "calc(3.5vh - 6px)" }}>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick("home");
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center group cursor-pointer"
              >
                <img
                  src="/final logo-TM.png"
                  alt="Jukebox Media"
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>

              {/* Close button that matches the hamburger position but styled for orange backdrop */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative flex flex-col justify-center items-center w-10 h-10 rounded-full border border-[#161443]/10 bg-[#161443]/10 shadow-premium cursor-pointer focus:outline-none"
                aria-label="Close mobile menu"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className="absolute h-0.5 w-5 bg-[#161443] rounded-full rotate-45" />
                  <span className="absolute h-0.5 w-5 bg-[#161443] rounded-full -rotate-45" />
                </div>
              </button>
            </div>

            {/* Center Navigation Links */}
            <nav className="relative flex flex-col items-center justify-center gap-6 my-auto z-10 w-full">
              {[
                { name: "Home", id: "home" },
                { name: "Leadership", id: "about" },
                { name: "Brands", id: "brands" },
                { name: "Common Problem", id: "problem" },
                { name: "Jukebox Solution", id: "service" },
                { name: "Jukebox Method", id: "blueprint" },
                { name: "Who we work with", id: "industries" },
                { name: "Our Reviews", id: "testimonial" },
              ].map((item, index) => {
                const isActive = activeTab.toLowerCase() === item.id.toLowerCase();
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTabClick(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-center py-1.5 text-[24px] sm:text-[30px] font-medium tracking-tight transition-all duration-300 w-full hover:scale-105 ${
                      isActive
                        ? "text-[#161443] drop-shadow-[0_2px_8px_rgba(22,20,67,0.15)]"
                        : "text-[#161443]/70 hover:text-[#161443]"
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Connect CTA */}
            <div className="relative w-full mt-auto pb-6 flex flex-col items-center z-10">
              <a
                href={`https://wa.me/919998526134?text=${encodeURIComponent("Hi Jukebox Media! I would like to connect.")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 rounded-full bg-[#161443] py-3.5 px-8 text-[15px] font-normal text-white transition-all duration-300 hover:bg-[#161443]/90 hover:scale-[1.02] w-full max-w-sm cursor-pointer text-center shadow-lg border border-white/10"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" fill="#25D366" />
                  <path fill="#ffffff" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                <span>Connect on WhatsApp</span>
              </a>
            </div>
          </div>,
          document.body
        )}

      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
