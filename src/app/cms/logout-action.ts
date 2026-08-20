"use server";

import { redirect } from "next/navigation";

import { assertSameOrigin } from "@/lib/cms/auth/same-origin";
import { destroySession } from "@/lib/cms/auth/session";

export async function logoutAction(): Promise<void> {
  await assertSameOrigin();
  await destroySession();
  redirect("/cms/login");
}
