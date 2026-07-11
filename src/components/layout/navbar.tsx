"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Search, X } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isNavGroup, primaryNav } from "@/lib/nav-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
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

        <nav className="hidden items-center gap-2 lg:flex">
          {primaryNav.map((item) =>
            isNavGroup(item) ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="gap-1.5 text-base font-medium text-foreground/80 hover:text-foreground"
                    />
                  }
                >
                  {item.label}
                  <ChevronDown className="size-4 opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-56 p-1.5">
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
                nativeButton={false}
                render={<Link href={item.href} />}
                className="text-base font-medium text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </Button>
            ),
          )}
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
              {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu" />}
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
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
              <div className="flex flex-col gap-1.5 px-4">
                <div className="relative mb-3">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search the site…" className="h-11 pl-10 text-base" />
                </div>
                {primaryNav.map((item) =>
                  isNavGroup(item) ? (
                    <div key={item.label} className="py-1">
                      <p className="px-3 py-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {item.label}
                      </p>
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
