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

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("home");
  const isProgrammaticScroll = useRef(false);
  // Stores the scroll position where each section's TOP is at viewport top.
  // Populated after GSAP init by reading pin spacer offsetTop.
  const sectionScrollPositions = useRef<Record<string, number>>({});
  const [activeService, setActiveService] = useState(0);
  const selectorRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prevActiveService = useRef<number | null>(null);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const belt1Ref = useRef<HTMLDivElement>(null);
  const belt2Ref = useRef<HTMLDivElement>(null);
  const belt3Ref = useRef<HTMLDivElement>(null);

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

    if (
      !card ||
      !container ||
      !navbar
    )
      return;
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

      // 6. Animate Navbar to sticky top
      tl.to(
        navbar,
        {
          top: "0px",
          left: "0vw",
          right: "0vw",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          ease: "none",
        },
        0,
      );

      // 8. Testimonial Belts Horizontal Scroll Animations
      if (belt1Ref.current) {
        gsap.fromTo(
          belt1Ref.current,
          { x: -160 },
          {
            x: 160,
            ease: "none",
            scrollTrigger: {
              trigger: "#testimonial",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }
      if (belt2Ref.current) {
        gsap.fromTo(
          belt2Ref.current,
          { x: 160 },
          {
            x: -160,
            ease: "none",
            scrollTrigger: {
              trigger: "#testimonial",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }
      if (belt3Ref.current) {
        gsap.fromTo(
          belt3Ref.current,
          { x: -160 },
          {
            x: 160,
            ease: "none",
            scrollTrigger: {
              trigger: "#testimonial",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      }

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
        "partnership",
        "testimonial",
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
        "partnership",
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
            "#home .flex.flex-row.items-center"
          ],
          start: "top 95%",
        },
        {
          id: "problem",
          selectors: [
            "#problem .text-center > *",
            "#problem .grid > div"
          ],
          start: "top 78%",
        },
        {
          id: "service",
          selectors: [
            "#service .text-center > *",
            "#service .lg\\:col-span-5 > div",
            "#service .lg\\:col-span-7"
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
            "#blueprint .left-\\[45\\%\\] > span"
          ],
          start: "top 78%",
        },
        {
          id: "industries",
          selectors: [
            "#industries .text-center > *",
            "#industries .grid > div",
            "#industries > div > div:nth-child(3)"
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
            "#about > div > div:nth-child(3) > div:last-child"
          ],
          start: "top 78%",
        },
        {
          id: "testimonial",
          selectors: [
            "#testimonial .text-center > *",
            "#testimonial > div:nth-child(2)"
          ],
          start: "top 78%",
        },
        {
          id: "partnership",
          selectors: [
            "#partnership .lg\\:col-span-5",
            "#partnership .lg\\:col-span-7 > div:first-child > *",
            "#partnership .lg\\:col-span-7 .grid > div"
          ],
          start: "top 78%",
        }
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
        const scrollTarget = path === "home" ? 0 : (trigger ? trigger.start : targetElement);
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
        "partnership",
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

  return (
    <>
      <Navbar
        ref={navbarRef}
        activeTab={activeTab}
        onTabClick={(id) => {
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
              // In both cases, subtract navbarHeight so the section header is
              // visible just below the floating navbar.
              const pinTrigger = ScrollTrigger.getById(`pin-${id}`);

              if (pinTrigger) {
                const sectionHeight = targetElement.offsetHeight;
                const viewportHeight = window.innerHeight;

                // For tall sections, trigger.start is at the section END — back up to the START.
                // For normal sections, trigger.start is already the section START.
                const overflow = Math.max(0, sectionHeight - viewportHeight);
                const sectionScrollStart = pinTrigger.start - overflow;

                scrollTarget = Math.max(0, sectionScrollStart - navbarHeight);
              } else {
                // No pin trigger: scroll to the element directly
                scrollTarget = Math.max(0, targetElement.offsetTop - navbarHeight);
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
        }}
        style={{
          left: "3vw",
          right: "3vw",
          top: "6vh",
          borderTopLeftRadius: "32px",
          borderTopRightRadius: "32px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
        className="px-6 py-4 md:px-12 md:py-6"
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
          className="relative h-screen w-full overflow-hidden flex items-end justify-center bg-transparent z-10"
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
                  background: "radial-gradient(circle at top right, rgba(22, 20, 67, 0.12) 0%, rgba(22, 20, 67, 0) 70%)"
                }}
              />
              <div 
                className="absolute bottom-0 left-0 w-[60vw] h-[60vw] pointer-events-none z-0 mix-blend-screen"
                style={{
                  background: "radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)"
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
                    <button className="px-7 py-3.5 text-[15px] font-semibold text-white bg-brand-navy rounded-full border border-white/10 shadow-premium transition-all duration-300 hover:scale-[1.02] hover:bg-brand-navy-light cursor-pointer">
                      Our Services
                    </button>
                    <button className="group px-7 py-3.5 text-[15px] font-semibold text-brand-navy bg-white rounded-full shadow-premium flex items-center gap-1.5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/90 cursor-pointer">
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
        className="relative z-20 w-full bg-white h-screen border-b border-brand-navy/[0.04] flex items-center justify-center"
      >
        <LogoWall />
      </section>

      {/* The Common Situation Section (Problem Statement) */}
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
              background: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.07) 0%, rgba(59, 130, 246, 0) 70%)"
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-bold tracking-[0.2em] text-brand-orange uppercase">
              The Common Situation
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="text-[36px] sm:text-[48px] font-extrabold text-brand-navy tracking-tight mt-3 leading-[1.1]"
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
                <h4 className="text-[26px] font-bold text-brand-navy tracking-tight">Irregular Campaigns</h4>
                <p className="text-[15px] text-brand-navy/60 mt-2 max-w-md mx-auto leading-relaxed">
                  Running marketing activities in fits and starts, resulting in erratic cash flows.
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
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">Multiple Vendor Chaos</h4>
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
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">Activity Over Direction</h4>
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
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">Consistency Struggles</h4>
                <p className="text-[14px] text-brand-navy/60 leading-relaxed mt-2">
                  Struggling to maintain a unified brand message and consistent presence.
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
                <h4 className="text-[20px] font-bold text-brand-navy tracking-tight">Unclear ROI</h4>
                <p className="text-[14px] text-brand-navy/60 leading-relaxed mt-2">
                  Inability to track return on investment from multiple channels.
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
              background: "radial-gradient(circle at top right, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)"
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.07) 0%, rgba(59, 130, 246, 0) 70%)"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
            <span className="text-[12px] font-bold tracking-[0.2em] text-brand-orange uppercase">
              What we do
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="text-[32px] sm:text-[40px] font-extrabold text-brand-navy tracking-tight mt-2"
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
              <div className="relative w-full max-w-[460px] aspect-[4/3] bg-brand-navy rounded-[30px] p-3.5 shadow-2xl border-4 border-brand-navy-light/80 flex items-center justify-center z-10">
                {/* Screen area */}
                <div className="w-full h-full bg-[#f8fafc] rounded-[18px] overflow-hidden relative border border-brand-navy/10 flex flex-col p-3.5">
                  <ActiveMockup index={activeService} />
                </div>

                {/* Home/Camera Pill Button */}
                <div className="absolute top-1/2 left-2.5 -translate-y-1/2 w-1.5 h-6 bg-brand-navy-light/60 rounded-full" />
              </div>

              {/* Floating Card Overlay */}
              <div className="absolute right-[-10px] md:right-[15px] lg:right-[-10px] top-[6%] w-[200px] bg-white rounded-xl p-4 shadow-premium border border-brand-navy/[0.04] transition-all duration-300 z-20 hover:scale-[1.02] hover:shadow-card-hover">
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
              background: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.07) 0%, rgba(59, 130, 246, 0) 70%)"
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)"
            }}
          />
        </div>

        {/* Desktop Absolute Layout (>= md) */}
        <div className="relative w-full max-w-5xl h-[1350px] hidden md:block z-10">
          {/* Header block on left */}
          <div className="absolute left-[6%] top-[4%] max-w-md">
            <span className="border border-brand-navy/15 text-[11px] px-3.5 py-1.5 rounded-full inline-block font-bold tracking-wider text-brand-navy/60 uppercase">
              How we work
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="text-[34px] lg:text-[40px] font-extrabold text-brand-navy leading-[1.15] tracking-tight mt-5"
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
              className={`absolute ${item.position} w-[285px] h-[310px] bg-white rounded-2xl border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.035)] p-5 select-none transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(16,20,59,0.08)] flex flex-col justify-between`}
            >
              {/* Grommet metallic ring hole */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shadow-inner">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-md" />
              </div>

              {/* Double line/inset border */}
              <div className="absolute inset-2.5 rounded-[12px] border border-black/[0.03] pointer-events-none" />

              {/* Card Content */}
              <div className="pt-6 px-1 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between border-b border-black/[0.05] pb-3.5 mb-3.5">
                    <span className="text-[12px] font-bold tracking-wider text-brand-navy/60 font-mono">
                      {item.step}
                    </span>
                    <span className="text-[15px] font-bold text-brand-orange tracking-tight uppercase">
                      {item.phase}
                    </span>
                  </div>
                  <p className="text-[13px] text-brand-navy font-semibold leading-snug mb-3">
                    {item.tagline}
                  </p>
                </div>
                <ul className="flex flex-col gap-2 border-t border-black/[0.05] pt-3.5 pb-2">
                  {item.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      className="flex items-start gap-2 text-[11.5px] text-brand-navy/70 font-medium"
                    >
                      <span className="text-brand-orange font-semibold text-[9px] mt-0.5">
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
            <span className="border border-brand-navy/15 text-[11px] px-3.5 py-1.5 rounded-full inline-block font-bold tracking-wider text-brand-navy/60 uppercase">
              How we work
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="text-[32px] font-extrabold text-brand-navy leading-tight tracking-tight mt-4"
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
                className="w-full max-w-[310px] h-[310px] bg-white rounded-2xl border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.035)] p-5 select-none transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(16,20,59,0.08)] flex flex-col justify-between relative"
              >
                {/* Grommet metallic ring hole */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-md" />
                </div>

                {/* Double line/inset border */}
                <div className="absolute inset-2.5 rounded-[12px] border border-black/[0.03] pointer-events-none" />

                {/* Card Content */}
                <div className="pt-6 px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between border-b border-black/[0.05] pb-3.5 mb-3.5">
                      <span className="text-[12px] font-bold tracking-wider text-brand-navy/60 font-mono">
                        {item.step}
                      </span>
                      <span className="text-[15px] font-bold text-brand-orange tracking-tight uppercase">
                        {item.phase}
                      </span>
                    </div>
                    <p className="text-[13px] text-brand-navy font-semibold leading-snug mb-3">
                      {item.tagline}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2 border-t border-black/[0.05] pt-3.5 pb-2">
                    {item.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-[11.5px] text-brand-navy/70 font-medium"
                      >
                        <span className="text-brand-orange font-semibold text-[9px] mt-0.5">
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
              background: "radial-gradient(circle at top right, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)"
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.07) 0%, rgba(59, 130, 246, 0) 70%)"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-bold tracking-[0.2em] text-brand-orange uppercase">
              Target Categories
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="text-[36px] sm:text-[48px] font-extrabold text-brand-navy tracking-tight mt-3"
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
            <span className="text-[10px] font-bold tracking-[0.25em] text-brand-navy/40 uppercase block mb-6">
              Expertise Across Multiple Industry Verticals
            </span>
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
        className="relative z-20 w-full bg-[#f6861f] text-white py-32 flex flex-col items-center overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at top right, rgba(22, 20, 67, 0.12) 0%, rgba(22, 20, 67, 0) 70%)"
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[12px] font-bold tracking-[0.2em] text-brand-navy uppercase">
                Who we are
              </span>
              <ScrollReveal
                as="h2"
                containerClassName="text-[36px] sm:text-[52px] font-extrabold leading-tight tracking-tight mt-3 text-white"
              >
                We build growth-centric marketing systems.
              </ScrollReveal>
              <p className="text-[16px] text-white/80 mt-6 leading-relaxed">
                Jukebox Media is a performance growth consultancy. We reject
                random acts of marketing in favor of cohesive, metrics-driven
                architectures.
              </p>

              <div className="grid grid-cols-2 gap-8 mt-10">
                <div>
                  <h4 className="text-[36px] font-extrabold text-brand-navy">
                    $50M+
                  </h4>
                  <p className="text-[13px] text-white/70 font-semibold uppercase mt-1">
                    Client Revenue Generated
                  </p>
                </div>
                <div>
                  <h4 className="text-[36px] font-extrabold text-brand-navy">
                    5.2x
                  </h4>
                  <p className="text-[13px] text-white/70 font-semibold uppercase mt-1">
                    Average Account ROAS
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-3xl p-8 lg:p-12 border border-white/15 backdrop-blur-md">
              <h3 className="text-[24px] font-semibold tracking-tight text-white mb-6">
                Structured Performance
              </h3>
              <ul className="flex flex-col gap-6">
                {[
                  {
                    title: "Creative Intelligence",
                    desc: "No generic ads. We leverage data feedback loops to design campaigns that convert.",
                  },
                  {
                    title: "Data-Driven Performance",
                    desc: "Real-time pipeline tracking showing exact attribution from click to conversion.",
                  },
                  {
                    title: "Cohesive System Design",
                    desc: "Unifying email, SEO, paid acquisition and page layout into one single engine.",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-0.5 text-brand-navy">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-[16px] font-semibold text-white tracking-tight">
                        {item.title}
                      </h5>
                      <p className="text-[13px] text-white/70 leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider line */}
          <div className="w-full h-px bg-white/15 my-16"></div>

          {/* Leadership and Background block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Bio Card (col-span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-center select-none">
              <span className="text-[12px] font-bold tracking-[0.2em] text-brand-navy uppercase">
                The Force Behind Jukebox
              </span>
              <h3 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight mt-3 text-white">
                Ankit Jani — Business Head
              </h3>
              <p className="text-[15px] text-white/80 mt-4 leading-relaxed max-w-2xl">
                Background across media channels, marketing exposure, and client
                partnerships. Ankit plays an instrumental role at Jukebox Media,
                helping businesses transform scattered marketing efforts into
                focused, consistent strategies built to deliver measurable,
                scaled impact.
              </p>

              <div className="mt-6 border-l-2 border-white pl-4">
                <span className="text-[11px] text-white font-semibold uppercase tracking-wider block">
                  Cross-Platform Expertise
                </span>
                <p className="text-[13px] text-white/80 leading-relaxed mt-1">
                  Bringing structure and clarity to marketing backed by
                  extensive client exposure across **Print, Radio, Television,
                  YouTube, Zee5, SonyLiv, Hotstar, Netflix, and custom Brand
                  Solutions.**
                </p>
              </div>
            </div>

            {/* Right Column: Profile Image + Media Houses Logos (col-span 5) */}
            <div className="lg:col-span-5 bg-white/10 border border-white/15 rounded-3xl p-6 flex flex-col justify-between items-center shadow-lg relative overflow-hidden backdrop-blur-sm select-none">
              {/* Profile image container */}
              <div className="relative h-28 w-28 rounded-full border-2 border-white overflow-hidden mb-6 flex items-center justify-center bg-brand-navy shadow-lg shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250&h=250"
                  alt="Ankit Jani"
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="text-[10px] font-bold tracking-[0.25em] text-white/50 uppercase block mb-4">
                Prior Network Exposure
              </span>

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
        className="relative z-20 w-full bg-white py-32 border-t border-brand-navy/[0.04] flex flex-col items-center select-none overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.07) 0%, rgba(59, 130, 246, 0) 70%)"
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(246, 134, 31, 0.06) 0%, rgba(246, 134, 31, 0) 70%)"
            }}
          />
        </div>

        {/* Heading container */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[12px] font-bold tracking-[0.2em] text-brand-orange uppercase">
              Results & Trust
            </span>
            <ScrollReveal
              as="h2"
              containerClassName="text-[36px] sm:text-[48px] font-extrabold text-brand-navy tracking-tight mt-3"
            >
              What Our Partners Say
            </ScrollReveal>
            <p className="text-[16px] sm:text-[18px] text-brand-navy/70 mt-4 leading-relaxed">
              Real feedback from the business heads, directors, and campaign
              partners we work with.
            </p>
          </div>
        </div>

        {/* Belts container */}
        <div className="relative w-full overflow-hidden flex flex-col gap-6 md:gap-8">
          {/* Side Fadeout Gradient Overlays (fadeout strap on both sides) */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

          {/* Row 1 (Left to Right) */}
          <div className="w-full overflow-visible">
            <div
              ref={belt1Ref}
              className="flex gap-6 w-max px-16 md:px-32 whitespace-nowrap"
            >
              {[
                {
                  quote:
                    "The structured approach Jukebox took on our D2C launch was exceptional. We went from zero database to 5x ROAS inside 4 months.",
                  author: "Ananya Mehta",
                  role: "Director of Brand Growth, Aura Skincare",
                  avatar:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
                },
                {
                  quote:
                    "Their creative strategy completely overhauled our ad campaigns. We saw an immediate 35% CPA decrease and scalable margins.",
                  author: "Kunal Sharma",
                  role: "Founder, FitLife Nutrition",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
                },
                {
                  quote:
                    "Jukebox doesn't just run ads; they build the data pipes. GA4 lead tracking event validation went from 60% accuracy to 100% matches.",
                  author: "Priya Iyer",
                  role: "Marketing Head, Nexa Retail",
                  avatar:
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[310px] md:w-[370px] shrink-0 rounded-2xl border border-brand-navy/[0.04] bg-white p-6 md:p-8 shadow-premium transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-brand-orange mb-5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-[13px] md:text-[14px] text-brand-navy/80 italic leading-relaxed whitespace-normal">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-brand-navy/[0.04]">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="h-9 w-9 rounded-full object-cover border border-brand-navy/[0.04] shadow-premium"
                    />
                    <div className="leading-tight">
                      <h5 className="text-[13px] font-semibold text-brand-navy tracking-tight whitespace-normal">
                        {item.author}
                      </h5>
                      <p className="text-[10px] text-brand-navy/60 font-medium mt-0.5 whitespace-normal">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (Right to Left) */}
          <div className="w-full overflow-visible">
            <div
              ref={belt2Ref}
              className="flex gap-6 w-max px-16 md:px-32 whitespace-nowrap"
            >
              {[
                {
                  quote:
                    "Unlike agencies that rely on vanity metrics, Jukebox focuses on down-funnel lead qualification. Our sales conversion rates increased by 40%.",
                  author: "Siddharth Lodha",
                  role: "Managing Director, Lodha Premium Real Estate",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
                },
                {
                  quote:
                    "Their LinkedIn funnel architecture generated qualified demo calls at half our previous acquisition cost. Highly analytical and structured execution.",
                  author: "Rohan Verma",
                  role: "CEO, Alpha B2B Solutions",
                  avatar:
                    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
                },
                {
                  quote:
                    "Their automated WhatsApp nurture flows re-activated leads that we had written off. It paid back the entire setup cost in less than a month.",
                  author: "Meera Kapoor",
                  role: "Director, Horizon Education",
                  avatar:
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[310px] md:w-[370px] shrink-0 rounded-2xl border border-brand-navy/[0.04] bg-white p-6 md:p-8 shadow-premium transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-brand-orange mb-5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-[13px] md:text-[14px] text-brand-navy/80 italic leading-relaxed whitespace-normal">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-brand-navy/[0.04]">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="h-9 w-9 rounded-full object-cover border border-brand-navy/[0.04] shadow-premium"
                    />
                    <div className="leading-tight">
                      <h5 className="text-[13px] font-semibold text-brand-navy tracking-tight whitespace-normal">
                        {item.author}
                      </h5>
                      <p className="text-[10px] text-brand-navy/60 font-medium mt-0.5 whitespace-normal">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 (Left to Right) */}
          <div className="w-full overflow-visible">
            <div
              ref={belt3Ref}
              className="flex gap-6 w-max px-16 md:px-32 whitespace-nowrap"
            >
              {[
                {
                  quote:
                    "The transition to a unified growth pipeline has saved us months of manual testing. Jukebox built an engine that runs itself.",
                  author: "Dharmendra Jani",
                  role: "Operations Head, Jani Media & Entertainment",
                  avatar:
                    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150",
                },
                {
                  quote:
                    "Standard agency retainers always lacked alignment. Jukebox's advisory consulting models reshaped our unit margins completely.",
                  author: "Vikram Sen",
                  role: "Co-Founder, Brew & Co.",
                  avatar:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
                },
                {
                  quote:
                    "We scaled our monthly ad spends 10x while keeping ROAS completely stable. Their execution speeds and tracking detail is elite.",
                  author: "Tanvi Shah",
                  role: "Head of Growth, Bloom Cosmetics",
                  avatar:
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[310px] md:w-[370px] shrink-0 rounded-2xl border border-brand-navy/[0.04] bg-white p-6 md:p-8 shadow-premium transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-brand-orange mb-5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-3.5 h-3.5 fill-current"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-[13px] md:text-[14px] text-brand-navy/80 italic leading-relaxed whitespace-normal">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 mt-6 pt-5 border-t border-brand-navy/[0.04]">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="h-9 w-9 rounded-full object-cover border border-brand-navy/[0.04] shadow-premium"
                    />
                    <div className="leading-tight">
                      <h5 className="text-[13px] font-semibold text-brand-navy tracking-tight whitespace-normal">
                        {item.author}
                      </h5>
                      <p className="text-[10px] text-brand-navy/60 font-medium mt-0.5 whitespace-normal">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Models & Symptom Checklist Section */}
      <div
        id="partnership"
        className="relative z-20 w-full bg-brand-navy py-24 border-t border-white/[0.04] flex flex-col items-center select-none overflow-hidden"
      >
        {/* Grid pattern & soft ambient spotlights */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] z-0 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div 
            className="absolute top-0 right-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at top right, rgba(246, 134, 31, 0.08) 0%, rgba(246, 134, 31, 0) 70%)"
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px]"
            style={{
              background: "radial-gradient(circle at bottom left, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Symptom Checklist (col-span 5) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 lg:p-8 shadow-sm">
              <span className="text-[12px] font-bold tracking-[0.2em] text-brand-orange uppercase">
                When to reach out
              </span>
              <h3 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-white mt-3 leading-tight">
                Are you facing these challenges?
              </h3>
              <p className="text-[14px] text-white/60 leading-relaxed mt-4">
                If your business is experiencing any of these common marketing
                friction points, it's time to restructure your systems.
              </p>

              <ul className="flex flex-col gap-4 mt-8">
                {[
                  "Your current marketing efforts feel scattered and inconsistent.",
                  "Your campaigns generate high impressions but lack clear, bottom-funnel conversions.",
                  "Your internal team is overwhelmed or lacks specialized tracking/CRO expertise.",
                  "You are managing multiple disconnected agencies and freelancers.",
                  "You struggle to establish single-source-of-truth attribution.",
                ].map((symptom, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-[13px] text-white/80 font-medium leading-relaxed"
                  >
                    <div className="h-5 w-5 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-brand-orange font-semibold text-[10px]">
                        ✓
                      </span>
                    </div>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Engagement Models Grid (col-span 7) */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full gap-6">
              <div>
                <span className="text-[12px] font-bold tracking-[0.2em] text-brand-orange uppercase">
                  How we work with you
                </span>
                <h3 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight text-white mt-3 leading-tight">
                  Flexible Engagement Models
                </h3>
                <p className="text-[15px] text-white/60 leading-relaxed mt-4">
                  We don't believe in one-size-fits-all agreements. Choose the
                  exact collaboration structure that aligns with your timeline
                  and objectives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[
                  {
                    title: "Ongoing Support",
                    desc: "Continuous monthly execution across search, paid social, copy, and tracking dashboard management.",
                    pill: "Monthly Retainer",
                  },
                  {
                    title: "Project-Based Work",
                    desc: "Structured deliverables with clear timelines—ideal for landing page CRO setups, audits, and tracking setups.",
                    pill: "Fixed Scope",
                  },
                  {
                    title: "Guidance & Direction",
                    desc: "High-level strategic consulting and regular audits for internal teams who need directional support.",
                    pill: "Advisory Calls",
                  },
                ].map((model, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm hover:border-brand-orange/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-extrabold bg-brand-orange/10 text-brand-orange px-2.5 py-1 rounded-md tracking-wider uppercase inline-block mb-4">
                        {model.pill}
                      </span>
                      <h4 className="text-[15px] font-extrabold text-white tracking-tight">
                        {model.title}
                      </h4>
                      <p className="text-[12.5px] text-white/60 leading-relaxed mt-2.5">
                        {model.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// Services Interactive Dashboard Data & Helpers
// ==========================================

const servicesData = [
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
    title: "Funnel Strategy & CRO",
    description:
      "High-converting landing pages and optimization to improve lead and sales conversions.",
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
  {
    title: "Creative Strategy & Ads",
    description: "Ad creatives, copywriting, messaging and campaign creatives.",
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
    title: "Analytics & Tracking",
    description: "Pixel setup, conversion tracking and reporting dashboards.",
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
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
  {
    title: "Growth Consulting",
    description:
      "Strategic guidance for scaling marketing and revenue systems.",
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
    title: "Marketing Automation & CRM",
    description:
      "Automated follow-ups, WhatsApp/email journeys, and CRM setup to convert more leads and retain customers.",
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
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M3 12c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M3 12l-3 3m3-3l3 3"
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
          attr: { r: 4 },
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
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-2 mb-2">
        <span className="text-[11px] font-semibold text-brand-navy/80">
          Meta &amp; Google Ads Campaign
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider animate-pulse">
            Scaling Spend
          </span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-brand-navy/5 p-2 rounded-lg text-center">
          <span className="text-[9px] block text-brand-navy/50 font-semibold uppercase">
            CTR
          </span>
          <span className="text-[13px] font-extrabold text-brand-navy">{ctr}</span>
        </div>
        <div className="bg-brand-navy/5 p-2 rounded-lg text-center">
          <span className="text-[9px] block text-brand-navy/50 font-semibold uppercase">
            CPC
          </span>
          <span className="text-[13px] font-extrabold text-brand-navy">{cpc}</span>
        </div>
        <div className="bg-brand-navy/5 p-2 rounded-lg text-center">
          <span className="text-[9px] block text-brand-navy/50 font-semibold uppercase">
            ROAS
          </span>
          <span className="text-[13px] font-extrabold text-brand-orange">
            {roas}
          </span>
        </div>
      </div>
      <div className="flex-1 mt-4 relative flex items-end">
        <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 80">
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
            strokeWidth="3"
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
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-2 mb-1.5">
        <span className="text-[11px] font-semibold text-brand-navy/80">
          Figma Creative Workspace
        </span>
        <span className="text-[9px] font-bold text-[#a259ff] uppercase tracking-wider">
          Design System
        </span>
      </div>

      <div
        ref={bannerRef}
        className="flex-1 rounded-xl bg-gradient-to-br from-brand-navy to-brand-navy-light p-3 flex flex-col justify-between text-white relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-brand-orange/20 blur-xl pointer-events-none" />

        {/* Emojis float layer */}
        <div
          ref={emojiContainerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        />

        {/* Ad Header */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center font-extrabold text-[9px]">
            J
          </div>
          <div>
            <div className="h-2 w-16 bg-white/40 rounded-full" />
            <div className="h-1.5 w-10 bg-white/25 rounded-full mt-1" />
          </div>
        </div>

        {/* Ad Copy (Typewriter Headline) */}
        <div className="my-2 z-10 min-h-[36px]">
          <h4 className="text-[14px] font-bold tracking-tight min-h-[14px]">
            {headline}
            <span className="inline-block w-0.5 h-3.5 bg-brand-orange ml-0.5 animate-pulse" />
          </h4>
          <p className="text-[8.5px] text-white/60 mt-0.5 leading-normal max-w-[150px]">
            Custom creative designed to drive clicks and purchases.
          </p>
        </div>

        {/* Slider elements (assemblages) */}
        <div className="flex items-center justify-between gap-1.5 mt-1 relative z-10">
          {/* Option A element */}
          <div
            ref={element1Ref}
            className="bg-white/10 border border-white/10 rounded-md p-1.5 flex-1 flex flex-col items-center justify-center"
          >
            <span className="text-[7.5px] font-semibold text-white/50">
              ROAS Target
            </span>
            <span className="text-[11px] font-bold text-brand-orange mt-0.5">
              5.0x
            </span>
          </div>
          {/* Option B element */}
          <div
            ref={element2Ref}
            className="bg-white/10 border border-white/10 rounded-md p-1.5 flex-1 flex flex-col items-center justify-center"
          >
            <span className="text-[7.5px] font-semibold text-white/50">
              Engagement
            </span>
            <span className="text-[11px] font-bold text-emerald-400 mt-0.5">
              High
            </span>
          </div>
        </div>

        {/* Ad Footer / Reactions */}
        <div className="flex items-center justify-between z-10 mt-1 border-t border-white/10 pt-1.5">
          <span className="text-[8px] bg-brand-orange text-white px-2 py-0.5 rounded-full font-semibold">
            Shop Now ↗
          </span>
          <div className="flex items-center gap-1 text-[8.5px] text-white/60">
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
          <span className="font-bold text-brand-navy">
            {liveConvs} / min
          </span>
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
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-1.5 mb-1">
        <span className="text-[11px] font-semibold text-brand-navy/80">
          Scaling Roadmap
        </span>
        <span className="text-[9px] font-bold text-brand-orange uppercase tracking-wider">
          Growth Consulting
        </span>
      </div>

      <div className="flex-grow grid grid-cols-12 gap-3 items-center min-h-0 py-1">
        {/* Left Column: Milestones (7 col-span) */}
        <div className="col-span-7 flex flex-col gap-1.5 justify-center">
          {/* Card 1: Audit */}
          <div
            className={`p-1.5 rounded-lg border transition-all duration-300 ${
              activePhase === 1
                ? "bg-brand-navy/5 border-brand-navy scale-[1.02]"
                : activePhase > 1
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white border-brand-navy/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[8.5px] font-bold block leading-tight ${
                  activePhase >= 1 ? "text-brand-navy" : "text-brand-navy/40"
                }`}
              >
                1. System Audit
              </span>
              {activePhase > 1 && (
                <span className="text-emerald-500 text-[8px] font-extrabold">
                  COMPLETE ✓
                </span>
              )}
              {activePhase === 1 && (
                <span className="text-brand-orange text-[8px] font-extrabold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>
            {activePhase >= 1 && (
              <div className="mt-1 flex flex-col gap-0.5 text-[7px] text-brand-navy/60 font-medium animate-fade-in">
                <div className="flex items-center gap-1">
                  <span
                    className={
                      auditCheck1 ? "text-emerald-500" : "text-brand-navy/20"
                    }
                  >
                    {auditCheck1 ? "✓" : "○"}
                  </span>
                  <span>Meta Pixel & Conversions API Audit</span>
                </div>
                <div className="flex items-center gap-1">
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
            className={`p-1.5 rounded-lg border transition-all duration-300 ${
              activePhase === 2
                ? "bg-brand-navy/5 border-brand-navy scale-[1.02]"
                : activePhase > 2
                  ? "bg-emerald-500/5 border-emerald-500/20"
                  : "bg-white border-brand-navy/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[8.5px] font-bold block leading-tight ${
                  activePhase >= 2 ? "text-brand-navy" : "text-brand-navy/40"
                }`}
              >
                2. Funnel Restructure
              </span>
              {activePhase > 2 && (
                <span className="text-emerald-500 text-[8px] font-extrabold">
                  COMPLETE ✓
                </span>
              )}
              {activePhase === 2 && (
                <span className="text-brand-orange text-[8px] font-extrabold animate-pulse">
                  ACTIVE
                </span>
              )}
            </div>
            {activePhase >= 2 && (
              <div className="mt-1 flex flex-col gap-0.5 text-[7px] text-brand-navy/60 font-medium animate-fade-in">
                <div className="flex items-center gap-1">
                  <span
                    className={
                      restructCheck1 ? "text-emerald-500" : "text-brand-navy/20"
                    }
                  >
                    {restructCheck1 ? "✓" : "○"}
                  </span>
                  <span>Funnel Strategy Realignment</span>
                </div>
                <div className="flex items-center gap-1">
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
            className={`p-1.5 rounded-lg border transition-all duration-300 ${
              activePhase === 3
                ? "bg-brand-orange/10 border-brand-orange scale-[1.02] shadow-[0_4px_12px_rgba(232,128,26,0.05)]"
                : "bg-white border-brand-navy/5"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[8.5px] font-bold block leading-tight ${
                  activePhase >= 3 ? "text-brand-navy" : "text-brand-navy/40"
                }`}
              >
                3. Scaling & Budgets
              </span>
              {activePhase === 3 && (
                <span className="text-brand-orange text-[8px] font-extrabold animate-bounce">
                  SCALING 🚀
                </span>
              )}
            </div>
            {activePhase >= 3 && (
              <div className="mt-1 flex flex-col gap-0.5 text-[7px] text-brand-navy/60 font-medium animate-fade-in">
                <div className="flex items-center gap-1">
                  <span className="text-brand-orange">➔</span>
                  <span>Scale Daily Budget to $1,500/day</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-brand-orange">➔</span>
                  <span>Maximize Profit margins at scale</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Dashboard Charts (5 col-span) */}
        <div className="col-span-5 h-full flex flex-col gap-1.5 justify-center py-1">
          {/* Revenue Dial Card */}
          <div className="bg-brand-navy text-white p-2 rounded-xl border border-brand-navy-light flex flex-col justify-between relative overflow-hidden shadow-lg min-h-[56px]">
            <div className="absolute top-0 right-0 w-12 h-12 rounded-full bg-brand-orange/20 blur-lg pointer-events-none" />
            <span className="text-[6.5px] text-white/50 block font-semibold uppercase tracking-wider">
              Projected Monthly Revenue
            </span>
            <span className="text-[12px] font-extrabold text-white mt-1 leading-none tracking-tight block">
              {revenue}
            </span>
          </div>

          {/* ROAS Indicator */}
          <div className="bg-white border border-brand-navy/10 p-2 rounded-xl flex items-center justify-between shadow-sm min-h-[38px]">
            <div className="flex flex-col">
              <span className="text-[6.5px] text-brand-navy/40 font-semibold uppercase tracking-wider">
                Target ROAS
              </span>
              <span className="text-[11px] font-extrabold text-brand-navy mt-0.5 leading-none">
                {roas}
              </span>
            </div>
            <div className="h-6 w-6 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
              <span className="text-[8px] font-extrabold text-brand-orange">
                ×5
              </span>
            </div>
          </div>

          {/* Mini Line Chart SVG */}
          <div className="bg-white border border-brand-navy/10 rounded-xl p-1.5 flex flex-col justify-between h-[45px] relative overflow-hidden">
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
                strokeWidth="2"
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
          className={c3 ? "text-brand-navy/90 font-semibold" : "text-brand-navy/40"}
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
    <div className="flex flex-col h-full justify-between animate-fade-in text-brand-navy select-none">
      <div className="flex items-center justify-between border-b border-brand-navy/10 pb-1.5 mb-1">
        <span className="text-[11px] font-semibold text-brand-navy/80">
          Workflow Logic Builder
        </span>
        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
          CRM Sync Active
        </span>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-2.5 items-center">
        {/* Left: Logic Flow Nodes (col-span 7) */}
        <div className="col-span-7 flex flex-col justify-center items-center gap-1.5 relative py-1">
          {/* Node 1 */}
          <div
            className={`w-full px-2.5 py-1.5 rounded-lg border text-center transition-all duration-300 ${
              pulsePos === "node1"
                ? "bg-brand-orange/10 border-brand-orange scale-[1.03]"
                : "bg-white border-brand-navy/10"
            }`}
          >
            <span className="text-[8.5px] font-bold block leading-tight">
              1. Form Submit
            </span>
            <span className="text-[7px] text-brand-navy/40 leading-none">
              Capture Lead
            </span>
          </div>

          {/* Line 1 */}
          <div className="h-3 w-0.5 bg-brand-navy/15 relative">
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange transition-all duration-300 ${
                pulsePos === "line1"
                  ? "opacity-100 top-[6px] scale-110"
                  : "opacity-0 top-0 scale-75"
              }`}
            />
          </div>

          {/* Node 2 */}
          <div
            className={`w-full px-2.5 py-1.5 rounded-lg border text-center transition-all duration-300 ${
              pulsePos === "node2"
                ? "bg-brand-orange/10 border-brand-orange scale-[1.03]"
                : "bg-white border-brand-navy/10"
            }`}
          >
            <span className="text-[8.5px] font-bold block leading-tight">
              2. API Router Delay
            </span>
            <span className="text-[7px] text-brand-navy/40 leading-none">
              Wait: 2 minutes
            </span>
          </div>

          {/* Line 2 */}
          <div className="h-3 w-0.5 bg-brand-navy/15 relative">
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange transition-all duration-300 ${
                pulsePos === "line2"
                  ? "opacity-100 top-[6px] scale-110"
                  : "opacity-0 top-0 scale-75"
              }`}
            />
          </div>

          {/* Node 3 */}
          <div
            className={`w-full px-2.5 py-1.5 rounded-lg border text-center transition-all duration-300 ${
              pulsePos === "node3"
                ? "bg-emerald-500/10 border-emerald-500 scale-[1.03]"
                : "bg-white border-brand-navy/10"
            }`}
          >
            <span className="text-[8.5px] font-bold block leading-tight">
              3. WhatsApp Alert
            </span>
            <span className="text-[7px] text-brand-navy/40 leading-none">
              Send Client Blueprint
            </span>
          </div>
        </div>

        {/* Right: Phone Simulator (col-span 5) */}
        <div className="col-span-5 flex justify-center py-1">
          <div className="relative w-full aspect-[9/16] max-w-[85px] bg-[#0c0c0e] rounded-xl border border-brand-navy-light/80 p-1 flex flex-col justify-start overflow-hidden shadow-lg">
            {/* Screen background (lockscreen) */}
            <div className="absolute inset-0 bg-[#1e293b] flex flex-col items-center justify-start p-1 pointer-events-none">
              {/* Top notch */}
              <div className="h-1.5 w-6 bg-black rounded-full mb-1" />
              {/* Lock screen clock */}
              <span className="text-[9px] font-extrabold text-white/50 leading-none tracking-tighter">
                09:41
              </span>

              {/* Push notification banner */}
              <div
                ref={notifRef}
                className="w-full bg-white/95 border border-white/20 rounded-md p-1 mt-1.5 shadow-md flex items-center gap-1 opacity-0"
              >
                <div className="h-3.5 w-3.5 rounded bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <svg
                    className="w-2.5 h-2.5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98C16.58 1.897 14.1 1.87 11.462 1.87c-5.438 0-9.864 4.42-9.868 9.865-.001 1.762.47 3.407 1.454 4.908L1.983 20.3l3.859-1.014c1.478.807 2.946 1.157 4.805 1.157z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0 leading-tight">
                  <span className="font-bold text-[5.5px] text-brand-navy truncate">
                    Jukebox Media
                  </span>
                  <span className="text-[5px] text-brand-navy/60 leading-none">
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
          <span className="text-[8px] font-extrabold text-emerald-600">ACTIVE</span>
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
      return <PerformanceMarketingMockup />;
    case 1:
      return <FunnelCroMockup />;
    case 2:
      return <CreativeStrategyMockup />;
    case 3:
      return <AnalyticsTrackingMockup />;
    case 4:
      return <GrowthConsultingMockup />;
    case 5:
      return <MarketingAutomationMockup />;
    default:
      return null;
  }
};

const ActiveOverlay = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <PerformanceMarketingOverlay />;
    case 1:
      return <FunnelCroOverlay />;
    case 2:
      return <CreativeStrategyOverlay />;
    case 3:
      return <AnalyticsTrackingOverlay />;
    case 4:
      return <GrowthConsultingOverlay />;
    case 5:
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
    <div className="flex flex-col gap-2.5 animate-fade-in text-brand-navy select-none min-h-[185px]">
      <span className="text-[9px] font-extrabold text-brand-navy/40 uppercase tracking-widest block mb-1">
        Live Attribution Feed
      </span>
      <div className="relative h-[155px] overflow-hidden">
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
