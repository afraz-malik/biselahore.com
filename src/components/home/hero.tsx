"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_-10%,var(--color-accent)_0%,transparent_60%)]"
      />
      <Container className="pt-16 pb-20 md:pt-24 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Board of Intermediate &amp; Secondary Education, Lahore
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Transparent examinations. Timely results.
          </h1>
          <p className="mt-5 text-base text-muted-foreground text-pretty sm:text-lg">
            BISE Lahore conducts Secondary and Higher Secondary School
            examinations with a rapid, automated student-support system —
            built for a smooth academic journey from registration to result.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="#quick-services" />}>
              Explore Quick Services
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/about" />}>
              About the Board
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
