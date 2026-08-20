import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedFaqs() {
  return db
    .select()
    .from(schema.faqs)
    .where(eq(schema.faqs.isPublished, true))
    .orderBy(asc(schema.faqs.sortOrder))
    .all();
}
