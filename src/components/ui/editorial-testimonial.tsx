"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    title: "Passion, Responsiveness & Deep Business Understanding",
    quote: "Having worked with all kinds and sizes of agencies over my career, what stands out with Jukebox is their passion, responsiveness and willingness to spend the time & effort to understand the business context. These are all especially useful when the brand is in its early stages and there are many experimental elements to the marketing effort. Wishing all the best to Ankit and his team, and hopefully One20mins will be one of their marquee success stories in the time to come.",
    author: "The Founders",
    role: "Boards Games & Café — An edutainment brand",
    company: "One20mins (IG: @one20mins)",
    rating: 5,
    verified: true,
    image: "/one20mins-logo.jpg",
  },
  {
    id: 2,
    title: "Consistent & Professional Social Media Management",
    quote: "Jukebox Media has done an excellent job managing my real estate brand on social media. From content planning and reel creation to editing and posting, their team has handled everything professionally and consistently.\n\nThey understood my vision, improved my online presence, and made the entire process smooth and hassle-free. I highly recommend Jukebox Media to businesses looking for a reliable and results-driven marketing partner.",
    author: "Nitin Upadhyay",
    role: "Real Estate Developer",
    company: "Real Estate Development",
    rating: 5,
    verified: true,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
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
    <div className="w-full max-w-3xl mx-auto px-6 py-4">
      {/* Large index number and quote container */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
        <span
          className="text-[64px] sm:text-[120px] font-light leading-none text-[#161443]/10 select-none transition-all duration-500 sm:-mt-2"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {String(active + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 pt-1 sm:pt-3">
          {/* Star Rating & Verified Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-4 select-none">
            <div className="flex gap-1 text-[#f6861f]">
              {[...Array(current.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            {current.verified && (
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-500/15 px-2 py-0.5 rounded-full">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Verified Partner
              </span>
            )}
          </div>

          {/* Headline */}
          <h4
            className={`text-lg md:text-xl font-bold text-[#161443] tracking-tight mb-3 transition-all duration-300 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            {current.title}
          </h4>

          {/* Quote with curly double quotes */}
          <blockquote
            className={`text-base md:text-lg font-light leading-relaxed text-[#161443]/85 tracking-tight transition-all duration-300 ${
              isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            “{current.quote}”
          </blockquote>

          {/* Author info with hover reveal */}
          <div
            className={`mt-8 group cursor-default transition-all duration-300 delay-100 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#161443]/10 shadow-sm bg-white">
                <Image
                  src={current.image || "/placeholder.svg"}
                  alt={current.author}
                  fill
                  className={`object-cover ${current.image.includes("one20mins") ? "scale-110" : ""}`}
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-semibold text-[#161443]">{current.author}</p>
                <p className="text-sm text-[#161443]/60 font-medium">
                  {current.role}
                  <span className="mx-2 text-[#161443]/20">/</span>
                  <span className="group-hover:text-[#f6861f] transition-colors duration-300">{current.company}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - vertical line selector */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => handleChange(index)} className="group relative py-4 cursor-pointer">
                <span
                  className={`block h-0.5 transition-all duration-500 ease-out ${
                    index === active
                      ? "w-12 bg-[#f6861f]"
                      : "w-6 bg-[#161443]/20 group-hover:w-8 group-hover:bg-[#161443]/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-[#161443]/60 tracking-widest uppercase">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full text-[#161443]/40 hover:text-[#f6861f] hover:bg-[#161443]/5 transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full text-[#161443]/40 hover:text-[#f6861f] hover:bg-[#161443]/5 transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
