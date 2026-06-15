const A = () => (<>

      <div
        id="problem"
        className="relative z-20 w-full bg-[#f8fafc] py-24 border-y border-brand-navy/[0.04] flex flex-col items-center select-none overflow-hidden"
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
              background: "radial-gradient(circle at bottom left, rgba(232, 128, 26, 0.06) 0%, rgba(232, 128, 26, 0) 70%)"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[12px] font-bold tracking-[0.2em] text-brand-orange uppercase">
              The Common Situation
            </span>
            <h2 className="text-[36px] sm:text-[48px] font-extrabold text-brand-navy tracking-tight mt-3">
              Does your marketing feel scattered?
            </h2>
            <p className="text-[16px] sm:text-[18px] text-brand-navy/70 mt-4 leading-relaxed">
              Many businesses today operate in a state of fragmentation, leading
              to wasted spend and unmeasurable results.
            </p>
                  <div className="flex flex-wrap justify-center gap-6 lg:gap-8 w-full">
            {[
              {
                kicker: "INCONSISTENT GROWTH",
                title: "Irregular Campaigns",
                desc: "Running marketing in fits and starts, leading to erratic cash flows.",
                graphic: (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                    {/* A soft dashed line across */}
                    <div className="absolute w-full h-[1px] border-b-2 border-dashed border-brand-navy/10 top-[55%] -translate-y-1/2"></div>
                    <div className="w-full max-w-[140px] h-28 relative flex items-end justify-center gap-3 opacity-90 z-10">
                      <div className="w-8 bg-brand-navy/5 h-[40%] rounded-t-lg"></div>
                      <div className="w-8 bg-brand-navy/10 h-[60%] rounded-t-lg"></div>
                      <div className="w-8 bg-brand-orange/80 h-[100%] rounded-t-lg shadow-lg shadow-brand-orange/20"></div>
                      <div className="w-8 bg-brand-navy/10 h-[30%] rounded-t-lg"></div>
                    </div>
                  </div>
                ),
              },
              {
                kicker: "FRAGMENTED TEAMS",
                title: "Multiple Vendor Chaos",
                desc: "Working with disconnected agencies leads to fragmented data and finger-pointing.",
                graphic: (
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-2.5 scale-[0.85]">
                    <div className="bg-white px-4 py-2.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-3 border border-brand-navy/5 self-end mr-4">
                      <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-[10px] font-bold text-brand-orange">A</div>
                      <div className="text-[11px] font-bold text-brand-navy">Where's the new creative?</div>
                    </div>
                    <div className="bg-white px-4 py-2.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center gap-3 border border-brand-navy/5 self-start ml-2 z-10">
                      <div className="w-6 h-6 rounded-full bg-brand-navy/10 flex items-center justify-center text-[10px] font-bold text-brand-navy">F</div>
                      <div className="text-[11px] font-bold text-brand-navy">Waiting on strategy...</div>
                    </div>
                    <div className="bg-white/60 px-4 py-2.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex items-center gap-3 border border-brand-navy/5 self-center blur-[0.5px]">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">I</div>
                      <div className="text-[11px] font-bold text-brand-navy/50">Who is running ads?</div>
                    </div>
                  </div>
                ),
              },
              {
                kicker: "VANITY METRICS",
                title: "Activity Over Direction",
                desc: "Focusing heavily on execution instead of strategic alignment and revenue goals.",
                graphic: (
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-3">
                    <div className="bg-white px-5 py-3 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center gap-3 border border-brand-navy/5 relative z-10 translate-x-2">
                      <span className="text-red-500 text-xl">❤️</span>
                      <div className="flex flex-col">
                        <span className="text-brand-navy font-extrabold text-[13px] leading-tight">10,000+</span>
                        <span className="text-brand-navy/40 font-bold text-[9px] uppercase tracking-wider">Likes</span>
                      </div>
                    </div>
                    <div className="bg-white/50 px-5 py-3 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-3 border border-brand-navy/5 scale-90 opacity-60 -translate-x-4">
                      <span className="text-emerald-500 text-xl">💰</span>
                      <div className="flex flex-col">
                        <span className="text-brand-navy font-extrabold text-[13px] leading-tight">$0</span>
                        <span className="text-brand-navy/40 font-bold text-[9px] uppercase tracking-wider">Revenue ROI</span>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                kicker: "BRAND DILUTION",
                title: "Consistency Struggles",
                desc: "Struggling to maintain a unified brand message and consistent campaign presence.",
                graphic: (
                  <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
                    <div className="flex -space-x-3">
                      <div className="w-14 h-14 rounded-full border-4 border-[#f1f5f9] bg-blue-100 flex items-center justify-center z-10 shadow-sm"><span className="text-blue-500 text-lg font-black">C</span></div>
                      <div className="w-14 h-14 rounded-xl border-4 border-[#f1f5f9] bg-green-100 flex items-center justify-center z-20 shadow-sm -rotate-6"><span className="text-green-500 text-lg font-black">A</span></div>
                      <div className="w-14 h-14 rounded-sm border-4 border-[#f1f5f9] bg-purple-100 flex items-center justify-center z-30 shadow-sm rotate-12"><span className="text-purple-500 text-lg font-black">B</span></div>
                    </div>
                    <div className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-brand-navy/5">
                      <span className="text-[10px] font-extrabold tracking-widest text-red-500/80 uppercase line-through">Uniform Brand</span>
                    </div>
                  </div>
                ),
              },
              {
                kicker: "WASTED SPEND",
                title: "Unclear ROI",
                desc: "Inability to track the exact returns on your marketing investments.",
                graphic: (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-36 h-24 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-brand-navy/5 flex flex-col p-4 gap-3 absolute z-20 -translate-x-2 -translate-y-2">
                       <div className="flex justify-between items-center">
                         <div className="flex flex-col gap-1">
                           <div className="w-8 h-1.5 bg-brand-navy/10 rounded-full"></div>
                           <div className="w-12 h-1.5 bg-brand-navy/5 rounded-full"></div>
                         </div>
                         <div className="text-[12px] font-extrabold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">-25%</div>
                       </div>
                       <div className="flex-1 flex items-end gap-2">
                         <div className="w-full h-[60%] bg-brand-navy/5 rounded-t-sm"></div>
                         <div className="w-full h-[40%] bg-brand-navy/5 rounded-t-sm"></div>
                         <div className="w-full h-[80%] bg-brand-orange/80 rounded-t-md shadow-sm"></div>
                         <div className="w-full h-[30%] bg-brand-navy/5 rounded-t-sm"></div>
                       </div>
                    </div>
                    <div className="w-36 h-24 bg-white/40 rounded-2xl shadow-sm border border-brand-navy/5 absolute translate-y-3 translate-x-4 blur-[1px]"></div>
                  </div>
                ),
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-[340px] shrink-0 bg-white rounded-[32px] p-2 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-brand-navy/[0.04] flex flex-col h-[400px] transition-transform duration-300 hover:-translate-y-1.5 group"
              >
                {/* Graphic Area */}
                <div className="flex-1 bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] rounded-[24px] flex items-center justify-center overflow-hidden relative border border-brand-navy/[0.02]">
                  {card.graphic}
                </div>
                {/* Text Area */}
                <div className="px-6 py-7 flex flex-col items-start text-left h-[170px] justify-center">
                  <span className="text-[10px] font-extrabold tracking-widest text-brand-navy/40 uppercase mb-2">
                    {card.kicker}
                  </span>
                  <h4 className="text-[18px] font-bold text-brand-navy leading-tight tracking-tight mb-2">
                    {card.title}
                  </h4>
                  <p className="text-[14px] text-brand-navy/60 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Section */}
</>);
