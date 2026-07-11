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
      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/brand/bise-logo.png"
            alt="BISE Lahore crest"
            width={44}
            height={52}
            className="h-11 w-auto"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight sm:text-lg">
              BISE Lahore
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              Board of Intermediate &amp; Secondary Education
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            isNavGroup(item) ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="gap-1 text-sm font-medium text-foreground/80 hover:text-foreground"
                    />
                  }
                >
                  {item.label}
                  <ChevronDown className="size-3.5 opacity-60" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-48">
                  {item.items.map((sub) => (
                    <DropdownMenuItem key={sub.href} render={<Link href={sub.href} />}>
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
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </Button>
            ),
          )}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center sm:flex">
            <div
              className={cn(
                "grid transition-[grid-template-columns] duration-300 ease-out",
                searchOpen ? "grid-cols-[13rem]" : "grid-cols-[0rem]",
              )}
            >
              <div className="overflow-hidden">
                <Input
                  autoFocus={searchOpen}
                  placeholder="Search the site…"
                  className="h-9 w-52"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={searchOpen ? "Close search" : "Open search"}
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
            </Button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <Image
                    src="/brand/bise-logo.png"
                    alt="BISE Lahore crest"
                    width={32}
                    height={38}
                    className="h-8 w-auto"
                  />
                  BISE Lahore
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-1 px-4">
                <div className="relative mb-2">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search the site…" className="pl-9" />
                </div>
                {primaryNav.map((item) =>
                  isNavGroup(item) ? (
                    <div key={item.label} className="py-1">
                      <p className="px-3 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                        {item.label}
                      </p>
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
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
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
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
