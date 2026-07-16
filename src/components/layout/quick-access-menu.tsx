"use client";

import Link from "next/link";
import {
  BarChart3,
  Briefcase,
  ClipboardList,
  FileText,
  Fingerprint,
  Gavel,
  GraduationCap,
  Grid3x3,
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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { utilityQuickAccess, type UtilityAccessGroup, type UtilityAccessIcon } from "@/lib/home-data";
import { navColorClasses, utilityGroupColors } from "@/lib/nav-colors";
import { cn } from "@/lib/utils";

export const utilityIconMap: Record<UtilityAccessIcon, LucideIcon> = {
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
  "file-text": FileText,
};

export const utilityGroups: UtilityAccessGroup[] = [
  "Student Tools",
  "Results & Records",
  "Institutions & Careers",
  "Reports & Media",
];

export function QuickAccessMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-10 gap-2 rounded-lg px-4 text-base font-medium text-slate-800 transition-colors hover:bg-white/75 hover:text-slate-950 data-[state=open]:bg-white/75 data-[state=open]:text-slate-950">
            <span
              className={cn(
                "flex size-7 items-center justify-center rounded-md",
                navColorClasses.blue,
              )}
            >
              <Grid3x3 className="size-4" />
            </span>
            Quick Access
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-[min(94vw,880px)]">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-6 lg:grid-cols-4">
              {utilityGroups.map((group) => (
                <div key={group}>
                  <p
                    className={cn(
                      "inline-flex rounded-md px-2 py-1 text-xs font-semibold tracking-wide uppercase",
                      navColorClasses[utilityGroupColors[group]],
                    )}
                  >
                    {group}
                  </p>
                  <ul className="mt-3 flex flex-col gap-1">
                    {utilityQuickAccess
                      .filter((item) => item.group === group)
                      .map((item) => {
                        const Icon = utilityIconMap[item.icon];
                        if (item.children) {
                          return (
                            <li key={item.title}>
                              <p className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm font-medium text-foreground">
                                <Icon className="size-4 shrink-0 text-muted-foreground" />
                                {item.title}
                              </p>
                              <div className="ml-6 flex flex-col">
                                {item.children.map((child) => (
                                  <a
                                    key={child.href}
                                    href={child.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                  >
                                    {child.label}
                                  </a>
                                ))}
                              </div>
                            </li>
                          );
                        }
                        return (
                          <li key={item.title}>
                            <Link
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noopener noreferrer" : undefined}
                              className="group flex items-start gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-accent"
                            >
                              <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                              <span>
                                <span className="block font-medium text-foreground group-hover:text-accent-foreground">
                                  {item.title}
                                </span>
                                <span className="block text-xs text-muted-foreground">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
