import "server-only";

import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getPublishedContactOfficials() {
  return db
    .select()
    .from(schema.contactOfficials)
    .where(eq(schema.contactOfficials.isPublished, true))
    .orderBy(asc(schema.contactOfficials.sortOrder))
    .all();
}

export async function getGeneralInquiry() {
  return db.select().from(schema.generalInquiry).get();
}
