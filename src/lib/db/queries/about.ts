import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";
import type { AboutSection } from "@/lib/about-data";

export async function getPublishedAboutSections(): Promise<AboutSection[]> {
  const rows = await db
    .select()
    .from(schema.aboutSections)
    .where(eq(schema.aboutSections.isPublished, true))
    .orderBy(asc(schema.aboutSections.sortOrder))
    .all();

  return rows.map((row) => ({
    id: row.slug,
    title: row.title,
    body: row.body,
    list: row.listItems ?? undefined,
    ordered: row.ordered,
  }));
}
