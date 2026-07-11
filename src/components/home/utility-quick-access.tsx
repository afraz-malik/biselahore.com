"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  ClipboardList,
  Fingerprint,
  Gavel,
  GraduationCap,
  Images,
  MessageCircleWarning,
  Newspaper,
  Printer,
  School,
  ScrollText,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { utilityQuickAccess, type UtilityAccessIcon } from "@/lib/home-data";

const iconMap: Record<UtilityAccessIcon, LucideIcon> = {
  fingerprint: Fingerprint,
  printer: Printer,
  "graduation-cap": GraduationCap,
  users: Users,
  "bar-chart": BarChart3,
  "message-warning": MessageCircleWarning,
  "scroll-text": ScrollText,
  briefcase: Briefcase,
  school: School,
  "clipboard-list": ClipboardList,
  gavel: Gavel,
  images: Images,
  trophy: Trophy,
  newspaper: Newspaper,
};

const chipClass =
  "group flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium whitespace-nowrap shadow-sm transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground";

function ChipIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="size-4 text-primary" />;
}

export function UtilityQuickAccess() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Utilities"
        title="Quick Access"
        description="Common services and resources, one click away."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03 } } }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {utilityQuickAccess.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              {item.children ? (
                <DropdownMenu>
                  <DropdownMenuTrigger render={<button type="button" className={chipClass} />}>
                    <ChipIcon icon={Icon} />
                    {item.title}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="min-w-40">
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={child.href}
                        render={<a href={child.href} target="_blank" rel="noopener noreferrer" />}
                      >
                        {child.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={chipClass}
                >
                  <ChipIcon icon={Icon} />
                  {item.title}
                </Link>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
