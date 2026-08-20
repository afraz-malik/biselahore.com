"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { socialSidebarItemSchema } from "@/lib/cms/schemas";
import { socialSidebarItems } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/", "layout");
}

export async function createSocialItem(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = socialSidebarItemSchema.parse(values);
  insertRow(socialSidebarItems, data);
  revalidate();
}

export async function updateSocialItem(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = socialSidebarItemSchema.parse(values);
  updateRow(socialSidebarItems, id, data);
  revalidate();
}

export async function deleteSocialItem(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(socialSidebarItems, id);
  revalidate();
}

export async function toggleSocialItemPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(socialSidebarItems, id);
  revalidate();
}

export async function reorderSocialItem(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(socialSidebarItems, id, direction);
  revalidate();
}
