import type { NavColor } from "@/lib/nav-data";

/** Shared colored-icon-badge classes for nav items and Quick Access tiles. */
export const navColorClasses: Record<NavColor, string> = {
  emerald: "bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400",
  sky: "bg-sky-500/12 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400",
  violet: "bg-violet-500/12 text-violet-600 dark:bg-violet-400/15 dark:text-violet-400",
  rose: "bg-rose-500/12 text-rose-600 dark:bg-rose-400/15 dark:text-rose-400",
  cyan: "bg-cyan-500/12 text-cyan-600 dark:bg-cyan-400/15 dark:text-cyan-400",
  amber: "bg-amber-500/12 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400",
  fuchsia: "bg-fuchsia-500/12 text-fuchsia-600 dark:bg-fuchsia-400/15 dark:text-fuchsia-400",
  blue: "bg-blue-500/12 text-blue-600 dark:bg-blue-400/15 dark:text-blue-400",
  teal: "bg-teal-500/12 text-teal-600 dark:bg-teal-400/15 dark:text-teal-400",
};

/** Group → color for Quick Access mega menu section headings/tiles. */
export const utilityGroupColors: Record<string, NavColor> = {
  "Student Tools": "amber",
  "Results & Records": "blue",
  "Institutions & Careers": "sky",
  "Reports & Media": "cyan",
};
