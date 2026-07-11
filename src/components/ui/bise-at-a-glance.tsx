"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  GraduationCap,
  Laptop,
  MapPin,
  School,
  ScrollText,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { glanceStats, type GlanceStat, type GlanceStatIcon } from "@/lib/home-data";

const iconMap: Record<GlanceStatIcon, LucideIcon> = {
  "graduation-cap": GraduationCap,
  school: School,
  "scroll-text": ScrollText,
  "map-pin": MapPin,
  award: Award,
  laptop: Laptop,
  "book-open": BookOpen,
  zap: Zap,
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function StatCard({ stat }: { stat: GlanceStat }) {
  const Icon = iconMap[stat.icon];
  const [labelReady, setLabelReady] = useState(stat.value === undefined);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 p-6 shadow-lg shadow-black/20 backdrop-blur-xl transition-colors duration-300 hover:border-emerald-300/40 hover:bg-white/9 hover:shadow-2xl hover:shadow-emerald-500/10 sm:p-8"
    >
      <motion.span
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="inline-flex size-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-300/20"
      >
        <Icon className="size-7" />
      </motion.span>

      {stat.value !== undefined ? (
        <p className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <AnimatedCounter
            value={stat.value}
            decimals={stat.decimals}
            prefix={stat.prefix}
            suffix={stat.suffix}
            onComplete={() => setLabelReady(true)}
          />
        </p>
      ) : null}

      <motion.div
        initial={{ opacity: 0 }}
        animate={labelReady ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className={cn(stat.value === undefined && "mt-6")}
      >
        <p
          className={cn(
            "font-semibold text-white text-pretty",
            stat.value === undefined ? "text-2xl" : "mt-1.5 text-sm",
          )}
        >
          {stat.title}
        </p>
        {stat.subtitle ? (
          <p className="mt-1 text-sm text-white/60 text-pretty">{stat.subtitle}</p>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export function BiseAtAGlance() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071811] py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_0%,oklch(0.48_0.11_162/0.55)_0%,transparent_60%),radial-gradient(55%_60%_at_100%_100%,oklch(0.6_0.14_163/0.35)_0%,transparent_60%)]" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-size-[56px_56px] opacity-40 mask-[radial-gradient(ellipse_60%_60%_at_50%_40%,black_40%,transparent_85%)]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/60" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-medium tracking-wide text-emerald-300 uppercase">
            BISE Lahore
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            BISE at a Glance
          </h2>
          <p className="mt-4 text-base text-white/70 text-pretty">
            Decades of scale and trust — the numbers behind every examination,
            certificate, and student we serve.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
        >
          {glanceStats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
