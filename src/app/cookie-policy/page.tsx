"use client";

import React from "react";
import Link from "next/link";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#161443] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full border-b border-white/10 bg-[#161443]/30 backdrop-blur-md sticky top-0 z-50 py-4 px-6 sm:px-12 md:px-16 flex justify-center">
        <div className="max-w-[1550px] w-full flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img
              src="/final logo-TM.png"
              alt="Jukebox Media"
              className="h-10 md:h-[52px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-[14px] font-semibold text-white/90 hover:text-[#f6861f] hover:border-[#f6861f]/45 hover:bg-[#f6861f]/5 transition-all duration-300 group cursor-pointer"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content Container */}
      <main className="flex-grow flex justify-center py-16 px-6 sm:px-12 md:px-16 relative z-10">
        <div className="max-w-[900px] w-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          <h1 className="text-[32px] sm:text-[44px] font-extrabold tracking-tight text-white mb-2 leading-tight">
            Cookie Policy
          </h1>
          <p className="text-[14px] text-white/50 mb-10 font-medium">
            Last Updated: January 2026
          </p>

          <div className="space-y-8 text-[15px] sm:text-[16px] text-white/80 leading-relaxed font-normal">
            <p>
              This Cookie Policy explains how Jukebox Media (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) uses cookies and similar technologies on{" "}
              <a href="https://jukeboxmedia.in" target="_blank" rel="noopener noreferrer" className="text-[#f6861f] hover:underline font-medium">
                https://jukeboxmedia.in
              </a>
              .
            </p>

            <p className="font-semibold text-white/95">
              By using our website, you consent to the use of cookies in accordance with this policy unless you disable them through your browser or cookie preference settings.
            </p>

            <hr className="border-white/10 my-8" />

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                1. What Are Cookies
              </h2>
              <p>
                Cookies are small text files stored on your device (computer, mobile, tablet) when you visit a website.
              </p>
              <p>They help websites:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Function properly</li>
                <li>Improve performance</li>
                <li>Analyze visitor behavior</li>
                <li>Enhance user experience</li>
              </ul>
              <p>
                Cookies do not typically contain personally identifiable information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                2. Why We Use Cookies
              </h2>
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Website functionality and performance</li>
                <li>Traffic analysis and visitor behavior insights</li>
                <li>Security and fraud prevention</li>
                <li>Improving website experience</li>
              </ul>
              <p>We do not use cookies to sell personal data.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                3. Types of Cookies We Use
              </h2>
              
              <h3 className="text-[17px] font-bold text-white/90">Essential Cookies</h3>
              <p>These cookies are necessary for:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Website operation</li>
                <li>Form security</li>
                <li>Session management</li>
                <li>Spam protection tools (such as reCAPTCHA)</li>
              </ul>
              <p>Without these cookies, some parts of the website may not function correctly.</p>

              <h3 className="text-[17px] font-bold text-white/90 mt-4">Analytics Cookies</h3>
              <p>
                We use analytics tools such as Google Analytics to understand how visitors interact with our website.
              </p>
              <p>These cookies may collect:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Page views</li>
                <li>Session duration</li>
                <li>Device and browser information</li>
                <li>Approximate location data</li>
                <li>Interaction behavior</li>
              </ul>
              <p>
                This information is collected in aggregated and anonymized form and is used only to improve website performance.
              </p>

              <h3 className="text-[17px] font-bold text-white/90 mt-4">Marketing Cookies (If Enabled)</h3>
              <p>
                If marketing or remarketing tools are enabled in the future (such as Meta Pixel), these cookies may be used to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Measure campaign performance</li>
                <li>Optimize advertising delivery</li>
                <li>Improve ad relevance</li>
              </ul>
              <p>You will always have the option to manage or disable such cookies.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                4. Third-Party Cookies
              </h2>
              <p>Some cookies may be placed by trusted third-party services including:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Google Analytics</li>
                <li>Google Tag Manager</li>
                <li>Security and spam protection services</li>
              </ul>
              <p>These providers may process data according to their own privacy policies.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                5. How You Can Control Cookies
              </h2>
              
              <h3 className="text-[17px] font-bold text-white/90">Browser Settings</h3>
              <p>Most browsers allow you to:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>View stored cookies</li>
                <li>Block cookies</li>
                <li>Delete existing cookies</li>
                <li>Set cookie preferences</li>
              </ul>
              <p>Please note that disabling cookies may impact website functionality.</p>

              <h3 className="text-[17px] font-bold text-white/90 mt-4">Cookie Consent Banner</h3>
              <p>When you first visit our website, you may see a cookie consent banner allowing you to:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Manage cookie preferences</li>
              </ul>
              <p>Your consent choices are stored and respected.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                6. Data Protection & Privacy
              </h2>
              <p>
                Any personal data collected through cookies is processed in accordance with our Privacy Policy.
              </p>
              <p>We apply appropriate security measures to protect collected information.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                7. Updates to This Policy
              </h2>
              <p>
                We may update this Cookie Policy periodically to reflect changes in technology or legal requirements.
              </p>
              <p>Updates will be posted on this page with a revised &quot;Last Updated&quot; date.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                8. Contact Information
              </h2>
              <p>For questions about this Cookie Policy:</p>
              <p className="font-semibold text-white font-serif italic text-[18px]">Jukebox Media</p>
              <ul className="space-y-1.5 text-white/80">
                <li>
                  Website:{" "}
                  <a href="https://jukeboxmedia.in" target="_blank" rel="noopener noreferrer" className="text-[#f6861f] hover:underline">
                    https://jukeboxmedia.in
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a href="mailto:connect@jukeboxmedia.in" className="text-[#f6861f] hover:underline">
                    connect@jukeboxmedia.in
                  </a>
                </li>
                <li className="text-white/50 text-[13px] mt-2">Operating Globally | Based in India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-8 px-6 sm:px-12 md:px-16 flex justify-center bg-[#161443]/20 relative z-10 select-none">
        <div className="max-w-[1550px] w-full flex flex-col sm:flex-row justify-between items-center text-[13px] text-white/50 font-medium">
          <div>
            © {new Date().getFullYear()} Jukebox Media. All Rights Reserved.
          </div>
          <div className="mt-2 sm:mt-0">
            Crafting High-Impact Digital Experiences
          </div>
        </div>
      </footer>
    </div>
  );
}
