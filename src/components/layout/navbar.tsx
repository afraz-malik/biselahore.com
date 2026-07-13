"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Download,
  Grid3x3,
  HelpCircle,
  Home,
  Info,
  Map,
  Menu,
  Phone,
  Radio,
  Search,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  QuickAccessMenu,
  utilityGroups,
  utilityIconMap,
} from "@/components/layout/quick-access-menu";
import {
  isNavGroup,
  primaryNav,
  quickNavLinks,
  type NavIconName,
} from "@/lib/nav-data";
import { utilityQuickAccess } from "@/lib/home-data";
import { navColorClasses, utilityGroupColors } from "@/lib/nav-colors";
import { cn } from "@/lib/utils";

const navIconMap: Record<NavIconName, LucideIcon> = {
  home: Home,
  info: Info,
  download: Download,
  bell: Bell,
  phone: Phone,
  users: Users,
  map: Map,
  zap: Zap,
  radio: Radio,
  grid: Grid3x3,
  help: HelpCircle,
};

function ColoredIcon({
  icon,
  color,
  size = "md",
}: {
  icon: NavIconName;
  color: keyof typeof navColorClasses;
  size?: "sm" | "md";
}) {
  const Icon = navIconMap[icon];
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-md",
        size === "sm" ? "size-6" : "size-7",
        navColorClasses[color],
      )}
    >
      <Icon className={size === "sm" ? "size-3.5" : "size-4"} />
    </span>
  );
}

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-6 py-3 lg:h-24">
        <Link href="/" className="flex items-center gap-3.5 shrink-0">
          <Image
            src="/brand/bise-logo.png"
            alt="BISE Lahore crest"
            width={56}
            height={66}
            className="h-12 w-auto lg:h-14"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              BISE Lahore
            </span>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Board of Intermediate &amp; Secondary Education
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {quickNavLinks.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              nativeButton={false}
              render={<Link href={item.href} />}
              className="gap-2 text-base font-medium text-foreground/80 hover:text-foreground"
            >
              <ColoredIcon icon={item.icon!} color={item.color!} />
              {item.label}
            </Button>
          ))}
          <QuickAccessMenu />
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center sm:flex">
            <div
              className={cn(
                "grid transition-[grid-template-columns] duration-300 ease-out",
                searchOpen ? "grid-cols-[16rem]" : "grid-cols-[0rem]",
              )}
            >
              <div className="overflow-hidden">
                <Input
                  autoFocus={searchOpen}
                  placeholder="Search the site…"
                  className="h-11 w-64 text-base"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-lg"
              aria-label={searchOpen ? "Close search" : "Open search"}
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? (
                <X className="size-5" />
              ) : (
                <Search className="size-5" />
              )}
            </Button>
          </div>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full max-w-sm flex-col"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5 text-left text-lg">
                  <Image
                    src="/brand/bise-logo.png"
                    alt="BISE Lahore crest"
                    width={40}
                    height={47}
                    className="h-10 w-auto"
                  />
                  BISE Lahore
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-6">
                <div className="relative mb-3">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search the site…"
                    className="h-11 pl-10 text-base"
                  />
                </div>

                <p className="px-1 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Jump to
                </p>
                <div className="flex flex-col gap-1 lg:hidden">
                  {quickNavLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    >
                      <ColoredIcon icon={item.icon!} color={item.color!} />
                      {item.label}
                    </Link>
                  ))}
                </div>

                <Accordion className="lg:hidden">
                  <AccordionItem value="quick-access" className="border-b-0">
                    <AccordionTrigger className="rounded-lg px-2 py-2.5 text-base font-medium text-foreground/80 hover:no-underline hover:bg-accent hover:text-accent-foreground">
                      <span className="flex items-center gap-3">
                        <ColoredIcon icon="grid" color="blue" />
                        Quick Access
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-4 px-1">
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
                            <div className="mt-1.5 flex flex-col">
                              {utilityQuickAccess
                                .filter((i) => i.group === group)
                                .flatMap((item) => {
                                  const Icon = utilityIconMap[item.icon];
                                  if (item.children) {
                                    return item.children.map((child) => (
                                      <a
                                        key={child.href}
                                        href={child.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                                      >
                                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                                        {item.title} — {child.label}
                                      </a>
                                    ));
                                  }
                                  return [
                                    <Link
                                      key={item.title}
                                      href={item.href}
                                      target={
                                        item.external ? "_blank" : undefined
                                      }
                                      rel={
                                        item.external
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                      onClick={() => setMenuOpen(false)}
                                      className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                                    >
                                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                                      {item.title}
                                    </Link>,
                                  ];
                                })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <p className="mt-3 px-1 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  More
                </p>
                {primaryNav.map((item) =>
                  isNavGroup(item) ? (
                    <Accordion key={item.label}>
                      <AccordionItem value={item.label} className="border-b-0">
                        <AccordionTrigger className="rounded-lg px-2 py-2.5 text-base font-medium text-foreground/80 hover:no-underline hover:bg-accent hover:text-accent-foreground">
                          <span className="flex items-center gap-3">
                            <ColoredIcon
                              icon={item.icon!}
                              color={item.color!}
                            />
                            {item.label}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col pl-11">
                            {item.items.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMenuOpen(false)}
                                className="rounded-lg px-2 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    >
                      <ColoredIcon icon={item.icon!} color={item.color!} />
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>

      <nav
        aria-label="Secondary"
        className="hidden border-t border-border/70 bg-secondary/40 lg:block"
      >
        <Container className="flex h-11 items-center justify-between gap-1">
          {primaryNav.map((item) =>
            isNavGroup(item) ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-sm font-medium text-foreground/75 hover:text-foreground"
                    />
                  }
                >
                  <ColoredIcon
                    icon={item.icon!}
                    color={item.color!}
                    size="sm"
                  />
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-48 p-1.5">
                  {item.items.map((sub) => (
                    <DropdownMenuItem
                      key={sub.href}
                      render={<Link href={sub.href} />}
                      className="px-2.5 py-2 text-sm"
                    >
                      {sub.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href={item.href} />}
                className="gap-1.5 text-sm font-medium text-foreground/75 hover:text-foreground"
              >
                <ColoredIcon icon={item.icon!} color={item.color!} size="sm" />
                {item.label}
              </Button>
            ),
          )}
        </Container>
      </nav>
    </header>
  );
}
