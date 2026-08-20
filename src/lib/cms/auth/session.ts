import "server-only";

import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS, signSessionToken, verifySessionToken } from "./token";

export async function createSession(): Promise<void> {
  const token = await signSessionToken();
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return false;
  }
  return verifySessionToken(token);
}
