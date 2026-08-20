import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import type { HeroSlideData } from "@/components/hero/hero-data";

export async function getPublishedHeroSlides(): Promise<HeroSlideData[]> {
  const rows = await db
    .select()
    .from(schema.heroSlides)
    .where(eq(schema.heroSlides.isPublished, true))
    .orderBy(asc(schema.heroSlides.sortOrder))
    .all();

  return rows.map((row) => ({
    id: String(row.id),
    eyebrow: row.eyebrow,
    title: row.title,
    description: row.description,
    image: row.backgroundImage,
    imageAlt: row.imageAlt,
    primaryAction: { label: row.primaryCtaLabel, href: row.primaryCtaHref },
    secondaryAction:
      row.secondaryCtaLabel && row.secondaryCtaHref
        ? { label: row.secondaryCtaLabel, href: row.secondaryCtaHref }
        : undefined,
  }));
}

export async function getPublishedSocialSidebarItems() {
  return db
    .select()
    .from(schema.socialSidebarItems)
    .where(eq(schema.socialSidebarItems.isPublished, true))
    .orderBy(asc(schema.socialSidebarItems.sortOrder))
    .all();
}

export async function getPublishedGlanceStats() {
  const rows = await db
    .select()
    .from(schema.glanceStats)
    .where(eq(schema.glanceStats.isPublished, true))
    .orderBy(asc(schema.glanceStats.sortOrder))
    .all();

  return rows.map((row) => ({
    icon: row.icon,
    value: row.value ?? undefined,
    decimals: row.decimals ?? undefined,
    prefix: row.prefix ?? undefined,
    suffix: row.suffix ?? undefined,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
  }));
}

export async function getPublishedAnnouncements() {
  return db
    .select()
    .from(schema.announcements)
    .where(eq(schema.announcements.isPublished, true))
    .orderBy(asc(schema.announcements.sortOrder))
    .all();
}

export async function getPublishedOnlineSystems() {
  const rows = await db
    .select()
    .from(schema.onlineSystems)
    .where(eq(schema.onlineSystems.isPublished, true))
    .orderBy(asc(schema.onlineSystems.sortOrder))
    .all();

  return rows.map((row) => ({
    title: row.title,
    href: row.href,
    description: row.description ?? undefined,
    featured: row.featured,
  }));
}

export async function getPublishedNewsPreview() {
  return db
    .select()
    .from(schema.newsPreview)
    .where(eq(schema.newsPreview.isPublished, true))
    .orderBy(asc(schema.newsPreview.sortOrder))
    .all();
}

export async function getPublishedRelatedLinks() {
  const rows = await db
    .select()
    .from(schema.relatedLinks)
    .where(eq(schema.relatedLinks.isPublished, true))
    .orderBy(asc(schema.relatedLinks.sortOrder))
    .all();

  return {
    boards: rows.filter((r) => r.group === "boards"),
    organizations: rows.filter((r) => r.group === "organizations"),
  };
}
