import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db/client";
import * as schema from "@/lib/db/schema";

export async function getOfficialByRole(roleSlug: "chairman" | "secretary" | "controller") {
  return db.select().from(schema.officials).where(eq(schema.officials.roleSlug, roleSlug)).get();
}
