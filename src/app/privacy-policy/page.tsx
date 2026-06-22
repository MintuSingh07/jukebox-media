"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[14px] text-white/50 mb-10 font-medium">
            Last Updated: January 2025
          </p>

          <div className="space-y-8 text-[15px] sm:text-[16px] text-white/80 leading-relaxed font-normal">
            <p>
              Jukebox Media (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website{" "}
              <a href="https://jukeboxmedia.in" target="_blank" rel="noopener noreferrer" className="text-[#f6861f] hover:underline font-medium">
                https://jukeboxmedia.in
              </a>
              . We are committed to protecting your privacy and handling personal information in a transparent and secure manner.
            </p>

            <p>
              This Privacy Policy explains how we collect, use, store, process, and protect your data when you use our website or submit inquiries.
            </p>

            <p className="font-semibold text-white/95">
              By accessing or using our website, you agree to the terms of this Privacy Policy.
            </p>

            <hr className="border-white/10 my-8" />

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                1. Information We Collect
              </h2>
              <p>
                We collect the following information when you submit inquiries through our website forms:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Company Name</li>
                <li>Monthly Marketing Budget (if selected)</li>
                <li>Message or Inquiry Details</li>
              </ul>
              <p>
                Additionally, limited technical data may be collected automatically through analytics tools such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>IP address (anonymized where applicable)</li>
                <li>Browser type and device information</li>
                <li>Pages visited and interaction behavior</li>
              </ul>
              <p>
                We do not collect sensitive personal information such as financial data, passwords, government identification numbers, or biometric data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                2. How We Use Your Information
              </h2>
              <p>We use your information strictly for legitimate business purposes including:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Responding to inquiries and consultation requests</li>
                <li>Providing service information and proposals</li>
                <li>Internal communication and lead management</li>
                <li>Website performance monitoring and optimization</li>
                <li>Business analytics and reporting</li>
              </ul>
              <p>We do not sell, rent, or trade your personal information.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                3. Form Submissions & Data Storage
              </h2>
              <p>When you submit a form on our website:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Data is securely transmitted using SSL encryption</li>
                <li>Submissions are stored in our internal CMS (Admin Panel)</li>
                <li>Email notifications are sent to authorized administrators</li>
                <li>Access is restricted to authorized personnel only</li>
              </ul>
              <p>
                All inquiry data is stored solely for business communication and client engagement purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                4. Cookies & Tracking Technologies
              </h2>
              <h3 className="text-[17px] font-bold text-white/90">Cookies</h3>
              <p>
                Our website uses cookies and similar technologies to ensure functionality, security, and performance optimization.
              </p>
              <p>Cookies may be used for:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Website performance monitoring</li>
                <li>Traffic analysis</li>
                <li>Security verification</li>
                <li>Improving user experience</li>
              </ul>
              <p>You can manage or disable cookies through your browser settings at any time.</p>

              <h3 className="text-[17px] font-bold text-white/90 mt-4">Google Analytics & Tag Management</h3>
              <p>We use the following tools for performance tracking and optimization:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Google Analytics 4 (GA4)</li>
                <li>Google Tag Manager (GTM)</li>
                <li>Meta Pixel (if enabled for marketing analytics)</li>
              </ul>
              <p>These tools may collect anonymized data such as:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Page views</li>
                <li>Session duration</li>
                <li>Device type</li>
                <li>Geographic region (approximate)</li>
                <li>Interaction behavior</li>
              </ul>
              <p>This data is used exclusively for internal performance insights and marketing optimization.</p>

              <h3 className="text-[17px] font-bold text-white/90 mt-4">Google reCAPTCHA</h3>
              <p>
                Our inquiry forms may use Google reCAPTCHA to protect against spam and fraudulent submissions. reCAPTCHA may collect device and interaction data in accordance with Google&apos;s privacy policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                5. Legal Basis for Processing (GDPR Compliance)
              </h2>
              <p>
                For users located in the European Economic Area (EEA), United Kingdom, or similar jurisdictions, we process personal data under the following lawful bases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>User consent</li>
                <li>Legitimate business interests</li>
                <li>Contractual necessity (service inquiries)</li>
              </ul>
              <p>You may withdraw consent at any time by contacting us.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                6. Data Retention Policy
              </h2>
              <p>We retain personal information only as long as necessary for business and legal purposes.</p>
              <p>Typical retention period:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Inquiry and lead data: Up to 24 months</li>
                <li>Analytics data: As per platform default retention policies</li>
              </ul>
              <p>You may request deletion of your data at any time.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                7. Data Security Measures
              </h2>
              <p>We implement appropriate technical and organizational safeguards including:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>SSL encryption</li>
                <li>Secure hosting infrastructure</li>
                <li>Restricted admin access</li>
                <li>Firewall and hosting security protections</li>
              </ul>
              <p>
                While we take reasonable precautions, no internet transmission method is 100% secure. Absolute security cannot be guaranteed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                8. Third-Party Service Providers
              </h2>
              <p>We may share limited information with trusted third-party service providers only when required for:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Website hosting</li>
                <li>Email communication systems</li>
                <li>Analytics and tracking services</li>
                <li>Spam protection services</li>
              </ul>
              <p>All service providers are contractually obligated to follow data protection standards.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                9. International Data Transfers
              </h2>
              <p>As a global service provider, your information may be processed or stored on servers located in:</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>India</li>
                <li>United States</li>
                <li>European Union</li>
              </ul>
              <p>This occurs only through secure and compliant infrastructure providers.</p>
              <p>By using our website, you consent to international data transfers as permitted by applicable laws.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                10. Your Privacy Rights
              </h2>
              <p>Depending on your location, you may have the following rights:</p>
              
              <h3 className="text-[17px] font-bold text-white/90">GDPR (EU/UK Users)</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion (&quot;Right to be Forgotten&quot;)</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>

              <h3 className="text-[17px] font-bold text-white/90 mt-4">India DPDP Act Rights</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Access your personal information</li>
                <li>Request correction or erasure</li>
                <li>Withdraw consent</li>
              </ul>

              <h3 className="text-[17px] font-bold text-white/90 mt-4">CCPA (California Residents)</h3>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Request disclosure of collected data</li>
                <li>Request deletion</li>
                <li>Opt out of data selling (we do not sell data)</li>
              </ul>

              <p className="mt-4">
                To exercise your rights, contact:{" "}
                <a href="mailto:connect@jukeboxmedia.in" className="text-[#f6861f] hover:underline font-medium">
                  connect@jukeboxmedia.in
                </a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                11. Third-Party Website Links
              </h2>
              <p>
                Our website may contain links to external websites. We are not responsible for the privacy practices or content of third-party sites.
              </p>
              <p>We recommend reviewing their privacy policies before sharing information.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                12. Children&apos;s Privacy
              </h2>
              <p>Our services are not intended for individuals under the age of 18.</p>
              <p>We do not knowingly collect personal information from minors.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                13. Updates to This Policy
              </h2>
              <p>We may update this Privacy Policy periodically to reflect legal or operational changes.</p>
              <ul className="list-disc pl-6 space-y-2 text-white/75">
                <li>Any updates will be posted on this page with a revised &quot;Last Updated&quot; date.</li>
                <li>Continued use of the website indicates acceptance of updated terms.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[20px] font-bold text-white tracking-wide">
                14. Contact Information
              </h2>
              <p>For privacy-related inquiries or data requests:</p>
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
