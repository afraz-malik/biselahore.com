"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { activeSystems } from "@/lib/home-data";

export function ActiveSystems() {
  return (
    <Section background="subtle">
      <SectionHeading
        eyebrow="Student Services"
        title="Online / Active Systems"
        description="Live registration, roll-number slip and exam-management portals for the current session."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
        className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {activeSystems.map((system) => (
          <motion.a
            key={system.title + system.href}
            href={system.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            <div className="flex flex-col gap-1.5">
              {system.featured ? (
                <Badge className="w-fit bg-primary text-primary-foreground">Featured</Badge>
              ) : null}
              <p className="text-sm font-medium text-pretty">{system.title}</p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}
