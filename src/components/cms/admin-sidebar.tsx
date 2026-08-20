"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { adminNavGroups } from "@/components/cms/admin-nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-64 shrink-0 flex-col gap-6 overflow-y-auto border-r border-border bg-card px-4 py-6">
      <Link href="/cms" className="flex items-center gap-2 px-2 text-sm font-semibold text-foreground">
        <LayoutDashboard className="size-4.5 text-primary" />
        BISE Lahore CMS
      </Link>

      <Link
        href="/cms"
        className={cn(
          "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
          pathname === "/cms" ? "bg-accent text-foreground" : "text-muted-foreground"
        )}
      >
        Dashboard
      </Link>

      {adminNavGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <p className="px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {group.label}
          </p>
          {group.items.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                  active ? "bg-accent font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
