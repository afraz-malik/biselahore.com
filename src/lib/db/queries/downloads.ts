import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedDownloads() {
  return db
    .select()
    .from(schema.downloads)
    .where(eq(schema.downloads.isPublished, true))
    .orderBy(asc(schema.downloads.sortOrder))
    .all();
}
