"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Grainient from "@/components/Grainient";
import ScrollReveal from "@/components/ScrollReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import IrregularCampaignsVisual from "@/components/IrregularCampaignsVisual";
import MultipleVendorChaosVisual from "@/components/MultipleVendorChaosVisual";
import ActivityOverDirectionVisual from "@/components/ActivityOverDirectionVisual";
import ConsistencyStrugglesVisual from "@/components/ConsistencyStrugglesVisual";
import UnclearROIVisual from "@/components/UnclearROIVisual";
import LogoWall from "@/components/LogoWall";
import TestimonialsEditorial from "@/components/ui/editorial-testimonial";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );
  const isProgrammaticScroll = useRef(false);
  // Stores the scroll position where each section's TOP is at viewport top.
  // Populated after GSAP init by reading pin spacer offsetTop.
  const sectionScrollPositions = useRef<Record<string, number>>({});
  const [activeService, setActiveService] = useState(0);
  const selectorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveService = useRef<number | null>(null);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [card1Hovered, setCard1Hovered] = useState(false);
  const [card2Hovered, setCard2Hovered] = useState(false);
  const [card3Hovered, setCard3Hovered] = useState(false);
  const [card4Hovered, setCard4Hovered] = useState(false);
  const [card5Hovered, setCard5Hovered] = useState(false);

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // Calculate entry direction
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const forceX = x < 0 ? 1 : -1;
    const forceY = y < 0 ? 1 : -1;

    gsap.killTweensOf(card);

    // Perform swing away and spring back with transformOrigin at top center
    gsap
      .timeline()
      .to(card, {
        rotate: forceX * 7,
        x: forceX * 10,
        y: forceY * 3,
        duration: 0.12,
        ease: "power2.out",
      })
      .to(card, {
        rotate: 0,
        x: 0,
        y: 0,
        duration: 1.6,
        ease: "elastic.out(1.1, 0.35)",
      });
  };

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    const navbar = navbarRef.current;

    if (!card || !container || !navbar) return;
    let animTimeoutId: any;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    (window as any).lenis = lenis;

    // GSAP Context handles cleanups on unmount
    const ctx = gsap.context(() => {
      // Pin the inner home container so it stays fixed in place while subsequent sections scroll over it
      if (homeRef.current) {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "max",
          pin: homeRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
          id: "pin-home",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=350",
          scrub: true,
          pin: false,
          invalidateOnRefresh: true,
        },
      });

      // 1. Expand the card
      tl.to(
        card,
        {
          left: "0vw",
          right: "0vw",
          height: "100vh",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          ease: "none",
        },
        0,
      );

      // 6. Animate Navbar to sticky top (remains floating)
      tl.to(
        navbar,
        {
          top: "20px",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
          ease: "none",
        },
        0,
      );

      // 10. Stacking Sections Scroll Effect
      const handleActiveChange = (id: string) => {
        if (isProgrammaticScroll.current) return;
        if (window.scrollY < 50 && id !== "home") return;
        setActiveTab(id);
        const path = id === "home" ? "/" : `/${id}`;
        if (window.location.pathname !== path) {
          window.history.pushState(null, "", path);
        }
      };

      const trackSections = [
        "home",
        "problem",
        "service",
        "blueprint",
        "industries",
        "about",
        "testimonial",
        "pricing",
      ];
      trackSections.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: id === "home" ? "top top" : "top 40%",
          end: id === "home" ? "bottom top" : "bottom 40%",
          onEnter: () => handleActiveChange(id),
          onEnterBack: () => handleActiveChange(id),
          invalidateOnRefresh: true,
        });
      });

      const scrollSections = [
        "blank",
        "problem",
        "service",
        "blueprint",
        "industries",
        "about",
        "testimonial",
      ];

      scrollSections.forEach((id, index) => {
        const section = document.getElementById(id);
        if (section) {
          // Set incremental z-index so that subsequent sections render on top of previous ones
          section.style.zIndex = (21 + index).toString();

          ScrollTrigger.create({
            trigger: section,
            start: () =>
              section.offsetHeight > window.innerHeight
                ? "bottom bottom"
                : "top top",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
            id: `pin-${id}`,
          });
        }
      });

      // 11. Unified Section Reveal Animations (Text elements, buttons, and cards fade & slide up together)
      const animSections = [
        {
          id: "home",
          selectors: [
            "#home h1 > span",
            "#home p",
            "#home .flex.flex-row.items-center",
          ],
          start: "top 95%",
        },
        {
          id: "problem",
          selectors: ["#problem .text-center > *", "#problem .grid > div"],
          start: "top 78%",
        },
        {
          id: "service",
          selectors: [
            "#service .text-center > *",
            "#service .lg\\:col-span-5 > div",
            "#service .lg\\:col-span-7",
          ],
          start: "top 78%",
        },
        {
          id: "blueprint",
          selectors: [
            "#blueprint .max-w-md > *",
            "#blueprint div.w-\\[285px\\]",
            "#blueprint .md\\:hidden .text-center > *",
            "#blueprint div.max-w-\\[310px\\]",
            "#blueprint .left-\\[45\\%\\] > span",
          ],
          start: "top 78%",
        },
        {
          id: "industries",
          selectors: [
            "#industries .text-center > *",
            "#industries .grid > div",
            "#industries > div > div:nth-child(3)",
          ],
          start: "top 78%",
        },
        {
          id: "about",
          selectors: [
            "#about > div > div:nth-child(1) > div:first-child > *",
            "#about > div > div:nth-child(1) > div:last-child",
            "#about > div > div:nth-child(2)",
            "#about > div > div:nth-child(3) > div:first-child > *",
            "#about > div > div:nth-child(3) > div:last-child",
          ],
          start: "top 78%",
        },
        {
          id: "testimonial",
          selectors: [
            "#testimonial .text-center > *",
            "#testimonial > div:nth-child(2)",
          ],
          start: "top 78%",
        },
        {
          id: "pricing",
          selectors: ["#pricing .text-center > *", "#pricing .grid > div"],
          start: "top 78%",
        },
      ];

      animTimeoutId = setTimeout(() => {
        ctx.add(() => {
          ScrollTrigger.refresh();

          animSections.forEach((sec) => {
            const elements: HTMLElement[] = [];
            sec.selectors.forEach((sel) => {
              document.querySelectorAll(sel).forEach((el) => {
                elements.push(el as HTMLElement);
              });
            });

            // Sort elements by their DOM / visual position to ensure natural stagger flow
            elements.sort((a, b) => {
              const position = a.compareDocumentPosition(b);
              if (position & Node.DOCUMENT_POSITION_FOLLOWING) {
                return -1;
              } else if (position & Node.DOCUMENT_POSITION_PRECEDING) {
                return 1;
              }
              return 0;
            });

            // Set initial state immediately to avoid layout flash before user scrolls to the section
            gsap.set(elements, { opacity: 0, y: 35 });

            if (elements.length > 0) {
              ScrollTrigger.create({
                trigger: `#${sec.id} > div:first-of-type`,
                start: sec.start,
                onEnter: () => {
                  gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                },
                once: true,
              });
            }
          });
        });
      }, 300);
    }, container);

    // Handle initial route scroll on mount
    const path = window.location.pathname.replace("/", "") || "home";
    const targetElement = document.getElementById(path);
    if (targetElement) {
      setTimeout(() => {
        const trigger = ScrollTrigger.getById(`pin-${path}`);
        const scrollTarget =
          path === "home" ? 0 : trigger ? trigger.start : targetElement;
        lenis.scrollTo(scrollTarget, { immediate: true });
      }, 250);
    }
    return () => {
      clearTimeout(animTimeoutId);
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(rafHandler);
      delete (window as any).lenis;

      const scrollSections = [
        "blank",
        "problem",
        "service",
        "blueprint",
        "industries",
        "about",
        "testimonial",
      ];
      scrollSections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.style.zIndex = "";
      });
    };
  }, []);

  useEffect(() => {
    const activeEl = itemsRef.current[activeService];
    const selector = selectorRef.current;
    if (!activeEl || !selector) return;

    const updatePosition = (animate = true) => {
      // 1. Temporarily apply target heights to measure layout
      servicesData.forEach((_, idx) => {
        const descEl = descRefs.current[idx];
        const isActive = idx === activeService;
        if (descEl) {
          descEl.style.height = isActive ? "auto" : "0px";
        }
      });

      // 2. Measure target top and height after target layout renders
      const targetTop = activeEl.offsetTop;
      const targetHeight = activeEl.offsetHeight;

      // 3. Restore inline height style to start state before animating
      if (animate && prevActiveService.current !== null) {
        servicesData.forEach((_, idx) => {
          const descEl = descRefs.current[idx];
          const isPrevActive = idx === prevActiveService.current;
          if (descEl) {
            descEl.style.height = isPrevActive ? "auto" : "0px";
          }
        });
      }

      // 4. Trigger animations
      if (
        animate &&
        prevActiveService.current !== null &&
        prevActiveService.current !== activeService
      ) {
        // Animate selector height and position
        gsap.to(selector, {
          top: targetTop,
          height: targetHeight,
          duration: 0.45,
          ease: "power2.out",
          overwrite: "auto",
        });

        servicesData.forEach((_, idx) => {
          const descEl = descRefs.current[idx];
          const isActive = idx === activeService;

          // Animate details height disclosure
          if (descEl) {
            gsap.to(descEl, {
              height: isActive ? "auto" : 0,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        });
      } else {
        // Instant update
        gsap.set(selector, {
          top: targetTop,
          height: targetHeight,
          opacity: 1,
        });

        servicesData.forEach((_, idx) => {
          const descEl = descRefs.current[idx];
          const isActive = idx === activeService;

          if (descEl) {
            descEl.style.height = isActive ? "auto" : "0px";
          }
        });
      }
      prevActiveService.current = activeService;
    };

    updatePosition(prevActiveService.current !== null);

    // Add small delay to handle layout settle (routing, font load etc.)
    const timer = setTimeout(() => updatePosition(false), 100);

    const handleResize = () => updatePosition(false);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [activeService]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    isProgrammaticScroll.current = true;
    const targetElement = document.getElementById(id);

    const path = id === "home" ? "/" : `/${id}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }

    if (targetElement && (window as any).lenis) {
      const navbarHeight = navbarRef.current?.offsetHeight ?? 80;
      let scrollTarget: number;

      if (id === "home") {
        scrollTarget = 0;
      } else {
        // Use the GSAP pin trigger to find where this section STARTS.
        //
        // Pin types:
        //   "top top"    → trigger fires when section TOP = viewport TOP
        //                  trigger.start = section's scroll-start position ✓
        //
        //   "bottom bottom" (tall sections like blueprint) → trigger fires when
        //                  section BOTTOM = viewport BOTTOM (i.e. section END).
        //                  trigger.start = sectionScrollStart + sectionHeight - viewportH
        //                  So: sectionScrollStart = trigger.start - sectionHeight + viewportH
        //
        const pinTrigger = ScrollTrigger.getById(`pin-${id}`);

        if (pinTrigger) {
          const sectionHeight = targetElement.offsetHeight;
          const viewportHeight = window.innerHeight;

          // For tall sections, trigger.start is at the section END — back up to the START.
          // For normal sections, trigger.start is already the section START.
          const overflow = Math.max(0, sectionHeight - viewportHeight);
          const sectionScrollStart = pinTrigger.start - overflow;

          scrollTarget = Math.max(0, sectionScrollStart);
        } else {
          // No pin trigger: scroll to the element directly
          scrollTarget = Math.max(0, targetElement.offsetTop);
        }
      }

      (window as any).lenis.scrollTo(scrollTarget, {
        offset: 0,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isProgrammaticScroll.current = false;
        },
      });
    } else {
      isProgrammaticScroll.current = false;
    }
  };

  return (
    <>
      <Navbar
        ref={navbarRef}
        activeTab={activeTab}
        onTabClick={scrollToSection}
        style={{
          top: "6vh",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
        }}
        className="left-4 right-4 md:left-[8vw] md:right-[8vw] lg:left-[12vw] lg:right-[12vw] px-6 py-1.5 md:px-8 md:py-2 bg-white/[0.12] backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(22,20,67,0.08)]"
      />
      <div
        ref={containerRef}
        id="home"
        className="relative w-full bg-[#0c0c0e]"
        style={{ height: "calc(100vh + 350px)" }}
      >
        {/* Viewport Wrapper (pinned container) */}
        <div
          ref={homeRef}
          id="home-inner"
          className="relative h-screen w-full overflow-hidden flex items-end justify-center bg-[#0c0c0e] z-10"
        >
          {/* Expanding Hero Box (Flush with bottom, centered with left/right space) */}
          <div
            ref={cardRef}
            style={{
              left: "3vw",
              right: "3vw",
              height: "94vh",
              borderTopLeftRadius: "32px",
              borderTopRightRadius: "32px",
              borderBottomLeftRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            className="absolute bottom-0 bg-[#f6861f] overflow-visible shadow-premium border border-white/5 flex flex-col items-center justify-between"
          >
            {/* Clipped background container */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] z-0">
              <Grainient
                color1="#f6861f"
                color2="#f6861f"
                color3="#161443"
                timeSpeed={0.2}
                colorBalance={0.35}
                warpStrength={1.8}
                warpFrequency={7.0}
                warpSpeed={1.5}
                warpAmplitude={45.0}
                blendAngle={30.0}
                blendSoftness={0.08}
                rotationAmount={400.0}
                noiseScale={2.8}
                grainAmount={0.08}
                grainScale={1.5}
                grainAnimated={false}
                contrast={1.4}
                gamma={1.0}
                saturation={1.0}
                centerX={0.0}
                centerY={0.0}
                zoom={0.9}
              />
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] z-0"></div>

              {/* Background Ambient Spotlights */}
              <div
                className="absolute top-0 right-0 w-[60vw] h-[60vw] pointer-events-none z-0 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(22, 20, 67, 0.12) 0%, rgba(22, 20, 67, 0) 70%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-[60vw] h-[60vw] pointer-events-none z-0 mix-blend-screen"
                style={{
                  background:
                    "radial-gradient(circle at bottom left, rgba(246, 134, 31, 0.15) 0%, rgba(246, 134, 31, 0) 70%)",
                }}
              />
            </div>

            {/* Hero Content Section */}
            <main className="relative flex flex-col flex-1 items-center justify-center w-full max-w-7xl px-6 py-28 md:py-36 z-10">
              {/* Core Layout Relative Wrapper for Absolute Cards */}
              <div className="relative w-full flex flex-col items-center">
                <div className="flex flex-col items-center max-w-4xl text-center select-none z-10 pointer-events-none">
                  <h1 className="text-[42px] leading-[1.15] sm:text-[68px] sm:leading-[1.1] md:text-[86px] md:leading-[1.08] font-semibold tracking-tight text-white">
                    <span className="block">Clarity & Growth.</span>
                    <span className="block mt-1">Structured Marketing</span>
                    <span className="block text-brand-navy mt-1">
                      For Growing Brands
                    </span>
                    <span className="block mt-1">To Deliver Impact</span>
                  </h1>
                  <p className="mt-8 text-[16px] leading-relaxed sm:text-[18px] md:text-[22px] font-normal text-white/80 max-w-2xl tracking-tight">
                    Bringing{" "}
                    <span className="font-serif italic font-medium text-brand-navy">
                      clarity
                    </span>{" "}
                    and{" "}
                    <span className="font-serif italic font-medium text-brand-navy">
                      growth
                    </span>{" "}
                    to your{" "}
                    <span className="font-serif italic font-medium text-white">
                      marketing efforts
                    </span>
                  </p>
                  <div className="mt-10 flex flex-row items-center justify-center gap-4 pointer-events-auto">
                    <button
                      onClick={() => scrollToSection("service")}
                      className="px-7 py-3.5 text-[15px] font-semibold text-white bg-brand-navy rounded-full border border-white/10 shadow-premium transition-all duration-300 hover:scale-[1.02] hover:bg-brand-navy-light cursor-pointer"
                    >
                      Our Services
                    </button>
                    <button
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("openContactForm"),
                        );
                      }}
                      className="lets-talk-btn group px-7 py-3.5 text-[15px] font-semibold text-brand-navy bg-white rounded-full shadow-premium flex items-center gap-1.5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 cursor-pointer"
                    >
                      Let's Build Together{" "}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 text-brand-navy">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Blank Section replacing Trusted By Strip */}
      <section
        id="blank"
        className="relative z-20 w-full bg-white h-auto md:h-screen min-h-[600px] md:min-h-screen border-b border-brand-navy/[0.04] flex items-center justify-center py-16 md:py-0"
      >
        <LogoWall />
      </section>

      {/* The Common Problem Section (Problem Statement) */}
      <div
        id="problem"
        className="relative z-20 w-full bg-[#f8fafc] py-20 border-y border-brand-navy/[0.04] flex flex-col items-center select-none overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(22, 20, 67, 0.07) 0%, rgba(22, 20, 67, 0) 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal
              as="h2"
              containerClassName="text-[36px] sm:text-[48px] font-bold text-brand-navy tracking-tight mt-3 leading-[1.1]"
            >
              Does your marketing feel scattered?
            </ScrollReveal>
            <p className="text-[16px] sm:text-[18px] text-brand-navy/70 mt-4 leading-relaxed">
              Many businesses today operate in a state of fragmentation, leading
              to wasted spend and unmeasurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto px-4">
            {/* Card 1 - Large */}
            <div
              onMouseEnter={() => setCard1Hovered(true)}
              onMouseLeave={() => setCard1Hovered(false)}
              className="relative bg-[#eff3fe] rounded-[2rem] p-8 md:col-span-2 flex flex-col items-center justify-start min-h-[420px] overflow-hidden group border border-transparent hover:border-brand-navy/5 transition-colors"
            >
              <div className="relative z-10 text-center mt-4">
                <h4 className="text-[26px] font-bold text-brand-navy tracking-tight">
                  Irregular Campaigns
                </h4>
                <p className="text-[15px] text-brand-navy/60 mt-2 max-w-md mx-auto leading-relaxed">
                  Running marketing activities in fits and starts, resulting in
                  erratic cash flows.
                </p>
              </div>

              {/* Visual Placeholder */}
              <div className="absolute left-10 right-10 bottom-[-5%] h-[65%] bg-white rounded-t-[2.5rem] shadow-2xl border border-black/[0.03] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 overflow-hidden">
                <IrregularCampaignsVisual isHovered={card1Hovered} />
              </div>
            </div>

            {/* Card 2 */}
            <div
              onMouseEnter={() => setCard2Hovered(true)}
              onMouseLeave={() => setCard2Hovered(false)}
              className="relative bg-[#eff3fe] rounded-[2rem] p-8 flex flex-col justify-end min-h-[420px] overflow-hidden group border border-transparent hover:border-brand-navy/5 transition-colors"
            >
              {/* Visual Placeholder */}
              <div className="absolute left-8 right-8 top-8 bottom-44 bg-white rounded-[2rem] shadow-xl border border-black/[0.03] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <MultipleVendorChaosVisual isHovered={card2Hovered} />
              </div>

              <div className="relative z-10 text-center mt-auto">
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">
                  Multiple Vendor Chaos
                </h4>
                <p className="text-[14px] text-brand-navy/60 leading-relaxed mt-2">
                  Working with disconnected agencies leads to lack of alignment.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onMouseEnter={() => setCard3Hovered(true)}
              onMouseLeave={() => setCard3Hovered(false)}
              className="relative bg-[#eff3fe] rounded-[2rem] p-8 flex flex-col justify-end min-h-[420px] overflow-hidden group border border-transparent hover:border-brand-navy/5 transition-colors"
            >
              <div className="absolute left-8 right-8 top-8 bottom-44 bg-white rounded-[2rem] shadow-xl border border-black/[0.03] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 overflow-hidden px-4 py-2">
                <ActivityOverDirectionVisual isHovered={card3Hovered} />
              </div>

              <div className="relative z-10 text-center mt-auto">
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">
                  Activity Over Direction
                </h4>
                <p className="text-[14px] text-brand-navy/60 leading-relaxed mt-2">
                  Focusing heavily on execution instead of strategic alignment.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div
              onMouseEnter={() => setCard4Hovered(true)}
              onMouseLeave={() => setCard4Hovered(false)}
              className="relative bg-[#eff3fe] rounded-[2rem] p-8 flex flex-col items-center justify-start min-h-[420px] overflow-hidden group border border-transparent hover:border-brand-navy/5 transition-colors"
            >
              <div className="relative z-10 text-center mt-2">
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">
                  Consistency Struggles
                </h4>
                <p className="text-[14px] text-brand-navy/60 leading-relaxed mt-2">
                  Struggling to maintain a unified brand message and consistent
                  presence.
                </p>
              </div>

              <div className="absolute left-8 right-8 bottom-8 top-36 bg-white rounded-[2rem] shadow-xl border border-black/[0.03] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 overflow-hidden">
                <ConsistencyStrugglesVisual isHovered={card4Hovered} />
              </div>
            </div>

            {/* Card 5 */}
            <div
              onMouseEnter={() => setCard5Hovered(true)}
              onMouseLeave={() => setCard5Hovered(false)}
              className="relative bg-[#eff3fe] rounded-[2rem] p-8 flex flex-col justify-end min-h-[420px] overflow-hidden group border border-transparent hover:border-brand-navy/5 transition-colors"
            >
              <div className="absolute left-8 right-8 top-8 bottom-44 bg-white rounded-[2rem] shadow-xl border border-black/[0.03] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2 overflow-hidden px-4 py-2">
                <UnclearROIVisual isHovered={card5Hovered} />
              </div>

              <div className="relative z-10 text-center mt-auto">
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">
                  Unclear ROI
                </h4>
                <p className="text-[14px] text-brand-navy/60 leading-relaxed mt-2">
                  Inability to track return on investment from multiple
                  channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Section */}
      <div
        id="service"
        className="relative z-20 w-full bg-white py-12 md:py-16 border-t border-brand-navy/[0.04] flex flex-col items-center overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(22, 20, 67, 0.07) 0%, rgba(22, 20, 67, 0) 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <ScrollReveal
              as="h2"
              containerClassName="text-[32px] sm:text-[40px] font-bold text-brand-navy tracking-tight mt-2"
            >
              Our Services &amp; Expertise
            </ScrollReveal>
            <p className="text-[15px] sm:text-[17px] text-brand-navy/70 mt-2 leading-relaxed">
              We build cohesive marketing engines that turn scattered, expensive
              campaigns into predictable growth channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Interactive vertical list (col-span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-1.5 relative">
              {/* Sliding Background Indicator */}
              <div
                ref={selectorRef}
                className="absolute left-0 right-0 bg-white border border-brand-navy/[0.06] shadow-premium rounded-xl pointer-events-none z-0 opacity-0"
              />
              {servicesData.map((service, idx) => {
                const isActive = idx === activeService;
                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      itemsRef.current[idx] = el;
                    }}
                    onClick={() => setActiveService(idx)}
                    className={`flex items-center gap-3 p-2.5 px-3.5 lg:h-[85px] h-auto rounded-xl cursor-pointer select-none border transition-all duration-300 relative z-10 ${
                      isActive
                        ? "border-transparent opacity-100"
                        : "border-transparent opacity-60 hover:opacity-85"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isActive
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "bg-brand-navy/5 text-brand-navy"
                      }`}
                    >
                      <service.icon className="w-4.5 h-4.5" />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                      <h3 className="text-[15.5px] font-semibold text-brand-navy tracking-tight">
                        {service.title}
                      </h3>
                      <div
                        ref={(el) => {
                          descRefs.current[idx] = el;
                        }}
                        className="overflow-hidden text-[13px] text-brand-navy/60 leading-relaxed"
                        style={{ height: isActive ? "auto" : 0 }}
                      >
                        <p className="mt-1.5">{service.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: iPad Horizontal Mockup + Floating Overlay Card (col-span 7) */}
            <div className="lg:col-span-7 flex justify-center items-center relative py-4 lg:py-6">
              {/* Horizontal iPad Frame */}
              <div className="relative w-full max-w-[680px] aspect-[4/3] bg-brand-navy rounded-[30px] p-3.5 shadow-2xl border-4 border-brand-navy-light/80 flex items-center justify-center z-10">
                {/* Screen area */}
                <div className="w-full h-full bg-[#f8fafc] rounded-[18px] overflow-hidden relative border border-brand-navy/10 flex flex-col p-3.5">
                  <ActiveMockup index={activeService} />
                </div>

                {/* Home/Camera Pill Button */}
                <div className="absolute top-1/2 left-2.5 -translate-y-1/2 w-1.5 h-6 bg-brand-navy-light/60 rounded-full" />
              </div>

              {/* Floating Card Overlay */}
              <div className="absolute right-[-10px] md:right-[15px] lg:right-[-10px] top-[6%] w-[180px] bg-white rounded-xl p-3 shadow-premium border border-brand-navy/[0.04] transition-all duration-300 z-20 hover:scale-[1.02] hover:shadow-card-hover">
                <ActiveOverlay index={activeService} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Architecture Section (Process) */}
      <div
        id="blueprint"
        className="relative z-20 w-full bg-[#f8fafc] text-brand-navy py-28 flex flex-col items-center select-none overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] z-0"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(22, 20, 67, 0.07) 0%, rgba(22, 20, 67, 0) 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)",
            }}
          />
        </div>

        {/* Desktop Absolute Layout (>= md) */}
        <div className="relative w-full max-w-5xl h-[1350px] hidden md:block z-10">
          {/* Header block on left */}
          <div className="absolute left-[6%] top-[4%] max-w-md">
            <ScrollReveal
              as="h2"
              containerClassName="text-[34px] lg:text-[40px] font-bold text-brand-navy leading-[1.15] tracking-tight mt-5"
            >
              Let us show you how we drive your brand to new heights
            </ScrollReveal>
            <p className="text-[15px] text-brand-navy/70 mt-5 leading-relaxed">
              Our structured operational framework is engineered to align,
              optimize, and scale your brand's digital presence systematically.
            </p>

            {/* Cute cursive loop arrow pointing towards the first card */}
            <svg
              className="w-14 h-14 text-brand-orange mt-6 ml-12 opacity-80 animate-pulse-subtle"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20,20 C40,20 60,30 70,50 C75,60 70,70 60,75 C55,78 45,72 50,60 C52,55 60,55 65,58 L75,65"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M68,52 L78,65 L60,68"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* SVG dashed curving line path */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 1350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M580,180 C400,240 220,380 200,540 C180,700 540,780 560,920 C580,1060 220,1120 190,1230"
                stroke="#cbd5e1"
                strokeWidth="3"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Cards map */}
          {[
            {
              step: "01",
              phase: "Define",
              tagline:
                "Define the growth roadmap before spending a single rupee.",
              bullets: [
                "Market & competitor analysis",
                "Audience segmentation & offers",
                "Funnel structure strategy",
                "Clear KPI framework setup",
              ],
              rotation: 3,
              position: "left-[58%] top-[5%]",
            },
            {
              step: "02",
              phase: "Design",
              tagline:
                "Precision-built campaigns engineered for high performance.",
              bullets: [
                "Account & structure setups",
                "Conversion pixel integrations",
                "Ad creative development",
                "Multi-channel deployments",
              ],
              rotation: -2,
              position: "left-[8%] top-[38%]",
            },
            {
              step: "03",
              phase: "Build",
              tagline: "Data-led refinement to improve efficiency & margins.",
              bullets: [
                "Creative & copy A/B tests",
                "Dynamic budget allocation",
                "CPA reduction sprints",
                "Funnel drop-off fixes",
              ],
              rotation: 2,
              position: "left-[52%] top-[62%]",
            },
            {
              step: "04",
              phase: "Launch",
              tagline: "Scale what works. Systematically stop what doesn't.",
              bullets: [
                "Winning asset scaling",
                "Lookalike & broad targeting",
                "Multi-platform expansion",
                "Revenue growth playbook",
              ],
              rotation: -4,
              position: "left-[6%] top-[84%]",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={handleCardMouseEnter}
              style={{
                transformOrigin: "top center",
                transform: `rotate(${item.rotation}deg)`,
              }}
              className={`absolute ${item.position} w-[285px] h-[310px] bg-[#f6861f] rounded-2xl border border-white/10 shadow-[0_8px_30px_rgba(246,134,31,0.15)] p-5 select-none transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(246,134,31,0.3)] flex flex-col justify-between`}
            >
              {/* Grommet metallic ring hole */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-md" />
              </div>

              {/* Double line/inset border */}
              <div className="absolute inset-2.5 rounded-[12px] border border-white/10 pointer-events-none" />

              {/* Card Content */}
              <div className="pt-6 px-1 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-3.5 mb-3.5">
                    <span className="text-[12px] font-extrabold tracking-wider text-brand-navy font-mono">
                      {item.step}
                    </span>
                    <span className="text-[15px] font-extrabold text-brand-navy tracking-tight uppercase">
                      {item.phase}
                    </span>
                  </div>
                  <p className="text-[13px] text-white font-bold leading-snug mb-3">
                    {item.tagline}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 border-t border-white/15 pt-3.5 pb-2">
                  {item.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2 text-[11.5px] text-white/85 font-medium"
                    >
                      <span className="text-brand-navy font-extrabold text-[9px] mt-0.5">
                        ➔
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Footer cursive script text */}
          <div className="absolute left-[45%] top-[90%] flex flex-col items-start select-none">
            <span className="font-cursive text-[32px] lg:text-[36px] text-[#161443] rotate-[-4deg] tracking-wide">
              Ready to be delivered!
            </span>
          </div>
        </div>

        {/* Mobile Vertical Flow Layout (< md) */}
        <div className="w-full max-w-md flex flex-col items-center px-4 md:hidden z-10">
          {/* Mobile Header */}
          <div className="text-center mb-10">
            <ScrollReveal
              as="h2"
              containerClassName="text-[32px] font-bold text-brand-navy leading-tight tracking-tight mt-4"
            >
              Let us show you how we drive your brand to new heights
            </ScrollReveal>
            <p className="text-[14px] text-brand-navy/70 mt-3 leading-relaxed">
              Our operational framework is engineered to align, optimize, and
              scale your digital presence systematically.
            </p>
          </div>

          {/* Cards Stack */}
          <div className="flex flex-col gap-8 w-full items-center">
            {[
              {
                step: "01",
                phase: "Define",
                tagline:
                  "Define the growth roadmap before spending a single rupee.",
                bullets: [
                  "Market & competitor analysis",
                  "Audience segmentation & offers",
                  "Funnel structure strategy",
                  "Clear KPI framework setup",
                ],
                rotation: 2,
              },
              {
                step: "02",
                phase: "Design",
                tagline:
                  "Precision-built campaigns engineered for high performance.",
                bullets: [
                  "Account & structure setups",
                  "Conversion pixel integrations",
                  "Ad creative development",
                  "Multi-channel deployments",
                ],
                rotation: -1.5,
              },
              {
                step: "03",
                phase: "Build",
                tagline: "Data-led refinement to improve efficiency & margins.",
                bullets: [
                  "Creative & copy A/B tests",
                  "Dynamic budget allocation",
                  "CPA reduction sprints",
                  "Funnel drop-off fixes",
                ],
                rotation: 1.5,
              },
              {
                step: "04",
                phase: "Launch",
                tagline: "Scale what works. Systematically stop what doesn't.",
                bullets: [
                  "Winning asset scaling",
                  "Lookalike & broad targeting",
                  "Multi-platform expansion",
                  "Revenue growth playbook",
                ],
                rotation: -2,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={handleCardMouseEnter}
                style={{
                  transformOrigin: "top center",
                  transform: `rotate(${item.rotation}deg)`,
                }}
                className="w-full max-w-[310px] h-[310px] bg-[#f6861f] rounded-2xl border border-white/10 shadow-[0_8px_30px_rgba(246,134,31,0.15)] p-5 select-none transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(246,134,31,0.3)] flex flex-col justify-between relative"
              >
                {/* Grommet metallic ring hole */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-md" />
                </div>

                {/* Double line/inset border */}
                <div className="absolute inset-2.5 rounded-[12px] border border-white/10 pointer-events-none" />

                {/* Card Content */}
                <div className="pt-6 px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between border-b border-white/15 pb-3.5 mb-3.5">
                      <span className="text-[12px] font-extrabold tracking-wider text-brand-navy font-mono">
                        {item.step}
                      </span>
                      <span className="text-[15px] font-extrabold text-brand-navy tracking-tight uppercase">
                        {item.phase}
                      </span>
                    </div>
                    <p className="text-[13px] text-white font-bold leading-snug mb-3">
                      {item.tagline}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2 border-t border-white/15 pt-3.5 pb-2">
                    {item.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-[11.5px] text-white/85 font-medium"
                      >
                        <span className="text-brand-navy font-extrabold text-[9px] mt-0.5">
                          ➔
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Footer text */}
          <div className="mt-10 select-none">
            <span className="font-cursive text-[30px] text-[#161443] rotate-[-2deg] tracking-wide inline-block">
              Ready to be delivered!
            </span>
          </div>
        </div>
      </div>

      {/* Who We Support Section */}
      <div
        id="industries"
        className="relative z-20 w-full bg-white py-24 flex flex-col items-center select-none overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(22, 20, 67, 0.07) 0%, rgba(22, 20, 67, 0) 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal
              as="h2"
              containerClassName="text-[36px] sm:text-[48px] font-bold text-brand-navy tracking-tight mt-3"
            >
              Businesses We Support
            </ScrollReveal>
            <p className="text-[16px] sm:text-[18px] text-brand-navy/70 mt-4 leading-relaxed">
              We build specialized client pipelines across diverse industry
              sectors and organizational scales.
            </p>
          </div>

          {/* 4 Core Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                title: "Growing Businesses",
                desc: "Scaling companies looking to transition from basic ad buying to highly structured, predictable growth channels.",
                icon: "📈",
              },
              {
                title: "Brands Building Visibility",
                desc: "Companies needing cross-platform presence (Meta, YouTube, Search) to dominate market share and brand recognition.",
                icon: "📣",
              },
              {
                title: "Teams Needing Support",
                desc: "Internal marketing teams requiring external strategic audits, setup optimization, and advanced analytics integrations.",
                icon: "🤝",
              },
              {
                title: "Independent Founders",
                desc: "Founders managing marketing themselves who are ready to hand off operations to clear, structured automation engines.",
                icon: "💡",
              },
            ].map((profile, idx) => (
              <div
                key={idx}
                className="bg-[#f8fafc] border border-brand-navy/5 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
              >
                <span className="text-[28px] block mb-4">{profile.icon}</span>
                <h4 className="text-[16px] font-bold text-brand-navy tracking-tight">
                  {profile.title}
                </h4>
                <p className="text-[13px] text-brand-navy/60 leading-relaxed mt-2">
                  {profile.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Industry Sectors Marquee/Pills Grid */}
          <div className="border border-brand-navy/5 bg-[#fafaf9] rounded-2xl p-6 lg:p-8 text-center shadow-sm">
            <div className="flex flex-wrap justify-center gap-2.5 max-w-5xl mx-auto">
              {[
                "D2C Brands",
                "Real Estate",
                "B2B Brands",
                "FMCG",
                "Hospitals",
                "Hospitality",
                "Education",
                "Fashion",
                "E-Commerce",
                "Retail",
                "Travel",
                "Automobile",
              ].map((industry, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-white border border-brand-navy/5 rounded-full text-[11px] font-extrabold text-brand-navy tracking-tight shadow-sm hover:border-brand-orange/30 hover:text-brand-orange transition-all duration-300"
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="relative z-20 w-full bg-[#161443] text-white pt-20 pb-10 flex flex-col items-center overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(246, 134, 31, 0.1) 0%, rgba(246, 134, 31, 0) 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(22, 20, 67, 0.05) 0%, rgba(22, 20, 67, 0) 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          {/* Leadership and Background block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Bio Card (col-span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-center select-none">
              <h3 className="text-[32px] sm:text-[40px] font-bold tracking-tight mt-3 text-white">
                Ankit Jani
              </h3>
              <p className="text-[14px] sm:text-[16px] font-bold text-[#f6861f] tracking-[0.1em] uppercase mt-1">
                Business Head
              </p>
              <p className="text-[15px] sm:text-[16px] text-white/90 mt-5 leading-relaxed max-w-2xl font-light">
                Background across media, marketing exposure and client
                partnerships, having worked closely with businesses and brands
                on communication, campaigns and market visibility.
              </p>

              <div className="mt-6 border-l-2 border-[#f6861f] pl-4">
                <span className="text-[12px] text-white font-bold uppercase tracking-wider block mb-4">
                  Focus today:
                </span>
                <p className="text-[14px] text-white/80 leading-relaxed mt-1 font-light">
                  Bringing structure and clarity to marketing, backed by
                  extensive cross-platform experience across Print, Radio,
                  Television, YouTube, Zee5, SonyLiv, Hotstar, Netflix, along
                  with expertise in Brand Solutions.
                </p>
              </div>

              <p className="text-[15px] sm:text-[16px] text-white/90 mt-6 leading-relaxed max-w-2xl font-light">
                Ankit plays an instrumental role at Jukebox Media, helping
                businesses transform scattered marketing efforts into focused,
                consistent strategies aligned with their broader business
                objectives and built to deliver measurable impact.
              </p>
            </div>

            {/* Right Column: Profile Image + Media Houses Logos (col-span 5) */}
            <div className="lg:col-span-5 bg-white/10 border border-white/15 rounded-3xl p-6 flex flex-col justify-between items-center shadow-lg relative overflow-hidden backdrop-blur-sm select-none">
              {/* Profile image container */}
              <div className="relative h-28 w-28 rounded-full border-2 border-white overflow-hidden mb-6 flex items-center justify-center bg-brand-navy shadow-lg shrink-0">
                <img
                  src="/ankit.jpeg"
                  alt="Ankit Jani"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Media Network Icons/badges Row */}
              <div className="grid grid-cols-5 gap-2.5 w-full items-center justify-items-center opacity-70">
                <div className="text-[8.5px] font-extrabold bg-white/10 text-white px-1.5 py-0.5 rounded tracking-tighter w-full text-center truncate">
                  SONY
                </div>
                <div className="text-[8.5px] font-extrabold bg-white/10 text-white px-1.5 py-0.5 rounded tracking-tighter w-full text-center truncate">
                  ZEE5
                </div>
                <div className="text-[8.5px] font-extrabold bg-white/10 text-white px-1.5 py-0.5 rounded tracking-tighter w-full text-center truncate">
                  VIACOM18
                </div>
                <div className="text-[8.5px] font-extrabold bg-white/10 text-white px-1.5 py-0.5 rounded tracking-tighter w-full text-center truncate">
                  TIMES
                </div>
                <div className="text-[8.5px] font-extrabold bg-white/10 text-white px-1.5 py-0.5 rounded tracking-tighter w-full text-center truncate">
                  MIRCHI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div
        id="testimonial"
        className="relative z-20 w-full bg-white py-12 border-t border-brand-navy/[0.04] flex flex-col items-center select-none overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(22, 20, 67, 0.07) 0%, rgba(22, 20, 67, 0) 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)",
            }}
          />
        </div>

        {/* Heading container */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-6">
          <div className="text-center max-w-3xl mx-auto">
            <ScrollReveal
              as="h2"
              containerClassName="text-[36px] sm:text-[48px] font-bold text-brand-navy tracking-tight mt-3"
            >
              What Our Partners Say
            </ScrollReveal>
            <p className="text-[16px] sm:text-[18px] text-brand-navy/70 mt-4 leading-relaxed">
              Real feedback from the business heads, directors, and campaign
              partners we work with.
            </p>
          </div>
        </div>

        {/* Testimonials component */}
        <div className="w-full relative z-10">
          <TestimonialsEditorial />
        </div>
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        className="relative z-30 w-full min-h-screen bg-[#f6861f] py-24 sm:py-32 border-t border-white/[0.08] flex flex-col items-center justify-start select-none overflow-hidden"
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] z-0 pointer-events-none"></div>

        <div className="max-w-[1600px] mx-auto px-6 w-full relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-field">
            <ScrollReveal
              as="h2"
              containerClassName="text-[36px] sm:text-[48px] font-bold text-white tracking-tight mt-3"
            >
              Transparent Pricing Packages
            </ScrollReveal>
            <p className="text-[16px] sm:text-[18px] text-white/85 mt-4 leading-relaxed">
              No hidden fees. Choose the plan that fits your team size and
              campaign targets.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full mx-auto px-4 items-stretch">
            {/* Card 1: Jukebox Starter */}
            <div className="bg-white border border-slate-100 rounded-[2.2rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(22,20,67,0.03)] transition-all duration-500 ease-out hover:shadow-[0_30px_60px_rgba(22,20,67,0.08)] hover:-translate-y-2 hover:border-[#f6861f]/20 h-full relative overflow-hidden group">
              {/* Corner decor tag */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full pointer-events-none z-0 transition-colors group-hover:bg-orange-50/50" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-[22px] font-black text-brand-navy tracking-tight mt-1">
                    Jukebox Starter
                  </h3>

                  <div className="flex flex-col mt-4">
                    <span className="text-[40px] font-black tracking-tight text-brand-navy leading-none">
                      ₹24,000
                    </span>
                    <span className="text-[13px] font-bold text-slate-500 mt-1.5">
                      / 3 Months per Brand
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 block mt-1">
                      (Exclusive of GST)
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100 my-5" />

                  <p className="text-[13px] text-slate-500 font-semibold leading-relaxed">
                    Ideal for businesses looking to establish a consistent
                    social media presence.
                  </p>

                  <div className="mt-6">
                    <span className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider block mb-4">
                      Includes:
                    </span>
                    <ul className="flex flex-col gap-3">
                      {[
                        "24 Static Posts",
                        "Content Calendar",
                        "Copywriting & Captions",
                        "Graphic Design",
                        "Basic Editing",
                        "Posting Schedule",
                      ].map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 items-start text-[13px] text-slate-600 font-semibold"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <svg
                              className="w-3.5 h-3.5"
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
                          <span className="mt-0.5">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="w-full py-4 mt-8 bg-brand-navy hover:bg-[#1f1b5c] text-white rounded-2xl text-[13px] font-bold tracking-wide transition-all shadow-[0_4px_12px_rgba(22,20,67,0.1)] hover:shadow-[0_8px_20px_rgba(22,20,67,0.2)] cursor-pointer text-center uppercase">
                  Get Started
                </button>
              </div>
            </div>

            {/* Card 2: Jukebox Growth Package */}
            <div className="bg-[#161443] border border-white/10 rounded-[2.2rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 ease-out hover:shadow-[0_30px_70px_rgba(246,134,31,0.25)] hover:-translate-y-2 hover:border-[#f6861f]/40 h-full relative overflow-hidden group">
              {/* Highlight flare line */}
              <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-transparent via-[#f6861f] to-transparent animate-pulse" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-end">
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase bg-[#f6861f] text-white shadow-[0_2px_8px_rgba(246,134,31,0.4)]">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="text-[22px] font-black text-white tracking-tight mt-1">
                    Jukebox Growth
                  </h3>

                  <div className="flex flex-col mt-4">
                    <span className="text-[40px] font-black tracking-tight text-white leading-none">
                      ₹53,000
                    </span>
                    <span className="text-[13px] font-bold text-white/60 mt-1.5">
                      / 3 Months per Brand
                    </span>
                    <span className="text-[10px] font-bold text-white/40 block mt-1">
                      (Exclusive of GST)
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-white/10 my-5" />

                  <p className="text-[13px] text-white/70 font-semibold leading-relaxed">
                    Ideal for brands looking to combine consistent content with
                    short-form video.
                  </p>

                  <div className="mt-6">
                    <span className="text-[11px] font-extrabold text-white uppercase tracking-wider block mb-4">
                      Includes:
                    </span>
                    <ul className="flex flex-col gap-3">
                      {[
                        "24 Static Posts",
                        "12 Reels",
                        "Content Calendar",
                        "Copywriting & Captions",
                        "Graphic Design",
                        "Video Editing",
                        "Posting Schedule",
                      ].map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 items-start text-[13px] text-white/90 font-semibold"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#f6861f]/10 text-[#f6861f] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <svg
                              className="w-3.5 h-3.5"
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
                          <span className="mt-0.5">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="w-full py-4 mt-8 bg-[#f6861f] hover:bg-[#ff9633] text-white rounded-2xl text-[13px] font-bold tracking-wide transition-all shadow-[0_4px_15px_rgba(246,134,31,0.3)] hover:shadow-[0_8px_25px_rgba(246,134,31,0.5)] cursor-pointer text-center uppercase">
                  Get Started
                </button>
              </div>
            </div>

            {/* Card 3: Jukebox Brand Retainer */}
            <div className="bg-white border border-slate-100 rounded-[2.2rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(22,20,67,0.03)] transition-all duration-500 ease-out hover:shadow-[0_30px_60px_rgba(22,20,67,0.08)] hover:-translate-y-2 hover:border-[#f6861f]/20 h-full relative overflow-hidden group">
              {/* Corner decor tag */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full pointer-events-none z-0 transition-colors group-hover:bg-orange-50/50" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-[22px] font-black text-brand-navy tracking-tight mt-1">
                    Jukebox Retainer
                  </h3>

                  <div className="flex flex-col mt-4">
                    <span className="text-[40px] font-black tracking-tight text-brand-navy leading-none">
                      ₹64,000
                    </span>
                    <span className="text-[13px] font-bold text-slate-500 mt-1.5">
                      / Month per Brand
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 block mt-1">
                      (Exclusive of GST)
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100 my-5" />

                  <p className="text-[13px] text-slate-500 font-semibold leading-relaxed">
                    A complete branding, content and growth solution.
                  </p>

                  <div className="mt-6 space-y-4">
                    <span className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider block">
                      Scope:
                    </span>

                    {/* Strategy Block */}
                    <div className="p-3 bg-slate-50/80 border border-slate-100/50 rounded-2xl">
                      <span className="text-[10px] font-black text-brand-navy uppercase tracking-wider block mb-1.5">
                        Strategy & Branding
                      </span>
                      <ul className="space-y-1.5 text-[12px] text-slate-600 font-semibold">
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>
                            Brand Strategy Deck (Created once per brand)
                          </span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>Content & Performance Strategy</span>
                        </li>
                      </ul>
                    </div>

                    {/* Content Block */}
                    <div className="p-3 bg-slate-50/80 border border-slate-100/50 rounded-2xl">
                      <span className="text-[10px] font-black text-brand-navy uppercase tracking-wider block mb-1.5">
                        High-Impact Content
                      </span>
                      <ul className="space-y-1.5 text-[12px] text-slate-600 font-semibold">
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>24 Static Posts & 12 Reels</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>Copywriting, Captions & Scheduling</span>
                        </li>
                      </ul>
                    </div>

                    {/* Performance Block */}
                    <div className="p-3 bg-slate-50/80 border border-slate-100/50 rounded-2xl">
                      <span className="text-[10px] font-black text-[#f6861f] uppercase tracking-wider block mb-1.5">
                        Paid Ads & Search
                      </span>
                      <ul className="space-y-1.5 text-[12px] text-slate-600 font-semibold">
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>Meta & Google Ads Management</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>Ad Creative Direction & Setup</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>Google SEM Management (Up to 8 Keywords)</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-[11px] text-slate-400 font-semibold italic mt-2">
                      * Advertising spend is billed directly by Meta, Google and
                      other platforms.
                    </p>
                  </div>
                </div>

                <button className="w-full py-4 mt-8 bg-brand-navy hover:bg-[#1f1b5c] text-white rounded-2xl text-[13px] font-bold tracking-wide transition-all shadow-[0_4px_12px_rgba(22,20,67,0.1)] hover:shadow-[0_8px_20px_rgba(22,20,67,0.2)] cursor-pointer text-center uppercase">
                  Get Started
                </button>
              </div>
            </div>

            {/* Card 4: Jukebox Performance Accelerator */}
            <div className="bg-white border border-slate-100 rounded-[2.2rem] p-8 md:p-10 flex flex-col justify-between shadow-[0_15px_40px_rgba(22,20,67,0.03)] transition-all duration-500 ease-out hover:shadow-[0_30px_60px_rgba(22,20,67,0.08)] hover:-translate-y-2 hover:border-[#f6861f]/20 h-full relative overflow-hidden group">
              {/* Corner decor tag */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full pointer-events-none z-0 transition-colors group-hover:bg-orange-50/50" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-[22px] font-black text-brand-navy tracking-tight mt-1">
                    Jukebox Performance
                  </h3>

                  <div className="flex flex-col mt-4">
                    <span className="text-[40px] font-black tracking-tight text-brand-navy leading-none">
                      ₹26,000
                    </span>
                    <span className="text-[13px] font-bold text-slate-500 mt-1.5">
                      / Month per Brand
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 block mt-1">
                      (Exclusive of GST)
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100 my-5" />

                  <p className="text-[13px] text-slate-500 font-semibold leading-relaxed">
                    For businesses focused on lead generation, conversions and
                    measurable growth.
                  </p>

                  <div className="mt-6">
                    <span className="text-[11px] font-extrabold text-brand-navy uppercase tracking-wider block mb-4">
                      Includes:
                    </span>
                    <ul className="flex flex-col gap-3">
                      {[
                        "Meta Ads Management",
                        "Google Ads Management",
                        "LinkedIn Ads Management",
                        "Funnel Strategy",
                        "Campaign Setup & Optimization",
                        "Audience Research",
                        "Monthly Reporting & Performance Review",
                      ].map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 items-start text-[13px] text-slate-600 font-semibold"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <svg
                              className="w-3.5 h-3.5"
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
                          <span className="mt-0.5">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-[11px] text-slate-400 font-semibold leading-relaxed italic mt-4">
                      * Advertising spend is billed directly by Meta, Google and
                      other platforms. This package doesn&apos;t include Ad
                      Creatives.
                    </p>
                  </div>
                </div>

                <button className="w-full py-4 mt-8 bg-brand-navy hover:bg-[#1f1b5c] text-white rounded-2xl text-[13px] font-bold tracking-wide transition-all shadow-[0_4px_12px_rgba(22,20,67,0.1)] hover:shadow-[0_8px_20px_rgba(22,20,67,0.2)] cursor-pointer text-center uppercase">
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Info: Common Features + Additional Charges */}
          <div
            id="pricing-additional"
            className="mt-20 max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-white relative z-10"
          >
            {/* Common Features Card */}
            <div className="bg-[#161443] bg-opacity-35 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-lg">
              <h3 className="text-[18px] font-bold text-white tracking-tight flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#161443] border border-[#f6861f] block animate-pulse"></span>
                Common Features Across All Packages
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Copywriting & Captions",
                  "Content Planning",
                  "Editing & Optimization",
                  "Content Calendar",
                  "Posting Schedule",
                  "Content Shoot using iPhone 16 or above",
                ].map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 items-start text-[13px] text-white/85 font-semibold leading-snug"
                  >
                    <div className="text-white shrink-0 mt-0.5">•</div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Charges Card */}
            <div className="bg-[#161443] bg-opacity-35 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-lg">
              <h3 className="text-[18px] font-bold text-white tracking-tight flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#161443] border border-[#f6861f] block"></span>
                Additional Charges (If required)
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  "Professional Camera Shoot",
                  "Studio Rental",
                  "Models & Talent",
                  "Production Crew",
                  "Advanced Video Production",
                  "Travel & Location Costs",
                ].map((charge, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 items-start text-[13px] text-white/85 font-semibold leading-snug"
                  >
                    <div className="text-white shrink-0 mt-0.5">•</div>
                    <span>{charge}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div className="flex gap-2.5 items-start text-[12.5px] text-white/80 font-semibold leading-relaxed">
                  <div className="text-white shrink-0 mt-0.5">•</div>
                  <span>
                    Creative revisions for static posts and videos are limited
                    to two rounds. Any revisions beyond this will be charged at
                    10% of the total package value per revision. Corrections
                    relating to approved content are not considered revisions.
                  </span>
                </div>
                <div className="flex gap-2.5 items-start text-[12.5px] text-white/80 font-semibold leading-relaxed">
                  <div className="text-white shrink-0 mt-0.5">•</div>
                  <span>
                    Platform-specific advertising support (LinkedIn, Reddit,
                    JioHotstar and other premium media platforms)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Note / Footer Statement */}
          <div className="text-center mt-12 mb-6 text-[#161443] text-[13px] font-bold tracking-wide select-none">
            * All prices are exclusive of GST.
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-[#161443] py-20 px-6 sm:px-12 md:px-16 flex justify-center border-t border-white/10 relative z-30">
        <div className="max-w-[1600px] w-full flex flex-col justify-between text-white relative">
          {/* Top Row: Links, Contact, Address */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
            {/* Left Column: Navigation links */}
            <div className="flex flex-col gap-4 text-left">
              <ul className="flex flex-col gap-3">
                {[
                  { name: "Home", id: "#home" },
                  { name: "Works", id: "#testimonial" },
                  { name: "Services", id: "#service" },
                  { name: "About", id: "#about" },
                  { name: "Pricing", id: "#pricing" },
                  { name: "Contact us", id: "contact" },
                ].map((link, idx) => (
                  <li key={idx}>
                    {link.id === "contact" ? (
                      <button
                        onClick={() =>
                          window.dispatchEvent(
                            new CustomEvent("openContactForm"),
                          )
                        }
                        className="text-[14px] font-semibold text-white/70 hover:text-[#f6861f] transition-all duration-300 cursor-pointer text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.id}
                        onClick={(e) => {
                          e.preventDefault();
                          if ((window as any).lenis)
                            (window as any).lenis.scrollTo(link.id);
                        }}
                        className="text-[14px] font-semibold text-white/70 hover:text-[#f6861f] transition-all duration-300 cursor-pointer"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Middle Column: Contact Us */}
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="text-[15px] font-bold text-white select-none">
                Contact Us
              </span>
              <div className="flex flex-col gap-1.5 mt-2">
                <a
                  href="mailto:connect@jukeboxmedia.in"
                  className="text-[14px] font-semibold text-white/80 hover:text-[#f6861f] transition-all duration-300"
                >
                  connect@jukeboxmedia.in
                </a>
                <a
                  href="tel:+919998526134"
                  className="text-[14px] font-semibold text-white/60 hover:text-[#f6861f] transition-all duration-300 select-none"
                >
                  +91-9998526134
                </a>
              </div>

              {/* Social Media Badges */}
              <div className="flex gap-3 mt-4">
                {[
                  {
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                    ),
                    url: "https://linkedin.com",
                  },
                  {
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m12.4 2.75a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75.75.75 0 0 1 .75.75M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                      </svg>
                    ),
                    url: "https://instagram.com",
                  },
                ].map((badge, index) => (
                  <a
                    key={index}
                    href={badge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-[#f6861f] hover:bg-[#f6861f] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {badge.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: Company Info */}
            <div className="flex flex-col items-end gap-4 text-right">
              <span className="text-[15px] font-bold text-white select-none">
                Jukebox Media
              </span>
              <div className="text-[14px] font-semibold text-white/70 leading-relaxed mt-2 select-none">
                <p>Operating Globally | Based in India</p>
                <p className="text-white/40 mt-1 text-[12px] font-medium">
                  CIN: U73100GJ2025PTC171031
                </p>
              </div>
            </div>
          </div>

          {/* Middle Row: Copyright & Legal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full text-[13px] text-white/50 font-medium select-none mt-20">
            <div className="text-left">
              © {new Date().getFullYear()} Jukebox Media. All Rights Reserved.
            </div>
            <div className="text-center">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#f6861f] transition-all duration-300"
              >
                Terms & Conditions
              </a>
            </div>
            <div className="text-right">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hover:text-[#f6861f] transition-all duration-300"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Bottom Row: Giant logo text removed */}
        </div>
      </footer>
    </>
  );
}

// ==========================================
// Services Interactive Dashboard Data & Helpers
// ==========================================

const servicesData = [
  {
    title: "Brand Strategy",
    description:
      "Data-backed growth blueprints. We map your audience, channels, and messaging into a cohesive system that scales.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      </svg>
    ),
  },
  {
    title: "Content Creation",
    description:
      "Scroll-stopping static posts, reels, and copy — designed to engage, convert, and build community.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
        />
      </svg>
    ),
  },
  {
    title: "Brand Storytelling",
    description:
      "We uncover your brand's core narrative and weave it into every touchpoint — turning facts into feelings that resonate.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    title: "Performance Marketing",
    description:
      "Paid ads across Meta, Google and YouTube focused on leads and revenue growth.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
        />
      </svg>
    ),
  },
  {
    title: "Personal Branding",
    description:
      "Position yourself as a thought leader. We architect your digital identity to build trust, authority, and influence.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
  {
    title: "Creative Advertising",
    description:
      "Ad creatives, copywriting, messaging and campaign creatives engineered for high conversion rates.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    ),
  },
  {
    title: "Celebrity Endorsements & Influencer Marketing",
    description:
      "Connecting your brand with key creators, public figures, and digital personalities to build trust and scale cultural relevance.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Branded Content",
    description:
      "Intellectual property, episodic series, podcast productions and customized brand-integrations designed to engage.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3c-1.2 0-2.4 0-3.6.48a6 6 0 00-3.8 5.64v2.76c0 .72.24 1.4.67 1.97l4.06 5.4c.43.57.67 1.25.67 1.97v1.03a1.5 1.5 0 002.4 1.2l1.2-.9a1.5 1.5 0 00.6-1.2v-1.13c0-.72.24-1.4.67-1.97l4.06-5.4a3.25 3.25 0 00.67-1.97V9.12a6 6 0 00-3.8-5.64A12 12 0 0012 3z"
        />
      </svg>
    ),
  },
];

const PerformanceMarketingMockup = () => {
  const [ctr, setCtr] = useState("0.00%");
  const [cpc, setCpc] = useState("$1.50");
  const [roas, setRoas] = useState("1.0x");

  const pathRef = useRef<SVGPathElement>(null);
  const gradPathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const gradPath = gradPathRef.current;
    const dot = dotRef.current;
    if (!path || !gradPath || !dot) return;

    const length = path.getTotalLength() || 260;

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(gradPath, { opacity: 0 });
    gsap.set(dot, { attr: { r: 0 }, opacity: 0 });

    const metrics = { ctr: 0, cpc: 1.5, roas: 1.0 };

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power1.inOut",
    })
      .to(
        gradPath,
        {
          opacity: 1,
          duration: 1.2,
          ease: "power1.out",
        },
        "-=1.2",
      )
      .to(
        dot,
        {
          attr: { r: 6 },
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.8)",
        },
        "-=0.4",
      )
      .to(
        metrics,
        {
          ctr: 3.82,
          cpc: 0.34,
          roas: 5.4,
          duration: 2.2,
          ease: "power1.inOut",
          onUpdate: () => {
            setCtr(`${metrics.ctr.toFixed(2)}%`);
            setCpc(`$${metrics.cpc.toFixed(2)}`);
            setRoas(`${metrics.roas.toFixed(1)}x`);
          },
        },
        0,
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none p-2">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-4">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Meta &amp; Google Ads Campaign
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-emerald-500 uppercase tracking-wider animate-pulse">
            Scaling Spend
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-brand-navy/5 p-3.5 rounded-xl text-center shadow-sm">
          <span className="text-[11px] block text-brand-navy/50 font-bold uppercase mb-0.5">
            CTR
          </span>
          <span className="text-[22px] font-extrabold text-brand-navy tracking-tight">
            {ctr}
          </span>
        </div>
        <div className="bg-brand-navy/5 p-3.5 rounded-xl text-center shadow-sm">
          <span className="text-[11px] block text-brand-navy/50 font-bold uppercase mb-0.5">
            CPC
          </span>
          <span className="text-[22px] font-extrabold text-brand-navy tracking-tight">
            {cpc}
          </span>
        </div>
        <div className="bg-brand-navy/5 p-3.5 rounded-xl text-center shadow-sm">
          <span className="text-[11px] block text-brand-navy/50 font-bold uppercase mb-0.5">
            ROAS
          </span>
          <span className="text-[22px] font-extrabold text-brand-orange tracking-tight">
            {roas}
          </span>
        </div>
      </div>
      <div className="flex-grow mt-6 relative flex items-end">
        <svg className="w-full h-44 overflow-visible" viewBox="0 0 200 80">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f6861f" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f6861f" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="0"
            y1="20"
            x2="200"
            y2="20"
            stroke="#161443"
            strokeOpacity="0.05"
            strokeDasharray="3 3"
          />
          <line
            x1="0"
            y1="50"
            x2="200"
            y2="50"
            stroke="#161443"
            strokeOpacity="0.05"
            strokeDasharray="3 3"
          />
          <path
            ref={gradPathRef}
            d="M0 75 C 130 75, 180 45, 200 3 L 200 80 L 0 80 Z"
            fill="url(#chartGrad)"
          />
          <path
            ref={pathRef}
            d="M0 75 C 130 75, 180 45, 200 3"
            fill="none"
            stroke="#f6861f"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle ref={dotRef} cx="200" cy="3" r="0" fill="#f6861f" />
        </svg>
      </div>
    </div>
  );
};
const FunnelCroMockup = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  const [valA] = useState("2.4%");
  const [valB, setValB] = useState("2.4%");
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const btn = btnRef.current;
    const splash = splashRef.current;
    if (!cursor || !btn || !splash) return;

    // Reset initial states
    setValB("2.4%");
    setShowWinner(false);
    gsap.set(cursor, { x: 80, y: 180, opacity: 0 });
    gsap.set(btn, { scale: 1 });
    gsap.set(splash, { opacity: 0, scale: 0.5 });

    const metrics = { valB: 2.4 };

    // Calculate center offset of target CTA button relative to the container
    const btnX = btn.offsetLeft + btn.offsetWidth / 2 - 5;
    const btnY = btn.offsetTop + btn.offsetHeight / 2 - 5;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

    tl.to(cursor, { opacity: 1, duration: 0.3 })
      // Move pointer cursor to Version B button
      .to(cursor, {
        x: btnX,
        y: btnY,
        duration: 1.2,
        ease: "power2.out",
      })
      // Hover scaling pulse
      .to(btn, { scale: 1.06, duration: 0.2 })
      // Click simulation down/up
      .to(cursor, { scale: 0.8, duration: 0.1 })
      .to(btn, { scale: 0.95, duration: 0.1 })
      .to(cursor, { scale: 1, duration: 0.1 })
      .to(btn, { scale: 1.05, duration: 0.1 })
      // Particle splash trigger
      .set(splash, { left: btnX + 5, top: btnY + 5 })
      .to(splash, { opacity: 1, scale: 1.5, duration: 0.3, ease: "power1.out" })
      .to(splash, { opacity: 0, duration: 0.15 })
      // Move cursor offscreen
      .to(cursor, { x: 280, y: 160, opacity: 0, duration: 0.6 })
      // Count up conversion rate statistics
      .to(metrics, {
        valB: 5.8,
        duration: 1.0,
        ease: "power1.inOut",
        onUpdate: () => {
          setValB(`${metrics.valB.toFixed(1)}%`);
        },
      })
      .call(() => setShowWinner(true))
      .to({}, { duration: 3.0 }); // Wait on final state

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-1.5 mb-1.5">
        <span className="text-[11px] font-semibold text-brand-navy/80">
          Conversion Rate Optimizer
        </span>
        <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider">
          Split Testing
        </span>
      </div>

      {/* Main Split Grid */}
      <div className="flex-grow grid grid-cols-2 gap-2.5 items-stretch min-h-0 relative">
        {/* Splash Particle Overlay */}
        <div
          ref={splashRef}
          className="absolute w-7 h-7 rounded-full border border-emerald-500 bg-emerald-500/20 pointer-events-none opacity-0 flex items-center justify-center z-40 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        </div>

        {/* Custom Virtual Cursor */}
        <div
          ref={cursorRef}
          className="absolute pointer-events-none z-50 text-brand-navy"
        >
          <svg
            className="w-4.5 h-4.5 drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.5 1.5v17.25l4.3-4.3 2.85 6.45 2.5-1.1-2.85-6.45 6.2-.25z" />
          </svg>
        </div>

        {/* Column A: Control Version */}
        <div className="border border-brand-navy/10 bg-white rounded-xl p-2 flex flex-col justify-between relative overflow-hidden opacity-70">
          <div className="absolute top-1 right-1 bg-brand-navy/10 text-[6.5px] text-brand-navy/70 px-1 rounded font-semibold uppercase tracking-wider">
            Page A: Control
          </div>

          {/* Wireframe components */}
          <div className="mt-4 flex flex-col gap-1.5">
            <div className="h-2 w-3/4 bg-brand-navy/15 rounded-full" />
            <div className="h-1.5 w-1/2 bg-brand-navy/10 rounded-full" />
            <div className="h-4 w-full bg-brand-navy/5 border border-brand-navy/10 rounded mt-1 flex items-center px-1 text-[6.5px] text-brand-navy/30">
              Email Address
            </div>
            <div className="h-4.5 w-full bg-brand-navy/20 text-brand-navy/60 rounded flex items-center justify-center text-[7.5px] font-semibold mt-1">
              Submit
            </div>
          </div>

          {/* Metric conversion badge */}
          <div className="mt-2 bg-brand-navy/5 rounded-lg p-1.5 flex flex-col items-center">
            <span className="text-[6px] text-brand-navy/40 font-semibold uppercase tracking-wider">
              Conversion Rate
            </span>
            <span className="text-[12px] font-extrabold text-brand-navy/60 mt-0.5">
              {valA}
            </span>
          </div>
        </div>

        {/* Column B: Optimized Version */}
        <div className="border border-brand-orange/20 bg-white rounded-xl p-2 flex flex-col justify-between relative overflow-hidden shadow-sm shadow-brand-orange/5 animate-fade-in">
          <div className="absolute top-1 right-1 bg-brand-orange/10 text-[6.5px] text-brand-orange px-1 rounded font-extrabold uppercase tracking-wider">
            Page B: Optimized
          </div>

          {/* Winner badge overlay */}
          {showWinner && (
            <div className="absolute inset-0 bg-brand-navy/95 text-white flex flex-col items-center justify-center p-2 text-center animate-fade-in z-30">
              <span className="text-brand-orange text-[7.5px] font-extrabold uppercase tracking-widest block mb-0.5 animate-pulse">
                Winner Verified
              </span>
              <span className="text-[12.5px] font-extrabold tracking-tight">
                +141% Lift
              </span>
              <span className="text-[6.5px] text-white/50 font-semibold mt-0.5 block leading-normal">
                Conversion Rate: 5.8%
              </span>
            </div>
          )}

          {/* Wireframe components */}
          <div className="mt-4 flex flex-col gap-1.5">
            {/* Visual Headline */}
            <div className="flex flex-col gap-0.5">
              <div className="h-2 w-5/6 bg-brand-navy/20 rounded-full" />
              <div className="h-1.5 w-2/3 bg-brand-orange/20 rounded-full" />
            </div>

            {/* Action form */}
            <div className="h-4 w-full bg-white border border-brand-orange/20 rounded mt-1 flex items-center px-1 text-[6.5px] text-brand-navy/80">
              siddharth@jukebox.com
            </div>

            {/* Interactive Button */}
            <div
              ref={btnRef}
              className="h-4.5 w-full bg-brand-orange text-white rounded flex items-center justify-center text-[7.5px] font-extrabold mt-1 shadow-sm transition-transform cursor-pointer"
            >
              Get My Blueprint ➔
            </div>
          </div>

          {/* Metric conversion badge */}
          <div className="mt-2 bg-brand-orange/5 border border-brand-orange/10 rounded-lg p-1.5 flex flex-col items-center">
            <span className="text-[6px] text-brand-orange/60 font-semibold uppercase tracking-wider">
              Conversion Rate
            </span>
            <span className="text-[12px] font-extrabold text-brand-orange mt-0.5">
              {valB}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FunnelCroOverlay = () => {
  const [speed, setSpeed] = useState("3.2s");
  const [mobileAudit, setMobileAudit] = useState("Pending");
  const [formsOpt, setFormsOpt] = useState("Pending");
  const [lift, setLift] = useState("+0%");

  useEffect(() => {
    const steps = { speed: 3.2, lift: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.0 });

    tl.to(steps, {
      speed: 0.8,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        setSpeed(`${steps.speed.toFixed(1)}s (A+)`);
      },
    })
      .call(() => {
        setMobileAudit("Passed");
      })
      .to({}, { duration: 0.6 })
      .call(() => {
        setFormsOpt("Optimized");
      })
      .to({}, { duration: 0.6 })
      .to(steps, {
        lift: 28,
        duration: 1.0,
        ease: "power2.out",
        onUpdate: () => {
          setLift(`+${Math.floor(steps.lift)}%`);
        },
      })
      .to({}, { duration: 3.0 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        CRO Checklist
      </span>
      <div className="flex items-center justify-between text-[11px] border-b border-brand-navy/5 pb-1">
        <span>Page Speed Test</span>
        <span
          className={`font-bold ${speed.includes("0.8") ? "text-emerald-500" : "text-brand-navy/50"}`}
        >
          {speed}
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] border-b border-brand-navy/5 pb-1">
        <span>Mobile Audit</span>
        <span
          className={`font-bold ${mobileAudit === "Passed" ? "text-emerald-500 animate-pulse" : "text-brand-navy/50"}`}
        >
          {mobileAudit}
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] border-b border-brand-navy/5 pb-1">
        <span>Form Optimization</span>
        <span
          className={`font-bold ${formsOpt === "Optimized" ? "text-brand-orange" : "text-brand-navy/50"}`}
        >
          {formsOpt}
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] pt-1">
        <span>Conversion Increase</span>
        <span
          className={`font-bold ${lift !== "+0%" ? "text-emerald-500 text-[13px]" : "text-brand-navy/50"}`}
        >
          {lift}
        </span>
      </div>
    </div>
  );
};

const CreativeStrategyMockup = () => {
  const [headline, setHeadline] = useState("");
  const [likes, setLikes] = useState("0");
  const bannerRef = useRef<HTMLDivElement>(null);
  const element1Ref = useRef<HTMLDivElement>(null);
  const element2Ref = useRef<HTMLDivElement>(null);
  const emojiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const el1 = element1Ref.current;
    const el2 = element2Ref.current;
    const emojiContainer = emojiContainerRef.current;
    if (!banner || !el1 || !el2 || !emojiContainer) return;

    // Reset initial states
    setHeadline("");
    setLikes("0");
    gsap.set([el1, el2], { x: 30, opacity: 0, scale: 0.9 });
    emojiContainer.innerHTML = "";

    const textToType = "5x Scale Revenue System";
    const textObj = { charIndex: 0 };
    const likesObj = { count: 0 };

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    // 1. Type out headline
    tl.to(textObj, {
      charIndex: textToType.length,
      duration: 1.5,
      ease: "none",
      onUpdate: () => {
        setHeadline(textToType.substring(0, Math.floor(textObj.charIndex)));
      },
    })
      // 2. Slide design elements into the artboard
      .to(el1, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
      })
      .to(
        el2,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        },
        "-=0.2",
      )
      // 3. Count up likes
      .to(
        likesObj,
        {
          count: 14850,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            setLikes(Math.floor(likesObj.count).toLocaleString());
          },
        },
        "-=0.3",
      )
      // 4. Periodically release floating emojis
      .call(() => {
        const emojis = ["🔥", "❤️", "🚀", "👍", "🔥"];
        emojis.forEach((emoji, idx) => {
          const el = document.createElement("div");
          el.innerText = emoji;
          el.className =
            "absolute text-xs pointer-events-none select-none z-30";
          // Distribute emojis horizontally
          gsap.set(el, {
            x: 25 + idx * 30,
            y: 110,
            opacity: 1,
            scale: 0.6,
          });
          emojiContainer.appendChild(el);

          gsap.to(el, {
            y: 20 + Math.random() * 20,
            x: `+=${Math.random() * 20 - 10}`,
            opacity: 0,
            scale: 1.4,
            duration: 1.2 + Math.random() * 0.6,
            ease: "power1.out",
            onComplete: () => el.remove(),
          });
        });
      })
      .to({}, { duration: 2.0 }); // Wait

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none relative overflow-hidden p-2">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-4">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Figma Creative Workspace
        </span>
        <span className="text-[11px] font-extrabold text-[#a259ff] uppercase tracking-wider">
          Design System
        </span>
      </div>

      <div
        ref={bannerRef}
        className="flex-grow rounded-2xl bg-brand-navy p-5 flex flex-col justify-between text-white relative overflow-hidden min-h-[220px]"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-orange/20 blur-2xl pointer-events-none" />

        {/* Emojis float layer */}
        <div
          ref={emojiContainerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        />

        {/* Ad Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-extrabold text-[13px]">
            J
          </div>
          <div>
            <div className="h-3 w-24 bg-white/40 rounded-full" />
            <div className="h-2 w-14 bg-white/25 rounded-full mt-1.5" />
          </div>
        </div>

        {/* Ad Copy (Typewriter Headline) */}
        <div className="my-4 z-10 min-h-[50px]">
          <h4 className="text-[22px] font-extrabold tracking-tight min-h-[24px] leading-tight text-white">
            {headline}
            <span className="inline-block w-0.5 h-5 bg-brand-orange ml-1.5 animate-pulse" />
          </h4>
          <p className="text-[12px] text-white/60 mt-1.5 leading-normal max-w-[240px]">
            Custom creative designed to drive clicks and purchases.
          </p>
        </div>

        {/* Slider elements (assemblages) */}
        <div className="flex items-center justify-between gap-3.5 mt-2 relative z-10">
          {/* Option A element */}
          <div
            ref={element1Ref}
            className="bg-white/10 border border-white/10 rounded-xl p-3 flex-1 flex flex-col items-center justify-center shadow-sm"
          >
            <span className="text-[11px] font-bold text-white/50">
              ROAS Target
            </span>
            <span className="text-[18px] font-extrabold text-brand-orange mt-0.5">
              5.0x
            </span>
          </div>
          {/* Option B element */}
          <div
            ref={element2Ref}
            className="bg-white/10 border border-white/10 rounded-xl p-3 flex-1 flex flex-col items-center justify-center shadow-sm"
          >
            <span className="text-[11px] font-bold text-white/50">
              Engagement
            </span>
            <span className="text-[18px] font-extrabold text-emerald-400 mt-0.5">
              High
            </span>
          </div>
        </div>

        {/* Ad Footer / Reactions */}
        <div className="flex items-center justify-between z-10 mt-3 border-t border-white/10 pt-3.5">
          <span className="text-[11px] bg-brand-orange text-white px-4.5 py-1.5 rounded-full font-extrabold tracking-wide uppercase transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            Shop Now ↗
          </span>
          <div className="flex items-center gap-1.5 text-[12px] text-white/60">
            <span>🔥</span>
            <span className="font-bold">{likes} Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreativeStrategyOverlay = () => {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [feedbackScore, setFeedbackScore] = useState(6.0);

  useEffect(() => {
    const scores = { value: 6.0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    tl.to(scores, {
      value: 9.8,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => {
        setFeedbackScore(scores.value);
      },
    })
      .call(() => {
        setHeadlineIdx(1);
      })
      .to({}, { duration: 2.0 })
      .call(() => {
        setHeadlineIdx(0);
      })
      .to({}, { duration: 1.0 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Copywriting Angles
      </span>
      <div className="border border-brand-navy/5 rounded-lg p-2 bg-brand-navy/5">
        <span className="text-[9px] text-brand-navy/40 block font-semibold">
          Headline Tester A:
        </span>
        <span
          className={`text-[10px] font-semibold transition-all duration-300 ${headlineIdx === 0 ? "text-brand-orange" : "text-brand-navy"}`}
        >
          "Scale your revenue with Jukebox systems."
        </span>
      </div>
      <div className="border border-brand-navy/5 rounded-lg p-2 bg-brand-navy/5">
        <span className="text-[9px] text-brand-navy/40 block font-semibold">
          Headline Tester B:
        </span>
        <span
          className={`text-[10px] font-semibold transition-all duration-300 ${headlineIdx === 1 ? "text-brand-orange text-[10.5px]" : "text-brand-navy"}`}
        >
          "Predictable pipeline growth on autoplay."
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-brand-navy/5">
        <span>Predictive CTR Score:</span>
        <span className="font-bold text-emerald-500">
          {feedbackScore.toFixed(1)}/10
        </span>
      </div>
    </div>
  );
};

const AnalyticsTrackingMockup = () => {
  const [liveConvs, setLiveConvs] = useState(24);
  const [activeTabName, setActiveTabName] = useState("Direct");
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const bar3Ref = useRef<HTMLDivElement>(null);
  const bar4Ref = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const bar1 = bar1Ref.current;
    const bar2 = bar2Ref.current;
    const bar3 = bar3Ref.current;
    const bar4 = bar4Ref.current;
    const dot1 = dot1Ref.current;
    const dot2 = dot2Ref.current;
    if (!bar1 || !bar2 || !bar3 || !bar4 || !dot1 || !dot2) return;

    // Reset initial states
    gsap.set([bar1, bar2, bar3, bar4], { height: "20%" });
    gsap.set(dot1, { attr: { cy: 10, cx: 30 }, opacity: 0 });
    gsap.set(dot2, { attr: { cy: 10, cx: 170 }, opacity: 0 });

    const counts = { total: 24 };
    const tl = gsap.timeline({ repeat: -1 });

    // 1. First dot streams down and hits bar 3 (Meta)
    tl.to(dot1, {
      opacity: 1,
      duration: 0.1,
    })
      .to(dot1, {
        attr: { cy: 60, cx: 100 },
        duration: 1.0,
        ease: "power1.in",
      })
      // Hit event
      .to(dot1, { opacity: 0, duration: 0.1 })
      .to(
        bar3,
        {
          height: "85%",
          backgroundColor: "#f6861f",
          duration: 0.2,
          ease: "power1.out",
        },
        "-=0.1",
      )
      .to(
        counts,
        {
          total: 82,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => setLiveConvs(Math.floor(counts.total)),
        },
        "-=0.1",
      )
      .call(() => setActiveTabName("Meta Ads"))
      .to(bar3, { height: "65%", duration: 0.8, ease: "power1.out" })

      // 2. Second dot streams down and hits bar 2 (Google Search)
      .to(
        dot2,
        {
          opacity: 1,
          duration: 0.1,
        },
        "+=0.3",
      )
      .to(dot2, {
        attr: { cy: 60, cx: 100 },
        duration: 1.0,
        ease: "power1.in",
      })
      // Hit event
      .to(dot2, { opacity: 0, duration: 0.1 })
      .to(
        bar2,
        {
          height: "75%",
          duration: 0.2,
          ease: "power1.out",
        },
        "-=0.1",
      )
      .to(
        counts,
        {
          total: 140,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => setLiveConvs(Math.floor(counts.total)),
        },
        "-=0.1",
      )
      .call(() => setActiveTabName("Google Search"))
      .to(bar2, { height: "55%", duration: 0.8, ease: "power1.out" })

      // 3. Reset loop values
      .to({}, { duration: 1.5 })
      .to(counts, {
        total: 24,
        duration: 0.5,
        onUpdate: () => setLiveConvs(Math.floor(counts.total)),
      })
      .call(() => setActiveTabName("Direct"))
      .to([bar1, bar2, bar3, bar4], { height: "20%", duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-2 mb-1">
        <span className="text-[11px] font-semibold text-brand-navy/80">
          GA4 Real-Time Traffic Stream
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
            Live Tracking
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      {/* SVG Pipeline Funnel visualizer */}
      <div className="h-14 relative flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 70">
          {/* Pipe paths */}
          <path
            d="M30 10 L 100 60"
            fill="none"
            stroke="#161443"
            strokeOpacity="0.1"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <path
            d="M170 10 L 100 60"
            fill="none"
            stroke="#161443"
            strokeOpacity="0.1"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <circle cx="30" cy="10" r="4" fill="#3b82f6" fillOpacity="0.6" />
          <circle cx="170" cy="10" r="4" fill="#a259ff" fillOpacity="0.6" />
          <circle cx="100" cy="60" r="5" fill="#f6861f" />

          {/* Animated data user particles */}
          <circle ref={dot1Ref} cx="30" cy="10" r="3.5" fill="#3b82f6" />
          <circle ref={dot2Ref} cx="170" cy="10" r="3.5" fill="#a259ff" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 border border-brand-navy/10 px-2 py-0.5 rounded shadow-sm text-[8px] font-extrabold">
          API Router Gate
        </div>
      </div>

      {/* GA4 Real-time chart */}
      <div className="grid grid-cols-4 gap-2 h-14 items-end px-2 my-1.5 relative border-b border-brand-navy/5">
        <div
          ref={bar1Ref}
          className="bg-brand-navy/10 h-[20%] rounded-t-sm transition-all duration-300"
        />
        <div
          ref={bar2Ref}
          className="bg-brand-navy/30 h-[20%] rounded-t-sm transition-all duration-300"
        />
        <div
          ref={bar3Ref}
          className="bg-brand-orange h-[20%] rounded-t-sm transition-all duration-300 relative"
        />
        <div
          ref={bar4Ref}
          className="bg-brand-navy/10 h-[20%] rounded-t-sm transition-all duration-300"
        />
      </div>

      {/* Traffic source indicators */}
      <div className="flex flex-col gap-1 border-t border-brand-navy/5 pt-1.5">
        <div className="flex items-center justify-between text-[9px] font-semibold text-brand-navy/70">
          <span>Active Attribute Channel</span>
          <span>Live Conversions</span>
        </div>
        <div className="flex items-center justify-between text-[10.5px]">
          <span className="font-bold text-brand-orange animate-pulse">
            {activeTabName}
          </span>
          <span className="font-bold text-brand-navy">{liveConvs} / min</span>
        </div>
      </div>
    </div>
  );
};

const AnalyticsTrackingOverlay = () => {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const logs = [
      "Pixel connection initialized...",
      "Meta CAPI: Send PageView event",
      "GA4 Server: Event 'Lead' capt.",
      "Sync webhook: CRM updated successfully",
    ];
    let idx = 0;

    // Reset initial
    setLog([]);

    const interval = setInterval(() => {
      setLog((prev) => {
        const next = [...prev, logs[idx]];
        if (next.length > 3) next.shift(); // Keep last 3 items
        return next;
      });
      idx = (idx + 1) % logs.length;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 animate-fade-in text-brand-navy select-none min-h-[142px]">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Pixel Debugger Logs
      </span>
      <div className="bg-brand-navy text-emerald-400 p-2 rounded-lg font-mono text-[8.5px] leading-relaxed flex flex-col justify-between h-[95px] overflow-hidden border border-brand-navy-light shadow-inner">
        {log.length === 0 ? (
          <span className="text-white/40 italic">
            Listening for pixel traffic...
          </span>
        ) : (
          log.map((line, idx) => (
            <div key={idx} className="truncate">
              <span className="text-brand-orange mr-1">&gt;</span>
              {line}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const GrowthConsultingMockup = () => {
  const [activePhase, setActivePhase] = useState(0); // 0, 1, 2, 3
  const [revenue, setRevenue] = useState("$20,000");
  const [roas, setRoas] = useState("1.0x");
  const [auditCheck1, setAuditCheck1] = useState(false);
  const [auditCheck2, setAuditCheck2] = useState(false);
  const [restructCheck1, setRestructCheck1] = useState(false);
  const [restructCheck2, setRestructCheck2] = useState(false);

  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength() || 150;
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    // Initial states
    setRevenue("$20,000");
    setRoas("1.0x");
    setActivePhase(0);
    setAuditCheck1(false);
    setAuditCheck2(false);
    setRestructCheck1(false);
    setRestructCheck2(false);

    const stateObj = { revenue: 20000, roas: 1.0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.5 });

    // Phase 1: Audit (0.0s - 1.5s)
    tl.call(() => setActivePhase(1))
      .to({}, { duration: 0.3 })
      .call(() => setAuditCheck1(true))
      .to({}, { duration: 0.3 })
      .call(() => setAuditCheck2(true))
      .to(stateObj, {
        revenue: 45000,
        roas: 1.8,
        duration: 0.8,
        ease: "power1.out",
        onUpdate: () => {
          setRevenue(`$${Math.floor(stateObj.revenue).toLocaleString()}`);
          setRoas(`${stateObj.roas.toFixed(1)}x`);
        },
      })

      // Phase 2: Restructure (1.5s - 3.2s)
      .call(() => setActivePhase(2))
      .to({}, { duration: 0.4 })
      .call(() => setRestructCheck1(true))
      .to({}, { duration: 0.4 })
      .call(() => setRestructCheck2(true))
      // Animate line chart path drawing partially
      .to(
        path,
        {
          strokeDashoffset: length * 0.6,
          duration: 0.8,
          ease: "power1.inOut",
        },
        "-=0.3",
      )
      .to(
        stateObj,
        {
          revenue: 120000,
          roas: 3.5,
          duration: 0.8,
          ease: "power1.inOut",
          onUpdate: () => {
            setRevenue(`$${Math.floor(stateObj.revenue).toLocaleString()}`);
            setRoas(`${stateObj.roas.toFixed(1)}x`);
          },
        },
        "-=0.8",
      )

      // Phase 3: Scale Up (3.2s - 5.5s)
      .call(() => setActivePhase(3))
      // Draw path fully
      .to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
      })
      .to(
        stateObj,
        {
          revenue: 385000,
          roas: 5.2,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            setRevenue(`$${Math.floor(stateObj.revenue).toLocaleString()}`);
            setRoas(`${stateObj.roas.toFixed(1)}x`);
          },
        },
        "-=1.2",
      )
      .to({}, { duration: 3.0 }); // Wait on final state

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none p-2">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-4">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Scaling Roadmap
        </span>
        <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-wider">
          Growth Consulting
        </span>
      </div>

      <div className="flex-grow grid grid-cols-12 gap-4 items-center min-h-0 py-2">
        {/* Left Column: Milestones (7 col-span) */}
        <div className="col-span-7 flex flex-col gap-3 justify-center">
          {/* Card 1: Audit */}
          <div
            className={`p-3 rounded-xl border transition-all duration-300 shadow-sm ${
              activePhase === 1
                ? "bg-brand-navy/5 border-brand-navy scale-[1.02]"
                : activePhase > 1
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white border-brand-navy/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[12px] font-bold block leading-tight ${
                  activePhase >= 1 ? "text-brand-navy" : "text-brand-navy/40"
                }`}
              >
                1. System Audit
              </span>
              {activePhase > 1 && (
                <span className="text-emerald-500 text-[10px] font-extrabold">
                  COMPLETE ✓
                </span>
              )}
              {activePhase === 1 && (
                <span className="text-brand-orange text-[10px] font-extrabold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>
            {activePhase >= 1 && (
              <div className="mt-2 flex flex-col gap-1 text-[10px] text-brand-navy/60 font-semibold animate-fade-in">
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      auditCheck1 ? "text-emerald-500" : "text-brand-navy/20"
                    }
                  >
                    {auditCheck1 ? "✓" : "○"}
                  </span>
                  <span>Meta Pixel & Conversions API Audit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      auditCheck2 ? "text-emerald-500" : "text-brand-navy/20"
                    }
                  >
                    {auditCheck2 ? "✓" : "○"}
                  </span>
                  <span>Competitor Creative Analysis</span>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Restructure */}
          <div
            className={`p-3 rounded-xl border transition-all duration-300 shadow-sm ${
              activePhase === 2
                ? "bg-brand-navy/5 border-brand-navy scale-[1.02]"
                : activePhase > 2
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white border-brand-navy/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[12px] font-bold block leading-tight ${
                  activePhase >= 2 ? "text-brand-navy" : "text-brand-navy/40"
                }`}
              >
                2. Funnel Restructure
              </span>
              {activePhase > 2 && (
                <span className="text-emerald-500 text-[10px] font-extrabold">
                  COMPLETE ✓
                </span>
              )}
              {activePhase === 2 && (
                <span className="text-brand-orange text-[10px] font-extrabold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>
            {activePhase >= 2 && (
              <div className="mt-2 flex flex-col gap-1 text-[10px] text-brand-navy/60 font-semibold animate-fade-in">
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      restructCheck1 ? "text-emerald-500" : "text-brand-navy/20"
                    }
                  >
                    {restructCheck1 ? "✓" : "○"}
                  </span>
                  <span>Funnel Strategy Realignment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={
                      restructCheck2 ? "text-emerald-500" : "text-brand-navy/20"
                    }
                  >
                    {restructCheck2 ? "✓" : "○"}
                  </span>
                  <span>Audience & Targeting Reset</span>
                </div>
              </div>
            )}
          </div>

          {/* Card 3: Scale Up */}
          <div
            className={`p-3 rounded-xl border transition-all duration-300 shadow-sm ${
              activePhase === 3
                ? "bg-brand-orange/10 border-brand-orange scale-[1.02] shadow-[0_4px_12px_rgba(232,128,26,0.05)]"
                : "bg-white border-brand-navy/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[12px] font-bold block leading-tight ${
                  activePhase >= 3 ? "text-brand-navy" : "text-brand-navy/40"
                }`}
              >
                3. Scaling & Budgets
              </span>
              {activePhase === 3 && (
                <span className="text-brand-orange text-[10px] font-extrabold animate-bounce">
                  SCALING 🚀
                </span>
              )}
            </div>
            {activePhase >= 3 && (
              <div className="mt-2 flex flex-col gap-1 text-[10px] text-brand-navy/60 font-semibold animate-fade-in">
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-orange font-bold">➔</span>
                  <span>Scale Daily Budget to $1,500/day</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-orange font-bold">➔</span>
                  <span>Maximize Profit margins at scale</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Dashboard Charts (5 col-span) */}
        <div className="col-span-5 h-full flex flex-col gap-3 justify-center py-1">
          {/* Revenue Dial Card */}
          <div className="bg-brand-navy text-white p-3 rounded-2xl border border-brand-navy-light flex flex-col justify-between relative overflow-hidden shadow-lg min-h-[76px]">
            <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-brand-orange/20 blur-xl pointer-events-none" />
            <span className="text-[9px] text-white/50 block font-bold uppercase tracking-wider">
              Projected Monthly Revenue
            </span>
            <span className="text-[20px] font-extrabold text-white mt-2 leading-none tracking-tight block">
              {revenue}
            </span>
          </div>

          {/* ROAS Indicator */}
          <div className="bg-white border border-brand-navy/10 p-3 rounded-2xl flex items-center justify-between shadow-sm min-h-[56px]">
            <div className="flex flex-col">
              <span className="text-[9px] text-brand-navy/40 font-bold uppercase tracking-wider">
                Target ROAS
              </span>
              <span className="text-[16px] font-extrabold text-brand-navy mt-1 leading-none">
                {roas}
              </span>
            </div>
            <div className="h-8 w-8 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
              <span className="text-[12px] font-extrabold text-brand-orange">
                ×5
              </span>
            </div>
          </div>

          {/* Mini Line Chart SVG */}
          <div className="bg-white border border-brand-navy/10 rounded-2xl p-3 flex flex-col justify-between h-[85px] relative overflow-hidden shadow-sm">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 30"
            >
              <defs>
                <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f6861f" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f6861f" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line
                x1="0"
                y1="10"
                x2="100"
                y2="10"
                stroke="#161443"
                strokeOpacity="0.04"
                strokeWidth="0.5"
              />
              <line
                x1="0"
                y1="20"
                x2="100"
                y2="20"
                stroke="#161443"
                strokeOpacity="0.04"
                strokeWidth="0.5"
              />

              {/* Chart line path */}
              <path
                ref={pathRef}
                d="M 5 25 C 40 25, 70 15, 95 5"
                fill="none"
                stroke="#f6861f"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const GrowthConsultingOverlay = () => {
  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);

  useEffect(() => {
    // Reset initial checks
    setC1(false);
    setC2(false);
    setC3(false);

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    tl.to({}, { duration: 0.8 })
      .call(() => setC1(true))
      .to({}, { duration: 0.8 })
      .call(() => setC2(true))
      .to({}, { duration: 0.8 })
      .call(() => setC3(true))
      .to({}, { duration: 3.5 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Strategic Checklist
      </span>
      <div className="flex items-center gap-2 text-[11px] border-b border-brand-navy/5 pb-1 transition-opacity duration-300">
        <span
          className={`font-semibold transition-all duration-300 ${c1 ? "text-emerald-500 scale-110" : "text-brand-navy/20"}`}
        >
          {c1 ? "✓" : "○"}
        </span>
        <span
          className={
            c1 ? "text-brand-navy/90 font-medium" : "text-brand-navy/40"
          }
        >
          Competitor Ad Gap Audit
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px] border-b border-brand-navy/5 pb-1 transition-opacity duration-300">
        <span
          className={`font-semibold transition-all duration-300 ${c2 ? "text-emerald-500 scale-110" : "text-brand-navy/20"}`}
        >
          {c2 ? "✓" : "○"}
        </span>
        <span
          className={
            c2 ? "text-brand-navy/90 font-medium" : "text-brand-navy/40"
          }
        >
          Offer Optimization Plan
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px] pt-1 transition-opacity duration-300">
        <span
          className={`font-semibold transition-all duration-300 ${c3 ? "text-brand-orange scale-110" : "text-brand-navy/20"}`}
        >
          {c3 ? "✓" : "○"}
        </span>
        <span
          className={
            c3 ? "text-brand-navy/90 font-semibold" : "text-brand-navy/40"
          }
        >
          Monthly Budget Expansion
        </span>
      </div>
    </div>
  );
};

const MarketingAutomationMockup = () => {
  const [pulsePos, setPulsePos] = useState<
    "none" | "node1" | "line1" | "node2" | "line2" | "node3"
  >("none");
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset initial states
    setPulsePos("none");
    if (notifRef.current) {
      gsap.set(notifRef.current, { y: -15, opacity: 0, scale: 0.9 });
    }

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    tl.call(() => setPulsePos("node1"))
      .to({}, { duration: 0.5 })
      .call(() => setPulsePos("line1"))
      .to({}, { duration: 0.6 })
      .call(() => setPulsePos("node2"))
      .to({}, { duration: 0.5 })
      .call(() => setPulsePos("line2"))
      .to({}, { duration: 0.6 })
      .call(() => setPulsePos("node3"))
      // Pop in notification on mobile
      .call(() => {
        if (notifRef.current) {
          gsap.to(notifRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.5)",
          });
        }
      })
      .to({}, { duration: 3.5 }) // wait
      // Reset
      .call(() => {
        if (notifRef.current) {
          gsap.to(notifRef.current, {
            opacity: 0,
            scale: 0.9,
            y: -15,
            duration: 0.3,
          });
        }
      })
      .to({}, { duration: 0.3 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none p-2">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-4">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Workflow Logic Builder
        </span>
        <span className="text-[11px] font-extrabold text-emerald-500 uppercase tracking-wider">
          CRM Sync Active
        </span>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 items-center">
        {/* Left: Logic Flow Nodes (col-span 7) */}
        <div className="col-span-7 flex flex-col justify-center items-center gap-3 relative py-2">
          {/* Node 1 */}
          <div
            className={`w-full px-4 py-2.5 rounded-xl border text-center transition-all duration-300 shadow-sm ${
              pulsePos === "node1"
                ? "bg-brand-orange/10 border-brand-orange scale-[1.03]"
                : "bg-white border-brand-navy/10"
            }`}
          >
            <span className="text-[12px] font-bold block leading-tight">
              1. Form Submit
            </span>
            <span className="text-[9.5px] text-brand-navy/40 leading-none">
              Capture Lead
            </span>
          </div>

          {/* Line 1 */}
          <div className="h-4 w-0.5 bg-brand-navy/15 relative">
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-orange transition-all duration-300 ${
                pulsePos === "line1"
                  ? "opacity-100 top-[6px] scale-110"
                  : "opacity-0 top-0 scale-75"
              }`}
            />
          </div>

          {/* Node 2 */}
          <div
            className={`w-full px-4 py-2.5 rounded-xl border text-center transition-all duration-300 shadow-sm ${
              pulsePos === "node2"
                ? "bg-brand-orange/10 border-brand-orange scale-[1.03]"
                : "bg-white border-brand-navy/10"
            }`}
          >
            <span className="text-[12px] font-bold block leading-tight">
              2. API Router Delay
            </span>
            <span className="text-[9.5px] text-brand-navy/40 leading-none">
              Wait: 2 minutes
            </span>
          </div>

          {/* Line 2 */}
          <div className="h-4 w-0.5 bg-brand-navy/15 relative">
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-orange transition-all duration-300 ${
                pulsePos === "line2"
                  ? "opacity-100 top-[6px] scale-110"
                  : "opacity-0 top-0 scale-75"
              }`}
            />
          </div>

          {/* Node 3 */}
          <div
            className={`w-full px-4 py-2.5 rounded-xl border text-center transition-all duration-300 shadow-sm ${
              pulsePos === "node3"
                ? "bg-emerald-500/10 border-emerald-500 scale-[1.03]"
                : "bg-white border-brand-navy/10"
            }`}
          >
            <span className="text-[12px] font-bold block leading-tight">
              3. WhatsApp Alert
            </span>
            <span className="text-[9.5px] text-brand-navy/40 leading-none">
              Send Client Blueprint
            </span>
          </div>
        </div>

        {/* Right: Phone Simulator (col-span 5) */}
        <div className="col-span-5 flex justify-center py-1">
          <div className="relative w-[145px] aspect-[9/16] bg-[#0c0c0e] rounded-2xl border border-brand-navy-light/80 p-1.5 flex flex-col justify-start overflow-hidden shadow-lg shrink-0">
            {/* Screen background (lockscreen) */}
            <div className="absolute inset-0 bg-[#1e293b] flex flex-col items-center justify-start p-1.5 pointer-events-none">
              {/* Top notch */}
              <div className="h-2 w-10 bg-black rounded-full mb-1.5" />
              {/* Lock screen clock */}
              <span className="text-[13px] font-extrabold text-white/50 leading-none tracking-tighter">
                09:41
              </span>

              {/* Push notification banner */}
              <div
                ref={notifRef}
                className="w-full bg-white/95 border border-white/20 rounded-lg p-1.5 mt-2.5 shadow-md flex items-center gap-1.5 opacity-0"
              >
                <div className="h-5.5 w-5.5 rounded bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98C16.58 1.897 14.1 1.87 11.462 1.87c-5.438 0-9.864 4.42-9.868 9.865-.001 1.762.47 3.407 1.454 4.908L1.983 20.3l3.859-1.014c1.478.807 2.946 1.157 4.805 1.157z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0 leading-tight">
                  <span className="font-extrabold text-[9.5px] text-brand-navy truncate">
                    Jukebox Media
                  </span>
                  <span className="text-[8.5px] text-brand-navy/60 font-semibold leading-none">
                    Ready! 📄
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketingAutomationOverlay = () => {
  const [syncState, setSyncState] = useState<"syncing" | "synced">("syncing");
  const [syncProgress, setSyncProgress] = useState(0);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const successBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSyncState("syncing");
    setSyncProgress(0);

    // GSAP infinite rotation spinner
    let spinTween: gsap.core.Tween | null = null;
    if (spinnerRef.current) {
      spinTween = gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1.0,
        repeat: -1,
        ease: "none",
      });
    }

    const progressObj = { val: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.0 });

    tl.to(progressObj, {
      val: 100,
      duration: 2.0,
      ease: "power1.inOut",
      onUpdate: () => {
        setSyncProgress(Math.floor(progressObj.val));
      },
    })
      .call(() => {
        setSyncState("synced");
        if (spinTween) spinTween.pause();
        if (successBadgeRef.current) {
          gsap.fromTo(
            successBadgeRef.current,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" },
          );
        }
      })
      .to({}, { duration: 4.0 }) // wait on synced state
      .call(() => {
        // Reset
        setSyncState("syncing");
        setSyncProgress(0);
        if (spinTween) spinTween.play();
      });

    return () => {
      tl.kill();
      if (spinTween) spinTween.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 text-brand-navy select-none min-h-[170px] animate-fade-in">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Live Integration Hub
      </span>

      {/* WhatsApp Status Box */}
      <div className="flex items-center justify-between p-2 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-xl transition-all shadow-[0_2px_8px_rgba(16,185,129,0.02)]">
        <div className="flex items-center gap-2">
          <div className="h-6.5 w-6.5 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <svg
              className="w-3.5 h-3.5 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98C16.58 1.897 14.1 1.87 11.462 1.87c-5.438 0-9.864 4.42-9.868 9.865-.001 1.762.47 3.407 1.454 4.908L1.983 20.3l3.859-1.014c1.478.807 2.946 1.157 4.805 1.157z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[9.5px]">WhatsApp CRM</span>
            <span className="text-[7.5px] text-brand-navy/40 font-semibold uppercase">
              Instant trigger
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="text-[8px] font-extrabold text-emerald-600">
            ACTIVE
          </span>
        </div>
      </div>

      {/* Email Trigger Box */}
      <div className="flex items-center justify-between p-2 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-xl transition-all shadow-[0_2px_8px_rgba(99,102,241,0.02)]">
        <div className="flex items-center gap-2">
          <div className="h-6.5 w-6.5 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20">
            <svg
              className="w-3.5 h-3.5 text-indigo-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[9.5px]">Email Sequence</span>
            <span className="text-[7.5px] text-brand-navy/40 font-semibold uppercase">
              Nurture Campaign
            </span>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[8px] font-extrabold shrink-0">
          98% DELIV.
        </div>
      </div>

      {/* HubSpot Sync Box */}
      <div
        className={`flex items-center justify-between p-2 rounded-xl transition-all duration-500 ${
          syncState === "synced"
            ? "bg-emerald-500/[0.03] border border-emerald-500/20 shadow-[0_2px_8px_rgba(16,185,129,0.02)]"
            : "bg-brand-orange/[0.03] border border-brand-orange/15 shadow-[0_2px_8px_rgba(232,128,26,0.02)]"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`h-6.5 w-6.5 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
              syncState === "synced"
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-brand-orange/10 border-brand-orange/20"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors ${
                syncState === "synced"
                  ? "text-emerald-500"
                  : "text-brand-orange"
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.5 12c0-5.799-4.701-10.5-10.5-10.5S1.5 6.201 1.5 12c0 5.161 3.724 9.453 8.625 10.316v-3.766a5.253 5.253 0 01-1.875-4.05c0-2.9 2.35-5.25 5.25-5.25 1.547 0 2.94.67 3.905 1.734a5.228 5.228 0 012.22-.676c.404.97-.22 2.062-1.272 2.327-.14.286-.33.542-.56.762.665 1.34.464 3.031-.58 4.148a5.244 5.244 0 01-2.268.995v3.424c4.901-.863 8.625-5.155 8.625-10.316z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-[9.5px]">HubSpot Sync</span>
            <span
              className={`text-[7.5px] font-semibold uppercase transition-colors ${
                syncState === "synced"
                  ? "text-emerald-600"
                  : "text-brand-orange"
              }`}
            >
              {syncState === "synced" ? "Synced ✓" : "Syncing DB..."}
            </span>
          </div>
        </div>

        {/* Dynamic Sync Status Indicator */}
        <div className="shrink-0">
          {syncState === "syncing" ? (
            <div className="flex items-center gap-1.5 bg-brand-orange/5 border border-brand-orange/10 px-1.5 py-0.5 rounded-lg">
              <span className="text-[8.5px] font-extrabold text-brand-orange">
                {syncProgress}%
              </span>
              <svg
                ref={spinnerRef}
                className="w-3.5 h-3.5 text-brand-orange"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            <div
              ref={successBadgeRef}
              className="h-5.5 w-5.5 rounded-full bg-emerald-500 border border-emerald-400 flex items-center justify-center text-white shrink-0 shadow-[0_2px_8px_rgba(16,185,129,0.2)]"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ActiveMockup = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <StrategyMockup />;
    case 1:
      return <ContentCreationMockup />;
    case 2:
      return <BrandStorytellingMockup />;
    case 3:
      return <PerformanceMarketingMockup />;
    case 4:
      return <PersonalBrandingMockup />;
    case 5:
      return <CreativeStrategyMockup />;
    case 6:
      return <GrowthConsultingMockup />;
    case 7:
      return <MarketingAutomationMockup />;
    default:
      return null;
  }
};

const ActiveOverlay = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <StrategyOverlay />;
    case 1:
      return <ContentCreationOverlay />;
    case 2:
      return <BrandStorytellingOverlay />;
    case 3:
      return <PerformanceMarketingOverlay />;
    case 4:
      return <PersonalBrandingOverlay />;
    case 5:
      return <CreativeStrategyOverlay />;
    case 6:
      return <GrowthConsultingOverlay />;
    case 7:
      return <MarketingAutomationOverlay />;
    default:
      return null;
  }
};

const PerformanceMarketingOverlay = () => {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    const card3 = card3Ref.current;
    if (!card1 || !card2 || !card3) return;

    // Set initial layout positions and hide them (shifted 15px up for slide-in transition)
    gsap.set(card1, { y: -15, opacity: 0, scale: 0.9 });
    gsap.set(card2, { y: 37, opacity: 0, scale: 0.9 }); // 52 - 15
    gsap.set(card3, { y: 89, opacity: 0, scale: 0.9 }); // 104 - 15

    const tl = gsap.timeline({ repeat: -1 });

    // 1. Google (card1) slides down and pops in at y=0
    tl.to(card1, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.5)",
    })
      .to({}, { duration: 1.5 }) // wait

      // 2. YouTube (card2) slides down and pops in at y=52
      .to(card2, {
        y: 52,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
      })
      .to({}, { duration: 1.5 }) // wait

      // 3. Instagram (card3) slides down and pops in at y=104
      .to(card3, {
        y: 104,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
      })
      .to({}, { duration: 2.5 }) // wait (all 3 visible together)

      // 4. Vanish all 3 together
      .to([card1, card2, card3], {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: "power2.inOut",
      })
      // Reset y positions for next loop iteration
      .set(card1, { y: -15 })
      .set(card2, { y: 37 })
      .set(card3, { y: 89 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none min-h-[200px]">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Live Attribution Feed
      </span>
      <div className="relative h-[170px] overflow-hidden">
        {/* Card 1 */}
        <div
          ref={card1Ref}
          className="absolute left-0 right-0 flex items-center justify-between p-2 bg-white/95 border border-brand-navy/[0.05] rounded-xl shadow-[0_4px_12px_rgba(16,20,59,0.03)] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
              <svg
                className="w-3.5 h-3.5 text-blue-600 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.693 0-8.511-3.818-8.511-8.511s3.818-8.511 8.511-8.511c2.14 0 4.01.785 5.485 2.067l3.24-3.24C18.665 1.512 15.69 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c7.05 0 11.73-4.96 11.73-11.95 0-.81-.07-1.59-.2-2.285H12.24z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-bold text-[10px] text-brand-navy truncate">
                Google Search
              </span>
              <span className="text-[7.5px] text-brand-navy/40 font-semibold uppercase tracking-wider">
                2s ago
              </span>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 shrink-0 flex items-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-[9px] text-emerald-600 tracking-tight">
              +$140
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div
          ref={card2Ref}
          className="absolute left-0 right-0 flex items-center justify-between p-2 bg-white/95 border border-brand-navy/[0.05] rounded-xl shadow-[0_4px_12px_rgba(16,20,59,0.03)] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
              <svg
                className="w-3.5 h-3.5 text-[#ff0000] shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 00.5 6.163C0 8.037 0 12 0 12s0 3.963.5 5.837a3.002 3.002 0 002.112 2.107c1.868.556 9.388.556 9.388.556s7.52 0 9.388-.556a3.002 3.002 0 002.11-2.107C24 15.963 24 12 24 12s0-3.963-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-bold text-[10px] text-brand-navy truncate">
                YouTube Ads
              </span>
              <span className="text-[7.5px] text-brand-navy/40 font-semibold uppercase tracking-wider">
                1m ago
              </span>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 shrink-0 flex items-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-[9px] text-emerald-600 tracking-tight">
              +$340
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div
          ref={card3Ref}
          className="absolute left-0 right-0 flex items-center justify-between p-2 bg-white/95 border border-brand-navy/[0.05] rounded-xl shadow-[0_4px_12px_rgba(16,20,59,0.03)] backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0 border border-pink-500/20">
              <svg
                className="w-3.5 h-3.5 text-[#e1306c] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-bold text-[10px] text-brand-navy truncate">
                Instagram Reels
              </span>
              <span className="text-[7.5px] text-brand-navy/40 font-semibold uppercase tracking-wider">
                Just now
              </span>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 shrink-0 flex items-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-[9px] text-emerald-600 tracking-tight">
              +$128
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Brand Storytelling — Mockup & Overlay
// ==========================================

const BrandStorytellingMockup = () => {
  const [typedText, setTypedText] = useState("");
  const word1Ref = useRef<HTMLDivElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const word3Ref = useRef<HTMLDivElement>(null);
  const threadRef = useRef<SVGPathElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w1 = word1Ref.current;
    const w2 = word2Ref.current;
    const w3 = word3Ref.current;
    const thread = threadRef.current;
    const heart = heartRef.current;
    const tagline = taglineRef.current;
    if (!w1 || !w2 || !w3 || !thread || !heart || !tagline) return;

    const threadLength = thread.getTotalLength() || 120;
    gsap.set([w1, w2, w3], { opacity: 0, x: 20 });
    gsap.set(thread, {
      strokeDasharray: threadLength,
      strokeDashoffset: threadLength,
    });
    gsap.set(heart, { scale: 0, opacity: 0 });
    gsap.set(tagline, { opacity: 0, y: 8 });

    const fullText = "Once upon a brand...";
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    // Typewriter
    tl.to(
      { idx: 0 },
      {
        idx: fullText.length,
        duration: 1.8,
        ease: "none",
        onUpdate: function () {
          setTypedText(fullText.slice(0, Math.round(this.targets()[0].idx)));
        },
      },
    )
      // Brand values appear
      .to(w1, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "+=0.3")
      .to(w2, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
      .to(w3, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "-=0.2")
      // Thread draws
      .to(
        thread,
        { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" },
        "-=0.3",
      )
      // Heart pops
      .to(heart, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" })
      .to(
        tagline,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      )
      // Hold
      .to({}, { duration: 2.0 })
      // Reset
      .to([w1, w2, w3, heart, tagline], { opacity: 0, duration: 0.4 })
      .call(() => setTypedText(""))
      .set(thread, { strokeDashoffset: threadLength })
      .set([w1, w2, w3], { x: 20 })
      .set(heart, { scale: 0 })
      .set(tagline, { y: 8 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none p-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-4">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Brand Narrative Studio
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-wider animate-pulse">
            Crafting
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse" />
        </div>
      </div>

      {/* Page 1 — Typewriter */}
      <div className="bg-brand-navy/[0.03] rounded-xl p-4 border border-brand-navy/5 mb-3 flex items-center min-h-[50px]">
        <span className="text-[20px] font-bold text-brand-navy tracking-tight font-[Caveat] leading-snug">
          {typedText}
          <span className="animate-pulse text-brand-orange">|</span>
        </span>
      </div>

      {/* Page 2 — Brand Values */}
      <div className="flex flex-col gap-3 relative py-2 pl-4">
        <div ref={word1Ref} className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-brand-orange/80 shadow-[0_0_8px_rgba(246,134,31,0.6)]" />
          <span className="text-[15px] font-extrabold text-brand-navy tracking-tight">
            Trust
          </span>
        </div>
        <div ref={word2Ref} className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-brand-orange/80 shadow-[0_0_8px_rgba(246,134,31,0.6)]" />
          <span className="text-[15px] font-extrabold text-brand-navy tracking-tight">
            Vision
          </span>
        </div>
        <div ref={word3Ref} className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-brand-orange/80 shadow-[0_0_8px_rgba(246,134,31,0.6)]" />
          <span className="text-[15px] font-extrabold text-brand-navy tracking-tight">
            Impact
          </span>
        </div>
        {/* Connecting Thread SVG */}
        <svg
          className="absolute left-[20px] top-0 w-5 h-full overflow-visible"
          viewBox="0 0 10 70"
        >
          <path
            ref={threadRef}
            d="M5 6 L5 24 L5 42 L5 62"
            stroke="#f6861f"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Heart + Tagline */}
      <div className="flex flex-col items-center mt-4 gap-2">
        <div ref={heartRef} className="text-[28px]">
          💛
        </div>
        <div
          ref={taglineRef}
          className="text-[11px] font-extrabold text-brand-navy/50 uppercase tracking-widest"
        >
          Your Story, Their Connection
        </div>
      </div>
    </div>
  );
};

const BrandStorytellingOverlay = () => {
  const [score, setScore] = useState("3.2");
  const [beforeBar, setBeforeBar] = useState(20);
  const [afterBar, setAfterBar] = useState(20);

  useEffect(() => {
    const metrics = { score: 3.2, before: 20, after: 20 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.0 });

    tl.to(metrics, {
      score: 9.7,
      before: 30,
      after: 85,
      duration: 2.0,
      ease: "power2.out",
      onUpdate: () => {
        setScore(metrics.score.toFixed(1));
        setBeforeBar(Math.round(metrics.before));
        setAfterBar(Math.round(metrics.after));
      },
    }).to({}, { duration: 3.0 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Story Score
      </span>
      <div className="flex items-end justify-between">
        <span className="text-[28px] font-extrabold text-brand-orange leading-none">
          {score}
        </span>
        <span className="text-[8px] font-bold text-brand-navy/40 uppercase">
          /10
        </span>
      </div>
      <span className="text-[8px] font-semibold text-brand-navy/50 -mt-1">
        Emotional Resonance
      </span>
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-bold text-brand-navy/40 w-8">
            Before
          </span>
          <div className="flex-1 h-2 bg-brand-navy/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-navy/20 rounded-full transition-all duration-300"
              style={{ width: `${beforeBar}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[7px] font-bold text-brand-orange w-8">
            After
          </span>
          <div className="flex-1 h-2 bg-brand-orange/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-orange rounded-full transition-all duration-300"
              style={{ width: `${afterBar}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Personal Branding — Mockup & Overlay
// ==========================================

const PersonalBrandingMockup = () => {
  const [initials, setInitials] = useState(false);
  const [followerCount, setFollowerCount] = useState("0");
  const circleRef = useRef<SVGCircleElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    const name = nameRef.current;
    const title = titleRef.current;
    const b1 = badge1Ref.current;
    const b2 = badge2Ref.current;
    const counter = counterRef.current;
    if (!circle || !name || !title || !b1 || !b2 || !counter) return;

    const circumference = 2 * Math.PI * 36;
    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });
    gsap.set([name, title], { opacity: 0, y: 15 });
    gsap.set([b1, b2], { opacity: 0, scale: 0 });
    gsap.set(counter, { opacity: 0 });

    const metrics = { followers: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    tl
      // Draw circle
      .to(circle, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" })
      // Initials appear
      .call(() => setInitials(true))
      .to({}, { duration: 0.4 })
      // Name slides up
      .to(name, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      // Title fades in
      .to(
        title,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      )
      // Social badges pop
      .to(b1, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" })
      .to(
        b2,
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
        "-=0.2",
      )
      // Follower count
      .to(counter, { opacity: 1, duration: 0.3 })
      .to(metrics, {
        followers: 12400,
        duration: 1.5,
        ease: "power1.inOut",
        onUpdate: () => {
          const v = metrics.followers;
          setFollowerCount(
            v >= 1000 ? `${(v / 1000).toFixed(1)}K` : Math.round(v).toString(),
          );
        },
      })
      // Hold
      .to({}, { duration: 2.0 })
      // Reset
      .to([name, title, b1, b2, counter], { opacity: 0, duration: 0.4 })
      .call(() => {
        setInitials(false);
        setFollowerCount("0");
      })
      .set(circle, { strokeDashoffset: circumference })
      .set([name, title], { y: 15 })
      .set([b1, b2], { scale: 0 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between items-center animate-fade-in text-brand-navy select-none p-2 gap-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full border-b border-brand-navy/10 pb-3 mb-2">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Identity Builder
        </span>
        <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-wider animate-pulse">
          Assembling
        </span>
      </div>

      {/* Avatar Circle */}
      <div className="relative w-[110px] h-[110px] flex items-center justify-center my-1">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
          <circle
            ref={circleRef}
            cx="40"
            cy="40"
            r="36"
            stroke="#f6861f"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {initials && (
          <span className="text-[32px] font-extrabold text-brand-navy animate-fade-in">
            SJ
          </span>
        )}
      </div>

      {/* Name + Title */}
      <div className="flex flex-col items-center gap-1">
        <div
          ref={nameRef}
          className="text-[20px] font-extrabold text-brand-navy tracking-tight"
        >
          Siddharth Jain
        </div>
        <div
          ref={titleRef}
          className="text-[13px] font-bold text-brand-navy/50"
        >
          Founder & Strategist
        </div>
      </div>

      {/* Social Badges */}
      <div className="flex items-center gap-3">
        <div
          ref={badge1Ref}
          className="h-9 w-9 rounded-full bg-[#0077b5]/10 border border-[#0077b5]/25 flex items-center justify-center transition-transform hover:scale-110"
        >
          <svg
            className="w-4.5 h-4.5 text-[#0077b5]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
        <div
          ref={badge2Ref}
          className="h-9 w-9 rounded-full bg-brand-navy/5 border border-brand-navy/10 flex items-center justify-center transition-transform hover:scale-110"
        >
          <svg
            className="w-4.5 h-4.5 text-brand-navy"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
      </div>

      {/* Follower Counter */}
      <div
        ref={counterRef}
        className="flex items-center gap-2.5 bg-brand-navy/[0.03] border border-brand-navy/5 rounded-xl px-5 py-2.5 shadow-sm"
      >
        <svg
          className="w-5 h-5 text-brand-orange"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
        <span className="text-[20px] font-extrabold text-brand-navy tracking-tight">
          {followerCount}
        </span>
        <span className="text-[11px] font-bold text-brand-navy/40 uppercase tracking-wide">
          Followers
        </span>
      </div>
    </div>
  );
};

const PersonalBrandingOverlay = () => {
  const [authority, setAuthority] = useState("2.1");
  const [ringProgress, setRingProgress] = useState(0);

  useEffect(() => {
    const metrics = { authority: 2.1, ring: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.0 });

    tl.to(metrics, {
      authority: 8.9,
      ring: 89,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        setAuthority(metrics.authority.toFixed(1));
        setRingProgress(Math.round(metrics.ring));
      },
    }).to({}, { duration: 3.0 });

    return () => {
      tl.kill();
    };
  }, []);

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - (ringProgress / 100) * circumference;

  return (
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Authority Score
      </span>
      <div className="flex items-center gap-3">
        {/* Ring */}
        <svg width="50" height="50" viewBox="0 0 50 50" className="shrink-0">
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="#161443"
            strokeOpacity="0.05"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="#f6861f"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 25 25)"
            className="transition-all duration-100"
          />
          <text
            x="25"
            y="27"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            fill="#161443"
          >
            {authority}
          </text>
        </svg>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-brand-navy/50">
            Trust Index
          </span>
          <span className="text-[11px] font-extrabold text-brand-orange">
            {ringProgress}%
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Strategy — Mockup & Overlay
// ==========================================

const StrategyMockup = () => {
  const targetRef = useRef<SVGCircleElement>(null);
  const targetInnerRef = useRef<SVGCircleElement>(null);
  const line1Ref = useRef<SVGLineElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<SVGLineElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<SVGLineElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<SVGLineElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const targetInner = targetInnerRef.current;
    const l1 = line1Ref.current;
    const n1 = node1Ref.current;
    const l2 = line2Ref.current;
    const n2 = node2Ref.current;
    const l3 = line3Ref.current;
    const n3 = node3Ref.current;
    const l4 = line4Ref.current;
    const n4 = node4Ref.current;
    const check = checkRef.current;
    if (
      !target ||
      !targetInner ||
      !l1 ||
      !n1 ||
      !l2 ||
      !n2 ||
      !l3 ||
      !n3 ||
      !l4 ||
      !n4 ||
      !check
    )
      return;

    const circum = 2 * Math.PI * 14;
    const circum2 = 2 * Math.PI * 7;
    gsap.set(target, { strokeDasharray: circum, strokeDashoffset: circum });
    gsap.set(targetInner, {
      strokeDasharray: circum2,
      strokeDashoffset: circum2,
    });
    gsap.set([l1, l2, l3, l4], { scaleX: 0, transformOrigin: "left center" });
    gsap.set([n1, n2, n3, n4], { opacity: 0, scale: 0.5 });
    gsap.set(check, { opacity: 0, y: 8 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    tl
      // Draw target
      .to(target, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" })
      .to(
        targetInner,
        { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" },
        "-=0.3",
      )
      // Line 1 + Audience node
      .to(l1, { scaleX: 1, duration: 0.4, ease: "power2.out" })
      .to(n1, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" })
      // Line 2 + Channels node
      .to(l2, { scaleX: 1, duration: 0.4, ease: "power2.out" })
      .to(n2, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" })
      // Line 3 + Content node
      .to(l3, { scaleX: 1, duration: 0.4, ease: "power2.out" })
      .to(n3, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" })
      // Line 4 + Growth node
      .to(l4, { scaleX: 1, duration: 0.4, ease: "power2.out" })
      .to(n4, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.5)" })
      // All nodes glow
      .to([n1, n2, n3, n4], {
        boxShadow: "0 0 12px rgba(246,134,31,0.4)",
        duration: 0.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
      })
      // Strategy Locked
      .to(check, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
      // Hold
      .to({}, { duration: 2.0 })
      // Reset
      .to([n1, n2, n3, n4, check], { opacity: 0, duration: 0.4 })
      .set(target, { strokeDashoffset: circum })
      .set(targetInner, { strokeDashoffset: circum2 })
      .set([l1, l2, l3, l4], { scaleX: 0 })
      .set([n1, n2, n3, n4], { scale: 0.5, boxShadow: "none" })
      .set(check, { y: 8 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none p-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-4">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Growth Blueprint
        </span>
        <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-wider animate-pulse">
          Mapping
        </span>
      </div>

      {/* Roadmap Visual */}
      <div className="flex-grow relative flex flex-col justify-center gap-5 pl-14 py-4">
        {/* Target / Bullseye */}
        <svg
          className="absolute left-0 top-[22%] w-10 h-10 overflow-visible"
          viewBox="0 0 32 32"
        >
          <circle
            ref={targetRef}
            cx="16"
            cy="16"
            r="14"
            stroke="#f6861f"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle
            ref={targetInnerRef}
            cx="16"
            cy="16"
            r="7"
            stroke="#161443"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="16" cy="16" r="2" fill="#f6861f" />
        </svg>

        {/* Node Row 1: Audience */}
        <div className="flex items-center gap-2">
          <svg
            className="w-20 h-[3px] overflow-visible shrink-0"
            viewBox="0 0 50 2"
          >
            <line
              ref={line1Ref}
              x1="0"
              y1="1"
              x2="50"
              y2="1"
              stroke="#f6861f"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>
          <div
            ref={node1Ref}
            className="px-4 py-2 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-[13px] font-bold text-brand-navy whitespace-nowrap shadow-sm"
          >
            🎯 Audience
          </div>
        </div>

        {/* Node Row 2: Channels */}
        <div className="flex items-center gap-2">
          <svg
            className="w-20 h-[3px] overflow-visible shrink-0"
            viewBox="0 0 50 2"
          >
            <line
              ref={line2Ref}
              x1="0"
              y1="1"
              x2="50"
              y2="1"
              stroke="#f6861f"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>
          <div
            ref={node2Ref}
            className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[13px] font-bold text-brand-navy whitespace-nowrap shadow-sm"
          >
            📡 Channels
          </div>
        </div>

        {/* Node Row 3: Content */}
        <div className="flex items-center gap-2">
          <svg
            className="w-20 h-[3px] overflow-visible shrink-0"
            viewBox="0 0 50 2"
          >
            <line
              ref={line3Ref}
              x1="0"
              y1="1"
              x2="50"
              y2="1"
              stroke="#f6861f"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>
          <div
            ref={node3Ref}
            className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[13px] font-bold text-brand-navy whitespace-nowrap shadow-sm"
          >
            ✍️ Content
          </div>
        </div>

        {/* Node Row 4: Growth */}
        <div className="flex items-center gap-2">
          <svg
            className="w-20 h-[3px] overflow-visible shrink-0"
            viewBox="0 0 50 2"
          >
            <line
              ref={line4Ref}
              x1="0"
              y1="1"
              x2="50"
              y2="1"
              stroke="#f6861f"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>
          <div
            ref={node4Ref}
            className="px-4 py-2 rounded-xl bg-brand-orange/10 border border-brand-orange/25 text-[13px] font-bold text-brand-navy whitespace-nowrap shadow-md"
          >
            🚀 Growth
          </div>
        </div>
      </div>

      {/* Strategy Locked */}
      <div
        ref={checkRef}
        className="flex items-center justify-center gap-2 py-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl mt-2"
      >
        <svg
          className="w-5 h-5 text-emerald-500"
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
        <span className="text-[13px] font-extrabold text-emerald-600 uppercase tracking-wider">
          Strategy Locked
        </span>
      </div>
    </div>
  );
};

const StrategyOverlay = () => {
  const [multiplier, setMultiplier] = useState("1.0x");
  const curveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const curve = curveRef.current;
    if (!curve) return;

    const curveLength = curve.getTotalLength() || 80;
    gsap.set(curve, {
      strokeDasharray: curveLength,
      strokeDashoffset: curveLength,
    });

    const metrics = { mult: 1.0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.0 });

    tl.to(curve, { strokeDashoffset: 0, duration: 1.8, ease: "power1.inOut" })
      .to(
        metrics,
        {
          mult: 4.2,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            setMultiplier(`${metrics.mult.toFixed(1)}x`);
          },
        },
        0,
      )
      .to({}, { duration: 3.0 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Growth Trajectory
      </span>
      {/* Mini Chart */}
      <svg className="w-full h-12 overflow-visible" viewBox="0 0 140 40">
        <line
          x1="0"
          y1="35"
          x2="140"
          y2="35"
          stroke="#161443"
          strokeOpacity="0.06"
          strokeWidth="0.5"
        />
        <path
          ref={curveRef}
          d="M5 35 C 30 34, 50 30, 70 22 C 90 14, 110 6, 135 3"
          stroke="#f6861f"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex items-end justify-between -mt-1">
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-brand-navy/40 uppercase">
            ROI Multiplier
          </span>
          <span className="text-[22px] font-extrabold text-brand-orange leading-none">
            {multiplier}
          </span>
        </div>
        <span className="text-[7px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
          ↑ Projected
        </span>
      </div>
    </div>
  );
};

// ==========================================
// Content Creation — Mockup & Overlay
// ==========================================

const ContentCreationMockup = () => {
  const [headline, setHeadline] = useState("");
  const [likes, setLikes] = useState("0");
  const [comments, setComments] = useState("0");
  const [shares, setShares] = useState("0");
  const canvasRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const emoji1Ref = useRef<HTMLSpanElement>(null);
  const emoji2Ref = useRef<HTMLSpanElement>(null);
  const emoji3Ref = useRef<HTMLSpanElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gradient = gradientRef.current;
    const cta = ctaRef.current;
    const e1 = emoji1Ref.current;
    const e2 = emoji2Ref.current;
    const e3 = emoji3Ref.current;
    const counters = countersRef.current;
    if (!canvas || !gradient || !cta || !e1 || !e2 || !e3 || !counters) return;

    gsap.set(canvas, { opacity: 0 });
    gsap.set(gradient, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(cta, { opacity: 0, y: 15 });
    gsap.set([e1, e2, e3], { opacity: 0, y: 20 });
    gsap.set(counters, { opacity: 0 });

    const fullHeadline = "Your Brand, Amplified";
    const metrics = { likes: 0, comments: 0, shares: 0 };

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.0 });

    tl
      // Canvas fades in with grid
      .to(canvas, { opacity: 1, duration: 0.5, ease: "power2.out" })
      // Gradient wipe
      .to(gradient, { scaleX: 1, duration: 0.8, ease: "power2.inOut" })
      // Typewriter headline
      .to(
        { idx: 0 },
        {
          idx: fullHeadline.length,
          duration: 1.4,
          ease: "none",
          onUpdate: function () {
            setHeadline(
              fullHeadline.slice(0, Math.round(this.targets()[0].idx)),
            );
          },
        },
      )
      // CTA slides up
      .to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" })
      // Counters appear and tick
      .to(counters, { opacity: 1, duration: 0.3 })
      .to(
        metrics,
        {
          likes: 2400,
          comments: 847,
          shares: 1200,
          duration: 1.5,
          ease: "power1.inOut",
          onUpdate: () => {
            setLikes(
              metrics.likes >= 1000
                ? `${(metrics.likes / 1000).toFixed(1)}K`
                : Math.round(metrics.likes).toString(),
            );
            setComments(Math.round(metrics.comments).toString());
            setShares(
              metrics.shares >= 1000
                ? `${(metrics.shares / 1000).toFixed(1)}K`
                : Math.round(metrics.shares).toString(),
            );
          },
        },
        "-=0.3",
      )
      // Emoji reactions float up
      .to(e1, { opacity: 1, y: -10, duration: 0.5, ease: "power2.out" })
      .to(
        e2,
        { opacity: 1, y: -18, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      )
      .to(
        e3,
        { opacity: 1, y: -12, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      )
      // Hold
      .to({}, { duration: 2.0 })
      // Reset
      .to([canvas, counters, e1, e2, e3, cta], { opacity: 0, duration: 0.4 })
      .call(() => {
        setHeadline("");
        setLikes("0");
        setComments("0");
        setShares("0");
      })
      .set(gradient, { scaleX: 0 })
      .set(cta, { y: 15 })
      .set([e1, e2, e3], { y: 20 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none p-2">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-3 mb-4">
        <span className="text-[15px] font-bold text-brand-navy/90">
          Content Studio
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-wider animate-pulse">
            Designing
          </span>
          <span className="h-2.5 w-2.5 rounded-full bg-brand-orange animate-pulse" />
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={canvasRef}
        className="flex-grow relative rounded-xl overflow-hidden border border-brand-navy/10 bg-brand-navy/[0.02] min-h-[200px]"
      >
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#161443 1px, transparent 1px), linear-gradient(90deg, #161443 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Gradient Background Wipe */}
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-r from-brand-orange/30 via-brand-orange/15 to-brand-navy/20 rounded-xl"
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 gap-4">
          <span className="text-[22px] font-extrabold text-brand-navy text-center tracking-tight leading-tight min-h-[30px]">
            {headline}
            {headline.length < 20 && headline.length > 0 && (
              <span className="animate-pulse text-brand-orange">|</span>
            )}
          </span>
          <div
            ref={ctaRef}
            className="px-5 py-2 bg-brand-orange text-white text-[11px] font-extrabold rounded-full shadow-md uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            Learn More →
          </div>
        </div>

        {/* Floating Emojis */}
        <div className="absolute bottom-2 right-3 flex gap-2">
          <span ref={emoji1Ref} className="text-[20px]">
            🔥
          </span>
          <span ref={emoji2Ref} className="text-[20px]">
            ❤️
          </span>
          <span ref={emoji3Ref} className="text-[20px]">
            🚀
          </span>
        </div>
      </div>

      {/* Engagement Counters */}
      <div ref={countersRef} className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-pink-500/5 border border-pink-500/10 rounded-xl p-2.5 text-center">
          <span className="text-[11px] text-pink-500 font-bold block mb-0.5">❤️</span>
          <span className="text-[15px] font-extrabold text-brand-navy">
            {likes}
          </span>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-2.5 text-center">
          <span className="text-[11px] text-blue-500 font-bold block mb-0.5">💬</span>
          <span className="text-[15px] font-extrabold text-brand-navy">
            {comments}
          </span>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-2.5 text-center">
          <span className="text-[11px] text-emerald-500 font-bold block mb-0.5">
            🔁
          </span>
          <span className="text-[15px] font-extrabold text-brand-navy">
            {shares}
          </span>
        </div>
      </div>
    </div>
  );
};

const ContentCreationOverlay = () => {
  const [reach, setReach] = useState("0");
  const [saves, setSaves] = useState("0");
  const [quality, setQuality] = useState(0);

  useEffect(() => {
    const metrics = { reach: 0, saves: 0, quality: 0 };
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.0 });

    tl.to(metrics, {
      reach: 45200,
      saves: 3100,
      quality: 94,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => {
        setReach(
          metrics.reach >= 1000
            ? `${(metrics.reach / 1000).toFixed(1)}K`
            : Math.round(metrics.reach).toString(),
        );
        setSaves(
          metrics.saves >= 1000
            ? `${(metrics.saves / 1000).toFixed(1)}K`
            : Math.round(metrics.saves).toString(),
        );
        setQuality(Math.round(metrics.quality));
      },
    }).to({}, { duration: 3.0 });

    return () => {
      tl.kill();
    };
  }, []);

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (quality / 100) * circumference;

  return (
    <div className="flex flex-col gap-2 animate-fade-in text-brand-navy select-none">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Content Performance
      </span>
      <div className="flex items-center justify-between text-[10px] border-b border-brand-navy/5 pb-1">
        <span className="text-brand-navy/60 font-semibold">Reach</span>
        <span className="font-extrabold text-brand-navy">{reach}</span>
      </div>
      <div className="flex items-center justify-between text-[10px] border-b border-brand-navy/5 pb-1">
        <span className="text-brand-navy/60 font-semibold">Saves</span>
        <span className="font-extrabold text-brand-orange">{saves}</span>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="#161443"
            strokeOpacity="0.05"
            strokeWidth="3.5"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="#f6861f"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 22 22)"
            className="transition-all duration-100"
          />
          <text
            x="22"
            y="24"
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill="#f6861f"
          >
            {quality}%
          </text>
        </svg>
        <div className="flex flex-col">
          <span className="text-[8px] font-bold text-brand-navy/40 uppercase">
            Quality Score
          </span>
          <span className="text-[10px] font-extrabold text-emerald-500">
            Excellent
          </span>
        </div>
      </div>
    </div>
  );
};
