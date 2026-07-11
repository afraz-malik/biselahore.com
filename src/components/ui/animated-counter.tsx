"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface AnimatedCounterProps {
  /** Target number the counter animates up to. */
  value: number;
  /** Decimal places to keep, e.g. 1 for "99.9". */
  decimals?: number;
  /** Text placed before the number, e.g. "$". */
  prefix?: string;
  /** Text placed after the number — supports "+", "%", "K", "M", "B", etc. */
  suffix?: string;
  /** Animation length in seconds. */
  duration?: number;
  className?: string;
  /** Fires once the count-up animation finishes. */
  onComplete?: () => void;
}

/**
 * Counts from 0 up to `value` once it scrolls into view, using an
 * IntersectionObserver (via framer-motion's useInView) so the animation
 * never runs off-screen or replays on re-render.
 */
export function AnimatedCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  onComplete,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
      onComplete,
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
