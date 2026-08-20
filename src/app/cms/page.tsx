import Link from "next/link";
import { count } from "drizzle-orm";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import { adminNavGroups } from "@/components/cms/admin-nav";

function rowCount(table: SQLiteTable): number {
  return db.select({ value: count() }).from(table).get()?.value ?? 0;
}

const tableByHref: Record<string, SQLiteTable> = {
  "/cms/hero-slides": schema.heroSlides,
  "/cms/announcements": schema.announcements,
  "/cms/online-systems": schema.onlineSystems,
  "/cms/glance-stats": schema.glanceStats,
  "/cms/latest-news": schema.newsPreview,
  "/cms/related-links": schema.relatedLinks,
  "/cms/social-sidebar": schema.socialSidebarItems,
  "/cms/notifications": schema.notifications,
  "/cms/downloads": schema.downloads,
  "/cms/model-papers": schema.modelPapers,
  "/cms/careers": schema.careers,
  "/cms/tenders": schema.tenders,
  "/cms/rti": schema.rtiItems,
  "/cms/about": schema.aboutSections,
  "/cms/administration": schema.officials,
  "/cms/contact": schema.contactOfficials,
  "/cms/faqs": schema.faqs,
  "/cms/result-statistics": schema.resultStats,
  "/cms/gallery": schema.galleryAlbums,
  "/cms/deputationists": schema.deputationists,
};

export default function CmsDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of every content module.</p>
      </div>

      {adminNavGroups.map((group) => (
        <div key={group.label} className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{group.label}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => {
              const table = tableByHref[item.href];
              const rows = table ? rowCount(table) : 0;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-primary/40 hover:bg-accent/40"
                >
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                    {rows}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
