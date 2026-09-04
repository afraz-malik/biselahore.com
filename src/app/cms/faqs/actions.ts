"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { faqSchema } from "@/lib/cms/schemas";
import { faqs } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/faqs");
}

export async function createFaq(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = faqSchema.parse(values);
  insertRowAtTop(faqs, data);
  revalidate();
}

export async function updateFaq(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = faqSchema.parse(values);
  updateRow(faqs, id, data);
  revalidate();
}

export async function deleteFaq(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(faqs, id);
  revalidate();
}

export async function toggleFaqPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(faqs, id);
  revalidate();
}

export async function reorderFaq(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(faqs, id, direction);
  revalidate();
}
