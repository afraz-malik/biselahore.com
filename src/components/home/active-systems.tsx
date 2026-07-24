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
            className="group relative flex items-start justify-between gap-3 overflow-hidden rounded-2xl border border-slate-300/85 bg-[linear-gradient(135deg,rgba(248,250,252,0.96)_0%,rgba(219,234,254,0.94)_48%,rgba(224,242,254,0.96)_100%)] p-5 text-slate-900 shadow-lg shadow-blue-950/10 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.98)_0%,rgba(37,99,235,0.97)_52%,rgba(14,165,233,0.96)_100%)]  hover:shadow-xl hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 bg-white transition-opacity duration-300 group-hover:opacity-90" />
            <div className="relative flex flex-col gap-2">
              {system.featured ? (
                <Badge className="w-fit border border-blue-200/80 bg-white/70 text-blue-700 backdrop-blur ">Featured</Badge>
              ) : null}
              <p className="text-base font-semibold text-pretty">{system.title}</p>
              <p className="text-sm font-light text-pretty">{system.description}</p>
            </div>
            <ArrowUpRight className="relative size-5 shrink-0 text-blue-700 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
