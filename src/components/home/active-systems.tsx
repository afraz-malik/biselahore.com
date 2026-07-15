"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { activeSystems } from "@/lib/home-data";

export function ActiveSystems() {
  return (
    <Section id="online-systems" background="accent" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Student Services"
        title="Online Systems"
        description="Live registration, roll-number slip and exam-management portals for the current session."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {activeSystems.map((system) => (
          <motion.a
            key={system.title + system.href}
            href={system.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="group relative flex items-start justify-between gap-3 overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-600 via-blue-600 to-cyan-700 p-5 text-white shadow-lg shadow-blue-950/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),transparent_30%)]" />
            <div className="relative flex flex-col gap-2">
              {system.featured ? (
                <Badge className="w-fit border border-white/20 bg-white/15 text-white backdrop-blur">Featured</Badge>
              ) : null}
              <p className="text-base font-semibold text-pretty">{system.title}</p>
            </div>
            <ArrowUpRight className="relative size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
