import "server-only";

import { headers } from "next/headers";

/**
 * Defense-in-depth CSRF check for Server Actions: confirms the Origin header
 * matches the request Host. Next.js already enforces this for Server Action
 * POSTs, but mutations call this explicitly in case that changes.
 */
export async function assertSameOrigin(): Promise<void> {
  const headerList = await headers();
  const origin = headerList.get("origin");
  const host = headerList.get("host");

  if (!origin || !host) {
    throw new Error("Missing Origin header.");
  }

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new Error("Invalid Origin header.");
  }

  if (originHost !== host) {
    throw new Error("Cross-origin request rejected.");
  }
}
