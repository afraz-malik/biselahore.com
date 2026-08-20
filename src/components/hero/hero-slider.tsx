"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";

import { HeroSlide } from "@/components/hero/hero-slide";
import type { HeroSlideData } from "@/components/hero/hero-data";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

export function HeroSlider({ heroSlides }: { heroSlides: HeroSlideData[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const goTo = useCallback((next: number) => {
    setIndex(
      ((next % heroSlides.length) + heroSlides.length) % heroSlides.length,
    );
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const id = setTimeout(() => {
      setIndex((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, isPaused, reduceMotion]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  const handleBlur = (event: React.FocusEvent) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsPaused(false);
    }
  };

  return (
    <section
      ref={containerRef}
      aria-roledescription="carousel"
      aria-label="BISE Lahore highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="group relative h-[calc(100svh-10rem)] min-h-[560px] w-full overflow-hidden bg-neutral-900 lg:h-[calc(100svh-14rem)]"
    >
      {heroSlides.map((slide, i) => (
        <HeroSlide
          key={slide.id}
          slide={slide}
          isActive={i === index}
          priority={i === 0}
        />
      ))}

      <div aria-live="polite" className="sr-only">
        {heroSlides[index].title}
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white opacity-100 backdrop-blur-md transition-all duration-300 hover:bg-white/20 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:left-6 md:opacity-0 md:group-hover:opacity-100 lg:left-10"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 z-20 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white opacity-100 backdrop-blur-md transition-all duration-300 hover:bg-white/20 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-6 md:opacity-0 md:group-hover:opacity-100 lg:right-10"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-2.5 sm:bottom-8">
        {heroSlides.map((slide, i) => {
          const isActiveDot = i === index;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              aria-current={isActiveDot}
              className={cn(
                "relative h-2.5 overflow-hidden rounded-full transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                isActiveDot
                  ? "w-9 bg-white/25"
                  : "w-2.5 bg-white/40 hover:bg-white/70",
              )}
            >
              {isActiveDot ? (
                reduceMotion ? (
                  <span className="absolute inset-0 rounded-full bg-white" />
                ) : (
                  <span
                    key={index}
                    style={{
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                    className="absolute inset-0 origin-left rounded-full bg-white [animation-name:hero-progress] [animation-timing-function:linear] [animation-fill-mode:forwards]"
                  />
                )
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
