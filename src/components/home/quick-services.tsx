"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  BadgeCheck,
  Copy,
  Stamp,
  UserPen,
  type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ServiceCard } from "@/components/home/service-card";
import { quickServiceCards, type QuickServiceIcon } from "@/lib/home-data";

const iconMap: Record<QuickServiceIcon, LucideIcon> = {
  stamp: Stamp,
  "badge-check": BadgeCheck,
  "arrow-left-right": ArrowLeftRight,
  "copy-check": Copy,
  "user-pen": UserPen,
};

export function QuickServices() {
  return (
    <Section id="quick-services" background="subtle" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Explore"
        title="E-Services"
        description="Fast access to student services, record corrections, and online requests — just one click away."
      />
      <div className="mt-8 rounded-[2rem] border border-white/70 bg-gradient-to-br from-sky-100/80 via-white/70 to-cyan-100/80 p-4 shadow-[0_20px_60px_-30px_rgba(37,99,235,0.45)] backdrop-blur-sm sm:p-6">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {quickServiceCards.map((service, i) => (
          <motion.div
            key={service.title}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="h-full"
          >
            <Link
              href={service.href}
              target={service.external ? "_blank" : undefined}
              rel={service.external ? "noopener noreferrer" : undefined}
              className="block h-full"
            >
              <ServiceCard
                icon={iconMap[service.icon]}
                title={service.title}
                description={service.description}
                tone={i % 2 === 0 ? "sky" : "ocean"}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </Section>
  );
}
