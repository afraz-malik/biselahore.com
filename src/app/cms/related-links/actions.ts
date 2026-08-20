"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { relatedLinkSchema } from "@/lib/cms/schemas";
import { relatedLinks } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/");
}

export async function createRelatedLink(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = relatedLinkSchema.parse(values);
  insertRow(relatedLinks, data);
  revalidate();
}

export async function updateRelatedLink(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = relatedLinkSchema.parse(values);
  updateRow(relatedLinks, id, data);
  revalidate();
}

export async function deleteRelatedLink(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(relatedLinks, id);
  revalidate();
}

export async function toggleRelatedLinkPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(relatedLinks, id);
  revalidate();
}

export async function reorderRelatedLink(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(relatedLinks, id, direction);
  revalidate();
}
