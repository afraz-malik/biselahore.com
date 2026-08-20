import "server-only";

import { and, asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedModelPapers(level: "ssc" | "hssc") {
  return db
    .select()
    .from(schema.modelPapers)
    .where(and(eq(schema.modelPapers.level, level), eq(schema.modelPapers.isPublished, true)))
    .orderBy(asc(schema.modelPapers.sortOrder))
    .all();
}
