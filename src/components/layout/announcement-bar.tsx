"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Megaphone, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export interface AnnouncementBarItem {
  title: string;
  href: string;
  isNew: boolean;
}

export function AnnouncementBar({ announcements }: { announcements: AnnouncementBarItem[] }) {
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(true);
  const [lead, ...rest] = announcements;

  if (dismissed || !lead) return null;

  return (
    <div className="relative border-b border-primary/20 bg-[linear-gradient(90deg,rgba(224,242,254,0.95)_0%,rgba(191,219,254,0.95)_45%,rgba(219,234,254,0.95)_100%)] text-accent-foreground">
      <div 
      
      className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8 lg:px-10 xl:px-12">
        <Megaphone className="hidden size-4.5 shrink-0 text-primary sm:block" />
        {/* <Link
          href={lead.href}
          target={lead.href.startsWith("http") ? "_blank" : undefined}
          rel={lead.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="min-w-0 flex-1 truncate text-sm font-medium hover:underline"
        >
          {lead.title}
        </Link> */}
        <p
            onClick={() => setOpen(true)}
        
        className="min-w-0 cursor-pointer flex-1 truncate text-sm font-medium">Important Announcements
          &nbsp;&nbsp;
    <Badge className="hidden shrink-0 bg-primary text-primary-foreground sm:inline-flex">
            New
          </Badge>

        </p>


        <Sheet open={open} onOpenChange={setOpen}>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            View all
          </button>
          <SheetContent side="right" className="w-full max-w-sm">
            <SheetHeader>
              <SheetTitle>Important Announcements</SheetTitle>
              <SheetDescription>
                Time-sensitive notices, schedules and registration links.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-1 overflow-y-auto px-4 pb-4">
              {[lead, ...rest].map((item) => (
                <Link
                  key={item.href + item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start justify-between gap-2 rounded-lg border border-transparent px-3 py-3 text-sm hover:border-border hover:bg-secondary"
                >
                  <span className="flex items-center gap-2">
                    {item.title}
                    {item.isNew ? (
                      <Badge className="bg-primary text-primary-foreground">New</Badge>
                    ) : null}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100",
                    )}
                  />
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
{/* 
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
        >
          <X className="size-4" />
        </button> */}
      </div>
    </div>
  );
}
