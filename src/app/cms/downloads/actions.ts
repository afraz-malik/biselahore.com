"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { downloadSchema } from "@/lib/cms/schemas";
import { downloads } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/downloads");
}

export async function createDownload(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = downloadSchema.parse(values);
  insertRow(downloads, data);
  revalidate();
}

export async function updateDownload(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = downloadSchema.parse(values);
  updateRow(downloads, id, data);
  revalidate();
}

export async function deleteDownload(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(downloads, id);
  revalidate();
}

export async function toggleDownloadPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(downloads, id);
  revalidate();
}

export async function reorderDownload(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(downloads, id, direction);
  revalidate();
}
