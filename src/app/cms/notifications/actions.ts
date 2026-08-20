"use server";

import { revalidatePath } from "next/cache";

import { requireCmsAuth } from "@/lib/cms/auth/guard";
import { insertRow, updateRow, deleteRow, togglePublished, reorderRow } from "@/lib/cms/mutations";
import { notificationSchema } from "@/lib/cms/schemas";
import { notifications } from "@/lib/db/schema";

function revalidate() {
  revalidatePath("/notifications");
}

export async function createNotification(values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = notificationSchema.parse(values);
  insertRow(notifications, data);
  revalidate();
}

export async function updateNotification(id: number, values: unknown): Promise<void> {
  await requireCmsAuth();
  const data = notificationSchema.parse(values);
  updateRow(notifications, id, data);
  revalidate();
}

export async function deleteNotification(id: number): Promise<void> {
  await requireCmsAuth();
  deleteRow(notifications, id);
  revalidate();
}

export async function toggleNotificationPublished(id: number): Promise<void> {
  await requireCmsAuth();
  togglePublished(notifications, id);
  revalidate();
}

export async function reorderNotification(id: number, direction: "up" | "down"): Promise<void> {
  await requireCmsAuth();
  reorderRow(notifications, id, direction);
  revalidate();
}
