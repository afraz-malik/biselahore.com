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
        title="Quick Services"
        description="E-services and record corrections — the most requested student actions, one click away."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        {quickServiceCards.map((service) => (
          <motion.div
            key={service.title}
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
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
              <ServiceCard icon={iconMap[service.icon]} title={service.title} description={service.description} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
