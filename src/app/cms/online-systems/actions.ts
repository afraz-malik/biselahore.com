"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRowAtTop, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { onlineSystemSchema } from "@/lib/cms/schemas";
import { onlineSystems } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/");
}

export async function createOnlineSystem(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = onlineSystemSchema.parse(values);
  insertRowAtTop(onlineSystems, data);
  revalidate();
}

export async function updateOnlineSystem(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = onlineSystemSchema.parse(values);
  updateRow(onlineSystems, id, data);
  revalidate();
}

export async function deleteOnlineSystem(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(onlineSystems, id);
  revalidate();
}

export async function toggleOnlineSystemPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(onlineSystems, id);
  revalidate();
}

export async function reorderOnlineSystem(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(onlineSystems, id, direction);
  revalidate();
}
