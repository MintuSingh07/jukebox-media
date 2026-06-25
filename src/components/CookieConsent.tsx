"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("jukebox_cookie_consent");
    if (!consent) {
      setShouldRender(true);
      // Fade in after 1 second for organic feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("jukebox_cookie_consent", "accepted");
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 500); // Wait for transition animation
  };

  if (!mounted || !shouldRender) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full z-[9999] bg-white/95 backdrop-blur-md border-t border-black/5 shadow-[0_-5px_30px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Text paragraph */}
        <p className="text-[13px] md:text-[14px] leading-relaxed text-[#161443]/85 text-center md:text-left font-medium">
          We use cookies and analytics tools to improve website performance and user experience. By continuing to use this site, you agree to our{" "}
          <Link
            href="/privacy-policy"
            className="text-brand-orange hover:text-brand-orange-light font-semibold hover:underline underline-offset-2 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* Buttons Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleAccept}
            className="bg-brand-orange hover:bg-brand-orange-light text-white font-semibold text-xs md:text-sm px-6 py-2 md:py-2 rounded-lg transition-all duration-200 shadow-sm active:scale-[0.98]"
          >
            I agree
          </button>
        </div>
      </div>
    </div>
  );
}

