"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    title: "Consistent & Professional Social Media Management",
    quote: "Jukebox Media has done an excellent job managing my real estate brand on social media. From content planning and reel creation to editing and posting, their team has handled everything professionally and consistently. They understood my vision, improved my online presence, and made the entire process smooth and hassle-free. I highly recommend Jukebox Media to businesses looking for a reliable and results-driven marketing partner.",
    author: "Nitin Upadhyay",
    role: "Real Estate Developer",
    company: "",
    rating: 5,
    verified: true,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Passion, Responsiveness & Deep Business Understanding",
    quote: "Having worked with all kinds and sizes of agencies over my career, what stands out with Jukebox is their passion, responsiveness and willingness to spend the time & effort to understand the business context. These are all especially useful when the brand is in its early stages and there are many experimental elements to the marketing effort. Wishing all the best to Ankit and his team, and hopefully One20mins will be one of their marquee success stories in the time to come.",
    author: "The Founders",
    role: "Boards Games & Café — An edutainment brand",
    company: "One20mins",
    instagram: "@one20mins",
    rating: 5,
    verified: true,
    image: "/one20mins-logo.jpg",
  },
]


export default function TestimonialsEditorial() {
  const [active, setActive] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleChange = (index: number) => {
    if (index === active || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActive(index)
      setTimeout(() => setIsTransitioning(false), 50)
    }, 300)
  }

  const handlePrev = () => {
    const newIndex = active === 0 ? testimonials.length - 1 : active - 1
    handleChange(newIndex)
  }

  const handleNext = () => {
    const newIndex = active === testimonials.length - 1 ? 0 : active + 1
    handleChange(newIndex)
  }

  const current = testimonials[active]

  return (
    <div className="w-full max-w-4xl mx-auto px-8 md:px-16 py-10">

      {/* Headline */}
      <h4
        className={`text-xl md:text-2xl font-bold text-[#161443] tracking-tight leading-snug transition-all duration-300 ${
          isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {current.title}
      </h4>

      {/* Quote with left orange accent bar */}
      <div className={`mt-6 pl-5 border-l-2 border-[#f6861f] transition-all duration-300 ${
        isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
      }`}>
        <blockquote className="text-[15px] md:text-[16px] font-light leading-[1.85] text-[#161443]/75">
          &ldquo;{current.quote}&rdquo;
        </blockquote>
      </div>

      {/* Author row */}
      <div className={`mt-8 flex items-center gap-4 transition-all duration-300 delay-75 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}>
        <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#161443]/10 shadow-sm bg-white shrink-0">
          <Image
            src={current.image || "/placeholder.svg"}
            alt={current.author}
            fill
            className={`object-cover ${current.image.includes("one20mins") ? "scale-110" : ""}`}
            sizes="44px"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-[14px] font-semibold text-[#161443] leading-tight">
            {"instagram" in current && current.instagram
              ? `${current.author} — ${current.company} | An edutainment brand`
              : current.author}
          </p>
          {"instagram" in current && current.instagram ? (
            <div className="flex items-center gap-1.5 mt-0.5">
              <svg className="w-3 h-3 text-[#E1306C] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="text-[12px] text-[#E1306C] font-semibold">{(current as any).instagram}</span>
              <span className="text-[#161443]/20 text-xs">·</span>
              <span className="text-[12px] text-[#161443]/50 font-medium">{current.role.split("—")[0].trim()}</span>
            </div>
          ) : (
            <p className="text-[12px] text-[#161443]/50 font-medium leading-tight">
              {current.role}
              {current.company && (
                <span className="text-[#161443]/30"> · {current.company}</span>
              )}
            </p>
          )}
        </div>
      </div>

      {/* Stars + Verified — bottom */}
      <div className={`mt-6 flex items-center gap-2.5 transition-all duration-300 delay-100 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}>
        <div className="flex gap-0.5 text-[#f6861f]">
          {[...Array(current.rating)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        {current.verified && (
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-500/15 px-2 py-0.5 rounded-full">
            <svg className="w-2 h-2" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Verified Partner
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mt-8 w-full h-px bg-[#161443]/[0.07]" />

      {/* Navigation row */}
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group py-3 cursor-pointer">
                <span
                  className={`block h-[2px] rounded-full transition-all duration-500 ease-out ${
                    index === active
                      ? "w-10 bg-[#f6861f]"
                      : "w-5 bg-[#161443]/15 group-hover:w-7 group-hover:bg-[#161443]/30"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-[11px] text-[#161443]/35 tracking-widest uppercase font-medium">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <button onClick={handlePrev} className="p-2 rounded-full text-[#161443]/30 hover:text-[#f6861f] hover:bg-[#161443]/[0.04] transition-all duration-200 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={handleNext} className="p-2 rounded-full text-[#161443]/30 hover:text-[#f6861f] hover:bg-[#161443]/[0.04] transition-all duration-200 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
