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
  const doneCounterRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const tasks = [
    {
      id: 0,
      title: "Blog Post",
      desc: "Draft SEO content",
      start: { left: "10%", top: "42%", rotation: -8 },
      end: { left: "2%", top: "28%", rotation: -22 },
      color: "navy",
      endScale: 1.02,
    },
    {
      id: 1,
      title: "Ad Creative",
      desc: "Design Instagram ads",
      start: { left: "44%", top: "18%", rotation: 7 },
      end: { left: "6%", top: "34%", rotation: 16 },
      color: "orange",
      endScale: 1.04,
    },
    {
      id: 2,
      title: "Keywords",
      desc: "Research competition",
      start: { left: "54%", top: "54%", rotation: -5 },
      end: { left: "8%", top: "58%", rotation: -15 },
      color: "navy",
      endScale: 1,
    },
    {
      id: 3,
      title: "Reporting",
      desc: "Format dashboard",
      start: { left: "15%", top: "68%", rotation: 6 },
      end: { left: "4%", top: "46%", rotation: 25 },
      color: "orange",
      endScale: 1.03,
    },
    {
      id: 4,
      title: "Align Strategy",
      desc: "Define target audience",
      start: { left: "68%", top: "30%", rotation: -10 },
      end: { left: "72%", top: "22%", rotation: -28 },
      color: "navy",
      endScale: 0.95,
    },
  ];

  // Build timeline ONCE on mount
  useEffect(() => {
    // Set initial states
    gsap.set(boardRef.current, { y: 18 });
    gsap.set([headerRef.current, columnHeadersRef.current], { opacity: 0.4 });
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.6, y: 14 });
    gsap.set(doneCounterRef.current, { opacity: 0, scale: 0.7, y: 6 });

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
          scale: 1,
          backgroundColor:
            task.color === "navy"
              ? "rgba(22, 20, 67, 0.06)"
              : "rgba(246, 134, 31, 0.08)",
          borderColor:
            task.color === "navy"
              ? "rgba(22, 20, 67, 0.1)"
              : "rgba(246, 134, 31, 0.12)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
        });
      }
    });

    // Build master timeline (paused)
    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

    // 1. Board lifts up
    tl.to(boardRef.current, { y: 0, duration: 0.5 }, 0);

    // 2. Headers sharpen
    tl.to([headerRef.current, columnHeadersRef.current], { opacity: 1, duration: 0.35 }, 0);

    // 3. Task cards drift wildly / pile into To Do
    tasks.forEach((task, i) => {
      const el = tasksRef.current[task.id];
      const inner = taskInnersRef.current[task.id];
      if (el) {
        tl.to(
          el,
          {
            left: task.end.left,
            top: task.end.top,
            duration: 0.6,
          },
          0.02 * i
        );
      }
      if (inner) {
        const isPiling = task.id <= 3;
        tl.to(
          inner,
          {
            rotate: task.end.rotation,
            scale: task.endScale,
            backgroundColor: isPiling
              ? "rgba(239, 68, 68, 0.06)"
              : "rgba(22, 20, 67, 0.04)",
            borderColor: isPiling
              ? "rgba(239, 68, 68, 0.18)"
              : "rgba(22, 20, 67, 0.08)",
            boxShadow: isPiling
              ? "0 4px 12px rgba(239, 68, 68, 0.08)"
              : "0 2px 6px rgba(0,0,0,0.04)",
            duration: 0.55,
          },
          0.02 * i
        );
      }
    });

    // 4. "0 completed" counter fades in on Done column
    tl.to(
      doneCounterRef.current,
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.3)" },
      0.15
    );

    // 5. Red warning badge
    tl.to(
      badgeRef.current,
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" },
      0.12
    );

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  // Play / reverse on hover change — smooth in both directions
  useEffect(() => {
    if (!tlRef.current) return;
    if (isHovered) {
      tlRef.current.timeScale(1).play();
    } else {
      tlRef.current.timeScale(0.85).reverse();
    }
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
          <span className="text-[10px] font-bold text-[#161443] tracking-tight">
            Sprint Board
          </span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#161443]/15"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#161443]/15"></span>
          </div>
        </div>

        {/* Board Columns */}
        <div className="grid grid-cols-3 gap-1.5 flex-1 relative h-full">
          {/* Column 1 (To Do) */}
          <div className="bg-slate-50/70 rounded-lg border border-black/[0.015] p-1 flex flex-col gap-1.5">
            <div
              ref={columnHeadersRef}
              className="text-[7px] font-extrabold text-[#161443]/35 tracking-wider uppercase pl-0.5"
            >
              To Do
            </div>
          </div>

          {/* Column 2 (In Progress) */}
          <div className="bg-slate-50/70 rounded-lg border border-black/[0.015] p-1 flex flex-col gap-1.5">
            <div className="text-[7px] font-extrabold text-[#161443]/35 tracking-wider uppercase pl-0.5">
              In Progress
            </div>
          </div>

          {/* Column 3 (Done) — with "0 completed" counter */}
          <div className="bg-slate-50/70 rounded-lg border border-black/[0.015] p-1 flex flex-col gap-1.5 relative">
            <div className="text-[7px] font-extrabold text-[#161443]/35 tracking-wider uppercase pl-0.5">
              Done
            </div>
            {/* "0 completed" badge */}
            <div
              ref={doneCounterRef}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="bg-red-50 border border-red-200/60 rounded-md px-1.5 py-1 flex flex-col items-center">
                <span className="text-[14px] font-black text-red-400 leading-none">
                  0
                </span>
                <span className="text-[5px] font-bold text-red-400/70 uppercase tracking-wider mt-0.5">
                  completed
                </span>
              </div>
            </div>
          </div>

          {/* Task cards */}
          {tasks.map((task) => (
            <div
              key={task.id}
              ref={(el) => {
                tasksRef.current[task.id] = el;
              }}
              className="absolute w-[27%] h-[32px] pointer-events-none z-10"
            >
              <div
                ref={(el) => {
                  taskInnersRef.current[task.id] = el;
                }}
                className="w-full h-full rounded-md border p-1 flex flex-col justify-between select-none"
              >
                <div className="text-[6.5px] font-extrabold text-[#161443] leading-none tracking-tight truncate">
                  {task.title}
                </div>
                <div className="text-[5px] text-[#161443]/50 leading-none truncate mt-0.5">
                  {task.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Red Badge */}
      <div
        ref={badgeRef}
        className="absolute top-[10%] right-[3%] bg-red-500 text-white px-2.5 py-1 rounded-full text-[9px] font-bold shadow-[0_4px_12px_rgba(239,68,68,0.3)] flex items-center gap-1 z-20"
      >
        <span className="text-[10px]">⚠</span>
        <span>All Action, No Results</span>
      </div>
    </div>
  );
}
