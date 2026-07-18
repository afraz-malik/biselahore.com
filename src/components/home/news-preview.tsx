"use client";

import { useEffect, useRef, type WheelEvent } from "react";
import { ArrowUpRight, AlertCircle } from "lucide-react";

import { newsPreview } from "@/lib/home-data";
import { cn } from "@/lib/utils";

export function NewsPreview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const loopHeightRef = useRef(0);

  const renderNewsItems = (copyIndex: number) =>
    newsPreview.map((item, index) => {
      const accent =
        index % 2 === 0
          ? {
              link: "text-slate-950 hover:text-slate-700",
              icon: "text-slate-700/90",
              dot: "bg-slate-900/75",
              border: "border-slate-200/80",
            }
          : {
              link: "text-blue-700 hover:text-blue-900",
              icon: "text-blue-700/90",
              dot: "bg-blue-600/75",
              border: "border-blue-200/80",
            };

      return (
        <li key={`${item.title}-${copyIndex}-${index}`}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex items-start gap-3 rounded-2xl border border-transparent px-1 py-3 transition-all duration-150",
              accent.link,
              accent.border,
            )}
          >
            {item.urgent ? (
              <AlertCircle className={cn("mt-0.5 size-4.5 shrink-0", accent.icon)} />
            ) : (
              <span className={cn("mt-2 size-1.5 shrink-0 rounded-full", accent.dot)} />
            )}
            <span className="flex-1 text-pretty text-sm font-medium leading-6">
              {item.title}
            </span>
            <ArrowUpRight className={cn("mt-0.5 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100", accent.icon)} />
          </a>
        </li>
      );
    });

  useEffect(() => {
    const track = trackRef.current;
    const list = listRef.current;

    if (!track || !list) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let lastTimestamp = performance.now();

    const updateTrackPosition = () => {
      track.style.transform = `translateY(-${offsetRef.current}px)`;
    };

    const normalizeOffset = (value: number) => {
      const loopHeight = loopHeightRef.current;

      if (!loopHeight) {
        return value;
      }

      return ((value % loopHeight) + loopHeight) % loopHeight;
    };

    const measure = () => {
      loopHeightRef.current = list.getBoundingClientRect().height + 12;
      offsetRef.current = normalizeOffset(offsetRef.current);
      updateTrackPosition();
    };

    const tick = (timestamp: number) => {
      const elapsed = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (!mediaQuery.matches && loopHeightRef.current > 0) {
        offsetRef.current = normalizeOffset(offsetRef.current + elapsed * 24);
        updateTrackPosition();
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(list);

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const loopHeight = loopHeightRef.current;

    if (!track || !loopHeight) {
      return;
    }

    event.preventDefault();

    offsetRef.current = ((offsetRef.current + event.deltaY * 1.8) % loopHeight + loopHeight) % loopHeight;
    track.style.transform = `translateY(-${offsetRef.current}px)`;
  };

  return (
    <div className="h-full rounded-3xl border border-sky-200/80 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-7 shadow-[0_25px_70px_-35px_rgba(37,99,235,0.35)]">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-900">Latest News</h3>
      </div>

      <div
        className="news-marquee-mask mt-5 h-[34rem] overflow-hidden"
        onWheel={handleWheel}
      >
        <div ref={trackRef} className="space-y-3 will-change-transform">
          <ul ref={listRef} className="space-y-3">
            {renderNewsItems(0)}
          </ul>
          <ul className="space-y-3" aria-hidden="true">
            {renderNewsItems(1)}
          </ul>
        </div>
      </div>
    </div>
  );
}
