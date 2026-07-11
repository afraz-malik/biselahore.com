"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { HeroSlideData } from "@/components/hero/hero-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
  priority?: boolean;
}

export function HeroSlide({ slide, isActive, priority }: HeroSlideProps) {
  const reduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <div className="absolute inset-0" style={{ zIndex: isActive ? 1 : 0 }} aria-hidden={!isActive}>
      <motion.div
        initial={false}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={reduceMotion ? undefined : { scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 7, ease: "easeOut" }}
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      </motion.div>

      <div className="relative z-10 flex h-full items-center">
        <Container>
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="max-w-2xl text-white"
          >
            <motion.p
              variants={itemVariants}
              className="text-sm font-semibold tracking-[0.16em] text-white/80 uppercase sm:text-base"
            >
              {slide.eyebrow}
            </motion.p>
            <motion.h1
              variants={itemVariants}
              className="mt-5 text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/85 text-pretty sm:text-lg"
            >
              {slide.description}
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button
                size="xl"
                nativeButton={false}
                tabIndex={isActive ? 0 : -1}
                render={<Link href={slide.primaryAction.href} />}
                className="shadow-lg shadow-black/25 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                {slide.primaryAction.label}
                <ArrowRight />
              </Button>
              {slide.secondaryAction ? (
                <Button
                  size="xl"
                  variant="outline"
                  nativeButton={false}
                  tabIndex={isActive ? 0 : -1}
                  render={<Link href={slide.secondaryAction.href} />}
                  className="border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
                >
                  {slide.secondaryAction.label}
                </Button>
              ) : null}
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
