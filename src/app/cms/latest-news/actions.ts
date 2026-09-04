"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { newsPreviewSchema } from "@/lib/cms/schemas";
import { newsPreview } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/");
}

export async function createNewsItem(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = newsPreviewSchema.parse(values);
  insertRowAtTop(newsPreview, data);
  revalidate();
}

export async function updateNewsItem(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = newsPreviewSchema.parse(values);
  updateRow(newsPreview, id, data);
  revalidate();
}

export async function deleteNewsItem(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(newsPreview, id);
  revalidate();
}

export async function toggleNewsItemPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(newsPreview, id);
  revalidate();
}

export async function reorderNewsItem(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(newsPreview, id, direction);
  revalidate();
}
