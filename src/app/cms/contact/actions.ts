"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { contactOfficialSchema, generalInquirySchema } from "@/lib/cms/schemas";
import { contactOfficials, generalInquiry } from "@/lib/db/schema";
import { db } from "@/lib/db/client";

function revalidate() {
  revalidatePath("/contact");
}

export async function createContactOfficial(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = contactOfficialSchema.parse(values);
  insertRowAtTop(contactOfficials, data);
  revalidate();
}

export async function updateContactOfficial(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = contactOfficialSchema.parse(values);
  updateRow(contactOfficials, id, data);
  revalidate();
}

export async function deleteContactOfficial(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(contactOfficials, id);
  revalidate();
}

export async function toggleContactOfficialPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(contactOfficials, id);
  revalidate();
}

export async function reorderContactOfficial(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(contactOfficials, id, direction);
  revalidate();
}

export async function updateGeneralInquiry(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = generalInquirySchema.parse(values);
  db.update(generalInquiry).set(data).where(eq(generalInquiry.id, id)).run();
  revalidate();
}
