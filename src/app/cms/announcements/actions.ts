"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { announcementSchema } from "@/lib/cms/schemas";
import { announcements } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/", "layout");
}

export async function createAnnouncement(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = announcementSchema.parse(values);
  insertRow(announcements, data);
  revalidate();
}

export async function updateAnnouncement(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = announcementSchema.parse(values);
  updateRow(announcements, id, data);
  revalidate();
}

export async function deleteAnnouncement(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(announcements, id);
  revalidate();
}

export async function toggleAnnouncementPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(announcements, id);
  revalidate();
}

export async function reorderAnnouncement(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(announcements, id, direction);
  revalidate();
}
