"use client";

import React from "react";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#161443] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] pointer-events-none z-0" />

      {/* Header */}
      <header className="w-full border-b border-white/10 bg-brand-navy/30 backdrop-blur-md sticky top-0 z-50 py-4 px-6 sm:px-12 md:px-16 flex justify-center">
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
            Terms & Conditions
          </h1>
          <p className="text-[14px] text-white/50 mb-10 font-medium">
            Last Updated: January 2026
          </p>

          <div className="space-y-8 text-[15px] sm:text-[16px] text-white/80 leading-relaxed font-normal">
            <p>
              Welcome to Jukebox Media (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). By accessing or using{" "}
              <a href="https://jukeboxmedia.in" target="_blank" rel="noopener noreferrer" className="text-[#f6861f] hover:underline font-medium">
                https://jukeboxmedia.in
              </a>
              , you agree to comply with and be bound by these Terms & Conditions.
            </p>

            <p className="font-semibold text-white/95">
              If you do not agree with any part of these terms, please do not use our website or services.
            </p>

            <hr className="border-white/10 my-8" />

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                1. Services Overview
              </h2>
              <p>
                Jukebox Media is a performance-driven marketing and growth agency providing services including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Performance Marketing & Paid Advertising</li>
                <li>Funnel Strategy & Conversion Optimization</li>
                <li>Creative Strategy & Ad Production</li>
                <li>Analytics & Tracking Setup</li>
                <li>Growth Consulting</li>
              </ul>
              <p>
                Service scope, timelines, and deliverables are defined separately through proposals, contracts, or written agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                2. Website Use
              </h2>
              <p>By using our website, you agree that:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>You will not misuse the website or attempt unauthorized access</li>
                <li>You will not submit false or misleading information</li>
                <li>You will not engage in spam, hacking, or malicious activity</li>
              </ul>
              <p>We reserve the right to restrict access to any user violating these terms.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                3. Inquiry Submissions
              </h2>
              <p>When submitting inquiries or consultation requests:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>You confirm that information provided is accurate</li>
                <li>You consent to being contacted regarding your request</li>
                <li>Submission does not create a binding client relationship</li>
              </ul>
              <p>A formal agreement is required before any paid service begins.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                4. No Guarantee of Results
              </h2>
              <p>
                Marketing performance depends on multiple external factors including platform algorithms, competition, budgets, creatives, and market conditions.
              </p>
              <p>Therefore:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>We do not guarantee specific results, revenue, ROAS, leads, or conversions</li>
                <li>Past performance does not guarantee future outcomes</li>
                <li>Advertising platform decisions are outside our control</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                5. Client Responsibilities
              </h2>
              <p>Clients are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Providing accurate business information</li>
                <li>Ensuring legality of products or services promoted</li>
                <li>Supplying approved creative assets when required</li>
                <li>Ensuring compliance with advertising regulations in their region</li>
              </ul>
              <p>We are not liable for consequences arising from false or misleading client-provided information.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                6. Intellectual Property Rights
              </h2>
              <p>Unless otherwise agreed in writing:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>All original materials created by Jukebox Media remain our intellectual property until full payment is received</li>
                <li>After payment, ownership or usage rights are transferred as per project agreement</li>
                <li>Clients retain ownership of their brand assets and content</li>
              </ul>
              <p>Unauthorized copying, redistribution, or resale of our work is prohibited.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                7. Payment Terms
              </h2>
              <p>Payment terms are defined per project agreement or invoice.</p>
              <p>Unless stated otherwise:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Advance payment is required before project initiation</li>
                <li>Delayed payments may result in service suspension</li>
                <li>All prices exclude applicable taxes unless specified</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                8. Refund & Cancellation
              </h2>
              <p>Refund eligibility is governed by our Refund & Cancellation Policy.</p>
              <p>In general:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>No refunds are issued once project execution has started</li>
                <li>Partial refunds may be considered on a case-by-case basis</li>
                <li>Advance payments are non-refundable unless stated otherwise</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                9. Third-Party Tools & Platforms
              </h2>
              <p>We use third-party platforms including:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Google Ads</li>
                <li>Meta Ads</li>
                <li>Analytics tools</li>
                <li>Hosting providers</li>
                <li>CRM systems</li>
              </ul>
              <p>We are not responsible for outages, policy changes, bans, suspensions, or technical failures caused by third-party platforms.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                10. Limitation of Liability
              </h2>
              <p>To the maximum extent permitted by law:</p>
              <p>Jukebox Media shall not be liable for:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Business losses</li>
                <li>Revenue loss</li>
                <li>Data loss</li>
                <li>Advertising account suspensions</li>
                <li>Indirect or consequential damages</li>
              </ul>
              <p>Our total liability shall not exceed the amount paid by the client for the specific service in dispute.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                11. Confidentiality
              </h2>
              <p>Both parties agree to maintain confidentiality of:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Business strategies</li>
                <li>Campaign data</li>
                <li>Pricing information</li>
                <li>Proprietary processes</li>
              </ul>
              <p>Confidential information shall not be disclosed to third parties without written consent.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                12. Termination of Services
              </h2>
              <p>We reserve the right to terminate services if:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Payment obligations are not met</li>
                <li>Client violates platform policies</li>
                <li>Illegal activities are discovered</li>
                <li>Terms are breached</li>
              </ul>
              <p>Termination does not waive outstanding payment obligations.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                13. External Links
              </h2>
              <p>Our website may include links to third-party websites.</p>
              <p>We are not responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Content accuracy</li>
                <li>Privacy practices</li>
                <li>Services offered on external platforms</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                14. Force Majeure
              </h2>
              <p>We are not liable for delays or failures caused by events beyond our control including:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Natural disasters</li>
                <li>Internet outages</li>
                <li>Platform disruptions</li>
                <li>Government restrictions</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                15. Governing Law & Jurisdiction
              </h2>
              <p>These Terms & Conditions shall be governed by and interpreted under the laws of India.</p>
              <p>Any disputes shall be subject to the exclusive jurisdiction of Indian courts.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                16. Modifications to Terms
              </h2>
              <p>We reserve the right to update these Terms at any time.</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Changes will be posted on this page with an updated revision date.</li>
                <li>Continued website usage constitutes acceptance of updated terms.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                17. Contact Information
              </h2>
              <p>For legal or service-related queries:</p>
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
      <footer className="w-full border-t border-white/10 py-8 px-6 sm:px-12 md:px-16 flex justify-center bg-brand-navy/20 relative z-10 select-none">
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
