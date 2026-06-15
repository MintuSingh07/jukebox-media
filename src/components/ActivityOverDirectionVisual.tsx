"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  isHovered: boolean;
}

export default function ActivityOverDirectionVisual({ isHovered }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const columnHeadersRef = useRef<HTMLDivElement>(null);
  
  const tasksRef = useRef<(HTMLDivElement | null)[]>([]);
  const taskInnersRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const badgeRef = useRef<HTMLDivElement>(null);

  const tasks = [
    {
      id: 0,
      title: "Blog Post",
      desc: "Draft SEO content",
      start: { left: "10%", top: "42%", rotation: -12 },
      end: { left: "4%", top: "26%", rotation: 0 }, // Col 1 (To Do), Position 1
      color: "navy",
    },
    {
      id: 1,
      title: "Ad Creative",
      desc: "Design Instagram ads",
      start: { left: "44%", top: "18%", rotation: 10 },
      end: { left: "4%", top: "62%", rotation: 0 }, // Col 1 (To Do), Position 2
      color: "orange",
    },
    {
      id: 2,
      title: "Keywords",
      desc: "Research competition",
      start: { left: "54%", top: "54%", rotation: -6 },
      end: { left: "37%", top: "26%", rotation: 0 }, // Col 2 (In Progress), Position 1
      color: "navy",
    },
    {
      id: 3,
      title: "Reporting",
      desc: "Format dashboard",
      start: { left: "15%", top: "72%", rotation: 8 },
      end: { left: "37%", top: "62%", rotation: 0 }, // Col 2 (In Progress), Position 2
      color: "orange",
    },
    {
      id: 4,
      title: "Align Strategy",
      desc: "Define target audience",
      start: { left: "68%", top: "26%", rotation: -15 },
      end: { left: "69%", top: "26%", rotation: 0 }, // Col 3 (Done), Position 1
      color: "navy",
    },
  ];

  useEffect(() => {
    // Initial states
    gsap.set(boardRef.current, { y: 20 });
    gsap.set([headerRef.current, columnHeadersRef.current], { opacity: 0.4 });
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.7, y: 12 });

    tasks.forEach((task) => {
      const el = tasksRef.current[task.id];
      const inner = taskInnersRef.current[task.id];
      if (el) {
        gsap.set(el, {
          left: task.start.left,
          top: task.start.top,
        });
      }
      if (inner) {
        gsap.set(inner, {
          rotate: task.start.rotation,
          backgroundColor: task.color === "navy" ? "rgba(22, 20, 67, 0.06)" : "rgba(246, 134, 31, 0.08)",
          borderColor: task.color === "navy" ? "rgba(22, 20, 67, 0.1)" : "rgba(246, 134, 31, 0.12)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
        });
      }
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // 1. Board lifts up
      tl.to(boardRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }, 0);

      // 2. Headers become clear
      tl.to([headerRef.current, columnHeadersRef.current], {
        opacity: 1,
        duration: 0.35,
      }, 0);

      // 3. Task cards slide into columns with elastic/spring feel
      tasks.forEach((task) => {
        const el = tasksRef.current[task.id];
        const inner = taskInnersRef.current[task.id];
        if (el) {
          tl.to(el, {
            left: task.end.left,
            top: task.end.top,
            duration: 0.65,
            ease: "back.out(1.2)",
          }, 0);
        }
        if (inner) {
          tl.to(inner, {
            rotate: task.end.rotation,
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderColor: "rgba(0, 0, 0, 0.05)",
            boxShadow: "0 4px 10px rgba(22, 20, 67, 0.06)",
            duration: 0.5,
            ease: "power2.out",
          }, 0);
        }
      });

      // 4. "Focused" Badge pops in
      tl.to(badgeRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, 0.15);

      if (isHovered) {
        tl.play();
      } else {
        tl.reverse();
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#f8fafc] flex items-center justify-center p-5 relative overflow-hidden select-none"
    >
      {/* Kanban Board Container */}
      <div
        ref={boardRef}
        className="w-[88%] max-w-[270px] bg-white rounded-2xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-3 relative z-10 flex flex-col h-[155px]"
      >
        {/* Board Header */}
        <div
          ref={headerRef}
          className="flex justify-between items-center mb-2 px-0.5"
        >
          <span className="text-[10px] font-bold text-brand-navy tracking-tight">
            Sprint Board
          </span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/15"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-navy/15"></span>
          </div>
        </div>

        {/* Board Columns (Grid background) */}
        <div className="grid grid-cols-3 gap-1.5 flex-1 relative h-full">
          {/* Column 1 (To Do) */}
          <div className="bg-slate-50/70 rounded-lg border border-black/[0.015] p-1 flex flex-col gap-1.5">
            <div
              ref={columnHeadersRef}
              className="text-[7px] font-extrabold text-brand-navy/35 tracking-wider uppercase pl-0.5"
            >
              To Do
            </div>
          </div>

          {/* Column 2 (In Progress) */}
          <div className="bg-slate-50/70 rounded-lg border border-black/[0.015] p-1 flex flex-col gap-1.5">
            <div className="text-[7px] font-extrabold text-brand-navy/35 tracking-wider uppercase pl-0.5">
              In Progress
            </div>
          </div>

          {/* Column 3 (Done) */}
          <div className="bg-slate-50/70 rounded-lg border border-black/[0.015] p-1 flex flex-col gap-1.5">
            <div className="text-[7px] font-extrabold text-brand-navy/35 tracking-wider uppercase pl-0.5">
              Done
            </div>
          </div>

          {/* Task cards positioned absolute relative to columns container */}
          {tasks.map((task) => (
            <div
              key={task.id}
              ref={(el) => { tasksRef.current[task.id] = el; }}
              className="absolute w-[27%] h-[32px] pointer-events-none"
            >
              <div
                ref={(el) => { taskInnersRef.current[task.id] = el; }}
                className="w-full h-full rounded-md border p-1 flex flex-col justify-between select-none"
              >
                <div className="text-[6.5px] font-extrabold text-brand-navy leading-none tracking-tight truncate">
                  {task.title}
                </div>
                <div className="text-[5px] text-brand-navy/50 leading-none truncate mt-0.5">
                  {task.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Accent Badge: "🎯 Focused" */}
      <div
        ref={badgeRef}
        className="absolute top-[10%] right-[3%] bg-[#161443] text-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-[0_4px_12px_rgba(22,20,67,0.25)] flex items-center gap-1 z-20"
      >
        <span className="text-[10px]">🎯</span>
        <span>Focused</span>
      </div>
    </div>
  );
}
