"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { verifyPassword } from "@/lib/cms/auth/password";
import { isRateLimited, recordFailedAttempt, clearAttempts } from "@/lib/cms/auth/rate-limit";
import { assertSameOrigin } from "@/lib/cms/auth/same-origin";
import { createSession } from "@/lib/cms/auth/session";

export interface LoginState {
  error?: string;
}

async function getClientKey(): Promise<string> {
  const headerList = await headers();
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  await assertSameOrigin();

  const clientKey = await getClientKey();
  if (isRateLimited(clientKey)) {
    return { error: "Too many attempts. Please try again in a few minutes." };
  }

  const password = formData.get("password");
  const storedHash = process.env.CMS_ADMIN_PASSWORD_HASH;

  if (typeof password !== "string" || !password || !storedHash) {
    recordFailedAttempt(clientKey);
    return { error: "Invalid credentials." };
  }

  const valid = verifyPassword(password, storedHash);
  if (!valid) {
    recordFailedAttempt(clientKey);
    return { error: "Invalid credentials." };
  }

  clearAttempts(clientKey);
  await createSession();
  redirect("/cms");
}
