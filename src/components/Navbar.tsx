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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [budget, setBudget] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const formContentRef = useRef<HTMLFormElement>(null);

  const openForm = () => {
    setName("");
    setEmail("");
    setContact("");
    setBudget("");
    setIsFormOpen(true);
    setIsSubmitted(false);
    requestAnimationFrame(() => {
      if (formRef.current) {
        formRef.current.style.display = "block";
        gsap.fromTo(
          formRef.current,
          { clipPath: "circle(0% at 85% 0%)" },
          {
            clipPath: "circle(150% at 85% 0%)",
            duration: 0.65,
            ease: "power3.out",
          },
        );
        if (formContentRef.current) {
          const elements =
            formContentRef.current.querySelectorAll(".animate-field");
          gsap.fromTo(
            elements,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
              delay: 0.1,
            },
          );
        }
      }
    });
  };

  const closeForm = () => {
    if (formRef.current) {
      if (formContentRef.current) {
        const elements =
          formContentRef.current.querySelectorAll(".animate-field");
        gsap.to(elements, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
        });
      }
      gsap.to(formRef.current, {
        clipPath: "circle(0% at 85% 0%)",
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          setIsFormOpen(false);
          if (formRef.current) formRef.current.style.display = "none";
        },
      });
    } else {
      setIsFormOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isFormOpen &&
        formRef.current &&
        !formRef.current.contains(e.target as Node)
      ) {
        const target = e.target as HTMLElement;
        if (!target.closest(".lets-talk-btn")) {
          closeForm();
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isFormOpen]);

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
      openForm();
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
      <div className="mx-auto flex max-w-7xl items-center justify-between">
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
          className="relative hidden lg:flex items-center gap-0.5 rounded-full p-1 bg-brand-navy/[0.02]"
        >
          {/* Sliding Active Bubble */}
          <div
            ref={bubbleRef}
            className="absolute bg-[#161443] rounded-full shadow-[0_2px_6px_rgba(22,20,67,0.15)] z-0"
            style={{ opacity: 0 }}
          />
          {[
            { name: "Home", id: "home" },
            { name: "Problem", id: "problem" },
            { name: "Solution", id: "service" },
            { name: "Process", id: "blueprint" },
            { name: "Sectors", id: "industries" },
            { name: "About", id: "about" },
            { name: "Results", id: "testimonial" },
            { name: "Pricing", id: "pricing" },
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

        {/* Let's Talk CTA & Mobile Hamburger Button */}
        <div className="flex items-center gap-3 relative">
          <button
            onClick={openForm}
            className="lets-talk-btn group hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-[14px] font-medium text-white transition-all duration-300 hover:bg-brand-navy-light hover:shadow-premium cursor-pointer"
          >
            Let's Talk
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-brand-orange">
              ↗
            </span>
          </button>

          {isFormOpen && (
            <div
              ref={formRef}
              className="absolute right-0 top-full mt-3.5 w-[330px] max-w-[92vw] bg-white border border-brand-navy/15 rounded-2xl shadow-[0_20px_50px_rgba(22,20,67,0.15)] p-5 backdrop-blur-md z-50 overflow-hidden text-left"
              style={{ display: "none", clipPath: "circle(0% at 85% 0%)" }}
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-field">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4 text-emerald-500 shadow-sm animate-bounce">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base font-bold text-brand-navy">
                    Message Sent!
                  </h4>
                  <p className="text-xs text-brand-navy/60 mt-1 max-w-[200px]">
                    Thank you. Ankit will get in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form
                  ref={formContentRef}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitted(true);
                    setTimeout(() => {
                      closeForm();
                    }, 2500);
                  }}
                  className="flex flex-col gap-4"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 animate-field">
                    <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider">
                      Let's Connect
                    </h3>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="p-1 rounded-full text-slate-400 hover:text-brand-orange hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Name field */}
                  <div className="flex flex-col gap-1 animate-field">
                    <label className="text-[11px] font-bold text-brand-navy/60 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1 animate-field">
                    <label className="text-[11px] font-bold text-brand-navy/60 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>

                  {/* Contact field */}
                  <div className="flex flex-col gap-1 animate-field">
                    <label className="text-[11px] font-bold text-brand-navy/60 uppercase tracking-wider">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={
                        currency === "INR"
                          ? "+91 XXXXX XXXXX"
                          : "+1 (XXX) XXX-XXXX"
                      }
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>

                  {/* Campaign Budget field */}
                  <div className="flex flex-col gap-1.5 animate-field">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-brand-navy/60 uppercase tracking-wider">
                        Campaign Budget
                      </label>
                      <div className="relative flex items-center bg-slate-100 p-0.5 rounded-full w-28 h-6 select-none border border-slate-200/50">
                        {/* Sliding active bubble */}
                        <div
                          className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-brand-navy rounded-full transition-all duration-300 ease-out shadow-sm ${
                            currency === "INR"
                              ? "left-[2px]"
                              : "left-[calc(50%)]"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setCurrency("INR")}
                          className={`w-1/2 text-center text-[9px] font-bold z-10 transition-colors duration-300 cursor-pointer ${
                            currency === "INR"
                              ? "text-white"
                              : "text-brand-navy/60"
                          }`}
                        >
                          ₹ INR
                        </button>
                        <button
                          type="button"
                          onClick={() => setCurrency("USD")}
                          className={`w-1/2 text-center text-[9px] font-bold z-10 transition-colors duration-300 cursor-pointer ${
                            currency === "USD"
                              ? "text-white"
                              : "text-brand-navy/60"
                          }`}
                        >
                          $ USD
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brand-navy/60 font-bold">
                        {currency === "INR" ? "₹" : "$"}
                      </span>
                      <input
                        type="number"
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter Budget"
                        className="w-full pl-7 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-2 mt-2 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-field"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Hamburger toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative flex flex-col justify-center items-center w-10 h-10 rounded-full border border-brand-navy/10 bg-white/80 shadow-premium cursor-pointer z-50 focus:outline-none"
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
          className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
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

            <nav className="flex flex-col gap-4">
              {[
                { name: "Home", id: "home" },
                { name: "Problem", id: "problem" },
                { name: "Solution", id: "service" },
                { name: "Process", id: "blueprint" },
                { name: "Sectors", id: "industries" },
                { name: "About", id: "about" },
                { name: "Results", id: "testimonial" },
                { name: "Pricing", id: "pricing" },
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
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openForm();
                }}
                className="lets-talk-btn flex items-center justify-center gap-2 rounded-full bg-[#f6861f] py-3 text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#f6861f]/90 w-full cursor-pointer"
              >
                Let's Talk
                <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
