"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative flex min-h-[80svh] flex-col justify-center overflow-hidden border-b border-border md:min-h-[88svh] lg:min-h-[92svh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_-10%,var(--color-accent)_0%,transparent_62%)]"
      />
      <Container className="py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto  text-center"
        >
          <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase sm:text-base">
            Board of Intermediate &amp; Secondary Education, Lahore
          </p>
          <h1 className="mt-5 text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Transparent examinations. Timely results.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
            BISE Lahore conducts Secondary and Higher Secondary School
            examinations with a rapid, automated student-support system — built
            for a smooth academic journey from registration to result.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="xl"
              nativeButton={false}
              render={<Link href="#quick-services" />}
            >
              Explore Quick Services
              <ArrowRight />
            </Button>
            <Button
              size="xl"
              variant="outline"
              nativeButton={false}
              render={<Link href="/about" />}
            >
              About the Board
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
